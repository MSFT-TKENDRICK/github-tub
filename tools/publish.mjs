#!/usr/bin/env node
// Publishes one weekly edition of the briefing: upserts content for the as-of date, validates the result,
// writes content/ and records it as a dated, tagged commit on the current branch (main).
//
//   node tools/publish.mjs --asof=YYYY-MM-DD [--src=data/staging/full/content] [--live] [--backdate]
//                          [--update-existing] [--prune] [--no-git] [--dry] [--quiet]
//
// Edition semantics (shared with the viewer through web/js/periods.mjs):
//   * an edition is dated on a Thursday (2026-01-01 + 7n) and contains every item dated on or before it;
//   * content that was published in an earlier edition is immutable unless --update-existing / --prune;
//   * week narratives are published with their edition, month / quarter narratives only once the period
//     has closed (end < as-of);
//   * events appear on/after their start date; --live also announces events starting within 90 days.
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './lib/raw.mjs';
import { validate, loadContent } from './validate.mjs';
import { writeContent, sortItems } from './lib/content-io.mjs';
import { YEAR_START, addDays, diffDays, isDate, monthOf, monthRange, quarterRange, weekRange, longDate, rangeLabel } from '../web/js/periods.mjs';

export const TRAILER = 'Co-authored-by: Copilot App <223556219+Copilot@users.noreply.github.com>';
export const LIVE_HORIZON_DAYS = 90;

const sameJson = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export function editionNumber(asof) { return diffDays(asof, YEAR_START) / 7 + 1; }
export function latestEdition(today) { return addDays(today, -(((diffDays(today, YEAR_START) % 7) + 7) % 7)); }

