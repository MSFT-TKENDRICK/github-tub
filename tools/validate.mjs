#!/usr/bin/env node
// Validates the published briefing content (content/**) against tools/SCHEMA.md.
//   node tools/validate.mjs [--root=<dir>] [--asof=YYYY-MM-DD] [--json] [--quiet]
// Exit code 1 when there are errors. Warnings never fail the run.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDate, monthRange, quarterRange, weekRange, YEAR_START } from '../web/js/periods.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ID_RE = /^[a-z0-9][a-z0-9._-]{2,80}$/;
const LIMITS = { title: 130, summary: 520, why: 240, admin: 280, headline: 95, themeTitle: 64, themeBody: 320, note: 280 };
const HOSTS_OK = /(^|\.)(github\.blog|github\.com|githubusercontent\.com|githubassets\.com|githubnext\.com|visualstudio\.com|microsoft\.com|azure\.com|jetbrains\.com|eclipse\.org|apple\.com|openai\.com|anthropic\.com|google\.com|aka\.ms|githubuniverse\.com|kubecon\.io|cncf\.io|linuxfoundation\.org|opensource\.org|githubcopilotdevdays\.com|msbuild\.microsoft\.com|build\.microsoft\.com|ghe\.com|gh\.io|git-scm\.com|npmjs\.com|python\.org|nodejs\.org|rust-lang\.org|visualstudio\.microsoft\.com)$/i;

