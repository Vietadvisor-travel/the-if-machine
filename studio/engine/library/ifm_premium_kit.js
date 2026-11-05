/* The If Machine — PREMIUM AS THE HOUSE STANDARD (owner, 5 Nov 2026 night: "OK, make that the engine standard from now on").
   Loaded after ifm_explain + ifm_premium. Header `look: classic` switches it off for one story.
   1. DRAWN, NOT EMOJI: IFM.emoji(name, …) draws the hand-made IFM.PX object when one exists for that name (coin, banknote, bread,
      cow, ox, cigarette, shell, package, clock, tag/label/ticket, rice, money bag, person/bust, shoe, scale, classical building,
      chocolate, soap, canned food …). `raw: 1` forces the emoji. IFM.PX.DRAW lists them; add new drawn objects there.
   2. TYPE: every title on every kit/bespoke act is a premium headline: kick= (mono kicker) + title= / head= with *gold* words;
      IFM.tag becomes a clean Inter pill.
   3. THE KIT, REDRAWN: ex_show ex_compare ex_flow ex_list ex_stat ex_chapter ex_quote ex_timeline in the premium look (lit cards,
      Unbounded numbers, animated leaders, callouts), laid out in the title band (11–25 %) and the subject band (28–68 %) only.
   4. FINISH: every 2D frame gets the house grade (soft vignette + film grain) unless the act draws its own (x_px_*). */
