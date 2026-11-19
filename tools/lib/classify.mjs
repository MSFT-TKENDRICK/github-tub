// Deterministic heuristics for records that curators leave as "minor": section / area / tag, VS Code
// release-note boilerplate detection, brand-safe titles and a conservative "effective date" extractor.
import { rawText } from './raw.mjs';
import { addDays, fmt } from '../../web/js/periods.mjs';

export function brandFix(s = '') {
  return String(s)
    .replace(/\bGit[Hh]ub\s+Co-?[Pp]ilot\b/g, 'GitHub Copilot')
    .replace(/\bGithub\b/g, 'GitHub')
    .replace(/\bV[Ss][Cc]ode\b/g, 'VS Code')
    .replace(/\bVS code\b/g, 'VS Code')
    .replace(/\s+/g, ' ')
    .trim();
}

export function clipTitle(s, max = 130) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
}

const BOILERPLATE = /^(release recap|release highlights|social media|fun!?)$/i;
export function isBoilerplate(r) {
  return r.source === 'vscode' && (BOILERPLATE.test((r.title || '').trim()) || BOILERPLATE.test((r.h2 || '').trim()));
}

const MODEL_NAME = /\b(Claude|GPT[- ]?\d|Gemini|Grok|Sonnet|Opus|Haiku|Codex|Llama|Mistral|Qwen|DeepSeek|Kimi|MAI-Code|Raptor|o[134]-?(?:mini|pro)?)\b/;
const MODEL_LIFECYCLE = /available|support|rolling|deprecat|retir|sunset|launch|release|\bnow\b|public preview|generally available/i;
const COPILOT_AREAS = [
  ['code-review', /code review|review(?:ing)? (?:agent|comments?)|pull request review/i],
  ['cli', /\bCLI\b|command line|terminal|\bgh copilot\b/i],
  ['extensibility', /\bMCP\b|model context protocol|extension|\bskills?\b|plugin|toolbox|custom (?:agents?|instructions)|agent client protocol|\bACP\b|\bhooks?\b|\bSDK\b/i],
  ['agents', /agent|autopilot|agentic|delegate|\bsessions?\b|\btasks?\b|Agent HQ/i],
  ['models', /\bmodels?\b|\bBYOK\b|bring your own key/i],
  ['admin', /\bseats?\b|billing|usage|budget|premium request|polic(?:y|ies)|\badmins?\b|metrics|licen[sc]e|audit|enterprise|organi[sz]ation|SCIM|\bSSO\b|SAML|cost center|spend/i],
  ['chat-ide', /\bchat\b|completion|suggest|inline|edit mode|next edit|autocomplete|prompt|instructions/i],
];
const SECURITY_AREAS = [
  ['secrets', /secret|push protection|credential|\btokens?\b|\bPATs?\b/i],
  ['supply-chain', /dependabot|dependenc|SBOM|attestation|supply chain|advisor(?:y|ies)|malware|\bnpm\b|packages?\b|provenance|sigstore|vulnerab(?:le|ility) alerts?/i],
];
const PLATFORM_AREAS = [
  ['actions', /\bactions\b|workflow|runner|artifact|\bcache\b|\bOIDC\b|reusable/i],
  ['collaboration', /\bissues?\b|\bprojects?\b|pull request|\bPRs?\b|discussion|merge queue|review|assign|sub-issue|milestone|notification|\bboard\b|roadmap/i],
  ['repos', /repositor|ruleset|\bbranch|\bgit\b|commit|\bfork|\breleases?\b|code search|blame|\bdiff\b|rebase|\bmerge\b|submodule|\bLFS\b|\bwiki\b|\bpages\b/i],
  ['apis', /\bAPIs?\b|\bREST\b|GraphQL|webhook|\bSDK\b|OAuth|GitHub Apps?\b|rate limit|marketplace/i],
  ['admin', /billing|enterprise|organi[sz]ation|audit|polic(?:y|ies)|SCIM|\bSSO\b|SAML|\broles?\b|permission|identity|\bEMU\b|licen[sc]e|\bseats?\b|usage|\bcost\b|budget|metered|invoice/i],
  ['community', /sponsor|maintainer|open source|education|student|community|accessib|Innovation Graph|Octoverse/i],
];
const IDE_SECTION = [
  ['jetbrains-others', /JetBrains|IntelliJ|PyCharm|WebStorm|\bRider\b|GoLand|Android Studio|Xcode|Eclipse|Neovim|\bVim\b/],
  ['vscode', /Visual Studio Code|\bVS Code\b/],
  ['visualstudio', /\bVisual Studio\b(?! Code)/],
];

