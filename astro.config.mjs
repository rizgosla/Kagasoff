// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kagasofflaw.com',
  // Keep in sync with the slugs in src/data/practiceAreas.ts
  redirects: {
    '/about': '/#about',
    '/contact': '/#contact',
    '/practice/personal-injury': '/services#personal-injury',
    '/practice/criminal-defense': '/services#criminal-defense',
    '/practice/professional-license-defense': '/services#professional-license-defense',
    '/practice/family-law': '/services#family-law',
    '/practice/restraining-orders': '/services#restraining-orders',
    '/practice/employment': '/services#employment',
    '/practice/real-estate': '/services#real-estate',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
