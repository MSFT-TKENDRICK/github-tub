# Curator brief — Technical Update Briefing (TUB)

## What the TUB is
A formal, customer-presentable briefing on **GitHub** and **GitHub Copilot** updates, modeled on a quarterly
slide deck. Every update is one slide: a title, a 2–3 sentence factual summary, the source, the date and a tag
(Release / Improvement / Deprecation / Announcement / Research), grouped into sections (GitHub Copilot, Visual
Studio Code, Visual Studio, JetBrains & other IDEs, GitHub platform, Security, Events, Research).

Readers: technical stakeholders at customer organizations — engineering leaders, platform / developer-experience
teams, security teams, GitHub and Copilot admins. They want to know: what changed, who gets it (plans, IDEs), is
it GA or preview, what must an admin do or decide, and what is being retired and when.

This content is shown to customers. **Accuracy beats coverage.** A reviewer will check every claim against the source.

## Your job (one slice of one month)
You curate the harvested records in your slice file (`data/staging/slices/<slice>.md`) from the GitHub changelog,
GitHub blog, VS Code release notes and blog, Visual Studio blog and GitHub Next. Your output is
`data/staging/curation/<slice>.json`, format in `tools/SCHEMA.md` → "Curation file". **Do not write narratives**
(pass 2 does that). Tools: `node tools/show.mjs <id> […]` prints full source text, links and images;
`node tools/check-curation.mjs <file>` validates your file; `web_fetch` opens any source URL. Use the `create`
tool to write the JSON file (never write file contents from the shell).

### Steps
1. Read `tools/SCHEMA.md`, then read your whole slice. Note which records describe the same announcement
   (e.g. a changelog entry plus a blog post, or a VS Code release note plus the changelog entry).
2. Choose tiers.
   * **headline** — at most 5 for the whole month: the stories a CTO would want on a slide (major launches / GA of
     agentic capabilities, big platform or pricing/billing shifts, major security changes, broad-impact retirements).
   * **notable** — roughly 15–30: concrete customer-visible capabilities, anything with admin/policy/billing
     impact, security features, meaningful IDE updates, retirements. Each deserves its own slide.
   * Everything else is automatically `minor` ("Also shipped") — do nothing for those unless a fix is needed.
   * Spread across sections; every section that has substantive records should have at least one notable item.
     The focus is GitHub and GitHub Copilot: for VS Code, prefer AI / Copilot / agent / MCP / model features and
     major editor changes; ordinary editor tweaks stay minor.
   * One announcement = one item. If the changelog and a blog post cover the same thing, pick the clearer primary
     source as the item and put the other in `links` (`"label": "Blog post"` / `"Changelog"`).
3. For every headline/notable record run `node tools/show.mjs <id>` and write the fields. Use `web_fetch` on the
   record's URL when the harvested text is cut off or you need to confirm plan availability, GA vs preview, or dates.
4. Fix the auto-classification of other records only where you noticed a mistake, via `overrides`
   (`section`/`area`/`tag`/`title`), and `drop` records that are not customer-meaningful, always with `dropReason`:
   * duplicates of an announcement you already included or of another record;
   * VS Code release-note boilerplate ("Release recap", "Release highlights", "Social media", "Fun!"), internal
     engineering notes, or tiny fixes with no user-visible meaning;
   * company/hiring/off-topic blog posts with no product or developer-practice content.
   Do **not** drop something just because it is small — a small shipped feature is a fine `minor` item.
5. Run `node tools/check-curation.mjs data/staging/curation/<slice>.json`. Fix every error. Resolve every warning:
   fix the text, or confirm against the source that it is a false positive (for example a number the source spells
   out in words). The ground-check flags numbers, plans, IDEs, GA/preview claims and effective dates that the
   source text does not contain.
6. Finish with a 5-line report: counts, any records you could not verify, anything odd in the data (broken
   titles, wrong dates, misclassified sources). Do not paste the JSON back.

## Writing rules
* `summary`: 2–3 sentences, 160–480 characters, plain text. Sentence 1 = what shipped / changed. Sentence 2 = how it
  works or what it enables. Sentence 3 (optional) = availability or the important limit. Present tense, neutral
  third person. No marketing language ("powerful", "seamless", "supercharge", "exciting"), no first person
  ("we", "our"), no exclamation marks, no emoji, no markdown, no HTML, no raw URLs.
* `why` (headline only): one sentence, ≤ 220 chars, the concrete reason a customer should care — derived from the
  source, not hype.
