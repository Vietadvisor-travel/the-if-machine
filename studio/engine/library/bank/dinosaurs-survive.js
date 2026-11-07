/* "Nếu khủng long còn sống" — bespoke acts for episode dinosaurs-survive (15 new acts; 3 new gags live in cast.js: GAG.waitcal, GAG.crown, GAG.ticket).
   Every scene is drawn in code with IFM.PX + the v3 flat language (IFM.CAST.ovalF/rectF/polyF/tube). Layout (9:16): kicker 11 %, headline 15-25 %,
   subject 28-68 %, captions 74.5-79 % kept clear. Museum theme: dark navy, gold accents. */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT || !IFM.PX || !IFM.CAST) return; const A = IFM.ACT, X = IFM.PX, C = X.C, K = X.K, KB = X.KB, T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d, ease = t => E.inOut(clamp(t));
  const { F, ovalF, rectF, polyF, tube } = IFM.CAST, GAG = IFM.CAST.GAG;
  const head = (o, lt, dark) => { if (o.kick) X.kicker(o.kick, W / 2, H * .115, lt, .05, { col: dark ? C.gold2 : C.goldD }); if (o.head) X.headline(o.head, W / 2, H * .195, lt, .2, { s: +o.hs || 70, col: dark ? '#F6F1E4' : C.ink, hi: dark ? C.gold2 : C.gold, shadow: dark ? 'rgba(0,0,0,.4)' : null }); };
  const GY = () => H * .66;
  const stars = (n, seed, y1) => { ctx.drawImage(X.cache('dnstars' + seed + n, () => { const r = rng(seed); for (let i = 0; i < n; i++) { ctx.globalAlpha = .3 + r() * .7; ctx.fillStyle = '#fff'; const s = r() < .1 ? 3 : 1.6; ctx.fillRect(r() * W, r() * H * (y1 || .55), s, s); } ctx.globalAlpha = 1; }), 0, 0); };

  // ---------------------------------------------------------------- episode creatures (x, y = feet, s = size)
  function shrew(x, y, s, lt, o = {}) { const f = o.flip ? -1 : 1, bob = Math.sin(lt * 6) * s * .02;
    ctx.save(); ctx.translate(x, y + bob); ctx.scale(f, 1); X.contact(0, 0, s * .5, .25);
    tube(-s * .36, -s * .22, -s * .74, -s * .04 + Math.sin(lt * 3) * s * .05, s * .06, '#B09A86');
    ovalF(0, -s * .3, s * .42, s * .3, '#8A7A6A', { plane: .5 });
    ovalF(-s * .06, -s * .38, s * .28, s * .19, '#9A8A78', { plane: .5 });
    ovalF(s * .34, -s * .52, s * .2, s * .18, '#8A7A6A', { plane: .5 });
    polyF([[s * .48, -s * .56], [s * .7, -s * .48], [s * .48, -s * .44]], '#7A6A5A', { plane: 0 });
    circ(s * .64, -s * .5, s * .032, '#E0654F', 0);
    circ(s * .32, -s * .56, s * .045, '#14162A', 0);
    ovalF(s * .26, -s * .68, s * .09, s * .1, '#7A6A5A', { plane: 0 });
    ovalF(s * .26, -s * .68, s * .045, s * .05, '#E8A0A8', { plane: 0 });
    const tap = o.tap ? Math.abs(Math.sin(lt * 8)) * s * .14 : 0;
    rectF(-s * .24, -s * .1, s * .09, s * .1, s * .03, '#6A5A4A', { plane: 0 });
    rectF(s * .12, -s * .1 - tap, s * .09, s * .1, s * .03, '#6A5A4A', { plane: 0 });
    ctx.restore(); }
  function chicken(x, y, s, lt, o = {}) { const bob = Math.abs(Math.sin(lt * 6)) * s * .05, tilt = Math.sin(lt * 6) * .06;
    ctx.save(); ctx.translate(x, y - bob); ctx.rotate(tilt); X.contact(0, bob, s * .5, .25);
    polyF([[-s * .3, -s * .5], [-s * .55, -s * .85], [-s * .35, -s * .9]], '#EDE8DF', { plane: 0 });
    polyF([[-s * .22, -s * .55], [-s * .4, -s * .95], [-s * .2, -s * .92]], '#F8F6F2', { plane: 0 });
    ovalF(0, -s * .32, s * .36, s * .3, '#F8F6F2', { plane: .5 });
    ovalF(-s * .05, -s * .4, s * .24, s * .18, '#FFFFFF', { plane: .5 });
    ovalF(-s * .08, -s * .3, s * .18, s * .12, '#EDE8DF', { plane: .5, rot: -.4 });
    const hx = s * .3, hy = -s * .68 - Math.abs(Math.sin(lt * 6 + 1)) * s * .04;
    ovalF(hx, hy, s * .16, s * .15, '#F8F6F2', { plane: .5 });
    polyF([[hx + s * .12, hy - s * .02], [hx + s * .3, hy + s * .03], [hx + s * .12, hy + s * .08]], '#F28A2E', { plane: 0 });
    circ(hx + s * .05, hy - s * .04, s * .035, '#14162A', 0);
    circ(hx - s * .02, hy - s * .17, s * .05, '#E63950', 0); circ(hx + s * .06, hy - s * .19, s * .05, '#E63950', 0); circ(hx + s * .13, hy - s * .15, s * .045, '#E63950', 0);
    ovalF(hx + s * .14, hy + s * .1, s * .04, s * .06, '#E63950', { plane: 0 });
    if (o.crown) GAG.crown(hx + s * .02, hy - s * .24, s * .3, lt);
    const step = Math.sin(lt * 6) * s * .08;
    tube(-s * .08, -s * .08, -s * .08 + step, 0, s * .04, '#F2B33D');
    tube(s * .1, -s * .08, s * .1 - step, 0, s * .04, '#F2B33D');
    ctx.restore(); }
  function sauropod(x, y, s, lt, o = {}) { const f = o.flip ? -1 : 1;
    ctx.save(); ctx.translate(x, y); ctx.scale(f, 1); X.contact(0, 0, s * .55, .25);
    tube(-s * .42, -s * .3, -s * .85, -s * .08 + Math.sin(lt * 2) * s * .03, s * .14, '#6B8F5E');
    ovalF(0, -s * .32, s * .45, s * .28, '#7A9E6B', { plane: .5 });
    ovalF(-s * .05, -s * .4, s * .32, s * .18, '#8FB07E', { plane: .5 });
    const sway = Math.sin(lt * 1.5) * s * .03;
    tube(s * .36, -s * .5, s * .48, -s * .78, s * .16, '#7A9E6B');
    tube(s * .48, -s * .78, s * .5 + sway, -s * 1.02, s * .13, '#8FB07E');
    ovalF(s * .52 + sway, -s * 1.08, s * .13, s * .1, '#8FB07E', { plane: .5 });
    circ(s * .58 + sway, -s * 1.1, s * .025, '#14162A', 0);
    [-.32, -.12, .14, .32].forEach(lx => rectF(s * lx - s * .06, -s * .22, s * .12, s * .22, s * .04, '#6B8F5E', { plane: 0 }));
    ctx.restore(); }
  function comet(x, y, r, lt, o = {}) { const dir = o.dir || [-.7, .7], len = r * (o.tail || 6);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2); g.addColorStop(0, 'rgba(255,240,200,.9)'); g.addColorStop(.4, 'rgba(255,190,90,.45)'); g.addColorStop(1, 'rgba(255,190,90,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, TAU); ctx.fill(); ctx.restore();
    polyF([[x, y - r * .5], [x + dir[0] * len, y + dir[1] * len - r * .9], [x + dir[0] * len, y + dir[1] * len + r * .9], [x, y + r * .5]], 'rgba(255,220,150,.55)', { plane: 0 });
    circ(x, y, r, '#FFF6D8', 0); circ(x - r * .25, y - r * .25, r * .5, '#FFFFFF', 0); }
  function tree(x, y, s, lt, col) { rectF(x - s * .04, y - s * .5, s * .08, s * .5, s * .02, '#5A3A28', { plane: 0 });
    ovalF(x - s * .14, y - s * .62, s * .22, s * .2, shade(col, -.06), { plane: .5 });
    ovalF(x + s * .13, y - s * .66, s * .2, s * .18, col, { plane: .5 });
    ovalF(x, y - s * .82, s * .24, s * .22, shade(col, .05), { plane: .5 }); }

  // ================================================================ x_dino_facts — two surprises, two cards (S04)
  A.x_dino_facts = (o, c, dur) => { const t1 = T0(c, 0, .3), t2 = T0(c, 1, 3.5); return { sfx: [], draw: lt => { const u = U(); IFM.exBg(o, lt); IFM.exTitle(o, lt);
    const card = (x, k, inner) => { if (k <= 0) return; ctx.save(); ctx.translate(x, H * .44); ctx.scale(k, k); ctx.translate(-x, -H * .44);
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.4)'; ctx.shadowBlur = 24 * u; ctx.shadowOffsetY = 8 * u; rr(x - W * .21, H * .3, W * .42, H * .3, 16 * u, '#2E3348', 0); ctx.restore();
      ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.roundRect(x - W * .21, H * .3, W * .42, H * .3, 16 * u); ctx.stroke(); ctx.restore(); inner(); ctx.restore(); };
    card(W * .26, KB(lt, t1, .7), () => { IFM.creature('bird', W * .26, H * .44, H * .11, lt, { col: '#E0654F' }); X.text('A BIRD IS STILL', W * .26, H * .52, { f: 'mono', w: 700, s: 24 * u, fill: '#F6F1E4' }); X.text('A DINOSAUR', W * .26, H * .55, { f: 'mono', w: 700, s: 24 * u, fill: C.gold2 }); });
    card(W * .74, KB(lt, t2, .7), () => { shrew(W * .74, H * .47, H * .09, lt, {}); X.text('A SHREW HID', W * .74, H * .52, { f: 'mono', w: 700, s: 24 * u, fill: '#F6F1E4' }); X.text('100,000,000 YEARS', W * .74, H * .55, { f: 'mono', w: 700, s: 24 * u, fill: C.gold2 }); });
    X.finish(lt, { vig: .4 }); } }; };

  // ================================================================ x_dino_impact — the comet over the Yucatan coast (S09)
  A.x_dino_impact = (o, c, dur) => { const tHit = T0(c, 2, 6); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(X.cache('dncoast', () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0B1026'); g.addColorStop(.55, '#1A2550'); g.addColorStop(.56, '#0E2A3A'); g.addColorStop(1, '#0A1A26'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#12303F'; ctx.beginPath(); ctx.moveTo(0, H * .62); for (let x = 0; x <= W; x += W / 12) ctx.lineTo(x, H * .62 + Math.sin(x / W * 9) * H * .012); ctx.lineTo(W, H * .66); ctx.lineTo(0, H * .66); ctx.fill();
      ctx.fillStyle = '#1E3A2C'; ctx.beginPath(); ctx.moveTo(0, H * .66); ctx.quadraticCurveTo(W * .4, H * .62, W, H * .68); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); }), 0, 0);
    stars(160, 7, .55);
    const q = clamp(lt / (dur * .8)), cx = W * (.82 - q * .32), cy = H * (.12 + q * .42), cr = W * (.03 + q * .05);
    comet(cx, cy, cr, lt, { dir: [-.5, .8], tail: 5 });
    X.rays(cx, cy, W * .5, lt, .12, '#FFE9C0', 7);
    IFM.creature('dino', W * .3, GY(), H * .2, lt, { col: '#22301F' });
    if (lt > tHit) X.callout('10 KM WIDE', cx, cy + cr, W * .5, H * .3, lt, tHit, { dark: true });
    IFM.exTitle(o, lt); X.finish(lt, { vig: .45 }); } }; };

  // ================================================================ x_dino_dark — the sky goes dark, 75 % gone (S11)
  A.x_dino_dark = (o, c, dur) => { const t75 = T0(c, 2, 5); return { sfx: [], draw: lt => { const u = U();
    X.backdrop('#BFD6EA', '#8FB8A0', { pool: '#FFF6D8', py: .3 });
    const gy = GY();
    ctx.fillStyle = '#5E8A52'; ctx.fillRect(0, gy, W, H - gy);
    tree(W * .16, gy, H * .22, lt, '#3E7A44'); tree(W * .84, gy, H * .26, lt, '#2F6B3A'); tree(W * .5, gy - H * .02, H * .18, lt, '#4E8A4A');
    const wilt = clamp((lt - 2) / 4);
    ctx.save(); ctx.translate(W * .5, gy); ctx.rotate(wilt * 1.1); tube(0, 0, 0, -H * .12, 8 * u, '#2F6B3A'); ovalF(0, -H * .13, W * .05, H * .02, '#7AB85E', { plane: .5, rot: .5 }); ctx.restore();
    ctx.save(); ctx.globalAlpha = 1 - clamp((lt - 3) / 4); IFM.creature('dino', W * .68, gy, H * .2, lt, { col: '#3A5A3A' }); ctx.restore();
    const veil = clamp(lt / dur) * .78;
    ctx.fillStyle = 'rgba(8,10,26,' + veil.toFixed(3) + ')'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.globalAlpha = clamp((lt - 3) / 2); X.text('THE SKY WENT DARK', W / 2, H * .18, { f: 'disp', w: 900, s: 54 * u, fill: '#F6F1E4' }); ctx.restore();
    if (lt > t75) X.counter(75, W / 2, H * .42, lt, t75, { s: 120, col: '#F6F1E4', unit: '% OF ALL LIFE GONE', shadow: 'rgba(0,0,0,.5)' });
    X.finish(lt, { vig: .4 }); } }; };

  // ================================================================ x_dino_burrow — safe underground while giants pass (S13)
  A.x_dino_burrow = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U();
    X.backdrop('#BFD6EA', '#E9F0DD', { pool: '#FFF6D8', py: .2 });
    ctx.drawImage(X.cache('dnsoil', () => { ctx.fillStyle = '#6B4A2E'; ctx.fillRect(0, H * .2, W, H);
      ctx.fillStyle = '#7A5636'; ctx.fillRect(0, H * .2, W, H * .16); ctx.fillStyle = '#5A3D26'; ctx.fillRect(0, H * .52, W, H * .2);
      const r = rng(3); for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(0,0,0,.12)'; ctx.beginPath(); ctx.arc(r() * W, H * (.24 + r() * .7), 4 + r() * 10, 0, TAU); ctx.fill(); } }), 0, 0);
    rr(W * .12, H * .42, W * .76, H * .16, H * .08, '#3A2A1A', 0);
    shrew(W * .4, H * .56, H * .1, lt, {});
    for (let i = 0; i < 3; i++) { const ix = W * (.6 + i * .08), iy = H * (.47 + (i % 2) * .05); circ(ix, iy, 4 * u, '#2A1A10', 0); line(ix - 6 * u, iy + 4 * u, ix + 6 * u, iy + 4 * u, 2 * u, '#2A1A10'); }
    ovalF(W * .68, H * .53, 8 * u, 5 * u, '#D9B26A', { plane: 0 }); ovalF(W * .72, H * .5, 7 * u, 4.5 * u, '#C9A44C', { plane: 0 });
    const fq = clamp((lt - 1.5) / 4), fx = W * (-.25 + fq * 1.5);
    if (fq > 0 && fq < 1) { ctx.save(); ctx.globalAlpha = .9; ctx.translate(fx, H * .16);
      polyF([[-W * .13, 0], [-W * .08, -H * .11], [0, -H * .12], [W * .08, -H * .11], [W * .13, 0]], '#4A3222', { plane: 0 });
      [-.08, 0, .08].forEach(dx => polyF([[dx * W - W * .04, -H * .11], [dx * W, -H * .19], [dx * W + W * .04, -H * .11]], '#4A3222', { plane: 0 }));
      ctx.restore();
      ctx.save(); ctx.globalAlpha = .25 * Math.sin(fq * Math.PI); ell(fx, H * .2, W * .2, H * .015, '#000000', 0); ctx.restore(); }
    X.finish(lt, { vig: .25 }); } });

  // ================================================================ x_dino_daynight — dinos own the day, mammals own the night (S14)
  A.x_dino_daynight = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U();
    ctx.fillStyle = '#BFD6EA'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#7FAE7A'; ctx.fillRect(0, GY(), W / 2, H - GY());
    circ(W * .25, H * .16, W * .07, '#FFE9A8', 0);
    tree(W * .14, GY(), H * .18, lt, '#3E7A44');
    IFM.creature('dino', W * .28, GY(), H * .18, lt, { col: '#4E9A62' });
    ctx.fillStyle = '#10142A'; ctx.fillRect(W / 2, 0, W / 2, H); ctx.fillStyle = '#1E2A44'; ctx.fillRect(W / 2, GY(), W / 2, H - GY());
    const r = rng(9); for (let i = 0; i < 30; i++) { ctx.globalAlpha = .4 + r() * .6; ctx.fillStyle = '#fff'; ctx.fillRect(W * (.52 + r() * .46), r() * H * .5, 2, 2); } ctx.globalAlpha = 1;
    circ(W * .78, H * .14, W * .05, '#EEF1FF', 0);
    shrew(W * .74, GY(), H * .11, lt, {});
    line(W / 2, 0, W / 2, H, 4 * u, C.gold);
    X.text('DAY', W * .25, H * .09, { f: 'mono', w: 700, s: 28 * u, fill: '#2F5B43' });
    X.text('NIGHT', W * .75, H * .09, { f: 'mono', w: 700, s: 28 * u, fill: '#F6F1E4' });
    X.finish(lt, { vig: .3 }); } });

  // ================================================================ x_dino_miss — the comet streaks past, the sky stays blue (S15)
  A.x_dino_miss = (o, c, dur) => { const tPass = T0(c, 1, 2); return { sfx: [], draw: lt => { const u = U();
    X.backdrop('#7FB8E8', '#D6EAF8', { pool: '#FFFFFF', py: .3 });
    [[.2, .14], [.65, .1], [.85, .24]].forEach(([cx, cy], i) => { const ox = Math.sin(lt * .1 + i) * W * .02; ovalF(cx * W + ox, cy * H, W * .09, H * .025, '#FFFFFF', { plane: 0 }); ovalF(cx * W + ox + W * .05, cy * H + H * .01, W * .07, H * .02, '#FFFFFF', { plane: 0 }); });
    circ(W * .2, H * .78, W * .11, '#3E6FB0', 0); ell(W * .17, H * .76, W * .05, H * .02, '#5E9E6A', 0, -.4); ell(W * .23, H * .8, W * .04, H * .015, '#5E9E6A', 0, .3);
    const q = clamp((lt - tPass) / 4), cx = W * (1.1 - q * 1.3), cy = H * (.05 + q * .3);
    if (q > 0 && q < 1) comet(cx, cy, W * .035, lt, { dir: [.8, -.4], tail: 7 });
    IFM.creature('bird', W * (.55 + Math.sin(lt * .8) * .02), H * .42, H * .07, lt, { col: '#E8574A' });
    IFM.creature('bird', W * (.7 + Math.sin(lt * .8 + 1) * .02), H * .34, H * .05, lt + 2, { col: '#3E6A8A' });
    head(o, lt, false); X.finish(lt, { vig: .15 }); } }; };

  // ================================================================ x_dino_ages — the same shrew, three worlds, 100 million years (S16)
  A.x_dino_ages = (o, c, dur) => { const t1 = T0(c, 0, .3), t2 = T0(c, 1, 3.5), t3 = T0(c, 2, 7); return { sfx: [], draw: lt => { const u = U();
    const panels = [
      { x0: 0, col: '#5E8A52', label: '10 MILLION', at: t1 },
      { x0: W / 3, col: '#3E7FA6', label: '50 MILLION', at: t2 },
      { x0: W * 2 / 3, col: '#D9A45B', label: '100 MILLION', at: t3 }];
    panels.forEach((p, i) => { ctx.fillStyle = p.col; ctx.fillRect(p.x0, 0, W / 3, H);
      if (i === 0) tree(p.x0 + W / 6, GY(), H * .16, lt, '#2F6B3A');
      if (i === 1) { ctx.fillStyle = '#2A5A7A'; ctx.fillRect(p.x0, GY() - H * .04, W / 3, H * .04); }
      if (i === 2) circ(p.x0 + W * .2, H * .2, W * .05, '#FFE3A0', 0);
      shrew(p.x0 + W / 6, GY(), H * .1, lt + i * 2, {});
      const k = KB(lt, p.at, .7); if (k > 0) { ctx.save(); ctx.globalAlpha = k; X.text(p.label, p.x0 + W / 6, H * .3, { f: 'mono', w: 700, s: 26 * u, fill: '#FFFFFF' }); ctx.restore(); }
      line(p.x0, 0, p.x0, H, 3 * u, C.gold); });
    X.text('YEARS', W / 2, H * .7, { f: 'mono', w: 700, s: 24 * u, fill: '#FFFFFF' });
    X.finish(lt, { vig: .25 }); } }; };

  // ================================================================ x_dino_wait — GAG 1: the shrew waits 100,000,000 years (S17)
  A.x_dino_wait = (o, c, dur) => { const t1 = T0(c, 0, .3); return { sfx: [], draw: lt => { const u = U(); IFM.exBg(o, lt); IFM.exTitle(o, lt);
    const k = KB(lt, t1, .7);
    if (k > 0) { ctx.save(); ctx.translate(W * .68, H * .42); ctx.scale(k, k); ctx.translate(-W * .68, -H * .42); GAG.waitcal(W * .68, H * .42, W * .52, lt, '100,000,000|YEARS'); ctx.restore(); }
    shrew(W * .3, GY(), H * .16, lt, { tap: 1 });
    X.bubble(W * .3, H * .4, W * .22, H * .06, W * .3, H * .55, { think: true });
    X.text('…', W * .3, H * .4, { f: 'disp', w: 900, s: 30 * u, fill: C.ink });
    X.finish(lt, { vig: .4 }); } }; };

  // ================================================================ x_dino_archae — the Archaeopteryx slab, 1861, Germany (S20)
  A.x_dino_archae = (o, c, dur) => { const t1 = T0(c, 0, .3), t2 = T0(c, 1, 3), t3 = T0(c, 2, 5.5); return { sfx: [], draw: lt => { const u = U(); IFM.exBg(o, lt); IFM.exTitle(o, lt);
    IFM.exStage(o, W / 2, H * .5, W * .72, lt);
    const k = KB(lt, t1, .7);
    ctx.save(); ctx.translate(W / 2, H * .48); ctx.scale(k, k);
    X.lit(() => ctx.roundRect(-W * .36, -H * .16, W * .72, H * .32, 12 * u), '#8A8A92', { box: [-W * .36, -H * .16, W * .72, H * .32], db: 20, dy: 10 });
    ctx.strokeStyle = '#3A3230'; ctx.lineWidth = 4 * u; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-W * .22, H * .02); ctx.quadraticCurveTo(0, -H * .06, W * .2, -H * .01); ctx.stroke();
    for (let i = 0; i < 5; i++) { const fx = -W * .12 + i * W * .06; ctx.beginPath(); ctx.moveTo(fx, -H * .02); ctx.lineTo(fx + W * .02, -H * .08 - (i % 2) * H * .02); ctx.stroke(); }
    polyF([[-W * .24, H * .02], [-W * .3, H * .08], [-W * .2, H * .07]], '#3A3230', { plane: 0 });
    circ(W * .22, -H * .03, W * .025, '#3A3230', 0);
    ctx.restore();
    if (lt > t2) X.callout('FEATHERS', W * .62, H * .4, W * .74, H * .3, lt, t2, { dark: true });
    if (lt > t3) X.callout('HOLLOW BONES', W * .42, H * .5, W * .26, H * .62, lt, t3, { dark: true });
    if (lt > t3 + 2) X.callout('WISHBONE', W * .52, H * .46, W * .72, H * .58, lt, t3 + 2, { dark: true });
    X.finish(lt, { vig: .4 }); } }; };

  // ================================================================ x_dino_liaoning — the brush reveals feathers in the rock (S21)
  A.x_dino_liaoning = (o, c, dur) => { const t1 = T0(c, 0, .3), t2 = T0(c, 1, 3); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(X.cache('dndig', () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#C9B48E'); g.addColorStop(1, '#8A6A44'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 5; i++) { ctx.fillStyle = i % 2 ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.06)'; ctx.fillRect(0, H * (.3 + i * .12), W, H * .06); }
      const r = rng(5); for (let i = 0; i < 30; i++) { ctx.fillStyle = 'rgba(0,0,0,.1)'; ctx.beginPath(); ctx.arc(r() * W, r() * H, 3 + r() * 8, 0, TAU); ctx.fill(); } }), 0, 0);
    const rk = KB(lt, t1, .7);
    ctx.save(); ctx.translate(W / 2, H * .5); ctx.scale(rk, rk);
    X.lit(() => ctx.roundRect(-W * .32, -H * .14, W * .64, H * .28, 10 * u), '#7A6A52', { box: [-W * .32, -H * .14, W * .64, H * .28], db: 18, dy: 8 });
    const reveal = clamp((lt - t2) / 3);
    ctx.save(); ctx.globalAlpha = reveal;
    for (let i = 0; i < 4; i++) { const fx = -W * .2 + i * W * .1; polyF([[fx, -H * .06], [fx + W * .03, -H * .1], [fx + W * .05, -H * .04], [fx + W * .02, 0]], '#4A3A28', { plane: 0 }); }
    ctx.restore(); ctx.restore();
    const bx = W * (.28 + .44 * clamp((lt - t2) / 3));
    tube(bx - W * .06, H * .34, bx + W * .06, H * .44, 10 * u, '#8A5A3A');
    rectF(bx + W * .02, H * .42, W * .08, H * .03, 4 * u, '#3A2A1A', { plane: 0 });
    X.motes(lt, 14, '#FFF1C8', .2);
    head(o, lt, false); X.finish(lt, { vig: .25 }); } }; };

  // ================================================================ x_dino_chicken — GAG 2: the heir wears a tiny crown (S23)
  A.x_dino_chicken = (o, c, dur) => { const t1 = T0(c, 0, .3); return { sfx: [], draw: lt => { const u = U(); IFM.place('farm', lt, {}); IFM.exTitle(o, lt);
    const k = KB(lt, t1, .7);
    ctx.save(); ctx.translate(W * .5, GY()); ctx.scale(k, k); ctx.translate(-W * .5, -GY());
    chicken(W * .5, GY(), H * .3, lt, { crown: 1 }); ctx.restore();
    GAG.zing(W * .56, H * .4, W * .05, lt);
    X.tag(W * .5, H * .28, W * .3, 'THE HEIR', lt, {});
    X.finish(lt, { vig: .2 }); } }; };

  // ================================================================ x_dino_pet — a popular belief, walked on a leash (S25)
  A.x_dino_pet = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U();
    X.backdrop('#BFD6EA', '#C9E0B8', { pool: '#FFF6D8', py: .3 });
    ctx.fillStyle = '#7FAE7A'; ctx.fillRect(0, GY(), W, H - GY());
    ctx.fillStyle = '#D9C9A8'; ctx.beginPath(); ctx.moveTo(W * .3, GY()); ctx.quadraticCurveTo(W * .5, GY() + H * .1, W * .45, H); ctx.lineTo(W * .75, H); ctx.quadraticCurveTo(W * .7, GY() + H * .08, W * .55, GY()); ctx.closePath(); ctx.fill();
    tree(W * .12, GY(), H * .2, lt, '#3E7A44'); tree(W * .88, GY(), H * .24, lt, '#2F6B3A');
    const px = W * (.3 + clamp(lt / dur) * .18);
    X.person(px, GY(), H * .2, lt, { col: '#3E6A8A', seed: 2, pose: 'walk' });
    const dx = px + W * .22;
    line(px + W * .06, GY() - H * .12, dx - W * .05, GY() - H * .06, 3 * u, '#8A6A44');
    IFM.creature('dino', dx, GY() + H * .01, H * .1, lt, { col: '#4E9A62', pose: 'walk' });
    X.text('A POPULAR BELIEF', W / 2, H * .14, { f: 'mono', w: 700, s: 26 * u, fill: '#2F5B43' });
    X.finish(lt, { vig: .2 }); } });

  // ================================================================ x_dino_bus — GAG 3: the rex waits for the bus, ticket in hand (S26)
  A.x_dino_bus = (o, c, dur) => { const t1 = T0(c, 0, .3), t2 = T0(c, 1, 3); return { sfx: [], draw: lt => { const u = U(); IFM.place('street', lt, {}); IFM.exTitle(o, lt);
    tube(W * .16, H * .3, W * .16, GY(), 8 * u, '#2B2D42');
    circ(W * .16, H * .28, W * .05, '#3D5A80', 0); circ(W * .16, H * .28, W * .035, '#FFFFFF', 0);
    X.text('BUS', W * .16, H * .28, { f: 'mono', w: 700, s: 20 * u, fill: '#3D5A80' });
    rr(W * .08, GY() - H * .07, W * .2, H * .015, 4 * u, '#7A5A3A', 0); rr(W * .1, GY() - H * .07, 6 * u, H * .07, 2 * u, '#7A5A3A', 0); rr(W * .24, GY() - H * .07, 6 * u, H * .07, 2 * u, '#7A5A3A', 0);
    sauropod(W * .38, GY(), H * .26, lt, {});
    const tk = KB(lt, t2, .6);
    if (tk > 0) { ctx.save(); ctx.translate(W * .52, H * .32); ctx.scale(tk, tk); ctx.translate(-W * .52, -H * .32); GAG.ticket(W * .52, H * .32, W * .16, lt, 'ADMIT ONE'); ctx.restore(); }
    const bx = W * .72, by = GY() - H * .1;
    X.lit(() => ctx.roundRect(bx - W * .2, by - H * .16, W * .4, H * .16, 14 * u), '#F2B33D', { box: [bx - W * .2, by - H * .16, W * .4, H * .16], db: 16, dy: 8 });
    rr(bx - W * .17, by - H * .13, W * .1, H * .08, 4 * u, '#BFE3F5', 0); rr(bx - W * .05, by - H * .13, W * .1, H * .08, 4 * u, '#BFE3F5', 0); rr(bx + W * .07, by - H * .13, W * .08, H * .08, 4 * u, '#BFE3F5', 0);
    circ(bx - W * .12, by + H * .005, W * .028, '#2B2D42', 0); circ(bx + W * .12, by + H * .005, W * .028, '#2B2D42', 0);
    IFM.CAST.draw('cap', bx + W * .11, by - H * .05, H * .09, lt, { keys: [[0, 'idle', 'deadpan']] });
    GAG.marks(bx + W * .11, by - H * .17, W * .03, lt, '…');
    X.finish(lt, { vig: .2 }); } }; };

  // ================================================================ x_dino_empty — the throne stays empty (S28)
  A.x_dino_empty = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U();
    X.backdrop('#E8A87A', '#F6D9A8', { pool: '#FFF1C8', py: .3 });
    F(() => { ctx.moveTo(-W * .05, GY() + H * .05); ctx.quadraticCurveTo(W * .5, GY() - H * .22, W * 1.05, GY() + H * .05); ctx.lineTo(W * 1.05, H); ctx.lineTo(-W * .05, H); ctx.closePath(); }, '#7A9E6B', [0, GY() - H * .22, W, H * .3], { plane: 0 });
    const tx = W / 2, ty = GY() - H * .08;
    X.lit(() => { ctx.moveTo(tx - W * .14, ty); ctx.lineTo(tx - W * .14, ty - H * .24); ctx.lineTo(tx - W * .08, ty - H * .3); ctx.lineTo(tx + W * .08, ty - H * .3); ctx.lineTo(tx + W * .14, ty - H * .24); ctx.lineTo(tx + W * .14, ty); ctx.closePath(); }, '#5A3A28', { box: [tx - W * .14, ty - H * .3, W * .28, H * .3], db: 18, dy: 8 });
    rr(tx - W * .1, ty - H * .06, W * .2, H * .05, 4 * u, '#D9A441', 0);
    circ(tx, ty - H * .26, W * .02, '#D9A441', 0);
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .12; polyF([[tx - W * .06, 0], [tx + W * .06, 0], [tx + W * .22, ty], [tx - W * .22, ty]], '#FFE9C0', { plane: 0 }); ctx.restore();
    shrew(W * .3, GY() + H * .06, H * .08, lt, {});
    shrew(W * .68, GY() + H * .06, H * .08, lt + 2, { flip: true });
    head(o, lt, false); X.finish(lt, { vig: .25 }); } });

  // ================================================================ x_dino_egg — the answer: one egg, unhatched, NO ROCK, NO US (S31)
  A.x_dino_egg = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U(); IFM.exBg(o, lt); IFM.exTitle(o, lt);
    const cx = W / 2, cy = H * .47, s = 1 + .03 * Math.sin(lt * 3);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * .3); g.addColorStop(0, 'rgba(255,230,160,.35)'); g.addColorStop(1, 'rgba(255,230,160,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy);
    X.contact(cx, cy + H * .24, W * .2, .3);
    X.lit(() => ctx.ellipse(cx, cy, W * .15, H * .21, 0, 0, TAU), '#F6E8C8', { box: [cx - W * .15, cy - H * .21, W * .3, H * .42], db: 22, dy: 10 });
    ell(cx - W * .05, cy - H * .1, W * .04, H * .06, '#FFFDF4', 0, -.3);
    ctx.restore();
    X.finish(lt, { vig: .4 }); } });

  // ================================================================ x_dino_room — the great door opens, mammals walk in and grow (S29)
  A.x_dino_room = (o, c, dur) => { const t1 = T0(c, 0, .3); return { sfx: [], draw: lt => { const u = U(); IFM.exBg(o, lt);
    const open = ease(clamp((lt - t1) / 3)), gap = open * W * .34;
    ctx.save(); ctx.globalCompositeOperation = 'screen';
    const g = ctx.createLinearGradient(W / 2 - gap / 2, 0, W / 2 + gap / 2, 0); g.addColorStop(0, 'rgba(255,240,200,0)'); g.addColorStop(.5, 'rgba(255,240,200,.85)'); g.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = g; ctx.fillRect(W / 2 - gap / 2 - W * .1, H * .1, gap + W * .2, H * .56); ctx.restore();
    X.rays(W / 2, H * .4, W * .6, lt, .14, '#FFE9C0', 7);
    X.lit(() => ctx.rect(W / 2 - gap / 2 - W * .2, H * .1, W * .2, H * .56), '#3A2A1A', { box: [W / 2 - gap / 2 - W * .2, H * .1, W * .2, H * .56], db: 16 });
    X.lit(() => ctx.rect(W / 2 + gap / 2, H * .1, W * .2, H * .56), '#3A2A1A', { box: [W / 2 + gap / 2, H * .1, W * .2, H * .56], db: 16 });
    for (let i = 0; i < 3; i++) { const q = clamp((lt - t1 - .8 - i * .7) / 3); if (q <= 0) continue; const sx = W * (.5 + (i - 1) * .16 * q), sy = GY() + H * .02 * q, ss = H * (.06 + .06 * q);
      ctx.save(); ctx.globalAlpha = q; shrew(sx, sy, ss, lt + i, {}); ctx.restore(); }
    IFM.exTitle(o, lt); X.finish(lt, { vig: .4 }); } }; };
})();
