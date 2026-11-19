// Pointer and keyboard behaviour for rendered slides.
//
// The reel and Present mode both render slides as plain DOM, so one set of delegated listeners on the container covers
// every slide, survives slide swaps and re-renders, and costs nothing per element:
//   - one shared popover for source previews (citations, footnotes) and chart bars
//   - a citation and its footnote light up together
//   - chart bars, segments and legend rows highlight one another
//   - a pointer spotlight on linked cards
//   - agenda entries jump to their chapter
// Anything CSS can do on its own (lifts, arrows, underline sweeps) stays in deck.css.

import { fmtNum, h, icon, mount, plural } from './dom.mjs';
import { previewOf } from './slides.mjs';

const SHOW_DELAY = 150; // a pass-through should not flash a popover
const HIDE_DELAY = 80; // crossing the gap between two triggers keeps it open
const SWAP_WINDOW = 300; // right after one closes, the next opens without waiting or animating
const GAP = 10;
const MARGIN = 8;

const TRIGGER = 'a[data-n], .s-chart__bar';
const LEGEND = '.s-legend li[data-area]';
const SEGMENT = '.s-chart__seg[data-area]';
const SPOT = '[data-spot]';
const GOTO = '[data-goto]';

let tips = 0;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));

// Where a popover of `size` goes for an anchor rect: above by default, below when the top would clip (or there is more
// room below), then clamped into the viewport. `arrow` is the caret's offset inside the card.
export function placeTip(anchor, size, view, { gap = GAP, margin = MARGIN } = {}) {
  const bottom = anchor.top + anchor.height;
  const above = anchor.top - gap - size.height;
  const below = bottom + gap;
  let side = 'top';
  if (above < margin) side = below + size.height <= view.height - margin || view.height - bottom > anchor.top ? 'bottom' : 'top';
  const mid = anchor.left + anchor.width / 2;
  const x = clamp(mid - size.width / 2, margin, view.width - size.width - margin);
  const y = clamp(side === 'top' ? above : below, margin, view.height - size.height - margin);
  return { x, y, side, arrow: clamp(mid - x, 16, size.width - 16) };
}

const box = (r) => ({ left: r.left, top: r.top, width: r.width, height: r.height });

// A chart bar anchors to what is drawn (segments and the count above them), not its whole hit column.
function anchorRect(el, preview) {
  const rect = el.getBoundingClientRect();
  if (preview.type !== 'bar') return box(rect);
  const drawn = [...el.querySelectorAll('.s-chart__seg, .s-chart__val')].map((n) => n.getBoundingClientRect()).filter((r) => r.height > 0);
  if (!drawn.length) return box(rect);
  const top = Math.min(...drawn.map((r) => r.top));
  return { left: rect.left, top, width: rect.width, height: Math.max(...drawn.map((r) => r.bottom)) - top };
}

const sourceBody = (p) => [
  h('p', { class: 'tip__meta' },
    h('span', { class: 'tip__pub' }, p.publisher || 'Source'),
    p.date ? h('span', { class: 'tip__date' }, p.date) : null),
  h('p', { class: 'tip__title' }, p.title),
  p.quote ? h('blockquote', { class: 'tip__quote' }, p.quote) : null,
  h('p', { class: 'tip__host' }, icon('link-external', { size: 12 }), p.host),
];

function barBody(p) {
  const parts = p.parts.filter((part) => part.value > 0);
  return [
    h('p', { class: 'tip__meta' },
      h('span', { class: 'tip__pub' }, p.label),
      h('span', { class: 'tip__date' }, plural(p.total, 'update'))),
    parts.length
      ? h('ul', { class: 'tip__parts' }, parts.map((part) => h('li', { style: { '--c': `var(--sec-${part.id}, var(--gh-green))` } },
        h('span', { class: 'tip__sw', 'aria-hidden': 'true' }),
        h('span', { class: 'tip__name' }, part.name),
        h('span', { class: 'tip__n' }, fmtNum(part.value)))))
      : h('p', { class: 'tip__title' }, 'No updates recorded.'),
  ];
}

