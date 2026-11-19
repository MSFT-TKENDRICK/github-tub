// Selection, grouping, series and summary logic shared by the viewer (browser) and the canvas agent actions (Node).
// Pure functions over a snapshot ({ taxonomy, events, items, weeks, months, quarters, asof }); no DOM access.
import {
  YEAR_START, addDays, diffDays, editionDates, longDate, monthLabel, monthOf, monthRange, quarterOf, quarterRange,
  rangeLabel, shortDate, weekRange, yearRange, MONTHS_SHORT,
} from './periods.mjs';
import { citationUrl } from './cite.mjs';

export const VIEWS = ['week', 'month', 'year'];

export const SOURCE_LABELS = {
  changelog: 'GitHub Changelog', blog: 'GitHub Blog', vscode: 'VS Code release notes', 'vscode-blog': 'VS Code blog',
  visualstudio: 'Visual Studio blog', jetbrains: 'JetBrains', docs: 'GitHub Docs', next: 'GitHub Next',
  'security-lab': 'GitHub Security Lab', commandline: 'Command Line', research: 'Research', event: 'Event', release: 'Release notes', other: 'Source',
};

// Data-visualisation colours drawn from the GitHub 2026 brand ramps (purple = Copilot, blues = developer tools/security).
export const SECTION_COLORS = {
  copilot: '#8534F3', vscode: '#3094FF', visualstudio: '#43179E', 'jetbrains-others': '#F08A3A',
  platform: '#0FBF3E', security: '#0527FC', events: '#909692', research: '#08872B',
};

export const TIER_RANK = { headline: 0, notable: 1, minor: 2 };
export const TIER_LABEL = { headline: 'Headline', notable: 'Notable', minor: 'Also shipped' };

export const editionNumber = (asof) => Math.round(diffDays(asof, YEAR_START) / 7) + 1;

export function indexSnapshot(snap) {
  const sections = [...snap.taxonomy.sections].sort((a, b) => a.order - b.order);
  const sourceByUrl = new Map((snap.sources || []).map((source) => [citationUrl(source.url), source]));
  const checked = (url) => {
    const source = sourceByUrl.get(citationUrl(url));
    return source?.check?.ok === true && Boolean(citationUrl(source.url));
  };
  const items = (snap.items || []).filter((item) => checked(item.url));
  // Event listings carry their own provenance: the exact quote naming the event and its date, captured from a 2xx page.
  const evidenced = (event) => {
    const ev = event.evidence;
    return Boolean(citationUrl(event.url)) && ev?.status >= 200 && ev.status < 300 && (ev.quote || '').trim().length >= 8;
  };
  const events = (snap.events || []).filter((event) => evidenced(event) || checked(event.url));
  const idx = {
    ...snap,
    items,
    events,
    sections,
    sectionById: new Map(sections.map((x) => [x.id, x])),
    areaName: new Map(snap.taxonomy.areas.map((x) => [x.id, x.name])),
    ideName: new Map(snap.taxonomy.ides.map((x) => [x.id, x.name])),
    stageName: new Map(snap.taxonomy.stages.map((x) => [x.id, x.name])),
    eventById: new Map(events.map((x) => [x.id, x])),
    byId: new Map(items.map((x) => [x.id, x])),
    claimById: new Map((snap.claims || []).map((x) => [x.id, x])),
    sourceById: new Map((snap.sources || []).map((x) => [x.id, x])),
    sourceByUrl,
    haystack: new WeakMap(),
  };
  idx.claimsBySource = new Map();
  for (const claim of snap.claims || []) {
    const list = idx.claimsBySource.get(claim.sid) || [];
    list.push(claim);
    idx.claimsBySource.set(claim.sid, list);
  }
  idx.weekKeys = editionDates(YEAR_START, snap.asof);
  const months = new Set(items.map((i) => monthOf(i.date)));
  months.add(monthOf(snap.asof));
  idx.monthKeys = [...months].sort();
  idx.yearKeys = [...new Set([...idx.monthKeys.map((m) => m.slice(0, 4))])].sort();
  return idx;
}

// ---- periods ---------------------------------------------------------------

export function currentKey(idx, view) {
  if (view === 'week') return idx.weekKeys.at(-1);
  if (view === 'month') return monthOf(idx.asof);
  return idx.asof.slice(0, 4);
}

export function keysFor(idx, view) {
  return view === 'week' ? idx.weekKeys : view === 'month' ? idx.monthKeys : idx.yearKeys;
}

