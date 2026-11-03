/* THE IF MACHINE — people, new house styles (Nov 2026). Not the old chibi rig: no outlines, no big heads, no Vietnam cast.
   IFM.human(x, y, h, seed, pose, lt, o)   x,y = feet on the ground, h = height in px
   styles (o.style or episode header `people:`):
     flat    tall stylish figures, skin + clothes in flat blocks, tiny dot eyes, soft side shade (house default)
     pill    rounded capsule bodies, one colour each, white eye dots (crowds, data-ish scenes)
     shadow  solid silhouettes with a rim of light (night, drama, scale)
     line    monoline figures in Paper on dark (diagrams inside the world, blueprint feel)
   poses: stand look walk run phone cheer sit sleep point shock shrug think wave carry type
   o: flip, col (clothes), skin, hair, rim (shadow rim colour), phone (screen colour), alpha */
'use strict';
(function () {
  if (!window.IFM) return;
  const SK = ['#F5D3B8', '#E8B48F', '#C98D62', '#A86B44', '#7A4A2E', '#5A3520'], HC = ['#1E1A1C', '#3A2A22', '#6E4127', '#B7793E', '#D9B26A', '#9A9AA4', '#C2452E'];
  const CL = ['#E8574A', '#3E7CE0', '#F2B33D', '#2FB59A', '#7A5CD6', '#F28AA5', '#2D3A66', '#F6F1E7', '#5BC0EB', '#9BC53D', '#E66A2C', '#444B6E'], PANTS = ['#2D3A66', '#3B3F4E', '#5B5048', '#1F4E79', '#7A6A58', '#E9E2D0'];
  function look(seed, o) { const r = rng(seed * 7919 + 3); const pick = a => a[Math.floor(r() * a.length)]; return { skin: o.skin || pick(SK), hair: o.hair || pick(HC), hs: Math.floor(r() * 6), top: o.col || pick(CL), pants: pick(PANTS), bulk: .9 + r() * .25, tall: .92 + r() * .14, skirt: r() < .22, bag: r() < .15, glasses: r() < .18 }; }
  // joint angles per pose (radians; 0 = straight down). [armL, foreL, armR, foreR, legL, kneeL, legR, kneeR, lean, headTilt]
  function poseAngles(pose, t, ph) { const s = Math.sin, w = t * 6 + ph; switch (pose) {
    case 'walk': return [s(w) * .5, -.3, -s(w) * .5, -.3, -s(w) * .45, Math.max(0, s(w + 1.6)) * .7, s(w) * .45, Math.max(0, -s(w + 1.6)) * .7, .03, 0];
    case 'run': { const r2 = t * 11 + ph; return [s(r2) * 1.1, -1.5, -s(r2) * 1.1, -1.5, -s(r2) * .9, Math.max(0, s(r2 + 1.6)) * 1.5, s(r2) * .9, Math.max(0, -s(r2 + 1.6)) * 1.5, .22, .05]; }
    case 'phone': return [.15, 0, -.5, -2.1, .04, 0, -.04, 0, .02, .22 + s(t + ph) * .03];
    case 'cheer': return [2.7 + s(t * 7 + ph) * .15, .2, -2.7 - s(t * 7 + ph) * .15, -.2, .1, 0, -.1, 0, 0, -.12];
    case 'sit': return [.5, -1, .2, -1.2, 1.5, -1.5, 1.4, -1.45, -.05, .05];
    case 'sleep': return [.1, 0, -.1, 0, .05, 0, -.05, 0, 0, .3];
    case 'point': return [.1, 0, -2.0, -.15, .05, 0, -.05, 0, -.02, -.08];
    case 'shock': return [1.4 + s(t * 20) * .05, 1.4, -1.4 - s(t * 20) * .05, -1.4, .18, 0, -.18, 0, -.06, -.1];
    case 'shrug': return [.9, 1.6, -.9, -1.6, .05, 0, -.05, 0, 0, .15 * s(t * 2)];
    case 'think': return [.15, 0, -.6, -2.5, .05, 0, -.05, 0, 0, .12];
    case 'wave': return [.15, 0, -2.4 + s(t * 8 + ph) * .3, -.5, .05, 0, -.05, 0, 0, 0];
    case 'carry': return [-.9, -.9, .9, .9, -s(t * 5 + ph) * .3, .2, s(t * 5 + ph) * .3, .2, .05, 0];
    case 'type': return [.9, -1.1, .7, -.9, 1.5, -1.5, 1.4, -1.45, .1, .25];
    case 'look': return [.12, 0, -.12, 0, .05, 0, -.05, 0, -.03, -.25 + s(t * .8 + ph) * .1];
    default: return [.12 + s(t * 1.3 + ph) * .03, 0, -.12 - s(t * 1.3 + ph) * .03, 0, .05, 0, -.05, 0, 0, s(t * .9 + ph) * .04]; } }
  function limb(x, y, a1, a2, l1, l2, w, col) { const x1 = x + Math.sin(a1) * l1, y1 = y + Math.cos(a1) * l1, x2 = x1 + Math.sin(a1 + a2) * l2, y2 = y1 + Math.cos(a1 + a2) * l2; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); return [x2, y2]; }
  function human(x, y, h, seed, pose, lt, o = {}) { if (h < 2) return; const L = look(seed, o), st = o.style || IFM.peopleStyle || 'flat', ph = seed * 1.7; let A = poseAngles(pose || 'stand', lt, ph);
    ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
    if (pose === 'sleep') { ctx.rotate(-Math.PI / 2); ctx.translate(-h * .12, -h * .02); }
    const H_ = h * L.tall, u = H_ / 100, bob = (pose === 'walk' ? Math.abs(Math.sin(lt * 6 + ph)) * 1.4 : pose === 'run' ? Math.abs(Math.sin(lt * 11 + ph)) * 3 : 0) * u, sitDrop = (pose === 'sit' || pose === 'type') ? 22 * u : 0;
    const hip = [0, -46 * u - bob + sitDrop], neck = [Math.sin(A[8]) * 36 * u, hip[1] - 34 * u], head = [neck[0] + Math.sin(A[9]) * 4 * u, neck[1] - 11 * u];
    const C = st === 'shadow' ? { skin: o.dark || '#0B0E22', top: o.dark || '#0B0E22', pants: o.dark || '#0B0E22', hair: o.dark || '#0B0E22' } : st === 'pill' ? { skin: L.top, top: L.top, pants: shade(L.top, -.18), hair: shade(L.top, -.25) } : st === 'line' ? { skin: 'none', top: 'none', pants: 'none', hair: 'none' } : { skin: L.skin, top: L.top, pants: L.pants, hair: L.hair };
    const lw = (st === 'pill' ? 9.5 : 6.6) * u * L.bulk, armW = (st === 'pill' ? 8 : 5) * u * L.bulk;
    if (st === 'shadow' && o.rim !== 'none') glow(0, -50 * u, 70 * u, o.rim || '#FFC531', .28);
    if (st === 'line') { ctx.strokeStyle = o.ink || '#F6F1E7'; ctx.lineWidth = 3.2 * u; ctx.lineCap = 'round'; const seg = (p, a1, a2, l1, l2) => { const x1 = p[0] + Math.sin(a1) * l1, y1 = p[1] + Math.cos(a1) * l1; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(x1, y1); ctx.lineTo(x1 + Math.sin(a1 + a2) * l2, y1 + Math.cos(a1 + a2) * l2); ctx.stroke(); };
      seg(hip, A[4], A[5], 24 * u, 24 * u); seg(hip, A[6], A[7], 24 * u, 24 * u); ctx.beginPath(); ctx.moveTo(hip[0], hip[1]); ctx.lineTo(neck[0], neck[1]); ctx.stroke(); seg(neck, A[0], A[1], 17 * u, 16 * u); seg(neck, A[2], A[3], 17 * u, 16 * u); ctx.beginPath(); ctx.arc(head[0], head[1] - 2 * u, 8.5 * u, 0, TAU); ctx.stroke(); ctx.restore(); return; }
    const sh = c => st === 'shadow' ? c : shade(c, -.14);
    // back limbs (shaded)
    limb(hip[0] + 2.5 * u, hip[1], A[6], A[7], 24 * u, 24 * u, lw, sh(C.pants)); limb(neck[0] + 6 * u * L.bulk, neck[1] + 4 * u, A[2], A[3], 18 * u, 17 * u, armW, sh(C.top));
    // torso: shoulders, waist taper, rounded top
    ctx.fillStyle = C.top; ctx.beginPath(); const tw = (st === 'pill' ? 10.5 : 8.6) * u * L.bulk, wa = tw * (st === 'pill' ? .95 : .78); ctx.moveTo(hip[0] - wa, hip[1] + 5 * u); ctx.lineTo(neck[0] - tw, neck[1] + 6 * u); ctx.quadraticCurveTo(neck[0] - tw, neck[1], neck[0] - tw * .55, neck[1]); ctx.lineTo(neck[0] + tw * .55, neck[1]); ctx.quadraticCurveTo(neck[0] + tw, neck[1], neck[0] + tw, neck[1] + 6 * u); ctx.lineTo(hip[0] + wa, hip[1] + 5 * u); ctx.closePath(); ctx.fill();
    if (st === 'flat') { ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.fillRect(hip[0] + tw * .3, neck[1], tw * 2, 60 * u); ctx.restore(); }
    if (L.skirt && st === 'flat') { ctx.fillStyle = C.pants; ctx.beginPath(); ctx.moveTo(hip[0] - tw, hip[1]); ctx.lineTo(hip[0] + tw, hip[1]); ctx.lineTo(hip[0] + tw * 1.5, hip[1] + 18 * u); ctx.lineTo(hip[0] - tw * 1.5, hip[1] + 18 * u); ctx.fill(); }
    // front limbs
    const footL = limb(hip[0] - 2.5 * u, hip[1], A[4], A[5], 24 * u, 24 * u, lw, C.pants); if (st === 'flat') { ctx.fillStyle = '#20243A'; ctx.beginPath(); ctx.ellipse(footL[0] + 3 * u, footL[1], 6 * u, 3 * u, 0, 0, TAU); ctx.fill(); }
    const hand = limb(neck[0] - 5 * u * L.bulk, neck[1] + 4 * u, A[0], A[1], 18 * u, 17 * u, armW, C.top); if (st === 'flat') { ctx.fillStyle = C.skin; ctx.beginPath(); ctx.arc(hand[0], hand[1], 3.6 * u, 0, TAU); ctx.fill(); }
    // phone in the back hand
    if (pose === 'phone' || pose === 'type') { const a = A[2], b = A[3], px = neck[0] + 6 * u * L.bulk + Math.sin(a) * 18 * u + Math.sin(a + b) * 17 * u, py = neck[1] + 4 * u + Math.cos(a) * 18 * u + Math.cos(a + b) * 17 * u; ctx.fillStyle = '#121527'; ctx.fillRect(px - 2 * u, py - 9 * u, 7 * u, 12 * u); const sc = o.phone || '#9FE8FF'; if (sc !== 'off') { ctx.fillStyle = sc; ctx.fillRect(px - 1 * u, py - 8 * u, 5 * u, 10 * u); glow(px, py - 8 * u, 38 * u, sc, .3); } }
    if (window.LINT && LINT.on && (o.alpha ?? 1) > .3 && h > H * .08) { const m = ctx.getTransform(), hx = m.a * head[0] + m.c * head[1] + m.e, hy = m.b * head[0] + m.d * head[1] + m.f, r = Math.abs(m.a) * 10 * u; LINT.boxes.push({ k: 'face', x0: hx - r, x1: hx + r, y0: hy - r, y1: hy + r }); }
    // neck + head
    ctx.fillStyle = C.skin; if (st === 'flat') ctx.fillRect(neck[0] - 2.5 * u, neck[1] - 5 * u, 5 * u, 7 * u); ctx.beginPath(); ctx.ellipse(head[0], head[1] - 2 * u, 8 * u, 9.4 * u, A[9], 0, TAU); ctx.fill();
    if (st === 'flat') { ctx.fillStyle = C.hair; ctx.beginPath(); switch (L.hs) { case 0: ctx.ellipse(head[0], head[1] - 7 * u, 8.2 * u, 5.5 * u, A[9], Math.PI, TAU); break; case 1: ctx.ellipse(head[0] - 1 * u, head[1] - 3 * u, 9 * u, 11 * u, A[9], Math.PI * .85, Math.PI * 2.15); ctx.rect(head[0] - 9 * u, head[1] - 3 * u, 4 * u, 16 * u); break; case 2: for (let k = 0; k < 6; k++) ctx.arc(head[0] - 7 * u + k * 2.8 * u, head[1] - 9 * u + Math.sin(k) * 1.5 * u, 4.2 * u, 0, TAU); break; case 3: ctx.ellipse(head[0], head[1] - 6 * u, 8.6 * u, 6.5 * u, A[9], Math.PI * .9, Math.PI * 2.1); ctx.arc(head[0] - 6 * u, head[1] - 11 * u, 4 * u, 0, TAU); break; case 4: ctx.ellipse(head[0], head[1] - 8.5 * u, 7.6 * u, 3 * u, A[9], Math.PI, TAU); break; default: ctx.ellipse(head[0] - 1.5 * u, head[1] - 4 * u, 9.2 * u, 9 * u, A[9], Math.PI * .7, Math.PI * 2.05); } ctx.fill();
      ctx.fillStyle = '#1B1A2A'; const ex = head[0] + 3 * u, ey = head[1] - 1 * u; if (pose === 'sleep') { ctx.fillRect(ex - 1.6 * u, ey, 3.5 * u, .9 * u); } else { ctx.beginPath(); ctx.arc(ex, ey, (pose === 'shock' ? 1.6 : 1.1) * u, 0, TAU); ctx.arc(ex + 3.6 * u, ey, (pose === 'shock' ? 1.6 : 1.1) * u, 0, TAU); ctx.fill(); }
      if (L.glasses) { ctx.strokeStyle = '#1B1A2A'; ctx.lineWidth = .8 * u; ctx.strokeRect(ex - 2 * u, ey - 1.6 * u, 3.6 * u, 3 * u); ctx.strokeRect(ex + 2.2 * u, ey - 1.6 * u, 3.6 * u, 3 * u); }
      if (pose === 'shock') { ctx.beginPath(); ctx.ellipse(head[0] + 4 * u, head[1] + 4 * u, 1.4 * u, 2 * u, 0, 0, TAU); ctx.fill(); } else if (pose === 'cheer' || pose === 'wave') { ctx.lineWidth = .9 * u; ctx.strokeStyle = '#1B1A2A'; ctx.beginPath(); ctx.arc(head[0] + 4.5 * u, head[1] + 2.5 * u, 2 * u, .2, Math.PI - .2); ctx.stroke(); } }
    if (st === 'pill') { ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(head[0] + 2.5 * u, head[1] - 2 * u, 1.6 * u, 0, TAU); ctx.arc(head[0] + 6 * u, head[1] - 2 * u, 1.6 * u, 0, TAU); ctx.fill(); }
    if (pose === 'sleep') { ctx.restore(); ctx.save(); const z = (lt * .8 + ph) % 1; ctx.globalAlpha *= 1 - z; T('z', x + h * .1, y - h * .3 - z * h * .3, { size: h * .12, font: 'display', fill: '#F6F1E7', lw: 0 }); }
    ctx.restore(); }
  IFM.human = human; IFM.poseAngles = poseAngles;
  // a population in depth rows; walkers travel and wrap
  IFM.people = (n, yBase, lt, o = {}) => { const u = U(), r = rng(o.seed || 3), rows = o.rows || 3, L = []; for (let i = 0; i < n; i++) { const row = i % rows; L.push({ seed: (o.seed || 1) * 100 + i, x: r() * W * 1.2 - W * .1, d: rows > 1 ? row / (rows - 1) : 1, dir: r() < .5 ? -1 : 1, poseAlt: r() }); }
    L.sort((a, b) => a.d - b.d); for (const p of L) { const h = (o.h || H * .22) * lerp(.55, 1, p.d), y = yBase - (1 - p.d) * H * (o.depth ?? .12); let x = p.x; const pose = Array.isArray(o.pose) ? o.pose[Math.floor(p.poseAlt * o.pose.length)] : (o.pose || 'stand');
      if (pose === 'walk' || pose === 'run') x = ((p.x + lt * (pose === 'run' ? 2.4 : 1) * h * .6 * p.dir) % (W * 1.3) + W * 1.3) % (W * 1.3) - W * .15;
      ctx.save(); ctx.globalAlpha *= lerp(.6, 1, p.d); IFM.human(x, y, h, p.seed, pose, lt, { ...o, flip: (pose === 'walk' || pose === 'run') ? p.dir < 0 : (p.seed % 2 === 0) }); ctx.restore(); } };
})();
