// Application entry point. Loads editions and snapshots from the local server and owns all viewer state. That state lives in
// the URL hash, so every view (edition, period, filter, search, slide) is a shareable link and Back/Forward work.
import { debounce, h, mount, plural } from './dom.mjs';
import { buildHash, parseHash } from './route.mjs';
import {
  VIEWS, clampKey, currentKey, indexSnapshot, itemsIn, periodLabel, rangeOf, retarget, searchItems, stepKey,
} from './briefing.mjs';
import { focusItemInPage, renderError, renderFooter, renderPage, renderSkeleton } from './views.mjs';
import { announce, createChrome, renderBanner, restoreFocus } from './chrome.mjs';

const INSTANCE_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const REF_RE = /^[A-Za-z0-9._-]+$/;
const STALE_MS = 5 * 60 * 1000;

const query = new URLSearchParams(location.search);
const INSTANCE = INSTANCE_RE.test(query.get('i') || '') ? query.get('i') : 'standalone';

const $ = (id) => document.getElementById(id);
const el = { main: $('main'), panel: $('panel'), banner: $('banner'), footer: $('footer'), overlay: $('overlay'), print: $('print-root') };

const S = {
  editions: null, // /api/editions payload
  entry: null, // { snap, idx, rev } for what is on screen
  refParam: 'main', // edition as written in the URL
  view: 'week', key: null, sections: new Set(), q: '', present: null, print: false,
  paintKey: '', pushed: false, loadedAt: 0, pendingPrint: false,
  pendingZoom: null, // slide number Present mode should zoom out of the reel to, when opened by a pointer
};
const cache = new Map(); // ref -> entry
const inflight = new Map();
let seq = 0;
let rev = 0;
let popping = false;
let overlay = null; // { kind: 'present' | 'print', handle }
let pendingRefresh = false;
let deckModule = null;

// ---- data -------------------------------------------------------------------------------------------------------

async function fetchJson(url) {
  const res = await fetch(url, { headers: { accept: 'application/json' }, cache: 'no-cache' });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json()).error || ''; } catch { /* body was not JSON */ }
    throw Object.assign(new Error(detail || `The server answered ${res.status}.`), { status: res.status });
  }
  return res.json();
}

async function loadEditions(refresh = false) {
  S.editions = await fetchJson(`/api/editions${refresh ? '?refresh=1' : ''}`);
  return S.editions;
}

function loadEntry(ref, refresh = false) {
  const hit = !refresh && cache.get(ref);
  if (hit) return Promise.resolve(hit);
  const id = `${refresh ? 'fresh:' : ''}${ref}`;
  if (inflight.has(id)) return inflight.get(id);
  const pending = fetchJson(`/api/snapshot?ref=${encodeURIComponent(ref)}`)
    .then((snap) => {
      const entry = { snap, idx: indexSnapshot(snap), rev: ++rev };
      cache.set(ref, entry);
      while (cache.size > 6) cache.delete(cache.keys().next().value);
      S.loadedAt = Date.now();
      return entry;
    })
    .finally(() => inflight.delete(id));
  inflight.set(id, pending);
  return pending;
}

const loadDeck = () => (deckModule ||= import('./deck.mjs').catch((err) => { deckModule = null; throw err; }));

// ---- navigation -------------------------------------------------------------------------------------------------

const baseState = () => ({
  view: S.view, key: S.key, ref: S.refParam, sections: S.sections, q: S.q, focus: null, present: null, print: false,
});
const hashFor = (patch) => buildHash({ ...baseState(), ...patch });
// Links inside the page leave search behind: they point at a period, not at a result list.
const linkFor = (patch) => buildHash({ ...baseState(), q: '', ...patch });

function navigate(hash, { replace = false } = {}) {
  if (hash === location.hash) return;
  if (replace) {
    history.replaceState(history.state, '', hash);
    route();
  } else {
    location.hash = hash;
  }
}
const go = (patch, opts) => navigate(hashFor(patch), opts);

const validSections = (list) => new Set((list || []).filter((id) => typeof id === 'string' && S.entry?.idx.sectionById.has(id)));

const clearSections = () => go({ sections: new Set() }, { replace: true });
const clearSearch = () => go({ q: '' }, { replace: true });
const goLatest = () => go({ ref: 'main', key: null, q: '', sections: new Set() });

