# INVENTORY — Kagasoff Law Firm site (Phase 0 recon)

Read-only recon. Every claim below is sourced to a file path. Repo root:
`C:\Users\rizgo\Documents\GITHUB_REPOS\Kagasoff`. Build was **not** run — this
sandbox has no `node`/`npm` on PATH (`where npm` / `where node` both failed);
all findings are from static inspection of source only.

---

## 1. Stack

- **Framework:** Astro `^5.6.0` (`package.json:13`), static output (no `output:`
  override in `astro.config.mjs`, default is `static`).
- **CSS:** Tailwind CSS v4 (`^4.1.0`, `package.json:16-17`) wired through
  `@tailwindcss/vite` (`astro.config.mjs:3,9`), tokens declared with the v4
  `@theme` directive in `src/styles/global.css:5-20`.
- **No UI library, no component framework islands** — every file is plain
  `.astro` with `is:inline` `<script>` blocks (`BaseLayout.astro:32,42`;
  `Header.astro:157`; inline scripts in `index.astro:141`, `contact.astro:110`).
- **Fonts:** Google Fonts CDN link for Cormorant Garamond + Libre Franklin
  (`BaseLayout.astro:24-29`) — not self-hosted, not preloaded as `font-display`
  beyond the CDN default `&display=swap` in the URL.
- `astro.config.mjs.txt` (repo root) is a duplicate/reference file, explicitly
  not live config (comment says "rename after copying," `astro.config.mjs.txt:2`).
- Two config-adjacent oddities worth flagging for the lead, not fixing here:
  `README.md:26-30` documents a `src/components/` list that omits `Photo.astro`,
  `PracticeMarquee.astro`, and `ReviewsBadge.astro` — the README is stale
  relative to the actual component set.

## 2. Routes

| Route | File | Job | Generated or hand-written |
|---|---|---|---|
| `/` | `src/pages/index.astro` | Convert a cold visitor: hero + phone/consult CTA, social proof, practice-area picker, attorney intro, process, closing CTA | Hand-written, but the practice-area deck (`index.astro:117-137`) and stats (`index.astro:11-16`) render from `src/data/practiceAreas.ts` |
| `/about` | `src/pages/about.astro` | Build trust/credibility: firm vision, values, attorney bio, credentials | Hand-written; values (`about.astro:10-14`) and credentials (`about.astro:16-20`) are inline arrays local to the page, **not** in `src/data/` |
| `/contact` | `src/pages/contact.astro` | Capture a lead via form or phone | Hand-written; matter-type `<select>` options are generated from `practiceAreas` (`contact.astro:8,56-58`) |
| `/practice/[slug]` ×7 | `src/pages/practice/[slug].astro` | Convert a visitor already searching for a specific matter type | **Fully data-driven** — `getStaticPaths()` maps every object in `practiceAreas` to a page (`[slug].astro:10-15`); no hand-written per-area pages exist |

7 practice-area slugs from `src/data/practiceAreas.ts:40-181`: personal-injury,
criminal-defense, professional-license-defense, family-law,
restraining-orders, employment, real-estate. Total: **10 built pages** (3
static + 7 generated). No `404.astro`, no `src/pages/api/`, no other routes.

## 3. Components

`src/components/`: `Header.astro`, `Footer.astro`, `Photo.astro`,
`Placeholder.astro`, `PracticeCTA.astro`, `PracticeMarquee.astro`,
`ReviewsBadge.astro` — **7 components, all imported and used somewhere.** No
defined-but-never-imported components found.

