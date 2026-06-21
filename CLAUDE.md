# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## What this repository is

This is the public landing page for **Helikos Labs**, served via **GitHub Pages**
at the apex domain (the `helikos-labs.github.io` repo). It is a single, static,
dependency-free site whose job is to introduce the lab's portfolio of small
AI-native apps, each hosted on its own `*.helikos.dev` subdomain.

There is **no build step**. `index.html` is shipped as-is. Open it in a browser
to preview; push to the default branch to deploy.

## Project structure

```
.
├── index.html          # The entire landing page (inline CSS/JS, no build)
├── og-image.png        # 1200×630 social-share image (generated, not hand-edited)
├── scripts/gen-og.mjs  # Build-time generator for og-image.png (Node built-ins only)
├── CLAUDE.md           # This file
├── CNAME               # Custom domain (www.helikos.dev)
└── .github/            # GitHub Pages / workflow config
```

Keep the site a single self-contained `index.html` unless there's a strong
reason to add assets. No npm, no bundler, no framework. The one binary asset is
`og-image.png` (link-preview image); regenerate it with `node scripts/gen-og.mjs`
rather than editing the PNG by hand — the generator is dependency-free (Node's
`zlib` only) and does not run at deploy time, so the site stays build-less.

## Tech & conventions

The site keeps its **mythic identity** — "As Above, So Below" — themed on Mount
Helicon (home of the Muses) and the **Antikythera mechanism** (the first computer
was Greek), but expresses it through a **minimalist, typography-led** layout: lots
of negative space, brass-on-midnight, and a clean card grid rather than ornate SVG
scenery. All styling/JS is **inline** in `index.html` — no Tailwind, no build, no
`package.json`.

- **Palette (CSS custom properties in `:root`):** deep midnight (`--void: #080b14`,
  `--night`, `--night-2`) rising to a `--horizon`/`--dawn` amber band behind the
  hero mountains, warm starlight (`--star: #f5f0e3`), cool mist text (`--mist`,
  `--mist-dim`), a **brass/gold accent** (`--brass: #c9a227`, `--brass-light`,
  `--brass-deep`), an `--aegean` secondary glow, and a faint `--line` brass rule
  colour. Keep brass-on-midnight when adding sections.
- **Typography:** `Cinzel` (inscriptional caps) for the wordmark, section titles,
  and app names; `Cormorant Garamond` for serif body/taglines (italic for lede);
  `JetBrains Mono` for small uppercase labels. Loaded from Google Fonts.
- **Two realms — "As Above, So Below":** the site splits apps into **gods**
  (utilities, "As Above") and **games** ("So Below"), each its own section.
- **Structure (top → bottom):** fixed minimal nav with a mountain+star **sigil**
  + `HELIKOS LABS` wordmark and `Gods / Games / Lore` links; an **atmospheric but
  typographic hero** — a full-height "sky above, mountains below" scene (layered
  void→night→horizon gradient + brass/aegean radial glows, a JS-scattered
  `.starlayer` twinkle field, a `.dawnglow` behind a two-range Mount Helicon
  `.mountains` SVG silhouette with a brass ridge) carrying the centred sigil mark,
  `HELIKOS` wordmark, tagline and lede; a **Gods** section (`#gods`) of `.card`s in
  a `.grid`; a hairline `.realm-rule` divider; a **Games** section (`#games`) of
  `.card`s; a **Lore** section; footer. No colonnade, theatron, braziers, modals,
  or dot-nav — those stay removed; the scenery lives only as hero backdrop.
- **Cards:** each app is a self-contained `.card` (no modals, no JS data objects) —
  glyph (Greek letter / `♪`), `.card-name`, `.card-role`, `.card-desc`, and a
  `.card-foot` with an `Enter →` `.card-link` (live apps) plus a `.card-status`
  pill. Unbuilt apps use `.card.is-dormant` (dimmed glyph/role, no hover lift) and
  show only a status pill — no link. Live status pills get `.card-status.live`.
- **Adding a god/game:** add an `<article class="card">` (or `.card.is-dormant`)
  to the matching `.grid`. Copy lives directly in the HTML — keep it in lockstep
  with the tables below. There are no `APPS`/`GAMES` JS objects anymore.
