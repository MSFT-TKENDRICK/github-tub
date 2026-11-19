// Shared loaders for the raw harvest (data/raw) and staged extras (data/staging/extra).
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const RAW_SOURCES = ['changelog', 'blog', 'vscode', 'vscode-blog', 'visualstudio', 'next', 'commandline'];

async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return fallback; throw error; }
}

export async function loadRaw(root = ROOT) {
  const bySource = {}; const byId = new Map();
  for (const name of RAW_SOURCES) {
    const d = await readJson(path.join(root, 'data', 'raw', `${name}.json`), { items: [] });
    bySource[name] = d;
    for (const it of d.items || []) byId.set(it.id, it);
  }
  return { bySource, byId };
}

// Registry entries from the hand-maintained seed plus whatever the research agent staged.
export async function loadEvents(root = ROOT) {
  const out = new Map();
  for (const f of ['events.seed.json', 'events.research.json']) {
    for (const e of await readJson(path.join(root, 'data', 'staging', 'extra', f), [])) out.set(e.id, e);
  }
  return [...out.values()].sort((a, b) => a.start.localeCompare(b.start) || a.id.localeCompare(b.id));
}

export async function loadVerifiedEvents(root = ROOT) {
  return JSON.parse(await readFile(path.join(root, 'data', 'staging', 'extra', 'events.verified.json'), 'utf8'));
}

export async function loadExtraItems(root = ROOT) {
  return readJson(path.join(root, 'data', 'staging', 'extra', 'items.research.json'), []);
}

// All text a claim could legitimately be traced to.
export function rawText(r) {
  return [r.title, r.h2, r.lede, r.text].filter(Boolean).join('\n');
}
