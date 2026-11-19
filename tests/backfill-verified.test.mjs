import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { backfillVerified } from '../tools/backfill-verified.mjs';
import { createClaim, createSource, sourceId, validateClaim } from '../tools/lib/claims.mjs';
import { buildEdition } from '../tools/publish.mjs';

const taxonomy = {
  schema: 1,
  sections: [{ id: 'copilot', name: 'GitHub Copilot', blurb: '', order: 1 }],
  areas: [{ id: 'agents', name: 'Agents' }],
  tiers: [{ id: 'minor', name: 'Also shipped' }],
  tags: ['Improvement'],
  stages: [],
  plans: [],
  ides: [],
  sources: ['changelog'],
};

test('source-backed backfill retains only title claims and source metadata', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tub-backfill-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const stage = path.join(root, 'data', 'staging', 'real');
  await mkdir(path.join(stage, 'content', 'items'), { recursive: true });
  await writeFile(path.join(stage, 'content', 'taxonomy.json'), JSON.stringify(taxonomy));
  await writeFile(path.join(stage, 'content', 'items', '2026-11.json'), JSON.stringify([{
    id: 'copilot-title', date: '2026-11-12', source: 'changelog',
    url: 'https://github.blog/changelog/copilot-example', title: 'Copilot example adds agent support',
    section: 'copilot', area: 'agents', tier: 'headline', tag: 'Improvement',
    summary: 'Unverified staged prose must not be published.',
  }]));
  const events = [{
    id: 'evt-summit', name: 'GitHub Summit', start: '2026-11-10', end: '2026-11-10',
    kind: 'conference', role: 'host', url: 'https://github.com/events/summit',
    evidence: { quote: 'GitHub Summit November 10, 2026', status: 200, via: 'html', checkedAt: '2026-11-12T00:00:00.000Z' },
  }];
  await writeFile(path.join(stage, 'content', 'events.json'), JSON.stringify(events));
  await mkdir(path.join(root, 'content'), { recursive: true });
  await writeFile(path.join(root, 'content', 'taxonomy.json'), JSON.stringify(taxonomy));
  const sourceText = 'GitHub Copilot adds agent support. Copilot example adds agent support.';
  const result = await backfillVerified({
    root, stage, out: path.join(root, 'data', 'staging', 'verified'),
    asof: '2026-11-12',
    fetcher: async (url) => ({ url, status: 200, title: 'Copilot example', text: sourceText, via: 'html' }),
    now: () => '2026-11-12T00:00:00.000Z',
  });
  assert.equal(result.verifiedSources, 1);
  assert.equal(result.verifiedItems, 1);
  assert.equal(result.titleVerifiedItems, 1);
  assert.equal(result.failures, 0);
  assert.deepEqual(result.validationErrors, []);
  assert.deepEqual(result.provenanceErrors, []);
  const published = JSON.parse(await readFile(path.join(root, 'data', 'staging', 'verified', 'content', 'items', '2026-11.json'), 'utf8'));
  assert.equal(published[0].tier, 'minor');
  assert.equal(published[0].summary, undefined);
  assert.equal(published[0].links, undefined);
  assert.equal(published[0].fieldClaims.title.length, 1);
  assert.deepEqual(JSON.parse(await readFile(path.join(root, 'data', 'staging', 'verified', 'content', 'events.json'), 'utf8')), events);
  await assert.rejects(readFile(path.join(root, 'data', 'raw', `${sourceId(published[0].url)}.md`)), { code: 'ENOENT' });
});

