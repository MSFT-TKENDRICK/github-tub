// Copilot canvas extension: registers the GitHub Technical Update Briefing as a canvas panel. The briefing itself is
// the web app in web/, served from a loopback server that starts the first time a panel opens. stdout carries the
// JSON-RPC channel to the CLI, so nothing in this process may write to it; use session.log instead.
import os from 'node:os';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { createCanvas, joinSession, CanvasError } from '@github/copilot-sdk/extension';
import { createApp, listen, CODE_ROOT } from './server/app.mjs';
import { syncFromOrigin } from './server/sync.mjs';
import {
  CANVAS_ID, CANVAS_TITLE, InputError, OPEN_SCHEMA, NAVIGATE_SCHEMA, PRESENT_SCHEMA, LIST_EDITIONS_SCHEMA, EXPORT_SCHEMA,
  EMPTY_SCHEMA, pageId, parseNavigation, resolveNavigation, mergeNavigation, navigateEvent, canvasUrl, summarize, statusLine,
} from './server/canvas.mjs';

let session = null;
let running = null;
const lastNav = new Map(); // page id → { ...nav, at } last sent by open/navigate/present

const log = (message, level = 'info') => { session?.log(`[tub] ${message}`, { level }).catch(() => {}); };

function ensureServer() {
  running ??= (async () => {
    const app = createApp({ codeRoot: CODE_ROOT, repoRoot: CODE_ROOT });
    const { server, url } = await listen(app, { port: 0 });
    log(`briefing server listening on ${url}`);
    pullPublished(app).catch(() => {});
    setInterval(() => { pullPublished(app).catch(() => {}); }, SYNC_INTERVAL_MS).unref();
    return { app, server, url };
  })().catch((err) => { running = null; throw err; });
  return running;
}

// Editions are published by the GitHub Actions weekly workflow; fast-forward the local checkout and reload open panels.
const SYNC_INTERVAL_MS = 30 * 60 * 1000;
let syncing = null;
function pullPublished(app) {
  syncing ??= (async () => {
    try {
      const result = await syncFromOrigin(CODE_ROOT);
      if (result.status === 'updated') {
        await app.store.editions(true);
        app.broadcast('*', { type: 'refresh' });
        log(`pulled published editions ${result.from.slice(0, 7)}..${result.to.slice(0, 7)} from origin`);
      } else if (['diverged', 'blocked', 'skipped'].includes(result.status)) {
        log(`edition sync ${result.status}: ${result.reason || `${result.head?.slice(0, 7)} vs origin ${result.remote?.slice(0, 7)}`}`, 'warning');
      }
      return result;
    } catch (err) {
      log(`edition sync failed: ${err?.stderr || err?.message || err}`, 'warning');
      return { status: 'failed', reason: String(err?.stderr || err?.message || err).trim().slice(0, 400) };
    } finally {
      syncing = null;
    }
  })();
  return syncing;
}

function wrap(fn) {
  return async (ctx) => {
    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof CanvasError) throw err;
      if (err instanceof InputError) throw new CanvasError('invalid_input', err.message);
      if (err?.status === 429) throw new CanvasError('busy', err.message);
      if (err?.status) throw new CanvasError('export_failed', err.message);
      log(`canvas handler failed: ${err?.stack || err}`, 'error');
      throw new CanvasError('internal_error', String(err?.message || err));
    }
  };
}

// Whichever is newer: the page's own state report (the user may have clicked around) or what the agent last sent.
function current(app, page) {
  const reported = app.getState(page);
  const sent = lastNav.get(page);
  if (reported && sent) return reported.at >= sent.at ? reported : sent;
  return reported || sent || null;
}

const remember = (page, nav) => lastNav.set(page, { ...nav, at: Date.now() });

async function navigateTo(app, page, input, { allowPresent }) {
  const r = await resolveNavigation(app.store, mergeNavigation(current(app, page), parseNavigation(input, { allowPresent })));
  return r;
}

function requireConnected(app, page, event) {
  if (app.broadcast(page, event) === 0) {
    throw new CanvasError('not_connected', 'The briefing panel is not connected. Open it with open_canvas first, then retry.');
  }
}