| Component | Used in | Notes |
|---|---|---|
| `Header.astro` | `BaseLayout.astro:3,37` (every page) | Nav + Services dropdown driven by `practiceAreas` (`Header.astro:4,67`) |
| `Footer.astro` | `BaseLayout.astro:4,39` (every page) | Practice/Firm columns driven by `practiceAreas` (`Footer.astro:4,6-7`) |
| `Photo.astro` | `index.astro:230`; `about.astro:62,90`; `[slug].astro:111` (4 call sites) | Real-photo wrapper with a striped fallback ground if `src` fails visually (not an actual error fallback, just matching background color, `Photo.astro:17`) |
| `Placeholder.astro` | `contact.astro:5,106` — **1 call site only** | Office map only |
| `PracticeCTA.astro` | `about.astro:6,121` — **1 call site only** | Not used on `index.astro` or `[slug].astro`, which each hand-roll their own closing-CTA markup instead (`index.astro:277-309`, `[slug].astro:160-169`) — three different implementations of the same "closing CTA" pattern |
| `PracticeMarquee.astro` | `index.astro:7,62`; `about.astro:7,43` | Not used on `contact.astro` or `[slug].astro` |
| `ReviewsBadge.astro` | `index.astro:8,40,298`; `about.astro:8,38` (3 call sites) | See §5/§8 — hardcoded rating |

**Reuse pattern gap:** the "closing CTA band" exists as three separate
implementations (`PracticeCTA.astro`, plus bespoke markup in `index.astro` and
`[slug].astro`) instead of one shared component with variants. Not broken, but
a duplication a redesign should consolidate.

## 4. Tokens

`src/styles/global.css:5-20` (`@theme`) defines **only color and font-family**
tokens: 11 colors (`--color-navy`, `-navydark`, `-paper`, `-cream`, `-brass`,
`-brasslight`, `-gold`, `-ink`, `-line`, `-mist`, `-slate`) and 2 font stacks.
**No spacing scale, no type scale, no radius scale, no shadow scale exist as
tokens.**

- **Color-token discipline is good:** color utilities (`bg-navy`, `text-brass`,
  `text-ink`, etc.) are used consistently across every page/component.
- **Raw hex bypassing the token layer — 5 instances, all defects per this
  repo's CLAUDE.md ("a `#` in a component file is a defect"):**
  - `src/components/Header.astro:65` — `bg-[#0f1c2e]`
  - `src/components/ReviewsBadge.astro:29` — `const ring = dark ? '#16243d' : '#faf8f3'`
  - `src/pages/contact.astro:66` — `border-[#d8b4b4] bg-[#f7ecec]`
  - `src/pages/contact.astro:102` — `border-[#c9bfa6]`
  - `src/pages/practice/[slug].astro:52` — `text-[#6f6857]`
- **Arbitrary/magic px values — pervasive, ~165 occurrences** of Tailwind
  bracket syntax (`text-[15px]`, `px-[30px]`, `gap-[92px]`, `mb-[18px]`, etc.)
  across every component/page file (counts by file: `index.astro` 44,
  `about.astro` 27, `[slug].astro` 37, `contact.astro` 19, `Header.astro` 14,
  `Footer.astro` 12, `PracticeCTA.astro` 6, `PracticeMarquee.astro` 2,
  `ReviewsBadge.astro` 2, `Photo.astro` 1, `Placeholder.astro` 1). Because no
  spacing/type-scale tokens exist, **every one of these is necessarily
  off-scale** — there is no scale to be "off" a value could conform to.
- **Ratio through the token layer:** color ≈ 100% token-driven (minus the 5 hex
  defects above); spacing/type-scale ≈ 0% token-driven (no such tokens exist).
- 26 raw `style="…"` attributes outside `global.css` (`contact.astro` 3,
  `about.astro` 8, `index.astro` 5, `[slug].astro` 9, `global.css` 1). Most are
  legitimate uses of a CSS custom property for JS-driven animation timing
  (`style="--reveal-delay:140ms"`, e.g. `index.astro:45`) or `object-position`
  passed through `Photo.astro:23`'s `style` prop — not raw hex, but still
  outside the utility/token system and worth the lead's attention.

## 5. Content — real vs. placeholder