export function runGit(args, { env, allowFail = false } = {}) {
  try {
    return execFileSync('git', args, { cwd: ROOT, env: { ...process.env, ...env }, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (e) {
    if (allowFail) return null;
    throw new Error(`git ${args.join(' ')} failed: ${(e.stderr || e.message).toString().trim()}`);
  }
}

export async function buildEdition({ asof, srcData, base, live = false, updateExisting = false, prune = false }) {
  const next = structuredClone(base);
  next.taxonomy = srcData.taxonomy;
  const stats = { added: 0, updated: 0, pruned: 0, addedByTier: {}, narratives: { weeks: 0, months: 0, quarters: 0 }, events: 0 };

  const where = new Map();
  for (const [m, arr] of Object.entries(next.items)) for (const it of arr) where.set(it.id, m);
  const srcItems = Object.values(srcData.items).flat().filter((i) => i.date <= asof);
  const srcIds = new Set(srcItems.map((i) => i.id));

  for (const it of srcItems) {
    const m = monthOf(it.date);
    if (!where.has(it.id)) {
      (next.items[m] ||= []).push(it);
      stats.added++; stats.addedByTier[it.tier] = (stats.addedByTier[it.tier] || 0) + 1;
    } else if (updateExisting) {
      const bm = where.get(it.id);
      const idx = next.items[bm].findIndex((x) => x.id === it.id);
      if (!sameJson(next.items[bm][idx], it)) { next.items[bm].splice(idx, 1); (next.items[m] ||= []).push(it); stats.updated++; }
    }
  }
  const sourceRecords = Object.values(srcData.sources || {}).flat().filter((source) => source.published <= asof);
  const availableSourceIds = new Set([
    ...Object.values(next.sources || {}).flat().filter((source) => source.published <= asof),
    ...sourceRecords,
  ].map((source) => source.id));
  for (const kind of ['sources', 'claims']) {
    const recordsByMonth = kind === 'sources'
      ? srcData.sources || {}
      : srcData.claims || {};
    for (const [month, records] of Object.entries(recordsByMonth)) {
      const target = next[kind][month] ||= [];
      const byId = new Map(target.map((record, index) => [record.id, index]));
      const eligible = kind === 'sources'
        ? records.filter((source) => source.published <= asof)
        : records.filter((claim) => availableSourceIds.has(claim.sid));
      for (const record of eligible) {
        const index = byId.get(record.id);
        if (index === undefined) {
          target.push(record);
          byId.set(record.id, target.length - 1);
        } else if (updateExisting && !sameJson(target[index], record)) {
          target[index] = record;
        } else if (!sameJson(target[index], record)) {
          throw new Error(`Conflicting ${kind} record "${record.id}" in ${month}; use --update-existing after review.`);
        }
      }
      next[kind][month] = target.sort((a, b) => a.id.localeCompare(b.id));
    }
  }
  for (const month of Object.keys(next.sources)) {
    next.sources[month] = next.sources[month].filter((source) => source.published <= asof);
    if (!next.sources[month].length) delete next.sources[month];
  }
  const visibleSourceIds = new Set(Object.values(next.sources).flat().map((source) => source.id));
  for (const month of Object.keys(next.claims)) {
    next.claims[month] = next.claims[month].filter((claim) => visibleSourceIds.has(claim.sid));
    if (!next.claims[month].length) delete next.claims[month];
  }
  if (prune) {
    for (const [m, arr] of Object.entries(next.items)) next.items[m] = arr.filter((it) => (srcIds.has(it.id) ? true : (stats.pruned++, false)));
  }
  for (const m of Object.keys(next.items)) { if (next.items[m].length) next.items[m] = sortItems(next.items[m]); else delete next.items[m]; }

  const takeNarratives = (kind, closed) => {
    for (const [key, n] of Object.entries(srcData[kind] || {})) {
      if (!closed(key)) continue;
      if (!next[kind][key]) { next[kind][key] = n; stats.narratives[kind]++; } else if (updateExisting && !sameJson(next[kind][key], n)) { next[kind][key] = n; stats.narratives[kind]++; }
    }
  };
  takeNarratives('weeks', (k) => isDate(k) && k <= asof);
  takeNarratives('months', (k) => monthRange(k).end < asof);
  takeNarratives('quarters', (k) => quarterRange(k).end < asof);

  const horizon = live ? addDays(asof, LIVE_HORIZON_DAYS) : asof;
  const events = new Map((next.events || []).map((e) => [e.id, e]));
  for (const e of srcData.events || []) {
    if (e.start > horizon) continue;
    if (!events.has(e.id)) stats.events++;
    events.set(e.id, e);
  }
  next.events = [...events.values()].sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
  return { next, stats };
}

export async function publish({ asof, src = path.join(ROOT, 'data', 'staging', 'full', 'content'), live = false, backdate = false, updateExisting = false, prune = false, git = true, dry = false, quiet = false, allowOffWeek = false } = {}) {
  if (!isDate(asof)) throw new Error('--asof=YYYY-MM-DD is required');
  if (asof < YEAR_START) throw new Error(`as-of ${asof} is before ${YEAR_START}`);
  if (!allowOffWeek && diffDays(asof, YEAR_START) % 7 !== 0) throw new Error(`${asof} is not an edition date (editions fall every 7 days from ${YEAR_START}; the nearest is ${latestEdition(asof)})`);

  const srcData = await loadContent(path.dirname(path.resolve(src)));
  const base = await loadContent(ROOT);
  const { next, stats } = await buildEdition({ asof, srcData, base, live, updateExisting, prune });

  const v = await validate({ data: next, asof });
  if (v.errors.length) {
    const lines = v.errors.slice(0, 25).map((e) => `  ${e.where}: ${e.msg}`).join('\n');
    throw new Error(`edition ${asof} failed validation (${v.errors.length} error(s)):\n${lines}`);
  }

  const tag = `tub-${asof}`;
  if (git && runGit(['tag', '-l', tag])) throw new Error(`tag ${tag} already exists`);
  const week = weekRange(asof);
  const result = { asof, tag, week: rangeLabel(week), edition: editionNumber(asof), ...stats, warnings: v.warnings.length };
  if (dry) return result;

  await writeContent(path.join(ROOT, 'content'), next);
  if (!git) return result;

  runGit(['add', '-A', 'content']);
  const tiers = Object.entries(stats.addedByTier).map(([t, n]) => `${n} ${t}`).join(', ') || 'no new items';
  const n = stats.narratives;
  const subject = `TUB ${asof}: edition ${result.edition} · ${stats.added} new item${stats.added === 1 ? '' : 's'}`;
  const body = [
    `Technical Update Briefing for the week of ${rangeLabel(week)} (as of ${longDate(asof)}).`,
    `Added: ${tiers}. Narratives: ${n.weeks} week, ${n.months} month, ${n.quarters} quarter. New events: ${stats.events}.`
      + (stats.updated || stats.pruned ? ` Corrections: ${stats.updated} updated, ${stats.pruned} removed.` : ''),
  ].join('\n\n');
  const today = new Date().toISOString().slice(0, 10);
  const when = backdate && asof < today ? `${asof}T17:00:00+00:00` : null;
  const env = when ? { GIT_AUTHOR_DATE: when, GIT_COMMITTER_DATE: when } : undefined;
  runGit(['commit', '--allow-empty', '-q', '-m', subject, '-m', body, '-m', TRAILER], { env });
  runGit(['tag', '-a', tag, '-m', `TUB edition ${asof}`], { env });
  result.commit = runGit(['rev-parse', '--short', 'HEAD']);
  if (!quiet) console.log(`published ${tag} ${result.commit} · ${subject}`);
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
  try {
    const r = await publish({
      asof: args.asof, src: args.src ? path.resolve(args.src) : undefined, live: !!args.live, backdate: !!args.backdate,
      updateExisting: !!args['update-existing'], prune: !!args.prune, git: !args['no-git'], dry: !!args.dry, quiet: !!args.quiet,
    });
    if (args.dry || args['no-git']) console.log(JSON.stringify(r, null, 2));
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
