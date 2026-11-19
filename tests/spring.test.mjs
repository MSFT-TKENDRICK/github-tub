import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EASE_OUT, handoff, linearEasing, omega, project, rubberband, settleTime, spring, springCurve, unrubberband,
  velocityTracker,
} from '../web/js/spring.mjs';

const near = (actual, expected, tolerance, message) =>
  assert.ok(Math.abs(actual - expected) <= tolerance, `${message ?? ''} expected ${expected} ± ${tolerance}, got ${actual}`);

const REGIMES = [
  ['underdamped', 0.5],
  ['critical', 1],
  ['overdamped', 1.4],
];

test('springs start at rest position with the given velocity and settle at 1 in every regime', () => {
  for (const [name, damping] of REGIMES) {
    for (const velocity of [0, 3, -2]) {
      const at = springCurve({ damping, response: 0.4, velocity });
      near(at(0).p, 0, 1e-12, `${name} p(0)`);
      near(at(0).v, velocity, 1e-9, `${name} v(0)`);
      near(at(5).p, 1, 1e-6, `${name} p(∞)`);
      near(at(5).v, 0, 1e-5, `${name} v(∞)`);
      const h = 1e-6;
      for (const t of [0.05, 0.2]) {
        const slope = (at(t + h).p - at(t - h).p) / (2 * h);
        near(at(t).v, slope, 1e-4, `${name} v(${t}) matches dp/dt`);
      }
    }
  }
});

test('a critically damped spring released from rest never overshoots', () => {
  const at = springCurve({ damping: 1, response: 0.35 });
  let previous = 0;
  for (let t = 0; t <= 2; t += 1 / 500) {
    const { p } = at(t);
    assert.ok(p >= previous - 1e-12, `monotone at ${t}`);
    assert.ok(p <= 1 + 1e-12, `no overshoot at ${t}`);
    previous = p;
  }
});

test('an underdamped spring overshoots by the textbook amount', () => {
  const damping = 0.5;
  const at = springCurve({ damping, response: 0.5 });
  let peak = 0;
  for (let t = 0; t <= 2; t += 1 / 2000) peak = Math.max(peak, at(t).p);
  const expected = Math.exp((-damping * Math.PI) / Math.sqrt(1 - damping * damping));
  near(peak - 1, expected, 0.002, 'overshoot');
});

test('settle time and Web Animations timing reflect the response', () => {
  const at = springCurve({ damping: 1, response: 0.35 });
  const seconds = settleTime(at, omega(0.35));
  assert.ok(seconds > 0.4 && seconds < 0.7, `settles in ${seconds}s`);
  const timing = spring({ damping: 1, response: 0.35 });
  assert.equal(timing.duration, Math.round(seconds * 1000));
  assert.equal(typeof timing.at, 'function');
  assert.equal(timing.easing, EASE_OUT, 'falls back to a strong ease-out without CSS linear() support');
  const slower = spring({ damping: 1, response: 0.6 });
  assert.ok(slower.duration > timing.duration, 'a longer response takes longer to settle');
});

test('linear() easings sample at 60fps between exact endpoints', () => {
  const at = springCurve({ damping: 0.6, response: 0.4 });
  const easing = linearEasing(at, 0.5);
  assert.match(easing, /^linear\(0, .*, 1\)$/);
  assert.equal(easing.slice(7, -1).split(', ').length, 31);
  assert.ok(easing.slice(7, -1).split(', ').map(Number).some((value) => value > 1), 'keeps the overshoot');
  assert.equal(linearEasing(at, 10).slice(7, -1).split(', ').length, 121, 'capped at 120 segments');
  assert.equal(linearEasing(at, 0.001), 'linear(0, ' + String(Math.round(at(0.0005).p * 10000) / 10000) + ', 1)');
});

test('projection follows normal scroll deceleration', () => {
  near(project(1000), 499, 1e-9);
  near(project(-1000), -499, 1e-9);
  assert.equal(project(0), 0);
});

test('rubber-banding resists, keeps direction, stays bounded, and inverts', () => {
  const d = 1000;
  near(rubberband(1, d), 0.55, 0.001, 'small pulls move about 55%');
  assert.ok(rubberband(-200, d) < 0 && rubberband(200, d) > 0);
  assert.ok(rubberband(1e9, d) < d, 'never travels further than the dimension');
  assert.ok(rubberband(400, d) < rubberband(800, d), 'further pulls still move further');
  assert.equal(rubberband(50, 0), 0);
  for (const pull of [-800, -10, 10, 800]) near(unrubberband(rubberband(pull, d), d), pull, 1e-6, `inverse of ${pull}`);
  assert.equal(unrubberband(0, d), 0);
  assert.ok(Number.isFinite(unrubberband(d, d)), 'clamped at the asymptote');
});

test('hand-off velocity is relative to the distance and clamped', () => {
  const w0 = omega(0.35);
  near(handoff(800, -300, 0, w0), 800 / 300, 1e-12);
  assert.equal(handoff(1e6, -100, 0, w0), 2 * w0);
  assert.equal(handoff(-1e6, -100, 0, w0), -w0);
  assert.equal(handoff(500, 0, 0.5, w0), 0, 'no hand-off over a sub-pixel distance');
  assert.equal(handoff(Number.NaN, 0, 100, w0), 0);
});

test('velocity tracking uses recent samples only', () => {
  const tracker = velocityTracker(100);
  assert.equal(tracker.velocity(), 0);
  for (let t = 0; t <= 100; t += 10) tracker.add(t, t);
  near(tracker.velocity(100), 1000, 1e-9, '1px/ms');
  assert.equal(tracker.velocity(400), 0, 'a finger that stopped before lifting has no velocity');
  const reversing = velocityTracker(50);
  for (let t = 0; t <= 200; t += 10) reversing.add(t < 150 ? t : 300 - t, t);
  assert.ok(reversing.velocity() < 0, 'follows the latest direction');
});
