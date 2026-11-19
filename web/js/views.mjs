// Page builders. Week, month and year all render the briefing as a deck: a page header, the slide reel (the same slides
// Present mode, PDF and PowerPoint use) and a web appendix listing every update in the period, so each "N more" on a
// slide resolves to linked titles. Search keeps its own results page.
//   ctx = { idx, view, key, range, sections:Set, q, entrance, href(patch), clearSections(), clearSearch(),
//           goLatest(), focusItem(id), present(n, { zoom }) }
//   entrance: play the reel's slide builds for slides already on screen (false when redrawing in place).
import { h, icon, fmtNum, plural } from './dom.mjs';
import {
  SOURCE_LABELS, clampKey, eventAgenda, eventDates, eventName, isOpenPeriod, itemsIn, monthSeries, rangeOf, searchItems,
} from './briefing.mjs';
import { citationUrl } from './cite.mjs';
import { longDate, monthLabel, rangeLabel, shortDate } from './periods.mjs';
import { displayTitle, itemCard, moreList, sectionIcon, sectionStyle } from './cards.mjs';
import { SOURCE_HOMES, buildDeck, chapters } from './deck-model.mjs';
import { SLIDE_W, fitSlides, renderSlide, trackScale, whenMounted } from './slides.mjs';
import { armReel } from './motion.mjs';
import { attachInteractions } from './interact.mjs';

const external = { target: '_blank', rel: 'noopener noreferrer' };
const byDateDesc = (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id);
const TIER = { headline: 0, notable: 1, minor: 2 };
const weekFor = (idx, date) => clampKey(idx, 'week', date);
let stopChapterNavigation = null;
let stopReelMotion = null;
let stopReelInteractions = null;
// A pointer click (detail > 0) zooms the slide into Present mode; keyboard activation opens it without motion.
const zoomFrom = (event) => ({ zoom: event.detail > 0 });

const KIND_LABEL = {
  cover: 'Title', agenda: 'Agenda', overview: 'At a glance', themes: 'Key themes', highlights: 'Highlights', divider: 'Section',
  update: 'Update', list: 'Also shipped', upcoming: 'Coming up', events: 'Events', closing: 'Q&A',
};

// ---- shared pieces ----------------------------------------------------------------------------------------------

function emptyState(ctx, { title, text, filtered }) {
  return h('div', { class: 'empty' },
    h('h2', null, title), h('p', null, text),
    filtered
      ? h('button', { class: 'btn', type: 'button', onclick: ctx.clearSections }, 'Clear filter')
      : h('button', { class: 'btn', type: 'button', onclick: ctx.goLatest }, 'Go to the latest briefing'));
}

// ---- briefing page (week / month / year) -----------------------------------------------------------------------

function pageHead(ctx, meta, { items, open, appendix, chapterToggle }) {
  const { view, range } = ctx;
  const span = range.start === range.end ? longDate(range.start) : rangeLabel(range);
  return h('section', { class: 'brief-head', 'aria-labelledby': 'page-title' },
    h('div', { class: 'brief-head__text' },
      h('p', { class: 'brief-head__eyebrow' }, icon('copilot', { size: 16 }), 'GitHub Copilot Technical Update Briefing'),
      h('h1', { class: 'brief-head__title', id: 'page-title' }, meta.period),
      h('p', { class: 'brief-head__meta' },
        h('span', null, view === 'week' ? span : `${span}${open ? ' so far' : ''}`),
        h('span', null, `Edition ${meta.edition}`),
        h('span', null, plural(items.length, 'update')),
        h('span', null, plural(meta.total, 'slide')),
        open ? h('span', { class: 'pill pill--live' }, 'In progress') : null)),
    h('div', { class: 'brief-head__actions' },
      chapterToggle || null,
      ctx.sections.size && items.length ? h('button', {
        class: 'btn btn--ghost', type: 'button', 'data-fk': 'clear-sections', onclick: ctx.clearSections,
      }, 'Clear product-area filter') : null,
      h('button', { class: 'btn btn--primary', type: 'button', 'data-fk': 'present', onclick: (e) => ctx.present?.(1, zoomFrom(e)) }, icon('screen-full', { size: 16 }), 'Present'),
      appendix ? h('button', {
        class: 'btn', type: 'button', 'data-fk': 'to-appendix',
        onclick: () => { appendix.scrollIntoView({ block: 'start' }); appendix.querySelector('h2')?.focus({ preventScroll: true }); },
      }, icon('book', { size: 16 }), 'Every update') : null));
}

