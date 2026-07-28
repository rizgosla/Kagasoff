import type { APIRoute } from 'astro';
import { practiceAreas } from '../data/practiceAreas';

/* Generated rather than hand-maintained: adding an entry to practiceAreas.ts
   must be enough to produce the page AND list it here. No new dependency. */
const staticPaths = ['/', '/about/', '/contact/'];

export const GET: APIRoute = ({ site }) => {
  const paths = [
    ...staticPaths,
    ...practiceAreas.map((a) => `/practice/${a.slug}/`),
  ];

  const urls = paths
    .map((p) => `  <url><loc>${new URL(p, site).href}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
