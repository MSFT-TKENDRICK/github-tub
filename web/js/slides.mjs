// Draws deck-model slides as fixed 1280×720 DOM slides. Layout follows the Technical Update Briefing deck and the 2026
// GitHub presentation template: dark brand slides (cover, agenda, dividers, overview, closing) and a light body for each
// update. A container scales slides with `transform: scale(var(--k))`, so every size here is in slide pixels.
//
// Every superscript is a link to the page the sentence came from; nothing is set with innerHTML.
import { h, s, icon, fmtNum, shortUrl, safeUrl } from './dom.mjs';
import { SECTION_ICONS, SLIDE_H, SLIDE_W } from './deck-model.mjs';
import { longDate, shortDate } from './periods.mjs';

let uid = 0;
const nextId = (prefix) => `${prefix}-${(uid += 1)}`;
const sec = (id) => (id ? { '--c': `var(--sec-${id})`, '--ink': `var(--sec-${id}-ink)` } : undefined);
const isoDay = (v) => (/^\d{4}-\d{2}-\d{2}/.test(String(v || '')) ? String(v).slice(0, 10) : '');

function link(url, kids, props = {}) {
  const href = safeUrl(url);
  if (!href) return h('span', props, kids);
  return h('a', { href, target: '_blank', rel: 'noopener noreferrer', ...props }, kids);
}

// What the hover preview shows for an element. It lives here rather than in attributes so anchors stay plain links.
const PREVIEWS = new WeakMap();
export const previewOf = (el) => PREVIEWS.get(el) || null;

function sourcePreview(src) {
  const quote = src.quotes?.[0] || '';
  const day = isoDay(src.published);
  return {
    type: 'source',
    publisher: src.publisher || '',
    title: src.title || '',
    date: day ? longDate(day) : '',
    quote: quote.length > 240 ? `${quote.slice(0, 237)}…` : quote,
    host: shortUrl(src.url),
  };
}

// A link to a source page. `data-n` is the footnote number, so a citation and its footnote can light up together.
function sourceLink(src, n, kids, props = {}) {
  const el = link(src.url, kids, props);
  if (el.tagName === 'A') {
    el.dataset.n = String(n);
    el.dataset.tip = '';
    PREVIEWS.set(el, sourcePreview(src));
  }
  return el;
}

function cite(nums, sources) {
  const links = [];
  for (const n of nums || []) {
    const src = sources?.[n - 1];
    if (!src || !safeUrl(src.url)) continue;
    if (links.length) links.push(h('span', { class: 's-cite__sep' }, ','));
    links.push(sourceLink(src, n, String(n), { 'aria-label': `Source ${n}: ${[src.publisher, src.title].filter(Boolean).join(', ')}` }));
  }
  return links.length ? h('sup', { class: 's-cite' }, links) : null;
}

// Whole-row and whole-card links get an arrow that slides in on hover.
const go = (cls) => h('span', { class: cls, 'aria-hidden': 'true' }, icon('arrow-right', { size: 20 }));
const rowClass = (base, url) => [base, safeUrl(url) && 'is-link'];

// [{ t } | { c: [n] }] -> text nodes and superscript links.
export function runs(list, sources) {
  return (list || []).map((r) => (r.t !== undefined ? r.t : cite(r.c, sources)));
}

const textLength = (list) => (list || []).reduce((n, r) => n + (r.t ? r.t.length : 0), 0);

function tag(label, iconName) {
  if (!label) return null;
  return h('span', { class: ['s-tag', `s-tag--${label.toLowerCase()}`] }, icon(iconName || 'tag', { size: 14 }), label);
}

function footer(slide, meta) {
  return h('footer', { class: 's-foot' },
    h('span', { class: 's-foot__label' }, `Technical Update Briefing · ${meta.period}`),
    h('span', { class: 's-foot__n' }, String(slide.n)),
    h('span', { class: 's-foot__mark' }, icon('mark-github', { size: 24, label: 'GitHub' })));
}