'use strict';
(function () {
  if (!window.IFM || !IFM.PX || !IFM.ACT) return; const X = IFM.PX, A = IFM.ACT, C = X.C, K = X.K, KB = X.KB, T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d, ease = t => E.inOut(clamp(t));
  IFM.premium = true; IFM._camSoft = true;
  const split = s => String(s ?? '').split('|').map(x => x.trim()).filter(x => x !== ''), ats = (o, c, n, from = 0) => { const a = split(o.at); return Array.from({ length: n }, (_, i) => a[i] != null ? T0(c, +a[i], .4 + i) : T0(c, from + i, .4 + i * 1.5)); };
  const PEOPLE = ['#3E6A8A', '#C8553D', '#2F5B43', '#7A5A9C', '#D9A441', '#4A4E6B', '#B7695C', '#2A9D8F'];

  // ================================================================ 1. drawn objects for common names
  const shoe = (x, y, s) => { X.lit(() => { ctx.moveTo(x - s * .5, y); ctx.lineTo(x - s * .5, y - s * .28); ctx.quadraticCurveTo(x - s * .2, y - s * .36, x - s * .05, y - s * .2); ctx.quadraticCurveTo(x + s * .35, y - s * .2, x + s * .5, y - s * .05); ctx.lineTo(x + s * .5, y); ctx.closePath(); }, '#3E6A8A', { box: [x - s / 2, y - s * .36, s, s * .36], db: 10, dy: 4 }); rr(x - s * .52, y - s * .02, s * 1.04, s * .07, s * .03, '#F4EEDC', 0); };
  const choc = (x, y, s) => { X.lit(() => ctx.roundRect(x - s * .5, y - s * .2, s, s * .4, s * .04), '#6B3A26', { box: [x - s / 2, y - s * .2, s, s * .4] }); X.lit(() => ctx.roundRect(x - s * .5, y - s * .2, s * .55, s * .4, s * .04), '#C8553D', { box: [x - s / 2, y - s * .2, s * .55, s * .4], drop: false }); };
  const soap = (x, y, s) => X.lit(() => ctx.roundRect(x - s * .4, y - s * .22, s * .8, s * .44, s * .18), '#E59AB8', { box: [x - s * .4, y - s * .22, s * .8, s * .44] });
  const tin = (x, y, s) => { X.lit(() => ctx.roundRect(x - s * .3, y - s * .4, s * .6, s * .8, s * .06), '#B9C2CC', { box: [x - s * .3, y - s * .4, s * .6, s * .8] }); X.lit(() => ctx.rect(x - s * .3, y - s * .18, s * .6, s * .36), C.coral, { box: [x - s * .3, y - s * .18, s * .6, s * .36], drop: false }); };
  const scale = (x, y, s, lt) => { const tilt = Math.sin(lt * .9) * .08; ctx.save(); ctx.translate(x, y); X.lit(() => ctx.rect(-s * .03, -s * .45, s * .06, s * .7), C.gold, { box: [-s * .03, -s * .45, s * .06, s * .7] }); X.lit(() => ctx.rect(-s * .25, s * .22, s * .5, s * .06), C.gold, { box: [-s * .25, s * .2, s * .5, s * .1] }); ctx.rotate(tilt); X.lit(() => ctx.rect(-s * .45, -s * .44, s * .9, s * .04), C.gold, { box: [-s * .45, -s * .46, s * .9, s * .06], drop: false });
    for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * s * .42, -s * .42); ctx.rotate(-tilt); line(0, 0, -s * .12, s * .3, 2, C.gold2); line(0, 0, s * .12, s * .3, 2, C.gold2); X.lit(() => { ctx.moveTo(-s * .17, s * .3); ctx.quadraticCurveTo(0, s * .46, s * .17, s * .3); ctx.closePath(); }, C.gold, { box: [-s * .17, s * .3, s * .34, s * .16], drop: false }); ctx.restore(); } ctx.restore(); };
  const temple = (x, y, s) => { const c0 = '#E9E2D0'; X.contact(x, y + s * .42, s * .5, .3); X.lit(() => { ctx.moveTo(x - s * .48, y - s * .22); ctx.lineTo(x, y - s * .46); ctx.lineTo(x + s * .48, y - s * .22); ctx.closePath(); }, c0, { box: [x - s / 2, y - s * .48, s, s * .3] }); for (let i = 0; i < 5; i++) X.lit(() => ctx.rect(x - s * .38 + i * s * .18, y - s * .18, s * .08, s * .48), c0, { box: [x - s * .4, y - s * .2, s * .8, s * .5], drop: false }); X.lit(() => ctx.rect(x - s * .5, y + s * .3, s, s * .1), c0, { box: [x - s / 2, y + s * .3, s, s * .1] }); };
  const people = (x, y, s, lt, n = 2) => { for (let i = 0; i < n; i++) X.person(x + (i - (n - 1) / 2) * s * .32, y + s * .45, s * .9, lt + i, { col: PEOPLE[i + 1], seed: i + 2, legs: '#2E3346' }); };
  const D = X.DRAW = {
    coin: (x, y, s, lt) => X.coin(x, y, s * .42, lt), banknote: (x, y, s, lt) => X.note(x, y, s * 1.15, lt), 'money bag': (x, y, s, lt) => X.sack(x, y + s * .42, s * .9, lt, { label: '$', col: '#C9A15A' }),
    bread: (x, y, s, lt) => X.loaf(x, y + s * .08, s * .95, lt), cow: (x, y, s, lt) => X.cow(x, y + s * .38, s * 1.05, lt), 'smoking symbol': (x, y, s, lt) => X.cigarette(x, y, s, lt, { rot: -.2 }),
    'spiral shell': (x, y, s, lt) => X.shell(x, y, s * .9, lt, { rot: .2 }), package: (x, y, s, lt) => X.box(x, y + s * .12, s * .9, lt), 'alarm clock': (x, y, s, lt) => X.clock(x, y, s * .4, lt),
    label: (x, y, s, lt) => X.tag(x, y, s, 'PRICE', lt), ticket: (x, y, s, lt) => X.tag(x, y, s, 'NO. 042', lt, { col: '#F2E3C0' }), 'ear of rice': (x, y, s, lt) => X.sack(x, y + s * .42, s * .85, lt, { label: 'RICE' }),
    'busts in silhouette': (x, y, s, lt) => people(x, y, s, lt, 2), 'bust in silhouette': (x, y, s, lt) => people(x, y, s, lt, 1), family: (x, y, s, lt) => people(x, y, s, lt, 3), 'running shoe': (x, y, s) => shoe(x, y + s * .15, s),
    'balance scale': (x, y, s, lt) => scale(x, y, s * .9, lt), 'classical building': (x, y, s) => temple(x, y, s * .9), 'chocolate bar': (x, y, s) => choc(x, y, s), soap: (x, y, s) => soap(x, y, s), 'canned food': (x, y, s) => tin(x, y, s) };
  D.ox = D.cow; D['cow face'] = D.cow; D['sheaf of rice'] = D['ear of rice']; D['baguette bread'] = D.bread; D['banknote with dollar sign'] = D.banknote; D['banknote with euro sign'] = D.banknote; D.cigarette = D['smoking symbol']; D.stopwatch = D['alarm clock'];
  const emoji0 = IFM.emoji; IFM.emojiRaw = emoji0;
  IFM.emoji = (name, cx, cy, size, o = {}) => { const f = IFM.premium && !o.raw && D[String(name).toLowerCase()]; if (!f) return emoji0(name, cx, cy, size, o);
    ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(cx, cy); if (o.rot) ctx.rotate(o.rot); if (o.flip) ctx.scale(-1, 1); if (o.sx != null) ctx.scale(o.sx, 1); f(0, 0, size, (IFM._lt || 0)); ctx.restore(); return true; };

  // ================================================================ 2. type
  const head = (o, lt, dark) => { const t = o.head || (o.title && o.title !== 'none' ? o.title : ''); if (o.kick) X.kicker(String(o.kick), W / 2, H * .115, lt, .05, { col: dark ? C.gold2 : C.goldD }); if (t) X.headline(String(t).replace(/\\n/g, '|'), W / 2, o.kick ? H * .195 : H * .17, lt, .2, { s: +o.hs || 64, col: dark ? '#F6F1E4' : C.ink, hi: dark ? C.gold2 : C.gold, shadow: dark ? 'rgba(0,0,0,.4)' : null }); };
  X.head = head; const isDark = o => (IFM.THEMES && IFM.themeOf && (IFM.THEMES[IFM.themeOf(o)] || {}).dark && !o.place) || IFM.PLACE_DARK && IFM.PLACE_DARK[o.place];
  const title0 = IFM.exTitle; IFM.exTitle = (o, lt) => (IFM._titled = true) && IFM.premium ? head(o, lt, o.theme === 'noir' || o.theme === 'paper' && false || isDark(o)) : title0(o, lt);
  const tag0 = IFM.tag; IFM.tag = (t, x, y, size, o = {}) => { if (!IFM.premium) return tag0(t, x, y, size, o); const u = U(), s = size * .82, w = X.tw(t, 'ui', 800, s) + s * 1.6, h = s * 1.75; ctx.save(); ctx.translate(x, y); ctx.scale(o.s || 1, o.s || 1); ctx.shadowColor = 'rgba(10,18,14,.28)'; ctx.shadowBlur = 18 * u; ctx.shadowOffsetY = 6 * u;
    rr(-w / 2, -h / 2, w, h, h / 2, o.bg && /^#(FFD|F2C|FFC)/i.test(o.bg) ? C.gold2 : 'rgba(255,253,246,.97)', 0); ctx.shadowColor = 'transparent'; circ(-w / 2 + s * .75, 0, s * .2, C.gold, 0); X.text(t, s * .2, 1, { f: 'ui', w: 800, s, fill: C.ink, ls: 1.2 * u }); ctx.restore(); };

  // ================================================================ 3. the kit, redrawn
  const bg = (o, lt) => { IFM.exBg(o, lt); if (o.place) X.haze(0, H, isDark(o) ? '#10142A' : '#F6F1E4', .25); };
  const hero = (n, x, y, s, lt, o = {}) => { X.contact(x, y + s * .48, s * .42, .25); IFM.emoji(n, x, y, s, { ...o }); };
  const label = (t, x, y, lt, at, o = {}) => { const k = K(lt, at, .5); if (k <= 0 || !t) return; const u = U(), s = Math.min((o.s || 34) * u, (o.max || W * .4) / Math.max(1, X.tw(t, 'ui', 800, 34 * u) / (34 * u))); ctx.save(); ctx.globalAlpha *= k; X.text(String(t).toUpperCase(), x, y + (1 - k) * 10 * u, { f: 'ui', w: 800, s, fill: o.col || C.ink, ls: 2 * u, align: o.align || 'center' }); ctx.restore(); };
  const card = (x, y, w, h, r, col = 'rgba(255,253,246,.94)') => { const u = U(); ctx.save(); ctx.shadowColor = 'rgba(10,20,14,.22)'; ctx.shadowBlur = 30 * u; ctx.shadowOffsetY = 12 * u; rr(x, y, w, h, r, col, 0); ctx.restore(); };
  const fin = (lt, o) => X.finish(lt, { vig: isDark(o) ? .38 : .2, grain: .04 });

  A.ex_show = (o, c, dur) => { const at = .25; return { sfx: [], draw: lt => { const u = U(); IFM._lt = lt; bg(o, lt); head(o, lt, isDark(o)); const cx = W / 2, cy = H * .45, S = H * (+o.size || .27), k = KB(lt, at, .9), d = o.do || 'float';
    let y = cy + Math.sin(lt * 1.1) * 6 * u, s = S; if (d === 'grow') s = S * (.6 + .4 * ease(lt / Math.max(1, dur * .8))); else if (d === 'pulse') s = S * (1 + .03 * Math.sin(lt * 3));
    X.rays(cx, cy, S * 1.3, lt, isDark(o) ? .1 : .14, '#FFF3D0', 10);
    split(o.around).forEach((n, i, arr) => { const a = lt * .35 + i * TAU / arr.length, kk = K(lt, .6 + i * .25, .6); if (kk <= 0) return; ctx.save(); ctx.globalAlpha *= kk; IFM.emoji(n, cx + Math.cos(a) * S * .9, cy + Math.sin(a) * S * .5, S * .3, {}); ctx.restore(); });
    if (k > 0) { ctx.save(); ctx.translate(cx, y); ctx.scale(k, k); hero(o.e || 'coin', 0, 0, s, lt); ctx.restore(); }
    const xk = o.x != null ? K(lt, T0(c, +o.x, 1e9), .5) : 0; if (xk > 0) { ctx.save(); ctx.strokeStyle = C.coral; ctx.lineWidth = 16 * u; ctx.lineCap = 'round'; const r = S * .5; ctx.beginPath(); ctx.moveTo(cx - r, y - r); ctx.lineTo(cx - r + 2 * r * xk, y - r + 2 * r * xk); ctx.stroke(); if (xk > .5) { const q = (xk - .5) * 2; ctx.beginPath(); ctx.moveTo(cx + r, y - r); ctx.lineTo(cx + r - 2 * r * q, y - r + 2 * r * q); ctx.stroke(); } ctx.restore(); }
    if (o.l) X.callout(String(o.l).toUpperCase(), cx, cy + S * .55, cx, H * .665, lt, .9, { dark: isDark(o) });
    if (o.tag) { const m = String(o.tag).match(/^(.*?)(?:@(\d+))?$/); X.callout(m[1], cx + S * .3, cy - S * .35, W * .76, H * .3, lt, m[2] != null ? T0(c, +m[2], 1) : 1, {}); } fin(lt, o); } }; };

  A.ex_compare = (o, c, dur) => { const e = split(o.e), l = split(o.l), at = ats(o, c, 2); return { sfx: [], draw: lt => { const u = U(); IFM._lt = lt; bg(o, lt); head(o, lt, isDark(o)); const S = H * .17, cy = H * .45, xs = [W * .27, W * .73];
    const wm = String(o.win || '').match(/^(\d)(?:@(\d+))?$/), wk = wm ? K(lt, wm[2] != null ? T0(c, +wm[2], 2) : 2, .6) : 0;
    e.forEach((n, i) => { const k = KB(lt, at[i], .8); if (k <= 0) return; const lose = wm && +wm[1] !== i, win = wm && +wm[1] === i; ctx.save(); ctx.globalAlpha *= (lose ? 1 - wk * .55 : 1); card(xs[i] - W * .21, cy - S * .85, W * .42, S * 2.1, 36 * u, isDark(o) ? 'rgba(20,26,50,.75)' : 'rgba(255,253,246,.9)');
      ctx.translate(xs[i], cy); ctx.scale(k * (win ? 1 + wk * .08 : 1), k * (win ? 1 + wk * .08 : 1)); hero(n, 0, -S * .05, S, lt); ctx.restore(); label(l[i], xs[i], cy + S * .95, lt, at[i] + .3, { max: W * .36, col: isDark(o) ? '#F6F1E4' : C.ink, s: 30 }); });
    const sg = o.sign || 'vs', sk = KB(lt, Math.max(at[0], at[1]) + .3, .7); if (sk > 0) { ctx.save(); ctx.translate(W / 2, cy); ctx.scale(sk, sk); X.lit(() => ctx.arc(0, 0, 50 * u, 0, TAU), sg === '≠' ? C.coral : C.gold, { box: [-50 * u, -50 * u, 100 * u, 100 * u] }); X.text(sg === 'vs' ? 'VS' : sg, 0, 3 * u, { f: 'disp', w: 900, s: sg === 'vs' ? 34 * u : 54 * u, fill: '#FFFFFF' }); ctx.restore(); } fin(lt, o); } }; };

  A.ex_flow = (o, c, dur) => { const e = split(o.e), l = split(o.l), n = e.length, at = ats(o, c, n); return { sfx: [], draw: lt => { const u = U(); IFM._lt = lt; bg(o, lt); head(o, lt, isDark(o)); const S = H * (n > 3 ? .085 : .1);
    const pts = e.map((_, i) => [W * (i % 2 ? .66 : .34), H * (.32 + i * (.32 / Math.max(1, n - 1)))]);
    for (let i = 0; i < n - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], k = K(lt, at[i + 1] - .6, .6); if (k <= 0) continue; ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 6 * u; ctx.lineCap = 'round'; ctx.setLineDash([2 * u, 14 * u]); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - H * .01; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(mx + (i % 2 ? -1 : 1) * W * .12, my, lerp(x1, x2, k), lerp(y1, y2, k)); ctx.stroke(); ctx.restore();
      const q = ((lt * .6 + i * .3) % 1); if (k >= 1) circ(lerp(x1, x2, q), lerp(y1, y2, q), 7 * u, C.gold, 0); }
    e.forEach((nm, i) => { const k = KB(lt, at[i], .8); if (k <= 0) return; const [x, y] = pts[i]; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); card(-S * .9, -S * .78, S * 1.8, S * 1.56, S * .5, isDark(o) ? 'rgba(20,26,50,.8)' : 'rgba(255,253,246,.94)'); hero(nm, 0, -S * .05, S * 1.05, lt); ctx.restore();
      X.text(String(i + 1).padStart(2, '0'), x + (i % 2 ? -1 : 1) * S * 1.05, y - S * .35, { f: 'disp', w: 900, s: 30 * u, fill: C.gold, align: i % 2 ? 'right' : 'left', a: k > 0 ? 1 : 0 });
      if (l[i]) label(l[i], x + (i % 2 ? -1 : 1) * S * 1.05, y + S * .15, lt, at[i] + .3, { align: i % 2 ? 'right' : 'left', max: W * .3, s: 30, col: isDark(o) ? '#F6F1E4' : C.ink }); }); fin(lt, o); } }; };

  A.ex_list = (o, c, dur) => { const e = split(o.e), l = split(o.l), n = Math.max(e.length, l.length), at = ats(o, c, n); return { sfx: [], draw: lt => { const u = U(); IFM._lt = lt; bg(o, lt); head(o, lt, isDark(o)); const y0 = H * .33, step = Math.min(H * .115, H * .33 / Math.max(1, n - 1 || 1)), ch = Math.min(H * .1, step * .86);
    for (let i = 0; i < n; i++) { const k = K(lt, at[i], .6); if (k <= 0) continue; const y = y0 + i * step; ctx.save(); ctx.globalAlpha *= k; ctx.translate((1 - k) * -60 * u, 0); card(W * .07, y - ch / 2, W * .86, ch, ch * .32, isDark(o) ? 'rgba(20,26,50,.8)' : 'rgba(255,253,246,.95)');
      rr(W * .07, y - ch / 2, 10 * u, ch, 5 * u, C.gold, 0); X.text(String(i + 1).padStart(2, '0'), W * .15, y + 2 * u, { f: 'disp', w: 900, s: ch * .42, fill: C.gold });
      if (e[i]) { ctx.save(); ctx.translate(W * .28, y); hero(e[i], 0, 0, ch * .72, lt); ctx.restore(); }
      const txt = String(l[i] || ''), maxw = W * .5, words = txt.split(' '); let lines = [''], s = 36 * u; for (const w of words) { const t2 = (lines[lines.length - 1] + ' ' + w).trim(); if (X.tw(t2, 'ui', 800, s) > maxw && lines[lines.length - 1]) lines.push(w); else lines[lines.length - 1] = t2; } if (lines.length > 2) s = 30 * u;
      lines.slice(0, 3).forEach((ln, j) => X.text(ln, W * .38, y + (j - (lines.length - 1) / 2) * s * 1.15, { f: 'ui', w: 800, s, fill: isDark(o) ? '#F6F1E4' : C.ink, align: 'left' })); ctx.restore(); } fin(lt, o); } }; };

  A.ex_stat = (o, c, dur) => { const at = ats(o, c, 1)[0]; return { sfx: [], draw: lt => { const u = U(); IFM._lt = lt; bg(o, lt); head(o, lt, isDark(o)); const val = +String(o.v || 0).replace(/[^\d.]/g, '');
    X.counter(val, W / 2, H * .31, lt, at - .2, { s: val >= 1000 ? 140 : 170, pre: o.pre, post: o.post, unit: o.unit, col: isDark(o) ? '#F6F1E4' : C.ink, ucol: isDark(o) ? '#C9CDE8' : '#4E6B57' });
    const gn = Math.min(200, +o.gn || 0), hi = +o.hi || 0; if (gn && o.e) { const cols = gn > 60 ? 10 : gn > 16 ? 8 : 4, rows = Math.ceil(gn / cols), s = Math.min(W * .78 / cols, H * .22 / rows), x0 = W / 2 - (cols - 1) * s / 2, y0 = H * .43 + s / 2, person = /bust|people|person|family/.test(o.e);
      for (let i = 0; i < gn; i++) { const kk = K(lt, at + .3 + i * (1.4 / gn), .3); if (kk <= 0) break; const x = x0 + (i % cols) * s, y = y0 + Math.floor(i / cols) * s; ctx.save(); ctx.globalAlpha *= kk * (hi && i >= hi ? .25 : 1);
        if (person) { const col = PEOPLE[i % 3]; circ(x, y - s * .2, s * .15, shade(col, .12), 0); rr(x - s * .2, y - s * .03, s * .4, s * .36, s * .16, col, 0); } else IFM.emoji(o.e, x, y, s * .85, {}); ctx.restore(); }
      if (o.note) X.callout(o.note, W / 2, y0 + rows * s - s * .3, W / 2, H * .67, lt, at + 2, {}); }
    else if (o.e) { const k = KB(lt, at, .8); ctx.save(); ctx.translate(W / 2, H * .53); ctx.scale(k, k); hero(o.e, 0, 0, H * .18, lt); ctx.restore(); } fin(lt, o); } }; };

  A.ex_chapter = (o, c, dur) => (A.x_px_chapter ? A.x_px_chapter({ ...o, head: o.head || (o.title || '').replace(/^(\S+\s+\S+)\s+(.*)$/, '$1|*$2*'), obj: o.obj || o.e }, c, dur) : { sfx: [], draw: () => {} });
  A.ex_quote = (o, c, dur) => (A.x_px_quote ? A.x_px_quote({ ...o, q: split(o.q).join(' '), by: String(o.by || '').toUpperCase(), kick: o.kick || 'WHAT IS ACTUALLY KNOWN' }, c, dur) : { sfx: [], draw: () => {} });

  A.ex_timeline = (o, c, dur) => { const e = split(o.e), l = split(o.l), d = split(o.d), n = e.length, at = ats(o, c, n); return { sfx: [], draw: lt => { const u = U(); IFM._lt = lt; bg(o, lt); head(o, lt, isDark(o)); const sp = W * .6, ly = H * .6;
    let cur = 0; for (let i = 0; i < n; i++) if (lt >= at[i] - .5) cur = i; const prev = Math.max(0, cur - 1), f = K(lt, at[cur] - .5, 1.1), off = -lerp(prev, cur, cur ? f : 0) * sp;
    ctx.save(); const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, 'rgba(217,164,65,0)'); g.addColorStop(.5, C.gold); g.addColorStop(1, 'rgba(217,164,65,0)'); ctx.strokeStyle = g; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(W, ly); ctx.stroke(); ctx.restore();
    for (let i = 0; i < n; i++) { const x = W / 2 + i * sp + off; if (x < -W * .5 || x > W * 1.5) continue; const on = i === cur ? 1 : .35, k = KB(lt, at[i] - .3, .8); ctx.save(); ctx.globalAlpha *= on; circ(x, ly, 14 * u, C.gold, 0); circ(x, ly, 6 * u, '#FFF', 0);
      if (k > 0) { ctx.save(); ctx.translate(x, H * .44); ctx.scale(k, k); hero(e[i], 0, 0, H * .15, lt); ctx.restore(); } if (d[i]) X.text(d[i], x, ly + H * .045, { f: 'disp', w: 900, s: 46 * u, fill: isDark(o) ? '#F6F1E4' : C.ink }); if (l[i]) X.kicker(l[i], x, H * .335, lt, at[i] - .3, { col: C.goldD }); ctx.restore(); } fin(lt, o); } }; };

  // ================================================================ premium chapter card and quotation (house acts, used by ex_chapter / ex_quote)
  // ================================================================ x_px_chapter — a chapter card with weight
  const OBJ = { scale: (x, y, s, lt) => { const tilt = Math.sin(lt * .9) * .08; ctx.save(); ctx.translate(x, y); X.lit(() => ctx.rect(-s * .03, -s * .45, s * .06, s * .7), C.gold, { box: [-s * .03, -s * .45, s * .06, s * .7] }); X.lit(() => ctx.rect(-s * .25, s * .22, s * .5, s * .06), C.gold, { box: [-s * .25, s * .2, s * .5, s * .1] }); ctx.rotate(tilt); X.lit(() => ctx.rect(-s * .45, -s * .44, s * .9, s * .04), C.gold, { box: [-s * .45, -s * .46, s * .9, s * .06], drop: false });
      for (const sd of [-1, 1]) { ctx.save(); ctx.translate(sd * s * .42, -s * .42); ctx.rotate(-tilt); line(0, 0, -s * .12, s * .3, 2, C.gold2); line(0, 0, s * .12, s * .3, 2, C.gold2); X.lit(() => { ctx.moveTo(-s * .17, s * .3); ctx.quadraticCurveTo(0, s * .46, s * .17, s * .3); ctx.closePath(); }, C.gold, { box: [-s * .17, s * .3, s * .34, s * .16], drop: false }); ctx.restore(); } ctx.restore(); },
    coin: (x, y, s, lt) => X.coin(x, y, s * .38, lt, { sx: Math.cos(lt * .8) }), note: (x, y, s, lt) => X.note(x, y, s * 1.1, lt, { rot: -.08 + Math.sin(lt) * .03 }),
    ticket: (x, y, s, lt) => X.tag(x, y, s * 1.05, 'NO. 042', lt, { rot: Math.sin(lt * .8) * .06, col: '#F2E3C0' }), shell: (x, y, s, lt) => X.shell(x, y, s * .9, lt, { rot: Math.sin(lt * .6) * .2 }),
    bubble: (x, y, s, lt) => { X.bubble(x, y - s * .05, s * 1.2, s * .7, x - s * .3, y + s * .45); for (let i = 0; i < 3; i++) circ(x - s * .25 + i * s * .25, y - s * .05, s * .06 * (1 + .25 * Math.sin(lt * 4 - i)), C.green, 0); },
    hands: (x, y, s, lt) => { X.note(x, y, s * 1.1, lt, { rot: .04 }); ctx.save(); ctx.globalCompositeOperation = 'screen'; X.rays(x, y, s * 1.3, lt, .1); ctx.restore(); } };
  A.x_px_chapter = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U(); ctx.drawImage(X.cache('pxch', () => { const g = ctx.createRadialGradient(W / 2, H * .38, 0, W / 2, H * .38, H * .8); g.addColorStop(0, '#27503A'); g.addColorStop(1, '#0C1A12'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#D9A441'; for (let k = 0; k < 34; k++) { ctx.globalAlpha = .06; ctx.lineWidth = 1.5; ctx.beginPath(); for (let a = 0; a <= TAU + .01; a += .02) { const r = W * (.2 + k * .012) * (1 + .1 * Math.sin(10 * a + k * .5)); const x = W / 2 + Math.cos(a) * r, y = H * .38 + Math.sin(a) * r; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); } ctx.globalAlpha = .4; ctx.lineWidth = 2; ctx.strokeRect(W * .04, H * .025, W * .92, H * .95); ctx.globalAlpha = 1; }), 0, 0);
    const n = String(o.n || 1).padStart(2, '0'), kN = K(lt, .05, .9); ctx.save(); ctx.globalAlpha = .9 * kN; ctx.font = `900 ${H * .22}px ${X.F.disp}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 3 * u; ctx.strokeStyle = 'rgba(242,207,122,.55)'; ctx.strokeText(n, W / 2, H * .36 + (1 - kN) * 40 * u); ctx.restore();
    const ob = OBJ[o.obj] || (o.obj ? (x, y, s, lt) => IFM.emoji(o.obj, x, y, s * .85, {}) : OBJ.coin), kO = KB(lt, .5, .9); ctx.save(); ctx.translate(W / 2, H * .37); ctx.scale(kO, kO); ctx.translate(-W / 2, -H * .37); if (kO > 0) ob(W / 2, H * .37, W * .34, lt); ctx.restore();
    X.kicker('CHAPTER ' + ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX'][(+o.n || 1) - 1], W / 2, H * .565, lt, .3, { col: C.gold2 });
    { const N = +o.of || +(IFM.hdr && IFM.hdr.chapters) || 5, cur = +o.n || 1, kp = K(lt, .2, .8); ctx.save(); ctx.globalAlpha *= kp; X.text(String(cur).padStart(2, '0') + ' / ' + String(N).padStart(2, '0'), W / 2, H * .1, { f: 'mono', w: 700, s: 24 * u, fill: C.gold2, ls: 4 * u });
      const gw = W * .5, x0 = W / 2 - gw / 2; for (let i = 0; i < N; i++) { const x = x0 + i * gw / (N - 1), on = i < cur; circ(x, H * .13, (i === cur - 1 ? 9 : 6) * u, on ? C.gold2 : 'rgba(242,207,122,.25)', 0); if (i < N - 1) line(x + 12 * u, H * .13, x + gw / (N - 1) - 12 * u, H * .13, 2 * u, i < cur - 1 ? C.gold2 : 'rgba(242,207,122,.2)'); } ctx.restore(); }
    if (o.sub) X.kicker(String(o.sub).toUpperCase(), W / 2, H * .695, lt, .9, { col: '#DCE8DA' });
    X.headline(String(o.head || 'TITLE'), W / 2, H * .63, lt, .45, { s: +o.hs || 66, col: '#F6F1E4', hi: C.gold2, shadow: 'rgba(0,0,0,.4)' }); X.motes(lt, 16, '#F2CF7A', .15); X.finish(lt, { vig: .4 }); } });

  // ================================================================ x_px_quote — a real quotation, set like a book page
  A.x_px_quote = (o, c, dur) => { const at = T0(c, +(o.k ?? 0), .4); return { sfx: [], draw: lt => { const u = U(); X.backdrop('#E9DFC8', '#CDBF9F', { pool: '#FFF8E6', py: .42 }); { const pw = W * .88, ph = H * .5, px = W / 2 - pw / 2, py = H * .2, k = K(lt, 0, .6); ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 20 * u); ctx.shadowColor = 'rgba(40,30,10,.25)'; ctx.shadowBlur = 40 * u; ctx.shadowOffsetY = 16 * u; rr(px, py, pw, ph, 18 * u, '#FBF7EC', 0); ctx.shadowColor = 'transparent';
      ctx.drawImage(X.cache('pxpaper', () => { const r = rng(5); ctx.strokeStyle = 'rgba(120,100,60,.08)'; ctx.lineWidth = 1; for (let y = H * .26; y < H * .68; y += H * .028) { ctx.beginPath(); ctx.moveTo(W * .1, y); ctx.lineTo(W * .9, y); ctx.stroke(); } for (let i = 0; i < 900; i++) { ctx.fillStyle = `rgba(110,90,50,${r() * .05})`; ctx.fillRect(W * (.06 + r() * .88), H * (.2 + r() * .5), 2, 2); } }), 0, 0);
      rr(px, py, 10 * u, ph, 5 * u, C.gold, 0); ctx.restore(); }
    if (o.kick) X.kicker(o.kick, W / 2, H * .15, lt, .05, { col: C.goldD }); X.quote(String(o.q || ''), o.by || '', W / 2, H * .45, lt, at, Math.max(3, dur - at - 1)); X.finish(lt, { vig: .2, vcol: '#3A2A14' }); } }; };

  // ================================================================ cold open + spoken outro (owner, 5 Nov 2026 night: 'the hook needs punch, the ending feels cut')
  // ex_cold w="EVERY|*COIN.*;…;*GONE.*" items="coin|banknote|balance" end="NOT STOLEN · JUST GONE"  — one punch word per caption; the last dissolves everything
  // ex_outro items="banknote|card|coin" word="A PROMISE" sub=… next="WHAT IF …|*…?*" e=dino|<drawn/emoji name> — the closing thought spoken, then the next question
  // ================================================================ x_px_cold — the cold open: one punch per line, then everything dissolves
  // captions: 0 "Every coin." 1 "Every banknote." 2 "Every number in every bank account." 3 "… Gone." (k0..k3 can be set)
    A.ex_cold = (o, c, dur) => { const WORDS = String(o.w || 'WHAT|*IF?*').split(';'), IT = String(o.items || 'coin').split('|'), n = Math.max(WORDS.length, 2), t = [...Array(n).keys()].map(i => T0(c, +(o['k' + i] ?? i), .4 + i * 1.6)), last = n - 1; return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(X.cache('pxcold', () => { const g = ctx.createRadialGradient(W / 2, H * .45, 0, W / 2, H * .45, H * .75); g.addColorStop(0, '#1C2550'); g.addColorStop(1, '#05070F'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = '#D9A441'; for (let k = 0; k < 30; k++) { ctx.globalAlpha = .045; ctx.lineWidth = 1.5; ctx.beginPath(); for (let a = 0; a <= TAU + .01; a += .02) { const r = W * (.18 + k * .013) * (1 + .1 * Math.sin(12 * a + k * .4)); const x = W / 2 + Math.cos(a) * r, y = H * .45 + Math.sin(a) * r; a ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); } ctx.globalAlpha = 1; }), 0, 0);
    const gone = clamp((lt - t[last]) / 1.6); let cur = 0; for (let i = 0; i < n; i++) if (lt >= t[i]) cur = i; const cx = W / 2, cy = H * .47, SL = [[W * .2, H * .36], [W * .8, H * .36], [W * .5, H * .62]];
    // spotlight that tightens on each punch
    const sp = X.KB(lt, t[cur], .5); ctx.save(); ctx.globalCompositeOperation = 'screen'; const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * (.55 - .05 * sp)); g.addColorStop(0, `rgba(255,226,160,${.22 * (1 - gone)})`); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
    // the three things, each enters on its line and moves aside for the next
    const slot = (i) => { if (lt < t[i]) return null; const k = X.KB(lt, t[i], .7), mv = i < cur && cur < last ? X.K(lt, t[i + 1], .7) : 0, pos = SL[i % 3];
      return { x: lerp(cx, pos[0], mv), y: lerp(cy, pos[1], mv), s: lerp(1, .45, mv) * k }; };
    const drawThing = (i, p) => { if (!p) return; const a = 1 - gone; if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(p.x, p.y); ctx.scale(p.s, p.s);
      const nm = IT[i]; if (nm === 'coin') { X.coin(0, 0, W * .17, lt, { sx: Math.cos(lt * 2.2) }); X.glint(W * .08, -W * .1, W * .05, lt, t[i] + .4, 1.6); }
      else if (nm === 'banknote') X.note(0, 0, W * .62, lt, { rot: Math.sin(lt * 1.3) * .06, sx: .9 + .1 * Math.cos(lt * 1.7) });
      else if (nm !== 'balance') IFM.emoji(nm, 0, 0, W * .4, {});
      else { const w = W * .5, h = w * .62, v = 12480 * (1 - clamp((lt - t[i] - .6) / 2.2)); X.lit(() => ctx.roundRect(-w / 2, -h / 2, w, h, 26 * u), '#F7F4EA', { box: [-w / 2, -h / 2, w, h] }); rr(-w / 2, -h / 2, w, h * .34, 26 * u, C.green, 0); rr(-w / 2, -h / 2 + h * .2, w, h * .14, 0, C.green, 0);
        X.text('BALANCE', 0, -h * .33, { f: 'mono', w: 700, s: 22 * u, fill: '#DDE8DA' }); X.text(v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), 0, h * .12, { f: 'disp', w: 900, s: 54 * u, fill: v < 1 ? C.coral : C.ink }); }
      ctx.restore(); };
    for (let i = 0; i < Math.min(IT.length, last); i++) drawThing(i, slot(i));
    // dissolve: gold dust rising from where the things were
    if (gone > 0) { const r = rng(12); ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 260; i++) { const src = SL[i % Math.max(1, Math.min(3, IT.length))], sx = src[0] + (r() - .5) * W * .3, sy = src[1] + (r() - .5) * H * .1, q = clamp(gone * 1.3 - r() * .3);
      if (q <= 0) continue; const x = sx + Math.sin(i + lt * 2) * 40 * u * q + (r() - .5) * W * .2 * q, y = sy - q * q * H * .45; ctx.globalAlpha = (1 - q) * .9; circ(x, y, (1.5 + r() * 3) * u, r() < .5 ? '#FFE3A0' : '#F2CF7A', 0); } ctx.restore(); }
    // the punch words: slam in, one at a time, at the top
    const wk = X.KO(lt, t[cur], .45); ctx.save(); const sc = 1.25 - .25 * wk; ctx.translate(W / 2, H * .17); ctx.scale(sc, sc); ctx.translate(-W / 2, -H * .17); ctx.globalAlpha *= clamp(wk * 1.4);
    X.headline(WORDS[Math.min(cur, WORDS.length - 1)], W / 2, cur === last ? H * .45 : H * .17, lt, t[cur] - .2, { s: cur === last ? 150 : 84, col: '#F6F1E4', hi: C.gold2, shadow: 'rgba(0,0,0,.5)' }); ctx.restore();
    if (cur === last && o.end) X.kicker(o.end, W / 2, H * .56, lt, t[last] + 1, { col: C.gold2 });
    X.motes(lt, 20, '#F2CF7A', .14); X.finish(lt, { vig: .55 }); } }; };

  // ================================================================ x_px_outro — the closing thought, said out loud, then the next question
  // captions: 0..n-2 the closing thought (a note, a card, a coin turn into one glowing word), last = the next episode teaser
  const bankCard = (x, y, w, lt) => { const h = w * .63, u = U(); X.lit(() => ctx.roundRect(x - w / 2, y - h / 2, w, h, w * .06), '#2A4A6B', { box: [x - w / 2, y - h / 2, w, h] }); rr(x - w * .38, y - h * .12, w * .18, h * .2, w * .02, C.gold2, 0); X.text('•••• 0042', x + w * .1, y + h * .26, { f: 'mono', w: 700, s: w * .07, fill: '#DCE6F2' }); };
  const dino = (x, y, s) => { X.lit(() => { ctx.moveTo(x - s * .55, y); ctx.quadraticCurveTo(x - s * .5, y - s * .35, x - s * .1, y - s * .38); ctx.quadraticCurveTo(x + s * .15, y - s * .4, x + s * .3, y - s * .75); ctx.quadraticCurveTo(x + s * .38, y - s * .92, x + s * .5, y - s * .86); ctx.quadraticCurveTo(x + s * .55, y - s * .8, x + s * .42, y - s * .62);
      ctx.quadraticCurveTo(x + s * .32, y - s * .35, x + s * .32, y - s * .2); ctx.lineTo(x + s * .3, y); ctx.lineTo(x + s * .2, y); ctx.lineTo(x + s * .15, y - s * .12); ctx.lineTo(x - s * .15, y - s * .12); ctx.lineTo(x - s * .2, y); ctx.lineTo(x - s * .3, y); ctx.lineTo(x - s * .32, y - s * .14); ctx.quadraticCurveTo(x - s * .7, y - s * .1, x - s * .95, y + s * .02); ctx.closePath(); }, '#5E8C5A', { box: [x - s, y - s, s * 1.6, s] }); circ(x + s * .45, y - s * .84, s * .015, '#1B1B1B', 0); };
  A.ex_outro = (o, c, dur) => { const n = c ? c.length : 3, tW = T0(c, Math.max(0, n - 3), 2), tN = T0(c, n - 1, dur * .7); return { sfx: [], draw: lt => { const u = U();
    ctx.drawImage(X.cache('pxout', () => { const g = ctx.createRadialGradient(W / 2, H * .45, 0, W / 2, H * .45, H * .8); g.addColorStop(0, '#2E5A42'); g.addColorStop(1, '#08120D'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }), 0, 0);
    const cx = W / 2, cy = H * .44, merge = X.K(lt, tW, 1.6), next = X.K(lt, tN, .9);
    ctx.save(); ctx.globalAlpha *= 1 - next; const DRAWIT = { banknote: (x, y, k) => X.note(x, y, W * .5 * k, lt, { rot: -.1 }), card: (x, y, k) => bankCard(x, y, W * .4 * k, lt), coin: (x, y, k) => X.coin(x, y, W * .1 * k, lt, { sx: Math.cos(lt * 1.6) }) }, items = String(o.items || 'banknote|card|coin').split('|').map(nm => DRAWIT[nm] || ((x, y, k) => IFM.emoji(nm, x, y, W * .25 * k, {})));
    items.forEach((f, i) => { const k0 = X.KB(lt, .3 + i * .5, .8); if (k0 <= 0) return; const a = -Math.PI / 2 + i * TAU / items.length + lt * .2 * (1 - merge), R = W * .27 * (1 - merge), x = cx + Math.cos(a) * R, y = cy + Math.sin(a) * R * .8; ctx.save(); ctx.globalAlpha *= 1 - merge * .95; f(x, y, k0 * (1 - merge * .5)); ctx.restore(); });
    if (merge > 0) { X.rays(cx, cy, W * .75 * merge, lt, .18 * merge); ctx.save(); ctx.globalAlpha *= merge; ctx.shadowColor = '#FFD27A'; ctx.shadowBlur = 40 * u; const wd = o.word || 'THANK YOU'; X.text(wd, cx, cy, { f: 'disp', w: 900, s: Math.min(96 * u, W * .84 / Math.max(1, X.tw(wd, 'disp', 900, 96 * u) / (96 * u))), fill: C.gold2 }); ctx.restore(); if (o.sub) X.kicker(o.sub, cx, cy + H * .07, lt, tW + .8, { col: '#DCE8DA' }); }
    ctx.restore();
    if (o.kick) { ctx.save(); ctx.globalAlpha *= 1 - next; X.kicker(o.kick, W / 2, H * .13, lt, .05, { col: C.gold2 }); ctx.restore(); }
    if (next > 0) { ctx.save(); ctx.globalAlpha *= next; X.kicker('NEXT ON THE IF MACHINE', W / 2, H * .2, lt, tN, { col: C.gold2 }); X.headline(o.next || String((IFM.hdr && IFM.hdr.next) || 'WHAT IF …?').toUpperCase(), W / 2, H * .3, lt, tN + .2, { s: 62, col: '#F6F1E4', hi: C.gold2 });
      const dk = X.KB(lt, tN + .6, .9); ctx.translate(W / 2, H * .62); ctx.scale(dk, dk); X.contact(0, 0, W * .3, .35); if (o.e === 'dino') dino(0, 0, W * .42); else if (o.e) IFM.emoji(o.e, 0, -W * .2, W * .4, {}); ctx.restore(); }
    X.motes(lt, 24, '#F2CF7A', .2); X.finish(lt, { vig: .45 }); } }; };
  // ================================================================ 4. finish every 2D frame (lazy wrap at compile time, after every library has loaded)
  const wrapAll = () => { for (const k of Object.keys(A)) { const f = A[k]; if (f._px || /^x_px_|^ex_/.test(k) || typeof f !== 'function') continue; const g = (o, c, d) => { const B = f(o, c, d); if (!B || !B.draw || !IFM.premium) return B; return { ...B, draw: lt => { IFM._lt = lt; IFM._titled = false; B.draw(lt); if (/^x_/.test(k)) { if (!IFM._titled && (o.kick || (o.title && o.title !== 'none'))) head(o, lt, isDark(o)); X.finish(lt, { vig: .22, grain: .04 }); } } }; }; g._px = 1; A[k] = g; } };
  if (typeof SB !== 'undefined' && SB.compile) { const comp = SB.compile; SB.compile = (text, opts) => { IFM.premium = !/^look\s*:\s*classic\b/m.test(String(text)); wrapAll(); return comp(text, opts); }; }
})();
