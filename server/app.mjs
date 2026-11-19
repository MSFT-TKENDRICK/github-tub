// HTTP app for the briefing viewer: static web/ assets, a read-only git-backed JSON API, and an SSE channel the
// canvas actions use to drive the page. Used by extension.mjs (ephemeral port) and server/serve.mjs (fixed port).
import http from 'node:http';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { ContentStore } from './content-store.mjs';
import { SOURCE_LABELS, indexSnapshot, itemsIn, keysFor, VIEWS } from '../web/js/briefing.mjs';
import { citationUrl } from '../web/js/cite.mjs';
import { buildDeck, hasFullSlide, SECTION_ICONS, TAG_ICONS } from '../web/js/deck-model.mjs';
import { ICONS } from '../web/js/icons.mjs';
import { longDate, shortDate } from '../web/js/periods.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const CODE_ROOT = path.resolve(HERE, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.ico': 'image/x-icon',
};

const CSP = [
  "default-src 'self'", "script-src 'self'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: https:",
  "font-src 'self'", "connect-src 'self'", "object-src 'none'", "base-uri 'none'", "form-action 'none'",
].join('; ');

const BASE_HEADERS = { 'Content-Security-Policy': CSP, 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' };
const MAX_EXPORT_INPUT = 16 * 1024;
const MAX_EXPORT_OUTPUT = 32 * 1024 * 1024;
const EXPORT_TTL_MS = 60_000;

// Browsers omit Origin on same-origin GETs, so fall back to the Fetch Metadata header they always send to loopback.
function sameOrigin(req) {
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!host) return false;
  if (!origin) return req.headers['sec-fetch-site'] === 'same-origin';
  try { return new URL(origin).origin === `http://${host}`; } catch { return false; }
}

// Every link the exporter may draw: https only, and only URLs that pass the same citation check the web viewer uses.
function safeLinks(value) {
  if (Array.isArray(value)) return value.map(safeLinks);
  if (!value || typeof value !== 'object') return value;
  const out = {};
  for (const [k, v] of Object.entries(value)) out[k] = k === 'url' ? (typeof v === 'string' && citationUrl(v)) || '' : safeLinks(v);
  return out;
}

function iconNames(value, out) {
  if (Array.isArray(value)) value.forEach((v) => iconNames(v, out));
  else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      if ((k === 'icon' || k === 'tagIcon') && typeof v === 'string') out.add(v);
      else iconNames(v, out);
    }
  }
  return out;
}

const EXPORT_ICONS = ['mark-github', 'link-external', 'calendar', 'megaphone', 'tag', 'file', ...Object.values(SECTION_ICONS), ...Object.values(TAG_ICONS)];

function shortUrl(url) {
  try {
    const u = new URL(url);
    const s = `${u.hostname.replace(/^www\./, '')}${u.pathname.replace(/\/$/, '')}`;
    return s.length > 64 ? `${s.slice(0, 61)}…` : s;
  } catch { return url; }
}

