import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { canonicalUrl } from './claims.mjs';

const exec = promisify(execFile);
const MAX_BYTES = 8 * 1024 * 1024;
const TIMEOUT_MS = 35_000;
const REDIRECTS = new Set([301, 302, 303, 307, 308]);

function siteRoot(input) {
  const host = new URL(input).hostname.toLowerCase();
  return [...['githubusercontent.com', 'githubassets.com', 'visualstudio.microsoft.com', 'githubcopilotdevdays.com',
    'msbuild.microsoft.com', 'build.microsoft.com', 'githubuniverse.com', 'githubnext.com', 'github.blog',
    'github.com', 'visualstudio.com', 'microsoft.com', 'azure.com', 'jetbrains.com', 'eclipse.org',
    'apple.com', 'openai.com', 'anthropic.com', 'google.com', 'aka.ms', 'kubecon.io', 'cncf.io',
    'linuxfoundation.org', 'opensource.org', 'ghe.com', 'gh.io', 'git-scm.com', 'npmjs.com',
    'python.org', 'nodejs.org', 'rust-lang.org', 'github.dev']]
    .sort((a, b) => b.length - a.length)
    .find((domain) => host === domain || host.endsWith(`.${domain}`)) || null;
}

function checkedRedirect(from, location) {
  const redirect = new URL(location, from);
  const canonical = canonicalUrl(redirect.href);
  if (!siteRoot(from) || siteRoot(from) !== siteRoot(canonical)) throw new Error('Source redirected outside its approved publisher domain.');
  redirect.hash = '';
  return redirect.href;
}

const NAMED_ENTITIES = {
  nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  sbquo: '‚', bdquo: '„', mdash: '—', ndash: '–', hellip: '…', middot: '·', bull: '•', trade: '™', reg: '®', copy: '©',
  times: '×', rarr: '→', larr: '←', harr: '↔', uarr: '↑', darr: '↓', deg: '°', plusmn: '±', laquo: '«', raquo: '»',
  prime: '′', Prime: '″', shy: '', zwj: '', zwnj: '', ensp: ' ', emsp: ' ', thinsp: ' ',
};

// Single pass so "&amp;lt;" decodes to "&lt;" rather than "<".
function decodeHtml(text) {
  return text.replace(/&(#x[0-9a-f]{1,6}|#\d{1,7}|[a-z][a-z0-9]{1,15});/gi, (whole, ref) => {
    if (ref[0] === '#') {
      const code = ref[1] === 'x' || ref[1] === 'X' ? Number.parseInt(ref.slice(2), 16) : Number(ref.slice(1));
      if (code === 160) return ' ';
      return Number.isInteger(code) && code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : whole;
    }
    return Object.hasOwn(NAMED_ENTITIES, ref) ? NAMED_ENTITIES[ref] : whole;
  });
}

function htmlToText(html) {
  return decodeHtml(String(html)
    .replace(/<(script|style|noscript|svg|iframe)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<(br|hr)\b[^>]*>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr|section|article|blockquote)>/gi, '\n')
    .replace(/<[^>]*>/g, ' '))
    .replace(/[ \t]+/g, ' ').replace(/\n\s+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function pageTitle(html) {
  const m = String(html).match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeHtml(m[1].replace(/<[^>]*>/g, '').trim()) : '';
}

async function directFetch(url, fetchImpl) {
  let current = url;
  for (let hop = 0; hop <= 5; hop += 1) {
    const response = await fetchImpl(current, {
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'User-Agent': 'GitHub-TUB/1.0 (+source attribution; public pages only)', Accept: 'text/html,application/xhtml+xml,text/plain' },
    });
    if (REDIRECTS.has(response.status)) {
      const location = response.headers.get('location');
      await response.body?.cancel();
      if (!location) throw new Error(`Source returned redirect ${response.status} without a Location header.`);
      if (hop === 5) throw new Error('Source exceeded the five-redirect limit.');
      current = checkedRedirect(current, location);
      continue;
    }
    if (!response.ok) throw Object.assign(new Error(`Source server returned HTTP ${response.status}.`), { status: response.status });
    const type = response.headers.get('content-type') || '';
    if (Number(response.headers.get('content-length') || 0) > MAX_BYTES) throw new Error('Source response exceeds the 8 MiB limit.');
    const body = await response.text();
    if (Buffer.byteLength(body) > MAX_BYTES) throw new Error('Source response exceeds the 8 MiB limit.');
    return {
      url: current, status: response.status, title: pageTitle(body), text: /html/i.test(type) ? htmlToText(body) : body,
      via: 'html', contentType: type,
    };
  }
  throw new Error('Source exceeded the five-redirect limit.');
}

