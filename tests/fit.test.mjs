import test from 'node:test';
import assert from 'node:assert/strict';
import { fitSlides } from '../web/js/slides.mjs';

// A stand-in for a [data-fit] block. Its text wraps to `lines(size)` lines. `box` fixes the height; otherwise the box hugs
// the line boxes. `overhang` is how far (in em) each line's font box pokes out of a line box set tighter than the font.
function block({ base, lineHeight, lines, box, overhang = 0 }) {
  const size = (el) => parseFloat(el.style.fontSize) || base;
  const text = (el) => lines(size(el)) * size(el) * lineHeight;
  return {
    style: { fontSize: '' },
    dataset: {},
    clientWidth: 400,
    scrollWidth: 400,
    get clientHeight() { return Math.round(box ?? text(this)); },
    get scrollHeight() { return Math.round(text(this) + overhang * size(this)); },
    get size() { return size(this); },
  };
}

globalThis.getComputedStyle = (el) => ({ fontSize: `${el.size}px` });
const fit = (...els) => fitSlides({ querySelectorAll: () => els });

test('a card body whose last line is cut by the box shrinks until the line is whole', () => {
  // The BYOK highlight card: three 17px lines at 1.45 are 74px tall inside a 70px box, which slices the descenders.
  const body = block({ base: 17, lineHeight: 1.45, lines: () => 3, box: 70 });
  assert.equal(body.scrollHeight - body.clientHeight, 4);
  fit(body);
  assert.equal(body.style.fontSize, '16px');
  assert.ok(body.scrollHeight - body.clientHeight <= 1);
});

test('a heading whose font box overhangs tight line boxes is left alone', () => {
  for (const base of [48, 40, 32]) {
    const title = block({ base, lineHeight: 1.12, lines: () => 2, overhang: 0.138 });
    assert.ok(title.scrollHeight - title.clientHeight >= 4, 'the overhang is measurable');
    fit(title);
    assert.equal(title.style.fontSize, '', `${base}px keeps its size`);
  }
});

test('text that cannot fit stops shrinking at 12px', () => {
  const body = block({ base: 21, lineHeight: 1.45, lines: () => 50, box: 70 });
  fit(body);
  assert.equal(body.style.fontSize, '12px');
});

test('fitting again starts from the original size', () => {
  let count = 6;
  const body = block({ base: 21, lineHeight: 1.45, lines: () => count, box: 90 });
  fit(body);
  assert.notEqual(body.style.fontSize, '');
  count = 2;
  fit(body);
  assert.equal(body.style.fontSize, '', 'the base size comes back once the text fits');
});
