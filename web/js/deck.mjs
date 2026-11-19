// Present mode (full-window slideshow) and the print layout used for "Export as PDF". Both draw the same slides as the
// web reel and the PowerPoint export, from buildDeck().
import { h, icon, mount, clear } from './dom.mjs';
import { buildDeck, chapterStart, layoutKey, sameLayout } from './deck-model.mjs';
import { SLIDE_H, SLIDE_W, fitSlides, renderSlide, trackScale } from './slides.mjs';
import { EASE_EXPO, EASE_OUT, arm, build, reduceMotion, swap, together } from './motion.mjs';
import { attachInteractions } from './interact.mjs';
import { spring } from './spring.mjs';

// Slide changes push along the deck's axis on a critically damped spring: the new slide arrives from the side you are
// heading toward while the old one recedes the other way, a little smaller, so the deck reads as a strip you move along.
const PUSH_IN = 0.14; // incoming travel, as a share of the stage width
const PUSH_OUT = 0.09; // outgoing travel (shorter, so the two layers separate in depth)
let springs = null;
const motionSprings = () => (springs ||= {
  push: spring({ damping: 1, response: 0.5 }),
  lift: spring({ damping: 1, response: 0.45 }),
});

const NEXT_KEYS = new Set(['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'n', 'N']);
const PREV_KEYS = new Set(['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace', 'p', 'P']);

export function openDeck(root, { idx, view, key, sections, start = 1, zoom = false, frameFor, onClose, onSlide }) {
  const { meta, slides } = buildDeck(idx, { view, key, sections });
  const total = slides.length;
  const clampN = (n) => Math.min(total, Math.max(1, Math.round(Number(n)) || 1));
  let current = 0;
  let currentMotionNode = null;
  let currentNode = null; // the slide on screen, inside currentMotionNode
  let idleTimer = 0;
  let lifted = null; // the reel frame the first slide lifted out of, hidden until the slide lands
  const seenSlides = new Set();

  const backdrop = h('div', { class: 'present__backdrop' });
  const stage = h('div', { class: 'present__stage' });
  const viewport = h('div', { class: 'present__viewport' }, stage);
  const counter = h('span', { class: 'present__count s-mono' });
  const live = h('p', { class: 'sr-only', 'aria-live': 'polite' });
  const button = (label, name, fn) => h('button', { class: 'present__btn', type: 'button', 'aria-label': label, title: label, onclick: fn }, icon(name, { size: 20 }));
  const prevBtn = button('Previous slide', 'chevron-left', () => goto(current - 1));
  const nextBtn = button('Next slide', 'chevron-right', () => goto(current + 1));
  const fullBtn = button('Full screen (F)', 'screen-full', toggleFull);
  const exitBtn = button('Exit presentation (Esc)', 'x', () => onClose?.());
  const bar = h('div', { class: 'present__bar' },
    prevBtn, counter, nextBtn,
    h('span', { class: 'present__title' }, `Technical Update Briefing · ${meta.period}`),
    fullBtn, exitBtn);
  const shell = h('div', {
    class: 'present', role: 'dialog', 'aria-modal': 'true', 'aria-label': `Presenting the briefing for ${meta.label}`, tabindex: '-1',
  }, backdrop, viewport, bar, live);

  const returnFocus = document.activeElement;
  mount(root, shell);
  root.classList.add('is-open');
  document.documentElement.classList.add('is-presenting');
  const stopScale = trackScale(viewport, (box) => Math.min(box.width / SLIDE_W, box.height / SLIDE_H));
  // Agenda entries jump to their chapter; the popover lives in the shell so it still shows in full screen.
  const interactions = attachInteractions(shell, {
    goChapter(id) {
      const n = chapterStart(slides, id);
      if (!n) return;
      goto(n);
      shell.focus({ preventScroll: true });
    },
  });

  const animated = () => typeof stage.animate === 'function';

  // Opening: the room goes dark, the slide lifts out of its frame in the reel (when Present was opened from that frame
  // and it is on screen) or settles forward from slightly behind the screen, and the controls rise in last. Returns
  // how long the slide's own build should wait so it plays as the slide lands, not before.
  function enter(target) {
    if (!animated()) return 0;
    if (reduceMotion()) {
      backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease' });
      stage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease' });
      return 0;
    }
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 360, easing: EASE_OUT });
    bar.animate([
      { opacity: 0, transform: 'translate(-50%, 16px)' },
      { opacity: 1, transform: 'translate(-50%, 0)' },
    ], { duration: 480, delay: 200, easing: EASE_EXPO, fill: 'backwards' });
    const to = stage.getBoundingClientRect();
    const frame = zoom ? frameFor?.(target) : null;
    const from = frame?.isConnected ? frame.getBoundingClientRect() : null;
    if (from && to.width && from.width && from.bottom > 0 && from.top < innerHeight) {
      const { lift } = motionSprings();
      frame.style.visibility = 'hidden';
      lifted = frame;
      const flight = stage.animate([
        { transform: `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})` },
        { transform: 'none' },
      ], { duration: lift.duration, easing: lift.easing });
      const land = () => {
        if (lifted === frame) {
          frame.style.visibility = '';
          lifted = null;
        }
      };
      flight.finished.then(land, land);
      return 140;
    }
    stage.animate([
      { opacity: 0, transform: `translate(${to.width * 0.04}px, ${to.height * 0.04}px) scale(0.92)` },
      { opacity: 1, transform: 'none' },
    ], { duration: 560, easing: EASE_EXPO });
    return 80;
  }

  // Moving along the deck: the outgoing slide recedes from wherever it is right now (so a transition interrupted by
  // another key press never jumps), and the new one is pushed in from the side you are heading toward on a critically
  // damped spring. Anything older than the outgoing slide is dropped at once.
  function push(previous, incoming, dir) {
    for (const child of [...stage.children]) {
      if (child === previous) continue;
      child.getAnimations().forEach((animation) => animation.cancel());
      child.remove();
    }
    const { transform, opacity } = getComputedStyle(previous);
    previous.getAnimations().forEach((animation) => animation.cancel());
    previous.inert = true;
    previous.style.pointerEvents = 'none';
    stage.appendChild(incoming);
    const drop = () => { if (previous !== currentMotionNode) previous.remove(); };
    if (reduceMotion()) {
      previous.animate([{ opacity }, { opacity: 0 }], { duration: 200, easing: 'ease', fill: 'forwards' }).onfinish = drop;
      incoming.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: 'ease' });
      return;
    }
    const w = stage.offsetWidth;
    const { push: motion } = motionSprings();
    previous.animate([
      { transform, opacity },
      { transform: `translate3d(${-dir * w * PUSH_OUT}px, 0, 0) scale(0.96)`, opacity: 0 },
    ], { duration: 420, easing: EASE_EXPO, fill: 'forwards' }).onfinish = drop;
    incoming.animate([
      { transform: `translate3d(${dir * w * PUSH_IN}px, 0, 0) scale(0.94)` },
      { transform: 'none' },
    ], { duration: motion.duration, easing: motion.easing });
    incoming.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: EASE_OUT });
  }

  // Slides that share a layout (the updates of one section, the pages of a list) do not move as slides: the stage stays
  // as it is and only the content swaps (swap() in motion.mjs), so a run of them reads as one grouped section. Any other
  // move pushes a whole slide, which is what makes the grouping legible.
  function goto(n, { silent = false } = {}) {
    const target = clampN(n);
    if (target === current) return;
    interactions.hide();
    const dir = target > current ? 1 : -1;
    const seen = seenSlides.has(target);
    seenSlides.add(target);
    const previous = currentMotionNode;
    const outgoing = currentNode;
    const from = slides[current - 1];
    current = target;
    const node = renderSlide(slides[current - 1], meta);
    const opening = !previous?.isConnected;
    const grouped = !opening && animated() && !reduceMotion() && sameLayout(from, slides[current - 1]);
    let incoming = previous;
    if (grouped) {
      outgoing.before(node);
    } else {
      incoming = h('div', { class: 'present__motion' }, node);
      if (opening || !animated()) mount(stage, incoming);
      else push(previous, incoming, dir);
    }
    currentMotionNode = incoming;
    currentNode = node;
    fitSlides(grouped ? node : stage);
    if (grouped) {
      if (!swap(outgoing, node, { key: layoutKey(slides[current - 1]), dir })) outgoing.remove();
    } else {
      const delay = opening ? enter(target) : 90;
      // First visit: the full build. Coming back to a slide already shown: its content drifts in with the slide.
      if (animated() && !reduceMotion()) {
        if (seen) together(node, { dx: dir * 40 });
        else if (arm(node, 'present')) build(node, { dir, delay });
      }
    }
    counter.textContent = `${current} / ${total}`;
    prevBtn.disabled = current === 1;
    nextBtn.disabled = current === total;
    live.textContent = node.getAttribute('aria-label') || '';
    if (!silent) onSlide?.(current);
  }

  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    else shell.requestFullscreen?.().catch(() => {});
  }
  function onFullChange() {
    const on = Boolean(document.fullscreenElement);
    mount(fullBtn, icon(on ? 'screen-normal' : 'screen-full', { size: 20 }));
    fullBtn.setAttribute('aria-label', on ? 'Exit full screen (F)' : 'Full screen (F)');
    fullBtn.title = fullBtn.getAttribute('aria-label');
  }

  function wake() {
    shell.classList.remove('is-idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { if (!bar.contains(document.activeElement)) shell.classList.add('is-idle'); }, 2600);
  }

  function onKey(e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    const onControl = e.target instanceof Element && e.target.closest('button, a');
    if (onControl && (e.key === ' ' || e.key === 'Enter')) return;
    if (NEXT_KEYS.has(e.key)) goto(current + 1);
    else if (PREV_KEYS.has(e.key)) goto(current - 1);
    else if (e.key === 'Home') goto(1);
    else if (e.key === 'End') goto(total);
    else if (e.key === 'f' || e.key === 'F') toggleFull();
    else if (e.key === 'Escape') { if (!document.fullscreenElement) onClose?.(); }
    else return;
    e.preventDefault();
    wake();
  }

  // Keep keyboard focus inside the dialog.
  function onFocusIn(e) {
    if (!shell.contains(e.target)) shell.focus({ preventScroll: true });
  }

  let touchX = null;
  const onPointerDown = (e) => { if (e.pointerType !== 'mouse') touchX = e.clientX; };
  const onPointerUp = (e) => {
    if (touchX === null) return;
    const dx = e.clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 48) goto(current + (dx < 0 ? 1 : -1));
  };

  document.addEventListener('keydown', onKey);
  document.addEventListener('focusin', onFocusIn);
  document.addEventListener('fullscreenchange', onFullChange);
  shell.addEventListener('mousemove', wake);
  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointerup', onPointerUp);

  goto(start, { silent: true });
  shell.focus({ preventScroll: true });
  wake();
  document.fonts?.ready?.then(() => { if (shell.isConnected) fitSlides(stage); });

  return {
    goto: (n) => goto(n, { silent: true }),
    destroy() {
      clearTimeout(idleTimer);
      if (lifted) lifted.style.visibility = '';
      lifted = null;
      stopScale();
      interactions.destroy();
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('fullscreenchange', onFullChange);
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      clear(root);
      root.classList.remove('is-open');
      document.documentElement.classList.remove('is-presenting');
      const back = returnFocus && returnFocus.isConnected ? returnFocus : document.getElementById('page-title');
      back?.focus?.({ preventScroll: true });
    },
  };
}

