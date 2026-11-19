# GitHub Technical Update Briefing (TUB) — claims-first design

Status: DRAFT v1, written before implementation so it can be attacked. Anything marked **[OPEN]** is a decision the critics should challenge.

## 1. What we are building

A canvas (a local web viewer served by a Copilot CLI extension) that presents the GitHub and GitHub Copilot change stream as a formal customer-ready briefing.

* **Time travel.** `main` holds the latest briefing. Each weekly edition is a backdated, tagged commit (`tub-YYYY-MM-DD`, Thursdays from 2026-01-01). A picker loads any edition, "as of" that date.
* **Zoom.** Week / Month / Year views, like a calendar.
* **Sources.** github.blog changelog + blog, VS Code release notes + blog, Visual Studio, GitHub Next, security lab / research, conferences (event registry).
* **Export.** "Export ▾" → PDF, PowerPoint. Present mode (16:9 deck). Brand: GitHub (Mona Sans, GitHub green/purple/blue, Octicons).

New requirements this document answers:

1. Ingest with **Firecrawl** (Alexandria optional).
2. Keep **provenance** records of every source. **No claim without a working link to its source.**
3. Model updates as **claims** (Microsoft Research *Claimify*). Store **claims + sources, not articles.**
4. Generate **intermediate summaries from claims, with citations**, so any scoped view (week/month/year, one section) has a natural-language interpretation whose every sentence is traceable.

## 2. Principles

* **P1 No orphan sentence.** Every factual clause anywhere it is rendered (card summary, admin note, narrative, theme, deck slide, PPTX) carries one or more markers that resolve to claims and their sources. Every item title links to its checked primary source; summaries and headlines cite every independently verifiable clause.
* **P2 Evidence, not paraphrase.** A claim stores a *verbatim quote* from the source. The quote is what a reader (or an automated check) uses to confirm the claim. A claim without a quote does not exist.
* **P3 Mechanical gates decide; LLM judgement advises.** Ingestion checks that each exact quote occurs in the fetched source text, alongside token containment and link liveness. Independent LLM verification is sampled and only *removes* content.
* **P4 Store the minimum.** New ingestion fetches full article text transiently and discards it after verification; it writes no full-text cache. Persist only claims (text + ≤280-character evidence quote) and source metadata (URL, title, publisher, dates, content hash, link check). Older ignored harvest/cache files may remain locally, but are never published.
* **P5 Honest time.** A backfilled edition is *reconstructed* later from sources published on or before its date. It says so. `retrieved` and `check.at` are true timestamps, never backdated.
* **P6 Degrade to less, never to more.** If extraction, verification or a link check fails, the content is dropped or demoted to a title-only link. A title-only item is permitted only when its title is verified in the fetched source, its direct link is checked, and the UI labels it "Title only; not claim-verified."

## 3. Data model

All files are JSON arrays, one object per record, sorted by ASCII-lexicographic `id`. Paths use the source's `published` month for sources and claims, `YYYY-MM.json` for items, `YYYY-MM-DD.json` for weeks (edition date), `YYYY-MM.json` for months and `YYYY-Qn.json` for quarters. Writers load, merge by stable id, reject conflicting content for an existing id, write to a sibling temporary file, then atomically replace. Corrections require an explicit correction record and a separate commit; they never silently rewrite a past edition.

### 3.1 Source — `content/sources/YYYY-MM.json` (month of `published`)

```
{ id:        "s-" + first 12 hex of sha256(canonicalUrl)        // canonicalUrl: https, lower-case host, no #fragment, no utm_*, no trailing slash
  url:       canonical page URL (what a human opens)
  kind:      changelog | blog | vscode | vscode-blog | visualstudio | next | research | event | docs | other
  publisher: "GitHub Blog" | "Visual Studio Code" | "GitHub Next" | …
  title:     title as published (verbatim)
  published: YYYY-MM-DD
  retrieved: ISO timestamp of the fetch the claims were extracted from
  via:       "wp-api" | "html" | "curl" | "firecrawl"
  sha256, bytes: of the normalized extraction text (NOT stored)
  check:     { ok: bool, status: int, at: ISO, finalUrl?: string }       // link liveness, see §6 G7
  role:      "primary" | "related"                                       // primary = an item's own page; related = a link shown beside it
  archive?:  { url, at }                                                 // optional web.archive.org snapshot
}
```

