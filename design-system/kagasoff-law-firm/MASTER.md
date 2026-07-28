# Design System Master File — Kagasoff Law Firm, A.P.C.

> **LOGIC:** When building a specific page, first check `design-system/kagasoff-law-firm/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.
>
> **This file is FROZEN after Phase 1 approval.** A worker that wants to deviate
> does not deviate — it reports the conflict to the lead and waits.

**Project:** Kagasoff Law Firm, A.P.C. (Westminster, CA)
**Category:** Legal Services — multi-practice, solo attorney
**Generated:** 2026-07-28 · revised by lead in Phase 1
**Stack:** Astro 5.6 static + Tailwind CSS v4 via `@tailwindcss/vite`

---

## Provenance — what the generator produced and what changed

The raw `ui-ux-pro-max --design-system` run mis-resolved this project to a
developer-tool product type. Its own color note read *"Code green + difficulty
amber on dark."* It proposed `#22C55E` on `#0F172A`, Poppins/Open Sans, and an
**"Enterprise Gateway"** page pattern with *Contact Sales + Login*, mega-menu
navigation, client logos, and "Solutions by Industry / by Role."

Queried directly, the same database's **Legal Services** product row says:

- Primary style: **Trust & Authority + Minimalism**; secondary **Accessible & Ethical**
- Landing pattern: **Trust & Authority + Minimal** — *not* Enterprise Gateway
- Palette focus: **Navy + Gold + White**

**Rejected from the generated output:** the entire dark green/amber palette,
Poppins/Open Sans, the Enterprise Gateway pattern, and the style keywords
pushing *"case studies with metrics," "before/after comparisons," "metric pulse
animations," "certificate carousel."* A solo firm with zero client-approved case
results has nothing to put in those slots — those keywords lead directly to
inventing business facts, which is a liability question on a regulated
professional site, not a style preference.

**Also rejected — the DB's own legal default.** Navy + gold + Garamond is the
single most predictable law-firm system in existence, and the brief says
*approachable-not-corporate*. Gold/brass signals marble-lobby prestige. It is
also the source of a measured sitewide AA failure in the current build. Kept the
navy anchor; replaced the gold. Details below.

---

## Direction

**Purpose.** Convert a stressed person searching for a lawyer into a
consultation call.

**Tone — one voice: `plainspoken, precise`. Client-approved.**

Not *authoritative* (the law-firm default; produces the marble-lobby site the
brief rules out). Not *warm* (goes mushy against criminal defense and
restraining orders).

Read as a single rule: **plain words, exact facts.** Every sentence must satisfy
both halves.

- **Plainspoken** — ordinary language, no legalese, no posturing, no padding.
  "If you've been arrested" beats "should you find yourself subject to custodial
  detention." Short sentences. Second person.
- **Precise** — the plain words must carry *specific* content, not reassurance.
  Name the board, the court, the deadline, the actual next step. "We appear
  before the Dental Board of California" beats "we handle licensing matters."

The failure mode this guards against: plainspoken alone drifts into empty
comfort ("we're here for you"), precise alone drifts into jargon. The test for
any sentence — **could a stressed non-lawyer read it once and know something
concrete they didn't know before?** If no, cut or rewrite it.

**Hard constraint:** precision may never be manufactured. Specificity comes only
from `BRIEF.md` or the repo. Where a precise fact is missing, the sentence gets
cut or marked `<!-- NEEDS-CLIENT -->` — it is never filled with a plausible
invention. On this site an invented specific is a liability, and the *precise*
half of this tone is exactly where that pressure will show up.

**Constraint.** WCAG 2.1 AA is a hard floor. California's Unruh Civil Rights Act
attaches statutory damages to ADA violations and web suits against small
professional firms are routine here. Every pairing below is measured, not
estimated.

**Differentiator.** The site is **organized like a legal document and written in
plain English.** Numbered sections, marginal rules, a hanging `§` index — the
structural furniture of law — carrying language with no legalese in it at all.
The tension between the two *is* the design. It reads regional and unpretentious
without a single palm tree, sunset gradient, or scales-of-justice icon.

