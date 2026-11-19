#!/usr/bin/env node
// Assembles the full content tree from the raw harvest + curation files + research extras + narratives.
//   node tools/assemble.mjs [--out=data/staging/full/content] [--until=YYYY-MM-DD]
//                           [--curation=data/staging/curation] [--narratives=data/staging/narratives]
//                           [--no-auto-effective] [--quiet]
// Run tools/verify-events.mjs first; only its evidence-backed registry is assembled.
// The result is validated with tools/validate.mjs; exit code 1 when there are errors.
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, loadRaw, loadVerifiedEvents, loadExtraItems } from './lib/raw.mjs';
import { brandFix, clipTitle, isBoilerplate, classify, autoEffective } from './lib/classify.mjs';
import { writeContent, sortItems, NARRATIVE_KINDS } from './lib/content-io.mjs';
import { validate, loadContent } from './validate.mjs';
import { YEAR_START, monthOf } from '../web/js/periods.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
const OUT = path.resolve(ROOT, args.out || 'data/staging/full/content');
const UNTIL = args.until || new Date().toISOString().slice(0, 10);
const CURATION = path.resolve(ROOT, args.curation || 'data/staging/curation');
const NARRATIVES = path.resolve(ROOT, args.narratives || 'data/staging/narratives');
const REPORT = path.resolve(ROOT, 'data/staging/assembly-report.json');
if (path.basename(OUT) !== 'content') { console.error(`--out must be a directory named "content" (got ${OUT}) so the validator can find it`); process.exit(2); }

const readJson = async (f, fallback) => { try { return JSON.parse(await readFile(f, 'utf8')); } catch (e) { if (fallback !== undefined) return fallback; throw e; } };
const listJson = async (dir) => { try { return (await readdir(dir)).filter((f) => f.endsWith('.json')).sort(); } catch { return []; } };

const report = { until: UNTIL, errors: [], warnings: [], dropped: [], deduped: [], autoEffective: [], eventsRemoved: [], counts: {} };
const err = (m) => report.errors.push(m);
const warn = (m) => report.warnings.push(m);

const taxonomy = await readJson(path.join(ROOT, 'content', 'taxonomy.json'));
const raw = await loadRaw();
const events = await loadVerifiedEvents();
const eventById = new Map(events.map((e) => [e.id, e]));
const anchors = await readJson(path.join(ROOT, 'data', 'raw', 'vscode-anchors.json'), {});

// ---- curation -------------------------------------------------------------------------------------------
const curated = new Map(); const overrides = new Map();
for (const f of await listJson(CURATION)) {
  const cur = await readJson(path.join(CURATION, f));
  for (const it of cur.items || []) {
    if (curated.has(it.id)) err(`curated id ${it.id} appears in ${curated.get(it.id)._file} and ${f}`);
    else curated.set(it.id, { ...it, _file: f });
  }
  for (const [id, o] of Object.entries(cur.overrides || {})) {
    if (overrides.has(id)) err(`override for ${id} appears in ${overrides.get(id)._file} and ${f}`);
    else overrides.set(id, { ...o, _file: f });
  }
}
for (const id of curated.keys()) if (!raw.byId.has(id)) err(`curated id ${id} is not a raw record`);

// ---- item builders --------------------------------------------------------------------------------------
const FIELD_ORDER = ['id', 'date', 'source', 'url', 'title', 'section', 'area', 'tier', 'tag', 'stage', 'summary', 'why', 'plans', 'ides', 'admin', 'effective', 'links', 'image', 'labels', 'version', 'event'];
function ordered(o) {
  const out = {};
  for (const k of FIELD_ORDER) {
    const v = o[k];
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) continue;
    out[k] = v;
  }
  return out;
}

function baseOf(r) {
  const anchor = r.source === 'vscode' ? anchors[r.id] : null;
  const labels = r.source === 'blog' ? r.categories : r.labels;
  return {
    id: r.id, date: r.date, source: r.source, url: anchor ? `${r.url}#${anchor}` : r.url,
    labels: labels && labels.length ? labels : undefined,
    version: r.version,
  };
}

function applyEvent(item, hint) {
  const ev = hint || ((item.labels || []).includes('universe26') ? 'evt-universe-2026' : null);
  if (!ev) return;
  const e = eventById.get(ev);
  if (!e) { report.eventsRemoved.push(`${item.id}: event ${ev} is not in the registry`); return; }
  if (item.date < e.start || item.date > (e.end || e.start)) { report.eventsRemoved.push(`${item.id}: date ${item.date} is outside ${ev} (${e.start}…${e.end || e.start})`); return; }
  item.event = ev;
}

function buildCurated(r, c) {
  const ov = overrides.get(r.id);
  if (ov) warn(`${r.id} is both curated and overridden (${ov._file}); curation wins`);
  const rawImages = [...(r.images || []), ...(r.image ? [r.image] : [])];
  let image = c.image;
  if (image && !rawImages.includes(image)) { warn(`${r.id}: image is not one of the record's own images — removed`); image = undefined; }
  const item = {
    ...baseOf(r),
    title: brandFix(clipTitle(c.title || r.title)),
    section: c.section, area: c.area, tier: c.tier, tag: c.tag,
    stage: c.stage, summary: c.summary, why: c.why, plans: c.plans, ides: c.ides, admin: c.admin,
    effective: c.effective, links: c.links, image,
  };
  applyEvent(item, c.event);
  return ordered(item);
}

