# PLAN — Kagasoff redesign

Direction: **"Plain English, legal structure"** — approved at the Phase 1 human
gate, full proposal. Tone: **plainspoken + precise** (client-selected mix).
Frozen spec: `design-system/kagasoff-law-firm/MASTER.md`.

## Ownership map — no path appears twice

| Owner | Writable paths | Status |
|---|---|---|
| **LEAD** | `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/SectionIndex.astro`, `src/components/Photo.astro`, `src/components/Placeholder.astro`, `src/data/practiceAreas.ts`, `src/pages/sitemap.xml.ts`, `public/robots.txt` | **done, pre-spawn** |
| **W1** signature-builder | `src/pages/index.astro` | assigned |
| **W2** ui-implementer | `src/components/Header.astro`, `src/components/Footer.astro` | assigned |
| **W3** ui-implementer | `src/pages/practice/[slug].astro`, `src/components/PracticeCTA.astro`, `src/components/PracticeMarquee.astro` | assigned |
| **W4** ui-implementer | `src/pages/about.astro`, `src/pages/contact.astro` | assigned |

`src/components/ReviewsBadge.astro` is **deleted** (fabricated rating). W1 and W4
each remove the import + usage from their own files. The build is red until both
land — expected, resolved at the first Phase 3 gate.

## Lead work completed before spawn

Workers build against tokens that already exist.

1. **Token layer rewritten** (`global.css`) — ink/paper/sand/clay palette,
   spacing scale, type scale, radii, one shadow. Killed `.starfield`, the
   `.avstack`/`.stars` badge CSS, and every raw hex in the stylesheet.
   Added `:focus-visible` rings and `.skip-link`.
2. **Signature element** (`SectionIndex.astro`) — shared, so lead-owned. Renders
   `§ 01 ── label ─────`. Decorative parts `aria-hidden`.
3. **BaseLayout** — Newsreader + Libre Franklin; canonical, OG, Twitter;
   `LegalService` JSON-LD from verified facts only; **`<main id="main">`
   landmark** (weakness #5); skip link.
4. **Sitemap + robots** — `sitemap.xml.ts` generates from `practiceAreas.ts`,
   so a new entry produces a page *and* lists it. No new dependency.
5. **Photo.astro** — retokenised; added `priority` for the hero (LCP).

## Acceptance criteria — every task

Verifiable checks, not vibes. Applies to all four workers.

- `npm run build` passes. **Node is not on the inherited PATH** — prefix every
  command: `$env:Path = "C:\Program Files\nodejs;" + $env:Path`
- Zero raw hex and zero magic px in owned files. `grep -n '#[0-9a-fA-F]\{3,6\}'`
  over your files returns nothing. Use tokens: `bg-ink`, `text-clay`,
  `text-body`, `p-lg`, `gap-md`, `rounded-md`, `shadow-card`.
- Contrast: body ≥4.5:1, large/UI ≥3:1. `claylight` **only** at ≥24px or
  bold ≥19px on ink. Never `claylight` for body copy.
- Exactly one `<h1>` per page; headings descend without skipping.
- Every interactive element: visible `:focus-visible`, ≥44×44px target.
- `alt` on meaningful images, `alt=""` on decorative.
- No horizontal scroll at 375px; holds at 200% zoom.
- Motion 150–300ms, opacity/transform only, no layout-shifting hover.
- **No invented business facts.** Anything not in `BRIEF.md` or the repo gets
  `<!-- NEEDS-CLIENT -->`. No case results, ratings, testimonials, hours,
  awards, or founding dates.
- Practice-area content comes from `practiceAreas.ts`. Never hardcoded.

## Verify loop (Phase 3)

Review set — representative routes, not all ten. The seven practice pages are
one template and count as one page for browser review.

- `/` (W1), `/practice/criminal-defense/` (W3), `/about/` (W4), `/contact/` (W4, form)
- `seo-auditor` is the exception: runs against all 10 routes, since its findings
  are per-page metadata.

Exit: zero Blockers + zero High (critic), zero Critical + zero Serious (a11y),
zero Blockers (SEO), build green, token audit clean. Max 4 iterations.
