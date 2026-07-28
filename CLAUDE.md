# CLAUDE.md — Redesign Kit

> Keep this file SHORT. Every non-Explore subagent loads it into its own context
> window, so each line is paid for N times per run. Durable rules only. Process
> supplied by the redesign-kit plugin, not this repo.

## Working principles

Adapted from multica-ai/andrej-karpathy-skills — see NOTICE.md.

**1. Think before coding.** State assumptions explicitly; if uncertain, ask. If
multiple interpretations exist, present them rather than silently picking one. If a
simpler approach exists, say so. If something is unclear, stop and name the confusion.

**2. Simplicity first.** The minimum code that solves the problem. No features beyond
what was asked, no abstractions for single-use code, no configurability nobody
requested, no error handling for impossible states. If you wrote 200 lines and it
could be 50, rewrite it.

**3. Surgical changes.** This is a *redesign*, not a rewrite — the single most
important rule in this file. Touch only what the task names. Don't improve adjacent
code, don't refactor what isn't broken, match existing style even where you'd differ.
Remove imports and variables *your* changes orphaned; mention pre-existing dead code
rather than deleting it. Every changed line traces to the task.

**4. Goal-driven execution.** Turn tasks into verifiable goals before starting.
"Improve the hero" → "hero states what the firm does and for whom, passes AA contrast,
renders without overflow at 375px." State a brief plan as `step → verify: check`.
Strong criteria let you loop without checking in; "make it look better" doesn't.

## Project

- **Repo:** Kagasoff — marketing site for Kagasoff Law Firm, A.P.C. (Westminster, CA).
  Its job is to convert a stressed person searching for a lawyer into a consultation call.
- **Stack:** Astro 5.6 (static), Tailwind CSS v4 via `@tailwindcss/vite`. No UI library.
- **Dev server:** `npm run dev` → http://localhost:4321
- **Build gate:** `npm run build` passes clean
- **Jurisdiction:** California. The Unruh Civil Rights Act attaches statutory damages
  to ADA violations, and web accessibility suits against small professional firms are
  routine here. Treat the AA floor as a real requirement, not a nice-to-have.

## Repo-specific rules

- Tokens live in `src/styles/global.css` under `@theme`, surfacing as Tailwind
  utilities (`bg-navy`, `text-brass`, `font-serif`). **Lead-only file.**
- `src/data/practiceAreas.ts` drives the home list, footer, Services menu, contact
  dropdown, and every `/practice/<slug>` page. Adding an object must be enough to
  produce a new page. **Lead-only file.**
- `src/layouts/BaseLayout.astro` owns `<head>`, fonts, and per-page metadata.
  **Lead-only file.**
- `Placeholder.astro` renders striped boxes where photography goes. Preserve the
  swap-in seam; don't bake in stock images.
- The contact form validates client-side and delivers nowhere. Don't wire it to a
  third-party endpoint without asking — that decision has privacy implications for
  people typing legal problems into a text box.

## Source of truth, in order

1. `BRIEF.md` — the business brief. Beats everything below.
2. `design-system/<slug>/MASTER.md` — generated in Phase 1, then frozen. Page
   overrides in `pages/<page>.md` beat MASTER for that page only.
3. This file.

A worker that wants to deviate from MASTER.md doesn't. It reports the conflict to the
lead and waits. Silent token drift is the top failure mode of parallel UI work.

## Hard rules

- **Tokens only.** No raw hex, no magic px in components. A `#` in a component file
  is a defect. Grep before claiming done.
- **Never invent business facts.** Names, credentials, case results, addresses,
  phones, hours, prices, testimonials. Not in `BRIEF.md` or the repo → mark
  `<!-- NEEDS-CLIENT -->` and move on. On a regulated professional site this is a
  liability question, not a style preference.
- **Content is data.** Adding an entry to the data file must be enough to produce
  the page. Don't hardcode what's already structured.
- **Accessibility floor** (WCAG 2.1 AA, every loop): visible keyboard focus, logical
  tab order, 4.5:1 body / 3:1 large and UI contrast, 44×44px targets, one `h1` and
  ordered headings, landmarks, labels on every control, `alt` on meaningful images and
  `alt=""` on decorative, `lang` on `<html>`, `prefers-reduced-motion` respected,
  no horizontal scroll at 375px, CLS < 0.1.
- **SEO floor** (every page): unique `<title>` and meta description, one `h1`,
  canonical URL, Open Graph tags, semantic landmarks, descriptive link text (never
  "click here"), crawlable `<a href>` navigation, and valid structured data where the
  page type has a schema.
- **No new dependencies** without asking.

## File ownership during parallel work

Workers get exclusive write access to assigned paths. Shared files — the token layer,
the base layout, data files — are **lead-only**. A worker needing a new token requests
it; it does not edit a shared file. Two agents editing one file is silent data loss
and costs you the loser's entire session.

## Definition of done

Build passes → renders at 375/768/1440 → design critic returns zero Blockers and zero
High → a11y audit clean → SEO audit clean → diff introduces no raw hex and no new
unflagged `<!-- NEEDS-CLIENT -->`.

Not "I wrote the code."
