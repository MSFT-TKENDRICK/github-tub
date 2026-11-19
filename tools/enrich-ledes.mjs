#!/usr/bin/env node
// Adds extractive, grounded summaries to title-only items: up to three opening sentences of each item's own source,
// quoted verbatim and re-verified against a fresh fetch of the publisher page. Nothing is paraphrased or written.
//   node tools/enrich-ledes.mjs [--src=data/staging/verified] [--out=data/staging/enriched] [--concurrency=6] [--limit=N]
//
// Tiers: an item that the curators marked headline/notable and that now has a verified summary becomes "notable" (headline
// needs an editorial "why it matters", which this tool never invents). Everything else keeps its tier.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { canonicalUrl, createClaim, normalizeEvidence, sha256, sourceId, validateClaim } from './lib/claims.mjs';
import { decodeHtml, fetchSource } from './lib/fetcher.mjs';
import { writeContent } from './lib/content-io.mjs';
import { claimForTitle, quoteFor } from './backfill-verified.mjs';
import { loadContent, validate } from './validate.mjs';
import { checkClaims } from './check-claims.mjs';
import { sentences, verifiedCitations } from '../web/js/cite.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW_FILES = ['changelog', 'blog', 'visualstudio', 'next', 'vscode-blog', 'vscode', 'commandline'];
const MAX_SENTENCES = 3;
const MAX_CHARS = 430;
const SUMMARY_LIMIT = 520;
const PROMOTE = new Set(['headline', 'notable']);
const SKIP_LINE = /^(on this page|table of contents|share|skip to|subscribe|read more|learn more|join us|try it|see also)\b/i;

function parseArgs(argv) {
  const o = { root: ROOT, src: 'data/staging/verified', out: 'data/staging/enriched', curated: 'data/staging/real', concurrency: 6, limit: Infinity, asof: '2026-11-05' };
  for (const arg of argv) {
    const [k, v] = arg.replace(/^--/, '').split('=');
    if (k === 'src' || k === 'out' || k === 'curated' || k === 'asof') o[k] = v;
    else if (k === 'concurrency' || k === 'limit') o[k] = Number(v);
    else if (k === 'root') o.root = path.resolve(v);
    else throw new Error(`Unknown option "${arg}".`);
  }
  return o;
}

