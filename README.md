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

## Launch checklist

Work through this in order before the site goes live. The order matters: each
service is connected to the GitHub repo, so the repo has to be in its final home
before anything is hooked up to it, or it all has to be reconnected later.

**Ownership rule:** every account below belongs to the firm, not to the developer.
Sign up for each one with a firm email address (e.g. `admin@kagasofflaw.com`), turn
on two-factor sign-in wherever it is offered, and keep the logins in the firm's
password manager. The developer gets added as a collaborator where needed.

### 1. Firm accounts

- [ ] **Firm admin email.** One shared mailbox the firm controls
      (e.g. `admin@kagasofflaw.com`). Every account below is registered to it.
- [ ] **Domain.** `kagasofflaw.com` is registered in the firm's name, under an
      account the firm can sign in to.
- [ ] **GitHub.** Create a GitHub account for the firm. Transfer this repo to it
      (repo **Settings → General → Danger Zone → Transfer ownership**), then add
      the developer back as a collaborator. GitHub redirects the old URL, but
      update any local clone with `git remote set-url origin <new-url>`.
- [ ] **Cloudflare.** A Cloudflare account owned by the firm, with the
      `kagasofflaw.com` domain added to it (Cloudflare then manages its DNS).
- [ ] **Resend.** A Resend account owned by the firm, for the contact form.
- [ ] **Keystatic Cloud.** Sign in at <https://keystatic.cloud> **with the firm's
      GitHub account** so the firm owns the Keystatic team (step 4).

### 2. Hosting (Cloudflare)

- [ ] **Connect the repo for automatic deploys:** **Workers & Pages →
      kagasoff-law → Settings → Builds → Connect**, pick the firm's repo and the
      `main` branch, build command `npm run build`, deploy command
      `npx wrangler deploy`. Every push to `main`, including every post saved in
      the blog editor, now rebuilds and redeploys the site.
- [ ] **Custom domain:** **Settings → Domains & Routes → Add → Custom domain**,
      add `www.kagasofflaw.com`, and redirect the bare `kagasofflaw.com` to it
      (the site's canonical URL is `https://www.kagasofflaw.com`, set in
      `astro.config.mjs`).

### 3. Contact form email (Resend)

- [ ] In Resend, **add and verify the `kagasofflaw.com` domain**. Resend lists
      the DNS records to add; with the domain on Cloudflare this takes a few
      minutes.
- [ ] Create an API key, then set the three secrets on the Worker (see
      **Contact form → Required secrets**): `RESEND_API_KEY`, `INTAKE_TO` (the
      inbox that should receive consultation requests) and `INTAKE_FROM` (an
      address on the verified domain).
- [ ] **Test it on the live site:** send a request through the form and confirm
      it arrives in the `INTAKE_TO` inbox.

### 4. Blog editor (Keystatic Cloud)

- [ ] Signed in with the firm's GitHub account, create a team and project at
      <https://keystatic.cloud> and connect it to the firm's repo.
- [ ] Copy the project id (`team/project`) into `keystatic.config.ts`,
      replacing the placeholder `cloud: { project: 'kagasoff/kagasoff-law' }`.
      Commit and push; Cloudflare deploys it.
- [ ] Invite each editor (the attorney, staff, anyone posting on her behalf) by
      email from the project's team settings. Editors do **not** need GitHub
      accounts.
- [ ] **Test it end to end:** sign in at `https://www.kagasofflaw.com/keystatic`,
      create a post, save it, wait for the Cloudflare build to finish (about a
      minute or two), and confirm it appears at `/blog`. Then delete the test post.
- [ ] Replace or delete the sample post ("Welcome to Our Blog") before launch,
      or keep it if the firm is happy with the wording.

### 5. Content

- [ ] **Team photo:** replace `public/team.jpg` (home page hero) with the
      updated photo.
- [ ] **Office manager:** Melo's card was removed from the Team section on the
      home page until her real photo and bio are ready. To bring it back,
      restore it from git history (search the log for "Melo") with the real
      portrait and bio.
- [ ] **Attorney review.** The attorney reads every page and the sample blog
      post and signs off on the copy, including the attorney-advertising and
      "not legal advice" disclaimers, before launch.

### 6. Final checks

- [ ] `npm run build` passes with no errors.
- [ ] `npm run audit:responsive` looks right at phone, tablet and desktop widths.
- [ ] On the live domain: every nav link, the Services dropdown, the phone links
      (`tel:` opens the dialer on a phone), the contact form, `/blog`, a blog
      post and `/keystatic` all work.
- [ ] Old URLs (`/about`, `/contact`, `/practice/...`) redirect correctly. The
      list is in `astro.config.mjs`.
- [ ] Update the website link on the firm's Google Business Profile and anywhere
      else the old site is linked, if the URL changed.

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
    blog/                 # blog list + post pages (content from Keystatic)
  content/
    posts/                # blog posts (.mdoc), written at /keystatic
  content.config.ts       # blog posts collection schema (matches keystatic.config.ts)
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

## Blog / CMS

The blog is written in [Keystatic](https://keystatic.com), a small editor built
into the site at **`/keystatic`**. Staff write in a normal page-style editor, with
no code and no Git. Each post is a Markdoc file at `src/content/posts/<slug>.mdoc`,
and the public pages are `/blog` and `/blog/<slug>`. The editor setup is in
`keystatic.config.ts`; the matching content schema is in `src/content.config.ts`
(change both together if you add a field).

**For editors:** go to `https://www.kagasofflaw.com/keystatic`, sign in with your
email, choose **Blog posts → Create**, fill in the title, summary, date and body,
and save. Tick **Draft** to keep a post off the website. Cover images and photos
dropped into the body are stored in `public/images/blog/`.

### Local vs. cloud mode

| | Where | Sign-in | Where edits go |
| --- | --- | --- | --- |
| Local | `npm run dev` → <http://localhost:4321/keystatic> | none | files in this repo (review and commit them yourself) |
| Cloud | the live site's `/keystatic` | email, via Keystatic Cloud | a commit to the GitHub repo, made for you on every save |

The mode is chosen automatically in `keystatic.config.ts` (`import.meta.env.PROD`).
`/keystatic` and `/api/keystatic` run on demand on the Worker; every other page,
including the blog, is still prerendered at build time.

### One-time owner setup

Until this is done the live `/keystatic` cannot log anyone in. It is also part
of the **Launch checklist** above. Do the account setup there first, so the repo
is already in the firm's GitHub account before Keystatic is connected to it.

1. Signed in with the firm's GitHub account, create a free team and project at
   <https://keystatic.cloud>.
2. Connect the project to the firm's GitHub repo (production branch `main`).
3. Copy the project id (`team/project`) and replace the placeholder in
   `keystatic.config.ts`: `cloud: { project: 'kagasoff/kagasoff-law' }`. Commit
   and deploy.
4. Invite each editor by email in the Keystatic Cloud project's team settings.
5. So a saved post goes live by itself, connect the repo to Cloudflare:
   **Workers & Pages → kagasoff-law → Settings → Builds → Connect**, then set the
   build command to `npm run build` and the deploy command to
   `npx wrangler deploy`. Each save in the editor then commits to GitHub, which
   triggers a build and deploy; the post appears on the site once that finishes.

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