// The PowerPoint is drawn from the same slide model as the web reel, Present mode and the PDF (buildDeck), so all four
// carry the same verified sentences and citations. Dates and short URLs are formatted here so Python never re-derives them.
export function exportPayload(snap, request) {
  const idx = indexSnapshot(snap);
  const view = VIEWS.includes(request.view) ? request.view : 'week';
  const key = request.key;
  if (!keysFor(idx, view).includes(key)) throw new Error('The selected period is not available in this edition.');
  const requested = (request.sections || []).filter((id) => typeof id === 'string');
  const allowed = new Set(requested.filter((id) => idx.sectionById.has(id)));
  if (requested.length && !allowed.size) throw new Error('No selected product area is available in this edition.');
  const deck = buildDeck(idx, { view, key, sections: allowed.size ? allowed : null });
  const allItems = itemsIn(idx, deck.meta.range, allowed.size ? allowed : null);
  const day = (v) => (/^\d{4}-\d{2}-\d{2}/.test(String(v || '')) ? String(v).slice(0, 10) : '');
  const sources = (list) => (list || []).map((src) => ({ ...src, short: shortUrl(src.url), publishedLabel: day(src.published) ? longDate(day(src.published)) : '' }));
  const slides = deck.slides.map((slide) => {
    const out = { ...slide };
    if (slide.sources && slide.kind !== 'closing') out.sources = sources(slide.sources);
    if (slide.kind === 'update') out.dateLabel = day(slide.date) ? longDate(day(slide.date)) : '';
    if (slide.cards) out.cards = slide.cards.map((c) => ({ ...c, dateLabel: day(c.date) ? shortDate(day(c.date)) : '' }));
    if (slide.rows && slide.kind !== 'events') {
      out.rows = slide.rows.map((r) => ({ ...r, dateLabel: day(r.effective || r.date) ? shortDate(day(r.effective || r.date)) : '' }));
    }
    return out;
  });
  const displayedIds = new Set(deck.slides.flatMap((slide) => [
    ...(slide.itemId ? [slide.itemId] : []),
    ...(slide.cards || []).map((card) => card.itemId),
    ...(slide.rows || []).map((row) => row.itemId),
  ].filter(Boolean)));
  const sourceRecords = new Map();
  const items = allItems.filter((item) => displayedIds.has(item.id)).map((item) => {
    const url = citationUrl(item.url) || '';
    const evidence = (item.claims || []).flatMap((claimId) => {
      const claim = idx.claimById.get(claimId);
      const source = claim && idx.sourceById.get(claim.sid);
      const sourceUrl = source && citationUrl(source.url);
      if (claim?.v?.status !== 'grounded' || source?.check?.ok !== true || !sourceUrl) return [];
      sourceRecords.set(sourceUrl, {
        url: sourceUrl, publisher: source.publisher || SOURCE_LABELS[source.kind] || '',
        title: source.title || item.title, published: source.published || item.date,
      });
      return [{ claimId, claim: claim.text || '', quote: claim.quote || '', url: sourceUrl }];
    });
    if (url && !sourceRecords.has(url)) {
      sourceRecords.set(url, {
        url, publisher: SOURCE_LABELS[item.source] || item.source || '',
        title: item.title, published: item.date,
      });
    }
    return {
      title: item.title, tier: item.tier, summary: hasFullSlide(idx, item) ? item.summary : '',
      sourceUrl: url, sourceLabel: SOURCE_LABELS[item.source] || 'Source', evidence,
    };
  });
  const tierCount = (tier) => allItems.filter((item) => item.tier === tier).length;
  const icons = {};
  for (const name of iconNames(slides, new Set(EXPORT_ICONS))) if (ICONS[name]) icons[name] = ICONS[name];
  return safeLinks({
    label: deck.meta.label,
    rangeLabel: deck.meta.period,
    counts: { total: allItems.length, headline: tierCount('headline'), notable: tierCount('notable'), minor: tierCount('minor') },
    items,
    sources: [...sourceRecords.values()],
    meta: {
      ...deck.meta,
      historyNote: snap.isLatest ? '' : `Reconstructed edition: sources published through ${longDate(snap.asof)}; retrieval dates unchanged.`,
    },
    slides,
    icons,
  });
}
function makePptx(scriptPath, payload) {
  return new Promise((resolve, reject) => {
    const child = spawn('python', [scriptPath], { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
    const output = []; let size = 0; let stderr = '';
    const timer = setTimeout(() => child.kill(), 30_000);
    child.stdout.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_EXPORT_OUTPUT) { child.kill(); return; }
      output.push(chunk);
    });
    child.stderr.on('data', (chunk) => { if (stderr.length < 4096) stderr += chunk.toString('utf8'); });
    child.once('error', (error) => { clearTimeout(timer); reject(error); });
    child.once('close', (code) => {
      clearTimeout(timer);
      if (size > MAX_EXPORT_OUTPUT) return reject(new Error('PowerPoint export exceeds the 32 MiB output limit.'));
      if (code !== 0) return reject(new Error(`PowerPoint export failed: ${stderr.trim().slice(-1500) || `python exited ${code}`}`));
      resolve(Buffer.concat(output, size));
    });
    child.stdin.end(JSON.stringify(payload));
  });
}

