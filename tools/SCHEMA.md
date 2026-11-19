# TUB content schema (v1)

Everything under `content/` is the *published* briefing; the viewer reads it straight from git tags.
`data/` (git-ignored) holds harvest metadata and curation staging. New full-page extractions are transient:
only source metadata and exact, bounded claim quotes are retained in the verified content pipeline.

## Items — `content/items/YYYY-MM.json` (array, sorted by date then id)

One object per update. **Every item must carry a real source URL.** Never invent facts: every claim in
`summary`, `why`, `admin` must be supported by the source text you were given (or fetched).

| field | req | notes |
|---|---|---|
| `id` | yes | stable, `^[a-z0-9][a-z0-9._-]{2,80}$`. Harvested records keep their raw id: `cl-<wpId>` changelog, `bl-<wpId>` GitHub blog, `vsc-<ver>-<nn>` VS Code release notes, `vscb-<slug>` VS Code blog, `vs-<wpId>` Visual Studio blog, `next-<kind>-<slug>` GitHub Next, `cmd-<slug>` Command Line (commandline.microsoft.com; GitHub-relevant posts only). Hand-researched items use `ev-<slug>` (events), `rs-<slug>` (research), `x-<slug>` (other) |
| `date` | yes | `YYYY-MM-DD` publication/announcement date (file month must match) |
| `source` | yes | one of `taxonomy.json#sources` |
| `url` | yes | https URL of the primary source |
| `title` | yes | plain text, sentence case as published. Product names exactly: **GitHub**, **GitHub Copilot**, **Visual Studio Code** |
| `section` | yes | `copilot` `vscode` `visualstudio` `jetbrains-others` `platform` `security` `events` `research` |
| `area` | yes | see `taxonomy.json#areas` |
| `tier` | yes | `headline` (customer-presentable, top story), `notable` (worth a slide), `minor` (listed compactly) |
| `tag` | yes | `Release` \| `Improvement` \| `Deprecation` \| `Announcement` \| `Research` |
| `stage` | no | `ga` `preview` `private-preview` `experimental` `none` — only when the source states it explicitly |
| `summary` | headline/notable | 2–3 sentences, plain text, neutral/precise voice. Facts from the source only |
| `why` | headline | one sentence: why a customer/admin/developer should care |
| `plans` | no | subset of Free, Pro, Pro+, Business, Enterprise — only if the source states plan availability |
| `ides` | no | subset of vscode, visualstudio, jetbrains, xcode, eclipse, neovim, cli, web, mobile, desktop |
| `admin` | no | enablement / policy / rollout note for admins, only if stated |
| `links` | no | `[{ "label": "Docs", "url": "https://…" }]` (max 4, https only) |
| `effective` | no | `YYYY-MM-DD` when a retirement / breaking change / enforcement takes effect — only when the source states the date explicitly. Powers the "Upcoming changes" panel |
| `image` | no | https URL of a screenshot published with the source. Must be one of the raw record's own `images`/`image` URLs, and a real product screenshot (never a generic wallpaper / social card) |
| `labels` | no | source labels (kept for filtering) |
| `version` | no | VS Code / Visual Studio version, e.g. `1.145` |
| `event` | no | event id (registry) for announcements made at an event |

`minor` items carry no `summary` (the assembler fills section/area/tag heuristically from the source labels).
Length guide: `title` ≤ 110 chars, `summary` 160–480 chars (2–3 sentences), `why` ≤ 220 chars, `admin` ≤ 260 chars.

## Narratives (written when the period closes)

* `content/weeks/YYYY-MM-DD.json` — edition ending on that Thursday (window = date-6 … date; the first edition is clipped to 2026-01-01).
* `content/months/YYYY-MM.json` — written once the month is over.
* `content/quarters/YYYY-Qn.json` — written once the quarter is over.

```json
{
  "headline": "≤ 90 chars, the one-line theme",
  "summary": "2–4 sentences, executive summary (≤ 700 chars)",
  "themes": [ { "title": "≤ 60 chars", "body": "1–2 sentences", "itemIds": ["cl-123"] } ],
  "spotlight": ["cl-123", "bl-456"]
}
```

