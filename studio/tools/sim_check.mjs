// Simulation realism gate for 3D sets (owner, 4 Nov 2026: real scale; nobody floats, no car through a car, no person through a
// person, a fountain or a car). Builds every `act=s3` set the story uses (with its keys) and steps its clock for 120 s.
//   node tools/sim_check.mjs stories/<slug>.story
import { launch } from './browser.mjs'; import fs from 'fs';
const txt = fs.readFileSync(process.argv[2], 'utf8'), uses = new Map();
for (const line of txt.split('\n')) { if (!/^#\s*vis\b/.test(line)) continue; const segs = [line.replace(/then="[^"]*"/, '')].concat(((line.match(/then="([^"]*)"/) || [])[1] || '').split('|')); let cur = {};
  segs.forEach(sg => { sg.replace(/(\w+)=("([^"]*)"|\S+)/g, (q, k, v, qq) => { cur[k] = qq != null ? qq : v; return ''; }); if (cur.act === 's3') { const o = { set: cur.set || 'street', n: cur.n, do: cur.do, seed: cur.seed, empty: cur.empty, screen: cur.screen }; uses.set(JSON.stringify(o), o); } }); }
if (!uses.size) { console.log('sim · no 3D sets · OK'); process.exit(0); }
const b = await launch(); const page = await b.newPage(); page.on('pageerror', e => console.log('ERR', e.message));
await page.goto('file://' + process.cwd() + '/studio.html'); await page.evaluate(() => window.READY);
let bad = 0;
for (const o of uses.values()) { const r = await page.evaluate(o => { const set = IFM.s3.world(o.set, o), P = [], C = []; set.g.traverse(m => { if (m.userData.J) P.push(m); else if (m.userData.dyn && m.children.length > 6) C.push(m); });
    const box = m => { const s = Math.abs(Math.sin(m.rotation.y)) > .5; return [s ? .95 : 2.2, s ? 2.2 : .95]; }; let pp = 0, cc = 0, pc = 0, fl = 0;
    for (let t = 0; t < 120; t += .5) { set.tick(t, o); const vp = P.filter(m => m.visible), vc = C.filter(m => m.visible);
      for (let i = 0; i < vp.length; i++) { const a = vp[i].getWorldPosition(new THREE.Vector3()); if (o.set === 'plaza' && Math.hypot(a.x, a.z - 4) < 4.5) fl++;
        for (let j = i + 1; j < vp.length; j++) { const c = vp[j].getWorldPosition(new THREE.Vector3()); if (Math.hypot(a.x - c.x, a.z - c.z) < .45) pp++; }
        for (const c of vc) { const [bx, bz] = box(c); if (Math.abs(a.x - c.position.x) < bx + .25 && Math.abs(a.z - c.position.z) < bz + .25) pc++; } }
      for (let i = 0; i < vc.length; i++) for (let j = i + 1; j < vc.length; j++) { const a = vc[i].position, c = vc[j].position, [ax, az] = box(vc[i]), [bx, bz] = box(vc[j]); if (Math.abs(a.x - c.x) < ax + bx && Math.abs(a.z - c.z) < az + bz) cc++; } }
    return { pp, cc, pc, fl, np: P.length, nc: C.length }; }, o);
  const n = r.pp + r.cc + r.pc + r.fl; bad += n; console.log(`  ${n ? 'ERROR' : 'ok   '} ${o.set}${o.do ? ' do=' + o.do : ''}${o.n ? ' n=' + o.n : ''} · ${r.np} people, ${r.nc} cars · person×person ${r.pp} · car×car ${r.cc} · person×car ${r.pc} · in fountain ${r.fl}`); }
await b.close(); console.log(`sim · ${uses.size} set configs · ${bad ? 'FIX (overlaps)' : 'OK'}`); process.exit(bad ? 1 : 0);
