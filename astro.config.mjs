// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kagasofflaw.com',
  // Output stays static: every page here is prerendered exactly as before. The
  // adapter exists for the one on-demand route, /api/intake, which opts out of
  // prerendering itself. platformProxy gives `astro dev` the same
  // locals.runtime.env that the deployed Worker has, read from .dev.vars.
  adapter: cloudflare({ platformProxy: { enabled: true } }),
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