**Signature element — the ruled margin index.**
A hairline `clay` rule under every section eyebrow, running full-bleed to the
viewport edge, with the section mark set hanging in the left margin
(`§ 01`, `§ 02` …) in Libre Franklin uppercase micro-caps.

- Meaningful, not decorative — `§` is a legal mark, earning its place.
- Costs no imagery, no JS, no dependency.
- Collapses cleanly at 375px (index moves inline above the rule).
- Marked `aria-hidden="true"`; never the only cue for anything.

**Explicitly removed: the navy starfield.** `.starfield` in `global.css:453` is
a twinkle effect the source comment attributes to a SaaS/agency site. Stars are
decoration with no meaning on a page about restraining orders and criminal
defense, and it is exactly the borrowed-template look the brief rules out.

---

## Color Palette

Tailwind v4 `@theme` tokens in `src/styles/global.css`. **Lead-only file.**

| Token | Hex | Role |
|-------|-----|------|
| `--color-ink` | `#1B2A3A` | Headings, body text on light, dark sections. Desaturated navy-slate — reads as ink, not corporate blue. |
| `--color-inkdeep` | `#121D28` | Footer, deepest bands |
| `--color-paper` | `#FAF7F1` | Page background, warm white |
| `--color-sand` | `#EFE9DE` | Alternating section bands, card fills |
| `--color-clay` | `#9A4A2F` | **The single accent.** Links, eyebrows, primary button fill, the margin rule. |
| `--color-claylight` | `#DA8A66` | Accent **on dark grounds** — cleared for body text on both `ink` and `inkdeep`. |
| `--color-stone` | `#55606D` | Secondary/meta text on light |
| `--color-mist` | `#C9D2DD` | Body text on ink |
| `--color-line` | `#DED7C9` | Hairlines, borders, dividers |

### Measured contrast — WCAG 2.1

| Pairing | Ratio | Body 4.5:1 | Large/UI 3:1 |
|---|---:|---|---|
| `ink` on `paper` | **13.65** | PASS | PASS |
| `ink` on `sand` | **12.08** | PASS | PASS |
| `paper` on `ink` | **13.65** | PASS | PASS |
| `mist` on `ink` | **9.55** | PASS | PASS |
| `stone` on `paper` | **5.99** | PASS | PASS |
| `stone` on `sand` | **5.30** | PASS | PASS |
| `clay` on `paper` | **5.79** | PASS | PASS |
| `clay` on `sand` | **5.12** | PASS | PASS |
| `paper` on `clay` (button label) | **5.79** | PASS | PASS |
| `claylight` on `ink` | **5.43** | PASS | PASS |
| `claylight` on `inkdeep` | **6.34** | PASS | PASS |

For reference, the palette this replaces: `brass #9c7a3c` on `paper` = **3.76:1**
and on `cream` = **3.48:1** — below the AA body floor at every one of its ~8
sitewide usages. That is Phase 0 weakness #7, confirmed by computation.

**Amended in Phase 3.** `claylight` was `#C8724F` (4.15:1 on `ink`), restricted
to large text and UI. Two workers independently hit the same wall: the 12px
eyebrow in `.sindex-dark` is small text, so the signature element failed AA on
every dark ground. Lightening the token to `#DA8A66` clears the body floor on
both dark grounds and removes the size restriction entirely — one fewer rule to
get wrong, rather than a per-page workaround. **Every pairing in this system now
clears AA for body text.**

**Layout token:** `--container-page: 1180px` → `max-w-page`. Use it. Hardcoded
`max-w-[1180px]` / `max-w-6xl` is a magic-px defect.

**⚠ Two Tailwind v4 namespace traps, both verified in compiled CSS:**

1. **Never write `max-w-sm/md/lg/xl/2xl/3xl`.** The `--spacing-*` tokens share
   those names and Tailwind resolves `max-w-<name>` against the *spacing*
   namespace first. `max-w-3xl` compiles to `var(--spacing-3xl)` = **96px**,
   which collapsed the footer's attorney-advertising disclaimer into a
   one-word column. Adding `--container-3xl` does **not** win it back.
