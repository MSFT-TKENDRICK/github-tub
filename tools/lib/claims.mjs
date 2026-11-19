import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_ID = /^s-[0-9a-f]{12}$/;
const CLAIM_ID = /^c-[0-9a-f]{10}$/;
const TRACKING = /^(utm_[^=]+|fbclid|gclid|mc_cid|mc_eid)$/i;
const SOURCE_KINDS = new Set(['changelog', 'blog', 'vscode', 'vscode-blog', 'visualstudio', 'next', 'commandline', 'research', 'event', 'docs', 'other']);
const FETCH_METHODS = new Set(['wp-api', 'html', 'curl', 'firecrawl']);
const CLAIM_TYPES = new Set(['availability', 'feature', 'change', 'deprecation', 'requirement', 'metric', 'policy', 'event']);
const ALLOWED_HOSTS = new Set([
  'github.blog', 'github.com', 'githubusercontent.com', 'githubassets.com', 'githubnext.com',
  'visualstudio.com', 'microsoft.com', 'azure.com', 'jetbrains.com', 'eclipse.org', 'apple.com',
  'openai.com', 'anthropic.com', 'google.com', 'aka.ms', 'githubuniverse.com', 'kubecon.io',
  'cncf.io', 'linuxfoundation.org', 'opensource.org', 'githubcopilotdevdays.com', 'msbuild.microsoft.com',
  'build.microsoft.com', 'ghe.com', 'gh.io', 'git-scm.com', 'npmjs.com', 'python.org', 'nodejs.org',
  'rust-lang.org', 'visualstudio.microsoft.com', 'code.visualstudio.com', 'devblogs.microsoft.com', 'github.dev',
]);

export function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

export function canonicalUrl(input) {
  const url = new URL(input);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Source URL must be an HTTPS URL without credentials.');
  const host = url.hostname.toLowerCase();
  if (![...ALLOWED_HOSTS].some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) {
    throw new Error(`Source host "${host}" is not allowlisted.`);
  }
  url.hostname = host;
  url.hash = '';
  for (const key of [...url.searchParams.keys()]) if (TRACKING.test(key)) url.searchParams.delete(key);
  url.searchParams.sort();
  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/+$/, '');
  return url.href;
}

export function sourceId(url) {
  return `s-${sha256(canonicalUrl(url)).slice(0, 12)}`;
}

export function claimId(sid, text) {
  if (!SOURCE_ID.test(sid)) throw new Error(`Invalid source id "${sid}".`);
  return `c-${sha256(`${sid}\n${normalizeClaim(text)}`).slice(0, 10)}`;
}

export function normalizeClaim(text) {
  return String(text ?? '').normalize('NFKC').replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim();
}