function buildMinor(r, ov) {
  const cl = classify(r);
  const item = {
    ...baseOf(r),
    title: brandFix(clipTitle(ov?.title || r.title)),
    section: ov?.section || cl.section, area: ov?.area || cl.area, tier: 'minor', tag: ov?.tag || cl.tag,
  };
  if (item.tag === 'Deprecation' && !args['no-auto-effective']) {
    const e = autoEffective(r);
    if (e) { item.effective = e.date; report.autoEffective.push({ id: r.id, effective: e.date, title: item.title, sentence: e.sentence }); }
  }
  applyEvent(item, null);
  return ordered(item);
}

// ---- assemble -------------------------------------------------------------------------------------------
const items = [];
const records = [...raw.byId.values()].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
for (const r of records) {
  if (r.date < YEAR_START || r.date > UNTIL) continue;
  const ov = overrides.get(r.id);
  const cur = curated.get(r.id);
  if (!cur && ov?.drop) { report.dropped.push({ id: r.id, title: r.title, by: 'curator', reason: ov.dropReason || '' }); continue; }
  if (!cur && isBoilerplate(r)) { report.dropped.push({ id: r.id, title: r.title, by: 'assembler', reason: 'VS Code release-note boilerplate' }); continue; }
  items.push(cur ? buildCurated(r, cur) : buildMinor(r, ov));
}
for (const x of await loadExtraItems()) {
  if (x.date > UNTIL || x.date < YEAR_START) { warn(`extra item ${x.id} dated ${x.date} is outside the range — skipped`); continue; }
  const item = ordered({ ...x, title: brandFix(clipTitle(x.title || '')) });
  delete item.event;
  applyEvent(item, x.event);
  items.push(item);
}

// One announcement = one item: collapse identical URLs (VS Code release pages are shared by design).
const rank = { headline: 3, notable: 2, minor: 1 };
const byKey = new Map();
for (const it of items) {
  const key = it.source === 'vscode' && !it.url.includes('#') ? `${it.url}|${it.title}` : it.url.replace(/\/$/, '').replace(/[?&]utm_[^&]*/g, '');
  const prev = byKey.get(key);
  if (!prev) { byKey.set(key, it); continue; }
  const keep = (rank[it.tier] > rank[prev.tier] || (rank[it.tier] === rank[prev.tier] && it.summary && !prev.summary)) ? it : prev;
  const lose = keep === it ? prev : it;
  report.deduped.push({ kept: keep.id, removed: lose.id, url: key });
  byKey.set(key, keep);
}
const final = sortItems([...byKey.values()]);

// ---- write ----------------------------------------------------------------------------------------------
const byMonth = {};
for (const it of final) (byMonth[monthOf(it.date)] ||= []).push(it);
const data = { taxonomy, events, items: byMonth, weeks: {}, months: {}, quarters: {} };
let narratives = 0;
for (const kind of NARRATIVE_KINDS) {
  for (const f of await listJson(path.join(NARRATIVES, kind))) { data[kind][path.basename(f, '.json')] = await readJson(path.join(NARRATIVES, kind, f)); narratives++; }
}
await writeContent(OUT, data);

// ---- validate + report ----------------------------------------------------------------------------------
const content = await loadContent(path.dirname(OUT));
const v = await validate({ data: content });
const countBy = (k) => final.reduce((a, i) => { a[i[k]] = (a[i[k]] || 0) + 1; return a; }, {});
report.counts = { items: final.length, byTier: countBy('tier'), bySection: countBy('section'), byTag: countBy('tag'), bySource: countBy('source'), byMonth: Object.fromEntries(Object.entries(byMonth).map(([m, a]) => [m, a.length])), narratives, events: events.length, curated: curated.size, overrides: overrides.size };
report.validation = { errors: v.errors.length, warnings: v.warnings.length };
await mkdir(path.dirname(REPORT), { recursive: true });
await writeFile(REPORT, JSON.stringify({ ...report, validationErrors: v.errors, validationWarnings: v.warnings }, null, 1));

if (!args.quiet) {
  console.log(`assembled ${final.length} items (${JSON.stringify(report.counts.byTier)}) → ${OUT}`);
  console.log(`  sections ${JSON.stringify(report.counts.bySection)}`);
  console.log(`  months   ${JSON.stringify(report.counts.byMonth)}`);
  console.log(`  curated=${curated.size} overrides=${overrides.size} dropped=${report.dropped.length} deduped=${report.deduped.length} autoEffective=${report.autoEffective.length} eventsRemoved=${report.eventsRemoved.length} narratives=${narratives}`);
  report.errors.forEach((e) => console.log(`ERROR ${e}`));
  report.warnings.slice(0, 30).forEach((e) => console.log(`WARN  ${e}`));
  v.errors.slice(0, 40).forEach((e) => console.log(`INVALID ${e.where}: ${e.msg}`));
  console.log(`validate: ${v.errors.length} error(s), ${v.warnings.length} warning(s); report → ${path.relative(ROOT, REPORT)}`);
}
process.exitCode = report.errors.length || v.errors.length ? 1 : 0;