function pick(rules, text, fallback) {
  for (const [id, re] of rules) if (re.test(text)) return id;
  return fallback;
}

function copilotArea(text) {
  if (MODEL_NAME.test(text) && MODEL_LIFECYCLE.test(text)) return 'models';
  if (/^[\w.\-+/() ]{2,48} (?:is|are) (?:now )?(?:generally )?available(?: in public preview)?(?: in| for)? (?:GitHub )?Copilot\b/i.test(text)) return 'models';
  return pick(COPILOT_AREAS, text, 'other');
}

const CATS_SECURITY = ['Security', 'Supply chain security', 'Application security', 'Web application security', 'Platform security'];
const CATS_RESEARCH = ['Research', 'Vulnerability research', 'Octoverse'];
// Runner images, Dependabot and CodeQL posts name IDEs/toolchains without being about the Copilot IDE extensions.
const NOT_IDE = /runner image|dependabot|codeql|code scanning|\bGitHub Actions\b|\bswiftpm\b/i;

function changelogSection(r) {
  const labels = r.labels || [];
  const title = r.title || '';
  const copilotish = labels.includes('copilot') || /\bCopilot\b/.test(title);
  if (copilotish || !NOT_IDE.test(title)) for (const [sec, re] of IDE_SECTION) if (re.test(title)) return sec;
  if (copilotish) return 'copilot';
  if (labels.includes('application-security') || labels.includes('supply-chain-security')) return 'security';
  if (labels.includes('vs-code')) return 'vscode';
  return 'platform';
}

const TAG_BY_TYPE = { 'new-releases': 'Release', improvements: 'Improvement', deprecations: 'Deprecation' };

export function classify(r) {
  const title = r.title || '';
  const text = `${title} ${r.lede || ''}`;
  let section; let area; let tag;
  switch (r.source) {
    case 'changelog': {
      section = changelogSection(r);
      tag = TAG_BY_TYPE[r.type] || 'Improvement';
      break;
    }
    case 'blog': {
      const cats = r.categories || [];
      if (cats.some((c) => CATS_RESEARCH.includes(c))) { section = 'research'; area = 'research'; tag = 'Research'; }
      else if (cats.some((c) => CATS_SECURITY.includes(c)) && !/\bCopilot\b/.test(title)) { section = 'security'; tag = 'Announcement'; }
      else if (/\bCopilot\b/.test(text) || cats.includes('GitHub Copilot')) { section = 'copilot'; tag = 'Announcement'; }
      else if (cats.some((c) => ['Open Source', 'Maintainers', 'Policy', 'Social impact', 'GitHub Education'].includes(c))) { section = 'platform'; area = 'community'; tag = 'Announcement'; }
      else { section = 'platform'; tag = 'Announcement'; }
      for (const [sec, re] of IDE_SECTION) if (re.test(title) && !NOT_IDE.test(title)) { section = sec; break; }
      break;
    }
    case 'vscode':
    case 'vscode-blog':
      section = 'vscode';
      tag = r.source === 'vscode-blog' ? 'Announcement' : /deprecat|retire|removal|removed|breaking/i.test(`${title} ${r.h2 || ''}`) ? 'Deprecation' : 'Improvement';
      break;
    case 'visualstudio':
      section = 'visualstudio'; tag = 'Announcement';
      break;
    case 'next':
      section = 'research'; area = 'research'; tag = 'Research';
      break;
    case 'commandline':
      if (/\bGitHub Copilot\b/.test(title)) { section = 'copilot'; tag = 'Announcement'; }
      else if (/\bUniverse\b/.test(title)) { section = 'events'; area = 'other'; tag = 'Announcement'; }
      else { section = 'research'; area = 'research'; tag = 'Research'; }
      break;
    default:
      section = 'platform'; tag = 'Announcement';
  }
  if (!area) {
    if (section === 'copilot' || section === 'vscode' || section === 'visualstudio' || section === 'jetbrains-others') area = copilotArea(`${title} ${r.h2 || ''}`);
    else if (section === 'security') area = pick(SECURITY_AREAS, title, 'code-security');
    else if (section === 'platform') area = pick(PLATFORM_AREAS, title, 'other');
    else area = 'other';
  }
  return { section, area, tag };
}

