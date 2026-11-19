// Pure date/period helpers shared by the build tools (Node) and the viewer (browser).
// All dates are plain ISO strings (YYYY-MM-DD) interpreted as UTC calendar days.

export const DAY = 86400000;
export const YEAR_START = '2026-01-01';

export const parse = (s) => new Date(`${s}T00:00:00Z`);
export const fmt = (d) => d.toISOString().slice(0, 10);
export const addDays = (s, n) => fmt(new Date(parse(s).getTime() + n * DAY));
export const diffDays = (a, b) => Math.round((parse(a).getTime() - parse(b).getTime()) / DAY);
export const dow = (s) => parse(s).getUTCDay();
export const isDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(parse(s).getTime()) && fmt(parse(s)) === s;
export const maxDate = (a, b) => (a > b ? a : b);
export const minDate = (a, b) => (a < b ? a : b);

export function monthOf(s) { return s.slice(0, 7); }
export function quarterOf(s) { return `${s.slice(0, 4)}-Q${Math.floor((Number(s.slice(5, 7)) - 1) / 3) + 1}`; }

export function monthRange(ym) {
  const [y, m] = ym.split('-').map(Number);
  return { start: `${ym}-01`, end: fmt(new Date(Date.UTC(y, m, 0))) };
}

export function quarterRange(q) {
  const y = Number(q.slice(0, 4)); const n = Number(q.slice(6));
  return { start: fmt(new Date(Date.UTC(y, (n - 1) * 3, 1))), end: fmt(new Date(Date.UTC(y, n * 3, 0))) };
}

export function yearRange(y) { return { start: `${y}-01-01`, end: `${y}-12-31` }; }

// A TUB week ends on the edition date (a Thursday) and spans the previous seven days.
export function weekRange(editionDate, floor = YEAR_START) {
  return { start: maxDate(addDays(editionDate, -6), floor), end: editionDate };
}

// The edition-aligned week (Friday → Thursday) that ends on or after `date`.
export function weekEndingFor(date, anchor = YEAR_START) {
  const r = ((diffDays(date, anchor) % 7) + 7) % 7;
  return r === 0 ? date : addDays(date, 7 - r);
}

export function editionDates(from = YEAR_START, to) {
  const out = [];
  for (let d = from; d <= to; d = addDays(d, 7)) out.push(d);
  return out;
}

export function inRange(date, range) { return date >= range.start && date <= range.end; }

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));

export function longDate(s) {
  const d = parse(s);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export function shortDate(s) {
  const d = parse(s);
  return `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

export function rangeLabel(r) {
  const a = parse(r.start); const b = parse(r.end);
  const sameYear = a.getUTCFullYear() === b.getUTCFullYear();
  if (a.getUTCMonth() === b.getUTCMonth() && sameYear) return `${MONTHS_SHORT[a.getUTCMonth()]} ${a.getUTCDate()}–${b.getUTCDate()}, ${b.getUTCFullYear()}`;
  return `${shortDate(r.start)} – ${sameYear ? `${shortDate(r.end)}, ${b.getUTCFullYear()}` : longDate(r.end)}`;
}

export function monthLabel(ym) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

// "Oct 26–30", "Oct 30 – Nov 5": a range without the year, for lists inside one period.
export function compactRange(a, b) {
  if (a === b) return shortDate(a);
  const [ya, ma, da] = a.split('-'); const [yb, mb, db] = b.split('-');
  if (ya === yb && ma === mb) return `${MONTHS_SHORT[Number(ma) - 1]} ${Number(da)}–${Number(db)}`;
  return `${shortDate(a)} – ${shortDate(b)}`;
}

// A period is { view: 'week'|'month'|'year', key } where key is the week-ending date, YYYY-MM, or YYYY.
export function periodRange(view, key, floor = YEAR_START) {
  if (view === 'week') return weekRange(key, floor);
  if (view === 'month') return monthRange(key);
  return yearRange(key);
}

export function periodFor(view, date, anchor = YEAR_START) {
  if (view === 'week') return weekEndingFor(date, anchor);
  if (view === 'month') return monthOf(date);
  return date.slice(0, 4);
}
