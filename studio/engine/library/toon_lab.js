/* CARTOON STYLE LAB (owner, 7 Nov 2026: "the first lab was ugly — I mean cartoon DRAWING styles, character art, like Duolingo's").
   One parametric cartoon kit: every character, animal and object is drawn by the same few primitives, and a STYLE decides the
   proportions, outline, shading, eyes, mouth, palette and type. Six styles (broad genres; no brand's characters are copied):
     chunky  — bold rounded flat shapes, big heads, big white eyes, belly shade, bright saturated colours (friendly app-mascot genre)
     bold    — thick black outlines, flat fills, sunburst, dot eyes (classic TV-cartoon genre)
     cosmic  — no outlines, soft gradients and rim light, tiny dot eyes, deep palette (science-explainer genre)
     soft    — pastel blobs, sleepy line eyes, blush, gentle (calm wellness-app genre)
     chibi   — huge heads, anime eyes with highlights, small bodies, thin outline, cel shade (chibi genre)
     doodle  — black marker line art on cream, one orange accent, hatching (notebook-doodle genre)
   act: x_toon s=<style> v=hook|barter|queue */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT) return;
  const A = IFM.ACT, CH = {}; let ST = null, LT = 0;
  const cache = (k, fn) => { const key = k + W + 'x' + H; if (!CH[key]) { const cv = mkCanvas(W, H); withCtx(cv.getContext('2d'), fn); CH[key] = cv; } return CH[key]; };
  const noise = k => cache('nz' + k, () => { const id = ctx.createImageData(W, H), r = rng(k); for (let i = 0; i < id.data.length; i += 4) { const v = r() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } ctx.putImageData(id, 0, 0); });

  const STY = {
    chunky: { ol: 0, shade: 'under', head: .44, eye: 'big', blush: 0, rnd: 1, font: '"Baloo 2"', fw: 800,
      pal: { bg1: '#DDF4FF', bg2: '#C4ECFF', ground: '#89E219', ground2: '#58A700', ink: '#3C3C3C', a: '#58CC02', b: '#1CB0F6', c: '#FFC800', d: '#FF4B4B', e: '#CE82FF', skin: ['#F8C9A0', '#C68E62', '#8D5A3B', '#FFDCBC'], hair: ['#4B2E1E', '#2B2B2B', '#E8A33C', '#7A3E1D'], cow: '#FFFFFF', spot: '#4B4B4B', coin: '#FFC800', note: '#58CC02', white: '#FFFFFF' } },
    bold: { ol: 7, olc: '#121212', shade: 'flat', head: .36, eye: 'dot', blush: 0, rnd: .6, font: '"Bangers"', fw: 400,
      pal: { bg1: '#FFE45E', bg2: '#FFD23F', ground: '#7BD389', ground2: '#3BA55C', ink: '#121212', a: '#EE4266', b: '#3BCEAC', c: '#FFD23F', d: '#540D6E', e: '#0EAD69', skin: ['#FFD6B0', '#E0A070', '#9C6440', '#FFE2C6'], hair: ['#121212', '#5C2E0E', '#121212', '#B5651D'], cow: '#FFFFFF', spot: '#121212', coin: '#FFD23F', note: '#0EAD69', white: '#FFFFFF' } },
    cosmic: { ol: 0, shade: 'grad', head: .34, eye: 'tiny', blush: 0, rnd: .9, font: '"Unbounded"', fw: 900,
      pal: { bg1: '#1B1B4B', bg2: '#0B0B2A', ground: '#2E2A6B', ground2: '#221E54', ink: '#FFFFFF', a: '#FF6B6B', b: '#4ECDC4', c: '#FFD166', d: '#A06CD5', e: '#06D6A0', skin: ['#F4B183', '#C98B5E', '#8E5B3A', '#FFD3B0'], hair: ['#2C1F4A', '#141433', '#F28F3B', '#5B2A86'], cow: '#F1F1FF', spot: '#3A3A7A', coin: '#FFD166', note: '#06D6A0', white: '#FFFFFF' } },
    soft: { ol: 0, shade: 'none', head: .38, eye: 'line', blush: 1, rnd: 1, font: '"Coiny"', fw: 400,
      pal: { bg1: '#FFF1E6', bg2: '#FDE2E4', ground: '#BEE1C6', ground2: '#9FCFAE', ink: '#5A4A6B', a: '#FF9AA2', b: '#A0C4FF', c: '#FFD6A5', d: '#BDB2FF', e: '#9BF6FF', skin: ['#FFCDB2', '#E5A88A', '#B5785E', '#FFE0CC'], hair: ['#6D597A', '#B56576', '#E56B6F', '#355070'], cow: '#FFFFFF', spot: '#BDB2FF', coin: '#FFD6A5', note: '#BEE1C6', white: '#FFFFFF' } },
    chibi: { ol: 3, olc: '#3A2E3E', shade: 'cel', head: .52, eye: 'anime', blush: 1, rnd: .85, font: '"Paytone One"', fw: 400,
      pal: { bg1: '#E9F5FF', bg2: '#FCE7F3', ground: '#C9F2C7', ground2: '#9BD99A', ink: '#3A2E3E', a: '#FF7EB6', b: '#6EC1FF', c: '#FFE066', d: '#A78BFA', e: '#5EEAD4', skin: ['#FFE1CF', '#F2C3A3', '#C98E6E', '#FFEDE2'], hair: ['#5B3A8C', '#2E2E48', '#F59E0B', '#EC4899'], cow: '#FFFFFF', spot: '#5B4A6E', coin: '#FFE066', note: '#86EFAC', white: '#FFFFFF' } },
    doodle: { ol: 4, olc: '#1E1E1E', shade: 'hatch', head: .33, eye: 'dot', blush: 0, rnd: .7, font: '"Patrick Hand"', fw: 400, wob: 1, mono: 1,
      pal: { bg1: '#FBF6EA', bg2: '#F6EEDB', ground: '#FBF6EA', ground2: '#1E1E1E', ink: '#1E1E1E', a: '#FF6B35', b: '#FBF6EA', c: '#FF6B35', d: '#FBF6EA', e: '#FBF6EA', skin: ['#FBF6EA', '#FBF6EA', '#FBF6EA', '#FBF6EA'], hair: ['#1E1E1E', '#1E1E1E', '#1E1E1E', '#1E1E1E'], cow: '#FBF6EA', spot: '#1E1E1E', coin: '#FF6B35', note: '#FBF6EA', white: '#FBF6EA' } },
  };

  // ---------------------------------------------------------------- the one primitive: a filled shape in the current style
  function shape(path, col, box, o = {}) { const S = ST, u = U(); ctx.save();
    const run = () => { ctx.beginPath(); path(); };
    if (S.shade === 'grad') { const [x, y, w, h] = box; const g = ctx.createLinearGradient(x, y, x + w * .4, y + h); g.addColorStop(0, shade(col, .18)); g.addColorStop(1, shade(col, -.28)); run(); ctx.fillStyle = g; ctx.fill();
      ctx.save(); run(); ctx.clip(); ctx.globalCompositeOperation = 'screen'; ctx.strokeStyle = 'rgba(160,220,255,.45)'; ctx.lineWidth = 6 * u; ctx.translate(-3 * u, -2 * u); run(); ctx.stroke(); ctx.restore(); }
    else { run(); ctx.fillStyle = col; ctx.fill(); }
    if ((S.shade === 'under' || S.shade === 'cel') && !o.noShade) { const [x, y, w, h] = box; ctx.save(); run(); ctx.clip(); ctx.fillStyle = shade(col, S.shade === 'cel' ? -.12 : -.14); ctx.beginPath(); if (S.shade === 'under') ctx.ellipse(x + w * .62, y + h * 1.05, w * .75, h * .42, 0, 0, TAU); else ctx.rect(x + w * .6, y, w, h); ctx.fill();
      if (S.shade === 'under') { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(x + w * .3, y + h * .2, w * .12, h * .06, -.4, 0, TAU); ctx.fill(); } ctx.restore(); }
    if (S.shade === 'hatch' && col !== '#FBF6EA' && !o.noShade) { const [x, y, w, h] = box; ctx.save(); run(); ctx.clip(); ctx.strokeStyle = 'rgba(30,30,30,.3)'; ctx.lineWidth = 1.6 * u; for (let k = -h; k < w; k += 9 * u) { ctx.beginPath(); ctx.moveTo(x + k, y + h); ctx.lineTo(x + k + h, y); ctx.stroke(); } ctx.restore(); }
    if (S.ol && !o.noOl) { ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = S.olc; const lw = (o.ow || S.ol) * u;
      if (S.wob) { const r = rng(Math.round(box[0] * 3 + box[1])); for (let p = 0; p < 2; p++) { ctx.save(); ctx.translate((r() - .5) * 2.4 * u, (r() - .5) * 2.4 * u); run(); ctx.lineWidth = lw * (p ? .45 : 1); ctx.stroke(); ctx.restore(); } } else { run(); ctx.lineWidth = lw; ctx.stroke(); } }
    ctx.restore(); }
  const rrect = (x, y, w, h, r, col, o) => shape(() => ctx.roundRect(x, y, w, h, Math.max(0, Math.min(r, w / 2, h / 2))), col, [x, y, w, h], o);
  const oval = (x, y, rx, ry, col, o) => shape(() => ctx.ellipse(x, y, rx, ry, (o && o.rot) || 0, 0, TAU), col, [x - rx, y - ry, rx * 2, ry * 2], o);
  const blob = (pts, col, o) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); shape(() => { const n = pts.length; ctx.moveTo((pts[0][0] + pts[n - 1][0]) / 2, (pts[0][1] + pts[n - 1][1]) / 2); for (let i = 0; i < n; i++) { const p = pts[i], q = pts[(i + 1) % n]; ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } ctx.closePath(); }, col, [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)], o); };
  const limb = (x1, y1, x2, y2, w, col, bend = 0) => { const S = ST, u = U(); ctx.save(); ctx.lineCap = 'round'; const mx = (x1 + x2) / 2 + bend, my = (y1 + y2) / 2;
    if (S.ol) { ctx.strokeStyle = S.olc; ctx.lineWidth = w + S.ol * 2 * u; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); }
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); ctx.restore(); };
  const inkCol = () => ST.olc || (ST === STY.cosmic ? '#1A1433' : ST.pal.ink);

  // ---------------------------------------------------------------- face
  function face(x, y, r, expr, skin) { const S = ST, P = S.pal, u = U(), ex = r * .36, ey = y - r * .05, blink = Math.sin(LT * 1.3 + x * .01) > .985;
    const eye = sx => { const cx = x + sx * ex;
      if (S.eye === 'big') { ell(cx, ey, r * .25, r * .28, '#FFFFFF', 0); const lk = expr === 'shock' ? 0 : .06; circ(cx + r * lk, ey + r * .03, r * (expr === 'shock' ? .09 : .13), '#222', 0); circ(cx + r * lk - r * .04, ey - r * .03, r * .045, '#FFF', 0); }
      else if (S.eye === 'anime') { ell(cx, ey, r * .17, r * .24, '#FFFFFF', 0); ell(cx, ey + r * .03, r * .13, r * .2, P.b, 0); ell(cx, ey + r * .06, r * .08, r * .13, '#1F1A2E', 0); circ(cx - r * .05, ey - r * .06, r * .05, '#FFF', 0); circ(cx + r * .05, ey + r * .1, r * .025, '#FFF', 0);
        ctx.save(); ctx.strokeStyle = S.olc; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.arc(cx, ey + r * .02, r * .2, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); ctx.restore(); }
      else if (S.eye === 'line') { ctx.save(); ctx.strokeStyle = P.ink; ctx.lineWidth = r * .08; ctx.lineCap = 'round'; ctx.beginPath(); if (expr === 'shock') ctx.arc(cx, ey, r * .07, 0, TAU); else ctx.arc(cx, ey + r * .05, r * .1, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); ctx.restore(); }
      else if (S.eye === 'tiny') circ(cx, ey, r * (expr === 'shock' ? .09 : .065), '#1A1433', 0);
      else circ(cx, ey, r * (expr === 'shock' ? .1 : .075), inkCol(), 0);
      if (blink && S.eye !== 'line') { ctx.save(); ctx.fillStyle = skin; ctx.fillRect(cx - r * .3, ey - r * .32, r * .6, r * .3); ctx.restore(); } };
    eye(-1); eye(1);
    if (S.blush || S.eye === 'big') { ctx.save(); ctx.globalAlpha = .45; ell(x - r * .56, y + r * .24, r * .14, r * .08, '#FF8FA3', 0); ell(x + r * .56, y + r * .24, r * .14, r * .08, '#FF8FA3', 0); ctx.restore(); }
    ctx.save(); ctx.strokeStyle = inkCol(); ctx.lineCap = 'round'; ctx.lineWidth = Math.max(2 * u, r * .07); const my = y + r * .34;
    if (expr === 'shock') { ell(x, my + r * .04, r * .12, r * .16, '#5A1E2A', 0); ell(x, my + r * .1, r * .07, r * .06, '#FF7A8A', 0); }
    else if (expr === 'happy') { if (S.eye === 'big' || S.eye === 'anime') { ctx.beginPath(); ctx.moveTo(x - r * .22, my - r * .04); ctx.quadraticCurveTo(x, my + r * .3, x + r * .22, my - r * .04); ctx.closePath(); ctx.fillStyle = '#5A1E2A'; ctx.fill(); ctx.save(); ctx.clip(); ell(x, my + r * .18, r * .12, r * .08, '#FF7A8A', 0); ctx.restore(); } else { ctx.beginPath(); ctx.arc(x, my - r * .1, r * .2, .2 * Math.PI, .8 * Math.PI); ctx.stroke(); } }
    else if (expr === 'bored') { ctx.beginPath(); ctx.moveTo(x - r * .14, my + r * .02); ctx.lineTo(x + r * .14, my - r * .01); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(x + r * .05, my + r * .12, r * .12, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke(); }
    ctx.restore(); }

  // ---------------------------------------------------------------- a character: (x, y) = feet centre, h = total height
  function char(x, y, h, o = {}) { const S = ST, P = S.pal, u = U(), i = o.i || 0, skin = P.skin[i % 4], hair = P.hair[i % 4], shirt = o.shirt || [P.a, P.b, P.d, P.e, P.c][i % 5], pants = S.mono ? '#1E1E1E' : ['#3D5A80', '#4A4E69', '#2B2D42', '#6D597A'][i % 4];
    const hr = h * S.head * .5, legH = h * (S.head > .48 ? .14 : .22), bodyH = h - hr * 2 - legH, f = o.flip ? -1 : 1, bob = Math.sin(LT * 2.2 + i) * h * .006, pose = o.pose || 'stand';
    ctx.save(); ctx.translate(x, y); ctx.scale(f, 1); ctx.save(); ctx.globalAlpha = .18; ell(0, 0, h * .2, h * .035, '#000', 0); ctx.restore();
    const bw = h * (S.head > .48 ? .3 : .32), byTop = -legH - bodyH + bob;
    const legW = h * .08; [-1, 1].forEach(sd => { limb(sd * bw * .22, -legH * .6 + bob, sd * bw * .24, -h * .02, legW, pants); rrect(sd * bw * .24 - h * .055 + sd * h * .02, -h * .045, h * .11, h * .05, h * .025, S.mono ? '#1E1E1E' : '#2B2B2B'); });
    const sh = byTop + bodyH * .2, armW = h * .07, hand = (hx, hy) => oval(hx, hy, h * .045, h * .045, skin);
    blob([[-bw * .42, byTop + bodyH * .15], [-bw * .2, byTop - bodyH * .05], [bw * .2, byTop - bodyH * .05], [bw * .42, byTop + bodyH * .15], [bw * .56, byTop + bodyH * .95], [0, byTop + bodyH * 1.14], [-bw * .56, byTop + bodyH * .95]], shirt);
    if (pose === 'up') [-1, 1].forEach(sd => { limb(sd * bw * .4, sh, sd * bw * .78, sh - h * .2, armW, shirt, sd * 8 * u); hand(sd * bw * .78, sh - h * .2); });
    else if (pose === 'watch') { limb(-bw * .4, sh, -bw * .05, sh + bodyH * .32, armW, shirt, -10 * u); hand(-bw * .05, sh + bodyH * .32); limb(bw * .4, sh, bw * .12, sh + bodyH * .28, armW, shirt, 10 * u); circ(bw * .1, sh + bodyH * .26, h * .028, P.c, 0); }
    else [-1, 1].forEach(sd => { limb(sd * bw * .4, sh, sd * bw * .56, sh + bodyH * .7, armW, shirt, sd * 6 * u); hand(sd * bw * .56, sh + bodyH * .7); });
    const hy = byTop - hr * .9; oval(0, hy, hr * (S.head > .48 ? 1.08 : 1), hr, skin);
    const hs = i % 4;
    if (hs === 0) blob([[-hr * 1.02, hy - hr * .05], [-hr * .9, hy - hr * .95], [0, hy - hr * 1.18], [hr * .9, hy - hr * .95], [hr * 1.02, hy - hr * .05], [hr * .55, hy - hr * .55], [-hr * .3, hy - hr * .45]], hair);
    else if (hs === 1) blob([[-hr * 1.05, hy + hr * .55], [-hr * 1.1, hy - hr * .7], [0, hy - hr * 1.2], [hr * 1.1, hy - hr * .7], [hr * 1.05, hy + hr * .55], [hr * .8, hy - hr * .35], [-hr * .8, hy - hr * .35]], hair);
    else if (hs === 2) { oval(0, hy - hr * .78, hr * .85, hr * .42, hair); oval(hr * .75, hy - hr * 1.1, hr * .3, hr * .3, hair); }
    else blob([[-hr * 1.0, hy - hr * .1], [-hr * .7, hy - hr * 1.05], [hr * .2, hy - hr * 1.15], [hr * 1.0, hy - hr * .6], [hr * .95, hy - hr * .1], [hr * .2, hy - hr * .6]], hair);
    if (o.hat === 'farmer') { oval(0, hy - hr * .75, hr * 1.5, hr * .22, '#E9C46A'); rrect(-hr * .7, hy - hr * 1.35, hr * 1.4, hr * .62, hr * .3, '#F4D58D'); }
    face(0, hy + hr * .1, hr, o.expr || 'happy', skin);
    ctx.restore(); }

  // ---------------------------------------------------------------- props in the same style
  function coin(x, y, r, rot = 0) { const P = ST.pal; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); oval(0, r * .14, r, r, shade(P.coin, -.25)); oval(0, 0, r, r, P.coin); oval(0, 0, r * .66, r * .66, shade(P.coin, .12), { noOl: !ST.ol, noShade: 1 }); ctx.fillStyle = shade(P.coin, -.38); ctx.font = `900 ${r * .9}px ${ST.font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('$', 0, r * .05); ctx.restore(); }
  function note(x, y, w, rot = 0) { const P = ST.pal, h = w * .5; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); rrect(-w / 2, -h / 2, w, h, h * .18, P.note); oval(0, 0, h * .28, h * .28, ST.mono ? '#FF6B35' : shade(P.note, .35), { noShade: 1 }); ctx.restore(); }
  function cow(x, y, s, o = {}) { const P = ST.pal, f = o.flip ? -1 : 1; ctx.save(); ctx.translate(x, y); ctx.scale(f, 1); ctx.save(); ctx.globalAlpha = .16; ell(0, 0, s * .45, s * .06, '#000', 0); ctx.restore(); const b = Math.sin(LT * 1.6) * s * .006, hoof = ST.mono ? '#1E1E1E' : '#4A3B32';
    [-.3, -.14, .14, .3].forEach(l => { rrect(s * l - s * .045, -s * .3, s * .09, s * .3, s * .04, P.cow); rrect(s * l - s * .05, -s * .06, s * .1, s * .06, s * .02, hoof); });
    blob([[-s * .46, -s * .5 + b], [s * .3, -s * .56 + b], [s * .46, -s * .38 + b], [s * .38, -s * .2 + b], [-s * .42, -s * .2 + b]], P.cow);
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, -s * .37 + b, s * .44, s * .17, 0, 0, TAU); ctx.clip(); [[-.22, -.44, .1], [.06, -.3, .11], [.27, -.46, .07]].forEach(([sx, sy, r]) => blob([[s * (sx - r), s * sy], [s * sx, s * (sy - r * .8)], [s * (sx + r), s * sy], [s * sx, s * (sy + r * .7)]], P.spot, { noOl: 1, noShade: 1 })); ctx.restore();
    oval(s * .38, -s * .68 + b, s * .07, s * .035, P.cow, { rot: -.5 }); oval(s * .5, -s * .53 + b, s * .17, s * .16, P.cow); oval(s * .6, -s * .44 + b, s * .12, s * .08, ST.mono ? '#FBF6EA' : '#FFB3C1', { noShade: 1 });
    face(s * .49, -s * .57 + b, s * .12, o.expr || 'happy', P.cow); ctx.restore(); }
  function sack(x, y, s, label = 'RICE') { blob([[-s * .32, 0], [-s * .4, -s * .4], [-s * .14, -s * .72], [s * .14, -s * .72], [s * .4, -s * .4], [s * .32, 0]].map(([a, b]) => [x + a, y + b]), ST.mono ? '#FBF6EA' : '#E6C98F'); oval(x, y - s * .76, s * .17, s * .07, ST.mono ? '#FF6B35' : '#F5E6B8', { noShade: 1 });
    if (label) { ctx.save(); ctx.fillStyle = ST.mono ? '#1E1E1E' : '#8A6A3A'; ctx.font = `${ST.fw} ${s * .16}px ${ST.font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, x, y - s * .32); ctx.restore(); } }
  function shoe(x, y, s) { blob([[x - s * .5, y], [x - s * .5, y - s * .35], [x - s * .05, y - s * .25], [x + s * .5, y - s * .1], [x + s * .5, y]], ST.mono ? '#FF6B35' : ST.pal.b); rrect(x - s * .52, y - s * .05, s * 1.04, s * .1, s * .05, ST.mono ? '#FBF6EA' : '#FFFFFF', { noShade: 1 }); }
  function bubble(x, y, w, h, tx, ty) { const P = ST.pal; rrect(x - w / 2, y - h / 2, w, h, h * .45, P.white, { noShade: 1 }); oval(lerp(x, tx, .55), lerp(y + h / 2, ty, .55), h * .1, h * .1, P.white, { noShade: 1 }); oval(lerp(x, tx, .8), lerp(y + h / 2, ty, .8), h * .06, h * .06, P.white, { noShade: 1 }); }
  function clock(x, y, r) { const P = ST.pal, dark = ST === STY.cosmic ? '#1B1B4B' : P.ink; oval(x, y, r, r, P.white); for (let i = 0; i < 12; i += 3) { const a = i / 12 * TAU; circ(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78, r * .06, dark, 0); }
    ctx.save(); ctx.strokeStyle = dark; ctx.lineCap = 'round'; ctx.lineWidth = r * .1; const m = LT * 1.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(m) * r * .65, y - Math.cos(m) * r * .65); ctx.stroke(); ctx.lineWidth = r * .12; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(m / 12) * r * .42, y - Math.cos(m / 12) * r * .42); ctx.stroke(); ctx.restore(); circ(x, y, r * .08, ST.mono ? '#FF6B35' : P.d, 0); }
  function building(x, yb, w, h, i) { const P = ST.pal, col = ST.mono ? '#FBF6EA' : [shade(P.b, .25), shade(P.e, .2), shade(P.c, .15), shade(P.d, .3), shade(P.a, .2)][i % 5]; rrect(x, yb - h, w, h + 30, w * .14 * ST.rnd, col);
    const rows = Math.floor((h - w * .3) / (w * .38)); for (let r = 0; r < rows; r++) for (let c = 0; c < 2; c++) rrect(x + w * (.18 + c * .38), yb - h + w * .22 + r * w * .38, w * .26, w * .24, w * .06, ST.mono ? '#FBF6EA' : (((r + c + i) % 3) ? '#FFF6D6' : shade(col, -.15)), { ow: (ST.ol || 0) * .6, noShade: 1 }); }
  function shop(x, yb, w, h) { const P = ST.pal; rrect(x, yb - h, w, h + 14, w * .06, ST.mono ? '#FBF6EA' : shade(P.d, .35));
    for (let i = 0; i < 5; i++) shape(() => { ctx.moveTo(x + i * w / 5, yb - h); ctx.lineTo(x + (i + 1) * w / 5, yb - h); ctx.lineTo(x + (i + 1) * w / 5, yb - h + h * .12); ctx.arc(x + (i + .5) * w / 5, yb - h + h * .12, w / 10, 0, Math.PI); ctx.closePath(); }, i % 2 ? P.white : (ST.mono ? '#FF6B35' : P.a), [x, yb - h, w, h * .3], { noShade: 1 });
    rrect(x + w * .36, yb - h * .5, w * .28, h * .5 + 8, w * .04, ST.mono ? '#FBF6EA' : shade(P.d, -.2)); rrect(x + w * .18, yb - h * .8, w * .64, h * .17, h * .06, ST.mono ? '#FF6B35' : P.c, { noShade: 1 });
    ctx.save(); ctx.fillStyle = ST.mono ? '#1E1E1E' : (ST === STY.cosmic ? '#1B1B4B' : P.ink); ctx.font = `${ST.fw} ${h * .12}px ${ST.font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('FREE', x + w / 2, yb - h * .71); ctx.restore(); }

  // ---------------------------------------------------------------- backgrounds and type
  function back(key) { const S = ST, P = S.pal, u = U(); ctx.drawImage(cache('tb' + key, () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, P.bg1); g.addColorStop(1, P.bg2); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (S === STY.cosmic) { const r = rng(4); for (let i = 0; i < 160; i++) { ctx.globalAlpha = .3 + r() * .7; ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(r() * W, r() * H * .6, r() * 2.2 + .5, 0, TAU); ctx.fill(); } ctx.globalAlpha = 1; }
      if (S === STY.doodle) { ctx.strokeStyle = 'rgba(30,30,30,.07)'; ctx.lineWidth = 1; for (let y = 0; y < H; y += H / 48) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }
      if (S === STY.bold) { ctx.fillStyle = 'rgba(255,255,255,.35)'; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(W / 2, H * .45); ctx.arc(W / 2, H * .45, H, i * TAU / 14, i * TAU / 14 + TAU / 28); ctx.fill(); } } }), 0, 0);
    if (S !== STY.cosmic && S !== STY.doodle) [[.16, .28, 1], [.8, .33, .8]].forEach(([x, y, k], i) => { const cx = W * x + Math.sin(LT * .1 + i) * 20 * u; blob([[cx - W * .1 * k, H * y], [cx - W * .05 * k, H * y - H * .03 * k], [cx + W * .03 * k, H * y - H * .04 * k], [cx + W * .1 * k, H * y], [cx, H * y + H * .015 * k]], '#FFFFFF', { noOl: S !== STY.bold, noShade: 1 }); });
    if (S === STY.cosmic) { oval(W * .84, H * .3, W * .08, W * .08, '#FF9E6D'); ctx.save(); ctx.strokeStyle = 'rgba(255,209,102,.6)'; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.ellipse(W * .84, H * .3, W * .14, W * .035, -.3, 0, TAU); ctx.stroke(); ctx.restore(); } }
  function ground() { const S = ST, P = S.pal, u = U(), gy = H * .66; shape(() => { ctx.moveTo(-20, gy + 10); ctx.quadraticCurveTo(W * .3, gy - H * .02, W * .55, gy); ctx.quadraticCurveTo(W * .8, gy + H * .015, W + 20, gy - 5); ctx.lineTo(W + 20, H + 20); ctx.lineTo(-20, H + 20); ctx.closePath(); }, P.ground, [0, gy - 20, W, H * .4], { noShade: S.shade === 'under' ? 0 : 1 });
    if (!S.mono) { for (let i = 0; i < 7; i++) { const r = rng(i + 3), x = W * r(), y = H * (.73 + r() * .2), s = (18 + r() * 16) * u; blob([[x - s, y], [x, y - s * .8], [x + s, y]], P.ground2, { noOl: 1, noShade: 1 }); } } }
  function title(lines, hiIdx, kick) { const S = ST, P = S.pal, u = U(); let s = 100 * u; ctx.save(); lines.forEach(l => { ctx.font = `${S.fw} ${s}px ${S.font}`; s = Math.min(s, s * W * .86 / ctx.measureText(l).width); }); const lh = s * 1.02, y0 = H * .155;
    if (kick) { ctx.font = `700 ${26 * u}px "Space Mono", monospace`; ctx.textAlign = 'center'; ctx.fillStyle = S === STY.cosmic ? '#9AA6FF' : P.ink; ctx.globalAlpha = .7; ctx.fillText(kick, W / 2, H * .085); ctx.globalAlpha = 1; }
    lines.forEach((l, i) => { const y = y0 + i * lh, hi = i === hiIdx, col = hi ? (S.mono ? '#FF6B35' : S === STY.cosmic ? P.c : P.a) : (S === STY.cosmic ? '#FFFFFF' : P.ink); ctx.font = `${S.fw} ${s}px ${S.font}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      if (S === STY.chunky) { ctx.fillStyle = hi ? shade(col, -.3) : '#B9CBD6'; ctx.fillText(l, W / 2, y + 7 * u); }
      if (S.ol) { ctx.lineJoin = 'round'; ctx.lineWidth = Math.min(6, S.ol * 1.2) * u; ctx.strokeStyle = S.olc; ctx.strokeText(l, W / 2, y); }
      if (S === STY.cosmic) { ctx.shadowColor = col; ctx.shadowBlur = 20 * u; } ctx.fillStyle = col; ctx.fillText(l, W / 2, y); ctx.shadowBlur = 0; }); ctx.restore(); }

  // ---------------------------------------------------------------- the three sample scenes
  const SC = {
    hook(k) { back(k + 'h'); [[-.02, .2], [.17, .26], [.36, .17], [.58, .24], [.78, .19]].forEach(([x, h], i) => building(W * x, H * .67, W * .2, H * h, i)); ground();
      [[.18, .48, -.3, 0], [.8, .44, .4, 1], [.28, .36, .2, 1], [.7, .33, -.2, 0], [.86, .56, .1, 0], [.12, .6, -.1, 1]].forEach(([x, y, r, c], j) => { const yy = H * y - ((LT * .08 + j * .17) % 1) * H * .04; c ? coin(W * x, yy, W * .045, r) : note(W * x, yy, W * .17, r); });
      char(W * .5, H * .74, H * .4, { i: 0, pose: 'up', expr: 'shock' }); title(['WHAT IF MONEY', 'DISAPPEARED?'], 1, 'THE IF MACHINE'); },
    barter(k) { back(k + 'b'); ground(); title(['THE BARTER', 'PROBLEM'], 1, 'DOUBLE COINCIDENCE OF WANTS');
      cow(W * .34, H * .72, W * .42); char(W * .11, H * .73, H * .28, { i: 2, hat: 'farmer', expr: 'think' }); sack(W * .7, H * .72, W * .17); char(W * .88, H * .73, H * .28, { i: 1, expr: 'think', flip: 1 });
      bubble(W * .28, H * .37, W * .38, H * .12, W * .12, H * .47); sack(W * .28, H * .425, W * .13, 'RICE'); bubble(W * .72, H * .37, W * .38, H * .12, W * .88, H * .47); shoe(W * .72, H * .4, W * .2);
      oval(W * .5, H * .5, W * .065, W * .065, ST.mono ? '#FF6B35' : ST.pal.d); ctx.save(); ctx.fillStyle = '#FFF'; ctx.font = `900 ${W * .08}px "Baloo 2"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('≠', W * .5, H * .503); ctx.restore(); },
    queue(k) { back(k + 'q'); title(['FREE COSTS', 'TIME'], 1, 'ANSWER 1 · THE QUEUE'); ground(); shop(W * .63, H * .68, W * .36, H * .27);
      const ex = ['bored', 'think', 'happy', 'bored', 'shock', 'think']; for (let j = 4; j >= 0; j--) char(W * (.54 - j * .12), H * (.73 + j * .005), H * (.24 - j * .012), { i: j + 1, expr: ex[j], pose: j === 2 ? 'watch' : 'stand' });
      clock(W * .2, H * .38, W * .1); },
  };
  A.x_toon = (o, c, dur) => ({ sfx: [], draw: lt => { LT = lt; const key = STY[o.s] ? o.s : 'chunky'; ST = STY[key]; (SC[o.v] || SC.hook)(key); ctx.save(); ctx.globalAlpha = .035; ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(noise(7), 0, 0); ctx.restore(); } });
  IFM.TOON = { STY, char, cow, coin, note, sack, shoe, shop, clock, building, bubble, shape, rrect, oval, blob, face, use: s => { ST = STY[s] || STY.chunky; } };
})();
