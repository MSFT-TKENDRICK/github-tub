// Slide builds: the choreography that brings a slide's content in once it is on screen, in the reel and in Present
// mode. Each slide kind has a plan (which elements move, in what role, on which beat), so a slide reads as one
// sentence: the headline lands first, supporting content follows in reading order, sources settle last. Slides that
// share a layout (see SWAPS) keep their chrome still and only trade content.
// Everything runs as Web Animations on opacity and transform: it stays on the compositor, can be cut short at any frame,
// and never changes layout (slides fit their text before a build starts). Never animate clip-path here: a clipped,
// moving headline on every built slide crashed the renderer when a fast scroll came back up over them. The one
// exception to opacity and transform is the overview's KPI count-up, whose text follows a Web Animation clock and
// always lands on the exact figure.
import { EASE_OUT, spring } from './spring.mjs';
import { fmtNum } from './dom.mjs';

export { EASE_OUT };
export const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';
// Expo-out: a fast start that decelerates long and softly, the curve keynote headlines land on.
export const EASE_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

const motionQuery = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
export const reduceMotion = () => Boolean(motionQuery?.matches);
export const canAnimate = () => typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';

// Travel is in slide pixels, and the reel draws slides at about half size, so its distances are set to read on screen
// (56 slide px ≈ 28 screen px). Present mode stages each slide for an audience: more travel and clearer gaps between
// beats. [duration ms, travel in slide px] per role (the headline's travel is its own height); beats and stagger in ms.
const BUDGETS = {
  reel: {
    axis: 'y', beats: [0, 140, 260, 360, 440], stagger: [0, 70, 130, 180, 220, 250],
    lead: [780], support: [680, 56], minor: [600, 40], fade: 480, draw: 820,
    pop: { response: 0.5, from: 0.72 }, bars: { duration: 680, step: 45, span: 460 }, count: 900,
  },
  present: {
    axis: 'x', beats: [120, 300, 440, 540, 620], stagger: [0, 80, 150, 210, 260, 300],
    lead: [860], support: [760, 96], minor: [680, 64], fade: 540, draw: 900,
    pop: { response: 0.55, from: 0.66 }, bars: { duration: 760, step: 50, span: 520 }, count: 1000,
  },
  // Same-layout moves in Present mode: the slide stays put and only its content changes hands, so the budget is
  // tighter than a full build. The first beat sits just after the outgoing content has cleared (see LEAVE).
  swap: {
    axis: 'x', beats: [110, 150, 190, 230, 300], stagger: [0, 36, 64, 88, 108, 124],
    lead: [620], support: [560, 56], minor: [500, 40], fade: 360, draw: 600,
    pop: { response: 0.4, from: 0.8 }, bars: { duration: 520, step: 30, span: 300 },
  },
};

// [selector, role, beat, staggered]. Roles: lead (the headline rises and fades in), support and minor (travel + fade,
// smaller each step), fade (opacity only), drawX/drawY (a rule grows from its start edge), pop (an icon scales up on a
// spring). The brand rail on the cover and closing slides cascades down in pops; other unlisted parts of a slide, such
// as bands, grids and the footer, are the set the content builds onto and stay still.
const LIST = [
  ['.s-list__pill', 'fade', 0],
  ['.s-list__title', 'lead', 0],
  ['.s-list__page', 'fade', 1],
  ['.s-list__row', 'support', 1, true],
  ['.s-list__more', 'fade', 3],
  ['.s-notes', 'fade', 3],
];
const THEMES = [
  ['.s-hl__title', 'lead', 0],
  ['.s-hl__card', 'support', 1, true],
  ['.s-notes', 'fade', 3],
];
const PLANS = {
  cover: [
    ['.s-rail > *', 'pop', 0, true],
    ['.s-vrule', 'drawY', 0],
    ['.s-cover__eyebrow', 'support', 0],
    ['.s-cover__title', 'lead', 0],
    ['.s-cover__period', 'support', 1],
    ['.s-cover__range', 'minor', 2],
    ['.s-cover__foot', 'fade', 3],
  ],
  agenda: [
    ['.s-agenda__title', 'lead', 0],
    ['.s-agenda__item', 'support', 1, true],
  ],
  overview: [
    ['.s-over__pill', 'fade', 0],
    ['.s-over__title', 'lead', 0],
    ['.s-over__headline', 'support', 1],
    ['.s-over__summary', 'minor', 2],
    ['.s-kpi', 'support', 2, true],
    ['.s-chart', 'minor', 3],
    ['.s-legend', 'minor', 3],
    ['.s-notes', 'fade', 4],
  ],
  themes: THEMES,
  highlights: [['.s-hl__pill', 'fade', 0], ...THEMES],
  divider: [
    ['.s-div__icon', 'pop', 0],
    ['.s-div__title', 'lead', 0],
    ['.s-div__blurb', 'support', 1],
    ['.s-div__stat', 'minor', 2],
  ],
  update: [
    ['.s-up__title', 'lead', 0],
    ['.s-up__rule', 'drawX', 0],
    ['.s-up__badge', 'support', 0],
    ['.s-up__body', 'support', 1],
    ['.s-up__visual', 'minor', 2],
    ['.s-up__link', 'fade', 3],
    ['.s-up__date', 'fade', 3],
  ],
  list: LIST,
  upcoming: LIST,
  events: LIST,
  closing: [
    ['.s-rail > *', 'pop', 0, true],
    ['.s-vrule', 'drawY', 0],
    ['.s-close__title', 'lead', 0],
    ['.s-close__sub', 'support', 1],
    ['.s-close__prov', 'minor', 2],
    ['.s-close__src > li', 'minor', 2, true],
    ['.s-cover__foot', 'fade', 3],
  ],
};
// A compact section (one slide per product area) shares the list kind but opens like a divider.
const SECTION_LIST = [
  ['.s-sum__icon', 'pop', 0],
  ['.s-sum__title', 'lead', 0],
  ['.s-sum__blurb', 'support', 1],
  ['.s-sum__stat', 'fade', 2],
  ['.s-sum__row', 'support', 1, true],
  ['.s-sum__more', 'fade', 3],
];

