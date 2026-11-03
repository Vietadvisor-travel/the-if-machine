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
const BRAND = b => b.o.kind === 'ifm'; const key = b => [b.o.kind || b.type, b.o.act || '', b.o.view || b.o.screen || b.o.planet || ''].join(':'); const actKey = b => (b.o.kind || b.type) + ':' + (b.o.act || '');
const E = [], Wn = []; const err = m => E.push(m), warn = m => Wn.push(m);
const words = beats.reduce((s, b) => s + b.lines.join(' ').split(/\s+/).filter(Boolean).length, 0), mins = words / 150, vert = /vertical|9x16|-v$/.test(slug) || hdr.format === 'vertical';
// length: long 3–6 min (owner, 3 Nov 2026), vertical 60–90 s
if (!vert && (mins < 2.9 || mins > 6.2)) err(`length ≈ ${mins.toFixed(1)} min from ${words} words: the long video must be 3–6 min`);
if (vert && (mins * 60 < 55 || mins * 60 > 95)) err(`length ≈ ${Math.round(mins * 60)} s: the vertical must be 60–90 s`);
// inside the episode
const body = beats.filter(b => !BRAND(b)); const cnt = {}, cntA = {}, trs = {}; body.forEach(b => { cnt[key(b)] = (cnt[key(b)] || 0) + 1; cntA[actKey(b)] = (cntA[actKey(b)] || 0) + 1; });
beats.forEach((b, i) => { const p = beats[i - 1]; if (!p) return; if (!BRAND(b) && actKey(b) === actKey(p) && b.o.same !== 'ok') err(`beat ${i + 1}: same scene as the beat before (${actKey(b)})`);
  if (b.o.trans && b.o.trans === p.o.trans) err(`beat ${i + 1}: transition "${b.o.trans}" twice in a row`); if (b.o.cam && b.o.cam === p.o.cam) err(`beat ${i + 1}: camera "${b.o.cam}" twice in a row`); if (b.o.trans) trs[b.o.trans] = (trs[b.o.trans] || 0) + 1; });
const maxUse = Math.max(2, Math.ceil(body.length / 10)); for (const [k, n] of Object.entries(cnt)) if (n > maxUse) warn(`"${k}" used ${n}× (max ${maxUse}): give some of those lines their own picture`);
for (const [k, n] of Object.entries(trs)) if (n > Math.max(2, Math.ceil(beats.length / 7))) warn(`transition "${k}" used ${n}×`);
const distinct = Object.keys(cntA).length; if (body.length >= 8 && distinct < Math.ceil(body.length / 3)) err(`only ${distinct} different scenes for ${body.length} beats: build bespoke shots for this episode`);
const bespoke = body.filter(b => !['w', 'ifm', 'nw'].includes(b.o.kind || '')).length; if (!vert && body.length >= 12 && bespoke < Math.ceil(body.length * .3)) warn(`${bespoke}/${body.length} beats are bespoke (kind=<episode>): aim for ≥ 30 % so the episode looks like itself`);
for (const b of beats) String(b.o.words || '').split('|').forEach(w => { const t = w.replace(/^[!~^]/, '').replace(/@\d+$/, ''); if (t.length > 18) warn(`lettering "${t}" is long (${t.length} chars): ≤ 18 keeps it clear of the edges in 9:16`); });
if (!beats.length || !(beats[0].o.kind === 'ifm' && beats[0].o.act === 'lever') && !beats[0].o.hook) warn('the first beat is not the lever hook (kind=ifm act=lever) or a beat marked hook=1');
// across episodes (last 3)
const prev = hist.episodes.filter(e => e.slug !== slug && e.vert === vert).slice(-3);
if (prev.length) { const mine = new Set(body.map(key)); const last = new Set(prev[prev.length - 1].keys); const shared = [...mine].filter(k => last.has(k)); if (mine.size && shared.length / mine.size > .4) err(`${shared.length}/${mine.size} scene types repeat the last episode (${prev[prev.length - 1].slug}): ${shared.join(', ')}`);
  const open = body[0] ? key(body[0]) : ''; if (prev.some(e => e.open === open)) err(`opening picture "${open}" was used in the last 3 episodes`);
  const inAll = [...mine].filter(k => prev.length >= 2 && prev.slice(-2).every(e => e.keys.includes(k))); if (inAll.length) warn(`used in each of the last 2 episodes too: ${inAll.join(', ')}`);
  if (hdr.music && prev.some(e => e.music === hdr.music)) warn(`music "${hdr.music}" was used in the last 3 episodes`); if (hdr.people && prev[prev.length - 1].people === hdr.people) warn(`people style "${hdr.people}" same as the last episode`); }
console.log(`variety · ${slug} · ${beats.length} beats · ≈ ${mins.toFixed(1)} min · ${distinct} scene types · ${bespoke} bespoke`); E.forEach(m => console.log('  ERROR ' + m)); Wn.forEach(m => console.log('  WARN  ' + m)); if (!E.length && !Wn.length) console.log('  clean');
if (rec) { hist.episodes = hist.episodes.filter(e => e.slug !== slug); hist.episodes.push({ slug, vert, date: new Date().toISOString().slice(0, 10), keys: [...new Set(body.map(key))], open: body[0] ? key(body[0]) : '', music: hdr.music || '', people: hdr.people || 'flat', trans: Object.keys(trs) }); fs.writeFileSync(HIST, JSON.stringify(hist, null, 1)); console.log('recorded in ' + HIST); }
process.exit(E.length ? 1 : 0);
