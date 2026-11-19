#!/usr/bin/env node
// Verifies researched GitHub event listings against each event's own page. An event is kept only when its page loads
// and states both the event's distinctive name and its start date; the location is kept only when the page states it.
// The exact supporting quote and the check result are recorded as evidence. Researched blurbs are never published.
// With no --in, verifies the combined seed and research registry.
//   node tools/verify-events.mjs [--in=events.json] [--out=data/staging/extra/events.verified.json]
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { canonicalUrl, normalizeEvidence } from './lib/claims.mjs';
import { fetchSource } from './lib/fetcher.mjs';
import { ROOT, loadEvents } from './lib/raw.mjs';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MON = '(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\\.?';
const ANY_DATE = new RegExp(`\\b${MON}\\s+\\d{1,2}(?:st|nd|rd|th)?\\b|\\b\\d{1,2}(?:\\s*[-–]\\s*\\d{1,2})?\\s+${MON}(?![a-z])|\\b20\\d\\d-\\d\\d-\\d\\d\\b`, 'gi');
const STOP = new Set(['github', 'microsoft', 'the', 'and', 'for', 'with', 'at', 'of', 'on', 'in', 'to', 'webinar']);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Patterns for one calendar date as pages write it: "March 15th", "Sept 3", "23-26 March", "2026-03-23".
export function datePatterns(iso) {
  const [, m, d] = iso.split('-').map(Number);
  const names = [...new Set([MONTHS[m - 1], MONTHS[m - 1].slice(0, 3), ...(m === 9 ? ['Sept'] : [])])].map(esc).join('|');
  return [
    new RegExp(`\\b(?:${names})\\.?\\s+${d}(?:st|nd|rd|th)?(?![0-9])`, 'gi'),
    new RegExp(`\\b(?:${names})\\.?\\s+\\d{1,2}(?:st|nd|rd|th)?\\s*[-–]\\s*${d}(?:st|nd|rd|th)?(?![0-9])`, 'gi'),
    new RegExp(`\\b${d}(?:\\s*[-–]\\s*\\d{1,2})?\\s+(?:${names})(?![a-z])`, 'gi'),
    new RegExp(`\\b${esc(iso)}\\b`, 'g'),
  ];
}

export function dateHits(text, iso) {
  const hits = [];
  for (const re of datePatterns(iso)) for (const m of text.matchAll(re)) hits.push({ at: m.index, end: m.index + m[0].length });
  return hits.sort((a, b) => a.at - b.at);
}

