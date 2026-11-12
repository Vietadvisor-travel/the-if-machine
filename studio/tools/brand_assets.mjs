// Brand images for Oddly True (owner, 12 Nov 2026): avatar, Facebook cover, YouTube banner, TikTok/IG avatar.  node tools/brand_assets.mjs
import { launch } from './browser.mjs'; import fs from 'fs'; import path from 'path';
const root = process.cwd(), out = 'out/brand'; fs.mkdirSync(out, { recursive: true });
const font = (fam, f) => `@font-face{font-family:'${fam}';src:url('file://${root}/node_modules/@fontsource/${f}')}`;
const css = font('Unb', 'unbounded/files/unbounded-latin-900-normal.woff2') + font('Mono', 'space-mono/files/space-mono-latin-700-normal.woff2') + `*{margin:0;box-sizing:border-box}body{background:#05070F}`;
const NAVY = 'radial-gradient(circle at 50% 38%, #1F2A5C 0%, #101633 45%, #05070F 100%)';
const stack = px => `<div style="font-family:Unb;font-size:${px}px;line-height:1.02;text-align:center;letter-spacing:.02em"><div style="color:#fff">ODDLY</div><div style="color:#FFC93C">TRUE</div></div>`;
const mono = s => `<div style="width:${s}px;height:${s}px;border-radius:50%;background:#FFC93C;display:flex;align-items:center;justify-content:center;font-family:Unb;font-size:${s * .42}px;color:#101633;letter-spacing:-.04em">OT</div>`;
const word = (px, gap = .08) => `<div style="font-family:Unb;font-size:${px}px;line-height:1;letter-spacing:${gap}em;color:#fff;white-space:nowrap">ODDLY <span style="color:#FFC93C">TRUE</span></div>`;
const pages = {
  avatar: [1080, 1080, `<div style="width:1080px;height:1080px;background:${NAVY};display:flex;align-items:center;justify-content:center">${stack(165)}</div>`],
  avatar_mono: [1080, 1080, `<div style="width:1080px;height:1080px;background:${NAVY};display:flex;align-items:center;justify-content:center">${mono(760)}</div>`],
  fb_cover: [1640, 624, `<div style="width:1640px;height:624px;background:url('file://${root}/${out}/cover_bg.jpg') center/cover;position:relative"><div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(5,7,15,.88) 0%,rgba(5,7,15,.55) 45%,rgba(5,7,15,0) 75%)"></div>
    <div style="position:absolute;left:330px;top:190px">${word(96, .03)}<div style="font-family:Mono;font-size:30px;color:#E8E4D8;margin-top:26px;letter-spacing:.06em">STRANGE THINGS THAT REALLY HAPPENED</div><div style="font-family:Mono;font-size:22px;color:#FFC93C;margin-top:14px;letter-spacing:.1em">A NEW TRUE STORY EVERY DAY</div></div></div>`],
  yt_banner: [2560, 1440, `<div style="width:2560px;height:1440px;background:url('file://${root}/${out}/cover_bg.jpg') center/cover;position:relative"><div style="position:absolute;inset:0;background:rgba(5,7,15,.45)"></div>
    <div style="position:absolute;left:0;right:0;top:560px;display:flex;flex-direction:column;align-items:center">${word(130, .03)}<div style="font-family:Mono;font-size:40px;color:#E8E4D8;margin-top:30px;letter-spacing:.06em">STRANGE THINGS THAT REALLY HAPPENED</div></div></div>`] };
const b = await launch(); const p = await b.newPage();
for (const [n, [w, h, body]] of Object.entries(pages)) { await p.setViewportSize({ width: w, height: h }); const f = path.join(root, out, '_page.html'); fs.writeFileSync(f, `<html><head><meta charset="utf-8"><style>${css}</style></head><body>${body}</body></html>`); await p.goto('file://' + f, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300); await p.screenshot({ path: `${out}/oddlytrue_${n}.png` }); console.log('wrote', `${out}/oddlytrue_${n}.png`); }
await b.close();
