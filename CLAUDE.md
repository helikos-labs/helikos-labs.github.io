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

- **Styling:** Tailwind CSS via the CDN `<script src="https://cdn.tailwindcss.com">`.
  Do not introduce a local Tailwind build or a `package.json` just for styling.
- **Theme:** dark UI (`bg-gray-950`, `text-gray-100`), **emerald** accent
  (`emerald-400`/`emerald-500`), and a `font-mono` treatment for the wordmark and
  technical labels. Match this palette when adding sections.
- **Responsiveness:** mobile-first; the app grid collapses to one column below
  `md`. Test narrow widths.
- **Accessibility:** keep semantic landmarks (`header`/`main`/`footer`),
  meaningful link text, and sufficient contrast.
- **Self-contained:** prefer inline markup over external assets so the page
  renders even if a CDN is slow.

## The Helikos naming theme

Helikos (Mount Helicon, home of the Muses) — apps are named after Greek
deities and Muses. When adding an app card, follow the convention: a mythic
name, a one-line "what it does," a status badge, and a `Launch App →` link to
`https://<name>.helikos.dev`.

## The apps (portfolio)

> Source repos live under the private `helikos-labs` org and are not readable
> from this Pages repo's session. Descriptions here are the canonical
> marketing copy for the landing page — update them in lockstep with `index.html`.

| App         | Subdomain                   | One-liner                                                        | Status         |
|-------------|-----------------------------|------------------------------------------------------------------|----------------|
| Athena      | athena.helikos.dev          | AI-driven interactive comic creator using multi-modal models     | Proof of Concept |
| Kleio       | kleio.helikos.dev           | Automated audio transcription via high-fidelity speech-to-text   | Proof of Concept |
| Mnemosyne   | mnemosyne.helikos.dev       | Personal contextual graph DB / semantic "second brain"           | In Development |
| PianoQuest  | pianoquest.helikos.dev      | Gamified, interactive piano learning and practice                | Proof of Concept |

Status badges used on the page: `PoC`, `In Development`, `Experimental`.

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
