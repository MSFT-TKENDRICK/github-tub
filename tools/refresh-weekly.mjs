#!/usr/bin/env node
// Refreshes verified title/source records and publishes all missing weekly editions through the latest date.
//   node tools/refresh-weekly.mjs [--dry] [--asof=YYYY-MM-DD]
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDate } from '../web/js/periods.mjs';
import { latestEdition } from './publish.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function dueEdition(today, latestPublished) {
  if (!isDate(today)) throw new Error(`Invalid date "${today}".`);
  const due = latestEdition(today);
  return latestPublished && due <= latestPublished ? null : due;
}

function run(args) {
  execFileSync(process.execPath, args, { cwd: ROOT, stdio: 'inherit' });
}

export function refreshWeekly(latestPublished, target, runCommand = run) {
  const commands = [
    ['tools/harvest.mjs', `--since=${latestPublished}`, `--until=${target}`],
    ['tools/verify-events.mjs'],
    ['tools/assemble.mjs', `--until=${target}`],
    ['tools/backfill-verified.mjs', '--stage=data/staging/full', '--out=data/staging/verified', `--asof=${target}`],
    ['tools/build-editions.mjs', '--resume', `--until=${target}`, '--src=data/staging/verified/content'],
  ];
  for (const args of commands) runCommand(args);
}

function git(args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trim();
}

const options = Object.fromEntries(process.argv.slice(2).map((arg) => {
  const match = arg.match(/^--([^=]+)(?:=(.*))?$/);
  return match ? [match[1], match[2] ?? true] : [arg, true];
}));

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const now = new Date();
    const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    const today = options.asof || localToday;
    const tags = git(['tag', '--list', 'tub-2026-*'])
      .split(/\r?\n/)
      .filter((tag) => /^tub-\d{4}-\d{2}-\d{2}$/.test(tag))
      .map((tag) => tag.slice(4))
      .sort();
    const latestPublished = tags.at(-1);
    if (!latestPublished) throw new Error('No dated TUB edition tag exists; publish the initial edition first.');
    const target = dueEdition(today, latestPublished);
    if (!target) {
      process.stdout.write(`No new edition is due; latest is tub-${latestPublished}.\n`);
    } else {
      if (git(['branch', '--show-current']) !== 'main') throw new Error('Weekly refresh must run on the main branch.');
      const dirtyContent = git(['status', '--porcelain', '--', 'content']);
      if (dirtyContent) throw new Error(`Content has local changes; refusing to publish:\n${dirtyContent}`);
      if (options.dry) {
        process.stdout.write(`Would refresh from ${latestPublished} through ${target}:\n`);
        refreshWeekly(latestPublished, target, (args) => process.stdout.write(`  node ${args.join(' ')}\n`));
      } else {
        refreshWeekly(latestPublished, target);
      }
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
