#!/usr/bin/env node
// Fetch one allowlisted public source, retain only a local ignored extraction cache, and write its provenance record.
//   node tools/ingest.mjs --url=https://github.blog/changelog/... --kind=changelog --publisher="GitHub" --published=YYYY-MM-DD
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalUrl, createSource, mergeLedger } from './lib/claims.mjs';
import { fetchSource } from './lib/fetcher.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const KINDS = new Set(['changelog', 'blog', 'vscode', 'vscode-blog', 'visualstudio', 'next', 'commandline', 'research', 'event', 'docs', 'other']);

function parseArgs(argv) {
  const options = { root: ROOT, preferFirecrawl: false, refresh: false, role: 'primary' };
  for (const arg of argv) {
    if (arg === '--firecrawl') options.preferFirecrawl = true;
    else if (arg === '--refresh') options.refresh = true;
    else if (arg.startsWith('--url=')) options.url = arg.slice(6);
    else if (arg.startsWith('--kind=')) options.kind = arg.slice(7);
    else if (arg.startsWith('--publisher=')) options.publisher = arg.slice(12);
    else if (arg.startsWith('--published=')) options.published = arg.slice(12);
    else if (arg.startsWith('--title=')) options.title = arg.slice(8);
    else if (arg.startsWith('--role=')) options.role = arg.slice(7);
    else if (arg.startsWith('--root=')) options.root = path.resolve(arg.slice(7));
    else throw new Error(`Unknown option "${arg}".`);
  }
  if (!options.url || !options.kind || !options.publisher || !/^\d{4}-\d{2}-\d{2}$/.test(options.published || '')) {
    throw new Error('Required: --url, --kind, --publisher and --published=YYYY-MM-DD.');
  }
  if (!KINDS.has(options.kind)) throw new Error(`Unknown kind "${options.kind}".`);
  return options;
}

export async function ingestOne(options, { fetcher = fetchSource } = {}) {
  const url = canonicalUrl(options.url);
  const fetched = await fetcher(url, { preferFirecrawl: Boolean(options.preferFirecrawl) });
  const title = options.title || fetched.title;
  if (!title) throw new Error('No page title was extracted; provide a reviewed --title.');
  const finalUrl = canonicalUrl(fetched.url || url);
  const record = createSource({
    url, kind: options.kind, publisher: options.publisher, title,
    published: options.published, retrieved: new Date().toISOString(), via: fetched.via, role: options.role,
    text: fetched.text, check: { ok: true, status: fetched.status, at: new Date().toISOString(), finalUrl },
  });
  const root = path.resolve(options.root || ROOT);
  const ledger = path.join(root, 'content', 'sources', `${record.published.slice(0, 7)}.json`);
  const records = await mergeLedger(ledger, [record], { replaceIds: Boolean(options.refresh) });
  return { id: record.id, url: record.url, title: record.title, published: record.published, via: record.via, records };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await ingestOne(parseArgs(process.argv.slice(2)));
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