// Builds the PowerPoint for one briefing view. Shared by POST /api/export (the page's Export menu) and the canvas
// export_pptx action so both validate requests identically. Request errors carry an HTTP-style `status`.
export async function buildPptx(store, request, codeRoot = CODE_ROOT) {
  const fail = (status, message) => Object.assign(new Error(message), { status });
  if (!request || !/^(main|working|tub-\d{4}-\d{2}-\d{2})$/.test(request.ref || '')) throw fail(400, 'Invalid edition reference.');
  if (!VIEWS.includes(request.view) || typeof request.key !== 'string' || !/^\d{4}(?:-\d{2}(?:-\d{2})?|)$/.test(request.key)) {
    throw fail(400, 'Invalid briefing view or period.');
  }
  const sections = Array.isArray(request.sections) ? request.sections.filter((x) => typeof x === 'string').slice(0, 12) : [];
  const entry = await store.snapshot(request.ref);
  if (!entry) throw fail(404, 'The selected edition is not available.');
  const payload = exportPayload(entry.snapshot, { ...request, sections });
  const pptx = await makePptx(path.join(codeRoot, 'server', 'export_pptx.py'), payload);
  return { pptx, fileName: `github-tub-${request.view}-${request.key.replace(/[^0-9-]/g, '')}.pptx` };
}

