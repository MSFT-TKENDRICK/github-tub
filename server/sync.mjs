// Pulls editions published by the GitHub Actions weekly refresh into the local checkout the canvas reads.
// Fast-forward only: local commits or conflicting local edits are never overwritten; the sync just reports and stops.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(execFile);

async function gitRunner(cwd, args) {
  const { stdout } = await exec('git', args, { cwd, windowsHide: true, timeout: 120000 });
  return stdout.trim();
}

export async function syncFromOrigin(cwd, { git = (args) => gitRunner(cwd, args), branch = 'main' } = {}) {
  const remotes = (await git(['remote'])).split(/\r?\n/).filter(Boolean);
  if (!remotes.includes('origin')) return { status: 'no-remote' };
  if ((await git(['branch', '--show-current'])) !== branch) return { status: 'skipped', reason: `checkout is not on ${branch}` };
  await git(['fetch', '--quiet', '--tags', 'origin', branch]);
  const head = await git(['rev-parse', 'HEAD']);
  const remote = await git(['rev-parse', `origin/${branch}`]);
  if (head === remote) return { status: 'up-to-date', head };
  const isAncestor = async (a, b) => { try { await git(['merge-base', '--is-ancestor', a, b]); return true; } catch { return false; } };
  if (await isAncestor(remote, head)) return { status: 'ahead', head, remote };
  if (!(await isAncestor(head, remote))) return { status: 'diverged', head, remote };
  try {
    await git(['merge', '--ff-only', '--quiet', `origin/${branch}`]);
  } catch (error) {
    return { status: 'blocked', reason: String(error.stderr || error.message).trim().slice(0, 400), head, remote };
  }
  return { status: 'updated', from: head, to: remote };
}
