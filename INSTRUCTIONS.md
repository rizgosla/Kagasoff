# Drop-in export — Kagasoff Law website

These files complete the Astro build. Your repo currently ships the config,
tokens (`src/styles/global.css`), data (`src/data/practiceAreas.ts`), and
`public/hero.jpg` — but the actual pages, components, and layout were never
committed. This folder is everything needed to render the site exactly as
designed.

## How to install

Copy the contents of this folder into your repo root, preserving paths:

```
repo-export/astro.config.mjs.txt    →  ./astro.config.mjs   (rename: drop the .txt)
repo-export/src/layouts/…           →  ./src/layouts/…
repo-export/src/components/…        →  ./src/components/…
repo-export/src/pages/…            →  ./src/pages/…
```

Then:

```bash
npm install
npm run dev      # http://localhost:4321
```

## What's included (all new)

```
astro.config.mjs.txt             Wires Tailwind v4 via @tailwindcss/vite
                                 (the repo had no config — Tailwind wasn't
                                 actually processing without this).
                                 Rename to astro.config.mjs after copying.
src/layouts/BaseLayout.astro     <head>, Google Fonts, Header + Footer wrapper.
src/components/Header.astro       Navy top nav, Services hover dropdown, phone CTA.
src/components/Footer.astro       Navy-dark footer with practice + firm columns.
src/components/Placeholder.astro  Striped image placeholder (swap for real photos).
src/components/PracticeCTA.astro  Cream closing call-to-action band.
src/pages/index.astro             Home — hero, practice index, approach band, CTA.
src/pages/about.astro             Vision, values, attorney bio.
src/pages/contact.astro           Consultation form (client-side validated).
src/pages/practice/[slug].astro   One template → all 7 practice pages.
```

## Relies on (already in your repo — unchanged)

- `src/styles/global.css` — design tokens (`@theme`) + helper classes
  (`.ph`, `.prow`, `.sidelink`, `.lift`, `.fld`). Not modified.
- `src/data/practiceAreas.ts` — practice-area content + shared process steps.
  The home list, footer, Services menu, contact dropdown, and `/practice/<slug>`
  pages all read from here. Add an object → a new page builds automatically.
- `public/hero.jpg` — the marble-columns hero (served at `/hero.jpg`).

## Notes

- **Contact form** validates name / phone / message client-side and shows a
  confirmation state, but does **not** deliver messages yet. See the `NOTE`
  comment in the `<script>` block for wiring options (Netlify Forms, Formspree,
  or an Astro API route).
- **Photography** is placeholder-only (`<Placeholder>`), matching the current
  codebase. Replace with `<img>` / `<Image>` when real photos are available.
- Fonts load from Google Fonts (Cormorant Garamond + Libre Franklin) in
  `BaseLayout.astro`.