// What changes hands when one slide gives way to another with the same layout, keyed by layoutKey() in deck-model.
// Same tuple shape as PLANS, but at the granularity of content slots: the bands, rules, frames and backgrounds are the
// chrome and never move, so the badge and the visual are split into their children. A slot whose content is identical
// on both slides is left alone. The footer number rolls (a tiny odometer) so the move is felt in the one place that
// always changes.
export const SWAPS = {
  update: [
    ['.s-up__title', 'lead', 0],
    ['.s-up__badge > *', 'support', 0, true],
    ['.s-up__body', 'support', 1],
    ['.s-up__visual > :not(.s-up__glyph)', 'minor', 2, true],
    ['.s-up__link', 'fade', 3],
    ['.s-up__date', 'fade', 3],
    ['.s-foot__n', 'roll', 0],
  ],
  rows: [
    ['.s-list__pill', 'fade', 0],
    ['.s-list__title', 'lead', 0],
    ['.s-list__page', 'fade', 1],
    ['.s-list__row', 'support', 1, true],
    ['.s-list__more', 'fade', 3],
    ['.s-notes', 'fade', 3],
    ['.s-foot__n', 'roll', 0],
  ],
  cards: [
    ['.s-hl__pill', 'fade', 0],
    ['.s-hl__title', 'lead', 0],
    ['.s-hl__card', 'support', 1, true],
    ['.s-notes', 'fade', 3],
    ['.s-foot__n', 'roll', 0],
  ],
};
// Outgoing content clears together and fast (ms per role, travel in slide px); it never waits on the incoming build.
const LEAVE = { lead: 200, support: 180, minor: 160, fade: 140, roll: 140, travel: 28 };
// A headline's travel in em: how far below its place it starts, and how far it sinks when it leaves (shorter, since exits are).
const LEAD_RISE = 0.7;
const LEAD_SINK = 0.4;

const MOVES = new Set(['lead', 'support', 'minor', 'pop']);
const STATE = new WeakMap(); // slide -> { mode, targets, anims }
const pops = {};

const popSpring = (mode) => (pops[mode] ||= spring({ damping: 1, response: BUDGETS[mode].pop.response, precision: 0.01 }));
const timing = (duration, delay, easing = EASE_EXPO) => ({ duration, delay, easing, fill: 'backwards' });

function planFor(slide) {
  const kind = slide.dataset.kind;
  if (kind === 'list' && slide.querySelector('.s-sum__intro')) return SECTION_LIST;
  return PLANS[kind] || null;
}

function collect(slide) {
  const plan = planFor(slide);
  if (!plan) return [];
  const seen = new Set();
  const targets = [];
  for (const [selector, role, beat, staggered] of plan) {
    let index = 0;
    for (const el of slide.querySelectorAll(selector)) {
      if (seen.has(el)) continue;
      seen.add(el);
      // Moving anything inside a [data-fit] block would change the overflow that block measures, so those only fade.
      const locked = Boolean(el.parentElement?.closest('[data-fit]'));
      targets.push({ el, role: locked && MOVES.has(role) ? 'fade' : role, beat, index: staggered ? index++ : -1, locked });
    }
  }
  return targets;
}

