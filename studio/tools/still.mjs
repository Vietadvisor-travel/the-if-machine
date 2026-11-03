// node tools/still.mjs stories/x.story h|v "0.5,1.5,3" [width] → out/still/<slug>_<fmt>_<t>.jpg, one full frame per time (for close checks)
import { launch } from './browser.mjs'; import fs from 'fs'; import path from 'path';
const [ep, fmt = 'h', times = '1', wArg] = process.argv.slice(2); const slug = path.basename(ep).replace(/\.\w+$/, ''); const big = +(wArg || 1280), [w, h] = fmt === 'v' ? [Math.round(big * 9 / 16), big] : [big, Math.round(big * 9 / 16)];
fs.mkdirSync('out/still', { recursive: true }); const browser = await launch(); const page = await browser.newPage(); page.on('pageerror', e => console.log('ERR:', e.message)); page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('console:', m.text()); });
await page.goto('file://' + process.cwd() + '/studio.html' + (process.env.EXTRA ? '?ep=' + encodeURIComponent(process.env.EXTRA) : '')); await page.evaluate(() => window.READY);
const urls = await page.evaluate(async ([txt, w, h, ts]) => { const ep = SB.compile(txt); const c = document.getElementById('c'); c.width = w; c.height = h; W = w; H = h; ctx = c.getContext('2d'); loadEpisode(ep);
  return ts.split(',').map(Number).map(t => { renderEpisode(t); return [t, c.toDataURL('image/jpeg', .88)]; }); }, [fs.readFileSync(ep, 'utf8'), w, h, times]);
for (const [t, u] of urls) { const f = `out/still/${slug}_${fmt}_${String(t).replace('.', '_')}.jpg`; fs.writeFileSync(f, Buffer.from(u.split(',')[1], 'base64')); console.log(f); }
await browser.close();
