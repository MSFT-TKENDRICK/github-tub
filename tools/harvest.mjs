#!/usr/bin/env node
// Harvests raw source data for the GitHub Technical Update Briefing into data/raw/*.json.
//   node tools/harvest.mjs                       # everything since 2026-01-01
//   node tools/harvest.mjs --only=changelog --since=2026-10-29
// Raw files are merged by id, so incremental weekly runs are cheap and idempotent.
import { execFile } from 'node:child_process';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { decodeEntities, extractImages, extractLinks, firstParagraph, htmlToText, iso, mainText, mdToText, slugify, truncate, xmlTag } from './lib/text.mjs';

const execFileP = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAW = path.join(ROOT, 'data', 'raw');
const UA = 'github-tub-harvester/1.0 (technical update briefing; public sources only)';

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/);
  return m ? [m[1], m[2] ?? true] : [a, true];
}));
const SINCE = args.since || '2026-01-01';
const UNTIL = args.until || iso(Date.now() + 86400000);
const ONLY = args.only ? String(args.only).split(',') : ['changelog', 'blog', 'vscode', 'visualstudio', 'vscode-blog', 'next', 'commandline'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.error('[harvest]', ...a);

// Some corporate networks drop Node's direct sockets to specific hosts while curl.exe still works,
// so a host whose fetch() fails at the network layer is retried (and remembered) via curl.
const curlHosts = new Set();

async function curlGet(url, accept) {
  const stamp = `${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const bodyFile = path.join(tmpdir(), `tub-body-${stamp}`);
  const headFile = path.join(tmpdir(), `tub-head-${stamp}`);
  try {
    const { stdout } = await execFileP('curl.exe', ['-sS', '-L', '--compressed', '--max-time', '90', '-A', UA, '-H', `Accept: ${accept}`, '-D', headFile, '-o', bodyFile, '-w', '%{http_code}', url], { windowsHide: true });
    const status = Number(String(stdout).trim().slice(-3));
    const blocks = (await readFile(headFile, 'utf8').catch(() => '')).split(/\r?\n\r?\n/).filter((b) => b.trim());
    const headers = new Map();
    for (const line of (blocks.at(-1) || '').split(/\r?\n/).slice(1)) {
      const i = line.indexOf(':');
      if (i > 0) headers.set(line.slice(0, i).trim().toLowerCase(), line.slice(i + 1).trim());
    }
    return { status, headers: { get: (k) => headers.get(k.toLowerCase()) ?? null }, text: await readFile(bodyFile, 'utf8') };
  } finally {
    await Promise.all([unlink(bodyFile).catch(() => {}), unlink(headFile).catch(() => {})]);
  }
}

async function http(url, { json = false, tries = 4 } = {}) {
  const host = new URL(url).host;
  const accept = json ? 'application/json' : '*/*';
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      let status; let headers; let text;
      if (curlHosts.has(host)) {
        ({ status, headers, text } = await curlGet(url, accept));
      } else {
        try {
          const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: accept }, signal: AbortSignal.timeout(45000) });
          status = res.status; headers = res.headers; text = await res.text();
        } catch (netErr) {
          log(`fetch failed for ${host} (${netErr.cause?.code || netErr.message}); falling back to curl.exe`);
          curlHosts.add(host);
          ({ status, headers, text } = await curlGet(url, accept));
        }
      }
      if (status === 404) return { status: 404, body: null, headers };
      if (status < 200 || status >= 300) throw new Error(`HTTP ${status}`);
      return { status, body: json ? JSON.parse(text) : text, headers };
    } catch (e) {
      lastErr = e;
      await sleep(800 * (i + 1) ** 2);
    }
  }
  throw new Error(`${url}: ${lastErr?.message}`);
}

async function loadRaw(name) {
  try { return JSON.parse(await readFile(path.join(RAW, `${name}.json`), 'utf8')); } catch { return { items: [] }; }
}

async function saveRaw(name, items, extra = {}) {
  const byId = new Map();
  const prev = await loadRaw(name);
  for (const it of prev.items || []) byId.set(it.id, it);
  for (const it of items) byId.set(it.id, it);
  const merged = [...byId.values()].sort((a, b) => (a.date + a.id).localeCompare(b.date + b.id));
  await mkdir(RAW, { recursive: true });
  await writeFile(path.join(RAW, `${name}.json`), JSON.stringify({ source: name, fetchedAt: new Date().toISOString(), count: merged.length, ...extra, items: merged }, null, 1));
  log(`${name}: wrote ${merged.length} items (${items.length} fetched this run)`);
  return merged;
}

const inRange = (d) => d >= SINCE && d <= UNTIL;

async function wpPages(endpoint, params, base = 'https://github.blog') {
  const all = [];
  for (let page = 1; page < 60; page++) {
    const qs = new URLSearchParams({ per_page: '100', orderby: 'date', order: 'asc', page: String(page), ...params });
    const r = await http(`${base}/wp-json/wp/v2/${endpoint}?${qs}`, { json: true });
    if (r.status === 404 || !Array.isArray(r.body)) break;
    all.push(...r.body);
    const pages = Number(r.headers.get('x-wp-totalpages') || 1);
    log(`${endpoint} page ${page}/${pages} (+${r.body.length})`);
    if (page >= pages) break;
    await sleep(250);
  }
  return all;
}

const shift = (d, days) => iso(new Date(d + 'T12:00:00Z').getTime() + days * 86400000);

async function harvestChangelog() {
  const rows = await wpPages('changelogs', {
    after: `${shift(SINCE, -1)}T00:00:00`, before: `${shift(UNTIL, 1)}T23:59:59`,
    _fields: 'id,date,date_gmt,modified_gmt,link,slug,title,content,class_list',
  });
  const items = [];
  for (const r of rows) {
    const slugDate = (r.link.match(/\/changelog\/(\d{4}-\d{2}-\d{2})-/) || [])[1];
    const date = slugDate || r.date.slice(0, 10);
    if (!inRange(date)) continue;
    const cls = Array.isArray(r.class_list) ? Object.values(r.class_list) : [];
    const pick = (p) => cls.filter((c) => c.startsWith(p)).map((c) => c.slice(p.length));
    const text = htmlToText(r.content.rendered);
    items.push({
      id: `cl-${r.id}`, wpId: r.id, source: 'changelog', date,
      publishedAt: `${r.date_gmt}Z`, modifiedAt: `${r.modified_gmt}Z`,
      title: decodeEntities(htmlToText(r.title.rendered)), url: r.link,
      type: pick('changelog-type-')[0] || '', labels: pick('changelog-label-'),
      lede: firstParagraph(text, 320), text: truncate(text, 4200),
      links: extractLinks(r.content.rendered, r.link).filter((l) => !l.href.startsWith('https://github.blog/changelog/')).slice(0, 8),
      images: extractImages(r.content.rendered, r.link).slice(0, 2),
    });
  }
  return saveRaw('changelog', items, { since: SINCE, until: UNTIL });
}

async function harvestBlog() {
  const cats = new Map();
  for (let p = 1; p < 4; p++) {
    const r = await http(`https://github.blog/wp-json/wp/v2/categories?per_page=100&page=${p}`, { json: true });
    if (!Array.isArray(r.body) || !r.body.length) break;
    r.body.forEach((c) => cats.set(c.id, decodeEntities(c.name)));
    if (r.body.length < 100) break;
  }
  const rows = await wpPages('posts', {
    after: `${shift(SINCE, -1)}T00:00:00`, before: `${shift(UNTIL, 1)}T23:59:59`,
    _fields: 'id,date,date_gmt,modified_gmt,link,slug,title,excerpt,content,categories,jetpack_featured_media_url',
  });
  const items = [];
  for (const r of rows) {
    const date = r.date.slice(0, 10);
    if (!inRange(date)) continue;
    const text = htmlToText(r.content.rendered);
    items.push({
      id: `bl-${r.id}`, wpId: r.id, source: 'blog', date,
      publishedAt: `${r.date_gmt}Z`, modifiedAt: `${r.modified_gmt}Z`,
      title: decodeEntities(htmlToText(r.title.rendered)), url: r.link,
      categories: (r.categories || []).map((c) => cats.get(c)).filter(Boolean),
      lede: truncate(htmlToText(r.excerpt.rendered), 360), text: truncate(text, 4200),
      links: extractLinks(r.content.rendered, r.link).filter((l) => !/^https:\/\/github\.blog\/(?!changelog)/.test(l.href) || /changelog/.test(l.href)).slice(0, 10),
      image: r.jetpack_featured_media_url || '',
    });
  }
  return saveRaw('blog', items, { since: SINCE, until: UNTIL });
}

