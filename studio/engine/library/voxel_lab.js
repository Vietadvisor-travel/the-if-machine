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
    if (img) { ctx.save(); ctx.clip(); ctx.transform(u[0] / img.width, u[1] / img.width, v[0] / img.height, v[1] / img.height, o[0], o[1]); ctx.imageSmoothingEnabled = false; ctx.drawImage(img, 0, 0); ctx.restore(); }
    ctx.lineWidth = Math.max(1, S * .022); ctx.strokeStyle = 'rgba(30,20,50,.16)'; ctx.stroke(); if (face.top) { ctx.beginPath(); ctx.moveTo(o[0] + v[0], o[1] + v[1]); ctx.lineTo(o[0], o[1]); ctx.lineTo(o[0] + u[0], o[1] + u[1]); ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = Math.max(1, S * .03); ctx.stroke(); } ctx.restore(); }
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  // a box: faces top (+z), left (+y side, lit) and right (+x side, darker); tex = {top, left, right} canvases or a colour
  function box(b) { const { x, y, z, w, d, h, col } = b, n = b.n || 6, T = P(x, y, z + h);
    face.top = 1; if (b.alpha) ctx.globalAlpha = b.alpha; if (!b.noTop) face(T, sub(P(x + w, y, z + h), T), sub(P(x, y + d, z + h), T), (b.tex && b.tex.top) || grain(b.top || col, 1, n), shade(b.top || col, 0));
    face.top = 0; const L = P(x, y + d, z + h); if (!b.noLeft) face(L, sub(P(x + w, y + d, z + h), L), sub(P(x, y + d, z), L), (b.tex && b.tex.left) || grain(b.side || col, .86, n), shade(b.side || col, -.14));
    const R = P(x + w, y, z + h); if (!b.noRight) face(R, sub(P(x + w, y + d, z + h), R), sub(P(x + w, y, z), R), (b.tex && b.tex.right) || grain(b.side || col, .72, n), shade(b.side || col, -.28)); if (b.alpha) ctx.globalAlpha = 1; }
  // ---------------------------------------------------------------- a voxel set with culling
  function Vox() { const m = new Map(); return { m, set(x, y, z, c, side) { m.set(x + ',' + y + ',' + z, { x, y, z, c, side }); }, has(x, y, z) { return m.has(x + ',' + y + ',' + z); },
    boxes() { const out = []; for (const v of m.values()) { const top = !this.has(v.x, v.y, v.z + 1), left = !this.has(v.x, v.y + 1, v.z), right = !this.has(v.x + 1, v.y, v.z); if (top || left || right) out.push({ x: v.x, y: v.y, z: v.z, w: 1, d: 1, h: 1, col: v.c, side: v.side, noTop: !top, noLeft: !left, noRight: !right }); } return out; } }; }
  const depth = b => (b.x + b.w * .5) + (b.y + b.d * .5) + (b.z + b.h * .5) * .98 + (b.bias || 0);
  function render(list) { list.sort((a, b) => depth(a) - depth(b)).forEach(box); }
  // ---------------------------------------------------------------- block people (the IF CREW, original): face painted on the +y side
  function faceTex8(C, expr, lt) { const n = 8, key = 'f' + C.skin + C.hair + expr + ((lt % 3.7) < .12 ? 'b' : ''); if (TX[key]) return TX[key]; const c = mkCanvas(n, n), g = c.getContext('2d'), px = (x, y, col) => { g.fillStyle = col; g.fillRect(x, y, 1, 1); };
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

  function faceTex(C, expr, lt) { const n = 12, key = 'F' + C.skin + C.hair + expr + ((lt % 3.7) < .12 ? 'b' : ''); if (TX[key]) return TX[key]; const c = mkCanvas(n, n), g = c.getContext('2d'), px = (x, y, col, w = 1, h = 1) => { g.fillStyle = col; g.fillRect(x, y, w, h); };
    px(0, 0, C.skin, n, n); px(0, n - 1, shade(C.skin, -.08), n, 1); const hc = C.hair === 'spiky' ? C.capCol : C.hairCol, blink = key.endsWith('b'), big = expr === 'shock' || expr === 'take';
    if (C.hair === 'bun' || C.hair === 'braids') { px(0, 0, hc, n, 3); px(0, 3, hc, 2, 3); px(n - 2, 3, hc, 2, 3); px(4, 3, hc, 4, 1); px(6, 3, C.skin, 2, 1); }
    if (C.hair === 'hijab') { px(0, 0, hc, n, 3); px(0, 0, hc, 2, n); px(n - 2, 0, hc, 2, n); px(2, 3, shade(hc, -.12), 8, 1); }
    if (C.hair === 'beanie') { px(0, 0, hc, n, 3); px(0, 3, shade(hc, -.15), n, 1); }
    if (C.hair === 'spiky') { px(0, 0, hc, n, 3); px(0, 3, shade(hc, -.2), n, 1); px(1, 4, C.hairCol, 1, 1); px(10, 4, C.hairCol, 1, 1); }
    if (C.hair === 'bald') { px(0, 4, C.hairCol, 1, 4); px(n - 1, 4, C.hairCol, 1, 4); px(3, 0, shade(C.skin, .12), 4, 1); }
    const brow = C.hair === 'bald' ? '#8E889C' : '#2A2638', by = big ? 3 : 4; px(2, by, brow, 3, 1); px(7, by, brow, 3, 1); if (expr === 'worried') { px(4, by - 1, brow); px(7, by - 1, brow); }
    [2, 7].forEach(ex => { if (blink || expr === 'laugh') { px(ex, 6, CH, 3, 1); return; } px(ex, 5, '#FFFFFF', 3, big ? 4 : 3); if (big) px(ex + 1, 6, CH, 1, 2); else { px(ex + 1, 6, CH, 2, 2); px(ex + 1, 6, '#FFFFFF', 1, 1); } });
    if (C.glasses) { g.strokeStyle = CH; g.lineWidth = 1; g.strokeRect(1.5, 4.5, 4, 4); g.strokeRect(6.5, 4.5, 4, 4); }
    px(5, 8, shade(C.skin, -.16), 2, 1); px(1, 8, 'rgba(255,110,120,.45)', 2, 1); px(9, 8, 'rgba(255,110,120,.45)', 2, 1);
    if (C.freckles) { px(2, 8, shade(C.skin, -.25)); px(9, 8, shade(C.skin, -.25)); }
    if (C.facial === 'beard') { px(0, 8, C.beardCol, 2, 4); px(n - 2, 8, C.beardCol, 2, 4); px(0, 10, C.beardCol, n, 2); px(3, 9, C.beardCol, 6, 1); }
    const M = '#7A1F2B', TG = '#E85D75'; if (big) { px(4, 9, M, 4, 3); px(5, 11, TG, 2, 1); } else if (expr === 'laugh' || expr === 'grin') { px(3, 9, M, 6, 2); px(3, 9, '#FFFFFF', 6, 1); px(5, 10, TG, 2, 1); } else if (expr === 'worried' || expr === 'bored' || expr === 'deadpan') px(4, 10, M, 4, 1); else { px(3, 9, M); px(8, 9, M); px(4, 10, M, 4, 1); }
    if (C.facial === 'mustache') px(3, 9, C.hairCol, 6, 1);
    return (TX[key] = c); }
  function person(name, x, y, z, lt, o = {}) { const C = (IFM.CAST && IFM.CAST.CAST[name]) || {}, out = [], hop = o.hop ? Math.abs(Math.sin(lt * 4)) * .35 : 0, zz = z + hop, sw = o.walk ? Math.sin(lt * 7) * .18 : 0, up = o.pose === 'cheer' || o.pose === 'take';
    const legs = C.pants || '#3A3A4A', top = C.top || '#5BC0EB';
    out.push({ x: x + .1, y: y + .1 + sw, z: zz + .16, w: .36, d: .36, h: .54, col: legs, bias: -.02 }, { x: x + .54, y: y + .1 - sw, z: zz + .16, w: .36, d: .36, h: .54, col: legs, bias: -.02 }); [[.06, sw], [.5, -sw]].forEach(([dx, s2]) => out.push({ x: x + dx, y: y + .06 + s2, z: zz, w: .44, d: .5, h: .16, col: C.shoes || '#2B2B3B', bias: -.03 }));
    out.push({ x: x, y: y + .05, z: zz + .7, w: 1, d: .5, h: .85, col: C.overalls || top, top: top, tex: C.vest ? { left: vestTex(top, C.vest) } : null });
    const armZ = up ? zz + 1.3 : zz + .75, armH = up ? .9 : .8; [[-.32, 1], [1, -1]].forEach(([ax, k]) => { const ay = y + .12 + (o.walk ? -sw * k : 0); out.push({ x: x + ax, y: ay, z: up ? armZ : armZ + .22, w: .32, d: .32, h: armH - .22, col: top, bias: .01 }); out.push({ x: x + ax + .02, y: ay + .02, z: up ? armZ + armH - .22 : armZ, w: .28, d: .28, h: .22, col: C.skin, bias: .012 }); });
    const hz = zz + 1.55; out.push({ x: x + .05, y: y - .05, z: hz, w: .9, d: .9, h: .9, col: C.skin, side: C.skin, tex: { left: faceTex(C, o.expr || 'happy', lt) }, bias: .05 });
    const hc = C.hair === 'spiky' ? C.capCol : C.hairCol; if (C.hair !== 'bald') out.push({ x: x + .02, y: y - .08, z: hz + .82, w: .96, d: .96, h: C.hair === 'beanie' ? .35 : .2, col: hc, bias: .06 });
    if (C.hair === 'bun') out.push({ x: x + .3, y: y + .1, z: hz + 1.02, w: .4, d: .4, h: .3, col: hc, bias: .07 });
    if (C.hair === 'beanie') out.push({ x: x + .38, y: y + .25, z: hz + 1.17, w: .24, d: .24, h: .2, col: '#FFFFFF', bias: .08 });
    if (C.hair === 'spiky') out.push({ x: x + .95, y: y + .2, z: hz + .82, w: .35, d: .56, h: .12, col: shade(C.capCol, -.15), bias: .07 });
    if (C.hair === 'braids') [x - .1, x + .88].forEach(bx => out.push({ x: bx, y: y + .3, z: hz - .5, w: .22, d: .22, h: 1.2, col: hc, bias: .04 }));
    if (C.hair === 'hijab') out.push({ x: x - .02, y: y - .2, z: hz - .35, w: .98, d: .4, h: 1.15, col: hc, bias: .03 });
    return out; }
  function vestTex(top, vest) { const key = 'v' + top + vest; if (TX[key]) return TX[key]; const c = mkCanvas(8, 7), g = c.getContext('2d'); g.fillStyle = shade(top, -.14); g.fillRect(0, 0, 8, 7); g.fillStyle = shade(vest, -.14); g.fillRect(0, 0, 3, 7); g.fillRect(5, 0, 3, 7); g.fillStyle = '#F4D58D'; g.fillRect(2, 2, 1, 1); g.fillRect(2, 4, 1, 1); return (TX[key] = c); }
  // ---------------------------------------------------------------- props
  const coinBlock = (x, y, z) => ({ x, y, z, w: .6, d: .6, h: .6, col: '#FFC93C', top: '#FFD966', bias: .1 });
  // ---------------------------------------------------------------- backdrop helpers
  function skyG(a, b, key) { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, a); g.addColorStop(1, b); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  function blockCloud(x, y, s, lt) { const dx = (lt * 6) % (W * 1.4); ctx.fillStyle = 'rgba(255,255,255,.92)'; [[0, 0, 4, 1], [1, -1, 2, 1], [-1, 1, 6, 1]].forEach(([a, b, w, h]) => ctx.fillRect(((x + dx) % (W * 1.3)) - W * .15 + a * s, y + b * s, w * s, h * s)); }

  function T(lines, kick, dark) { const u = U(); let s = 92 * u; ctx.save(); lines.forEach(l => { ctx.font = `400 ${s}px "Paytone One"`; s = Math.min(s, s * W * .86 / ctx.measureText(l).width); }); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    if (kick) { ctx.font = `700 ${24 * u}px "Space Mono", monospace`; ctx.fillStyle = dark ? 'rgba(255,255,255,.8)' : 'rgba(42,38,56,.75)'; ctx.fillText(kick, W / 2, H * .075); }
    lines.forEach((l, i) => { const y = H * .135 + i * s * 1.02, hi = i === 1; ctx.font = `400 ${s}px "Paytone One"`; const dep = Math.round(s * .1), face = hi ? '#FFC93C' : '#FFFFFF', side = hi ? '#C2410C' : '#2A2638';
      for (let k = dep; k > 0; k--) { ctx.fillStyle = shade(side, -k / dep * .2); ctx.fillText(l, W / 2 + k * .55, y + k); } ctx.lineWidth = s * .08; ctx.strokeStyle = side; ctx.strokeText(l, W / 2, y); ctx.fillStyle = face; ctx.fillText(l, W / 2, y); ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.rect(0, y - s * .75, W, s * .22); ctx.clip(); ctx.fillText(l, W / 2, y); ctx.restore(); });
    ctx.restore(); }
  function fog(col, a) { const g = ctx.createLinearGradient(0, H * .55, 0, H); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, col); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  function rays(cx, cy, col, lt) { ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = col; for (let k = 0; k < 9; k++) { const a = k * TAU / 9 + lt * .03; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, H, a, a + .12); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  function sparks(lt, n, col) { const r = rng(11); for (let k = 0; k < n; k++) { const x = W * r(), y0 = H * (.25 + r() * .6), q = (lt * (.1 + r() * .15) + r()) % 1, s = (2 + r() * 4) * U(); ctx.save(); ctx.globalAlpha = Math.sin(q * Math.PI) * .9; ctx.fillStyle = col; ctx.fillRect(x, y0 - q * H * .12, s, s); ctx.restore(); } }

  // ---------------------------------------------------------------- scenes
  const SCN = {

    village(lt) { skyG('#6EC6F2', '#DDF3FF'); rays(W * .85, H * .1, '#FFFFFF', lt); [[.05, .22], [.55, .3], [.3, .9]].forEach(([x, y]) => blockCloud(W * x, H * y, W * .035, lt));
      S = W * .062; OX = W * .5 + Math.sin(lt * .3) * W * .01; OY = H * .4; const V = Vox(), N = 13, c0 = (N - 1) / 2, r = rng(5);
      const hgt = (x, y) => 2 + Math.round(Math.sin(x * .55) + Math.cos(y * .6) * .8 + (x + y > 17 ? 1 : 0)), river = (x, y) => Math.abs(y - (3 + x * .45 + Math.sin(x * .8) * .8)) < .8;
      for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) { const d = Math.hypot(x - c0, y - c0); if (d > c0 + .4) continue; const h = river(x, y) ? 1 : Math.max(2, hgt(x, y)), deep = Math.round((c0 + .5 - d) * .9);
        for (let z = -deep; z < h; z++) { const top = z === h - 1, rock = z < -1; V.set(x, y, z, top ? (r() < .1 ? '#8BDB8F' : '#6CCB7C') : rock ? '#9C8FB5' : '#F2A97E', top ? '#E8946B' : rock ? '#857A9F' : '#E08E66'); }
        if (river(x, y)) V.set(x, y, 1, '#4FC3F7', '#3AA8DC'); }
      const L = V.boxes().map(b => (b.col === '#4FC3F7' ? { ...b, alpha: .85, h: .82 } : b));
      const house = (x, y, z, w, d, wall, roof) => { L.push({ x, y, z, w, d, h: 1.6, col: wall, tex: { left: winTex(wall, w), right: winTex(wall, d) } }); for (let k = 0; k < 3; k++) L.push({ x: x - .15 + k * .25, y: y - .15 + k * .25, z: z + 1.6 + k * .32, w: w + .3 - k * .5, d: d + .3 - k * .5, h: .32, col: roof, top: shade(roof, .08), bias: .05 + k * .01 }); };
      const gz = (x, y) => river(Math.floor(x), Math.floor(y)) ? 1 : Math.max(2, hgt(Math.floor(x), Math.floor(y)));
      house(8, 1.6, gz(8, 1.6), 2, 2, '#FFF1D6', '#E8574F'); house(10, 5, gz(10, 5), 1.6, 2, '#FDE2E4', '#5B6EE1');
      const sx = 2, sy = 7.2, sz = gz(2, 7); L.push({ x: sx, y: sy, z: sz, w: 2.2, d: 1, h: .9, col: '#C68B59', top: '#D9A06E' }); ['#FF6B6B', '#FFC93C', '#7BD389', '#C9A0FF', '#FF9F43'].forEach((c, k) => L.push({ x: sx + .1 + k * .42, y: sy + .2, z: sz + .9, w: .32, d: .32, h: .3, col: c, bias: .02 })); [[sx, sy + .8], [sx + 2.05, sy + .8]].forEach(([x, y]) => L.push({ x, y, z: sz + .9, w: .15, d: .15, h: 1, col: '#8B5A3C' })); L.push({ x: sx - .15, y: sy - .1, z: sz + 1.9, w: 2.5, d: 1.3, h: .2, col: '#FFFFFF', top: '#FF6B6B', tex: { top: stripeTex() }, bias: .1 });
      const tree = (x, y, s2 = 1) => { const z = gz(x, y); L.push({ x: x + .3, y: y + .3, z, w: .4, d: .4, h: 1.3 * s2, col: '#8B5A3C' }); L.push({ x: x - .3, y: y - .3, z: z + 1.3 * s2, w: 1.6, d: 1.6, h: 1, col: '#3FB984', top: '#52CC96' }, { x: x, y: y, z: z + 2.3 * s2, w: 1, d: 1, h: .6, col: '#3FB984', top: '#5ED6A0' }); };
      tree(1.5, 2.5); tree(6.5, 10.2, .9); tree(11, 8.5, 1.1);
      [[4, 4.5, '#FF8FA3'], [5.5, 9, '#FFE066'], [9, 9.5, '#FFFFFF'], [3, 9.6, '#C9A0FF'], [7.5, 5.8, '#FF8FA3']].forEach(([x, y, c]) => { const z = gz(x, y); L.push({ x, y, z, w: .1, d: .1, h: .3, col: '#3E9A4E' }, { x: x - .08, y: y - .08, z: z + .3, w: .26, d: .26, h: .2, col: c, bias: .01 }); });
      L.push(...person('prof', 6.2, 6, gz(6, 6), lt, { pose: 'take', expr: 'take' }), ...person('bun', 3.6, 6.8, gz(3.6, 6.8), lt, { pose: 'cheer', expr: 'laugh', hop: 1 }), ...person('beard', 8.6, 4.4, gz(8.6, 4.4), lt, { expr: 'worried' }));
      [[5.5, 3.2, 7.4], [7.6, 6.2, 8.2], [3.2, 4.6, 8.0], [9.5, 3.8, 7.8], [4.8, 8.4, 8.6]].forEach(([x, y, z], k) => L.push({ ...coinBlock(x + Math.sin(lt * 1.5 + k) * .15, y, z + ((lt * .5 + k * .37) % 1) * 1.5), bias: 3 }));
      render(L); sparks(lt, 18, '#FFE066'); fog('#DDF3FF', .35); T(['WHAT IF MONEY', 'DISAPPEARED?'], 'THE IF MACHINE · BLOCKS'); },
    planet(lt) { skyG('#120E2E', '#2E2466'); const r = rng(3); for (let k = 0; k < 70; k++) { ctx.fillStyle = `rgba(255,255,255,${.3 + r() * .6})`; const s = (1 + Math.floor(r() * 3)) * U() * 2; ctx.fillRect(W * r(), H * r(), s, s); }
      S = W * .052; OX = W * .45; OY = H * .48; const V = Vox(), R = 6.5, rot = Math.floor(lt * 1.2);
      for (let x = -7; x <= 7; x++) for (let y = -7; y <= 7; y++) for (let z = -7; z <= 7; z++) { const d = Math.sqrt(x * x + y * y + z * z); if (d > R) continue; const n = Math.sin((x + rot) * .9) + Math.cos(y * .8) + Math.sin(z * 1.3); const ice = Math.abs(z) > 5.2; V.set(x + 7, y + 7, z, ice ? '#F4F8FF' : n > .9 ? '#4DB35E' : n > .6 ? '#E9C887' : '#3E8EDE', ice ? '#DCE6F5' : n > .9 ? '#3E9A4E' : n > .6 ? '#D2B272' : '#2F74C0'); }
      const L = V.boxes(); const M = Vox(), mr = 2.6, fade = .5 + .5 * Math.cos(lt * .8); for (let x = -3; x <= 3; x++) for (let y = -3; y <= 3; y++) for (let z = -3; z <= 3; z++) if (Math.sqrt(x * x + y * y + z * z) <= mr) M.set(x, y, z, (x + y * 2 + z) % 3 ? '#D9D4E6' : '#B9B2CC');
      ctx.save(); const hg = ctx.createRadialGradient(W * .45, H * .48, S * 5, W * .45, H * .48, S * 11); hg.addColorStop(0, 'rgba(127,211,255,.35)'); hg.addColorStop(1, 'rgba(127,211,255,0)'); ctx.fillStyle = hg; ctx.fillRect(0, 0, W, H); ctx.restore();
      for (let k = 0; k < 6; k++) { const a = lt * .25 + k * TAU / 6; L.push({ x: 7 + Math.cos(a) * 8.5, y: 7 + Math.sin(a) * 8.5, z: 3 + Math.sin(a * 2) * 2, w: 1.6, d: .9, h: .5, col: '#FFFFFF', top: '#FFFFFF', alpha: .9, bias: 2 }); }
      render(L); sparks(lt, 22, '#FFFFFF'); if (!SCN._mc || SCN._mc.width !== W) SCN._mc = mkCanvas(W, H); const mg = SCN._mc.getContext('2d'); mg.setTransform(1, 0, 0, 1, 0, 0); mg.clearRect(0, 0, W, H); S = W * .052; OX = W * .74; OY = H * .34; withCtx(mg, () => render(M.boxes())); ctx.save(); ctx.globalAlpha = fade; ctx.drawImage(SCN._mc, 0, 0); ctx.restore();
      T(['WHAT IF THE', 'MOON VANISHED?'], 'SPACE · BLOCKS', 1); },
    ocean(lt) { skyG('#FFB36B', '#FFE7C2'); ctx.fillStyle = '#FFF2B0'; ctx.fillRect(W * .7, H * .2, W * .16, W * .16); S = W * .07; OX = W * .5; OY = H * .44;
      const V = Vox(), lvl = 1 + Math.round((Math.sin(lt * .5) + 1) * .5); for (let x = 0; x < 11; x++) for (let y = 0; y < 11; y++) { const g = Math.max(0, Math.round(2.6 - (x + y) * .2 + Math.sin(x * .7) * .6)); for (let z = 0; z <= g; z++) V.set(x, y, z, '#F2D49B', '#D9B87A'); for (let z = g + 1; z <= lvl && x + y > 9; z++) V.set(x, y, z, '#3FB8D8', '#2E9DC0'); }
      const L = V.boxes(); const wx = 2.5, wy = 4, wz = 3; L.push({ x: wx, y: wy, z: wz, w: 3.4, d: 1.6, h: 1.3, col: '#4A6FD6', top: '#5B80E6', tex: { left: whaleTex() }, bias: .3 }, { x: wx - .9, y: wy + .4, z: wz + .5, w: .9, d: .8, h: .4, col: '#3A5CC0', bias: .2 }, { x: wx - 1.2, y: wy + .1, z: wz + .9, w: .4, d: 1.4, h: .25, col: '#3A5CC0', bias: .2 });
      [0, 1, 2].forEach(k => { const q = (lt * 1.2 + k / 3) % 1; L.push({ x: wx + 1.5, y: wy + .6, z: wz + 1.4 + q * 1.4, w: .22, d: .22, h: .22, col: '#7FD3FF', bias: 1 }); });
      const palm = (x, y, z) => { for (let k = 0; k < 4; k++) L.push({ x: x + k * .08, y, z: z + k * .55, w: .3, d: .3, h: .55, col: '#A0703F' }); [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => L.push({ x: x + .2 + dx * .55 - .35, y: y + dy * .55 - .2, z: z + 2.2 - (dx || dy ? .15 : 0), w: .9, d: .7, h: .18, col: '#3FB984', top: '#52CC96', bias: .2 })); L.push({ x: x + .25, y: y + .1, z: z + 1.9, w: .25, d: .25, h: .25, col: '#8B5A3C', bias: .3 }); };
      palm(7.5, 1.5, 3); palm(9.2, 3.2, 2);
      const bx = .6, by = 6.6, bz = 2; L.push({ x: bx, y: by, z: bz, w: 2.4, d: 1, h: .6, col: '#E8574F', top: '#FFF1D6', bias: .4 }, { x: bx + .3, y: by + .2, z: bz + .6, w: 1, d: .6, h: .5, col: '#FFFFFF', bias: .45 }, { x: bx + 1.6, y: by + .45, z: bz + .6, w: .12, d: .12, h: 1.4, col: '#8B5A3C', bias: .45 });
      [[3, 3.2, '#FF8FA3'], [6.2, 1.8, '#FFE066'], [1.6, 4.4, '#FFFFFF']].forEach(([x, y, c]) => L.push({ x, y, z: 3, w: .3, d: .3, h: .12, col: c, bias: .1 }));
      L.push({ x: 4.6, y: 2.2, z: 3.2, w: .7, d: .3, h: .3, col: '#FF8A3D', bias: .2 }, { x: 4.3, y: 2.25, z: 3.25, w: .3, d: .2, h: .2, col: '#FF6B2B', bias: .2 });
      render(L); T(['WHAT IF THE OCEANS', 'DRIED UP?'], 'PLANET EARTH · BLOCKS'); },
    chart(lt) { skyG('#9FE3C4', '#E8FFF4'); S = W * .085; OX = W * .42; OY = H * .54; const L = [], g = Math.min(1, lt / 2.4);
      for (let x = 0; x < 9; x++) for (let y = 0; y < 4; y++) L.push({ x, y, z: -1, w: 1, d: 1, h: 1, col: (x + y) % 2 ? '#CDEFDC' : '#BDE6CF', side: '#9ACCB2' });
      [1, 2, 4, 7, 11].forEach((n, i) => { const k = Math.round(n * E.out(clamp(g * 1.5 - i * .15))); for (let z = 0; z < k; z++) L.push({ x: 1 + i * 1.5, y: 1.2, z: z * .5, w: 1, d: 1, h: .5, col: z % 2 ? '#FFC93C' : '#F5B92E', top: '#FFD966' }); });
      const topZ = Math.round(11 * E.out(clamp(g * 1.5 - .6))) * .5; L.push(...person('cap', 7, 1.2, topZ, lt, { pose: 'cheer', expr: 'shock' }));
      [[-4, -4, 2.5, '#B9A6FF'], [-2.3, -4.2, 3.5, '#9AD0F5'], [-.6, -4, 2.2, '#FFB3C6'], [1.1, -4.3, 3, '#B9A6FF'], [2.8, -4, 2.4, '#9AD0F5']].forEach(([x, y, h, c]) => L.push({ x, y, z: -1, w: 1.6, d: 1.6, h: h, col: c, tex: { left: winTex(c, 1.6), right: winTex(c, 1.6) }, bias: -5 }));
      L.push(...person('prof', .2, 2.8, 0, lt, { pose: 'take', expr: 'take' }), ...person('hijab', 2.4, 3, 0, lt, { expr: 'worried' }));
      for (let k = 0; k < 5; k++) { const q = (lt * .7 + k * .2) % 1; L.push({ x: 7.3 + Math.sin(k * 2) * .4, y: 1.5, z: topZ + 2.5 + q * 2, w: .3, d: .3, h: .3, col: '#FFC93C', top: '#FFE066', alpha: 1 - q * .6, bias: 4 }); }
      render(L); sparks(lt, 16, '#FFE066'); const val = Math.round(1000 * Math.pow(1000, E.out(g))); ctx.save(); ctx.font = `400 ${H * .05}px "Paytone One"`; ctx.textAlign = 'center'; ctx.fillStyle = '#2A2638'; ctx.fillRect(W * .16, H * .25, W * .68, H * .085); ctx.fillStyle = '#FFC93C'; ctx.fillText('$' + val.toLocaleString('en-US'), W * .5, H * .307); ctx.restore();
      T(['WHAT IF PRICES', 'NEVER STOPPED?'], 'MONEY · BLOCKS'); },
  };

  function winTex(wall, w) { const key = 'w' + wall + w; if (TX[key]) return TX[key]; const n = Math.round(w * 6), c = mkCanvas(n, 10), g = c.getContext('2d'); g.fillStyle = shade(wall, -.12); g.fillRect(0, 0, n, 10); const r = rng(n); for (let x = 0; x < n; x++) for (let y = 0; y < 10; y++) if (r() < .15) { g.fillStyle = shade(wall, -.18); g.fillRect(x, y, 1, 1); }
    for (let k = 1; k < n - 2; k += 3) { g.fillStyle = '#5A3A26'; g.fillRect(k, 2, 2, 3); g.fillStyle = r() < .5 ? '#FFE7A3' : '#8FD3FF'; g.fillRect(k, 2, 2, 2); } g.fillStyle = '#8B5A3C'; g.fillRect(Math.floor(n / 2) - 1, 6, 2, 4); return (TX[key] = c); }
  function stripeTex() { if (TX.stripe) return TX.stripe; const c = mkCanvas(10, 6), g = c.getContext('2d'); for (let x = 0; x < 10; x++) { g.fillStyle = x % 2 ? '#FFFFFF' : '#FF6B6B'; g.fillRect(x, 0, 1, 6); } return (TX.stripe = c); }
  function whaleTex() { const key = 'whale'; if (TX[key]) return TX[key]; const c = mkCanvas(14, 6), g = c.getContext('2d'); g.fillStyle = shade('#4A6FD6', -.14); g.fillRect(0, 0, 14, 6); g.fillStyle = '#DDE6FF'; g.fillRect(0, 4, 14, 2); g.fillStyle = '#FFFFFF'; g.fillRect(10, 1, 2, 2); g.fillStyle = CH; g.fillRect(11, 2, 1, 1); g.fillStyle = '#7A1F2B'; g.fillRect(9, 4, 4, 1); return (TX[key] = c); }
  A.x_vox = (o, c, dur) => ({ sfx: [], draw: lt => (SCN[o.v] || SCN.village)(lt) });
  IFM.VOX = { box, render, Vox, person, P, set: (s, ox, oy) => { S = s; OX = ox; OY = oy; } };
})();