export function clampKey(idx, view, key) {
  const keys = keysFor(idx, view);
  if (keys.includes(key)) return key;
  if (view === 'week' && /^\d{4}-\d{2}-\d{2}$/.test(key || '')) {
    // Snap any date to the edition-week that contains it.
    const k = keys.find((w) => key <= w);
    return k || keys.at(-1);
  }
  return currentKey(idx, view);
}

export function stepKey(idx, view, key, dir) {
  const keys = keysFor(idx, view);
  const i = keys.indexOf(key);
  return keys[Math.min(keys.length - 1, Math.max(0, i + dir))];
}

// Key to show after switching views: the period that contains (or most recently precedes) the end of the current one.
export function retarget(idx, fromView, fromKey, toView) {
  if (fromView === toView) return clampKey(idx, toView, fromKey);
  const anchor = rangeOf(idx, fromView, fromKey).end;
  if (toView === 'week') return [...idx.weekKeys].reverse().find((w) => w <= anchor) || idx.weekKeys[0];
  return clampKey(idx, toView, toView === 'month' ? monthOf(anchor) : anchor.slice(0, 4));
}

// Visible range of a period, clipped to the edition date.
export function rangeOf(idx, view, key) {
  const r = view === 'week' ? weekRange(key) : view === 'month' ? monthRange(key) : yearRange(key);
  return { start: r.start, end: r.end > idx.asof ? idx.asof : r.end, full: r };
}

export function periodLabel(view, key, range) {
  if (view === 'month') return monthLabel(key);
  if (view === 'year') return key;
  return range.start === range.end ? longDate(range.start) : rangeLabel(range);
}

export function isOpenPeriod(idx, view, key) {
  const r = view === 'week' ? weekRange(key) : view === 'month' ? monthRange(key) : yearRange(key);
  return r.end > idx.asof;
}

// ---- selection -------------------------------------------------------------

export const inRange = (item, range) => item.date >= range.start && item.date <= range.end;

export function itemsIn(idx, range, sections) {
  return idx.items.filter((i) => inRange(i, range) && (!sections || sections.size === 0 || sections.has(i.section)));
}

export function countItems(items) {
  const c = { total: items.length, headline: 0, notable: 0, minor: 0, bySection: {}, byTag: {} };
  for (const i of items) {
    c[i.tier] += 1;
    c.bySection[i.section] = (c.bySection[i.section] || 0) + 1;
    c.byTag[i.tag] = (c.byTag[i.tag] || 0) + 1;
  }
  return c;
}