function focusItem(id) {
  if (focusItemInPage(el.panel, id)) return;
  const item = S.entry?.idx.byId.get(id);
  if (!item) return;
  const keep = !S.sections.size || S.sections.has(item.section);
  go({ view: 'week', key: clampKey(S.entry.idx, 'week', item.date), focus: id, sections: keep ? S.sections : new Set(), q: '' });
}

function leaveOverlay() {
  if (S.pushed) {
    S.pushed = false;
    history.back();
  } else {
    navigate(hashFor({}), { replace: true });
  }
}

function printBriefing() {
  S.pendingPrint = true;
  S.pushed = true;
  go({ print: true });
}

async function exportPowerPoint() {
  if (!S.entry) return;
  try {
    const token = await fetchJson('/api/export-token');
    const response = await fetch('/api/export', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-tub-export-token': token.token },
      body: JSON.stringify({ ref: S.refParam, view: S.view, key: S.key, sections: [...S.sections] }),
    });
    if (!response.ok) {
      let detail = '';
      try { detail = (await response.json()).error || ''; } catch { /* not JSON */ }
      throw new Error(detail || `The export server answered ${response.status}.`);
    }
    const blob = await response.blob();
    const href = URL.createObjectURL(blob);
    const a = h('a', { href, download: `github-tub-${S.view}-${S.key}.pptx`, hidden: true });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 30_000);
    announce('PowerPoint briefing downloaded.');
  } catch (error) {
    announce(`PowerPoint export failed: ${error.message}`);
  }
}

const handlers = {
  setView: (view) => go({ view, key: retarget(S.entry.idx, S.view, S.key, view), q: '' }),
  step: (dir) => go({ key: stepKey(S.entry.idx, S.view, S.key, dir), q: '' }),
  setKey: (key) => go({ key, q: '' }),
  goCurrent: () => go({ key: currentKey(S.entry.idx, S.view), q: '' }),
  selectEdition: (ref) => go({ ref }),
  search: (q) => go({ q }, { replace: Boolean(S.q) }),
  present({ zoom = false } = {}) {
    if (S.q) return;
    S.pushed = true;
    S.pendingZoom = zoom ? 1 : null;
    go({ present: 1 });
  },
  exportPdf: printBriefing,
  exportPptx: exportPowerPoint,
  toggleTheme() {
    const theme = window.__tubTheme;
    if (theme) theme.set(theme.current() === 'dark' ? 'light' : 'dark');
  },
};

const chrome = createChrome(handlers);

// ---- routing and painting ---------------------------------------------------------------------------------------

async function route() {
  // In-page anchors such as the skip link are not application routes.
  if (location.hash && !location.hash.startsWith('#/')) return;
  const mine = ++seq;
  const restoreY = popping && Number.isFinite(history.state?.y) ? history.state.y : null;
  popping = false;
  const r = parseHash(location.hash);
  const wantRef = r.ref || 'main';
  if (!r.present && !r.print) S.pushed = false;

  let entry = cache.get(wantRef);
  if (!entry || !S.editions) {
    if (!S.entry) mount(el.panel, renderSkeleton());
    el.panel.setAttribute('aria-busy', 'true');
    try {
      [, entry] = await Promise.all([S.editions ? null : loadEditions(), loadEntry(wantRef)]);
    } catch (err) {
      if (mine === seq) showLoadError(err, wantRef);
      return;
    }
    if (mine !== seq) return;
    el.panel.removeAttribute('aria-busy');
  }
  try {
    apply(r, entry, restoreY);
  } catch (err) {
    console.error(err);
    showLoadError(err, wantRef, true);
    return;
  }
  await syncOverlay(r, mine);
}

