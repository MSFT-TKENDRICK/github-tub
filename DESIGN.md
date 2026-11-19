---
name: GitHub Technical Update Briefing
description: A weekly, citation-backed briefing on GitHub and GitHub Copilot, shown as a customer-ready deck.
colors:
  brand-black: "#101411"
  carbon-panel: "#232925"
  dark-surface: "#161B18"
  dark-border: "#2A312D"
  paper: "#F2F5F3"
  rule-gray: "#E4EBE6"
  steel-gray: "#B6BFB8"
  mid-gray: "#909692"
  muted-ink: "#4D5550"
  github-green: "#0FBF3E"
  signal-green: "#5FED83"
  mint: "#8CF2A6"
  forest-ink: "#0E6836"
  copilot-violet: "#8534F3"
  copilot-lilac: "#B870FF"
  code-blue: "#3094FF"
  security-cyan: "#9EECFF"
  security-cobalt: "#0527FC"
  ember-orange: "#F08A3A"
  focus-blue: "#1A61FE"
typography:
  display:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "104px"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "normal"
    fontVariation: "\"opsz\" 72"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "normal"
    fontVariation: "\"opsz\" 72"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "26px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
  mono:
    fontFamily: "Mona Sans Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "\"tnum\" 1"
rounded:
  slide: "0px"
  sm: "6px"
  md: "10px"
  lg: "16px"
  pill: "999px"
spacing:
  hair: "1px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  page: "24px"
  slide-margin: "64px"
components:
  button-primary:
    backgroundColor: "{colors.github-green}"
    textColor: "{colors.brand-black}"
    rounded: "{rounded.sm}"
    height: "36px"
    padding: "0 14px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.signal-green}"
  button-secondary:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    height: "36px"
    padding: "0 14px"
  segmented-selected:
    backgroundColor: "{colors.github-green}"
    textColor: "{colors.brand-black}"
    rounded: "4px"
    height: "28px"
    padding: "0 14px"
  tag-release:
    backgroundColor: "#0A241B"
    textColor: "{colors.mint}"
    rounded: "{rounded.pill}"
    height: "28px"
    padding: "0 12px"
  slide-card:
    backgroundColor: "{colors.carbon-panel}"
    textColor: "{colors.paper}"
    rounded: "{rounded.slide}"
    padding: "26px 28px 18px"
  nav-item-active:
    backgroundColor: "{colors.carbon-panel}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    height: "32px"
    padding: "0 10px"
---

# Design System: GitHub Technical Update Briefing

## Overview

**Creative North Star: "The Briefing Room"**

This is a formal briefing a GitHub account team can put in front of a customer without editing. Every surface borrows from the GitHub Copilot Technical Update Briefing deck and the 2026 GitHub presentation template: near-black brand slides, a single GitHub Green accent, Mona Sans set large and without tracking, square cards, hairline rules, and the white Invertocat in a boxed footer. The web chrome around the deck is a quiet frame. It should never outshine the slides.

Density follows a presenter's needs. Slides are fixed 1280×720 canvases scaled to fit, so composition is deliberate and identical on screen, in PDF and in PowerPoint. Chapters group slides the way a presenter would talk through them: overview, then one chapter per product area, then events and close. In the reel, each slide builds once as it enters view. In Present mode, moving between slides that share a layout (the updates of one section, the pages of a list) swaps only the header and body content while the slide itself stays still, and any other move pushes the whole slide along the deck on a spring; new slides build in reading order. Slides are web pages, so linked rows and cards, source citations and charts answer hover, keyboard focus and press. Reduced-motion preferences replace movement with crossfades.

Trust is the product. Every sentence on a slide carries a superscript citation that links to the page it came from, and nothing is stated without a working source. Visual decisions that would weaken that, such as decorative imagery, unsourced numbers or invented charts, are out.

**Key Characteristics:**
- Dark brand slides (`#101411`), one green accent, and neutral surfaces for about 90% of every screen.
- Mona Sans with the Display optical size (`opsz` 72) for headlines and no letter-spacing anywhere.
- Square slide geometry, hairline borders and no drop shadows inside slides.
- Section color is used only as a signal: icons, a 4px inset top rule or a pill outline, never as a fill behind text.
- Superscript, linked citations on every claim.

