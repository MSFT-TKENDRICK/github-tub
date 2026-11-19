import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp, listen } from '../server/app.mjs';
import {
  InputError, canvasUrl, mergeNavigation, navigateEvent, pageId, parseNavigation, resolveNavigation, statusLine, summarize,
} from '../server/canvas.mjs';
import { createClaim, createSource } from '../tools/lib/claims.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const quote = 'GitHub Copilot Business includes code completion for Java developers.';

// One edition in working mode (temp dir, no git), as of 2026-10-15, with a single headline item on 2026-10-12.
async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tub-canvas-'));
  const content = path.join(root, 'content');
  const source = createSource({
    url: 'https://github.blog/changelog/copilot-example/', kind: 'changelog', publisher: 'GitHub',
    title: 'Copilot example', published: '2026-10-12', via: 'html', text: quote,
    check: { ok: true, status: 200, at: '2026-11-05T00:00:00.000Z' },
  });
  const claim = createClaim({ sid: source.id, text: quote, quote, type: 'feature' });
  const item = {
    id: 'copilot-example', date: source.published, section: 'copilot', area: 'copilot', tag: 'Release',
    tier: 'headline', source: 'changelog', title: source.title, url: source.url,
    claims: [claim.id], summary: `${quote}[^${claim.id}]`,
  };
  for (const dir of ['items', 'sources', 'claims']) await mkdir(path.join(content, dir), { recursive: true });
  await writeFile(path.join(content, 'taxonomy.json'), JSON.stringify({
    sections: [{ id: 'copilot', name: 'GitHub Copilot', order: 0 }],
    areas: [{ id: 'copilot', name: 'GitHub Copilot' }], ides: [], stages: [],
  }));
  await writeFile(path.join(content, 'items', '2026-10.json'), JSON.stringify([item]));
  await writeFile(path.join(content, 'sources', '2026-10.json'), JSON.stringify([source]));
  await writeFile(path.join(content, 'claims', '2026-10.json'), JSON.stringify([claim]));
  const app = createApp({ codeRoot: ROOT, repoRoot: root, contentDir: content });
  t.after(async () => {
    app.close();
    await rm(root, { recursive: true, force: true });
  });
  return app;
}

async function serve(t, app) {
  const { server, url } = await listen(app);
  t.after(() => new Promise((resolve) => { server.closeAllConnections?.(); server.close(resolve); }));
  return { url, origin: new URL(url).origin };
}

test('pageId keeps safe instance ids and hashes anything else to a stable token', () => {
  assert.equal(pageId('foundry-briefing_1.a'), 'foundry-briefing_1.a');
  const hashed = pageId('my panel / with spaces');
  assert.match(hashed, /^c[0-9a-f]{16}$/);
  assert.equal(pageId('my panel / with spaces'), hashed);
  assert.notEqual(pageId('-leading-dash'), '-leading-dash');
  assert.match(pageId(''), /^c[0-9a-f]{16}$/);
  assert.match(pageId('x'.repeat(129)), /^c[0-9a-f]{16}$/);
});

test('parseNavigation infers views from keys and rejects ambiguous or unreal input', () => {
  assert.deepEqual(parseNavigation(null), {});
  assert.deepEqual(parseNavigation(undefined), {});
  assert.deepEqual(parseNavigation({ key: '2026' }), { key: '2026', view: 'year' });
  assert.deepEqual(parseNavigation({ key: '2026-10' }), { key: '2026-10', view: 'month' });
  assert.deepEqual(parseNavigation({ key: '2026-10-12' }), { key: '2026-10-12', view: 'week' });
  assert.deepEqual(parseNavigation({ view: 'month' }), { view: 'month' });
  assert.deepEqual(parseNavigation({ sections: ['copilot', 'copilot', 'vscode'], q: '  agent mode  ' }), { sections: ['copilot', 'vscode'], q: 'agent mode' });

  const bad = [
    ['a string', 'abc'], ['an array', []], ['unknown field', { foo: 1 }], ['present without allowPresent', { present: 2 }],
    ['view/key mismatch', { view: 'week', key: '2026-10' }], ['Feb 30', { key: '2026-02-30' }], ['month 13', { key: '2026-13' }],
    ['bad view', { view: 'day' }], ['bad edition', { edition: 'main branch' }], ['bad section', { sections: ['Copilot'] }],
    ['too many sections', { sections: Array.from({ length: 13 }, (_, i) => `s${i}`) }], ['long q', { q: 'x'.repeat(201) }],
  ];
  for (const [label, input] of bad) assert.throws(() => parseNavigation(input), InputError, label);

  assert.deepEqual(parseNavigation({ present: 3 }, { allowPresent: true }), { present: 3 });
  for (const present of [0, -1, 1.5, '2']) assert.throws(() => parseNavigation({ present }, { allowPresent: true }), InputError);
});

