// Pure helpers for the Copilot canvas in extension.mjs: input schemas and validation, edition/period resolution, and
// the URL and SSE events that drive the briefing page. No SDK imports, so tests can exercise everything directly.
import { createHash } from 'node:crypto';
import {
  countItems, currentKey, clampKey, indexSnapshot, itemsIn, keysFor, periodLabel, rangeOf, retarget, searchItems, VIEWS,
} from '../web/js/briefing.mjs';
import { buildDeck } from '../web/js/deck-model.mjs';
import { buildHash } from '../web/js/route.mjs';

export const CANVAS_ID = 'technical-update-briefing';
export const CANVAS_TITLE = 'GitHub Technical Update Briefing';

// Mirrors INSTANCE_RE in web/js/main.mjs: the page only accepts ?i= values of this shape.
const INSTANCE_RE = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/;
const EDITION_RE = /^[A-Za-z0-9._-]{1,64}$/;
const KEY_RE = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const SECTION_RE = /^[a-z0-9-]+$/;
const LATEST_ALIASES = new Set(['main', 'master', 'latest', 'head', 'HEAD', 'working']);
const KEY_VIEW = ['year', 'month', 'week'];

export class InputError extends Error {}

// Canvas instance ids are caller-chosen free text; the page and SSE channel need a safe, stable token.
export function pageId(instanceId) {
  const id = String(instanceId ?? '');
  return INSTANCE_RE.test(id) ? id : `c${createHash('sha1').update(id).digest('hex').slice(0, 16)}`;
}

const NAV_PROPERTIES = {
  edition: {
    type: 'string', pattern: EDITION_RE.source,
    description: 'Edition to load: "main" (latest, default), a tag like "tub-2026-10-29", a date YYYY-MM-DD (newest edition on or before it), or a commit SHA prefix.',
  },
  view: { type: 'string', enum: VIEWS, description: 'Zoom level. Inferred from key when omitted; defaults to week.' },
  key: {
    type: 'string', pattern: KEY_RE.source,
    description: 'Period: YYYY-MM-DD (week; snaps to the edition week containing that day), YYYY-MM (month) or YYYY (year). When omitted, the panel keeps its current period (like the page\'s edition picker, clamped to the edition date); pass the edition date to show that edition\'s own week.',
  },
  sections: {
    type: 'array', maxItems: 12, items: { type: 'string', pattern: SECTION_RE.source },
    description: 'Chapter filter: copilot, vscode, visualstudio, jetbrains-others, platform, security, events, research. Empty or omitted means all chapters.',
  },
  q: { type: 'string', maxLength: 200, description: 'Search text; empty clears the search.' },
};

export const OPEN_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { ...NAV_PROPERTIES, present: { type: 'integer', minimum: 1, description: 'Open straight into Present mode at this slide.' } },
};
export const NAVIGATE_SCHEMA = { type: 'object', additionalProperties: false, properties: NAV_PROPERTIES };
export const PRESENT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { slide: { type: 'integer', minimum: 1, description: 'Slide number to show (default 1).' } },
};
export const LIST_EDITIONS_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { limit: { type: 'integer', minimum: 1, maximum: 60, description: 'How many editions to return, newest first (default 12).' } },
};
export const EXPORT_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { edition: NAV_PROPERTIES.edition, view: NAV_PROPERTIES.view, key: NAV_PROPERTIES.key, sections: NAV_PROPERTIES.sections },
};
export const EMPTY_SCHEMA = { type: 'object', additionalProperties: false, properties: {} };