function apply(r, entry, restoreY) {
  const { snap, idx } = entry;
  const before = { refParam: S.refParam, view: S.view, key: S.key, q: S.q, had: Boolean(S.entry) };
  const sections = validSections([...r.sections].filter((id) => idx.sectionById.has(id)));
  const view = r.view || 'week';
  const key = clampKey(idx, view, r.key || currentKey(idx, view));
  const refParam = r.ref && r.ref !== 'main' ? snap.tag || r.ref : 'main';
  S.entry = entry;
  Object.assign(S, { refParam, view, key, sections, q: r.q, present: r.present, print: r.print });

  const canonical = buildHash({ view, key, ref: refParam, sections, q: r.q, focus: r.focus, present: r.present, print: r.print });
  if (canonical !== location.hash) history.replaceState(history.state, '', canonical);

  const paintKey = [entry.rev, view, key, [...sections].sort().join(','), r.q].join('|');
  const repaint = paintKey !== S.paintKey;
  S.paintKey = paintKey;

  chrome.update({ idx, snap, editions: S.editions.editions, view, key, q: r.q, sections });
  renderBanner(el.banner, { snap, onLatest: () => go({ ref: 'main' }) });

  const text = describe();
  document.title = `${text.title} · Technical Update Briefing · Edition ${snap.edition}`;
  if (repaint) {
    paint(before, restoreY);
    announce(text.status);
  }
  if (r.focus) {
    focusItemInPage(el.panel, r.focus);
    history.replaceState(history.state, '', hashFor({ present: r.present, print: r.print }));
  }
  report();
}

function describe() {
  const { idx } = S.entry;
  if (S.q) {
    const n = searchItems(idx, S.q, S.sections).length;
    return { title: `Search “${S.q}”`, status: `${plural(n, 'result')} for “${S.q}”.` };
  }
  const range = rangeOf(idx, S.view, S.key);
  const label = periodLabel(S.view, S.key, range);
  const n = itemsIn(idx, range, S.sections).length;
  return { title: label, status: `${label}. ${plural(n, 'update')}${S.sections.size ? ' in the selected product areas' : ''}.` };
}

function focusHeading() {
  const title = $('page-title');
  if (!title) return;
  title.setAttribute('tabindex', '-1');
  title.focus({ preventScroll: true });
}

function paint(before, restoreY) {
  const { idx } = S.entry;
  const active = document.activeElement;
  const fk = active?.dataset?.fk || null;
  const lostFocus = Boolean(active && active !== document.body && el.panel.contains(active));
  const y = window.scrollY;
  const samePlace = before.had && before.refParam === S.refParam && before.view === S.view && before.key === S.key && before.q === S.q;

  const ctx = {
    idx, view: S.view, key: S.key, range: rangeOf(idx, S.view, S.key), sections: S.sections, q: S.q,
    entrance: !samePlace && restoreY === null,
    href: linkFor, clearSections, clearSearch, goLatest, focusItem,
    present(n = 1, { zoom = false } = {}) {
      if (S.q) return;
      S.pushed = true;
      S.pendingZoom = zoom ? n : null;
      go({ present: n });
    },
  };
  mount(el.panel, renderPage(ctx));
  mount(el.footer, renderFooter(idx));

  if (restoreY !== null) window.scrollTo(0, restoreY);
  else window.scrollTo(0, samePlace ? y : 0);

  if (fk && restoreFocus(fk)) return;
  if (lostFocus) focusHeading();
}

function showLoadError(err, wantRef, drawing = false) {
  el.panel.removeAttribute('aria-busy');
  closeOverlay();
  const missing = err.status === 404 && wantRef !== 'main';
  mount(el.panel, missing
    ? renderError('The link may be mistyped, or the edition may no longer exist.', () => go({ ref: 'main', key: null }),
      { title: 'That edition is not available. ', action: 'Open the latest briefing' })
    : renderError(drawing ? `The page could not be drawn (${err.message}).` : err.message, () => route()));
  mount(el.footer);
  announce('The briefing could not be loaded.');
}

// ---- present mode and print layout ------------------------------------------------------------------------------