test('canvasUrl carries the page id and a hash route the page understands', () => {
  const nav = { ref: 'tub-2026-10-29', view: 'month', key: '2026-10', sections: ['vscode', 'copilot'], q: 'agent', present: 2 };
  assert.equal(
    canvasUrl('http://127.0.0.1:5000/', 'p1', nav),
    'http://127.0.0.1:5000/?i=p1#/month/2026-10?ref=tub-2026-10-29&s=copilot,vscode&q=agent&present=2',
  );
  assert.equal(canvasUrl('http://127.0.0.1:5000/', 'p1', { ref: 'main', view: 'week', key: '2026-10-15', sections: [] }), 'http://127.0.0.1:5000/?i=p1#/week/2026-10-15');
  assert.deepEqual(navigateEvent({ ref: 'main', view: 'year', key: '2026', sections: [] }), {
    type: 'navigate', ref: 'main', view: 'year', key: '2026', sections: [], q: '', present: null,
  });
});

test('resolveNavigation resolves editions and periods against real content', async (t) => {
  const app = await fixture(t);
  const store = app.store;

  const latest = await resolveNavigation(store, {});
  assert.deepEqual(latest.nav, { ref: 'main', view: 'week', key: '2026-10-15', sections: [], q: '', present: null });
  assert.equal(latest.edition.asof, '2026-10-15');
  assert.equal(latest.edition.edition, 42);

  assert.equal((await resolveNavigation(store, { view: 'month', key: '2026-10' })).nav.key, '2026-10');
  assert.equal((await resolveNavigation(store, { view: 'year' })).nav.key, '2026');
  assert.equal((await resolveNavigation(store, { view: 'week', key: '2026-10-12' })).nav.key, '2026-10-15', 'a day snaps to its edition week');
  assert.equal((await resolveNavigation(store, { edition: 'latest' })).nav.ref, 'main');
  assert.deepEqual((await resolveNavigation(store, { sections: ['copilot'] })).nav.sections, ['copilot']);

  const rejects = [
    ['month with no content', { view: 'month', key: '2026-03' }],
    ['week after the edition', { view: 'week', key: '2027-01-01' }],
    ['week before the year', { view: 'week', key: '2025-12-01' }],
    ['year not covered', { view: 'year', key: '2025' }],
    ['unknown chapter', { sections: ['security'] }],
    ['edition before any', { edition: 'tub-1999-01-01' }],
    ['nonsense edition', { edition: 'nonsense' }],
  ];
  for (const [label, nav] of rejects) await assert.rejects(resolveNavigation(store, nav), InputError, label);
});

test('mergeNavigation keeps the current panel state and retargets view changes', async (t) => {
  const app = await fixture(t);
  const current = { ref: 'main', view: 'month', key: '2026-10', sections: ['copilot'], q: 'java', present: null };

  const toWeek = await resolveNavigation(app.store, mergeNavigation(current, parseNavigation({ view: 'week' })));
  assert.deepEqual(toWeek.nav, { ref: 'main', view: 'week', key: '2026-10-15', sections: ['copilot'], q: 'java', present: null });
  const toYear = await resolveNavigation(app.store, mergeNavigation(current, parseNavigation({ view: 'year' })));
  assert.equal(toYear.nav.key, '2026');

  const cleared = mergeNavigation(current, parseNavigation({ sections: [], q: '' }));
  assert.deepEqual(cleared.sections, []);
  assert.equal(cleared.q, '');
  assert.equal(mergeNavigation(current, parseNavigation({ key: '2026' })).from, undefined, 'an explicit key is not retargeted');
  assert.deepEqual(mergeNavigation(null, { view: 'year' }), { view: 'year' });
  // A corrupted report never smuggles an invalid edition or chapter through.
  const merged = mergeNavigation({ ref: '../etc', view: 'week', key: 'x', sections: ['ok', 'BAD', 3] }, {});
  assert.equal(merged.edition, undefined);
  assert.deepEqual(merged.sections, ['ok']);
});

test('summarize reports counts, slides and search hits for the shown view', async (t) => {
  const app = await fixture(t);
  const week = summarize(await resolveNavigation(app.store, {}));
  assert.equal(week.edition, 42);
  assert.equal(week.ref, 'main');
  assert.equal(week.view, 'week');
  assert.equal(week.range.end, '2026-10-15');
  assert.ok(week.range.start <= '2026-10-12');
  assert.equal(week.items, 1);
  assert.equal(week.headline, 1);
  assert.equal(week.sections, 'all');
  assert.equal(week.search, null);
  assert.ok(week.slides >= 1);
  assert.deepEqual(week.chapters, [{ id: 'copilot', name: 'GitHub Copilot', items: 1 }]);

  const month = summarize(await resolveNavigation(app.store, { view: 'month', key: '2026-10', sections: ['copilot'], q: 'java copilot' }));
  assert.equal(month.period, 'October 2026');
  assert.deepEqual(month.sections, ['copilot']);
  assert.deepEqual(month.search, { query: 'java copilot', results: 1 });
  assert.equal(summarize(await resolveNavigation(app.store, { q: 'kubernetes' })).search.results, 0);

  assert.equal(statusLine(month, 3), 'Edition 42 · as of 2026-10-15 · October 2026 · 3 editions');
  assert.equal(statusLine(month, 1), 'Edition 42 · as of 2026-10-15 · October 2026 · 1 edition');
  assert.equal(statusLine(month, 0), 'Edition 42 · as of 2026-10-15 · October 2026');
});

