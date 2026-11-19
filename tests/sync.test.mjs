import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { syncFromOrigin } from '../server/sync.mjs';

const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const ID = ['-c', 'user.name=t', '-c', 'user.email=t@example.com'];

async function repos(t) {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'tub-sync-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const origin = path.join(dir, 'origin.git');
  git(dir, 'init', '--bare', '-q', '-b', 'main', origin);
  const ci = path.join(dir, 'ci');
  git(dir, 'clone', '-q', origin, ci);
  git(ci, 'checkout', '-q', '-b', 'main');
  await writeFile(path.join(ci, 'a.txt'), 'one\n');
  git(ci, 'add', '.'); git(ci, ...ID, 'commit', '-q', '-m', 'one'); git(ci, 'push', '-q', 'origin', 'main');
  const local = path.join(dir, 'local');
  git(dir, 'clone', '-q', origin, local);
  return { ci, local };
}

test('sync fast-forwards to editions published on origin, including tags', async (t) => {
  const { ci, local } = await repos(t);
  assert.equal((await syncFromOrigin(local)).status, 'up-to-date');
  await writeFile(path.join(ci, 'a.txt'), 'two\n');
  git(ci, ...ID, 'commit', '-q', '-am', 'edition'); git(ci, ...ID, 'tag', '-a', 'tub-2026-11-12', '-m', 'e');
  git(ci, 'push', '-q', 'origin', 'main', '--tags');
  const result = await syncFromOrigin(local);
  assert.equal(result.status, 'updated');
  assert.equal(git(local, 'rev-parse', 'HEAD'), git(ci, 'rev-parse', 'HEAD'));
  assert.equal(git(local, 'tag', '--list', 'tub-*'), 'tub-2026-11-12');
});

test('sync never overwrites diverged local history', async (t) => {
  const { ci, local } = await repos(t);
  await writeFile(path.join(ci, 'a.txt'), 'remote\n');
  git(ci, ...ID, 'commit', '-q', '-am', 'remote'); git(ci, 'push', '-q', 'origin', 'main');
  await writeFile(path.join(local, 'a.txt'), 'local\n');
  git(local, ...ID, 'commit', '-q', '-am', 'local');
  const before = git(local, 'rev-parse', 'HEAD');
  assert.equal((await syncFromOrigin(local)).status, 'diverged');
  assert.equal(git(local, 'rev-parse', 'HEAD'), before);
});