test('backfill preserves an already claim-verified item instead of downgrading it', async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tub-preserve-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const stage = path.join(root, 'data', 'staging', 'real');
  await mkdir(path.join(stage, 'content', 'items'), { recursive: true });
  await mkdir(path.join(root, 'content', 'items'), { recursive: true });
  await mkdir(path.join(root, 'content', 'sources'), { recursive: true });
  await mkdir(path.join(root, 'content', 'claims'), { recursive: true });
  await writeFile(path.join(stage, 'content', 'taxonomy.json'), JSON.stringify(taxonomy));
  await writeFile(path.join(stage, 'content', 'items', '2026-10.json'), JSON.stringify([{
    id: 'copilot-title', date: '2026-10-12', source: 'changelog',
    url: 'https://github.blog/changelog/copilot-example', title: 'Copilot example adds agent support',
    section: 'copilot', area: 'agents', tier: 'headline', tag: 'Improvement',
    summary: 'Unverified staged prose must not replace verified content.',
  }]));
  await writeFile(path.join(stage, 'content', 'events.json'), '[]');
  await writeFile(path.join(root, 'content', 'taxonomy.json'), JSON.stringify(taxonomy));
  await writeFile(path.join(root, 'content', 'events.json'), '[]');

  const url = 'https://github.blog/changelog/copilot-example';
  const text = 'GitHub Copilot adds agent support. Copilot example adds agent support.';
  const source = createSource({
    url, kind: 'changelog', publisher: 'GitHub', title: 'Copilot example',
    published: '2026-10-12', via: 'html', text,
    check: { ok: true, status: 200, at: '2026-11-05T00:00:00.000Z' },
  });
  const summaryClaim = createClaim({
    sid: source.id, text: 'GitHub Copilot adds agent support.',
    quote: 'GitHub Copilot adds agent support.', type: 'feature',
    verifiedAt: '2026-11-05T00:00:00.000Z',
  });
  const titleClaim = createClaim({
    sid: source.id, text: 'A published update is titled "Copilot example adds agent support".',
    quote: 'Copilot example adds agent support.', type: 'change',
    verifiedAt: '2026-11-05T00:00:00.000Z',
  });
  const item = {
    id: 'copilot-title', date: '2026-10-12', source: 'changelog', url,
    title: 'Copilot example adds agent support', section: 'copilot', area: 'agents',
    tier: 'minor', tag: 'Improvement', claims: [summaryClaim.id, titleClaim.id],
    fieldClaims: { title: [titleClaim.id] },
    summary: `GitHub Copilot adds agent support.[^${summaryClaim.id}]`,
  };
  await writeFile(path.join(root, 'content', 'items', '2026-10.json'), JSON.stringify([item]));
  await writeFile(path.join(root, 'content', 'sources', '2026-10.json'), JSON.stringify([source]));
  await writeFile(path.join(root, 'content', 'claims', '2026-10.json'), JSON.stringify([summaryClaim, titleClaim]));

  const out = path.join(root, 'data', 'staging', 'verified');
  const result = await backfillVerified({
    root, stage, out,
    fetcher: async (target) => ({ url: target, status: 200, title: 'Copilot example', text, via: 'html' }),
    now: () => '2026-11-05T00:00:00.000Z',
  });
  assert.equal(result.titleVerifiedItems, 0);
  assert.equal(result.verifiedItems, 1);
  assert.deepEqual(result.validationErrors, []);
  assert.deepEqual(result.provenanceErrors, []);
  const [preserved] = JSON.parse(await readFile(path.join(out, 'content', 'items', '2026-10.json'), 'utf8'));
  assert.equal(preserved.summary, item.summary);
  assert.deepEqual(preserved.claims, item.claims);
});

test('claim quotes are matched to fetched source text at creation', () => {
  const source = {
    id: 's-29b3350fcf5d', url: 'https://github.blog/changelog/copilot-example',
    published: '2026-10-12', check: { ok: true },
    title: 'Copilot example',
  };
  const claim = createClaim({
    sid: source.id,
    text: 'A published update is titled "Copilot example adds agent support".',
    quote: 'GitHub Copilot adds agent support. Copilot example adds agent support.',
    type: 'change',
  });
  assert.deepEqual(validateClaim(claim, source, 'GitHub Copilot adds agent support. Copilot example adds agent support.'), []);
  assert.ok(validateClaim(claim, source, 'Unrelated source text.').some((message) => message.includes('quote does not occur')));
});

test('backdated editions exclude source and claim records published after their as-of date', async () => {
  const source = {
    id: 's-29b3350fcf5d', url: 'https://github.blog/changelog/copilot-example',
    published: '2026-11-05', check: { ok: true },
  };
  const claim = { id: 'c-0000000000', sid: source.id };
  const taxonomyData = taxonomy;
  const srcData = {
    taxonomy: taxonomyData, items: {}, sources: { '2026-11': [source] }, claims: { '2026-11': [claim] },
    weeks: {}, months: {}, quarters: {}, events: [],
  };
  const base = { taxonomy: taxonomyData, items: {}, sources: {}, claims: {}, weeks: {}, months: {}, quarters: {}, events: [] };
  const { next } = await buildEdition({ asof: '2026-10-29', srcData, base });
  assert.deepEqual(next.sources, {});
  assert.deepEqual(next.claims, {});
});