function cancel(state) {
  for (const animation of state.anims) animation.cancel();
  state.anims = [];
}

function track(slide, state, anims) {
  state.anims = anims;
  Promise.all(anims.map((animation) => animation.finished)).then(() => {
    if (STATE.get(slide) === state && state.anims === anims) {
      state.anims = [];
      slide.dataset.build = 'done';
    }
  }, () => {});
}

// Hide a slide's content until build() plays it in (CSS hides [data-b] while the slide is armed).
export function arm(slide, mode = 'present') {
  if (!slide || reduceMotion() || !canAnimate()) return false;
  const previous = STATE.get(slide);
  if (previous) cancel(previous);
  const targets = collect(slide);
  if (!targets.length) {
    STATE.delete(slide);
    delete slide.dataset.build;
    return false;
  }
  for (const target of targets) target.el.dataset.b = target.role;
  STATE.set(slide, { mode, targets, anims: [] });
  slide.dataset.build = 'armed';
  return true;
}

// Play an armed slide's build. `dir` is the direction of travel: 1 when the slide arrives from the end of the axis
// (scrolling down, advancing), -1 from the start. `delay` holds the whole build back, e.g. while the slide lands.
export function build(slide, { dir = 1, delay: hold = 0 } = {}) {
  const state = slide ? STATE.get(slide) : null;
  if (!state || slide.dataset.build !== 'armed') return;
  const budget = BUDGETS[state.mode];
  const anims = [];
  slide.dataset.build = 'playing';
  for (const target of state.targets) {
    const delay = hold + budget.beats[target.beat] + (target.index >= 0 ? budget.stagger[Math.min(target.index, budget.stagger.length - 1)] : 0);
    enter(target, state.mode, delay, dir, anims);
    if (target.el.classList.contains('s-chart')) growBars(target.el, budget, delay + 60, anims);
    if (budget.count && target.el.classList.contains('s-kpi')) countUp(target.el.querySelector('.s-kpi__n'), delay, budget.count, anims);
  }
  track(slide, state, anims);
}

// Jump to the end state: everything visible, nothing moving. Safe to call on any slide.
export function settle(slide) {
  const state = slide ? STATE.get(slide) : null;
  if (!state) return;
  cancel(state);
  slide.dataset.build = 'done';
}

// Going back to a slide the audience has already seen: no build, the content drifts into place together, a beat
// behind the slide itself so the layers separate in depth.
export function together(slide, { dx = 40, duration = 620 } = {}) {
  if (!slide) return;
  let state = STATE.get(slide);
  if (!state) {
    state = { mode: 'present', targets: collect(slide), anims: [] };
    STATE.set(slide, state);
  }
  cancel(state);
  const anims = state.targets
    .filter((target) => !target.locked && !target.role.startsWith('draw'))
    .map(({ el }) => el.animate([{ transform: `translate3d(${dx}px, 0, 0)` }, { transform: 'none' }], { duration, easing: EASE_EXPO }));
  if (!anims.length) return;
  slide.dataset.build = 'playing';
  track(slide, state, anims);
}

// A move between two slides with the same layout (see SWAPS). The caller stacks `incoming` beneath `outgoing` in the same
// stage; CSS masks the outgoing slide ([data-swap]) down to the slots marked here ([data-s]), so the incoming slide's
// background, bands and frames show through and stay put. Slots that differ clear together, the matching incoming
// slots build in just behind them, and the outgoing slide removes itself when it has cleared. Safe to call in the
// middle of a build or of another swap: whatever the outgoing slide is showing leaves from where it is on screen.
// Returns false when there is nothing to animate (no plan, reduced motion) and leaves both slides untouched.
export function swap(outgoing, incoming, { key, dir = 1 } = {}) {
  const plan = SWAPS[key];
  if (!plan || !outgoing || !incoming || reduceMotion() || !canAnimate()) return false;

  const slots = [];
  const targets = [];
  const seen = new Set();
  for (const [selector, role, beat, staggered] of plan) {
    const before = outgoing.querySelectorAll(selector);
    const after = incoming.querySelectorAll(selector);
    let index = 0;
    for (let i = 0; i < Math.max(before.length, after.length); i++) {
      const a = before[i] || null;
      const b = after[i] || null;
      if ((a && seen.has(a)) || (b && seen.has(b))) continue;
      if (a) seen.add(a);
      if (b) seen.add(b);
      if (a && b && a.innerHTML === b.innerHTML) continue;
      if (a) slots.push({ el: a, role });
      if (b) targets.push({ el: b, role, beat, index: staggered ? index++ : -1, locked: false });
    }
  }

  const live = new Map();
  const building = STATE.get(outgoing);
  if (building?.anims.length) {
    for (const { el } of building.targets) {
      const style = getComputedStyle(el);
      live.set(el, { opacity: style.opacity, transform: style.transform });
    }
    cancel(building);
  }

  const anims = [];
  for (const { el, role } of slots) {
    el.dataset.s = '';
    leave(el, role, dir, live.get(el), anims);
  }
  outgoing.dataset.swap = '';
  outgoing.inert = true;
  outgoing.setAttribute('aria-hidden', 'true');
  const remove = () => outgoing.remove();
  if (anims.length) Promise.all(anims.map((animation) => animation.finished)).then(remove, remove);
  else remove();

  if (targets.length) {
    for (const target of targets) target.el.dataset.b = target.role;
    STATE.set(incoming, { mode: 'swap', targets, anims: [] });
    incoming.dataset.build = 'armed';
    build(incoming, { dir });
  }
  return true;
}

