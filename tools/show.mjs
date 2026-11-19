#!/usr/bin/env node
// Prints one raw harvested record in full: node tools/show.mjs cl-96770 [--json]
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_FILES = { cl: 'changelog', bl: 'blog', vsc: 'vscode', vscb: 'vscode-blog', vs: 'visualstudio', next: 'next', cmd: 'commandline' };

export async function findRaw(id) {
  const prefix = id.split('-')[0];
  const names = SOURCE_FILES[prefix] ? [SOURCE_FILES[prefix]] : Object.values(SOURCE_FILES);
  for (const n of names) {
    try {
      const d = JSON.parse(await readFile(path.join(ROOT, 'data', 'raw', `${n}.json`), 'utf8'));
      const hit = d.items.find((i) => i.id === id);
      if (hit) return hit;
    } catch { /* source not harvested */ }
  }
  return null;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const ids = process.argv.slice(2).filter((a) => !a.startsWith('--'));
  const asJson = process.argv.includes('--json');
  for (const id of ids) {
    const r = await findRaw(id);
    if (!r) { console.log(`# ${id}: not found`); continue; }
    if (asJson) { console.log(JSON.stringify(r, null, 1)); continue; }
    console.log(`# ${r.id} | ${r.source} | ${r.date}${r.version ? ` | v${r.version}` : ''}\n${r.title}\n${r.url}`);
    if (r.type || r.labels?.length || r.categories?.length) console.log(`type=${r.type || ''} labels=${(r.labels || r.categories || []).join(',')}`);
    console.log(`\n${r.text || r.lede || ''}\n`);
    if (r.links?.length) console.log('links:\n' + r.links.map((l) => `  - ${l.href || l}${l.text ? ` (${l.text})` : ''}`).join('\n') + '\n');
    const imgs = [...(r.images || []), ...(r.image ? [r.image] : [])];
    if (imgs.length) console.log(`images:\n${imgs.map((i) => `  - ${i}`).join('\n')}\n`);
  }
}
