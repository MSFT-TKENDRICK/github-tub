// Reading/writing the content tree in one canonical format so diffs between editions stay minimal.
import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

export const NARRATIVE_KINDS = ['weeks', 'months', 'quarters'];

// One item per line: small diffs, easy `git blame`.
export const itemsFile = (arr) => `[\n${arr.map((x) => `  ${JSON.stringify(x)}`).join(',\n')}\n]\n`;
export const pretty = (o) => `${JSON.stringify(o, null, 2)}\n`;

// data = { taxonomy, events, items, sources, claims, weeks, months, quarters }
export async function writeContent(dir, data) {
  await rm(dir, { recursive: true, force: true });
  for (const kind of ['items', 'sources', 'claims']) {
    const recordsByMonth = data[kind] || {};
    for (const [month, records] of Object.entries(recordsByMonth)) {
      if (!records.length) continue;
      await mkdir(path.join(dir, kind), { recursive: true });
      const sorted = kind === 'items'
        ? sortItems(records)
        : [...records].sort((a, b) => a.id.localeCompare(b.id));
      await writeFile(path.join(dir, kind, `${month}.json`), itemsFile(sorted));
    }
  }
  await mkdir(path.join(dir, 'items'), { recursive: true });
  await writeFile(path.join(dir, 'taxonomy.json'), pretty(data.taxonomy));
  await writeFile(path.join(dir, 'events.json'), pretty(data.events || []));
  for (const kind of NARRATIVE_KINDS) {
    const entries = Object.entries(data[kind] || {});
    if (!entries.length) continue;
    await mkdir(path.join(dir, kind), { recursive: true });
    for (const [key, narrative] of entries) await writeFile(path.join(dir, kind, `${key}.json`), pretty(narrative));
  }
}

export const sortItems = (arr) => [...arr].sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
