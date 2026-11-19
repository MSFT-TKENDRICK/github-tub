import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  canonicalUrl, createClaim, createSource, mergeLedger, sourceId, validateClaim,
} from '../tools/lib/claims.mjs';
import { fetchSource } from '../tools/lib/fetcher.mjs';
import { verifiedCitations } from '../web/js/cite.mjs';
import { indexSnapshot } from '../web/js/briefing.mjs';
import { checkClaims } from '../tools/check-claims.mjs';
import { ingestOne } from '../tools/ingest.mjs';
import { writeContent } from '../tools/lib/content-io.mjs';
import { loadContent } from '../tools/validate.mjs';
import { buildEdition } from '../tools/publish.mjs';

const sourceUrl = 'https://github.blog/changelog/copilot-example/';
const text = 'GitHub Copilot Business includes code completion for Java developers.';
const claimText = 'GitHub Copilot Business includes code completion for Java developers.';
const quote = 'GitHub Copilot Business includes code completion for Java developers.';

function sourceRecord() {
  return createSource({
    url: sourceUrl, kind: 'changelog', publisher: 'GitHub', title: 'Copilot example',
    published: '2026-10-12', via: 'html', text,
    check: { ok: true, status: 200, at: '2026-11-05T00:00:00.000Z' },
  });
}

test('canonical source URLs remove fragments and tracking parameters', () => {
  assert.equal(canonicalUrl('https://github.blog/a/?utm_source=mail#update'), 'https://github.blog/a');
  assert.equal(sourceId(sourceUrl), sourceId('https://github.blog/changelog/copilot-example?utm_campaign=x'));
  assert.throws(() => canonicalUrl('http://github.blog/a'), /HTTPS/);
  assert.throws(() => canonicalUrl('https://127.0.0.1/private'), /not allowlisted/);
});

test('grounded claim validation requires the exact source quote and a checked source', () => {
  const source = sourceRecord();
  const claim = createClaim({ sid: source.id, text: claimText, quote, type: 'feature' });
  assert.deepEqual(validateClaim(claim, source, text), []);
  assert.ok(validateClaim(claim, source, 'Unrelated source text.').some((message) => message.includes('quote does not occur')));
  assert.throws(() => createSource({
    url: sourceUrl, kind: 'changelog', publisher: 'GitHub', title: 'Copilot example',
    published: '2026-10-12', via: 'html', text,
    check: { ok: false, status: 404 },
  }), /successful HTTP link check/);
});

test('viewer citation gate requires grounded claims and a checked source', () => {
  const source = sourceRecord();
  const claim = createClaim({ sid: source.id, text: claimText, quote, type: 'feature' });
  const idx = {
    claimById: new Map([[claim.id, claim]]),
    sourceById: new Map([[source.id, source]]),
  };
  assert.equal(verifiedCitations(idx, `The feature is available.[^${claim.id}]`, [claim.id]), true);
  assert.equal(verifiedCitations(idx, 'The feature is available.', [claim.id]), false);
  assert.equal(verifiedCitations(idx, `The feature is available.[^${claim.id}]`, []), false);
  source.check.ok = false;
  assert.equal(verifiedCitations(idx, `The feature is available.[^${claim.id}]`, [claim.id]), false);
});

test('viewer indexes only items and events with checked source records', () => {
  const source = sourceRecord();
  const item = { id: 'copilot-checked', date: '2026-10-12', url: source.url };
  const snap = {
    taxonomy: { sections: [], areas: [], ides: [], stages: [] },
    items: [item, { ...item, id: 'copilot-unchecked', url: 'https://github.blog/missing/' }],
    events: [{ id: 'checked-event', url: source.url }, { id: 'unchecked-event', url: 'https://github.blog/missing/' }],
    sources: [source], claims: [], asof: '2026-11-05', weeks: {}, months: {}, quarters: {},
  };
  const idx = indexSnapshot(snap);
  assert.deepEqual(idx.items.map((entry) => entry.id), ['copilot-checked']);
  assert.deepEqual(idx.events.map((entry) => entry.id), ['checked-event']);
});