- **Real, non-generic content:** all 7 practice-area pages have unique
  overview copy, case lists, and a shared 4-step process
  (`src/data/practiceAreas.ts:40-181`); attorney bio, credentials, and vision
  statement are real and sourced to `BRIEF.md:38-53` (UCLA/Chapman dates,
  17+ years, DA/PD clerkships, licensing-board list). Real photos are in place:
  `public/ashley-portrait.jpg`, `public/team.jpg`, wired via `Photo.astro` —
  **not** `Placeholder.astro` — on the home, about, and practice pages.
- **`Placeholder.astro` still in use — 1 site:** the office map on
  `/contact` (`contact.astro:106`, `label="Map — Westminster office"`).
- **Fabricated / unsourced content:**
  - `ReviewsBadge.astro:21-27` — `rating` defaults to `"5.0"`, `count` defaults
    to `"291"`, and every call site passes `count="291"` explicitly
    (`index.astro:40,298`; `about.astro:38`). Nothing in the repo or
    `BRIEF.md` sources this number; `BRIEF.md:20` itself flags it as
    fabricated and says it "must be replaced with the real GBP rating/count
    (or removed) before launch." **Confirmed live and unresolved.**
  - `index.astro:12-15` stats band repeats the same unsourced `'5.0'` /
    `'291'` as home-page "stat" tiles, doubling the exposure of the fabricated
    number on a single page.
- **Dead asset:** `public/hero.jpg` (4.08 MB, `ls -la public`) is not
  referenced by any `src=` in `src/` (`grep hero.jpg src` → no matches) — an
  unused, oversized file sitting in the deploy bundle.