## Colors

The palette is neutral first: GitHub black and paper carry the page, GitHub Green is the voice, and section hues are small signals.

### Primary
- **GitHub Green** (#0FBF3E): primary buttons, the selected Week/Month/Year segment, the 2px vertical rule on brand slides, agenda rings, and the "live" pill. It is the only saturated fill in the chrome.
- **Signal Green** (#5FED83): GitHub Green's dark-surface counterpart for text and numerals, such as cover eyebrows, KPI figures, citation numbers and hover state for primary buttons.

### Secondary
- **Copilot Violet** (#8534F3, dark #B870FF): the GitHub Copilot section signal, matching the reference deck's Copilot purple.
- **Code Blue** (#3094FF): the Visual Studio Code section signal.
- **Security Cyan** (#9EECFF, light #0527FC): the Security section signal and the dark-theme focus ring color.
- **Ember Orange** (#F08A3A): the JetBrains and other IDEs section signal. It also tints Deprecation tags.

### Neutral
- **Brand Black** (#101411): dark slide backgrounds, the header brand bar and the update-slide title band.
- **Carbon Panel** (#232925): cards on dark slides and the active nav item.
- **Dark Surface** (#161B18) and **Dark Border** (#2A312D): dark-theme page surfaces and dividers.
- **Paper** (#F2F5F3): primary text on dark, and the update-slide body.
- **Steel Gray** (#B6BFB8): secondary text on dark slides.
- **Muted Ink** (#4D5550): secondary text on light surfaces.
- **Rule Gray** (#E4EBE6): light borders and hairlines.

### Named Rules
**The One Voice Rule.** GitHub Green is the only accent that fills a control. Section colors may outline, rule or tint an icon, but never fill a button or sit behind body text.

**The Brand Slide Rule.** Brand slides (cover, agenda, overview, highlights, dividers and closing) are always dark, whatever the app theme. The app theme changes only the frame around them.

## Typography

**Display Font:** Mona Sans, variable (with ui-sans-serif, system-ui, Segoe UI)
**Body Font:** Mona Sans, variable
**Label/Mono Font:** Mona Sans Mono (with ui-monospace, Cascadia Mono, Consolas)

**Character:** One family in two optical sizes. The Display cut (`opsz` 72) gives slide titles the presence of the reference deck, and the text cut keeps dense captions legible. Mono is reserved for numerals, counts, dates and slide numbers, with tabular figures.

### Hierarchy
- **Display** (500, 104px slide px, 0.98): cover title only.
- **Headline** (700, 56–88px slide px, 1.04–1.1, `opsz` 72): slide titles and chapter dividers.
- **Title** (600, 26–28px slide px, 1.2): highlight card headings and update-slide headlines.
- **Body** (400, 15px page / 18–21px slide px, 1.42–1.55): summaries and appendix prose, capped near 72ch on the page.
- **Label** (600, 12–16px, 1): pills, tags, nav items and button text. Never uppercase, except the slide footer label.

### Named Rules
**The No-Tracking Rule.** `letter-spacing` is never set, in keeping with the GitHub brand. Hierarchy comes from size, weight and optical size.

**The Numerals Rule.** Counts, dates, KPIs and slide numbers use Mona Sans Mono or `tabular-nums` so columns and counters don't jitter while they animate.

## Layout

The page is a two-column workspace. On the left is a sticky chapter navigator (232px, collapsible to a 56px rail). On the right is the reel: a vertical sequence of 16:9 slides, each with a short caption, grouped under chapter headings that match the deck's sections. Scroll position identifies the active chapter; its slide titles are exposed in the rail. Below 900px wide, the navigator becomes a drawer opened from the toolbar and closed by Esc or the scrim.

The header is two bands: a dark brand bar (Invertocat, a 2px green divider and the product name) and a light tools row (edition picker, Week/Month/Year segmented control, period stepper, search, Present and Export). The page content is capped at 1280px with 24px gutters.

Slides use a fixed 1280×720 coordinate system with 64px side margins, a 676px footer line and a 232px left rail on brand slides. They are scaled as a unit, so the PDF and PowerPoint exports reproduce the on-screen geometry.

## Elevation & Depth

Slides are flat. Depth comes from tonal layering: Brand Black, then Carbon Panel cards, then a 1px Dark Border. At rest, the only shadow inside a slide is the 4px inset top rule that carries a section color on highlight cards and update visuals. Hovering or focusing a linked card traces it with a 1px ring in that same color. The one lifted surface on a slide is the source popover, a small dark card that exists only while a citation or chart bar is hovered or focused. In the chrome, popovers (edition picker, period picker and export menu) are the only lifted surfaces.

### Shadow Vocabulary
- **Popover** (`box-shadow: 0 1px 2px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.45)` dark; `0 1px 2px rgba(16,20,17,0.06), 0 8px 24px rgba(16,20,17,0.08)` light): menus and pickers only.
- **Section rule** (`box-shadow: inset 0 4px 0 var(--c)`): the top edge of highlight cards and update visuals.
- **Hover ring** (`box-shadow: inset 0 0 0 1px var(--c)`): the outline a hovered or focused highlight card draws in its section color.
- **Source popover** (`box-shadow: 0 12px 32px rgba(0,0,0,0.45)`): the in-slide card for citations and chart bars; it appears only on hover or focus.

### Named Rules
**The Flat Slide Rule.** Nothing on a slide floats or casts a shadow at rest. If an element needs emphasis, give it size, weight or the green accent. The two exceptions answer the pointer and are transient: a hovered highlight card lifts 4px and traces a 1px ring, and the source popover appears beside the citation or bar that opened it.

## Shapes

Slides and slide cards are square (0px radius), following the template. Pills, tags and agenda rings are fully round. Chrome controls use a small 6px radius, with 10px for chrome popovers. The in-slide source popover is the one rounded card on a slide: a small dark card with a 6px radius. Borders are 1px hairlines. The only thicker strokes are the 2px green rule and divider, which are brand marks. The Invertocat always appears in a boxed cell at the right end of the footer hairline.

## Components

### Buttons
- **Shape:** gently rounded (6px).
- **Primary:** GitHub Green fill with Brand Black text, 36px tall with 14px horizontal padding. Used once per view, for Present.
- **Secondary:** surface fill with a 1px strong border. Hover lifts to the panel color.
- **Press:** buttons and segmented-control options scale to 0.97 on `:active` over 100ms with ease-out, and the Present control bar's buttons scale to 0.92, so each feels like it responds to the press. Disabled buttons don't scale, and nothing scales under `prefers-reduced-motion`.
- **Focus:** a 2px focus ring offset by 2px (Focus Blue on light, Security Cyan on dark).

### Segmented control (Week / Month / Year)
- A panel-colored track with a 3px inset. The selected segment is filled GitHub Green with Brand Black text; the fill does not slide between options. Options scale to 0.97 on press. The text never changes size.

### Tags
- **Tags:** Release, Improvement, Deprecation, Announcement and Research each have a fixed tinted fill and an ink pair. They are labels, not buttons.

### Cards (slides)
- **Corner Style:** square.
- **Background:** Carbon Panel on dark slides.
- **Shadow Strategy:** none, except the section top rule.
- **Border:** 1px Dark Border.
- **Internal Padding:** 26px top, 28px sides, 18px bottom.

### Navigation (chapter navigator)
- Chapters are the product-area navigation; do not duplicate them with a Product areas filter row. Existing filtered links retain a clear-filter action without restoring the chip list.
- A list of chapters, each with a section-colored Octicon, chapter name and slide count in mono. The current chapter expands to show its slides by title.
- **Active state:** the active chapter uses a Carbon Panel surface and is marked `aria-current="location"`. Scroll position drives the active state; chapter and slide controls scroll to their targets.
- **Collapse:** a 56px icon rail on wide screens; the toolbar control opens the drawer on narrow screens.
- **Narrow:** below 900px it becomes a drawer with a scrim, closed by Esc or an outside click.

### Present-mode transitions
- **Opening:** "Present from here" lifts the slide out of its reel frame on a critically damped spring (`damping: 1`, `response: 0.45`); the frame stays hidden until the slide lands. The toolbar Present button settles the stage forward from `scale(0.92)` over 560ms. The backdrop fades in over 360ms, and the control bar rises 16px after a 200ms delay.
- **Moving along the deck:** keys, buttons and swipes push the whole slide whenever the next slide has a different layout, chapter or section. The incoming slide travels 14% of the stage width from the direction of travel at `scale(0.94)`, on a critically damped spring (`response: 0.5`). The outgoing slide recedes 9% the other way at `scale(0.96)` and fades out over 420ms, starting from its current on-screen position, so an interrupted push never jumps.
- **Same-layout swaps:** moving between slides that share a layout, chapter and section (update to update, one page of a list to the next, one page of highlight cards to the next) does not replay the slide. The chrome (bands, rules, frame, background and footer) stays still, and only the header and body content changes hands, on first visits and revisits alike. The outgoing content clears together within 200ms. The new title then rises 0.7em as it fades in after about 110ms, and the body, badges, visual and source link stage in on beats between 110ms and 230ms with staggers of up to 124ms. Content identical on both slides is left alone, and the footer slide number rolls like an odometer. Because every other move pushes the whole slide, the swap is what makes a run of slides read as one grouped section. A swap can be interrupted: whatever is on screen leaves from where it is.
- **Builds:** a slide's first visit builds in reading order. The headline rises 0.7em as it fades in (`transform` and `opacity`, no mask), then support (body copy, chips, source cards) follows on the x-axis beats `120/300/440/540/620ms`, and citations and decoration fade in last. On the cover and closing slides, the brand rail (Invertocat, node graph, squares) cascades in as spring pops from `scale(0.66) rotate(-6deg)`. Overview figures count up to their totals (900ms in the reel, 1000ms in Present, on an ease-out cubic) in tabular mono numerals so the digits don't jitter; figures under 3 simply appear. On revisits, everything drifts in together over 620ms.
- **Reel:** each slide builds once as it scrolls into view, on the y-axis. Chapter navigation scrolls to the chapter, and its slides build as they arrive.
- **Reduced motion:** every transition becomes a 200ms crossfade, including moves between slides that share a layout, and content is never armed hidden. Hover and press movement is suppressed while color and state feedback stays. PDF and PowerPoint exports are static.
- Only `transform` and `opacity` animate; the one exception is an Overview count-up, whose digits follow a clock animation. A new input cancels an in-flight transition before starting another, and what is on screen leaves from where it is. No idle loop or layout animation is used. The one idle behavior is the Present control bar, which fades out after 2.6s without pointer movement and returns on movement or focus.

### Interactive slides
- **One state model.** A linked row, card or agenda entry carries `--on` (1 while hovered or keyboard-focused), `--press` (1 while pressed) and `--t` (260ms on the way in, 160ms on the way out, 100ms on press). Each effect transitions its real property from those, so hover, focus and press share one set of rules and leaving mid-transition reverses from wherever the value is. Hover applies only under `(hover: hover) and (pointer: fine)`; touch gets the press state.
- **Rows** (lists and section summaries): a tint in the section color sweeps in from the left and deepens on press, the title underlines with a sweep and a go-arrow slides in; in lists the host also steps aside to make room. The whole row is the link.
- **Highlight cards:** lift 4px, draw a 1px ring in the section color, follow the pointer with a soft glow in that color, underline the title and reveal a go-arrow. Pressing scales the card to 0.988.
- **Agenda:** each entry fills its ring, lights its name bright green and jumps to that chapter, in the reel and in Present.
- **Source links:** the link on an update slide fills GitHub Green with Brand Black text and nudges its icon up and right; on the closing slide, a source steps right.
- **Citations:** hovering or focusing a superscript opens one shared source popover: publisher, date, title, the quoted evidence and the host. It is a small dark card that grows from the citation, flips below when it would clip, and swaps in place, without animating, when the pointer moves to a neighboring citation within 300ms. The citation and its footnote light up together. Esc closes the popover first and Present second.
- **Charts:** a bar opens a popover with its total and per-area counts and dims the other bars. Hovering a legend entry isolates that area across the segments, and hovering a segment lights its legend entry.

### Motion constraints
These rules come from failures found while building the deck.
- **No `clip-path` on moving content.** A headline that animated a negative-inset `clip-path` together with a `transform` crashed the renderer in headless Edge on a long scroll sweep. Headlines now rise with `transform` and `opacity`, rules grow with `scaleX` and `scaleY`, and `tests/interact.test.mjs` fails if `clip-path` returns to the slide motion or `deck.css`.
- **No layout change on the sticky rail while the page scrolls.** Showing and hiding a chapter's slide list on every scroll frame of a long sweep crashed the renderer in headless Edge. Scrolling repaints the rail's highlights only, and the current chapter expands once scrolling has rested for 150ms; clicking a chapter or slide expands it at once.
- **Programmatic scrolling is instant.** There is no CSS `scroll-behavior: smooth`. Rail and agenda jumps land immediately, and the slide's own build supplies the motion.
- **Fitted text is measured at rest.** Anything inside a block that shrinks to fit (`data-fit`) only fades, since moving it would change the overflow being measured; the block itself can still rise. The fit tolerance is `0.15em + 1px`: text with nothing cut measures about 0.14em taller than its box because Mona Sans's font box overhangs the tight line boxes, and a looser tolerance cuts the last line's descenders.
- **Movement lives inside `prefers-reduced-motion: no-preference`.** Overriding a hover transform afterwards loses on specificity (`.x a { transform: none }` does not beat `.x a:hover`), so movement is written only for when it is allowed, and color feedback stays unconditional.
- **`will-change` is not used.** A reel can hold 30 or more slides, and permanent layer hints on all of them would cost memory for no gain on short animations.

### Copilot canvas packaging
The briefing ships as a Copilot canvas (`technical-update-briefing`) registered by `extension.mjs`, not as a standalone website. The panel is the same web app, served from a loopback server that starts when the first panel opens and stops with the extension. The panel's width is set by the side pane, so the layout relies on the responsive rules above: below 900px the chapter navigator becomes a drawer.
- **The agent steers the panel; the page stays the source of truth.** `open_canvas` and the `navigate` and `present` actions push a navigate event to the live panel over server-sent events, and the page reports its own state back, so a click by the presenter is never overwritten by stale agent state.
- **Navigation matches the page's own controls.** Changing the edition keeps the current period, clamped to the edition date, as the edition picker does; changing the view without a period retargets the same point in time, as the Week / Month / Year toggle does.
- **Errors are answers.** An unknown edition, period, chapter or slide is rejected with the valid choices rather than silently reinterpreted.
- **Exports stay available both ways.** The panel's Export menu downloads the PDF or PowerPoint; the `export_pptx` action saves the same PowerPoint to Downloads without overwriting an existing file.

## Do's and Don'ts

### Do:
- **Do** keep brand slides on Brand Black (#101411) with Paper text, in both app themes.
- **Do** cite every sentence with a superscript link to the page it came from.
- **Do** use the Display optical size (`"opsz" 72`) for slide titles of 56px and larger.
- **Do** use Mona Sans Mono or `tabular-nums` for counts, dates and slide numbers.
- **Do** animate only `transform` and `opacity`, with ease-out curves or critically damped springs, and remove movement under `prefers-reduced-motion`.
- **Do** keep a grouped section's chrome still when its layout repeats, and swap only the header and body content.
- **Do** give every linked row, card and citation hover, keyboard-focus and press feedback, and gate hover on `(hover: hover) and (pointer: fine)`.
- **Do** group slides into chapters that match the deck sections: Overview, product areas, Events, Close.

### Don't:
- **Don't** set `letter-spacing` on any text.
- **Don't** fill buttons, backgrounds or text blocks with section colors. Use them for icons, a 4px top rule or an outline.
- **Don't** round slide cards or add drop shadows inside slides. The transient source popover is the one exception.
- **Don't** use colored `border-left` stripes wider than 1px as a status marker.
- **Don't** animate from `scale(0)` or use ease-in for entrances. Slides and popovers start at `scale(0.92)` to `0.96`; text rises 0.7em (headlines) or travels 40–96px (support); only the brand rail's spring pops start smaller, at 0.66 to 0.72.
- **Don't** animate `clip-path` on moving text, or change layout on the sticky rail while the page scrolls; both crashed the renderer in headless-browser stress tests.
- **Don't** re-animate a slide's chrome between slides that share a layout. Bands, rules, frames and the footer stay put.
- **Don't** recolor or outline the Invertocat. It appears only in white on dark or black on light.
- **Don't** show a statement, number or chart that has no working source link.
