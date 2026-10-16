// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kagasofflaw.com',
  // Output stays static: every page here is prerendered exactly as before. The
  // adapter exists for the one on-demand route, /api/intake, which opts out of
  // prerendering itself. platformProxy gives `astro dev` the same
  // locals.runtime.env that the deployed Worker has, read from .dev.vars.
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  // Blog CMS. Keystatic's editor (/keystatic) is a React app, so it needs the
  // react integration; posts are Markdoc files, hence markdoc(). Keystatic adds
  // its own routes, /keystatic and /api/keystatic, as on-demand pages -- the
  // rest of the site stays prerendered. See keystatic.config.ts.
  integrations: [react(), markdoc(), keystatic()],
  // Keep in sync with the slugs in src/data/practiceAreas.ts
  redirects: {
    '/about': '/#about',
    '/contact': '/#contact',
    '/practice/personal-injury': '/services#personal-injury',
    '/practice/criminal-defense': '/services#criminal-defense',
    '/practice/professional-license-defense': '/services#professional-license-defense',
    '/practice/family-law': '/services',
    '/practice/restraining-orders': '/services#restraining-orders',
    '/practice/employment': '/services#employment',
    '/practice/real-estate': '/services#real-estate',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