function footnotes(sources, cls = '') {
  if (!sources?.length) return null;
  return h('ol', { class: ['s-notes', cls], 'aria-label': 'Sources' },
    sources.map((src) => h('li', { value: src.n }, sourceLink(src, src.n, shortUrl(src.url)))));
}

function frame(slide, meta, tone, label, kids) {
  return h('section', {
    class: ['slide', `slide--${slide.kind}`, tone === 'light' ? 'theme-light' : 'theme-dark'],
    style: sec(slide.section),
    role: 'group',
    'aria-roledescription': 'slide',
    'aria-label': `Slide ${slide.n} of ${meta.total}: ${label}`,
    dataset: { n: String(slide.n), kind: slide.kind },
  }, kids);
}

// ---- brand artwork --------------------------------------------------------------------------------------------------

// Left rail from the 2026 template title slide: Invertocat, a three-node graph and two rounded tiles.
function rail() {
  const mark = icon('mark-github', { size: 157 });
  mark.setAttribute('x', '38');
  mark.setAttribute('y', '36');
  return s('svg', { class: 's-rail', width: 233, height: SLIDE_H, viewBox: `0 0 233 ${SLIDE_H}`, 'aria-hidden': 'true' },
    mark,
    s('g', { stroke: '#909692', 'stroke-width': 5, 'stroke-linecap': 'round' },
      s('line', { x1: 117, y1: 284, x2: 117, y2: 228 }),
      s('line', { x1: 117, y1: 284, x2: 67, y2: 321 }),
      s('line', { x1: 117, y1: 284, x2: 167, y2: 321 })),
    s('g', { fill: '#0FBF3E' },
      s('circle', { cx: 117, cy: 228, r: 11 }), s('circle', { cx: 67, cy: 321, r: 11 }), s('circle', { cx: 167, cy: 321, r: 11 })),
    s('rect', { x: 39, y: 363, width: 156, height: 156, rx: 24, fill: '#343D36' }),
    s('rect', { x: 39, y: 528, width: 156, height: 156, rx: 24, fill: '#08872B' }));
}

// Perspective floor with a soft glow, as on the template's section and agenda slides.
function perspective(color, { glowY = 470, strength = 0.32, horizon = 430 } = {}) {
  const id = nextId('glow');
  const vx = SLIDE_W / 2; const vy = horizon - 140;
  const lines = [];
  for (let x = -2400; x <= SLIDE_W + 2400; x += 160) lines.push(s('line', { x1: vx, y1: vy, x2: x, y2: SLIDE_H }));
  for (let i = 1; i <= 9; i += 1) {
    const y = horizon + (SLIDE_H - horizon) * (i / 9) ** 1.8;
    lines.push(s('line', { x1: 0, y1: y, x2: SLIDE_W, y2: y }));
  }
  return s('svg', { class: 's-grid', width: SLIDE_W, height: SLIDE_H, viewBox: `0 0 ${SLIDE_W} ${SLIDE_H}`, 'aria-hidden': 'true' },
    s('defs', null,
      s('radialGradient', { id, cx: '50%', cy: `${(glowY / SLIDE_H) * 100}%`, r: '55%' },
        s('stop', { offset: '0%', style: { stopColor: color, stopOpacity: String(strength) } }),
        s('stop', { offset: '100%', style: { stopColor: color, stopOpacity: '0' } })),
      s('clipPath', { id: `${id}-c` }, s('rect', { x: 0, y: horizon, width: SLIDE_W, height: SLIDE_H - horizon }))),
    s('rect', { x: 0, y: 0, width: SLIDE_W, height: SLIDE_H, fill: `url(#${id})` }),
    s('g', { class: 's-grid__lines', 'clip-path': `url(#${id}-c)` }, lines));
}

// ---- slides ---------------------------------------------------------------------------------------------------------

