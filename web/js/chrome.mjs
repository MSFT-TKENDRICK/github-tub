// Persistent chrome: header (edition picker, Week/Month/Year tabs, period navigation, search, actions), the popover used
// by both pickers, the context banner and the live-region announcer. The header is built once and updated in place so
// typing in the search box never loses focus.
import { h, icon, mount, debounce, fmtNum, plural } from './dom.mjs';
import { currentKey, itemsIn, keysFor, narrativeFor, periodLabel, rangeOf } from './briefing.mjs';
import { longDate, monthLabel, shortDate } from './periods.mjs';

const VIEW_TABS = [['week', 'Week'], ['month', 'Month'], ['year', 'Year']];
const VIEW_NOUN = { week: 'week', month: 'month', year: 'year' };

// ---- popover ----------------------------------------------------------------------------------------------------

let active = null;

export function closePopover(returnFocus = false) {
  if (active) active.close(returnFocus);
}

/**
 * groups: [{ label, options: [{ id, title, sub?, badge?, meta?: string[] }] }]
 * Keyboard: arrows/Home/End move, Enter/Space choose, Esc closes and returns focus to the trigger, Tab closes.
 */
function openPopover({ trigger, title, subtitle, groups, selected, onSelect }) {
  closePopover();
  const list = h('div', { class: 'panel__list', role: 'listbox', 'aria-label': title });
  const options = [];
  for (const group of groups) {
    const wrap = h('div', { role: 'group', 'aria-label': group.label || title });
    if (group.label) wrap.appendChild(h('div', { class: 'panel__group', 'aria-hidden': 'true' }, group.label));
    for (const o of group.options) {
      const isSelected = o.id === selected;
      const btn = h('button', { class: 'opt', type: 'button', role: 'option', 'aria-selected': String(isSelected), tabindex: '-1', 'data-id': o.id },
        h('span', { class: 'opt__title' }, o.title, o.badge && h('span', { class: 'pill pill--live' }, o.badge), isSelected && icon('check', { size: 14, cls: 'opt__check' })),
        o.sub && h('span', { class: 'opt__sub' }, o.sub),
        o.meta?.length > 0 && h('span', { class: 'opt__meta' }, o.meta.map((m) => h('span', null, m))));
      btn.addEventListener('click', () => { close(true); onSelect(o.id); });
      options.push(btn);
      wrap.appendChild(btn);
    }
    list.appendChild(wrap);
  }
  const panel = h('div', { class: 'panel' }, h('div', { class: 'panel__head' }, h('h2', null, title), subtitle && h('p', null, subtitle)), list);
  document.body.appendChild(panel);

  const place = () => {
    const r = trigger.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const below = vh - r.bottom - 18;
    const above = r.top - 18;
    const up = below < 260 && above > below;
    panel.style.maxHeight = `${Math.max(180, Math.min(600, up ? above : below))}px`;
    panel.style.left = `${Math.min(Math.max(12, r.left), Math.max(12, vw - panel.offsetWidth - 12))}px`;
    panel.style.top = up ? `${Math.max(12, r.top - 6 - panel.offsetHeight)}px` : `${r.bottom + 6}px`;
  };
  const onDown = (e) => { if (!panel.contains(e.target) && !trigger.contains(e.target)) close(false); };
  const onKey = (e) => {
    const at = options.indexOf(document.activeElement);
    const focusAt = (i) => { const o = options[Math.max(0, Math.min(options.length - 1, i))]; options.forEach((x) => x.setAttribute('tabindex', x === o ? '0' : '-1')); o.focus(); };
    if (e.key === 'ArrowDown') { e.preventDefault(); focusAt(at + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusAt(at - 1); }
    else if (e.key === 'Home') { e.preventDefault(); focusAt(0); }
    else if (e.key === 'End') { e.preventDefault(); focusAt(options.length - 1); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); }
    else if (e.key === 'Tab') close(true);
  };
  function close(returnFocus) {
    if (active?.panel !== panel) return;
    active = null;
    document.removeEventListener('pointerdown', onDown, true);
    window.removeEventListener('resize', place);
    window.removeEventListener('scroll', place, true);
    panel.remove();
    trigger.setAttribute('aria-expanded', 'false');
    if (returnFocus) trigger.focus();
  }
  active = { panel, close };
  trigger.setAttribute('aria-expanded', 'true');
  panel.addEventListener('keydown', onKey);
  document.addEventListener('pointerdown', onDown, true);
  window.addEventListener('resize', place);
  window.addEventListener('scroll', place, true);
  place();

  const start = options.find((o) => o.getAttribute('aria-selected') === 'true') || options[0];
  if (start) {
    start.setAttribute('tabindex', '0');
    const dy = start.getBoundingClientRect().top - list.getBoundingClientRect().top;
    list.scrollTop += dy - list.clientHeight / 2 + start.offsetHeight / 2;
    start.focus({ preventScroll: true });
  }
}

