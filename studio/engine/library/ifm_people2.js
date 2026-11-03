/* THE IF MACHINE — people and creatures, round 2 (owner, 3 Nov 2026: "completely unlike the old styles").
   Two new house styles, both faceless (poses carry the feeling, not cartoon faces):
     facet  low-poly figures: every body part is an angular polygon in two tones (lit side / shade side) — DEFAULT
     holo   simulated people: the machine's hologram, a glowing gradient body, scan lines, a light ring on the floor
   (flat / pill / shadow / line from ifm_people.js still work when a story asks for them.)
   Creatures, same language: IFM.creature(kind, x, y, h, lt, o)   kinds: dog cat horse dino bird fish whale robot
   o.style facet|holo, o.col, o.pose walk|run|stand|fly|swim, o.flip                                                   */
'use strict';
(function () {
  if (!window.IFM || !IFM.human) return;
  const old = IFM.human;
  const SK = ['#F2C9A8', '#E0A57E', '#C4865B', '#9E6340', '#774527', '#56321D'], HC = ['#1E1A1C', '#3A2A22', '#6E4127', '#B7793E', '#D9B26A', '#9A9AA4', '#C2452E'];
  const CL = ['#E8574A', '#3E7CE0', '#F2B33D', '#2FB59A', '#7A5CD6', '#F28AA5', '#2D3A66', '#E9E2D0', '#5BC0EB', '#9BC53D', '#E66A2C', '#4B5482'], PANTS = ['#2D3A66', '#3B3F4E', '#5B5048', '#1F4E79', '#7A6A58', '#C9C0AA'];
  const lit = c => shade(c, .1), drk = c => shade(c, -.2);
  // quad between two joints, widths w0 → w1, split lengthwise into a lit half and a shade half
  function seg(x0, y0, x1, y1, w0, w1, col, o) { const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    const A = [x0 + nx * w0 / 2, y0 + ny * w0 / 2], B = [x1 + nx * w1 / 2, y1 + ny * w1 / 2], Cc = [x1 - nx * w1 / 2, y1 - ny * w1 / 2], D = [x0 - nx * w0 / 2, y0 - ny * w0 / 2];
    if (o.holo) { poly([A, B, Cc, D], col, 0); return; } poly([A, B, [x1, y1], [x0, y0]], lit(col), 0); poly([[x0, y0], [x1, y1], Cc, D], drk(col), 0); }
  function joints(p, a1, a2, l1, l2) { const k = [p[0] + Math.sin(a1) * l1, p[1] + Math.cos(a1) * l1]; return [k, [k[0] + Math.sin(a1 + a2) * l2, k[1] + Math.cos(a1 + a2) * l2]]; }
  function look(seed, o) { const r = rng(seed * 7919 + 3), pick = a => a[Math.floor(r() * a.length)]; return { skin: o.skin || pick(SK), hair: o.hair || pick(HC), hs: Math.floor(r() * 5), top: o.col || pick(CL), pants: pick(PANTS), bulk: .9 + r() * .25, tall: .93 + r() * .13, coat: r() < .3 }; }
  function newHuman(x, y, h, seed, pose, lt, o) { const st = o.style || IFM.peopleStyle; if (h < 2) return; const L = look(seed, o), ph = seed * 1.7, A = IFM.poseAngles ? IFM.poseAngles(pose || 'stand', lt, ph) : null; if (!A) return old(x, y, h, seed, pose, lt, o);
    const holo = st === 'holo', hc = o.holoCol || IFM.P.teal; ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
    if (pose === 'sleep') { ctx.rotate(-Math.PI / 2); ctx.translate(-h * .12, -h * .02); }
    const H_ = h * L.tall, u = H_ / 100, bob = (pose === 'walk' ? Math.abs(Math.sin(lt * 6 + ph)) * 1.4 : pose === 'run' ? Math.abs(Math.sin(lt * 11 + ph)) * 3 : 0) * u, sit = (pose === 'sit' || pose === 'type') ? 22 * u : 0;
    const hip = [0, -47 * u - bob + sit], neck = [Math.sin(A[8]) * 34 * u, hip[1] - 33 * u], head = [neck[0] + Math.sin(A[9]) * 4 * u, neck[1] - 10 * u], b = L.bulk;
    const C = holo ? { skin: hc, top: hc, pants: hc, hair: hc } : { skin: L.skin, top: L.top, pants: L.pants, hair: L.hair }, O = { holo };
    if (holo) { ctx.globalAlpha *= .82 + .12 * Math.sin(lt * 23 + seed); ctx.save(); ctx.globalAlpha *= .5; ctx.strokeStyle = hc; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.ellipse(0, 0, 18 * u, 4.5 * u, 0, 0, TAU); ctx.stroke(); ctx.restore(); glow(0, -50 * u, 70 * u, hc, .25); ctx.globalAlpha *= .78; }
    else { ctx.save(); ctx.globalAlpha *= .22; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(4 * u, 0, 16 * u, 3.5 * u, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    // back leg, back arm
    const legB = joints([hip[0] + 2.5 * u, hip[1]], A[6], A[7], 24 * u, 24 * u); seg(hip[0] + 2.5 * u, hip[1], legB[0][0], legB[0][1], 8 * u * b, 6 * u * b, drk(C.pants), O); seg(legB[0][0], legB[0][1], legB[1][0], legB[1][1], 6 * u * b, 4.5 * u * b, drk(C.pants), O);
    const sh = [neck[0] + 6 * u * b, neck[1] + 4 * u], armB = joints(sh, A[2], A[3], 18 * u, 17 * u); seg(sh[0], sh[1], armB[0][0], armB[0][1], 6 * u * b, 5 * u * b, drk(C.top), O); seg(armB[0][0], armB[0][1], armB[1][0], armB[1][1], 5 * u * b, 3.6 * u * b, drk(L.coat ? C.top : C.skin), O);
    // torso: chest polygon (two tones) + hips
    const tw = 9 * u * b, wa = tw * .72; const P1 = [neck[0] - tw, neck[1] + 3 * u], P2 = [neck[0] + tw, neck[1] + 3 * u], P3 = [hip[0] + wa, hip[1] + 4 * u], P4 = [hip[0] - wa, hip[1] + 4 * u];
    if (holo) poly([P1, P2, P3, P4], C.top, 0); else { poly([P1, [neck[0] + tw * .1, neck[1] + 1 * u], [hip[0] + wa * .2, hip[1] + 4 * u], P4], lit(C.top), 0); poly([[neck[0] + tw * .1, neck[1] + 1 * u], P2, P3, [hip[0] + wa * .2, hip[1] + 4 * u]], drk(C.top), 0); }
    if (L.coat && !holo) poly([P4, P3, [hip[0] + wa * 1.15, hip[1] + 16 * u], [hip[0] - wa * 1.15, hip[1] + 16 * u]], drk(C.top), 0);
    poly([[hip[0] - wa, hip[1] - 2 * u], [hip[0] + wa, hip[1] - 2 * u], [hip[0] + wa * .9, hip[1] + 7 * u], [hip[0] - wa * .9, hip[1] + 7 * u]], C.pants, 0);
    // front leg, front arm
    const legF = joints([hip[0] - 2.5 * u, hip[1]], A[4], A[5], 24 * u, 24 * u); seg(hip[0] - 2.5 * u, hip[1], legF[0][0], legF[0][1], 8.5 * u * b, 6 * u * b, C.pants, O); seg(legF[0][0], legF[0][1], legF[1][0], legF[1][1], 6 * u * b, 4.5 * u * b, C.pants, O);
    if (!holo) poly([[legF[1][0] - 3 * u, legF[1][1] - 2 * u], [legF[1][0] + 8 * u, legF[1][1] - 1 * u], [legF[1][0] + 8 * u, legF[1][1] + 1 * u], [legF[1][0] - 3 * u, legF[1][1] + 1 * u]], '#1D2036', 0);
    const shF = [neck[0] - 5 * u * b, neck[1] + 4 * u], armF = joints(shF, A[0], A[1], 18 * u, 17 * u); seg(shF[0], shF[1], armF[0][0], armF[0][1], 6.4 * u * b, 5 * u * b, C.top, O); seg(armF[0][0], armF[0][1], armF[1][0], armF[1][1], 5 * u * b, 3.6 * u * b, L.coat ? C.top : C.skin, O);
    if (!holo) poly([[armF[1][0] - 2.4 * u, armF[1][1]], [armF[1][0] + 2.4 * u, armF[1][1]], [armF[1][0], armF[1][1] + 4.5 * u]], C.skin, 0);
    // phone in the back hand
    if (pose === 'phone' || pose === 'type') { const px = armB[1][0], py = armB[1][1]; ctx.fillStyle = '#121527'; ctx.fillRect(px - 2 * u, py - 9 * u, 7 * u, 12 * u); const sc = o.phone || '#9FE8FF'; if (sc !== 'off') { ctx.fillStyle = sc; ctx.fillRect(px - 1 * u, py - 8 * u, 5 * u, 10 * u); glow(px, py - 8 * u, 38 * u, sc, .3); } }
    // neck + head: an angular gem, lit cheek plane, hair as a cap of facets
    if (window.LINT && LINT.on && (o.alpha ?? 1) > .3 && h > H * .08) { const m = ctx.getTransform(), hx = m.a * head[0] + m.c * head[1] + m.e, hy = m.b * head[0] + m.d * head[1] + m.f, r = Math.abs(m.a) * 10 * u; LINT.boxes.push({ k: 'face', x0: hx - r, x1: hx + r, y0: hy - r, y1: hy + r }); }
    seg(neck[0], neck[1] + 3 * u, head[0], head[1] + 4 * u, 4.5 * u, 4 * u, C.skin, O);
    ctx.save(); ctx.translate(head[0], head[1] - 2 * u); ctx.rotate(A[9]); const hw = 7.6 * u, hh = 9.6 * u;
    const HP = [[-hw * .8, -hh], [hw * .55, -hh * 1.02], [hw, -hh * .2], [hw * .78, hh * .62], [hw * .1, hh], [-hw * .72, hh * .6], [-hw, -hh * .15]];
    if (holo) poly(HP, C.skin, 0); else { poly(HP, drk(C.skin), 0); poly([[hw * .55, -hh * 1.02], [hw, -hh * .2], [hw * .78, hh * .62], [hw * .1, hh], [hw * .05, -hh * .2]], lit(C.skin), 0); }
    if (!holo) { const hr = C.hair; switch (L.hs) { case 0: poly([[-hw * 1.02, -hh * .1], [-hw * .85, -hh * 1.05], [hw * .6, -hh * 1.2], [hw * 1.02, -hh * .45], [hw * .2, -hh * .6], [-hw * .4, -hh * .25]], hr, 0); break;
        case 1: poly([[-hw * 1.05, hh * 1.1], [-hw * 1.05, -hh * .5], [-hw * .7, -hh * 1.1], [hw * .7, -hh * 1.15], [hw * 1.02, -hh * .4], [hw * .3, -hh * .55], [-hw * .3, hh * 1.1]], hr, 0); break;
        case 2: poly([[-hw * 1.02, -hh * .2], [-hw * .9, -hh * .95], [-hw * .2, -hh * 1.25], [hw * .8, -hh * .95], [hw * 1.02, -hh * .3], [hw * .5, -hh * .7], [-hw * .5, -hh * .6]], hr, 0); break;
        case 3: poly([[-hw * .95, -hh * .3], [-hw * .6, -hh * 1.05], [hw * .7, -hh * 1.05], [hw * .95, -hh * .5], [-hw * .1, -hh * .7]], hr, 0); poly([[-hw * 1.4, -hh * .6], [-hw * .9, -hh * 1.1], [-hw * .7, -hh * .3]], hr, 0); break;
        default: poly([[-hw * .9, -hh * .55], [hw * .6, -hh * 1.06], [hw * .95, -hh * .6], [-hw * .3, -hh * .75]], hr, 0); } }
    ctx.restore();
    if (holo) { const sy = -100 * u + ((lt * 40 * u + seed * 13) % (110 * u)); ctx.globalAlpha = .5; line(-14 * u, sy, 14 * u, sy, 1.6 * u, '#E8FFFA'); }
    ctx.restore(); }
  IFM.human = (x, y, h, seed, pose, lt, o = {}) => { const st = o.style || IFM.peopleStyle || 'facet'; return (st === 'facet' || st === 'holo') ? newHuman(x, y, h, seed, pose, lt, { ...o, style: st }) : old(x, y, h, seed, pose, lt, o); };

  // ---------------------------------------------------------------- creatures (same facet / holo language)
  const CR = { dog: { body: 46, bh: 18, leg: 22, neck: 12, head: 14, snout: 9, tail: 18, col: '#B7793E' }, cat: { body: 40, bh: 15, leg: 18, neck: 8, head: 12, snout: 4, tail: 30, ear: 1, col: '#6B6E80' },
    horse: { body: 70, bh: 26, leg: 46, neck: 30, head: 20, snout: 14, tail: 26, col: '#7A4A2E' }, dino: { body: 60, bh: 30, leg: 34, neck: 22, head: 22, snout: 14, tail: 70, biped: 1, col: '#4E9A62' } };
  function quad(kind, h, lt, o) { const S = CR[kind], u = h / 100 * (100 / (S.leg + S.bh + S.neck)), col = o.col || S.col, O = { holo: o.style === 'holo' }, sp = o.pose === 'run' ? 10 : o.pose === 'walk' ? 5 : 0, ph = (o.seed || 1) * 1.3;
    const top = -(S.leg + S.bh) * u, bx0 = -S.body / 2 * u, bx1 = S.body / 2 * u, sw = a => Math.sin(lt * sp + ph + a) * (sp ? .45 : .03);
    const legs = S.biped ? [[bx0 * .2, .0], [bx0 * .2 + 4 * u, Math.PI]] : [[bx0 + 6 * u, 0], [bx1 - 6 * u, Math.PI], [bx0 + 10 * u, Math.PI], [bx1 - 2 * u, 0]];
    legs.slice(S.biped ? 1 : 2).forEach(([lx, p]) => { const J = joints([lx, -S.leg * u], sw(p), -sw(p) * .6, S.leg * u * .5, S.leg * u * .52); seg(lx, -S.leg * u, J[0][0], J[0][1], 8 * u, 6 * u, drk(col), O); seg(J[0][0], J[0][1], J[1][0], J[1][1], 6 * u, 4 * u, drk(col), O); });
    // tail
    const tx = bx0, ty = top + S.bh * u * .4, ta = -1.9 + Math.sin(lt * 3 + ph) * .25; seg(tx, ty, tx + Math.sin(ta) * S.tail * u, ty + Math.cos(ta) * S.tail * u * (S.biped ? -.2 : 1), S.bh * u * (S.biped ? .7 : .3), 2 * u, col, O);
    // body: two-tone hexagon
    const BP = [[bx0, top + S.bh * u * .5], [bx0 + 8 * u, top], [bx1 - 6 * u, top - (S.biped ? 6 : 0) * u], [bx1, top + S.bh * u * .45], [bx1 - 6 * u, top + S.bh * u], [bx0 + 6 * u, top + S.bh * u]];
    if (O.holo) poly(BP, col, 0); else { poly(BP, drk(col), 0); poly(BP.slice(0, 4).concat([[0, top + S.bh * u * .5]]), lit(col), 0); }
    legs.slice(0, S.biped ? 1 : 2).forEach(([lx, p]) => { const J = joints([lx, -S.leg * u], sw(p + 1), -sw(p + 1) * .6, S.leg * u * .5, S.leg * u * .52); seg(lx, -S.leg * u, J[0][0], J[0][1], 9 * u, 6.5 * u, col, O); seg(J[0][0], J[0][1], J[1][0], J[1][1], 6.5 * u, 4.5 * u, col, O); });
    if (S.biped) { seg(bx1 - 8 * u, top + S.bh * u * .5, bx1 + 2 * u, top + S.bh * u * .9, 4 * u, 3 * u, drk(col), O); }
    // neck + head
    const nx = bx1 - 4 * u, ny = top + 4 * u, na = S.biped ? 2.6 : 2.5 + Math.sin(lt * 2 + ph) * .05, hx = nx + Math.sin(na) * S.neck * u, hy = ny + Math.cos(na) * S.neck * u; seg(nx, ny, hx, hy, S.bh * u * .5, S.head * u * .6, col, O);
    const HP = [[hx - S.head * u * .4, hy - S.head * u * .5], [hx + S.head * u * .4, hy - S.head * u * .55], [hx + S.head * u * .5 + S.snout * u, hy - S.head * u * .05], [hx + S.head * u * .4 + S.snout * u, hy + S.head * u * .35], [hx - S.head * u * .3, hy + S.head * u * .45]];
    if (O.holo) poly(HP, col, 0); else { poly(HP, drk(col), 0); poly(HP.slice(0, 3).concat([[hx, hy]]), lit(col), 0); }
    if (S.ear || kind === 'dog' || kind === 'horse') poly([[hx - S.head * u * .3, hy - S.head * u * .45], [hx - S.head * u * .1, hy - S.head * u * 1.05], [hx + S.head * u * .1, hy - S.head * u * .5]], drk(col), 0);
    if (kind === 'dino') for (let k = 0; k < 5; k++) poly([[bx0 + k * 12 * u, top + 2 * u], [bx0 + 6 * u + k * 12 * u, top - 9 * u], [bx0 + 12 * u + k * 12 * u, top + 1 * u]], drk(col), 0);
    circ(hx + S.head * u * .25, hy - S.head * u * .12, 1.6 * u, O.holo ? '#fff' : '#14162A', 0); }
  function bird(h, lt, o) { const u = h / 40, col = o.col || '#E8574A', f = Math.sin(lt * 12 + (o.seed || 0)); poly([[-14 * u, 0], [0, -6 * u], [16 * u, -2 * u], [20 * u, 1 * u], [2 * u, 6 * u]], drk(col), 0); poly([[-14 * u, 0], [0, -6 * u], [16 * u, -2 * u], [2 * u, 0]], lit(col), 0);
    poly([[-2 * u, -2 * u], [8 * u, -2 * u], [2 * u, -20 * u * f]], col, 0); poly([[20 * u, -1 * u], [27 * u, 1 * u], [20 * u, 2.5 * u]], '#F2B33D', 0); poly([[-14 * u, 0], [-22 * u, -5 * u], [-22 * u, 5 * u]], drk(col), 0); }
  function fish(h, lt, o, big) { const u = h / 40, col = o.col || (big ? '#3E5C8A' : '#F28A2E'), w = Math.sin(lt * (big ? 2 : 8) + (o.seed || 0)) * (big ? 4 : 7) * u; const L = big ? 60 : 22;
    poly([[-L * u, w], [-L * .3 * u, -12 * u * (big ? 1.4 : 1)], [L * .7 * u, -6 * u], [L * u, 0], [L * .7 * u, 7 * u], [-L * .3 * u, 11 * u * (big ? 1.3 : 1)]], drk(col), 0); poly([[-L * u, w], [-L * .3 * u, -12 * u * (big ? 1.4 : 1)], [L * .7 * u, -6 * u], [L * u, 0]], lit(col), 0);
    poly([[-L * u, w], [-L * 1.35 * u, w - 10 * u], [-L * 1.25 * u, w], [-L * 1.35 * u, w + 10 * u]], col, 0); if (big) poly([[-L * .3 * u, 6 * u], [L * .7 * u, 4 * u], [L * .7 * u, 7 * u], [-L * .3 * u, 11 * u * 1.3]], '#D9E4EE', 0); circ(L * .62 * u, -1.5 * u, 1.6 * u, '#111', 0); }
  function robot(h, lt, o) { const u = h / 100, col = o.col || '#B9C2D6', b = Math.abs(Math.sin(lt * 5)) * 2 * u; seg(-8 * u, -40 * u, -8 * u, 0, 9 * u, 8 * u, drk(col), {}); seg(8 * u, -40 * u, 8 * u, 0, 9 * u, 8 * u, col, {});
    poly([[-20 * u, -82 * u - b], [20 * u, -82 * u - b], [16 * u, -40 * u], [-16 * u, -40 * u]], col, 0); poly([[2 * u, -82 * u - b], [20 * u, -82 * u - b], [16 * u, -40 * u], [2 * u, -40 * u]], drk(col), 0);
    rr(-15 * u, -106 * u - b, 30 * u, 20 * u, 4 * u, col, 0); rr(-10 * u, -100 * u - b, 20 * u, 6 * u, 3 * u, '#0B0E22', 0); circ(Math.sin(lt * 2) * 6 * u, -97 * u - b, 2.4 * u, IFM.P.teal, 0); glow(0, -97 * u - b, 20 * u, IFM.P.teal, .5);
    line(0, -106 * u - b, 0, -116 * u - b, 2 * u, drk(col)); circ(0, -117 * u - b, 3 * u, IFM.P.coral, 0); }
  IFM.creature = (kind, x, y, h, lt, o = {}) => { const st = o.style || (IFM.peopleStyle === 'holo' ? 'holo' : 'facet'); ctx.save(); ctx.translate(x, y); if (o.flip) ctx.scale(-1, 1);
    if (st === 'holo') { ctx.globalAlpha *= .8; glow(0, -h * .4, h * .8, o.col || IFM.P.teal, .25); o = { ...o, col: o.col || IFM.P.teal }; } else if (!['bird', 'fish', 'whale'].includes(kind)) { ctx.save(); ctx.globalAlpha *= .2; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(0, 0, h * .45, h * .05, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    if (CR[kind]) quad(kind, h, lt, { ...o, style: st }); else if (kind === 'bird') bird(h, lt, o); else if (kind === 'fish') fish(h, lt, o); else if (kind === 'whale') fish(h, lt, o, true); else robot(h, lt, o);
    ctx.restore(); };
})();