Every URL the UI renders as a link (item URL, `links[]`, event URLs, "Open source") must have a source record with `check.ok`. Items reference sources **by URL**, so the item schema gains no source field.

### 3.2 Claim — `content/claims/YYYY-MM.json` (month of its source's `published`)

```
{ id:    "c-" + first 10 hex of sha256(sid + "\n" + normalize(text))   // stable across rebuilds
  sid:   source id
  text:  one standalone, atomic, verifiable statement (30–280 chars): entities named, no pronouns, scope stated
         (plan, IDE, stage, date, version) — Claimify "decontextualized"
  quote: verbatim contiguous span of the source text that supports `text` (20–280 chars)
  type:  availability | feature | change | deprecation | requirement | metric | policy | event
  loc?:  section anchor / heading in the source (for deep links, e.g. VS Code release-note sections)
  v:     { status: "grounded" | "unverified" | "unsupported", by: "grounding" | "llm-judge" | "human", at: ISO }
}
```

* `grounded` = quote found in the harvested text **and** the token-containment check passed (§6 G2–G4).
* `unverified` = cannot be checked (source text unavailable at build time, e.g. a PDF). Published only if `ALLOW_UNVERIFIED` (default off).

### 3.3 Items — `content/items/YYYY-MM.json` (existing) gain `claims`

* `claims: [claimId]` — every claim the item cites, in citation order.
* `fieldClaims?: { title?: [claimId], plans?: [claimId], ides?: [claimId], effective?: [claimId], stage?: [claimId], version?: [claimId] }` — evidence for structured facts and rewritten titles. Every listed id must also appear in `claims`, belong to the item's primary source, and be grounded. Any populated field in this map's supported set requires its corresponding evidence list.
* `summary`, `admin` (and optionally `why`) contain **inline markers** `[^c-1a2b3c4d5e]` or `[^c-1a2b3c4d5e,c-9f8e7d6c5b]` placed immediately after the sentence's final punctuation.
* `why` is editorial analysis. It is labeled "Analysis" in the UI and may not introduce a number, date, version or plan name that is absent from the item's claims (G5).
* **Minor** items (≈1,290) stay title-only: exact source title + working direct link, no generated summary or factual annotation. The UI labels these "Title only; not claim-verified".
* Every summarized item's title must equal or be a prefix-clipped form of its source title (G6). A rewritten title requires a claim citation; the visible title itself always links to the checked source.

### 3.4 Narratives — `content/{weeks,months,quarters}/…` gain citations and section scope

```
{ headline, summary, themes:[{title, body, itemIds}], spotlight:[itemIds],
  sections?: { "<sectionId>": { summary } } }      // month + quarter only
```

* `summary`, theme `body`, `sections.*.summary`, and `headline` carry markers for every independently verifiable clause. A marker on one clause does not cover adjacent uncited facts.
* A narrative is generated **from claims and item summaries only** (never from articles): the writer is shown item ids, claim ids and claim text.
* Every cited claim must belong to an item in the narrative's period (scope integrity, G9).
* Derived statistics ("242 updates in October") are **not** narrative text; the viewer renders them from data.
* Week narratives publish with their edition; month and quarter narratives only once the period is closed (existing rule). Year view has no narrative of its own: it composes closed-quarter narratives.
* **Deterministic extractive fallback** for any scope without a stored narrative (section-filtered weeks/years, open periods): compose cited text from that scope's headline/notable items' first cited sentences, grouped by theme. Cited, mechanical, always available.

### 3.5 Events — `content/events.json` already carries `url`; each is a source (`kind: event`, `role: related`) with a link check. An event row asserts only registry facts (name, dates, location) that the cited page states; checked by G7 liveness and a title/date match against the page.

* Each event carries `claims: [claimId]`; its claims must cite the event's checked source. Unchecked event links and facts are omitted from the viewer.
* Item `links[]` are displayed only when each related URL has its own checked source record. Their visible labels come from the checked source title, not the unverified feed label.

## 4. Citation syntax and rendering

