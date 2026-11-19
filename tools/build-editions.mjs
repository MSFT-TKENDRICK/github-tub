#!/usr/bin/env node
// Backfills (or rebuilds) every weekly edition from 2026-01-01 up to --until, one dated + tagged commit each.
//   node tools/build-editions.mjs [--until=YYYY-MM-DD] [--src=data/staging/full/content] [--resume] [--reset]
//
// --reset rewinds main to the commit tagged `tub-base` (the scaffold), carries over any tooling changes made
// since, and rebuilds all editions. The previous head is kept at refs/backup/tub-pre-reset.
// --resume skips existing edition tags and prunes the current snapshot before the first missing edition.
import path from 'node:path';
import { ROOT } from './lib/raw.mjs';
import { publish, runGit, latestEdition, TRAILER } from './publish.mjs';
import { YEAR_START, editionDates } from '../web/js/periods.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const latest = latestEdition(today);
const until = args.until || latest;
const src = args.src ? path.resolve(args.src) : path.join(ROOT, 'data', 'staging', 'full', 'content');

const existing = new Set(runGit(['tag', '-l', 'tub-2*']).split('\n').filter(Boolean));
if (existing.size && !args.reset && !args.resume) { console.error(`${existing.size} edition tag(s) already exist. Use --resume to skip them, or --reset to rebuild everything.`); process.exit(1); }

if (args.reset) {
  if (!runGit(['tag', '-l', 'tub-base'])) { console.error('tag tub-base (the scaffold commit) is missing; cannot reset'); process.exit(1); }
  const dirty = runGit(['status', '--porcelain', '--', '.', ':(exclude)content']);
  if (dirty) { console.error(`commit or stash your changes first:\n${dirty}`); process.exit(1); }
  const old = runGit(['rev-parse', 'HEAD']);
  runGit(['update-ref', 'refs/backup/tub-pre-reset', old]);
  for (const t of existing) runGit(['tag', '-d', t]);
  runGit(['reset', '--hard', '-q', 'tub-base']);
  runGit(['checkout', old, '--', '.', ':(exclude)content']);
  runGit(['add', '-A']);
  if (runGit(['diff', '--cached', '--quiet'], { allowFail: true }) === null) {
    runGit(['commit', '-q', '-m', 'Carry over tooling changes made since the scaffold commit', '-m', TRAILER]);
  }
  console.log(`rewound to tub-base (previous head ${old.slice(0, 8)} kept at refs/backup/tub-pre-reset)`);
}

const dates = editionDates(YEAR_START, until);
console.log(`building ${dates.length} edition(s): ${dates[0]} → ${dates.at(-1)}${dates.at(-1) === latest ? ' (latest is live)' : ''}`);
const started = Date.now();
let hasPriorEdition = false;
for (const asof of dates) {
  const tag = `tub-${asof}`;
  if (args.resume && existing.has(tag)) {
    hasPriorEdition = true;
    console.log(`  skip ${tag} (already exists)`);
    continue;
  }
  const r = await publish({
    asof, src, backdate: true, live: asof === latest, quiet: true,
    prune: Boolean(args.resume) && !hasPriorEdition,
  });
  hasPriorEdition = true;
  const tiers = Object.entries(r.addedByTier).map(([t, n]) => `${n}${t[0]}`).join(' ');
  const n = r.narratives;
  console.log(`  ${String(r.edition).padStart(2)}  ${asof}  +${String(r.added).padStart(3)} items ${tiers.padEnd(14)} narr w${n.weeks} m${n.months} q${n.quarters}  events +${r.events}  warn ${r.warnings}  ${r.commit}`);
}
console.log(`done in ${((Date.now() - started) / 1000).toFixed(0)}s · ${runGit(['rev-list', '--count', 'HEAD'])} commits on ${runGit(['rev-parse', '--abbrev-ref', 'HEAD'])}`);
