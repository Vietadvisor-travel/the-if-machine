/* THE IF MACHINE CAST (owner, 7 Nov 2026, with a reference board of a flat-character app cast: "each character has its own look,
   the same graphic language, real acting — not just twitching limbs; and not only the characters, everything").
   Our own original cast (no brand's characters): flat geometric shapes, no outlines, two-tone light/shadow planes, big heads,
   thick brows, sclera eyes with a heavy upper lid, rounded noses, open expressive mouths; every prop drawn the same way.
   Acting: a pose library (joint angles + face) blended over time with anticipation/overshoot and follow-through (the head lags
   the body, arms overshoot), breathing and blinks. Use: IFM.CAST.draw(name, x, yFeet, h, lt, { keys: [[t, pose, expr], …], flip })
   Demo act: x_cast v=lineup|hook|barter|queue|motion */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT) return;
  const A = IFM.ACT, INK = '#26233A', MOUTH = '#7A1F2B', TONGUE = '#E85D75', CH = {};
  const cache = (k, fn) => { const key = k + W + 'x' + H; if (!CH[key]) { const cv = mkCanvas(W, H); withCtx(cv.getContext('2d'), fn); CH[key] = cv; } return CH[key]; };

  // ---------------------------------------------------------------- flat primitives: fill + a darker plane on the shadow side + a soft highlight
  // SIGNATURE SHADING (owner, 7 Nov 2026: "its own graphic signature"): a crescent shadow on the side away from the light (top-left),
  // filled with a fine halftone dot screen like old print, plus a thin light rim on the lit edge
  const PAT = {}; function dotShade(col) { const u = Math.max(1, U()), k = col + u; if (!PAT[k]) { const s = Math.round(7 * u), c = mkCanvas(s, s), g = c.getContext('2d'); g.fillStyle = shade(col, -.12); g.fillRect(0, 0, s, s); g.fillStyle = shade(col, -.24); g.beginPath(); g.arc(s / 2, s / 2, s * .2, 0, TAU); g.fill(); PAT[k] = ctx.createPattern(c, 'repeat'); } return PAT[k]; }
  function F(path, col, box, o = {}) { ctx.save(); ctx.beginPath(); path(); ctx.fillStyle = col; ctx.fill();
    if (o.plane !== 0 && box) { ctx.clip(); const [x, y, w, h] = box, d = o.depth ?? .16, m = Math.min(w, h);
      ctx.fillStyle = o.dots === 0 ? shade(col, -.13) : dotShade(col); ctx.fillRect(x - w, y - h, w * 3, h * 3);
      ctx.save(); ctx.translate(-m * d * 1.1, -m * d * .8); ctx.beginPath(); path(); ctx.fillStyle = col; ctx.fill(); ctx.restore();
      if (o.hi !== 0) { ctx.save(); ctx.translate(m * .05, m * .05); ctx.beginPath(); path(); ctx.restore(); ctx.save(); ctx.translate(-m * .02, -m * .02); ctx.globalAlpha = .35; ctx.strokeStyle = shade(col, .3); ctx.lineWidth = Math.max(2, m * .05); ctx.beginPath(); path(); ctx.stroke(); ctx.restore(); } }
    ctx.restore(); }
  const ovalF = (x, y, rx, ry, col, o) => F(() => ctx.ellipse(x, y, rx, ry, (o && o.rot) || 0, 0, TAU), col, [x - rx, y - ry, rx * 2, ry * 2], o);
  const rectF = (x, y, w, h, r, col, o) => F(() => ctx.roundRect(x, y, w, h, Math.max(0, Math.min(r, w / 2, h / 2))), col, [x, y, w, h], o);
  const polyF = (pts, col, o) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); F(() => { ctx.moveTo(...pts[0]); pts.slice(1).forEach(p => ctx.lineTo(...p)); ctx.closePath(); }, col, [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)], o); };
  const tube = (x1, y1, x2, y2, w, col) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = dotShade(col); ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w * .68; ctx.beginPath(); ctx.moveTo(x1 - w * .12, y1 - w * .1); ctx.lineTo(x2 - w * .12, y2 - w * .1); ctx.stroke(); ctx.restore(); };
  // the cut-out sticker: whatever fn draws gets a white border and a soft drop shadow (drawn off-screen at the current transform)
  let L1 = null, L2 = null; function sticker(fn, pad = 7) { const main = ctx, u = U(), p = pad * u; if (!L1 || L1.width !== main.canvas.width || L1.height !== main.canvas.height) { L1 = mkCanvas(main.canvas.width, main.canvas.height); L2 = mkCanvas(main.canvas.width, main.canvas.height); }
    const g1 = L1.getContext('2d'), g2 = L2.getContext('2d'); g1.setTransform(1, 0, 0, 1, 0, 0); g1.clearRect(0, 0, L1.width, L1.height); g1.setTransform(main.getTransform()); ctx = g1; try { fn(); } finally { ctx = main; }
    g2.setTransform(1, 0, 0, 1, 0, 0); g2.clearRect(0, 0, L2.width, L2.height); g2.globalCompositeOperation = 'source-over'; for (let a = 0; a < TAU; a += TAU / 14) g2.drawImage(L1, Math.cos(a) * p, Math.sin(a) * p); g2.drawImage(L1, 0, 0); g2.globalCompositeOperation = 'source-in'; g2.fillStyle = '#FFFFFF'; g2.fillRect(0, 0, L2.width, L2.height); g2.globalCompositeOperation = 'source-over';
    main.save(); main.setTransform(1, 0, 0, 1, 0, 0); main.globalAlpha *= .22; main.filter = 'brightness(0)'; main.drawImage(L2, 4 * u, 9 * u); main.filter = 'none'; main.globalAlpha /= .22; main.drawImage(L2, 0, 0); main.drawImage(L1, 0, 0); main.restore(); }

  // ---------------------------------------------------------------- the cast (original designs)
  const CAST = {
    prof:   { skin: '#F0B48A', head: 'round', hair: 'bald', hairCol: '#B9B4C4', facial: 'mustache', glasses: 1, top: '#F4EEDC', vest: '#C98A3E', pants: '#4A3F6B', shoes: '#3B2A22', build: 1.08 },
    bun:    { skin: '#FFD2B3', head: 'round', hair: 'bun', hairCol: '#C2562E', freckles: 1, top: '#FFC93C', hood: 1, pants: '#2E3A6B', shoes: '#FF6B6B', build: .95 },
    beard:  { skin: '#9C6644', head: 'square', hair: 'beanie', hairCol: '#2EC4B6', facial: 'beard', beardCol: '#2B1D16', top: '#1F8A84', pants: '#3D3D5C', shoes: '#2B2B3B', build: 1.15 },
    braids: { skin: '#F6C7A1', head: 'round', hair: 'braids', hairCol: '#2B2B3B', top: '#FF8FA3', overalls: '#8E6CEF', pants: '#8E6CEF', shoes: '#FFFFFF', build: .9 },
    hijab:  { skin: '#C98B6B', head: 'long', hair: 'hijab', hairCol: '#FF7A45', top: '#3FB984', pants: '#26408B', shoes: '#2B2B3B', build: 1 },
    cap:    { skin: '#E8A47C', head: 'square', hair: 'spiky', hairCol: '#4A2E1E', capCol: '#E63946', top: '#5BC0EB', pants: '#3A3A4A', shoes: '#FFC93C', build: .97 },
  };
  // ---------------------------------------------------------------- poses (arm angles from straight down, outward +; forearm absolute) and faces
  const POSE = {
    idle:   { lean: 0, tilt: 0, aL: .14, fL: .06, aR: .14, fR: .06, sq: 0 },
    cheer:  { lean: -.04, tilt: -.1, aL: 2.6, fL: 2.9, aR: 2.6, fR: 2.9, sq: .04 },
    shock:  { lean: -.06, tilt: -.06, aL: 1.5, fL: 2.6, aR: 1.5, fR: 2.6, sq: .05 },
    think:  { lean: .03, tilt: .14, aL: .25, fL: -1.45, aR: .55, fR: -2.85, sq: 0 },
    point:  { lean: .05, tilt: .06, aL: .12, fL: .05, aR: 1.75, fR: 1.85, sq: 0 },
    shrug:  { lean: 0, tilt: .12, aL: .7, fL: 1.95, aR: .7, fR: 1.95, sq: -.02 },
    watch:  { lean: .06, tilt: .2, aL: .35, fL: -1.55, aR: .25, fR: -2.0, sq: 0 },
    crossed:{ lean: -.03, tilt: -.05, aL: .35, fL: -1.75, aR: .35, fR: -1.65, sq: 0 },
    wave:   { lean: 0, tilt: -.08, aL: .12, fL: .05, aR: 2.2, fR: 2.9, sq: 0 },
    hold:   { lean: 0, tilt: .04, aL: .35, fL: -1.2, aR: .35, fR: -1.2, sq: 0 },
    take:   { lean: -.16, tilt: -.14, aL: 2.2, fL: 2.3, aR: 2.2, fR: 2.3, sq: .12 },
    slump:  { lean: .1, tilt: .3, aL: .05, fL: .02, aR: .05, fR: .02, sq: -.1 },
  };
  const FACE = {
    happy: { mouth: 'smile', lid: .12, brow: .04, look: [0, 0] }, grin: { mouth: 'open', lid: .1, brow: .12, look: [0, 0] }, laugh: { mouth: 'open', closed: 1, brow: .14, look: [0, 0] },
    shock: { mouth: 'o', lid: 0, brow: .38, look: [0, -.1], small: 1 }, think: { mouth: 'side', lid: .22, browL: .32, browR: -.04, look: [.45, -.5] },
    bored: { mouth: 'flat', lid: .5, brow: -.06, look: [-.3, .1] }, smirk: { mouth: 'smirk', lid: .3, brow: .02, browL: .2, look: [.3, 0] }, wink: { mouth: 'open', lid: .1, wink: 1, brow: .1, look: [.2, 0] },
    worried: { mouth: 'wobble', lid: .15, brow: .22, inner: 1, look: [0, .2] },
    take: { mouth: 'drop', lid: 0, brow: .6, look: [0, 0], small: 1, big: 1.55 }, deadpan: { mouth: 'flat', lid: .48, brow: -.02, look: [0, 0] },
    cry: { mouth: 'wobble', closed: 1, brow: .2, inner: 1, look: [0, 0], tears: 1 },
  };
  const mix = (a, b, k) => { const o = {}; for (const key in a) o[key] = typeof a[key] === 'number' ? lerp(a[key], b[key] ?? a[key], k) : (k < .5 ? a[key] : b[key]); return o; };
  const backEase = t => { const c = 1.4; t = clamp(t); return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
  function poseAt(keys, t, delay = 0) { const tt = t - delay; let i = 0; while (i < keys.length - 1 && tt >= keys[i + 1][0]) i++; const cur = POSE[keys[i][1]] || POSE.idle; if (i === 0 && tt < keys[0][0]) return cur; const prev = i > 0 ? (POSE[keys[i - 1][1]] || POSE.idle) : cur;
    const k = i > 0 ? backEase((tt - keys[i][0]) / .55) : 1; return mix(prev, cur, k); }
  function faceAt(keys, t) { let i = 0; while (i < keys.length - 1 && t >= keys[i + 1][0]) i++; const f = FACE[keys[i][2] || 'happy'] || FACE.happy, p = i > 0 ? FACE[keys[i - 1][2] || 'happy'] || FACE.happy : f, k = i > 0 ? clamp((t - keys[i][0]) / .25) : 1; return k >= 1 ? f : { ...f, brow: lerp(p.brow ?? 0, f.brow ?? 0, k) }; }

  // ---------------------------------------------------------------- one character
  function drawV2(name, x, y, h, lt, o = {}) { if (o.sticker !== 0 && !drawV2._in) { drawV2._in = 1; try { sticker(() => drawV2(name, x, y, h, lt, o)); } finally { drawV2._in = 0; } return; } const C = CAST[name] || CAST.bun, keys = o.keys || [[0, o.pose || 'idle', o.expr || 'happy']], b = C.build || 1;
    const P = poseAt(keys, lt), Ph = poseAt(keys, lt, .09), Fc = faceAt(keys, lt), seed = name.length * 1.7;
    const breath = Math.sin(lt * 2.1 + seed) * .012, wave = keys.some(k => k[1] === 'wave') && P.aR > 2 ? Math.sin(lt * 9) * .35 : 0;
    const rh = h * .235, tW = h * .34 * b, tH = h * .27, legL = h * .21; ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
    ctx.save(); ctx.globalAlpha = .16; ell(0, 0, h * .26 * b, h * .04, '#1B1530', 0); ctx.restore();
    const hipY = -legL, sq = 1 + (P.sq || 0) + breath;
    // legs + shoes
    [-1, 1].forEach(sd => { tube(sd * tW * .2, hipY, sd * tW * .24, -h * .04, h * .12, C.pants); rectF(sd * tW * .24 - h * .075 + sd * h * .025, -h * .075, h * .15, h * .075, h * .035, C.shoes, { depth: .2 }); });
    // upper body pivots at the hips
    ctx.save(); ctx.translate(0, hipY); ctx.rotate(P.lean); ctx.scale(1, sq);
    const neckY = -tH, shY = neckY + h * .045, upA = h * .15, foA = h * .14, armW = h * .1, skinD = shade(C.skin, -.12);
    const arm = (sd, a, f, front) => { const sx = sd * tW * .44, ex = sx + sd * Math.sin(a) * upA, ey = shY + Math.cos(a) * upA, hx = ex + sd * Math.sin(f + (sd > 0 ? wave : 0)) * foA, hy = ey + Math.cos(f + (sd > 0 ? wave : 0)) * foA;
      tube(sx, shY, ex, ey, armW, C.top); tube(ex, ey, hx, hy, armW * .9, C.overalls ? C.skin : C.top); ovalF(hx, hy, h * .06, h * .06, C.skin, { plane: 0 }); ovalF(hx - sd * h * .04, hy - h * .02, h * .025, h * .03, C.skin, { plane: 0 }); return [hx, hy]; };
    // back arm first when it crosses the body
    const crossL = P.fL < -1, crossR = P.fR < -1; if (!crossL) arm(-1, P.aL, P.fL); if (!crossR) arm(1, P.aR, P.fR);
    // torso
    F(() => { ctx.moveTo(-tW * .46, neckY + h * .02); ctx.quadraticCurveTo(-tW * .52, neckY, -tW * .3, neckY - h * .005); ctx.lineTo(tW * .3, neckY - h * .005); ctx.quadraticCurveTo(tW * .52, neckY, tW * .46, neckY + h * .02); ctx.lineTo(tW * .55, -h * .01); ctx.quadraticCurveTo(0, h * .02, -tW * .55, -h * .01); ctx.closePath(); }, C.top, [-tW * .55, neckY, tW * 1.1, tH]);
    if (C.vest) { polyF([[-tW * .46, neckY + h * .02], [-tW * .1, neckY + h * .02], [-tW * .02, -h * .02], [-tW * .55, -h * .01]], C.vest, { plane: 0 }); polyF([[tW * .46, neckY + h * .02], [tW * .1, neckY + h * .02], [tW * .02, -h * .02], [tW * .55, -h * .01]], shade(C.vest, -.12), { plane: 0 }); [0, 1, 2].forEach(k => circ(-tW * .06, neckY + tH * (.3 + k * .22), h * .01, '#F4D58D', 0)); }
    if (C.hood) { ovalF(0, neckY + h * .01, tW * .32, h * .035, shade(C.top, -.1), { plane: 0 }); line(-tW * .08, neckY + h * .02, -tW * .1, neckY + tH * .35, h * .008, '#FFFFFF'); line(tW * .08, neckY + h * .02, tW * .1, neckY + tH * .35, h * .008, '#FFFFFF'); rectF(-tW * .28, neckY + tH * .6, tW * .56, tH * .22, h * .02, shade(C.top, -.08), { plane: 0 }); }
    if (C.overalls) { rectF(-tW * .3, neckY + tH * .38, tW * .6, tH * .62, h * .02, C.overalls); tube(-tW * .26, neckY + h * .01, -tW * .24, neckY + tH * .42, h * .03, C.overalls); tube(tW * .26, neckY + h * .01, tW * .24, neckY + tH * .42, h * .03, C.overalls); circ(-tW * .22, neckY + tH * .45, h * .012, '#FFC93C', 0); circ(tW * .22, neckY + tH * .45, h * .012, '#FFC93C', 0); }
    if (crossL) arm(-1, P.aL, P.fL); if (crossR) arm(1, P.aR, P.fR);
    if (o.item) o.item(0, neckY + tH * .55, h);
    // head (follows through: the head pose lags the body)
    ctx.save(); ctx.translate(0, neckY - h * .005); ctx.rotate(Ph.tilt - P.lean * .5); const hy = -rh * 1.02, turn = clamp((Fc.look || [0])[0] * .35, -.3, .3);
    rectF(-h * .045, -h * .04, h * .09, h * .06, h * .02, skinD, { plane: 0 });
    headDraw(C, 0, hy, rh, Fc, lt, turn, seed);
    ctx.restore(); ctx.restore(); ctx.restore(); }

  function headDraw(C, x, y, r, Fc, lt, turn, seed) { const sk = C.skin, skD = shade(sk, -.13), u = U(), hw = C.head === 'square' ? r * 1.0 : r * .95, hh = C.head === 'long' ? r * 1.12 : r;
    // back hair / scarf
    if (C.hair === 'hijab') { F(() => { ctx.ellipse(x, y + r * .05, r * 1.18, r * 1.25, 0, 0, TAU); ctx.moveTo(x - r * 1.1, y + r * .3); ctx.quadraticCurveTo(x - r * 1.3, y + r * 1.5, x - r * .2, y + r * 1.55); ctx.lineTo(x + r * .9, y + r * 1.4); ctx.quadraticCurveTo(x + r * 1.25, y + r * .6, x + r * 1.1, y + r * .3); }, C.hairCol, [x - r * 1.3, y - r * 1.3, r * 2.6, r * 2.9]); }
    if (C.hair === 'braids') [-1, 1].forEach(sd => { for (let k = 0; k < 5; k++) ovalF(x + sd * r * (1.02 + k * .03), y + r * (.15 + k * .3), r * .2, r * .17, C.hairCol, { plane: .5 }); circ(x + sd * r * 1.15, y + r * 1.62, r * .1, '#FF8FA3', 0); });
    if (C.hair === 'bun') ovalF(x + r * .15, y - r * 1.12, r * .42, r * .38, C.hairCol, { plane: .55 });
    // ears + face
    if (C.hair !== 'hijab') [-1, 1].forEach(sd => ovalF(x + sd * hw * .98, y + r * .1, r * .17, r * .2, sd > 0 ? skD : sk, { plane: 0 }));
    const HO = { plane: .8, dark: -.07 }; if (C.hair === 'hijab') ovalF(x + turn * r * .2, y + r * .1, r * .78, r * .88, sk, HO); else if (C.head === 'square') rectF(x - hw, y - hh, hw * 2, hh * 2, r * .62, sk, HO); else ovalF(x, y, hw, hh, sk, HO);
    // front hair / hats
    if (C.hair === 'bun') F(() => { ctx.moveTo(x - hw * 1.02, y + r * .05); ctx.bezierCurveTo(x - hw * 1.05, y - r * 1.2, x + hw * 1.05, y - r * 1.25, x + hw * 1.02, y - r * .05); ctx.quadraticCurveTo(x + r * .3, y - r * .55, x - r * .2, y - r * .5); ctx.quadraticCurveTo(x - r * .6, y - r * .45, x - hw * 1.02, y + r * .05); }, C.hairCol, [x - hw, y - r * 1.2, hw * 2, r * 1.2]);
    if (C.hair === 'braids') F(() => { ctx.moveTo(x - hw * 1.04, y + r * .2); ctx.bezierCurveTo(x - hw * 1.1, y - r * 1.25, x + hw * 1.1, y - r * 1.25, x + hw * 1.04, y + r * .2); ctx.quadraticCurveTo(x + r * .5, y - r * .45, x, y - r * .62); ctx.quadraticCurveTo(x - r * .5, y - r * .45, x - hw * 1.04, y + r * .2); }, C.hairCol, [x - hw, y - r * 1.2, hw * 2, r * 1.4]);
    if (C.hair === 'bald') { [-1, 1].forEach(sd => ovalF(x + sd * hw * .9, y - r * .05, r * .2, r * .35, C.hairCol, { plane: 0 })); ctx.save(); ctx.globalAlpha = .25; ell(x - r * .3, y - r * .62, r * .25, r * .1, '#FFFFFF', 0, -.3); ctx.restore(); }
    if (C.hair === 'beanie') { F(() => { ctx.moveTo(x - hw * 1.06, y - r * .25); ctx.bezierCurveTo(x - hw, y - r * 1.5, x + hw, y - r * 1.5, x + hw * 1.06, y - r * .25); ctx.closePath(); }, C.hairCol, [x - hw, y - r * 1.4, hw * 2, r * 1.2]); rectF(x - hw * 1.1, y - r * .45, hw * 2.2, r * .3, r * .15, shade(C.hairCol, -.12), { plane: 0 }); ovalF(x + r * .1, y - r * 1.3, r * .18, r * .16, '#FFFFFF', { plane: .5 }); }
    if (C.hair === 'spiky') { for (let k = -2; k <= 2; k++) polyF([[x + k * r * .32 - r * .2, y - r * .55], [x + k * r * .36 + r * .05, y - r * 1.2 - Math.abs(k) * -.05 * r], [x + k * r * .32 + r * .2, y - r * .55]], C.hairCol, { plane: 0 });
      F(() => { ctx.moveTo(x - hw * 1.04, y - r * .35); ctx.bezierCurveTo(x - hw, y - r * 1.25, x + hw, y - r * 1.25, x + hw * 1.04, y - r * .35); ctx.closePath(); }, C.capCol, [x - hw, y - r * 1.2, hw * 2, r * .9]); rectF(x - hw * 1.35, y - r * .5, r * .55, r * .18, r * .09, shade(C.capCol, -.15), { plane: 0 }); circ(x, y - r * 1.12, r * .06, shade(C.capCol, -.2), 0); }
    // beard under the mouth
    if (C.facial === 'beard') F(() => { ctx.moveTo(x - hw * .98, y + r * .05); ctx.quadraticCurveTo(x - hw, y + r * 1.25, x, y + r * 1.3); ctx.quadraticCurveTo(x + hw, y + r * 1.25, x + hw * .98, y + r * .05); ctx.quadraticCurveTo(x + r * .4, y + r * .45, x, y + r * .4); ctx.quadraticCurveTo(x - r * .4, y + r * .45, x - hw * .98, y + r * .05); }, C.beardCol, [x - hw, y, hw * 2, r * 1.3]);
    // freckles, cheeks
    if (C.freckles) [-1, 1].forEach(sd => { for (let k = 0; k < 3; k++) circ(x + sd * r * (.45 + k * .08) + turn * r * .2, y + r * (.22 + (k % 2) * .06), r * .025, shade(sk, -.25), 0); });
    // eyes
    const big = Fc.big || 1, ex = r * .38 * (big > 1 ? 1.08 : 1), ey = y - r * .02 - (big - 1) * r * .12, rx = r * .23 * big, ry = r * .3 * big, blink = ((lt + seed) % 3.7) < .12, look = Fc.look || [0, 0];
    [-1, 1].forEach(sd => { const cx = x + sd * ex + turn * r * .3, closed = Fc.closed || blink || (Fc.wink && sd > 0);
      if (closed) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = r * .07; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, ey + r * .06, rx * .85, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); ctx.restore(); return; }
      ctx.save(); ctx.beginPath(); ctx.ellipse(cx, ey, rx, ry, 0, 0, TAU); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.clip();
      const pr = ry * (Fc.small ? .38 : .55), px = cx + look[0] * rx * .4, py = ey + look[1] * ry * .35; circ(px, py, pr, INK, 0); circ(px - pr * .35, py - pr * .35, pr * .3, '#FFFFFF', 0);
      const lid = Fc.lid ?? .1; ctx.fillStyle = sk; ctx.fillRect(cx - rx * 1.2, ey - ry * 1.2, rx * 2.4, ry * 2.4 * lid + ry * .12); ctx.restore();
      ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = r * .075; ctx.lineCap = 'round'; ctx.beginPath(); const ly = ey - ry + ry * 2 * lid; ctx.moveTo(cx - rx * 1.05, ly + r * .02); ctx.quadraticCurveTo(cx, ly - r * .06 * (1 - lid), cx + rx * 1.05, ly + r * .02); ctx.stroke(); ctx.restore(); });
    // brows (they carry the emotion)
    [-1, 1].forEach(sd => { const raise = (sd < 0 ? Fc.browL : Fc.browR) ?? Fc.brow ?? 0, cx = x + sd * ex + turn * r * .3, by = ey - ry - r * .14 - raise * r * .35, ang = (Fc.inner ? -.35 : 0) * sd + (raise < 0 ? -raise * .8 * sd : -raise * .4 * sd);
      ctx.save(); ctx.translate(cx, by); ctx.rotate(ang); rr(-r * .19, -r * .055, r * .38, r * .11, r * .055, C.hair === 'bald' ? '#8E889C' : (C.hair === 'hijab' ? INK : shade(C.hairCol === '#2EC4B6' ? C.beardCol : C.hairCol, -.15)), 0); ctx.restore(); });
    // nose
    ovalF(x + turn * r * .45, y + r * .2, r * .11, r * .09, skD, { plane: 0 });
    // mouth
    const mx = x + turn * r * .35, my = y + r * .5, m = Fc.mouth || 'smile'; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = MOUTH; ctx.lineWidth = r * .07;
    if (Fc.tears) [-1, 1].forEach(sd => { const tx = x + sd * ex, k = (lt * 3) % 1; ctx.save(); ctx.globalAlpha = .9; tube(tx, ey + r * .1, tx + sd * r * .5, ey + r * .55, r * .14, '#7FD3FF'); for (let j = 0; j < 3; j++) { const q = (k + j / 3) % 1; ovalF(tx + sd * r * (.5 + q * .8), ey + r * (.55 + q * q * 1.4), r * .09, r * .11, '#7FD3FF', { plane: 0 }); } ctx.restore(); });
    if (m === 'drop') { const jw = r * .3, jh = r * .95; ctx.beginPath(); ctx.ellipse(mx, my + jh * .4, jw, jh * .55, 0, 0, TAU); ctx.fillStyle = MOUTH; ctx.fill(); ctx.save(); ctx.clip(); ell(mx, my + jh * .85, jw * .8, jh * .3, TONGUE, 0); rr(mx - jw * .75, my - jh * .18, jw * 1.5, r * .1, r * .03, '#FFFFFF', 0); ctx.restore(); } else
    if (m === 'open' || m === 'o') { const w = m === 'o' ? r * .13 : r * .26, hgt = m === 'o' ? r * .22 : r * .26; ctx.beginPath(); if (m === 'o') ctx.ellipse(mx, my + r * .02, w, hgt * .7, 0, 0, TAU); else { ctx.moveTo(mx - w, my - r * .04); ctx.quadraticCurveTo(mx, my - r * .08, mx + w, my - r * .04); ctx.quadraticCurveTo(mx + w * .8, my + hgt, mx, my + hgt); ctx.quadraticCurveTo(mx - w * .8, my + hgt, mx - w, my - r * .04); }
      ctx.fillStyle = MOUTH; ctx.fill(); ctx.save(); ctx.clip(); ell(mx, my + hgt * .85, w * .7, hgt * .4, TONGUE, 0); if (m === 'open') rr(mx - w * .7, my - r * .08, w * 1.4, r * .07, r * .02, '#FFFFFF', 0); ctx.restore(); }
    else if (m === 'smile') { ctx.beginPath(); ctx.arc(mx, my - r * .14, r * .22, .22 * Math.PI, .78 * Math.PI); ctx.stroke(); }
    else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(mx - r * .16, my + r * .02); ctx.quadraticCurveTo(mx + r * .05, my + r * .06, mx + r * .2, my - r * .07); ctx.stroke(); }
    else if (m === 'side') { ctx.beginPath(); ctx.moveTo(mx - r * .02, my + r * .02); ctx.lineTo(mx + r * .16, my - r * .01); ctx.stroke(); }
    else if (m === 'wobble') { ctx.beginPath(); ctx.moveTo(mx - r * .18, my + r * .03); for (let k = 1; k <= 4; k++) ctx.lineTo(mx - r * .18 + k * r * .09, my + r * .03 + (k % 2 ? -r * .04 : 0)); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(mx - r * .14, my + r * .02); ctx.lineTo(mx + r * .14, my + r * .02); ctx.stroke(); }
    ctx.restore();
    if (C.facial === 'mustache') F(() => { ctx.moveTo(mx - r * .38, my - r * .02); ctx.quadraticCurveTo(mx - r * .2, my - r * .26, mx, my - r * .14); ctx.quadraticCurveTo(mx + r * .2, my - r * .26, mx + r * .38, my - r * .02); ctx.quadraticCurveTo(mx + r * .2, my - r * .06, mx, my - r * .04); ctx.quadraticCurveTo(mx - r * .2, my - r * .06, mx - r * .38, my - r * .02); }, C.hairCol, [mx - r * .4, my - r * .3, r * .8, r * .3]);
    if (C.glasses) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = r * .06; [-1, 1].forEach(sd => { ctx.beginPath(); ctx.arc(x + sd * ex + turn * r * .3, ey, r * .27, 0, TAU); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(x - ex + r * .27 + turn * r * .3, ey); ctx.lineTo(x + ex - r * .27 + turn * r * .3, ey); ctx.stroke(); ctx.restore(); } }


  // ================================================================ IF CREW v3 — clean construction (owner, 7 Nov 2026: "careful, exact lines,
  // our own fixed style"). Rules: big head (≈ 43 % of the height), 3/4 view (features cluster toward the facing side, the far eye narrower,
  // the far ear shows), big eyes nearly touching with big pupils, flat lids, thick rounded brows, a bold nose, a wide asymmetric mouth;
  // flat colour + ONE hard shadow plane (no dots on people), tapered limbs, mitten hands, smooth curves only, a white sticker cut.
  const CHAR = '#34313F', CHEEK = 'rgba(255,120,120,.28)';
  function flat(path, col, box, sh = .1) { ctx.save(); ctx.beginPath(); path(); ctx.fillStyle = col; ctx.fill(); if (box && sh) { ctx.clip(); const [bx, by, bw, bh] = box, m = Math.min(bw, bh); ctx.fillStyle = shade(col, -sh); ctx.fillRect(bx - bw, by - bh, bw * 3, bh * 3); ctx.translate(-m * .16, -m * .1); ctx.beginPath(); path(); ctx.fillStyle = col; ctx.fill(); } ctx.restore(); }
  const fo = (x, y, rx, ry, col, sh, rot = 0) => flat(() => ctx.ellipse(x, y, rx, ry, rot, 0, TAU), col, [x - rx, y - ry, rx * 2, ry * 2], sh);
  // a tapered limb: a capsule from (x1,y1) width w1 to (x2,y2) width w2, with a darker underside
  function limb(x1, y1, x2, y2, w1, w2, col) { const a = Math.atan2(y2 - y1, x2 - x1), n = a + Math.PI / 2, p = (w, sx, sy, s) => [sx + Math.cos(n) * w / 2 * s, sy + Math.sin(n) * w / 2 * s];
    const path = () => { ctx.arc(x1, y1, w1 / 2, n, n + Math.PI); const q = p(w2, x2, y2, -1); ctx.lineTo(q[0], q[1]); ctx.arc(x2, y2, w2 / 2, n + Math.PI, n + TAU); ctx.closePath(); };
    flat(path, col, [Math.min(x1, x2) - w1, Math.min(y1, y2) - w1, Math.abs(x2 - x1) + w1 * 2, Math.abs(y2 - y1) + w1 * 2], .1); }
  function mitten(x, y, s, col, sd, ang) { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); fo(0, 0, s, s * 1.1, col, .08); fo(sd * s * .75, -s * .25, s * .38, s * .5, col, .08, sd * .5); ctx.restore(); }

  function head3(C, r, Fc, lt, t, seed) { const sk = C.skin, skD = shade(sk, -.1), dark = C.hairCol, hw = C.head === 'square' ? r * 1.0 : r * .94, hh = C.head === 'long' ? r * 1.1 : r * 1.0, fx = t * r * .3;
    const headPath = () => { if (C.head === 'square') ctx.roundRect(-hw, -hh, hw * 2, hh * 2, r * .7); else ctx.ellipse(0, 0, hw, hh, 0, 0, TAU); };
    const box = [-hw, -hh, hw * 2, hh * 2], back = t >= 0 ? -1 : 1;
    const hairTop = (col, a, b, mid = -.35, ext = 1.07) => { ctx.save(); ctx.beginPath(); ctx.moveTo(-r * 2, -r * 3); ctx.lineTo(r * 2, -r * 3); ctx.lineTo(r * 2, r * b); ctx.bezierCurveTo(r * .9, r * mid, -r * .5 + fx, r * (mid - .1), -r * 2, r * a); ctx.closePath(); ctx.clip(); flat(() => ctx.ellipse(-t * r * .05, -r * .06, hw * ext, hh * ext, 0, 0, TAU), col, box, .12); ctx.restore(); };
    const hairMass = (col, line, cx = -t * r * .06, cy = -r * .18, sx = 1.12, sy = .95) => { ctx.save(); ctx.beginPath(); ctx.moveTo(-r * 3, -r * 3); ctx.lineTo(r * 3, -r * 3); line(); ctx.closePath(); ctx.clip(); flat(() => ctx.ellipse(cx, cy, hw * sx, hh * sy, 0, 0, TAU), col, [cx - hw * sx, cy - hh * sy, hw * sx * 2, hh * sy * 2], .12); ctx.restore(); };
    const B = back; // the hairline runs from the back (covers to the ear) to a swoop over the front of the brow
    const swoop = (front = -.32, rear = .35) => { ctx.lineTo(r * 3 * -B * -1, r * rear); ctx.lineTo(B * r * 1.05, r * rear); ctx.bezierCurveTo(B * r * .7, r * .05, B * r * .1, -r * .2, fx + -B * r * .05, r * (front - .18)); ctx.bezierCurveTo(fx - B * r * .45, r * (front + .02), fx - B * r * .8, r * front, -B * r * 1.3, r * (front + .25)); ctx.lineTo(-B * r * 3, r * (front + .25)); };
    const part = (top = -.62, side = .25) => { ctx.lineTo(r * 3, r * side); ctx.lineTo(r * 1.05, r * side); ctx.bezierCurveTo(r * .9, -r * .2, fx + r * .4, r * top, fx + r * .02, r * top); ctx.bezierCurveTo(fx - r * .4, r * top, -r * .9, -r * .2, -r * 1.05, r * side); ctx.lineTo(-r * 3, r * side); };
    // behind the head
    if (C.hair === 'hijab') { flat(() => { ctx.moveTo(-r * 1.18, r * .2); ctx.quadraticCurveTo(-r * 1.3, r * 1.55, -r * .2, r * 1.85); ctx.quadraticCurveTo(r * .9, r * 1.95, r * 1.25, r * 1.2); ctx.lineTo(r * 1.18, r * .2); ctx.closePath(); }, shade(dark, -.06), [-r * 1.3, 0, r * 2.6, r * 1.9], .1); flat(() => ctx.ellipse(-t * r * .08, r * .05, r * 1.2, r * 1.24, 0, 0, TAU), dark, [-r * 1.2, -r * 1.2, r * 2.4, r * 2.5], .12); }
    if (C.hair === 'braids') [-1, 1].forEach(sd => { for (let k = 0; k < 4; k++) fo(sd * r * (1.0 + k * .02) - t * r * .1, r * (.35 + k * .34), r * .21, r * .19, dark, .12); fo(sd * r * 1.04 - t * r * .1, r * 1.72, r * .1, r * .1, '#FF8FA3', .1); });
    if (C.hair === 'bun') fo(back * r * .55, -r * 1.02, r * .44, r * .4, dark, .12);
    // the far ear (back of the head)
    if (C.hair !== 'hijab') { fo(back * hw * .92, r * .12, r * .2, r * .24, sk, .1); fo(back * hw * .95, r * .12, r * .09, r * .12, skD, 0); }
    // the face
    if (C.hair === 'hijab') { flat(() => ctx.ellipse(fx * .4, r * .12, r * .82, r * .9, 0, 0, TAU), sk, [-r * .8, -r * .8, r * 1.6, r * 1.8], .1); hairMass(dark, () => part(-.5, -.05), -t * r * .05, -r * .25, 1.2, .95); } else flat(headPath, sk, box, .09);
    // cheeks
    ctx.save(); ctx.fillStyle = CHEEK; [-1, 1].forEach(sd => { ctx.beginPath(); ctx.ellipse(fx + sd * r * .52 * (sd === Math.sign(t || 1) ? 1 : .8), r * .38, r * .16, r * .1, 0, 0, TAU); ctx.fill(); }); ctx.restore();
    if (C.freckles) [-1, 1].forEach(sd => { for (let k = 0; k < 3; k++) circ(fx + sd * r * (.42 + k * .09), r * (.3 + (k % 2) * .07), r * .03, shade(sk, -.28), 0); });
    // hair / hats on top
    if (C.hair === 'bun') { hairMass(dark, () => swoop(-.36, .4)); flat(() => { ctx.moveTo(B * r * .5, -r * .95); ctx.quadraticCurveTo(fx, -r * .75, fx - B * r * .7, -r * .42); ctx.quadraticCurveTo(fx - B * r * .1, -r * .82, B * r * .5, -r * .95); }, shade(dark, .1), null, 0); }
    if (C.hair === 'braids') hairMass(dark, () => part(-.55, .3), -t * r * .04, -r * .12, 1.1, 1.0);
    if (C.hair === 'bald') { [-1, 1].forEach(sd => fo(sd * hw * .9, -r * .05, r * .22, r * .38, C.hairCol, .1)); ctx.save(); ctx.globalAlpha = .3; ell(-r * .35, -r * .6, r * .24, r * .1, '#FFFFFF', 0, -.4); ctx.restore(); }
    if (C.hair === 'beanie') { flat(() => { ctx.moveTo(-hw * 1.08, -r * .3); ctx.bezierCurveTo(-hw * 1.05, -r * 1.55, hw * 1.05, -r * 1.55, hw * 1.08, -r * .3); ctx.closePath(); }, dark, [-hw, -r * 1.5, hw * 2, r * 1.2], .12); flat(() => ctx.roundRect(-hw * 1.12, -r * .5, hw * 2.24, r * .34, r * .17), shade(dark, -.1), null, 0); fo(-t * r * .1, -r * 1.42, r * .2, r * .18, '#FFFFFF', .08); }
    if (C.hair === 'spiky') { for (let k = -2; k <= 2; k++) flat(() => { ctx.moveTo(fx + k * r * .3 - r * .2, -r * .5); ctx.quadraticCurveTo(fx + k * r * .34 + r * .15, -r * .95, fx + k * r * .38 + r * .1, -r * 1.22); ctx.quadraticCurveTo(fx + k * r * .3 + r * .1, -r * .8, fx + k * r * .3 + r * .25, -r * .5); }, dark, null, 0);
      flat(() => { ctx.moveTo(-hw * 1.06, -r * .35); ctx.bezierCurveTo(-hw * 1.02, -r * 1.3, hw * 1.02, -r * 1.3, hw * 1.06, -r * .35); ctx.closePath(); }, C.capCol, [-hw, -r * 1.25, hw * 2, r * .95], .12); flat(() => ctx.roundRect(back > 0 ? hw * .5 : -hw * 1.5, -r * .52, hw, r * .2, r * .1), shade(C.capCol, -.15), null, 0); }
    // beard under the features
    if (C.facial === 'beard') flat(() => { ctx.moveTo(-hw, r * .0); ctx.bezierCurveTo(-hw * 1.02, r * 1.45, hw * 1.02, r * 1.45, hw, r * .0); ctx.bezierCurveTo(hw * .6, r * .45, fx + r * .3, r * .35, fx, r * .38); ctx.bezierCurveTo(fx - r * .3, r * .35, -hw * .6, r * .45, -hw, r * .0); }, C.beardCol, [-hw, 0, hw * 2, r * 1.4], .12);
    // eyes: big, close together, near eye fuller
    const big = Fc.big || 1, look = Fc.look || [0, 0], blink = ((lt + seed) % 3.9) < .11, ey = -r * .02 - (big - 1) * r * .1;
    [-1, 1].forEach(sd => { const near = sd === Math.sign(t || 1), ex = fx + sd * r * .25 * (near ? 1.05 : .92), rx = r * .23 * big * (near ? 1 : 1 - Math.abs(t) * .28), ry = r * .29 * big, closed = Fc.closed || blink || (Fc.wink && near);
      if (closed) { ctx.save(); ctx.strokeStyle = CHAR; ctx.lineWidth = r * .085; ctx.lineCap = 'round'; ctx.beginPath(); if (Fc.closed && Fc.mouth === 'open') ctx.arc(ex, ey + r * .08, rx * .8, Math.PI * 1.15, Math.PI * 1.85); else ctx.arc(ex, ey - r * .02, rx * .8, Math.PI * .15, Math.PI * .85); ctx.stroke(); ctx.restore(); return; }
      ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, 0, 0, TAU); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.clip();
      const pr = ry * (Fc.small ? .36 : .6), px = ex + (look[0] + t * .35) * rx * .42, py = ey + look[1] * ry * .4 + ry * .08; circ(px, py, pr, CHAR, 0); circ(px - pr * .3, py - pr * .35, pr * .3, '#FFFFFF', 0);
      const lid = Fc.lid ?? .12; if (lid > .02) { ctx.fillStyle = skD; ctx.beginPath(); ctx.rect(ex - rx * 1.3, ey - ry * 1.3, rx * 2.6, ry * .3 + ry * 2 * lid); ctx.fill(); }
      ctx.restore(); });
    // brows
    [-1, 1].forEach(sd => { const near = sd === Math.sign(t || 1), raise = (sd < 0 ? Fc.browL : Fc.browR) ?? Fc.brow ?? 0, bx = fx + sd * r * .27, by = ey - r * .29 * big - r * .2 - raise * r * .32, ang = (Fc.inner ? -.4 : 0) * sd + (raise < 0 ? -raise * .9 * sd : -raise * .45 * sd);
      ctx.save(); ctx.translate(bx, by); ctx.rotate(ang); rr(-r * .19 * (near ? 1 : .8), -r * .065, r * .38 * (near ? 1 : .8), r * .13, r * .065, C.hair === 'bald' ? '#8E889C' : (C.browCol || (C.hair === 'hijab' || C.hair === 'beanie' || C.hair === 'spiky' ? CHAR : shade(dark, -.1))), 0); ctx.restore(); });
    // glasses
    if (C.glasses) { ctx.save(); ctx.strokeStyle = CHAR; ctx.lineWidth = r * .07; [-1, 1].forEach(sd => { const near = sd === Math.sign(t || 1); ctx.beginPath(); ctx.ellipse(fx + sd * r * .25 * (near ? 1.05 : .92), ey, r * .3 * (near ? 1 : .8), r * .3, 0, 0, TAU); ctx.stroke(); }); ctx.restore(); }
    // the nose: bold, toward the facing side
    const nx = fx + t * r * .2; flat(() => { ctx.ellipse(nx, r * .22, r * .17, r * .14, 0, 0, TAU); }, shade(sk, -.04), [nx - r * .17, r * .08, r * .34, r * .28], .12);
    // the mouth: wide, asymmetric, under the nose
    const mx = fx + t * r * .1, my = r * .55, m = Fc.mouth || 'smile'; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = MOUTH; ctx.lineWidth = r * .085;
    const cavity = (path, hgt) => { ctx.beginPath(); path(); ctx.fillStyle = MOUTH; ctx.fill(); ctx.save(); ctx.clip(); ell(mx + t * r * .05, my + hgt * .9, r * .2, hgt * .45, TONGUE, 0); rr(mx - r * .32, my - r * .1, r * .64, hgt * .26, r * .03, '#FFFFFF', 0); ctx.restore(); };
    if (m === 'open') cavity(() => { ctx.moveTo(mx - r * .3, my - r * .04); ctx.quadraticCurveTo(mx, my - r * .1, mx + r * .32, my - r * .06); ctx.bezierCurveTo(mx + r * .3, my + r * .3, mx - r * .25, my + r * .34, mx - r * .3, my - r * .04); }, r * .3);
    else if (m === 'o') cavity(() => ctx.ellipse(mx, my + r * .06, r * .12, r * .17, 0, 0, TAU), r * .2);
    else if (m === 'drop') cavity(() => ctx.ellipse(mx, my + r * .35, r * .26, r * .5, 0, 0, TAU), r * .8);
    else if (m === 'smile') { ctx.beginPath(); ctx.moveTo(mx - r * .26, my - r * .02); ctx.quadraticCurveTo(mx, my + r * .2, mx + r * .3, my - r * .08); ctx.stroke(); }
    else if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(mx - r * .18, my + r * .04); ctx.quadraticCurveTo(mx + r * .1, my + r * .08, mx + r * .26, my - r * .1); ctx.stroke(); }
    else if (m === 'side') { ctx.beginPath(); ctx.moveTo(mx, my + r * .04); ctx.lineTo(mx + r * .2, my); ctx.stroke(); }
    else if (m === 'wobble') { ctx.beginPath(); ctx.moveTo(mx - r * .22, my + r * .05); for (let k = 1; k <= 4; k++) ctx.lineTo(mx - r * .22 + k * r * .11, my + r * .05 + (k % 2 ? -r * .05 : 0)); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(mx - r * .17, my + r * .03); ctx.lineTo(mx + r * .17, my + r * .01); ctx.stroke(); }
    ctx.restore();
    if (Fc.tears) [-1, 1].forEach(sd => { const tx = fx + sd * r * .27, k = (lt * 3) % 1; tube(tx, ey + r * .15, tx + sd * r * .55, ey + r * .6, r * .15, '#7FD3FF'); for (let j = 0; j < 3; j++) { const q = (k + j / 3) % 1; fo(tx + sd * r * (.55 + q * .8), ey + r * (.6 + q * q * 1.4), r * .09, r * .11, '#7FD3FF', 0); } });
    if (C.facial === 'mustache') flat(() => { ctx.moveTo(mx - r * .44, my); ctx.bezierCurveTo(mx - r * .3, my - r * .32, mx - r * .05, my - r * .25, mx, my - r * .14); ctx.bezierCurveTo(mx + r * .05, my - r * .25, mx + r * .3, my - r * .32, mx + r * .46, my - r * .02); ctx.quadraticCurveTo(mx + r * .2, my - r * .06, mx, my - r * .04); ctx.quadraticCurveTo(mx - r * .2, my - r * .06, mx - r * .44, my); }, C.hairCol, [mx - r * .45, my - r * .32, r * .9, r * .32], .12);
  }

  function draw(name, x, y, h, lt, o = {}) { if (o.sticker !== 0 && !draw._in) { draw._in = 1; try { sticker(() => draw(name, x, y, h, lt, o)); } finally { draw._in = 0; } return; }
    if (o.v2) return drawV2(name, x, y, h, lt, o);
    const C = CAST[name] || CAST.bun, keys = o.keys || [[0, o.pose || 'idle', o.expr || 'happy']], b = C.build || 1, P = poseAt(keys, lt), Ph = poseAt(keys, lt, .09), Fc = faceAt(keys, lt), seed = name.length * 1.7;
    const breath = Math.sin(lt * 2.1 + seed) * .012, wave = keys.some(k => k[1] === 'wave') && P.aR > 2 ? Math.sin(lt * 9) * .35 : 0, t = o.turn ?? .42;
    const r = h * .2, legL = h * .15, tH = h * .27, tW = h * .3 * b; ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
    ctx.save(); ctx.globalAlpha = .16; ell(0, 0, h * .24 * b, h * .035, '#1B1530', 0); ctx.restore();
    // legs: short, slightly apart; rounded shoes pointing toward the facing side
    [-1, 1].forEach(sd => { limb(sd * tW * .2, -legL - h * .02, sd * tW * .22, -h * .05, h * .1, h * .085, C.pants); flat(() => ctx.roundRect(sd * tW * .22 - h * .06 + h * .02, -h * .075, h * .14, h * .075, h * .037), C.shoes, [sd * tW * .22 - h * .05, -h * .075, h * .14, h * .075], .14); });
    ctx.save(); ctx.translate(0, -legL); ctx.rotate(P.lean); ctx.scale(1, 1 + (P.sq || 0) + breath);
    const neckY = -tH, shY = neckY + h * .05, upA = h * .13, foA = h * .12;
    const arm = sd => { const a = sd < 0 ? P.aL : P.aR, f = (sd < 0 ? P.fL : P.fR) + (sd > 0 ? wave : 0), sx = sd * tW * .42, ex = sx + sd * Math.sin(a) * upA, ey = shY + Math.cos(a) * upA, hx = ex + sd * Math.sin(f) * foA, hy = ey + Math.cos(f) * foA;
      limb(sx, shY, ex, ey, h * .095, h * .08, C.top); limb(ex, ey, hx, hy, h * .08, h * .066, C.overalls ? C.skin : C.top); mitten(hx, hy, h * .045, C.skin, sd, Math.atan2(hy - ey, hx - ex) - Math.PI / 2); };
    const crossL = P.fL < -1, crossR = P.fR < -1; if (!crossL) arm(-1); if (!crossR) arm(1);
    // torso: a soft trapezoid, wider at the hem
    const torso = () => { ctx.moveTo(-tW * .42, neckY + h * .01); ctx.quadraticCurveTo(0, neckY - h * .025, tW * .42, neckY + h * .01); ctx.quadraticCurveTo(tW * .56, neckY + tH * .4, tW * .54, -h * .005); ctx.quadraticCurveTo(0, h * .025, -tW * .54, -h * .005); ctx.quadraticCurveTo(-tW * .56, neckY + tH * .4, -tW * .42, neckY + h * .01); ctx.closePath(); };
    flat(torso, C.top, [-tW * .56, neckY, tW * 1.12, tH], .1);
    if (C.vest) { flat(() => { ctx.moveTo(-tW * .42, neckY + h * .01); ctx.lineTo(-tW * .08, neckY + h * .02); ctx.lineTo(-tW * .02, -h * .01); ctx.quadraticCurveTo(-tW * .3, h * .015, -tW * .54, -h * .005); ctx.quadraticCurveTo(-tW * .56, neckY + tH * .4, -tW * .42, neckY + h * .01); }, C.vest, null, 0); flat(() => { ctx.moveTo(tW * .42, neckY + h * .01); ctx.lineTo(tW * .08, neckY + h * .02); ctx.lineTo(tW * .02, -h * .01); ctx.quadraticCurveTo(tW * .3, h * .015, tW * .54, -h * .005); ctx.quadraticCurveTo(tW * .56, neckY + tH * .4, tW * .42, neckY + h * .01); }, shade(C.vest, -.1), null, 0); }
    if (C.hood) { fo(0, neckY + h * .015, tW * .3, h * .035, shade(C.top, -.1), 0); rr(-tW * .26, neckY + tH * .58, tW * .52, tH * .24, h * .03, shade(C.top, -.07), 0); }
    if (C.overalls) { flat(() => ctx.roundRect(-tW * .3, neckY + tH * .36, tW * .6, tH * .66, h * .03), C.overalls, [-tW * .3, neckY + tH * .36, tW * .6, tH * .66], .1); [-1, 1].forEach(sd => { limb(sd * tW * .26, neckY + h * .01, sd * tW * .24, neckY + tH * .42, h * .03, h * .03, C.overalls); circ(sd * tW * .22, neckY + tH * .45, h * .013, '#FFC93C', 0); }); }
    if (crossL) arm(-1); if (crossR) arm(1);
    if (o.item) o.item(0, neckY + tH * .55, h);
    // neck + head (the head lags the body)
    flat(() => ctx.roundRect(-h * .04, neckY - h * .04, h * .08, h * .06, h * .02), shade(C.skin, -.12), null, 0);
    ctx.save(); ctx.translate(0, neckY - r * .86); ctx.rotate(Ph.tilt - P.lean * .5); head3(C, r, Fc, lt, t, seed); ctx.restore();
    ctx.restore(); ctx.restore(); }
  // ---------------------------------------------------------------- the mascot: IFFY, a small floating machine with a screen face and the if-spark
  function iffy(x, y, s, lt, o = {}) { const b = Math.sin(lt * 2) * s * .05, tl = Math.sin(lt * 1.3) * .08; ctx.save(); ctx.translate(x, y + b); ctx.rotate(tl); ctx.save(); ctx.globalAlpha = .14; ell(0, s * .9 - b, s * .4, s * .06, '#1B1530', 0); ctx.restore();
    [-1, 1].forEach(sd => { tube(sd * s * .46, s * .05, sd * s * .7, s * (.2 + Math.sin(lt * 4 + sd) * .06), s * .1, '#2AB39A'); ovalF(sd * s * .72, s * (.22 + Math.sin(lt * 4 + sd) * .06), s * .08, s * .08, '#FFC93C', { plane: .5 }); });
    rectF(-s * .5, -s * .45, s, s * .85, s * .28, '#3ED6B5'); rectF(-s * .38, -s * .33, s * .76, s * .5, s * .16, '#1F2A44', { plane: 0 });
    const blink = (lt % 4) < .12; [-1, 1].forEach(sd => { if (blink) rr(sd * s * .15 - s * .06, -s * .1, s * .12, s * .03, s * .015, '#7FF5DD', 0); else rr(sd * s * .15 - s * .045, -s * .2, s * .09, s * .18, s * .045, '#7FF5DD', 0); });
    ctx.save(); ctx.strokeStyle = '#7FF5DD'; ctx.lineWidth = s * .035; ctx.lineCap = 'round'; ctx.beginPath(); if (o.expr === 'shock') ctx.arc(0, s * .06, s * .045, 0, TAU); else ctx.arc(0, s * .0, s * .09, .25 * Math.PI, .75 * Math.PI); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle = '#1F2A44'; ctx.lineWidth = s * .03; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -s * .45); ctx.bezierCurveTo(s * .1, -s * .6, -s * .1, -s * .68, Math.sin(lt * 3) * s * .05, -s * .78); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(Math.sin(lt * 3) * s * .05, -s * .84); ctx.rotate(lt); ctx.fillStyle = o.expr === 'shock' ? '#FF6B8B' : '#FFC93C'; ctx.beginPath(); for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, rr2 = k % 2 ? s * .04 : s * .1; ctx.lineTo(Math.cos(a) * rr2, Math.sin(a) * rr2); } ctx.closePath(); ctx.fill(); ctx.restore(); ctx.restore(); }

  // ---------------------------------------------------------------- props, same flat language
  const coin = (x, y, r, lt, rot = 0) => { const sx = Math.cos(lt * 2 + x); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(Math.max(.15, Math.abs(sx)), 1); ovalF(0, r * .12, r, r, '#D9961F', { plane: 0 }); ovalF(0, 0, r, r, '#FFC93C', { plane: .62 }); ovalF(0, 0, r * .68, r * .68, '#FFD966', { plane: .62, hi: 0 }); ctx.restore(); };
  const note = (x, y, w, rot = 0) => { const h = w * .5; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rectF(-w / 2, -h / 2, w, h, h * .14, '#7BD389', { plane: .62 }); ovalF(0, 0, h * .26, h * .26, '#B8EFC4', { plane: 0 }); rr(-w * .4, -h * .32, w * .14, h * .1, h * .05, '#B8EFC4', 0); ctx.restore(); };
  function cow(x, y, s, lt) { const b = Math.sin(lt * 1.5) * s * .008, hd = Math.sin(lt * .9) * .06; ctx.save(); ctx.translate(x, y); ctx.save(); ctx.globalAlpha = .16; ell(0, 0, s * .5, s * .06, '#1B1530', 0); ctx.restore();
    [-.32, -.16, .16, .3].forEach(l => { rectF(s * l - s * .05, -s * .32, s * .1, s * .3, s * .04, '#EDE8DF', { plane: .6 }); rectF(s * l - s * .055, -s * .06, s * .11, s * .06, s * .02, '#4A3B32', { plane: 0 }); });
    rectF(-s * .5, -s * .62 + b, s * .95, s * .36, s * .16, '#F8F6F2'); ctx.save(); ctx.beginPath(); ctx.roundRect(-s * .5, -s * .62 + b, s * .95, s * .36, s * .16); ctx.clip(); [[-.28, -.55, .14], [.0, -.36, .12], [.22, -.58, .09]].forEach(([sx, sy, r]) => ovalF(s * sx, s * sy + b, s * r * 1.3, s * r, '#2F2A3A', { plane: 0 })); ctx.restore();
    ctx.save(); ctx.translate(s * .48, -s * .62 + b); ctx.rotate(hd); polyF([[-s * .02, -s * .12], [s * .02, -s * .24], [s * .07, -s * .11]], '#F4D58D', { plane: 0 }); polyF([[s * .2, -s * .12], [s * .26, -s * .24], [s * .29, -s * .1]], '#F4D58D', { plane: 0 });
    ovalF(-s * .06, -s * .04, s * .1, s * .05, '#EDE8DF', { plane: 0, rot: -.4 }); rectF(-s * .02, -s * .16, s * .3, s * .34, s * .13, '#F8F6F2'); rectF(s * .0, s * .06, s * .3, s * .14, s * .07, '#FFB3C1', { plane: .6 }); circ(s * .1, s * .13, s * .018, '#7A1F2B', 0); circ(s * .2, s * .13, s * .018, '#7A1F2B', 0);
    [s * .07, s * .2].forEach(ex => { ell(ex, -s * .04, s * .045, s * .055, '#FFFFFF', 0); circ(ex + s * .01, -s * .03, s * .028, INK, 0); line(ex - s * .045, -s * .085, ex + s * .045, -s * .085, s * .018, INK); }); ctx.restore(); ctx.restore(); }
  const sack = (x, y, s) => { polyF([[x - s * .3, y], [x - s * .38, y - s * .42], [x - s * .14, y - s * .7], [x + s * .14, y - s * .7], [x + s * .38, y - s * .42], [x + s * .3, y]], '#E6C98F'); ovalF(x, y - s * .74, s * .18, s * .07, '#F5E6B8', { plane: 0 }); rr(x - s * .12, y - s * .7, s * .24, s * .05, s * .02, '#B08A4E', 0); };
  const shoe = (x, y, s) => { polyF([[x - s * .5, y], [x - s * .5, y - s * .35], [x - s * .05, y - s * .25], [x + s * .5, y - s * .1], [x + s * .5, y]], '#5BC0EB'); rr(x - s * .52, y - s * .05, s * 1.04, s * .1, s * .05, '#FFFFFF', 0); };
  function bubble(x, y, w, h, tx, ty) { rectF(x - w / 2, y - h / 2, w, h, h * .45, '#FFFFFF', { plane: .75, dark: -.05 }); ovalF(lerp(x, tx, .55), lerp(y + h / 2, ty, .55), h * .1, h * .1, '#FFFFFF', { plane: 0 }); ovalF(lerp(x, tx, .8), lerp(y + h / 2, ty, .8), h * .06, h * .06, '#FFFFFF', { plane: 0 }); }
  function building(x, yb, w, h, col) { rectF(x, yb - h, w, h + 40, w * .1, col, { plane: .66 }); for (let r = 0; r < Math.floor(h / (w * .36)); r++) for (let c = 0; c < 2; c++) rectF(x + w * (.16 + c * .4), yb - h + w * .2 + r * w * .36, w * .26, w * .22, w * .05, ((r + c) % 3) ? '#FFF1C9' : shade(col, -.2), { plane: 0 }); }
  function shop(x, yb, w, h) { rectF(x, yb - h, w, h + 20, w * .05, '#C9B6FF', { plane: .66 }); for (let i = 0; i < 5; i++) F(() => { ctx.moveTo(x + i * w / 5, yb - h); ctx.lineTo(x + (i + 1) * w / 5, yb - h); ctx.lineTo(x + (i + 1) * w / 5, yb - h + h * .12); ctx.arc(x + (i + .5) * w / 5, yb - h + h * .12, w / 10, 0, Math.PI); ctx.closePath(); }, i % 2 ? '#FFFFFF' : '#FF7A45', [x + i * w / 5, yb - h, w / 5, h * .22], { plane: 0 });
    rectF(x + w * .36, yb - h * .5, w * .28, h * .5 + 20, w * .04, '#6A4FC9'); rectF(x + w * .16, yb - h * .82, w * .68, h * .18, h * .06, '#FFC93C', { plane: .7 }); ctx.save(); ctx.fillStyle = INK; ctx.font = `400 ${h * .13}px "Paytone One"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('FREE', x + w / 2, yb - h * .73); ctx.restore(); }
  function clock(x, y, r, lt) { ovalF(x, y, r * 1.1, r * 1.1, '#FF6B8B'); ovalF(x, y, r * .86, r * .86, '#FFFFFF', { plane: 0 }); ctx.save(); ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineWidth = r * .1; const m = lt * 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(m) * r * .62, y - Math.cos(m) * r * .62); ctx.stroke(); ctx.lineWidth = r * .13; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(m / 12) * r * .4, y - Math.cos(m / 12) * r * .4); ctx.stroke(); ctx.restore(); circ(x, y, r * .08, '#FF6B8B', 0); }

  // ---------------------------------------------------------------- background + type
  function burst(c1, c2, cx = .5, cy = .45) { ctx.drawImage(cache('cb' + c1 + c2 + cx + cy, () => { const g = ctx.createRadialGradient(W * cx, H * cy, 0, W * cx, H * cy, H * .8); g.addColorStop(0, c2); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.fillStyle = 'rgba(255,255,255,.12)'; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(W * cx, H * cy); ctx.arc(W * cx, H * cy, H * 1.2, i * TAU / 12, i * TAU / 12 + TAU / 26); ctx.closePath(); ctx.fill(); } }), 0, 0); }
  function sparkle(x, y, s, lt, k) { const a = .6 + .4 * Math.sin(lt * 2 + k); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#FFFFFF'; ctx.translate(x, y); ctx.beginPath(); ctx.moveTo(0, -s); ctx.quadraticCurveTo(0, 0, s, 0); ctx.quadraticCurveTo(0, 0, 0, s); ctx.quadraticCurveTo(0, 0, -s, 0); ctx.quadraticCurveTo(0, 0, 0, -s); ctx.fill(); ctx.restore(); }
  function title(lines, hi, kick, dark) { const u = U(); let s = 96 * u; ctx.save(); lines.forEach(l => { ctx.font = `400 ${s}px "Paytone One"`; s = Math.min(s, s * W * .86 / ctx.measureText(l).width); }); if (kick) { ctx.font = `700 ${26 * u}px "Space Mono", monospace`; ctx.textAlign = 'center'; ctx.fillStyle = dark ? '#FFFFFF' : INK; ctx.globalAlpha = .8; ctx.fillText(kick, W / 2, H * .085); ctx.globalAlpha = 1; }
    lines.forEach((l, i) => { const y = H * .155 + i * s * 1.02; ctx.font = `400 ${s}px "Paytone One"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'rgba(38,35,58,.25)'; ctx.fillText(l, W / 2, y + 6 * u); ctx.fillStyle = i === hi ? '#FFFFFF' : (dark ? '#FFF4E2' : INK); if (i === hi) { ctx.lineJoin = 'round'; ctx.lineWidth = 14 * u; ctx.strokeStyle = '#FF5A36'; ctx.strokeText(l, W / 2, y); } ctx.fillText(l, W / 2, y); }); ctx.restore(); }
  function floor(col) { const gy = H * .68; rectF(-20, gy, W + 40, H * .4, col, { plane: 0 }); ctx.save(); ctx.fillStyle = shade(col, -.08); ctx.beginPath(); ctx.ellipse(W / 2, gy + H * .02, W * .6, H * .03, 0, 0, TAU); ctx.fill(); ctx.restore(); }

  // ---------------------------------------------------------------- ENVIRONMENTS in the same language (layered: far haze → mid detail → actors → dark foreground)
  const haze = (col, a) => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.restore(); };
  function sky(top, bot, key) { ctx.drawImage(cache('sky' + key + top + bot, () => { const g = ctx.createLinearGradient(0, 0, 0, H * .7); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }), 0, 0); }
  function cloud(x, y, s, col = '#FFFFFF') { [[-.5, .05, .32], [-.15, -.12, .42], [.25, -.05, .36], [.55, .08, .26]].forEach(([dx, dy, r]) => ovalF(x + dx * s, y + dy * s, r * s, r * s * .9, col, { depth: .08, hi: 0, dots: 0 })); rectF(x - .75 * s, y + .02 * s, 1.5 * s, .3 * s, .15 * s, col, { plane: 0 }); }
  function tree(x, yb, s, col = '#3FB984') { rectF(x - s * .07, yb - s * .55, s * .14, s * .55, s * .05, '#8B5A3C'); ovalF(x - s * .2, yb - s * .75, s * .3, s * .28, shade(col, -.06)); ovalF(x + s * .18, yb - s * .8, s * .28, s * .26, col); ovalF(x, yb - s * 1.0, s * .32, s * .3, shade(col, .05)); }
  function bush(x, yb, s, col = '#2E9E6E') { ovalF(x - s * .3, yb - s * .2, s * .32, s * .26, shade(col, -.05)); ovalF(x + s * .25, yb - s * .22, s * .3, s * .27, col); ovalF(x, yb - s * .35, s * .34, s * .3, shade(col, .06)); }
  function lamp(x, yb, s) { rectF(x - s * .03, yb - s, s * .06, s, s * .03, '#2B3A55', { plane: 0 }); rectF(x - s * .1, yb - s * 1.08, s * .2, s * .12, s * .04, '#2B3A55'); ovalF(x, yb - s * .98, s * .07, s * .05, '#FFE7A3', { plane: 0 }); }
  function facade(x, yb, w, h, col, o = {}) { rectF(x, yb - h, w, h, w * .03, col); rectF(x - w * .02, yb - h - h * .05, w * 1.04, h * .07, w * .02, shade(col, -.2), { plane: 0 });
    const rows = o.rows ?? 2; for (let r = 0; r < rows; r++) for (let c = 0; c < 3; c++) { const wx = x + w * (.1 + c * .3), wy = yb - h + h * (.12 + r * .2); rectF(wx, wy, w * .2, h * .13, w * .02, '#BFE3F5', { depth: .2 }); rectF(wx - w * .015, wy + h * .12, w * .23, h * .025, w * .01, '#FFFFFF', { plane: 0 }); }
    if (o.shop) { const sy = yb - h * .36; rectF(x + w * .06, sy, w * .88, h * .36, w * .02, '#2B3A55', { plane: 0 }); rectF(x + w * .1, sy + h * .05, w * .5, h * .27, w * .02, '#BFE3F5', { depth: .25 }); rectF(x + w * .66, sy + h * .05, w * .24, h * .31, w * .02, shade(col, -.3), { plane: 0 });
      for (let k = 0; k < 6; k++) F(() => { const ax = x + k * w / 6; ctx.moveTo(ax, sy - h * .1); ctx.lineTo(ax + w / 6, sy - h * .1); ctx.lineTo(ax + w / 6, sy); ctx.arc(ax + w / 12, sy, w / 12, 0, Math.PI); ctx.closePath(); }, k % 2 ? '#FFFFFF' : o.awning || '#FF7A45', [x + k * w / 6, sy - h * .1, w / 6, h * .15], { plane: 0 }); } }
  function road(top, col = '#3D4660') { rectF(-20, top, W + 40, H, 0, '#E9DCC7', { plane: 0 }); rectF(-20, top, W + 40, H * .02, 0, '#CDBFA8', { plane: 0 }); rectF(-20, top + H * .1, W + 40, H, 0, col, { plane: 0 }); for (let k = 0; k < 5; k++) rr(k * W * .26 - W * .05, top + H * .16, W * .14, H * .012, 6, '#F4EEDC', 0); }
  function stall(x, yb, w, col, goods) { rectF(x, yb - w * .45, w, w * .45, w * .03, '#C68B59'); rectF(x - w * .04, yb - w * .5, w * 1.08, w * .07, w * .03, '#A86F42', { plane: 0 }); [x + w * .05, x + w * .9].forEach(px => rectF(px, yb - w * 1.15, w * .05, w * .7, w * .02, '#8B5A3C', { plane: 0 }));
    for (let k = 0; k < 5; k++) F(() => { const ax = x - w * .06 + k * w * 1.12 / 5; ctx.moveTo(ax, yb - w * 1.2); ctx.lineTo(ax + w * 1.12 / 5, yb - w * 1.2); ctx.lineTo(ax + w * 1.12 / 5, yb - w * 1.05); ctx.arc(ax + w * 1.12 / 10, yb - w * 1.05, w * 1.12 / 10, 0, Math.PI); ctx.closePath(); }, k % 2 ? '#FFF4E2' : col, [x, yb - w * 1.2, w, w * .25], { plane: 0 });
    (goods || ['#FF6B6B', '#FFC93C', '#7BD389']).forEach((g, k) => { for (let n = 0; n < 4; n++) ovalF(x + w * (.18 + k * .32) + (n % 2) * w * .07 - w * .035, yb - w * .5 - (n > 1 ? w * .08 : 0) - w * .04, w * .055, w * .05, g, { depth: .25, hi: 0 }); }); }
  function hills(col1, col2, y) { F(() => { ctx.moveTo(-20, y); ctx.quadraticCurveTo(W * .25, y - H * .12, W * .55, y - H * .02); ctx.quadraticCurveTo(W * .8, y - H * .1, W + 20, y - H * .03); ctx.lineTo(W + 20, H); ctx.lineTo(-20, H); ctx.closePath(); }, col1, [0, y - H * .12, W, H * .3], { plane: 0 });
    F(() => { ctx.moveTo(-20, y + H * .05); ctx.quadraticCurveTo(W * .4, y - H * .06, W + 20, y + H * .04); ctx.lineTo(W + 20, H); ctx.lineTo(-20, H); ctx.closePath(); }, col2, [0, y - H * .06, W, H * .3], { plane: 0 }); }
  function bunting(y, cols) { ctx.save(); ctx.strokeStyle = '#2B3A55'; ctx.lineWidth = 2 * U(); ctx.beginPath(); ctx.moveTo(0, y); ctx.quadraticCurveTo(W / 2, y + H * .04, W, y); ctx.stroke(); ctx.restore(); for (let k = 0; k < 9; k++) { const t = (k + .5) / 9, x = W * t, yy = y + Math.sin(t * Math.PI) * H * .02 * 2; polyF([[x - W * .035, yy], [x + W * .035, yy], [x, yy + H * .035]], cols[k % cols.length], { plane: 0 }); } }

  // ---------------------------------------------------------------- demo scenes (full environments)

  // ---------------------------------------------------------------- the COMIC layer (owner, 7 Nov 2026: "entertaining, funny and a bit weird, on top of IF CREW")
  // takes (eyes pop, jaw drops) with impact lines and sweat, money that grows legs and runs, a note that melts like ice cream,
  // a cow in a tie, a deadpan stare at the viewer, a weird jelly Iffy with three eyes. Rule: the gag illustrates the LINE, ≤ 1 per 20–30 s.
  function zing(x, y, r, lt, col = INK) { ctx.save(); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineWidth = r * .045; const p = .5 + .5 * Math.sin(lt * 14);
    for (let k = 0; k < 10; k++) { const a = k * TAU / 10 + .15, r1 = r * (1 + p * .08), r2 = r * (1.28 + (k % 2) * .14 + p * .1); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); ctx.lineTo(x + Math.cos(a) * r2, y + Math.sin(a) * r2); ctx.stroke(); } ctx.restore(); }
  function sweat(x, y, s, lt) { const d = ((lt * .9) % 1) * s * .6; ctx.save(); ctx.translate(x, y + d); F(() => { ctx.moveTo(0, -s * .5); ctx.quadraticCurveTo(s * .38, 0, 0, s * .3); ctx.quadraticCurveTo(-s * .38, 0, 0, -s * .5); }, '#7FD3FF', [-s * .4, -s * .5, s * .8, s * .8], { plane: 0 }); ctx.restore(); }
  function marks(x, y, s, lt, txt = '!!') { ctx.save(); ctx.translate(x, y); ctx.rotate(-.12 + Math.sin(lt * 10) * .05); ctx.font = `400 ${s}px "Paytone One"`; ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = s * .16; ctx.strokeStyle = '#FFFFFF'; ctx.strokeText(txt, 0, 0); ctx.fillStyle = '#FF4D6D'; ctx.fillText(txt, 0, 0); ctx.restore(); }
  function speed(x, y, w, h, lt) { ctx.save(); ctx.strokeStyle = 'rgba(38,35,58,.5)'; ctx.lineCap = 'round'; ctx.lineWidth = h * .06; for (let k = 0; k < 4; k++) { const yy = y + (k - 1.5) * h * .28, o = ((lt * 3 + k * .3) % 1) * w * .2; ctx.beginPath(); ctx.moveTo(x + o, yy); ctx.lineTo(x + w * (.5 + (k % 2) * .25) + o, yy); ctx.stroke(); } ctx.restore(); }
  // a coin that grew legs and runs (dir -1 = to the left); face panics
  function legcoin(x, y, r, lt, dir = 1) { const ph = lt * 13; ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1); speed(-r * 2.6, -r * .1, r * 2.2, r, lt);
    [-1, 1].forEach(sd => { const a = Math.sin(ph + (sd > 0 ? Math.PI : 0)) * .8; const kx = Math.sin(a) * r * .55, ky = r * .55 + Math.cos(a) * r * .5; tube(sd * r * .25, r * .7, sd * r * .25 + kx, r * .7 + ky, r * .14, INK); rectF(sd * r * .25 + kx - r * .05, r * .7 + ky - r * .06, r * .32, r * .14, r * .07, '#FF4D6D', { plane: 0 }); });
    ctx.rotate(Math.sin(ph) * .06 + .12); ovalF(r * .08, r * .1, r, r, '#D9961F', { plane: 0 }); ovalF(0, 0, r, r, '#FFC93C', { plane: .62 }); ovalF(0, 0, r * .72, r * .72, '#FFD966', { plane: .62, hi: 0 });
    [-1, 1].forEach(sd => { ell(sd * r * .28 + r * .12, -r * .12, r * .2, r * .26, '#FFFFFF', 0); circ(sd * r * .28 + r * .2, -r * .1, r * .09, INK, 0); });
    ctx.fillStyle = MOUTH; ctx.beginPath(); ctx.ellipse(r * .14, r * .34, r * .14, r * .17, 0, 0, TAU); ctx.fill(); [-1, 1].forEach(sd => tube(sd * r * .85, 0, sd * r * 1.35, -r * (.4 + Math.sin(ph * 1.3 + sd) * .25), r * .12, INK)); ctx.restore(); }
  // a banknote on a stick that melts like ice cream; k 0..1 = how far gone
  function meltnote(x, y, w, lt, k = .5) { const h = w * .5, d = h * (.15 + k * .9); rectF(x - w * .045, y + h * .1, w * .09, h * 1.6, w * .04, '#E3C58F');
    F(() => { ctx.moveTo(x - w / 2, y - h / 2); ctx.lineTo(x + w / 2, y - h / 2); ctx.lineTo(x + w / 2, y + h * .2); for (let j = 6; j >= 0; j--) { const xx = x - w / 2 + j * w / 6, dd = d * (.35 + .65 * Math.abs(Math.sin(j * 1.7 + 1))) * (1 + .05 * Math.sin(lt * 2 + j)); ctx.quadraticCurveTo(xx + w / 12, y + h * .2 + dd, xx, y + h * .2); } ctx.closePath(); }, '#7BD389', [x - w / 2, y - h / 2, w, h + d]);
    rectF(x - w * .42, y - h * .4, w * .84, h * .55, h * .08, '#9BE0A8', { plane: 0 }); ovalF(x, y - h * .12, h * .24, h * .24, '#B8EFC4', { plane: 0 }); ctx.save(); ctx.fillStyle = '#2F8A4A'; ctx.font = `400 ${h * .34}px "Paytone One"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', x, y - h * .1); ctx.font = `400 ${h * .16}px "Paytone One"`; ctx.fillText('100', x - w * .32, y - h * .3); ctx.fillText('100', x + w * .32, y - h * .3); ctx.restore(); const q = (lt * .7) % 1; ovalF(x + w * .2, y + h * .2 + d + q * h * 1.4, h * .06, h * .08 * (1 + q), '#7BD389', { plane: 0 }); ctx.save(); ctx.globalAlpha = .22; ell(x, y + h * 1.5, w * .4 * (.4 + k), h * .08, '#3FA35A', 0); ctx.restore(); }
  // a cow in a tie (for when the cow becomes "money" or joins the bank queue)
  function cowtie(x, y, s, lt) { cow(x, y, s, lt); const b = Math.sin(lt * 1.5) * s * .008, tx = x + s * .36, ty = y - s * .5 + b; polyF([[tx - s * .04, ty], [tx + s * .04, ty], [tx + s * .025, ty + s * .03], [tx + s * .05, ty + s * .19], [tx, ty + s * .24], [tx - s * .05, ty + s * .19], [tx - s * .025, ty + s * .03]], '#E63950', { plane: .6 }); rr(tx - s * .045, ty - s * .015, s * .09, s * .04, s * .015, '#B5243A', 0); }
  // the weird Iffy: jelly wobble, a third eye that blinks on its own
  function weirdIffy(x, y, s, lt, o = {}) { const w = Math.sin(lt * 5) * .07; ctx.save(); ctx.translate(x, y); ctx.scale(1 + w, 1 - w); iffy(0, 0, s, lt, o); const bl = ((lt + 1.3) % 2.6) < .15; if (!bl) { ell(0, -s * .58, s * .1, s * .08, '#FFFFFF', 0); circ(Math.sin(lt * 1.7) * s * .04, -s * .58, s * .045, INK, 0); } else line(-s * .08, -s * .58, s * .08, -s * .58, s * .025, INK); ctx.restore(); }
  const GAG = { zing, sweat, marks, speed, legcoin, meltnote, cowtie, weirdIffy };
  const SC = {
    lineup(lt) { burst('#FF7A45', '#FFC48A'); [[.82, .3, 22], [.9, .38, 14], [.12, .26, 16]].forEach(([x, y, s], k) => sparkle(W * x, H * y, s * U(), lt, k)); title(['MEET THE', 'IF CREW'], 1, 'THE IF MACHINE', 1);
      draw('prof', W * .22, H * .6, H * .3, lt, { keys: [[0, 'shrug', 'laugh']] }); draw('beard', W * .52, H * .58, H * .32, lt, { keys: [[0, 'crossed', 'smirk']] }); draw('hijab', W * .8, H * .6, H * .29, lt, { keys: [[0, 'point', 'wink']], flip: 1 });
      draw('braids', W * .14, H * .8, H * .26, lt, { keys: [[0, 'shock', 'shock']] }); draw('bun', W * .4, H * .8, H * .27, lt, { keys: [[0, 'cheer', 'grin']] }); draw('cap', W * .86, H * .8, H * .26, lt, { keys: [[0, 'think', 'bored']], flip: 1 }); sticker(() => iffy(W * .64, H * .72, W * .17, lt)); },
    hook(lt) { sky('#FF9A6B', '#FFE0B8', 'h'); cloud(W * .2, H * .27, W * .16); cloud(W * .78, H * .2, W * .12);
      ctx.save(); [['#E9A88C', .0, .28], ['#D99A86', .22, .36], ['#E9A88C', .5, .3], ['#D99A86', .74, .38]].forEach(([c, x, h]) => facade(W * x, H * .62, W * .26, H * h, c, { rows: 3 })); ctx.restore(); haze('#FFD9B8', .35);
      facade(-W * .04, H * .68, W * .36, H * .3, '#5BC0EB', { shop: 1, awning: '#FF7A45' }); facade(W * .66, H * .68, W * .38, H * .32, '#8E6CEF', { shop: 1, awning: '#FFC93C' }); lamp(W * .36, H * .69, H * .2); tree(W * .58, H * .69, H * .16, '#3FB984');
      road(H * .68); [[.2, .42, -.3, 0], [.78, .4, .4, 1], [.32, .32, .2, 1], [.7, .3, -.2, 0], [.88, .52, .1, 0], [.12, .55, -.1, 1]].forEach(([x, y, r, c], j) => { const yy = H * y - ((lt * .1 + j * .17) % 1) * H * .05; sticker(() => c ? coin(W * x, yy, W * .042, lt, r) : note(W * x, yy, W * .17, r + Math.sin(lt + j) * .2), 5); });
      draw('prof', W * .5, H * .8, H * .36, lt, { keys: [[0, 'idle', 'happy'], [.6, 'shock', 'shock']] }); sticker(() => iffy(W * .82, H * .56, W * .14, lt, { expr: 'shock' })); bush(-W * .02, H * 1.0, W * .3); bush(W * 1.0, H * .98, W * .26, '#2A8A62'); title(['WHAT IF MONEY', 'DISAPPEARED?'], 1, 'THE IF MACHINE'); },
    barter(lt) { sky('#7FD1F5', '#E9F7FF', 'b'); cloud(W * .25, H * .26, W * .14); cloud(W * .82, H * .32, W * .1); hills('#9ED99A', '#7BC97A', H * .5); haze('#E9F7FF', .15);
      stall(W * .02, H * .62, W * .3, '#FF6B6B', ['#FF6B6B', '#FFC93C', '#FF9F43']); stall(W * .68, H * .62, W * .3, '#5BC0EB', ['#7BD389', '#FFD966', '#C9A0FF']); bunting(H * .4, ['#FF7A45', '#FFC93C', '#3FB984', '#5BC0EB', '#8E6CEF']);
      rectF(-20, H * .66, W + 40, H, 0, '#F3E3C3', { plane: 0 }); for (let k = 0; k < 14; k++) { const r = rng(k + 9); ovalF(W * r(), H * (.72 + r() * .2), W * .03, H * .006, '#E2CFA8', { plane: 0 }); }
      sticker(() => cow(W * .36, H * .79, W * .44, lt)); draw('beard', W * .12, H * .8, H * .31, lt, { keys: [[0, 'think', 'think']] }); sticker(() => sack(W * .7, H * .79, W * .17)); draw('hijab', W * .89, H * .8, H * .31, lt, { keys: [[0, 'shrug', 'worried']], flip: 1 });
      sticker(() => { bubble(W * .3, H * .36, W * .38, H * .11, W * .14, H * .47); sack(W * .3, H * .4, W * .13); bubble(W * .72, H * .36, W * .38, H * .11, W * .88, H * .47); shoe(W * .72, H * .385, W * .2); }); bush(W * .5, H * 1.02, W * .3, '#3FB984'); title(['THE BARTER', 'PROBLEM'], 1, 'DOUBLE COINCIDENCE OF WANTS'); },
    queue(lt) { sky('#B9A6FF', '#F2EDFF', 'q'); cloud(W * .15, H * .24, W * .12); facade(-W * .1, H * .62, W * .4, H * .3, '#D7CCFF', { rows: 3 }); haze('#F2EDFF', .3);
      facade(W * .48, H * .7, W * .56, H * .46, '#FF8FA3', { shop: 1, awning: '#FFC93C', rows: 2 }); sticker(() => { rectF(W * .56, H * .4, W * .38, H * .065, H * .03, '#FFC93C'); ctx.save(); ctx.fillStyle = INK; ctx.font = `400 ${H * .042}px "Paytone One"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ALL FREE', W * .75, H * .434); ctx.restore(); }, 5);
      sticker(() => clock(W * .3, H * .38, W * .08, lt), 5); lamp(W * .38, H * .71, H * .2); road(H * .7, '#4A4E69'); tree(-W * .02, H * .71, H * .17, '#3FB984');
      draw('cap', W * .1, H * .82, H * .23, lt, { keys: [[0, 'think', 'bored']] }); draw('prof', W * .25, H * .825, H * .25, lt, { keys: [[0, 'idle', 'worried']] }); draw('braids', W * .4, H * .825, H * .22, lt, { keys: [[0, 'crossed', 'bored']] }); draw('beard', W * .56, H * .83, H * .28, lt, { keys: [[0, 'watch', 'think']] });
      bush(W * .95, H * 1.0, W * .28, '#2E9E6E'); title(['FREE COSTS', 'TIME'], 1, 'ANSWER 1 · THE QUEUE'); },

    w_hook(lt) { sky('#FF9A6B', '#FFE0B8', 'h'); cloud(W * .2, H * .27, W * .16); [['#E9A88C', .0, .28], ['#D99A86', .22, .36], ['#E9A88C', .5, .3], ['#D99A86', .74, .38]].forEach(([c, x, h]) => facade(W * x, H * .62, W * .26, H * h, c, { rows: 3 })); haze('#FFD9B8', .35); road(H * .68);
      const run = (lt * .22) % 1; sticker(() => legcoin(W * (.66 + run * .5), H * .7, W * .075, lt, 1)); sticker(() => legcoin(W * (.78 + run * .45), H * .88, W * .065, lt + .4, 1)); sticker(() => legcoin(W * (.3 - run * .5), H * .9, W * .07, lt + .2, -1));
      zing(W * .46, H * .55, H * .14, lt); draw('prof', W * .46, H * .82, H * .38, lt, { keys: [[0, 'take', 'take']] }); sweat(W * .6, H * .5, W * .04, lt); marks(W * .2, H * .44, H * .07, lt);
      title(['YOUR MONEY', 'JUST LEFT'], 1, 'THE IF MACHINE'); },
    w_bank(lt) { sky('#B9A6FF', '#F2EDFF', 'q'); facade(-W * .06, H * .7, W * 1.12, H * .48, '#E6E0FF', { rows: 2 }); sticker(() => { rectF(W * .2, H * .33, W * .6, H * .06, H * .02, '#2B3A55'); ctx.save(); ctx.fillStyle = '#FFC93C'; ctx.font = `400 ${H * .038}px "Paytone One"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('BANK OF COWS', W * .5, H * .362); ctx.restore(); }, 5); road(H * .7, '#4A4E69');
      draw('cap', W * .14, H * .83, H * .24, lt, { keys: [[0, 'watch', 'bored']] }); sticker(() => cowtie(W * .47, H * .83, W * .4, lt)); draw('hijab', W * .82, H * .83, H * .25, lt, { keys: [[0, 'crossed', 'deadpan']], flip: 1 });
      sticker(() => { bubble(W * .64, H * .5, W * .36, H * .08, W * .55, H * .6); ctx.save(); ctx.fillStyle = INK; ctx.font = `400 ${H * .03}px "Paytone One"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('1 COW, PLEASE', W * .64, H * .502); ctx.restore(); });
      title(['A COW', 'AS CASH'], 1, 'BARTER, BUT FORMAL'); },
    w_melt(lt) { burst('#FF9F43', '#FFE29A', .5, .32); ctx.save(); ctx.globalAlpha = .9; circ(W * .78, H * .2, W * .1, '#FFF4C2', 0); ctx.restore(); floor('#F3E3C3');
      sticker(() => meltnote(W * .32, H * .44, W * .44, lt, .35 + .3 * Math.sin(lt * .6) ** 2)); draw('braids', W * .7, H * .82, H * .34, lt, { keys: [[0, 'shock', 'cry']], flip: 1 });
      title(['SAVINGS', 'THAT MELT'], 1, 'INFLATION, VISUALISED'); },
    w_stare(lt) { sky('#7FD1F5', '#E9F7FF', 'b'); hills('#9ED99A', '#7BC97A', H * .55); floor('#F3E3C3');
      draw('beard', W * .38, H * .84, H * .44, lt, { keys: [[0, 'hold', 'deadpan']], item: (x, y, h) => sack(x, y + h * .14, h * .26) }); sticker(() => weirdIffy(W * .78, H * .52, W * .2, lt));
      sticker(() => { bubble(W * .72, H * .3, W * .36, H * .08, W * .8, H * .4); ctx.save(); ctx.fillStyle = INK; ctx.font = `400 ${H * .034}px "Paytone One"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('…seriously?', W * .72, H * .302); ctx.restore(); });
      title(['ONE SACK', 'OF RICE'], 1, 'FOR ONE HAIRCUT'); },

    // ---- WORLD demos (owner, 7 Nov 2026: "not only people — our content is everything"): space, ocean, tech, map, body, data, same v3 language
    s_moon(lt) { ctx.drawImage(cache('spc', () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1B1640'); g.addColorStop(1, '#3B2A7A'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); const r = rng(7); for (let k = 0; k < 90; k++) { ctx.globalAlpha = .3 + r() * .6; circ(W * r(), H * r() * .75, (1 + r() * 2.2) * U(), '#FFFFFF', 0); } ctx.globalAlpha = 1; }), 0, 0);
      [[.12, .3, 18], [.86, .5, 14], [.3, .58, 10]].forEach(([x, y, z], k) => sparkle(W * x, H * y, z * U(), lt, k));
      const ex = W * .5, ey = H * 1.02, er = W * .62; ctx.save(); ctx.globalAlpha = .35; circ(ex, ey, er * 1.06, '#7FD3FF', 0); ctx.restore();
      ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, er, 0, TAU); ctx.clip(); flat(() => ctx.arc(ex, ey, er, 0, TAU), '#3E8EDE', [ex - er, ey - er, er * 2, er * 2], .12); const sp = lt * .02;
        [[-.5, -.75, .3, .16], [.1, -.85, .26, .12], [.45, -.6, .22, .2], [-.2, -.55, .18, .1]].forEach(([dx, dy, rx, ry], k) => fo(ex + er * (dx + sp - Math.floor(dx + sp + .9) * 0), ey + er * dy, er * rx, er * ry, k % 2 ? '#5CC46A' : '#4DB35E', .12, k * .5)); [[-.3, -.92, .14], [.3, -.95, .1]].forEach(([dx, dy, rx]) => fo(ex + er * dx, ey + er * dy, er * rx, er * .04, '#FFFFFF', 0)); ctx.restore();
      const fade = .55 + .45 * Math.cos(lt * .7), mx = W * .72 + Math.sin(lt * .4) * W * .03, my = H * .4; ctx.save(); ctx.setLineDash([6 * U(), 10 * U()]); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 3 * U(); ctx.beginPath(); ctx.ellipse(W * .5, H * .62, W * .44, H * .2, -.15, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.globalAlpha = fade; sticker(() => { fo(mx, my, W * .13, W * .13, '#D9D4E6', .14); [[-.04, -.03, .03], [.05, .04, .022], [-.05, .06, .016], [.06, -.06, .014]].forEach(([dx, dy, rr2]) => { fo(mx + W * dx, my + W * dy, W * rr2, W * rr2, '#B9B2CC', 0); }); }); ctx.restore();
      ctx.save(); ctx.translate(W * .22, H * .5 - ((lt * .05) % 1) * H * .05); ctx.rotate(.5); sticker(() => { flat(() => { ctx.moveTo(0, -W * .1); ctx.bezierCurveTo(W * .045, -W * .06, W * .04, W * .04, W * .03, W * .06); ctx.lineTo(-W * .03, W * .06); ctx.bezierCurveTo(-W * .04, W * .04, -W * .045, -W * .06, 0, -W * .1); }, '#F4EEDC', [-W * .045, -W * .1, W * .09, W * .16], .14); fo(0, -W * .02, W * .018, W * .018, '#3E8EDE', 0); [-1, 1].forEach(sd => flat(() => { ctx.moveTo(sd * W * .03, W * .02); ctx.lineTo(sd * W * .06, W * .07); ctx.lineTo(sd * W * .03, W * .06); }, '#FF4D6D', null, 0)); fo(0, W * .08 + Math.sin(lt * 20) * W * .004, W * .02, W * .035, '#FFC93C', 0); }); ctx.restore();
      title(['WHAT IF THE', 'MOON VANISHED?'], 1, 'SPACE', 1); },
    s_ocean(lt) { sky('#FFB36B', '#FFE7C2', 'oc'); fo(W * .78, H * .26, W * .12, W * .12, '#FFF2B0', 0); haze('#FFE7C2', .2); const lvl = H * (.64 + .05 * Math.sin(lt * .5));
      flat(() => { ctx.moveTo(-20, H * .58); ctx.quadraticCurveTo(W * .3, H * .52, W * .6, H * .6); ctx.quadraticCurveTo(W * .85, H * .66, W + 20, H * .6); ctx.lineTo(W + 20, H); ctx.lineTo(-20, H); }, '#F2D49B', [0, H * .52, W, H * .5], .1);
      flat(() => { ctx.moveTo(W * .62, lvl); for (let k = 0; k <= 6; k++) ctx.quadraticCurveTo(W * (.62 + k * .065 + .03), lvl - H * .012 * Math.sin(lt * 2 + k), W * (.62 + (k + 1) * .065), lvl); ctx.lineTo(W + 20, H); ctx.lineTo(W * .92, H); ctx.bezierCurveTo(W * .8, H * .9, W * .58, H * .8, W * .62, lvl); }, '#3FB8D8', [W * .55, lvl, W * .5, H * .4], .12); ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 5 * U(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(W * .62, lvl); ctx.bezierCurveTo(W * .58, H * .8, W * .8, H * .9, W * .92, H); ctx.stroke(); ctx.restore();
      [[.12, .9], [.4, .95], [.85, .92]].forEach(([x, y]) => fo(W * x, H * y, W * .05, H * .008, '#E2C083', 0));
      sticker(() => { const wx = W * .36, wy = H * .78, s = W * .5; flat(() => { ctx.moveTo(wx - s * .5, wy); ctx.bezierCurveTo(wx - s * .55, wy - s * .45, wx + s * .3, wy - s * .5, wx + s * .45, wy - s * .1); ctx.quadraticCurveTo(wx + s * .5, wy, wx + s * .4, wy + s * .05); ctx.lineTo(wx - s * .45, wy + s * .05); ctx.closePath(); }, '#4A6FD6', [wx - s * .55, wy - s * .5, s * 1.05, s * .55], .12);
        flat(() => { ctx.moveTo(wx - s * .45, wy + s * .04); ctx.quadraticCurveTo(wx, wy - s * .02, wx + s * .42, wy + s * .03); ctx.lineTo(wx + s * .38, wy + s * .05); ctx.lineTo(wx - s * .44, wy + s * .06); }, '#DDE6FF', null, 0);
        ctx.save(); ctx.translate(wx - s * .5, wy - s * .1); ctx.rotate(-.6 + Math.sin(lt * 3) * .15); flat(() => { ctx.moveTo(0, 0); ctx.quadraticCurveTo(-s * .12, -s * .1, -s * .2, -s * .02); ctx.quadraticCurveTo(-s * .1, s * .02, 0, s * .06); ctx.quadraticCurveTo(-s * .1, s * .1, -s * .2, s * .12); ctx.quadraticCurveTo(-s * .1, s * .04, 0, 0); }, '#3A5CC0', null, 0); ctx.restore();
        ell(wx + s * .22, wy - s * .2, s * .05, s * .06, '#FFFFFF', 0); circ(wx + s * .23, wy - s * .19, s * .025, CHAR, 0); ctx.save(); ctx.strokeStyle = MOUTH; ctx.lineWidth = s * .015; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(wx + s * .18, wy - s * .05); ctx.quadraticCurveTo(wx + s * .3, wy - s * .1, wx + s * .42, wy - s * .04); ctx.stroke(); ctx.restore(); sweat(wx + s * .34, wy - s * .32, s * .05, lt);
        const sp2 = (lt * 1.2) % 1; for (let k = 0; k < 3; k++) fo(wx - s * .02 + k * s * .04 * Math.sin(k), wy - s * .48 - sp2 * s * .2 - k * s * .05, s * .02 * (1 - sp2 * .5), s * .03, '#7FD3FF', 0); });
      const jx = W * (.7 + .1 * Math.sin(lt * 1.2)), jy = lvl - Math.abs(Math.sin(lt * 1.8)) * H * .12; sticker(() => { ctx.save(); ctx.translate(jx, jy); ctx.rotate(Math.cos(lt * 1.8) * .5); flat(() => { ctx.ellipse(0, 0, W * .06, W * .035, 0, 0, TAU); }, '#FF8A3D', [-W * .06, -W * .035, W * .12, W * .07], .12); flat(() => { ctx.moveTo(-W * .05, 0); ctx.lineTo(-W * .09, -W * .03); ctx.lineTo(-W * .09, W * .03); }, '#FF6B2B', null, 0); circ(W * .03, -W * .008, W * .009, CHAR, 0); ctx.restore(); }, 5);
      title(['WHAT IF THE OCEANS', 'DRIED UP?'], 1, 'PLANET EARTH'); },
    s_net(lt) { burst('#5B4BC4', '#8E7CF0', .5, .55); const px = W * .5, py = H * .56, pw = W * .46, ph = W * .86;
      ctx.save(); ctx.strokeStyle = '#2B2550'; ctx.lineWidth = 10 * U(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, H * .82); ctx.bezierCurveTo(W * .2, H * .9, W * .3, H * .74, W * .5, H * .82); ctx.bezierCurveTo(W * .7, H * .9, W * .8, H * .78, W + 10, H * .86); ctx.stroke(); ctx.restore();
      sticker(() => { ctx.save(); ctx.translate(px, py); ctx.rotate(-.06); flat(() => ctx.roundRect(-pw / 2, -ph / 2, pw, ph, pw * .14), '#2B2550', [-pw / 2, -ph / 2, pw, ph], .1); flat(() => ctx.roundRect(-pw * .44, -ph * .45, pw * .88, ph * .9, pw * .1), '#1B1838', null, 0); rr(-pw * .12, -ph * .44, pw * .24, ph * .025, ph * .012, '#2B2550', 0);
        ctx.save(); ctx.strokeStyle = '#FF4D6D'; ctx.lineCap = 'round'; ctx.lineWidth = pw * .045; for (let k = 1; k <= 3; k++) { ctx.globalAlpha = (Math.floor(lt * 2) % 4) >= k ? .25 : 1; ctx.beginPath(); ctx.arc(0, ph * .02, pw * .1 * k, Math.PI * 1.25, Math.PI * 1.75); ctx.stroke(); } ctx.globalAlpha = 1; circ(0, ph * .0, pw * .035, '#FF4D6D', 0); ctx.restore();
        ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = pw * .02; ctx.lineCap = 'round'; ctx.globalAlpha = .7; ctx.beginPath(); ctx.moveTo(pw * .1, -ph * .38); ctx.lineTo(pw * .02, -ph * .25); ctx.lineTo(pw * .14, -ph * .18); ctx.lineTo(pw * .05, -ph * .02); ctx.moveTo(pw * .14, -ph * .18); ctx.lineTo(pw * .3, -ph * .22); ctx.stroke(); ctx.restore();
        ctx.save(); ctx.font = `400 ${pw * .09}px "Paytone One"`; ctx.textAlign = 'center'; ctx.fillStyle = '#FFFFFF'; ctx.fillText('NO SIGNAL', 0, ph * .2); ctx.restore(); ctx.restore(); });
      [['#FF7A45', .16, .3], ['#3FB984', .84, .34], ['#FFC93C', .12, .6], ['#5BC0EB', .88, .62]].forEach(([c, x, y], k) => { const fall = ((lt * .3 + k * .25) % 1); sticker(() => { ctx.save(); ctx.translate(W * x, H * y + fall * H * .08); ctx.rotate(Math.sin(lt + k) * .3); ctx.globalAlpha = 1 - fall * .6; flat(() => ctx.roundRect(-W * .06, -W * .06, W * .12, W * .12, W * .035), c, [-W * .06, -W * .06, W * .12, W * .12], .12); fo(0, 0, W * .03, W * .03, '#FFFFFF', 0); ctx.restore(); }, 5); });
      title(['WHAT IF THE INTERNET', 'SWITCHED OFF?'], 1, 'TECHNOLOGY', 1); },
    s_map(lt) { ctx.drawImage(cache('map', () => { ctx.fillStyle = '#7CC6E8'; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 2 * U(); for (let k = 0; k < 14; k++) { ctx.beginPath(); ctx.moveTo(0, H * k / 14); ctx.lineTo(W, H * k / 14); ctx.stroke(); ctx.beginPath(); ctx.moveTo(W * k / 7, 0); ctx.lineTo(W * k / 7, H); ctx.stroke(); } }), 0, 0);
      const land = (pts, col) => flat(() => { ctx.moveTo(W * pts[0][0], H * pts[0][1]); for (let k = 1; k < pts.length; k++) { const a = pts[k - 1], b = pts[k]; ctx.quadraticCurveTo(W * (a[0] + b[0]) / 2 + W * .04, H * (a[1] + b[1]) / 2 - H * .02, W * b[0], H * b[1]); } ctx.closePath(); }, col, [0, 0, W, H], .1);
      land([[-.1, .3], [.25, .28], [.35, .42], [.2, .55], [-.1, .6]], '#F2D49B'); land([[.62, .62], [.9, .55], [1.1, .7], [1.1, .95], [.7, .92]], '#F2D49B'); land([[.55, .3], [.7, .27], [.75, .38], [.6, .4]], '#E9C887');
      [[.08, .42], [.15, .5], [.82, .74], [.9, .82]].forEach(([x, y]) => { const tx = W * x, ty = H * y; flat(() => { ctx.moveTo(tx, ty - W * .06); ctx.lineTo(tx + W * .04, ty); ctx.lineTo(tx - W * .04, ty); }, '#3FB984', [tx - W * .04, ty - W * .06, W * .08, W * .06], .12); });
      const route = [[.3, .46], [.45, .55], [.52, .68], [.7, .7]], q = (lt * .12) % 1; ctx.save(); ctx.setLineDash([12 * U(), 12 * U()]); ctx.strokeStyle = '#C0392B'; ctx.lineWidth = 6 * U(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(W * route[0][0], H * route[0][1]); route.slice(1).forEach(p => ctx.lineTo(W * p[0], H * p[1])); ctx.stroke(); ctx.restore();
      const seg = Math.min(2, Math.floor(q * 3)), f = q * 3 - seg, sx = W * lerp(route[seg][0], route[seg + 1][0], f), sy = H * lerp(route[seg][1], route[seg + 1][1], f);
      sticker(() => { ctx.save(); ctx.translate(sx, sy + Math.sin(lt * 3) * H * .004); ctx.rotate(Math.sin(lt * 2) * .06); const s = W * .16; flat(() => { ctx.moveTo(-s * .5, 0); ctx.lineTo(s * .5, 0); ctx.quadraticCurveTo(s * .4, s * .25, s * .3, s * .25); ctx.lineTo(-s * .35, s * .25); ctx.quadraticCurveTo(-s * .45, s * .2, -s * .5, 0); }, '#8B5A3C', [-s * .5, 0, s, s * .25], .14); rr(-s * .02, -s * .6, s * .04, s * .6, s * .02, '#5A3A26', 0); flat(() => { ctx.moveTo(s * .03, -s * .55); ctx.quadraticCurveTo(s * .4, -s * .35, s * .03, -s * .1); }, '#F4EEDC', [0, -s * .55, s * .4, s * .45], .1); flat(() => { ctx.moveTo(-s * .03, -s * .5); ctx.quadraticCurveTo(-s * .35, -s * .32, -s * .03, -s * .15); }, '#F4EEDC', null, 0); ctx.restore(); }, 5);
      const cx = W * .82, cy = H * .3; sticker(() => { fo(cx, cy, W * .09, W * .09, '#F4EEDC', .1); ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.sin(lt) * .2); flat(() => { ctx.moveTo(0, -W * .075); ctx.lineTo(W * .02, 0); ctx.lineTo(0, W * .075); ctx.lineTo(-W * .02, 0); }, '#C0392B', null, 0); ctx.restore(); ctx.save(); ctx.font = `400 ${W * .03}px "Paytone One"`; ctx.fillStyle = CHAR; ctx.textAlign = 'center'; ctx.fillText('N', cx, cy - W * .1); ctx.restore(); }, 5);
      sticker(() => { const tx2 = W * .2, ty2 = H * .84 + Math.sin(lt * 1.5) * H * .006, s2 = W * .07; [0, 1, 2].forEach(k => { ctx.save(); ctx.beginPath(); ctx.rect(tx2 + k * s2 * 1.5 - s2, ty2 - s2 * 1.2, s2 * 2, s2 * 1.2); ctx.clip(); flat(() => { ctx.arc(tx2 + k * s2 * 1.5, ty2, s2 * (1 - k * .15), Math.PI, 0); ctx.arc(tx2 + k * s2 * 1.5, ty2, s2 * (.55 - k * .1), 0, Math.PI, true); }, '#9B6CE0', [tx2 + k * s2 * 1.5 - s2, ty2 - s2, s2 * 2, s2], .14); ctx.restore(); }); const hx = tx2 - s2 * 1.5, hy = ty2 - s2 * .8; fo(hx, hy, s2 * .55, s2 * .45, '#9B6CE0', .12); ell(hx - s2 * .15, hy - s2 * .1, s2 * .16, s2 * .2, '#FFFFFF', 0); circ(hx - s2 * .2, hy - s2 * .06, s2 * .08, CHAR, 0); }, 5); ctx.save(); ctx.globalAlpha = .5; [0, 1, 2].forEach(k => ell(W * .2 + k * W * .105, H * .845, W * .06, H * .005, '#FFFFFF', 0)); ctx.restore();
      title(['WHAT IF SHIPS', 'NEVER SAILED?'], 1, 'HISTORY'); },
    s_brain(lt) { sky('#FF8FA3', '#FFE3EA', 'br'); floor('#F7C9D4'); const bx = W * .5, by = H * .55, s = W * .52, wob = Math.sin(lt * 2) * .02;
      sticker(() => { ctx.save(); ctx.translate(bx, by); ctx.scale(1 + wob, 1 - wob);
        [-1, 1].forEach(sd => { limb(sd * s * .38, s * .15, sd * s * .55, s * .5, s * .1, s * .08, '#FF9DB4'); mitten(sd * s * .56, s * .53, s * .06, '#FF9DB4', sd, 0); limb(sd * s * .16, s * .35, sd * s * .18, s * .62, s * .1, s * .09, '#FF9DB4'); fo(sd * s * .2, s * .64, s * .1, s * .045, '#FF6B8B', .1); });
        flat(() => { ctx.ellipse(0, 0, s * .5, s * .4, 0, 0, TAU); }, '#FFB3C6', [-s * .5, -s * .4, s, s * .8], .1); ctx.save(); ctx.strokeStyle = '#F08AA6'; ctx.lineWidth = s * .025; ctx.lineCap = 'round'; [[-.3, -.2, .12], [.05, -.28, .14], [.3, -.12, .12], [-.15, .05, .1], [.25, .15, .1]].forEach(([dx, dy, rr2]) => { ctx.beginPath(); ctx.arc(s * dx, s * dy, s * rr2, Math.PI * .1, Math.PI * 1.1); ctx.stroke(); }); ctx.beginPath(); ctx.moveTo(0, -s * .38); ctx.quadraticCurveTo(s * .04, -s * .1, 0, s * .1); ctx.stroke(); ctx.restore();
        [-1, 1].forEach(sd => { const ex = sd * s * .12, ey = s * .1; ell(ex, ey, s * .085, s * .1, '#FFFFFF', 0); circ(ex + s * .01, ey + s * .03, s * .045, CHAR, 0); ctx.save(); ctx.beginPath(); ctx.ellipse(ex, ey, s * .085, s * .1, 0, 0, TAU); ctx.clip(); ctx.fillStyle = '#F7A3BA'; ctx.fillRect(ex - s * .1, ey - s * .12, s * .2, s * .1 + s * .03 * Math.sin(lt * 1.5) ** 2); ctx.restore(); ctx.save(); ctx.strokeStyle = CHAR; ctx.lineWidth = s * .014; ctx.beginPath(); ctx.moveTo(ex - s * .085, ey - s * .02 + s * .03 * Math.sin(lt * 1.5) ** 2); ctx.lineTo(ex + s * .085, ey - s * .02 + s * .03 * Math.sin(lt * 1.5) ** 2); ctx.stroke(); ctx.restore(); ctx.save(); ctx.strokeStyle = '#B57BB0'; ctx.lineWidth = s * .015; ctx.beginPath(); ctx.arc(ex, ey + s * .08, s * .07, .15 * Math.PI, .85 * Math.PI); ctx.stroke(); ctx.restore(); });
        ctx.save(); ctx.strokeStyle = MOUTH; ctx.lineWidth = s * .02; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-s * .06, s * .27); ctx.lineTo(s * .07, s * .26); ctx.stroke(); ctx.restore(); ctx.restore(); });
      sticker(() => { const cx = W * .2, cy = H * .33; fo(cx, cy, W * .1, W * .1, '#FFFFFF', .08); ctx.save(); ctx.strokeStyle = CHAR; ctx.lineWidth = W * .012; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(lt * 2) * W * .07, cy - Math.cos(lt * 2) * W * .07); ctx.moveTo(cx, cy); ctx.lineTo(cx + W * .04, cy + W * .02); ctx.stroke(); ctx.restore(); circ(cx, cy, W * .012, '#FF4D6D', 0); }, 5);
      ['Z', 'Z', 'Z'].forEach((z, k) => { const q = (lt * .4 + k / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - q; ctx.font = `400 ${W * (.05 + k * .015)}px "Paytone One"`; ctx.fillStyle = '#5B4BC4'; ctx.fillText(z, W * (.72 + q * .1), H * (.42 - q * .12)); ctx.restore(); });
      title(['WHAT IF YOU', 'NEVER SLEPT?'], 1, 'YOUR BODY'); },
    s_chart(lt) { sky('#9FE3C4', '#E8FFF4', 'ch'); floor('#CDEFDC'); const base = H * .78, n = 5, g = Math.min(1, lt / 2.5);
      ctx.save(); ctx.strokeStyle = 'rgba(38,35,58,.15)'; ctx.lineWidth = 2 * U(); for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(W * .08, base - k * H * .09); ctx.lineTo(W * .92, base - k * H * .09); ctx.stroke(); } ctx.restore();
      for (let i = 0; i < n; i++) { const hgt = Math.round((2 + i * i * 1.2) * E.out(clamp(g * 1.4 - i * .12))), x = W * (.16 + i * .17); for (let k = 0; k < hgt; k++) { const yy = base - k * H * .022; flat(() => ctx.ellipse(x, yy, W * .065, H * .014, 0, 0, TAU), k % 2 ? '#FFC93C' : '#F5B92E', [x - W * .065, yy - H * .014, W * .13, H * .028], .14); } ctx.save(); ctx.font = `700 ${W * .028}px "Space Mono", monospace`; ctx.fillStyle = CHAR; ctx.textAlign = 'center'; ctx.fillText(String(1990 + i * 8), x, base + H * .045); ctx.restore(); }
      const pts = Array.from({ length: n }, (_, i) => [W * (.16 + i * .17), base - (2 + i * i * 1.2) * H * .022 * clamp(g * 1.4 - i * .12) - H * .05]); ctx.save(); ctx.strokeStyle = '#FF4D6D'; ctx.lineWidth = 9 * U(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.stroke(); ctx.restore();
      const last = pts[n - 1]; sticker(() => { ctx.save(); ctx.translate(last[0], last[1]); ctx.rotate(-.9); flat(() => { ctx.moveTo(W * .05, 0); ctx.lineTo(-W * .03, -W * .04); ctx.lineTo(-W * .03, W * .04); }, '#FF4D6D', null, 0); ctx.restore(); }, 5);
      const val = Math.round(1000 * Math.pow(1000, E.out(g))); sticker(() => { rectF(W * .14, H * .25, W * .72, H * .1, H * .03, '#FFFFFF', { plane: 0 }); ctx.save(); ctx.font = `400 ${H * .055}px "Paytone One"`; ctx.fillStyle = CHAR; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$' + val.toLocaleString('en-US'), W * .5, H * .302); ctx.restore(); }, 6);
      title(['WHAT IF PRICES', 'NEVER STOPPED?'], 1, 'MONEY · DATA'); },
    motion(lt) { sky('#FF9A6B', '#FFE0B8', 'm'); facade(-W * .05, H * .66, W * .5, H * .32, '#E9A88C', { rows: 3 }); facade(W * .55, H * .66, W * .5, H * .36, '#D99A86', { rows: 3 }); haze('#FFE0B8', .4); road(H * .68);
      draw('bun', W * .5, H * .82, H * .42, lt, { keys: [[0, 'idle', 'happy'], [.8, 'think', 'think'], [2.0, 'point', 'grin'], [3.0, 'cheer', 'laugh']] }); title(['REAL', 'ACTING'], 1, 'IDLE → THINK → IDEA → CHEER'); },
  };
  // ---------------------------------------------------------------- the house act for stories (owner, 7 Nov 2026: "lock this version for the engine")
  // # vis kind=w act=crew set=street|market|shops|stage kick="…" title="LINE|*GOLD*"
  //       actors="prof:idle>shock@1:shock|bun:think@0:think>cheer@2:laugh"   (name:pose[@caption][:expr] steps joined by >)
  //       props="coin|note|cow|tie|sack|iffy|weird|runcoin|melt"   (money flies for coin/note; a cow (in a tie with tie), a rice sack or Iffy (weird = jelly, 3 eyes) join;
  //       runcoin = coins grow legs and run off; melt = a banknote melting like ice cream). Gags: pose/face take (eyes pop, jaw drops + impact lines), cry, deadpan, slump.
  const SETS = {
    street(lt) { sky('#FF9A6B', '#FFE0B8', 'h'); cloud(W * .2, H * .27, W * .16); cloud(W * .78, H * .2, W * .12); [['#E9A88C', .0, .28], ['#D99A86', .22, .36], ['#E9A88C', .5, .3], ['#D99A86', .74, .38]].forEach(([c, x, h]) => facade(W * x, H * .62, W * .26, H * h, c, { rows: 3 })); haze('#FFD9B8', .35);
      facade(-W * .04, H * .68, W * .36, H * .3, '#5BC0EB', { shop: 1, awning: '#FF7A45' }); facade(W * .66, H * .68, W * .38, H * .32, '#8E6CEF', { shop: 1, awning: '#FFC93C' }); lamp(W * .36, H * .69, H * .2); tree(W * .58, H * .69, H * .16); road(H * .68); },
    market(lt) { sky('#7FD1F5', '#E9F7FF', 'b'); cloud(W * .25, H * .26, W * .14); cloud(W * .82, H * .32, W * .1); hills('#9ED99A', '#7BC97A', H * .5); stall(W * .02, H * .62, W * .3, '#FF6B6B'); stall(W * .68, H * .62, W * .3, '#5BC0EB', ['#7BD389', '#FFD966', '#C9A0FF']); bunting(H * .4, ['#FF7A45', '#FFC93C', '#3FB984', '#5BC0EB', '#8E6CEF']); rectF(-20, H * .66, W + 40, H, 0, '#F3E3C3', { plane: 0 }); },
    shops(lt) { sky('#B9A6FF', '#F2EDFF', 'q'); cloud(W * .15, H * .24, W * .12); facade(-W * .1, H * .62, W * .4, H * .3, '#D7CCFF', { rows: 3 }); haze('#F2EDFF', .3); facade(W * .48, H * .7, W * .56, H * .46, '#FF8FA3', { shop: 1, awning: '#FFC93C', rows: 2 }); lamp(W * .38, H * .71, H * .2); road(H * .7, '#4A4E69'); tree(-W * .02, H * .71, H * .17); },
    stage(lt) { burst('#FF7A45', '#FFC48A'); },
  };
  const parseActors = (str, c) => String(str || '').split('|').filter(Boolean).map(a => { const [name, rest] = a.split(/:(.+)/); const keys = String(rest || 'idle').split('>').map(st => { const m = st.match(/^(\w+)(?:@(\d+))?(?::(\w+))?$/) || []; const t = m[2] != null && c && c[+m[2]] ? c[+m[2]][0] : 0; return [t, m[1] || 'idle', m[3] || 'happy']; }); return { name, keys }; });
  A.crew = (o, c, dur) => { const actors = parseActors(o.actors, c), props = String(o.props || '').split('|'), set = SETS[o.set] || SETS.street; return { sfx: [], draw: lt => { set(lt);
    if (props.includes('coin') || props.includes('note')) [[.2, .42, -.3, 0], [.78, .4, .4, 1], [.32, .32, .2, 1], [.7, .3, -.2, 0], [.88, .52, .1, 0], [.12, .55, -.1, 1]].forEach(([x, y, r, k], j) => { const yy = H * y - ((lt * .1 + j * .17) % 1) * H * .05; sticker(() => k ? coin(W * x, yy, W * .042, lt, r) : note(W * x, yy, W * .17, r + Math.sin(lt + j) * .2), 5); });
    const n = actors.length + (props.includes('cow') ? 1 : 0) + (props.includes('sack') ? 1 : 0); let slot = 0; const xs = n <= 1 ? [.5] : n === 2 ? [.3, .7] : Array.from({ length: n }, (_, i) => .18 + i * .64 / (n - 1)), hh = H * (n <= 1 ? .34 : n <= 2 ? .29 : .25);
    if (props.includes('cow')) sticker(() => (props.includes('tie') ? cowtie : cow)(W * xs[slot++] + W * .05, H * .79, W * .4, lt));
    if (props.includes('runcoin')) { const run = (lt * .22) % 1; sticker(() => legcoin(W * (.66 + run * .5), H * .7, W * .07, lt, 1)); sticker(() => legcoin(W * (.3 - run * .5), H * .9, W * .065, lt + .2, -1)); }
    if (props.includes('melt')) sticker(() => meltnote(W * .3, H * .42, W * .36, lt, .3 + .3 * Math.sin(lt * .6) ** 2));
    actors.forEach((a, i) => { const ax = W * xs[slot++], cur = a.keys.filter(k => k[0] <= lt).pop() || a.keys[0];
      if (cur[1] === 'take' || cur[2] === 'take') { zing(ax, H * .8 - hh * .7, hh * .38, lt); sweat(ax + hh * .3, H * .8 - hh * .95, hh * .1, lt); marks(ax - hh * .35, H * .8 - hh * 1.05, hh * .17, lt); }
      draw(a.name, ax, H * .8, hh, lt, { keys: a.keys, flip: xs[slot - 1] > .6 }); });
    if (props.includes('sack')) sticker(() => sack(W * xs[slot++], H * .79, W * .16));
    if (props.includes('iffy') || props.includes('weird')) sticker(() => (props.includes('weird') ? weirdIffy : iffy)(W * .84, H * .4, W * .12, lt, { expr: o.iffy || 'happy' }));
    if (o.set !== 'stage') bush(-W * .02, H * 1.0, W * .28); const T = String(o.title || '').split('|').filter(Boolean); if (T.length) title(T.map(t => t.replace(/\*/g, '')), T.findIndex(t => t.includes('*')), o.kick, o.set === 'stage'); } }; };
  A.x_cast = (o, c, dur) => ({ sfx: [], draw: lt => (SC[o.v] || SC.lineup)(lt) });
  IFM.CAST = { draw, iffy, GAG, CAST, POSE, FACE, props: { coin, note, cow, sack, shoe, bubble, building, shop, clock }, F, ovalF, rectF, polyF, tube };
})();