async function loadRaw(root) {
  const byId = new Map();
  for (const name of RAW_FILES) {
    try {
      const data = JSON.parse(await readFile(path.join(root, 'data', 'raw', `${name}.json`), 'utf8'));
      for (const record of data.items || []) if (record.id) byId.set(record.id, record);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return byId;
}

// Opening paragraphs in reading order. List bullets and navigation fragments are not prose and are skipped.
function paragraphs(raw) {
  const body = String(raw.text || '').replace(/\r/g, '');
  const out = body.split(/\n{2,}|\n(?=[A-Z])/).map((p) => p.trim()).filter((p) => p && !p.startsWith('-') && !p.startsWith('*') && !SKIP_LINE.test(p));
  const lede = String(raw.lede || '').trim();
  if (lede && !/(…|\[…\]|\.\.\.)\s*$/.test(lede) && !out.slice(0, 2).some((p) => p.startsWith(lede.slice(0, 40)))) out.unshift(lede);
  return out.slice(0, 4);
}

const decent = (s) => s.length >= 30 && s.length <= 280 && /^[A-Z0-9"'“‘]/.test(s) && /\.["')”’]?$/.test(s)
  && !/!|…|https?:|\]\(|\{|\}|\|/.test(s) && !/:\s*$/.test(s) && (s.match(/\s/g) || []).length >= 5
  && !FIRST_PERSON.test(s) && !FLUFF.test(s) && !NOTE.test(s) && !OFF_BRAND.test(s);
// Quotes are verbatim, so a sentence with publisher spellings our brand lint rejects ("Github") is skipped, not edited.
const OFF_BRAND = /\bGithub\b|\bGITHUB\b|\bGit Hub\b|\bgit-hub\b|\bV[Ss]code\b|\bVscode\b|\bMS Copilot\b|\bMicrosoft GitHub\b/;
const FIRST_PERSON = /(^|[^\w’'])(I|I[’']m|I[’']ve|I[’']d|I[’']ll|my|me|mine)(?=$|[^\w’'])/;
const FLUFF = /^(here[’']s|here is|let[’']s|read on|in this (post|article)|this (post|article)|stay tuned|happy coding|thank you|thanks)\b|what[’']s new since/i;
// A summary must open the way the publisher opened; these only make sense after something else.
const DANGLING = /^(in addition|additionally|also|and|but|however|so|then|instead|for example|for instance|under|as a result|thanks to|finally|plus|meanwhile|that said|with this|now|previously|other|another|both|each|some time ago|run|try|see|check|click|go to|select|open|use|to)\b/i;
const NOTE = /^(editor[’']s note|update|updated|note|important|disclaimer)\b[^.]*:/i;
const prose = (p) => /[.?]["')”’]?\s*$/.test(p) || /[.?]\s+[A-Z]/.test(p);

// Consecutive sentences from the opening prose paragraph(s); stops at the first unusable sentence or new heading.
export function candidateSentences(raw) {
  const out = [];
  let started = false;
  for (const p of paragraphs(raw)) {
    if (!started && (NOTE.test(p) || !prose(p))) continue;
    if (started && !prose(p)) break;
    started = true;
    for (const { text } of sentences(p)) {
      const s = text.replace(/\s+/g, ' ').trim();
      if (!decent(s) || (!out.length && DANGLING.test(s))) return out;
      if (!out.includes(s)) out.push(s);
      if (out.length >= MAX_SENTENCES) return out;
    }
  }
  return out;
}

function claimType(item) {
  if (item.tag === 'Deprecation') return 'deprecation';
  if (item.tag === 'Release') return 'feature';
  return 'change';
}

export function summarize(item, raw, source, pageText, verifiedAt) {
  const page = normalizeEvidence(pageText);
  const picked = [];
  let chars = 0;
  for (const sentence of candidateSentences(raw)) {
    if (picked.length >= MAX_SENTENCES || chars + sentence.length > MAX_CHARS) break;
    if (!page.includes(normalizeEvidence(sentence))) break;
    let claim;
    try { claim = createClaim({ sid: source.id, text: sentence, quote: sentence, type: claimType(item), verifiedAt }); }
    catch { break; }
    if (validateClaim(claim, source, pageText).length) break;
    picked.push({ sentence, claim });
    chars += sentence.length + 1;
  }
  if (!picked.length) return null;
  const summary = picked.map(({ sentence, claim }) => `${sentence}[^${claim.id}]`).join(' ');
  if (summary.length > SUMMARY_LIMIT) return null;
  const claims = picked.map((p) => p.claim);
  const idx = { claimById: new Map(claims.map((c) => [c.id, c])), sourceById: new Map([[source.id, source]]) };
  return verifiedCitations(idx, summary) ? { summary, claims } : null;
}

// Release-note items whose own heading could not be grounded when first verified fell back to the page title
// ("Visual Studio Code 1.145"). Once the heading is quotable from the page, restore it with its own title claim.
export function regroundTitle(item, raw, source, pageText, verifiedAt) {
  const title = decodeHtml(String(raw?.title || '')).replace(/\s+/g, ' ').trim();
  if (!title || title === item.title || item.title !== source.title) return null;
  const claim = claimForTitle(source, title, pageText, verifiedAt);
  if (!claim) return null;
  const prior = new Set(item.fieldClaims?.title || []);
  const other = new Set(Object.entries(item.fieldClaims || {}).filter(([k]) => k !== 'title').flatMap(([, ids]) => ids));
  return {
    claim,
    item: {
      ...item,
      title,
      claims: [...new Set([...(item.claims || []).filter((id) => !prior.has(id) || other.has(id)), claim.id])],
      fieldClaims: { ...(item.fieldClaims || {}), title: [claim.id] },
    },
  };
}

async function cachedText(root, source) {
  try {
    const text = await readFile(path.join(root, 'data', 'raw', `${source.id}.md`), 'utf8');
    // Older extractions kept named entities (&rsquo;); refetch those so quotes match the page as readers see it.
    if (/&(#x?[0-9a-f]+|[a-z][a-z0-9]+);/i.test(text)) return null;
    return sha256(normalizeEvidence(text)) === source.sha256 ? text : null;
  } catch { return null; }
}

export async function enrichLedes({
  root = ROOT, src = 'data/staging/verified', out = 'data/staging/enriched', curated = 'data/staging/real',
  concurrency = 6, limit = Infinity, asof = '2026-11-05', fetcher = fetchSource, now = () => new Date().toISOString(),
} = {}) {
  const [content, curatedContent, rawById] = await Promise.all([
    loadContent(path.resolve(root, src)), loadContent(path.resolve(root, curated)), loadRaw(root),
  ]);
  const curatedTier = new Map(Object.values(curatedContent.items).flat().map((i) => [i.id, i.tier]));
  const sources = new Map(Object.values(content.sources).flat().map((s) => [s.id, s]));
  const claims = new Map(Object.values(content.claims).flat().map((c) => [c.id, c]));
  const items = Object.values(content.items).flat();

  const groups = new Map();
  for (const item of items) {
    const raw = rawById.get(item.id);
    if (!raw) continue;
    const sid = sourceId(canonicalUrl(item.url));
    if (!sources.has(sid)) continue;
    const fallbackTitle = item.title === sources.get(sid).title && decodeHtml(raw.title || '').trim() !== item.title;
    if (item.summary && !fallbackTitle) continue;
    (groups.get(sid) || groups.set(sid, []).get(sid)).push(item);
  }
  const queue = [...groups.keys()].slice(0, limit);
  const stats = { sources: queue.length, fetched: 0, cached: 0, changed: 0, failed: 0, enriched: 0, promoted: 0, noSentence: 0, retitled: 0 };
  const failures = [];
  let next = 0;
  await Promise.all(Array.from({ length: Math.max(1, Math.min(concurrency, queue.length)) }, async () => {
    while (next < queue.length) {
      const sid = queue[next++];
      const source = sources.get(sid);
      let text = await cachedText(root, source);
      try {
        let refreshed = source;
        const fromCache = Boolean(text);
        if (fromCache) stats.cached += 1;
        else {
          const fetched = await fetcher(source.url);
          text = fetched.text;
          stats.fetched += 1;
          const digest = sha256(normalizeEvidence(text));
          if (digest !== source.sha256) {
            // The page (or its extraction) changed since it was recorded: record the new retrieval. Every existing
            // claim must still hold against it (below), otherwise the source is left untouched for review.
            const at = now();
            refreshed = { ...source, retrieved: at, via: fetched.via, sha256: digest, bytes: Buffer.byteLength(normalizeEvidence(text), 'utf8'),
              check: { ok: true, status: fetched.status, at, ...(fetched.url ? { finalUrl: canonicalUrl(fetched.url) } : {}) } };
          }
        }
        // Title claims quote the title exactly as the page shows it (claim ids depend only on claim text). Titles recorded
        // before entity decoding was fixed (e.g. "Copilot&#039;s") are decoded, which yields a new claim id.
        const updates = [];
        const renamed = new Map();
        for (const prior of [...claims.values()].filter((c) => c.sid === sid)) {
          const titled = /^A published update is titled "([\s\S]+)"\.$/.exec(prior.text);
          let claim = prior;
          if (titled) {
            const title = decodeHtml(titled[1]);
            const quote = quoteFor(title, text);
            if (!quote) throw new Error('the recorded title no longer appears on the page');
            if (title !== titled[1]) {
              claim = { ...createClaim({ sid, text: `A published update is titled "${title}".`, quote, type: prior.type, verifiedAt: now() }) };
              renamed.set(prior.id, claim.id);
            } else if (quote !== prior.quote) claim = { ...prior, quote, v: { ...prior.v, at: now() } };
          }
          if (validateClaim(claim, refreshed, text).length) throw new Error('an existing claim no longer matches the page');
          if (claim !== prior) updates.push(claim);
        }
        for (const claim of updates) claims.set(claim.id, claim);
        for (const oldId of renamed.keys()) claims.delete(oldId);
        if (renamed.size) {
          const swap = (ids) => (ids || []).map((id) => renamed.get(id) || id);
          for (const item of items) {
            if (!(item.claims || []).some((id) => renamed.has(id))) continue;
            item.claims = swap(item.claims);
            item.fieldClaims = Object.fromEntries(Object.entries(item.fieldClaims || {}).map(([k, v]) => [k, swap(v)]));
            item.title = decodeHtml(item.title);
          }
          refreshed = { ...refreshed, title: decodeHtml(refreshed.title || '') };
        }
        if (refreshed !== source) { sources.set(sid, refreshed); stats.changed += 1; }
        if (!fromCache) {
          await mkdir(path.join(root, 'data', 'raw'), { recursive: true });
          await writeFile(path.join(root, 'data', 'raw', `${sid}.md`), text, 'utf8');
        }
      } catch (error) {
        stats.failed += 1;
        failures.push({ url: source.url, message: String(error?.message || error).slice(0, 300) });
        continue;
      }
      const current = sources.get(sid);
      for (const item of groups.get(sid)) {
        const retitled = regroundTitle(item, rawById.get(item.id), current, text, now());
        if (retitled) {
          if (!claims.has(retitled.claim.id)) claims.set(retitled.claim.id, retitled.claim);
          Object.assign(item, retitled.item);
          stats.retitled += 1;
        }
        if (item.summary) continue;
        const result = summarize(item, rawById.get(item.id), current, text, now());
        if (!result) { stats.noSentence += 1; continue; }
        for (const claim of result.claims) if (!claims.has(claim.id)) claims.set(claim.id, claim);
        item.summary = result.summary;
        item.claims = [...new Set([...(item.claims || []), ...result.claims.map((c) => c.id)])];
        item.fieldClaims = { ...(item.fieldClaims || {}), summary: result.claims.map((c) => c.id) };
        stats.enriched += 1;
        if (item.tier === 'minor' && PROMOTE.has(curatedTier.get(item.id))) { item.tier = 'notable'; stats.promoted += 1; }
      }
    }
  }));

  const byMonth = (records, monthOf) => {
    const outMap = {};
    for (const r of records) (outMap[monthOf(r)] ||= []).push(r);
    return outMap;
  };
  const next_ = {
    ...content,
    items: byMonth(items, (i) => i.date.slice(0, 7)),
    sources: byMonth([...sources.values()], (s) => s.published.slice(0, 7)),
    claims: byMonth([...claims.values()], (c) => sources.get(c.sid).published.slice(0, 7)),
  };
  const outDir = path.resolve(root, out);
  await writeContent(path.join(outDir, 'content'), next_);
  const report = { ...stats, items: items.length, withSummary: items.filter((i) => i.summary).length, failuresSample: failures.slice(0, 40) };
  const validation = await validate({ data: next_, asof });
  // Page caches live under the extension root's data/raw regardless of where staged content is written.
  const provenance = await checkClaims({ root, data: next_ });
  const result = { ...report, validationErrors: validation.errors.slice(0, 20), validationErrorCount: validation.errors.length, provenanceErrors: provenance.errors.slice(0, 20), provenanceErrorCount: provenance.errors.length };
  await writeFile(path.join(outDir, 'report.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  return result;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await enrichLedes(parseArgs(process.argv.slice(2)));
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    if (result.validationErrorCount || result.provenanceErrorCount) process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`${error.stack || error.message}\n`);
    process.exitCode = 1;
  }
}