function enter({ el, role }, mode, delay, dir, out) {
  const budget = BUDGETS[mode];
  if (role === 'fade') {
    out.push(el.animate([{ opacity: 0 }, { opacity: 1 }], timing(budget.fade, delay)));
  } else if (role === 'drawX' || role === 'drawY') {
    // A rule is a solid bar, so growing it from its start edge (CSS sets the origin) reads exactly like a wipe.
    const from = role === 'drawY' ? 'scaleY(0)' : 'scaleX(0)';
    out.push(el.animate([{ transform: from }, { transform: 'none' }], timing(budget.draw, delay, EASE_IN_OUT)));
  } else if (role === 'roll') {
    out.push(el.animate([{ opacity: 0, transform: `translate3d(0, ${0.7 * dir}em, 0)` }, { opacity: 1, transform: 'none' }], timing(budget.fade, delay)));
  } else if (role === 'pop') {
    const pop = popSpring(mode);
    out.push(el.animate([{ opacity: 0 }, { opacity: 1 }], timing(budget.fade * 0.6, delay)));
    out.push(el.animate([{ transform: `scale(${budget.pop.from}) rotate(-6deg)` }, { transform: 'none' }], timing(pop.duration, delay, pop.easing)));
  } else if (role === 'lead') {
    // The headline fades in quickly while it rises LEAD_RISE ems (about two thirds of its type size) and settles
    // slowly, so it is readable before it stops moving. Travel in ems keeps every headline in proportion.
    const [duration] = budget.lead;
    out.push(el.animate([{ opacity: 0 }, { opacity: 1 }], timing(duration * 0.4, delay)));
    out.push(el.animate([{ transform: `translate3d(0, ${LEAD_RISE}em, 0)` }, { transform: 'none' }], timing(duration, delay)));
  } else {
    const [duration, travel] = budget[role];
    const d = travel * dir;
    const from = budget.axis === 'x' ? `translate3d(${d}px, 0, 0)` : `translate3d(0, ${d}px, 0)`;
    out.push(el.animate([{ opacity: 0, transform: from }, { opacity: 1, transform: 'none' }], timing(duration, delay)));
  }
}

// Outgoing content clears from its live on-screen state (`live`, set when a move interrupts a build) along the path it
// came in on: the headline sinks back the way it rose, everything else drifts away from the direction of travel.
function leave(el, role, dir, live, out) {
  const from = { opacity: live ? live.opacity : 1, transform: live ? live.transform : 'none' };
  const options = { duration: LEAVE[role], easing: EASE_OUT, fill: 'forwards' };
  if (role === 'lead') {
    out.push(el.animate([from, { opacity: 0, transform: `translate3d(0, ${LEAD_SINK}em, 0)` }], options));
  } else if (role === 'fade') {
    out.push(el.animate([{ opacity: from.opacity }, { opacity: 0 }], options));
  } else if (role === 'roll') {
    out.push(el.animate([from, { opacity: 0, transform: `translate3d(0, ${-0.7 * dir}em, 0)` }], options));
  } else {
    const travel = role === 'minor' ? LEAVE.travel * 0.7 : LEAVE.travel;
    out.push(el.animate([from, { opacity: 0, transform: `translate3d(${-travel * dir}px, 0, 0)` }], options));
  }
}

