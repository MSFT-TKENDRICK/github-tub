#!/usr/bin/env node
// Finds a verified deep-link anchor for every VS Code release-note record by reading the live release page.
//   node tools/vscode-anchors.mjs [--refresh] [--version=1.145]
// Writes data/raw/vscode-anchors.json: { "<record id>": "_heading-slug" }. Only anchors that really exist on
// the page are recorded; a record without one simply links to the top of its release page.
import { execFile } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { ROOT, loadRaw } from './lib/raw.mjs';

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
const CACHE = path.join(ROOT, 'data', 'raw', 'vscode-pages');
const OUT = path.join(ROOT, 'data', 'raw', 'vscode-anchors.json');
const CURL = process.platform === 'win32' ? 'curl.exe' : 'curl';

// Node's fetch times out against code.visualstudio.com on some networks; curl is reliable.
const fetchPage = (url) => new Promise((resolve, reject) => {
  execFile(CURL, ['-sS', '-L', '--fail', '--max-time', '90', '-A', 'Mozilla/5.0 (github-tub)', url], { maxBuffer: 64 * 1024 * 1024 }, (e, out) => (e ? reject(e) : resolve(out)));
});

const slugs = (title) => {
  const t = title.toLowerCase();
  const a = t.replace(/[^a-z0-9\s_-]/g, '').trim().replace(/\s+/g, '-');
  const b = t.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return [...new Set([`_${a}`, `_${b}`])];
};

const raw = await loadRaw();
const records = raw.bySource.vscode.items.filter((r) => !args.version || r.version === args.version);
const byVersion = new Map();
for (const r of records) (byVersion.get(r.version) || byVersion.set(r.version, []).get(r.version)).push(r);

await mkdir(CACHE, { recursive: true });
let existing = {};
try { existing = JSON.parse(await readFile(OUT, 'utf8')); } catch { /* first run */ }
const anchors = args.version ? existing : {};
const unmatched = [];

const pageFor = async (version, url) => {
  const file = path.join(CACHE, `v${version.replace(/\./g, '_')}.html`);
  if (!args.refresh) { try { return await readFile(file, 'utf8'); } catch { /* fetch below */ } }
  const html = await fetchPage(url);
  await writeFile(file, html);
  return html;
};

const versions = [...byVersion.keys()];
let next = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < versions.length) {
    const version = versions[next++];
    const recs = byVersion.get(version);
    let html;
    try { html = await pageFor(version, recs[0].url); } catch (e) { console.error(`v${version}: ${e.message.split('\n')[0]}`); unmatched.push(...recs.map((r) => r.id)); continue; }
    const onPage = new Set([...html.matchAll(/<h[2-4][^>]*\bid="(_[^"]+)"/g)].map((m) => m[1]));
    const used = new Map();
    for (const r of recs) {
      let found = null;
      for (const base of slugs(r.title)) {
        const k = used.get(base) || 0;
        const candidate = k === 0 ? base : `${base}-${k}`;
        if (onPage.has(candidate)) { used.set(base, k + 1); found = candidate; break; }
      }
      if (found) anchors[r.id] = found; else unmatched.push(r.id);
    }
  }
}));

const sorted = Object.fromEntries(Object.entries(anchors).sort(([a], [b]) => a.localeCompare(b, 'en', { numeric: true })));
await writeFile(OUT, `${JSON.stringify(sorted, null, 1)}\n`);
console.log(`anchors: ${Object.keys(sorted).length} verified, ${unmatched.length} without a matching heading (link to page top) across ${versions.length} release pages`);
if (unmatched.length) console.log(`  e.g. ${unmatched.slice(0, 12).join(', ')}`);
