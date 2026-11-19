// URL hash routing. The whole viewer state that matters (edition, view, period, filters, search, slide) lives in the hash,
// so any state can be shared as a link and the browser's back/forward buttons work.
//   #/<view>/<key>?ref=<edition>&s=<sections>&q=<text>&f=<item id>&present=<slide>&print=1
import { VIEWS } from './briefing.mjs';

const ID = /^[A-Za-z0-9._-]+$/;
const SECTION_ID = /^[a-z0-9-]+$/;

const decode = (text) => { try { return decodeURIComponent(text); } catch { return ''; } };

export function parseHash(hash) {
  const raw = String(hash || '').replace(/^#\/?/, '');
  const at = raw.indexOf('?');
  const path = at < 0 ? raw : raw.slice(0, at);
  const params = new URLSearchParams(at < 0 ? '' : raw.slice(at + 1));
  const [view, key] = path.split('/').map(decode);
  const slide = Number.parseInt(params.get('present') || '', 10);
  const ref = params.get('ref') || '';
  const focus = params.get('f') || '';
  return {
    view: VIEWS.includes(view) ? view : null,
    key: key || null,
    ref: ID.test(ref) ? ref : null,
    sections: new Set((params.get('s') || '').split(',').filter((id) => SECTION_ID.test(id))),
    q: (params.get('q') || '').slice(0, 200),
    focus: ID.test(focus) ? focus : null,
    present: Number.isInteger(slide) && slide > 0 ? slide : null,
    print: params.get('print') === '1',
  };
}

export function buildHash({ view, key, ref, sections, q, focus, present, print }) {
  const params = new URLSearchParams();
  if (ref && ref !== 'main') params.set('ref', ref);
  if (sections && sections.size) params.set('s', [...sections].sort().join(','));
  if (q) params.set('q', q);
  if (focus) params.set('f', focus);
  if (present) params.set('present', String(present));
  if (print) params.set('print', '1');
  const query = params.toString().replace(/%2C/g, ',');
  return `#/${view}${key ? `/${encodeURIComponent(key)}` : ''}${query ? `?${query}` : ''}`;
}