function slideElement(ctx, deck, slide, total) {
  return h('li', {
    class: ['reel__item', `reel__item--${slide.kind}`], id: slide.itemId ? `slide-${slide.itemId}` : `slide-${slide.id}`, tabindex: '-1',
  },
  h('div', { class: 's-frame' }, renderSlide(slide, deck.meta)),
  h('div', { class: 'reel__cap' },
    h('span', { class: 'reel__n mono' }, `${slide.n} / ${total}`),
    h('span', { class: 'reel__kind' }, KIND_LABEL[slide.kind] || ''),
    h('button', { class: 'btn btn--sm btn--ghost', type: 'button', 'data-fk': `present:${slide.n}`, onclick: (e) => ctx.present?.(slide.n, zoomFrom(e)) },
      icon('screen-full', { size: 14 }), 'Present from here')));
}

function chapterNavigation(groups, workspace) {
  const isMobile = () => window.matchMedia('(max-width: 899px)').matches;
  const EXPAND_REST = 150;
  let activeChapter = groups[0]?.id;
  let collapsed = false;
  let drawerOpen = false;
  let scrollFrame = 0;
  let marked = null;
  let markedSlide = null;
  let expanded = null;
  let expandTimer = 0;
  const chapterButtons = new Map();
  const chapterSlideLists = new Map();
  const slideButtons = new Map();

  const chapterList = h('ol', { class: 'chapter-nav__list' });
  const aside = h('nav', { class: 'chapter-nav', id: 'chapter-nav', 'aria-label': 'Briefing chapters' },
    h('div', { class: 'chapter-nav__head' }, h('h2', null, 'Chapters')),
    chapterList);
  const scrim = h('button', {
    class: 'chapter-nav__scrim', type: 'button', hidden: true, 'aria-label': 'Close chapter navigation',
    onclick: () => setDrawerOpen(false, true),
  });
  const toggle = h('button', {
    class: 'btn btn--ghost chapter-nav__toggle', type: 'button', 'aria-controls': 'chapter-nav',
    onclick: toggleNavigation,
  }, icon('book', { size: 16 }), 'Chapters');
  function updateToggle() {
    const mobile = isMobile();
    const expanded = mobile ? drawerOpen : !collapsed;
    const label = mobile
      ? `${drawerOpen ? 'Close' : 'Open'} chapter navigation`
      : `${collapsed ? 'Expand' : 'Collapse'} chapter navigation`;
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', label);
    toggle.title = label;
    toggle.classList.toggle('is-collapsed', !mobile && collapsed);
  }

  function setDrawerOpen(open, returnFocus = false) {
    drawerOpen = open;
    aside.classList.toggle('is-open', open);
    scrim.hidden = !open;
    updateToggle();
    if (open && isMobile()) chapterButtons.get(activeChapter)?.focus({ preventScroll: true });
    if (returnFocus) toggle.focus({ preventScroll: true });
  }

  // The highlight follows the page on every scroll frame and only repaints. Opening a chapter's slide list reflows the
  // rail, so that waits for the scroll to rest: reflowing it on each frame of a long sweep over slides that had already
  // built crashed the renderer (headless Edge, and the canvas webview).
  function markChapter(id) {
    if (marked === id) return;
    marked = id;
    for (const group of groups) {
      const button = chapterButtons.get(group.id);
      const active = group.id === id;
      button.classList.toggle('is-active', active);
      if (active) button.setAttribute('aria-current', 'location');
      else button.removeAttribute('aria-current');
    }
  }

  function markSlide(id) {
    if (markedSlide === id) return;
    slideButtons.get(markedSlide)?.removeAttribute('aria-current');
    markedSlide = id;
    slideButtons.get(id)?.setAttribute('aria-current', 'location');
  }

  function expandChapter(id) {
    clearTimeout(expandTimer);
    if (expanded === id) return;
    expanded = id;
    for (const group of groups) {
      const open = group.id === id;
      chapterButtons.get(group.id).setAttribute('aria-expanded', String(open));
      chapterSlideLists.get(group.id).hidden = !open;
    }
  }

  function setActiveChapter(id, activeSlideId = null, { now = false } = {}) {
    activeChapter = id;
    markChapter(id);
    markSlide(activeSlideId);
    if (now || expanded === id) expandChapter(id);
    else {
      clearTimeout(expandTimer);
      expandTimer = setTimeout(() => expandChapter(activeChapter), EXPAND_REST);
    }
  }

  function navigateTo(target, chapterId, slideId = null) {
    if (!target) return;
    setActiveChapter(chapterId, slideId, { now: true });
    target.scrollIntoView({ block: 'start' });
    target.focus({ preventScroll: true });
    if (isMobile()) setDrawerOpen(false);
  }

  function toggleNavigation() {
    if (isMobile()) setDrawerOpen(!drawerOpen);
    else {
      collapsed = !collapsed;
      workspace.classList.toggle('is-collapsed', collapsed);
      updateToggle();
    }
  }

  function onKeydown(event) {
    if (event.key === 'Escape' && drawerOpen) setDrawerOpen(false, true);
  }

  function updateFromScroll() {
    scrollFrame = 0;
    const threshold = Math.min(280, Math.max(100, window.innerHeight * 0.3));
    let active = groups[0];
    for (const group of groups) {
      const heading = document.getElementById(`chapter-${group.id}`);
      if (heading && heading.getBoundingClientRect().top <= threshold) active = group;
      else break;
    }
    if (!active) return;
    const activeSlide = [...active.slides].reverse().find((slide) => {
      const target = document.getElementById(slide.itemId ? `slide-${slide.itemId}` : `slide-${slide.id}`);
      return target && target.getBoundingClientRect().top <= threshold;
    });
    const slideId = activeSlide ? (activeSlide.itemId ? `slide-${activeSlide.itemId}` : `slide-${activeSlide.id}`) : null;
    setActiveChapter(active.id, slideId);
  }

  function onScroll() {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(updateFromScroll);
  }

  function onResize() {
    if (!isMobile()) setDrawerOpen(false);
    updateToggle();
  }

  for (const group of groups) {
    const listItem = h('li', { class: 'chapter-nav__item' });
    const groupStyle = group.section
      ? sectionStyle(group.section)
      : { '--c': 'var(--gh-green)', '--ink': 'var(--accent-ink)' };
    const chapterButton = h('button', {
      class: 'chapter-nav__chapter', type: 'button', style: groupStyle, 'aria-expanded': 'false',
      'aria-label': `${group.title}, ${group.slides.length} slides`, title: group.title,
      onclick: () => navigateTo(document.getElementById(`chapter-${group.id}`), group.id),
    },
    icon(group.icon || 'file', { size: 18 }),
    h('span', { class: 'chapter-nav__name' }, group.title),
    h('span', { class: 'chapter-nav__count mono' }, String(group.slides.length)));
    const slideList = h('ol', { class: 'chapter-nav__slides', hidden: true, 'aria-label': `${group.title} slides` },
      group.slides.map((slide) => {
        const slideId = slide.itemId ? `slide-${slide.itemId}` : `slide-${slide.id}`;
        const button = h('button', {
          class: 'chapter-nav__slide', type: 'button',
          onclick: () => navigateTo(document.getElementById(slideId), group.id, slideId),
        }, h('span', { class: 'chapter-nav__slide-n mono' }, String(slide.n)), h('span', null, slide.title));
        slideButtons.set(slideId, button);
        return h('li', null, button);
      }));
    chapterButtons.set(group.id, chapterButton);
    chapterSlideLists.set(group.id, slideList);
    listItem.append(chapterButton, slideList);
    chapterList.appendChild(listItem);
  }

  aside.addEventListener('keydown', onKeydown);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  updateToggle();
  setActiveChapter(activeChapter, null, { now: true });

  return {
    aside, scrim, toggle,
    goChapter: (id) => navigateTo(document.getElementById(`chapter-${id}`), id),
    destroy() {
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      clearTimeout(expandTimer);
      aside.removeEventListener('keydown', onKeydown);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    },
  };
}

