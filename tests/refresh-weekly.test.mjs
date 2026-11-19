import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { dueEdition, refreshWeekly } from '../tools/refresh-weekly.mjs';
import { verifyEvents } from '../tools/verify-events.mjs';
import { loadVerifiedEvents } from '../tools/lib/raw.mjs';

test('weekly refresh is due on its edition date and catches up missed weeks', () => {
  assert.equal(dueEdition('2026-11-12', '2026-11-05'), '2026-11-12');
  assert.equal(dueEdition('2026-11-19', '2026-11-05'), '2026-11-19');
});

test('weekly refresh does not republish a completed edition later in the same week', () => {
  assert.equal(dueEdition('2026-11-14', '2026-11-12'), null);
});

test('weekly refresh rejects invalid dates', () => {
  assert.throws(() => dueEdition('2026-02-30', '2026-02-26'), /Invalid date/);
});

test('refresh verifies events before assembly and publishes title-only verified staging', () => {
  let verifiedEvents = false;
  let verifiedTitles = false;
  let published = false;
  refreshWeekly('2026-11-05', '2026-11-12', ([script, ...args]) => {
    if (script === 'tools/verify-events.mjs') verifiedEvents = true;
    if (script === 'tools/assemble.mjs') assert.ok(verifiedEvents, 'assembly must consume verified event evidence');
    if (script === 'tools/backfill-verified.mjs') verifiedTitles = true;
    assert.notEqual(script, 'tools/enrich-ledes.mjs', 'scheduled refresh must not add summaries to uncurated items');
    if (script === 'tools/build-editions.mjs') {
      assert.ok(verifiedTitles);
      assert.ok(args.includes('--src=data/staging/verified/content'));
      assert.ok(args.includes('--resume'));
      assert.ok(!args.includes('--reset'));
      published = true;
    }
  });
  assert.ok(published);
});

test('refresh stops before publication when any prerequisite fails', () => {
  for (const failure of ['tools/harvest.mjs', 'tools/verify-events.mjs', 'tools/assemble.mjs', 'tools/backfill-verified.mjs']) {
    const calls = [];
    assert.throws(() => refreshWeekly('2026-11-05', '2026-11-12', ([script]) => {
      calls.push(script);
      if (script === failure) throw new Error('source or validation failure');
    }), /source or validation failure/);
    assert.equal(calls.at(-1), failure);
    assert.ok(!calls.includes('tools/build-editions.mjs'));
  }
});

async function eventFixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'tub-events-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const extra = path.join(root, 'data', 'staging', 'extra');
  await mkdir(extra, { recursive: true });
  const seed = {
    id: 'evt-seed', name: 'GitHub Seed Summit', start: '2026-11-10', end: '2026-11-10',
    kind: 'conference', role: 'host', url: 'https://github.com/events/seed',
  };
  const research = { ...seed, id: 'evt-research', name: 'GitHub Research Summit', url: 'https://github.com/events/research' };
  await writeFile(path.join(extra, 'events.seed.json'), JSON.stringify([seed]));
  await writeFile(path.join(extra, 'events.research.json'), JSON.stringify([research]));
  return { root, extra, seed, research };
}

test('verified assembly input includes evidence for seed and research events and excludes unsupported listings', async (t) => {
  const { root, extra, seed, research } = await eventFixture(t);
  const unsupported = { ...research, id: 'evt-unsupported', url: 'https://github.com/events/unsupported' };
  await writeFile(path.join(extra, 'events.research.json'), JSON.stringify([research, unsupported]));
  const result = await verifyEvents({
    root,
    fetcher: async (url) => ({
      url, status: 200, via: 'html', title: 'Events',
      text: url === unsupported.url ? 'Registration closed.' : 'GitHub Seed Summit November 10, 2026. GitHub Research Summit November 10, 2026.',
    }),
  });
  assert.equal(result.kept, 2);
  assert.equal(result.dropped[0].id, unsupported.id);
  const events = await loadVerifiedEvents(root);
  assert.deepEqual(new Set(events.map((event) => event.id)), new Set([seed.id, research.id]));
  assert.ok(events.every((event) => event.evidence.quote.includes('November 10, 2026')));
});

test('events whose source fails approved-source policy are excluded and reported, not published', async (t) => {
  const { root, research } = await eventFixture(t);
  const policy = new AggregateError([new Error('Source host "luma.com" is not allowlisted.'), new Error('Source host "luma.com" is not allowlisted.')], 'Direct source fetch failed.');
  const result = await verifyEvents({
    root,
    fetcher: async (url) => {
      if (url === research.url) throw policy;
      return { url, status: 200, via: 'html', title: 'Events', text: 'GitHub Seed Summit November 10, 2026.' };
    },
  });
  assert.equal(result.kept, 1);
  assert.equal(result.dropped[0].id, research.id);
  assert.match(result.dropped[0].reason, /not allowlisted/);
  assert.deepEqual((await loadVerifiedEvents(root)).map((event) => event.id), ['evt-seed']);
  const mixed = new AggregateError([new Error('Source host "luma.com" is not allowlisted.'), new Error('socket hang up')], 'Direct source fetch failed.');
  await assert.rejects(verifyEvents({ root, fetcher: async () => { throw mixed; } }), /Event verification failed/);
});

test('past events keep earlier evidence when their page stops listing them; upcoming ones must re-verify', async (t) => {
  const { root, extra, seed, research } = await eventFixture(t);
  const verified = (e) => ({ ...e, evidence: { quote: `${e.name} November 10, 2026`, status: 200, via: 'html', checkedAt: '2026-11-01T00:00:00Z' } });
  const upcoming = { ...research, id: 'evt-upcoming', start: '2026-12-01', end: '2026-12-01' };
  await writeFile(path.join(extra, 'events.research.json'), JSON.stringify([research, upcoming]));
  await writeFile(path.join(extra, 'events.verified.json'), JSON.stringify([verified(seed), verified(research), verified(upcoming)]));
  const result = await verifyEvents({ root, today: '2026-11-19', fetcher: async (url) => ({ url, status: 200, via: 'html', title: 'Events', text: 'No upcoming events.' }) });
  assert.deepEqual(result.retained.map((r) => r.id).sort(), [research.id, seed.id]);
  assert.deepEqual(result.dropped.map((r) => r.id), [upcoming.id]);
  const events = await loadVerifiedEvents(root);
  assert.equal(events.find((e) => e.id === seed.id).evidence.checkedAt, '2026-11-01T00:00:00Z');
});

test('event fetch failures preserve the previous verified output', async (t) => {
  const { root, extra } = await eventFixture(t);
  const output = path.join(extra, 'events.verified.json');
  const prior = '[{"id":"previous-evidence"}]\n';
  await writeFile(output, prior);
  for (const fetcher of [
    async () => { throw new Error('timeout'); },
    async () => ({ status: 503 }),
  ]) {
    await assert.rejects(verifyEvents({ root, fetcher }), /Event verification failed/);
    assert.equal(await readFile(output, 'utf8'), prior);
  }
});

test('missing verified evidence and corrupt registry JSON fail closed', async (t) => {
  const { root, extra } = await eventFixture(t);
  await assert.rejects(loadVerifiedEvents(root), { code: 'ENOENT' });
  await writeFile(path.join(extra, 'events.verified.json'), 'broken JSON');
  await assert.rejects(loadVerifiedEvents(root), SyntaxError);
  await writeFile(path.join(extra, 'events.research.json'), 'broken JSON');
  await assert.rejects(verifyEvents({ root, fetcher: async () => assert.fail('must not fetch malformed input') }), SyntaxError);
});
