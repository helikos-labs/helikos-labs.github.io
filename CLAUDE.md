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
├── version.json        # Deploy build tracker (bumped per deploy; see Versioning)
├── og-image.png        # 1200×630 social-share image (generated, not hand-edited)
├── scripts/gen-og.mjs  # Build-time generator for og-image.png (Node built-ins only)
├── scripts/bump-version.mjs # Increments version.json + index.html's app-build meta
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
Helikon (home of the Muses) and *kosmos*, the ordered sky: stars, ideas, and
deities. The name **Helikos** weds the two. It expresses this through a
**minimalist, typography-led** layout: lots of negative space, brass-on-midnight,
and a clean card grid rather than ornate SVG scenery. All styling/JS is **inline**
in `index.html` — no Tailwind, no build, no `package.json`.

- **Palette (CSS custom properties in `:root`):** deep midnight (`--void: #080b14`,
  `--night`, `--night-2`) rising to a `--horizon`/`--dawn` amber band behind the
  **towns' mountain ridge**, warm starlight (`--star: #f5f0e3`), cool mist text
  (`--mist`, `--mist-dim`), a **brass/gold accent** (`--brass: #c9a227`,
  `--brass-light`, `--brass-deep`), an `--aegean` secondary glow, an `--ember`
  amber for the town lights, and a faint `--line` brass rule colour. Keep
  brass-on-midnight when adding sections.
- **Typography:** `Cinzel` (inscriptional caps) for the wordmark, section titles,
  and app names; `Cormorant Garamond` for serif body/taglines (italic for lede);
  `JetBrains Mono` for small uppercase labels. Loaded from Google Fonts.
- **Two realms — "As Above, So Below":** **gods** (the deity apps, "As Above") are
  bright **stars** in the night sky; the other apps ("So Below") are lighted
  **towns** descending a mountain. Avoid "games"/"stadium" framing.
- **Structure (top → bottom):** fixed minimal nav with a mountain+star **sigil**
  + `HELIKOS LABS` wordmark and `Gods / Towns / Lore` links; a **typographic hero**
  — a full-height night sky (void→night gradient + brass/aegean radial glows and a
  JS-scattered `.starlayer` twinkle field, no mountains here) carrying the centred
  sigil mark, `HELIKOS` wordmark, tagline and lede; a **Gods** section (`#gods`,
  also starlit) where each god is a bright **`.god-star`** in a vertical
  `role="tablist"` that drives one **`.glass` `.god-panel`** descriptor card
  (`role="tabpanel"`); a **Towns** section (`#towns`) opening with a Mount Helikon
  **`.ridge`** silhouette + `--horizon` dawn band, then a `.slope` of staggered
  **`.town`** `.glass` cards, each with a warm **`.town-light`** lantern; a
  **Lore** section; footer.
- **Gods (stars + glass panel):** the `.god-stars` tablist (one `.god-star`
  button per god) updates the shared `.god-panel` from the **`GODS`** JS object
  (glyph, role, name, desc, status, live) — roving `tabindex`, arrow/Home/End
  keys, `aria-selected`, `aria-live` panel. Athena's panel is hardcoded as the
  no-JS default. Active star gets a starlight glow + sparkle rays.
- **Towns (mountain lights):** each `.town` is a self-contained `.glass` card
  (no JS) — `.town-light` (dimmed via `.town.dim` for unbuilt), `.town-name`,
  `.town-type`, `.town-desc`, and a `.town-foot` with a `Visit →` `.card-link`
  (live) plus a `.card-status` (`.live` for lit towns). Staggered down the slope
  via `:nth-child` `align-self`, joined by a dashed `.slope::before` trail.
- **Adding an app:** a god → add to the `GODS` object **and** a `.god-star`
  button; a town → add a `<article class="town glass">` (add `.dim` if unbuilt) to
  `.slope`. Keep copy in lockstep with the tables below.
- **Responsiveness:** fluid `clamp()` type; `.gods-wrap` is a 2-col grid that
  stacks under `600px` (stars become a wrapping row); towns un-stagger to full
  width on mobile; nav links hide under `600px`.
- **Accessibility:** interactive elements are links and the gods tablist (full
  keyboard support, visible brass focus); `prefers-reduced-motion` disables smooth
  scroll, the reveal transition, the starfield twinkle, and the town-light pulse.
- **Self-contained:** CSS/JS inline; only Google Fonts load remotely; the sigil is
  hand-rolled SVG (no icon CDN), so the page degrades gracefully.
- **Head / SEO / sharing:** `<head>` carries canonical, full OpenGraph + Twitter
  `summary_large_image` tags (pointing at `og-image.png`), a JSON-LD
  `Organization` block, `color-scheme: dark`, and an **inline SVG favicon**
  (the mountain+star sigil as a `data:` URI — no file). Keep these in sync with
  the live domain `https://www.helikos.dev/`.