function reel(ctx, deck) {
  const { meta, slides } = deck;
  const groups = chapters(deck);
  const reelContent = h('div', { class: 'reel', 'aria-label': `Slides: ${meta.period}` }, groups.map((group) => h('section', {
    class: 'reel__chapter', 'aria-labelledby': `chapter-${group.id}`,
  },
  h('h2', { class: 'reel__chapter-title', id: `chapter-${group.id}`, tabindex: '-1' },
    icon(group.icon || 'file', { size: 20 }), group.title),
  h('ol', { class: 'reel__slides', 'aria-label': `${group.title} slides` },
    group.slides.map((slide) => slideElement(ctx, deck, slide, slides.length))))));
  const workspace = h('div', { class: 'deck-workspace' });
  const navigation = chapterNavigation(groups, workspace);
  workspace.append(navigation.scrim, navigation.aside, reelContent);
  stopChapterNavigation = navigation.destroy;
  trackScale(reelContent, (box) => box.width / SLIDE_W);
  whenMounted(reelContent, () => fitSlides(reelContent));
  stopReelMotion = armReel(reelContent, { entrance: ctx.entrance !== false });
  stopReelInteractions = attachInteractions(reelContent, { goChapter: navigation.goChapter, host: document.body }).destroy;
  return { workspace, chapterToggle: navigation.toggle };
}