function cover(slide, meta) {
  const [edition, ...rest] = String(slide.note || '').split(' · ');
  return frame(slide, meta, 'dark', `${slide.title}, ${slide.period}`, [
    rail(),
    h('div', { class: 's-vrule' }),
    h('div', { class: 's-cover__text' },
      h('p', { class: 's-cover__eyebrow' }, slide.eyebrow),
      h('h2', { class: 's-cover__title' }, slide.title),
      h('p', { class: 's-cover__period' }, slide.period),
      h('p', { class: 's-cover__range' }, slide.range, slide.provisional ? h('span', { class: 's-pill s-pill--live' }, 'In progress') : null)),
    h('div', { class: 's-cover__foot' },
      h('p', null, h('strong', null, edition), rest.length ? ` · ${rest.join(' · ')}` : ''),
      slide.filter ? h('p', { class: 's-cover__filter' }, `Product areas: ${slide.filter}`) : null),
  ]);
}

function agenda(slide, meta) {
  const list = slide.entries || [];
  const cols = list.length > 4 ? 2 : 1;
  const per = Math.ceil(list.length / cols);
  const gap = Math.min(102, Math.floor(440 / per));
  const column = (entries, offset, left) => h('ol', { class: 's-agenda__col', start: offset + 1, style: { left: `${left}px`, '--row': `${gap}px` } },
    entries.map((e) => h('li', { class: ['s-agenda__item', e.chapter && 'is-link'], style: sec(e.section) },
      h('span', { class: 's-agenda__ring' }, icon(e.icon, { size: 34 })),
      h('span', { class: 's-agenda__text' },
        h('span', { class: 's-agenda__name' }, e.title, e.count ? h('span', { class: 's-agenda__count' }, fmtNum(e.count)) : null),
        e.blurb ? h('span', { class: 's-agenda__blurb' }, e.blurb) : null),
      e.chapter ? h('button', { class: 's-agenda__hit', type: 'button', 'aria-label': `Go to ${e.title}`, dataset: { goto: e.chapter } }, icon('arrow-right', { size: 22 })) : null)));
  return frame(slide, meta, 'dark', 'Agenda', [
    perspective('#0FBF3E', { strength: 0.18, glowY: 720 }),
    h('h2', { class: 's-agenda__title' }, slide.title),
    cols === 2
      ? [column(list.slice(0, per), 0, 116), column(list.slice(per), per, 692)]
      : column(list, 0, 360),
    footer(slide, meta),
  ]);
}

