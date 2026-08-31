# CONTENT.md — Full user-facing copy inventory for kagasofflaw site

## Instructions for Claude (read first when applying this document)

This document is a complete inventory of every user-facing string on the site, laid out as fill-in tables. The site owner overwrites cells in the **New text** column; you apply them.

**How the tables work:**

- Each row is one string. Columns: **Location** (the section/variable/prop where the string lives — the governing file is named in the table's heading or the Location cell), **Current text** (the string exactly as it appears in source, verbatim, including HTML entities and inline markup), and **New text**.
- A **New text** cell containing `_(keep)_` means: leave that string unchanged. Anything else replaces the Current text exactly.
- Long paragraphs are shown on one line in the cell; in source they may be wrapped across lines — match the file's existing wrapping style when editing.

**Rules when applying:**

1. Preserve HTML entities (`&amp;`, `&mdash;`, `&rsquo;`, `&middot;`, `&rarr;`) and any surrounding markup/JSX exactly — replace only the human-readable text. If a Current cell contains an entity and the New cell has the equivalent literal character (e.g. `—`), convert it back to the entity used in the Current string to stay consistent with the codebase style.
2. Strings in `.astro` templates are edited in place; strings in `.ts` data files (`src/data/testimonials.ts`, `src/data/practiceAreas.ts`) are edited in their arrays. Multi-line template literals keep their line-wrapping style.
3. Some strings appear in more than one place (the phone number, the address, "Six areas. One standard of care.", "Call (657) 218-4947"). Each occurrence has its own row — apply each individually; do not blind global-replace.
4. After applying all changes: run `npx astro build` to confirm the site still builds, then grep the `src/` tree for a few distinctive fragments of the OLD text (e.g. old testimonial names, "SAMPLE BIO", old headlines) to confirm nothing was missed.
5. Do not touch CSS, SVG path data, scripts, class names, or `slug` values (slugs are URL anchors referenced by header, footer, and home deck).

---

## ⚠️ KNOWN PLACEHOLDERS — must be resolved before launch

1. **FAKE TESTIMONIALS** — every quote/name in `src/data/testimonials.ts` is invented (file is marked `// PLACEHOLDER REVIEWS`). They are presented on the site as "Google Review" with 5 stars. They MUST be replaced with real, curated Google reviews (or the carousel removed) before production. See section 7.
2. **OFFICE MANAGER** — the home team section's second card uses the literal name "Office Manager Name", a bio beginning "[SAMPLE BIO — replace…]", and a gray `Placeholder` component instead of a portrait photo. See section 4.5.
3. **INTAKE FORM IS NOT WIRED** — `src/components/IntakeForm.astro` only *shows* a confirmation client-side; it does not deliver the message anywhere (the script comment suggests Netlify Forms, Formspree, or an Astro API route). The confirmation copy promising "An attorney will be in touch shortly" is currently untrue. Wiring the form is a code task outside this document; the confirmation text rows are in section 6.

---

## 1. Global / Meta — src/layouts/BaseLayout.astro

| Location | Current text | New text |
|---|---|---|
| Default page `<title>` (frontmatter `title` default) | Kagasoff Law Firm, A.P.C. — Trusted counsel when it matters most | _(keep)_ |
| Default meta description (frontmatter `description` default) | Boutique Orange County law firm serving Westminster and greater Orange County across six practice areas. Direct, attorney-led counsel. Free consultation. | _(keep)_ |

---

## 2. Header — src/components/Header.astro

| Location | Current text | New text |
|---|---|---|
| Wordmark, main line | Kagasoff Law Firm | _(keep)_ |
| Wordmark, subline | A Professional Corporation | _(keep)_ |
| Nav label (`nav` array; desktop + mobile) | Home | _(keep)_ |
| Nav label (`nav` array; desktop + mobile) | About | _(keep)_ |
| Nav label (`nav` array; desktop + mobile) | Team | _(keep)_ |
| Nav label (`nav` array; desktop + mobile) | Contact | _(keep)_ |
| Services dropdown trigger (desktop) + mobile section label | Services | _(keep)_ |
| Phone CTA text (appears twice: desktop nav + mobile menu; `tel:` href is `6572184947`) | 657&middot;218&middot;4947 | _(keep)_ |

*The dropdown/mobile service items are the six practice-area names — edited once in section 9.*

---

## 3. Footer — src/components/Footer.astro

| Location | Current text | New text |
|---|---|---|
| Brand line | Kagasoff Law Firm, A.P.C. | _(keep)_ |
| Address (two lines separated by `<br />`) | 14541 Brookhurst St, Suite D4<br />Westminster, CA 92683 | _(keep)_ |
| Phone link text (`tel:` href is `6572184947`) | (657) 218-4947 | _(keep)_ |
| Column heading 1 | Practice | _(keep)_ |
| Column heading 2 | Firm | _(keep)_ |
| "Firm" column static link | About | _(keep)_ |
| "Firm" column static link | Contact | _(keep)_ |
| "Firm" column static link | Services | _(keep)_ |
| Copyright line (`{year}` is computed — keep the interpolation) | © {year} Kagasoff Law Firm, A.P.C. All rights reserved. | _(keep)_ |
| Legal disclaimer line | Attorney advertising. Prior results do not guarantee a similar outcome. | _(keep)_ |

*The "Practice" column lists the first four practice-area names; "Firm" also lists the remaining two — from section 9.*

---

## 4. Home page — src/pages/index.astro

### 4.1 Hero

| Location | Current text | New text |
|---|---|---|
| Hero eyebrow | Westminster &middot; Serving California | _(keep)_ |
| Hero headline (h1; three lines with `<br />`, middle line in gold `<span>`; keep `&amp;`) | Orange County<br /><span class="text-gold">Injury &amp; Defense</span><br />Attorneys. | _(keep)_ |
| Hero paragraph (keep `&mdash;`) | From the courtroom to the negotiating table, the Kagasoff Law Firm brings disciplined, personal advocacy to every client &mdash; across six practice areas. | _(keep)_ |
| Hero primary button (phone CTA) | Call (657) 218-4947 | _(keep)_ |
| Hero secondary button | Free consultation | _(keep)_ |
| Hero photo alt text | The Kagasoff Law Firm team | _(keep)_ |
| Hero photo badge (pill over the photo) | A team that fights for you | _(keep)_ |

### 4.2 Why Us

| Location | Current text | New text |
|---|---|---|
| Why-us eyebrow | Why Kagasoff | _(keep)_ |
| Why-us headline (h2) | A boutique firm with a courtroom record. | _(keep)_ |
| Why-us paragraph | Direct access to your attorney, honest counsel, and preparation that holds up at trial — trusted by hundreds of Orange County clients. | _(keep)_ |
| Why-us link | Read our story → | _(keep)_ |

### 4.3 Stats (`stats` array in frontmatter)

| Location | Current text (number / label) | New text |
|---|---|---|
| `stats[0]` | 17+ / Years of experience | _(keep)_ |
| `stats[1]` | 5.0 / Google rating | _(keep)_ |
| `stats[2]` | 291 / Client reviews | _(keep)_ |
| `stats[3]` | 6 / Practice areas | _(keep)_ |

### 4.4 Our Practice (card deck) + sticky form intro

| Location | Current text | New text |
|---|---|---|
| Practice eyebrow | Our Practice | _(keep)_ |
| Practice headline (h2) | Six areas. One standard of care. | _(keep)_ |
| Practice paragraph | Whatever life brings, the firm provides the same direct, attorney-led counsel across every matter. | _(keep)_ |
| Practice card CTA (every card in the deck; keep `&rarr;` in its own span) | Learn more &rarr; | _(keep)_ |
| Sticky form eyebrow (right column) | Free Consultation | _(keep)_ |
| Sticky form lead-in line | Tell us about your case. | _(keep)_ |

*Card titles and one-liners come from `practiceAreas[].name` and `practiceAreas[].short` — section 9.*

### 4.5 Team

| Location | Current text | New text |
|---|---|---|
| Team eyebrow | The Team | _(keep)_ |
| Team headline (h2) | The people in your corner. | _(keep)_ |
| Team paragraph | A small team, on purpose — so you always know who is handling your matter. | _(keep)_ |
| Ashley card: portrait alt text | Ashley Kagasoff | _(keep)_ |
| Ashley card: name (h3) | Ashley Kagasoff | _(keep)_ |
| Ashley card: role line (keep `&middot;`) | Attorney at Law &middot; Founder | _(keep)_ |
| Ashley card: bio paragraph 1 | Ashley has dedicated over 17 years to results-driven advocacy and personalized service. Her practice spans criminal defense, professional license defense, personal injury, and employment — giving clients comprehensive solutions tailored to their needs. | _(keep)_ |
| Ashley card: bio paragraph 2 | Having worked both sides of the law — as a law clerk for the Orange County District Attorney's and Public Defender's offices, then fifteen years in private defense — she brings a rare perspective to every matter she takes on. | _(keep)_ |
| Ashley card: credential (`credentials[0]`, key / value) | 17+ years / Of trial & advocacy experience | _(keep)_ |
| Ashley card: credential (`credentials[1]`, key / value) | UCLA / B.A., 2003 | _(keep)_ |
| Ashley card: credential (`credentials[2]`, key / value) | Chapman / J.D., School of Law, 2007 | _(keep)_ |

#### ⚠️ PLACEHOLDER — Office manager card

| Location | Current text | New text |
|---|---|---|
| Office manager card: portrait ⚠️ | *(no photo — gray `<Placeholder label="Office manager portrait — replace">` component; needs a real image + alt text)* | _(keep — still placeholder)_ |
| Office manager card: name (h3) ⚠️ literal placeholder | Office Manager Name | _(keep — still placeholder)_ |
| Office manager card: role line | Office Manager | _(keep)_ |
| Office manager card: bio ⚠️ starts with a literal "[SAMPLE BIO" marker | [SAMPLE BIO — replace with the office manager's real bio.] She is usually the first voice you'll hear when you call the firm, and she keeps every matter moving — scheduling consultations, gathering records, and making sure clients are never left wondering where their case stands. Clients regularly credit her with making a difficult process feel manageable. | _(keep — still placeholder)_ |

### 4.6 Process section — src/components/ProcessSection.astro ("With You Step by Step")

| Location | Current text | New text |
|---|---|---|
| Section eyebrow | What working with us looks like | _(keep)_ |
| Section headline (h2) | With You Step by Step. | _(keep)_ |
| Section intro paragraph | A clear, four-step path from your first call to resolution — we stay beside you at every stage, with the same disciplined approach across every practice area. | _(keep)_ |
| Step kicker (`steps[0]`) | Step 01 | _(keep)_ |
| Step kicker (`steps[1]`) | Step 02 | _(keep)_ |
| Step kicker (`steps[2]`) | Step 03 | _(keep)_ |
| Step kicker (`steps[3]`) | Step 04 | _(keep)_ |
| "More" disclosure button label (all four cards) | More | _(keep)_ |
| Disclosure detail (`mores[0]`, under Free consultation) | No fee to talk. If we are not the right fit, we will say so on the call. | _(keep)_ |
| Disclosure detail (`mores[1]`, under Strategy & preparation) | Records, reports and medical evidence, gathered early. | _(keep)_ |
| Disclosure detail (`mores[2]`, under Negotiation or hearing) | Most matters resolve without a courtroom, because we are ready for one. | _(keep)_ |
| Disclosure detail (`mores[3]`, under Resolution, or trial) | Straight answers on what a resolution is really worth. | _(keep)_ |
| Disclosure caption (`metas[0]`; leading em dash is part of the string) | — Free & confidential | _(keep)_ |
| Disclosure caption (`metas[1]`) | — Prepared as if for trial | _(keep)_ |
| Disclosure caption (`metas[2]`) | — Leverage at the table | _(keep)_ |
| Disclosure caption (`metas[3]`) | — 17+ years of results | _(keep)_ |

*Step titles and one-line bodies come from the `process` array in `src/data/practiceAreas.ts` — section 8.*

### 4.7 About the Firm

| Location | Current text | New text |
|---|---|---|
| About eyebrow | About the Firm | _(keep)_ |
| About mission headline (h2) | To provide exceptional legal counsel and representation that exceeds our clients' expectations. | _(keep)_ |
| About paragraph | Based in Westminster and serving clients throughout Orange County and the greater California region, the firm handles matters across six practice areas — from personal injury and criminal defense to employment and professional licensing. What unites that range is a single approach: thorough preparation, plain-spoken advice, and direct access to the attorney working on your case. | _(keep)_ |
| About right-column label | What you can expect | _(keep)_ |
| Value title (`values[0]`, numeral I.) | Attentiveness | _(keep)_ |
| Value body (`values[0]`) | We stay fully present and engaged — listening to your concerns and shaping legal solutions around your unique situation. | _(keep)_ |
| Value title (`values[1]`, numeral II.) | Relentless preparation | _(keep)_ |
| Value body (`values[1]`) | Every case is prepared as if it will be tried. That readiness is what creates leverage at the table. | _(keep)_ |
| Value title (`values[2]`, numeral III.) | Straight answers | _(keep)_ |
| Value body (`values[2]`) | We tell you where you stand in plain language, so you can make decisions with confidence. | _(keep)_ |

### 4.8 Contact / closing CTA

| Location | Current text | New text |
|---|---|---|
| Contact eyebrow | Free Initial Consultation | _(keep)_ |
| Contact headline (h2; "what happened." is in a gold `<span>`) | Tell us <span class="text-gold">what happened.</span> | _(keep)_ |
| Contact paragraph | Every consultation is free and confidential. We'll listen, tell you honestly where you stand, and lay out how we can help — with no obligation. | _(keep)_ |
| Contact phone button | Call (657) 218-4947 | _(keep)_ |
| Map iframe `title` (accessibility) | Kagasoff Law Firm office — 14541 Brookhurst St Suite D4, Westminster, CA | _(keep)_ |
| Office block label | Westminster Office | _(keep)_ |
| Office address (two lines with `<br />`) | 14541 Brookhurst St, Suite D4<br />Westminster, CA 92683 | _(keep)_ |
| Office phone link text | (657) 218-4947 | _(keep)_ |

*If the address ever changes, also update the Google Maps iframe `src` query in this section.*

---

## 5. Services page — src/pages/services.astro

| Location | Current text | New text |
|---|---|---|
| Page `<title>` (BaseLayout `title` prop) | Services — Kagasoff Law Firm, A.P.C. | _(keep)_ |
| Page meta description (BaseLayout `description` prop) | Six practice areas, one standard of care — personal injury, criminal defense, professional license defense, restraining orders, employment, and real estate. | _(keep)_ |
| Hero eyebrow | Services | _(keep)_ |
| Hero headline (h1; second sentence in a gold `<span>`) | Six areas. <span class="text-gold">One standard of care.</span> | _(keep)_ |
| Hero paragraph | Whatever life brings, the firm provides the same direct, attorney-led counsel across every matter. | _(keep)_ |
| Per-area section eyebrow (template, repeated for all 6 areas; `{nn}` is the zero-padded index; keep `&middot;`) | {nn} &middot; Practice Area | _(keep)_ |
| CTA band headline (h2; "matter?" is in a gold `<span>`) | Have a <span class="text-gold">matter?</span> | _(keep)_ |
| CTA band paragraph | Let's talk today. Your first consultation is free and confidential. | _(keep)_ |
| CTA phone button | Call (657) 218-4947 | _(keep)_ |
| CTA secondary button | Send a message | _(keep)_ |

*Hero jump-chips, each area's h2, blurb, overview paragraphs, cases heading, and bullet list all render from `src/data/practiceAreas.ts` — section 9. Bullets are prefixed with a brass `&mdash;` by the template.*

---

## 6. Intake form — src/components/IntakeForm.astro

⚠️ Reminder: this form is display-only — submissions are NOT delivered anywhere yet (placeholder note 3). Rendered twice on the home page (uid "a" mid-page with heading suppressed, uid "b" in the contact band with the default heading).

| Location | Current text | New text |
|---|---|---|
| Default heading (frontmatter `heading` default; shown on the contact-band instance) | Request a free consultation | _(keep)_ |
| Required-fields note (the `*` is a brass `<span>`) | Fields marked * are required. | _(keep)_ |
| Name field label (required) | Name | _(keep)_ |
| Name placeholder | Your full name | _(keep)_ |
| Phone field label (required) | Phone | _(keep)_ |
| Phone placeholder | (657) 000-0000 | _(keep)_ |
| Email field label | Email | _(keep)_ |
| Email placeholder | you@email.com | _(keep)_ |
| Matter type select label | Matter type | _(keep)_ |
| Matter type final option (the other options are the six practice-area names — section 9) | Not sure / Other | _(keep)_ |
| Message field label (required) | How can we help? | _(keep)_ |
| Message placeholder | Briefly describe your situation. Do not include confidential details you wouldn't want sent by email. | _(keep)_ |
| Validation error message | Please enter your name, a phone number, and a short message. | _(keep)_ |
| Submit button | Submit request | _(keep)_ |
| Disclaimer under the button | Submitting this form does not create an attorney–client relationship. Information sent through this form is not confidential until an engagement is established. | _(keep)_ |
| Confirmation heading (`there` is swapped for the submitter's first name by script — keep the `<span class="confirm-name">` wrapper) | Thank you, <span class="confirm-name">there</span>. | _(keep)_ |
| Confirmation paragraph 1 ⚠️ promises follow-up the unwired form cannot deliver | Your message has been received. An attorney will be in touch shortly — typically within one business day. | _(keep)_ |
| Confirmation paragraph 2 | If your matter is urgent, please call us directly. | _(keep)_ |
| Confirmation phone button | Call (657) 218-4947 | _(keep)_ |
| Confirmation reset button | Send another message | _(keep)_ |

---

## 7. Testimonials — src/data/testimonials.ts ⚠️ ALL FAKE — REPLACE WITH REAL GOOGLE REVIEWS

The file's first line is `// PLACEHOLDER REVIEWS — replace with real curated Google reviews.` Every entry below is invented. The carousel (`src/components/TestimonialCarousel.astro`) shows each as *Name · Google Review* with five stars. Do not launch with these. More or fewer entries are fine — the carousel loops over whatever the array holds.

| Location | Current text (name — quote) | New text |
|---|---|---|
| `testimonials[0]` ⚠️ fake | Melissa R. — After my accident on the 405 I had no idea where to start. They handled everything and got me a settlement that actually covered my recovery. | _(keep — still placeholder)_ |
| `testimonials[1]` ⚠️ fake | David T. — Facing charges was terrifying, but my attorney was straight with me at every step and fought hard. Case dismissed. I can't thank this firm enough. | _(keep — still placeholder)_ |
| `testimonials[2]` ⚠️ fake | James K. — Professional, responsive, and genuinely caring. I felt like a person, not a case number, from our first call in Santa Ana all the way through. | _(keep — still placeholder)_ |
| `testimonials[3]` ⚠️ fake | Priya S. — The team negotiated with the insurance company so I didn't have to. Clear communication and a great result. Highly recommend to anyone in Orange County. | _(keep — still placeholder)_ |
| TestimonialCarousel.astro — source label after each reviewer name | Google Review | _(keep)_ |

---

## 8. Process steps — src/data/practiceAreas.ts (`process` array)

Rendered by ProcessSection.astro on the home page. Titles are injected with `set:html`, so simple HTML like `<em>` is allowed.

| Location | Current text | New text |
|---|---|---|
| `process[0].title` | Free consultation | _(keep)_ |
| `process[0].body` | We listen to what happened and tell you honestly where you stand and how we can help. | _(keep)_ |
| `process[1].title` | Strategy & preparation | _(keep)_ |
| `process[1].body` | We gather the facts, records, and evidence and build a clear, documented case from the outset. | _(keep)_ |
| `process[2].title` | Negotiation or hearing | _(keep)_ |
| `process[2].body` | We press for the best resolution available — and never settle for less to simply close a file. | _(keep)_ |
| `process[3].title` | Resolution, or trial | _(keep)_ |
| `process[3].body` | When a fair outcome isn't on the table, we're prepared to advocate for you in court. | _(keep)_ |

---

## 9. Practice areas — src/data/practiceAreas.ts (`practiceAreas` array)

Where each field renders:

- `name` — header dropdown + mobile menu, footer link columns, home practice-deck card title, services hero jump-chip, services section h2, intake-form Matter type option.
- `short` — home practice-deck card one-liner (HTML-injected; keep entities like `&rsquo;`).
- `blurb` — services page lead paragraph under the area's h2.
- `overview[0..1]` — services page body paragraphs (keep as separate paragraphs).
- `casesHeading` — services page h3 above the bullet list.
- `cases` — services page two-column bullet list.

Do NOT change the `slug` values — they are URL anchors (`/services#personal-injury` etc.).

### 9.1 Personal Injury (`practiceAreas[0]`, slug `personal-injury`)

| Field | Current text | New text |
|---|---|---|
| name | Personal Injury | _(keep)_ |
| short (keep `&rsquo;`) | Auto-accidents, workers&rsquo; compensation. | _(keep)_ |
| blurb | When someone else's negligence turns your life upside down, we pursue the full recovery you're owed — and handle the insurers so you can focus on healing. | _(keep)_ |
| overview[0] | A serious injury brings medical bills, lost income, and pressure from insurance adjusters whose job is to pay you as little as possible. Our role is to level that field — to build a clear, documented case for everything you have lost and to negotiate, or litigate, from a position of strength. | _(keep)_ |
| overview[1] | We take the time to understand the full impact of your injury, coordinate with medical providers, and keep you informed at every step. | _(keep)_ |
| casesHeading | Cases we handle | _(keep)_ |
| cases[0] | Automobile & motorcycle accidents | _(keep)_ |
| cases[1] | Slip, trip & fall injuries | _(keep)_ |
| cases[2] | Pedestrian & bicycle collisions | _(keep)_ |
| cases[3] | Dog bites & animal attacks | _(keep)_ |
| cases[4] | Premises liability | _(keep)_ |
| cases[5] | Wrongful death | _(keep)_ |

### 9.2 Criminal Defense (`practiceAreas[1]`, slug `criminal-defense`)

| Field | Current text | New text |
|---|---|---|
| name | Criminal Defense | _(keep)_ |
| short | Misdemeanors and felonies, defended at every stage. | _(keep)_ |
| blurb | From misdemeanors to felonies, we defend your rights at every stage — with the perspective of an attorney who has worked both sides of the courtroom. | _(keep)_ |
| overview[0] | Having served as a law clerk for both the Orange County District Attorney and Public Defender before fifteen years in private defense, Ashley Kagasoff brings a rare, dual perspective to every criminal matter — an understanding of exactly how the prosecution builds, and breaks down, a case. | _(keep)_ |
| overview[1] | We move quickly to protect your rights, scrutinize the evidence against you, and pursue the strongest possible outcome — from dismissal and reduced charges to acquittal at trial. | _(keep)_ |
| casesHeading | Charges we defend | _(keep)_ |
| cases[0] | DUI & traffic offenses | _(keep)_ |
| cases[1] | Drug offenses | _(keep)_ |
| cases[2] | Theft & property crimes | _(keep)_ |
| cases[3] | Domestic violence | _(keep)_ |
| cases[4] | Assault & violent offenses | _(keep)_ |
| cases[5] | Probation violations | _(keep)_ |

### 9.3 Professional License Defense (`practiceAreas[2]`, slug `professional-license-defense`)

| Field | Current text | New text |
|---|---|---|
| name | Professional License Defense | _(keep)_ |
| short | Representation before California licensing boards. | _(keep)_ |
| blurb | Your license is your livelihood. We defend professionals through investigations, accusations, and hearings before California licensing boards. | _(keep)_ |
| overview[0] | A complaint or accusation can put years of training and a career at risk. We represent licensed professionals at every phase — from the first investigative inquiry through formal accusations and administrative hearings. | _(keep)_ |
| overview[1] | Ashley has appeared before licensing authorities across the state and understands what each board expects and how to present the strongest defense of your record and reputation. | _(keep)_ |
| casesHeading | Boards we appear before | _(keep)_ |
| cases[0] | Medical Board of California | _(keep)_ |
| cases[1] | Board of Registered Nursing | _(keep)_ |
| cases[2] | Dental Board of California | _(keep)_ |
| cases[3] | Bureau of Real Estate | _(keep)_ |
| cases[4] | Contractors State License Board | _(keep)_ |
| cases[5] | State Bar & Teacher Credentialing | _(keep)_ |

### 9.4 Restraining Orders (`practiceAreas[3]`, slug `restraining-orders`)

| Field | Current text | New text |
|---|---|---|
| name | Restraining Orders | _(keep)_ |
| short | Decisive protection and defense at hearing. | _(keep)_ |
| blurb | Whether you need protection or you've been wrongly accused, we act quickly and represent you through the hearing. | _(keep)_ |
| overview[0] | Restraining order proceedings move fast and carry lasting consequences. Whether you are seeking protection or defending against an order, prompt, prepared representation matters. | _(keep)_ |
| overview[1] | Ashley has obtained dismissals of domestic violence restraining orders after hearing and represents clients on both sides of these urgent matters. | _(keep)_ |
| casesHeading | How we help | _(keep)_ |
| cases[0] | Domestic violence restraining orders | _(keep)_ |
| cases[1] | Civil harassment orders | _(keep)_ |
| cases[2] | Defense at hearing | _(keep)_ |
| cases[3] | Emergency protective orders | _(keep)_ |
| cases[4] | Modifications | _(keep)_ |
| cases[5] | Renewals & appeals | _(keep)_ |

### 9.5 Employment (`practiceAreas[4]`, slug `employment`)

| Field | Current text | New text |
|---|---|---|
| name | Employment | _(keep)_ |
| short | Workplace disputes and wrongful treatment. | _(keep)_ |
| blurb | Standing up for employees facing wrongful treatment, harassment, and unpaid wages at work. | _(keep)_ |
| overview[0] | The workplace is where livelihoods are made — and where rights are too often violated. We represent employees against employers who cross the line, pursuing accountability and the compensation our clients are owed. | _(keep)_ |
| overview[1] | We evaluate your situation candidly and pursue resolution efficiently, through negotiation or litigation. | _(keep)_ |
| casesHeading | Claims we pursue | _(keep)_ |
| cases[0] | Wrongful termination | _(keep)_ |
| cases[1] | Workplace harassment | _(keep)_ |
| cases[2] | Discrimination | _(keep)_ |
| cases[3] | Retaliation | _(keep)_ |
| cases[4] | Wage & hour disputes | _(keep)_ |
| cases[5] | Unpaid wages | _(keep)_ |

### 9.6 Real Estate (`practiceAreas[5]`, slug `real-estate`)

| Field | Current text | New text |
|---|---|---|
| name | Real Estate | _(keep)_ |
| short | Property transactions and disputes. | _(keep)_ |
| blurb | Clear-eyed guidance and advocacy for property transactions and the disputes that can follow them. | _(keep)_ |
| overview[0] | Real estate matters carry significant financial stakes and unforgiving deadlines. We help clients navigate transactions and resolve disputes with attention to the detail that protects your investment. | _(keep)_ |
| overview[1] | From contract review to litigation, we provide practical advice grounded in your goals. | _(keep)_ |
| casesHeading | Matters we handle | _(keep)_ |
| cases[0] | Purchase & sale disputes | _(keep)_ |
| cases[1] | Landlord–tenant matters | _(keep)_ |
| cases[2] | Boundary & title issues | _(keep)_ |
| cases[3] | Contract review | _(keep)_ |
| cases[4] | Non-disclosure claims | _(keep)_ |
| cases[5] | Property litigation | _(keep)_ |

---

## 10. Misc — accessibility labels and technical strings (rarely need editing)

Screen-reader-only or technical strings, listed for completeness. Edit only if the wording matters to you.

| Location | Current text | New text |
|---|---|---|
| Header.astro — mobile menu button `aria-label` | Toggle menu | _(keep)_ |
| IntakeForm.astro — form `aria-label` | Free consultation request | _(keep)_ |
| TestimonialCarousel.astro — carousel group `aria-label` | Client reviews | _(keep)_ |
| index.astro — practice-deck arrow `aria-label`s | Previous practice area / Next practice area | _(keep)_ |
| index.astro — deck dot `aria-label` (script-generated) | Practice area {n} | _(keep)_ |
| ProcessSection.astro — "More" toggle `aria-label` (template; follows the process titles automatically) | More about {step title} | _(keep)_ |
| index.astro — office manager `Placeholder` label (goes away when a real portrait is added) | Office manager portrait — replace | _(keep)_ |

All SVG illustrations (process cards, services scenes, icons) are decorative and `aria-hidden` — no text to edit.
