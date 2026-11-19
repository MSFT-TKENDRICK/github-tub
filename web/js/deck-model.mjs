// The briefing as a deck: a DOM-free list of 16:9 slides shared by the web reel, Present mode, print-to-PDF and the
// PowerPoint exporter (the server serialises the same model to JSON). Structure follows the Technical Update Briefing
// deck (cover, agenda, section dividers, one slide per update, Q&A); styling follows the 2026 GitHub template.
//
// Provenance rule: every sentence on a slide either cites grounded claims from checked sources (rendered as numbered
// superscripts that link to the source) or is a count/label derived from the data itself. Items whose summary does not
// pass verifiedCitations never get a full slide; they appear only as linked titles.
import {
  SECTION_COLORS, SOURCE_LABELS, TIER_RANK, clampKey, computedHeading, countItems, currentKey, editionNumber, eventAgenda, eventDates, eventName,
  eventsFor, isOpenPeriod, itemsIn, narrativeFor, periodLabel, rangeOf, upcomingChanges,
} from './briefing.mjs';
import { MONTHS_SHORT, compactRange, diffDays, longDate, monthLabel, quarterOf, weekRange } from './periods.mjs';
import { citationUrl, runs as citeRuns, sentences, verifiedCitations } from './cite.mjs';

export const SLIDE_W = 1280;
export const SLIDE_H = 720;

export const SECTION_ICONS = {
  copilot: 'copilot', vscode: 'code', visualstudio: 'device-desktop', 'jetbrains-others': 'apps',
  platform: 'repo', security: 'shield-lock', events: 'megaphone', research: 'beaker',
};
export const TAG_ICONS = { Release: 'rocket', Improvement: 'zap', Deprecation: 'alert', Announcement: 'megaphone', Research: 'beaker' };
const SOURCE_ICONS = { changelog: 'mark-github', blog: 'mark-github', docs: 'mark-github', next: 'beaker', 'security-lab': 'shield-lock', vscode: 'code', 'vscode-blog': 'code', visualstudio: 'device-desktop', commandline: 'terminal' };

export const SOURCE_HOMES = {
  changelog: 'https://github.blog/changelog/', blog: 'https://github.blog/', vscode: 'https://code.visualstudio.com/updates',
  'vscode-blog': 'https://code.visualstudio.com/blogs', visualstudio: 'https://devblogs.microsoft.com/visualstudio/',
  docs: 'https://docs.github.com', next: 'https://githubnext.com', 'security-lab': 'https://securitylab.github.com',
  commandline: 'https://commandline.microsoft.com/',
};

export const DISCLAIMER = 'Prepared from public GitHub, VS Code, Visual Studio and Microsoft developer sources. Dates are in UTC. Features, timing and availability may change. Product names and logos are trademarks of their respective owners.';

// Chapters group slides for the navigator, the agenda and Present mode. Section chapters take the section's id.
export const CHAPTER_OPENING = { id: 'opening', title: 'At a glance', icon: 'light-bulb' };
export const CHAPTER_AHEAD = { id: 'ahead', title: 'Looking ahead', icon: 'calendar' };
export const CHAPTER_CLOSE = { id: 'close', title: 'Q&A', icon: 'comment-discussion' };
const OPENING_KINDS = new Set(['cover', 'agenda', 'overview', 'themes', 'highlights']);
const AHEAD_KINDS = new Set(['upcoming', 'events']);
const ALSO_ON_DIVIDER = 2;
const fmtCount = (n) => n.toLocaleString('en-US');

// How many updates get a full slide per product area, and how many more are listed by title.
const LIMITS = {
  week: { full: 10, listed: Infinity },
  month: { full: 6, listed: 16 },
  year: { full: 3, listed: 0 },
};
const LIST_ROWS = 8;
const HIGHLIGHTS = 4;
const COMPACT_ROWS = 5;
const stripLen = (raw) => String(raw).replace(/\[\^[^\]]+\]/g, '').trim().length;

