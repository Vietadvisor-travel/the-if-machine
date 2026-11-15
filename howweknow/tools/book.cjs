// FATHOM brand book → out/brand/Fathom_BrandBook.pdf (+ page PNG previews): node tools/book.cjs   (run tools/brand.cjs first)
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  fs.mkdirSync('brand/samples', { recursive: true }); for (const f of fs.readdirSync('out/brand/samples')) fs.copyFileSync('out/brand/samples/' + f, 'brand/samples/' + f);
  await p.goto('file://' + path.resolve('brand/book.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(800);
  await p.pdf({ path: 'out/brand/Fathom_BrandBook.pdf', width: '1920px', height: '1080px', printBackground: true });
  const n = await p.evaluate(() => document.querySelectorAll('.pg').length);
  for (let i = 0; i < n; i++) { await p.evaluate(i => document.querySelectorAll('.pg')[i].scrollIntoView(), i); await p.screenshot({ path: `out/brand/book_p${String(i + 1).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 85 }); }
  console.log('pages', n); await b.close(); })();