const BRAND_ERRORS = [
  [/\bGithub\b|\bGITHUB\b|\bGit Hub\b|\bgit-hub\b/, 'Write "GitHub" (capital G and H, one word)'],
  [/\bco-?pilot\b/i, null],
  [/\bV[Ss]code\b|\bVscode\b/, 'Write "VS Code" or "Visual Studio Code"'],
  [/\bGitHub Co-?[Pp]ilot\b(?<!GitHub Copilot)/, 'Write "GitHub Copilot"'],
  [/\bMS Copilot\b|\bMicrosoft GitHub\b/, 'Not a GitHub product name'],
];
const HYPE = /\b(revolutionary|game[- ]chang\w*|supercharg\w*|unleash\w*|blazing(?:ly)?|cutting[- ]edge|next[- ]gen(?:eration)?|world[- ]class|best[- ]in[- ]class|magical|effortless(?:ly)?|seamless(?:ly)?|empower\w*|synerg\w*|leverag\w*|utiliz\w*|delight\w*|groundbreaking|transformative|unparalleled|robust)\b/i;
const FIRST_PERSON = /\b(we|our|ours|us|we're|we've|we'll)\b/i;

export async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

async function listJson(dir) {
  try { return (await readdir(dir)).filter((f) => f.endsWith('.json')).sort().map((f) => path.join(dir, f)); } catch { return []; }
}

export async function loadContent(root) {
  const content = path.join(root, 'content');
  const load = async (sub) => Object.fromEntries(await Promise.all((await listJson(path.join(content, sub))).map(async (f) => [path.basename(f, '.json'), await readJson(f)])));
  const out = { taxonomy: null, events: [], items: {}, sources: {}, claims: {}, weeks: {}, months: {}, quarters: {} };
  try { out.taxonomy = await readJson(path.join(content, 'taxonomy.json')); } catch { /* reported by validator */ }
  try { out.events = await readJson(path.join(content, 'events.json')); } catch { out.events = []; }
  out.items = await load('items');
  out.sources = await load('sources');
  out.claims = await load('claims');
  out.weeks = await load('weeks');
  out.months = await load('months');
  out.quarters = await load('quarters');
  return out;
}

export function brandIssues(text) {
  const issues = [];
  if (typeof text !== 'string') return issues;
  for (const [re, msg] of BRAND_ERRORS) {
    const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`);
    for (const m of text.matchAll(g)) {
      if (msg === null) {
        // Co-pilot / CoPilot / COPILOT / copilot used as a product name
        if (m[0] !== 'Copilot') {
          const pre = text.slice(Math.max(0, m.index - 4), m.index);
          const post = text.slice(m.index + m[0].length, m.index + m[0].length + 1);
          const isCode = /(?:gh |\/|\.|-|_)$/.test(pre) || /^[-_./]/.test(post);
          if (!isCode) issues.push({ level: m[0] === 'copilot' ? 'warn' : 'error', msg: `"${m[0]}" → "Copilot"` });
        }
      } else {
        issues.push({ level: 'error', msg: `${msg} (found "${m[0]}")` });
      }
    }
  }
  const gh = text.match(/\bgithub copilot\b/gi) || [];
  for (const g of gh) if (g !== 'GitHub Copilot') issues.push({ level: 'error', msg: `"${g}" → "GitHub Copilot"` });
  return issues;
}

export async function validate({ root = path.resolve(HERE, '..'), asof = null, data: preloaded = null } = {}) {
  const errors = []; const warnings = [];
  const err = (where, msg) => errors.push({ where, msg });
  const warn = (where, msg) => warnings.push({ where, msg });
  const data = preloaded || await loadContent(root);
  const tx = data.taxonomy;
  if (!tx) { err('content/taxonomy.json', 'missing or unreadable'); return { errors, warnings, stats: {} }; }
  const sections = new Set(tx.sections.map((s) => s.id));
  const areas = new Set(tx.areas.map((a) => a.id));
  const tiers = new Set(tx.tiers.map((t) => t.id));
  const tags = new Set(tx.tags);
  const stages = new Set(tx.stages.map((s) => s.id));
  const plans = new Set(tx.plans);
  const ides = new Set(tx.ides.map((i) => i.id));
  const sources = new Set(tx.sources);
  const eventIds = new Set((data.events || []).map((e) => e.id));
  const eventById = new Map((data.events || []).map((e) => [e.id, e]));

  const byId = new Map();
  const stats = { items: 0, byTier: {}, bySection: {}, byMonth: {}, weeks: 0, months: 0, quarters: 0, events: eventIds.size };

  const textChecks = (where, field, value, { max, required = false } = {}) => {
    if (value === undefined || value === null || value === '') { if (required) err(where, `${field} is required`); return; }
    if (typeof value !== 'string') { err(where, `${field} must be a string`); return; }
    if (value !== value.trim()) err(where, `${field} has leading/trailing whitespace`);
    if (/\s{2,}/.test(value.replace(/\n/g, ' '))) warn(where, `${field} has repeated whitespace`);
    if (max && value.length > max) warn(where, `${field} is ${value.length} chars (limit ${max})`);
    if (/<\/?[a-z][^>]*>/i.test(value)) err(where, `${field} contains HTML`);
    if (/\]\(https?:/.test(value) || /\*\*[^*]+\*\*/.test(value)) err(where, `${field} contains markdown — plain text only`);
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) err(where, `${field} contains control characters`);
    for (const i of brandIssues(value)) (i.level === 'error' ? err : warn)(where, `${field}: ${i.msg}`);
    const h = value.match(HYPE); if (h) warn(where, `${field}: marketing/jargon word "${h[0]}"`);
    if (['summary', 'why', 'admin'].includes(field) && FIRST_PERSON.test(value)) warn(where, `${field}: first-person "${value.match(FIRST_PERSON)[0]}" — write in neutral third person`);
  };

  const httpsUrl = (where, field, u, { image = false } = {}) => {
    try {
      const x = new URL(u);
      if (x.protocol !== 'https:') err(where, `${field} must be https`);
      else if (!image && !HOSTS_OK.test(x.hostname)) warn(where, `${field} host ${x.hostname} is not on the usual allow-list`);
    } catch { err(where, `${field} is not a valid URL`); }
  };

  for (const [file, arr] of Object.entries(data.items)) {
    if (!/^\d{4}-\d{2}$/.test(file)) { err(`items/${file}.json`, 'file name must be YYYY-MM'); continue; }
    if (!Array.isArray(arr)) { err(`items/${file}.json`, 'must be an array'); continue; }
    let prev = '';
    for (const it of arr) {
      const w = `items/${file}.json#${it?.id ?? '?'}`;
      stats.items++;
      if (!it || typeof it !== 'object') { err(w, 'not an object'); continue; }
      if (!ID_RE.test(it.id || '')) err(w, `invalid id "${it.id}"`);
      if (byId.has(it.id)) err(w, `duplicate id (also in ${byId.get(it.id)})`); else byId.set(it.id, { file, ...it });
      if (!isDate(it.date)) err(w, `invalid date "${it.date}"`);
      else {
        if (it.date.slice(0, 7) !== file) err(w, `date ${it.date} does not belong in ${file}.json`);
        if (asof && it.date > asof) err(w, `date ${it.date} is after as-of ${asof}`);
        if (it.date < YEAR_START) err(w, `date ${it.date} is before ${YEAR_START}`);
      }
      const sortKey = `${it.date}|${it.id}`;
      if (sortKey < prev) warn(w, 'items are not sorted by date then id'); prev = sortKey;
      if (!sources.has(it.source)) err(w, `unknown source "${it.source}"`);
      if (!sections.has(it.section)) err(w, `unknown section "${it.section}"`);
      if (!areas.has(it.area)) err(w, `unknown area "${it.area}"`);
      if (!tiers.has(it.tier)) err(w, `unknown tier "${it.tier}"`);
      if (!tags.has(it.tag)) err(w, `unknown tag "${it.tag}"`);
      if (it.stage !== undefined && !stages.has(it.stage)) err(w, `unknown stage "${it.stage}"`);
      if (!it.url) err(w, 'url is required'); else httpsUrl(w, 'url', it.url);
      textChecks(w, 'title', it.title, { max: LIMITS.title, required: true });
      if (it.tier === 'headline' || it.tier === 'notable') textChecks(w, 'summary', it.summary, { max: LIMITS.summary, required: true });
      else textChecks(w, 'summary', it.summary, { max: LIMITS.summary });
      if (it.tier === 'headline') textChecks(w, 'why', it.why, { max: LIMITS.why, required: true });
      else textChecks(w, 'why', it.why, { max: LIMITS.why });
      textChecks(w, 'admin', it.admin, { max: LIMITS.admin });
      if (it.plans !== undefined) { if (!Array.isArray(it.plans) || it.plans.some((p) => !plans.has(p))) err(w, `plans must be a subset of ${[...plans].join(', ')}`); }
      if (it.ides !== undefined) { if (!Array.isArray(it.ides) || it.ides.some((p) => !ides.has(p))) err(w, `ides must be a subset of ${[...ides].join(', ')}`); }
      if (it.links !== undefined) {
        if (!Array.isArray(it.links) || it.links.length > 4) err(w, 'links must be an array of at most 4');
        else it.links.forEach((l, i) => { textChecks(w, `links[${i}].label`, l.label, { required: true, max: 60 }); httpsUrl(w, `links[${i}].url`, l.url); });
      }
      if (it.image) httpsUrl(w, 'image', it.image, { image: true });
      if (it.effective !== undefined && !isDate(it.effective)) err(w, `effective "${it.effective}" is not a valid date`);
      if (it.effective && isDate(it.date) && it.tag === 'Deprecation' && Date.parse(it.effective) < Date.parse(it.date) - 7 * 864e5) warn(w, `effective ${it.effective} is more than a week before the publication date`);
      if (it.event && !eventIds.has(it.event)) err(w, `event "${it.event}" is not in events.json`);
      else if (it.event) {
        const ev = eventById.get(it.event);
        if (it.date < ev.start || it.date > (ev.end || ev.start)) err(w, `event ${it.event} (${ev.start}…${ev.end || ev.start}) does not cover the item date ${it.date}`);
      }
      if (it.section === 'vscode' && it.source === 'vscode' && !it.version) warn(w, 'VS Code release item without version');
      if (/\bGA\b|generally available/i.test(`${it.title} ${it.summary || ''}`) && it.stage && it.stage !== 'ga') warn(w, `text says GA but stage is "${it.stage}"`);
      stats.byTier[it.tier] = (stats.byTier[it.tier] || 0) + 1;
      stats.bySection[it.section] = (stats.bySection[it.section] || 0) + 1;
      stats.byMonth[file] = (stats.byMonth[file] || 0) + 1;
    }
  }

  const checkNarrative = (kind, key, n, range) => {
    const w = `${kind}/${key}.json`;
    stats[kind] = (stats[kind] || 0) + 1;
    if (!n || typeof n !== 'object') { err(w, 'not an object'); return; }
    textChecks(w, 'headline', n.headline, { max: LIMITS.headline, required: true });
    textChecks(w, 'summary', n.summary, { max: 760, required: true });
    const ref = (id, where) => {
      const it = byId.get(id);
      if (!it) { err(w, `${where}: unknown item id "${id}"`); return null; }
      if (range && (it.date < range.start || it.date > range.end)) err(w, `${where}: ${id} (${it.date}) is outside ${range.start}…${range.end}`);
      return it;
    };
    if (!Array.isArray(n.themes) || !n.themes.length) err(w, 'themes must be a non-empty array');
    else n.themes.forEach((t, i) => {
      textChecks(w, `themes[${i}].title`, t.title, { max: LIMITS.themeTitle, required: true });
      textChecks(w, `themes[${i}].body`, t.body, { max: LIMITS.themeBody, required: true });
      (t.itemIds || []).forEach((id) => ref(id, `themes[${i}]`));
    });
    if (!Array.isArray(n.spotlight) || !n.spotlight.length) err(w, 'spotlight must be a non-empty array');
    else n.spotlight.forEach((id) => { const it = ref(id, 'spotlight'); if (it && it.tier === 'minor') err(w, `spotlight ${id} must be a headline or notable item`); });
  };

  for (const [key, n] of Object.entries(data.weeks)) {
    if (!isDate(key)) { err(`weeks/${key}.json`, 'file name must be a YYYY-MM-DD edition date'); continue; }
    if (asof && key > asof) err(`weeks/${key}.json`, `edition ${key} is after as-of ${asof}`);
    checkNarrative('weeks', key, n, weekRange(key));
  }
  for (const [key, n] of Object.entries(data.months)) {
    if (!/^\d{4}-\d{2}$/.test(key)) { err(`months/${key}.json`, 'file name must be YYYY-MM'); continue; }
    const r = monthRange(key);
    if (asof && r.end >= asof) err(`months/${key}.json`, `month ${key} is not closed at as-of ${asof}`);
    checkNarrative('months', key, n, r);
  }
  for (const [key, n] of Object.entries(data.quarters)) {
    if (!/^\d{4}-Q[1-4]$/.test(key)) { err(`quarters/${key}.json`, 'file name must be YYYY-Qn'); continue; }
    const r = quarterRange(key);
    if (asof && r.end >= asof) err(`quarters/${key}.json`, `quarter ${key} is not closed at as-of ${asof}`);
    checkNarrative('quarters', key, n, r);
  }

  const seenEv = new Set();
  for (const e of data.events || []) {
    const w = `events.json#${e?.id ?? '?'}`;
    if (!e || !ID_RE.test(e.id || '')) err(w, 'invalid id');
    if (seenEv.has(e.id)) err(w, 'duplicate id'); seenEv.add(e.id);
    textChecks(w, 'name', e.name, { required: true, max: 120 });
    if (!isDate(e.start)) err(w, 'invalid start'); if (e.end && !isDate(e.end)) err(w, 'invalid end');
    if (e.end && e.start && e.end < e.start) err(w, 'end before start');
    if (!['conference', 'meetup', 'webinar', 'launch', 'other'].includes(e.kind)) err(w, `kind "${e.kind}" invalid`);
    if (!['host', 'sponsor', 'speaker', 'attendee'].includes(e.role)) err(w, `role "${e.role}" invalid`);
    if (!e.url) err(w, 'url required'); else httpsUrl(w, 'url', e.url);
    textChecks(w, 'blurb', e.blurb, { max: 260 });
    if (typeof e.evidence?.quote !== 'string' || e.evidence.quote.length < 8) err(w, 'evidence quote from the event page required');
    if (!e.end) err(w, 'end required (equal to start for one-day or start-only events)');
  }

  return { errors, warnings, stats };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
  const res = await validate({ root: args.root ? path.resolve(args.root) : undefined, asof: args.asof || null });
  if (args.json) console.log(JSON.stringify(res, null, 1));
  else {
    const show = (list, label, cap) => { list.slice(0, cap).forEach((x) => console.log(`${label} ${x.where}: ${x.msg}`)); if (list.length > cap) console.log(`${label} … ${list.length - cap} more`); };
    if (!args.quiet) show(res.warnings, 'WARN ', Number(args.maxWarn || 40));
    show(res.errors, 'ERROR', Number(args.maxErr || 200));
    console.log(`\nitems=${res.stats.items} tiers=${JSON.stringify(res.stats.byTier)} weeks=${res.stats.weeks || 0} months=${res.stats.months || 0} quarters=${res.stats.quarters || 0} events=${res.stats.events}`);
    console.log(`${res.errors.length} error(s), ${res.warnings.length} warning(s)`);
  }
  process.exitCode = res.errors.length ? 1 : 0;
}
