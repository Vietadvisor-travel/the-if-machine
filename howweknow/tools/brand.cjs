// Render the FATHOM brand files: node tools/brand.cjs → out/brand/*.png (+ .svg sources)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = 'out/brand'; fs.mkdirSync(OUT, { recursive: true });
const ITEMS = [['mark', 1200, 1200, true], ['logo', 2400, 900, true], ['logo-dark', 2400, 900, false], ['avatar', 2048, 2048, false], ['yt', 2560, 1440, false], ['fb', 1640, 624, false], ['guide', 1920, 1080, false]];
(async () => { const b = await chromium.launch(); const p = await b.newPage();
p.on('pageerror', e => console.log('ERR', e.message));
for (const [id, w, h, transparent] of ITEMS) {
  await p.setViewportSize({ width: w, height: h });
  await p.goto('file://' + path.resolve('brand/brand.html') + '#' + id); await p.reload(); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: `${OUT}/fathom_${id}.png`, omitBackground: transparent });
  fs.writeFileSync(`${OUT}/fathom_${id}.svg`, await p.evaluate(() => window.BRAND_SVG()));
  console.log(id, w + 'x' + h);
}
await b.close(); })();