test('Firecrawl adapter returns markdown and preserves page status without logging credentials', async () => {
  const fetchImpl = async (url, options) => {
    assert.equal(url, 'https://api.firecrawl.dev/v2/scrape');
    assert.equal(options.method, 'POST');
    const body = JSON.parse(options.body);
    assert.equal(body.url, 'https://github.blog/changelog/copilot-example');
    return new Response(JSON.stringify({
      success: true,
      data: { markdown: text, metadata: { title: 'Copilot example', sourceURL: body.url, statusCode: 200 } },
    }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  const result = await fetchSource(sourceUrl, { fetchImpl, preferFirecrawl: true });
  assert.equal(result.via, 'firecrawl');
  assert.equal(result.status, 200);
  assert.equal(result.text, text);
});

test('direct fetching rejects a redirect to a different publisher domain', async () => {
  const fetchImpl = async (url) => new Response('', {
    status: 302, headers: { location: 'https://example.org/private' },
  });
  await assert.rejects(fetchSource(sourceUrl, { fetchImpl, curlImpl: null }), /not allowlisted/);
});

test('direct fetching preserves a same-domain redirect trailing slash', async () => {
  const calls = [];
  const fetchImpl = async (url) => {
    calls.push(url);
    if (calls.length === 1) return new Response('', {
      status: 301, headers: { location: `${url}/` },
    });
    return new Response('<html><title>Copilot example</title><body>Verified source text.</body></html>', {
      status: 200, headers: { 'content-type': 'text/html' },
    });
  };
  const result = await fetchSource(sourceUrl, { fetchImpl, curlImpl: null });
  assert.equal(calls.length, 2);
  assert.ok(calls[1].endsWith('/'));
  assert.equal(result.title, 'Copilot example');
});

test('source ledger merges idempotently and rejects accidental rewrites', async (t) => {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'tub-provenance-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const file = path.join(dir, 'sources.json');
  const source = sourceRecord();
  assert.equal(await mergeLedger(file, [source]), 1);
  assert.equal(await mergeLedger(file, [source]), 1);
  assert.equal(await mergeLedger(file, [{ ...source, title: 'Changed title' }]).catch((e) => e.message.includes('explicit refresh')), true);
});

test('strict checker accepts cited summaries and rejects uncited facts and unchecked links', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tub-check-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = sourceRecord();
  const claim = createClaim({ sid: source.id, text: claimText, quote, type: 'feature' });
  const item = {
    id: 'copilot-example', date: source.published, section: 'copilot', url: source.url,
    title: source.title, claims: [claim.id], summary: `${claimText}[^${claim.id}]`,
  };
  const data = {
    sources: { '2026-10': [source] }, claims: { '2026-10': [claim] },
    items: { '2026-10': [item] }, events: [], weeks: {}, months: {}, quarters: {},
  };
  await mkdir(path.join(root, 'data', 'raw'), { recursive: true });
  await writeFile(path.join(root, 'data', 'raw', `${source.id}.md`), text);
  assert.deepEqual((await checkClaims({ root, data })).errors, []);

  item.summary = 'GitHub Copilot Business includes code completion for Java developers.';
  item.links = [{ label: 'More', url: 'https://github.blog/missing/' }];
  const result = await checkClaims({ root, data });
  assert.ok(result.errors.some((entry) => entry.message.includes('uncited factual sentence')));
  assert.ok(result.errors.some((entry) => entry.message.includes('related link has no provenance source record')));
});

test('content writer preserves monthly source and claim ledgers', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tub-content-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = sourceRecord();
  const claim = createClaim({ sid: source.id, text: claimText, quote, type: 'feature' });
  await writeContent(path.join(root, 'content'), {
    taxonomy: { sections: [] }, events: [], items: {},
    sources: { '2026-10': [source] }, claims: { '2026-10': [claim] },
    weeks: {}, months: {}, quarters: {},
  });
  const loaded = await loadContent(root);
  assert.equal(loaded.sources['2026-10'][0].id, source.id);
  assert.equal(loaded.claims['2026-10'][0].id, claim.id);
});

test('edition assembly carries source and claim ledgers forward', async () => {
  const source = sourceRecord();
  const claim = createClaim({ sid: source.id, text: claimText, quote, type: 'feature' });
  const taxonomy = { sections: [] };
  const srcData = {
    taxonomy, items: {}, sources: { '2026-10': [source] }, claims: { '2026-10': [claim] },
    weeks: {}, months: {}, quarters: {}, events: [],
  };
  const base = { taxonomy, items: {}, sources: {}, claims: {}, weeks: {}, months: {}, quarters: {}, events: [] };
  const { next } = await buildEdition({ asof: '2026-11-05', srcData, base });
  assert.deepEqual(next.sources['2026-10'], [source]);
  assert.deepEqual(next.claims['2026-10'], [claim]);
});

test('source ingestion stores provenance metadata without retaining the full source text', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tub-ingest-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const options = {
    root, url: sourceUrl, kind: 'changelog', publisher: 'GitHub', published: '2026-10-12',
  };
  const result = await ingestOne(options, { fetcher: async () => ({ url: sourceUrl, status: 200, title: 'Copilot example', text, via: 'html' }) });
  const source = sourceRecord();
  assert.equal(result.id, source.id);
  assert.equal(JSON.parse(await readFile(path.join(root, 'content', 'sources', '2026-10.json'), 'utf8'))[0].sha256, source.sha256);
  await assert.rejects(readFile(path.join(root, 'data', 'raw', `${source.id}.md`)), { code: 'ENOENT' });
});