export function createApp({ codeRoot = CODE_ROOT, repoRoot = CODE_ROOT, contentDir } = {}) {
  const store = new ContentStore({ repoRoot, contentDir });
  const webRoot = path.join(codeRoot, 'web');
  const streams = new Map(); // instance id → Set<ServerResponse>
  const states = new Map(); // instance id → last UI state reported by the page
  const exportTokens = new Map();
  let exporting = false;
  let allowedHosts = null;

  const send = (res, status, body, headers = {}) => { res.writeHead(status, { ...BASE_HEADERS, ...headers }); res.end(body); };
  const sendJson = (res, status, value) => send(res, status, JSON.stringify(value), { 'Content-Type': MIME['.json'], 'Cache-Control': 'no-store' });

  function broadcast(instance, event) {
    const targets = instance === '*' ? [...streams.values()].flatMap((s) => [...s]) : [...(streams.get(instance) || [])];
    for (const res of targets) res.write(`data: ${JSON.stringify(event)}\n\n`);
    return targets.length;
  }

  // One python-pptx render at a time, whether requested by the page or by the canvas export_pptx action.
  async function exportPptx(request) {
    if (exporting) throw Object.assign(new Error('Another export is already running.'), { status: 429 });
    exporting = true;
    try { return await buildPptx(store, request, codeRoot); } finally { exporting = false; }
  }

  async function serveStatic(req, res, pathname) {
    const rel = decodeURIComponent(pathname === '/' ? '/index.html' : pathname);
    const file = path.resolve(webRoot, `.${rel}`);
    if (file !== webRoot && !file.startsWith(webRoot + path.sep)) return send(res, 403, 'Forbidden');
    let info;
    try { info = await stat(file); } catch { return send(res, 404, 'Not found'); }
    if (!info.isFile()) return send(res, 404, 'Not found');
    const ext = path.extname(file).toLowerCase();
    const etag = `"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`;
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream', ETag: etag, 'Cache-Control': ext === '.woff2' ? 'public, max-age=86400' : 'no-cache' };
    if (req.headers['if-none-match'] === etag) return send(res, 304, '', headers);
    send(res, 200, await readFile(file), headers);
  }

  async function readBody(req, limit = 16 * 1024) {
    const chunks = []; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > limit) throw new Error('body too large'); chunks.push(chunk); }
    return Buffer.concat(chunks).toString('utf8');
  }

  async function handler(req, res) {
    try {
      const host = (req.headers.host || '').toLowerCase();
      if (allowedHosts && !allowedHosts.has(host)) return send(res, 421, 'Misdirected request');
      const url = new URL(req.url || '/', 'http://127.0.0.1');
      const { pathname } = url;

      if (pathname.startsWith('/api/')) {
        if (pathname === '/api/health') return sendJson(res, 200, { ok: true, mode: (await store.editions()).mode });
        if (pathname === '/api/export-token' && req.method === 'GET') {
          if (!sameOrigin(req)) return sendJson(res, 403, { error: 'Export token requires a same-origin request.' });
          const now = Date.now();
          for (const [token, expiry] of exportTokens) if (expiry <= now) exportTokens.delete(token);
          while (exportTokens.size >= 8) exportTokens.delete(exportTokens.keys().next().value);
          const token = randomBytes(32).toString('hex');
          exportTokens.set(token, now + EXPORT_TTL_MS);
          return sendJson(res, 200, { token, expiresInMs: EXPORT_TTL_MS });
        }
        if (pathname === '/api/export' && req.method === 'POST') {
          if (!sameOrigin(req)) return sendJson(res, 403, { error: 'PowerPoint export requires a same-origin request.' });
          if (!/^application\/json\b/i.test(req.headers['content-type'] || '')) return sendJson(res, 415, { error: 'Export requests must be JSON.' });
          const token = req.headers['x-tub-export-token'];
          if (!token || !exportTokens.has(token) || exportTokens.get(token) <= Date.now()) return sendJson(res, 403, { error: 'Export token is missing or expired.' });
          exportTokens.delete(token);
          if (exporting) return sendJson(res, 429, { error: 'Another export is already running.' });
          try {
            const { pptx, fileName } = await exportPptx(JSON.parse(await readBody(req, MAX_EXPORT_INPUT)));
            return send(res, 200, pptx, {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
              'Content-Disposition': `attachment; filename="${fileName}"`,
              'Cache-Control': 'no-store',
            });
          } catch (err) {
            if (err?.status) return sendJson(res, err.status, { error: err.message });
            throw err;
          }
        }
        if (pathname === '/api/editions' && req.method === 'GET') return sendJson(res, 200, await store.editions(url.searchParams.get('refresh') === '1'));
        if (pathname === '/api/snapshot' && req.method === 'GET') {
          const entry = await store.snapshot(url.searchParams.get('ref') || 'main');
          if (!entry) return sendJson(res, 404, { error: `No edition matches "${url.searchParams.get('ref')}"` });
          const headers = { 'Content-Type': MIME['.json'], ETag: entry.etag, 'Cache-Control': 'no-cache', Vary: 'Accept-Encoding' };
          if (req.headers['if-none-match'] === entry.etag) return send(res, 304, '', headers);
          if (/\bgzip\b/.test(req.headers['accept-encoding'] || '')) return send(res, 200, entry.gzip, { ...headers, 'Content-Encoding': 'gzip' });
          return send(res, 200, entry.json, headers);
        }
        if (pathname === '/api/state' && req.method === 'POST') {
          if (!sameOrigin(req)) return sendJson(res, 403, { error: 'State reports require a same-origin request.' });
          let body;
          try { body = JSON.parse(await readBody(req)); } catch { return sendJson(res, 400, { error: 'State reports must be JSON.' }); }
          if (!body || typeof body !== 'object') return sendJson(res, 400, { error: 'State reports must be a JSON object.' });
          const str = (v, max) => (typeof v === 'string' ? v.slice(0, max) : null);
          const id = String(body.i || 'default').slice(0, 128);
          states.delete(id); // re-insert so the most recently active panels survive eviction
          states.set(id, {
            ref: str(body.ref, 64), view: str(body.view, 8), key: str(body.key, 10), q: str(body.q, 200) || '',
            sections: Array.isArray(body.sections) ? body.sections.filter((s) => typeof s === 'string').slice(0, 12) : [],
            present: Number.isInteger(body.present) && body.present > 0 ? body.present : null,
            at: Date.now(),
          });
          while (states.size > 64) states.delete(states.keys().next().value);
          return send(res, 204, '');
        }
        if (pathname === '/api/events' && req.method === 'GET') {
          const id = url.searchParams.get('i') || 'default';
          res.writeHead(200, { ...BASE_HEADERS, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
          res.write('retry: 2000\n\n');
          const set = streams.get(id) || new Set(); streams.set(id, set); set.add(res);
          const ping = setInterval(() => res.write(': ping\n\n'), 25000);
          req.on('close', () => { clearInterval(ping); set.delete(res); if (!set.size) streams.delete(id); });
          return undefined;
        }
        return sendJson(res, 404, { error: 'Unknown API route' });
      }
      if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed');
      if (pathname === '/favicon.ico') return send(res, 204, '');
      return await serveStatic(req, res, pathname);
    } catch (err) {
      return sendJson(res, 500, { error: String(err?.message || err) });
    }
  }

  return {
    handler, store, broadcast, exportPptx,
    getState: (id = 'default') => states.get(id) || null,
    clients: (id) => streams.get(id)?.size || 0,
    setAllowedHosts: (hosts) => { allowedHosts = new Set(hosts); },
    close: () => { for (const set of streams.values()) for (const res of set) res.end(); streams.clear(); },
  };
}

export function listen(app, { port = 0, host = '127.0.0.1' } = {}) {
  const server = http.createServer(app.handler);
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      const actual = server.address().port;
      app.setAllowedHosts([`127.0.0.1:${actual}`, `localhost:${actual}`]);
      resolve({ server, port: actual, url: `http://127.0.0.1:${actual}/` });
    });
  });
}

export { gzipSync };
