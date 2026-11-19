// Item cards, rows and small shared components. Everything here is built with textContent (see dom.mjs): the content is
// scraped, so it is never parsed as HTML.
import { h, icon, clear, safeUrl, shortUrl, fmtNum, plural } from './dom.mjs';
import { SOURCE_LABELS, effectiveLabel } from './briefing.mjs';
import { diffDays, shortDate } from './periods.mjs';
import { citationUrl, numberer, runs, verifiedCitations } from './cite.mjs';

const SECTION_ID = /^[a-z0-9-]+$/;

export const SECTION_ICONS = {
  copilot: 'copilot', vscode: 'code', visualstudio: 'device-desktop', 'jetbrains-others': 'apps',
  platform: 'repo', security: 'shield-lock', events: 'megaphone', research: 'beaker',
};
export const TAG_ICONS = { Release: 'rocket', Improvement: 'zap', Deprecation: 'alert', Announcement: 'megaphone', Research: 'beaker' };
export const ROLE_LABELS = { host: 'GitHub hosts', sponsor: 'GitHub sponsors', speaker: 'GitHub speaking', attendee: 'GitHub attending' };

// Per-section colour variables (--c fill, --ink text-safe variant), defined in tokens.css for both themes.
export function sectionStyle(id) {
  const key = SECTION_ID.test(id || '') ? id : 'events';
  return { '--c': `var(--sec-${key})`, '--ink': `var(--sec-${key}-ink)` };
}

export function sectionIcon(id, size = 20) { return icon(SECTION_ICONS[id] || 'file', { size }); }

export function tagPill(tag, count) {
  const known = TAG_ICONS[tag];
  return h('span', { class: ['pill', known ? `pill--${String(tag).toLowerCase()}` : 'pill--outline'] },
    known && icon(known, { size: 12 }), count == null ? tag : `${tag} ${fmtNum(count)}`);
}

const escapeRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Wraps matches in <mark>. Returns a string when there is nothing to highlight.
export function highlight(text, terms) {
  const list = (terms || []).filter(Boolean);
  if (!list.length || !text) return text;
  const re = new RegExp(`(${list.map(escapeRe).join('|')})`, 'gi');
  return String(text).split(re).map((part, i) => (i % 2 ? h('mark', null, part) : part));
}

export function relativeDays(n) {
  if (n === 0) return 'today';
  if (n === 1) return 'tomorrow';
  if (n === -1) return 'yesterday';
  return n > 0 ? `in ${n} days` : `${-n} days ago`;
}

const external = { target: '_blank', rel: 'noopener noreferrer' };
const newTab = () => h('span', { class: 'sr-only' }, ' (opens in a new tab)');

function evidenceFor(idx, item, field) {
  const allowed = new Set(item.claims || []);
  const ids = item.fieldClaims?.[field] || [];
  if (!ids.length || ids.some((id) => !allowed.has(id))) return [];
  return ids.filter((id) => {
    const claim = idx.claimById?.get(id);
    const source = claim && idx.sourceById?.get(claim.sid);
    return claim?.v?.status === 'grounded' && source?.check?.ok === true && citationUrl(source.url);
  });
}

export function factRows(idx, item) {
  const rows = [];
  const plans = evidenceFor(idx, item, 'plans');
  if (item.plans?.length && plans.length) rows.push({ k: 'Plans', v: item.plans.length >= 5 ? 'All plans' : item.plans.join(', '), claims: plans });
  const ides = evidenceFor(idx, item, 'ides');
  if (item.ides?.length && ides.length) rows.push({ k: 'Available in', v: item.ides.map((id) => idx.ideName.get(id) || id).join(', '), claims: ides });
  const effective = evidenceFor(idx, item, 'effective');
  if (item.effective && effective.length) {
    const days = diffDays(item.effective, idx.asof);
    rows.push({ k: 'Takes effect', v: effectiveLabel(item, idx.asof), soon: days >= 0 && days <= 30, claims: effective });
  }
  return rows;
}

