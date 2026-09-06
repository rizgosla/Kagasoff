// Render one SVG scene fragment to PNG using the site's exact stroke vocabulary.
// Usage (run from the Kagasoff repo root so `playwright` resolves):
//   node <this file> <fragment.svg-inner.html> <out.png>
// The fragment is the INNER markup of the <svg> (no <svg> wrapper), using the
// classes ln, ln-t, br, br-t, sheet, wash, wash-n, dot — same as services.astro
// (.svc-art) and ProcessSection.astro (.pc-art).
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const [, , fragPath, outPath] = process.argv;
if (!fragPath || !outPath) {
  console.error('usage: node render-scene.mjs <fragment> <out.png>');
  process.exit(1);
}
const frag = readFileSync(fragPath, 'utf8');

const html = `<!doctype html><html><head><style>
  :root{--color-navy:#16243d;--color-paper:#faf8f3;--color-cream:#f3efe6;--color-brass:#9c7a3c;
        --color-brasslight:#c9a253;--color-gold:#e3c993;--svc-sheet:#fffdf9;}
  body{margin:0;background:var(--color-cream);display:flex;align-items:center;justify-content:center;height:100vh;}
  .mat{width:520px;padding:16px;border-radius:12px;background:linear-gradient(180deg,var(--svc-sheet) 0%,var(--color-cream) 100%);
       border:1px solid rgba(156,122,60,.35);}
  svg{display:block;width:100%;height:auto;}
  .ln{fill:none;stroke:var(--color-navy);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}
  .ln-t{fill:none;stroke:var(--color-navy);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;stroke-opacity:.6;}
  .br{fill:none;stroke:var(--color-brass);stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;}
  .br-t{fill:none;stroke:var(--color-brasslight);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;}
  .sheet{fill:var(--svc-sheet);}
  .wash{fill:var(--color-gold);fill-opacity:.22;}
  .wash-n{fill:var(--color-navy);fill-opacity:.07;}
  .dot{fill:var(--color-brass);}
</style></head><body>
<div class="mat"><svg viewBox="48 26 374 248" xmlns="http://www.w3.org/2000/svg">${frag}</svg></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 620, height: 460 }, deviceScaleFactor: 2 });
await page.setContent(html);
await page.locator('.mat').screenshot({ path: resolve(outPath) });
await browser.close();
console.log('wrote', resolve(outPath));
