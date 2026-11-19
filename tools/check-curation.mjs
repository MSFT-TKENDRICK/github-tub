#!/usr/bin/env node
// Checks curation files (data/staging/curation/*.json) against the raw harvest and the schema.
//   node tools/check-curation.mjs data/staging/curation/2026-03.json [more files…] [--strict]
// Errors fail the run (exit 1). Warnings are "ground-check" findings that a human/agent must resolve or justify.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { brandIssues } from './validate.mjs';
import { isDate, monthRange } from '../web/js/periods.mjs';
import { loadRaw, loadEvents, rawText } from './lib/raw.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HYPE = /\b(revolutionary|game[- ]chang\w*|supercharg\w*|unleash\w*|blazing(?:ly)?|cutting[- ]edge|next[- ]gen(?:eration)?|world[- ]class|best[- ]in[- ]class|magical|effortless(?:ly)?|seamless(?:ly)?|empower\w*|synerg\w*|leverag\w*|utiliz\w*|delight\w*|groundbreaking|transformative|unparalleled|robust|exciting|amazing|powerful)\b/i;
const FIRST_PERSON = /\b(we|our|ours|us|we're|we've|we'll)\b/i;
const GENERIC_IMG = /wallpaper|generic|og-image|social-card|opengraph|default-|placeholder/i;
const PLAN_RE = { Free: /\bFree\b/, Pro: /\bPro\b(?!\+)/, 'Pro+': /\bPro\+/, Business: /\bBusiness\b/, Enterprise: /\bEnterprise\b/ };
const IDE_RE = { vscode: /VS Code|Visual Studio Code/i, visualstudio: /Visual Studio(?! Code)/, jetbrains: /JetBrains|IntelliJ|PyCharm|WebStorm|Rider|GoLand|Android Studio/i, xcode: /Xcode/i, eclipse: /Eclipse/i, neovim: /Neovim|vim/i, cli: /\bCLI\b|command line|terminal/i, web: /github\.com|GitHub\.com|web|browser/i, mobile: /Mobile|iOS|Android/i, desktop: /GitHub Desktop|Desktop/i };

const args = process.argv.slice(2);
const files = args.filter((a) => !a.startsWith('--'));
const strict = args.includes('--strict');
if (!files.length) {
  const dir = path.join(ROOT, 'data', 'staging', 'curation');
  try { for (const f of (await readdir(dir)).filter((x) => x.endsWith('.json')).sort()) files.push(path.join(dir, f)); } catch { /* none */ }
}
if (!files.length) { console.error('usage: node tools/check-curation.mjs <curation.json> […]'); process.exit(2); }

const taxonomy = JSON.parse(await readFile(path.join(ROOT, 'content', 'taxonomy.json'), 'utf8'));
const sections = new Set(taxonomy.sections.map((s) => s.id));
const areas = new Set(taxonomy.areas.map((s) => s.id));
const tags = new Set(taxonomy.tags);
const stages = new Set(taxonomy.stages.map((s) => s.id));
const plans = new Set(taxonomy.plans);
const ides = new Set(taxonomy.ides.map((s) => s.id));
const raw = await loadRaw();
const events = new Set((await loadEvents()).map((e) => e.id));

let totalErrors = 0; let totalWarnings = 0;
const norm = (s) => String(s || '').replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/,(?=\d{3}\b)/g, '').toLowerCase();