function sectionLists(ctx, items, { open }) {
  const { idx } = ctx;
  return idx.sections.map((section) => {
    const own = items.filter((i) => i.section === section.id).sort(byDateDesc);
    if (!own.length) return null;
    return h('div', { class: 'appx__sec', style: sectionStyle(section.id) },
      moreList(idx, own, { label: section.name, open, cap: 120 }));
  });
}

function monthCards(ctx, items) {
  const { idx } = ctx;
  const months = monthSeries(idx, ctx.sections).filter((m) => m.key.startsWith(ctx.key));
  return h('div', { class: 'months' }, months.map((m) => {
    const own = items.filter((i) => i.date.startsWith(m.key));
    const top = [...own].sort((a, b) => TIER[a.tier] - TIER[b.tier] || byDateDesc(a, b)).slice(0, 3);
    const total = m.counts.total || 1;
    return h('article', { class: 'month' },
      h('h3', null, h('a', { href: ctx.href({ view: 'month', key: m.key }) }, monthLabel(m.key))),
      h('p', { class: 'month__n' }, plural(m.counts.total, 'update'), isOpenPeriod(idx, 'month', m.key) ? h('span', { class: 'pill pill--live' }, 'In progress') : null),
      h('div', { class: 'month__bar', role: 'img', 'aria-label': idx.sections.filter((s) => m.counts.bySection[s.id]).map((s) => `${s.name} ${m.counts.bySection[s.id]}`).join(', ') },
        idx.sections.filter((s) => m.counts.bySection[s.id]).map((s) => h('i', { style: { ...sectionStyle(s.id), flexGrow: String(m.counts.bySection[s.id] / total) } }))),
      top.length ? h('ul', { class: 'month__top' }, top.map((i) => h('li', null,
        h('a', { href: ctx.href({ view: 'week', key: weekFor(idx, i.date), focus: i.id }) }, displayTitle(idx, i))))) : null);
  }));
}