- **Scroll-reveal:** elements with `.reveal` fade/rise via `.in`, toggled by one
  small IntersectionObserver IIFE; applied to each `.sec-head`, the `.gods-wrap`,
  and the `.slope`. Neutralized under `prefers-reduced-motion` (shown at once) and
  when IO is unavailable. The page has four small IIFEs: starfield scatter, the
  gods tablist, scroll-reveal, and the version checker.

## The Helikos naming theme

Helikos (Mount Helikon + *kosmos*, the ordered sky) — apps are named after the
deities and Muses of myth. **Gods** (the deity apps, "As Above", shown as stars)
carry a short **role/category** (e.g. "Precision Transcription"); **Towns** ("So
Below", lights down the mountain) carry a **type** (e.g. "Music · RPG"). Live apps
surface a launch link (`Enter →` for gods, `Visit →` for towns) to
`https://<name>.helikos.dev`. Keep the role/type lines terse.

## The apps (portfolio)

> Source repos live under the private `helikos-labs` org. The descriptions below
> were verified from those repos (via GitHub code search of `index.html`/`package.json`/
> `CLAUDE.md`) and from the maker's portfolio at `asvinang.github.io`. They are the
> canonical marketing copy — update them in lockstep with `index.html`. Apps are
> hosted on **Cloudflare Pages** (`*.pages.dev`) and served at `*.helikos.dev`.

**Gods (the heavens — bright stars, "As Above"):**

| God        | Subdomain                | What it is                                                                                  | Status         |
|------------|--------------------------|---------------------------------------------------------------------------------------------|----------------|
| Athena     | athena.helikos.dev       | AI Creative Studio — build worlds, write novels, generate comics; photoreal writing "Study" | Proof of Concept |
| Kleio      | kleio.helikos.dev        | Precision browser transcription; static frontend + serverless speech-to-text (Whisper/Cloud Run) | Proof of Concept |
| Mnemosyne  | mnemosyne.helikos.dev    | 3D knowledge galaxy — a personal "second brain" as a navigable Three.js universe of notes   | In Development |

**Towns (the mountain — lights, "So Below"):**

| Town       | Subdomain                | What it is                                                                  | Status (label)         |
|------------|--------------------------|----------------------------------------------------------------------------|------------------------|
| PianoQuest | pianoquest.helikos.dev   | RPG that turns piano practice into a quest across five worlds (Pythian)     | Live — "Lights on" |
| Bitthrone  | (not deployed)           | Mobile-first portrait top-down 2D MOBA brawler (Phaser 3)                   | "Under construction" — no live URL |
| Kybos      | kybos.helikos.dev        | κύβος = die; a small game of chance (Tyche). Repo not yet readable          | "Foundations laid" — reserved |

Status badges used on the page: gods use `Proof of Concept`/`In Development`;
towns use light/build labels (`Lights on`/`Under construction`/`Foundations laid`).
Unbuilt towns (`.town.dim`, no live URL) show a status pill instead of a launch
link; lit towns get `.card-status.live`.

## Editing the landing page

- To add or change an app, edit it in `index.html` (gods: the `GODS` object + its
  `.god-star`; towns: its `.town` card) and the table above. Keep both in sync.
- Keep copy concise (one or two sentences per app).
- The footer year and "Helikos Labs" attribution should stay current.

## Versioning (stale-cache refresh)

A lightweight deploy tracker keeps returning visitors from sitting on a stale
cached page:

- **`version.json`** (`{ version, build, released, commit }`) is served at the
  site root; `build` is the repo's **commit count** (monotonic, stateless).
- **`index.html`** bakes the same build into `<meta name="app-build" content="…">`.
- A small IIFE compares the baked-in build against a `no-store` fetch of
  `version.json` (on load, on tab refocus, and every 5 min). If the live build is
  newer it **reloads silently when the tab is hidden**, or shows an accessible
  `role="status"` "Refresh" prompt (`.update-bar`) when the page is in view —
  never yanking content out from under an active reader.
- **Auto-bumped at deploy:** the Pages workflow runs `node scripts/bump-version.mjs`
  in the runner before uploading the artifact, so every deploy serves a fresh
  build computed from the commit count — no commit-back, no loops. The
  `version.json`/`app-build` values **committed in the repo are placeholders**;
  the authoritative numbers are stamped at deploy time.
- You can still run `node scripts/bump-version.mjs` locally (e.g. to preview);
  it uses the same commit-count rule (Node built-ins only — no toolchain).

## Deploying

GitHub Pages deploys via the **GitHub Actions** workflow
(`.github/workflows/static.yml`) on every push to the default branch — merging to
it deploys. The workflow **auto-stamps the build number** before publishing (see
Versioning), so returning clients pick up the new version automatically. No manual
build or release step.

## Working agreements for Claude

- Do not add a toolchain (npm/bundler/framework) to a static one-file site
  without explicit user approval.
- Keep the brass-on-midnight, typography-led minimalist identity consistent.
- App marketing copy that can't be verified against live apps or source repos
  should be flagged to the user rather than invented as fact.