// Delegated enter/leave for the nearest `selector` match (mouse and pen; touch follows the link instead).
function hover(root, selector, enter, leave) {
  let current = null;
  const over = (e) => {
    if (e.pointerType === 'touch' || !(e.target instanceof Element)) return;
    const el = e.target.closest(selector);
    if (!el || el === current || !root.contains(el)) return;
    if (current) leave(current);
    current = el;
    enter(el);
  };
  const out = (e) => {
    if (!current || (e.relatedTarget instanceof Node && current.contains(e.relatedTarget))) return;
    const el = current;
    current = null;
    leave(el);
  };
  root.addEventListener('pointerover', over);
  root.addEventListener('pointerout', out);
  return {
    clear() {
      if (!current) return;
      const el = current;
      current = null;
      leave(el);
    },
    stop() {
      root.removeEventListener('pointerover', over);
      root.removeEventListener('pointerout', out);
    },
  };
}

// `host` is where the popover lives: inside the Present shell so fullscreen still shows it, the page body for the reel.
export function attachInteractions(root, { goChapter, host = root } = {}) {
  const node = h('div', { class: 'tip theme-dark', id: `tip-${++tips}`, role: 'tooltip' }, h('div', { class: 'tip__card' }));
  const card = node.firstChild;
  host.appendChild(node);

  let anchor = null; // the trigger the popover is for, open or pending
  let described = null;
  let open = false;
  let showTimer = 0;
  let hideTimer = 0;
  let closedAt = -Infinity;
  let frame = 0;
  let spot = null;

  const slideOf = (el) => el.closest('.slide');
  const view = () => ({ width: document.documentElement.clientWidth, height: document.documentElement.clientHeight });

  function describe(el) {
    if (described === el) return;
    described?.removeAttribute('aria-describedby');
    described = el;
    el?.setAttribute('aria-describedby', node.id);
  }

  function present(el, animate) {
    showTimer = 0;
    const preview = previewOf(el);
    if (!preview || !el.isConnected) { anchor = null; return; }
    mount(card, ...(preview.type === 'bar' ? barBody(preview) : sourceBody(preview)));
    node.classList.toggle('is-instant', !animate);
    const at = placeTip(anchorRect(el, preview), { width: node.offsetWidth, height: node.offsetHeight }, view());
    node.style.transform = `translate(${Math.round(at.x)}px, ${Math.round(at.y)}px)`;
    node.dataset.side = at.side;
    node.style.setProperty('--ax', `${Math.round(at.arrow)}px`);
    node.style.setProperty('--oy', at.side === 'top' ? '100%' : '0%');
    describe(el);
    void node.offsetWidth; // commit the closed state so a fresh open animates from it
    node.classList.add('is-open');
    open = true;
    if (!animate) {
      void node.offsetWidth; // and the open state, so lifting is-instant afterwards does not animate
      requestAnimationFrame(() => node.classList.remove('is-instant'));
    }
  }

  function close() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    showTimer = 0;
    hideTimer = 0;
    anchor = null;
    if (!open) return;
    open = false;
    closedAt = performance.now();
    node.classList.remove('is-open');
    describe(null);
  }

  function request(el, immediate = false) {
    clearTimeout(hideTimer);
    hideTimer = 0;
    if (el === anchor) return;
    clearTimeout(showTimer);
    showTimer = 0;
    anchor = el;
    if (open) present(el, false);
    else if (immediate) present(el, true);
    else if (performance.now() - closedAt < SWAP_WINDOW) present(el, false);
    else showTimer = setTimeout(() => present(el, true), SHOW_DELAY);
  }

  function release(el) {
    if (el !== anchor) return;
    clearTimeout(showTimer);
    showTimer = 0;
    if (!open) { anchor = null; return; }
    clearTimeout(hideTimer);
    hideTimer = setTimeout(close, HIDE_DELAY);
  }

  // A citation and its footnote (or the other way round) are the same source: light up every link to it on the slide.
  function linkSources(a, on) {
    const n = a.dataset.n;
    const slide = slideOf(a);
    if (!n || !slide) return;
    for (const peer of slide.querySelectorAll('a[data-n]')) {
      if (peer.dataset.n !== n) continue;
      peer.classList.toggle('is-hot', on);
      peer.closest('.s-notes li')?.classList.toggle('is-hot', on);
    }
  }

  function dimBars(bar, on) {
    for (const other of slideOf(bar)?.querySelectorAll('.s-chart__bar') || []) if (other !== bar) other.classList.toggle('is-dim', on);
  }

  function focusArea(row, on) {
    const slide = slideOf(row);
    if (!slide) return;
    for (const seg of slide.querySelectorAll('.s-chart__seg')) seg.classList.toggle('is-dim', on && seg.dataset.area !== row.dataset.area);
    for (const other of slide.querySelectorAll('.s-legend li[data-area]')) other.classList.toggle('is-dim', on && other !== row);
  }

  const legendRow = (seg) => [...slideOf(seg)?.querySelectorAll('.s-legend li[data-area]') || []].find((li) => li.dataset.area === seg.dataset.area);
  const isBar = (el) => el.classList.contains('s-chart__bar');

  const trackers = [
    hover(root, TRIGGER,
      (el) => { request(el); if (isBar(el)) dimBars(el, true); else linkSources(el, true); },
      (el) => { release(el); if (isBar(el)) dimBars(el, false); else linkSources(el, false); }),
    hover(root, LEGEND, (row) => focusArea(row, true), (row) => focusArea(row, false)),
    hover(root, SEGMENT, (seg) => legendRow(seg)?.classList.add('is-hot'), (seg) => legendRow(seg)?.classList.remove('is-hot')),
  ];

  const citeOf = (e) => (e.target instanceof Element ? e.target.closest('a[data-n]') : null);

  function onFocusIn(e) {
    const el = citeOf(e);
    if (!el || !el.matches(':focus-visible')) return;
    request(el, true);
    linkSources(el, true);
  }

  function onFocusOut(e) {
    const el = citeOf(e);
    if (!el) return;
    release(el);
    linkSources(el, false);
  }

  function paintSpot() {
    frame = 0;
    if (!spot) return;
    const { el, x, y } = spot;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    el.style.setProperty('--mx', `${Math.round(((x - r.left) / r.width) * 1000) / 10}%`);
    el.style.setProperty('--my', `${Math.round(((y - r.top) / r.height) * 1000) / 10}%`);
  }

  function onMove(e) {
    if (e.pointerType === 'touch' || !(e.target instanceof Element)) return;
    const el = e.target.closest(SPOT);
    if (!el) return;
    spot = { el, x: e.clientX, y: e.clientY };
    if (!frame) frame = requestAnimationFrame(paintSpot);
  }

  function onClick(e) {
    const hit = e.target instanceof Element ? e.target.closest(GOTO) : null;
    if (!hit || !root.contains(hit)) return;
    e.preventDefault();
    close();
    goChapter?.(hit.dataset.goto);
  }

  // Capture phase, so Escape closes the popover before Present mode's own handler can close the deck.
  function onKeydown(e) {
    if (e.key !== 'Escape' || !open) return;
    e.preventDefault();
    close();
  }

  root.addEventListener('focusin', onFocusIn);
  root.addEventListener('focusout', onFocusOut);
  root.addEventListener('pointermove', onMove, { passive: true });
  root.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeydown, true);
  window.addEventListener('scroll', close, { capture: true, passive: true });
  window.addEventListener('resize', close);

  return {
    hide() {
      for (const t of trackers) t.clear();
      close();
    },
    destroy() {
      for (const t of trackers) { t.clear(); t.stop(); }
      close();
      cancelAnimationFrame(frame);
      root.removeEventListener('focusin', onFocusIn);
      root.removeEventListener('focusout', onFocusOut);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeydown, true);
      window.removeEventListener('scroll', close, { capture: true });
      window.removeEventListener('resize', close);
      node.remove();
    },
  };
}