function eventsBlock(ctx) {
  const { idx, range, view } = ctx;
  if (ctx.sections.size && !ctx.sections.has('events')) return null;
  const rows = eventAgenda(idx, range, view).map(({ e, when }) => ({ e, when, url: citationUrl(e.url) }));
  if (!rows.length) return null;
  return h('div', { class: 'appx__sec', style: sectionStyle('events') },
    h('details', { class: 'more', open: true },
      h('summary', null, icon('chevron-right', { size: 16 }), h('span', null, 'Events'), h('small', null, plural(rows.length, 'event'))),
      h('div', { class: 'rows rows--events' }, rows.map(({ e, when, url }) => h('div', { class: 'row' },
        h('time', { datetime: e.start }, eventDates(e)),
        h('div', null,
          h('a', { href: url, ...external }, eventName(e), h('span', { class: 'sr-only' }, ' (opens in a new tab)')),
          e.location ? h('span', { class: 'row__area' }, e.location) : null),
        h('span', { class: 'pill' }, when))))));
}

function appendix(ctx, items) {
  const { view } = ctx;
  const when = view === 'week' ? 'this week' : view === 'month' ? 'this month' : `in ${ctx.key}`;
  return h('section', { class: 'appx', id: 'appendix', 'aria-labelledby': 'appx-h' },
    h('div', { class: 'appx__head' },
      h('h2', { id: 'appx-h', tabindex: '-1' }, `Every update ${when}`),
      h('p', null, `${plural(items.length, 'update')}, newest first. Each title links to the page it was published on.`)),
    view === 'year' ? monthCards(ctx, items) : null,
    sectionLists(ctx, items, { open: view !== 'year' }),
    eventsBlock(ctx));
}

function renderBriefing(ctx) {
  const { idx, view, key, range } = ctx;
  const all = itemsIn(idx, range, null);
  const items = ctx.sections.size ? all.filter((i) => ctx.sections.has(i.section)) : all;
  const open = isOpenPeriod(idx, view, key);
  const deck = buildDeck(idx, { view, key, sections: ctx.sections });
  if (!items.length) {
    return [
      pageHead(ctx, deck.meta, { items, open, appendix: null }),
      emptyState(ctx, ctx.sections.size
        ? { title: 'No updates match this filter', text: 'Clear the filter to see all product areas.', filtered: true }
        : { title: `No updates recorded for ${deck.meta.label}`, text: 'Nothing was published in this period.' }),
    ];
  }
  const appx = appendix(ctx, items);
  const deckContent = reel(ctx, deck);
  return [
    pageHead(ctx, deck.meta, { items, open, appendix: appx, chapterToggle: deckContent.chapterToggle }),
    deckContent.workspace,
    appx,
  ];
}

// ---- search -------------------------------------------------------------------------------------------------------

const PAGE = 100;