// Bars grow from the baseline left to right, then their totals fade in.
function growBars(figure, budget, start, out) {
  const svg = figure.querySelector('.s-chart__svg');
  const base = svg?.querySelector('.s-chart__base');
  if (!svg || !base) return;
  const baseline = Number(base.getAttribute('y1')) - 0.5;
  const bars = [...svg.children].filter((node) => node.localName === 'g');
  const { duration, step, span } = budget.bars;
  const gap = bars.length > 1 ? Math.min(step, span / (bars.length - 1)) : 0;
  bars.forEach((bar, i) => {
    const delay = start + i * gap;
    for (const rect of bar.querySelectorAll('.s-chart__seg')) {
      rect.style.transformBox = 'view-box';
      rect.style.transformOrigin = `0 ${baseline}px`;
      out.push(rect.animate([{ transform: 'scaleY(0.02)' }, { transform: 'none' }], timing(duration, delay)));
    }
    const value = bar.querySelector('.s-chart__val');
    if (value) out.push(value.animate([{ opacity: 0 }, { opacity: 1 }], timing(budget.fade * 0.6, delay + duration * 0.7)));
  });
}

const enough = (visible, height) => visible > 0 && (visible >= height * 0.35 || visible >= innerHeight * 0.5);

// The figure a count shows `progress` (0 to 1) of the way through: eased out, so it settles on the exact total.
export const tally = (total, progress) => Math.round(total * (1 - (1 - Math.min(1, Math.max(0, progress))) ** 3));

// A KPI counts up to its figure as its card lands. A no-op animation is the clock, so cancel(), settle() and a finished
// build all go through the same path and the text always ends on the exact figure; it is only ever mid-count while the
// clock is running. Figures under 3 just appear, since counting to 2 reads as a stutter.
function countUp(el, delay, duration, out) {
  const final = el ? el.textContent : '';
  const total = Number(final.replace(/,/g, ''));
  if (!(total >= 3)) return;
  const set = (text) => { if (el.textContent !== text) el.textContent = text; };
  const land = () => set(final);
  const clock = el.animate([{ opacity: 1 }, { opacity: 1 }], timing(duration, delay, 'linear'));
  const tick = () => {
    if (!el.isConnected || (clock.playState !== 'running' && clock.playState !== 'paused')) return;
    set(fmtNum(tally(total, clock.effect.getComputedTiming().progress ?? 0)));
    requestAnimationFrame(tick);
  };
  set(fmtNum(0));
  clock.finished.then(land, land);
  requestAnimationFrame(tick);
  out.push(clock);
}

// Builds for the web reel: every slide is armed when the page is drawn and plays once, the first time a third of it
// is on screen, including slides already on screen when the page is drawn. Focus that lands on content inside a slide
// (a link, a citation) shows that slide at once so keyboard users never wait for a build; focus on the reel item
// itself (chapter navigation) or its caption leaves the build to play as the slide scrolls in. Returns a function
// that stops observing.
export function armReel(root, { entrance = true } = {}) {
  if (!root || reduceMotion() || !canAnimate() || typeof IntersectionObserver !== 'function') return () => {};
  const slides = [...root.querySelectorAll('.slide')].filter((slide) => arm(slide, 'reel'));
  if (!slides.length) return () => {};
  let observer = null;
  const onFocus = (event) => {
    const slide = event.target instanceof Element ? event.target.closest('.slide') : null;
    if (!slide || !STATE.has(slide) || slide.dataset.build === 'done') return;
    settle(slide);
    observer?.unobserve(slide);
  };
  root.addEventListener('focusin', onFocus);
  const frame = requestAnimationFrame(() => {
    if (!root.isConnected) {
      slides.forEach(settle);
      return;
    }
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const slide = entry.target;
        if (!entry.isIntersecting || slide.dataset.build !== 'armed') continue;
        if (entry.intersectionRatio < 0.35 && entry.intersectionRect.height < innerHeight * 0.5) continue;
        observer.unobserve(slide);
        build(slide, { dir: entry.boundingClientRect.top < (entry.rootBounds?.top ?? 0) ? -1 : 1 });
      }
    }, { threshold: [0, 0.1, 0.2, 0.35] });
    for (const slide of slides) {
      if (slide.dataset.build !== 'armed') continue;
      const box = slide.getBoundingClientRect();
      if (enough(Math.min(box.bottom, innerHeight) - Math.max(box.top, 0), box.height)) {
        // A redraw in place replays a little sooner than a new page, so filtering never feels sluggish.
        build(slide, { dir: 1, delay: entrance ? 0 : -120 });
      } else {
        observer.observe(slide);
      }
    }
  });
  return () => {
    cancelAnimationFrame(frame);
    observer?.disconnect();
    root.removeEventListener('focusin', onFocus);
  };
}
