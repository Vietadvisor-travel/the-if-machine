// Variety guard for The If Machine (owner's rule, 3 Nov 2026): nothing repeats inside an episode, and an episode does not
// lean on what the last ones used. Brand rituals (the lever hook, the machine, the answer ticket, the end frame) may repeat.
//   node tools/variety.mjs stories/<slug>.story            → report; exit 1 on errors
//   node tools/variety.mjs stories/<slug>.story --record   → after delivery: add this episode to history.json
import fs from 'fs'; import path from 'path';
const file = process.argv[2], rec = process.argv.includes('--record'); const txt = fs.readFileSync(file, 'utf8'); const slug = path.basename(file).replace(/\.\w+$/, '');
const HIST = 'history.json'; const hist = fs.existsSync(HIST) ? JSON.parse(fs.readFileSync(HIST, 'utf8')) : { episodes: [] };
const hdr = {}, beats = []; let cur = null;
for (const ln of txt.split('\n')) { const t = ln.trim(); if (!t || t.startsWith('//')) continue;
  if (t.startsWith('#')) { const parts = t.slice(1).trim(); const type = parts.split(/\s+/)[0]; const o = {}; parts.replace(/(\w+)=("([^"]*)"|\S+)/g, (m, k, v, q) => { o[k] = q != null ? q : v; return ''; }); cur = { type, o, lines: [] }; beats.push(cur); continue; }
  if (!cur) { const m = t.match(/^(\w+)\s*:\s*(.*)$/); if (m) hdr[m[1].toLowerCase()] = m[2]; continue; } cur.lines.push(t); }
const BRAND = b => b.o.kind === 'ifm'; const key = b => [b.o.kind || b.type, b.o.act || '', b.o.set || b.o.view || b.o.screen || b.o.planet || ''].join(':'); const actKey = b => (b.o.kind || b.type) + ':' + (b.o.act || '') + (b.o.set ? ':' + b.o.set : '') + (/^ex_/.test(b.o.act || '') ? ':' + (b.o.e || b.o.title || b.o.v || '') : '');   // explainer kit: a different illustration is a different picture
const E = [], Wn = []; const err = m => E.push(m), warn = m => Wn.push(m);
// calm house look (owner, 4 Nov 2026): no glare, no jerky or flickering effects; effects only where the scene needs one
const CALM_TR = ['cut', 'fade', 'match', 'slide', 'ink', 'zoomthru', 'paper', 'iris', 'fold', 'liquid', 'cube', 'drop', 'zoom', 'flip3d'], BADFX = /\bfx\s+(flash|shake|glitch|chroma|speed|zblur|shock|mblur|strobe)\b/;

const calmOff = /^calm\s*:\s*off\b/m.test(txt);
if (!calmOff) { beats.forEach((b, i) => { if (b.o.trans && !CALM_TR.includes(b.o.trans)) err(`beat ${i + 1}: transition "${b.o.trans}" is not in the calm set (${CALM_TR.join(' ')})`); if (BADFX.test(b.o.dir || '')) err(`beat ${i + 1}: jerky/flashing effect in dir= (${(b.o.dir.match(BADFX) || [])[1]}) — removed by the calm look; use a camera move instead`); if (((b.o.then || '').match(/cam=/g) || []).length > 2) err(`beat ${i + 1}: ${(b.o.then.match(/cam=/g) || []).length} camera changes in one beat — at most a wide → close → wide pair (owner: no jerk every second)`); if (/cam=(whip|dutch|snap)/.test(b.o.then || '')) warn(`beat ${i + 1}: cam whip/dutch is jarring — push, pull, truck, crane, float, tilt`); }); }
const words = beats.reduce((s, b) => s + b.lines.join(' ').split(/\s+/).filter(Boolean).length, 0), nLines = beats.reduce((s, b) => s + b.lines.length, 0), mins = words / 2.35 / 60 /* calm pacing: --speed .95 and a breath between lines ≈ 2.35 words a second (re-measure after each render) */ /* ≈ voiced timing + pauses + end frame; lint prints the exact one */, vert = /-v$/.test(slug) /* legacy separate short; since 4 Nov 2026 the main film itself is vertical */;
// length (owner, 4 Nov 2026): ONE vertical film, 6–10 min ≈ 1000–1700 spoken words
if (!vert && (mins < 5.9 || mins > 10.2)) err(`length ≈ ${mins.toFixed(1)} min from ${words} words: the film must be 6–10 min (≈ 850–1400 words at the new pace)`);
if (vert && (mins * 60 < 55 || mins * 60 > 95)) err(`length ≈ ${Math.round(mins * 60)} s: the vertical must be 60–90 s`);
// inside the episode
const body = beats.filter(b => !BRAND(b)); const cnt = {}, cntA = {}, trs = {}; body.forEach(b => { cnt[key(b)] = (cnt[key(b)] || 0) + 1; cntA[actKey(b)] = (cntA[actKey(b)] || 0) + 1; });
beats.forEach((b, i) => { const p = beats[i - 1]; if (!p) return; if (!BRAND(b) && actKey(b) === actKey(p) && b.o.same !== 'ok') err(`beat ${i + 1}: same scene as the beat before (${actKey(b)})`);
  if (b.o.trans && b.o.trans === p.o.trans) err(`beat ${i + 1}: transition "${b.o.trans}" twice in a row`); if (b.o.cam && b.o.cam === p.o.cam) err(`beat ${i + 1}: camera "${b.o.cam}" twice in a row`); if (b.o.trans) trs[b.o.trans] = (trs[b.o.trans] || 0) + 1; });
const maxUse = Math.max(2, Math.ceil(body.length / 10)); for (const [k, n] of Object.entries(cnt)) if (n > maxUse) warn(`"${k}" used ${n}× (max ${maxUse}): give some of those lines their own picture`);
for (const [k, n] of Object.entries(trs)) if (n > Math.max(2, Math.ceil(beats.length / 7))) warn(`transition "${k}" used ${n}×`);
const distinct = Object.keys(cntA).length; if (body.length >= 8 && distinct < Math.ceil(body.length / 3)) err(`only ${distinct} different scenes for ${body.length} beats: build bespoke shots for this episode`);
const bespoke = body.filter(b => !['w', 'ifm', 'nw'].includes(b.o.kind || '') || /^x_/.test(b.o.act || '')).length; if (!vert && body.length >= 12 && bespoke < Math.ceil(body.length * .3)) warn(`${bespoke}/${body.length} beats are bespoke (kind=<episode>): aim for ≥ 30 % (act=x_… in engine/library/bank/<slug>.js) so the episode looks like itself`);
// direction (owner, 3 Nov 2026): most beats carry a second-by-second dir= track; text looks and frame effects vary
const directed = body.filter(b => b.o.dir || b.o.cam).length; if (!vert && body.length >= 10 && directed < Math.ceil(body.length * .6)) warn(`${directed}/${body.length} beats have a dir= track: direct at least 60 % second by second (references/ifm-director.md)`);
const dirVerbs = {}; body.forEach(b => String(b.o.dir || '').split(';').forEach(x => { const m = x.trim().match(/^\S+\s+(text\s+\w+|\w+\s+\w+|\w+)/); if (m) { const k = m[1].replace(/\s+[\d.,@+-]+$/, ''); dirVerbs[k] = (dirVerbs[k] || 0) + 1; } }));
for (const [k, n] of Object.entries(dirVerbs)) if (/^(text|fx|3d)/.test(k) && n > Math.max(3, Math.ceil(body.length / 6))) warn(`"${k}" used ${n}× in dir= tracks: vary the looks`);
// picture before data (owner, 4 Nov 2026): charts, counters and machine screens are seasoning, not the film
const DATA = new Set(['count', 'map', 'servers', 'scale', 'guess', 'machine']); const dataBeats = body.filter(b => DATA.has(b.o.act || '') || b.o.kind === 'ifm').length;
if (body.length >= 6 && dataBeats > Math.ceil(body.length * .15)) warn(`${dataBeats}/${body.length} beats are data or machine scenes (count/map/servers/scale/guess/machine): keep ≤ 15 %, show the consequence with people, places and things instead`);
const counters = body.reduce((n, b) => n + (String(b.o.dir || '').match(/text\s+(counter|count)\b/g) || []).length, 0), mins2 = Math.max(1, mins); if (counters > Math.ceil(mins2)) warn(`${counters} number counters for ${mins2.toFixed(1)} min: at most one per minute; turn the other numbers into pictures (scale, crowds, objects)`);
const lively = body.filter(b => b.o.cam || /^ex_/.test(b.o.act || '') || (b.o.dir && /(zoom|pan|orbit|tilt|flip|card|slow|freeze)/.test(b.o.dir))).length; if (body.length >= 8 && lively < Math.ceil(body.length * .5)) warn(`${lively}/${body.length} beats move the camera with intent (zoom/pan/orbit/3D/slow): aim ≥ 50 %`);
const bankUsed = [...new Set(body.flatMap(b => String(b.o.items || '').split('|').map(x => x.trim().split(/[@\s]/)[0]).filter(Boolean)))];
for (const b of beats) String(b.o.words || '').split('|').forEach(w => { const t = w.replace(/^[!~^]/, '').replace(/@\d+$/, ''); if (t.length > 18) warn(`lettering "${t}" is long (${t.length} chars): ≤ 18 keeps it clear of the edges in 9:16`); });
if (!beats.length || !(beats[0].o.act === 'hook' || beats[0].o.hook || (/^ex_/.test(beats[0].o.act || '') && beats[0].o.title) || /@0\S*\s+text\s/.test(beats[0].o.dir || ''))) warn('the first beat is not a hook: kind=w act=hook scene="…" q="…" (the most striking picture + a headline in the first 3 s)');
// shot grammar (craft §2): sizes, angles and 3D share across all cuts (cam= on the beat and in then=)
{ const cuts = []; body.forEach(b => { const all = [b.o.cam, ...String(b.o.then || '').split('|').map(x => (x.match(/cam=(\S+)/) || [])[1])]; let is3 = b.o.act === 's3'; all.forEach((c, j) => { if (j && !c) return; const m = String(c || '').match(/^(EWS|WS|MCU|MS|ECU|CU)\.?([a-z]*)/); cuts.push({ sz: m ? m[1] : '', an: m ? (m[2] || 'eye') : '', d3: is3 || /act=s3/.test(String(b.o.then || '')) }); }); });
  const g = cuts.filter(c => c.sz); const share = g.length / Math.max(1, cuts.length), d3 = cuts.filter(c => c.d3).length / Math.max(1, cuts.length);
  if (cuts.length > 20 && share < .5) warn(`only ${(share * 100) | 0} % of cuts use the shot grammar cam=<SIZE>.<angle>.<move> (aim ≥ 70 %)`);
  if (cuts.length > 20 && d3 > .6) err(`3D is ${(d3 * 100) | 0} % of cuts — 2D and 3D combined (owner 4 Nov 2026), at most 60 %`);
  if (cuts.length > 20 && d3 < .15) warn(`3D shots ${(d3 * 100) | 0} % of cuts (act=s3; aim 20–50 %)`);
  for (let i = 2; i < g.length; i++) if (g[i].sz === g[i - 1].sz && g[i].sz === g[i - 2].sz) { warn(`shot size ${g[i].sz} three times in a row (cut ${i + 1})`); break; } }
// 3D variety inside the film (owner, 4 Nov 2026: creative and varied, nothing repeated in a video or across episodes)
{ const seen = {}, sets = {}; let n3 = 0; body.forEach((b, bi) => { let cur = { ...b.o }; [b.o.cam, ...String(b.o.then || '').split('|')].forEach((seg, j) => { if (j) { seg.replace(/(\w+)=("([^"]*)"|\S+)/g, (q, k, v, qq) => { cur[k] = qq != null ? qq : v; return ''; }); } if (cur.act !== 's3') return; n3++;
    const k = `${cur.set}:${cur.on || '-'}:${String(cur.cam || '').split('.').slice(0, 2).join('.')}`; sets[cur.set] = (sets[cur.set] || 0) + 1; if (seen[k] != null) warn(`beat ${bi + 1}: 3D shot ${k} repeats beat ${seen[k] + 1} — new subject, size or angle`); else seen[k] = bi; }); });
  Object.entries(sets).forEach(([k, v]) => { if (n3 >= 8 && v / n3 > .35) warn(`3D set "${k}" is ${(v / n3 * 100) | 0} % of the 3D cuts — spread across sets (time of day, seed=, other subjects)`); }); }
// across episodes (last 3)
const prev = hist.episodes.filter(e => e.slug !== slug && e.vert === vert).slice(-3);
if (prev.length) { const mine = new Set(body.map(key)); const last = new Set(prev[prev.length - 1].keys); const shared = [...mine].filter(k => last.has(k)); if (mine.size && shared.length / mine.size > .4) err(`${shared.length}/${mine.size} scene types repeat the last episode (${prev[prev.length - 1].slug}): ${shared.join(', ')}`);
  const open = body[0] ? key(body[0]) : ''; if (prev.some(e => e.open === open)) err(`opening picture "${open}" was used in the last 3 episodes`);
  const inAll = [...mine].filter(k => prev.length >= 2 && prev.slice(-2).every(e => e.keys.includes(k))); if (inAll.length) warn(`used in each of the last 2 episodes too: ${inAll.join(', ')}`);
  const lastBank = prev.slice(-2).flatMap(e => e.bank || []); const reB = bankUsed.filter(x => lastBank.includes(x)); if (reB.length > 2) warn(`bank items reused from the last 2 episodes: ${reB.join(', ')} — draw new ones and add them to the bank`);
  if (hdr.music && prev.some(e => e.music === hdr.music)) warn(`music "${hdr.music}" was used in the last 3 episodes`); if (hdr.people && prev[prev.length - 1].people === hdr.people) warn(`people style "${hdr.people}" same as the last episode`); }
console.log(`variety · ${slug} · ${beats.length} beats · ≈ ${mins.toFixed(1)} min · ${distinct} scene types · ${bespoke} bespoke`); E.forEach(m => console.log('  ERROR ' + m)); Wn.forEach(m => console.log('  WARN  ' + m)); if (!E.length && !Wn.length) console.log('  clean');
if (rec) { hist.episodes = hist.episodes.filter(e => e.slug !== slug); hist.episodes.push({ slug, vert, date: new Date().toISOString().slice(0, 10), keys: [...new Set(body.map(key))], open: body[0] ? key(body[0]) : '', music: hdr.music || '', people: hdr.people || 'facet', trans: Object.keys(trs), bank: bankUsed }); fs.writeFileSync(HIST, JSON.stringify(hist, null, 1)); console.log('recorded in ' + HIST); }
process.exit(E.length ? 1 : 0);