function renderSearch(ctx) {
  const { idx, q } = ctx;
  const terms = [...new Set(q.toLowerCase().split(/\s+/).filter(Boolean))];
  const everything = searchItems(idx, q, null);
  const hits = ctx.sections.size ? everything.filter((i) => ctx.sections.has(i.section)) : everything;
  const results = h('div', { class: 'results' });
  const more = h('div', { class: 'more__foot', hidden: true });
  let shown = 0;
  const draw = () => {
    const end = Math.min(hits.length, shown + PAGE);
    for (; shown < end; shown += 1) {
      const item = hits[shown];
      results.appendChild(itemCard(idx, item, {
        variant: 'compact', terms, showTier: true,
        context: { href: ctx.href({ view: 'week', key: weekFor(idx, item.date), focus: item.id, q: '' }), label: 'Open in its briefing' },
      }));
    }
    more.hidden = shown >= hits.length;
    more.replaceChildren(h('button', { class: 'btn', type: 'button', onclick: draw }, `Show ${Math.min(PAGE, hits.length - shown)} more`));
  };
  draw();
  const word = hits.length === 1 ? 'result' : 'results';
  return [h('section', { class: 'block', 'aria-labelledby': 'page-title' },
    h('div', { class: 'results__head' },
      h('h1', { id: 'page-title' }, hits.length ? `${fmtNum(hits.length)} ${word}` : 'No results'),
      h('p', null, `for “${q}” across all of ${idx.asof.slice(0, 4)}, through ${longDate(idx.asof)}`),
      ctx.sections.size ? h('button', {
        class: 'btn btn--sm btn--ghost', type: 'button', 'data-fk': 'clear-sections', onclick: ctx.clearSections,
      }, 'Clear product-area filter') : null),
    hits.length
      ? [results, more]
      : h('div', { class: 'empty' }, h('h2', null, 'Nothing matched'), h('p', null, 'Try fewer or different words.'),
        h('button', { class: 'btn', type: 'button', onclick: ctx.clearSearch }, 'Clear search')))];
}

// ---- entry points -------------------------------------------------------------------------------------------------

export function renderPage(ctx) {
  stopChapterNavigation?.();
  stopChapterNavigation = null;
  stopReelMotion?.();
  stopReelMotion = null;
  stopReelInteractions?.();
  stopReelInteractions = null;
  if (ctx.q) return renderSearch(ctx);
  return renderBriefing(ctx);
}

export function renderSkeleton() {
  return [h('div', { class: 'skeleton', 'aria-hidden': 'true' }, h('i'), h('i'), h('i'), h('i'), h('i'))];
}

export function renderError(message, onRetry, { title = 'The briefing could not be loaded. ', action = 'Try again' } = {}) {
  return [h('div', { class: 'notice', role: 'alert' }, icon('alert', { size: 16 }),
    h('div', null, h('strong', null, title), message || 'Check your connection and try again.', ' ',
      h('button', { class: 'btn btn--sm', type: 'button', onclick: onRetry }, action)))];
}

function flash(el) {
  el.scrollIntoView({ block: 'center' });
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');
}

// Brings an update into view: its own slide, else the "Also shipped" slide that lists it, else its appendix row.
export function focusItemInPage(root, id) {
  let el = document.getElementById(`slide-${id}`);
  if (!el) {
    const row = root.querySelector(`.reel [data-item="${CSS.escape(id)}"]`);
    el = row?.closest('.reel__item') || null;
  }
  if (!el) el = document.getElementById(`i-${id}`);
  if (!el) {
    for (const d of root.querySelectorAll('details.more')) {
      if (d.reveal?.(id)) { el = document.getElementById(`i-${id}`); break; }
    }
  }
  if (!el) return false;
  flash(el);
  return true;
}

export function renderFooter(idx) {
  const used = new Set(idx.items.map((i) => i.source));
  const sources = Object.keys(SOURCE_HOMES).filter((k) => used.has(k));
  return [h('div', { class: 'footer__row' },
    h('div', { class: 'footer__mark' }, icon('mark-github', { size: 24 }), h('span', null, 'GitHub Technical Update Briefing')),
    sources.length > 0 && h('div', { class: 'srcs' }, h('strong', null, 'Sources'),
      sources.map((k) => h('a', { href: SOURCE_HOMES[k], ...external }, SOURCE_LABELS[k] || k))),
    h('p', null, 'Prepared from public GitHub, VS Code and Visual Studio sources. Dates are in UTC. Features, timing and availability may change. Product names and logos are trademarks of their respective owners.'),
    h('p', null, `Edition ${idx.edition} · information as of ${longDate(idx.asof)}`))];
}

export { shortDate, rangeOf };