const byDateDesc = (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id);
const rank = (a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier] || byDateDesc(a, b);

export function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

// Where a reader lands. Release-note sections repeat headings across versions ("Copilot harness"), so name the release.
export function whereOf(url) {
  const vsc = /^https:\/\/code\.visualstudio\.com\/updates\/v(\d+)_(\d+)(?:[#?/]|$)/.exec(String(url || ''));
  return vsc ? `VS Code ${vsc[1]}.${vsc[2]} release notes` : hostOf(url);
}

// Publisher suffixes that page titles carry but slide titles should not.
const TITLE_SUFFIX = /\s+[-–—|·]\s+(?:the\s+)?(?:github\s+(?:changelog|blog)|visual studio(?: code)?(?: blog)?|vs code(?: blog)?|github next|microsoft (?:dev|developer) ?blogs?)\s*$/i;
export function cleanTitle(title) {
  let out = String(title ?? '').replace(/\s+/g, ' ').trim();
  for (let i = 0; i < 2; i += 1) out = out.replace(TITLE_SUFFIX, '').trim();
  return out;
}

function grounded(idx, id) {
  const claim = idx.claimById?.get(id);
  const source = claim && idx.sourceById?.get(claim.sid);
  return Boolean(claim?.v?.status === 'grounded' && source?.check?.ok === true && citationUrl(source.url));
}

export function evidenceFor(idx, item, field) {
  const allowed = new Set(item.claims || []);
  const ids = item.fieldClaims?.[field] || [];
  if (!ids.length || ids.some((id) => !allowed.has(id))) return [];
  return ids.filter((id) => grounded(idx, id));
}

export function titleOf(idx, item) {
  const source = idx.sourceByUrl?.get(citationUrl(item.url));
  const normal = (v) => String(v).normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase();
  let title = item.title;
  if (source?.check?.ok && source.title) {
    const a = normal(item.title); const b = normal(source.title);
    if (!(a === b || (b.startsWith(a) && a.length >= 24) || evidenceFor(idx, item, 'title').length)) title = source.title;
  }
  return cleanTitle(title);
}

// Per-slide citation numbering by source: every claim from the same page shares one number and one link.
function citer(idx) {
  const bySource = new Map();
  const list = [];
  const cite = (ids) => {
    const nums = [];
    for (const id of ids) {
      const claim = idx.claimById.get(id);
      const source = claim && idx.sourceById.get(claim.sid);
      const url = source && citationUrl(source.url);
      if (!url) continue;
      let entry = bySource.get(source.id);
      if (!entry) {
        entry = { n: list.length + 1, url, host: hostOf(url), publisher: source.publisher || SOURCE_LABELS[source.kind] || hostOf(url), title: cleanTitle(source.title || ''), published: source.published || '', quotes: [] };
        bySource.set(source.id, entry);
        list.push(entry);
      }
      if (claim.quote && !entry.quotes.includes(claim.quote)) entry.quotes.push(claim.quote);
      if (!nums.includes(entry.n)) nums.push(entry.n);
    }
    return nums;
  };
  cite.list = list;
  return cite;
}

// Text with markers -> [{ t } | { c: [n] }]; null unless every sentence cites grounded claims (optionally from `allowed`).
function citedRuns(idx, cite, text, allowed = null) {
  if (!text || !verifiedCitations(idx, text, allowed)) return null;
  return citeRuns(text).map((part) => (part.text !== undefined ? { t: part.text } : { c: cite(part.cite) }));
}

// A summary split into paragraphs of whole sentences (one or two per paragraph) so slides read like the reference deck.
function paragraphs(idx, cite, text, allowed) {
  if (!text || !verifiedCitations(idx, text, allowed)) return null;
  const parts = sentences(text);
  const groups = parts.length <= 3 ? parts.map((p) => [p]) : [parts.slice(0, 2), parts.slice(2, 4), parts.slice(4)].filter((g) => g.length);
  return groups.map((group) => group.flatMap((p) => citeRuns(p.raw).map((part) => (part.text !== undefined ? { t: part.text } : { c: cite(part.cite) })))
    .reduce((acc, run, i, all) => {
      if (run.t !== undefined && i > 0 && all[i - 1].c) acc.push({ t: ` ${run.t.replace(/^\s+/, '')}` });
      else acc.push(run);
      return acc;
    }, []));
}

function factsFor(idx, item, cite) {
  const rows = [];
  const add = (field, k, v) => {
    const ids = evidenceFor(idx, item, field);
    if (v && ids.length) rows.push({ k, v, c: cite(ids) });
  };
  add('stage', 'Status', idx.stageName?.get(item.stage) || '');
  add('version', 'Version', item.version);
  add('ides', 'Available in', (item.ides || []).map((id) => idx.ideName.get(id) || id).join(', '));
  add('plans', 'Plans', item.plans?.length >= 5 ? 'All plans' : (item.plans || []).join(', '));
  if (item.effective) add('effective', 'Takes effect', longDate(item.effective));
  return rows;
}

export function hasFullSlide(idx, item) {
  return Boolean(item.summary && verifiedCitations(idx, item.summary, item.claims || []));
}

function sourceBadge(item) {
  return { label: SOURCE_LABELS[item.source] || 'Source', icon: SOURCE_ICONS[item.source] || 'link-external' };
}

function updateSlide(idx, item) {
  const cite = citer(idx);
  const body = paragraphs(idx, cite, item.summary, item.claims || []);
  if (!body) return null;
  const why = item.why ? citedRuns(idx, cite, item.why, item.claims || []) : null;
  const facts = factsFor(idx, item, cite);
  const url = citationUrl(item.url);
  const title = titleOf(idx, item);
  return {
    kind: 'update', id: `i-${item.id}`, itemId: item.id, section: item.section, color: SECTION_COLORS[item.section] || SECTION_COLORS.events,
    title, size: title.length > 96 ? 's' : title.length > 64 ? 'm' : 'l',
    badge: sourceBadge(item), tag: item.tag || '', tagIcon: TAG_ICONS[item.tag] || 'tag', tier: item.tier,
    area: idx.areaName?.get(item.area) || '', body, why, facts,
    link: { url, host: whereOf(url) }, date: item.date, sources: cite.list,
  };
}

function listSlides(idx, section, items, label, total, intro = null) {
  const out = [];
  const pages = Math.ceil(items.length / LIST_ROWS);
  for (let p = 0; p < pages; p += 1) {
    const rows = items.slice(p * LIST_ROWS, (p + 1) * LIST_ROWS).map((item) => {
      const url = citationUrl(item.url);
      return { id: `i-${item.id}`, itemId: item.id, date: item.date, tag: item.tag || '', tagIcon: TAG_ICONS[item.tag] || 'tag', title: titleOf(idx, item), url, host: whereOf(url) };
    });
    const last = p === pages - 1;
    out.push({
      kind: 'list', id: intro ? `section-${section.id}` : `list-${section.id}-${p + 1}`, section: section.id, color: SECTION_COLORS[section.id] || SECTION_COLORS.events,
      title: `${section.name}: also shipped`, page: p + 1, pages, rows, more: last ? Math.max(0, total - items.length) : 0, label,
      ...(intro ? { compact: true, name: section.name, icon: SECTION_ICONS[section.id] || 'file', blurb: intro.blurb || '', stat: intro.stat } : {}),
    });
  }
  return out;
}

// Spread a year's picks across quarters so the year deck is not just the latest month.
function pick(items, n, view) {
  const pool = [...items].sort(rank);
  if (view !== 'year' || pool.length <= n) return pool.slice(0, n);
  const byQuarter = new Map();
  for (const item of pool) {
    const q = quarterOf(item.date);
    if (!byQuarter.has(q)) byQuarter.set(q, []);
    byQuarter.get(q).push(item);
  }
  const queues = [...byQuarter.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([, list]) => list);
  const out = [];
  while (out.length < n && queues.some((q) => q.length)) for (const q of queues) if (q.length && out.length < n) out.push(q.shift());
  return out.sort(byDateDesc);
}

function periodTitle(view, key, range) {
  if (view === 'week') return `Week of ${periodLabel(view, key, range).replace(/^Week of\s+/i, '')}`;
  if (view === 'month') return `${monthLabel(key)} updates`;
  return `${key} year in review`;
}

function chartBars(idx, view, key, range, sections) {
  const legendIds = new Set();
  let bars = [];
  if (view === 'year') {
    for (const m of idx.monthKeys.filter((k) => k.startsWith(key))) {
      const items = itemsIn(idx, rangeOf(idx, 'month', m), sections);
      bars.push({ label: MONTHS_SHORT[Number(m.slice(5)) - 1], title: monthLabel(m), key: m, ...segments(items) });
    }
  } else if (view === 'month') {
    for (const w of idx.weekKeys) {
      const r = weekRange(w);
      if (r.end < range.start || r.start > range.end) continue;
      const span = { start: r.start < range.start ? range.start : r.start, end: r.end > range.end ? range.end : r.end };
      const items = itemsIn(idx, span, sections);
      bars.push({ label: `${span.start.slice(8).replace(/^0/, '')}–${span.end.slice(8).replace(/^0/, '')}`, title: compactRange(span.start, span.end), key: w, ...segments(items) });
    }
  } else {
    const days = [];
    for (let d = range.start; d <= range.end; d = nextDay(d)) days.push(d);
    bars = days.map((d) => ({ label: `${MONTHS_SHORT[Number(d.slice(5, 7)) - 1]} ${Number(d.slice(8))}`, title: longDate(d), key: d, ...segments(itemsIn(idx, { start: d, end: d }, sections)) }));
  }
  function segments(items) {
    const c = countItems(items);
    const segs = idx.sections.filter((s) => c.bySection[s.id]).map((s) => { legendIds.add(s.id); return { id: s.id, value: c.bySection[s.id], color: SECTION_COLORS[s.id] }; });
    return { total: c.total, segments: segs };
  }
  const legend = idx.sections.filter((s) => legendIds.has(s.id)).map((s) => ({ id: s.id, name: s.name, color: SECTION_COLORS[s.id] }));
  return { unit: view === 'year' ? 'month' : view === 'month' ? 'week' : 'day', bars, legend, max: Math.max(1, ...bars.map((b) => b.total)) };
}

const nextDay = (d) => new Date(Date.parse(`${d}T00:00:00Z`) + 86400000).toISOString().slice(0, 10);

export function buildDeck(idx, { view = 'week', key, sections } = {}) {
  const k = clampKey(idx, view, key || currentKey(idx, view));
  const range = rangeOf(idx, view, k);
  const filter = sections && sections.size ? sections : null;
  const items = itemsIn(idx, range, filter);
  const counts = countItems(items);
  const open = isOpenPeriod(idx, view, k);
  const label = periodLabel(view, k, range);
  const edition = idx.edition ?? editionNumber(idx.asof);
  const limits = LIMITS[view] || LIMITS.week;
  const slides = [];

  slides.push({
    kind: 'cover', id: 'cover', eyebrow: 'GitHub Copilot', title: 'Technical Update Briefing', period: periodTitle(view, k, range),
    range: `${longDate(range.start)} – ${longDate(range.end < idx.asof ? range.end : idx.asof)}`, provisional: open,
    note: `Edition ${edition} · Information as of ${longDate(idx.asof)}`,
    filter: filter ? idx.sections.filter((s) => filter.has(s.id)).map((s) => s.name).join(', ') : '',
  });

  const groups = idx.sections.map((section) => ({ section, items: items.filter((i) => i.section === section.id) })).filter((g) => g.items.length);

  slides.push({
    kind: 'agenda', id: 'agenda', title: 'Agenda',
    entries: [
      { icon: CHAPTER_OPENING.icon, title: CHAPTER_OPENING.title, blurb: `What changed ${view === 'week' ? 'this week' : view === 'month' ? 'this month' : `in ${k}`}`, chapter: CHAPTER_OPENING.id },
      ...groups.map((g) => ({ icon: SECTION_ICONS[g.section.id] || 'file', title: g.section.name, blurb: g.section.blurb, count: g.items.length, section: g.section.id, chapter: g.section.id })),
      { icon: CHAPTER_CLOSE.icon, title: CHAPTER_CLOSE.title, blurb: 'No need to hold questions until the end', chapter: CHAPTER_CLOSE.id },
    ],
  });

  // At a glance: verified narrative when one exists for the period and no filter is applied; computed counts otherwise.
  const narrative = filter ? null : narrativeFor(idx, view, k);
  const cite = citer(idx);
  const headline = narrative ? citedRuns(idx, cite, narrative.headline) : null;
  const summary = narrative ? citedRuns(idx, cite, narrative.summary) : null;
  const computed = computedHeading(idx, view, k, range, items);
  const tagCounts = new Map();
  for (const i of items) tagCounts.set(i.tag, (tagCounts.get(i.tag) || 0) + 1);
  const byTag = (t) => tagCounts.get(t) || 0;
  slides.push({
    kind: 'overview', id: 'overview', title: 'At a glance', period: label, provisional: open,
    headline: headline || [{ t: computed.headline }], summary: summary || [{ t: computed.summary }], cited: Boolean(headline && summary),
    kpis: [
      { n: counts.total, label: counts.total === 1 ? 'update' : 'updates' },
      { n: byTag('Release'), label: byTag('Release') === 1 ? 'new release' : 'new releases' },
      { n: byTag('Improvement'), label: byTag('Improvement') === 1 ? 'improvement' : 'improvements' },
      { n: byTag('Deprecation'), label: byTag('Deprecation') === 1 ? 'deprecation or retirement' : 'deprecations and retirements' },
    ],
    areas: groups.map((g) => ({ id: g.section.id, name: g.section.name, value: g.items.length, color: SECTION_COLORS[g.section.id] })),
    chart: chartBars(idx, view, k, range, filter),
    sources: cite.list,
  });

  if (narrative?.themes?.length) {
    const tc = citer(idx);
    const themes = narrative.themes.map((t) => ({ title: t.title, body: citedRuns(idx, tc, t.body) })).filter((t) => t.body).slice(0, 3);
    if (themes.length) slides.push({ kind: 'themes', id: 'themes', title: 'Key themes', themes, sources: tc.list });
  }

  // Highlights: the period's most significant updates, each told in its publisher's own opening sentence (cited).
  // Spread across product areas first, then fill remaining slots; a lone card is not a highlights slide (it already
  // has its own update slide).
  const hc = citer(idx);
  const cards = [];
  const ledes = new Map();
  const ledeOf = (item) => {
    if (!ledes.has(item.id)) {
      const lede = sentences(item.summary).find((p) => stripLen(p.raw) <= 200);
      ledes.set(item.id, lede ? lede.raw : null);
    }
    return ledes.get(item.id);
  };
  const pool = items.filter((i) => hasFullSlide(idx, i) && ledeOf(i)).sort(rank);
  const chosen = [];
  const perSection = new Map();
  // A year's highlights take turns across quarters (latest first) so they summarise the year, not its last month.
  const lanes = view === 'year'
    ? [...pool.reduce((m, i) => m.set(quarterOf(i.date), [...(m.get(quarterOf(i.date)) || []), i]), new Map()).entries()]
      .sort((a, b) => b[0].localeCompare(a[0])).map(([, list]) => list)
    : [pool];
  for (const cap of [groups.length > 2 ? 1 : 2, HIGHLIGHTS]) {
    let progress = true;
    while (chosen.length < HIGHLIGHTS && progress) {
      progress = false;
      for (const lane of lanes) {
        if (chosen.length >= HIGHLIGHTS) break;
        const item = lane.find((i) => !chosen.includes(i) && (perSection.get(i.section) || 0) < cap);
        if (!item) continue;
        perSection.set(item.section, (perSection.get(item.section) || 0) + 1);
        chosen.push(item);
        progress = true;
        if (lanes.length === 1) break;
      }
    }
  }
  if (chosen.length >= 2) {
    for (const item of (view === 'year' ? chosen.sort(byDateDesc) : chosen.sort(rank))) {
      const runs = citedRuns(idx, hc, ledeOf(item), item.claims || []);
      if (!runs) continue;
      const url = citationUrl(item.url);
      cards.push({
        itemId: item.id, section: item.section, sectionName: idx.sections.find((s) => s.id === item.section)?.name || '',
        color: SECTION_COLORS[item.section] || SECTION_COLORS.events, icon: SECTION_ICONS[item.section] || 'file',
        title: titleOf(idx, item), date: item.date, tag: item.tag || '', body: runs, url, host: whereOf(url),
      });
    }
  }
  if (cards.length >= 2) slides.push({ kind: 'highlights', id: 'highlights', title: 'Highlights', period: label, cards, sources: hc.list });

  for (const g of groups) {
    const eligible = g.items.filter((i) => hasFullSlide(idx, i));
    const featured = pick(eligible, limits.full, view);
    const featuredIds = new Set(featured.map((i) => i.id));
    const rest = g.items.filter((i) => !featuredIds.has(i.id)).sort(rank);
    const listed = rest.slice(0, limits.listed);
    const more = rest.length - listed.length;
    const stat = [
      `${fmtCount(g.items.length)} ${g.items.length === 1 ? 'update' : 'updates'}`,
      featured.length ? `${featured.length} covered in detail` : '',
      more > 0 ? `${fmtCount(more)} more in the full briefing` : '',
    ].filter(Boolean).join(' · ');
    // A short area with nothing featured is one section slide (identity plus linked titles) rather than a near-empty
    // divider followed by a near-empty list.
    if (!featured.length && listed.length && listed.length <= COMPACT_ROWS) {
      slides.push(...listSlides(idx, g.section, listed, label, rest.length, { blurb: g.section.blurb, stat }));
      continue;
    }
    // One or two leftovers would make a near-empty "also shipped" slide; they ride on the divider instead.
    const also = featured.length && listed.length <= ALSO_ON_DIVIDER && !more ? listSlides(idx, g.section, listed, label, rest.length)[0]?.rows || [] : [];
    slides.push({
      kind: 'divider', id: `section-${g.section.id}`, section: g.section.id, color: SECTION_COLORS[g.section.id], icon: SECTION_ICONS[g.section.id] || 'file',
      title: g.section.name, blurb: g.section.blurb, stat, also,
    });
    for (const item of featured) {
      const slide = updateSlide(idx, item);
      if (slide) slides.push(slide);
    }
    if (listed.length && !also.length) slides.push(...listSlides(idx, g.section, listed, label, rest.length));
  }

  const upcoming = upcomingChanges(idx, 8, filter, range.end < idx.asof ? range.end : idx.asof)
    .filter(({ item }) => evidenceFor(idx, item, 'effective').length);
  if (upcoming.length) {
    const uc = citer(idx);
    slides.push({
      kind: 'upcoming', id: 'upcoming', title: 'Coming up: changes taking effect',
      rows: upcoming.map(({ item, daysOut }) => ({ itemId: item.id, effective: item.effective, days: daysOut, title: titleOf(idx, item), tag: item.tag || '', c: uc(evidenceFor(idx, item, 'effective')) })),
      sources: uc.list,
    });
  }

  const allEventRows = (filter && !filter.has('events') ? [] : eventAgenda(idx, range, view))
    .map(({ e, when }) => ({ name: eventName(e), dates: eventDates(e), location: e.location || '', url: citationUrl(e.url), host: hostOf(e.url), when }))
    .filter((r) => r.url);
  const eventRows = allEventRows.slice(0, LIST_ROWS);
  if (eventRows.length) slides.push({ kind: 'events', id: 'events', title: 'Events', rows: eventRows, more: allEventRows.length - eventRows.length });

  const used = new Set(items.map((i) => i.source));
  slides.push({
    kind: 'closing', id: 'closing', title: 'Q&A', subtitle: 'Thank you',
    sources: Object.keys(SOURCE_HOMES).filter((s) => used.has(s)).map((s) => ({ label: SOURCE_LABELS[s] || s, url: SOURCE_HOMES[s], host: hostOf(SOURCE_HOMES[s]) })),
    note: `Edition ${edition} · Information as of ${longDate(idx.asof)}`,
    disclaimer: DISCLAIMER,
    provenance: 'Every statement in this briefing links to the public page it came from. Superscript numbers open the source.',
  });

  if (upcoming.length || eventRows.length) {
    const agendaSlide = slides.find((s) => s.kind === 'agenda');
    agendaSlide.entries.splice(agendaSlide.entries.length - 1, 0, {
      icon: CHAPTER_AHEAD.icon, title: CHAPTER_AHEAD.title, chapter: CHAPTER_AHEAD.id,
      blurb: [upcoming.length ? 'Changes taking effect' : '', eventRows.length ? 'events' : ''].filter(Boolean).join(' and ').replace(/^e/, 'E'),
    });
  }

  const sectionChapters = new Map(groups.map((g) => [g.section.id, { id: g.section.id, title: g.section.name, icon: SECTION_ICONS[g.section.id] || 'file', section: g.section.id }]));
  slides.forEach((s, i) => {
    s.n = i + 1;
    s.chapter = OPENING_KINDS.has(s.kind) ? CHAPTER_OPENING
      : AHEAD_KINDS.has(s.kind) ? CHAPTER_AHEAD
        : s.kind === 'closing' ? CHAPTER_CLOSE
          : sectionChapters.get(s.section) || CHAPTER_OPENING;
  });
  return {
    meta: { view, key: k, label, period: periodTitle(view, k, range), range, edition, asof: idx.asof, ref: idx.ref || 'main', commit: idx.commit || '', total: slides.length, filtered: Boolean(filter) },
    slides,
  };
}

// Consecutive slides sharing a chapter, in deck order: [{ id, title, icon, section, slides, first }].
export function chapters(deck) {
  const out = [];
  for (const slide of deck.slides) {
    const last = out[out.length - 1];
    if (last && last.id === slide.chapter.id) last.slides.push(slide);
    else out.push({ ...slide.chapter, slides: [slide], first: slide.n });
  }
  return out;
}

// The slide number a chapter starts on, or 0 when the deck has no such chapter. Agenda entries jump here.
export function chapterStart(slides, id) {
  return slides.find((slide) => slide.chapter?.id === id)?.n || 0;
}

// The drawing a slide shares with its neighbours. Present mode treats consecutive slides of one chapter and section with
// the same layout as a group: the frame stays still and only the headline and body change. A compact section list is
// alone in its chapter and a divider or cover has nothing to share, so those have no key.
export function layoutKey(slide) {
  switch (slide?.kind) {
    case 'update': return 'update';
    case 'list': return slide.compact ? null : 'rows';
    case 'upcoming':
    case 'events': return 'rows';
    case 'themes':
    case 'highlights': return 'cards';
    default: return null;
  }
}

export function sameLayout(a, b) {
  const key = layoutKey(a);
  return Boolean(key) && key === layoutKey(b) && a.chapter?.id === b.chapter?.id && (a.section || '') === (b.section || '');
}

export { diffDays };
