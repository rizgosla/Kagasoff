# Kagasoff Law Firm — Website

Production site for **Kagasoff Law Firm, A.P.C.** (Westminster, CA), built with
[Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

Implements "Direction A — Classic Authority": Cormorant Garamond serif headlines,
Libre Franklin body, on a deep-navy / warm-paper / brass palette.

## Getting started

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # static production build → ./dist
npm run preview  # preview the production build locally
```

Requires Node 18.20+ / 20.3+ / 22+.

## Project structure

```
src/
  layouts/
    BaseLayout.astro      # <head>, fonts, Header + Footer wrapper
  components/
    Header.astro          # full-width top nav
    Footer.astro          # full-width footer (practice + firm columns)
    Placeholder.astro     # striped image placeholder — swap for real photos
    PracticeCTA.astro     # reusable cream call-to-action band
  data/
    practiceAreas.ts      # the 7 practice areas + shared "process" steps
  pages/
    index.astro           # home
    about.astro           # firm vision, values, attorney bio
    contact.astro         # consultation form (client-side validation)
    practice/[slug].astro # ONE template → all 7 practice pages
  styles/
    global.css            # Tailwind import + @theme design tokens + helpers
```

## Editing content

- **Practice areas** — everything (names, blurbs, overview copy, matter lists)
  lives in `src/data/practiceAreas.ts`. Add or edit entries there and the home
  list, footer, contact dropdown, and `/practice/<slug>` pages all update. Adding
  a new object automatically creates a new page at build time.
- **Design tokens** — colors and fonts are defined once in `src/styles/global.css`
  under `@theme` (`--color-navy`, `--color-brass`, `--font-serif`, …) and used as
  Tailwind utilities (`bg-navy`, `text-brass`, `font-serif`).

## Images

Every photo is currently a striped `<Placeholder>` with a label describing what
belongs there (hero, attorney portrait, office, map). To swap one in:

1. Drop the asset in `public/images/`.
2. Replace the `<Placeholder label="…" />` with an `<img>` (or a `<picture>` /
   Astro `<Image>` for optimization) pointing at `/images/your-file.jpg`.

The Westminster office map placeholder can be replaced with an embedded Google
Maps iframe.

## Contact form

`contact.astro` validates name / phone / message client-side and shows a
confirmation state. It does **not** yet deliver messages — wire the submit handler
to your provider of choice:

- **Netlify Forms** — add `data-netlify="true"` to the `<form>` and remove the
  `preventDefault` handler, or
- **Formspree / API route** — `POST` the form data in the submit handler, or
- an **Astro API route** under `src/pages/api/`.

See the `NOTE` comment in the `<script>` block.

## Deploying

`npm run build` outputs a fully static site to `dist/` — host it on Netlify,
Vercel, Cloudflare Pages, GitHub Pages, or any static host. No server required
unless you add an API route for the contact form.
