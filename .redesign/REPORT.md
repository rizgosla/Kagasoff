# REPORT — Kagasoff Law Firm redesign

**Direction:** "Plain English, legal structure" — approved at the Phase 1 gate.
**Tone:** plainspoken + precise (client-selected). **Spec:** `design-system/kagasoff-law-firm/MASTER.md`.
**Iterations:** 1 full verify loop + a targeted a11y fix round. Build green throughout.

---

## ⚠️ Read this first — one uncommitted file was lost

`.gitignore` had **uncommitted local modifications** when this session started
(the opening `git status` showed ` M .gitignore`). During cleanup, the a11y
auditor reverted `package.json`, `package-lock.json`, and `.gitignore` to what
it believed was their "pre-audit state" — but it reverted `.gitignore` to
`HEAD`, discarding your pre-existing edit along with its own.

**Not recoverable through git**: no stash entries, no dangling blobs under
`git fsck`, and the file's mtime (14:57) sits inside the cleanup window.
Unstaged overwrites leave no object behind.

Your editor's local history / undo buffer is the remaining option. `package-lock.json`
was reverted too but regenerates from `npm install`, so it doesn't matter.

Nothing else was touched — every other working-tree change in `git status` is
intended redesign work.

---

## The 8 Phase 0 weaknesses

| # | Weakness | Status |
|---|---|---|
| 1 | Contact form delivers nowhere; fake "Thank you" (`contact.astro:120-135`) | **Partly addressed — deliberately.** The false confirmation is gone. The form now says plainly that it cannot send, **before** the fieldset and again after submit, and offers the phone as a working path. Wiring a real endpoint is a client decision (see below) — CLAUDE.md forbids sending legal problems to a third party without asking. |
| 2 | Fabricated "5.0 (291 reviews)" badge on 3 pages | **Fixed.** `ReviewsBadge.astro` deleted, all usages removed, its CSS removed. No rating markup anywhere; `aggregateRating`/`review` verified absent from built HTML. |
| 3 | Zero SEO metadata infrastructure | **Fixed.** Canonical, OG, Twitter, `LegalService` JSON-LD sitewide; `Service` + `BreadcrumbList` per practice page; generated `sitemap.xml`; `robots.txt`. Unique title + description on all 10 routes. |
| 4 | Form `novalidate` with no accessible replacement | **Fixed.** Real labels, `required`/`aria-required`, per-field `aria-describedby`, `aria-live` summary, `aria-invalid`, focus to first invalid field, validate-on-blur, text-not-colour errors, 17px inputs. |
| 5 | No `<main>` landmark on any of 10 pages | **Fixed.** `<main id="main">` plus a skip link as first tab stop. |
| 6 | No spacing/type tokens; ~165 arbitrary px; 5 raw hex | **Fixed.** Full spacing, type, radius, container scales. **Zero raw hex** outside the token file; **zero arbitrary `max-w-[…]`** in components/pages. |
| 7 | `text-brass` ~3.5:1 sitewide — AA failure | **Fixed at the root.** Brass removed entirely. Every pairing measured; all clear AA for body text. |
| 8 | Unconfirmed business facts shipping live | **Addressed.** Invented hours removed; map still an honest placeholder; suite discrepancy preserved as a marker. 14 `NEEDS-CLIENT` markers, listed below. |

---

## Accessibility

**axe-core WCAG 2.1 AA: 0 violations** across `/`, `/about/`, `/contact/`,
`/practice/criminal-defense/`.

Manual findings, both fixed:

- **Serious (1.4.11)** — `.fld` borders were `--color-line` at **1.34:1** on paper.
  Every contact-form input had no perceivable edge until focus. Added a dedicated
  `--color-field` (`#7D7669`, **4.21:1** paper / **3.72:1** sand) rather than
  darkening `--color-line`, since decorative hairlines don't need 3:1 but form
  controls do.
- **Moderate (1.4.11)** — `PracticeCTA` secondary button used `border-ink/40` at
  **2.26:1**. Now full-opacity `border-ink` (12.08:1) with a fill-swap hover.

Verified passing: keyboard traversal with no traps; skip link; `<details>`-based
menu (not hover-only) with Escape returning focus; mobile menu with scroll lock
and toggling `aria-label`; one `h1` per route; landmarks; `lang="en-US"`; 44px
targets; `prefers-reduced-motion`; 200% zoom; and **no horizontal scroll and no
clipped content at 375px** despite `overflow-x: clip`.

