/**
 * Responsive audit: loads each built page at several viewport widths and
 * reports horizontal overflow, container gutters, and content width usage.
 * Run against `npm run preview` (default http://localhost:4321).
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE || 'http://localhost:4321';
const PAGES = ['/', '/about', '/contact', '/practice/personal-injury'];
const VIEWPORTS = [
  { name: 'mobile-360', width: 360, height: 780 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'ultrawide-2560', width: 2560, height: 1440 },
];

const shot = process.argv.includes('--shots');
const browser = await chromium.launch();
let problems = 0;

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });

    const report = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;

      // Any element sticking out past the right edge.
      // An element clipped by an ancestor (marquee ticker, card deck) is not a
      // real overflow bug, so walk up and ignore those.
      const clipped = (el) => {
        for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
          const cs = getComputedStyle(n);
          const o = cs.overflowX;
          if (o === 'hidden' || o === 'clip' || o === 'auto' || o === 'scroll') return true;
        }
        return false;
      };

      const offenders = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > doc.clientWidth + 1 || r.left < -1) {
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed') continue;
          if (clipped(el)) continue;
          offenders.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.getAttribute('class') || '').slice(0, 70),
            left: Math.round(r.left),
            right: Math.round(r.right),
          });
        }
      }

      // Gutter measurement from the first .shell container.
      const shell = document.querySelector('.shell');
      let gutter = null;
      let shellWidth = null;
      if (shell) {
        const r = shell.getBoundingClientRect();
        const cs = getComputedStyle(shell);
        shellWidth = Math.round(r.width);
        gutter = Math.round(r.left + parseFloat(cs.paddingLeft));
      }

      // Smallest rendered font size on visible text.
      let minFont = 99;
      for (const el of document.querySelectorAll('p, span, div, a, li')) {
        if (!el.textContent?.trim()) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs > 0) minFont = Math.min(minFont, fs);
      }

      return {
        overflow,
        offenders: offenders.slice(0, 5),
        offenderCount: offenders.length,
        gutter,
        shellWidth,
        minFont: Math.round(minFont * 10) / 10,
      };
    });

    const bad = report.overflow > 1 || report.offenderCount > 0;
    if (bad) problems++;
    const flag = bad ? 'FAIL' : ' ok ';
    console.log(
      `[${flag}] ${vp.name.padEnd(14)} ${path.padEnd(28)} ` +
        `overflow=${report.overflow} gutter=${report.gutter} ` +
        `shell=${report.shellWidth} minFont=${report.minFont}`,
    );
    if (bad) {
      for (const o of report.offenders) {
        console.log(`         ↳ <${o.tag} class="${o.cls}"> left=${o.left} right=${o.right}`);
      }
    }

    if (shot && path === '/') {
      await page.screenshot({
        path: `audit-shots/home-${vp.name}.png`,
        fullPage: false,
      });
    }
  }

  await ctx.close();
}

await browser.close();
console.log(problems ? `\n${problems} viewport/page combos have issues.` : '\nAll clean.');
process.exit(problems ? 1 : 0);
