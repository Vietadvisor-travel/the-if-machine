/* VOXEL LAB (owner, 7 Nov 2026: "a blocky world") — an original block style drawn in 2D isometric: unit blocks with a fine pixel grain
   (hidden faces culled, painter-sorted), the IF CREW as block people (box limbs, a painted pixel face on the front of the head),
   our palette, never another game's textures or characters.
   Story: # vis kind=w act=x_vox v=village|planet|ocean|chart */
'use strict';
(function () {
  if (!window.IFM) return;
  const A = IFM.ACT, CH = '#2A2638';
  // ---------------------------------------------------------------- textures: an n×n pixel grain per colour and face light
  const TX = {}; function grain(col, k, n = 6) { const key = col + k + n; if (TX[key]) return TX[key]; const c = mkCanvas(n, n), g = c.getContext('2d'), r = rng(col.length * 31 + n + Math.round(k * 100) + parseInt(col.slice(1), 16) % 997);
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const v = (r() - .5) * .09; g.fillStyle = shade(col, k - 1 + v); g.fillRect(x, y, 1, 1); } return (TX[key] = c); }
  // ---------------------------------------------------------------- projection
  let S = 40, OX = 0, OY = 0; const P = (x, y, z) => [OX + (x - y) * S * .866, OY + (x + y) * S * .5 - z * S];
  function face(o, u, v, img, fillCol) { ctx.save(); ctx.beginPath(); ctx.moveTo(o[0], o[1]); ctx.lineTo(o[0] + u[0], o[1] + u[1]); ctx.lineTo(o[0] + u[0] + v[0], o[1] + u[1] + v[1]); ctx.lineTo(o[0] + v[0], o[1] + v[1]); ctx.closePath(); ctx.fillStyle = fillCol; ctx.fill(); ctx.lineWidth = .8; ctx.strokeStyle = fillCol; ctx.stroke();
    if (img) { ctx.clip(); ctx.transform(u[0] / img.width, u[1] / img.width, v[0] / img.height, v[1] / img.height, o[0], o[1]); ctx.imageSmoothingEnabled = false; ctx.drawImage(img, 0, 0); } ctx.restore(); }
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  // a box: faces top (+z), left (+y side, lit) and right (+x side, darker); tex = {top, left, right} canvases or a colour
  function box(b) { const { x, y, z, w, d, h, col } = b, n = b.n || 6, T = P(x, y, z + h);
    if (!b.noTop) face(T, sub(P(x + w, y, z + h), T), sub(P(x, y + d, z + h), T), (b.tex && b.tex.top) || grain(b.top || col, 1, n), shade(b.top || col, 0));
    const L = P(x, y + d, z + h); if (!b.noLeft) face(L, sub(P(x + w, y + d, z + h), L), sub(P(x, y + d, z), L), (b.tex && b.tex.left) || grain(b.side || col, .86, n), shade(b.side || col, -.14));
    const R = P(x + w, y, z + h); if (!b.noRight) face(R, sub(P(x + w, y + d, z + h), R), sub(P(x + w, y, z), R), (b.tex && b.tex.right) || grain(b.side || col, .72, n), shade(b.side || col, -.28)); }
  // ---------------------------------------------------------------- a voxel set with culling
  function Vox() { const m = new Map(); return { m, set(x, y, z, c, side) { m.set(x + ',' + y + ',' + z, { x, y, z, c, side }); }, has(x, y, z) { return m.has(x + ',' + y + ',' + z); },
    boxes() { const out = []; for (const v of m.values()) { const top = !this.has(v.x, v.y, v.z + 1), left = !this.has(v.x, v.y + 1, v.z), right = !this.has(v.x + 1, v.y, v.z); if (top || left || right) out.push({ x: v.x, y: v.y, z: v.z, w: 1, d: 1, h: 1, col: v.c, side: v.side, noTop: !top, noLeft: !left, noRight: !right }); } return out; } }; }
  const depth = b => (b.x + b.w * .5) + (b.y + b.d * .5) + (b.z + b.h * .5) * .98 + (b.bias || 0);
  function render(list) { list.sort((a, b) => depth(a) - depth(b)).forEach(box); }
  // ---------------------------------------------------------------- block people (the IF CREW, original): face painted on the +y side
  function faceTex(C, expr, lt) { const n = 8, key = 'f' + C.skin + C.hair + expr + ((lt % 3.7) < .12 ? 'b' : ''); if (TX[key]) return TX[key]; const c = mkCanvas(n, n), g = c.getContext('2d'), px = (x, y, col) => { g.fillStyle = col; g.fillRect(x, y, 1, 1); };
    g.fillStyle = C.skin; g.fillRect(0, 0, n, n); const hc = C.hair === 'hijab' ? C.hairCol : C.hair === 'beanie' ? C.hairCol : C.hair === 'spiky' ? C.capCol : C.hair === 'bald' ? null : C.hairCol;
    if (hc) { g.fillStyle = hc; g.fillRect(0, 0, n, 2); if (C.hair === 'hijab') { g.fillRect(0, 0, 1, n); g.fillRect(n - 1, 0, 1, n); } if (C.hair === 'braids' || C.hair === 'bun') { px(0, 2, hc); px(7, 2, hc); } }
    if (C.hair === 'bald') { px(0, 3, C.hairCol); px(7, 3, C.hairCol); }
    const blink = key.endsWith('b'), big = expr === 'shock' || expr === 'take';
    [[1, 2], [5, 6]].forEach(([a, b2]) => { if (blink || expr === 'laugh') { px(a, 4, CH); px(b2, 4, CH); return; } px(a, 3, '#FFFFFF'); px(b2, 3, '#FFFFFF'); px(a, 4, '#FFFFFF'); px(b2, 4, big ? '#FFFFFF' : CH); if (big) { px(a, 4, CH); } });
    const brow = C.hair === 'bald' ? '#8E889C' : '#2A2638'; [[1, 2], [5, 6]].forEach(([a, b2]) => { px(a, big ? 1 : 2, brow); px(b2, big ? 1 : 2, brow); });
    if (C.glasses) { [[0, 3], [3, 3], [4, 3], [7, 3]].forEach(([x, y]) => px(x, y, CH)); }
    if (C.facial === 'beard') { g.fillStyle = C.beardCol; g.fillRect(0, 5, n, 3); }
    if (C.facial === 'mustache') { px(2, 5, C.hairCol); px(3, 5, C.hairCol); px(4, 5, C.hairCol); px(5, 5, C.hairCol); }
    if (C.freckles) { px(1, 5, shade(C.skin, -.2)); px(6, 5, shade(C.skin, -.2)); }
    const M = '#7A1F2B'; if (big) { px(3, 6, M); px(4, 6, M); px(3, 7, M); px(4, 7, M); } else if (expr === 'laugh' || expr === 'grin') { px(2, 6, M); px(3, 6, M); px(4, 6, M); px(5, 6, M); px(3, 7, '#E85D75'); px(4, 7, '#E85D75'); } else if (expr === 'worried' || expr === 'bored') { px(3, 6, M); px(4, 6, M); } else { px(2, 6, M); px(5, 6, M); px(3, 7, M); px(4, 7, M); }
    return (TX[key] = c); }
  function person(name, x, y, z, lt, o = {}) { const C = (IFM.CAST && IFM.CAST.CAST[name]) || {}, out = [], hop = o.hop ? Math.abs(Math.sin(lt * 4)) * .35 : 0, zz = z + hop, sw = o.walk ? Math.sin(lt * 7) * .18 : 0, up = o.pose === 'cheer' || o.pose === 'take';
    const legs = C.pants || '#3A3A4A', top = C.top || '#5BC0EB';
    out.push({ x: x + .1, y: y + .1 + sw, z: zz, w: .36, d: .36, h: .7, col: legs, bias: -.02 }, { x: x + .54, y: y + .1 - sw, z: zz, w: .36, d: .36, h: .7, col: legs, bias: -.02 });
    out.push({ x: x, y: y + .05, z: zz + .7, w: 1, d: .5, h: .85, col: C.overalls || top, top: top, tex: C.vest ? { left: vestTex(top, C.vest) } : null });
    const armZ = up ? zz + 1.3 : zz + .75, armH = up ? .9 : .8; [[-.32, 1], [1, -1]].forEach(([ax, k]) => out.push({ x: x + ax, y: y + .12 + (o.walk ? -sw * k : 0), z: armZ, w: .32, d: .32, h: armH, col: top, top: up ? C.skin : top, bias: .01 }));
    const hz = zz + 1.55; out.push({ x: x + .05, y: y - .05, z: hz, w: .9, d: .9, h: .9, col: C.skin, side: C.skin, tex: { left: faceTex(C, o.expr || 'happy', lt) }, bias: .05 });
    const hc = C.hair === 'spiky' ? C.capCol : C.hairCol; if (C.hair !== 'bald') out.push({ x: x + .02, y: y - .08, z: hz + .82, w: .96, d: .96, h: C.hair === 'beanie' ? .35 : .2, col: hc, bias: .06 });
    if (C.hair === 'bun') out.push({ x: x + .3, y: y + .1, z: hz + 1.02, w: .4, d: .4, h: .3, col: hc, bias: .07 });
    if (C.hair === 'beanie') out.push({ x: x + .38, y: y + .25, z: hz + 1.17, w: .24, d: .24, h: .2, col: '#FFFFFF', bias: .08 });
    if (C.hair === 'spiky') out.push({ x: x + .95, y: y + .2, z: hz + .82, w: .35, d: .56, h: .12, col: shade(C.capCol, -.15), bias: .07 });
    if (C.hair === 'braids') [x - .1, x + .88].forEach(bx => out.push({ x: bx, y: y + .3, z: hz - .5, w: .22, d: .22, h: 1.2, col: hc, bias: .04 }));
    if (C.hair === 'hijab') out.push({ x: x - .02, y: y + .3, z: hz - .25, w: .98, d: .6, h: 1.1, col: hc, noLeft: 0, bias: .03 });
    return out; }
  function vestTex(top, vest) { const key = 'v' + top + vest; if (TX[key]) return TX[key]; const c = mkCanvas(8, 7), g = c.getContext('2d'); g.fillStyle = shade(top, -.14); g.fillRect(0, 0, 8, 7); g.fillStyle = shade(vest, -.14); g.fillRect(0, 0, 3, 7); g.fillRect(5, 0, 3, 7); g.fillStyle = '#F4D58D'; g.fillRect(2, 2, 1, 1); g.fillRect(2, 4, 1, 1); return (TX[key] = c); }
  // ---------------------------------------------------------------- props
  const coinBlock = (x, y, z) => ({ x, y, z, w: .6, d: .6, h: .6, col: '#FFC93C', top: '#FFD966', bias: .1 });
  // ---------------------------------------------------------------- backdrop helpers
  function skyG(a, b, key) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  function blockCloud(x, y, s, lt) { const dx = (lt * 6) % (W * 1.4); ctx.fillStyle = 'rgba(255,255,255,.92)'; [[0, 0, 4, 1], [1, -1, 2, 1], [-1, 1, 6, 1]].forEach(([a, b, w, h]) => ctx.fillRect(((x + dx) % (W * 1.3)) - W * .15 + a * s, y + b * s, w * s, h * s)); }
  function T(lines, kick, dark) { if (IFM.CAST && IFM.CAST.title) IFM.CAST.title(lines, 1, kick, dark); }
  // ---------------------------------------------------------------- scenes
  const SCN = {
    village(lt) { skyG('#7FD1F5', '#E3F6FF'); [[.1, .2], [.6, .27]].forEach(([x, y]) => blockCloud(W * x, H * y, W * .04, lt)); S = W * .1; OX = W * .5; OY = H * .5;
      const V = Vox(), hgt = (x, y) => (x === 0 || y === 0 ? 1 : 2);
      for (let x = 0; x < 7; x++) for (let y = 0; y < 7; y++) { const h = hgt(x, y); for (let z = 0; z < h; z++) V.set(x, y, z, z === h - 1 ? ((x + y) % 2 ? '#7BD389' : '#6CCB7C') : '#F2A97E', z === h - 1 ? '#F2A97E' : '#E08E66'); }
      for (let x = 1; x < 3; x++) for (let y = 4; y < 7; y++) V.set(x, y, 2, '#F4EEDC', '#D9CFB8');
      const L = V.boxes(); L.push({ x: 5.8, y: .6, z: 2, w: .4, d: .4, h: 1.6, col: '#8B5A3C' }, { x: 5.2, y: 0, z: 3.6, w: 1.6, d: 1.6, h: 1.4, col: '#3FB984', top: '#4FCB92', bias: .3 });
      L.push({ x: 1, y: 1, z: 2, w: 2, d: 1, h: 1, col: '#C68B59', top: '#D9A06E' }, { x: .9, y: .9, z: 3.6, w: 2.2, d: 1.2, h: .25, col: '#FF6B6B', top: '#FF8A8A', bias: .2 }); [[1, 1.8], [2.85, 1.8]].forEach(([x, y]) => L.push({ x, y, z: 3, w: .15, d: .15, h: .6, col: '#8B5A3C' }));
      L.push(...person('prof', 3.8, 2.8, 2, lt, { pose: 'take', expr: 'take' }), ...person('bun', 1.8, 4.4, 2, lt, { pose: 'cheer', expr: 'grin', hop: 1 }));
      [[1.2, 3.6, 5.2], [3.6, 2.2, 5.6], [5.4, 4.6, 5.0], [3.2, 5.6, 5.4]].forEach(([x, y, z], k) => L.push(coinBlock(x + Math.sin(lt * 1.5 + k) * .1, y, z + ((lt * .6 + k * .3) % 1) * 1.2)));
      render(L); T(['WHAT IF MONEY', 'DISAPPEARED?'], 'THE IF MACHINE · BLOCKS'); },
    planet(lt) { skyG('#120E2E', '#2E2466'); const r = rng(3); for (let k = 0; k < 70; k++) { ctx.fillStyle = `rgba(255,255,255,${.3 + r() * .6})`; const s = (1 + Math.floor(r() * 3)) * U() * 2; ctx.fillRect(W * r(), H * r(), s, s); }
      S = W * .052; OX = W * .45; OY = H * .48; const V = Vox(), R = 6.5, rot = Math.floor(lt * 1.2);
      for (let x = -7; x <= 7; x++) for (let y = -7; y <= 7; y++) for (let z = -7; z <= 7; z++) { const d = Math.sqrt(x * x + y * y + z * z); if (d > R) continue; const n = Math.sin((x + rot) * .9) + Math.cos(y * .8) + Math.sin(z * 1.3); const ice = Math.abs(z) > 5.2; V.set(x + 7, y + 7, z, ice ? '#F4F8FF' : n > .9 ? '#4DB35E' : n > .6 ? '#E9C887' : '#3E8EDE', ice ? '#DCE6F5' : n > .9 ? '#3E9A4E' : n > .6 ? '#D2B272' : '#2F74C0'); }
      const L = V.boxes(); const M = Vox(), mr = 2.6, fade = .5 + .5 * Math.cos(lt * .8); for (let x = -3; x <= 3; x++) for (let y = -3; y <= 3; y++) for (let z = -3; z <= 3; z++) if (Math.sqrt(x * x + y * y + z * z) <= mr) M.set(x, y, z, (x + y * 2 + z) % 3 ? '#D9D4E6' : '#B9B2CC');
      render(L); if (!SCN._mc || SCN._mc.width !== W) SCN._mc = mkCanvas(W, H); const mg = SCN._mc.getContext('2d'); mg.setTransform(1, 0, 0, 1, 0, 0); mg.clearRect(0, 0, W, H); S = W * .052; OX = W * .74; OY = H * .34; withCtx(mg, () => render(M.boxes())); ctx.save(); ctx.globalAlpha = fade; ctx.drawImage(SCN._mc, 0, 0); ctx.restore();
      T(['WHAT IF THE', 'MOON VANISHED?'], 'SPACE · BLOCKS', 1); },
    ocean(lt) { skyG('#FFB36B', '#FFE7C2'); ctx.fillStyle = '#FFF2B0'; ctx.fillRect(W * .7, H * .2, W * .16, W * .16); S = W * .07; OX = W * .5; OY = H * .44;
      const V = Vox(), lvl = 1 + Math.round((Math.sin(lt * .5) + 1) * .5); for (let x = 0; x < 11; x++) for (let y = 0; y < 11; y++) { const g = Math.max(0, Math.round(2.6 - (x + y) * .2 + Math.sin(x * .7) * .6)); for (let z = 0; z <= g; z++) V.set(x, y, z, '#F2D49B', '#D9B87A'); for (let z = g + 1; z <= lvl && x + y > 9; z++) V.set(x, y, z, '#3FB8D8', '#2E9DC0'); }
      const L = V.boxes(); const wx = 2.5, wy = 4, wz = 3; L.push({ x: wx, y: wy, z: wz, w: 3.4, d: 1.6, h: 1.3, col: '#4A6FD6', top: '#5B80E6', tex: { left: whaleTex() }, bias: .3 }, { x: wx - .9, y: wy + .4, z: wz + .5, w: .9, d: .8, h: .4, col: '#3A5CC0', bias: .2 }, { x: wx - 1.2, y: wy + .1, z: wz + .9, w: .4, d: 1.4, h: .25, col: '#3A5CC0', bias: .2 });
      [0, 1, 2].forEach(k => { const q = (lt * 1.2 + k / 3) % 1; L.push({ x: wx + 1.5, y: wy + .6, z: wz + 1.4 + q * 1.4, w: .22, d: .22, h: .22, col: '#7FD3FF', bias: 1 }); });
      render(L); T(['WHAT IF THE OCEANS', 'DRIED UP?'], 'PLANET EARTH · BLOCKS'); },
    chart(lt) { skyG('#9FE3C4', '#E8FFF4'); S = W * .085; OX = W * .42; OY = H * .54; const L = [], g = Math.min(1, lt / 2.4);
      for (let x = 0; x < 9; x++) for (let y = 0; y < 4; y++) L.push({ x, y, z: -1, w: 1, d: 1, h: 1, col: (x + y) % 2 ? '#CDEFDC' : '#BDE6CF', side: '#9ACCB2' });
      [1, 2, 4, 7, 11].forEach((n, i) => { const k = Math.round(n * E.out(clamp(g * 1.5 - i * .15))); for (let z = 0; z < k; z++) L.push({ x: 1 + i * 1.5, y: 1.2, z: z * .5, w: 1, d: 1, h: .5, col: z % 2 ? '#FFC93C' : '#F5B92E', top: '#FFD966' }); });
      const topZ = Math.round(11 * E.out(clamp(g * 1.5 - .6))) * .5; L.push(...person('cap', 7, 1.2, topZ, lt, { pose: 'cheer', expr: 'shock' }));
      render(L); const val = Math.round(1000 * Math.pow(1000, E.out(g))); ctx.save(); ctx.font = `400 ${H * .05}px "Paytone One"`; ctx.textAlign = 'center'; ctx.fillStyle = '#2A2638'; ctx.fillRect(W * .16, H * .25, W * .68, H * .085); ctx.fillStyle = '#FFC93C'; ctx.fillText('$' + val.toLocaleString('en-US'), W * .5, H * .307); ctx.restore();
      T(['WHAT IF PRICES', 'NEVER STOPPED?'], 'MONEY · BLOCKS'); },
  };
  function whaleTex() { const key = 'whale'; if (TX[key]) return TX[key]; const c = mkCanvas(14, 6), g = c.getContext('2d'); g.fillStyle = shade('#4A6FD6', -.14); g.fillRect(0, 0, 14, 6); g.fillStyle = '#DDE6FF'; g.fillRect(0, 4, 14, 2); g.fillStyle = '#FFFFFF'; g.fillRect(10, 1, 2, 2); g.fillStyle = CH; g.fillRect(11, 2, 1, 1); g.fillStyle = '#7A1F2B'; g.fillRect(9, 4, 4, 1); return (TX[key] = c); }
  A.x_vox = (o, c, dur) => ({ sfx: [], draw: lt => (SCN[o.v] || SCN.village)(lt) });
  IFM.VOX = { box, render, Vox, person, P, set: (s, ox, oy) => { S = s; OX = ox; OY = oy; } };
})();