// ---- header -----------------------------------------------------------------------------------------------------

export function createChrome(handlers) {
  const header = document.getElementById('header');
  const panel = document.getElementById('panel');
  let state = null;

  const editionMain = h('span', null, 'Edition');
  const editionSub = h('small', null, '');
  const editionBtn = h('button', {
    class: 'btn picker__btn picker__btn--tall', type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-label': 'Choose edition',
    onclick: () => (active ? closePopover() : openEditions()),
  }, icon('history', { size: 16 }), h('span', { class: 'picker__main' }, editionMain, editionSub), icon('chevron-down', { size: 16 }));

  const presentBtn = h('button', { class: 'btn', type: 'button', onclick: (e) => handlers.present({ zoom: e.detail > 0 }) }, icon('screen-full', { size: 16 }), 'Present');
  let exportMenu;
  const exportPdf = h('button', { class: 'export__item', type: 'button', role: 'menuitem', onclick: () => { exportMenu.open = false; handlers.exportPdf(); } }, 'Export as PDF');
  const exportPptx = h('button', { class: 'export__item', type: 'button', role: 'menuitem', onclick: () => { exportMenu.open = false; handlers.exportPptx(); } }, 'Export as PowerPoint');
  exportMenu = h('details', { class: 'export' },
    h('summary', { class: 'btn', 'aria-haspopup': 'menu' }, icon('download', { size: 16 }), 'Export', icon('chevron-down', { size: 14 })),
    h('div', { class: 'export__menu', role: 'menu', 'aria-label': 'Export briefing' }, exportPdf, exportPptx));
  const themeBtn = h('button', { class: 'btn btn--icon', type: 'button', onclick: () => handlers.toggleTheme() });

  const tabs = VIEW_TABS.map(([id, label]) => h('button', {
    role: 'tab', id: `tab-${id}`, 'aria-controls': 'panel', 'aria-selected': 'false', tabindex: '-1', 'data-view': id,
    onclick: () => handlers.setView(id),
    onkeydown: (e) => {
      const i = VIEW_TABS.findIndex(([v]) => v === id);
      const to = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? VIEW_TABS.length - 1 : null;
      if (to === null) return;
      e.preventDefault();
      const target = (to + VIEW_TABS.length) % VIEW_TABS.length;
      handlers.setView(VIEW_TABS[target][0]);
      tabs[target].focus();
    },
  }, label));
  const seg = h('div', { class: 'seg', role: 'tablist', 'aria-label': 'Time range' }, tabs);

  const prevBtn = h('button', { class: 'btn btn--icon', type: 'button', onclick: () => handlers.step(-1) }, icon('chevron-left', { size: 16 }));
  const nextBtn = h('button', { class: 'btn btn--icon', type: 'button', onclick: () => handlers.step(1) }, icon('chevron-right', { size: 16 }));
  const periodText = h('span', null, '');
  const periodBtn = h('button', {
    class: 'btn period__label', type: 'button', 'aria-haspopup': 'listbox', 'aria-expanded': 'false',
    onclick: () => (active ? closePopover() : openPeriods()),
  }, icon('calendar', { size: 16 }), periodText, icon('chevron-down', { size: 16 }));
  const periodStatic = h('strong', { class: 'period__label', hidden: true }, '');
  const latestBtn = h('button', { class: 'btn btn--sm', type: 'button', hidden: true, onclick: () => handlers.goCurrent() }, 'Latest');

  const input = h('input', {
    type: 'text', placeholder: 'Search updates', autocomplete: 'off', spellcheck: 'false', 'aria-label': 'Search all updates', 'aria-keyshortcuts': '/',
  });
  const clearBtn = h('button', { class: 'search__clear', type: 'button', 'aria-label': 'Clear search', hidden: true }, icon('x', { size: 14 }));
  const send = debounce(() => handlers.search(input.value.trim()), 160);
  input.addEventListener('input', () => { clearBtn.hidden = !input.value; send(); });
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (input.value) { input.value = ''; clearBtn.hidden = true; handlers.search(''); } else input.blur();
  });
  clearBtn.addEventListener('click', () => { input.value = ''; clearBtn.hidden = true; handlers.search(''); input.focus(); });
  const search = h('div', { class: 'search', role: 'search' }, icon('search', { size: 16 }), input, clearBtn);

  mount(header,
    h('div', { class: 'header__bar theme-dark' },
      h('div', { class: 'header__row' },
        h('div', { class: 'brand' },
          h('span', { class: 'brand__mark' }, icon('mark-github', { size: 32 })),
          h('div', { class: 'brand__text' }, h('span', { class: 'brand__title' }, 'Technical Update Briefing'), h('span', { class: 'brand__sub' }, 'GitHub and GitHub Copilot'))),
        h('div', { class: 'actions' }, h('div', { class: 'picker' }, editionBtn), presentBtn, exportMenu, themeBtn))),
    h('div', { class: 'header__tools' },
      h('div', { class: 'header__row' },
        seg,
        h('div', { class: 'period' }, prevBtn, periodBtn, periodStatic, nextBtn),
        latestBtn,
        h('span', { class: 'spacer' }),
        search)));

  const paintTheme = () => {
    const dark = window.__tubTheme?.current?.() === 'dark';
    mount(themeBtn, icon(dark ? 'sun' : 'moon', { size: 16 }));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeBtn.title = themeBtn.getAttribute('aria-label');
  };
  paintTheme();
  new MutationObserver(paintTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // ---- pickers

  function openEditions() {
    if (!state?.editions?.length) return;
    const { editions, snap } = state;
    const selectedRef = snap.isLatest ? 'main' : snap.tag || snap.ref;
    const groups = [];
    for (const e of editions) {
      const label = monthLabel(e.asof.slice(0, 7));
      let g = groups.at(-1);
      if (!g || g.label !== label) { g = { label, options: [] }; groups.push(g); }
      g.options.push({
        id: e.isLatest ? 'main' : e.ref,
        title: `Edition ${e.edition} · ${longDate(e.asof)}`,
        badge: e.isLatest ? 'Latest · main' : null,
        sub: [e.tag, e.short && e.short !== 'working' ? e.short : null].filter(Boolean).join(' · ') || 'Working copy',
        meta: e.added != null ? [`+${fmtNum(e.added)} new`] : [],
      });
    }
    openPopover({
      trigger: editionBtn, title: 'Choose an edition',
      subtitle: 'Each edition is a dated commit on main. Open an earlier one to see the briefing as it stood then.',
      groups, selected: selectedRef, onSelect: (id) => handlers.selectEdition(id),
    });
  }

  function openPeriods() {
    if (!state?.idx) return;
    const { idx, view, key, sections } = state;
    const keys = [...keysFor(idx, view)].reverse();
    const groups = [];
    for (const k of keys) {
      const range = rangeOf(idx, view, k);
      const label = view === 'week' ? monthLabel((range.end).slice(0, 7)) : (view === 'month' ? k.slice(0, 4) : 'Years');
      let g = groups.at(-1);
      if (!g || g.label !== label) { g = { label, options: [] }; groups.push(g); }
      const count = itemsIn(idx, range, sections).length;
      const narrative = narrativeFor(idx, view, k);
      g.options.push({
        id: k, title: periodLabel(view, k, range), sub: narrative?.headline || '',
        meta: [plural(count, 'update')],
      });
    }
    openPopover({
      trigger: periodBtn, title: `Choose a ${VIEW_NOUN[view]}`,
      subtitle: sections.size ? 'Counts reflect the current product-area filter.' : null,
      groups, selected: key, onSelect: (id) => handlers.setKey(id),
    });
  }

  // ---- in-place updates

  function update(next) {
    state = next;
    const { idx, snap, editions, view, key, q } = next;
    const latest = editions?.find((e) => e.isLatest);
    const current = (snap.isLatest && latest) || editions?.find((e) => e.ref === (snap.tag || snap.ref)) || latest;
    const num = snap.edition ?? current?.edition;
    editionMain.textContent = `Edition ${num} · ${shortDate(snap.asof)}`;
    editionSub.textContent = snap.mode === 'git'
      ? `${snap.isLatest ? 'main' : snap.tag} · ${snap.short}`
      : 'Working copy';

    tabs.forEach((t) => {
      const on = t.dataset.view === view;
      t.setAttribute('aria-selected', String(on));
      t.setAttribute('tabindex', on ? '0' : '-1');
    });
    panel.setAttribute('aria-labelledby', `tab-${view}`);

    const keys = keysFor(idx, view);
    const at = keys.indexOf(key);
    const range = rangeOf(idx, view, key);
    const label = periodLabel(view, key, range);
    const single = keys.length <= 1;
    periodBtn.hidden = single;
    periodStatic.hidden = !single;
    periodText.textContent = label;
    periodStatic.textContent = label;
    periodBtn.setAttribute('aria-label', `${VIEW_NOUN[view]}: ${label}. Choose a ${VIEW_NOUN[view]}`);
    prevBtn.disabled = at <= 0;
    nextBtn.disabled = at < 0 || at >= keys.length - 1;
    prevBtn.setAttribute('aria-label', `Previous ${VIEW_NOUN[view]}`);
    nextBtn.setAttribute('aria-label', `Next ${VIEW_NOUN[view]}`);
    prevBtn.title = prevBtn.getAttribute('aria-label');
    nextBtn.title = nextBtn.getAttribute('aria-label');
    latestBtn.hidden = single || key === currentKey(idx, view);
    latestBtn.textContent = `Latest ${VIEW_NOUN[view]}`;

    if (document.activeElement !== input && input.value !== (q || '')) input.value = q || '';
    clearBtn.hidden = !input.value;
    presentBtn.disabled = !!q;
    presentBtn.title = q ? 'Clear the search to present this period' : 'Present this period as slides';
  }

  return {
    update,
    focusSearch() { input.focus(); input.select(); },
    isTyping: () => document.activeElement === input,
  };
}

