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

The page uses a **warm editorial design system** modelled on the maker's personal
site, `asvinang.github.io` (the design reference). All styling is **inline** in
`index.html` — no Tailwind, no build, no `package.json`.

- **Palette (CSS custom properties in `:root`):** cream background (`--bg: #faf9f6`,
  `--bg-warm: #efebe9`), cocoa ink (`--ink: #3e2723` and lighter `--ink-mid`,
  `--ink-light`, `--ink-faint`), and a **terracotta accent** (`--accent: #e64a19`).
  Borders use `--rule` / `--rule-light`. Keep this palette when adding sections.
- **Typography:** `Instrument Serif` for display/headings (with an italic
  `<em>` in terracotta for emphasis), `DM Sans` for body, `JetBrains Mono` for
  small uppercase labels/tags, `Aboreto` for the `HELIKOS·LABS` wordmark. Loaded
  from Google Fonts.
- **Components:** fixed blurred nav, serif hero, `.section-label` + `.section-title`
  pattern, `.projects-grid` of `.project-card`s (each opens a detail **modal** via
  `data-*` attributes), floating `.dot-nav`, `.toolbox-grid` stack, contact cards,
  scroll-reveal (`.reveal` + IntersectionObserver). Icons via the `lucide` CDN.
- **Responsiveness:** mobile-first; the app grid is `auto-fill minmax(320px, 1fr)`
  and collapses to one column on narrow screens; dot-nav hides under `768px`.
- **Accessibility:** semantic landmarks, focusable cards, Escape-to-close modal,
  meaningful link text, sufficient contrast.
- **Self-contained:** CSS/JS are inline; only fonts and `lucide` icons load from a
  CDN, and the page degrades gracefully if they are slow.

## The Helikos naming theme

Helikos (Mount Helicon, home of the Muses) — apps are named after Greek
deities and Muses. When adding an app card, follow the convention: a mythic
name, a one-line "what it does," a status badge, and a `Launch App →` link to
`https://<name>.helikos.dev`.

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