2. **`max-w-prose` is a built-in hardcoded to 65ch** and does not resolve
   through `--container-*`. A `--container-prose` token is silently ignored.

   Safe widths: `max-w-page` (1180px), `max-w-prose` (65ch, built-in),
   `max-w-measure` (46ch), or an explicit arbitrary value like `[54ch]`.

---

## Typography

| Role | Stack | Weights |
|------|-------|---------|
| Display / headings | `"Newsreader", Georgia, serif` | 400, 500, 600 |
| Body / UI | `"Libre Franklin", system-ui, sans-serif` | 300, 400, 500, 600 |

```css
@import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Libre+Franklin:wght@300;400;500;600&display=swap');
```

**Why not the current Cormorant Garamond.** Cormorant is a *display* Garamond —
very high stroke contrast, very light. It reads luxury/prestige, which is the
tone the brief rules out, and its hairlines genuinely degrade for low-vision
readers at body and sub-head sizes. **Newsreader** is drawn for long-form
reading, holds a sturdier color, and reads civic/newspaper rather than
marble-lobby. That is the plainspoken register.

**Libre Franklin is retained** — already loaded, humanist, wide weight range. One
font swap, not two. Surgical.

### Type scale — tokens, not magic numbers

| Token | Size / line-height | Use |
|-------|--------------------|-----|
| `--text-eyebrow` | 12px / 1.2, `0.14em` tracking, uppercase | Section eyebrows, `§` index |
| `--text-meta` | 14px / 1.5 | Captions, meta, footer |
| `--text-body` | 17px / 1.65 | Body copy |
| `--text-lead` | 20px / 1.55 | Intro paragraphs |
| `--text-h3` | 24px / 1.25 | Card titles |
| `--text-h2` | clamp(28px, 4vw, 40px) / 1.15 | Section headings |
| `--text-h1` | clamp(36px, 6vw, 60px) / 1.08 | Page title, one per page |

Must hold at 200% browser zoom with no horizontal scroll at 375px.

---

## Spacing scale

