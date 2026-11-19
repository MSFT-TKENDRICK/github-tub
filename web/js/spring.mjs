// Springs for motion that should feel physical rather than timed: dragging between slides in Present mode, the zoom
// between the reel and Present mode, and the small settle on section icons. Parameters follow Apple's model (damping
// ratio + response) because they are easier to reason about than stiffness and mass: `response` is roughly the period
// of the motion in seconds, damping 1 is critically damped (no overshoot) and lower values overshoot.
// The springs run as Web Animations: a curve is sampled into a CSS `linear()` easing so it plays on the compositor.

const TAU = Math.PI * 2;
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';

let linearSupport;
export function supportsLinear() {
  if (linearSupport === undefined) {
    linearSupport = typeof CSS !== 'undefined' && typeof CSS.supports === 'function'
      && CSS.supports('animation-timing-function', 'linear(0, 1)');
  }
  return linearSupport;
}

export const omega = (response) => TAU / response;

// Position p (0 → 1) and velocity v at time t (seconds) of a spring released at 0 toward 1. Velocities are fractions of
// the whole distance per second, so the same curve serves any distance.
export function springCurve({ damping = 1, response = 0.5, velocity = 0 } = {}) {
  const w0 = omega(response);
  const z = damping;
  const v0 = velocity;
  if (Math.abs(z - 1) < 1e-6) {
    return (t) => {
      const e = Math.exp(-w0 * t);
      return { p: 1 - e * (1 + (w0 - v0) * t), v: e * (v0 + w0 * (w0 - v0) * t) };
    };
  }
  if (z < 1) {
    const wd = w0 * Math.sqrt(1 - z * z);
    const b = (z * w0 - v0) / wd;
    return (t) => {
      const e = Math.exp(-z * w0 * t);
      const c = Math.cos(wd * t);
      const s = Math.sin(wd * t);
      return { p: 1 - e * (c + b * s), v: e * (v0 * c + (wd + z * w0 * b) * s) };
    };
  }
  const root = w0 * Math.sqrt(z * z - 1);
  const r1 = -z * w0 + root;
  const r2 = -z * w0 - root;
  const c2 = (v0 + r1) / (r2 - r1);
  const c1 = -1 - c2;
  return (t) => {
    const e1 = Math.exp(r1 * t);
    const e2 = Math.exp(r2 * t);
    return { p: 1 + c1 * e1 + c2 * e2, v: c1 * r1 * e1 + c2 * r2 * e2 };
  };
}

// Seconds until the spring is visually at rest: the remaining energy (distance and velocity together) falls below
// `precision` of the distance travelled. Energy never grows in a damped spring, so the answer is stable.
export function settleTime(at, w0, { precision = 0.001, max = 3 } = {}) {
  const dt = 1 / 240;
  for (let t = dt; t < max; t += dt) {
    const { p, v } = at(t);
    if (Math.hypot(1 - p, v / w0) < precision) return t;
  }
  return max;
}

// Sample a curve at 60 fps (at most 120 points) into a CSS linear() easing. Values may pass 1 when the spring overshoots.
export function linearEasing(at, seconds) {
  const n = Math.min(120, Math.max(2, Math.ceil(seconds * 60)));
  const points = [];
  for (let i = 0; i <= n; i += 1) {
    const value = i === 0 ? 0 : i === n ? 1 : at((i / n) * seconds).p;
    points.push(String(Math.round(value * 10000) / 10000 || 0));
  }
  return `linear(${points.join(', ')})`;
}

// A spring as Web Animations timing: { duration (ms), easing, at(t) }. Without linear() support the easing falls back
// to a strong ease-out, which keeps the destination and roughly the feel but not the overshoot or hand-off velocity.
export function spring({ damping = 1, response = 0.5, velocity = 0, precision = 0.001 } = {}) {
  const w0 = omega(response);
  const at = springCurve({ damping, response, velocity });
  const seconds = settleTime(at, w0, { precision });
  return {
    at,
    duration: Math.max(1, Math.round(seconds * 1000)),
    easing: supportsLinear() ? linearEasing(at, seconds) : EASE_OUT,
  };
}

// Turn a release velocity (px/s) into the initial velocity of a spring travelling from `from` to `to`, so a flick carries
// into the settle instead of restarting from rest. Clamped so the hand-off can overshoot by at most ~13.5%.
export function handoff(velocity, from, to, w0) {
  const distance = to - from;
  if (Math.abs(distance) < 1 || !Number.isFinite(velocity)) return 0;
  return Math.min(2 * w0, Math.max(-w0, velocity / distance));
}

// Where a flick would come to rest under UIScrollView's normal deceleration (1000 px/s travels ~499 px).
export const project = (velocity, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);

// Resistance past an edge: the further you pull, the less it moves; never more than `dimension`.
export function rubberband(offset, dimension, c = 0.55) {
  if (!dimension) return 0;
  return (offset * dimension * c) / (dimension + c * Math.abs(offset));
}

// The pull that produces a given rubber-banded offset, so a gesture can take over a page that is springing back.
export function unrubberband(value, dimension, c = 0.55) {
  if (!dimension || !value) return 0;
  const y = Math.min(Math.abs(value), dimension * 0.999);
  return Math.sign(value) * ((y * dimension) / (c * (dimension - y)));
}

// Pointer velocity (px/s) from the samples of the last `windowMs`. A finger that stopped before lifting has velocity 0.
export function velocityTracker(windowMs = 100) {
  let samples = [];
  return {
    add(x, t) {
      samples.push({ x, t });
      while (samples.length > 2 && t - samples[0].t > windowMs) samples.shift();
    },
    velocity(now = samples.at(-1)?.t ?? 0) {
      const recent = samples.filter((sample) => now - sample.t <= windowMs);
      if (recent.length < 2) return 0;
      const a = recent[0];
      const b = recent.at(-1);
      return b.t > a.t ? ((b.x - a.x) / (b.t - a.t)) * 1000 : 0;
    },
  };
}
