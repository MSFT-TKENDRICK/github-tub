// Small, dependency-free text helpers shared by the harvester and validators.

const NAMED = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', copy: '©', reg: '®', trade: '™', rarr: '→', larr: '←',
  middot: '·', bull: '•', times: '×', laquo: '«', raquo: '»', zwj: '', zwnj: '',
};

export function decodeEntities(s = '') {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e) => {
    if (e[0] === '#') {
      const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      try { return String.fromCodePoint(code); } catch { return m; }
    }
    const v = NAMED[e.toLowerCase()];
    return v === undefined ? m : v;
  });
}

export function collapse(s = '') {
  return s.replace(/[ \t\f\v\u00a0]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

export function htmlToText(html = '') {
  let s = String(html);
  s = s.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, '');
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|h[1-6]|ul|ol|table|tr|figure|blockquote|pre)>/gi, '\n\n');
  s = s.replace(/<li[^>]*>/gi, '\n- ').replace(/<\/li>/gi, '');
  s = s.replace(/<\/(td|th)>/gi, ' | ');
  s = s.replace(/<[^>]+>/g, '');
  return collapse(decodeEntities(s));
}

export function extractLinks(html = '', base = '') {
  const out = [];
  const seen = new Set();
  for (const m of String(html).matchAll(/<a\s[^>]*href=("|')(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi)) {
    let href = decodeEntities(m[2]).trim();
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) continue;
    try { href = new URL(href, base || undefined).toString(); } catch { continue; }
    if (!/^https:/i.test(href) || seen.has(href)) continue;
    const text = htmlToText(m[3]).replace(/\s+/g, ' ').trim();
    seen.add(href);
    out.push({ text: text.slice(0, 120), href });
  }
  return out;
}

export function extractImages(html = '', base = '') {
  const out = [];
  for (const m of String(html).matchAll(/<img\s[^>]*?src=("|')(.*?)\1[^>]*>/gi)) {
    let src = decodeEntities(m[2]).trim();
    try { src = new URL(src, base || undefined).toString(); } catch { continue; }
    if (/^https:/i.test(src) && !/emoji|gravatar|avatar/i.test(src) && !out.includes(src)) out.push(src);
  }
  return out;
}

export function firstParagraph(text = '', max = 320) {
  const para = text.split(/\n{2,}/).map((p) => p.trim()).find((p) => p.length > 30 && !p.startsWith('- ')) || text.trim();
  return truncate(para.replace(/\s+/g, ' '), max);
}

export function truncate(s = '', max = 300) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sentence = cut.match(/^(.*[.!?])\s/s);
  if (sentence && sentence[1].length > max * 0.55) return sentence[1];
  return cut.replace(/\s+\S*$/, '') + '…';
}

export function mdToText(md = '') {
  let s = String(md);
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<video[\s\S]*?<\/video>/gi, '').replace(/<[^>]+>/g, '');
  s = s.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  s = s.replace(/`([^`]+)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/__([^_]+)__/g, '$1');
  s = s.replace(/^\s*>\s?/gm, '').replace(/^\s*[-*]\s+/gm, '- ');
  return collapse(decodeEntities(s));
}

export function mainText(html = '') {
  const pick = (re) => (String(html).match(re) || [])[0];
  const region = pick(/<article[\s\S]*?<\/article>/i) || pick(/<main[\s\S]*?<\/main>/i) || pick(/<body[\s\S]*?<\/body>/i) || html;
  const cleaned = region.replace(/<(nav|header|footer|aside|form|button)[\s\S]*?<\/\1>/gi, '');
  return { html: cleaned, text: htmlToText(cleaned) };
}

export function xmlTag(block, tag) {
  const m = String(block).match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return m ? decodeEntities(m[1].replace(/^\s*<!\[CDATA\[|\]\]>\s*$/g, '')).trim() : '';
}

export function slugify(s = '') {
  return String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
}

export const iso = (d) => new Date(d).toISOString().slice(0, 10);