- **Responsiveness:** fluid `clamp()` type; grids are `auto-fit minmax(290px,1fr)`;
  nav links hide under `600px`.
- **Accessibility:** the only interactive elements are links (`a:focus-visible`
  gets a brass outline); `prefers-reduced-motion` disables smooth scroll, the
  reveal transition (content shown at once), and the starfield twinkle.
- **Self-contained:** CSS/JS inline; only Google Fonts load remotely; the sigil is
  hand-rolled SVG (no icon CDN), so the page degrades gracefully.
- **Head / SEO / sharing:** `<head>` carries canonical, full OpenGraph + Twitter
  `summary_large_image` tags (pointing at `og-image.png`), a JSON-LD
  `Organization` block, `color-scheme: dark`, and an **inline SVG favicon**
  (the mountain+star sigil as a `data:` URI — no file). Keep these in sync with
  the live domain `https://www.helikos.dev/`.
- **Scroll-reveal:** elements with `.reveal` fade/rise via `.in`, toggled by one
  small IntersectionObserver IIFE; applied to each `.sec-head` and each `.grid`.
  Neutralized under `prefers-reduced-motion` (shown at once) and when IO is
  unavailable. The page has just two tiny IIFEs: the starfield scatter and this
  scroll-reveal.

## The Helikos naming theme

Helikos (Mount Helicon, home of the Muses) — apps are named after Greek
deities and Muses. **Gods** (utilities, "As Above") carry a short **role/category**
(e.g. "Precision Transcription"); **Games** ("So Below") carry a **type**
(e.g. "Music · RPG"). Both surface an `Enter →` link to `https://<name>.helikos.dev`
when live. Keep the role/type lines terse.

## The apps (portfolio)

> Source repos live under the private `helikos-labs` org. The descriptions below
> were verified from those repos (via GitHub code search of `index.html`/`package.json`/
> `CLAUDE.md`) and from the maker's portfolio at `asvinang.github.io`. They are the
> canonical marketing copy — update them in lockstep with `index.html`. Apps are
> hosted on **Cloudflare Pages** (`*.pages.dev`) and served at `*.helikos.dev`.

**Gods (the heavens / pantheon):**

| God        | Subdomain                | What it is                                                                                  | Status         |
|------------|--------------------------|---------------------------------------------------------------------------------------------|----------------|
| Athena     | athena.helikos.dev       | AI Creative Studio — build worlds, write novels, generate comics; photoreal writing "Study" | Proof of Concept |
| Kleio      | kleio.helikos.dev        | Precision browser transcription; static frontend + serverless speech-to-text (Whisper/Cloud Run) | Proof of Concept |
| Mnemosyne  | mnemosyne.helikos.dev    | 3D knowledge galaxy — a personal "second brain" as a navigable Three.js universe of notes   | In Development |

**Games (the stadium):**

| Game       | Subdomain                | What it is                                                                  | Status (label)         |
|------------|--------------------------|----------------------------------------------------------------------------|------------------------|
| PianoQuest | pianoquest.helikos.dev   | RPG that turns piano practice into a quest across five worlds (Pythian)     | Live — "Now competing" |
| Bitthrone  | (not deployed)           | Mobile-first portrait top-down 2D MOBA brawler (Phaser 3)                   | "In training" — no live URL |
| Kybos      | kybos.helikos.dev        | κύβος = die; a game of fortune (Tyche). Repo not yet readable              | "Awaiting the games" — reserved |

Status badges used on the page: gods use `Proof of Concept`/`In Development`;
games use flavor labels (`Now competing`/`In training`/`Awaiting the games`).
Games with `live: null` render a status pill instead of a launch button.

## Editing the landing page

- To add or change an app, edit the corresponding card in the app grid in
  `index.html` and the table above. Keep both in sync.
- Keep copy concise (one or two sentences per app).
- The footer year and "Helikos Labs" attribution should stay current.

## Deploying

GitHub Pages publishes from the default branch automatically — merging to it
deploys. No manual build or release step.

## Working agreements for Claude

- Do not add a toolchain (npm/bundler/framework) to a static one-file site
  without explicit user approval.
- Keep the brass-on-midnight, typography-led minimalist identity consistent.
- App marketing copy that can't be verified against live apps or source repos
  should be flagged to the user rather than invented as fact.