const VSC_SKIP_H2 = /thank you|contributions? to|notable fixes|engineering|proposed apis|extension authoring|debug adapter protocol|language server protocol/i;

const VSC_MACRO = /\b(?:setting|kbstyle|command|commandId)\(([^)]*)\)/g;

export function parseVscodeNotes(md, version, date) {
  const body = md.replace(/^---[\s\S]*?---\s*/m, '').replace(/<!--[\s\S]*?-->/g, '').replace(VSC_MACRO, '$1');
  const items = [];
  let h2 = ''; let cur = null;
  const flush = () => {
    if (!cur) return;
    const text = mdToText(cur.lines.join('\n'));
    if (text.length > 20 && !VSC_SKIP_H2.test(cur.h2)) {
      items.push({ h2: cur.h2, title: cur.title, text: truncate(text, 1000), links: [...cur.lines.join('\n').matchAll(/\]\((https:[^)\s]+)\)/g)].map((m) => m[1]).slice(0, 4) });
    }
    cur = null;
  };
  for (const line of body.split(/\r?\n/)) {
    const m2 = line.match(/^##\s+(.+?)\s*$/); const m3 = line.match(/^###\s+(.+?)\s*$/);
    if (m2) { flush(); h2 = mdToText(m2[1]); cur = { h2, title: h2, lines: [], isH2: true }; continue; }
    if (m3) { flush(); cur = { h2, title: mdToText(m3[1]).replace(/\s*\(.*?\)\s*$/, (x) => x), lines: [] }; continue; }
    if (cur) cur.lines.push(line);
  }
  flush();
  return items.map((it, i) => ({ ...it, id: `vsc-${version}-${String(i + 1).padStart(2, '0')}`, version, date }));
}