Phase 0 found **~165 arbitrary px values** and **no spacing tokens at all**
(weakness #6). These tokens exist so that stops.

| Token | Value |
|-------|-------|
| `--space-2xs` | 4px |
| `--space-xs` | 8px |
| `--space-sm` | 12px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 40px |
| `--space-2xl` | 64px |
| `--space-3xl` | 96px |
| `--space-section` | clamp(64px, 9vw, 128px) — vertical section rhythm |

Radii: `--radius-sm` 3px · `--radius-md` 6px. Nothing rounder — this is a
document, not an app.

Elevation: one shadow only, `--shadow-card: 0 18px 40px -28px rgba(27,42,58,0.42)`.
Prestige sites over-shadow; restrained ones don't.

---

## Component rules

- **Buttons.** Primary = `clay` fill, `paper` label (5.79:1), `--radius-md`,
  min target **44×44px**. Secondary = `ink` 1px outline on transparent. Focus =
  2px `ink` outline at 2px offset — visible on every background.
- **Links in prose.** `clay` + underline. Color is never the only signal.
- **Cards.** `paper` on `sand` bands, `line` hairline border, `--radius-md`.
  Hover changes border-color and shadow only — **no transform that shifts layout**.
- **Forms.** Every control has a real `<label>` (not placeholder-as-label).
  `required` + `aria-required` on required fields. Errors: `aria-live="polite"`,
  focus moved to the first invalid field, text + icon, never color alone. 16px
  minimum input font-size to stop iOS zoom.
- **Motion.** 150–300ms, opacity/transform only. Everything inside
  `prefers-reduced-motion: reduce` collapses to no motion. The existing
  `[data-reveal]` system already does this correctly — keep it.
- **Icons.** SVG only, one set, `stroke-width` 1.75. No emoji as icons.

---

## Homepage wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│ [Kagasoff Law Firm, A.P.C.]   Practice  Attorney  Contact        │
│                                       (657) 218-4947  [Consult] │  sticky, ink on paper
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  § 01 ─────────────────────────────────────────────────────────  │  ← margin index + clay rule
│                                                                  │
│   A Westminster attorney for the                 ┌─────────────┐ │
│   problem you're dealing with now.               │             │ │
│                                                  │  Ashley     │ │
│   Criminal defense, license defense, injury,     │  Kagasoff   │ │
│   family law and restraining orders — handled    │  portrait   │ │
│   by the same lawyer from first call to last.    │  (real)     │ │
│                                                  │             │ │
│   [ Request a consultation ]  Call (657) 218-4947└─────────────┘ │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤  sand band
│  § 02 ─────────────────────────────────────────────────────────  │
│   What we handle                                                 │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐                   │
│   │ Criminal   │ │ License    │ │ Personal   │   7 cards, from   │
│   │ Defense  → │ │ Defense  → │ │ Injury   → │   practiceAreas.ts│
│   └────────────┘ └────────────┘ └────────────┘   NOT hardcoded   │
│   ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐    │
│   │ Family Law │ │Restraining │ │ Employment │ │Real Estate │    │
│   └────────────┘ └────────────┘ └────────────┘ └────────────┘    │
├──────────────────────────────────────────────────────────────────┤  paper
│  § 03 ─────────────────────────────────────────────────────────  │
│   Who you'd be working with                                      │
│   ┌──────────┐  17+ years. Former law clerk, Orange County       │
│   │ portrait │  DA and Public Defender. B.A. UCLA '03,           │
│   └──────────┘  J.D. Chapman '07. Admitted E/C/S District CA.    │
│                 → About Ashley                                   │
├──────────────────────────────────────────────────────────────────┤  sand
│  § 04 ─────────────────────────────────────────────────────────  │
│   What happens when you call      (the existing 4-step process)  │
│   01 Call → 02 Review → 03 Plan → 04 Represent                   │
├──────────────────────────────────────────────────────────────────┤  ink band
│  § 05 ─────────────────────────────────────────────────────────  │
│   Talk to a lawyer, not an intake form.                          │
│   [ Request a consultation ]   (657) 218-4947                    │
├──────────────────────────────────────────────────────────────────┤
│  Footer — NAP, 7 practice links, hours, disclaimer               │  inkdeep
└──────────────────────────────────────────────────────────────────┘
```

**Deliberately absent:** a testimonials section (no attributed testimonials
exist), a case-results / "millions recovered" band (no client-approved figures
exist), and the review-count badge (see below). Empty trust slots get *removed*,
not filled with invented content.

---

## Anti-patterns — do NOT use

- ❌ **Any raw hex or magic px in a component file.** A `#` in a component is a
  defect. Tokens only.
- ❌ **Inventing business facts.** No case results, settlement figures, review
  counts, ratings, testimonials, hours, awards, or founding dates that are not
  in `BRIEF.md`. Missing → `<!-- NEEDS-CLIENT -->` and move on.
- ❌ **The hardcoded `5.0 (291 reviews)` badge** (`ReviewsBadge.astro:24`). It is
  sourced from nothing. **Remove it**, do not restyle it.
- ❌ Gold/brass accents, starfields, scales-of-justice or gavel iconography,
  columned-courthouse imagery, stock handshakes.
- ❌ `text-brass`-style low-contrast eyebrows. AA body floor or it doesn't ship.
- ❌ Layout-shifting hover transforms; instant state changes; invisible focus.
- ❌ Emoji as icons.
- ❌ Hardcoding practice areas. `src/data/practiceAreas.ts` is the only source.

---

## Pre-delivery checklist

- [ ] No raw hex, no magic px — grep the diff before claiming done
- [ ] Contrast: body ≥4.5:1, large/UI ≥3:1, verified not assumed
- [ ] `claylight` used only ≥24px / bold ≥19px on `ink`
- [ ] Visible focus on every interactive element; logical tab order
- [ ] Targets ≥44×44px
- [ ] Exactly one `<h1>`; headings ordered; `<main>` landmark present
- [ ] Labels on every control; `alt` on meaningful images, `alt=""` on decorative
- [ ] `prefers-reduced-motion` respected
- [ ] No horizontal scroll at 375px; holds at 200% zoom; CLS < 0.1
- [ ] Unique `<title>` + meta description; canonical; OG tags; valid JSON-LD
- [ ] No new unflagged `<!-- NEEDS-CLIENT -->`