// Words that must all appear for the page to be naming this event. Parenthetical notes and years are not part of the name.
export function nameTokens(name) {
  return [...new Set(String(name).replace(/\([^)]*\)/g, ' ').normalize('NFKC').replace(/[’‘]/g, "'")
    .split(/[^A-Za-z0-9+']+/).map((w) => w.replace(/'s$|'/g, ''))
    .filter((w) => w.length >= 3 && !/^\d+$/.test(w) && !STOP.has(w.toLowerCase())))];
}

// The page must state the year with the date, or the most recent year it mentions before the date must be the event's year.
function yearHolds(text, hit, year) {
  const after = text.slice(hit.end, hit.end + 30).match(/\b(20\d\d)\b/);
  if (after) return after[1] === year;
  const before = [...text.slice(0, hit.at).matchAll(/\b(20\d\d)\b/g)].pop();
  return Boolean(before && before[1] === year);
}

// The text that belongs to one listing: back to the previous date (max 400 chars) and forward to the end of its sentence.
function listingAround(text, hit) {
  const base = Math.max(0, hit.at - 400);
  let start = base;
  for (const m of text.slice(base, hit.at).matchAll(ANY_DATE)) start = Math.max(start, base + m.index + m[0].length);
  const tail = text.slice(hit.end, hit.end + 100);
  const stop = tail.search(/\.\s|\bRegister\b|\bJoin now\b/);
  return { start, end: hit.end + (stop >= 0 ? stop : tail.length) };
}

function explicitYear(text, hit) {
  const m = text.slice(hit.end, hit.end + 30).match(/^[^]*?\b(20\d\d)\b/);
  return m ? { year: m[1], len: m[0].length } : null;
}

// Occurrence of a word inside the listing that sits closest to the date.
function nearest(listing, word, at) {
  const w = word.toLowerCase();
  let best = -1;
  for (let i = listing.indexOf(w); i >= 0; i = listing.indexOf(w, i + 1)) if (best < 0 || Math.abs(i - at) < Math.abs(best - at)) best = i;
  return best;
}

export function verifyEvent(event, page) {
  const text = normalizeEvidence(page.text);
  const tokens = nameTokens(event.name);
  if (!tokens.length) return { ok: false, reason: 'event name has no distinctive words' };
  const year = event.start.slice(0, 4);
  const hits = dateHits(text, event.start).sort((a, b) => Number(Boolean(explicitYear(text, b))) - Number(Boolean(explicitYear(text, a))) || a.at - b.at);
  if (!hits.length) return { ok: false, reason: `page does not state the start date ${event.start}` };
  const titled = normalizeEvidence(page.title || '').toLowerCase();
  for (const hit of hits) {
    if (!yearHolds(text, hit, year)) continue;
    const span = listingAround(text, hit);
    const listing = text.slice(span.start, span.end).toLowerCase();
    const rel = hit.at - span.start;
    const found = tokens.map((t) => ({ t, i: nearest(listing, t, rel) })).filter((x) => x.i >= 0);
    const named = tokens.every((t) => found.some((x) => x.t === t) || titled.includes(t.toLowerCase()));
    if (!named || !(found.length || tokens.every((t) => titled.includes(t.toLowerCase())))) continue;
    const yr = explicitYear(text, hit);
    let qStart = found.length ? Math.min(hit.at, ...found.map((x) => span.start + x.i)) : Math.max(span.start, text.lastIndexOf(' ', hit.at - 100) + 1);
    for (const phrase of [event.name, event.name.replace(/^GitHub\s+/i, '')].map((p) => p.replace(/\([^)]*\)/g, '').replace(/^Webinar:\s*/i, '').trim())) {
      const at = nearest(listing, normalizeEvidence(phrase), rel);
      if (at >= 0) { qStart = Math.min(qStart, span.start + at); break; }
    }
    const qEnd = Math.max(hit.end + (yr ? yr.len : 0), ...found.map((x) => span.start + x.i + x.t.length));
    if (qEnd - qStart > 320) qStart = text.indexOf(' ', qEnd - 320) + 1;
    while (qStart > 0 && /[A-Za-z0-9]/.test(text[qStart - 1])) qStart--;
    const out = { id: event.id, name: event.name, start: event.start, end: event.start, kind: event.kind, role: event.role, url: canonicalUrl(page.url || event.url) };
    if (event.end && event.end > event.start) {
      if (dateHits(text, event.end).some((h) => yearHolds(text, h, event.end.slice(0, 4)))) out.end = event.end;
      else out.startsOnly = true;
    }
    const lower = text.toLowerCase();
    const parts = String(event.location || '').split(/,| and /).map((p) => p.replace(/\([^)]*\)/g, '').trim()).filter(Boolean);
    if (parts.length && parts.every((p) => lower.includes(p.toLowerCase()))) out.location = event.location;
    out.evidence = { quote: text.slice(qStart, qEnd).trim(), status: page.status, via: page.via, checkedAt: new Date().toISOString() };
    return { ok: true, event: out };
  }
  return { ok: false, reason: `no ${year} listing on the page pairs the name (${tokens.join(', ')}) with ${event.start}` };
}
// Deterministic source-policy rejections (unapproved host, cross-publisher redirect, gone page) mean the listing cannot be
// verified from an approved source, so the event is excluded and reported. Anything else (network, 5xx, 429) aborts.
const POLICY_REJECTION = /is not allowlisted|outside its approved publisher domain|must be an HTTPS URL/;
export function unverifiableSource(error) {
  const leaves = [];
  const walk = (e) => {
    if (!e) return;
    if (Array.isArray(e.errors) && e.errors.length) e.errors.forEach(walk);
    else if (e.cause) walk(e.cause);
    else leaves.push(e);
  };
  walk(error);
  const reasons = leaves.map((e) => (POLICY_REJECTION.test(e.message) ? e.message : [404, 410].includes(e.status) || /HTTP (404|410)\b/.test(e.message) ? e.message : null));
  return reasons.length && reasons.every(Boolean) ? [...new Set(reasons)].join('; ') : null;
}

export async function verifyEvents({ root = ROOT, input, out = 'data/staging/extra/events.verified.json', fetcher = fetchSource, today = new Date().toISOString().slice(0, 10) } = {}) {
  const events = input ? JSON.parse(await readFile(path.resolve(root, input), 'utf8')) : await loadEvents(root);
  // Event pages drop listings once they have happened. A past event whose page was already verified keeps that recorded
  // evidence (quote, status, checkedAt); upcoming events must re-verify every run so cancellations disappear.
  let prior = [];
  try { prior = JSON.parse(await readFile(path.resolve(root, out), 'utf8')); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const priorById = new Map((Array.isArray(prior) ? prior : []).filter((e) => e?.evidence?.quote).map((e) => [e.id, e]));
  const kept = [];
  const dropped = [];
  const retained = [];
  const unverified = (event, reason) => {
    const earlier = priorById.get(event.id);
    if (earlier && event.start <= today && earlier.start === event.start) {
      kept.push(earlier);
      retained.push({ id: event.id, reason, checkedAt: earlier.evidence.checkedAt });
    } else dropped.push({ id: event.id, reason });
  };
  for (const event of events) {
    try {
      const page = await fetcher(event.url);
      if (!(page.status >= 200 && page.status < 300)) throw new Error(`HTTP ${page.status}`);
      const result = verifyEvent(event, page);
      if (result.ok) kept.push(result.event); else unverified(event, result.reason);
    } catch (error) {
      const reason = unverifiableSource(error);
      if (reason) { unverified(event, `source cannot be verified: ${reason}`); continue; }
      throw new Error(`Event verification failed for ${event.id} (${event.url}): ${error.message}`, { cause: error });
    }
  }
  kept.sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
  await writeFile(path.resolve(root, out), `${JSON.stringify(kept, null, 2)}\n`, 'utf8');
  return { kept: kept.length, retained, dropped };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a, true]; }));
  try {
    const result = await verifyEvents({ ...(args.in ? { input: args.in } : {}), ...(args.out ? { out: args.out } : {}) });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
