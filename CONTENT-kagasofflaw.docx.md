# **CONTENT.md — Full user-facing copy inventory for kagasofflaw site**

# **Instructions for Claude (read first when applying this document)**

This document is a complete inventory of every user-facing string on the site, laid out as fill-in tables. The site owner overwrites cells in the **New text** column; you apply them.

**How the tables work:**

* Each row is one string. Columns: **Location** (the section/variable/prop where the string lives — the governing file is named in the table's heading or the Location cell), **Current text** (the string exactly as it appears in source, verbatim, including HTML entities and inline markup), and **New text**.

* A **New text** cell containing \_(keep)\_ means: leave that string unchanged. Anything else replaces the Current text exactly.

* Long paragraphs are shown on one line in the cell; in source they may be wrapped across lines — match the file's existing wrapping style when editing.

**Rules when applying:**

1. Preserve HTML entities (\&amp;, \&mdash;, \&rsquo;, \&middot;, \&rarr;) and any surrounding markup/JSX exactly — replace only the human-readable text. If a Current cell contains an entity and the New cell has the equivalent literal character (e.g. —), convert it back to the entity used in the Current string to stay consistent with the codebase style.

2. Strings in .astro templates are edited in place; strings in .ts data files (src/data/testimonials.ts, src/data/practiceAreas.ts) are edited in their arrays. Multi-line template literals keep their line-wrapping style.

3. Some strings appear in more than one place (the phone number, the address, "Six areas. One standard of care.", "Call (657) 218-4947"). Each occurrence has its own row — apply each individually; do not blind global-replace.

4. After applying all changes: run npx astro build to confirm the site still builds, then grep the src/ tree for a few distinctive fragments of the OLD text (e.g. old testimonial names, "SAMPLE BIO", old headlines) to confirm nothing was missed.

5. Do not touch CSS, SVG path data, scripts, class names, or slug values (slugs are URL anchors referenced by header, footer, and home deck).

# **⚠️ KNOWN PLACEHOLDERS — must be resolved before launch**

1. **FAKE TESTIMONIALS** — every quote/name in src/data/testimonials.ts is invented (file is marked // PLACEHOLDER REVIEWS). They are presented on the site as "Google Review" with 5 stars. They MUST be replaced with real, curated Google reviews (or the carousel removed) before production. See section 7\.

2. **OFFICE MANAGER** — the home team section's second card uses the literal name "Office Manager Name", a bio beginning "\[SAMPLE BIO — replace…\]", and a gray Placeholder component instead of a portrait photo. See section 4.5.

3. **INTAKE FORM IS NOT WIRED** — src/components/IntakeForm.astro only *shows* a confirmation client-side; it does not deliver the message anywhere (the script comment suggests Netlify Forms, Formspree, or an Astro API route). The confirmation copy promising "An attorney will be in touch shortly" is currently untrue. Wiring the form is a code task outside this document; the confirmation text rows are in section 6\.

# **1\. Global / Meta — src/layouts/BaseLayout.astro**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Default page \<title\> (frontmatter title default) | Kagasoff Law Firm, A.P.C. — Trusted counsel when it matters most | *(keep)* |
| Default meta description (frontmatter description default) | Boutique Orange County law firm serving Westminster and greater Orange County across six practice areas. Direct, attorney-led counsel. Free consultation. | *(keep)* |

# **2\. Header — src/components/Header.astro**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Wordmark, main line | Kagasoff Law Firm | *(keep)* |
| Wordmark, subline | A Professional Corporation | *(keep)* |
| Nav label (nav array; desktop \+ mobile) | Home | *(keep)* |
| Nav label (nav array; desktop \+ mobile) | About | *(keep)* |
| Nav label (nav array; desktop \+ mobile) | Team | *(keep)* |
| Nav label (nav array; desktop \+ mobile) | Contact | *(keep)* |
| Services dropdown trigger (desktop) \+ mobile section label | Services | *(keep)* |
| Phone CTA text (appears twice: desktop nav \+ mobile menu; tel: href is 6572184947) | 657\&middot;218\&middot;4947 | *(keep)* |

*The dropdown/mobile service items are the six practice-area names — edited once in section 9\.*

# **3\. Footer — src/components/Footer.astro**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Brand line | Kagasoff Law Firm, A.P.C. | *(keep)* |
| Address (two lines separated by \<br /\>) | 14541 Brookhurst St, Suite D4\<br /\>Westminster, CA 92683 | *(keep)* |
| Phone link text (tel: href is 6572184947) | (657) 218-4947 | *(keep)* |
| Column heading 1 | Practice | *(keep)* |
| Column heading 2 | Firm | *(keep)* |
| "Firm" column static link | About | *(keep)* |
| "Firm" column static link | Contact | *(keep)* |
| "Firm" column static link | Services | *(keep)* |
| Copyright line ({year} is computed — keep the interpolation) | © {year} Kagasoff Law Firm, A.P.C. All rights reserved. | *(keep)* |
| Legal disclaimer line | Attorney advertising. Prior results do not guarantee a similar outcome. | *(keep)* |

*The "Practice" column lists the first four practice-area names; "Firm" also lists the remaining two — from section 9\.*

# **4\. Home page — src/pages/index.astro**

## **4.1 Hero**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Hero eyebrow | Westminster \&middot; Serving California | Serving California |
| Hero headline (h1; three lines with \<br /\>, middle line in gold \<span\>; keep \&amp;) | Orange County\<br /\>\<span class="text-gold"\>Injury \&amp; Defense\</span\>\<br /\>Attorneys. | *(keep)* |
| Hero paragraph (keep \&mdash;) | From the courtroom to the negotiating table, the Kagasoff Law Firm brings disciplined, personal advocacy to every client \&mdash; across six practice areas. | *From the courtroom to the negotiating table, Kagasoff Law Firm brings care and attention to every client.* |
| Hero primary button (phone CTA) | Call (657) 218-4947 | *(keep)* |
| Hero secondary button | Free consultation | *(keep)* |
| Hero photo alt text | The Kagasoff Law Firm team | *(keep)* |
| Hero photo badge (pill over the photo) | A team that fights for you | *(keep)* |

## **4.2 Why Us**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Why-us eyebrow | Why Kagasoff | *(keep)* |
| Why-us headline (h2) | A boutique firm with a courtroom record. | *The firm with proven results and decades of experience.* |
| Why-us paragraph | Direct access to your attorney, honest counsel, and preparation that holds up at trial — trusted by hundreds of Orange County clients. | *Personalized care and honest counsel that’s trusted by hundreds of clients.* |
| Why-us link | Read our story → | *More about the firm* → |

## **4.3 Stats (stats array in frontmatter)**

| Location | Current text (number / label) | New text |
| :---- | :---- | :---- |
| stats\[0\] | 17+ / Years of experience | 20+ / Years of experience |
| stats\[1\] | 5.0 / Google rating | *4.6* |
| stats\[2\] | 291 / Client reviews | *CUT* |
| stats\[3\] | 6 / Practice areas | *(keep)* |

## **4.4 Our Practice (card deck) \+ sticky form intro**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Practice eyebrow | Our Practice | *(keep)* |
| Practice headline (h2) | Six areas. One standard of care. | *(keep)* |
| Practice paragraph | Whatever life brings, the firm provides the same direct, attorney-led counsel across every matter. | *(keep)* |
| Practice card CTA (every card in the deck; keep \&rarr; in its own span) | Learn more \&rarr; | *(keep)* |
| Sticky form eyebrow (right column) | Free Consultation | *(keep)* |
| Sticky form lead-in line | Tell us about your case. | *(keep)* |

*Card titles and one-liners come from \`practiceAreas\[\].name\` and \`practiceAreas\[\].short\` — section 9\.*

## **4.5 Team**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Team eyebrow | The Team | *(keep)* |
| Team headline (h2) | The people in your corner. | *(keep)* |
| Team paragraph | A small team, on purpose — so you always know who is handling your matter. | *Transparency and personal care, so you know who is handling your matter.* |
| Ashley card: portrait alt text | Ashley Kagasoff | *(keep)* |
| Ashley card: name (h3) | Ashley Kagasoff | *(keep)* |
| Ashley card: role line (keep \&middot;) | Attorney at Law \&middot; Founder | Attorney at Law  |
| Ashley card: bio paragraph 1 | Ashley has dedicated over 17 years to results-driven advocacy and personalized service. Her practice spans criminal defense, professional license defense, personal injury, and employment — giving clients comprehensive solutions tailored to their needs. | Ashley has dedicated over two decades to results-driven advocacy and personalized legal service. Her practice areas span criminal defense, professional license defense, personal injury, and employment, giving clients comprehensive solutions tailored to their every needs. |
| Ashley card: bio paragraph 2 | Having worked both sides of the law — as a law clerk for the Orange County District Attorney's and Public Defender's offices, then fifteen years in private defense — she brings a rare perspective to every matter she takes on. | Having worked both sides of the law, as a law clerk for the Orange County District Attorney's and Public Defender's offices, then fifteen years in private defense, she brings a rare perspective to every matter she takes on. |
| Ashley card: credential (credentials\[0\], key / value) | 17+ years / Of trial & advocacy experience | 20+ years / Of trial & advocacy experience |
| Ashley card: credential (credentials\[1\], key / value) | UCLA / B.A., 2003 | *(keep)* |
| Ashley card: credential (credentials\[2\], key / value) | Chapman / J.D., School of Law, 2007 | *(keep)* |

### **⚠️ PLACEHOLDER — Office manager card**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Office manager card: portrait ⚠️ | *(no photo — gray \`\<Placeholder label="Office manager portrait — replace"\>\` component; needs a real image \+ alt text)* | *(keep — still placeholder)* |
| Office manager card: name (h3) ⚠️ literal placeholder | Office Manager Name | *Melo* |
| Office manager card: role line | Office Manager | *(keep)* |
| Office manager card: bio ⚠️ starts with a literal "\[SAMPLE BIO" marker | \[SAMPLE BIO — replace with the office manager's real bio.\] She is usually the first voice you'll hear when you call the firm, and she keeps every matter moving — scheduling consultations, gathering records, and making sure clients are never left wondering where their case stands. Clients regularly credit her with making a difficult process feel manageable. | *(keep — still placeholder)* |

## **4.6 Process section — src/components/ProcessSection.astro ("With You Step by Step")**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Section eyebrow | What working with us looks like | *(keep)* |
| Section headline (h2) | With You Step by Step. | With You Every Step of the Way. |
| Section intro paragraph | A clear, four-step path from your first call to resolution — we stay beside you at every stage, with the same disciplined approach across every practice area. | *Four simple steps, from first call to resolution. We pledge to stay beside you at every stage, with transparency and care.* |
| Step kicker (steps\[0\]) | Step 01 | *(keep)* |
| Step kicker (steps\[1\]) | Step 02 | *(keep)* |
| Step kicker (steps\[2\]) | Step 03 | *(keep)* |
| Step kicker (steps\[3\]) | Step 04 | *(keep)* |
| "More" disclosure button label (all four cards) | More | *(keep)* |
| Disclosure detail (mores\[0\], under Free consultation) | No fee to talk. If we are not the right fit, we will say so on the call. | *(keep)* |
| Disclosure detail (mores\[1\], under Strategy & preparation) | Records, reports and medical evidence, gathered early. | *(keep)* |
| Disclosure detail (mores\[2\], under Negotiation or hearing) | Most matters resolve without a courtroom, because we are ready for one. | *(keep)* |
| Disclosure detail (mores\[3\], under Resolution, or trial) | Straight answers on what a resolution is really worth. | *(keep)* |
| Disclosure caption (metas\[0\]; leading em dash is part of the string) | — Free & confidential | *(keep)* |
| Disclosure caption (metas\[1\]) | — Prepared as if for trial | — *Prepared, always* |
| Disclosure caption (metas\[2\]) | — Leverage at the table | — *Knowing how to best help you* |
| Disclosure caption (metas\[3\]) | — 17+ years of results | — *20+ years of results* |

*Step titles and one-line bodies come from the \`process\` array in \`src/data/practiceAreas.ts\` — section 8\.*

## **4.7 About the Firm**

| Location | Current text | New text |
| :---- | :---- | :---- |
| About eyebrow | About the Firm | *(keep)* |
| About mission headline (h2) | To provide exceptional legal counsel and representation that exceeds our clients' expectations. | *(keep)* |
| About paragraph | Based in Westminster and serving clients throughout Orange County and the greater California region, the firm handles matters across six practice areas — from personal injury and criminal defense to employment and professional licensing. What unites that range is a single approach: thorough preparation, plain-spoken advice, and direct access to the attorney working on your case. | Based in Westminster and serving clients throughout California, the firm handles matters across six practice areas, from personal injury and criminal defense to employment and professional licensing. What unites that range is a single approach: thorough preparation, plain-spoken advice, and direct access to the attorney working on your case. |
| About right-column label | What you can expect | *(keep)* |
| Value title (values\[0\], numeral I.) | Attentiveness | *(keep)* |
| Value body (values\[0\]) | We stay fully present and engaged — listening to your concerns and shaping legal solutions around your unique situation. | *(keep)* |
| Value title (values\[1\], numeral II.) | Relentless preparation | *(keep)* |
| Value body (values\[1\]) | Every case is prepared as if it will be tried. That readiness is what creates leverage at the table. | Every case is thoroughly prepared and strategized. That readiness is what creates leverage at the table. |
| Value title (values\[2\], numeral III.) | Straight answers | *(keep)* |
| Value body (values\[2\]) | We tell you where you stand in plain language, so you can make decisions with confidence. | *(keep)* |

## **4.8 Contact / closing CTA**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Contact eyebrow | Free Initial Consultation | *(keep)* |
| Contact headline (h2; "what happened." is in a gold \<span\>) | Tell us \<span class="text-gold"\>what happened.\</span\> | *(keep)* |
| Contact paragraph | Every consultation is free and confidential. We'll listen, tell you honestly where you stand, and lay out how we can help — with no obligation. | Every consultation is free and confidential. We'll listen, tell you honestly where you stand, and lay out how we can help. |
| Contact phone button | Call (657) 218-4947 | *(keep)* |
| Map iframe title (accessibility) | Kagasoff Law Firm office — 14541 Brookhurst St Suite D4, Westminster, CA | *(keep)* |
| Office block label | Westminster Office | *(keep)* |
| Office address (two lines with \<br /\>) | 14541 Brookhurst St, Suite D4\<br /\>Westminster, CA 92683 | *(keep)* |
| Office phone link text | (657) 218-4947 | *(keep)* |

*If the address ever changes, also update the Google Maps iframe \`src\` query in this section.*

# **5\. Services page — src/pages/services.astro**

| Location | Current text | New text |
| :---- | :---- | :---- |
| Page \<title\> (BaseLayout title prop) | Services — Kagasoff Law Firm, A.P.C. | *(keep)* |
| Page meta description (BaseLayout description prop) | Six practice areas, one standard of care — personal injury, criminal defense, professional license defense, restraining orders, employment, and real estate. | *(keep)* |
| Hero eyebrow | Services | *(keep)* |
| Hero headline (h1; second sentence in a gold \<span\>) | Six areas. \<span class="text-gold"\>One standard of care.\</span\> | *(keep)* |
| Hero paragraph | Whatever life brings, the firm provides the same direct, attorney-led counsel across every matter. | *(keep)* |
| Per-area section eyebrow (template, repeated for all 6 areas; {nn} is the zero-padded index; keep \&middot;) | {nn} \&middot; Practice Area | *(keep)* |
| CTA band headline (h2; "matter?" is in a gold \<span\>) | Have a \<span class="text-gold"\>matter?\</span\> | *(keep)* |
| CTA band paragraph | Let's talk today. Your first consultation is free and confidential. | *(keep)* |
| CTA phone button | Call (657) 218-4947 | *(keep)* |
| CTA secondary button | Send a message | *(keep)* |

*Hero jump-chips, each area's h2, blurb, overview paragraphs, cases heading, and bullet list all render from \`src/data/practiceAreas.ts\` — section 9\. Bullets are prefixed with a brass \`\&mdash;\` by the template.*

# **6\. Intake form — src/components/IntakeForm.astro**

⚠️ Reminder: this form is display-only — submissions are NOT delivered anywhere yet (placeholder note 3). Rendered twice on the home page (uid "a" mid-page with heading suppressed, uid "b" in the contact band with the default heading).

| Location | Current text | New text |
| :---- | :---- | :---- |
| Default heading (frontmatter heading default; shown on the contact-band instance) | Request a free consultation | *(keep)* |
| Required-fields note (the \* is a brass \<span\>) | Fields marked \* are required. | *(keep)* |
| Name field label (required) | Name | *(keep)* |
| Name placeholder | Your full name | *(keep)* |
| Phone field label (required) | Phone | *(keep)* |
| Phone placeholder | (657) 000-0000 | *(keep)* |
| Email field label | Email | *(keep)* |
| Email placeholder | you@email.com | *(keep)* |
| Matter type select label | Matter type | *(keep)* |
| Matter type final option (the other options are the six practice-area names — section 9\) | Not sure / Other | *(keep)* |
| Message field label (required) | How can we help? | *(keep)* |
| Message placeholder | Briefly describe your situation. Do not include confidential details you wouldn't want sent by email. | *(keep)* |
| Validation error message | Please enter your name, a phone number, and a short message. | *(keep)* |
| Submit button | Submit request | *(keep)* |
| Disclaimer under the button | Submitting this form does not create an attorney–client relationship. Information sent through this form is not confidential until an engagement is established. | *(keep)* |
| Confirmation heading (there is swapped for the submitter's first name by script — keep the \<span class="confirm-name"\> wrapper) | Thank you, \<span class="confirm-name"\>there\</span\>. | *(keep)* |
| Confirmation paragraph 1 ⚠️ promises follow-up the unwired form cannot deliver | Your message has been received. An attorney will be in touch shortly — typically within one business day. | *(keep)* |
| Confirmation paragraph 2 | If your matter is urgent, please call us directly. | *(keep)* |
| Confirmation phone button | Call (657) 218-4947 | *(keep)* |
| Confirmation reset button | Send another message | *(keep)* |

# **7\. Testimonials — src/data/testimonials.ts ⚠️ ALL FAKE — REPLACE WITH REAL GOOGLE REVIEWS**

The file's first line is // PLACEHOLDER REVIEWS — replace with real curated Google reviews. Every entry below is invented. The carousel (src/components/TestimonialCarousel.astro) shows each as *Name · Google Review* with five stars. Do not launch with these. More or fewer entries are fine — the carousel loops over whatever the array holds.

| Location | Current text (name — quote) | New text |
| :---- | :---- | :---- |
| testimonials\[0\] ⚠️ fake | Melissa R. — After my accident on the 405 I had no idea where to start. They handled everything and got me a settlement that actually covered my recovery. | Mary H. – Where can I begin\! Ashley is absolutely the best\! Her staff is outstanding. They kept in contact, always returned calls absolutely made the process easy and stress free. We were very, very satisfied with my mom’s settlement literally more than we ever thought she would be compensated for\! I recommend her 10000000%. |
| testimonials\[1\] ⚠️ fake | David T. — Facing charges was terrifying, but my attorney was straight with me at every step and fought hard. Case dismissed. I can't thank this firm enough. | Angel A. – I can’t recommend Ashley Kagasoff enough. I’ve known her since 2018, and she has been by my side through every legal challenge I’ve faced. Throughout the years, Ashley has consistently shown professionalism, dedication, and a genuine commitment to getting the best outcome for her clients. What really sets her apart is how much she truly cares—she takes the time to explain everything clearly, keeps you informed, and makes you feel confident every step of the way. No matter how stressful the situation was, I always knew I was in good hands with her. If you’re looking for a lawyer who is knowledgeable, reliable, and genuinely has your back, Ashley Kagasoff is the one to call. I’m extremely grateful for all the help she’s given me over the years.  |
| testimonials\[2\] ⚠️ fake | James K. — Professional, responsive, and genuinely caring. I felt like a person, not a case number, from our first call in Santa Ana all the way through. | Robbie G. – Outstanding experience from start to finish. I came in with a card dispute case and the team at Kagasoff and Associates handled everything swiftly and efficiently — I didn’t have to get involved in any of the details. The whole process was fast, seamless, and the outcome was brilliant. If you need a firm that truly takes the wheel and gets results, look no further. Five stars without hesitation.​​​​​​​​​​​​​​​​  |
| testimonials\[3\] ⚠️ fake | Priya S. — The team negotiated with the insurance company so I didn't have to. Clear communication and a great result. Highly recommend to anyone in Orange County. | Catherine R. – Working with Ashley and her team was one of the best decisions I could have made. From the very beginning, she demonstrated professionalism, clarity, and genuine care for my case. Navigating a personal injury matter can be incredibly stressful, but Ashley made the entire process feel organized, strategic, and manageable. |
| TestimonialCarousel.astro — source label after each reviewer name | Google Review | *(keep)* |

# **8\. Process steps — src/data/practiceAreas.ts (process array)**

Rendered by ProcessSection.astro on the home page. Titles are injected with set:html, so simple HTML like \<em\> is allowed.

| Location | Current text | New text |
| :---- | :---- | :---- |
| process\[0\].title | Free consultation | *(keep)* |
| process\[0\].body | We listen to what happened and tell you honestly where you stand and how we can help. | *(keep)* |
| process\[1\].title | Strategy & preparation | *(keep)* |
| process\[1\].body | We gather the facts, records, and evidence and build a clear, documented case from the outset. | *(keep)* |
| process\[2\].title | Negotiation or hearing | *(keep)* |
| process\[2\].body | We press for the best resolution available — and never settle for less to simply close a file. | *(keep)* |
| process\[3\].title | Resolution, or trial | *(keep)* |
| process\[3\].body | When a fair outcome isn't on the table, we're prepared to advocate for you in court. | *(keep)* |

# **9\. Practice areas — src/data/practiceAreas.ts (practiceAreas array)**

Where each field renders:

* name — header dropdown \+ mobile menu, footer link columns, home practice-deck card title, services hero jump-chip, services section h2, intake-form Matter type option.

* short — home practice-deck card one-liner (HTML-injected; keep entities like \&rsquo;).

* blurb — services page lead paragraph under the area's h2.

* overview\[0..1\] — services page body paragraphs (keep as separate paragraphs).

* casesHeading — services page h3 above the bullet list.

* cases — services page two-column bullet list.

Do NOT change the slug values — they are URL anchors (/services\#personal-injury etc.).

## **9.1 Personal Injury (practiceAreas\[0\], slug personal-injury)**

| Field | Current text | New text |
| :---- | :---- | :---- |
| name | Personal Injury | *(keep)* |
| short (keep \&rsquo;) | Auto-accidents, workers\&rsquo; compensation. | *(keep)* |
| blurb | When someone else's negligence turns your life upside down, we pursue the full recovery you're owed — and handle the insurers so you can focus on healing. | *(keep)* |
| overview\[0\] | A serious injury brings medical bills, lost income, and pressure from insurance adjusters whose job is to pay you as little as possible. Our role is to level that field — to build a clear, documented case for everything you have lost and to negotiate, or litigate, from a position of strength. | A serious injury brings medical bills, lost income, and pressure from insurance adjusters whose job is to pay you as little as possible. Our role is to level that field,  to build a clear, documented case for everything you have lost and to negotiate, or litigate, from a position of strength. |
| overview\[1\] | We take the time to understand the full impact of your injury, coordinate with medical providers, and keep you informed at every step. | *(keep)* |
| casesHeading | Cases we handle | *(keep)* |
| cases\[0\] | Automobile & motorcycle accidents | *(keep)* |
| cases\[1\] | Slip, trip & fall injuries | Slip & fall injuries |
| cases\[2\] | Pedestrian & bicycle collisions | *(keep)* |
| cases\[3\] | Dog bites & animal attacks | *(keep)* |
| cases\[4\] | Premises liability | *(keep)* |
| cases\[5\] | Wrongful death | *(keep)* |

## **9.2 Criminal Defense (practiceAreas\[1\], slug criminal-defense)**

| Field | Current text | New text |
| :---- | :---- | :---- |
| name | Criminal Defense | *(keep)* |
| short | Misdemeanors and felonies, defended at every stage. | *(keep)* |
| blurb | From misdemeanors to felonies, we defend your rights at every stage — with the perspective of an attorney who has worked both sides of the courtroom. | From misdemeanors to felonies, we defend your rights at every stage, with the unique perspective of an attorney who has worked both sides of the courtroom. |
| overview\[0\] | Having served as a law clerk for both the Orange County District Attorney and Public Defender before fifteen years in private defense, Ashley Kagasoff brings a rare, dual perspective to every criminal matter — an understanding of exactly how the prosecution builds, and breaks down, a case. | Having served as a law clerk for both the Orange County District Attorney and Public Defender before fifteen years in private defense, Ashley Kagasoff brings a rare, dual perspective to every criminal matter. |
| overview\[1\] | We move quickly to protect your rights, scrutinize the evidence against you, and pursue the strongest possible outcome — from dismissal and reduced charges to acquittal at trial. | We move quickly to protect your rights, scrutinize the evidence against you, and pursue the strongest possible outcome. |
| casesHeading | Charges we defend | *(keep)* |
| cases\[0\] | DUI & traffic offenses | *(keep)* |
| cases\[1\] | Drug offenses | *(keep)* |
| cases\[2\] | Theft & property crimes | *(keep)* |
| cases\[3\] | Domestic violence | *(keep)* |
| cases\[4\] | Assault & violent offenses | *(keep)* |
| cases\[5\] | Probation violations | *(keep)* |

## **9.3 Professional License Defense (practiceAreas\[2\], slug professional-license-defense)**

| Field | Current text | New text |
| :---- | :---- | :---- |
| name | Professional License Defense | *(keep)* |
| short | Representation before California licensing boards. | *(keep)* |
| blurb | Your license is your livelihood. We defend professionals through investigations, accusations, and hearings before California licensing boards. | *(keep)* |
| overview\[0\] | A complaint or accusation can put years of training and a career at risk. We represent licensed professionals at every phase — from the first investigative inquiry through formal accusations and administrative hearings. | A complaint or accusation can put years of training and a career at risk. We represent licensed professionals at every phase. |
| overview\[1\] | Ashley has appeared before licensing authorities across the state and understands what each board expects and how to present the strongest defense of your record and reputation. | *(keep)* |
| casesHeading | Boards we appear before | *(keep)* |
| cases\[0\] | Medical Board of California | *(keep)* |
| cases\[1\] | Board of Registered Nursing | *(keep)* |
| cases\[2\] | Dental Board of California | *(keep)* |
| cases\[3\] | Bureau of Real Estate | *(keep)* |
| cases\[4\] | Contractors State License Board | *(keep)* |
| cases\[5\] | State Bar & Teacher Credentialing | *(keep)* |

## **9.4 Restraining Orders (practiceAreas\[3\], slug restraining-orders)**

| Field | Current text | New text |
| :---- | :---- | :---- |
| name | Restraining Orders | *(keep)* |
| short | Decisive protection and defense at hearing. | *(keep)* |
| blurb | Whether you need protection or you've been wrongly accused, we act quickly and represent you through the hearing. | *(keep)* |
| overview\[0\] | Restraining order proceedings move fast and carry lasting consequences. Whether you are seeking protection or defending against an order, prompt, prepared representation matters. | Restraining order proceedings move fast and carry lasting consequences. Prepared representation matters for every single scenario. |
| overview\[1\] | Ashley has obtained dismissals of domestic violence restraining orders after hearing and represents clients on both sides of these urgent matters. | *(keep)* |
| casesHeading | How we help | *(keep)* |
| cases\[0\] | Domestic violence restraining orders | *(keep)* |
| cases\[1\] | Civil harassment orders | *(keep)* |
| cases\[2\] | Defense at hearing | *(keep)* |
| cases\[3\] | Emergency protective orders | *(keep)* |
| cases\[4\] | Modifications | *(keep)* |
| cases\[5\] | Renewals & appeals | *(keep)* |

## **9.5 Employment (practiceAreas\[4\], slug employment)**

| Field | Current text | New text |
| :---- | :---- | :---- |
| name | Employment | *(keep)* |
| short | Workplace disputes and wrongful treatment. | *(keep)* |
| blurb | Standing up for employees facing wrongful treatment, harassment, and unpaid wages at work. | *(keep)* |
| overview\[0\] | The workplace is where livelihoods are made — and where rights are too often violated. We represent employees against employers who cross the line, pursuing accountability and the compensation our clients are owed. | The workplace is where livelihoods are made, and where rights are too often violated. We represent employees against employers who cross the line, pursuing accountability and the compensation our clients are owed. |
| overview\[1\] | We evaluate your situation candidly and pursue resolution efficiently, through negotiation or litigation. | *(keep)* |
| casesHeading | Claims we pursue | *(keep)* |
| cases\[0\] | Wrongful termination | *(keep)* |
| cases\[1\] | Workplace harassment | *(keep)* |
| cases\[2\] | Discrimination | *(keep)* |
| cases\[3\] | Retaliation | *(keep)* |
| cases\[4\] | Wage & hour disputes | *(keep)* |
| cases\[5\] | Unpaid wages | *(keep)* |

## **9.6 Real Estate (practiceAreas\[5\], slug real-estate)**

| Field | Current text | New text |
| :---- | :---- | :---- |
| name | Real Estate | *(keep)* |
| short | Property transactions and disputes. | *(keep)* |
| blurb | Clear-eyed guidance and advocacy for property transactions and the disputes that can follow them. | *(keep)* |
| overview\[0\] | Real estate matters carry significant financial stakes and unforgiving deadlines. We help clients navigate transactions and resolve disputes with attention to the detail that protects your investment. | *(keep)* |
| overview\[1\] | From contract review to litigation, we provide practical advice grounded in your goals. | *(keep)* |
| casesHeading | Matters we handle | *(keep)* |
| cases\[0\] | Purchase & sale disputes | *(keep)* |
| cases\[1\] | Landlord–tenant matters | *(keep)* |
| cases\[2\] | Boundary & title issues | *(keep)* |
| cases\[3\] | Contract review | *(keep)* |
| cases\[4\] | Non-disclosure claims | *(keep)* |
| cases\[5\] | Property litigation | *(keep)* |

# **10\. Misc — accessibility labels and technical strings (rarely need editing)**

Screen-reader-only or technical strings, listed for completeness. Edit only if the wording matters to you.

| Location | Current text | New text |
| :---- | :---- | :---- |
| Header.astro — mobile menu button aria-label | Toggle menu | *(keep)* |
| IntakeForm.astro — form aria-label | Free consultation request | *(keep)* |
| TestimonialCarousel.astro — carousel group aria-label | Client reviews | *(keep)* |
| index.astro — practice-deck arrow aria-labels | Previous practice area / Next practice area | *(keep)* |
| index.astro — deck dot aria-label (script-generated) | Practice area {n} | *(keep)* |
| ProcessSection.astro — "More" toggle aria-label (template; follows the process titles automatically) | More about {step title} | *(keep)* |
| index.astro — office manager Placeholder label (goes away when a real portrait is added) | Office manager portrait — replace | *(keep)* |

All SVG illustrations (process cards, services scenes, icons) are decorative and aria-hidden — no text to edit.