`themes`: 2–4 per narrative. `spotlight`: 3–6 ids of `headline` or `notable` items whose date is inside the
period. Narratives may only reference items dated on/before the end of their period, and may only state facts
that the referenced items state.

## Curation file (curators write this) — `data/staging/curation/YYYY-MM.json`

```json
{
  "month": "2026-03",
  "items": [ { "id": "cl-98123", "tier": "headline", "section": "copilot", "area": "agents", "tag": "Release",
               "title": "(optional) cleaned title — defaults to the raw title",
               "summary": "…", "why": "…", "stage": "preview", "plans": ["Pro+", "Enterprise"], "ides": ["vscode"],
               "admin": "…", "effective": "2026-12-02", "links": [ { "label": "Docs", "url": "https://…" } ],
               "image": "https://…", "event": "evt-universe-2026" } ],
  "overrides": { "cl-98124": { "section": "security", "area": "secrets", "tag": "Improvement" },
                 "vsc-1.140-07": { "drop": true, "dropReason": "internal engineering note, not user visible" } }
}
```

* `items[].id` must be a raw record id from your slice, dated inside the month. Only `headline`/`notable` records
  are listed here, each with a full summary. **Every other record automatically becomes a `minor` item** (raw
  title, heuristic section/area/tag) — use `overrides` only to fix a wrong section/area/tag/title or to `drop`
  records that are not customer-meaningful (duplicate, internal engineering note, pure bug fix with no user impact).
  When in doubt keep it as minor.
* `month_narrative` is **not** written by curators (pass 2 writes all week / month / quarter narratives from the
  curated items). If a curation file has one it is validated but ignored.
* A file may carry `"from"` / `"to"` (ISO dates) when a month is split between curators (e.g. `2026-10a.json` has
  `"from": "2026-10-01", "to": "2026-10-20"`); `month` is still `2026-10`.
* Check your file with `node tools/check-curation.mjs data/staging/curation/<slice>.json`.

## Extras (research agent writes these) — `data/staging/extra/`

* `events.research.json` — array of registry entries (see below).
* `items.research.json` — array of **complete** items exactly as in the Items table (ids `ev-…`/`rs-…`/`x-…`,
  `tier` set, `summary`/`why` per tier). Each needs a verifiable source URL that you opened and read.

## Events registry — `content/events.json`

```json
[ { "id": "evt-universe-2026", "name": "GitHub Universe 2026", "start": "2026-10-28", "end": "2026-10-29",
    "location": "San Francisco, CA", "kind": "conference", "role": "host", "url": "https://…", "blurb": "1 sentence" } ]
```

`kind`: conference | meetup | webinar | launch | other. `role`: host | sponsor | speaker | attendee.
An event becomes visible at editions on/after `start`. Announcements made at an event are normal items
(`section: "events"` or the product section) with `event: "<evt id>"`.

## Rules (adversarial checklist)

1. Source-backed: facts, versions, numbers, plan names, dates, availability exactly as stated in the source.
2. Don't say "GA" unless the source says generally available; don't say "preview" unless it says preview/beta.
   Set `stage` only when the source states it. Set `plans` only when the source lists plan availability.
3. No marketing superlatives; no future promises not in the source ("will soon…" only if the source says so).
4. Neutral third person, present tense, plain text (no markdown, no HTML, no emoji). "You" is fine for admin/dev
   guidance; never "we/our".
5. Brand: `GitHub` (capital G+H, one word), `GitHub Copilot`, `Copilot coding agent`, `Copilot code review`,
   `Visual Studio Code` (or `VS Code`), `Microsoft` — never `Github`, `Co-pilot`, `Github Copilot`, `VSCode`.
6. Dates are ISO; the date is the publisher's local date (changelog slug date, release-note date).
7. If sources disagree or something is unclear, open the source (web_fetch) and resolve it, or leave the item
   out of `headline`/`notable`. Never guess.
