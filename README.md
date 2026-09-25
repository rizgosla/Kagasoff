# Kagasoff Law Firm — Website

Production site for **Kagasoff Law Firm, A.P.C.** (Westminster, CA), built with
[Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

Implements "Direction A — Classic Authority": Cormorant Garamond serif headlines,
Libre Franklin body, on a deep-navy / warm-paper / brass palette.

## Getting started

```bash
npm install
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # build, then serve on the real Workers runtime (port 4321)
npm run deploy   # build, then wrangler deploy
```

Requires Node 18.20+ / 20.3+ / 22+.

Every page is still prerendered. The one exception is `/api/intake`, which runs
on demand — see **Contact form** below.

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

`IntakeForm.astro` validates name / phone / message in the browser, then POSTs
JSON to `src/pages/api/intake.ts`, which hands the message to
[Resend](https://resend.com) and emails it to the firm. The confirmation panel
only appears once the server has accepted the message — a failed send shows an
error and tells the visitor to call instead.

The route also drops anything that fills the off-screen `company` honeypot,
answering `200` so a bot gets no signal that it was rejected.

### Required secrets

| Name | What it is |
| --- | --- |
| `RESEND_API_KEY` | From <https://resend.com/api-keys> |
| `INTAKE_TO` | Where consultation requests are delivered |
| `INTAKE_FROM` | Sender, e.g. `Kagasoff Law Firm <intake@kagasofflaw.com>` |

`INTAKE_FROM` **must** be on a domain verified in Resend
(<https://resend.com/domains>) or sending fails with a 403. Resend's
`onboarding@resend.dev` works without DNS setup but can only deliver to the
address that owns the Resend account, so it is for testing only.

Set them in production once per environment:

```bash
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put INTAKE_TO
npx wrangler secret put INTAKE_FROM
```

Locally, copy `.dev.vars.example` to `.dev.vars` (gitignored) — both
`npm run dev` and `npm run preview` read it.

## Deploying

Cloudflare Workers, via `@astrojs/cloudflare`. `npm run build` writes `dist/`:
the prerendered pages plus the Worker that serves `/api/intake`. Static assets
are matched first, so pages are still served straight from the edge and the
Worker only runs for the form endpoint.

```bash
npm run deploy   # astro build && wrangler deploy
```

Worker name, compatibility date and the assets binding live in `wrangler.jsonc`.

> **Note:** `main` in `wrangler.jsonc` points at `dist/_worker.js/index.js`
> because this project is on Astro 5 with `@astrojs/cloudflare` v12. Astro 6 /
> adapter v13 replaces that path with the
> `@astrojs/cloudflare/entrypoints/server` entrypoint — don't change it before
> upgrading, or the build output and the config stop matching.
