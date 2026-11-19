// Reads briefing editions straight out of git, so each edition is exactly the state that was published:
//   main            → newest content (HEAD of the default branch)
//   tub-YYYY-MM-DD  → annotated tag on the edition commit for that Thursday
// When the repo has no edition tags yet (or isn't a git repo) the working-tree `content/` folder is served as one edition.
import { execFile, spawn } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { gzipSync } from 'node:zlib';
import { YEAR_START, addDays, diffDays, weekEndingFor, weekRange } from '../web/js/periods.mjs';

const run = promisify(execFile);
const TAG_RE = /^tub-(\d{4}-\d{2}-\d{2})$/;
const MAX_CACHED = 8;

async function git(cwd, args) {
  const { stdout } = await run('git', args, { cwd, maxBuffer: 256 * 1024 * 1024, windowsHide: true });
  return stdout.replace(/\s+$/, '');
}

// One `git cat-file --batch` process for many blobs (spawning per file is slow on Windows).
function catBatch(cwd, specs) {
  return new Promise((resolve, reject) => {
    const child = spawn('git', ['cat-file', '--batch'], { cwd, windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    const chunks = []; let err = '';
    child.stdout.on('data', (c) => chunks.push(c));
    child.stderr.on('data', (c) => { err += c; });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code !== 0) return reject(new Error(`git cat-file failed (${code}): ${err.trim()}`));
      const buf = Buffer.concat(chunks); const out = []; let pos = 0;
      while (pos < buf.length && out.length < specs.length) {
        const nl = buf.indexOf(0x0a, pos);
        const header = buf.toString('utf8', pos, nl).split(' ');
        pos = nl + 1;
        if (header[1] === 'missing') { out.push(null); continue; }
        const size = Number(header[2]);
        out.push(buf.subarray(pos, pos + size));
        pos += size + 1;
      }
      resolve(out);
    });
    child.stdin.end(`${specs.join('\n')}\n`);
  });
}

const sortItems = (a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id);

// files: [{ rel: 'items/2026-01.json', data: Buffer }]
function assemble(files) {
  const snap = { taxonomy: null, events: [], items: [], sources: [], claims: [], weeks: {}, months: {}, quarters: {} };
  for (const { rel, data } of files) {
    const json = JSON.parse(data.toString('utf8'));
    let m;
    if (rel === 'taxonomy.json') snap.taxonomy = json;
    else if (rel === 'events.json') snap.events = json;
    else if (/^items\/\d{4}-\d{2}\.json$/.test(rel)) snap.items.push(...json);
    else if (/^sources\/\d{4}-\d{2}\.json$/.test(rel)) snap.sources.push(...json);
    else if (/^claims\/\d{4}-\d{2}\.json$/.test(rel)) snap.claims.push(...json);
    else if ((m = rel.match(/^(weeks|months|quarters)\/([^/]+)\.json$/))) snap[m[1]][m[2]] = json;
  }
  if (!snap.taxonomy) throw new Error('content/taxonomy.json is missing');
  snap.items.sort(sortItems);
  snap.sources.sort((a, b) => a.id.localeCompare(b.id));
  snap.claims.sort((a, b) => a.id.localeCompare(b.id));
  return snap;
}

export class ContentStore {
  constructor({ repoRoot, contentDir } = {}) {
    this.repoRoot = repoRoot;
    this.contentDir = contentDir || path.join(repoRoot, 'content');
    this.forceWorking = Boolean(contentDir);
    this.cache = new Map();
    this.listing = null;
  }

