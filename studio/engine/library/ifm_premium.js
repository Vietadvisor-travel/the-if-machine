/* The If Machine — PREMIUM 2D (owner, 5 Nov 2026 night: "5/10 — still too plain, too many emoji icons, too few scenes drawn by hand,
   the type, the effects and the layout are not impressive yet. Make it much better.")
   IFM.PX = a small art-direction kit for drawn (not emoji) illustration, motion typography and finishing:
   TYPE   kicker · headline (masked line reveal, gold keyword with a marker sweep) · counter · callout (animated leader) · quote
   LIGHT  lit() gradient fills with a light direction, rim light, contact + drop shadows · glint (specular sweep) · rays · haze
   DRAWN  coin · note · tag · loaf · person (faceless, elegant, posed) · cow · sack · shell · cigarette · box · clock · bubble
   FINISH grain (cached), vignette, dust motes, depth blur of a cached layer
   Fonts: Unbounded 900 (display), Inter 800 (labels), Space Mono 700 (kickers), Playfair Display 900 (quotes) — all OFL, loaded by studio.html. */
'use strict';
(function () {
  if (!window.IFM) return; const PX = IFM.PX = {};
  const ease = t => E.inOut(clamp(t)), K = (lt, a, d = .6) => ease((lt - a) / d), KO = (lt, a, d = .6) => E.out5 ? E.out5(clamp((lt - a) / d)) : E.out(clamp((lt - a) / d)), KB = (lt, a, d = .7) => E.back(clamp((lt - a) / d));
  PX.K = K; PX.KO = KO; PX.KB = KB;
  const F = { disp: '"Unbounded", "Be Vietnam Pro", sans-serif', ui: '"Inter", "Be Vietnam Pro", sans-serif', mono: '"Space Mono", monospace', serif: '"Playfair Display", serif' };
  PX.F = F; const C = PX.C = { ink: '#14251C', paper: '#F6F1E4', gold: '#D9A441', gold2: '#F2CF7A', goldD: '#8C6420', green: '#2F5B43', green2: '#4E8A66', coral: '#E0654F', night: '#0D1328', cream: '#FBF7EC', sky: '#BFD6EA' };
  const font = (f, w, s) => `${w} ${s}px ${F[f] || f}`;
  PX.tw = (t, f, w, s) => { ctx.save(); ctx.font = font(f, w, s); const m = ctx.measureText(t).width; ctx.restore(); return m; };
  const text = (t, x, y, o = {}) => { ctx.save(); ctx.font = font(o.f || 'disp', o.w || 900, o.s || 40); ctx.textAlign = o.align || 'center'; ctx.textBaseline = 'middle'; if (o.ls) ctx.letterSpacing = o.ls + 'px'; ctx.globalAlpha *= o.a ?? 1;
    if (o.shadow) { ctx.shadowColor = o.shadow; ctx.shadowBlur = o.sb || 18; ctx.shadowOffsetY = o.sy || 4; } if (o.stroke) { ctx.lineWidth = o.lw || 4; ctx.strokeStyle = o.stroke; ctx.lineJoin = 'round'; ctx.strokeText(t, x, y); } ctx.fillStyle = o.fill || C.ink; ctx.fillText(t, x, y); ctx.restore(); };
  PX.text = text;
  const fitS = (t, f, w, s, max) => Math.min(s, s * max / Math.max(1, PX.tw(t, f, w, s)));

  // ================================================================ TYPE
  // kicker: small mono caps with a gold rule that draws in — "CHAPTER 01 · WHAT MONEY DOES"
  PX.kicker = (t, x, y, lt, at = .1, o = {}) => { const u = U(), k = K(lt, at, .6), s = (o.s || 24) * u, col = o.col || C.gold; if (k <= 0) return; const tw = PX.tw(t, 'mono', 700, s) + t.length * 3 * u, x0 = o.align === 'left' ? x : x - tw / 2;
    ctx.save(); ctx.globalAlpha *= k; line(x0 - 70 * u * k, y, x0 - 18 * u, y, 3 * u, col); text(t, x0, y + 1, { f: 'mono', w: 700, s, fill: col, align: 'left', ls: 3 * u }); ctx.restore(); };
  // headline: lines revealed through a mask, rising; words wrapped in *stars* turn gold with a marker sweep behind them
  PX.headline = (lines, x, y, lt, at = .2, o = {}) => { const u = U(), L = (Array.isArray(lines) ? lines : String(lines).split('|')), maxW = (o.maxW || .8) * W; let s = (o.s || 76) * u;
    L.forEach(l => { s = Math.min(s, fitS(l.replace(/\*/g, ''), 'disp', 900, s, maxW)); }); const lh = s * 1.08, al = o.align || 'center', y0 = y - (L.length - 1) * lh / 2;
    L.forEach((l, i) => { const t0 = at + i * .14, k = KO(lt, t0, .7); if (k <= 0) return; const yy = y0 + i * lh, plain = l.replace(/\*/g, ''), w = PX.tw(plain, 'disp', 900, s), xs = al === 'left' ? x : al === 'right' ? x - w : x - w / 2;
      // reveal (the ElevenLabs lesson): each line rises through a mask while it comes into focus — from a soft blur to sharp,
      // its tracking closing in; o.reveal = 'mask' keeps the old plain rise
      const kb = K(lt, t0, .9), blurPx = o.reveal === 'mask' ? 0 : (1 - kb) * 14 * u;
      ctx.save(); ctx.beginPath(); ctx.rect(xs - 60 * u, yy - lh * .75, w + 120 * u, lh * 1.4); ctx.clip(); ctx.translate(0, (1 - k) * lh * (o.reveal === 'mask' ? 1 : .35)); if (blurPx > .3) ctx.filter = `blur(${blurPx.toFixed(1)}px)`; ctx.globalAlpha *= o.reveal === 'mask' ? 1 : clamp(kb * 1.3);
      // gold words: a marker sweep under them
      let cx = xs; for (const [j, part] of l.split('*').entries()) { if (!part) continue; const pw = PX.tw(part, 'disp', 900, s); if (j % 2) { const m = K(lt, t0 + .45, .5); ctx.save(); ctx.globalAlpha *= .9; rr(cx - 6 * u, yy - s * .16, (pw + 12 * u) * m, s * .5, 6 * u, o.marker || 'rgba(217,164,65,.28)', 0); ctx.restore(); }
        text(part, cx, yy, { f: 'disp', w: 900, s, fill: j % 2 ? (o.hi || C.gold) : (o.col || C.ink), align: 'left', shadow: o.shadow, sb: 24 * u, sy: 6 * u }); cx += pw; } ctx.restore(); }); return y0 + L.length * lh; };
  // counter: a big number counting to v with tabular steps, unit underneath
  PX.counter = (v, x, y, lt, at, o = {}) => { const u = U(), k = clamp((lt - at) / (o.d || 1.4)), e = E.out(k), val = v * e, dec = o.dec ?? (v % 1 ? 2 : 0), str = (o.pre || '') + val.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + (o.post || '');
    if (lt < at) return; text(str, x, y, { f: 'disp', w: 900, s: (o.s || 120) * u, fill: o.col || C.ink, shadow: o.shadow }); if (o.unit) text(o.unit, x, y + (o.s || 120) * u * .62, { f: 'ui', w: 800, s: 30 * u, fill: o.ucol || '#4E6B57' }); };
  // callout: a ring pulses on the anchor, a leader draws to a clean label (fixed position, never follows moving things)
  PX.callout = (t, ax, ay, lx, ly, lt, at, o = {}) => { const u = U(), k = K(lt, at, .5), k2 = K(lt, at + .3, .45); if (k <= 0) return; const col = o.col || C.gold, s = (o.s || 30) * u, tw = PX.tw(t, 'ui', 800, s) + 28 * u, dark = o.dark;
    ctx.save(); ctx.globalAlpha *= k; const pr = ((lt - at) % 1.6) / 1.6; ctx.strokeStyle = col; ctx.lineWidth = 3 * u; ctx.globalAlpha *= 1; ctx.beginPath(); ctx.arc(ax, ay, 10 * u + pr * 22 * u, 0, TAU); ctx.globalAlpha = k * (1 - pr) * .8; ctx.stroke(); ctx.globalAlpha = k; circ(ax, ay, 8 * u, col, 0); circ(ax, ay, 3.5 * u, dark ? C.night : '#fff', 0);
    const ex = lx + (lx > ax ? -tw / 2 : tw / 2) * (Math.abs(lx - ax) > tw / 2 ? 1 : 0), mx = lerp(ax, ex, k2), my = lerp(ay, ly, k2); line(ax, ay, mx, my, 2.5 * u, col);
    if (k2 > .05) { ctx.globalAlpha = k * k2; ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 16 * u; ctx.shadowOffsetY = 4 * u; rr(lx - tw / 2, ly - s * .85, tw, s * 1.7, s * .85, dark ? 'rgba(13,19,40,.88)' : 'rgba(255,253,246,.96)', 0); ctx.shadowColor = 'transparent';
      text(t, lx, ly + 1, { f: 'ui', w: 800, s, fill: dark ? '#F6F1E4' : C.ink, ls: 1.5 * u }); } ctx.restore(); };
  // quote: big gold marks, serif words fading in one by one
  PX.quote = (q, by, x, y, lt, at, dur, o = {}) => { const u = U(), words = q.split(' '), maxW = W * .78, s = (o.s || 56) * u; ctx.save(); ctx.font = font('serif', 900, s); const lines = [[]]; for (const w of words) { const t = [...lines[lines.length - 1], w].join(' '); if (ctx.measureText(t).width > maxW && lines[lines.length - 1].length) lines.push([w]); else lines[lines.length - 1].push(w); } ctx.restore();
    const n = words.length, per = Math.max(.08, (dur * .7) / n); let wi = 0; const lh = s * 1.25, y0 = y - (lines.length - 1) * lh / 2; text('“', x - maxW / 2 - 10 * u, y0 - lh * .9, { f: 'serif', w: 900, s: s * 3.2, fill: C.gold, align: 'left', a: K(lt, at - .3, .5) });
    lines.forEach((ln, i) => { let cx = x - maxW / 2; for (const w of ln) { const k = K(lt, at + wi * per, .35); ctx.save(); ctx.font = font('serif', 900, s); const ww = ctx.measureText(w + ' ').width; ctx.restore(); if (k > 0) text(w, cx, y0 + i * lh + (1 - k) * 10 * u, { f: 'serif', w: 900, s, fill: o.col || C.ink, align: 'left', a: k }); cx += ww; wi++; } });
    if (by) { const kb = K(lt, at + n * per + .2, .6); if (kb > 0) { line(x + maxW / 2 - 260 * u, y0 + lines.length * lh + 6 * u, x + maxW / 2 - 200 * u, y0 + lines.length * lh + 6 * u, 3 * u, C.gold); text(by, x + maxW / 2, y0 + lines.length * lh + 8 * u, { f: 'mono', w: 700, s: 24 * u, fill: o.bcol || '#4E6B57', align: 'right', a: kb }); } } };

  // ================================================================ LIGHT
  // fill the current path with a light-direction gradient (top-left light), optional rim and drop shadow
  PX.lit = (pathFn, col, o = {}) => { const u = U(), [x, y, w, h] = o.box || [0, 0, W, H]; ctx.save(); if (o.drop !== false) { ctx.save(); ctx.shadowColor = o.dropCol || 'rgba(16,22,18,.28)'; ctx.shadowBlur = (o.db || 28) * u; ctx.shadowOffsetY = (o.dy || 14) * u; ctx.beginPath(); pathFn(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); }
    const g = ctx.createLinearGradient(x, y, x + w * (o.lx ?? .35), y + h); g.addColorStop(0, shade(col, o.hi ?? .16)); g.addColorStop(.55, col); g.addColorStop(1, shade(col, -(o.lo ?? .22))); ctx.beginPath(); pathFn(); ctx.fillStyle = g; ctx.fill();
    if (o.rim !== false) { ctx.save(); ctx.clip(); ctx.beginPath(); pathFn(); ctx.lineWidth = (o.rw || 5) * u; ctx.strokeStyle = 'rgba(255,255,255,' + (o.rim ?? .35) + ')'; ctx.translate(-2 * u, -2 * u); ctx.stroke(); ctx.restore(); } ctx.restore(); };
  PX.contact = (x, y, rx, a = .28) => { ctx.save(); const g = ctx.createRadialGradient(x, y, 0, x, y, rx); g.addColorStop(0, `rgba(10,16,12,${a})`); g.addColorStop(1, 'rgba(10,16,12,0)'); ctx.fillStyle = g; ctx.translate(x, y); ctx.scale(1, .22); ctx.translate(-x, -y); ctx.beginPath(); ctx.arc(x, y, rx, 0, TAU); ctx.fill(); ctx.restore(); };
  PX.glint = (x, y, s, lt, at, per = 3) => { const q = ((lt - at) % per) / .5; if (lt < at || q > 1) return; const u = U(), a = Math.sin(q * Math.PI); ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = '#FFF6D8';
    ctx.beginPath(); for (let i = 0; i < 8; i++) { const r = i % 2 ? s * .12 : s, ang = i * Math.PI / 4 + q; ctx.lineTo(x + Math.cos(ang) * r, y + Math.sin(ang) * r); } ctx.fill(); ctx.restore(); };
  PX.rays = (x, y, len, lt, a = .12, col = '#FFF1C8', n = 9) => { ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < n; i++) { const ang = i / n * TAU + lt * .05, w = .09; const g = ctx.createRadialGradient(x, y, 0, x, y, len); g.addColorStop(0, rgba(col, a)); g.addColorStop(1, rgba(col, 0)); ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, len, ang - w, ang + w); ctx.closePath(); ctx.fill(); } ctx.restore(); };
  PX.haze = (y0, y1, col, a = .5) => { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, rgba(col, 0)); g.addColorStop(1, rgba(col, a)); ctx.fillStyle = g; ctx.fillRect(0, y0, W, y1 - y0); };

  // ================================================================ FINISH
  const GR = {}; PX.grain = (a = .05) => { const k = W + 'x' + H; if (!GR[k]) { const cv = mkCanvas(W, H), g = cv.getContext('2d'), id = g.createImageData(W, H), r = rng(77); for (let i = 0; i < id.data.length; i += 4) { const v = r() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } g.putImageData(id, 0, 0); GR[k] = cv; }
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(GR[k], 0, 0); ctx.restore(); };
  PX.vignette = (a = .35, col = '#0A0E1C') => { const g = ctx.createRadialGradient(W / 2, H * .45, H * .25, W / 2, H * .45, H * .8); g.addColorStop(0, rgba(col, 0)); g.addColorStop(1, rgba(col, a)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); };
  PX.motes = (lt, n = 22, col = '#FFF4D6', a = .25, seed = 3) => { const u = U(); for (let i = 0; i < n; i++) { const r = rng(seed * 100 + i), x = W * r() + Math.sin(lt * .3 + i) * 24 * u, y = ((H * r() - lt * (6 + 12 * r()) * u) % H + H) % H, s = (2 + 5 * r()) * u; ctx.save(); ctx.globalAlpha = a * (.5 + .5 * Math.sin(lt * .8 + i)); circ(x, y, s, col, 0); ctx.restore(); } };
  // soft gradient orbs (the ElevenLabs look): a few large blurred colour fields drifting slowly behind everything; screen-blended
  PX.orbs = (lt, cols = ['#3E6A8A', '#D9A441', '#2F5B43'], a = .35, o = {}) => { const u = U(); ctx.save(); ctx.globalCompositeOperation = o.mode || 'screen'; cols.forEach((c, i) => { const r = rng(i * 7 + 3), x = W * (.2 + .6 * r()) + Math.sin(lt * .13 + i * 2) * W * .12, y = H * (.25 + .5 * r()) + Math.cos(lt * .11 + i) * H * .08, R = W * (.45 + .25 * r());
      const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, rgba(c, a)); g.addColorStop(1, rgba(c, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }); ctx.restore(); };
  PX.finish = (lt, o = {}) => { PX.vignette(o.vig ?? .3, o.vcol); PX.grain(o.grain ?? .045); };
  const CH = {}; PX.cache = (key, fn, blur) => { const k = key + W + 'x' + H + (blur || 0); if (!CH[k]) { const cv = mkCanvas(W, H); withCtx(cv.getContext('2d'), fn); if (blur) { const b = mkCanvas(W, H), bg = b.getContext('2d'); bg.filter = `blur(${blur}px)`; bg.drawImage(cv, 0, 0); CH[k] = b; } else CH[k] = cv; } return CH[k]; };
  // soft gradient backdrop with a light pool (studio look)
  PX.backdrop = (top, bot, o = {}) => { const k = 'bd' + top + bot + (o.pool || ''); ctx.drawImage(PX.cache(k, () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const p = ctx.createRadialGradient(W / 2, H * (o.py || .42), 0, W / 2, H * (o.py || .42), W * .9); p.addColorStop(0, rgba(o.pool || '#FFFFFF', .35)); p.addColorStop(1, rgba(o.pool || '#FFFFFF', 0)); ctx.fillStyle = p; ctx.fillRect(0, 0, W, H); }), 0, 0); };

  // ================================================================ DRAWN OBJECTS (all centred at x, y; s = size in px)
  // a gold coin; flip = 0..1 turns it (scaleX = cos), spin shows the edge
  PX.coin = (x, y, r, lt, o = {}) => { const u = U(), sx = o.sx ?? 1, col = o.col || C.gold; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
    if (o.shadow !== false) PX.contact(0, r * 1.08, r * .9, .3); ctx.scale(sx, 1);
    const edge = Math.max(0, (1 - Math.abs(sx))) * r * .18 + r * .06; rr(-r, -r + edge * .5, r * 2, r * 2, r, shade(col, -.35), 0);
    const g = ctx.createLinearGradient(-r, -r, r * .6, r); g.addColorStop(0, '#FCE7A6'); g.addColorStop(.45, col); g.addColorStop(1, shade(col, -.3)); circ(0, 0, r, g, 0);
    ctx.strokeStyle = shade(col, -.25); ctx.lineWidth = r * .04; for (let i = 0; i < 48; i++) { const a = i / 48 * TAU; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * .9, Math.sin(a) * r * .9); ctx.lineTo(Math.cos(a) * r * .98, Math.sin(a) * r * .98); ctx.stroke(); }
    ctx.lineWidth = r * .035; ctx.strokeStyle = 'rgba(255,240,190,.8)'; ctx.beginPath(); ctx.arc(0, 0, r * .8, 0, TAU); ctx.stroke();
    // relief: a classical building
    ctx.fillStyle = shade(col, -.28); poly([[-r * .42, -r * .18], [0, -r * .44], [r * .42, -r * .18]], shade(col, -.28), 0); for (let i = 0; i < 4; i++) rr(-r * .34 + i * r * .2, -r * .14, r * .1, r * .4, 2, shade(col, -.28), 0); rr(-r * .44, r * .28, r * .88, r * .08, 2, shade(col, -.28), 0);
    ctx.globalAlpha = .55; ctx.fillStyle = 'rgba(255,250,220,.9)'; poly([[-r * .42, -r * .2], [0, -r * .46], [0, -r * .4], [-r * .36, -r * .2]], 'rgba(255,250,220,.6)', 0); ctx.globalAlpha = 1;
    // specular
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip(); const sw = ((lt * .35 + (o.ph || 0)) % 1.6) - .3; const sg = ctx.createLinearGradient(-r + sw * r * 2.4 - r * .3, -r, -r + sw * r * 2.4 + r * .3, r); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(.5, 'rgba(255,255,255,.45)'); sg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = sg; ctx.fillRect(-r, -r, r * 2, r * 2); ctx.restore();
    ctx.restore(); };
  // a generic engraved banknote (no real currency); w = width
  const NOTE = {}; PX.note = (x, y, w, lt, o = {}) => { const h = w * .46, k = Math.round(w) + 'n'; if (!NOTE[k]) { const cv = mkCanvas(Math.ceil(w), Math.ceil(h)), g = cv.getContext('2d'); const GREEN = '#2F5B43', GOLD = '#B8923C';
      g.fillStyle = '#E7EBD6'; g.beginPath(); g.roundRect(0, 0, w, h, h * .05); g.fill(); g.save(); g.clip(); g.lineWidth = Math.max(1, w / 600); g.strokeStyle = GREEN;
      for (const [cx, cy, R] of [[w * .5, h * .5, h * .46], [w * .15, h * .5, h * .3], [w * .85, h * .5, h * .3]]) for (let q = 0; q < 20; q++) { g.globalAlpha = .17; g.beginPath(); for (let a = 0; a <= TAU + .01; a += .03) { const r = R * (.5 + q * .024) * (1 + .12 * Math.sin(8 * a + q * .4)); a ? g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r) : g.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } g.stroke(); }
      g.restore(); g.globalAlpha = 1; g.strokeStyle = GOLD; g.lineWidth = w / 120; g.strokeRect(w * .03, h * .06, w * .94, h * .88); g.fillStyle = GREEN; g.font = `900 ${h * .24}px "Unbounded", sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('100', w * .15, h * .52); g.fillText('100', w * .85, h * .52);
      g.font = `700 ${h * .07}px "Space Mono", monospace`; g.fillText('ONE HUNDRED', w * .5, h * .84); g.fillStyle = '#F4F1DE'; g.beginPath(); g.ellipse(w * .5, h * .48, h * .25, h * .25, 0, 0, TAU); g.fill(); g.strokeStyle = GREEN; g.lineWidth = w / 300; g.stroke();
      g.fillStyle = GREEN; g.beginPath(); g.moveTo(w * .5 - h * .14, h * .44); g.lineTo(w * .5, h * .33); g.lineTo(w * .5 + h * .14, h * .44); g.fill(); for (let i = 0; i < 4; i++) g.fillRect(w * .5 - h * .12 + i * h * .075, h * .46, h * .04, h * .14); g.fillRect(w * .5 - h * .15, h * .6, h * .3, h * .03); NOTE[k] = cv; }
    const u = U(); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(o.sx ?? 1, o.sy ?? 1); if (o.shadow !== false) { ctx.shadowColor = 'rgba(10,20,14,.3)'; ctx.shadowBlur = 24 * u; ctx.shadowOffsetY = 12 * u; } ctx.globalAlpha *= o.a ?? 1; ctx.drawImage(NOTE[k], -w / 2, -h / 2); ctx.shadowColor = 'transparent';
    if (o.sheen !== false) { ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); const sw = ((lt * .25 + (o.ph || 0)) % 1.8) - .4; const g = ctx.createLinearGradient(-w / 2 + sw * w - w * .2, -h / 2, -w / 2 + sw * w + w * .2, h / 2); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(.5, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.restore(); } ctx.restore(); };
  // a paper price tag with a string hole; text on it
  PX.tag = (x, y, w, t, lt, o = {}) => { const u = U(), h = w * .5; ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0);
    const path = () => { ctx.moveTo(-w / 2 + h * .4, -h / 2); ctx.lineTo(w / 2 - 8 * u, -h / 2); ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + 8 * u); ctx.lineTo(w / 2, h / 2 - 8 * u); ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - 8 * u, h / 2); ctx.lineTo(-w / 2 + h * .4, h / 2); ctx.lineTo(-w / 2, 0); ctx.closePath(); };
    PX.lit(path, o.col || '#F7D35B', { box: [-w / 2, -h / 2, w, h], db: 22, dy: 10 }); circ(-w / 2 + h * .32, 0, h * .09, shade(o.col || '#F7D35B', -.35), 0); circ(-w / 2 + h * .32, -2 * u, h * .06, '#FFF8E2', 0);
    if (t) text(t, h * .2, 3 * u, { f: 'disp', w: 900, s: Math.min(h * .52, (w - h * .8) / Math.max(1, t.length * .62)), fill: C.ink }); ctx.restore(); };
  // a crusty loaf: dome, scoring, flour
  PX.loaf = (x, y, s, lt, o = {}) => { const u = U(); PX.contact(x, y + s * .26, s * .55, .32); const path = () => { ctx.moveTo(x - s * .5, y + s * .22); ctx.bezierCurveTo(x - s * .55, y - s * .25, x - s * .2, y - s * .36, x, y - s * .36); ctx.bezierCurveTo(x + s * .25, y - s * .36, x + s * .55, y - s * .25, x + s * .5, y + s * .22); ctx.closePath(); };
    PX.lit(path, '#C98A47', { box: [x - s / 2, y - s * .4, s, s * .6], db: 18, dy: 8 }); ctx.save(); ctx.strokeStyle = '#F2D29A'; ctx.lineWidth = s * .035; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const cx = x - s * .2 + i * s * .2; ctx.beginPath(); ctx.moveTo(cx - s * .07, y - s * .05); ctx.quadraticCurveTo(cx, y - s * .2, cx + s * .1, y - s * .22); ctx.stroke(); }
    const r = rng(9); ctx.fillStyle = 'rgba(255,248,235,.55)'; for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(x + (r() - .5) * s * .6, y - s * .2 + r() * s * .15, s * .008 + r() * s * .01, 0, TAU); ctx.fill(); } ctx.restore(); };
  // an elegant faceless person: rounded torso, head, neck, arms; poses stand | walk | hold | raise | sit; col = clothing
  PX.person = (x, y, h, lt, o = {}) => { const u = U(), col = o.col || '#3E6A8A', skin = o.skin || ['#E9B998', '#C98D6A', '#8A5A3E', '#F2CDB0'][(o.seed || 0) % 4], hair = o.hair || ['#2B211C', '#5A3A22', '#1B1B22', '#B7A28A'][(o.seed || 1) % 4], pose = o.pose || 'stand', f = o.flip ? -1 : 1, ph = (o.seed || 0) * 1.7;
    const sway = pose === 'walk' ? Math.sin(lt * 5 + ph) : 0, bob = pose === 'walk' ? Math.abs(Math.sin(lt * 5 + ph)) * h * .012 : Math.sin(lt * 1.2 + ph) * h * .004;
    ctx.save(); ctx.translate(x, y - bob); ctx.scale(f, 1); if (o.shadow !== false) PX.contact(0, bob, h * .2, .25);
    // legs
    const legC = o.legs || shade(col, -.35); ctx.lineCap = 'round'; ctx.strokeStyle = legC; ctx.lineWidth = h * .075; ctx.beginPath(); ctx.moveTo(-h * .045, -h * .42); ctx.lineTo(-h * .05 + sway * h * .05, -h * .02); ctx.moveTo(h * .045, -h * .42); ctx.lineTo(h * .05 - sway * h * .05, -h * .02); ctx.stroke();
    // torso
    const tp = () => { ctx.moveTo(-h * .11, -h * .4); ctx.quadraticCurveTo(-h * .13, -h * .72, -h * .06, -h * .74); ctx.lineTo(h * .06, -h * .74); ctx.quadraticCurveTo(h * .13, -h * .72, h * .11, -h * .4); ctx.closePath(); };
    PX.lit(tp, col, { box: [-h * .13, -h * .76, h * .26, h * .38], drop: false, rw: 3 });
    // arms
    ctx.strokeStyle = shade(col, -.1); ctx.lineWidth = h * .055; const arm = (sx, ex, ey) => { ctx.beginPath(); ctx.moveTo(sx, -h * .69); ctx.quadraticCurveTo(sx * 1.4, -h * .58, ex, ey); ctx.stroke(); circ(ex, ey, h * .03, skin, 0); };
    if (pose === 'raise') { arm(-h * .1, -h * .2, -h * .92); arm(h * .1, h * .2, -h * .92); } else if (pose === 'hold') { arm(-h * .1, -h * .02, -h * .5); arm(h * .1, h * .05, -h * .5); } else { arm(-h * .1, -h * .14 - sway * h * .04, -h * .44); arm(h * .1, h * .14 + sway * h * .04, -h * .44); }
    // head
    rr(-h * .025, -h * .8, h * .05, h * .06, 2, shade(skin, -.12), 0); const hg = ctx.createLinearGradient(-h * .08, -h * .95, h * .08, -h * .8); hg.addColorStop(0, shade(skin, .1)); hg.addColorStop(1, shade(skin, -.12)); circ(0, -h * .875, h * .085, hg, 0);
    ctx.fillStyle = hair; ctx.beginPath(); ctx.arc(0, -h * .89, h * .088, Math.PI * 1.05, Math.PI * 2.02); ctx.fill(); if ((o.seed || 0) % 3 === 1) { ctx.beginPath(); ctx.ellipse(-h * .07, -h * .84, h * .03, h * .07, .2, 0, TAU); ctx.fill(); }
    if (o.hat === 'chef') { rr(-h * .08, -h * 1.02, h * .16, h * .07, 3, '#FFFFFF', 0); circ(-h * .05, -h * 1.05, h * .05, '#FFFFFF', 0); circ(h * .03, -h * 1.07, h * .06, '#FFFFFF', 0); }
    if (o.hat === 'farmer') { ell(0, -h * .95, h * .16, h * .03, '#C9A15A', 0); rr(-h * .08, -h * 1.03, h * .16, h * .08, h * .04, '#D7B46A', 0); }
    if (o.item) { ctx.save(); ctx.scale(f, 1); o.item(0, -h * .52, h); ctx.restore(); }
    ctx.restore(); };
  // a stylised cow (side view): body, head, legs, spots
  PX.cow = (x, y, s, lt, o = {}) => { const u = U(); ctx.save(); ctx.translate(x, y); ctx.scale(o.flip ? -1 : 1, 1); PX.contact(0, 0, s * .5, .28); const b = Math.sin(lt * 1.3) * s * .005;
    ctx.fillStyle = '#4A3A30'; for (const lx of [-.3, -.18, .2, .32]) rr(s * lx - s * .035, -s * .3, s * .07, s * .3, s * .02, '#3D3029', 0);
    PX.lit(() => { ctx.ellipse(0, -s * .38 + b, s * .42, s * .2, 0, 0, TAU); }, '#F4EFE6', { box: [-s * .42, -s * .58, s * .84, s * .4], db: 14, dy: 6 });
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, -s * .38 + b, s * .42, s * .2, 0, 0, TAU); ctx.clip(); ctx.fillStyle = '#2E2A2A'; for (const [sx, sy, r] of [[-.2, -.45, .1], [.08, -.32, .12], [.25, -.5, .07]]) { ctx.beginPath(); ctx.ellipse(s * sx, s * sy, s * r, s * r * .8, .4, 0, TAU); ctx.fill(); } ctx.restore();
    PX.lit(() => { ctx.ellipse(s * .44, -s * .5 + b, s * .12, s * .11, -.3, 0, TAU); }, '#F4EFE6', { box: [s * .32, -s * .62, s * .24, s * .22], drop: false });
    ell(s * .52, -s * .45 + b, s * .07, s * .05, '#E9A6A0', 0, -.2); ell(s * .38, -s * .62 + b, s * .05, s * .025, '#3D3029', 0, -.6); circ(s * .45, -s * .53 + b, s * .015, '#1B1B1B', 0); ctx.strokeStyle = '#3D3029'; ctx.lineWidth = s * .02; ctx.beginPath(); ctx.moveTo(-s * .42, -s * .42); ctx.quadraticCurveTo(-s * .52, -s * .3, -s * .48, -s * .2 + Math.sin(lt * 2) * s * .02); ctx.stroke(); ctx.restore(); };
  // a grain sack, tied at the top
  PX.sack = (x, y, s, lt, o = {}) => { PX.contact(x, y, s * .4, .3); PX.lit(() => { ctx.moveTo(x - s * .32, y); ctx.bezierCurveTo(x - s * .42, y - s * .5, x - s * .2, y - s * .78, x - s * .1, y - s * .78); ctx.lineTo(x + s * .1, y - s * .78); ctx.bezierCurveTo(x + s * .2, y - s * .78, x + s * .42, y - s * .5, x + s * .32, y); ctx.closePath(); }, o.col || '#D2B07A', { box: [x - s * .4, y - s * .8, s * .8, s * .8], db: 16, dy: 6 });
    ctx.save(); ctx.strokeStyle = '#8A6A3A'; ctx.lineWidth = s * .04; ctx.beginPath(); ctx.moveTo(x - s * .12, y - s * .72); ctx.lineTo(x + s * .12, y - s * .72); ctx.stroke(); ctx.fillStyle = '#E9D9A8'; ctx.beginPath(); ctx.ellipse(x, y - s * .82, s * .14, s * .06, 0, 0, TAU); ctx.fill(); for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(x - s * .1 + i * s * .025, y - s * .86 - (i % 3) * s * .02, s * .018, s * .03, .3, 0, TAU); ctx.fillStyle = '#E2C77E'; ctx.fill(); } ctx.restore(); if (o.label) text(o.label, x, y - s * .35, { f: 'mono', w: 700, s: s * .12, fill: '#6B4E28' }); };
  // a cowrie shell
  PX.shell = (x, y, s, lt, o = {}) => { PX.contact(x, y + s * .3, s * .4, .25); PX.lit(() => { ctx.ellipse(x, y, s * .38, s * .26, o.rot || 0, 0, TAU); }, '#F1E4CC', { box: [x - s * .4, y - s * .3, s * .8, s * .6], db: 12, dy: 5 }); ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); rr(-s * .3, -s * .03, s * .6, s * .06, s * .03, '#8A6A4A', 0); ctx.strokeStyle = '#F8F1E2'; ctx.lineWidth = s * .02; for (let i = -5; i <= 5; i++) { ctx.beginPath(); ctx.moveTo(i * s * .05, -s * .02); ctx.lineTo(i * s * .052, -s * .07); ctx.stroke(); } ctx.restore(); };
  // a cigarette
  PX.cigarette = (x, y, s, lt, o = {}) => { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); PX.contact(0, s * .08, s * .55, .22); PX.lit(() => { ctx.roundRect(-s * .5, -s * .05, s * .7, s * .1, s * .02); }, '#F6F3EC', { box: [-s * .5, -s * .05, s * .7, s * .1], db: 10, dy: 4 }); PX.lit(() => { ctx.roundRect(s * .2, -s * .05, s * .3, s * .1, s * .02); }, '#D9944A', { box: [s * .2, -s * .05, s * .3, s * .1], drop: false }); for (let i = 0; i < 6; i++) circ(s * .25 + i * s * .045, (i % 2 - .5) * s * .03, s * .008, '#B5733A', 0); ctx.restore(); };
  // a cardboard box (closed or open)
  PX.box = (x, y, w, lt, o = {}) => { const h = w * .55, open = o.open ?? 0, u = U(); PX.contact(x, y + h / 2, w * .6, .35); PX.lit(() => { ctx.rect(x - w / 2, y - h / 2, w, h); }, '#C08F57', { box: [x - w / 2, y - h / 2, w, h] }); ctx.save(); ctx.strokeStyle = 'rgba(90,60,30,.35)'; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.moveTo(x, y - h / 2); ctx.lineTo(x, y + h / 2); ctx.stroke(); ctx.restore();
    rr(x - w * .12, y - h / 2, w * .24, h, 0, 'rgba(230,210,160,.45)', 0); const top = y - h / 2, fh = h * .62 * open; if (open > .02) { rr(x - w / 2 + 6 * u, top - 2, w - 12 * u, 10 * u, 2, 'rgba(40,25,10,.55)', 0); for (const sd of [-1, 1]) { const p1 = [x, top], p2 = [x + sd * w / 2, top], p3 = [x + sd * (w / 2 + w * .2 * open), top - fh * .85], p4 = [x + sd * w * .06 * open, top - fh]; PX.lit(() => { ctx.moveTo(...p1); ctx.lineTo(...p2); ctx.lineTo(...p3); ctx.lineTo(...p4); ctx.closePath(); }, sd < 0 ? '#D4A56B' : '#B5854E', { drop: false, box: [Math.min(p1[0], p3[0]), top - fh, Math.abs(p3[0] - p1[0]) + 1, fh + 1] }); } }
    if (o.label) text(o.label, x, y + h * .12, { f: 'mono', w: 700, s: Math.min(w * .05, 26 * u), fill: '#5A3F22' }); };
  // a clean analog clock
  PX.clock = (x, y, r, lt, o = {}) => { const u = U(); PX.lit(() => { ctx.arc(x, y, r * 1.12, 0, TAU); }, '#F4EEDC', { box: [x - r, y - r, r * 2, r * 2] }); circ(x, y, r, '#FFFFFF', 0); for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line(x + Math.cos(a) * r * .82, y + Math.sin(a) * r * .82, x + Math.cos(a) * r * (i % 3 ? .9 : .94), y + Math.sin(a) * r * (i % 3 ? .9 : .94), (i % 3 ? 3 : 6) * u, C.ink); }
    const m = lt * (o.speed || 1.6), hh = lt * (o.speed || 1.6) / 12; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.ink; ctx.lineWidth = 8 * u; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(hh) * r * .5, y - Math.cos(hh) * r * .5); ctx.stroke(); ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.sin(m) * r * .76, y - Math.cos(m) * r * .76); ctx.stroke(); ctx.restore(); circ(x, y, 7 * u, C.coral, 0); };
  // a speech / thought bubble with a tail toward (tx, ty)
  PX.bubble = (x, y, w, h, tx, ty, o = {}) => { const u = U(); ctx.save(); ctx.shadowColor = 'rgba(10,20,14,.22)'; ctx.shadowBlur = 26 * u; ctx.shadowOffsetY = 10 * u; ctx.fillStyle = o.col || '#FFFFFF'; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h / 2, w, h, Math.min(h * .45, 40 * u)); ctx.fill();
    if (o.think) { ctx.beginPath(); ctx.arc(lerp(x, tx, .55), lerp(y + h / 2, ty, .55), 11 * u, 0, TAU); ctx.arc(lerp(x, tx, .82), lerp(y + h / 2, ty, .82), 6 * u, 0, TAU); ctx.fill(); } else { ctx.beginPath(); ctx.moveTo(x - w * .08, y + h / 2 - 2); ctx.lineTo(tx, ty); ctx.lineTo(x + w * .06, y + h / 2 - 2); ctx.fill(); } ctx.restore(); };
})();
