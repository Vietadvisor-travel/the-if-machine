// Scaffold an episode so nothing is written twice (token-lean): node tools/new_episode.mjs <slug> "<Vietnamese name>"
//   → stories/<slug>.story (ONE vertical 9:16 film, 6–10 min — owner 4 Nov 2026: no 16:9, no separate short), engine/library/bank/<slug>.js, registered in index.js
import fs from 'fs';
const [slug, vi = ''] = process.argv.slice(2); if (!/^[a-z0-9-]+$/.test(slug || '')) { console.log('usage: node tools/new_episode.mjs <slug> "<tên tiếng Việt>"'); process.exit(1); }
const id = slug.replace(/-/g, '_'), run = (JSON.parse(fs.existsSync('history.json') ? fs.readFileSync('history.json', 'utf8') : '{"episodes":[]}').episodes.filter(e => !e.vert).length + 1);
const head = (fmt) => `title: <What if …?>   (${vi})
channel: ifm
format: ${fmt}
run: ${run}
next: <the next question>
voice: am_puck
people: facet
sources: <from jobs/research/${slug}.md, one per claim>
`;
const beat = (t, what, line) => `// ${t} SUBJECT: ${what}\n//   0.0 CAMERA … · TEXT … · FX on the punch word … · BRIDGE … · SOUND …\n${line}\n`;
const long = head('vertical') + `
// ONE VERTICAL FILM 9:16, 6–10 min (≈ 1000–1700 spoken words, 70–120 beats). Objective documentary voice: no host, no machine,
// no lever, no ticket, no SIM clock. Every frame FULL: subject big (40–70 % of the picture), real background, foreground, life.
// Captions own 74.5–79 %; the bottom 20 % and the right edge stay free of key content (Shorts/Reels/TikTok UI).
` + beat('0:00 [3 s] HOOK', '<the most striking picture of the whole episode>', '# vis kind=w act=hook scene="x_<your best shot>" q="WHAT IF <…>|<…>?"\n<one line that opens a loop: a consequence the viewer must stay to understand>') + `
` + beat('0:04 [6 s]', '<the promise: what you will know by the end>', '# vis kind=w act=x_<shot> then="cam=push@1" trans=<meaning> dir="0-2 zoom 1.2 .5,.45"\n<line>\n<line>') + `
// CHAPTER 1 … 4–6 chapters. Each: a surprising picture, a sourced fact shown by its consequence, ordinary life changing,
// an open loop into the next chapter ("But that was the easy part."). A new angle every 4–7 s, a smooth camera move per shot, calm transitions.

` + beat('~50 %', '<the midpoint reveal>', '# vis kind=w act=x_<shot> trans=<meaning> dir="…"\n<line>') + `
` + beat('~70 %', '<the strongest REAL case, with its source>', '# vis kind=w act=x_<shot> trans=<meaning> dir="…"\n<line>') + `
` + beat('payoff [8 s]', '<the answer in one sentence; callback to the hook picture>', '# vis kind=w act=x_<shot> trans=<meaning> dir="…"\n<line>\n<line>');
const bank = `/* ${vi} — bank items and bespoke acts for episode ${slug} (≥ 5 new items; see API.md). Prefix acts with x_. */
'use strict';
(function () {
  if (!window.IFM || !IFM.bank) return; const P = IFM.P, EP = '${slug}', T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d;
  // ---- new bank items (people / creatures / objects / places this episode needs; reusable later)
  IFM.bank.add({ id: '${id}_item1', kind: 'object', tags: [], ep: EP, desc: '<what it is>', asp: 1, draw: (x, y, h, lt, o) => { const u = h / 100; rr(x - 30 * u, y - 100 * u, 60 * u, 100 * u, 8 * u, P.teal, 0); } });
  // ---- bespoke acts: kind=w act=x_<name>  (get then= dir= fx= look= words= cam= for free)
  IFM.ACT.x_${id}_shot1 = (o, c, dur) => ({ sfx: [[T0(c, 1, 1.5), 'ifm_motion_impact_soft']], draw: lt => { IFM.nightBg(lt); IFM.bank.get('${id}_item1').draw(W / 2, H * .75, H * .4, lt, {}); } });
})();
`;
const w = (p, s) => { if (fs.existsSync(p)) { console.log('exists, kept: ' + p); return; } fs.writeFileSync(p, s); console.log('wrote ' + p); };
w(`stories/${slug}.story`, long); fs.mkdirSync('engine/library/bank', { recursive: true }); w(`engine/library/bank/${slug}.js`, bank);
const ix = 'engine/library/index.js', s = fs.readFileSync(ix, 'utf8'); if (!s.includes(`'bank/${slug}'`)) { fs.writeFileSync(ix, s.replace(/\];\s*$/, `,'bank/${slug}'];\n`)); console.log('registered bank/' + slug); }