async function syncOverlay(r, mine) {
  const want = r.print ? 'print' : r.present ? 'present' : null;
  const zoom = S.pendingZoom !== null && S.pendingZoom === r.present;
  S.pendingZoom = null;
  if (!want) {
    closeOverlay();
    return;
  }
  if (overlay?.kind === want) {
    if (want === 'present') overlay.handle.goto?.(r.present);
    else if (S.pendingPrint) startPrintDialog();
    return;
  }
  closeOverlay();
  let deck;
  try {
    deck = await loadDeck();
  } catch (err) {
    console.error(err);
    announce('Presentation mode could not be loaded.');
    navigate(hashFor({}), { replace: true });
    return;
  }
  if (mine !== seq) return;
  const common = { idx: S.entry.idx, view: S.view, key: S.key, sections: S.sections };
  if (want === 'print') {
    document.body.classList.add('is-print-layout');
    overlay = { kind: 'print', handle: deck.renderPrint(el.print, { ...common, onBack: leaveOverlay }) };
    startPrintDialog();
  } else {
    overlay = {
      kind: 'present',
      handle: deck.openDeck(el.overlay, {
        ...common,
        start: r.present,
        zoom,
        frameFor: (n) => el.panel.querySelector(`.reel .slide[data-n="${n}"]`)?.closest('.s-frame') || null,
        onClose: leaveOverlay,
        onSlide(n) {
          S.present = n;
          history.replaceState(history.state, '', hashFor({ present: n }));
          report();
        },
      }),
    };
  }
}

function startPrintDialog() {
  if (!S.pendingPrint) return;
  S.pendingPrint = false;
  announce('Choose Save as PDF in the print dialog to export this briefing.');
  requestAnimationFrame(() => setTimeout(() => window.print(), 120));
}

function closeOverlay() {
  if (!overlay) return;
  const { kind, handle } = overlay;
  overlay = null;
  if (kind === 'print') document.body.classList.remove('is-print-layout');
  handle.destroy?.();
  if (pendingRefresh) refreshAll();
}

// ---- host integration -------------------------------------------------------------------------------------------

const report = debounce(() => {
  if (!S.entry) return;
  const body = JSON.stringify({
    i: INSTANCE, ref: S.refParam, view: S.view, key: S.key, q: S.q, sections: [...S.sections], present: S.present,
  });
  fetch('/api/state', { method: 'POST', headers: { 'content-type': 'application/json' }, body, keepalive: true }).catch(() => {});
}, 300);

async function refreshAll() {
  if (overlay) {
    pendingRefresh = true;
    return;
  }
  pendingRefresh = false;
  try {
    await loadEditions(true);
    cache.clear();
    await loadEntry(S.refParam, true);
    route();
  } catch {
    // Keep showing what is on screen; the next refresh will try again.
  }
}

function onHostEvent(m) {
  if (!m || typeof m !== 'object') return;
  if (m.type === 'refresh') {
    refreshAll();
    return;
  }
  if (m.type !== 'navigate' || !S.entry) return;
  const patch = { present: null, print: false };
  if ('ref' in m) patch.ref = typeof m.ref === 'string' && REF_RE.test(m.ref) ? m.ref : 'main';
  if (VIEWS.includes(m.view)) patch.view = m.view;
  if (typeof m.key === 'string' && m.key) patch.key = m.key;
  else if (patch.view) patch.key = retarget(S.entry.idx, S.view, S.key, patch.view);
  if (Array.isArray(m.sections)) patch.sections = validSections(m.sections);
  if ('q' in m) patch.q = String(m.q ?? '').slice(0, 200);
  if (Number.isInteger(m.present) && m.present > 0) patch.present = m.present;
  else if (m.present === true) patch.present = 1;
  go(patch);
}

function connectEvents() {
  if (!('EventSource' in window)) return;
  const source = new EventSource(`/api/events?i=${encodeURIComponent(INSTANCE)}`);
  source.onmessage = (e) => {
    try { onHostEvent(JSON.parse(e.data)); } catch { /* ignore malformed events */ }
  };
}

// ---- global behaviour -------------------------------------------------------------------------------------------

const isEditable = (t) => t instanceof HTMLElement && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName));

document.addEventListener('keydown', (e) => {
  if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.key !== '/') return;
  if (isEditable(e.target) || overlay || !S.entry) return;
  e.preventDefault();
  chrome.focusSearch();
});

document.querySelector('.skip-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  el.main.focus();
});

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('popstate', () => { popping = true; setTimeout(() => { popping = false; }, 100); });
window.addEventListener('scroll', debounce(() => {
  if (overlay) return;
  try { history.replaceState({ ...(history.state || {}), y: window.scrollY }, ''); } catch { /* replaceState is rate-limited */ }
}, 200), { passive: true });
window.addEventListener('hashchange', route);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && S.entry && Date.now() - S.loadedAt > STALE_MS) refreshAll();
});
window.addEventListener('unhandledrejection', (e) => console.error(e.reason));

connectEvents();
route();

export { h };