async function uniquePath(dir, fileName, data) {
  await mkdir(dir, { recursive: true });
  const ext = path.extname(fileName);
  const stem = fileName.slice(0, -ext.length);
  for (let n = 1; n < 100; n += 1) {
    const file = path.join(dir, n === 1 ? fileName : `${stem}-${n}${ext}`);
    try {
      await writeFile(file, data, { flag: 'wx' });
      return file;
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
  }
  throw new Error(`Could not find a free file name for ${fileName} in ${dir}.`);
}

async function saveExport(ctx, fileName, data) {
  const dirs = [path.join(os.homedir(), 'Downloads'), ctx.session?.workingDirectory, session?.workspacePath, os.tmpdir()].filter(Boolean);
  let lastErr;
  for (const dir of dirs) {
    try { return await uniquePath(dir, fileName, data); } catch (err) { lastErr = err; }
  }
  throw lastErr;
}

const canvas = createCanvas({
  id: CANVAS_ID,
  displayName: CANVAS_TITLE,
  description: 'Customer-ready weekly briefing on GitHub and GitHub Copilot updates, with every claim linked to its source. '
    + 'Pick any dated edition from 2026, zoom between week, month and year, filter chapters, present full screen, and export PDF or PowerPoint.',
  inputSchema: OPEN_SCHEMA,
  actions: [
    {
      name: 'navigate',
      description: 'Show a different edition, period, chapter filter or search in the open panel. Omitted fields keep their current values; changing view without a key keeps the same point in time, and changing edition without a key keeps the current period clamped to that edition\'s date (pass the edition date as key to show its own week). Returns a summary of what is now shown.',
      inputSchema: NAVIGATE_SCHEMA,
      handler: wrap(async (ctx) => {
        const { app } = await ensureServer();
        const page = pageId(ctx.instanceId);
        const r = await navigateTo(app, page, ctx.input, { allowPresent: false });
        requireConnected(app, page, navigateEvent(r.nav));
        remember(page, r.nav);
        return summarize(r);
      }),
    },
    {
      name: 'present',
      description: 'Start full-screen Present mode for the current view at the given slide (default 1).',
      inputSchema: PRESENT_SCHEMA,
      handler: wrap(async (ctx) => {
        const { app } = await ensureServer();
        const page = pageId(ctx.instanceId);
        const slide = ctx.input?.slide ?? 1;
        if (!Number.isInteger(slide) || slide < 1) throw new InputError('slide must be a whole number of 1 or more.');
        const r = await navigateTo(app, page, {}, { allowPresent: false });
        const summary = summarize(r);
        if (slide > summary.slides) throw new InputError(`This view has ${summary.slides} slide${summary.slides === 1 ? '' : 's'}; slide ${slide} does not exist.`);
        const nav = { ...r.nav, present: slide };
        requireConnected(app, page, navigateEvent(nav));
        remember(page, nav);
        return { ...summary, presenting: slide };
      }),
    },
    {
      name: 'refresh',
      description: 'Pull newly published editions from GitHub, then reload the edition list and content in the panel.',
      inputSchema: EMPTY_SCHEMA,
      handler: wrap(async (ctx) => {
        const { app } = await ensureServer();
        const sync = await pullPublished(app);
        const list = await app.store.editions(true);
        const reached = app.broadcast(pageId(ctx.instanceId), { type: 'refresh' });
        return { latest: list.latest.asof, edition: list.latest.edition, editions: list.editions.length, sync: sync.status, panelReloaded: reached > 0 };
      }),
    },
    {
      name: 'get_state',
      description: 'Describe what the panel is showing now: edition, period, chapters, item and slide counts.',
      inputSchema: EMPTY_SCHEMA,
      handler: wrap(async (ctx) => {
        const { app } = await ensureServer();
        const page = pageId(ctx.instanceId);
        const r = await navigateTo(app, page, {}, { allowPresent: false });
        const presenting = current(app, page)?.present ?? null;
        return { ...summarize(r), presenting, connected: app.clients(page) > 0 };
      }),
    },
    {
      name: 'list_editions',
      description: 'List the dated weekly editions on main, newest first.',
      inputSchema: LIST_EDITIONS_SCHEMA,
      handler: wrap(async (ctx) => {
        const { app } = await ensureServer();
        const limit = ctx.input?.limit ?? 12;
        if (!Number.isInteger(limit) || limit < 1 || limit > 60) throw new InputError('limit must be between 1 and 60.');
        const list = await app.store.editions();
        return {
          total: list.editions.length,
          editions: list.editions.slice(0, limit).map((e) => ({
            ref: e.isLatest ? 'main' : e.ref, tag: e.tag, edition: e.edition, asof: e.asof, commit: e.short, newItems: e.added, latest: e.isLatest,
          })),
        };
      }),
    },
    {
      name: 'export_pptx',
      description: 'Render a PowerPoint of a briefing view and save it to the Downloads folder. Omitted fields default to what the panel shows now, merged by the same rules as navigate. Returns the saved file path.',
      inputSchema: EXPORT_SCHEMA,
      handler: wrap(async (ctx) => {
        const { app } = await ensureServer();
        const r = await navigateTo(app, pageId(ctx.instanceId), ctx.input, { allowPresent: false });
        const { pptx, fileName } = await app.exportPptx({ ref: r.nav.ref, view: r.nav.view, key: r.nav.key, sections: r.nav.sections });
        const file = await saveExport(ctx, fileName, pptx);
        return { path: file, fileName: path.basename(file), bytes: pptx.length, ...summarize(r) };
      }),
    },
  ],
  open: wrap(async (ctx) => {
    const { app, url } = await ensureServer();
    const page = pageId(ctx.instanceId);
    const input = ctx.input && typeof ctx.input === 'object' ? ctx.input : {};
    const parsed = parseNavigation(input, { allowPresent: true });
    let r;
    if (Object.keys(input).length) r = await resolveNavigation(app.store, mergeNavigation(current(app, page), parsed));
    else {
      // A bare reopen keeps whatever the panel was showing; if that no longer resolves, fall back to the latest week.
      try { r = await resolveNavigation(app.store, mergeNavigation(current(app, page), {})); } catch { r = await resolveNavigation(app.store, {}); }
    }
    // Re-opening an existing instance only focuses the panel, so steer the live page as well as returning the URL.
    if (app.clients(page) > 0) app.broadcast(page, navigateEvent(r.nav));
    remember(page, r.nav);
    const list = await app.store.editions();
    return { url: canvasUrl(url, page, r.nav), title: CANVAS_TITLE, status: statusLine(summarize(r), list.editions.length) };
  }),
  onClose: (ctx) => { lastNav.delete(pageId(ctx.instanceId)); },
});

let closing = false;
async function shutdown() {
  if (closing) return;
  closing = true;
  try {
    const live = await running?.catch(() => null);
    if (live) {
      live.app.close();
      await new Promise((resolve) => { live.server.close(() => resolve()); live.server.closeAllConnections?.(); });
    }
  } finally {
    process.exit(0);
  }
}

// The SDK keeps the process alive after the CLI disconnects; exit when the RPC pipe closes or we are told to stop.
process.stdin.once('end', shutdown);
process.stdin.once('close', shutdown);
process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);

session = await joinSession({ canvases: [canvas] });
