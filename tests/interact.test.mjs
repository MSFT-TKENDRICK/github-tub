import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { placeTip } from '../web/js/interact.mjs';
import { chapterStart } from '../web/js/deck-model.mjs';
import { tally } from '../web/js/motion.mjs';

const view = { width: 1280, height: 720 };
const size = { width: 200, height: 80 };
const anchorAt = (left, top, width = 20, height = 12) => ({ left, top, width, height });

test('a popover sits centred above its trigger with the caret on the trigger', () => {
  const tip = placeTip(anchorAt(500, 300), size, view);
  assert.deepEqual(tip, { x: 410, y: 210, side: 'top', arrow: 100 });
});

test('a popover flips below a trigger near the top of the viewport', () => {
  const tip = placeTip(anchorAt(500, 20), size, view);
  assert.equal(tip.side, 'bottom');
  assert.equal(tip.y, 42);
});

test('a popover is clamped inside the viewport and the caret stays on the trigger', () => {
  const left = placeTip(anchorAt(0, 300), size, view);
  assert.equal(left.x, 8);
  assert.equal(left.arrow, 16);
  const right = placeTip(anchorAt(1270, 300), size, view);
  assert.equal(right.x, view.width - size.width - 8);
  assert.equal(right.arrow, size.width - 16);
});

test('when neither side has room the popover takes the roomier side and stays on screen', () => {
  const short = { width: 1280, height: 100 };
  const tip = placeTip(anchorAt(500, 30, 20, 20), size, short);
  assert.equal(tip.side, 'bottom');
  assert.ok(tip.y >= 8 && tip.y + size.height <= short.height - 8);
});

test('a popover never leaves the viewport, wherever the trigger is', () => {
  for (let left = -40; left <= view.width + 40; left += 97) {
    for (let top = -40; top <= view.height + 40; top += 61) {
      const tip = placeTip(anchorAt(left, top), size, view);
      assert.ok(tip.x >= 8 && tip.x + size.width <= view.width - 8, `x ${tip.x} at ${left},${top}`);
      assert.ok(tip.y >= 8 && tip.y + size.height <= view.height - 8, `y ${tip.y} at ${left},${top}`);
      assert.ok(tip.arrow >= 16 && tip.arrow <= size.width - 16, `arrow ${tip.arrow} at ${left},${top}`);
    }
  }
});

test('an agenda entry jumps to the first slide of its chapter', () => {
  const slides = [
    { n: 1, chapter: { id: 'opening' } },
    { n: 2, chapter: { id: 'opening' } },
    { n: 3, chapter: { id: 'copilot' } },
    { n: 4, chapter: { id: 'copilot' } },
    { n: 5 },
  ];
  assert.equal(chapterStart(slides, 'opening'), 1);
  assert.equal(chapterStart(slides, 'copilot'), 3);
});

test('an unknown or empty chapter jumps nowhere', () => {
  assert.equal(chapterStart([{ n: 1, chapter: { id: 'opening' } }], 'security'), 0);
  assert.equal(chapterStart([], 'opening'), 0);
});

test('the count-up starts at zero, ends on the real total and never runs backwards', () => {
  assert.equal(tally(32, 0), 0);
  assert.equal(tally(32, 1), 32);
  let last = -1;
  for (let step = 0; step <= 100; step += 1) {
    const value = tally(1000, step / 100);
    assert.ok(value >= last, `went backwards at ${step}%`);
    last = value;
  }
});

test('the count-up eases out and tolerates out-of-range progress', () => {
  assert.ok(tally(1000, 0.25) > 250, 'first quarter should cover more than a quarter');
  assert.equal(tally(1000, -1), 0);
  assert.equal(tally(1000, 2), 1000);
});

// A clip-path that moves on large headline text crashed the renderer when a fast scroll came back up over slides
// that had already built. Headlines move on transform and opacity only.
test('slide motion never animates clip-path', async () => {
  const motion = await readFile(new URL('../web/js/motion.mjs', import.meta.url), 'utf8');
  const css = await readFile(new URL('../web/css/deck.css', import.meta.url), 'utf8');
  assert.doesNotMatch(motion, /clipPath\s*:/, 'motion.mjs keyframes must not include clipPath');
  assert.doesNotMatch(css, /clip-path\s*:/, 'deck.css must not use clip-path');
});