async function curlFetch(url, fetchError) {
  try {
    let current = url;
    for (let hop = 0; hop <= 5; hop += 1) {
    const { stdout } = await exec('curl.exe', [
      '--silent', '--show-error', '--max-time', '30',
      '--max-filesize', String(MAX_BYTES), '--user-agent', 'GitHub-TUB/1.0 (+source attribution; public pages only)',
      '--write-out', '\nTUB_STATUS:%{http_code}\nTUB_URL:%{url_effective}\nTUB_REDIRECT:%{redirect_url}',
      current,
    ], { windowsHide: true, maxBuffer: MAX_BYTES + 32 * 1024 });
    const statusMatch = stdout.match(/\nTUB_STATUS:(\d{3})\nTUB_URL:([^\r\n]+)\nTUB_REDIRECT:([^\r\n]*)\s*$/);
    if (!statusMatch) throw new Error('curl did not return an HTTP status and final URL.');
    const raw = stdout.slice(0, statusMatch.index);
    const status = Number(statusMatch[1]);
    if (REDIRECTS.has(status)) {
      if (hop === 5) throw new Error('Source exceeded the five-redirect limit.');
      if (!statusMatch[3]) throw new Error(`Source returned redirect ${status} without a Location header.`);
      current = checkedRedirect(current, statusMatch[3]);
      continue;
    }
    if (status < 200 || status >= 300) throw new Error(`Source server returned HTTP ${status}.`);
    const title = pageTitle(raw);
    return { url: current, status, title, text: htmlToText(raw), via: 'curl', contentType: 'text/html' };
    }
    throw new Error('Source exceeded the five-redirect limit.');
  } catch (curlError) {
    throw new AggregateError([fetchError, curlError], 'Direct source fetch failed.');
  }
}

async function firecrawlFetch(url, fetchImpl) {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  const response = await fetchImpl('https://api.firecrawl.dev/v2/scrape', {
    method: 'POST',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: {
      'content-type': 'application/json',
      ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({ url, formats: ['markdown'], onlyMainContent: true }),
  });
  if (!response.ok) throw new Error(`Firecrawl returned HTTP ${response.status}.`);
  const payload = await response.json();
  if (payload.success !== true || typeof payload.data?.markdown !== 'string') throw new Error('Firecrawl did not return a successful markdown scrape.');
  const metadata = payload.data.metadata || {};
  const status = Number(metadata.statusCode);
  if (!Number.isInteger(status) || status < 200 || status >= 300) throw new Error(`Source page returned HTTP ${metadata.statusCode ?? 'unknown'} through Firecrawl.`);
  const text = payload.data.markdown.trim();
  if (!text || Buffer.byteLength(text) > MAX_BYTES) throw new Error('Firecrawl result is empty or exceeds the 8 MiB limit.');
  const finalUrl = canonicalUrl(metadata.sourceURL || url);
  if (siteRoot(url) !== siteRoot(finalUrl)) throw new Error('Firecrawl resolved the source outside its approved publisher domain.');
  return {
    url: finalUrl,
    status,
    title: metadata.title || '',
    text,
    via: 'firecrawl',
    contentType: metadata.contentType || 'text/markdown',
  };
}

export async function fetchSource(input, { fetchImpl = globalThis.fetch, curlImpl = curlFetch, preferFirecrawl = false } = {}) {
  const url = canonicalUrl(input);
  if (typeof fetchImpl !== 'function') throw new Error('No Fetch API is available in this Node runtime.');
  if (preferFirecrawl) return firecrawlFetch(url, fetchImpl);
  try {
    try { return await directFetch(url, fetchImpl); }
    catch (fetchError) {
      if (!curlImpl) throw fetchError;
      return await curlImpl(url, fetchError);
    }
  } catch (directError) {
    if (!process.env.FIRECRAWL_API_KEY) throw directError;
    try { return await firecrawlFetch(url, fetchImpl); }
    catch (firecrawlError) { throw new AggregateError([directError, firecrawlError], `Could not ingest ${url} through direct fetch or Firecrawl.`); }
  }
}

export { decodeHtml, htmlToText, pageTitle };