export function normalizeEvidence(text) {
  return String(text ?? '').normalize('NFKC')
    .replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_~`>#]/g, '')
    .replace(/\s+/g, ' ').trim();
}

export function createSource({ url, kind, publisher, title, published, retrieved = new Date().toISOString(), via, role = 'primary', text, check }) {
  const canonical = canonicalUrl(url);
  if (!title?.trim() || !publisher?.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(published || '')) throw new Error('Source requires title, publisher and YYYY-MM-DD published date.');
  if (!SOURCE_KINDS.has(kind)) throw new Error(`Unknown source kind "${kind}".`);
  if (!FETCH_METHODS.has(via)) throw new Error(`Unknown source fetch method "${via}".`);
  if (!['primary', 'related'].includes(role)) throw new Error(`Unknown source role "${role}".`);
  if (!check || check.ok !== true || !Number.isInteger(check.status) || check.status < 200 || check.status >= 300) {
    throw new Error('A source must have a successful HTTP link check before it can be recorded.');
  }
  const normalized = normalizeEvidence(text);
  if (!normalized) throw new Error('A source needs extracted text to establish provenance.');
  return {
    id: sourceId(canonical), url: canonical, kind, publisher, title: title.trim(), published, role,
    retrieved, via, sha256: sha256(normalized), bytes: Buffer.byteLength(normalized, 'utf8'),
    check: { ok: true, status: check.status, at: check.at || new Date().toISOString(), ...(check.finalUrl ? { finalUrl: check.finalUrl } : {}) },
  };
}

export function createClaim({ sid, text, quote, type, loc, verifiedAt = new Date().toISOString() }) {
  const normalizedText = normalizeClaim(text);
  const normalizedQuote = String(quote ?? '').trim();
  if (normalizedText.length < 30 || normalizedText.length > 280) throw new Error('Claim text must be 30–280 characters.');
  if (normalizedQuote.length < 20 || normalizedQuote.length > 280) throw new Error('Evidence quote must be 20–280 characters.');
  if (!CLAIM_TYPES.has(type)) throw new Error(`Unknown claim type "${type}".`);
  return {
    id: claimId(sid, normalizedText), sid, text: normalizedText, quote: normalizedQuote, type,
    ...(loc ? { loc } : {}),
    v: { status: 'grounded', by: 'grounding', at: verifiedAt },
  };
}

export function validateClaim(claim, source, sourceText) {
  const errors = [];
  if (!claim || !CLAIM_ID.test(claim.id || '')) errors.push('invalid claim id');
  if (!source || !SOURCE_ID.test(claim?.sid || '') || source.id !== claim?.sid) errors.push('missing or mismatched source');
  if (!source?.check?.ok) errors.push('source link is not verified working');
  if (SOURCE_ID.test(claim?.sid || '') && claim?.id !== claimId(claim.sid, claim.text)) errors.push('claim id does not match source and text');
  if ((claim?.text || '').length < 30 || (claim?.text || '').length > 280) errors.push('claim text must be 30–280 characters');
  if ((claim?.quote || '').length < 20 || (claim?.quote || '').length > 280) errors.push('quote must be 20–280 characters');
  if (!CLAIM_TYPES.has(claim?.type)) errors.push(`unknown claim type "${claim?.type}"`);
  if (claim?.v?.status !== 'grounded' || !['grounding', 'llm-judge', 'human'].includes(claim?.v?.by) || !claim?.v?.at) errors.push('claim verification record is invalid or not grounded');
  if (sourceText !== undefined && !normalizeEvidence(sourceText).includes(normalizeEvidence(claim?.quote))) errors.push('quote does not occur in fetched source text');

  const evidence = normalizeEvidence(`${claim?.quote || ''} ${source?.title || ''} ${source?.published || ''}`);
  const asserted = normalizeClaim(claim?.text || '');
  const numeric = asserted.match(/\b(?:\d{1,4}(?:[.,]\d{3})*(?:\.\d+)?%?|v?\d+(?:\.\d+){1,3}|20\d{2}-\d{2}-\d{2})\b/gi) || [];
  for (const token of numeric) if (!evidence.toLowerCase().includes(token.toLowerCase())) errors.push(`unsupported number/date/version "${token}"`);
  if (/^(it|this|these|they|those|we|our|the feature|the update)\b/i.test(asserted)) errors.push('claim is not decontextualized');
  if (/\b(revolutionary|game[- ]changing|world[- ]class|seamless|effortless|groundbreaking)\b/i.test(asserted)) errors.push('claim contains marketing language');
  return errors;
}

export async function readLedger(file) {
  try {
    const data = JSON.parse(await readFile(file, 'utf8'));
    if (!Array.isArray(data)) throw new Error(`${file} must contain a JSON array.`);
    return data;
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

export async function mergeLedger(file, records, { replaceIds = false } = {}) {
  if (!Array.isArray(records)) throw new TypeError('Ledger records must be an array.');
  await mkdir(path.dirname(file), { recursive: true });
  const current = await readLedger(file);
  const byId = new Map(current.map((record) => [record.id, record]));
  for (const record of records) {
    if (!record?.id) throw new Error('Ledger record is missing an id.');
    const prior = byId.get(record.id);
    if (prior && JSON.stringify(prior) !== JSON.stringify(record) && !replaceIds) throw new Error(`Conflicting ledger record "${record.id}". Re-run with explicit refresh after reviewing the source change.`);
    byId.set(record.id, record);
  }
  const result = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  const temp = `${file}.${process.pid}.tmp`;
  await writeFile(temp, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
  await rename(temp, file);
  return result.length;
}

export { CLAIM_ID, SOURCE_ID };