* `admin`: only when the source gives an enablement step, policy, rollout or billing consequence. ≤ 260 chars.
* `stage`: `ga` only if the source says generally available (or the surrounding source clearly states it is
  released to all in scope); `preview` only for "public preview/preview/beta"; `private-preview`; `experimental`
  only if the source says experimental. Omit when not stated. Never upgrade a preview to GA.
* `plans`: only plans the source explicitly lists (`Free`, `Pro`, `Pro+`, `Business`, `Enterprise`). Omit otherwise.
* `ides`: IDEs/surfaces the source names (`vscode`, `visualstudio`, `jetbrains`, `xcode`, `eclipse`, `neovim`,
  `cli`, `web`, `mobile`, `desktop`).
* `effective`: ISO date a retirement / breaking change / enforcement takes effect, only when the source states
  the date. This feeds the "Upcoming changes" panel, so be exact; if the date moved, use the newest stated date and
  mention the earlier one in the summary.
* `image`: only a real product screenshot taken from that record's own images (see `show.mjs`), never a generic
  wallpaper or social card. Omit if none is suitable.
* `title`: keep the source title unless it is clipped or unclear; fix capitalization to sentence case; keep product
  names exactly (see brand rules). Keep it ≤ 110 characters.
* Do not invent numbers, versions, benchmarks, customer names, dates or plan names. Round nothing. If the source
  says "up to 30%", you write "up to 30%".
* Brand: **GitHub** (capital G and H, one word); **GitHub Copilot** on first mention, **Copilot** afterwards;
  **Visual Studio Code** or **VS Code**; **Visual Studio**; **GitHub Actions**; **GitHub Advanced Security**;
  keep feature names as the source spells them (for example "Copilot coding agent", "Copilot code review",
  "Copilot CLI").

## Section guide
* `copilot` — Copilot capabilities that are not tied to one IDE: models, agents / coding agent, code review, CLI,
  Spaces, MCP, memory, billing/usage/policy/admin for Copilot, Copilot on github.com and mobile.
* `vscode` — everything from the VS Code release notes and the VS Code blog, plus Copilot features that the source
  describes as VS Code-specific.
* `visualstudio` — Visual Studio (not Code) releases and Copilot in Visual Studio.
* `jetbrains-others` — Copilot in JetBrains IDEs, Xcode, Eclipse, Neovim and other IDEs.
* `platform` — Actions, Pages, Packages, Codespaces, pull requests, Issues & Projects, repositories & rulesets,
  APIs, GitHub Desktop & Mobile, GitHub Enterprise Cloud/Server, billing, identity, audit log, Marketplace.
* `security` — code scanning / CodeQL, secret scanning & push protection, Dependabot, dependency graph / supply chain,
  security advisories, artifact attestations, security campaigns and Copilot Autofix.
* `events` — event-centred posts only (keynote recaps, conference announcements, "what we announced at …"). A
  product announcement made at an event keeps its product section and gets `event`.
* `research` — GitHub Next, Security Lab research, Innovation Graph, papers.

Items labeled `universe26` / announced on 2026-10-28 at GitHub Universe get `"event": "evt-universe-2026"`.

## Area guide
`models`, `agents`, `code-review`, `chat-ide` (chat & completions), `cli`, `extensibility` (MCP, extensions, APIs for
agents), `admin` (administration, policy, billing, usage), `actions`, `collaboration` (issues, projects, PRs),
`repos`, `apis`, `code-security`, `supply-chain`, `secrets`, `community`, `research`, `events`, `other`.

## Tag guide
* `Release` — a new capability, product, GA or preview launch.
* `Improvement` — an enhancement to an existing capability.
* `Deprecation` — a retirement, removal, breaking change, or enforcement date. Include `effective` when stated.
* `Announcement` — news, strategy, program or event posts that are not a single feature.
* `Research` — GitHub Next, Security Lab and other research outputs.

## Example item (format only — do not reuse the text)
```json
{ "id": "cl-99973", "tier": "headline", "section": "jetbrains-others", "area": "agents", "tag": "Release",
  "summary": "GitHub Copilot is now available in JetBrains Air. It uses the Agent Client Protocol (ACP) and supports tasks in your JetBrains IDE or in the cloud. Cloud tasks use your GitHub Copilot plan rather than JetBrains AI credits.",
  "why": "Teams that standardize on JetBrains tooling can run agentic Copilot workflows on their existing Copilot subscription.",
  "ides": ["jetbrains"],
  "admin": "Cloud tasks need a JetBrains account in an Air Teams-enabled business organization and Copilot enabled by your Air administrator." }
```
