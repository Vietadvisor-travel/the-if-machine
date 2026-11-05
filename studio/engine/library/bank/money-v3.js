/* "Nếu tiền biến mất" — remake v3 (owner, 5 Nov 2026 evening: 2D only, polished, clear, every picture shows the idea of its line,
   nothing overlapping, transitions and animation planned from the script). Scenes made for THIS topic on the banknote world.
   Layout rule for every act (9:16): title band 13–24 %, subject 28–68 %, captions 74.5–79 % (kept clear), bottom 20 % clear.
   x_mv_city     a city skyline in 2D layers (o.time night|dusk|dawn|day); o.money=1 banknotes rise from the windows and dissolve;
                 o.dark=k the windows go out in a wave on caption k; o.signals=1 price signals arc between the towers (o.cut=k they stop)
   x_mv_facts    two fact cards that build one after the other (o.a / o.b = "emoji|BIG TEXT|small text")
   x_mv_market   the double coincidence: two traders, each with a thought bubble that wants what the other does not have
   x_mv_signal   a price tag rises; its message travels to a baker (BAKE MORE) and to a shopper (BUY LESS)
   x_mv_queue    a free shop and a queue that keeps growing; a clock turns: you pay with time
   x_mv_planner  a planner's desk: a ration list written line by line; the stamp WHO DECIDES?
   x_mv_qullqa   Inca storehouses (qullqa) on a slope; a llama caravan brings the harvest in
   x_mv_parcel   a parcel opens; food, chocolate, soap and cigarettes rise out of it
   x_mv_reborn   things that became money (cattle, shells, cigarettes) orbit and fuse into a coin
   x_mv_belief   a popular belief on a speech bubble (o.v barter|work), labelled as a belief
   x_mv_promise  a ring of people around a banknote, a thread of light joins them: a shared promise */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT || !IFM.emoji) return; const A = IFM.ACT, T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d, ease = t => E.inOut(clamp(t)), K = (lt, a, d = .6) => ease((lt - a) / d), KB = (lt, a, d = .7) => E.back(clamp((lt - a) / d));
  const cache = {}, cached = (key, fn) => { const k = key + W + 'x' + H; if (!cache[k]) { const cv = mkCanvas(W, H); withCtx(cv.getContext('2d'), fn); cache[k] = cv; } return cache[k]; };
  const GREEN = '#2F5B43', GOLD = '#B8923C', CREAM = '#F4EEDC', INK = '#1E3A2C';
  const em = (n, x, y, s, o) => IFM.emoji(n, x, y, s, o || {});
  const fit = (t, size, maxW, font = 'display', w = 900) => Math.min(size, maxW / Math.max(.01, textW(t, 100, font, w) / 100));
  const card = (x, y, w, h, r, fill, a = 1) => { const u = U(); ctx.save(); ctx.globalAlpha *= a; ctx.shadowColor = 'rgba(20,30,20,.22)'; ctx.shadowBlur = 30 * u; ctx.shadowOffsetY = 10 * u; rr(x, y, w, h, r, fill, 0); ctx.restore(); };
  const tagAt = (t, x, y, lt, at, o2) => { const k = K(lt, at, .5); if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; IFM.tag(t, x, y + (1 - k) * 12 * U(), (o2 && o2.size || 32) * U(), { bg: (o2 && o2.bg) || CREAM, t: 1 }); ctx.restore(); };
  const place = (o, name, lt) => IFM.exBg({ ...o, place: name }, lt);
  const dash = (x1, y1, x2, y2, k, col, w) => { if (k <= 0) return; const u = U(); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w || 6 * u; ctx.lineCap = 'round'; ctx.setLineDash([2 * u, 14 * u]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, k), lerp(y1, y2, k)); ctx.stroke(); ctx.restore(); };

  // ================================================================ x_mv_city
  const SKY = { night: ['#0E1430', '#1F2A55', '#33406E'], dusk: ['#2B2A5A', '#7B5A8E', '#E8A07A'], dawn: ['#3A4C82', '#C98FA0', '#F5C99A'], day: ['#7FB2E0', '#B9D7EE', '#E6EEF2'] };
  function towers(seed, n, y, hmin, hmax) { const r = rng(seed), out = []; let x = -W * .05; while (x < W * 1.05) { const w = W * (.08 + r() * .1), h = H * (hmin + r() * (hmax - hmin)); out.push({ x, w, h, y, cols: Math.max(2, Math.floor(w / (W * .028))), seed: r() * 999, roof: r() }); x += w + W * (.004 + r() * .015); } return out; }
  A.x_mv_city = (o, c, dur) => { const time = SKY[o.time] ? o.time : 'night', S = SKY[time], tD = o.dark != null ? T0(c, +o.dark, 3) : 1e9, tC = o.cut != null ? T0(c, +o.cut, 3) : 1e9, L = [towers(3, 0, H * .58, .16, .3), towers(7, 0, H * .64, .14, .26), towers(11, 0, H * .7, .1, .2)];
    const lit = time === 'night' || time === 'dusk' || time === 'dawn';
    return { sfx: [], draw: lt => { const u = U();
      ctx.drawImage(cached('mvsky' + time, () => { const g = ctx.createLinearGradient(0, 0, 0, H * .75); g.addColorStop(0, S[0]); g.addColorStop(.6, S[1]); g.addColorStop(1, S[2]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        if (time === 'night') { const r = rng(5); for (let i = 0; i < 160; i++) { ctx.globalAlpha = .3 + r() * .6; ctx.fillStyle = '#FFF'; ctx.fillRect(r() * W, r() * H * .45, 2, 2); } ctx.globalAlpha = 1; } }), 0, 0);
      const sunY = time === 'dawn' ? H * (.5 - .06 * ease(lt / dur)) : time === 'dusk' ? H * (.46 + .05 * ease(lt / dur)) : H * .3; if (time !== 'day') { ctx.save(); ctx.globalAlpha = .9; glow(W * .76, sunY, W * .2, time === 'night' ? '#C9D6FF' : '#FFD9A0', .35); circ(W * .76, sunY, W * (time === 'night' ? .05 : .07), time === 'night' ? '#EEF1FF' : '#FFE2B0', 0); ctx.restore(); }
      L.forEach((layer, li) => { const depth = [.35, .6, 1][li], dx = Math.sin(lt * .08) * 14 * u * depth - lt * 3 * u * depth, base = shade({ day: '#8FA3BF', night: '#1C2445', dusk: '#3B2F57', dawn: '#4B4572' }[time], li * .07 - (time === 'day' ? .1 * (2 - li) : 0));
        layer.forEach((t, ti) => { const x = t.x + dx, top = t.y - t.h; rr(x, top, t.w, t.h + H, 2 * u, base, 0); if (t.roof > .7) rr(x + t.w * .42, top - H * .02, t.w * .16, H * .02, 0, base, 0);
          if (li === 0) return; const cw = t.w / t.cols, rows = Math.floor(t.h / (H * .022)), r = rng(t.seed | 0);
          for (let j = 0; j < rows; j++) for (let i = 0; i < t.cols; i++) { const on0 = r() < (lit ? .55 : .15), wave = (x + i * cw) / W, off = lt > tD + wave * 1.6 + r() * .4; if (!on0 || off) { if (time === 'day') rr(x + i * cw + cw * .22, top + H * .012 + j * H * .022, cw * .56, H * .011, 1, 'rgba(255,255,255,.25)', 0); continue; }
            rr(x + i * cw + cw * .22, top + H * .012 + j * H * .022, cw * .56, H * .011, 1, time === 'day' ? 'rgba(255,255,255,.4)' : (r() < .2 ? '#FFE9B8' : '#FFD27A'), 0); } }); });
      // signals: thin arcs of price messages between towers, they stop at caption cut
      if (o.signals) { const r = rng(21), n = 9; for (let i = 0; i < n; i++) { const x1 = W * (.08 + r() * .84), x2 = W * (.08 + r() * .84), y1 = H * (.44 + r() * .12), y2 = H * (.44 + r() * .12), ph = (lt * .45 + i / n) % 1, live = lt < tC + i * .15;
        if (!live) continue; const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - H * .08; ctx.save(); ctx.globalAlpha = .75; ctx.strokeStyle = '#FFE08A'; ctx.lineWidth = 4 * u; ctx.setLineDash([3 * u, 9 * u]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx, my, x2, y2); ctx.stroke(); ctx.setLineDash([]);
          const q = ph, bx = (1 - q) * (1 - q) * x1 + 2 * (1 - q) * q * mx + q * q * x2, by = (1 - q) * (1 - q) * y1 + 2 * (1 - q) * q * my + q * q * y2; ctx.globalAlpha = .95; circ(bx, by, 11 * u, '#FFE08A', 0); ctx.restore(); } }
      // money leaving: banknotes and coins rise from the windows and dissolve
      if (o.money) { const r = rng(9); for (let i = 0; i < 26; i++) { const d = r(), t0 = .3 + d * Math.max(2, dur - 2), q = clamp((lt - t0) / 3.2); if (q <= 0 || q >= 1) continue; const x = W * (.06 + r() * .88) + Math.sin(lt * 1.3 + i) * 18 * u, y = H * (.62 - r() * .12) - q * H * .32;
        ctx.save(); ctx.globalAlpha = Math.sin(q * Math.PI) * .95; em(i % 3 ? 'banknote' : 'coin', x, y, H * (.04 + d * .025), { rot: Math.sin(lt + i) * .4 }); ctx.restore(); } }
      ctx.save(); const fg = ctx.createLinearGradient(0, H * .66, 0, H); fg.addColorStop(0, 'rgba(10,14,30,0)'); fg.addColorStop(1, 'rgba(10,14,30,.75)'); ctx.fillStyle = fg; ctx.fillRect(0, H * .6, W, H * .4); ctx.restore();
      if (o.title) { const k = K(lt, .2, .8); ctx.save(); ctx.globalAlpha *= k; T(o.title, W / 2, H * .18 + (1 - k) * 14 * u, { size: fit(o.title, 72 * u, W * .84), font: 'display', weight: 900, fill: '#F6F1E7', lw: 0 }); ctx.restore(); } if (o.tag) { const m = String(o.tag).match(/^(.*?)(?:@(\d+))?$/); tagAt(m[1], W / 2, H * .3, lt, m[2] != null ? T0(c, +m[2], 1) : 1); } } }; };

  // ================================================================ x_mv_facts: two fact cards
  A.x_mv_facts = (o, c, dur) => { const F = [o.a, o.b].map(s => String(s || '').split('|')), at = [T0(c, +(o.ka ?? 1), .6), T0(c, +(o.kb ?? 2), 2.6)]; return { sfx: [], draw: lt => { const u = U(); IFM.exBg({ ...o, place: undefined }, lt); IFM.exTitle(o, lt);
    F.forEach(([e, big, small], i) => { const k = K(lt, at[i], .6), s = KB(lt, at[i], .8); if (k <= 0) return; const y = H * (.3 + i * .22), x = W * .07, w = W * .86, h = H * .18; ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 30 * u);
      card(x, y, w, h, 28 * u, '#FBF7EC'); rr(x, y, 12 * u, h, 6 * u, i ? GREEN : GOLD, 0); ctx.save(); ctx.translate(x + h * .55, y + h / 2); ctx.scale(s, s); em(e, 0, 0, h * .62, {}); ctx.restore();
      T(big || '', x + h * 1.08, y + h * .4, { size: fit(big || '', 54 * u, w - h * 1.25), font: 'display', weight: 900, fill: INK, lw: 0, align: 'left' }); T(small || '', x + h * 1.08, y + h * .7, { size: fit(small || '', 30 * u, w - h * 1.25, 'body', 700), font: 'body', weight: 700, fill: '#4E6B57', lw: 0, align: 'left' }); ctx.restore(); }); } }; };

  // ================================================================ x_mv_market: the double coincidence of wants
  const bubble = (x, y, w, h, tx, ty, a) => { const u = U(); ctx.save(); ctx.globalAlpha *= a; ctx.shadowColor = 'rgba(0,0,0,.15)'; ctx.shadowBlur = 18 * u; rr(x, y, w, h, h * .4, '#FFFFFF', 0); ctx.restore(); ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 2; i++) circ(lerp(x + w / 2, tx, .45 + i * .3), lerp(y + h, ty, .45 + i * .3), (10 - i * 4) * u, '#FFFFFF', 0); ctx.restore(); };
  A.x_mv_market = (o, c, dur) => { const t1 = T0(c, 0, .5) + .4, t2 = T0(c, +(o.k ?? 1), 2.5); return { sfx: [], draw: lt => { const u = U(); place(o, 'market', lt); IFM.exTitle(o, lt);
    const P2 = [{ x: W * .27, who: 'older man', has: 'cow', wants: 'ear of rice', fl: 0 }, { x: W * .73, who: 'adult ear of rice', has: 'ear of rice', wants: 'running shoe', fl: 1 }], gy = H * .58;
    P2.forEach((p, i) => { const k = K(lt, t1 + i * .5, .6); if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; em(p.who, p.x, gy - H * .08, H * .17, { hero: 1, flip: !!p.fl }); em(p.has, p.x + (i ? -1 : 1) * W * .13, gy - H * .02, H * .09, {}); T(i ? 'HAS RICE' : 'HAS A COW', p.x, gy + H * .065, { size: 30 * u, font: 'display', weight: 900, fill: INK, lw: 0 }); ctx.restore();
      const b = K(lt, t1 + 1 + i * .8, .5); if (b > 0) { const bx = p.x - W * .15, by = H * .27, bw = W * .3, bh = H * .1; bubble(bx, by, bw, bh, p.x, gy - H * .17, b); ctx.save(); ctx.globalAlpha *= b; T('WANTS', bx + bw * .34, by + bh / 2, { size: 24 * u, font: 'display', weight: 900, fill: '#4E6B57', lw: 0 }); em(p.wants, bx + bw * .74, by + bh / 2, bh * .7, {}); ctx.restore(); } });
    const m = K(lt, t2, .5); if (m > 0) { ctx.save(); ctx.globalAlpha *= m; circ(W / 2, H * .47, 44 * u, CREAM, 0); T('≠', W / 2, H * .47 + 3 * u, { size: 64 * u, font: 'display', weight: 900, fill: '#C8553D', lw: 0 }); ctx.restore(); tagAt('NO MATCH', W / 2, H * .405, lt, t2 + .4, { size: 26 }); } } }; };

  // ================================================================ x_mv_signal: a price is a message
  A.x_mv_signal = (o, c, dur) => { const t0 = T0(c, 0, .4), t1 = T0(c, +(o.kb ?? 1), 2), t2 = T0(c, +(o.ks ?? 1), 3) + 1; return { sfx: [], draw: lt => { const u = U(); place(o, 'street', lt); IFM.exTitle(o, lt);
    const cx = W / 2, cy = H * .36, up = K(lt, t0 + .8, 1.2), price = (2 + .6 * up).toFixed(2), s = KB(lt, t0, .8);
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.sin(lt * 1.2) * .04); ctx.scale(s, s); card(-W * .2, -H * .055, W * .4, H * .11, 18 * u, '#FFD84D'); circ(-W * .16, 0, 12 * u, '#F6F1E7', 0); em('bread', -W * .1, 0, H * .07, {});
    T(price, W * .06, 4 * u, { size: 60 * u, font: 'display', weight: 900, fill: '#1B1F3A', lw: 0 }); ctx.restore();
    if (up > 0) { ctx.save(); ctx.globalAlpha = up; em('up arrow', cx + W * .27, cy, H * .06, {}); ctx.restore(); }
    const tg = [{ x: W * .24, e: 'adult cooking', t: 'BAKE MORE', at: t1 }, { x: W * .76, e: 'shopping bags', t: 'BUY LESS', at: t2 }], gy = H * .54;
    tg.forEach((g, i) => { const k = K(lt, g.at - .9, .9); dash(cx + (i ? 1 : -1) * W * .1, cy + H * .06, g.x, gy - H * .12, k, GOLD, 6 * u);
      if (k > .1) for (let j = 0; j < 3; j++) { const q = ((lt * .7 + j / 3) % 1); if (k < 1 && q > k) continue; ctx.save(); ctx.globalAlpha = .8 * Math.sin(q * Math.PI); circ(lerp(cx + (i ? 1 : -1) * W * .1, g.x, q), lerp(cy + H * .06, gy - H * .12, q), 8 * u, GOLD, 0); ctx.restore(); }
      const a = K(lt, g.at, .6), sp = KB(lt, g.at, .8); if (a > 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(g.x, gy); ctx.scale(sp, sp); em(g.e, 0, 0, H * .15, { hero: 1 }); ctx.restore(); tagAt(g.t, g.x, gy + H * .1, lt, g.at + .3); } }); } }; };

  // ================================================================ x_mv_queue: pay with time
  A.x_mv_queue = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), 2); return { sfx: [], draw: lt => { const u = U(); place(o, 'street', lt); IFM.exTitle(o, lt);
    // the shop (right), awning and a sign FREE
    const sx = W * .62, sw = W * .36, sy = H * .34, sh = H * .3; card(sx, sy, sw, sh, 8 * u, '#E9DFC7'); for (let i = 0; i < 6; i++) poly([[sx + i * sw / 6, sy], [sx + (i + 1) * sw / 6, sy], [sx + (i + 1) * sw / 6, sy + H * .05], [sx + i * sw / 6, sy + H * .05]], i % 2 ? '#F4EEDC' : '#2F5B43', 0);
    rr(sx + sw * .3, sy + sh * .4, sw * .4, sh * .6, 4 * u, '#5A4636', 0); rr(sx + sw * .08, sy + sh * .25, sw * .18, sh * .2, 3 * u, '#BFD9EE', 0); rr(sx + sw * .74, sy + sh * .25, sw * .18, sh * .2, 3 * u, '#BFD9EE', 0); card(sx + sw * .2, sy + H * .065, sw * .6, H * .045, 8 * u, '#FFD84D'); T('FREE', sx + sw / 2, sy + H * .088, { size: 34 * u, font: 'display', weight: 900, fill: INK, lw: 0 });
    // the queue: people in perspective, shuffling forward every ~2.4 s, new ones joining at the back
    const step = Math.floor(lt / 2.4), f = ease((lt % 2.4) / .7), WHO = ['man briefcase', 'older woman', 'woman cooking', 'woman briefcase', 'older man', 'adult cooking', 'man personal computer'];
    for (let i = 11; i >= 0; i--) { const pos = i - f, q = pos / 11, x = sx + sw * .3 - W * .08 - pos * W * .095 * (1 - q * .3), y = H * .66 - q * H * .06, s = H * (.15 - q * .05); if (x < -W * .1) continue; const id = (i + step) % WHO.length;
      ctx.save(); ctx.globalAlpha *= i === 0 ? 1 - f : 1; em(WHO[id], x, y - s * .45 + Math.abs(Math.sin(lt * 2 + i)) * 2 * u, s, { ground: true }); ctx.restore(); }
    // the clock: time is the price
    const ck = K(lt, tk - .4, .6); if (ck > 0) { const x = W * .26, y = H * .3, R = H * .06; ctx.save(); ctx.globalAlpha *= ck; card(x - R * 1.2, y - R * 1.2, R * 2.4, R * 2.4, R * 1.2, '#FBF7EC'); circ(x, y, R, '#FFFFFF', 0); ctx.strokeStyle = INK; ctx.lineWidth = 6 * u; ctx.lineCap = 'round'; const a1 = lt * 1.6, a2 = lt * .13;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(a1) * R * .8, y - Math.cos(a1) * R * .8); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(a2) * R * .5, y - Math.cos(a2) * R * .5); ctx.stroke(); circ(x, y, 6 * u, '#C8553D', 0); ctx.restore(); tagAt('PAY WITH TIME', x, y + R * 1.6, lt, tk); } } }; };

  // ================================================================ x_mv_planner: the person who writes the card
  A.x_mv_planner = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), dur * .6); return { sfx: [], draw: lt => { const u = U(); place(o, 'office', lt); IFM.exTitle(o, lt);
    const bx = W * .14, by = H * .26, bw = W * .72, bh = H * .4; ctx.save(); ctx.translate(W / 2, by + bh / 2); ctx.rotate(-.025); ctx.translate(-W / 2, -(by + bh / 2)); card(bx, by, bw, bh, 18 * u, '#8A6A44'); rr(bx + bw * .04, by + bh * .06, bw * .92, bh * .9, 10 * u, '#FBF7EC', 0); rr(bx + bw * .36, by - H * .015, bw * .28, H * .04, 10 * u, '#B8B8B8', 0);
    T('RATIONS · WEEK 1', W / 2, by + bh * .14, { size: 34 * u, font: 'display', weight: 900, fill: INK, lw: 0 });
    const rows = [['bread', 'BREAD', '1 LOAF'], ['glass of milk', 'MILK', '2 PINTS'], ['egg', 'EGGS', '1'], ['butter', 'BUTTER', '50 G'], ['soap', 'SOAP', '1 BAR']], per = Math.max(.7, (tk - .6) / rows.length);
    let px = bx + bw * .5, py = by + bh * .3; rows.forEach(([e, l, v], i) => { const t0 = .5 + i * per, k = clamp((lt - t0) / (per * .85)); if (k <= 0) return; const y = by + bh * (.28 + i * .135); em(e, bx + bw * .14, y, bh * .09, {}); ctx.save(); ctx.beginPath(); ctx.rect(bx + bw * .22, y - bh * .06, bw * .7 * k, bh * .12); ctx.clip();
      T(l, bx + bw * .24, y, { size: 32 * u, font: 'display', weight: 900, fill: INK, lw: 0, align: 'left' }); T(v, bx + bw * .88, y, { size: 32 * u, font: 'display', weight: 800, fill: '#4E6B57', lw: 0, align: 'right' }); ctx.restore(); if (k < 1) { px = bx + bw * (.22 + .7 * k); py = y; } });
    ctx.restore(); if (lt < tk) em('pencil', px + 20 * u, py - 30 * u, H * .07, { rot: -.5 + Math.sin(lt * 9) * .06 });
    const st = K(lt, tk, .45); if (st > 0) { ctx.save(); ctx.translate(W * .56, H * .6); ctx.rotate(-.1); ctx.scale(1.5 - .5 * st, 1.5 - .5 * st); ctx.globalAlpha *= st * .9; ctx.strokeStyle = '#A23B2E'; ctx.lineWidth = 6 * u; ctx.strokeRect(-W * .25, -H * .035, W * .5, H * .07); T('WHO DECIDES?', 0, 3 * u, { size: 46 * u, font: 'display', weight: 900, fill: '#A23B2E', lw: 0 }); ctx.restore(); } } }; };

  // ================================================================ x_mv_qullqa: Inca storehouses and a llama caravan
  A.x_mv_qullqa = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), 2); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(cached('mvqullqa', () => { const g = ctx.createLinearGradient(0, 0, 0, H * .5); g.addColorStop(0, '#9CC3E0'); g.addColorStop(1, '#EADBB8'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      const ridge = (y0, amp, seed, col) => { const r = rng(seed); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += W / 12) ctx.lineTo(x, y0 - amp * r()); ctx.lineTo(W, H); ctx.fill(); };
      ridge(H * .3, H * .1, 2, '#9AA6C4'); ridge(H * .38, H * .08, 4, '#8E9E78'); ctx.fillStyle = '#7D9460'; ctx.beginPath(); ctx.moveTo(0, H * .62); ctx.quadraticCurveTo(W * .5, H * .34, W, H * .4); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
      for (let k = 0; k < 9; k++) { ctx.strokeStyle = 'rgba(60,70,40,.25)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, H * (.62 - k * .012)); ctx.quadraticCurveTo(W * .5, H * (.36 + k * .025), W, H * (.42 + k * .022)); ctx.stroke(); }
      // the storehouses: round stone towers with thatched cones, in rows along the slope
      for (let row = 0; row < 2; row++) for (let i = 0; i < 6; i++) { const x = W * (.18 + i * .14) + row * W * .07, y = H * (.46 - row * .05) + Math.abs(i - 2.5) * H * .006, s = W * (.075 - row * .015);
        rr(x - s / 2, y - s * .8, s, s * .8, 4, '#B9AC94', 0); for (let k = 0; k < 4; k++) line(x - s / 2, y - s * .8 + k * s * .2, x + s / 2, y - s * .8 + k * s * .2, 2, 'rgba(90,80,60,.35)'); poly([[x - s * .62, y - s * .78], [x, y - s * 1.45], [x + s * .62, y - s * .78]], '#C9A15A', 0); rr(x - s * .1, y - s * .35, s * .2, s * .35, 2, '#5A4A38', 0); }
      ctx.strokeStyle = '#D8C49A'; ctx.lineWidth = W * .045; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-W * .1, H * .66); ctx.quadraticCurveTo(W * .5, H * .54, W * 1.1, H * .6); ctx.stroke(); }), 0, 0);
    IFM.exTitle({ ...o, theme: 'paper' }, lt);
    for (let i = 0; i < 5; i++) { const q = ((lt * .045 + i * .17) % 1), x = lerp(-W * .08, W * 1.08, q), y = H * .62 - Math.sin(q * Math.PI) * H * .055 - q * H * .01, s = H * .07; ctx.save(); ctx.translate(x, y - s * .45); ctx.scale(-1, 1); em('llama', 0, 0, s, {}); ctx.restore(); if (i % 2 === 0) em('package', x + W * .005, y - s * .82, s * .4, {}); }
    tagAt("MIT'A: WORK, NOT COINS", W / 2, H * .25, lt, T0(c, 0, .6) + .6); tagAt('QULLQA: STOREHOUSES', W * .5, H * .665, lt, tk); } }; };

  // ================================================================ x_mv_parcel: what was in the parcel
  A.x_mv_parcel = (o, c, dur) => { const t0 = T0(c, 0, .4); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(cached('mvbar2', () => { ctx.fillStyle = '#4A3B2F'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 14; i++) { ctx.fillStyle = i % 2 ? '#54443A' : '#4E3F33'; ctx.fillRect(i * W / 13, 0, W / 13 - 3, H); } ctx.fillStyle = '#3A2E25'; ctx.fillRect(0, H * .66, W, H);
      const g = ctx.createRadialGradient(W / 2, H * .45, 10, W / 2, H * .45, W * .8); g.addColorStop(0, 'rgba(255,214,150,.35)'); g.addColorStop(1, 'rgba(0,0,0,.35)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }), 0, 0);
    IFM.exTitle({ ...o, theme: 'noir' }, lt);
    const bx = W / 2, by = H * .6, bw = W * .56, bh = H * .15, open = K(lt, t0 + .3, 1); card(bx - bw / 2, by - bh / 2, bw, bh, 8 * u, '#B98A55'); rr(bx - bw / 2, by - bh / 2, bw, bh * .16, 4 * u, '#9C7344', 0); line(bx, by - bh / 2, bx, by + bh / 2, 3 * u, 'rgba(0,0,0,.15)');
    for (const sd of [-1, 1]) { const hx = bx + sd * bw / 2, top = by - bh / 2, L = bw * .48, a = lerp(0, 2.2, open); /* flap hinged on the outer top edge, swinging up and out */ const tx = hx - sd * L * Math.cos(a), ty = top - L * Math.sin(a) * .6; poly([[hx, top], [tx, ty], [tx, ty - bh * .06], [hx, top - bh * .06]], sd < 0 ? '#C99A62' : '#BE8F58', 0); }
    T('PARCEL · PRISONER OF WAR', bx, by + bh * .18, { size: fit('PARCEL · PRISONER OF WAR', 26 * u, bw * .9), font: 'display', weight: 900, fill: '#5A3F22', lw: 0 });
    const IT = [['canned food', 'FOOD', -.3], ['chocolate bar', 'CHOCOLATE', -.1], ['soap', 'SOAP', .1], ['smoking symbol', 'CIGARETTES', .3]];
    IT.forEach(([e, l, dx], i) => { const at = t0 + 1 + i * .55, q = clamp((lt - at) / .9); if (q <= 0) return; const x = bx + dx * W * .95, y = lerp(by - bh * .2, H * .38 + (i % 2) * H * .06, E.out(q)) + Math.sin(lt * 1.2 + i) * 5 * u;
      ctx.save(); ctx.globalAlpha *= clamp(q * 2); em(e, x, y, H * .085, { hero: 1 }); ctx.restore(); tagAt(l, x, y + H * .065, lt, at + .5, { size: 24 }); }); } }; };

  // ================================================================ x_mv_reborn: money keeps coming back
  A.x_mv_reborn = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), dur * .55); return { sfx: [], draw: lt => { const u = U(); IFM.exBg({ ...o, place: undefined }, lt); IFM.exTitle(o, lt);
    const IT = ['cow', 'spiral shell', 'smoking symbol', 'ear of rice', 'banknote', 'coin'], cx = W / 2, cy = H * .47, fuse = K(lt, tk, 1.4);
    IT.forEach((e, i) => { const a = lt * .5 + i * TAU / IT.length, R = W * .32 * (1 - fuse), x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R * .75, k = K(lt, .2 + i * .25, .6); if (k <= 0 || fuse >= 1) return; ctx.save(); ctx.globalAlpha *= k * (1 - fuse * .9); em(e, x, y, H * .09 * (1 - fuse * .5), { hero: 1 }); ctx.restore(); });
    if (fuse > 0) { const s = KB(lt, tk + .8, .9); ctx.save(); ctx.globalAlpha *= clamp(fuse * 1.4); glow(cx, cy, H * .2 * fuse, '#FFE2A0', .35); ctx.translate(cx, cy); ctx.scale(s, s); em('coin', 0, 0, H * .2, { hero: 1 }); ctx.restore(); tagAt('INVENTED AGAIN', cx, cy + H * .16, lt, tk + 1.2); } } }; };

  // ================================================================ x_mv_belief: a popular belief, labelled as one
  A.x_mv_belief = (o, c, dur) => { const v = o.v === 'work' ? 'work' : 'barter'; return { sfx: [], draw: lt => { const u = U(); place(o, v === 'work' ? 'office' : 'market', lt); IFM.exTitle(o, lt);
    const k = KB(lt, .2, .8), bx = W * .1, by = H * .27, bw = W * .8, bh = H * .25; ctx.save(); ctx.globalAlpha *= clamp((lt - .2) / .4); ctx.translate(W / 2, by + bh / 2); ctx.scale(k, k); ctx.translate(-W / 2, -(by + bh / 2)); card(bx, by, bw, bh, 40 * u, '#FFFFFF'); poly([[W * .3, by + bh - 2], [W * .42, by + bh - 2], [W * .28, by + bh + H * .05]], '#FFFFFF', 0);
    if (v === 'barter') { const IT = ['cow', 'ear of rice', 'chicken', 'running shoe']; IT.forEach((e, i) => { const a = lt * .6 + i * TAU / 4, x = W / 2 + Math.cos(a) * W * .22, y = by + bh * .5 + Math.sin(a) * bh * .26; em(e, x, y, bh * .32, {}); });
      ctx.save(); ctx.strokeStyle = GOLD; ctx.lineWidth = 6 * u; ctx.setLineDash([2 * u, 12 * u]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(W / 2, by + bh * .5, W * .22, bh * .26, 0, 0, TAU); ctx.stroke(); ctx.restore(); T('SWAP', W / 2, by + bh * .52, { size: 40 * u, font: 'display', weight: 900, fill: INK, lw: 0 }); }
    else { ['man personal computer', 'adult cooking', 'adult ear of rice'].forEach((e, i) => em(e, W * (.3 + i * .2), by + bh * .5 + Math.sin(lt * 1.5 + i) * 4 * u, bh * .45, {})); const z = K(lt, 1.6, .8); if (z > 0) { ctx.save(); ctx.globalAlpha *= z; T('Z z z', W * .74, by + bh * .2, { size: 40 * u, font: 'display', weight: 900, fill: '#7A8CA8', lw: 0 }); ctx.restore(); } }
    ctx.restore(); tagAt(o.v === 'work' ? 'A POPULAR BELIEF: NOBODY WORKS' : 'A POPULAR BELIEF: BACK TO BARTER', W / 2, H * .62, lt, .9, { size: 28, bg: '#FFD84D' }); } }; };

  // ================================================================ x_mv_promise: a ring of people around a banknote
  A.x_mv_promise = (o, c, dur) => { const tk = T0(c, +(o.k ?? 1), dur * .5); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(cached('mvprom', () => { const g = ctx.createRadialGradient(W / 2, H * .45, 10, W / 2, H * .45, H * .7); g.addColorStop(0, '#2C4A38'); g.addColorStop(1, '#0F1E16'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }), 0, 0);
    IFM.exTitle({ ...o, theme: 'noir' }, lt); const cx = W / 2, cy = H * .47, R = W * .36, N = 12, WHO = ['man briefcase', 'older woman', 'adult cooking', 'woman briefcase', 'adult ear of rice', 'older man', 'man personal computer', 'woman cooking', 'happy person raising one hand', 'child', 'family', 'man cooking'];
    const th = K(lt, tk, 2.2); if (th > 0) { ctx.save(); ctx.strokeStyle = '#FFE08A'; ctx.lineWidth = 5 * u; ctx.globalAlpha = .9; ctx.shadowColor = '#FFE08A'; ctx.shadowBlur = 16 * u; ctx.beginPath(); ctx.ellipse(cx, cy, R, R * .8, 0, -Math.PI / 2, -Math.PI / 2 + TAU * th); ctx.stroke(); ctx.restore(); }
    for (let i = 0; i < N; i++) { const a = -Math.PI / 2 + i * TAU / N + lt * .03, x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R * .8, k = K(lt, .2 + i * .12, .5); if (k <= 0) continue; ctx.save(); ctx.globalAlpha *= k; em(WHO[i], x, y, H * .085, { hero: 1 }); ctx.restore(); }
    const nk = KB(lt, .4, .9); ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.sin(lt * .5) * .05); ctx.scale(nk, nk); card(-W * .2, -W * .095, W * .4, W * .19, 10 * u, '#E7EBD6'); ctx.strokeStyle = GOLD; ctx.lineWidth = 4 * u; ctx.strokeRect(-W * .185, -W * .08, W * .37, W * .16); em('handshake', 0, 0, W * .11, {}); T('100', -W * .14, 0, { size: 34 * u, font: 'display', weight: 900, fill: GREEN, lw: 0 }); T('100', W * .14, 0, { size: 34 * u, font: 'display', weight: 900, fill: GREEN, lw: 0 }); ctx.restore();
    tagAt('A SHARED PROMISE', cx, H * .245, lt, tk + 1); } }; };
})();