for (const file of files) {
  const errors = []; const warnings = [];
  const err = (w, m) => errors.push(`${w}: ${m}`);
  const warn = (w, m) => warnings.push(`${w}: ${m}`);
  const label = path.basename(file);
  let cur;
  try { cur = JSON.parse(await readFile(file, 'utf8')); } catch (e) { console.log(`ERROR ${label}: cannot parse JSON — ${e.message}`); totalErrors++; continue; }
  const month = cur.month;
  if (!/^\d{4}-\d{2}$/.test(month || '')) err(label, '"month" must be YYYY-MM');
  else if (path.basename(file, '.json') !== month) warn(label, `file name does not match month ${month}`);
  const range = cur.from && cur.to ? { start: cur.from, end: cur.to } : /^\d{4}-\d{2}$/.test(month || '') ? monthRange(month) : { start: '0000-00-00', end: '9999-99-99' };
  if (!Array.isArray(cur.items)) { err(label, '"items" must be an array'); cur.items = []; }

  const text = (w, field, v, { required = false, max } = {}) => {
    if (v === undefined || v === null || v === '') { if (required) err(w, `${field} is required`); return; }
    if (typeof v !== 'string') { err(w, `${field} must be a string`); return; }
    if (v !== v.trim()) err(w, `${field} has leading/trailing whitespace`);
    if (max && v.length > max) warn(w, `${field} is ${v.length} chars (limit ${max})`);
    if (/<\/?[a-z][^>]*>/i.test(v)) err(w, `${field} contains HTML`);
    if (/\]\(https?:/.test(v) || /\*\*[^*]+\*\*/.test(v)) err(w, `${field} contains markdown — plain text only`);
    if (/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/u.test(v)) err(w, `${field} contains emoji`);
    for (const i of brandIssues(v)) (i.level === 'error' ? err : warn)(w, `${field}: ${i.msg}`);
    const h = v.match(HYPE); if (h) warn(w, `${field}: marketing word "${h[0]}"`);
    if (['summary', 'why', 'admin'].includes(field) && FIRST_PERSON.test(v)) warn(w, `${field}: first person "${v.match(FIRST_PERSON)[0]}"`);
  };
  const url = (w, field, u) => { try { if (new URL(u).protocol !== 'https:') err(w, `${field} must be https`); } catch { err(w, `${field} is not a valid URL`); } };

  const ids = new Set(); const kept = new Map();
  const counts = { headline: 0, notable: 0 };
  for (const it of cur.items) {
    const w = `${label}#${it?.id ?? '?'}`;
    const r = raw.byId.get(it?.id);
    if (!r) { err(w, 'id is not a raw record id (copy it exactly from the slice)'); continue; }
    if (ids.has(it.id)) { err(w, 'listed twice'); continue; }
    ids.add(it.id); kept.set(it.id, it);
    if (r.date < range.start || r.date > range.end) err(w, `raw date ${r.date} is outside ${month}`);
    if (!['headline', 'notable'].includes(it.tier)) err(w, 'tier must be headline or notable here (everything else is minor automatically)'); else counts[it.tier]++;
    if (!sections.has(it.section)) err(w, `unknown section "${it.section}"`);
    if (!areas.has(it.area)) err(w, `unknown area "${it.area}"`);
    if (!tags.has(it.tag)) err(w, `unknown tag "${it.tag}"`);
    if (it.stage !== undefined && !stages.has(it.stage)) err(w, `unknown stage "${it.stage}"`);
    if (it.plans !== undefined && (!Array.isArray(it.plans) || it.plans.some((p) => !plans.has(p)))) err(w, `plans must be a subset of ${[...plans].join(', ')}`);
    if (it.ides !== undefined && (!Array.isArray(it.ides) || it.ides.some((p) => !ides.has(p)))) err(w, `ides must be a subset of ${[...ides].join(', ')}`);
    if (it.event !== undefined && !events.has(it.event)) err(w, `event "${it.event}" is not in the events registry`);
    if (it.effective !== undefined && !isDate(it.effective)) err(w, `effective "${it.effective}" is not a valid date`);
    if (it.title !== undefined) text(w, 'title', it.title, { max: 130 });
    text(w, 'summary', it.summary, { required: true, max: 520 });
    if (it.summary && it.summary.length < 100) warn(w, `summary is only ${it.summary.length} chars — too thin for a ${it.tier} item?`);
    if (it.tier === 'headline') text(w, 'why', it.why, { required: true, max: 240 }); else text(w, 'why', it.why, { max: 240 });
    text(w, 'admin', it.admin, { max: 280 });
    if (it.links !== undefined) {
      if (!Array.isArray(it.links) || it.links.length > 4) err(w, 'links must be an array of at most 4');
      else it.links.forEach((l, i) => { text(w, `links[${i}].label`, l?.label, { required: true, max: 60 }); if (l?.url) url(w, `links[${i}].url`, l.url); else err(w, `links[${i}].url missing`); });
    }
    if (it.image !== undefined) {
      const own = [...(r.images || []), ...(r.image ? [r.image] : [])];
      if (!own.includes(it.image)) err(w, 'image must be one of the raw record\'s own image URLs (see node tools/show.mjs)');
      else if (GENERIC_IMG.test(it.image)) warn(w, 'image looks like a generic wallpaper/social card — omit it unless it is a real screenshot');
    }
    for (const k of Object.keys(it)) if (!['id', 'tier', 'section', 'area', 'tag', 'title', 'summary', 'why', 'stage', 'plans', 'ides', 'admin', 'effective', 'links', 'image', 'event'].includes(k)) warn(w, `unknown field "${k}" (ignored)`);

    // ground check — every figure and every claimed attribute must be traceable to the source text
    const src = norm(rawText(r));
    const claim = [it.title, it.summary, it.why, it.admin].filter(Boolean).join(' ');
    const seen = new Set();
    for (const m of claim.matchAll(/\b\d[\d,]*(?:\.\d+)*(?:%|x|×)?/g)) {
      const t = norm(m[0]).replace(/,/g, '');
      if (seen.has(t) || /^(20(2[3-8]))$/.test(t) || t === '0') continue;
      seen.add(t);
      if (!src.includes(t) && !src.includes(m[0].toLowerCase())) warn(w, `number "${m[0]}" is not in the source text`);
    }
    for (const p of it.plans || []) if (PLAN_RE[p] && !PLAN_RE[p].test(rawText(r))) warn(w, `plan "${p}" is not mentioned in the source`);
    for (const i of it.ides || []) if (IDE_RE[i] && !IDE_RE[i].test(`${rawText(r)} ${r.title}`)) warn(w, `ide "${i}" is not mentioned in the source`);
    if (it.stage === 'ga' && !/generally available|\bGA\b|now available|is available|are available|rolling out|rollout/i.test(rawText(r))) warn(w, 'stage "ga" but the source does not say generally available / available');
    if (it.stage === 'preview' && !/preview|beta/i.test(rawText(r))) warn(w, 'stage "preview" but the source does not say preview/beta');
    if (it.stage === 'experimental' && !/experimental/i.test(rawText(r))) warn(w, 'stage "experimental" but the source does not say experimental');
    if (/\b(generally available|GA)\b/.test(claim) && !/generally available|\bGA\b/i.test(rawText(r))) warn(w, 'text claims "generally available/GA" but the source does not');
    if (/\bpublic preview\b/i.test(claim) && !/public preview/i.test(rawText(r))) warn(w, 'text claims "public preview" but the source does not');
    if (it.effective) {
      const d = new Date(`${it.effective}T00:00:00Z`);
      const mon = d.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
      const day = d.getUTCDate();
      const re = new RegExp(`(${mon}|${mon.slice(0, 3)}\\.?)\\s+${day}\\b|${day}\\s+(${mon}|${mon.slice(0, 3)})|${it.effective}`, 'i');
      if (!re.test(rawText(r))) warn(w, `effective ${it.effective} is not stated in the source text`);
    }
  }

  const ov = cur.overrides || {};
  let drops = 0;
  for (const [id, o] of Object.entries(ov)) {
    const w = `${label}#override:${id}`;
    const r = raw.byId.get(id);
    if (!r) { err(w, 'id is not a raw record id'); continue; }
    if (r.date < range.start || r.date > range.end) err(w, `raw date ${r.date} is outside ${month}`);
    if (kept.has(id)) err(w, 'is also listed in items — choose one');
    for (const k of Object.keys(o)) if (!['drop', 'dropReason', 'section', 'area', 'tag', 'title'].includes(k)) err(w, `unknown override field "${k}"`);
    if (o.drop) { drops++; if (!o.dropReason) err(w, 'drop requires dropReason'); }
    if (o.section && !sections.has(o.section)) err(w, `unknown section "${o.section}"`);
    if (o.area && !areas.has(o.area)) err(w, `unknown area "${o.area}"`);
    if (o.tag && !tags.has(o.tag)) err(w, `unknown tag "${o.tag}"`);
    if (o.title !== undefined) text(w, 'title', o.title, { required: true, max: 130 });
  }

  const n = cur.month_narrative;
  if (n) {
    const w = `${label}#month_narrative`;
    text(w, 'headline', n.headline, { required: true, max: 95 });
    text(w, 'summary', n.summary, { required: true, max: 700 });
    if (!Array.isArray(n.themes) || n.themes.length < 2 || n.themes.length > 4) err(w, 'themes must have 2–4 entries');
    else n.themes.forEach((t, i) => { text(w, `themes[${i}].title`, t.title, { required: true, max: 64 }); text(w, `themes[${i}].body`, t.body, { required: true, max: 320 }); (t.itemIds || []).forEach((id) => { if (!kept.has(id) && !raw.byId.has(id)) err(w, `themes[${i}] unknown id ${id}`); }); });
    if (!Array.isArray(n.spotlight) || n.spotlight.length < 3 || n.spotlight.length > 6) err(w, 'spotlight must have 3–6 ids');
    else n.spotlight.forEach((id) => { if (!kept.has(id)) err(w, `spotlight ${id} must be one of your headline/notable items`); });
    const claim = `${n.headline} ${n.summary} ${(n.themes || []).map((t) => t.body).join(' ')}`;
    const known = norm([...kept.values()].map((i) => `${i.title || raw.byId.get(i.id).title} ${i.summary} ${i.why || ''}`).join(' '));
    for (const m of claim.matchAll(/\b\d[\d,]*(?:\.\d+)*(?:%|x|×)?/g)) { const t = norm(m[0]).replace(/,/g, ''); if (!/^(20(2[3-8]))$/.test(t) && !known.includes(t)) warn(w, `number "${m[0]}" is not found in the month's curated items — only cite figures you can trace`); }
  }

  const inMonth = [...raw.byId.values()].filter((r) => r.date >= range.start && r.date <= range.end).length;
  if (counts.headline > 6) warn(label, `${counts.headline} headline items — keep it to ≤ 5 so they stay meaningful`);
  if (counts.headline < 1 && cur.items.length) warn(label, 'no headline item — pick the month\'s top stories');
  if (counts.notable < 8 && inMonth > 60) warn(label, `only ${counts.notable} notable items for ${inMonth} source records`);
  const bySec = {}; for (const it of cur.items) bySec[it.section] = (bySec[it.section] || 0) + 1;
  console.log(`${errors.length ? 'FAIL' : 'ok  '} ${label}: ${cur.items.length} items (${counts.headline} headline, ${counts.notable} notable) of ${inMonth} source records; ${Object.keys(ov).length} overrides (${drops} drops); sections ${JSON.stringify(bySec)}`);
  errors.forEach((e) => console.log(`  ERROR ${e}`));
  warnings.forEach((x) => console.log(`  WARN  ${x}`));
  totalErrors += errors.length; totalWarnings += warnings.length;
}
console.log(`\n${totalErrors} error(s), ${totalWarnings} warning(s) across ${files.length} file(s)`);
process.exitCode = totalErrors || (strict && totalWarnings) ? 1 : 0;
