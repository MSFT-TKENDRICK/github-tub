import test from 'node:test';
import assert from 'node:assert/strict';
import { layoutKey, sameLayout } from '../web/js/deck-model.mjs';
import { SWAPS } from '../web/js/motion.mjs';

const slide = (kind, chapter, section, extra = {}) => ({ kind, chapter: { id: chapter }, section, ...extra });

test('consecutive updates of one section share a layout', () => {
  assert.equal(sameLayout(slide('update', 'copilot', 'copilot'), slide('update', 'copilot', 'copilot')), true);
});

test('updates from different sections or chapters never share a layout', () => {
  assert.equal(sameLayout(slide('update', 'copilot', 'copilot'), slide('update', 'vscode', 'vscode')), false);
  assert.equal(sameLayout(slide('update', 'copilot', 'copilot'), slide('update', 'other', 'copilot')), false);
});

test('a divider, an update and the also-shipped list are three different layouts', () => {
  const divider = slide('divider', 'copilot', 'copilot');
  const update = slide('update', 'copilot', 'copilot');
  const list = slide('list', 'copilot', 'copilot');
  assert.equal(sameLayout(divider, update), false);
  assert.equal(sameLayout(update, list), false);
  assert.equal(sameLayout(list, slide('list', 'copilot', 'copilot')), true);
});

test('a compact section list is alone: it has no layout to share', () => {
  const compact = slide('list', 'copilot', 'copilot', { compact: true });
  assert.equal(layoutKey(compact), null);
  assert.equal(sameLayout(compact, slide('list', 'copilot', 'copilot', { compact: true })), false);
});

test('coming up and events share the rows layout; themes and highlights share the cards layout', () => {
  assert.equal(sameLayout(slide('upcoming', 'ahead', undefined), slide('events', 'ahead', undefined)), true);
  assert.equal(sameLayout(slide('themes', 'opening', undefined), slide('highlights', 'opening', undefined)), true);
  assert.equal(sameLayout(slide('highlights', 'opening', undefined), slide('overview', 'opening', undefined)), false);
});

test('missing slides and unknown kinds are not grouped', () => {
  assert.equal(sameLayout(undefined, slide('update', 'a', 'b')), false);
  assert.equal(sameLayout(slide('update', 'a', 'b'), null), false);
  assert.equal(layoutKey(slide('cover', 'opening')), null);
});

test('every grouped layout has a content-swap plan that names the footer number', () => {
  for (const kind of ['update', 'list', 'upcoming', 'events', 'themes', 'highlights']) {
    const key = layoutKey(slide(kind, 'c', 's'));
    assert.ok(SWAPS[key], `no swap plan for ${key}`);
    assert.ok(SWAPS[key].some(([selector]) => selector === '.s-foot__n'), `${key} does not roll the slide number`);
  }
});