async function harvestVSCode() {
  const prev = await loadRaw('vscode');
  const known = new Set((prev.releases || []).map((r) => r.version));
  const releases = [...(prev.releases || [])];
  const items = [];
  for (let v = 108; v < 400; v++) {
    const version = `1.${v}`;
    const r = await http(`https://raw.githubusercontent.com/microsoft/vscode-docs/main/release-notes/v1_${v}.md`);
    if (r.status === 404) break;
    const fm = (r.body.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
    const g = (k) => ((fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm')) || [])[1] || '').trim().replace(/^"|"$/g, '');
    const date = g('Date'); const edition = (g('ProductEdition') || 'stable').toLowerCase();
    if (edition === 'insiders' || !date || !inRange(date)) continue;
    const parsed = parseVscodeNotes(r.body, version, date);
    items.push(...parsed.map((p) => ({ ...p, source: 'vscode', url: `https://code.visualstudio.com/updates/v1_${v}` })));
    if (!known.has(version)) releases.push({ version, date, url: `https://code.visualstudio.com/updates/v1_${v}`, downloadVersion: g('DownloadVersion'), title: g('PageTitle'), itemCount: parsed.length });
    log(`vscode ${version} ${date}: ${parsed.length} items`);
    await sleep(120);
  }
  return saveRaw('vscode', items, { releases: releases.sort((a, b) => a.date.localeCompare(b.date)) });
}

async function harvestVisualStudio() {
  const base = 'https://devblogs.microsoft.com/visualstudio';
  const cats = new Map();
  const c = await http(`${base}/wp-json/wp/v2/categories?per_page=100&_fields=id,name`, { json: true });
  (c.body || []).forEach((x) => cats.set(x.id, decodeEntities(x.name)));
  const rows = await wpPages('posts', {
    after: `${shift(SINCE, -1)}T00:00:00`, before: `${shift(UNTIL, 1)}T23:59:59`,
    _fields: 'id,date,date_gmt,modified_gmt,link,slug,title,excerpt,content,categories,jetpack_featured_media_url',
  }, base);
  const items = [];
  for (const r of rows) {
    const date = r.date.slice(0, 10);
    if (!inRange(date)) continue;
    items.push({
      id: `vs-${r.id}`, wpId: r.id, source: 'visualstudio', date,
      publishedAt: `${r.date_gmt}Z`, modifiedAt: `${r.modified_gmt}Z`,
      title: decodeEntities(htmlToText(r.title.rendered)), url: r.link,
      categories: (r.categories || []).map((id) => cats.get(id)).filter(Boolean),
      lede: truncate(htmlToText(r.excerpt.rendered), 360), text: truncate(htmlToText(r.content.rendered), 4200),
      links: extractLinks(r.content.rendered, r.link).slice(0, 10),
      image: r.jetpack_featured_media_url || extractImages(r.content.rendered, r.link)[0] || '',
    });
  }
  return saveRaw('visualstudio', items, { since: SINCE, until: UNTIL });
}

async function harvestVSCodeBlog() {
  const feed = (await http('https://code.visualstudio.com/feed.xml')).body;
  const items = [];
  for (const m of feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const b = m[1];
    if (!/<category term="blog"/.test(b)) continue;
    const url = (b.match(/<link href="([^"]+)"\s*\/>/) || [])[1];
    if (!url) continue;
    const urlDate = (url.match(/\/blogs\/(\d{4})\/(\d{2})\/(\d{2})\//) || []).slice(1).join('-');
    const date = urlDate.length === 10 ? urlDate : xmlTag(b, 'updated').slice(0, 10);
    if (!inRange(date)) continue;
    const page = await http(url);
    const { html, text } = mainText(page.body || '');
    const slug = slugify(url.split('/').filter(Boolean).pop());
    items.push({
      id: `vscb-${slug}`, source: 'vscode-blog', date, title: xmlTag(b, 'title'), url,
      lede: firstParagraph(text, 360), text: truncate(text, 4200),
      links: extractLinks(html, url).filter((l) => !/code\.visualstudio\.com\/(blogs|docs)\/?$/.test(l.href)).slice(0, 10),
      image: (b.match(/<link rel="related" href="([^"]+)"/) || [])[1] || extractImages(html, url)[0] || '',
    });
    log(`vscode-blog ${date} ${slug}`);
    await sleep(200);
  }
  return saveRaw('vscode-blog', items, { since: SINCE, until: UNTIL });
}

async function harvestNext() {
  const feed = (await http('https://githubnext.com/rss.xml')).body;
  const items = [];
  for (const m of feed.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const b = m[1];
    const url = xmlTag(b, 'link');
    const date = iso(xmlTag(b, 'pubDate'));
    if (!url || !inRange(date)) continue;
    const kind = (url.match(/githubnext\.com\/([^/]+)\//) || [])[1] || 'other';
    const page = await http(url);
    const { html, text } = mainText(page.body || '');
    items.push({
      id: `next-${kind}-${slugify(url.split('/').filter(Boolean).pop())}`, source: 'next', kind, date,
      title: xmlTag(b, 'title'), url, lede: xmlTag(b, 'description'), text: truncate(text, 4200),
      links: extractLinks(html, url).filter((l) => !/githubnext\.com\/?$/.test(l.href)).slice(0, 10),
      image: (page.body?.match(/<meta property="og:image" content="([^"]+)"/) || [])[1] || '',
    });
    log(`next ${date} ${kind}/${url.split('/').filter(Boolean).pop()}`);
    await sleep(200);
  }
  return saveRaw('next', items, { since: SINCE, until: UNTIL });
}

// Command Line publishes Microsoft engineering writing on every product, so only posts that are about
// GitHub or GitHub Copilot are kept. The WordPress REST API needs a login there; the paged RSS feed does not.
const CMDLINE_COPILOT = /GitHub Copilot|Copilot (?:CLI|coding agent|cloud agent|code review|SDK|Chat)\b/g;

export function commandLineRelevance({ title = '', categories = [], text = '' }) {
  const github = (text.match(/\bGitHub\b/g) || []).length;
  const copilot = (text.match(CMDLINE_COPILOT) || []).length;
  const reasons = [];
  if (/\bGitHub\b/.test(title)) reasons.push('title names GitHub');
  if (categories.includes('GitHub Copilot')) reasons.push('tagged GitHub Copilot');
  if (copilot >= 3) reasons.push(`${copilot} GitHub Copilot mentions`);
  if (github >= 5 && copilot >= 2) reasons.push(`${github} GitHub mentions`);
  return { relevant: reasons.length > 0, reasons, github, copilot };
}

const cdata = (block, tag) => (String(block).match(new RegExp(`<${tag}(?:\\s[^>]*)?>\\s*(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?\\s*</${tag}>`)) || [])[1] || '';

async function harvestCommandLine() {
  const items = [];
  let skipped = 0;
  for (let page = 1; page < 40; page++) {
    const r = await http(`https://commandline.microsoft.com/feed/${page > 1 ? `?paged=${page}` : ''}`);
    if (r.status === 404 || !r.body) break;
    const entries = [...r.body.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
    if (!entries.length) break;
    let older = false;
    for (const b of entries) {
      const url = xmlTag(b, 'link');
      const date = iso(xmlTag(b, 'pubDate'));
      if (date < SINCE) { older = true; continue; }
      if (!url || !inRange(date)) continue;
      const title = decodeEntities(htmlToText(xmlTag(b, 'title'))).replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, '').trim();
      const categories = [...b.matchAll(/<category>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/category>/g)].map((m) => decodeEntities(m[1].trim()));
      const html = cdata(b, 'content:encoded');
      const text = htmlToText(html);
      const relevance = commandLineRelevance({ title, categories, text });
      if (!relevance.relevant) { skipped++; continue; }
      items.push({
        id: `cmd-${slugify(url.split('/').filter(Boolean).pop())}`, source: 'commandline', date,
        publishedAt: new Date(xmlTag(b, 'pubDate')).toISOString(),
        title, url, categories, relevance: relevance.reasons,
        lede: truncate(htmlToText(cdata(b, 'description')), 360) || firstParagraph(text, 360), text: truncate(text, 4200),
        links: extractLinks(html, url).filter((l) => !/commandline\.microsoft\.com\/?(?:$|category|tag|author)/.test(l.href)).slice(0, 10),
        image: extractImages(html, url)[0] || '',
      });
      log(`commandline ${date} ${title} (${relevance.reasons.join('; ')})`);
    }
    if (older) break;
    await sleep(250);
  }
  log(`commandline: ${skipped} posts skipped as not about GitHub`);
  return saveRaw('commandline', items, { since: SINCE, until: UNTIL });
}

const runners = { changelog: harvestChangelog, blog: harvestBlog, vscode: harvestVSCode, visualstudio: harvestVisualStudio, 'vscode-blog': harvestVSCodeBlog, next: harvestNext, commandline: harvestCommandLine };

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  log(`window ${SINCE} → ${UNTIL}; sources: ${ONLY.join(', ')}`);
  for (const name of ONLY) {
    if (!runners[name]) { log(`unknown source ${name}`); continue; }
    try { await runners[name](); } catch (e) { log(`${name} FAILED: ${e.message}`); process.exitCode = 1; }
  }
}