function chart(c) {
  const W = 696; const H = 146; const base = 120;
  const bars = c.bars || [];
  const slot = W / Math.max(1, bars.length);
  const bw = Math.min(48, slot * 0.62);
  const scale = (base - 24) / Math.max(1, c.max);
  const unit = c.unit === 'day' ? 'Updates per day' : c.unit === 'week' ? 'Updates per week' : 'Updates per month';
  const summary = bars.map((b) => `${b.label}: ${b.total}`).join(', ');
  const svg = s('svg', { class: 's-chart__svg', width: W, height: H, viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': `${unit}. ${summary}` },
    s('line', { class: 's-chart__base', x1: 0, x2: W, y1: base + 0.5, y2: base + 0.5 }));
  const names = new Map((c.legend || []).map((l) => [l.id, l.name]));
  bars.forEach((b, i) => {
    const x = i * slot + (slot - bw) / 2;
    let y = base;
    const g = s('g', { class: 's-chart__bar' });
    PREVIEWS.set(g, { type: 'bar', label: b.title || b.label, total: b.total, parts: b.segments.map((seg) => ({ id: seg.id, name: names.get(seg.id) || seg.id, value: seg.value })) });
    g.appendChild(s('rect', { class: 's-chart__hit', x: i * slot, y: 0, width: slot, height: H }));
    for (const seg of b.segments) {
      const hgt = seg.value * scale;
      y -= hgt;
      g.appendChild(s('rect', { class: 's-chart__seg', 'data-area': seg.id, x, y, width: bw, height: Math.max(0, hgt), style: { fill: `var(--sec-${seg.id}, ${seg.color})` } }));
    }
    if (b.total) g.appendChild(s('text', { class: 's-chart__val', x: x + bw / 2, y: y - 7, 'text-anchor': 'middle' }, fmtNum(b.total)));
    g.appendChild(s('text', { class: 's-chart__lab', x: x + bw / 2, y: H - 4, 'text-anchor': 'middle' }, b.label));
    svg.appendChild(g);
  });
  return h('figure', { class: 's-card s-chart' }, h('figcaption', { class: 's-card__cap' }, unit), svg);
}

function overview(slide, meta) {
  const areas = slide.areas || [];
  return frame(slide, meta, 'dark', `${slide.title}, ${slide.period}`, [
    h('p', { class: 's-pill s-pill--accent s-over__pill' }, slide.period, slide.provisional ? ' · in progress' : ''),
    h('h2', { class: 's-title s-over__title' }, slide.title),
    h('p', { class: 's-over__headline', 'data-fit': '' }, runs(slide.headline, slide.sources)),
    h('p', { class: 's-over__summary', 'data-fit': '' }, runs(slide.summary, slide.sources)),
    h('ul', { class: 's-kpis' }, slide.kpis.map((k) => h('li', { class: 's-card s-kpi' },
      h('span', { class: 's-kpi__n' }, fmtNum(k.n)), h('span', { class: 's-kpi__l' }, k.label)))),
    chart(slide.chart),
    h('div', { class: 's-card s-legend' },
      h('p', { class: 's-card__cap' }, 'By product area'),
      areas.length
        ? h('ul', { class: ['s-legend__list', areas.length > 7 ? 'is-dense' : areas.length > 5 && 'is-tight'] }, areas.map((a) => h('li', { style: sec(a.id), dataset: { area: a.id } },
          h('span', { class: 's-legend__sw', 'aria-hidden': 'true' }), h('span', { class: 's-legend__name' }, a.name), h('span', { class: 's-legend__n' }, fmtNum(a.value)))))
        : h('p', { class: 's-legend__none' }, 'No updates recorded.')),
    slide.cited ? footnotes(slide.sources, 's-notes--one') : null,
    footer(slide, meta),
  ]);
}

function themes(slide, meta) {
  return frame(slide, meta, 'dark', slide.title, [
    h('h2', { class: 's-title s-hl__title' }, slide.title),
    h('ul', { class: ['s-hl__grid', `is-${Math.min(3, slide.themes.length)}`, 'is-row'] }, slide.themes.map((t) => h('li', { class: 's-card s-hl__card' },
      h('h3', { class: 's-hl__h' }, t.title),
      h('p', { class: 's-hl__body', 'data-fit': '' }, runs(t.body, slide.sources))))),
    footnotes(slide.sources),
    footer(slide, meta),
  ]);
}

function highlights(slide, meta) {
  const n = Math.min(4, slide.cards.length);
  return frame(slide, meta, 'dark', `${slide.title}, ${slide.period}`, [
    h('h2', { class: 's-title s-hl__title' }, slide.title),
    h('p', { class: 's-pill s-pill--accent s-hl__pill' }, slide.period),
    h('ul', { class: ['s-hl__grid', `is-${n}`] }, slide.cards.map((c) => {
      const linked = !!safeUrl(c.url);
      return h('li', { class: ['s-card s-hl__card', linked && 'is-link'], style: sec(c.section), dataset: { ...(linked ? { spot: '' } : null), ...(c.itemId ? { item: c.itemId } : null) } },
        h('p', { class: 's-eyebrow' }, icon(c.icon, { size: 16 }), c.sectionName, c.tag ? h('span', { class: 's-eyebrow__tag' }, ` · ${c.tag}`) : null),
        h('h3', { class: 's-hl__h' }, link(c.url, c.title)),
        h('p', { class: 's-hl__body', 'data-fit': '' }, runs(c.body, slide.sources)),
        h('p', { class: 's-hl__meta' }, h('span', { class: 's-mono' }, shortDate(c.date)), h('span', { 'aria-hidden': 'true' }, ' · '), link(c.url, c.host)),
        linked ? go('s-hl__go') : null);
    })),
    footnotes(slide.sources),
    footer(slide, meta),
  ]);
}

function divider(slide, meta) {
  return frame(slide, meta, 'dark', slide.title, [
    perspective(`var(--sec-${slide.section}, ${slide.color})`, { strength: 0.42, glowY: 330 }),
    h('div', { class: 's-div__icon' }, icon(slide.icon, { size: 120 })),
    h('h2', { class: 's-div__title' }, slide.title),
    slide.blurb ? h('p', { class: 's-div__blurb' }, slide.blurb) : null,
    h('p', { class: 's-div__stat' }, slide.stat),
    footer(slide, meta),
  ]);
}

function visual(slide) {
  const facts = slide.facts || [];
  return h('div', { class: 's-up__visual' },
    h('div', { class: 's-up__glyph', 'aria-hidden': 'true' }, icon(SECTION_ICONS[slide.section] || 'mark-github', { size: 168 })),
    h('p', { class: 's-up__kicker' }, slide.area || '', slide.tier === 'headline' ? h('span', { class: 's-pill s-pill--onvis' }, 'Headline') : null),
    facts.length
      ? h('dl', { class: 's-facts' }, facts.map((f) => h('div', { class: 's-fact' },
        h('dt', null, f.k), h('dd', null, f.v, cite(f.c, slide.sources)))))
      : null);
}

function update(slide, meta) {
  const len = (slide.body || []).reduce((n, p) => n + textLength(p), 0) + (slide.why ? textLength(slide.why) + 20 : 0);
  const size = len <= 220 ? 26 : len <= 420 ? 22 : len <= 600 ? 20 : 18;
  const titleSize = slide.title.length > 130 ? 28 : { l: 48, m: 40, s: 34 }[slide.size] || 40;
  return frame(slide, meta, 'light', slide.title, [
    h('div', { class: 's-up__band theme-dark' },
      h('h2', { class: 's-up__title', style: { fontSize: `${titleSize}px` }, 'data-fit': '' }, slide.title)),
    h('div', { class: 's-up__rule' }),
    h('div', { class: 's-up__badge theme-dark' },
      icon(slide.badge.icon, { size: 28 }),
      h('span', { class: 's-up__badge-text' },
        h('span', { class: 's-up__badge-l' }, slide.badge.label),
        slide.tag ? h('span', { class: 's-up__badge-t' }, icon(slide.tagIcon, { size: 14 }), slide.tag) : null)),
    h('div', { class: 's-up__body', style: { fontSize: `${size}px` }, 'data-fit': '' },
      (slide.body || []).map((p) => h('p', null, runs(p, slide.sources))),
      slide.why ? h('p', { class: 's-up__why' }, h('strong', null, 'Why it matters: '), runs(slide.why, slide.sources)) : null),
    visual(slide),
    h('p', { class: 's-up__link' }, link(slide.link.url, [slide.link.host || 'Source', icon('link-external', { size: 16 })])),
    h('p', { class: 's-up__date s-mono' }, longDate(slide.date)),
    footer(slide, meta),
  ]);
}

function list(slide, meta) {
  if (slide.compact) return sectionList(slide, meta);
  const name = String(slide.title).replace(/:\s*also shipped$/i, '');
  return frame(slide, meta, 'dark', `${slide.title}${slide.pages > 1 ? `, page ${slide.page} of ${slide.pages}` : ''}`, [
    h('p', { class: 's-pill s-pill--sec s-list__pill' }, icon(SECTION_ICONS[slide.section] || 'file', { size: 16 }), name),
    h('h2', { class: 's-title s-list__title' }, 'Also shipped'),
    slide.pages > 1 ? h('p', { class: 's-list__page s-mono' }, `${slide.page} / ${slide.pages}`) : null,
    h('ol', { class: 's-list__rows' }, slide.rows.map((r) => h('li', { class: rowClass('s-list__row', r.url), dataset: r.itemId ? { item: r.itemId } : undefined },
      h('span', { class: 's-mono s-list__date' }, shortDate(r.date)),
      h('span', { class: 's-list__tag' }, tag(r.tag, r.tagIcon)),
      h('span', { class: 's-list__t' }, link(r.url, r.title)),
      h('span', { class: 's-list__host' }, r.host),
      safeUrl(r.url) ? go('s-list__go') : null))),
    slide.more ? h('p', { class: 's-list__more' }, `+${fmtNum(slide.more)} more in the web briefing`) : null,
    footer(slide, meta),
  ]);
}

function sectionList(slide, meta) {
  return frame(slide, meta, 'dark', `${slide.name}, ${slide.stat}`, [
    h('div', { class: 's-sum__glow', 'aria-hidden': 'true' }),
    h('div', { class: 's-sum__intro' },
      h('div', { class: 's-sum__icon' }, icon(slide.icon, { size: 64 })),
      h('h2', { class: 's-sum__title' }, slide.name),
      slide.blurb ? h('p', { class: 's-sum__blurb' }, slide.blurb) : null,
      h('p', { class: 's-div__stat s-sum__stat' }, slide.stat)),
    h('ol', { class: 's-sum__rows' }, slide.rows.map((r) => h('li', { class: rowClass('s-sum__row', r.url), dataset: r.itemId ? { item: r.itemId } : undefined },
      h('p', { class: 's-sum__meta' }, h('span', { class: 's-mono s-sum__date' }, shortDate(r.date)), tag(r.tag, r.tagIcon)),
      h('p', { class: 's-sum__t' }, link(r.url, r.title)),
      h('p', { class: 's-sum__host' }, r.host),
      safeUrl(r.url) ? go('s-sum__go') : null))),
    slide.more ? h('p', { class: 's-list__more s-sum__more' }, `+${fmtNum(slide.more)} more in the web briefing`) : null,
    footer(slide, meta),
  ]);
}

function upcoming(slide, meta) {
  const when = (d) => (d <= 0 ? 'Today' : d === 1 ? 'Tomorrow' : `In ${d} days`);
  return frame(slide, meta, 'dark', slide.title, [
    h('p', { class: 's-pill s-pill--accent s-list__pill' }, icon('calendar', { size: 16 }), 'Plan ahead'),
    h('h2', { class: 's-title s-list__title' }, slide.title),
    h('ol', { class: 's-list__rows s-list__rows--up' }, slide.rows.map((r) => h('li', { class: 's-list__row', dataset: r.itemId ? { item: r.itemId } : undefined },
      h('span', { class: 's-mono s-list__date' }, shortDate(r.effective), cite(r.c, slide.sources)),
      h('span', { class: 's-list__tag' }, h('span', { class: 's-pill s-pill--soft' }, when(r.days))),
      h('span', { class: 's-list__t', title: r.title }, r.title),
      h('span', { class: 's-list__host' }, tag(r.tag, null))))),
    footnotes(slide.sources),
    footer(slide, meta),
  ]);
}

function events(slide, meta) {
  return frame(slide, meta, 'dark', slide.title, [
    h('p', { class: 's-pill s-pill--accent s-list__pill' }, icon('megaphone', { size: 16 }), 'Where GitHub will be'),
    h('h2', { class: 's-title s-list__title' }, slide.title),
    h('ol', { class: 's-list__rows s-list__rows--events' }, slide.rows.map((r) => h('li', { class: rowClass('s-list__row', r.url) },
      h('span', { class: 's-mono s-list__date' }, r.dates),
      h('span', { class: 's-list__tag' }, h('span', { class: 's-pill s-pill--soft' }, r.when)),
      h('span', { class: 's-list__t' }, link(r.url, r.name), r.location ? h('span', { class: 's-list__loc' }, ` · ${r.location}`) : null),
      h('span', { class: 's-list__host' }, r.host),
      safeUrl(r.url) ? go('s-list__go') : null))),
    slide.more ? h('p', { class: 's-list__more' }, `+${fmtNum(slide.more)} more in the web briefing`) : null,
    footer(slide, meta),
  ]);
}

function closing(slide, meta) {
  return frame(slide, meta, 'dark', `${slide.title}. ${slide.subtitle}`, [
    rail(),
    h('div', { class: 's-vrule' }),
    h('div', { class: 's-close__text' },
      h('h2', { class: 's-close__title' }, slide.title),
      h('p', { class: 's-close__sub' }, slide.subtitle),
      h('p', { class: 's-close__prov' }, slide.provenance),
      slide.sources?.length
        ? h('ul', { class: 's-close__src', 'aria-label': 'Where these updates come from' }, slide.sources.map((x) => h('li', null,
          link(x.url, [h('span', { class: 's-close__label' }, x.label), h('span', { class: 's-close__host' }, x.host)]))))
        : null),
    h('div', { class: 's-cover__foot' },
      h('p', null, h('strong', null, String(slide.note || '').split(' · ')[0]), String(slide.note || '').split(' · ').slice(1).map((x) => ` · ${x}`).join('')),
      h('p', { class: 's-close__disc' }, slide.disclaimer)),
  ]);
}

const RENDER = { cover, agenda, overview, themes, highlights, divider, update, list, upcoming, events, closing };

export function renderSlide(slide, meta) {
  const draw = RENDER[slide.kind];
  if (!draw) return frame(slide, meta, 'dark', slide.kind, [footer(slide, meta)]);
  return draw(slide, meta);
}

// Shrink any [data-fit] block whose text overflows its box. Layout is measured in slide pixels, so this works inside
// scaled frames; it must run while the slides are displayed. Re-running starts from the original size (fonts may have
// loaded since the last pass).
export function fitSlides(root) {
  for (const el of root.querySelectorAll('[data-fit]')) {
    if (!el.clientHeight) continue;
    if (el.dataset.fitBase === undefined) el.dataset.fitBase = el.style.fontSize || '';
    else el.style.fontSize = el.dataset.fitBase;
    let size = parseFloat(getComputedStyle(el).fontSize) || 16;
    let guard = 0;
    // scrollHeight counts each line's whole font box (about 1.4em in Mona Sans), which pokes out of line boxes set tighter
    // than that, so text with nothing cut can still measure ~0.14em taller than its box. Past ~0.15em the last line's
    // descenders are clipped. The extra pixel absorbs the rounding of both measurements.
    const over = () => el.scrollHeight > el.clientHeight + size * 0.15 + 1 || el.scrollWidth > el.clientWidth + 1;
    while (over() && size > 12 && guard < 40) {
      size -= 1;
      guard += 1;
      el.style.fontSize = `${size}px`;
    }
  }
}

// Keep `--k` (slide scale) in step with a container's size. Stops by itself once the container leaves the document.
export function trackScale(container, measure = (box) => box.width / SLIDE_W) {
  const apply = () => {
    const box = container.getBoundingClientRect();
    if (box.width) container.style.setProperty('--k', String(measure(box)));
  };
  apply();
  if (typeof ResizeObserver === 'undefined') return () => {};
  let seen = false;
  const ro = new ResizeObserver(() => {
    if (container.isConnected) seen = true;
    else if (seen) { ro.disconnect(); return; }
    apply();
  });
  ro.observe(container);
  return () => ro.disconnect();
}

// Run `fn` once the node is in the document and again when web fonts finish loading.
export function whenMounted(node, fn) {
  let tries = 0;
  const tick = () => {
    if (node.isConnected) {
      fn();
      document.fonts?.ready?.then(() => { if (node.isConnected) fn(); });
    } else if ((tries += 1) < 120) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export { SLIDE_W, SLIDE_H };
