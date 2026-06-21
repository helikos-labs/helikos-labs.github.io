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
├── index.html      # The entire landing page (HTML + Tailwind via CDN)
├── CLAUDE.md       # This file
└── .github/        # GitHub Pages / workflow config
```

Keep the site a single self-contained `index.html` unless there's a strong
reason to add assets. No npm, no bundler, no framework.

## Tech & conventions

The site has its **own mythic identity** — "As Above, So Below: The Helikos
Mechanism" — deliberately distinct from the maker's portfolio. The concept is a
vertical descent from the heavens to the mountain, themed on Mount Helicon (home
of the Muses) and the **Antikythera mechanism** (the first computer was Greek).
All styling/JS is **inline** in `index.html` — no Tailwind, no build, no `package.json`.

- **Palette (CSS custom properties in `:root`):** deep midnight (`--void: #080b14`,
  `--night`, `--night-2`), a `--horizon`/`--dawn` amber glow at the mountain base,
  warm starlight (`--star: #f5f0e3`), cool mist text (`--mist`, `--mist-dim`), and
  a **brass/gold accent** (`--brass: #c9a227`, `--brass-light`, `--brass-deep`)
  with an `--aegean` secondary. Keep brass-on-midnight when adding sections.
- **Typography:** `Cinzel` (inscriptional caps) for the wordmark, section titles,
  and app names; `Cormorant Garamond` for serif body/taglines (italic for lede);
  `JetBrains Mono` for small uppercase labels. Loaded from Google Fonts.
- **Two realms — "As Above, So Below":** the site splits apps into **gods**
  (utilities, in the heavens) and **games** (in the stadium below).
- **Structure (top → bottom):** fixed nav with a mountain+star **sigil**; HERO
  "the Heavens" (generated starfield + a rotating SVG **orrery** = Antikythera
  motif); **Constellation** ("Gods in the Stars") where each *god* app is an
  interactive `.star` in an SVG starmap (plus dim `.future-star`s); a `.mountband`
  Mount Helicon silhouette with rays + dawn glow; **Pantheon** `.colonnade` of
  `.column` shrines (the built gods + a `.future` "Asleep" column); **Stadium**
  ("Games in the Arena") — a torchlit amphitheater (`.theatron` SVG) of `.niche`
  alcoves with flickering `.brazier`/`.flame`, one per *game* + an `.empty` lane;
  a **Lore** section; footer.
- **Two modals:** gods (stars + columns, `data-app`) open the brass **shrine
  modal** (`#shrine`) from the `APPS` object; games (niches, `data-game`) open the
  torchlit **arena modal** (`#arena`) from the `GAMES` object. Games without a live
  URL (`live: null`) show a status pill instead of an "Enter the Arena" button.
- **Adding a god:** add to `APPS`, a `<g class="star" data-app="…">` in the
  starmap, and a `.column` in the colonnade. **Adding a game:** add to `GAMES` and
  a `.niche` (with `data-game`) in `.niches`. Convert a `.future`/`.empty`
  placeholder into a real one as the lab grows.
- **Responsiveness:** fluid `clamp()` type; colonnade & niches are
  `auto-fit minmax(~180px,1fr)`; nav links hide under `640px`.
- **Accessibility:** stars/columns/niches are focusable (`tabindex`,
  `role="button"`), Escape closes either modal, `prefers-reduced-motion` disables
  the orrery/twinkle/flame.
- **Self-contained:** CSS/JS inline; only Google Fonts load remotely; SVG art is
  hand-rolled (no icon CDN), so the page degrades gracefully.

## The Helikos naming theme

Helikos (Mount Helicon, home of the Muses) — apps are named after Greek
deities and Muses. **Gods** (utilities) live in the heavens/pantheon with a
**domain/role** (e.g. "Muse of History") and an `Enter <App> →` shrine link.
**Games** live in the stadium with a **contest** name (e.g. "The Pythian Contest")
and an `Enter the Arena →` link. Both follow `https://<name>.helikos.dev`.

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
- Keep the emerald-on-dark, mono-accent visual identity consistent.
- App marketing copy that can't be verified against live apps or source repos
  should be flagged to the user rather than invented as fact.
