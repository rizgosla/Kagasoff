# ITERATIONS — Kagasoff redesign

## Iteration 1

**Auditors run:** design-critic (4 routes × 5 viewports), seo-auditor (all 10
routes), token-auditor (whole diff), a11y-auditor (see caveat at the end).

### Found

**design-critic — 1 Blocker, 5 High, 8 Medium**

| # | Sev | Finding |
|---|---|---|
| 1 | **Blocker** | Homepage § 05 phone CTA rendered ink-on-ink at **1.00:1** — an invisible primary conversion CTA. Root cause: unlayered `a { color: inherit }` in `global.css`, which beats Tailwind's layered utilities and killed every `text-*` on every anchor sitewide. |
| 2 | High | Same root cause: prose links lost `clay`, footer accents lost `claylight`. |
| 3 | High | Footer legal disclaimer rendered **96px wide**, one word per line. `max-w-3xl` resolved to `var(--spacing-3xl)`. |
| 4 | High | Contact form disclosed non-delivery only *after* the visitor typed out their legal problem. |
| 5 | High | Signature element wasn't what MASTER specifies — no hang (mark and body copy both at x=184), rule stopped at the container. |
| 6 | High | Mobile header hid the phone number — the highest-intent action, off screen. |
| 7–14 | Med | Three container widths; borrowed marquee; two empty `/about/` sections; copy drift; `§` not `aria-hidden`; clay doubling as error state; half-empty heroes; favicon 404. |

**seo-auditor — 0 Blockers, 3 High, 9 Medium.** Practice titles 66–84 chars;
practice pages never stated location in readable content; About/Contact titles
omitted geo. Confirmed clean: unique titles/descriptions ×10, canonicals,
valid JSON-LD, and **no `aggregateRating`/`review`/`openingHours` anywhere**.

**token-auditor — 0 raw hex, 0 dead tokens, 0 orphaned imports.** 12 surviving
`max-w-[1180px]`, 1 magic px height, 11 `NEEDS-CLIENT` markers inventoried.

### Changed

**Lead (shared layer):**
- Moved `a { color: inherit }` into `@layer base` — fixed the Blocker at its root.
  I had carried this rule forward from the original file *along with* its
  `.btn-brass` workaround; the workaround was the evidence and I copied it.
- `--color-claylight` `#C8724F` → `#DA8A66`. The old value was 4.15:1 on ink,
  failing AA for the 12px eyebrow in `.sindex-dark`. Two workers hit it
  independently. Lightening removed the "large/UI only" rule entirely rather
  than patching per-page.
- Rebuilt `SectionIndex` so the `§` actually hangs and the rule bleeds; added
  `aria-hidden`; scoped `nowrap` to the `§` so long labels can't be clipped by
  `overflow-x: clip` at 375px.
- Added `--container-page`, `--container-measure`, `--color-alert`.
  Documented **two verified Tailwind v4 namespace traps** (`max-w-*xl` shadowed
  by spacing; `max-w-prose` a hardcoded built-in).
- SEO: trimmed meta description, `twitter:card` → `summary` (large-image card
  renders empty with no `og:image`), `lang="en-US"`, `trailingSlash: 'always'`,
  added favicon.
- Moved unused 3.9 MB `hero.jpg` out of `public/` — **deploy 4.5 MB → 630K**.
- Deleted dead marquee CSS after the component was removed.

**W1** homepage: verified CTA fix in compiled CSS (13.65:1), `max-w-page` ×5,
trailing slashes, E.164. Found `--container-prose` was silently ignored.
**W2** header/footer: mobile tap-to-call, disclaimer width, scroll lock,
`aria-label` toggle, 44px wordmark target.
**W3** practice template: marquee deleted repo-wide, titles → 52–70 chars,
descriptions ≤155, "Westminster" now in visible body copy, `max-w-page`.
**W4** about/contact: pre-submit non-delivery disclosure, **cut both empty
sections** per MASTER ("empty trust slots get removed, not filled"), cut the
empty vision sentence, `text-alert` for errors, geo in titles and body.

### Still open

- **`a11y-auditor` did not return.** Structural checks I ran directly on the
  built HTML pass: exactly one `h1` per route, `<main>` on all 10 pages (was
  missing everywhere), skip link, `nav`/`footer` landmarks, `lang="en-US"`,
  `§` marks `aria-hidden`. Every colour pairing is computed and documented.
  This is **not** a substitute for an axe-core run plus manual keyboard and
  screen-reader testing — see the caveat in REPORT.md.
- Portrait ships at 1× (514×644 rendered at 479 CSS px) — needs a 2× asset.
- `BreadcrumbList` middle node has no URL; there is no `/practice/` index page.
- No `og:image` (NEEDS-CLIENT).

### Gate status

Build green (10 pages). Token audit clean. SEO 0 Blockers. Critic's Blocker and
all 5 High fixed. **a11y unverified by tooling** — the one gate not closed.