const MONTH_NUM = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12, jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12 };
const MON = '(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\.?';
const DATE_MDY = new RegExp(`\\b${MON}\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:,?\\s+(20\\d{2}))?\\b`, 'g');
const DATE_DMY = new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+${MON}(?:,?\\s+(20\\d{2}))?\\b`, 'g');
const DATE_ISO = /\b(20\d{2})-(\d{2})-(\d{2})\b/g;
const EFFECTIVE_VERB = /deprecat|retir|sunset|remov|no longer|end[- ]of[- ]life|discontinu|disabl|enforc|\bblock|breaking|will stop|stops? (?:working|supporting)|will be required|become[s]? required|will be replaced|will default|turned off|shut ?down/i;

// Returns { date, sentence } only when exactly one distinct date appears in the sentences that describe a
// retirement / enforcement. Anything ambiguous returns null — curators set `effective` for those by hand.
export function autoEffective(r) {
  const text = rawText(r);
  const published = r.date;
  const found = new Map();
  const mk = (y, m, d) => {
    if (!m || d < 1 || d > 31) return null;
    let year = y;
    if (!year) {
      year = Number(published.slice(0, 4));
      const c = `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (c < addDays(published, -45)) year += 1;
    }
    const iso = `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return Number.isNaN(new Date(`${iso}T00:00:00Z`).getTime()) || fmt(new Date(`${iso}T00:00:00Z`)) !== iso ? null : iso;
  };
  // A date that merely says when something was announced / updated is not the effective date.
  const announcedBefore = (s, idx) => /\b(announced|posted|published|updated|reminded)\b[^.;:]{0,30}\b(?:on|in|at)\s*$/i.test(s.slice(Math.max(0, idx - 45), idx));
  for (const sentence of text.split(/(?<=[.!?])\s+|\n+/)) {
    if (!EFFECTIVE_VERB.test(sentence) || /^\W*update\b/i.test(sentence)) continue;
    for (const m of sentence.matchAll(DATE_MDY)) { if (announcedBefore(sentence, m.index)) continue; const d = mk(m[3] ? Number(m[3]) : null, MONTH_NUM[m[1].toLowerCase().replace('.', '')], Number(m[2])); if (d) found.set(d, sentence); }
    for (const m of sentence.matchAll(DATE_DMY)) { if (announcedBefore(sentence, m.index)) continue; const d = mk(m[3] ? Number(m[3]) : null, MONTH_NUM[m[2].toLowerCase().replace('.', '')], Number(m[1])); if (d) found.set(d, sentence); }
    for (const m of sentence.matchAll(DATE_ISO)) { if (announcedBefore(sentence, m.index)) continue; const d = mk(Number(m[1]), Number(m[2]), Number(m[3])); if (d) found.set(d, sentence); }
  }
  if (found.size !== 1) return null;
  const [[date, sentence]] = found;
  return { date, sentence: sentence.trim().slice(0, 240) };
}