- **Contact form delivers nowhere** (see §8 weakness #1) — this is a
  "form submitting nowhere" pattern the audit was asked to flag, and it's
  already called out and accepted-as-known in `BRIEF.md:19` / `README.md:64-75`
  / a code comment at `contact.astro:112`, so it's a known, tracked gap rather
  than an overlooked one.
- No lorem ipsum, no dead `<a href="#">` links found — every nav/footer link
  resolves to a real route or `tel:` link.
- `NEEDS-CLIENT` markers: none inside `src/` (correctly kept out of code);
  they live in `BRIEF.md` (hours, other staff bios, testimonials, case
  results, founding date, awards — `BRIEF.md:56-63`).

## 6. Accessibility baseline (static only — no browser check)

**Good, worth preserving:**
- `<html lang="en">` set once, correctly, in `BaseLayout.astro:18`.
- 100% `alt` coverage on the 6 real `<img>`/`Photo` usages found — none empty,
  none missing (`Photo.astro:20`; `index.astro:48`; `about.astro:62,90`;
  `[slug].astro:111`, plus one more `Photo` call in `index.astro:230`); all
  decorative SVG icons carry `aria-hidden="true"` (e.g. `Header.astro:59,85`).
- Icon-only buttons have `aria-label`: mobile menu toggle
  (`Header.astro:96-98`, with `aria-expanded`/`aria-controls` wired via JS at
  `Header.astro:168`), deck prev/next/dot buttons
  (`index.astro:106,110,158`).
- `prefers-reduced-motion` is respected for both the scroll-reveal system
  (`global.css:332-338`) and the marquee (`global.css:394-398`).
- One `<h1>` per page, and no heading-level skips found in any of the 4
  templates (checked `index.astro`, `about.astro`, `contact.astro`,
  `[slug].astro` — h1→h2→h3 in document order throughout).

**Defects found:**
- **No `<main>` landmark anywhere in the codebase.** `BaseLayout.astro:36-39`
  wraps every page as `<Header /><slot /><Footer />` with no `<main>` element;
  `grep -r "<main" src` returns zero matches. Every page has `<header>` and
  `<footer>` landmarks but no `main` landmark — screen-reader users lose
  "skip to main content" / landmark-jump navigation on all 10 pages.
- **Contact form: visually-marked-required fields have no programmatic
  `required`/`aria-required`.** The asterisk is decorative text only
  (`contact.astro:40,44,62`, `<span class="text-brass">*</span>`); the
  `<form>` carries `novalidate` (`contact.astro:32`) and inputs have no
  `required` attribute (`contact.astro:41,45,63`), so native/AT-exposed
  validation is deliberately disabled and not replaced with an accessible
  equivalent.
- **Validation error has no ARIA live region and never receives focus.** The
  error box `#form-error` (`contact.astro:66-68`) is toggled via
  `classList.remove('hidden')` in the submit handler
  (`contact.astro:120-134`) with no `aria-live`, no `role="alert"`, and no
  `.focus()` call — a screen-reader user who fails validation on the site's
  only form gets no notification that anything happened.
- **Weak focus-visible replacement on form fields.** `.fld:focus` in
  `global.css:481,484-486` sets `outline: none` and substitutes only a 1px
  border-color change (`#d9d1bf` → brass). No thickened border, no box-shadow
  ring. This is the only `outline: none` in the codebase (confirmed via
  repo-wide grep) and it's scoped to form inputs only — links/buttons
  retain the browser default outline — but the replacement on inputs is
  thin and should be checked in-browser against WCAG 2.4.11.
- **Contrast — computed estimates only, needs a browser/axe pass to confirm,
  flagged because the pattern repeats sitewide:**
  - `text-brass` (`#9c7a3c`) at 11–12px uppercase "eyebrow" labels on
    `bg-paper`/`bg-cream` computes to **≈3.5–3.8:1**, below the 4.5:1 AA floor
    for normal-size text. This exact pattern repeats on nearly every section
    of every page: `index.astro:69,99,251`; `about.astro:48,69`;
    `PracticeCTA.astro:20`; `[slug].astro:40,133`. Because it's driven by a
    single color token, it's a one-place fix if confirmed, but currently
    ships on every page.
  - `text-ink/70` at 12px on `bg-paper` (`contact.astro:71`, form disclaimer)
    computes to **≈3.45:1** — likely fails AA for that text size.
  - `text-slate/70` on `bg-navydark` (footer nav links, `Footer.astro:38,50,
    51,54`) computes to **≈3.4:1**; `text-slate/50` (disclaimer bar,
    `Footer.astro:64,66-67`) is lower opacity still and likely worse.
  - By contrast, `text-mist` on `bg-navy` (hero/CTA body copy, e.g.
    `index.astro:31`) computes to a healthy **≈9.9:1** — the navy/mist pairing
    is solid; the risk is concentrated in the brass-on-light and
    reduced-opacity-on-dark pairings specifically.

## 7. SEO baseline (static only)

**Per-route `<title>` / meta description:**

| Route | `<title>` | Meta description |
|---|---|---|
| `/` | Default from `BaseLayout.astro:12` (not overridden by `index.astro`) | Default from `BaseLayout.astro:13` |
| `/about` | Overridden, unique (`about.astro:23`) | **Not overridden** — falls back to the homepage's description (`about.astro:23` passes no `description` prop) |
| `/contact` | Overridden, unique (`contact.astro:13`) | **Not overridden** — same homepage description reused (`contact.astro:13`) |
| `/practice/[slug]` ×7 | Overridden, unique per area (`[slug].astro:25`) | Overridden, unique per area — uses `area.blurb` (`[slug].astro:25`) |

So **3 of 10 pages** (`/`, `/about`, `/contact`) share one identical meta
description verbatim — a real duplicate-meta-description issue, not a
hypothetical one.

**Sitewide, in `BaseLayout.astro` (the single `<head>` owner, confirmed via
repo-wide grep for `canonical|og:|twitter:|ld\+json`, zero matches anywhere
in `src/`):**
- No `<link rel="canonical">` on any page.
- No Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`) on
  any page.
- No Twitter Card tags on any page.
- No JSON-LD structured data anywhere — no `LocalBusiness`, `Attorney`, or
  `LegalService` schema, despite `astro.config.mjs:7` already declaring
  `site: 'https://www.kagasofflaw.com'` (the canonical domain is known and
  configured, just not used to emit canonical/OG URLs).
- No `robots.txt` or `sitemap*.xml` in `public/` (confirmed via directory
  listing — `public/` contains only `.assetsignore` and the 3 photo assets)
  and no `@astrojs/sitemap` (or any sitemap generator) in `package.json`
  dependencies.
- **Heading structure:** one `<h1>` per page confirmed (§6); heading order is
  sequential with no level-skips on all 4 templates.
- **Image `alt` coverage:** 100% on real photos (§6). N/A for decorative SVGs
  (correctly `aria-hidden`).
- **Nav uses real `<a href>`:** yes — `Header.astro` and `Footer.astro` both
  render genuine anchor tags to real routes (`/`, `/about`, `/contact`,
  `/practice/<slug>`) and `tel:` links; no JS-only navigation, no `<a href="#">`
  found anywhere.

## 8. Top 8 weaknesses, ranked

1. **The only lead-capture mechanism on the site delivers nowhere.**
   `contact.astro:120-135` — the submit handler validates client-side, shows a
   "Thank you" panel, and does not send the data anywhere (no `fetch`, no
   `data-netlify`, no `action`). Every visitor who fills out the form believes
   their message was sent; none of that data reaches the firm. This is
   already flagged in `BRIEF.md:19` and `README.md:64-75` as a known,
   pre-launch gap — but it means the site's single most important
   conversion path is currently non-functional. **Cost: 100% of form leads
   are silently lost**, on a site whose whole job is generating consultation
   calls.

2. **A fabricated "5.0 (291 reviews)" Google rating is hardcoded and
   rendered on two of three static pages.** `ReviewsBadge.astro:24` defaults
   `count` to `"291"`; every call site passes it explicitly
   (`index.astro:40,298`; `about.astro:38`), and `index.astro:14` repeats the
   number again as a stat tile. Nothing in the repo sources this figure —
   `BRIEF.md:20` says as much. **Cost:** attorney advertising is a regulated
   category in California; a fabricated review count on a law firm's own
   site is a direct, avoidable, and already-identified false-advertising /
   consumer-protection exposure if the real Google Business Profile shows a
   different number (or doesn't exist yet).

3. **Zero SEO metadata infrastructure sitewide.** `BaseLayout.astro:17-35`
   (the entire `<head>`) has no canonical link, no Open Graph tags, no
   Twitter Card tags, and no structured data of any kind, and `public/` has
   no `robots.txt` or sitemap despite the canonical domain already being
   configured in `astro.config.mjs:7`. On top of that, 3 of the site's 10
   pages (`/`, `/about`, `/contact`) share one identical meta description
   because `about.astro:23` and `contact.astro:13` never override it.
   **Cost:** for a single-location firm whose primary channel is local
   search, missing `LocalBusiness`/`Attorney` schema and canonical/OG tags
   means no rich results, no map-pack schema signal, and weak social-share
   previews — this is the highest-leverage, lowest-effort fix on this list
   since it's one lead-only file.

4. **The contact form's own accessible-validation path is disabled and not
   replaced.** `contact.astro:32` sets `novalidate`; required fields
   (`contact.astro:41,45,63`) carry no `required`/`aria-required`; and the
   error message (`contact.astro:66-68`) that appears on failed submission
   (`contact.astro:120-134`) has no `aria-live`/`role="alert"` and never
   receives focus. **Cost:** a screen-reader user who omits a field on the
   site's only conversion form gets no indication anything went wrong — a
   silent dead end, and squarely the kind of defect the Unruh Act attaches
   statutory damages to in California.

5. **No `<main>` landmark exists anywhere in the codebase.**
   `BaseLayout.astro:36-39` wraps content in `<Header /><slot /><Footer />`
   with no `<main>`; confirmed via repo-wide grep (zero matches for `<main`).
   **Cost:** every one of the 10 pages loses the standard
   "skip to main content" / landmark-jump path for assistive-tech users — a
   one-line fix in a lead-only file that currently regresses every page.

6. **No spacing or type-scale tokens exist, so ~165 arbitrary Tailwind
   bracket values are hand-set per instance across every file** (counts in
   §4: `index.astro` 44, `[slug].astro` 37, `about.astro` 27,
   `contact.astro` 19, `Header.astro` 14, `Footer.astro` 12). Layered on top,
   5 raw hex values bypass even the color tokens
   (`Header.astro:65`; `ReviewsBadge.astro:29`; `contact.astro:66,102`;
   `[slug].astro:52`). **Cost:** color tokens work exactly as intended
   (single-file edits propagate everywhere), but any global type or spacing
   change during a redesign requires touching every component by hand
   instead of one token file — the opposite of what this repo's own
   `CLAUDE.md` "tokens only" rule exists to guarantee.

7. **A systemic, sitewide contrast risk in the most-repeated typographic
   pattern on the site.** The `text-brass` "eyebrow" label
   (`Header.astro`'s Services items aside, this pattern appears at
   `index.astro:69,99,251`, `about.astro:48,69`, `PracticeCTA.astro:20`,
   `[slug].astro:40,133` — i.e., on every section of every page) computes to
   roughly 3.5–3.8:1 against `bg-paper`/`bg-cream` at 11–12px, below the
   4.5:1 AA floor for normal text (needs a browser/axe confirmation — not
   asserted as certain). **Cost:** if confirmed, this is a single color
   token used in dozens of places sitewide, so it's simultaneously the
   easiest contrast fix available (one token edit) and the widest-blast-radius
   risk currently shipping.

8. **Unresolved business-fact gaps ship on the live pages, not just in
   `BRIEF.md`.** The office map is still `Placeholder.astro`
   (`contact.astro:106`), business hours read only "By appointment, Mon–Fri"
   (`contact.astro:103`) with no confirmed source, and the Suite D4 vs. Suite
   B7 discrepancy the live Wix site shows is called out in `BRIEF.md:30,41`
   but the repo publishes D4 unconfirmed at three places
   (`Footer.astro:23`, `contact.astro:99`, `index.astro:301`). **Cost:** for
   a single-location firm, an unverified/wrong address or suite number
   directly breaks NAP (name-address-phone) consistency with the Google
   Business Profile, which is one of the strongest local-search ranking
   signals available to a firm this size — and a visitor can't visually
   confirm the office location before calling.

---

### What's genuinely good (preserve through the redesign)

- Practice-area content is fully data-driven: one object in
  `src/data/practiceAreas.ts` produces the nav dropdown, footer columns, the
  contact form's matter-type list, and a full `/practice/<slug>` page — the
  "content is data" rule from `CLAUDE.md` is followed exactly as intended
  here, and it's the one place in the repo doing so.
- Real photography is already in place for hero/team/attorney shots via
  `Photo.astro`, not `Placeholder.astro` — the swap-in seam
  (`Placeholder.astro`) is still cleanly available for the one remaining
  placeholder (the office map) without having been baked over.
- Color tokens are used consistently everywhere color appears; the raw-hex
  count (5) is small relative to the size of the codebase.
- `prefers-reduced-motion` is actually wired up and respected for both
  animation systems in use (scroll-reveal and marquee) — this is often
  skipped and wasn't here.
- Every interactive icon-only control (menu toggle, deck arrows, deck dots)
  has a real `aria-label`; alt-text coverage on real photos is 100%; heading
  order has zero skips on any of the four templates checked.
- `navy`/`mist` (the dominant hero and CTA body-text pairing) computes to a
  strong ≈9.9:1 contrast — the core brand pairing is not where the contrast
  risk lives.