> **Coverage caveat.** axe-core exercises roughly a third of WCAG success
> criteria. Zero automated violations means no *automatable* rule failed — it is
> **not** a conformance certification. No screen-reader testing (NVDA/JAWS/
> VoiceOver) and no testing with real assistive-technology users was performed.
> Given California's Unruh Act exposure, commission an independent audit with
> AT-user testing before launch.

---

## SEO

**0 Blockers.** Unique titles (52–70 chars) and descriptions (≤156) on all 10
routes; self-referencing canonicals; valid JSON-LD; sitemap generated from
`practiceAreas.ts` so a new practice area cannot be forgotten; crawlable `<a href>`
navigation; descriptive link text.

Deliberately **absent** from structured data: `aggregateRating`, `review`,
`openingHours`. No verified values exist, and marking up an unverified rating is
the same liability the review badge represented.

Local SEO: "Westminster" now appears in visible body copy on practice pages
(6× on personal-injury, previously title/schema only), and in About/Contact
titles and copy. NAP is byte-identical everywhere.

Performance: hero portrait is `eager`/`fetchpriority=high` (LCP 400ms, CLS
0.0009). **Deploy size 4.5 MB → 630K** by moving an unused 3.9 MB `hero.jpg` out
of `public/` (moved to `assets/`, not deleted — it's real client photography).

---

## Send to client — all 14 `NEEDS-CLIENT` items

**Blocking launch**
1. **Contact form delivery method** — Netlify Forms, Formspree, or an Astro API
   route. Until chosen, the form honestly says it cannot send. *Privacy note:
   people type legal problems into this box; the destination is a real decision.*
2. **Suite number** — repo says **D4**, the live Wix contact page says **B7**.
   Confirm against the Google Business Profile and match exactly. (3 places.)
3. **Business hours** — currently "call to confirm". Nothing invented.

**Content**
4. Staff names, roles, bios — the "Our team" section was **removed**, not filled.
5. Additional firm values beyond "Attentiveness" — section **removed**.
6. Office map embed for Contact (still a striped placeholder).
7. `og:image` / `twitter:image` — a 1200×630 share asset. `twitter:card` is set
   to `summary` until one exists, since the large-image card renders empty.
8. A 2× portrait — currently 514×644 rendered at 479 CSS px, and it's the LCP element.

**Also unanswered from `BRIEF.md`:** testimonials with attribution, shareable
case results, firm founding date, awards/certifications, service radius, final
hosting choice, and whether old Wix URLs need 301s.

---

## What each pass caught

**Iteration 1** — critic: 1 Blocker, 5 High, 8 Medium. SEO: 0 Blockers, 3 High.
Tokens: clean hex/dead-token, 12 `max-w-[1180px]`. a11y: 0 axe violations, 2 manual.

The Blocker was mine and worth naming: an unlayered `a { color: inherit }` in
`global.css` beat Tailwind's layered utilities and killed **every `text-*` on
every anchor sitewide**. The homepage's primary phone CTA rendered ink-on-ink at
**1.00:1** — invisible, on the band designed to close. I had carried that rule
forward from the original file *together with* its `.btn-brass` workaround; the
workaround was the evidence and I copied it instead of reading it.

Two more of my own: `--spacing-3xl` shadowed Tailwind's container scale, so
`max-w-3xl` compiled to **96px** and collapsed the attorney-advertising
disclaimer into a one-word column; and `--container-prose` was silently ignored
because `max-w-prose` is a hardcoded built-in. Both traps are now documented in
MASTER and `global.css`.

Also corrected: the signature element didn't match its own spec — measured, the
`§` and body copy both sat at x=184, so nothing hung and the rule stopped at the
container. Rebuilt so the hang and bleed are real.

**Iteration 2** — the two manual contrast findings above. No new regressions.

---

## What I'd do next

1. **Wire the form** once the client picks a destination, then re-audit that flow.
2. **Independent a11y audit with AT users** — see the caveat.
3. **A `/practice/` index page.** The `BreadcrumbList` middle node has no URL
   because no hub exists, and it would be a strong "practice areas Westminster"
   landing page.
4. **Compress and 2× the photography**; consider AVIF/WebP.
5. **Revisit `.btn-clay`.** Now that anchors are layered it's redundant, but it's
   used in 10 places across four files — not worth the churn mid-run.
6. **Analytics + 301s** from any indexed Wix URLs, once hosting is chosen.
7. **Consider tokenising the remaining `[54ch]`-style measures.** They're
   semantic and legitimate, but a `--container-*` set would make them greppable.
