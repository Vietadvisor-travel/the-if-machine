/* "Nếu tiền biến mất" — style test v2 (owner, 5 Nov 2026): scenes made for THIS topic, built from recognisable illustrations
   (IFM.emoji) on the episode's own visual world (theme: banknote). Not reused elsewhere unless the topic really needs it.
   x_mv_note   an engraved banknote (no real currency design) that turns to dust on caption k (o.k, default 1)
   x_mv_shelf  a supermarket aisle in perspective; the price tags drop off one by one (o.k = caption when they start)
   x_mv_camp   a WWII prison camp at dusk: barracks, fence, a crate where a jar of jam and cigarettes change hands
   remake 5 Nov: x_mv_window (shop window, price tags) · x_mv_ration (ration book) · x_mv_khipu (knotted cords) · x_mv_board (camp price board) · x_mv_digits (bank balance) */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT || !IFM.emoji) return; const A = IFM.ACT, T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d, ease = t => E.inOut(clamp(t)), K = (lt, a, d = .6) => ease((lt - a) / d);
  const cache = {}, cached = (key, fn) => { const k = key + W + 'x' + H; if (!cache[k]) { const cv = mkCanvas(W, H); withCtx(cv.getContext('2d'), fn); cache[k] = cv; } return cache[k]; };
  const GREEN = '#2F5B43', GOLD = '#B8923C', PAPER = '#E7EBD6';

  // ---------------------------------------------------------------- the banknote (generic: no real currency, no portrait)
  function note(g, w, h) { g.fillStyle = PAPER; g.beginPath(); g.roundRect(0, 0, w, h, h * .04); g.fill();
    g.save(); g.beginPath(); g.roundRect(0, 0, w, h, h * .04); g.clip(); g.lineWidth = Math.max(1, w / 700); g.strokeStyle = GREEN;
    for (const [cx, cy, R] of [[w * .5, h * .5, h * .46], [w * .14, h * .5, h * .3], [w * .86, h * .5, h * .3]]) for (let k = 0; k < 22; k++) { g.globalAlpha = .16; g.beginPath(); for (let a = 0; a <= TAU + .01; a += .03) { const r = R * (.5 + k * .022) * (1 + .12 * Math.sin(8 * a + k * .4)); a ? g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : g.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } g.stroke(); }
    g.globalAlpha = .1; for (let y = 0; y < h; y += h / 70) { g.beginPath(); for (let x = 0; x <= w; x += w / 50) g.lineTo(x, y + Math.sin(x / w * 14 + y * .07) * h * .01); g.stroke(); } g.restore();
    g.strokeStyle = GOLD; g.globalAlpha = .9; g.lineWidth = w / 140; g.strokeRect(w * .03, h * .05, w * .94, h * .9); g.lineWidth = w / 400; g.strokeRect(w * .05, h * .09, w * .9, h * .82); g.globalAlpha = 1;
    g.fillStyle = GREEN; g.font = `900 ${h * .26}px "Be Vietnam Pro", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('100', w * .14, h * .5); g.fillText('100', w * .86, h * .5);
    g.font = `800 ${h * .07}px "Be Vietnam Pro", sans-serif`; g.fillText('ONE HUNDRED', w * .5, h * .83); g.fillText('A 0000100 Z', w * .5, h * .17);
    g.fillStyle = '#F4F1DE'; g.beginPath(); g.ellipse(w * .5, h * .5, h * .28, h * .28, 0, 0, TAU); g.fill(); g.strokeStyle = GREEN; g.lineWidth = w / 300; g.stroke(); }
  A.x_mv_note = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), dur * .5); return { sfx: [], draw: lt => { const u = U(), nw = W * .74, nh = nw * .46, cx = W / 2, cy = H * .44;
    IFM.exBg(o, lt); IFM.exTitle(o, lt);   // the episode's own visual world (theme) and the kit's title
    const tilt = Math.sin(lt * .4) * .05, sc = 1 + .04 * ease(lt / dur), N = 18, M = 9, src = cached('mvnote', () => note(ctx, nw, nh)), cw = nw / N, ch = nh / M, r = rng(3);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-.06 + tilt * .3); ctx.scale(sc, sc * (1 - Math.abs(tilt) * .4));
    ctx.save(); ctx.globalAlpha = .25; ell(0, nh * .62, nw * .5, nh * .08, '#000', 0); ctx.restore();
    for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) { const d = r(), t0 = tk + (i / N) * 1.8 + d * .6, q = clamp((lt - t0) / 2.2); if (q >= 1) continue;
      const x = -nw / 2 + i * cw, y = -nh / 2 + j * ch, dx = q * q * (80 + d * 260) * u, dy = -q * q * (220 + d * 420) * u, rot = q * (d - .5) * 3, s2 = 1 - q * .7;
      ctx.save(); ctx.globalAlpha *= 1 - q; ctx.translate(x + cw / 2 + dx, y + ch / 2 + dy); ctx.rotate(rot); ctx.scale(s2, s2); ctx.drawImage(src, i * cw, j * ch, cw + 1, ch + 1, -cw / 2, -ch / 2, cw + 1, ch + 1); ctx.restore(); }
    if (lt < tk + 3.5) IFM.emoji('classical building', 0, 0, nh * .42, { alpha: clamp(1 - (lt - tk) / 1.2) });
    if (lt > tk + 2.2) { const k = K(lt, tk + 2.2, 1); ctx.save(); ctx.globalAlpha = .9 * k; ctx.setLineDash([16 * u, 12 * u]); ctx.strokeStyle = GOLD; ctx.lineWidth = 6 * u; ctx.strokeRect(-nw / 2, -nh / 2, nw, nh); ctx.setLineDash([]); T('0', 0, 0, { size: nh * .5, font: 'display', weight: 900, fill: GOLD, lw: 0 }); ctx.restore(); }
    { const r2 = rng(9); for (let i = 0; i < 70; i++) { const d = r2(), q = ((lt * (.03 + d * .04) + d) % 1); if (lt < tk + .5) break; ctx.save(); ctx.globalAlpha = .35 * (1 - q); circ((r2() - .5) * nw * 1.2 + Math.sin(lt + i) * 20 * u, nh * .3 - q * H * .35, (2 + d * 4) * u, GREEN, 0); ctx.restore(); } }
    ctx.restore(); } }; };

  // ---------------------------------------------------------------- the aisle: shelves in perspective, products, price tags falling
  const GOODS = [['bread', 'baguette bread', 'croissant'], ['glass of milk', 'cheese wedge', 'egg'], ['red apple', 'banana', 'carrot']];
  A.x_mv_shelf = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), 1.5); return { sfx: [], draw: lt => { const u = U(), vx = W * .5, vy = H * .36;
    ctx.drawImage(cached('mvaisle', () => { const g = ctx; const gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#D9DECF'); gr.addColorStop(.6, '#C9CFBC'); gr.addColorStop(1, '#AEB59F'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.fillStyle = '#B9BFAA'; g.beginPath(); g.moveTo(0, H); g.lineTo(vx - W * .08, vy + H * .06); g.lineTo(vx + W * .08, vy + H * .06); g.lineTo(W, H); g.fill();
      g.strokeStyle = 'rgba(0,0,0,.08)'; g.lineWidth = 2; for (let i = -6; i <= 6; i++) { g.beginPath(); g.moveTo(vx + i * W * .012, vy + H * .06); g.lineTo(vx + i * W * .2, H); g.stroke(); }
      for (let k = 0; k < 8; k++) { const t = k / 8, y = lerp(vy + H * .06, H, t * t); g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
      for (let i = 0; i < 5; i++) { const t = i / 5, w2 = lerp(W * .5, W * .05, t), y = lerp(H * .02, vy - H * .04, t); g.fillStyle = `rgba(255,255,240,${.5 - t * .35})`; g.fillRect(vx - w2 / 2, y, w2, H * .006 * (1 - t) + 2); } }), 0, 0);
    // two shelving units in perspective (left/right), 4 levels, products drawn front to back
    for (const side of [-1, 1]) for (let lev = 0; lev < 3; lev++) { const yF = H * (.3 + lev * .15), yB = vy + (yF - vy) * .25, xF = side < 0 ? 0 : W, xB = vx + side * W * .09;
      poly([[xF, yF], [xB, yB], [xB, yB + H * .012], [xF, yF + H * .03]], '#7D8A6E', 0); poly([[xF, yF - H * .12], [xB, yB - H * .03], [xB, yB], [xF, yF]], 'rgba(60,70,50,.10)', 0);
      for (let k = 3; k >= 0; k--) { const t = k / 4.2, x = lerp(xF + side * -W * .1, xB, t), y = lerp(yF, yB, t), s = lerp(H * .09, H * .03, t), nm = GOODS[lev][k % 3]; ctx.save(); ctx.globalAlpha = 1 - t * .35; IFM.emoji(nm, x, y - s * .45, s, {}); ctx.restore();
        const id = side * 100 + lev * 10 + k, d = rng(id + 50)(), t0 = tk + d * Math.max(2, dur - tk - 2), q = clamp((lt - t0) / 1.2), tw = s * .62, th = s * .3, ty = y + H * .012 + q * q * H * .35, tr = q * (d - .5) * 2.5;
        if (q < 1) { ctx.save(); ctx.globalAlpha *= (1 - t * .3) * (1 - q * q); ctx.translate(x, ty); ctx.rotate(tr); rr(-tw / 2, 0, tw, th, 3 * u, '#FFD84D', 0); T(['1.99', '2.49', '0.89', '3.20', '1.20', '4.50'][k], 0, th * .52, { size: th * .62, font: 'display', weight: 900, fill: '#1B1F3A', lw: 0 }); ctx.restore(); } } }
    for (let i = 1; i < 2; i++) { const q = ((lt * .05 + .35) % 1), x = vx, y = lerp(vy + H * .07, H * .95, q * q), s = lerp(H * .04, H * .34, q * q); ctx.save(); ctx.globalAlpha = Math.min(1, q * 4) * (q < .85 ? 1 : (1 - q) / .15); IFM.emoji('shopping trolley', x + (i - 1) * s * .6, y - s * .4, s, { flip: i === 2 }); ctx.restore(); } } }; };

  // ---------------------------------------------------------------- the camp at dusk: barracks, fence, the trade on a crate
  A.x_mv_camp = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), 2); return { sfx: [], draw: lt => { const u = U(), gy = H * .5;
    ctx.drawImage(cached('mvcamp', () => { const g = ctx, gr = g.createLinearGradient(0, 0, 0, gy); gr.addColorStop(0, '#2B2846'); gr.addColorStop(.6, '#6D5A7E'); gr.addColorStop(1, '#D9967A'); g.fillStyle = gr; g.fillRect(0, 0, W, gy);
      g.fillStyle = '#3B3446'; for (let i = 0; i < 22; i++) { const x = i * W / 20, h = H * (.06 + (i * 7 % 5) / 90); g.beginPath(); g.moveTo(x - 30, gy); g.lineTo(x, gy - h); g.lineTo(x + 30, gy); g.fill(); }
      g.fillStyle = '#4A4038'; g.fillRect(0, gy, W, H); for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++) { const s = .6 + r * .25, y = gy + H * (.02 + r * .05), x = W * (.08 + k * .33) + (r % 2) * W * .12, bw = W * .26 * s, bh = H * .045 * s;
        g.fillStyle = '#5E4E40'; g.fillRect(x, y - bh, bw, bh); g.fillStyle = '#3A3029'; g.beginPath(); g.moveTo(x - 6, y - bh); g.lineTo(x + bw / 2, y - bh * 1.7); g.lineTo(x + bw + 6, y - bh); g.fill(); g.fillStyle = 'rgba(255,200,120,.5)'; g.fillRect(x + bw * .2, y - bh * .7, bw * .1, bh * .35); g.fillRect(x + bw * .65, y - bh * .7, bw * .1, bh * .35); }
      g.fillStyle = '#2E2620'; for (let i = 0; i < 10; i++) g.fillRect(i * W / 9 - 6, H * .5, 12, H * .14); g.strokeStyle = '#2E2620'; g.lineWidth = 3; for (let k = 0; k < 5; k++) { g.beginPath(); for (let x = 0; x <= W; x += 20) g.lineTo(x, H * (.52 + k * .025) + Math.sin(x * .3) * 3); g.stroke(); } }), 0, 0);
    for (let i = 0; i < 3; i++) { const r = rng(i + 3), x = W * (.2 + i * .3), y = gy - H * .02; ctx.save(); ctx.globalAlpha = .18; for (let k = 0; k < 4; k++) { const q = ((lt * .2 + k * .25 + r()) % 1); circ(x + Math.sin(lt + k) * 10 * u, y - q * H * .1, (8 + q * 26) * u, '#E8E0D8', 0); } ctx.restore(); }
    // the crate and the trade
    const cy = H * .66; rr(W * .2, cy, W * .6, H * .08, 6 * u, '#8A6A44', 0); for (let k = 0; k < 3; k++) rr(W * .2, cy + k * H * .027, W * .6, 4 * u, 0, '#6B4F30', 0);
    const a = K(lt, tk, 1.4), b = K(lt, tk + 1.6, 1.4); IFM.emoji('honey pot', lerp(W * .3, W * .68, a), cy - H * .06, H * .13, {}); IFM.emoji('smoking symbol', lerp(W * .7, W * .32, b), cy - H * .045, H * .14, { rot: -.1 });
    if (lt > tk + 1.2) { const k = K(lt, tk + 1.2, .6); ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = '#F2D16B'; ctx.lineWidth = 6 * u; ctx.setLineDash([4 * u, 14 * u]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(W / 2, cy - H * .08, W * .2, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.beginPath(); ctx.arc(W / 2, cy - H * .02, W * .2, Math.PI * .1, Math.PI * .9); ctx.stroke(); ctx.restore(); } } }; };
  // ---------------------------------------------------------------- the Andes as a paper-cut diorama: layered ridges, terraces, llamas on the road, storehouses
  A.x_mv_andes = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), 2); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(cached('mvandes', () => { const g = ctx, gr = g.createLinearGradient(0, 0, 0, H * .6); gr.addColorStop(0, '#9CC3E0'); gr.addColorStop(1, '#E8D9B5'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      const ridge = (y0, amp, seed, col, snow) => { const r = rng(seed); const pts = []; for (let x = -20; x <= W + 20; x += W / 14) pts.push([x, y0 - amp * (.4 + r() * .6)]); g.fillStyle = col; g.beginPath(); g.moveTo(-20, H); pts.forEach(p => g.lineTo(p[0], p[1])); g.lineTo(W + 20, H); g.fill();
        if (snow) { g.fillStyle = '#F4F7FF'; pts.forEach((p, i) => { if (i % 2 || p[1] > y0 - amp * .7) return; g.beginPath(); g.moveTo(p[0] - W * .035, p[1] + amp * .12); g.lineTo(p[0], p[1]); g.lineTo(p[0] + W * .035, p[1] + amp * .12); g.fill(); }); } return pts; };
      ridge(H * .3, H * .14, 3, '#8A98B8', 1); ridge(H * .4, H * .1, 5, '#7C8E6A', 0); ridge(H * .5, H * .08, 7, '#6E8A55', 0);
      for (let k = 0; k < 12; k++) { const y = H * (.45 + k * .022); g.strokeStyle = 'rgba(60,80,40,.35)'; g.lineWidth = 3; g.beginPath(); g.moveTo(W * .05, y); g.quadraticCurveTo(W * .3, y - H * .015, W * .55, y + H * .004); g.stroke(); }
      g.fillStyle = '#5E7A47'; g.fillRect(0, H * .62, W, H); g.strokeStyle = '#C9B48E'; g.lineWidth = W * .05; g.lineCap = 'round'; g.beginPath(); g.moveTo(W * 1.1, H * .52); g.quadraticCurveTo(W * .5, H * .58, W * .62, H * .66); g.quadraticCurveTo(W * .75, H * .74, -W * .1, H * .78); g.stroke(); }), 0, 0);
    IFM.exTitle({ ...o, theme: 'paper' }, lt);
    for (let i = 0; i < 4; i++) IFM.emoji('hut', W * (.62 + i * .09), H * (.5 + (i % 2) * .012), H * .05, {});
    for (let i = 0; i < 4; i++) { const q = ((lt * .035 + i * .2) % 1), x = lerp(W * 1.05, -W * .05, q), y = q < .5 ? lerp(H * .53, H * .64, q * 2) : lerp(H * .64, H * .77, (q - .5) * 2), s = H * (.04 + q * .05); IFM.emoji('llama', x, y - s * .45, s, {}); }
    const k = K(lt, tk, .8); if (k > 0) { ctx.save(); ctx.globalAlpha *= k; IFM.tag('NO COINS · NO MARKETS', W / 2, H * .3, 30 * u, { bg: '#F4EEDC', t: 1 }); ctx.restore(); } } }; };

  // ================================================================ remake (5 Nov 2026): five more scenes made for the film, each in a real place
  const PB = (o, name, lt) => { const q = { ...o, place: o.place || name }; IFM.exBg(q, lt); return q; }, PF = (q, lt) => IFM.placeFore(q.place, lt, q);
  // x_mv_window  a shop window on the street: a loaf and a pair of shoes, swinging price tags, a ruler slides under them on caption k
  A.x_mv_window = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), 2.5); return { sfx: [], draw: lt => { const u = U(), q = PB(o, 'street', lt), cx = W / 2, cy = H * .47, ww = W * .86, wh = H * .3;
    rr(cx - ww / 2 - 14 * u, cy - wh / 2 - 14 * u, ww + 28 * u, wh + 28 * u, 10 * u, '#3E4A3A', 0); rr(cx - ww / 2, cy - wh / 2, ww, wh, 6 * u, 'rgba(232,240,228,.88)', 0);
    ctx.save(); ctx.globalAlpha = .18; poly([[cx - ww * .3, cy - wh / 2], [cx - ww * .12, cy - wh / 2], [cx - ww * .38, cy + wh / 2], [cx - ww * .5, cy + wh / 2]], '#FFFFFF', 0); ctx.restore();
    rr(cx - ww / 2, cy + wh * .3, ww, wh * .06, 2 * u, '#B8923C', 0);
    const it = [['bread', -.24, '2', 0], ['running shoe', .24, '60', .9]];
    it.forEach(([nm, dx, pr, d], i) => { const a = K(lt, d * .6, .7), x = cx + dx * ww, y = cy + wh * .12, s = wh * .5 * (.85 + .15 * a); ctx.save(); ctx.globalAlpha *= a; IFM.emoji(nm, x, y - s * .2, s, {});
      const sw = Math.sin(lt * 1.6 + i) * .12 * (1 - K(lt, 4, 3) * .6), tx = x + s * .32, ty = cy - wh * .38; line(tx, cy - wh / 2, tx, ty, 2 * u, '#3E4A3A');
      ctx.translate(tx, ty); ctx.rotate(sw); rr(-34 * u, 0, 68 * u, 46 * u, 6 * u, '#FFD84D', 0); T(pr, 0, 24 * u, { size: 30 * u, font: 'display', weight: 900, fill: '#1B1F3A', lw: 0 }); ctx.restore(); });
    const r = K(lt, tk, 1.2); if (r > 0) { const rw = ww * .7, rx = lerp(-rw, cx - rw / 2, r), ry = cy + wh / 2 + 40 * u; rr(rx, ry, rw, 34 * u, 4 * u, '#E9C46A', 0);
      for (let k = 0; k <= 20; k++) line(rx + k * rw / 20, ry, rx + k * rw / 20, ry + (k % 5 ? 10 : 18) * u, 2 * u, '#5B4A2A'); }
    PF(q, lt); IFM.exTitle(o, lt); } }; };

  // x_mv_ration  a wartime ration book on a kitchen table: coupons cut out one by one (scissors), a date stamp lands on caption s
  A.x_mv_ration = (o, c, dur) => { const tk = T0(c, +(o.k ?? 0), .8), ts = T0(c, +(o.s ?? 1), dur * .55); return { sfx: [], draw: lt => { const u = U(), q = PB(o, 'kitchen', lt), bw = W * .74, bh = H * .4, bx = W / 2 - bw / 2, by = H * .26;
    ctx.save(); ctx.globalAlpha = .25; rr(bx + 14 * u, by + 18 * u, bw, bh, 10 * u, '#000', 0); ctx.restore();
    rr(bx, by, bw, bh, 10 * u, '#EFE6CF', 0); rr(bx, by, bw, bh * .17, 10 * u, '#8A6A44', 0);
    T('RATION BOOK', W / 2, by + bh * .09, { size: 40 * u, font: 'display', weight: 900, fill: '#F4EEDC', lw: 0 });
    const C = 5, R = 4, gx = bx + bw * .06, gy = by + bh * .23, cw = bw * .88 / C, chh = bh * .72 / R, N = C * R, per = Math.max(.5, (dur - tk - 1) / N); let cut = -1;
    for (let j = 0; j < R; j++) for (let i = 0; i < C; i++) { const n = j * C + i, t0 = tk + n * per, qq = clamp((lt - t0) / 1.4), x = gx + i * cw, y = gy + j * chh;
      ctx.save(); ctx.setLineDash([6 * u, 6 * u]); ctx.strokeStyle = 'rgba(90,70,40,.45)'; ctx.lineWidth = 2 * u; ctx.strokeRect(x + 4 * u, y + 4 * u, cw - 8 * u, chh - 8 * u); ctx.restore();
      if (qq >= 1) continue; if (qq > 0) cut = n;
      ctx.save(); ctx.globalAlpha *= 1 - qq * qq; ctx.translate(x + cw / 2 + qq * qq * W * .25, y + chh / 2 - qq * H * .12); ctx.rotate(qq * .8);
      rr(-cw / 2 + 6 * u, -chh / 2 + 6 * u, cw - 12 * u, chh - 12 * u, 4 * u, ['#F7F0DC', '#EADFC2'][n % 2], 0);
      T(['MEAT', 'SUGAR', 'BUTTER', 'TEA', 'BACON'][i], 0, -chh * .12, { size: 18 * u, font: 'display', weight: 800, fill: '#5B4A2A', lw: 0 }); T(String(j + 1), 0, chh * .2, { size: 24 * u, font: 'display', weight: 900, fill: '#8A6A44', lw: 0 }); ctx.restore(); }
    if (cut >= 0 && lt < tk + N * per) { const i = cut % C, j = (cut / C) | 0; IFM.emoji('scissors', gx + (i + .9) * cw, gy + (j + .5) * chh, H * .07, { rot: Math.sin(lt * 9) * .15 }); }
    const st = K(lt, ts, .5); if (st > 0) { ctx.save(); ctx.translate(W * .64, by + bh * .62); ctx.rotate(-.18); ctx.scale(1.6 - .6 * st, 1.6 - .6 * st); ctx.globalAlpha *= st * .85; ctx.strokeStyle = '#A23B2E'; ctx.lineWidth = 6 * u; ctx.strokeRect(-150 * u, -42 * u, 300 * u, 84 * u);
      T('1940–1954', 0, 0, { size: 52 * u, font: 'display', weight: 900, fill: '#A23B2E', lw: 0 }); ctx.restore(); }
    PF(q, lt); IFM.exTitle(o, lt); } }; };

  // x_mv_khipu  an Inca khipu in a library: a main cord, pendant cords drop in, knots tie one by one, it sways
  A.x_mv_khipu = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), dur * .5); return { sfx: [], draw: lt => { const u = U(), q = PB(o, 'library', lt), x0 = W * .1, x1 = W * .9, y0 = o.title ? H * .31 : H * .24, WOOL = ['#C8553D', '#E9C46A', '#2A9D8F', '#F4EEDC', '#8A6A44', '#264653', '#D4A373', '#9C6644', '#B5838D'];
    ctx.save(); ctx.globalAlpha = .22; ell(W / 2, H * .7, W * .38, H * .02, '#000', 0); ctx.restore();
    ctx.lineCap = 'round'; ctx.strokeStyle = '#6B4F30'; ctx.lineWidth = 14 * u; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(W / 2, y0 + H * .03, x1, y0); ctx.stroke();
    const N = 9; for (let i = 0; i < N; i++) { const t = (i + .5) / N, x = lerp(x0, x1, t), y = y0 + H * .03 * 4 * t * (1 - t) * .5, d = K(lt, .2 + i * .25, 1.2), len = H * (.3 + ((i * 37) % 9) / 60) * d, sw = Math.sin(lt * .9 + i * .7) * 10 * u * d, col = WOOL[i % WOOL.length];
      if (d <= 0) continue; ctx.strokeStyle = col; ctx.lineWidth = 9 * u; ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + sw * .3, y + len * .5, x + sw, y + len); ctx.stroke();
      const nk = 2 + (i * 5) % 4; for (let k = 0; k < nk; k++) { const kt = .25 + k * .17, a = K(lt, 1.5 + i * .3 + k * .45, .4); if (a <= 0 || kt * H * .3 > len) continue; const kx = x + sw * kt * kt, ky = y + len * kt;
        ctx.save(); ctx.translate(kx, ky); ctx.scale(a, a); ell(0, 0, 13 * u, 10 * u, shade(col, -.25), 0); ell(-3 * u, -3 * u, 5 * u, 4 * u, shade(col, .2), 0); ctx.restore(); } }
    const a = K(lt, tk, .6); if (a > 0 && !o.title) { ctx.save(); ctx.globalAlpha *= a; IFM.tag('KHIPU', W / 2, H * .17, 34 * u, { bg: '#F4EEDC', t: 1 }); ctx.restore(); }
    PF(q, lt); } }; };

  // x_mv_board  a prison-camp notice board inside a barrack: notes with prices in cigarettes; the prices tick up on caption k
  A.x_mv_board = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), dur * .55); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(cached('mvbarrack', () => { const g = ctx; g.fillStyle = '#3A2E25'; g.fillRect(0, 0, W, H); for (let i = 0; i < 14; i++) { g.fillStyle = i % 2 ? '#4A3B2F' : '#43362B'; g.fillRect(i * W / 13, 0, W / 13 - 3, H); }
      g.fillStyle = '#2B221C'; g.fillRect(0, H * .8, W, H * .2); for (let k = 0; k < 3; k++) { g.fillStyle = '#5A4636'; g.fillRect(W * (.05 + k * .33), H * .74, W * .26, H * .025); }
      const gl = g.createRadialGradient(W * .5, H * .1, 10, W * .5, H * .1, W * .7); gl.addColorStop(0, 'rgba(255,214,150,.45)'); gl.addColorStop(1, 'rgba(255,214,150,0)'); g.fillStyle = gl; g.fillRect(0, 0, W, H); }), 0, 0);
    ctx.save(); ctx.globalAlpha = .5 + .05 * Math.sin(lt * 2); glow(W * .5, H * .1, W * .2, '#FFD9A0', .3); ctx.restore(); IFM.emoji('light bulb', W * .5, H * .07, H * .06, {});
    const bx = W * .1, by = o.title ? H * .29 : H * .17, bw = W * .8, bh = o.title ? H * .38 : H * .5; rr(bx - 10 * u, by - 10 * u, bw + 20 * u, bh + 20 * u, 8 * u, '#6B4F30', 0); rr(bx, by, bw, bh, 4 * u, '#C9A27A', 0);
    { const r = rng(4); ctx.save(); ctx.globalAlpha = .18; for (let i = 0; i < 260; i++) circ(bx + r() * bw, by + r() * bh, (1 + r() * 2) * u, '#7A5A3A', 0); ctx.restore(); }
    T('EXCHANGE & MART', W / 2, by + bh * .08, { size: 40 * u, font: 'display', weight: 900, fill: '#3A2E25', lw: 0 });
    const rows = [['honey pot', 'JAM', 6, 8], ['bread', 'BREAD', 4, 5], ['soap', 'SOAP', 2, 3]], up = K(lt, tk, .8);
    rows.forEach(([e, l, v0, v1], i) => { const a = K(lt, .3 + i * 1.6, .7), y = by + bh * (.25 + i * .25); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(W / 2, y); ctx.rotate((i - 1) * .025);
      rr(-bw * .42, -bh * .1, bw * .84, bh * .2, 4 * u, '#F7F3E8', 0); IFM.emoji('round pushpin', -bw * .4, -bh * .09, 34 * u, {});
      IFM.emoji(e, -bw * .3, 0, bh * .13, {}); T(l, -bw * .1, 0, { size: 38 * u, font: 'display', weight: 900, fill: '#1B1F3A', lw: 0, align: 'left' });
      T('= ' + (up > .5 ? v1 : v0), bw * .16, 0, { size: 46 * u, font: 'display', weight: 900, fill: up > .5 ? '#A23B2E' : '#1B1F3A', lw: 0 }); IFM.emoji('smoking symbol', bw * .32, 0, bh * .1, {}); ctx.restore(); });
    const tg = o.title ? 0 : K(lt, Math.max(tk - 1.5, 2), .6); if (tg > 0) { ctx.save(); ctx.globalAlpha *= tg; IFM.tag('PRICES IN CIGARETTES', W / 2, H * .135, 32 * u, { bg: '#F4EEDC', t: 1 }); ctx.restore(); } } }; };

  // x_mv_digits  a phone on an office desk: the bank balance, digits roll as a payment goes out, a tick: ACCEPTED on caption k
  A.x_mv_digits = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), dur * .6); return { sfx: [], draw: lt => { const u = U(), q = PB(o, 'office', lt), pw = W * .5, ph = pw * 1.9, px = W / 2 - pw / 2, py = H * .16; if (o.title) { ctx.save(); ctx.translate(W / 2, H * .27); ctx.scale(.76, .76); ctx.translate(-W / 2, -H * .16); }
    ctx.save(); ctx.globalAlpha = .3; rr(px + 16 * u, py + 20 * u, pw, ph, 40 * u, '#000', 0); ctx.restore(); rr(px, py, pw, ph, 40 * u, '#1E2433', 0); rr(px + 14 * u, py + 14 * u, pw - 28 * u, ph - 28 * u, 30 * u, '#F4F6F1', 0);
    rr(px + 14 * u, py + 14 * u, pw - 28 * u, ph * .2, 30 * u, '#2F5B43', 0); T('BALANCE', W / 2, py + ph * .08, { size: 24 * u, font: 'display', weight: 800, fill: '#E7EBD6', lw: 0 });
    const pay = K(lt, 1.6, 1.8), bal = 1250 - 12.4 * pay, s = bal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); T(s, W / 2, py + ph * .155, { size: 50 * u, font: 'display', weight: 900, fill: '#FFFFFF', lw: 0 });
    const rows = [['bread', 'BAKERY', '-12.40', 1.4], ['house', 'RENT', '-640.00', -9], ['briefcase', 'SALARY', '+1,900.00', -9]];
    rows.forEach(([e, l, v, t0], i) => { const a = t0 < 0 ? 1 : K(lt, t0, .6), y = py + ph * (.32 + i * .12) + (t0 < 0 ? ph * .12 * K(lt, 1.4, .6) : 0) - (t0 < 0 ? 0 : ph * .03 * (1 - a)); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
      rr(px + 30 * u, y - ph * .045, pw - 60 * u, ph * .09, 14 * u, '#FFFFFF', 0); IFM.emoji(e, px + 70 * u, y, ph * .06, {}); T(l, px + 110 * u, y, { size: 22 * u, font: 'display', weight: 800, fill: '#1B1F3A', lw: 0, align: 'left' });
      T(v, px + pw - 50 * u, y, { size: 22 * u, font: 'display', weight: 900, fill: v[0] === '+' ? '#2A9D8F' : '#1B1F3A', lw: 0, align: 'right' }); ctx.restore(); });
    const a = K(lt, tk, .6); if (a > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(W / 2, py + ph * .8); ctx.scale(.7 + .3 * E.back(clamp((lt - tk) / .6)), .7 + .3 * E.back(clamp((lt - tk) / .6))); IFM.emoji('check mark button', 0, 0, ph * .12, {}); ctx.restore();
      if (!o.title) { ctx.save(); ctx.globalAlpha *= a; IFM.tag('ACCEPTED', W / 2, py - 40 * u, 34 * u, { bg: '#F4EEDC', t: 1 }); ctx.restore(); } }
    if (o.title) ctx.restore(); PF(q, lt); } }; };
})();