// Every slide at full size, one per printed page (@page is 1280×720 px = 13.333×7.5 in). On screen the pages are scaled
// to the window with a short toolbar that never prints.
export function renderPrint(root, { idx, view, key, sections, onBack }) {
  const { meta, slides } = buildDeck(idx, { view, key, sections });
  const pages = h('div', { class: 'print-pages' }, slides.map((slide) => h('div', { class: 'print-page' }, renderSlide(slide, meta))));
  const bar = h('div', { class: 'print-bar' },
    h('button', { class: 'btn', type: 'button', onclick: () => onBack?.() }, icon('arrow-left', { size: 16 }), 'Back to the briefing'),
    h('p', { class: 'print-bar__text' }, `${meta.period} · ${slides.length} slides · choose “Save as PDF” as the printer.`),
    h('button', { class: 'btn btn--primary', type: 'button', onclick: () => window.print() }, icon('download', { size: 16 }), 'Print or save as PDF'));
  mount(root, bar, pages);
  root.hidden = false;
  const stopScale = trackScale(pages, (box) => Math.min(1, box.width / SLIDE_W));
  const fit = () => fitSlides(pages);
  fit();
  document.fonts?.ready?.then(() => { if (pages.isConnected) fit(); });
  window.addEventListener('beforeprint', fit);
  return {
    destroy() {
      stopScale();
      window.removeEventListener('beforeprint', fit);
      clear(root);
      root.hidden = true;
    },
  };
}
