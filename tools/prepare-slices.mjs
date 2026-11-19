#!/usr/bin/env node
// Builds compact, curator-friendly slices of the raw harvest.
//   node tools/prepare-slices.mjs                       # one file per month → data/staging/slices/YYYY-MM.md
//   node tools/prepare-slices.mjs --since=2026-10-30 --until=2026-11-05 --out=data/staging/slices/delta.md
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { monthRange } from '../web/js/periods.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));

const SOURCES = [
  ['changelog', 'GitHub changelog (github.blog/changelog)', 620],
  ['blog', 'GitHub blog (github.blog)', 520],
  ['vscode', 'Visual Studio Code release notes', 460],
  ['vscode-blog', 'Visual Studio Code blog', 520],
  ['visualstudio', 'Visual Studio blog (devblogs.microsoft.com/visualstudio)', 520],
  ['next', 'GitHub Next (githubnext.com)', 520],
  ['commandline', 'Command Line (commandline.microsoft.com), GitHub-related posts only', 520],
];

async function loadAll() {
  const out = {};
  for (const [name] of SOURCES) {
    try { out[name] = JSON.parse(await readFile(path.join(ROOT, 'data', 'raw', `${name}.json`), 'utf8')); } catch { out[name] = { items: [] }; }
  }
  return out;
}

const oneLine = (s, max) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max).replace(/\s+\S*$/, '')} …` : t;
};

function render(label, range, raw) {
  const lines = [`# TUB curation slice — ${label} (${range.start} … ${range.end})`, ''];
  lines.push('Each record: `## id | source | date | meta`, then title, URL, and the first part of the source text.');
  lines.push('Full text of any record: `node tools/show.mjs <id>`.', '');
  let total = 0;
  for (const [name, heading, cap] of SOURCES) {
    const items = (raw[name].items || []).filter((i) => i.date >= range.start && i.date <= range.end);
    if (!items.length) continue;
    total += items.length;
    lines.push(`\n# SOURCE: ${heading} — ${items.length} records\n`);
    for (const i of items) {
      const meta = [];
      if (i.type) meta.push(`type=${i.type}`);
      if (i.labels?.length) meta.push(`labels=${i.labels.join(',')}`);
      if (i.categories?.length) meta.push(`cats=${i.categories.join(',')}`);
      if (i.version) meta.push(`v${i.version}`);
      if (i.h2) meta.push(`section="${i.h2}"`);
      if (i.kind) meta.push(`kind=${i.kind}`);
      lines.push(`## ${i.id} | ${i.source} | ${i.date} | ${meta.join(' ')}`);
      lines.push(`${i.title}`);
      lines.push(`${i.url}`);
      const body = oneLine(i.text || i.lede, cap);
      if (body && body !== i.title) lines.push(body);
      lines.push('');
    }
  }
  lines.splice(2, 0, `Records in this slice: ${total}`);
  return { text: lines.join('\n'), total };
}

const raw = await loadAll();
await mkdir(path.join(ROOT, 'data', 'staging', 'slices'), { recursive: true });
if (args.since || args.until) {
  const range = { start: args.since || '2026-01-01', end: args.until || '2026-12-31' };
  const { text, total } = render(`${range.start}…${range.end}`, range, raw);
  const out = path.resolve(ROOT, args.out || path.join('data', 'staging', 'slices', 'delta.md'));
  await writeFile(out, text);
  console.error(`wrote ${out} (${total} records, ${(text.length / 1024).toFixed(0)} KB)`);
} else {
  for (let m = 1; m <= 11; m++) {
    const ym = `2026-${String(m).padStart(2, '0')}`;
    const { text, total } = render(ym, monthRange(ym), raw);
    await writeFile(path.join(ROOT, 'data', 'staging', 'slices', `${ym}.md`), text);
    console.error(`${ym}: ${total} records, ${(text.length / 1024).toFixed(0)} KB`);
  }
}