* Marker regex: `\[\^(c-[0-9a-f]{10}(?:,c-[0-9a-f]{10})*)\]`. One shared pure module (`web/js/cite.mjs`, used by viewer, server export, tools) provides `parseCited(text) → [{text, claimIds[]}]`, `stripCites(text)`, `citedIds(text)`, `ordinals(text)`.
* Search, length limits, brand lint and plain-text exports operate on `stripCites(text)`.
* UI: each marker renders as a numbered superscript button (`aria-label="Source 2: <publisher>, <date>"`). Activating it opens a popover: claim text · quote (blockquote) · "Open source ↗" (real `<a href>`) · verification badge (`Quote verified in source · link checked <date>`). No JS-only links: the `<a>` works with JS blocked.
* Cards have an "Evidence" disclosure listing every claim and its quote. Each view has a "Sources" section: unique sources in scope (publisher, title, date, link, claim count).
* Deck/PDF/PPTX: numeric footnote markers + a per-slide "Sources" footer with hyperlinks + a closing Sources appendix; claim + quote go in PPTX speaker notes.

## 5. Claimify, adapted

Microsoft Research's Claimify (arXiv 2502.10855) extracts *verifiable, decontextualized, atomic* claims in four LLM stages and refuses to guess when a sentence is ambiguous. We keep the stages, run them as an explicit protocol per source, and add deterministic gates the paper's evaluation suggests (entailment, coverage, decontextualization):

| Claimify stage | Our protocol (extraction agent) | Deterministic backstop |
|---|---|---|
| Sentence splitting + context | Work sentence by sentence with the title, date and neighbouring sentences | — |
| **Selection** | Keep only verifiable statements (what shipped, who gets it, when, limits, requirements). Drop marketing, opinion, speculation, roadmap hedges | claim types restricted; hype-word lint |
| **Disambiguation** | Resolve "it/this/the feature/the update" and partial names from the title/context. If it cannot be resolved *confidently*, **drop it** (log `ambiguous`) | decontextualization lint (no leading pronoun/demonstrative; named subject present) |
| **Decomposition** | One fact per claim; carry plan/stage/date/IDE qualifiers into the claim text | length 30–280; entailment-by-containment (G3) |
| (evaluation) entailment | — | every number/date/version/plan/proper-name token in `text` appears in `quote` (G3) |
| (evaluation) coverage | extractor reports counts of dropped sentences by reason | soft metric: % of numeric tokens in source lede that survive into claims |

The paper's prompts are not reproduced; we implement the published *method*, not their code, and say "Claimify-inspired" in user-facing text, not "Claimify".

## 6. Verification gates (`tools/check-claims.mjs`, `tools/validate.mjs`)

Blocking unless stated.

