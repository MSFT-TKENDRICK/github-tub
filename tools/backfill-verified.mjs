#!/usr/bin/env node
// Verify staged public sources, retain only source metadata and exact claim excerpts, and prepare title-only items.
//   node tools/backfill-verified.mjs [--stage=data/staging/real] [--out=data/staging/verified] [--asof=YYYY-MM-DD]
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { canonicalUrl, createClaim, createSource, normalizeEvidence, sha256, sourceId, validateClaim } from './lib/claims.mjs';
import { fetchSource } from './lib/fetcher.mjs';
import { writeContent, sortItems } from './lib/content-io.mjs';
import { loadContent, validate } from './validate.mjs';
import { checkClaims } from './check-claims.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLISHERS = {
  changelog: 'GitHub',
  blog: 'GitHub Blog',
  vscode: 'Visual Studio Code',
  'vscode-blog': 'Visual Studio Code',
  visualstudio: 'Visual Studio',
  next: 'GitHub Next',
  commandline: 'Command Line (Microsoft)',
};

function parseArgs(argv) {
  const options = { root: ROOT, stage: 'data/staging/real', out: 'data/staging/verified', asof: '2026-11-05', concurrency: 4, limit: Infinity };
  for (const arg of argv) {
    if (arg.startsWith('--root=')) options.root = path.resolve(arg.slice(7));
    else if (arg.startsWith('--stage=')) options.stage = arg.slice(8);
    else if (arg.startsWith('--out=')) options.out = arg.slice(6);
    else if (arg.startsWith('--asof=')) options.asof = arg.slice(7);
    else if (arg.startsWith('--concurrency=')) options.concurrency = Number(arg.slice(14));
    else if (arg.startsWith('--limit=')) options.limit = Number(arg.slice(8));
    else throw new Error(`Unknown option "${arg}".`);
  }
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 8) {
    throw new Error('--concurrency must be an integer from 1 to 8.');
  }
  if (!(options.limit > 0)) throw new Error('--limit must be a positive number.');
  options.stage = path.resolve(options.root, options.stage);
  options.out = path.resolve(options.root, options.out);
  return options;
}

// The title exactly as the page shows it; padded with the following words only when a title is shorter than a quote may be.
export function quoteFor(title, text) {
  const normalized = normalizeEvidence(text);
  const needle = normalizeEvidence(title);
  const at = normalized.toLocaleLowerCase().indexOf(needle.toLocaleLowerCase());
  if (at < 0) return null;
  let end = at + needle.length;
  while (end - at < 20 && end < normalized.length) {
    const space = normalized.indexOf(' ', end + 1);
    end = space < 0 ? normalized.length : space;
  }
  const quote = normalized.slice(at, Math.min(end, at + 280)).trim();
  return quote.length >= 20 ? quote : null;
}

export function claimForTitle(source, title, text, verifiedAt = new Date().toISOString()) {
  const quote = quoteFor(title, text);
  if (!quote || title.length > 230) return null;
  const claim = createClaim({
    sid: source.id,
    text: `A published update is titled "${title}".`,
    quote,
    type: 'change',
    verifiedAt,
  });
  return validateClaim(claim, source, text).length ? null : claim;
}

