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
- **Structure (top → bottom):** fixed nav with a mountain+star **sigil**; HERO
  "the Heavens" (generated starfield + a rotating SVG **orrery** = Antikythera
  motif); **Constellation** section where each app is an interactive `.star` in an
  SVG starmap (plus dim `.future-star`s for unbuilt apps); a `.mountband` Mount
  Helicon silhouette with light rays + dawn glow; **Pantheon** `.colonnade` of
  `.column` shrines (one per app + a `.future` "Asleep" column); a **Lore**
  section; footer. Both stars and columns carry `data-app` and open the same
  **shrine modal** (`#shrine`), populated from the `APPS` object in JS.
- **Adding an app:** add an entry to the `APPS` object, a `<g class="star"
  data-app="…">` in the starmap, and a `.column` in the colonnade. Convert a
  `.future` star/column into a real one as the lab grows.
- **Responsiveness:** fluid `clamp()` type; colonnade is `auto-fit minmax(180px,1fr)`;
  nav links hide under `640px`.
- **Accessibility:** stars/columns are focusable (`tabindex`, `role="button"`),
  Escape closes the modal, `prefers-reduced-motion` disables the orrery/twinkle.
- **Self-contained:** CSS/JS inline; only Google Fonts load remotely; SVG art is
  hand-rolled (no icon CDN), so the page degrades gracefully.

## The Helikos naming theme

Helikos (Mount Helicon, home of the Muses) — apps are named after Greek
deities and Muses. When adding an app, follow the convention: a mythic name, the
deity's **domain/role** (e.g. "Muse of History"), a one-line "what it does," a
status, and an `Enter <App> →` link to `https://<name>.helikos.dev`. Apps appear
twice — as a star in the constellation and as a shrine column in the pantheon.

## The apps (portfolio)

> Source repos live under the private `helikos-labs` org. The descriptions below
> were verified from those repos (via GitHub code search of `index.html`/`package.json`/
> `CLAUDE.md`) and from the maker's portfolio at `asvinang.github.io`. They are the
> canonical marketing copy — update them in lockstep with `index.html`. Apps are
> hosted on **Cloudflare Pages** (`*.pages.dev`) and served at `*.helikos.dev`.

| App         | Subdomain                | What it is                                                                                  | Status         |
|-------------|--------------------------|---------------------------------------------------------------------------------------------|----------------|
| Athena      | athena.helikos.dev       | AI Creative Studio — build worlds, write novels, generate comics; photoreal writing "Study" | Proof of Concept |
| Kleio       | kleio.helikos.dev        | Precision browser transcription; static frontend + serverless speech-to-text (Whisper/Cloud Run) | Proof of Concept |
| Mnemosyne   | mnemosyne.helikos.dev    | 3D knowledge galaxy — a personal "second brain" as a navigable Three.js universe of notes   | In Development |
| PianoQuest  | pianoquest.helikos.dev   | RPG-style game that turns piano practice into a quest across five worlds                     | Proof of Concept |

Status badges used on the page: `PoC`, `In Development`, `Experimental`.

**Not yet on the page:** `kybos.helikos.dev` (`kybos` repo) exists in DNS but its
repo had no readable content at last check — add a card once it has real copy.

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
