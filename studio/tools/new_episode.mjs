// Scaffold an episode so nothing is written twice (token-lean): node tools/new_episode.mjs <slug> "<Vietnamese name>"
//   → stories/<slug>.story (ONE vertical 9:16 film, 5–6 min — owner 4 Nov 2026: no 16:9, no separate short), engine/library/bank/<slug>.js, registered in index.js
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
// ONE VERTICAL FILM 9:16, 5–6 min (≈ 750–950 spoken words, 45–70 beats). Subject 15–70 % of the height; captions own 74.5–79 %;
// keep the bottom 20 % and the right edge clear (Shorts/Reels/TikTok UI).
// 0:00 [3 s] HOOK — the lever, the question types, dive through the screen
# vis kind=ifm act=lever q="WHAT IF|<SUBJECT>|<TWIST WORD>?" clock=off
<hook line: consequence + household comparison + time limit, in 2 short sentences>

` + beat('0:04 [8 s]', '<the world before: the most surprising picture of it>', '# vis kind=w act=x_<shot> then="<cut>@1" trans=scan clock="<UNIT 0>" dir="0-2 zoom 1.4 .5,.45; @1 text counter \'<NUMBER|label>\' .5,.2 yellow"\n<line>\n<line>') + `
` + beat('0:30 [6 s]', '<the rule of the game, the promise>', '# vis kind=w act=<kit or x_shot> trans=<meaning> clock="<UNIT n>" dir="…"\n<line>') + `
// … the simulation runs: 45–70 beats, clock on every beat, stakes rise, a then= cut every 2–3 s, dir= on every beat …

` + beat('~70 % [6 s]', 'the viewer commits', '# vis kind=w act=guess a="<A>" b="<B>" answer=<a|b> trans=ticket clock="<UNIT>"\n<line>\nPick one before the machine prints.') + `
// [silence 0.6 s: music drops]
# vis kind=ifm act=answer text="<the twist in 6–9 words>" stamp="<2–3 WORDS>" trans=ticket clock="<UNIT end>"
Here's what the machine printed.
<the twist line>

` + beat('payoff [8 s]', '<what it means for you, one last image>', '# vis kind=w act=<x_shot> trans=<meaning> clock=off dir="…"\n<line>\nThat\'s the run. What should the machine try next?');
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
