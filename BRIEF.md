# BRIEF — Kagasoff Law Firm, A.P.C.
Fill this in BEFORE running `/redesign`. Whatever Claude can't find here it either
invents (bad) or marks `<!-- NEEDS-CLIENT -->` (good). Detail here is the single
biggest lever on how generic the output is.
## The business
- What they do, in one sentence a stranger would understand: Kagasoff Law Firm, A.P.C. — a Westminster, CA practice handling personal injury, criminal defense, professional license defense, family law, restraining orders, employment, and real estate matters.
- Where they operate (and the service area, if it matters for local search): Westminster, CA (Orange County). Attorney is licensed in CA and admitted to the Eastern, Central, and Southern District Courts of CA. Exact geographic service radius / other counties served: <!-- NEEDS-CLIENT -->
- How long they've been doing it: Ashley Kagasoff has 17+ years of practice per current site bio; firm's own founding/incorporation date not stated. <!-- NEEDS-CLIENT -->
## The visitor
- Who lands here, and in what emotional state: <!-- NEEDS-CLIENT -->
- What they need to find in the first 10 seconds: <!-- NEEDS-CLIENT -->
- The single action this site exists to produce: <!-- NEEDS-CLIENT -->
## Positioning
- What makes them different from the three nearest competitors: <!-- NEEDS-CLIENT -->
- What the site must NOT feel like — be specific, name sites if you can: <!-- NEEDS-CLIENT -->
- Tone, pick exactly one: `<authoritative / warm / precise / plainspoken / ...>` <!-- NEEDS-CLIENT -->
## Constraints
- Locked brand assets (logo, colors, fonts): The repo already implements a specific direction — "Direction A — Classic Authority": Cormorant Garamond serif headlines, Libre Franklin body, on a deep-navy / warm-paper / brass palette, defined as design tokens in `src/styles/global.css` under `@theme`. No separate logo file exists; header uses a text lockup. Confirm whether this direction is locked/approved or still open to change. <!-- NEEDS-CLIENT -->
- Must not change (URLs, form endpoint, analytics, CMS): This is a from-scratch Astro + Tailwind v4 static site (not the live Wix site) — `npm run build` outputs static files to `dist/`, deployable to Netlify/Vercel/Cloudflare Pages/GitHub Pages, no server required. Practice-area content lives centrally in `src/data/practiceAreas.ts` (one object per area drives the home list, footer, contact dropdown, and the shared `/practice/[slug]` template). The contact form (`contact.astro`) validates client-side and shows a confirmation state but **does not yet deliver messages** — needs a delivery method wired (Netlify Forms, Formspree, or an Astro API route) before launch. No analytics currently installed. Old Wix URL structure does not need to be preserved in the codebase, but if any Wix URLs are indexed/ranking, 301 redirects from old slugs to the new routes should be planned separately. <!-- NEEDS-CLIENT: confirm hosting choice, form delivery method, and whether old Wix URLs need redirects -->
- Content available now vs. still owed by the client: The repo is further along than the live site — it already has expanded, unique copy for all 7 practice areas (overview paragraphs, case lists, shared 4-step process), a full attorney bio, and real photos in place (`ashley-portrait.jpg`, `team.jpg`, `hero.jpg`) rather than placeholders. Only the office map on the Contact page is still a placeholder. One thing to flag: `ReviewsBadge.astro` currently hardcodes a "5.0 (291 reviews)" Google-rating badge as a design placeholder — this number is not sourced from anywhere and must be replaced with the real GBP rating/count (or removed) before launch. Still owed: business hours, any other attorneys/staff bios if applicable, real testimonials, specific case results, firm founding date, awards/certifications, and a Google Maps embed for the office. <!-- NEEDS-CLIENT -->
- Hosting and performance constraints: Static output — any static host works; no server needed unless the contact form is wired via an Astro API route instead of Netlify Forms/Formspree. Final hosting choice not yet made. <!-- NEEDS-CLIENT -->

## Accessibility
- Known obligations or past complaints: <!-- NEEDS-CLIENT -->
- Anyone using the site with assistive tech that you know of: <!-- NEEDS-CLIENT -->
- Jurisdiction (some states add statutory damages on top of federal ADA exposure): <!-- NEEDS-CLIENT -->
## Search
- Terms real customers actually type (their words, not industry jargon): <!-- NEEDS-CLIENT -->
- Existing rankings or traffic worth protecting: <!-- NEEDS-CLIENT -->
- Google Business Profile claimed? Exact NAP as it appears there: Not confirmed from site alone — need to check the GBP listing directly. Name/phone: "Kagasoff Law Firm, A.P.C." / (657) 218-4947. Note: the *live Wix site's* Contact page body text says "Suite B7" while every other reference (Wix homepage/footer, and the repo itself) says "Suite D4" — the repo is consistent, so this is a live-site typo to be aware of, not a repo issue. Confirm D4 is correct and match it to GBP exactly. <!-- NEEDS-CLIENT -->
- Competitors currently outranking them: <!-- NEEDS-CLIENT -->
## Real content on hand
Paste it. Names, credentials, bios, service descriptions, address, hours, phone,
testimonials with attribution. Anything not here cannot appear on the site.

**Pulled directly from the live site (kagasofflaw.com), verbatim source facts only:**

- Firm name: Kagasoff Law Firm, A.P.C.
- Phone: (657) 218-4947
- Fax: 657-900-2884
- Address: 14541 Brookhurst St, Westminster, CA 92683 — suite number inconsistent (D4 vs B7), needs client confirmation
- Practice areas listed: Personal Injury, Workers' Compensation, Criminal Defense, Professional License Defense, Family Law, Restraining Orders, Employment, Real Estate
- Attorney: Ashley Kagasoff, Attorney at Law
  - 17+ years of practice; personalized, results-driven representation
  - Practice areas: criminal defense, professional licensing defense, personal injury, employment, family law
  - Former law clerk, Orange County District Attorney's Office and Orange County Public Defender's Office; 15 years of private defense practice
  - Represents clients before the Medical Board of California, Nursing Board of California, Board of Real Estate, Dental Board of California, Contractor's State Licensing Board, State Bar of California, and California Commission on Teacher Credentialing
  - Has achieved dismissals of domestic violence restraining orders after hearing; resolves high-conflict family law disputes
  - Handles personal injury matters involving accidents, premises liability, and dog bites; cites "millions in settlements" for clients (no specific case results given)
  - B.A., UCLA, 2003; J.D., Chapman University School of Law, 2007
  - Licensed in California; admitted to Eastern, Central, and Southern District Courts of California
- "Our Vision" statement: commitment to exceptional legal counsel and client satisfaction
- One core value published so far: "Attentiveness" — being fully present, listening, personalized solutions (site appears to have a template for more values that aren't filled in yet)
- An "Our Team" section exists on the About page but only shows photos with no names/bios attached — need client to confirm if there are other attorneys/staff to profile

**Still needed from client (not on current site):**
- Business hours
- Any other attorneys/staff — names, credentials, bios, photos
- Client testimonials with attribution
- Specific case results/settlement figures (if shareable)
- Firm founding date / years in business as an entity
- Any awards, bar memberships, certifications not already listed
- Preferred CTA language (e.g. "Free Consultation," "Call Now")
## Explicitly out of scope
<!-- NEEDS-CLIENT -->