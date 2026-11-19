// Inline citation markers shared by the viewer, the export server and the build tools (no DOM, no Node APIs).
//
//   "Usage-based billing is live for all plans.[^c-1a2b3c4d5e] Budgets are optional.[^c-9f8e7d6c5b,c-0011223344]"
//
// A marker follows the punctuation of the sentence (or clause) it supports and names one or more claim ids.
export const CLAIM_ID_RE = /^c-[0-9a-f]{10}$/;
const MARK_SRC = String.raw`\[\^(c-[0-9a-f]{10}(?:,c-[0-9a-f]{10})*)\]`;
const markRe = () => new RegExp(MARK_SRC, 'g');
// Anything that looks like an attempted marker, well-formed or not (the checker reports malformed ones).
const LOOSE_RE = /\[\^[^\]]*\]/g;
const ABBREV = /(?:^|[\s(])(?:e\.g|i\.e|vs|etc|approx|incl|no|inc|ltd|st|mr|mrs|dr)\.$/i;

export function hasCites(text) { return markRe().test(text || ''); }

// The text with markers removed — what search, length limits, brand lint and plain-text exports see.
export function stripCites(text) {
  return String(text ?? '').replace(new RegExp(String.raw`\s*` + MARK_SRC, 'g'), '').replace(/[ \t]{2,}/g, ' ').trim();
}

// Unique claim ids in order of first appearance.
export function citedIds(text) {
  const out = []; const seen = new Set();
  for (const m of String(text ?? '').matchAll(markRe())) for (const id of m[1].split(',')) if (!seen.has(id)) { seen.add(id); out.push(id); }
  return out;
}

// Markers that are not well formed, e.g. "[^a]" or "[^c-123]".
export function malformedCites(text) {
  return [...String(text ?? '').matchAll(LOOSE_RE)].map((m) => m[0]).filter((s) => !new RegExp('^' + MARK_SRC + '$').test(s));
}

// [{text} | {cite:[ids]}] in reading order; the space before a marker is trimmed.
export function runs(text) {
  const src = String(text ?? ''); const out = []; let last = 0;
  for (const m of src.matchAll(markRe())) {
    const before = src.slice(last, m.index).replace(/\s+$/, '');
    if (before) out.push({ text: before });
    out.push({ cite: m[1].split(',') });
    last = m.index + m[0].length;
  }
  const rest = src.slice(last);
  if (rest.trim()) out.push({ text: rest });
  return out;
}

// Sentences with the claim ids that support each. A boundary is terminal punctuation (plus closers and
// markers) followed by whitespace and a capital, digit, quote or bracket; common abbreviations are skipped.
export function sentences(text) {
  const src = String(text ?? '').trim(); const out = []; if (!src) return out;
  const re = /[.!?]+["')\]]*(?:\[\^[^\]]*\])*(?=\s+[A-Z0-9"'(\[`]|\s*$)/g;
  let start = 0; let m;
  while ((m = re.exec(src))) {
    const end = m.index + m[0].length;
    const head = src.slice(start, m.index + 1);
    if (ABBREV.test(head) && end < src.length) continue;
    push(src.slice(start, end)); start = end;
  }
  if (src.slice(start).trim()) push(src.slice(start));
  function push(raw) { raw = raw.trim(); out.push({ raw, text: stripCites(raw), ids: citedIds(raw) }); }
  return out;
}

// 1-based display numbers in order of first use, e.g. one numberer per card or per narrative block.
export function numberer(start = 1) {
  const map = new Map();
  const num = (id) => { if (!map.has(id)) map.set(id, start + map.size); return map.get(id); };
  num.map = map;
  num.ids = () => [...map.keys()];
  return num;
}

export function citationUrl(input) {
  try {
    const url = new URL(input);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    url.hash = '';
    for (const key of [...url.searchParams.keys()]) if (/^(utm_[^=]+|fbclid|gclid|mc_cid|mc_eid)$/i.test(key)) url.searchParams.delete(key);
    url.searchParams.sort();
    if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
    return url.href;
  } catch { return null; }
}

export function verifiedCitations(idx, text, allowedIds = null) {
  const parts = sentences(text);
  if (!parts.length || parts.some((sentence) => !sentence.ids.length)) return false;
  const allowed = allowedIds ? new Set(allowedIds) : null;
  return parts.every((sentence) => sentence.ids.every((id) => {
    if (allowed && !allowed.has(id)) return false;
    const claim = idx.claimById?.get(id);
    const source = claim && idx.sourceById?.get(claim.sid);
    return claim?.v?.status === 'grounded' && Boolean(source?.check?.ok) && Boolean(citationUrl(source.url));
  }));
}