function citationRef(idx, id, number) {
  const claim = idx.claimById?.get(id);
  const source = claim && idx.sourceById?.get(claim.sid);
  const url = source?.check?.ok ? citationUrl(source.url) : null;
  if (!claim || !source || !url) return null;
  return h('sup', { class: 'cite' },
    h('a', { href: url, ...external, 'aria-label': `Source ${number}: ${source.publisher}, ${source.published}` }, `[${number}]`, newTab()));
}

export function citedText(idx, text, terms = [], allowedIds = null) {
  if (!verifiedCitations(idx, text, allowedIds)) return null;
  const number = numberer();
  return runs(text).map((part) => {
    if (part.text !== undefined) return highlight(part.text, terms);
    return part.cite.map((id) => citationRef(idx, id, number(id)));
  });
}

export function displayTitle(idx, item) {
  const source = idx.sourceByUrl?.get(citationUrl(item.url));
  if (!source?.check?.ok || !source.title) return item.title;
  const normal = (value) => String(value).normalize('NFKC').replace(/\s+/g, ' ').trim().toLowerCase();
  const title = normal(item.title);
  const sourceTitle = normal(source.title);
  if (title === sourceTitle || (sourceTitle.startsWith(title) && title.length >= 24) || evidenceFor(idx, item, 'title').length) return item.title;
  return source.title;
}

function evidencePanel(idx, item) {
  const claims = (item.claims || []).map((id) => idx.claimById?.get(id)).filter((claim) => {
    const source = claim && idx.sourceById?.get(claim.sid);
    return claim?.v?.status === 'grounded' && source?.check?.ok === true;
  });
  if (!claims.length) return null;
  return h('details', { class: 'item__evidence' },
    h('summary', null, 'Evidence'),
    h('ul', null, claims.map((claim) => {
      const source = idx.sourceById.get(claim.sid);
      const url = citationUrl(source.url);
      return h('li', null,
        h('b', null, claim.text),
        h('blockquote', null, `“${claim.quote}”`),
        url && h('a', { href: url, ...external }, source.title, newTab()));
    })));
}

function factsFor(idx, item) {
  const rows = factRows(idx, item);
  if (!rows.length) return null;
  return h('dl', { class: 'facts' }, rows.map((r) => {
    const number = numberer();
    return h('div', { class: r.soon && 'when--soon' },
      h('dt', null, r.k),
      h('dd', null, r.v, r.claims.map((id) => citationRef(idx, id, number(id)))));
  }));
}

/**
 * variant: 'default' | 'headline' | 'compact'
 * context: optional { href, label } link that opens the item in its own period (used by search and year summaries)
 */
