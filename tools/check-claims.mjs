#!/usr/bin/env node
// Strict provenance gate for claims, item summaries and period narratives.
//   node tools/check-claims.mjs [--root=<extension-root>] [--json]
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { citedIds, malformedCites, sentences, stripCites } from '../web/js/cite.mjs';
import { canonicalUrl, normalizeEvidence, sha256, sourceId, validateClaim } from './lib/claims.mjs';
import { loadContent } from './validate.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

function args(argv) {
  const out = { root: path.resolve(HERE, '..'), json: false };
  for (const arg of argv) {
    if (arg === '--json') out.json = true;
    else if (arg.startsWith('--root=')) out.root = path.resolve(arg.slice(7));
    else throw new Error(`Unknown option "${arg}".`);
  }
  return out;
}

const flatten = (files) => Object.values(files || {}).flat();

export async function checkClaims({ root = path.resolve(HERE, '..'), data = null } = {}) {
  const content = data || await loadContent(root);
  const errors = [];
  const warnings = [];
  const issue = (where, message) => errors.push({ where, message });
  const sourceById = new Map(flatten(content.sources).map((source) => [source.id, source]));
  const claimById = new Map();
  for (const claim of flatten(content.claims)) {
    if (claimById.has(claim.id)) issue(`claims#${claim.id}`, 'duplicate claim id');
    claimById.set(claim.id, claim);
  }

  const sourceText = new Map();
  let uncachedSources = 0;
  for (const source of sourceById.values()) {
    if (!source?.id || !source.url || !source.published) { issue(`sources#${source?.id || '?'}`, 'missing id, url or published date'); continue; }
    try {
      if (canonicalUrl(source.url) !== source.url) issue(`sources#${source.id}`, 'url is not canonical');
      if (sourceId(source.url) !== source.id) issue(`sources#${source.id}`, 'source id does not match canonical URL');
    } catch (error) { issue(`sources#${source.id}`, error.message); }
    if (source.check?.ok !== true) issue(`sources#${source.id}`, 'source link is not marked working');
    if (!['primary', 'related'].includes(source.role)) issue(`sources#${source.id}`, 'role must be primary or related');
    if (!/^[0-9a-f]{64}$/.test(source.sha256 || '') || !Number.isInteger(source.bytes) || source.bytes <= 0) issue(`sources#${source.id}`, 'missing extraction hash or byte count');
    const cache = path.join(root, 'data', 'raw', `${source.id}.md`);
    try {
      const text = await readFile(cache, 'utf8');
      sourceText.set(source.id, text);
      if (sha256(normalizeEvidence(text)) !== source.sha256) issue(`sources#${source.id}`, 'cached extraction hash does not match provenance record');
      if (Buffer.byteLength(normalizeEvidence(text), 'utf8') !== source.bytes) issue(`sources#${source.id}`, 'cached extraction byte count does not match provenance record');
    }
    catch { uncachedSources++; }
  }
  if (uncachedSources) warnings.push({
    where: 'sources',
    message: `${uncachedSources} fetched source text(s) are not retained; exact evidence quotes are stored with grounded claims.`,
  });

  for (const claim of claimById.values()) {
    const source = sourceById.get(claim.sid);
    if (!source) { issue(`claims#${claim.id}`, `unknown source "${claim.sid}"`); continue; }
    const problems = validateClaim(claim, source, sourceText.get(source.id));
    for (const message of problems) issue(`claims#${claim.id}`, message);
  }

  // Keep the item/source check independent of ledger key construction.
  const sourceByCanonicalUrl = new Map();
  for (const source of sourceById.values()) {
    try { sourceByCanonicalUrl.set(canonicalUrl(source.url), source); } catch { /* reported above */ }
  }

  const checkText = (where, text, itemClaims = null) => {
    if (!text) return;
    for (const bad of malformedCites(text)) issue(where, `malformed citation marker ${bad}`);
    const ids = citedIds(text);
    for (const sentence of sentences(text)) {
      if (!sentence.ids.length) issue(where, `uncited factual sentence: "${stripCites(sentence.text).slice(0, 100)}"`);
      for (const id of sentence.ids) {
        const claim = claimById.get(id);
        if (!claim) issue(where, `unknown claim "${id}"`);
        else if (itemClaims && !itemClaims.has(id)) issue(where, `claim "${id}" is not attached to this item`);
      }
    }
    return ids;
  };

  for (const [month, items] of Object.entries(content.items || {})) {
    for (const item of items) {
      const where = `items/${month}#${item.id}`;
      let source;
      try { source = sourceByCanonicalUrl.get(canonicalUrl(item.url)); } catch (error) { issue(where, `invalid source URL: ${error.message}`); }
      if (!source) issue(where, 'item has no provenance source record');
      else if (source.check?.ok !== true) issue(where, 'item source link is not verified working');

      const attached = new Set(item.claims || []);
      const fieldClaims = item.fieldClaims && typeof item.fieldClaims === 'object' && !Array.isArray(item.fieldClaims)
        ? item.fieldClaims : {};
      if (item.fieldClaims !== undefined && fieldClaims !== item.fieldClaims) issue(where, 'fieldClaims must be an object of field names to claim-id arrays');
      const requiredFields = ['plans', 'ides', 'effective', 'stage', 'version'];
      for (const field of requiredFields) {
        const present = field === 'plans' || field === 'ides' ? Array.isArray(item[field]) && item[field].length > 0 : Boolean(item[field]);
        if (present && (!Array.isArray(fieldClaims[field]) || !fieldClaims[field].length)) issue(where, `${field} requires fieldClaims.${field}`);
      }
      if (source) {
        const normalizeTitle = (value) => String(value || '').normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase();
        const title = normalizeTitle(item.title); const sourceTitle = normalizeTitle(source.title);
        const titleMatches = title === sourceTitle || (sourceTitle.startsWith(title) && title.length >= 24);
        if (!titleMatches && (!Array.isArray(fieldClaims.title) || !fieldClaims.title.length)) issue(where, 'rewritten title requires fieldClaims.title');
      }
      if ((item.summary || item.admin || item.why) && attached.size === 0) issue(where, 'summarized item has no attached claims');
      for (const id of attached) {
        const claim = claimById.get(id);
        if (!claim) issue(where, `unknown attached claim "${id}"`);
        else if (source && claim.sid !== source.id) issue(where, `claim "${id}" belongs to a different source`);
      }
      for (const [field, ids] of Object.entries(fieldClaims)) {
        if (!Array.isArray(ids) || !ids.length) { issue(where, `fieldClaims.${field} must be a non-empty claim-id array`); continue; }
        for (const id of ids) {
          const claim = claimById.get(id);
          if (!attached.has(id)) issue(where, `field claim "${id}" is not attached to this item`);
          if (!claim) issue(where, `unknown field claim "${id}"`);
          else if (source && claim.sid !== source.id) issue(where, `field claim "${id}" belongs to a different source`);
          else if (claim.v?.status !== 'grounded') issue(where, `field claim "${id}" is not grounded`);
        }
      }
      for (const [i, link] of (item.links || []).entries()) {
        let related;
        try { related = sourceByCanonicalUrl.get(canonicalUrl(link.url)); }
        catch (error) { issue(`${where}.links[${i}]`, `invalid source URL: ${error.message}`); }
        if (!related) issue(`${where}.links[${i}]`, 'related link has no provenance source record');
        else if (related.check?.ok !== true) issue(`${where}.links[${i}]`, 'related source link is not verified working');
      }
      checkText(`${where}.summary`, item.summary, attached);
      checkText(`${where}.why`, item.why, attached);
      checkText(`${where}.admin`, item.admin, attached);
    }
  }

  for (const event of content.events || []) {
    const where = `events#${event.id || '?'}`;
    // Event listings carry their own provenance (tools/verify-events.mjs): an exact quote naming the event and its date,
    // captured from a 2xx response of the event's page. Claims are only needed when the event has no such evidence.
    const ev = event.evidence;
    const evidenced = ev && ev.status >= 200 && ev.status < 300 && (ev.quote || '').trim().length >= 8 && Boolean(ev.checkedAt);
    let source;
    try { source = sourceByCanonicalUrl.get(canonicalUrl(event.url)); }
    catch (error) { issue(where, `invalid source URL: ${error.message}`); continue; }
    if (evidenced && !(event.claims || []).length) continue;
    if (!source) issue(where, 'event has no provenance source record');
    else if (source.check?.ok !== true) issue(where, 'event source link is not verified working');
    const attached = new Set(event.claims || []);
    if (!attached.size) issue(where, 'event facts have no attached claims');
    for (const id of attached) {
      const claim = claimById.get(id);
      if (!claim) issue(where, `unknown attached claim "${id}"`);
      else if (source && claim.sid !== source.id) issue(where, `claim "${id}" belongs to a different source`);
    }
  }

  for (const kind of ['weeks', 'months', 'quarters']) {
    for (const [key, narrative] of Object.entries(content[kind] || {})) {
      const where = `${kind}/${key}`;
      checkText(`${where}.headline`, narrative.headline);
      checkText(`${where}.summary`, narrative.summary);
      for (const theme of narrative.themes || []) checkText(`${where}.theme:${theme.title}`, theme.body);
      for (const [section, scoped] of Object.entries(narrative.sections || {})) checkText(`${where}.section:${section}`, scoped.summary);
    }
  }

  return {
    errors, warnings,
    stats: { sources: sourceById.size, claims: claimById.size, items: Object.values(content.items || {}).flat().length },
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await checkClaims(args(process.argv.slice(2)));
    if (args(process.argv.slice(2)).json) console.log(JSON.stringify(result, null, 2));
    else {
      console.log(`Claims: ${result.stats.claims}; sources: ${result.stats.sources}; items: ${result.stats.items}`);
      for (const e of result.errors) console.error(`ERROR ${e.where}: ${e.message}`);
      for (const w of result.warnings) console.warn(`WARN  ${w.where}: ${w.message}`);
      console.log(`${result.errors.length} error(s), ${result.warnings.length} warning(s)`);
    }
    if (result.errors.length) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
