/* "Trọng lực chỉ còn một nửa" — bespoke acts for episode gravity-half (16 acts; 3 new gags live in cast.js: GAG.receipt,
   GAG.floatbell, GAG.sadtea). Every scene is drawn in code in the IF CREW v3 flat language (IFM.CAST.ovalF/rectF/polyF/tube,
   one hard shadow plane, crew actors via IFM.CAST.draw). Layout (9:16): kicker 11 %, headline 15–25 %, subject 28–68 %,
   captions 74.5–79 % kept clear. Theme: cosmos (deep navy, gold accents). */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT || !IFM.PX || !IFM.CAST) return; const A = IFM.ACT, X = IFM.PX, C = X.C, KB = X.KB, K = X.K, T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d;
  const { ovalF, rectF, polyF, tube } = IFM.CAST, GAG = IFM.CAST.GAG, CREW = IFM.CAST.draw;
  const INK = '#26233A', GOLD = '#F2B33D', CREAM = '#F6F1E4';
  const GY = () => H * .68;
  const head = (o, lt, dark) => { if (o.kick) X.kicker(o.kick, W / 2, H * .115, lt, .05, { col: dark ? C.gold2 : C.goldD }); if (o.head) X.headline(o.head, W / 2, H * .195, lt, .2, { s: +o.hs || 58, maxW: .7, col: dark ? CREAM : C.ink, hi: dark ? C.gold2 : C.gold, shadow: dark ? 'rgba(0,0,0,.4)' : null }); };
  const lbl = (t, x, y, s, col = INK, f = 'mono', w = 700) => X.text(t, x, y, { f, w, s: s * U(), fill: col });
  const pill = (t, x, y, lt, at, o = {}) => { const k = KB(lt, at, .6); if (k <= 0) return; const u = U(), s = (o.s || 30) * u; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.font = `700 ${s}px "Space Mono", monospace`; const tw = ctx.measureText(t).width + s * 1.4; ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = 14 * u; ctx.shadowOffsetY = 5 * u;
    rectF(-tw / 2, -s * .95, tw, s * 1.9, s * .95, o.bg || '#FFFDF4', { plane: 0 }); ctx.restore(); if (o.strike) { } X.text(t, 0, 2 * u, { f: 'mono', w: 700, s, fill: o.col || INK });
    if (o.strike && lt > o.strike) { const q = clamp((lt - o.strike) / .4); line(-tw * .42, 0, -tw * .42 + tw * .84 * q, 0, 5 * u, '#E63950'); } ctx.restore(); };

  // ---------------------------------------------------------------- backgrounds (cached once)
  const starsLayer = (seed, n, y1 = 1) => X.cache('ghst' + seed + n + y1, () => { const r = rng(seed); for (let i = 0; i < n; i++) { ctx.globalAlpha = .25 + r() * .75; ctx.fillStyle = '#fff'; const s = r() < .08 ? 3.2 : 1.7; ctx.fillRect(r() * W, r() * H * y1, s, s); } ctx.globalAlpha = 1; });
  const cosmos = (lt, o = {}) => { ctx.drawImage(X.cache('ghcos' + (o.tone || ''), () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, o.tone === 'cold' ? '#070B1C' : '#0A0F2C'); g.addColorStop(.6, o.tone === 'cold' ? '#101A36' : '#1A1748'); g.addColorStop(1, '#0B0F26'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const n = ctx.createRadialGradient(W * .7, H * .3, 0, W * .7, H * .3, W * .8); n.addColorStop(0, 'rgba(120,90,200,.22)'); n.addColorStop(1, 'rgba(120,90,200,0)'); ctx.fillStyle = n; ctx.fillRect(0, 0, W, H); }), 0, 0);
    const tw = .75 + .25 * Math.sin(lt * 1.3); ctx.save(); ctx.globalAlpha = tw; ctx.drawImage(starsLayer(11, 220), Math.sin(lt * .05) * 6, 0); ctx.restore(); };
  const room = (top, bot, floor, key, extra) => { ctx.drawImage(X.cache('ghroom' + key, () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      if (extra) extra(); ctx.fillStyle = floor; ctx.fillRect(0, GY(), W, H - GY()); ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(0, GY(), W, H * .012); }, 3), 0, 0); };

  // ---------------------------------------------------------------- drawn things (x, y = centre unless noted; flat v3 language)
  function earth(x, y, r, lt, o = {}) { ctx.save(); ovalF(x, y, r, r, '#3E8EDE', { plane: .5 });
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip(); const sp = (lt * .04) % 1;
    [[-.35, -.2, .32, .22], [.25, .1, .28, .34], [-.1, .45, .22, .12], [.5, -.45, .2, .14]].forEach(([dx, dy, rx, ry], i) => ovalF(x + ((dx + sp * 2 + 1) % 2 - 1) * r, y + dy * r, rx * r, ry * r, i % 2 ? '#5DBB63' : '#7BC97A', { plane: 0, rot: i * .7 }));
    ctx.restore(); ctx.save(); ctx.globalAlpha = .55; ctx.strokeStyle = '#BFE6FF'; ctx.lineWidth = r * .06; ctx.beginPath(); ctx.arc(x, y, r * 1.02, 0, TAU); ctx.stroke(); ctx.restore(); ctx.restore(); }
  function sun(x, y, r, lt, o = {}) { const a = o.pale ? .5 : 1; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, r * .6, x, y, r * 3); g.addColorStop(0, `rgba(255,200,90,${.5 * a})`); g.addColorStop(1, 'rgba(255,200,90,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3, 0, TAU); ctx.fill(); ctx.restore();
    ovalF(x, y, r, r, o.pale ? '#FFF1C9' : '#FFC93C', { plane: .35 }); if (!o.pale) ovalF(x - r * .25, y - r * .25, r * .35, r * .35, '#FFE08A', { plane: 0 }); }
  function bone(x, y, len, lt, o = {}) { const w = len * .16, col = o.col || '#F4EAD2'; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); X.contact(0, len * .55, len * .3, .18);
    rectF(-w / 2, -len * .4, w, len * .8, w * .3, col, { plane: .5 }); [-1, 1].forEach(e => [-1, 1].forEach(sd => ovalF(sd * w * .55, e * len * .42, w * .62, w * .55, col, { plane: .5 }))); ctx.restore(); }
  function spring(x, y, s, lt) { const sq = 1 + Math.sin(lt * 5) * .18, h = s * .9 * sq; ctx.save(); ctx.translate(x, y + s * .45); rectF(-s * .36, -s * .06, s * .72, s * .1, s * .03, '#4A4A6E', { plane: .4 });
    ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const y0 = -s * .06 - i * h / 6, y1 = y0 - h / 12; tube(-s * .28, y0, s * .28, y1, s * .07, '#C9CED9'); } rectF(-s * .3, -s * .06 - h - s * .06, s * .6, s * .1, s * .03, GOLD, { plane: .4 }); ctx.restore(); }
  function bathScale(x, y, s, lt, val = 1) { ctx.save(); ctx.translate(x, y); rectF(-s * .5, -s * .14, s, s * .28, s * .07, '#F8F6F2', { plane: .5 }); rectF(-s * .46, -s * .14, s * .92, s * .05, s * .03, '#E3E6EE', { plane: 0 });
    ovalF(0, s * .04, s * .14, s * .08, '#26233A', { plane: 0 }); const a = -Math.PI + .3 + val * (Math.PI - .6); line(0, s * .06, Math.cos(a) * s * .1, s * .06 + Math.sin(a) * s * .06, 2.5 * U(), '#FF4D6D'); ctx.restore(); }
  function rocket(x, y, h, lt, o = {}) { ctx.save(); ctx.translate(x, y); const w = h * .22;
    if (o.flame) { const f = 1 + Math.sin(lt * 30) * .12; polyF([[-w * .3, 0], [0, h * .32 * f], [w * .3, 0]], '#FF9A3C', { plane: 0 }); polyF([[-w * .16, 0], [0, h * .2 * f], [w * .16, 0]], '#FFE08A', { plane: 0 }); }
    polyF([[-w * .5, -h * .08], [-w * .95, h * .02], [-w * .5, -h * .3]], '#E63950', { plane: .4 }); polyF([[w * .5, -h * .08], [w * .95, h * .02], [w * .5, -h * .3]], '#E63950', { plane: .4 });
    rectF(-w / 2, -h * .78, w, h * .78, w * .2, '#F8F6F2', { plane: .5 }); polyF([[-w / 2, -h * .74], [0, -h], [w / 2, -h * .74]], '#E63950', { plane: .4 }); ovalF(0, -h * .55, w * .2, w * .2, '#3E8EDE', { plane: .3 }); ovalF(0, -h * .55, w * .12, w * .12, '#BFE6FF', { plane: 0 }); ctx.restore(); }
  function astronaut(x, y, h, lt, o = {}) { const f = o.flip ? -1 : 1, step = o.step || 0; ctx.save(); ctx.translate(x, y); ctx.scale(f, 1); X.contact(0, o.air || 0, h * .22, .22 * (1 - Math.min(1, (o.air || 0) / (h * .5))));
    ctx.translate(0, -(o.air || 0)); const lg = h * .26; tube(-h * .07, -lg, -h * .09 - step * h * .08, -h * .02, h * .1, '#E9ECF2'); tube(h * .07, -lg, h * .09 + step * h * .08, -h * .02, h * .1, '#DDE1EA');
    rectF(-h * .19, -h * .62, h * .1, h * .3, h * .03, '#C9CED9', { plane: .4 }); rectF(-h * .14, -h * .64, h * .3, h * .38, h * .1, '#F4F6FA', { plane: .5 }); rectF(-h * .04, -h * .52, h * .12, h * .08, h * .02, '#3E8EDE', { plane: 0 });
    tube(h * .12, -h * .56, h * .2, -h * .42 + (o.arm || 0) * h * .1, h * .08, '#E9ECF2'); ovalF(h * .02, -h * .76, h * .15, h * .14, '#F4F6FA', { plane: .5 }); ovalF(h * .07, -h * .76, h * .1, h * .085, '#E0A030', { plane: 0 }); ovalF(h * .05, -h * .79, h * .035, h * .02, '#FFE6A8', { plane: 0 }); ctx.restore(); }
  function mouse(x, y, s, lt, o = {}) { const f = o.flip ? -1 : 1, col = o.col || '#B8B0C8', bob = Math.sin(lt * 5 + (o.seed || 0)) * s * .02; ctx.save(); ctx.translate(x, y + bob); ctx.scale(f, 1); if (o.slump) ctx.rotate(.18); X.contact(0, 0, s * .45, .2);
    tube(-s * .36, -s * .14, -s * .7, -s * .02 + Math.sin(lt * 3) * s * .05, s * .05, '#E8A0A8'); ovalF(0, -s * .26, s * .4, s * .26, col, { plane: .5 }); ovalF(s * .32, -s * .44, s * .2, s * .17, col, { plane: .5 });
    ovalF(s * .24, -s * .62, s * .11, s * .12, col, { plane: 0 }); ovalF(s * .24, -s * .62, s * .06, s * .07, '#F2B6BE', { plane: 0 }); circ(s * .5, -s * .42, s * .03, '#E06A7A', 0); circ(s * .36, -s * .5, s * .04, INK, 0);
    if (o.flex) { tube(s * .1, -s * .3, s * .22, -s * .56, s * .09, col); ovalF(s * .2, -s * .5, s * .07, s * .06, shade(col, .08), { plane: .4 }); } ctx.restore(); }
  function heart(x, y, s, col = '#E63950') { const path = () => { ctx.moveTo(x, y + s * .42); ctx.bezierCurveTo(x - s * .7, y - s * .02, x - s * .42, y - s * .58, x, y - s * .24); ctx.bezierCurveTo(x + s * .42, y - s * .58, x + s * .7, y - s * .02, x, y + s * .42); };
    IFM.CAST.F(path, col, [x - s * .5, y - s * .5, s, s * .9], { plane: .45 }); ovalF(x - s * .18, y - s * .22, s * .08, s * .05, '#FF9AA8', { plane: 0, rot: -.6 }); }
  function dial(cx, cy, R, val, lt, o = {}) { const u = U(); ctx.save(); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 24 * u; ctx.shadowOffsetY = 8 * u;
    IFM.CAST.F(() => { ctx.arc(cx, cy, R, Math.PI, TAU); ctx.lineTo(cx + R, cy + R * .16); ctx.lineTo(cx - R, cy + R * .16); ctx.closePath(); }, '#2E3348', [cx - R, cy - R, R * 2, R * 1.16], { plane: 0 }); ctx.restore();
    ctx.save(); ctx.strokeStyle = GOLD; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.arc(cx, cy, R * .92, Math.PI, TAU); ctx.stroke(); ctx.restore();
    if (o.band) { ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.setLineDash([10 * u, 9 * u]); ctx.lineWidth = R * .12; ctx.beginPath(); ctx.arc(cx, cy, R * .74, Math.PI + .2, TAU - .2); ctx.stroke(); ctx.restore(); }
    (o.marks || [[0, '0'], [.5, '½'], [1, '1']]).forEach(([v, t]) => { const a = Math.PI + v * Math.PI; line(cx + Math.cos(a) * R * .82, cy + Math.sin(a) * R * .82, cx + Math.cos(a) * R * .92, cy + Math.sin(a) * R * .92, 4 * u, CREAM);
      X.text(t, cx + Math.cos(a) * R * .66, cy + Math.sin(a) * R * .66 + 4 * u, { f: 'disp', w: 900, s: R * .13, fill: v === o.hiMark ? GOLD : CREAM }); });
    const a = Math.PI + clamp(val) * Math.PI; tube(cx, cy, cx + Math.cos(a) * R * .78, cy + Math.sin(a) * R * .78, R * .045, '#FF4D6D'); ovalF(cx, cy, R * .07, R * .07, GOLD, { plane: .4 });
    X.text(o.label || 'GRAVITY', cx, cy + R * .1 - R * .26, { f: 'mono', w: 700, s: R * .085, fill: C.gold2 || GOLD }); ctx.restore(); }

  // the episode's drawn subjects for the kit acts (IFM.emoji draws a PX.DRAW entry when one exists)
  if (X.DRAW) Object.assign(X.DRAW, { spring: (x, y, s, lt) => spring(x, y, s, lt), bone: (x, y, s, lt) => bone(x, y, s * .95, lt, { rot: .5 }), 'bathroom scale': (x, y, s, lt) => bathScale(x, y, s, lt, .5),
    earth: (x, y, s, lt) => earth(x, y, s * .42, lt), 'gh sun': (x, y, s, lt) => sun(x, y, s * .3, lt) });

  // ================================================================ x_gh_dial — the gravity dial (S02 hook, S20 gap, S23 guess)
  A.x_gh_dial = (o, c, dur) => { const v = o.v || 'hook', t1 = T0(c, 0, .3), t2 = T0(c, 1, 3); return { sfx: [], draw: lt => { const u = U(); cosmos(lt);
    if (v === 'hook') { ctx.drawImage(X.cache('ghroof', () => { ctx.fillStyle = '#141838'; [[0, .58, .2], [.16, .62, .14], [.28, .55, .16], [.66, .6, .18], [.82, .54, .2]].forEach(([x, y, w]) => ctx.fillRect(W * x, H * y, W * w, H)); ctx.fillStyle = '#FFE08A'; const r = rng(4); for (let i = 0; i < 40; i++) ctx.fillRect(W * r(), H * (.6 + r() * .08), 6, 9); ctx.fillStyle = '#23284E'; ctx.fillRect(0, GY(), W, H); }), 0, 0);
      const val = 1 - .5 * E.inOut(clamp((lt - 1.2) / 1.6)); dial(W / 2, H * .45, W * .28, val, lt, { marks: [[0, '0'], [.5, '½'], [1, '1']], hiMark: .5 });
      const tj = Math.max(t2, 4.6), p = (lt - tj) / 2.4, air = p > 0 && p < 1 ? Math.sin(p * Math.PI) * H * .2 : 0, flying = p > 0 && p < 1;
      CREW('bun', W * .5, GY() - air, H * .2, lt, { keys: [[0, 'idle', 'happy'], [tj - .6, 'slump', 'grin'], [tj, 'cheer', 'laugh'], [tj + 2.5, 'cheer', 'grin']] });
      if (flying) { ctx.save(); ctx.globalAlpha = .4; [0, 1, 2].forEach(i => line(W * (.44 + i * .06), GY() - air + H * .03 + i * 6, W * (.44 + i * .06), GY() - air + H * .08, 4 * u, CREAM)); ctx.restore(); }
    } else if (v === 'gap') { dial(W / 2, H * .5, W * .36, .5 + .48 * Math.sin(lt * .9), lt, { band: 1, marks: [[0, '0'], [1, '1']] });
      astronaut(W * .18, H * .62, H * .1, lt, {}); CREW('cap', W * .82, H * .64, H * .11, lt, { keys: [[0, 'idle', 'happy']] });
      if (lt > t2) X.callout('NEVER TESTED', W / 2, H * .36, W / 2, H * .3, lt, t2, { dark: true }); lbl('SPACE STATION', W * .2, H * .66, 20, C.gold2 || GOLD); lbl('EARTH', W * .8, H * .66, 20, C.gold2 || GOLD);
    } else { const val = .5 + .4 * Math.exp(-clamp(lt - .5) * 1.5 - Math.max(0, lt - 1.5)) * Math.cos(lt * 3.2); dial(W / 2, H * .5, W * .36, val, lt, { marks: [[0, '0'], [1 / 3, '⅓'], [.5, '½'], [2 / 3, '⅔'], [1, '1']], hiMark: .5 });
      mouse(W * .2, H * .58, H * .06, lt, { slump: 1, col: '#9A94A8' }); mouse(W * .8, H * .58, H * .06, lt, { flex: 1, flip: 1, col: '#D8C9A0' });
      const kq = KB(lt, t1 + 1, .7); if (kq > 0) { ctx.save(); ctx.translate(W / 2, H * .32); ctx.scale(kq * (1 + .05 * Math.sin(lt * 4)), kq * (1 + .05 * Math.sin(lt * 4))); X.text('?', 0, 0, { f: 'disp', w: 900, s: 130 * u, fill: GOLD }); ctx.restore(); }
      pill('OUR GUESS: SLOWER, NOT ZERO', W / 2, H * .64, lt, t2, { s: 24 }); }
    head(o, lt, true); X.finish(lt, { vig: .45 }); } }; };

  // ================================================================ x_gh_iss — the space station (S03) and the shrinking heart (S04)
  A.x_gh_iss = (o, c, dur) => { const v = o.v || 'station', t1 = T0(c, 0, .3), t2 = T0(c, 1, 3), t3 = T0(c, 2, 6); return { sfx: [], draw: lt => { const u = U();
    if (v === 'station') { cosmos(lt);
      ctx.drawImage(X.cache('ghlimb', () => { const g = ctx.createRadialGradient(W / 2, H * 1.32, W * .9, W / 2, H * 1.32, W * 1.15); g.addColorStop(0, 'rgba(110,190,255,.55)'); g.addColorStop(1, 'rgba(110,190,255,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#2F6FB8'; ctx.beginPath(); ctx.arc(W / 2, H * 1.32, W * .95, 0, TAU); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(W / 2, H * 1.32, W * .95, 0, TAU); ctx.clip(); ctx.fillStyle = '#5DBB63'; ctx.beginPath(); ctx.ellipse(W * .3, H * .86, W * .3, W * .08, -.15, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.ellipse(W * .72, H * .83, W * .25, W * .04, .1, 0, TAU); ctx.fill(); ctx.restore(); }), 0, 0);
      const q = E.out(clamp(lt / (dur * .7))), x = W * (-.3 + q * .8), y = H * .46; ctx.save(); ctx.translate(x, y); ctx.rotate(-.06);
      [-1, 1].forEach(sd => [0, 1].forEach(j => { const px = sd * W * (.2 + j * .14); rectF(px - W * .055, -H * .085, W * .11, H * .17, 4 * u, '#22336B', { plane: .3 }); ctx.save(); ctx.strokeStyle = 'rgba(242,179,61,.6)'; ctx.lineWidth = 2 * u; for (let k = 1; k < 4; k++) { ctx.beginPath(); ctx.moveTo(px - W * .055, -H * .085 + k * H * .0425); ctx.lineTo(px + W * .055, -H * .085 + k * H * .0425); ctx.stroke(); } ctx.restore(); }));
      rectF(-W * .36, -H * .006, W * .72, H * .012, 3 * u, '#C9CED9', { plane: 0 }); rectF(-W * .12, -H * .025, W * .24, H * .05, H * .02, '#F4F6FA', { plane: .5 }); ovalF(W * .14, 0, W * .05, H * .03, '#E9ECF2', { plane: .5 }); ovalF(-W * .14, 0, W * .05, H * .028, '#E9ECF2', { plane: .5 });
      const wg = .5 + .5 * Math.sin(lt * 2); ovalF(W * .02, 0, W * .018, H * .01, `rgba(255,224,138,${(.5 + wg * .5).toFixed(2)})`, { plane: 0 }); ctx.restore();
      const sw = ((lt * .25) % 1.4) - .2; ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .12; ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.moveTo(W * sw, 0); ctx.lineTo(W * (sw + .12), 0); ctx.lineTo(W * (sw - .1), H); ctx.lineTo(W * (sw - .22), H); ctx.fill(); ctx.restore();
      head(o, lt, true); X.finish(lt, { vig: .45 }); return; }
    room('#DCE3EC', '#C3CCD8', '#AEB8C6', 'iss', () => { ctx.strokeStyle = 'rgba(60,70,90,.12)'; ctx.lineWidth = 3; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(W * i / 6, 0); ctx.lineTo(W * i / 6, H); ctx.stroke(); } });
    const pen = Math.sin(lt * .8); ctx.save(); ctx.translate(W * .84, H * .3 + pen * H * .02); ctx.rotate(lt * .3); rectF(-W * .05, -6 * u, W * .1, 12 * u, 6 * u, '#3E8EDE', { plane: .3 }); ctx.restore();
    ctx.save(); ctx.shadowColor = 'rgba(30,40,60,.3)'; ctx.shadowBlur = 30 * u; ctx.shadowOffsetY = 10 * u; rectF(W * .12, H * .28, W * .76, H * .38, 28 * u, '#FFFDF4', { plane: 0 }); ctx.restore();
    X.motes && X.motes(lt); const shrink = 1 - .15 * E.inOut(clamp((lt - 1) / Math.max(2, dur - 2))), beat = 1 + .05 * Math.max(0, Math.sin(lt * 7)) ; heart(W / 2, H * .44, W * .3 * shrink * beat);
    if (lt > t1) pill('340 DAYS', W * .3, H * .32, lt, t1, { s: 24 }); if (lt > t2) X.counter(0.74, W / 2, H * .55, lt, t2, { s: 64, pre: '−', unit: 'G A WEEK', dec: 2, col: INK });
    if (lt > t3) pill('6 DAYS A WEEK OF EXERCISE', W / 2, H * .625, lt, t3, { s: 22, bg: '#26233A', col: CREAM });
    head(o, lt, false); X.finish(lt, { vig: .25 }); } }; };

  // ================================================================ x_gh_scale — half the weight, same mass (S07) + GAG.receipt
  A.x_gh_scale = (o, c, dur) => { const t1 = T0(c, 1, 2.5), t2 = T0(c, 2, 5), t3 = T0(c, 3, 7); return { sfx: [], draw: lt => { const u = U();
    room('#CFEAF0', '#E8F5F2', '#9CC9C4', 'bath', () => { ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 4; for (let y = H * .3; y < GY(); y += H * .05) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } for (let x = 0; x < W; x += W * .1) { ctx.beginPath(); ctx.moveTo(x, H * .3); ctx.lineTo(x, GY()); ctx.stroke(); } });
    const val = 1 - .5 * E.inOut(clamp((lt - t1 + .6) / 1.6)); bathScale(W * .6, GY() + H * .01, W * .36, lt, val);
    CREW('cap', W * .6, GY() - H * .02, H * .34, lt, { keys: [[0, 'idle', 'happy'], [t2 + .4, 'take', 'take'], [t3, 'cheer', 'laugh']] });
    if (lt > t3) GAG.receipt(W * .78, GY() - H * .005, W * .09, lt, clamp((lt - t3) / 1.2));
    // the big read-out dial, fixed at the left
    const R = W * .14, cx = W * .27, cy = H * .4; ctx.save(); ctx.shadowColor = 'rgba(30,60,60,.25)'; ctx.shadowBlur = 20 * u; ovalF(cx, cy, R, R, '#FFFDF4', { plane: 0 }); ctx.restore(); ctx.save(); ctx.strokeStyle = '#26233A'; ctx.lineWidth = 6 * u; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.restore();
    for (let i = 0; i <= 8; i++) { const a = -Math.PI * 1.15 + i / 8 * Math.PI * 1.3; line(cx + Math.cos(a) * R * .8, cy + Math.sin(a) * R * .8, cx + Math.cos(a) * R * .92, cy + Math.sin(a) * R * .92, 3 * u, INK); }
    const a = -Math.PI * 1.15 + val * Math.PI * 1.3 * .875; tube(cx, cy, cx + Math.cos(a) * R * .78, cy + Math.sin(a) * R * .78, 7 * u, '#FF4D6D'); circ(cx, cy, 10 * u, INK, 0);
    X.text(Math.round(70 * val) + ' KG', cx, cy + R * .45, { f: 'disp', w: 900, s: 40 * u, fill: INK });
    if (lt > t1) pill('WEIGHT: ½', W * .27, H * .54, lt, t1 + .8, { s: 26, bg: '#26233A', col: GOLD }); if (lt > t2) pill('MASS: SAME', W * .27, H * .6, lt, t2, { s: 26 });
    head(o, lt, false); X.finish(lt, { vig: .22 }); } }; };

  // ================================================================ x_gh_jump — 30 cm on Earth, 60 cm at half gravity (S08)
  A.x_gh_jump = (o, c, dur) => { const t1 = T0(c, 1, 3); return { sfx: [], draw: lt => { const u = U();
    room('#F2E6D0', '#F8F1E2', '#C98A5E', 'gym', () => { ctx.fillStyle = 'rgba(201,138,94,.18)'; for (let x = 0; x < W; x += W * .12) ctx.fillRect(x, H * .25, W * .01, GY() - H * .25); });
    const base = GY(), cm = H * .0042; ctx.save(); rectF(W * .47, base - 64 * cm, W * .06, 64 * cm, 6 * u, '#F2B33D', { plane: .3 }); for (let k = 0; k <= 6; k++) { line(W * .47, base - k * 10 * cm, W * .5, base - k * 10 * cm, 3 * u, INK); if (k % 3 === 0) lbl(k * 10 + '', W * .515, base - k * 10 * cm, 16, INK); } ctx.restore();
    const T = 2.2, ph = (lt % T) / T, jumpE = ph < .32 ? Math.sin(ph / .32 * Math.PI) : 0, jumpH = ph < .64 ? Math.sin(ph / .64 * Math.PI) : 0;
    const ea = jumpE * 30 * cm, ha = jumpH * 60 * cm;
    ['braids', 'hijab'].forEach((nm, i) => { const x = W * (.24 + i * .52), air = i ? ha : ea, up = air > 2; ctx.save(); ctx.globalAlpha = .2; ell(x, base, H * .05, H * .008, INK, 0); ctx.restore();
      CREW(nm, x, base - air, H * .22, lt, { keys: [[0, up ? 'cheer' : 'idle', up ? 'laugh' : 'happy']], flip: i === 1 }); });
    if (lt > t1) { const k = K(lt, t1, .8); ctx.save(); ctx.globalAlpha = k; ctx.setLineDash([10 * u, 8 * u]); ctx.strokeStyle = INK; ctx.lineWidth = 3 * u;
      [[.36, 30, -1], [.64, 60, 1]].forEach(([x, h]) => { ctx.beginPath(); ctx.moveTo(W * .47, base - h * cm); ctx.lineTo(W * (x < .5 ? .14 : .86), base - h * cm); ctx.stroke(); }); ctx.setLineDash([]); ctx.restore();
      pill('30 CM', W * .36, base - 30 * cm - H * .025, lt, t1, { s: 24 }); pill('60 CM', W * .64, base - 60 * cm - H * .025, lt, t1 + .4, { s: 24, bg: '#26233A', col: GOLD }); }
    pill('EARTH · 1 G', W * .24, H * .3, lt, .3, { s: 20 }); pill('HALF GRAVITY', W * .76, H * .3, lt, .6, { s: 20, bg: '#26233A', col: GOLD });
    head(o, lt, false); X.finish(lt, { vig: .22 }); } }; };

  // ================================================================ x_gh_trolley — same mass, same bump (S09) — gag: the take + sweat
  A.x_gh_trolley = (o, c, dur) => { const tHit = Math.max(T0(c, 1, 4), 3.5), t1 = T0(c, 0, .5); return { sfx: [], draw: lt => { const u = U();
    room('#EAF0F4', '#F6F8FA', '#C9D3DC', 'shop', () => { [.3, .42, .54].forEach((y, r) => { ctx.fillStyle = '#B9C4CF'; ctx.fillRect(0, H * y + H * .085, W, H * .012); const rr2 = rng(r + 3); ctx.globalAlpha = .55; for (let x = W * .02; x < W; x += W * .065) { const bh = H * (.035 + rr2() * .03); ctx.fillStyle = ['#F2B6C0', '#F6DC9A', '#B9E2C0', '#AFDCF0', '#D4CCF2'][Math.floor(rr2() * 5)]; ctx.fillRect(x, H * y + H * .085 - bh, W * .045, bh); } ctx.globalAlpha = 1; }); });
    const q = clamp(lt / tHit), x = W * (-.25 + E.out(q) * .67) - (lt > tHit ? Math.sin(clamp((lt - tHit) / .5) * Math.PI) * W * .02 : 0), y = GY();
    ctx.save(); ctx.translate(x, y); [-.16, .12].forEach(dx => { circ(W * dx, -H * .015, H * .014, INK, 0); circ(W * dx, -H * .015, H * .006, '#9AA3B5', 0); });
    polyF([[-W * .2, -H * .15], [W * .17, -H * .15], [W * .13, -H * .04], [-W * .17, -H * .04]], '#AEB8C6', { plane: .4 });
    ctx.save(); ctx.strokeStyle = 'rgba(38,35,58,.35)'; ctx.lineWidth = 3 * u; for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.moveTo(-W * .2 + k * W * .062, -H * .15); ctx.lineTo(-W * .17 + k * W * .05, -H * .04); ctx.stroke(); } ctx.restore();
    rectF(-W * .15, -H * .2, W * .1, H * .06, 6 * u, '#FF8FA3', { plane: .4 }); ovalF(W * .02, -H * .18, W * .06, H * .035, '#FFC93C', { plane: .4 }); rectF(W * .07, -H * .21, W * .07, H * .07, 6 * u, '#7BD389', { plane: .4 });
    tube(-W * .2, -H * .15, -W * .27, -H * .2, 10 * u, '#6A7486'); ctx.restore();
    CREW('beard', W * .68, y, H * .3, lt, { flip: 1, keys: [[0, 'idle', 'happy'], [tHit - 1.6, 'hold', 'worried'], [tHit, 'take', 'take'], [tHit + 1.6, 'idle', 'deadpan']] });
    if (lt > tHit && lt < tHit + 1.6) GAG.marks(W * .78, H * .36, 60 * u, lt); if (lt > tHit + 1.6) GAG.sweat(W * .76, H * .42, 26 * u, lt);
    pill('MASS: SAME', W * .32, H * .3, lt, t1 + 1, { s: 26, bg: '#26233A', col: GOLD });
    head(o, lt, false); X.finish(lt, { vig: .22 }); } }; };

  // ================================================================ x_gh_lope — loping on the Moon at 1/6 g (S10)
  A.x_gh_lope = (o, c, dur) => { const t3 = T0(c, 1, 4); return { sfx: [], draw: lt => { const u = U();
    ctx.fillStyle = '#05060E'; ctx.fillRect(0, 0, W, H); ctx.drawImage(starsLayer(5, 160, .6), 0, 0); earth(W * .74, H * .33, W * .07, lt);
    ctx.drawImage(X.cache('ghmoon', () => { ctx.fillStyle = '#8A8D99'; ctx.beginPath(); ctx.moveTo(0, H * .6); ctx.quadraticCurveTo(W * .5, H * .56, W, H * .61); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); ctx.fillStyle = '#A3A6B2'; ctx.beginPath(); ctx.moveTo(0, H * .64); ctx.quadraticCurveTo(W * .6, H * .62, W, H * .66); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
      const r = rng(8); for (let i = 0; i < 14; i++) { const x = r() * W, y = H * (.66 + r() * .3), rx = W * (.02 + r() * .05); ctx.fillStyle = '#8A8D99'; ctx.beginPath(); ctx.ellipse(x, y, rx, rx * .3, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#B4B7C2'; ctx.beginPath(); ctx.ellipse(x, y + rx * .06, rx * .8, rx * .2, 0, 0, Math.PI); ctx.fill(); } }), 0, 0);
    const per = 1.6, n = Math.floor(lt / per), ph = (lt % per) / per, gy = H * .68, x = W * (.12 + (lt / dur) * .62), air = Math.sin(ph * Math.PI) * H * .07;
    for (let i = 0; i < n; i++) { const fx = W * (.12 + ((i + 1) * per / dur) * .62); if (fx < x - W * .03) { ovalF(fx - W * .012, gy + 4 * u, W * .012, 4 * u, '#6E717C', { plane: 0 }); ovalF(fx + W * .014, gy + 6 * u, W * .012, 4 * u, '#6E717C', { plane: 0 }); } }
    if (ph < .25) { ctx.save(); ctx.globalAlpha = (1 - ph / .25) * .5; [-1, 1].forEach(sd => ovalF(x + sd * W * .05 * (1 + ph * 3), gy, W * .03 * (1 + ph * 2), H * .008, '#C9CBD4', { plane: 0 })); ctx.restore(); }
    astronaut(x, gy, H * .24, lt, { air, step: Math.sin(ph * Math.PI) * .6, arm: Math.sin(ph * Math.PI) });
    pill('1/6 OF EARTH’S GRAVITY', W / 2, H * .5, lt, t3 - 1.5, { s: 24, bg: '#26233A', col: GOLD });
    head(o, lt, true); X.finish(lt, { vig: .45 }); } }; };

  // ================================================================ x_gh_rocket — orbit at 5.6 instead of 7.9 km/s (S12)
  A.x_gh_rocket = (o, c, dur) => { const tL = Math.max(T0(c, 1, 3), 2.5), t2 = T0(c, 2, 6); return { sfx: [], draw: lt => { const u = U();
    room('#7FB2E5', '#FFD0A8', '#6E7F6A', 'dawn', () => { ctx.fillStyle = '#5E6F5A'; ctx.beginPath(); ctx.moveTo(0, GY()); ctx.quadraticCurveTo(W * .3, H * .63, W * .6, GY()); ctx.fill(); });
    const up = lt > tL ? Math.pow(lt - tL, 2) * H * .03 : 0, shake = lt > tL && lt < tL + 1 ? Math.sin(lt * 60) * 2 * u : 0;
    ctx.save(); ctx.strokeStyle = '#4A4A6E'; ctx.lineWidth = 6 * u; const tx = W * .66; ctx.beginPath(); ctx.moveTo(tx, GY()); ctx.lineTo(tx, H * .36); ctx.moveTo(tx + W * .06, GY()); ctx.lineTo(tx + W * .06, H * .36); for (let y = H * .36; y < GY(); y += H * .04) { ctx.moveTo(tx, y); ctx.lineTo(tx + W * .06, y + H * .04); } ctx.stroke(); ctx.restore();
    if (lt > tL) { const r = rng(2); for (let i = 0; i < 14; i++) { const k = clamp((lt - tL) * .6 - i * .03), sx = W * (.5 + (r() - .5) * .5 * k), sy = GY() - H * .01 - r() * H * .05 * k; ctx.save(); ctx.globalAlpha = .85; ovalF(sx, sy, W * (.04 + .05 * k), W * (.03 + .04 * k), i % 2 ? '#F4EEE6' : '#E3DCD2', { plane: .3 }); ctx.restore(); } }
    rocket(W * .5 + shake, GY() - H * .03 - up, H * .3, lt, { flame: lt > tL });
    pill('7.9 KM/S', W * .24, H * .32, lt, .4, { s: 28, strike: t2 - .2 }); if (lt > t2) pill('5.6 KM/S', W * .24, H * .39, lt, t2, { s: 30, bg: '#26233A', col: GOLD });
    head(o, lt, false); X.finish(lt, { vig: .25 }); } }; };

  // ================================================================ x_gh_bone — less load, less bone (S15)
  A.x_gh_bone = (o, c, dur) => { const t1 = T0(c, 1, 3.5); const struts = (() => { const r = rng(21), a = []; for (let i = 0; i < 70; i++) { const yy = r() < .5 ? -.36 + r() * .2 : .16 + r() * .2, xx = (r() - .5) * .2, an = r() * Math.PI, l = .04 + r() * .05; a.push([xx, yy, an, l, r()]); } return a; })();
    return { sfx: [], draw: lt => { const u = U(); room('#E9EEF5', '#F6F8FB', '#CDD5E0', 'lab', () => { ctx.fillStyle = 'rgba(62,142,222,.07)'; for (let i = 0; i < 6; i++) ctx.fillRect(W * (.05 + i * .16), H * .3, W * .1, H * .3); });
    const L = H * .3, cx = W / 2, cy = H * .5, w = L * .16; ctx.save(); ctx.translate(cx, cy); X.contact(0, L * .55, L * .25, .18);
    rectF(-w / 2, -L * .4, w, L * .8, w * .3, '#F4EAD2', { plane: .5 }); [-1, 1].forEach(e => [-1, 1].forEach(sd => ovalF(sd * w * .55, e * L * .42, w * .62, w * .55, '#F4EAD2', { plane: .5 })));
    rectF(-w * .22, -L * .3, w * .44, L * .6, w * .2, '#E6D2A8', { plane: 0 });
    const thin = clamp((lt - t1) / Math.max(2, dur - t1 - 1)); struts.forEach(([xx, yy, an, l, r]) => { const gone = r < thin * .75; if (gone) return; ctx.save(); ctx.globalAlpha = .9; ctx.strokeStyle = '#C9A46A'; ctx.lineWidth = 3.5 * u; ctx.lineCap = 'round'; ctx.beginPath(); const x0 = xx * L, y0 = yy * L; ctx.moveTo(x0, y0); ctx.lineTo(x0 + Math.cos(an) * l * L, y0 + Math.sin(an) * l * L); ctx.stroke(); ctx.restore(); });
    ctx.restore();
    const load = lt < t1 ? 1 : 1 - .5 * E.inOut(clamp((lt - t1) / 1)), aw = W * .1 * load, ah = H * .08 * load, ay = cy - L * .5 - H * .02 + Math.sin(lt * 3) * 4 * u;
    polyF([[cx - aw * .4, ay - ah], [cx + aw * .4, ay - ah], [cx + aw * .4, ay - ah * .4], [cx + aw * .8, ay - ah * .4], [cx, ay], [cx - aw * .8, ay - ah * .4], [cx - aw * .4, ay - ah * .4]], GOLD, { plane: .4 });
    lbl(load < .99 ? 'LOAD ½' : 'LOAD', cx + W * .2, ay - ah * .5, 26, INK);
    if (lt > t1 + 1.5) pill('LESS LOAD, LESS BONE', cx, H * .69, lt, t1 + 1.5, { s: 24, bg: '#26233A', col: GOLD });
    head(o, lt, false); X.finish(lt, { vig: .22 }); } }; };

  // ================================================================ x_gh_muscle — the workout floats away (S18) + GAG.floatbell
  A.x_gh_muscle = (o, c, dur) => { const t1 = Math.max(T0(c, 0, .5) + 1.4, 1.6), t2 = T0(c, 1, 4); return { sfx: [], draw: lt => { const u = U();
    room('#F2E6D0', '#F8F1E2', '#B97A50', 'gym2', () => { ctx.fillStyle = '#E3D2B4'; ctx.fillRect(W * .06, H * .34, W * .3, H * .2); ctx.fillStyle = '#FFFFFF'; ctx.globalAlpha = .4; ctx.fillRect(W * .08, H * .36, W * .26, H * .16); ctx.globalAlpha = 1; });
    rectF(W * .08, GY() - H * .06, W * .32, H * .03, 8 * u, '#4A4A6E', { plane: .4 }); [W * .12, W * .36].forEach(x => rectF(x - 6 * u, GY() - H * .04, 12 * u, H * .04, 4 * u, '#3D3D5C', { plane: 0 }));
    const fly = clamp((lt - t1) / 3), bx = W * (.62 + fly * .1) + Math.sin(lt * 1.3) * W * .02 * fly, by = lerp(H * .5, H * .42, E.inOut(fly));
    CREW('cap', W * .62, GY(), H * .32, lt, { keys: [[0, 'hold', 'grin'], [t1, 'shock', 'shock'], [t1 + 1.8, 'slump', 'deadpan']] });
    GAG.floatbell(bx, by, W * .26, lt * (fly > 0 ? 1 : 0));
    if (lt > t2) X.counter(20, W * .4, H * .31, lt, t2, { s: 64, pre: 'UP TO ', post: ' %', col: INK }); if (lt > t2 + .8) pill('IN 5–11 DAYS', W * .4, H * .37, lt, t2 + .8, { s: 22, bg: '#26233A', col: GOLD });
    head(o, lt, false); X.finish(lt, { vig: .22 }); } }; };

  // ================================================================ x_gh_heart — the heart stops pumping uphill, the spine stretches (S19)
  A.x_gh_heart = (o, c, dur) => { const t1 = T0(c, 0, .3), t2 = T0(c, 1, 3.5), t3 = T0(c, 2, 6); return { sfx: [], draw: lt => { const u = U();
    room('#E9EEF5', '#F6F8FB', '#CDD5E0', 'lab2', () => {});
    // left: the heart pumping blood up to the head
    const hx = W * .3, hy = H * .54, flat = E.inOut(clamp((lt - t1 - 1.2) / 2)); ovalF(hx, H * .32, W * .08, W * .09, '#F2CDB0', { plane: .45 });
    tube(hx, hy - H * .04, hx, H * .36, 18 * u, '#C2384E'); for (let i = 0; i < 5; i++) { const p = ((lt * (.5 - flat * .2) + i / 5) % 1); circ(hx, lerp(hy - H * .05, H * .37, p), 7 * u, '#FF9AA8', 0); }
    const pull = 1 - flat * .5; polyF([[hx - W * .14, H * .36], [hx - W * .1, H * .36], [hx - W * .1, H * .36 + H * .12 * pull], [hx - W * .08, H * .36 + H * .12 * pull], [hx - W * .12, H * .4 + H * .12 * pull], [hx - W * .16, H * .36 + H * .12 * pull], [hx - W * .14, H * .36 + H * .12 * pull]], GOLD, { plane: .3 });
    lbl('PULL', hx - W * .12, H * .34, 20, INK);
    const hs = W * .2 * (1 - .14 * flat) * (1 + .05 * Math.max(0, Math.sin(lt * 7))); heart(hx, hy, hs);
    if (lt > t2) pill('HEART SHRINKS', hx, H * .65, lt, t2 - 1, { s: 22, bg: '#26233A', col: GOLD });
    // right: the spine stretches
    const sx = W * .7, gap = 4 * u + 9 * u * E.inOut(clamp((lt - t3 + 1.5) / 2)), vh = H * .03; for (let i = 0; i < 9; i++) { const y = H * .32 + i * (vh + gap); rectF(sx - W * .06, y, W * .12, vh, vh * .35, '#F4EAD2', { plane: .5 }); ovalF(sx + W * .07, y + vh / 2, W * .02, vh * .3, '#E6D2A8', { plane: 0 }); }
    const top = H * .32, bot = H * .32 + 9 * (vh + gap); rectF(sx + W * .12, top, W * .025, bot - top, 4 * u, GOLD, { plane: .3 }); for (let y = top; y < bot; y += H * .02) line(sx + W * .12, y, sx + W * .135, y, 2 * u, INK);
    if (lt > t3 - 1) pill('A FEW CM TALLER', sx, H * .65, lt, t3 - 1, { s: 22 });
    head(o, lt, false); X.finish(lt, { vig: .22 }); } }; };

  // ================================================================ x_gh_mice — the JAXA centrifuge (S21) and its result (S22)
  A.x_gh_mice = (o, c, dur) => { const v = o.v || 'wheel', t1 = T0(c, 0, .3), t2 = T0(c, 1, 3.5); return { sfx: [], draw: lt => { const u = U();
    room('#DCE3EC', '#C3CCD8', '#AEB8C6', 'iss', () => { ctx.strokeStyle = 'rgba(60,70,90,.12)'; ctx.lineWidth = 3; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(W * i / 6, 0); ctx.lineTo(W * i / 6, H); ctx.stroke(); } });
    if (v === 'wheel') { const cx = W / 2, cy = H * .46, R = W * .28; ovalF(cx, cy, R * 1.08, R * 1.08, '#B9C4D2', { plane: .3 }); ovalF(cx, cy, R * .98, R * .98, '#E9EEF5', { plane: 0 });
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(lt * 1.4); for (let k = 0; k < 8; k++) { ctx.rotate(TAU / 8); ctx.save(); ctx.globalAlpha = .35; rectF(-4 * u, -R * .95, 8 * u, R * .8, 4 * u, '#8A94A6', { plane: 0 }); ctx.restore(); } ctx.restore();
      ovalF(cx, cy, R * .12, R * .12, GOLD, { plane: .4 });
      [['0 G', -1, -1], ['1/3 G', 1, -1], ['2/3 G', -1, 1], ['1 G', 1, 1]].forEach(([t, sx, sy], i) => { const x = cx + sx * R * .48, y = cy + sy * R * .42; ctx.save(); ctx.shadowColor = 'rgba(30,40,60,.25)'; ctx.shadowBlur = 12 * u; rectF(x - R * .3, y - R * .24, R * .6, R * .48, 16 * u, '#FFFDF4', { plane: 0 }); ctx.restore();
        ctx.save(); ctx.strokeStyle = 'rgba(38,35,58,.25)'; ctx.lineWidth = 2 * u; for (let k = 1; k < 5; k++) { ctx.beginPath(); ctx.moveTo(x - R * .3 + k * R * .12, y - R * .24); ctx.lineTo(x - R * .3 + k * R * .12, y + R * .24); ctx.stroke(); } ctx.restore();
        mouse(x, y + R * .16, R * .26, lt, { seed: i, flip: sx < 0, col: '#C9C2D6' }); X.text(t, x, y - R * .32, { f: 'mono', w: 700, s: 24 * u, fill: INK }); });
      if (lt > t2) pill('ABOUT A MONTH', cx, H * .665, lt, t2, { s: 24, bg: '#26233A', col: GOLD });
    } else { [[W * .28, '2/3 G', 'STRONG', 0, t1], [W * .72, '1/3 G', 'WEAKER', 1, t2]].forEach(([x, g, word, weak, at]) => { const k = KB(lt, at - .2, .7); if (k <= 0) return; ctx.save(); ctx.translate(x, H * .48); ctx.scale(k, k); ctx.translate(-x, -H * .48);
        ctx.save(); ctx.shadowColor = 'rgba(30,40,60,.25)'; ctx.shadowBlur = 18 * u; rectF(x - W * .2, H * .33, W * .4, H * .3, 22 * u, weak ? '#E3E6EE' : '#FFF6DA', { plane: 0 }); ctx.restore();
        mouse(x, H * .56, H * .14, lt, { flex: !weak, slump: weak, col: weak ? '#9A94A8' : '#D8C9A0', flip: weak }); X.text(g, x, H * .37, { f: 'disp', w: 900, s: 40 * u, fill: INK }); ctx.restore();
        pill(word, x, H * .67, lt, at + .6, { s: 26, bg: weak ? '#FFFDF4' : '#26233A', col: weak ? INK : GOLD }); });
      if (lt > t2 + 1.5) GAG.sweat(W * .8, H * .45, 22 * u, lt); }
    head(o, lt, false); X.finish(lt, { vig: .25 }); } }; };

  // ================================================================ x_gh_air — the weight of the air (S26) and the puffed-up air (S28)
  A.x_gh_air = (o, c, dur) => { const v = o.v || 'stack', t1 = T0(c, 1, 3.5), t2 = T0(c, 2, 6); return { sfx: [], draw: lt => { const u = U();
    room('#7FC4F0', '#DFF2FF', '#7BC97A', 'coast', () => { ctx.fillStyle = '#5BB0E0'; ctx.fillRect(0, GY() - H * .03, W, H * .03); ctx.fillStyle = 'rgba(255,255,255,.75)'; [[.15, .3, .1], [.8, .26, .08]].forEach(([x, y, r]) => { ctx.beginPath(); ctx.ellipse(W * x, H * y, W * r, W * r * .4, 0, 0, TAU); ctx.fill(); }); });
    const puff = v === 'puff' ? E.inOut(clamp(lt / 3)) : 0, light = v === 'stack' ? E.inOut(clamp((lt - t1) / 1.2)) : 1, n = 9, bw = W * .34, cx = W * .5;
    for (let i = 0; i < n; i++) { const k = v === 'stack' ? KB(lt, .15 + i * .18, .5) : 1; if (k <= 0) continue; const bh = H * .038 * (1 + puff), y = GY() - H * .2 - (i + 1) * bh * 1.08; if (y < -bh) continue;
      ctx.save(); ctx.globalAlpha = (.82 - i * .05) * (1 - light * .45) * (1 - puff * .35); rectF(cx - bw / 2 * k, y, bw * k, bh, 8 * u, '#EAF6FF', { plane: .25 }); ctx.globalAlpha *= .6; ctx.strokeStyle = '#3E8EDE'; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.roundRect(cx - bw / 2 * k, y, bw * k, bh, 8 * u); ctx.stroke(); ctx.restore(); }
    if (v === 'stack') { CREW('hijab', cx, GY(), H * .2, lt, { keys: [[0, 'idle', 'happy'], [1.2, 'watch', 'think']] });
      const gv = 1 - .5 * light; dial(W * .23, H * .6, W * .12, gv, lt, { label: 'PRESSURE', marks: [[0, '0'], [.5, '½'], [1, '1']] });
      if (lt > t2) pill('½ THE PRESSURE', W * .74, H * .56, lt, t2, { s: 22, bg: '#26233A', col: GOLD });
    } else { const br = 1 + .08 * Math.sin(lt * 1.6), lx = cx, ly = GY() - H * .08; [-1, 1].forEach(sd => ovalF(lx + sd * W * .07, ly, W * .065 * br, H * .06 * br, '#F28A9A', { plane: .45 })); tube(lx, ly - H * .09, lx, ly - H * .04, 12 * u, '#E3B2BA');
      pill('TALLER, THINNER', W * .5, H * .3, lt, 1.6, { s: 24 }); if (lt > t2) pill('½ THE OXYGEN', W * .5, H * .5, lt, t2, { s: 24, bg: '#26233A', col: GOLD }); }
    head(o, lt, false); X.finish(lt, { vig: .2 }); } }; };

  // ================================================================ x_gh_mountain — air that thin is found at 5,500 m (S27)
  A.x_gh_mountain = (o, c, dur) => { const t1 = T0(c, 0, .5), t2 = T0(c, 1, 4); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(X.cache('ghmtn', () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#9EC6E8'); g.addColorStop(1, '#EEF4FA'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#B9C8D8'; ctx.beginPath(); ctx.moveTo(-W * .1, H * .7); ctx.lineTo(W * .2, H * .42); ctx.lineTo(W * .4, H * .7); ctx.fill(); ctx.beginPath(); ctx.moveTo(W * .6, H * .7); ctx.lineTo(W * .9, H * .45); ctx.lineTo(W * 1.2, H * .7); ctx.fill();
      ctx.fillStyle = '#7A8798'; ctx.beginPath(); ctx.moveTo(W * .02, H * .78); ctx.lineTo(W * .5, H * .28); ctx.lineTo(W * .98, H * .78); ctx.fill(); ctx.fillStyle = '#5E6A7C'; ctx.beginPath(); ctx.moveTo(W * .5, H * .28); ctx.lineTo(W * .98, H * .78); ctx.lineTo(W * .6, H * .78); ctx.fill();
      ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.moveTo(W * .5, H * .28); ctx.lineTo(W * .62, H * .405); ctx.lineTo(W * .56, H * .39); ctx.lineTo(W * .5, H * .42); ctx.lineTo(W * .44, H * .39); ctx.lineTo(W * .38, H * .405); ctx.fill(); }, 2), 0, 0);
    const ly = H * .46, k = K(lt, t1, 1.2); ctx.save(); ctx.globalAlpha = k; ctx.setLineDash([16 * u, 12 * u]); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.moveTo(W * .06, ly); ctx.lineTo(W * .94 * k + W * .06 * (1 - k), ly); ctx.stroke(); ctx.restore();
    pill('5,500 M', W * .2, ly - H * .03, lt, t1 + .6, { s: 26, bg: '#26233A', col: GOLD });
    const tx = W * .6, ty = ly + H * .035; polyF([[tx - W * .07, ty], [tx, ty - H * .06], [tx + W * .07, ty]], '#FF7A45', { plane: .45 }); polyF([[tx - W * .015, ty], [tx, ty - H * .035], [tx + W * .015, ty]], '#7A2E1A', { plane: 0 });
    CREW('beard', W * .44, ty + H * .005, H * .13, lt, { keys: [[0, 'slump', 'worried'], [3, 'slump', 'bored']] }); const br = (lt * .7) % 1; ctx.save(); ctx.globalAlpha = (1 - br) * .7; ovalF(W * .5 + br * W * .05, ty - H * .1 - br * H * .03, W * .02 * (1 + br), W * .015 * (1 + br), '#FFFFFF', { plane: 0 }); ctx.restore();
    const r = rng(6); for (let i = 0; i < 40; i++) { const x = (r() * W + lt * W * .03 * (1 + r())) % W, y = (r() * H + lt * H * .03 * (1 + r())) % (H * .7); circ(x, y, 2 + r() * 3 * u, 'rgba(255,255,255,.8)', 0); }
    if (lt > t2) pill('HALF THE PRESSURE', W * .5, H * .7, lt, t2, { s: 24 });
    head(o, lt, false); X.finish(lt, { vig: .22 }); } }; };

  // ================================================================ x_gh_kettle — water boils at about 81 °C (S29) + GAG.sadtea
  A.x_gh_kettle = (o, c, dur) => { const t1 = T0(c, 0, .5), t3 = T0(c, 1, 4.5); return { sfx: [], draw: lt => { const u = U();
    room('#FFE6CC', '#FFF3E4', '#C98A5E', 'kitchen', () => { ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 3; for (let y = H * .42; y < GY(); y += H * .035) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } ctx.fillStyle = '#E3B98F'; ctx.fillRect(0, GY() - H * .02, W, H * .02); });
    const kx = W * .38, ky = GY() - H * .02; rectF(kx - W * .16, ky - H * .012, W * .32, H * .016, 6 * u, '#3D3D5C', { plane: 0 });
    ovalF(kx, ky - H * .08, W * .14, H * .075, '#5BC0EB', { plane: .5 }); polyF([[kx + W * .1, ky - H * .1], [kx + W * .22, ky - H * .15], [kx + W * .2, ky - H * .13], [kx + W * .1, ky - H * .06]], '#4AA8D6', { plane: .4 }); ctx.save(); ctx.lineWidth = 14 * u; ctx.strokeStyle = '#3D3D5C'; ctx.beginPath(); ctx.arc(kx, ky - H * .15, W * .08, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.restore(); ovalF(kx, ky - H * .155, W * .03, H * .01, '#3D3D5C', { plane: 0 });
    for (let i = 0; i < 5; i++) { const p = ((lt * .5 + i / 5) % 1); ctx.save(); ctx.globalAlpha = (1 - p) * .7; ovalF(kx + W * .22 + p * W * .05 + Math.sin(p * 6 + i) * W * .02, ky - H * .16 - p * H * .14, W * (.025 + p * .03), W * (.02 + p * .025), '#FFFFFF', { plane: 0 }); ctx.restore(); }
    const thx = W * .18, tb = H * .62, tt = H * .34, lvl = .81 * E.out(clamp((lt - t1) / 1.6)); rectF(thx - W * .025, tt, W * .05, tb - tt, W * .025, '#FFFFFF', { plane: .3 }); circ(thx, tb, W * .04, '#E63950', 0); rectF(thx - W * .012, tb - (tb - tt) * lvl, W * .024, (tb - tt) * lvl, W * .012, '#E63950', { plane: 0 });
    line(thx + W * .03, tt + (tb - tt) * 0, thx + W * .05, tt, 3 * u, INK); lbl('100', thx + W * .085, tt, 18, INK); line(thx + W * .03, tb - (tb - tt) * .81, thx + W * .05, tb - (tb - tt) * .81, 3 * u, '#E63950');
    if (lt > t1 + 1) pill('81 °C', thx + W * .13, tb - (tb - tt) * .81, lt, t1 + 1, { s: 28, bg: '#26233A', col: GOLD });
    GAG.sadtea(W * .72, GY() - H * .11, W * .16, lt, lt > t3 ? 1 : 0); if (lt > t3 + .5) pill('LUKEWARM TEA', W * .72, H * .4, lt, t3 + .5, { s: 22 });
    head(o, lt, false); X.finish(lt, { vig: .22 }); } }; };

  // ================================================================ x_gh_orbit — Earth on the Sun's string (S32) and the string snapping (S34)
  A.x_gh_orbit = (o, c, dur) => { const v = o.v || 'string', t1 = T0(c, 0, .5), tS = Math.max(T0(c, 0, .5) + 2.2, 2.4), t2 = T0(c, 1, 5); return { sfx: [], draw: lt => { const u = U(); cosmos(lt);
    const cx = W / 2, cy = H * .46, rx = W * .34, ry = H * .13, w = .55; sun(cx, cy, W * .08, lt);
    const ang = a => [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry];
    ctx.save(); ctx.globalAlpha = .3; ctx.setLineDash([6 * u, 10 * u]); ctx.strokeStyle = CREAM; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, TAU); ctx.stroke(); ctx.restore();
    let ex, ey, a = lt * w + .6, held = true;
    if (v === 'snap' && lt > tS) { held = false; const a0 = tS * w + .6, [px, py] = ang(a0), vx = -Math.sin(a0) * rx * w, vy = Math.cos(a0) * ry * w, dt = lt - tS; ex = px + vx * dt * .9 - (cx - px) * dt * .02; ey = py + vy * dt * .9;
      ex = clamp(ex, W * .2, W * .8); ey = clamp(ey, H * .32, H * .64);
      ctx.save(); ctx.globalAlpha = .55 * K(lt, tS + .6, 1); ctx.setLineDash([14 * u, 12 * u]); ctx.strokeStyle = GOLD; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + vx * 12, py + vy * 12); ctx.stroke(); ctx.strokeStyle = '#7FD3FF'; ctx.beginPath(); ctx.ellipse(cx + rx * .9, cy, rx * 1.9, ry * 1.9, 0, Math.PI * .6, Math.PI * 1.4, true); ctx.stroke(); ctx.restore();
      const fr = clamp((lt - tS) / .8); [[0, 1], [1, -1]].forEach(([e, s2]) => { const bx = e ? px : cx, by = e ? py : cy, mx = (cx + px) / 2, my = (cy + py) / 2; ctx.save(); ctx.globalAlpha = 1 - fr * .7; line(bx, by, lerp(bx, mx, .8) + s2 * fr * 20 * u, lerp(by, my, .8) + fr * 30 * u, 5 * u, GOLD); ctx.restore(); });
    } else { [ex, ey] = ang(a); }
    if (held) { const fray = v === 'snap' ? clamp((lt - tS + 1.5) / 1.5) : 0; ctx.save(); ctx.strokeStyle = GOLD; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.moveTo(cx, cy); const n = 10; for (let i = 1; i <= n; i++) { const t = i / n; ctx.lineTo(lerp(cx, ex, t) + (i % 2 ? 1 : -1) * fray * 8 * u * (i > 4 && i < 7 ? 1 : 0), lerp(cy, ey, t)); } ctx.stroke(); ctx.restore(); }
    earth(ex, ey, W * .065, lt); ovalF(ex, ey + W * .062, W * .03, W * .012, '#E63950', { plane: 0 });
    if (!held && lt > tS + 1.5) { const wv = Math.sin(lt * 9) * .5; ctx.save(); ctx.translate(ex + W * .06, ey - W * .03); ctx.rotate(-.6 + wv); tube(0, 0, 0, -W * .05, 8 * u, '#3E8EDE'); IFM.CAST.ovalF(0, -W * .06, W * .015, W * .015, '#FFD2B3', { plane: 0 }); ctx.restore(); }
    if (v === 'string') { pill('30 KM/S', W / 2, H * .68, lt, t1 + 1.5, { s: 28, bg: '#26233A', col: GOLD }); }
    else if (lt > t2) { pill('AWAY FOREVER', W * .3, H * .68, lt, t2, { s: 22, bg: '#26233A', col: GOLD }); pill('OR A HUGE LOOP', W * .7, H * .68, lt, t2 + .5, { s: 22 }); }
    head(o, lt, true); X.finish(lt, { vig: .45 }); } }; };

  // ================================================================ x_gh_freeze — the Sun shrinks, the sea freezes (S36)
  A.x_gh_freeze = (o, c, dur) => { const t2 = T0(c, 1, 5); return { sfx: [], draw: lt => { const u = U(), p = E.inOut(clamp(lt / (dur * .85)));
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, mix('#6F8FC0', '#1A2340', p)); g.addColorStop(.55, mix('#F2C9A0', '#4A5A7A', p)); g.addColorStop(1, '#2A3550'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalAlpha = p; ctx.drawImage(starsLayer(9, 120, .45), 0, 0); ctx.restore();
    sun(W * .5, H * .34, W * (.07 - .055 * p), lt, { pale: p > .5 });
    const sea = H * .55; ctx.fillStyle = mix('#3E8EDE', '#24405E', p); ctx.fillRect(0, sea, W, GY() - sea);
    const ice = p; ctx.fillStyle = '#E9F4FA'; [[0, 1], [W, -1]].forEach(([x0, d]) => { ctx.beginPath(); ctx.moveTo(x0, sea); for (let k = 0; k <= 6; k++) { const yy = sea + (GY() - sea) * k / 6; ctx.lineTo(x0 + d * W * .5 * ice * (0.75 + .25 * Math.sin(k * 2.3)), yy); } ctx.lineTo(x0, GY()); ctx.fill(); });
    ctx.fillStyle = '#C9D6E2'; ctx.fillRect(0, GY(), W, H - GY());
    CREW('prof', W * .36, GY() + H * .04, H * .2, lt, { keys: [[0, 'watch', 'worried'], [3, 'crossed', 'worried']] }); CREW('braids', W * .62, GY() + H * .04, H * .18, lt, { flip: 1, keys: [[0, 'watch', 'think'], [4, 'watch', 'worried']] });
    const r = rng(12); for (let i = 0; i < 50; i++) { const x = (r() * W + lt * W * .02 * (1 + r())) % W, y = (r() * H * .7 + lt * H * .04 * (1 + r())) % (H * .72); circ(x, y, (1.5 + r() * 2.5) * u, `rgba(255,255,255,${(.3 + .5 * p).toFixed(2)})`, 0); }
    head(o, lt, true); X.finish(lt, { vig: .45 }); } }; };
})();