export function itemCard(idx, item, { variant = 'default', terms = [], showTier = false, context = null } = {}) {
  const compact = variant === 'compact';
  const url = safeUrl(item.url);
  const source = idx.sourceByUrl?.get(citationUrl(item.url));
  const sourceChecked = source?.check?.ok === true;
  const relatedSources = (item.links || []).map((link) => {
    const related = idx.sourceByUrl?.get(citationUrl(link.url));
    const href = related?.check?.ok ? citationUrl(related.url) : null;
    return href ? { href, title: related.title } : null;
  }).filter(Boolean);
  const stage = item.stage && item.stage !== 'none' && evidenceFor(idx, item, 'stage').length ? idx.stageName.get(item.stage) : '';
  const event = item.event && sourceChecked ? idx.eventById.get(item.event) : null;
  const imageUrl = !compact && item.image ? safeUrl(item.image) : null;
  const version = item.version && evidenceFor(idx, item, 'version').length ? (/^v/i.test(item.version) ? item.version : `v${item.version}`) : '';
  const allowedClaims = item.claims || [];
  const summary = citedText(idx, item.summary, terms, allowedClaims);
  const why = citedText(idx, item.why, terms, allowedClaims);
  const admin = citedText(idx, item.admin, terms, allowedClaims);

  const meta = h('div', { class: 'item__meta' },
    showTier && item.tier === 'headline' && h('span', { class: 'pill pill--headline' }, 'Headline'),
    tagPill(item.tag),
    stage && h('span', { class: 'pill pill--outline' }, stage),
    version && h('span', { class: 'pill pill--outline mono' }, version),
    h('span', { class: 'item__area' }, idx.areaName.get(item.area) || item.area),
    event && h('span', { class: 'pill pill--outline' }, icon('calendar', { size: 12 }), event.name),
    h('time', { class: 'item__date', datetime: item.date }, shortDate(item.date)));

  const title = h('h3', { class: 'item__title' },
    url ? h('a', { href: url, ...external }, highlight(displayTitle(idx, item), terms), icon('link-external', { size: 14 }), newTab()) : highlight(displayTitle(idx, item), terms));

  const foot = compact && !context ? null : h('div', { class: 'item__foot' },
    !compact && h('span', null, SOURCE_LABELS[item.source] || 'Source'),
    !compact && url && h('a', { href: url, ...external }, shortUrl(url), newTab()),
    !compact && h('span', { class: ['item__link-status', sourceChecked ? 'is-checked' : 'is-unchecked'] },
      sourceChecked ? `Link checked ${String(source.check.at || '').slice(0, 10)}` : 'Source link not verified'),
    !compact && relatedSources.length > 0 && h('span', { class: 'links' },
      relatedSources.map((related) => h('a', { href: related.href, ...external }, related.title, newTab()))),
    context && h('span', { class: 'links' }, h('a', { href: context.href }, context.label)));

  return h('article', {
    class: ['item', variant === 'headline' && 'item--headline', compact && 'item--compact'],
    id: `i-${item.id}`,
    style: sectionStyle(item.section),
  },
  meta,
  title,
  summary && h('p', { class: 'item__summary' }, summary),
  why && !compact && h('p', { class: 'item__why' }, h('b', null, icon('light-bulb', { size: 14 }), 'Why it matters'), why),
  admin && !compact && h('p', { class: 'item__why' }, h('b', null, icon('gear', { size: 14 }), 'For admins'), admin),
  !compact && (item.summary || item.tier === 'minor') && !summary && h('p', { class: 'item__evidence-status' }, 'Title only; not claim-verified.'),
  !compact && factsFor(idx, item),
  !compact && evidencePanel(idx, item),
  imageUrl && h('figure', { class: 'item__img' }, h('img', {
    src: imageUrl, alt: '', loading: 'lazy', decoding: 'async', referrerpolicy: 'no-referrer',
    onerror: (e) => e.target.parentElement?.setAttribute('data-failed', ''),
  })),
  foot);
}

export function itemRow(idx, item, { terms = [] } = {}) {
  const url = safeUrl(item.url);
  return h('div', { class: 'row', id: `i-${item.id}` },
    h('time', { datetime: item.date }, shortDate(item.date)),
    h('div', null,
      url ? h('a', { href: url, ...external }, highlight(displayTitle(idx, item), terms), newTab()) : highlight(displayTitle(idx, item), terms),
      h('span', { class: 'row__area' }, idx.areaName.get(item.area) || item.area)),
    tagPill(item.tag));
}

/**
 * Collapsible "Also shipped" list. Rows are drawn on first open (a month can hold hundreds), capped at `cap` until
 * "Show all". `node.reveal(id)` opens the list and draws up to that row, for in-page navigation.
 */
export function moreList(idx, items, { label = 'Also shipped', cap = 80, terms = [], open = false } = {}) {
  const rows = h('div', { class: 'rows' });
  const foot = h('div', { class: 'more__foot', hidden: true });
  let shown = 0;
  const draw = (upTo) => {
    const end = Math.min(items.length, upTo);
    for (; shown < end; shown += 1) rows.appendChild(itemRow(idx, items[shown], { terms }));
    clear(foot);
    foot.hidden = shown >= items.length;
    if (!foot.hidden) {
      foot.appendChild(h('button', { class: 'btn btn--sm', type: 'button', onclick: () => draw(items.length) }, `Show all ${fmtNum(items.length)}`));
    }
  };
  const details = h('details', { class: 'more' },
    h('summary', null, icon('chevron-right', { size: 16 }), h('span', null, label), h('small', null, plural(items.length, 'update'))),
    rows, foot);
  details.addEventListener('toggle', () => { if (details.open && shown === 0) draw(cap); });
  details.reveal = (id) => {
    const at = items.findIndex((i) => i.id === id);
    if (at < 0) return false;
    details.open = true;
    draw(Math.max(cap, at + 1));
    return true;
  };
  if (open) { details.open = true; draw(cap); }
  return details;
}
