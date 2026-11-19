// Tiny DOM helpers. Content is scraped text, so nothing here ever uses innerHTML: strings become text nodes.
import { ICONS } from './icons.mjs';

const SVG_NS = 'http://www.w3.org/2000/svg';

function applyProps(node, props) {
  for (const [key, value] of Object.entries(props || {})) {
    if (value === undefined || value === null || value === false) continue;
    if (key === 'class') node.setAttribute('class', Array.isArray(value) ? value.filter(Boolean).join(' ') : value);
    else if (key === 'style' && typeof value === 'object') {
      for (const [name, v] of Object.entries(value)) {
        if (v === undefined || v === null || v === false) continue;
        // Custom properties (--c, --ink) only take effect through setProperty.
        if (name.startsWith('--')) node.style.setProperty(name, String(v));
        else node.style[name] = v;
      }
    } else if (key === 'dataset') Object.assign(node.dataset, value);
    else if (key.startsWith('on') && typeof value === 'function') node.addEventListener(key.slice(2).toLowerCase(), value);
    else if (key === 'text') node.textContent = value;
    else if (value === true) node.setAttribute(key, '');
    else node.setAttribute(key, String(value));
  }
  return node;
}

function append(node, kids) {
  for (const kid of kids) {
    if (kid === null || kid === undefined || kid === false) continue;
    if (Array.isArray(kid)) append(node, kid);
    else if (kid instanceof Node) node.appendChild(kid);
    else node.appendChild(document.createTextNode(String(kid)));
  }
  return node;
}

export function h(tag, props, ...kids) {
  const node = document.createElement(tag);
  applyProps(node, props);
  return append(node, kids);
}

export function s(tag, props, ...kids) {
  const node = document.createElementNS(SVG_NS, tag);
  applyProps(node, props);
  return append(node, kids);
}

export function icon(name, { size = 16, cls = '', label = '' } = {}) {
  const def = ICONS[name];
  const svg = s('svg', {
    class: ['octicon', cls],
    width: size,
    height: size,
    viewBox: `0 0 ${def?.w || 16} ${def?.h || 16}`,
    fill: 'currentColor',
    'aria-hidden': label ? undefined : 'true',
    role: label ? 'img' : undefined,
    'aria-label': label || undefined,
  });
  if (def) for (const p of def.paths) svg.appendChild(s('path', p));
  return svg;
}

export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
  return node;
}

export function mount(node, ...kids) {
  clear(node);
  return append(node, kids);
}

export const fmtNum = (n) => new Intl.NumberFormat('en-US').format(n);
export const plural = (n, one, many = `${one}s`) => `${fmtNum(n)} ${n === 1 ? one : many}`;

// The first sentences of a longer text, for summary cards and slides.
export function lead(text, max) {
  const t = String(text || '').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  return stop > max * 0.5 ? cut.slice(0, stop + 1) : `${cut.replace(/\s+\S*$/, '')}…`;
}

// Hostname + path, trimmed, for "Source" lines.
export function shortUrl(url) {
  try {
    const u = new URL(url);
    const p = u.pathname.replace(/\/$/, '');
    const s2 = `${u.hostname.replace(/^www\./, '')}${p}`;
    return s2.length > 64 ? `${s2.slice(0, 61)}…` : s2;
  } catch { return url; }
}

export function safeUrl(url) {
  try { return new URL(url).protocol === 'https:' ? url : null; } catch { return null; }
}

export function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