  async #branch() {
    for (const b of ['main', 'master']) {
      try { await git(this.repoRoot, ['rev-parse', '--verify', '--quiet', `refs/heads/${b}`]); return b; } catch { /* try next */ }
    }
    return 'HEAD';
  }

  async #gitEditions() {
    const branch = await this.#branch();
    const out = await git(this.repoRoot, ['log', '--first-parent', '--format=%H%x09%cI%x09%s%x09%D', branch]);
    const rows = out.split('\n').filter(Boolean).map((line) => {
      const [sha, committed, subject, refs = ''] = line.split('\t');
      const tag = (refs.match(/tag: (tub-\d{4}-\d{2}-\d{2})\b/) || [])[1];
      return { sha, committed, subject, tag };
    });
    const head = rows[0];
    const editions = rows.filter((r) => r.tag).map((r) => {
      const asof = r.tag.match(TAG_RE)[1];
      const added = Number((r.subject.match(/· (\d+) new item/) || [])[1] ?? NaN);
      return {
        ref: r.tag, tag: r.tag, asof, edition: Math.round(diffDays(asof, YEAR_START) / 7) + 1, commit: r.sha, short: r.sha.slice(0, 7),
        committed: r.committed, subject: r.subject, added: Number.isNaN(added) ? null : added, week: weekRange(asof),
      };
    }).sort((a, b) => b.asof.localeCompare(a.asof));
    return { mode: 'git', branch, head, editions };
  }

  async #workingEdition() {
    let latest = YEAR_START;
    try {
      for (const f of await readdir(path.join(this.contentDir, 'items'))) {
        const arr = JSON.parse(await readFile(path.join(this.contentDir, 'items', f), 'utf8'));
        for (const i of arr) if (i.date > latest) latest = i.date;
      }
    } catch { /* empty content */ }
    const asof = weekEndingFor(latest);
    return {
      mode: 'working', branch: null, head: null,
      editions: [{
        ref: 'working', tag: null, asof, edition: Math.round(diffDays(asof, YEAR_START) / 7) + 1, commit: null, short: 'working',
        committed: new Date().toISOString(), subject: 'Working copy of content/ (not committed)', added: null, week: weekRange(asof),
      }],
    };
  }

  async editions(force = false) {
    if (!force && this.listing && Date.now() - this.listing.at < 3000) return this.listing.value;
    let info = null;
    if (!this.forceWorking) { try { info = await this.#gitEditions(); } catch { info = null; } }
    if (!info || !info.editions.length) info = await this.#workingEdition();
    const newest = info.editions[0];
    const value = {
      mode: info.mode, branch: info.branch,
      latest: {
        ref: 'main', asof: newest.asof, edition: newest.edition, tag: newest.tag, commit: info.head?.sha ?? newest.commit,
        short: (info.head?.sha ?? newest.commit ?? 'working').slice(0, 7), committed: info.head?.committed ?? newest.committed,
        subject: info.head?.subject ?? newest.subject,
      },
      editions: info.editions.map((e, i) => ({ ...e, isLatest: i === 0 })),
    };
    this.listing = { at: Date.now(), value };
    return value;
  }

  // 'main' | 'latest' | 'tub-YYYY-MM-DD' | 'YYYY-MM-DD' (newest edition on/before the date) | commit sha prefix
  async resolve(ref) {
    const list = await this.editions();
    const r = (ref || 'main').trim();
    if (['main', 'master', 'latest', 'head', 'HEAD', 'working'].includes(r)) return { ...list.latest, listing: list };
    const m = r.match(TAG_RE);
    const date = m ? m[1] : /^\d{4}-\d{2}-\d{2}$/.test(r) ? r : null;
    if (date) {
      const hit = list.editions.find((e) => e.asof <= date);
      return hit ? { ...hit, listing: list } : null;
    }
    if (/^[0-9a-f]{4,40}$/i.test(r)) {
      const hit = list.editions.find((e) => e.commit?.startsWith(r.toLowerCase()));
      return hit ? { ...hit, listing: list } : null;
    }
    return null;
  }

  async snapshot(ref) {
    const target = await this.resolve(ref);
    if (!target) return null;
    const key = target.commit || `working:${target.asof}`;
    const useWorking = this.forceWorking || target.listing.mode === 'working';
    const cacheKey = useWorking ? `${key}:${Date.now() - (Date.now() % 2000)}` : key;
    const hit = this.cache.get(cacheKey);
    if (hit) { this.cache.delete(cacheKey); this.cache.set(cacheKey, hit); return hit; }

    const data = useWorking ? await this.#readWorking() : await this.#readCommit(target.commit);
    const snapshot = {
      ref: target.ref, tag: target.tag, mode: target.listing.mode, commit: target.commit, short: target.short,
      committed: target.committed, subject: target.subject, asof: target.asof, edition: target.edition,
      isLatest: target.ref === 'main' || target.asof === target.listing.latest.asof,
      ...data,
    };
    const json = Buffer.from(JSON.stringify(snapshot));
    const entry = { snapshot, json, gzip: gzipSync(json, { level: 6 }), etag: `"${key}-${target.ref}"` };
    this.cache.set(cacheKey, entry);
    while (this.cache.size > MAX_CACHED) this.cache.delete(this.cache.keys().next().value);
    return entry;
  }

  async #readCommit(sha) {
    const names = (await git(this.repoRoot, ['ls-tree', '-r', '--name-only', sha, '--', 'content'])).split('\n').filter((f) => f.endsWith('.json'));
    const blobs = await catBatch(this.repoRoot, names.map((n) => `${sha}:${n}`));
    return assemble(names.map((n, i) => ({ rel: n.replace(/^content\//, ''), data: blobs[i] })).filter((f) => f.data));
  }

  async #readWorking() {
    const files = [];
    const walk = async (dir, rel = '') => {
      for (const ent of await readdir(dir, { withFileTypes: true })) {
        const r = rel ? `${rel}/${ent.name}` : ent.name;
        if (ent.isDirectory()) await walk(path.join(dir, ent.name), r);
        else if (ent.name.endsWith('.json')) files.push({ rel: r, data: await readFile(path.join(dir, ent.name)) });
      }
    };
    await walk(this.contentDir);
    return assemble(files);
  }
}

export { addDays };