const byDateDesc = (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id);
const byTierThenDate = (a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || byDateDesc(a, b);

export function groupBySection(idx, items) {
  const groups = [];
  for (const section of idx.sections) {
    const own = items.filter((i) => i.section === section.id);
    if (!own.length) continue;
    groups.push({
      section,
      total: own.length,
      headline: own.filter((i) => i.tier === 'headline').sort(byDateDesc),
      notable: own.filter((i) => i.tier === 'notable').sort(byDateDesc),
      minor: own.filter((i) => i.tier === 'minor').sort(byDateDesc),
    });
  }
  return groups;
}

export function headlines(items) { return items.filter((i) => i.tier === 'headline').sort(byDateDesc); }

// Top stories for a long period: headlines first, then notable items, one-per-area spread for variety.
export function topStories(items, n) {
  const pool = items.filter((i) => i.tier !== 'minor').sort(byTierThenDate);
  const out = []; const seenAreas = new Map();
  for (const item of pool) {
    const used = seenAreas.get(item.area) || 0;
    if (used >= 2 && out.length < pool.length) continue;
    seenAreas.set(item.area, used + 1);
    out.push(item);
    if (out.length >= n) break;
  }
  return out;
}

// ---- series for charts -----------------------------------------------------

export function monthSeries(idx, sections) {
  return idx.monthKeys.map((key) => {
    const range = rangeOf(idx, 'month', key);
    const items = itemsIn(idx, range, sections);
    const c = countItems(items);
    return { key, label: MONTHS_SHORT[Number(key.slice(5)) - 1], range, counts: c, items };
  });
}

export function daySeries(idx, range, sections) {
  const out = [];
  for (let d = range.start; d <= range.end; d = addDays(d, 1)) out.push({ key: d, label: d.slice(8).replace(/^0/, ''), bySection: {}, total: 0 });
  const at = new Map(out.map((x) => [x.key, x]));
  for (const i of idx.items) {
    if (!inRange(i, range) || (sections && sections.size && !sections.has(i.section))) continue;
    const b = at.get(i.date);
    if (!b) continue;
    b.bySection[i.section] = (b.bySection[i.section] || 0) + 1;
    b.total += 1;
  }
  return out;
}

// ---- upcoming changes & events --------------------------------------------

// Changes announced on or before `from` that take effect on or after it (defaults to the edition date).
export function upcomingChanges(idx, limit = 12, sections, from = idx.asof) {
  return idx.items
    .filter((i) => i.date <= from && i.effective && i.effective >= from && (!sections || sections.size === 0 || sections.has(i.section)))
    .sort((a, b) => a.effective.localeCompare(b.effective) || a.id.localeCompare(b.id))
    .slice(0, limit)
    .map((i) => ({ item: i, daysOut: diffDays(i.effective, from) }));
}

export function eventsFor(idx, range, horizonDays = 90) {
  const events = idx.events || [];
  const during = events.filter((e) => e.start <= range.end && e.end >= range.start).sort((a, b) => a.start.localeCompare(b.start));
  const horizon = addDays(range.end, horizonDays);
  const upcoming = events.filter((e) => e.start > range.end && e.start <= horizon).sort((a, b) => a.start.localeCompare(b.start));
  return { during, upcoming };
}

// Ordered event rows for a period, shared by the Events slide and the web appendix. A year holds dozens of events, so
// it leads with what is next and then the most recent, rather than January's.
export function eventAgenda(idx, range, view, horizonDays = 60) {
  const { during, upcoming } = eventsFor(idx, range, horizonDays);
  const d = during.map((e) => ({ e, when: 'During this period' }));
  const u = upcoming.map((e) => ({ e, when: 'Coming up' }));
  return (view === 'year' ? [...u, ...d.reverse()] : [...d, ...u]).filter(({ e }) => citationUrl(e.url));
}

// Week-by-week rows for a month: the span each week covers inside the range, its item count and a one-line gist.
export function digestRows(idx, range, items, filtered) {
  return idx.weekKeys
    .filter((w) => { const r = weekRange(w); return r.end >= range.start && r.start <= range.end; })
    .map((w) => {
      const r = weekRange(w);
      const start = r.start < range.start ? range.start : r.start;
      const end = r.end > range.end ? range.end : r.end;
      const own = items.filter((i) => i.date >= start && i.date <= end);
      const narrative = narrativeFor(idx, 'week', w);
      const first = headlines(own)[0] || own.filter((i) => i.tier === 'notable').sort(byDateDesc)[0];
      return { key: w, start, end, count: own.length, text: !filtered && narrative?.headline ? narrative.headline : first?.title || 'No updates recorded' };
    });
}

export function eventDates(e) {
  const day = (s) => `${shortDate(s)}, ${s.slice(0, 4)}`;
  if (e.startsOnly) return `From ${day(e.start)}`;
  return e.start === e.end ? day(e.start) : rangeLabel({ start: e.start, end: e.end });
}

// Listing titles sometimes repeat their own dates ("Dev Days 2026 (September 1–October 31)"); the slide shows dates in
// their own column, so drop a trailing parenthetical that only restates them.
export function eventName(e) {
  const months = 'January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sept?|Oct|Nov|Dec';
  return e.name.replace(new RegExp(`\\s*\\((?:${months})\\.? \\d{1,2}(?:st|nd|rd|th)?\\s*[–—-]\\s*(?:(?:${months})\\.? )?\\d{1,2}(?:st|nd|rd|th)?(?:,? \\d{4})?\\)\\s*$`), '').trim();
}

// ---- narratives & computed fallbacks --------------------------------------

export function narrativeFor(idx, view, key) {
  if (view === 'week') return idx.weeks?.[key] || null;
  if (view === 'month') return idx.months?.[key] || null;
  return null;
}

export function closedQuarters(idx) {
  return Object.entries(idx.quarters || {})
    .map(([key, narrative]) => ({ key, narrative, range: quarterRange(key) }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

export function computedHeading(idx, view, key, range, items) {
  const c = countItems(items);
  const label = periodLabel(view, key, range);
  const open = isOpenPeriod(idx, view, key);
  const sectionsHit = Object.keys(c.bySection).length;
  const total = c.total.toLocaleString('en-US');
  const headline = view === 'year'
    ? `${key}${open ? ' so far' : ''}: ${total} updates across GitHub and GitHub Copilot`
    : `${total} updates across ${sectionsHit} product ${sectionsHit === 1 ? 'area' : 'areas'}`;
  const busiest = Object.entries(c.bySection).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 3)
    .map(([id, n]) => `${idx.sectionById.get(id)?.name || id} (${n})`);
  const mix = [c.headline && `${c.headline} headline`, c.notable && `${c.notable} notable`].filter(Boolean).join(' and ');
  const summary = !c.total
    ? `No updates recorded for ${label}.`
    : `${mix ? `${mix} ${c.headline + c.notable === 1 ? 'update' : 'updates'}, plus ${c.minor} other ${c.minor === 1 ? 'change' : 'changes'}` : `${c.minor} updates`}. Most active: ${busiest.join(', ')}.`;
  return { headline, summary, provisional: open };
}

// ---- search ----------------------------------------------------------------

function haystackOf(idx, item) {
  let h = idx.haystack.get(item);
  if (h === undefined) {
    h = [item.title, item.summary, item.why, item.admin, idx.areaName.get(item.area), idx.sectionById.get(item.section)?.name,
      item.version, item.tag, (item.labels || []).join(' '), (item.plans || []).join(' '), item.stage, item.id].filter(Boolean).join(' \n ').toLowerCase();
    idx.haystack.set(item, h);
  }
  return h;
}

export function searchItems(idx, query, sections) {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const out = [];
  for (const item of idx.items) {
    if (sections && sections.size && !sections.has(item.section)) continue;
    const hay = haystackOf(idx, item);
    if (!tokens.every((t) => hay.includes(t))) continue;
    const title = item.title.toLowerCase();
    const score = tokens.reduce((s, t) => s + (title.includes(t) ? 2 : 0), 0) - TIER_RANK[item.tier];
    out.push({ item, score });
  }
  return out.sort((a, b) => b.score - a.score || byDateDesc(a.item, b.item)).map((x) => x.item);
}

// ---- text helpers ----------------------------------------------------------

export function effectiveLabel(item, asof) {
  if (!item.effective) return '';
  const d = diffDays(item.effective, asof);
  const when = d > 0 ? `in ${d} day${d === 1 ? '' : 's'}` : d === 0 ? 'today' : `${-d} day${d === -1 ? '' : 's'} ago`;
  return `${longDate(item.effective)} · ${when}`;
}

export function planSummary(item) { return (item.plans || []).join(', '); }

// ---- agent-facing outline ---------------------------------------------------

const compact = (i, withSummary = true) => ({
  id: i.id, date: i.date, section: i.section, area: i.area, tag: i.tag, stage: i.stage, version: i.version,
  title: i.title, ...(withSummary && i.summary ? { summary: i.summary } : {}), ...(i.why ? { why: i.why } : {}),
  ...(i.effective ? { effective: i.effective } : {}), url: i.url,
});

export function briefingOutline(idx, view, key, { maxItems = 12, sections } = {}) {
  const k = clampKey(idx, view, key || currentKey(idx, view));
  const range = rangeOf(idx, view, k);
  const items = itemsIn(idx, range, sections);
  const counts = countItems(items);
  const narrative = narrativeFor(idx, view, k);
  const heading = narrative || computedHeading(idx, view, k, range, items);
  return {
    ref: idx.ref, commit: idx.commit, asof: idx.asof, edition: idx.edition ?? editionNumber(idx.asof),
    view, key: k, label: periodLabel(view, k, range), range: { start: range.start, end: range.end },
    narrative: Boolean(narrative), headline: heading.headline, summary: heading.summary,
    themes: (narrative?.themes || []).map((t) => ({ title: t.title, body: t.body, itemIds: t.itemIds })),
    counts: { total: counts.total, headline: counts.headline, notable: counts.notable, minor: counts.minor, bySection: counts.bySection },
    headlines: headlines(items).slice(0, maxItems).map((i) => compact(i)),
    notable: items.filter((i) => i.tier === 'notable').sort(byDateDesc).slice(0, maxItems).map((i) => compact(i)),
    upcomingChanges: upcomingChanges(idx, 8, sections, range.end).map(({ item, daysOut }) => ({ ...compact(item, false), daysOut })),
    events: eventsFor(idx, range).during.map((e) => ({ id: e.id, name: e.name, start: e.start, end: e.end, location: e.location, url: e.url })),
    quarters: view === 'year' ? closedQuarters(idx).map((q) => ({ key: q.key, headline: q.narrative.headline, summary: q.narrative.summary })) : undefined,
  };
}

export { quarterOf, shortDate };