test('state reports are same-origin only and keep a validated copy per panel', async (t) => {
  const app = await fixture(t);
  const { url, origin } = await serve(t, app);
  const post = (body, headers = { Origin: origin }) => fetch(new URL('/api/state', url), {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body,
  });

  assert.equal((await post('{}', {})).status, 403);
  assert.equal((await post('{}', { Origin: 'http://evil.example' })).status, 403);
  assert.equal((await post('{}', { 'Sec-Fetch-Site': 'cross-site' })).status, 403);
  assert.equal((await post('not json')).status, 400);
  assert.equal((await post('null')).status, 400);

  const report = { i: 'p1', ref: 'main', view: 'month', key: '2026-10', sections: ['copilot', 7], q: 'java', present: 3 };
  assert.equal((await post(JSON.stringify(report))).status, 204);
  const saved = app.getState('p1');
  assert.deepEqual({ ...saved, at: 0 }, { ref: 'main', view: 'month', key: '2026-10', q: 'java', sections: ['copilot'], present: 3, at: 0 });
  assert.ok(saved.at > 0);

  assert.equal((await post(JSON.stringify({ ...report, present: 1.5 }), { 'Sec-Fetch-Site': 'same-origin' })).status, 204);
  assert.equal(app.getState('p1').present, null);
  assert.equal(app.getState('unknown'), null);
});

test('export tokens accept a same-origin fetch with no Origin header and refuse cross-site ones', async (t) => {
  const app = await fixture(t);
  const { url } = await serve(t, app);
  const token = (headers) => fetch(new URL('/api/export-token', url), { headers });
  assert.equal((await token({ 'Sec-Fetch-Site': 'cross-site' })).status, 403);
  assert.equal((await token({ 'Sec-Fetch-Site': 'same-site' })).status, 403);
  const ok = await token({ 'Sec-Fetch-Site': 'same-origin' });
  assert.equal(ok.status, 200);
  assert.match((await ok.json()).token, /^[0-9a-f]{64}$/);
});

test('the event stream tracks connected panels and delivers navigate events to the right one', async (t) => {
  const app = await fixture(t);
  const { url } = await serve(t, app);
  const controller = new AbortController();
  t.after(() => controller.abort());
  const res = await fetch(new URL('/api/events?i=p1', url), { signal: controller.signal });
  assert.equal(res.status, 200);
  assert.match(res.headers.get('content-type'), /text\/event-stream/);
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  const until = async (pattern) => {
    while (!pattern.test(buffer)) {
      const { value, done } = await reader.read();
      if (done) throw new Error(`stream ended before ${pattern}`);
      buffer += decoder.decode(value, { stream: true });
    }
  };
  await until(/retry: 2000/);

  assert.equal(app.clients('p1'), 1);
  assert.equal(app.clients('p2'), 0);
  assert.equal(app.broadcast('p2', { type: 'refresh' }), 0, 'other panels are not reached');
  const event = navigateEvent({ ref: 'main', view: 'year', key: '2026', sections: [] });
  assert.equal(app.broadcast('p1', event), 1);
  await until(/data: .*\n\n/);
  assert.deepEqual(JSON.parse(buffer.match(/data: (.*)\n\n/)[1]), event);

  controller.abort();
  await reader.cancel().catch(() => {});
  for (let i = 0; i < 50 && app.clients('p1'); i += 1) await new Promise((r) => setTimeout(r, 20));
  assert.equal(app.clients('p1'), 0);
});

test('exportPptx renders one deck at a time and rejects unknown editions', async (t) => {
  const app = await fixture(t);
  const first = app.exportPptx({ ref: 'working', view: 'month', key: '2026-10', sections: [] });
  await assert.rejects(app.exportPptx({ ref: 'working', view: 'month', key: '2026-10', sections: [] }), (err) => err.status === 429);
  const { pptx, fileName } = await first;
  assert.ok(pptx.length > 10_000);
  assert.equal(pptx.subarray(0, 2).toString(), 'PK');
  assert.match(fileName, /\.pptx$/);
  await assert.rejects(app.exportPptx({ ref: 'tub-1999-01-01', view: 'month', key: '2026-10', sections: [] }), (err) => err.status === 404 || err.status === 400);
  await assert.rejects(app.exportPptx({ ref: '../../etc', view: 'month', key: '2026-10', sections: [] }), (err) => err.status === 400);
});
