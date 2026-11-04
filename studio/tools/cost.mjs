// Render-cost gate: times real full-size frames across the whole story in both formats, so a shot that is pretty but
// far too heavy to render (one blur over a busy layer cost 12 s a frame and stalled a render for hours) is caught BEFORE make.
//   node tools/cost.mjs stories/<slug>.story [--every 1.5]
//   budget per frame: ERROR > 800 ms (fix the shot: cache static layers with mkCanvas/withCtx, no live ctx.filter over many paths)
//                     WARN  > 400 ms     normal is ~100–250 ms
import { launch } from './browser.mjs'; import fs from 'fs';
const ep = process.argv[2], ai = process.argv.indexOf('--every'), every = ai > 0 ? +process.argv[ai + 1] : 1.5, ERR = 800, WARN = 400;
const browser = await launch(); const page = await browser.newPage(); page.on('pageerror', e => console.log('ERR:', e.message));
await page.goto('file://' + process.cwd() + '/studio.html'); await page.evaluate(() => window.READY);
let bad = false;
for (const [fmt, w, h] of [['16x9', 1920, 1080], ['9x16', 1080, 1920]]) {
  const r = await page.evaluate(([txt, w, h, every]) => { const ep = SB.compile(txt); const c = document.getElementById('c'); c.width = w; c.height = h; W = w; H = h; ctx = c.getContext('2d'); loadEpisode(ep);
    const sc = []; let t = 0; for (const s of ep.scenes) { sc.push([t, s.id]); t += s.dur || 0; } const idAt = x => { let id = sc[0][1]; for (const [t0, i] of sc) if (x >= t0) id = i; return id; };
    const out = [], start = performance.now(); for (let x = .5; x < t; x += every) { renderEpisode(x); const t0 = performance.now(); renderEpisode(x + 1 / 30); out.push([+x.toFixed(1), Math.round(performance.now() - t0), idAt(x)]); if (performance.now() - start > 600000) { out.push([x, -1, 'timeout']); break; } }
    return out; }, [fs.readFileSync(ep, 'utf8'), w, h, every]);
  const ms = r.filter(x => x[1] >= 0).map(x => x[1]).sort((a, b) => a - b), med = ms[Math.floor(ms.length / 2)] || 0, worst = r.reduce((a, b) => b[1] > a[1] ? b : a, [0, 0, '']);
  console.log(`cost [${fmt}] median ${med} ms · max ${worst[1]} ms @ ${worst[0]}s ${worst[2]} · ${r.length} frames`);
  const per = new Map(); r.forEach(([x, m, id]) => { if (m > (per.get(id)?.[1] ?? -1)) per.set(id, [x, m]); });
  for (const [id, [x, m]] of per) { if (m > ERR || m < 0) { bad = true; console.log(`  ERROR render cost ${m < 0 ? 'timeout' : m + ' ms/frame'} @ ${x}s ${id} (budget ${ERR} ms)`); } else if (m > WARN) console.log(`  WARN render cost ${m} ms/frame @ ${x}s ${id} (aim < ${WARN} ms)`); }
}
await browser.close(); process.exit(bad ? 1 : 0);
