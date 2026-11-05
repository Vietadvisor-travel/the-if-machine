/* The If Machine — EXPLAINER KIT (owner, 4 Nov 2026: "neutral, clear explanation, entertaining; 2D pictures must show a
   recognisable thing, not vague shapes"). Every 2D beat can be built from these acts plus the OpenMoji library
   (engine/library/emoji_data.js, 2,000+ named illustrations; credit "Illustrations: OpenMoji, CC BY-SA 4.0").
   Docs: studio/references/explainer-kit.md.

   IFM.emoji(name, cx, cy, size, {alpha, rot, flip, ground, line, sx})   — draw one illustration centred at (cx, cy)
   IFM.emojiFind('word') → glyph key or null

   kind=w act=ex_show     e=<name> [l=LABEL] [title=…] [sub=…] [do=float|spin|grow|drop|pulse] [around=a|b|c] [pile=N] [x=k] [tag=TEXT@k]
   kind=w act=ex_compare  e=a|b l=A|B [sign=vs|=|≠|→|>|<] [win=0|1@k] [title=…] [at=k|k]
   kind=w act=ex_flow     e=a|b|c|d l=A|B|C|D [at=k|k|k|k] [title=…]               (a process: steps joined by arrows)
   kind=w act=ex_list     e=a|b|c l=line|line|line [at=k|k|k] [title=…] [n=1]      (points / recap; n=1 numbers them)
   kind=w act=ex_stat     v=2000 [unit=…] [e=<name>] [gn=100] [hi=10] [title=…] [at=k]  (a number shown by its size)
   kind=w act=ex_chapter  n=2 title=… [e=<name>]                                  (section card: signpost + a breath)
   kind=w act=ex_quote    q=…|… by=… [e=<name>]                                    (a real quotation, typed)
   kind=w act=ex_timeline e=a|b|c l=A|B|C d=DATE|DATE|DATE [at=k|k|k]              (dates, the camera moves along)
   Common: bg=paper|sky|night|sand|mint|blush|dusk (default paper) · ink colours from the brand · captions stay clear (74.5–79 %). */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT) return; const A = IFM.ACT, P = IFM.P, INK = '#1B1F3A';
  const T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d, ease = t => E.inOut(clamp(t)), K = (lt, a, d = .6) => ease((lt - a) / d), V = () => H > W;

  // ---------------------------------------------------------------- the illustration painter (bitmap-cached per glyph and size)
  const P2D = {}, BMP = {};
  IFM.emojiFind = q => { if (!IFM.EMOJI_DATA) return null; const s = String(q || '').toLowerCase().trim(); const N = IFM.EMOJI_NAMES || {};
    if (IFM.EMOJI_DATA[q]) return q; if (N[s]) return N[s]; const ks = Object.keys(N).filter(n => n.includes(s)).sort((a, b) => a.length - b.length); return ks.length ? N[ks[0]] : null; };
  function paths(key) { if (P2D[key]) return P2D[key]; const recs = IFM.EMOJI_DATA[key] || []; P2D[key] = recs.map(r => ({ p: new Path2D(r[0]), fill: r[1], stroke: r[2], sw: +r[3] || 1, x: r[4] || {} })); return P2D[key]; }
  function paint(g, key, s, o = {}) { const lineCol = o.lineCol || '#1E2233', lwK = o.lw ?? .9; g.save(); g.scale(s / 72, s / 72); g.lineCap = 'round'; g.lineJoin = 'round';
    for (const r of paths(key)) { g.save(); if (r.x.m) g.transform(...r.x.m); if (r.x.o) g.globalAlpha *= +r.x.o;
      if (r.fill) { g.fillStyle = r.fill; g.fill(r.p, r.x.e ? 'evenodd' : 'nonzero'); }
      if (r.stroke && o.line !== false) { const blk = /^#0{3}(0{3})?$/.test(r.stroke); g.strokeStyle = blk ? lineCol : r.stroke; g.lineWidth = r.sw * (blk ? lwK : 1); g.stroke(r.p); }
      g.restore(); } g.restore(); }
  IFM.emoji = (name, cx, cy, size, o = {}) => { const key = IFM.emojiFind(name); if (!key || size < 2) return false; const q = Math.max(16, Math.round(size / 8) * 8), ck = key + '|' + q + (o.line === false ? 'n' : '');
    let b = BMP[ck]; if (!b) { b = mkCanvas(q, q); const g = b.getContext('2d'); paint(g, key, q, o); BMP[ck] = b; }
    if (o.ground) { ctx.save(); ctx.globalAlpha *= .18 * (o.alpha ?? 1); ell(cx, cy + size * .44, size * .36 * (o.sx ?? 1), size * .06, '#000', 0); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(cx, cy); if (o.rot) ctx.rotate(o.rot); ctx.scale((o.flip ? -1 : 1) * (o.sx ?? 1), o.sy ?? 1); ctx.drawImage(b, -size / 2, -size / 2, size, size); ctx.restore(); return true; };

  // ---------------------------------------------------------------- calm backgrounds (cached) with slow life
  // light themes stay ≤ ~230 so the calm grade's contrast never blows them out to white (owner: no glare)
  const BG = { paper: ['#E6D9C0', '#DCCBAB', '#CFBB97'], sky: ['#CADDF0', '#B0CBE6', '#B9D1AE'], night: ['#1B2140', '#252C55', '#2E3563'], sand: ['#E4D0A8', '#D8BD88', '#C9A670'],
    mint: ['#CFE7DA', '#B8DBC8', '#A2CDB6'], blush: ['#EDD2CA', '#E4BCB1', '#D9A597'], dusk: ['#3B3561', '#6E5A8C', '#E8A87C'] };
  const BGC = {}; function bg(o, lt) { const th = BG[o.bg] ? o.bg : 'paper', C = BG[th], k = th + W + 'x' + H; let cv = BGC[k];
    if (!cv) { cv = mkCanvas(W, H); const g = cv.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, C[0]); gr.addColorStop(.7, C[1]); gr.addColorStop(1, C[2]); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      const r = rng(7); g.globalAlpha = th === 'night' || th === 'dusk' ? .05 : .035; for (let i = 0; i < 2600; i++) { g.fillStyle = r() < .5 ? '#000' : '#fff'; g.fillRect(r() * W, r() * H, 2, 2); }
      g.globalAlpha = 1; g.fillStyle = 'rgba(0,0,0,.05)'; g.fillRect(0, H * .72, W, H); g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(0, H * .72, W, 3); BGC[k] = cv; }
    ctx.drawImage(cv, 0, 0); const u = U(), dark = th === 'night' || th === 'dusk';
    for (let i = 0; i < 6; i++) { const r = rng(i * 13 + 3), x = W * r() + Math.sin(lt * .12 + i) * 40 * u, y = H * (.08 + r() * .6) + Math.cos(lt * .1 + i * 2) * 30 * u; ctx.save(); ctx.globalAlpha = dark ? .06 : .07; circ(x, y, (60 + r() * 110) * u, dark ? '#9FB4FF' : shade(C[1], -.12), 0); ctx.restore(); }
    if (dark) for (let i = 0; i < 40; i++) { const r = rng(i * 7 + 1); ctx.save(); ctx.globalAlpha = .35 + .25 * Math.sin(lt * .8 + i); circ(W * r(), H * r() * .6, (1 + r() * 2) * u, '#FFFFFF', 0); ctx.restore(); } }
  const dark = o => o.bg === 'night' || o.bg === 'dusk', ink = o => dark(o) ? '#F6F1E7' : INK, soft = o => dark(o) ? '#C9CDE8' : '#5A6283';
  const split = s => String(s ?? '').split('|').map(x => x.trim()).filter(x => x !== ''), ats = (o, c, n, from = 0) => { const a = split(o.at); return Array.from({ length: n }, (_, i) => a[i] != null ? T0(c, +a[i], .4 + i) : T0(c, from + i, .4 + i * 1.5)); };
  const label = (t, x, y, s, o2, col) => { if (!t) return; const sz = Math.min(s, W * .34 / Math.max(.01, textW(t, 100, 'display', 900) / 100)); T(t, x, y, { size: sz, font: 'display', weight: 900, fill: col, lw: 0 }); };
  const title = (o, lt) => { const u = U(); if (o.title && o.title !== 'none') { const k = K(lt, .15, .7), sz = Math.min(64 * u, W * .7 / Math.max(.01, textW(o.title, 100, 'display', 900) / 100)); ctx.save(); ctx.globalAlpha *= k; T(o.title, W / 2, H * .17 + (1 - k) * 14 * u, { size: sz, font: 'display', weight: 900, fill: ink(o), lw: 0 }); ctx.restore(); }
    if (o.sub) { const k = K(lt, .5, .7); ctx.save(); ctx.globalAlpha *= k; T(o.sub, W / 2, H * .22, { size: Math.min(34 * u, W * .72 / Math.max(.01, textW(o.sub, 100, 'body', 700) / 100)), font: 'body', weight: 700, fill: soft(o), lw: 0 }); ctx.restore(); } };
  const pop = (lt, at) => { const k = K(lt, at, .7); return { k, s: .6 + .4 * E.out(clamp((lt - at) / .7)) }; };
  const arrow = (x1, y1, x2, y2, k, col, w) => { if (k <= 0) return; const u = U(), x = lerp(x1, x2, k), y = lerp(y1, y2, k), a = Math.atan2(y2 - y1, x2 - x1); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w || 8 * u; ctx.lineCap = 'round'; ctx.setLineDash([2 * u, 16 * u]); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x, y); ctx.stroke(); ctx.setLineDash([]);
    if (k > .9) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x2 + Math.cos(a) * 6 * u, y2 + Math.sin(a) * 6 * u); ctx.lineTo(x2 - Math.cos(a - .5) * 30 * u, y2 - Math.sin(a - .5) * 30 * u); ctx.lineTo(x2 - Math.cos(a + .5) * 30 * u, y2 - Math.sin(a + .5) * 30 * u); ctx.fill(); } ctx.restore(); };
  const idle = (lt, i) => Math.sin(lt * 1.1 + i * 1.7) * 8 * U();
  const cross = (x, y, s, k) => { if (k <= 0) return; const u = U(); ctx.save(); ctx.globalAlpha *= .9; ctx.strokeStyle = P.coral; ctx.lineWidth = 16 * u; ctx.lineCap = 'round'; const d = s * .42 * k; ctx.beginPath(); ctx.moveTo(x - d, y - d); ctx.lineTo(x + d, y + d); ctx.moveTo(x + s * .42, y - s * .42); ctx.lineTo(x + s * .42 - 2 * d, y - s * .42 + 2 * d); ctx.stroke(); ctx.restore(); };
  const fx = (o, c, k) => k == null ? 1e9 : T0(c, +k, 1e9);
  const kitSfx = o => String(o.sfx || '').split('|').filter(Boolean).map((x, i) => { const m = x.match(/^(.*?)@(\d+(?:\.\d+)?)$/); return m ? [+m[2], m[1]] : [.3 + i, x]; });

  // ---------------------------------------------------------------- ex_show: one thing, big and clear
  A.ex_show = (o, c, dur) => ({ sfx: kitSfx(o), draw: lt => { const u = U(), v = V(); bg(o, lt); title(o, lt); const cx = W / 2, cy = H * (o.title ? .47 : .44), S = H * (+o.size || (v ? .3 : .42));
    const pa = pop(lt, .2), d = o.do || 'float'; let y = cy + idle(lt, 0), sx = 1, rot = 0, s = S * pa.s;
    if (d === 'spin') sx = Math.cos(lt * 1.2); else if (d === 'grow') s = S * (.5 + .5 * ease(lt / Math.max(1, dur * .8))); else if (d === 'drop') y = lerp(-S, cy, E.out(clamp((lt - .2) / .9))); else if (d === 'pulse') s = S * (1 + .04 * Math.sin(lt * 3));
    const ar = split(o.around); ar.forEach((n, i) => { const a = lt * .35 + i * TAU / ar.length, rr2 = S * .82; ctx.save(); ctx.globalAlpha *= K(lt, .6 + i * .25, .6); IFM.emoji(n, cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2 * .55, S * .3, {}); ctx.restore(); });
    if (+o.pile) { const n = +o.pile, r = rng(5); for (let i = 0; i < n; i++) { const k = K(lt, .3 + i * .08, .5); if (k <= 0) continue; const row = Math.floor(Math.sqrt(i * 2)), px = cx + (r() - .5) * S * 1.4 * (1 - row * .12), py = cy + S * .35 - row * S * .1; IFM.emoji(o.e, px, py - (1 - k) * 60 * u, S * .32, { rot: (r() - .5) * .6 }); } }
    else { ctx.save(); ctx.globalAlpha *= pa.k; IFM.emoji(o.e || 'question', cx, y, s, { sx, ground: true }); ctx.restore(); }
    cross(cx, cy, S, K(lt, fx(o, c, o.x), .4));
    if (o.l) { const k = K(lt, .6, .6); ctx.save(); ctx.globalAlpha *= k; label(o.l, cx, cy + S * .62, 56 * u, o, ink(o)); ctx.restore(); }
    if (o.tag) { const m = String(o.tag).match(/^(.*?)(?:@(\d+))?$/), k = K(lt, m[2] != null ? T0(c, +m[2], 1) : 1, .5); if (k > 0) { ctx.save(); ctx.globalAlpha *= k; IFM.tag(m[1], cx + S * .38, cy - S * .48, 30 * u, { bg: P.yellow, t: 1 }); ctx.restore(); } } } });

  // ---------------------------------------------------------------- ex_compare: two things side by side
  A.ex_compare = (o, c, dur) => { const e = split(o.e), l = split(o.l), at = ats(o, c, 2); return { sfx: kitSfx(o), draw: lt => { const u = U(), v = V(); bg(o, lt); title(o, lt); const S = H * (v ? .2 : .32), cy = H * (v ? .46 : .5), xs = [W * .29, W * .71];
    const wm = String(o.win || '').match(/^(\d)(?:@(\d+))?$/), wk = wm ? K(lt, wm[2] != null ? T0(c, +wm[2], 2) : 2, .6) : 0;
    e.forEach((n, i) => { const p = pop(lt, at[i]); if (p.k <= 0) return; const dim = wm && +wm[1] !== i ? 1 - wk * .55 : 1, big = wm && +wm[1] === i ? 1 + wk * .12 : 1; ctx.save(); ctx.globalAlpha *= p.k * dim; IFM.emoji(n, xs[i], cy + idle(lt, i), S * p.s * big, { ground: true }); label(l[i], xs[i], cy + S * .7, 46 * u, o, ink(o)); ctx.restore(); });
    const sg = o.sign || 'vs', sk = K(lt, Math.max(at[0], at[1]) + .3, .5); if (sk > 0) { ctx.save(); ctx.globalAlpha *= sk; circ(W / 2, cy, 46 * u, dark(o) ? '#3A4170' : '#F2EDE3', 0); T(sg === 'vs' ? 'VS' : sg, W / 2, cy + 2 * u, { size: sg === 'vs' ? 34 * u : 56 * u, font: 'display', weight: 900, fill: sg === '≠' ? P.coral : ink(o), lw: 0 }); ctx.restore(); } } }; };

  // ---------------------------------------------------------------- ex_flow: a process, step by step
  A.ex_flow = (o, c, dur) => { const e = split(o.e), l = split(o.l), n = e.length, at = ats(o, c, n); return { sfx: kitSfx(o), draw: lt => { const u = U(), v = V(); bg(o, lt); title(o, lt);
    const pts = e.map((_, i) => v ? [W * (i % 2 ? .68 : .32), H * (.31 + i * (.4 / Math.max(1, n - 1)))] : [W * (.14 + i * (.72 / Math.max(1, n - 1))), H * .5]), S = H * (v ? (n > 3 ? .11 : .14) : .22);
    for (let i = 0; i < n - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], d = Math.hypot(x2 - x1, y2 - y1), ox = (x2 - x1) / d, oy = (y2 - y1) / d, gap = S * .62; arrow(x1 + ox * gap, y1 + oy * gap, x2 - ox * gap, y2 - oy * gap, K(lt, at[i + 1] - .55, .55), dark(o) ? '#C9CDE8' : '#8A94A8'); }
    e.forEach((nm, i) => { const p = pop(lt, at[i]); if (p.k <= 0) return; const [x, y] = pts[i]; ctx.save(); ctx.globalAlpha *= p.k; circ(x, y, S * .66, dark(o) ? 'rgba(255,255,255,.08)' : 'rgba(255,255,255,.3)', 0); IFM.emoji(nm, x, y + idle(lt, i) * .5, S * p.s, {});
      if (l[i]) { const tx = v ? (i % 2 ? x - S * .82 : x + S * .82) : x, ty = v ? y : y + S * .9; ctx.save(); const sz = Math.min(40 * u, W * .3 / Math.max(.01, textW(l[i], 100, 'display', 900) / 100)); T(l[i], tx, ty, { size: sz, font: 'display', weight: 900, fill: ink(o), lw: 0, align: v ? (i % 2 ? 'right' : 'left') : 'center' }); ctx.restore(); } ctx.restore(); }); } }; };

  // ---------------------------------------------------------------- ex_list: points with an illustration each (also the recap)
  A.ex_list = (o, c, dur) => { const e = split(o.e), l = split(o.l), n = Math.max(e.length, l.length), at = ats(o, c, n); return { sfx: kitSfx(o), draw: lt => { const u = U(); bg(o, lt); title(o, lt);
    const y0 = H * (o.title ? .3 : .24), step = Math.min(H * .12, H * .42 / Math.max(1, n - 1 || 1)), S = Math.min(H * .09, step * .8);
    for (let i = 0; i < n; i++) { const p = pop(lt, at[i]); if (p.k <= 0) continue; const y = y0 + i * step, x = W * .2 + (1 - p.k) * -40 * u; ctx.save(); ctx.globalAlpha *= p.k; rr(W * .08, y - step * .42, W * .84, step * .84, 28 * u, dark(o) ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.32)', 0);
      if (+o.n) { circ(W * .08 + 6 * u, y - step * .42 + 6 * u, 22 * u, P.yellow, 0); T(String(i + 1), W * .08 + 6 * u, y - step * .42 + 7 * u, { size: 26 * u, font: 'display', weight: 900, fill: INK, lw: 0 }); }
      if (e[i]) IFM.emoji(e[i], x, y, S * p.s, {}); const tx = W * .32, maxw = W * .58, words = String(l[i] || '').split(' '); let lines = [''], sz = 42 * u; for (const w of words) { const t2 = (lines[lines.length - 1] + ' ' + w).trim(); if (textW(t2, sz, 'display', 900) > maxw && lines[lines.length - 1]) lines.push(w); else lines[lines.length - 1] = t2; }
      if (lines.length > 2) { sz = 34 * u; } lines.slice(0, 3).forEach((ln, j) => T(ln, tx, y + (j - (lines.length - 1) / 2) * sz * 1.1, { size: sz, font: 'display', weight: 900, fill: ink(o), lw: 0, align: 'left' })); ctx.restore(); } } }; };

  // ---------------------------------------------------------------- ex_stat: a number shown by its size (count up + a grid of things)
  A.ex_stat = (o, c, dur) => { const at = ats(o, c, 1)[0]; return { sfx: kitSfx(o), draw: lt => { const u = U(), v = V(); bg(o, lt); title(o, lt); const val = +String(o.v || 0).replace(/[^\d.]/g, ''), k = clamp((lt - at) / 1.6), shown = val * E.out(k);
    const fmt = x => val >= 100 ? Math.round(x).toLocaleString('en-US') : x.toFixed(val % 1 ? 1 : 0); ctx.save(); ctx.globalAlpha *= K(lt, at - .2, .5); T((o.pre || '') + fmt(shown) + (o.post || ''), W / 2, H * (o.title ? .3 : .26), { size: Math.min(150 * u, W * .72 / Math.max(.01, textW((o.pre || '') + fmt(val) + (o.post || ''), 100, 'display', 900) / 100)), font: 'display', weight: 900, fill: ink(o), lw: 0 });
    if (o.unit) T(o.unit, W / 2, H * (o.title ? .36 : .32), { size: Math.min(40 * u, W * .72 / Math.max(.01, textW(o.unit, 100, 'body', 800) / 100)), font: 'body', weight: 800, fill: soft(o), lw: 0 }); ctx.restore();
    const gn = Math.min(200, +o.gn || 0); if (gn && o.e) { const cols = Math.ceil(Math.sqrt(gn * (v ? .7 : 1.6))), rows = Math.ceil(gn / cols), gw = W * .86, gh = H * .3, s = Math.min(gw / cols, gh / rows), x0 = W / 2 - (cols - 1) * s / 2, y0 = H * .42 + s / 2; const hi = +o.hi || 0;
      for (let i = 0; i < gn; i++) { const kk = K(lt, at + .3 + i * (1.6 / gn), .3); if (kk <= 0) break; const cx = x0 + (i % cols) * s, cy = y0 + Math.floor(i / cols) * s; ctx.save(); ctx.globalAlpha *= kk * (hi && i >= hi ? .35 : 1); IFM.emoji(o.e, cx, cy, s * .92, {}); ctx.restore(); } }
    else if (o.e) { const p = pop(lt, at); ctx.save(); ctx.globalAlpha *= p.k; IFM.emoji(o.e, W / 2, H * .53 + idle(lt, 0), H * .2 * p.s, { ground: true }); ctx.restore(); } } }; };

  // ---------------------------------------------------------------- ex_chapter: a section card (signpost and a breath)
  A.ex_chapter = (o, c, dur) => ({ sfx: kitSfx(o), draw: lt => { const u = U(); bg({ bg: o.bg || 'night' }, lt); const k = K(lt, .2, .8), o2 = { bg: o.bg || 'night' };
    ctx.save(); ctx.globalAlpha *= k; if (o.n) { circ(W / 2, H * .3, 70 * u, P.yellow, 0); T(String(o.n), W / 2, H * .3 + 4 * u, { size: 80 * u, font: 'display', weight: 900, fill: INK, lw: 0 }); }
    T(o.title || '', W / 2, H * .42, { size: Math.min(80 * u, W * .72 / Math.max(.01, textW(o.title || '', 100, 'display', 900) / 100)), font: 'display', weight: 900, fill: ink(o2), lw: 0 }); if (o.sub) T(o.sub, W / 2, H * .47, { size: 34 * u, font: 'body', weight: 700, fill: soft(o2), lw: 0 }); ctx.restore();
    if (o.e) { const p = pop(lt, .6); ctx.save(); ctx.globalAlpha *= p.k; IFM.emoji(o.e, W / 2, H * .6 + idle(lt, 0), H * .14 * p.s, { ground: true }); ctx.restore(); } } });

  // ---------------------------------------------------------------- ex_quote: a real quotation, typed calmly
  A.ex_quote = (o, c, dur) => ({ sfx: kitSfx(o), draw: lt => { const u = U(); bg(o, lt); const L = split(o.q), all = L.join(' ').length, n = Math.floor(clamp(lt / Math.max(1, dur * .7)) * all);
    rr(W * .07, H * .14, W * .86, H * .5, 30 * u, dark(o) ? 'rgba(255,255,255,.07)' : 'rgba(255,255,255,.35)', 0); T('“', W * .16, H * .2, { size: 200 * u, font: 'display', weight: 900, fill: P.yellow, lw: 0 });
    let left = n; const sz = Math.min(62 * u, W * .72 / Math.max(.01, Math.max(...L.map(x => textW(x, 100, 'display', 800))) / 100)); L.forEach((ln, i) => { const s = ln.slice(0, Math.max(0, left)); left -= ln.length + 1; T(s, W * .13, H * (.27 + i * .065), { size: sz, font: 'display', weight: 800, fill: ink(o), lw: 0, align: 'left' }); });
    const k = K(lt, dur * .72, .6); if (k > 0 && o.by) { ctx.save(); ctx.globalAlpha *= k; T('— ' + o.by, W * .87, H * .6, { size: 32 * u, font: 'body', weight: 700, fill: soft(o), lw: 0, align: 'right' }); ctx.restore(); }
    if (o.e) IFM.emoji(o.e, W * .5, H * .68, H * .06, { alpha: .9 }); } });

  // ---------------------------------------------------------------- ex_timeline: dated things along a line, the camera moves with the story
  A.ex_timeline = (o, c, dur) => { const e = split(o.e), l = split(o.l), d = split(o.d), n = e.length, at = ats(o, c, n); return { sfx: kitSfx(o), draw: lt => { const u = U(); bg(o, lt); title(o, lt); const sp = W * .62;
    let cur = 0; for (let i = 0; i < n; i++) if (lt >= at[i] - .5) cur = i; const prev = Math.max(0, cur - 1), f = K(lt, at[cur] - .5, 1.1), off = -lerp(prev, cur, cur ? f : 0) * sp; const ly = H * .52;
    ctx.save(); ctx.strokeStyle = dark(o) ? '#4A5288' : '#C9BFA8'; ctx.lineWidth = 8 * u; ctx.beginPath(); ctx.moveTo(0, ly + H * .12); ctx.lineTo(W, ly + H * .12); ctx.stroke(); ctx.restore();
    for (let i = 0; i < n; i++) { const x = W / 2 + i * sp + off; if (x < -W * .5 || x > W * 1.5) continue; const p = pop(lt, at[i] - .3), hl = i === cur ? 1 : .45; ctx.save(); ctx.globalAlpha *= Math.max(.25, p.k) * hl; circ(x, ly + H * .12, 16 * u, P.yellow, 0); IFM.emoji(e[i], x, ly - H * .02 + idle(lt, i), H * .17, { ground: true });
      if (d[i]) T(d[i], x, ly + H * .17, { size: 40 * u, font: 'display', weight: 900, fill: ink(o), lw: 0 }); if (l[i]) T(l[i], x, ly - H * .14, { size: Math.min(44 * u, W * .5 / Math.max(.01, textW(l[i], 100, 'display', 900) / 100)), font: 'display', weight: 900, fill: ink(o), lw: 0 }); ctx.restore(); } } }; };
})();
