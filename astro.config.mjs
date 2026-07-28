// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kagasofflaw.com',
  // Canonical tags and sitemap.xml emit the trailing-slash form, so internal
  // <a href> must match it. Without one agreed form, the eventual static host's
  // URL normalization decides, and every internal click costs a 301 hop.
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