* **G1 Schema.** Ids, hash prefixes recomputed and compared; sid exists; type/status enums; lengths; source URL, extraction hash, role and check metadata.
* **G2 Grounding.** `normalize(quote)` is a substring of `normalize(sourceText)`. Normalization = Unicode NFKC, curly→straight quotes, collapse whitespace, strip markdown emphasis/link syntax, case-sensitive.
* **G3 Entailment-by-containment.** Every digit-bearing token, version, date, plan, IDE, audience, geography, stage and capitalized multi-word proper name in `claim.text` is supported by `quote` or allowed source metadata (title/date). Scope may be narrowed, never expanded; terms such as "all" or "every" require explicit source support. This lint is not proof of entailment.
* **G4 Decontextualization and atomicity.** No leading pronoun/demonstrative, first-person wording, or hype. A blocking review flags conjunctions, semicolon-separated clauses and coordinated lists for human resolution; independently testable predicates must be split. Do not blindly reject legitimate names or qualifiers.
* **G5 Sentence coverage.** In `summary`/`admin`/narratives: every factual clause has ≥1 marker; every marker resolves; every number/date/version/plan/scope token is supported by a cited claim and its quote or allowed metadata; `why` introduces no new such tokens.
* **G6 Title integrity.** Every title-only item exactly matches the source title after documented normalization and directly links to it. Rewritten titles must be claim-cited. A live title mismatch is a review failure, not silently rewritten.
* **G7 Link liveness.** Primary sources are checked immediately before final publish (target age ≤4 h); historical editions retain their actual check timestamp and are never silently rewritten. Retry network/429/5xx failures with bounded backoff and fail publish if unresolved. Permanent failures demote/remove dependent claims/items. Bound redirects to five hops, reject loops and redirects to another registrable domain without review. Validate anchors at ingest and publish; if an anchor is lost, link to the page root and report it. *Liveness ≠ truth*: a "soft-404" page is caught by title review (G6).
* **G8 Drift.** `verify-sources` re-fetches and re-hashes; if the quote no longer appears, the claim is flagged `drifted` (warning on past editions, error on the next weekly run's items).
* **G9 Scope integrity (narratives).** Cited claims ⊂ claims of items dated inside the period (and ≤ as-of).
* **G10 Independent LLM verification.** A different agent, given only (claim, quote, source text), returns `entails | partial | no`. `partial`/`no` claims are removed and their sentences must be rewritten or dropped. Sampling: 100 % of headline claims, 25 % of notable; reported, not blocking on its own.
* **Soft:** length budgets and duplicate-claim detection per source. Atomicity is not soft; see G4.

## 7. Pipeline

```
discover/harvest ──► fetch (transient text in memory) ──► extract and verify claims
        │                                                   │
        ▼                                                   ▼
  source ledger ◄──── claims + exact evidence quotes ──► check-claims (G1–G6)
        │                                                   │
        └────────────► assemble (items + claims + sources) ─┴─► verify-sources (G7/G8)
                                                                     │
                   publish (immutable editions, git commit + tag) ◄─┴─ validate (G5, G9)
```

* Weekly job (Thursday 17:00 US Central, GitHub Actions `.github/workflows/weekly-refresh.yml`): runs the tests, then `tools/refresh-weekly.mjs` harvests → verifies the combined seed/research event registry → assembles using `events.verified.json` → verifies source-backed titles and claims → builds every missing dated snapshot through the current week → publishes on `main`; then validates content, commits updated harvest state (`data/raw`, `data/staging/extra`) and pushes `main` with tags. Nothing is pushed unless every step passes; a failure opens or updates a `tub-refresh` issue. Missing or malformed verified event data and transient event fetch errors (network, 5xx, 429) stop the run. Events whose page loads but no longer states them, or whose link fails source policy (unapproved host, cross-publisher redirect, 404/410), are reported and excluded — except events that have already started and were verified before, which keep their recorded evidence because event pages drop past listings. New entries remain title-only until reviewed; automatic lede enrichment is not part of this scheduled path, and previously published summaries are preserved. `.github/workflows/ci.yml` runs tests and content validation on every push/PR.
* Local sync: the canvas extension fast-forwards its checkout from `origin/main` (with tags) at start, every 30 minutes and on the `refresh` action, then reloads open panels. It never merges or overwrites diverged local history; it logs a warning instead.
* Claims/sources of past editions are immutable (`--update-existing` only for corrections, committed separately).

## 8. Firecrawl (and Alexandria)

* `tools/lib/firecrawl.mjs`: `scrape(url,{formats,onlyMainContent})`, `search(query,{sources})`, `crawl/map` (need a key; the keyless free tier supports `scrape` and `search`, verified 2026-11-05). API key from `FIRECRAWL_API_KEY`, never logged, never written to disk or to `content/`.
* `tools/lib/fetcher.mjs` strategy chain per URL: official API (WordPress REST for github.blog) → `curl.exe` → Node fetch → **Firecrawl** (JS-rendered or blocked pages: githubnext.com, conference sites, lab pages, PDFs). The fetch method is recorded in `source.via`. The Firecrawl fallback is on by default: it uses `FIRECRAWL_API_KEY` when set and otherwise Firecrawl's keyless free tier (scrape works without a key; refusals report `keyless tier refused`). It is skipped for definitive rejections (unapproved host, cross-publisher redirect, 404/410), because Firecrawl cannot change those outcomes. Set `TUB_FIRECRAWL=off` to disable it.
* Agent auth: Firecrawl's `auth.md` (checked 2026-11-19) supports only WorkOS ID-JAG identity assertions; anonymous agent registration is not offered. An ID-JAG needs an interactive user identity and consent, so the scheduled Action uses the keyless tier or the optional `FIRECRAWL_API_KEY` repository secret (any key — dashboard or one minted through ID-JAG agent auth).
* Firecrawl `markdown` is the extraction text for non-API sources, hashed and used for G2. Firecrawl input must be an allowlisted public URL; never send private or internal URLs. Treat fetched text as untrusted data and confirm provider terms before use.
* **Alexandria** is Firecrawl's catalog of third-party data-provider tools (discoverable with `search`, `sources:["alexandria"]`; paid per call; may require terms acceptance). It does not provide GitHub's own pages, so it is **off by default** and requires explicit operator opt-in for a named source/use case.

## 9. Viewer

Existing: Week / Month / Year, edition picker, search, chapter navigation, dark mode. Product-area chip filters have been removed; existing filtered URLs remain supported with a clear-filter action. New: citation popovers; Evidence disclosure; Sources section; "Reconstructed" banner on backfilled editions; Export menu; stale-link banner when `check.at` is old.

## 10. Export

**Deck model.** `web/js/deck-model.mjs` (isomorphic, DOM-free): `(snapshot, view, key, sections) → { slides:[{kind, title, eyebrow, blocks[], refs[], notes}], label, footer }`. Blocks: heading, para (cited runs), bullets, facts, table, chart(series), cards. This single model feeds (a) the on-screen deck, (b) the print layout → PDF, (c) the PPTX writer. Identical content in all three.

* **PDF** — `POST /api/export {format:"pdf", ref, view, key, sections}`: server spawns headless Edge/Chrome `--print-to-pdf` against `/#/…?print=1` on loopback with a 32-byte random, single-use, short-lived token. Cap export concurrency, runtime and output size; clean temporary files in `finally`; accept no arbitrary URL or output path. Fallback = `window.print()`.
* **PPTX** — pure-Node writer (zlib only), built on the supplied 2026 GitHub template (theme, masters, fonts, logo) when its package is bundled; native text/tables/shapes/hyperlinks/notes; charts as native chart parts or as shapes. QA: PowerPoint COM (installed here) → PDF/PNG → visual check; python-pptx/markitdown as structural checks.
* UI: header **Export ▾** menu (`aria-haspopup="menu"`; items "Export as PDF", "Export as PowerPoint"), status in a live region and server-generated downloads. No persistent export copy unless the user explicitly saves one.
* Canvas actions for agents: `export_pdf`, `export_pptx`. CLI for the weekly job: `tools/export.mjs`.

## 11. Threat model (adversarial)

| Threat | Mitigation |
|---|---|
| Prompt injection inside harvested text ("ignore previous instructions", fake "claims") | Extraction agents treat source text as data; checkers are deterministic; quote must be verbatim; no tool use from source content |
| Hallucinated claim with a real-looking quote | G2 substring check in the actual harvested text; G10 independent verification |
| Claim true when written, false later (page edited) | G8 drift detection; hash stored; archive link optional |
| Dead / redirected / soft-404 links | G7 liveness + title match; ledger shows `check.at` |
| Summary smuggles a new number/name | G5 token containment; `why` restricted |
| Overgeneralized narrative ("every plan") | Scope integrity (G9) + G10 on narratives + hedge lint |
| XSS from source text rendered in UI/PPTX | text-node rendering only (no innerHTML); `safeUrl` https-only; CSP; PPTX XML escaping + control-char stripping |
| SSRF/path traversal via export or `ref` params | `ref` must match `^(main|tub-\d{4}-\d{2}-\d{2})$`; export server renders only its own loopback page; saved paths are server-generated |
| Cross-site POST to local server | Bind loopback only; exact Origin and Host validation; JSON content-type; short-lived, single-use random export token; bounded body size and concurrency |
| Secret leakage (Firecrawl key) | env var only; never in content, logs, errors; request logging off |
| Copyright / over-quoting | ≤280-char quotes, attribution + link on every claim; no article text committed |
| Misleading backfill ("this was known on Jan 8") | edition banner "reconstructed on <date> from sources published through <asof>"; `retrieved` honest |

## 12. Known weaknesses we accept (and why)

* Quote-containment proves the *text exists*, not that the claim is *entailed*; that is what G3/G10 approximate. Residual risk: subtle scope errors (plan/IDE/stage).
* VS Code release notes share one page per release; claims deep-link via `loc` anchors (validated against harvested headings).
* Source texts were harvested truncated (~4.2 KB per record). Never extract claims from a truncated record; re-harvest full text for headline/notable items before extraction. Firecrawl input must be public and allowlisted.
* Single-pass extraction (claims + cited summary) is cheaper than the paper's multi-call pipeline; G5 prevents summaries from outrunning claims.

## 13. Phases and ownership

0 design → 1 critique (3 rubber-duck angles) → 2 foundation (cite module, claims lib + checker, ledger plumbing, deck model, export UI/endpoints, PPTX writer, Firecrawl adapter) → 3 extraction (≈10 agents) + gates + independent verification → 4 narratives from claims (≈11 agents) → 5 link/drift verification → 6 publish 45 editions + canvas + automation → 7 adversarial review, docs, cleanup.