function realKey(key) {
  if (key.length === 4) return true;
  if (key.length === 7) { const m = Number(key.slice(5)); return m >= 1 && m <= 12; }
  const d = new Date(`${key}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === key;
}

// Validates agent input independently of the runtime's schema check, so direct callers and tests get the same rules.
export function parseNavigation(input, { allowPresent = false } = {}) {
  if (input == null) return {};
  if (typeof input !== 'object' || Array.isArray(input)) throw new InputError('Input must be an object.');
  const known = new Set(['edition', 'view', 'key', 'sections', 'q', ...(allowPresent ? ['present'] : [])]);
  for (const k of Object.keys(input)) if (!known.has(k)) throw new InputError(`Unknown field "${k}".`);
  const nav = {};
  if (input.edition !== undefined) {
    if (typeof input.edition !== 'string' || !EDITION_RE.test(input.edition)) throw new InputError('edition must be "main", a tub-YYYY-MM-DD tag, a YYYY-MM-DD date, or a commit SHA prefix.');
    nav.edition = input.edition;
  }
  if (input.key !== undefined) {
    if (typeof input.key !== 'string' || !KEY_RE.test(input.key) || !realKey(input.key)) throw new InputError('key must be a real YYYY, YYYY-MM or YYYY-MM-DD period.');
    nav.key = input.key;
  }
  const inferred = nav.key ? KEY_VIEW[nav.key.split('-').length - 1] : null;
  if (input.view !== undefined) {
    if (!VIEWS.includes(input.view)) throw new InputError(`view must be one of ${VIEWS.join(', ')}.`);
    if (inferred && inferred !== input.view) throw new InputError(`key "${nav.key}" is a ${inferred} period but view is "${input.view}".`);
    nav.view = input.view;
  } else if (inferred) nav.view = inferred;
  if (input.sections !== undefined) {
    if (!Array.isArray(input.sections) || input.sections.length > 12 || input.sections.some((s) => typeof s !== 'string' || !SECTION_RE.test(s))) {
      throw new InputError('sections must be an array of up to 12 chapter ids.');
    }
    nav.sections = [...new Set(input.sections)];
  }
  if (input.q !== undefined) {
    if (typeof input.q !== 'string' || input.q.length > 200) throw new InputError('q must be a string of at most 200 characters.');
    nav.q = input.q.trim();
  }
  if (allowPresent && input.present !== undefined) {
    if (!Number.isInteger(input.present) || input.present < 1) throw new InputError('present must be a slide number of 1 or more.');
    nav.present = input.present;
  }
  return nav;
}

function editionInfo(snap, ref) {
  return {
    ref, tag: snap.tag || null, edition: snap.edition, asof: snap.asof, commit: snap.short || null, latest: Boolean(snap.isLatest), mode: snap.mode,
  };
}

// Resolves an edition and period against the real content, rejecting anything the page would silently reinterpret.
export async function resolveNavigation(store, nav = {}) {
  const wanted = nav.edition || 'main';
  const target = await store.resolve(wanted);
  if (!target) throw new InputError(`No edition matches "${wanted}". Use the list_editions action to see what is available.`);
  const ref = !LATEST_ALIASES.has(wanted) && target.tag ? target.tag : 'main';
  const entry = await store.snapshot(ref);
  if (!entry) throw new InputError(`Edition "${wanted}" could not be loaded.`);
  const idx = indexSnapshot(entry.snapshot);
  const edition = editionInfo(entry.snapshot, ref);
  const view = nav.view || 'week';
  const from = nav.from && VIEWS.includes(nav.from.view) && typeof nav.from.key === 'string' && KEY_RE.test(nav.from.key)
    && realKey(nav.from.key) && KEY_VIEW[nav.from.key.split('-').length - 1] === nav.from.view ? nav.from : null;
  let key;
  // An inherited period is snapped like the page's own view toggle does; only explicit keys are rejected when out of range.
  if (!nav.key) key = from ? retarget(idx, from.view, from.key, view) : currentKey(idx, view);
  else if (view === 'week') {
    const weeks = keysFor(idx, 'week');
    const first = rangeOf(idx, 'week', weeks[0]).start;
    if (nav.key < first || nav.key > weeks.at(-1)) {
      throw new InputError(`${nav.key} is outside edition ${edition.edition}, which covers ${first} to ${weeks.at(-1)}.`);
    }
    key = clampKey(idx, 'week', nav.key);
  } else {
    const keys = keysFor(idx, view);
    if (!keys.includes(nav.key)) throw new InputError(`${view} ${nav.key} is not in edition ${edition.edition}; choose one of ${keys.join(', ')}.`);
    key = nav.key;
  }
  const sections = nav.sections || [];
  const unknown = sections.filter((s) => !idx.sectionById.has(s));
  if (unknown.length) throw new InputError(`Unknown chapter ${unknown.join(', ')}; valid chapters are ${idx.sections.map((s) => s.id).join(', ')}.`);
  return { nav: { ref, view, key, sections, q: nav.q || '', present: nav.present ?? null }, edition, idx };
}

// Layers a partial request over what the panel shows now (`current` is a page state report or the last opened nav):
// omitted fields keep their current values, and a view change without a key retargets the current period.
export function mergeNavigation(current, nav) {
  if (!current) return { ...nav };
  const merged = { ...nav };
  if (merged.edition === undefined && typeof current.ref === 'string' && EDITION_RE.test(current.ref)) merged.edition = current.ref;
  if (merged.sections === undefined && Array.isArray(current.sections)) merged.sections = current.sections.filter((s) => typeof s === 'string' && SECTION_RE.test(s));
  if (merged.q === undefined && typeof current.q === 'string') merged.q = current.q.trim();
  if (merged.key === undefined && VIEWS.includes(current.view) && typeof current.key === 'string') {
    merged.from = { view: current.view, key: current.key };
    if (merged.view === undefined) merged.view = current.view;
  }
  return merged;
}

export function navigateEvent(nav) {
  return { type: 'navigate', ref: nav.ref, view: nav.view, key: nav.key, sections: nav.sections, q: nav.q || '', present: nav.present ?? null };
}

export function canvasUrl(base, page, nav) {
  const hash = buildHash({
    view: nav.view, key: nav.key, ref: nav.ref, sections: new Set(nav.sections || []), q: nav.q || '', focus: null, present: nav.present ?? null, print: false,
  });
  return `${base}?i=${encodeURIComponent(page)}${hash}`;
}

// A factual, count-based description of what the panel shows, so the agent can talk about it without guessing.
export function summarize({ nav, edition, idx }) {
  const filter = nav.sections.length ? new Set(nav.sections) : null;
  const range = rangeOf(idx, nav.view, nav.key);
  const counts = countItems(itemsIn(idx, range, filter));
  const deck = buildDeck(idx, { view: nav.view, key: nav.key, sections: filter });
  const chapters = idx.sections
    .filter((s) => counts.bySection[s.id])
    .map((s) => ({ id: s.id, name: s.name, items: counts.bySection[s.id] }));
  return {
    edition: edition.edition, ref: nav.ref, tag: edition.tag, asof: edition.asof, latest: edition.latest,
    view: nav.view, key: nav.key, period: periodLabel(nav.view, nav.key, range), range: { start: range.start, end: range.end },
    sections: nav.sections.length ? nav.sections : 'all',
    // With search text the page swaps the period view for edition-wide results.
    search: nav.q ? { query: nav.q, results: searchItems(idx, nav.q, filter).length } : null,
    items: counts.total, headline: counts.headline, slides: deck.slides.length, chapters,
  };
}

export function statusLine(summary, editionCount) {
  const n = editionCount ? ` · ${editionCount} edition${editionCount === 1 ? '' : 's'}` : '';
  return `Edition ${summary.edition} · as of ${summary.asof} · ${summary.period}${n}`;
}