// ---- banner / status --------------------------------------------------------------------------------------------

export function renderBanner(root, { snap, onLatest }) {
  if (!snap) { mount(root); return; }
  if (snap.mode === 'working') {
    mount(root, h('div', { class: 'banner banner--warn' }, h('div', { class: 'banner__row' },
      icon('alert', { size: 16 }),
      h('span', null, h('strong', null, 'Edition history is unavailable. '), 'This briefing is read from a working folder that is not a git repository, so earlier editions cannot be loaded.'))));
    return;
  }
  if (snap.isLatest) { mount(root); return; }
  mount(root, h('div', { class: 'banner' }, h('div', { class: 'banner__row' },
    icon('history', { size: 16 }),
    h('span', null, h('strong', null, `Viewing Edition ${snap.edition}`), ` as it stood on ${longDate(snap.asof)}.`),
    h('code', null, `${snap.tag} · ${snap.short}`),
    h('button', { class: 'btn', type: 'button', onclick: onLatest }, 'Jump to latest'))));
}

export function announce(text) {
  const el = document.getElementById('status');
  if (el) el.textContent = text;
}

export function restoreFocus(fk) {
  if (!fk) return false;
  const el = document.querySelector(`[data-fk="${CSS.escape(fk)}"]`);
  if (!el) return false;
  el.focus({ preventScroll: true });
  return true;
}
