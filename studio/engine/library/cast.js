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
  function F(path, col, box, o = {}) { ctx.save(); ctx.beginPath(); path(); ctx.fillStyle = col; ctx.fill();
    if (o.plane !== 0 && box) { ctx.clip(); const [x, y, w, h] = box, s = o.plane ?? .6; ctx.fillStyle = shade(col, o.dark ?? -.13); ctx.beginPath(); ctx.moveTo(x + w * s, y - 9e3 * 0 - h); ctx.lineTo(x + w + h, y - h); ctx.lineTo(x + w + h, y + h * 2); ctx.lineTo(x + w * (s - .18), y + h * 2); ctx.closePath(); ctx.fill();
      if (o.hi !== 0) { ctx.fillStyle = rgba('#FFFFFF', .18); ctx.beginPath(); ctx.ellipse(x + w * .28, y + h * .2, w * .12, h * .06, -.5, 0, TAU); ctx.fill(); } }
    ctx.restore(); }
  const ovalF = (x, y, rx, ry, col, o) => F(() => ctx.ellipse(x, y, rx, ry, (o && o.rot) || 0, 0, TAU), col, [x - rx, y - ry, rx * 2, ry * 2], o);
  const rectF = (x, y, w, h, r, col, o) => F(() => ctx.roundRect(x, y, w, h, Math.max(0, Math.min(r, w / 2, h / 2))), col, [x, y, w, h], o);
  const polyF = (pts, col, o) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); F(() => { ctx.moveTo(...pts[0]); pts.slice(1).forEach(p => ctx.lineTo(...p)); ctx.closePath(); }, col, [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)], o); };
  const tube = (x1, y1, x2, y2, w, col) => { ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = shade(col, -.12); ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); const nx = -(y2 - y1), ny = x2 - x1, l = Math.hypot(nx, ny) || 1; ctx.strokeStyle = col; ctx.lineWidth = w * .7; ctx.beginPath(); ctx.moveTo(x1 - nx / l * w * .12, y1 - ny / l * w * .12); ctx.lineTo(x2 - nx / l * w * .12, y2 - ny / l * w * .12); ctx.stroke(); ctx.restore(); };

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
  };
  const FACE = {
    happy: { mouth: 'smile', lid: .12, brow: .04, look: [0, 0] }, grin: { mouth: 'open', lid: .1, brow: .12, look: [0, 0] }, laugh: { mouth: 'open', closed: 1, brow: .14, look: [0, 0] },
    shock: { mouth: 'o', lid: 0, brow: .38, look: [0, -.1], small: 1 }, think: { mouth: 'side', lid: .22, browL: .32, browR: -.04, look: [.45, -.5] },
    bored: { mouth: 'flat', lid: .5, brow: -.06, look: [-.3, .1] }, smirk: { mouth: 'smirk', lid: .3, brow: .02, browL: .2, look: [.3, 0] }, wink: { mouth: 'open', lid: .1, wink: 1, brow: .1, look: [.2, 0] },
    worried: { mouth: 'wobble', lid: .15, brow: .22, inner: 1, look: [0, .2] },
  };
  const mix = (a, b, k) => { const o = {}; for (const key in a) o[key] = typeof a[key] === 'number' ? lerp(a[key], b[key] ?? a[key], k) : (k < .5 ? a[key] : b[key]); return o; };
  const backEase = t => { const c = 1.4; t = clamp(t); return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
  function poseAt(keys, t, delay = 0) { const tt = t - delay; let i = 0; while (i < keys.length - 1 && tt >= keys[i + 1][0]) i++; const cur = POSE[keys[i][1]] || POSE.idle; if (i === 0 && tt < keys[0][0]) return cur; const prev = i > 0 ? (POSE[keys[i - 1][1]] || POSE.idle) : cur;
    const k = i > 0 ? backEase((tt - keys[i][0]) / .55) : 1; return mix(prev, cur, k); }
  function faceAt(keys, t) { let i = 0; while (i < keys.length - 1 && t >= keys[i + 1][0]) i++; const f = FACE[keys[i][2] || 'happy'] || FACE.happy, p = i > 0 ? FACE[keys[i - 1][2] || 'happy'] || FACE.happy : f, k = i > 0 ? clamp((t - keys[i][0]) / .25) : 1; return k >= 1 ? f : { ...f, brow: lerp(p.brow ?? 0, f.brow ?? 0, k) }; }

  // ---------------------------------------------------------------- one character
  function draw(name, x, y, h, lt, o = {}) { const C = CAST[name] || CAST.bun, keys = o.keys || [[0, o.pose || 'idle', o.expr || 'happy']], b = C.build || 1;
    const P = poseAt(keys, lt), Ph = poseAt(keys, lt, .09), Fc = faceAt(keys, lt), seed = name.length * 1.7;
    const breath = Math.sin(lt * 2.1 + seed) * .012, wave = keys.some(k => k[1] === 'wave') && P.aR > 2 ? Math.sin(lt * 9) * .35 : 0;
    const rh = h * .2, tW = h * .32 * b, tH = h * .3, legL = h * .27; ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
    ctx.save(); ctx.globalAlpha = .16; ell(0, 0, h * .26 * b, h * .04, '#1B1530', 0); ctx.restore();
    const hipY = -legL, sq = 1 + (P.sq || 0) + breath;
    // legs + shoes
    [-1, 1].forEach(sd => { tube(sd * tW * .2, hipY, sd * tW * .24, -h * .03, h * .1, C.pants); rectF(sd * tW * .24 - h * .065 + sd * h * .02, -h * .06, h * .13, h * .06, h * .03, C.shoes, { plane: .65 }); });
    // upper body pivots at the hips
    ctx.save(); ctx.translate(0, hipY); ctx.rotate(P.lean); ctx.scale(1, sq);
    const neckY = -tH, shY = neckY + h * .045, upA = h * .17, foA = h * .16, armW = h * .085, skinD = shade(C.skin, -.12);
    const arm = (sd, a, f, front) => { const sx = sd * tW * .44, ex = sx + sd * Math.sin(a) * upA, ey = shY + Math.cos(a) * upA, hx = ex + sd * Math.sin(f + (sd > 0 ? wave : 0)) * foA, hy = ey + Math.cos(f + (sd > 0 ? wave : 0)) * foA;
      tube(sx, shY, ex, ey, armW, C.top); tube(ex, ey, hx, hy, armW * .9, C.overalls ? C.skin : C.top); ovalF(hx, hy, h * .05, h * .05, C.skin, { plane: .55 }); return [hx, hy]; };
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
    const ex = r * .36, ey = y - r * .04, rx = r * .2, ry = r * .25, blink = ((lt + seed) % 3.7) < .12, look = Fc.look || [0, 0];
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

  // ---------------------------------------------------------------- demo scenes
  const SC = {
    lineup(lt) { burst('#FF7A45', '#FFC48A'); [[.82, .3, 22], [.9, .38, 14], [.12, .26, 16]].forEach(([x, y, s], k) => sparkle(W * x, H * y, s * U(), lt, k)); title(['MEET THE', 'IF CREW'], 1, 'THE IF MACHINE', 1);
      draw('prof', W * .2, H * .62, H * .3, lt, { keys: [[0, 'shrug', 'laugh']] }); draw('beard', W * .5, H * .58, H * .32, lt, { keys: [[0, 'crossed', 'smirk']] }); draw('hijab', W * .8, H * .62, H * .29, lt, { keys: [[0, 'point', 'wink']], flip: 1 });
      draw('braids', W * .12, H * .8, H * .26, lt, { keys: [[0, 'shock', 'shock']] }); draw('bun', W * .38, H * .8, H * .27, lt, { keys: [[0, 'cheer', 'grin']] }); draw('cap', W * .88, H * .8, H * .26, lt, { keys: [[0, 'think', 'bored']], flip: 1 }); iffy(W * .64, H * .7, W * .17, lt); },
    hook(lt) { burst('#5B8DEF', '#BFD7FF', .5, .55); [['#7E9CF2', .0, .22], ['#9DB4F5', .2, .3], ['#7E9CF2', .42, .2], ['#9DB4F5', .62, .27], ['#7E9CF2', .82, .23]].forEach(([c, x, h]) => building(W * x, H * .68, W * .2, H * h, c)); floor('#F3D9B1');
      [[.18, .42, -.3, 0], [.8, .4, .4, 1], [.3, .3, .2, 1], [.72, .3, -.2, 0], [.86, .55, .1, 0], [.12, .58, -.1, 1]].forEach(([x, y, r, c], j) => { const yy = H * y - ((lt * .1 + j * .17) % 1) * H * .05; c ? coin(W * x, yy, W * .04, lt, r) : note(W * x, yy, W * .16, r + Math.sin(lt + j) * .2); });
      draw('prof', W * .48, H * .76, H * .4, lt, { keys: [[0, 'idle', 'happy'], [.6, 'shock', 'shock']] }); iffy(W * .82, H * .56, W * .15, lt, { expr: 'shock' }); title(['WHAT IF MONEY', 'DISAPPEARED?'], 1, 'THE IF MACHINE'); },
    barter(lt) { burst('#3FB984', '#B8F0CF', .5, .5); floor('#F3E3C3'); title(['THE BARTER', 'PROBLEM'], 1, 'DOUBLE COINCIDENCE OF WANTS');
      cow(W * .34, H * .74, W * .42, lt); draw('beard', W * .1, H * .75, H * .3, lt, { keys: [[0, 'think', 'think']] }); sack(W * .7, H * .74, W * .16); draw('hijab', W * .88, H * .75, H * .3, lt, { keys: [[0, 'shrug', 'worried']], flip: 1 });
      bubble(W * .28, H * .33, W * .36, H * .1, W * .12, H * .44); sack(W * .28, H * .37, W * .14); bubble(W * .72, H * .33, W * .36, H * .1, W * .88, H * .44); shoe(W * .72, H * .355, W * .2); },
    queue(lt) { burst('#8E6CEF', '#D9CCFF', .7, .5); floor('#EBDDF7'); title(['FREE COSTS', 'TIME'], 1, 'ANSWER 1 · THE QUEUE'); shop(W * .64, H * .7, W * .34, H * .27); clock(W * .2, H * .38, W * .09, lt);
      draw('cap', W * .08, H * .75, H * .22, lt, { keys: [[0, 'think', 'bored']] }); draw('prof', W * .22, H * .755, H * .24, lt, { keys: [[0, 'idle', 'worried']] }); draw('braids', W * .36, H * .755, H * .22, lt, { keys: [[0, 'crossed', 'bored']] }); draw('beard', W * .5, H * .76, H * .27, lt, { keys: [[0, 'watch', 'think']] }); },
    motion(lt) { burst('#FF7A45', '#FFC48A'); title(['REAL', 'ACTING'], 1, 'IDLE → THINK → IDEA → CHEER'); floor('#FFE2C2'); draw('bun', W * .5, H * .76, H * .42, lt, { keys: [[0, 'idle', 'happy'], [.8, 'think', 'think'], [2.0, 'point', 'grin'], [3.0, 'cheer', 'laugh']] }); },
  };
  A.x_cast = (o, c, dur) => ({ sfx: [], draw: lt => (SC[o.v] || SC.lineup)(lt) });
  IFM.CAST = { draw, iffy, CAST, POSE, FACE, props: { coin, note, cow, sack, shoe, bubble, building, shop, clock }, F, ovalF, rectF, polyF, tube };
})();
