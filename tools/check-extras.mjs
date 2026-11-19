#!/usr/bin/env node
// Validates the research agent's staged extras (events + items) with the same rules as published content.
//   node tools/check-extras.mjs
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validate } from './validate.mjs';
import { loadEvents, loadExtraItems, loadRaw, rawText } from './lib/raw.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const taxonomy = JSON.parse(await readFile(path.join(ROOT, 'content', 'taxonomy.json'), 'utf8'));
const events = await loadEvents();
const items = await loadExtraItems();
const raw = await loadRaw();
const rawUrls = new Map([...raw.byId.values()].map((r) => [r.url.replace(/\/$/, ''), r.id]));

const byMonth = {};
for (const it of items) (byMonth[String(it.date).slice(0, 7)] ||= []).push(it);
for (const arr of Object.values(byMonth)) arr.sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));

const res = await validate({ data: { taxonomy, events, items: byMonth, weeks: {}, months: {}, quarters: {} } });
const extra = [];
for (const it of items) {
  const dup = rawUrls.get(String(it.url).replace(/\/$/, ''));
  if (dup) extra.push({ where: it.id, msg: `url duplicates harvested record ${dup} — drop this item` });
  if (!/^(ev|rs|x)-/.test(it.id)) extra.push({ where: it.id, msg: 'research items must use ev-/rs-/x- ids' });
  if (it.date > '2026-11-05') extra.push({ where: it.id, msg: `date ${it.date} is in the future` });
}
for (const e of events) if (e.start > '2026-11-05' && e.id !== 'evt-universe-2026') extra.push({ where: e.id, msg: 'event starts after 2026-11-05 — still list it, but it is not visible in the current edition' });
const errors = res.errors.concat(extra.filter((x) => !/not visible/.test(x.msg)));
const warnings = res.warnings.concat(extra.filter((x) => /not visible/.test(x.msg)));
errors.forEach((x) => console.log(`ERROR ${x.where}: ${x.msg}`));
warnings.slice(0, 80).forEach((x) => console.log(`WARN  ${x.where}: ${x.msg}`));
console.log(`\nevents=${events.length} items=${items.length} tiers=${JSON.stringify(res.stats.byTier)} sections=${JSON.stringify(res.stats.bySection)}`);
console.log(`${errors.length} error(s), ${warnings.length} warning(s)`);
process.exitCode = errors.length ? 1 : 0;