async function readSourceText(root, source) {
  try { return await readFile(path.join(root, 'data', 'raw', `${source.id}.md`), 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

function groupItems(items) {
  const groups = new Map();
  for (const item of items) {
    const url = canonicalUrl(item.url);
    const id = sourceId(url);
    const group = groups.get(id) || { id, url, items: [], date: item.date, kind: item.source };
    if (group.date !== item.date || group.kind !== item.source) {
      throw new Error(`Source ${url} is assigned conflicting dates or kinds.`);
    }
    group.items.push(item);
    groups.set(id, group);
  }
  return [...groups.values()];
}

function errorDetails(error) {
  const causes = error instanceof AggregateError ? error.errors.map(errorDetails) : [];
  return [...new Set([error?.message || String(error), ...causes])].join(' | ').slice(0, 600);
}

async function cacheMatches(root, source) {
  const text = await readSourceText(root, source);
  return text && sha256(normalizeEvidence(text)) === source.sha256
    && Buffer.byteLength(normalizeEvidence(text), 'utf8') === source.bytes ? text : null;
}

async function fetchGroup(group, fetcher, existingSource, now) {
  const fetched = await fetcher(group.url);
  if (!fetched.title?.trim()) throw new Error('No page title was extracted.');
  const finalUrl = canonicalUrl(fetched.url || group.url);
  const retrieved = now();
  const candidate = createSource({
    url: group.url,
    kind: group.kind,
    publisher: PUBLISHERS[group.kind] || 'GitHub',
    title: fetched.title,
    published: group.date,
    retrieved,
    via: fetched.via,
    text: fetched.text,
    check: { ok: true, status: fetched.status, at: retrieved, finalUrl },
  });
  if (existingSource) {
    if (candidate.sha256 !== existingSource.sha256 || candidate.bytes !== existingSource.bytes) {
      throw new Error('The source content has changed since its existing provenance record; review it before refreshing.');
    }
    return { source: existingSource, text: fetched.text };
  }
  return { source: candidate, text: fetched.text };
}

function appendUnique(target, records) {
  const byId = new Map(target.map((record) => [record.id, record]));
  for (const record of records) {
    const prior = byId.get(record.id);
    if (prior && JSON.stringify(prior) !== JSON.stringify(record)) throw new Error(`Conflicting record "${record.id}".`);
    byId.set(record.id, record);
  }
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
}

export async function backfillVerified({
  root = ROOT,
  stage = path.join(root, 'data', 'staging', 'real'),
  out = path.join(root, 'data', 'staging', 'verified'),
  asof = '2026-11-05',
  concurrency = 4,
  limit = Infinity,
  fetcher = fetchSource,
  now = () => new Date().toISOString(),
} = {}) {
  const [staged, current, previous] = await Promise.all([
    loadContent(stage), loadContent(root), loadContent(out),
  ]);
  const allItems = Object.values(staged.items).flat();
  const groups = groupItems(allItems).slice(0, limit);
  const sources = new Map();
  const currentItems = Object.values(current.items).flat();
  const currentItemsById = new Map(currentItems.map((item) => [item.id, item]));
  const previousItems = Object.values(previous.items).flat();
  const previousItemsById = new Map(previousItems.map((item) => [item.id, item]));
  // Published content holds the most recent provenance (enrich-ledes refreshes source hashes and claim quotes after this
  // stage), so it wins over records left in the previous verified staging output.
  for (const source of [...Object.values(previous.sources).flat(), ...Object.values(current.sources).flat()]) {
    sources.set(source.id, source);
  }

  const textById = new Map();
  const reusedGroups = new Set();
  for (const group of groups) {
    const source = sources.get(group.id);
    const allItemsVerified = group.items.every((raw) => {
      if (currentItemsById.has(raw.id)) return true;
      const item = previousItemsById.get(raw.id);
      return item?.claims?.length > 0 && item?.fieldClaims?.title?.length > 0;
    });
    if (source?.check?.ok === true && allItemsVerified) reusedGroups.add(group.id);
  }
  const failures = [];
  let next = 0;
  const workers = Array.from({ length: Math.min(concurrency, groups.length) }, async () => {
    while (next < groups.length) {
      const group = groups[next++];
      if (reusedGroups.has(group.id)) continue;
      try {
        const existing = sources.get(group.id);
        const cached = existing && await cacheMatches(root, existing);
        let result;
        if (cached) result = { source: existing, text: cached };
        else result = await fetchGroup(group, fetcher, existing, now);
        sources.set(result.source.id, result.source);
        textById.set(result.source.id, result.text);
      } catch (error) {
        failures.push({ url: group.url, message: errorDetails(error) });
      }
    }
  });
  await Promise.all(workers);

  const sourceRecords = [...sources.values()].filter((source) => source.check?.ok === true);
  const availableSourceIds = new Set(sourceRecords.map((source) => source.id));
  const claims = Object.values(previous.claims).flat()
    .concat(Object.values(current.claims).flat())
    .filter((claim) => availableSourceIds.has(claim.sid));
  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const stagedIds = new Set(allItems.map((item) => item.id));
  const verifiedItems = currentItems.filter((item) => stagedIds.has(item.id));
  for (const group of groups) {
    if (!reusedGroups.has(group.id)) continue;
    for (const raw of group.items) {
      const item = previousItemsById.get(raw.id);
      if (item && !currentItemsById.has(raw.id)) verifiedItems.push(item);
    }
  }
  for (const group of groups) {
    if (reusedGroups.has(group.id)) continue;
    const source = sources.get(group.id);
    const text = textById.get(group.id);
    if (!source || !text) continue;
    for (const raw of group.items) {
      if (currentItemsById.has(raw.id)) continue;
      let title = raw.title;
      let claim = claimForTitle(source, title, text, now());
      if (!claim) {
        title = source.title;
        claim = claimForTitle(source, title, text, now());
      }
      if (!claim) continue;
      const existing = claimById.get(claim.id);
      if (existing) claim = existing;
      else claimById.set(claim.id, claim);
      verifiedItems.push({
        id: raw.id,
        date: raw.date,
        source: raw.source,
        url: raw.url,
        title,
        section: raw.section,
        area: raw.area,
        tier: 'minor',
        tag: raw.tag,
        claims: [claim.id],
        fieldClaims: { title: [claim.id] },
      });
    }
  }

  const taxonomy = current.taxonomy || staged.taxonomy;
  const nextContent = {
    taxonomy,
    events: staged.events,
    items: {},
    sources: {},
    claims: {},
    weeks: {},
    months: {},
    quarters: {},
  };
  for (const item of verifiedItems) (nextContent.items[item.date.slice(0, 7)] ||= []).push(item);
  for (const source of sourceRecords) (nextContent.sources[source.published.slice(0, 7)] ||= []).push(source);
  const referenced = new Set(verifiedItems.flatMap((item) => [...(item.claims || []), ...Object.values(item.fieldClaims || {}).flat()]));
  for (const claim of claimById.values()) {
    if (!referenced.has(claim.id)) continue;
    const source = sources.get(claim.sid);
    if (source) (nextContent.claims[source.published.slice(0, 7)] ||= []).push(claim);
  }
  for (const month of Object.keys(nextContent.items)) nextContent.items[month] = sortItems(nextContent.items[month]);
  for (const month of Object.keys(nextContent.sources)) nextContent.sources[month] = appendUnique([], nextContent.sources[month]);
  for (const month of Object.keys(nextContent.claims)) nextContent.claims[month] = appendUnique([], nextContent.claims[month]);

  await writeContent(path.join(out, 'content'), nextContent);
  await mkdir(out, { recursive: true });
  const report = {
    stagedItems: allItems.length,
    uniqueSources: groups.length,
    verifiedSources: sourceRecords.length,
    verifiedItems: verifiedItems.length,
    titleVerifiedItems: verifiedItems.filter((item) => !item.summary).length,
    groundedClaims: Object.values(nextContent.claims).flat().length,
    failures: failures.length,
    failuresSample: failures.slice(0, 50),
  };
  await writeFile(path.join(out, 'report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  const validation = await validate({ data: nextContent, asof });
  const provenance = await checkClaims({ root: out, data: nextContent });
  return { ...report, validationErrors: validation.errors, provenanceErrors: provenance.errors, provenanceWarnings: provenance.warnings };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await backfillVerified(parseArgs(process.argv.slice(2)));
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    if (result.validationErrors.length || result.provenanceErrors.length || result.failures) process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
