/* IFM.CT — the cartoon toolkit for episode scenes (owner, 10–11 Nov 2026: "a real cartoon: every scene designed, varied 2D camera
   angles, wow; more visual and creative; NO overlapping elements or captions").
   · CT.rig(lt, keys, fn)      a camera inside a scene: keys [t, x, y, zoom, roll, 'cut'?]; eases between framings or hard-cuts.
   · CT.begin(o, lt, dark)     start of a frame: clears the layout registry, reserves the title box (while the title is up) and the caption band.
   · CT.sign(text, x, y, size, lt, at, {bg, col, rot})   a sticker label that NEVER overlaps the title, the caption band or another sign:
                               it is nudged to the nearest free place (in screen space, whatever the camera does).
   · CT.end(o, lt, dark, vig)  end of a frame: the house title (o.tt "LINE|*GOLD*", o.kk kicker, leaves after o.tout s), a calm shade
                               behind the caption band (72–81 %), grain + vignette.
   · CT.dark(alpha, holes, col)     real darkness with holes of light: {x, y, r} pools and {x, y, a, w, len} cones (torch, lamp, eyes).
   · CT.thermal(fn, y0, y1, glow)   heat-sight: whatever fn draws becomes a glowing thermal silhouette (white-hot top → magenta → violet).
   · CT.tint(mode)             look through another eye over what is already drawn: 'cat' (silver-blue, low colour), 'nvg' (green), 'grey'.
   · CT.soft(fn, k)            draws fn out of focus (rendered small, scaled up).
   · CT.photon(x, y, r, col) · CT.stars(n, seed, a, y1) · CT.txt / CT.mono · CT.ph / CT.pb (eased 0..1 from a time) · CT.T0(c, k, d). */
'use strict';
(function () {
  if (!window.IFM || !IFM.CAST || !IFM.CAST.kit || !IFM.PX) return;
  const CR = IFM.CAST, KIT = CR.kit, X = IFM.PX, CT = IFM.CT = {}, INK = '#26233A';
  const ph = (lt, a, d = .6) => E.inOut(clamp((lt - a) / d)), pb = (lt, a, d = .6) => E.back(clamp((lt - a) / d)), T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d;
  const txt = (t, x, y, s, col = INK, f = 'Paytone One', w = 400) => { ctx.save(); ctx.font = `${w} ${s}px "${f}"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(t, x, y); ctx.restore(); };
  const mono = (t, x, y, s, col = INK) => txt(t, x, y, s, col, 'Space Mono', 700);
  // ---------------------------------------------------------------- camera
  const rigAt = (lt, K) => { let i = 0; while (i < K.length - 1 && lt >= K[i + 1][0]) i++; const a = K[i], b = K[i + 1]; if (!b || b[5] === 'cut') return a; const e = E.inOut(clamp((lt - a[0]) / Math.max(.01, b[0] - a[0]))); return [lt, lerp(a[1], b[1], e), lerp(a[2], b[2], e), lerp(a[3], b[3], e), lerp(a[4] || 0, b[4] || 0, e)]; };
  const rig = (lt, K, fn) => { const k = rigAt(lt, K); ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(k[4] || 0); ctx.scale(k[3], k[3]); ctx.translate(-k[1], -k[2]); fn(k); ctx.restore(); };
  // ---------------------------------------------------------------- layout registry (screen space, device pixels)
  let BOX = []; const hit = (a, b) => a[0] < b[0] + b[2] && a[0] + a[2] > b[0] && a[1] < b[1] + b[3] && a[1] + a[3] > b[1];
  const titleA = (o, lt) => { if (!o.tt) return 0; const tout = o.tout != null ? +o.tout : 3.4; return clamp(lt / .45) * (tout > 0 ? 1 - clamp((lt - tout) / .5) : 1); };
  CT.begin = (o, lt) => { const cw = ctx.canvas.width, ch = ctx.canvas.height; ctx.setTransform(cw / W, 0, 0, ch / H, 0, 0);   /* the scene owns its camera (CT.rig): the beat's cam= only declares the shot for the gates */ BOX = [[0, ch * .715, cw, ch * .1]]; if (titleA(o, lt) > .05) BOX.push([cw * .04, ch * .05, cw * .92, ch * .2]); CT._o = o; };
  CT.reserve = (x, y, w, h) => { const m = ctx.getTransform(), k = Math.hypot(m.a, m.b); BOX.push([m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f, w * k, h * k]); };
  CT.sign = (t, x, y, s, lt, at = 0, o = {}) => { const k = pb(lt, at, .5); if (k <= 0) return; ctx.save(); ctx.font = `400 ${s}px "Paytone One"`; const w = ctx.measureText(t).width + s * 1.1, h = s * 1.56; ctx.restore();
    const m = ctx.getTransform(), sc = Math.hypot(m.a, m.b) || 1, cw = ctx.canvas.width, ch = ctx.canvas.height, bw = w * sc * 1.06, bh = h * sc * 1.12; let sx = m.a * x + m.c * y + m.e, sy = m.b * x + m.d * y + m.f; if (sx < -bw * .2 || sx > cw + bw * .2 || sy < -bh || sy > ch + bh) return;   /* its anchor has left the frame */
    sx = clamp(sx, bw / 2 + cw * .03, cw - bw / 2 - cw * .03); let best = null; for (let i = 0; i < 15 && !best; i++) { const dy = (i % 2 ? -1 : 1) * Math.ceil(i / 2) * bh * .9, b = [sx - bw / 2, sy + dy - bh / 2, bw, bh]; if (b[1] < ch * .04 || b[1] + bh > ch * .705) continue; if (!BOX.some(q => hit(b, q))) best = b; }
    if (!best) best = [sx - bw / 2, sy - bh / 2, bw, bh]; BOX.push(best); const px = best[0] + bw / 2, py = best[1] + bh / 2;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.translate(px, py); ctx.rotate((o.rot || 0) + Math.sin(lt * 1.5) * .012); ctx.scale(k * sc, k * sc);
    KIT.sticker(() => { CR.rectF(-w / 2, -h / 2, w, h, s * .5, o.bg || '#FFFFFF', { plane: 0 }); txt(t, 0, s * .04, s, o.col || INK); }, 5); ctx.restore(); };
  // ---------------------------------------------------------------- frame end: title, caption shade, finish
  CT.end = (o, lt, dark, vig = .3) => { const cw = ctx.canvas.width, ch = ctx.canvas.height, a = titleA(o, lt);
    if (a > 0) { const L = String(o.tt).split('|'), hi = L.findIndex(l => l.includes('*')); ctx.save(); ctx.setTransform(cw / W, 0, 0, ch / H, 0, 0); ctx.globalAlpha = a; ctx.translate(0, (1 - a) * -H * .03); CR.title(L.map(l => l.replace(/\*/g, '')), hi, o.kk, dark); ctx.restore(); }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const g = ctx.createLinearGradient(0, ch * .69, 0, ch * .84); g.addColorStop(0, 'rgba(12,8,32,0)'); g.addColorStop(.38, 'rgba(12,8,32,.5)'); g.addColorStop(.68, 'rgba(12,8,32,.5)'); g.addColorStop(1, 'rgba(12,8,32,0)'); ctx.fillStyle = g; ctx.fillRect(0, ch * .69, cw, ch * .15); ctx.restore();
    X.finish(lt, { vig }); };
  // ---------------------------------------------------------------- looks: darkness, heat-sight, other eyes
  let D1 = null, T1 = null, S1 = null; const half = (c, k = .5) => { const w = Math.ceil(ctx.canvas.width * k), h = Math.ceil(ctx.canvas.height * k); if (!c || c.width !== w || c.height !== h) c = mkCanvas(w, h); return c; };
  CT.dark = (alpha, holes = [], col = '#05040F') => { if (alpha <= 0) return; D1 = half(D1); const g = D1.getContext('2d'), m = ctx.getTransform(), S = .5; g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, D1.width, D1.height); g.globalAlpha = alpha; g.drawImage(CT.darkTex(col), 0, 0, D1.width, D1.height); g.globalAlpha = 1;
    g.setTransform(m.a * S, m.b * S, m.c * S, m.d * S, m.e * S, m.f * S); g.globalCompositeOperation = 'destination-out';
    holes.forEach(h => { if (h.len) { const gr = g.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.len); gr.addColorStop(0, `rgba(0,0,0,${h.k ?? 1})`); gr.addColorStop(.75, `rgba(0,0,0,${(h.k ?? 1) * .8})`); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(h.x, h.y); g.arc(h.x, h.y, h.len, h.a - h.w, h.a + h.w); g.closePath(); g.fill(); }
      else { const gr = g.createRadialGradient(h.x, h.y, h.r * (h.core ?? .35), h.x, h.y, h.r); gr.addColorStop(0, `rgba(0,0,0,${h.k ?? 1})`); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.beginPath(); g.arc(h.x, h.y, h.r, 0, TAU); g.fill(); } });
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.drawImage(D1, 0, 0, D1.width, D1.height, 0, 0, ctx.canvas.width, ctx.canvas.height); ctx.restore(); };
  // textured darkness (owner: no empty frames): a deep gradient, soft mist bands and faint specks, cached per colour
  const DT = {}; CT.darkTex = (col = '#05040F') => { const k = col + W + 'x' + H; if (!DT[k]) { const c = mkCanvas(Math.ceil(W / 2), Math.ceil(H / 2)), g = c.getContext('2d'), w = c.width, h = c.height; const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, shade(col, .06)); gr.addColorStop(.6, col); gr.addColorStop(1, shade(col, .1)); g.fillStyle = gr; g.fillRect(0, 0, w, h);
      const r = rng(77); for (let i = 0; i < 9; i++) { const y = h * r(), rg = g.createRadialGradient(w * r(), y, 0, w * r(), y, w * (.3 + r() * .4)); rg.addColorStop(0, 'rgba(90,80,170,.10)'); rg.addColorStop(1, 'rgba(90,80,170,0)'); g.fillStyle = rg; g.fillRect(0, 0, w, h); } for (let i = 0; i < 260; i++) { g.globalAlpha = .08 + r() * .22; g.fillStyle = '#B9C4FF'; g.fillRect(w * r(), h * r(), 1.5, 1.5); } g.globalAlpha = 1; DT[k] = c; } return DT[k]; };
  CT.night = (lt, col = '#05040F') => { ctx.save(); ctx.setTransform(ctx.canvas.width / W, 0, 0, ctx.canvas.height / H, 0, 0); ctx.drawImage(CT.darkTex(col), 0, 0, W, H); ctx.globalAlpha = .5 + .2 * Math.sin(lt * .7); ctx.drawImage(CT.darkTex(col), -W * .02 * Math.sin(lt * .2), 0, W * 1.04, H); ctx.restore(); };
  CT.HOT = ['#FFFBE0', '#FFE066', '#FF9F1C', '#FF4D6D', '#B5179E', '#5A189A'];
  CT.thermal = (fn, y0, y1, glow = 1, pal = CT.HOT) => { T1 = half(T1); const g = T1.getContext('2d'), m = ctx.getTransform(), S = .5, main = ctx; g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, T1.width, T1.height); g.setTransform(m.a * S, m.b * S, m.c * S, m.d * S, m.e * S, m.f * S); ctx = g; try { fn(); } finally { ctx = main; }
    g.globalCompositeOperation = 'source-in'; const gr = g.createLinearGradient(0, y0, 0, y1); pal.forEach((c, i) => gr.addColorStop(i / (pal.length - 1), c)); g.fillStyle = gr; g.fillRect(-W * 2, -H * 2, W * 5, H * 5); g.globalCompositeOperation = 'source-over';
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); if (glow) { ctx.globalAlpha = .35 * glow; const cw = ctx.canvas.width, ch = ctx.canvas.height, e = 10 * U(); [[-e, 0], [e, 0], [0, -e], [0, e]].forEach(([dx, dy]) => ctx.drawImage(T1, 0, 0, T1.width, T1.height, dx, dy, cw, ch)); ctx.globalAlpha = 1; } ctx.drawImage(T1, 0, 0, T1.width, T1.height, 0, 0, ctx.canvas.width, ctx.canvas.height); ctx.restore(); };
  CT.thermBg = (key = 'a') => { ctx.drawImage(KIT.cache('ctth' + key, () => { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#12093A'); g.addColorStop(1, '#2A1466'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }), -W, -H, W * 3, H * 3); };
  CT.tint = (mode, a = 1, box) => { const [x, y, w, h] = box || [-W, -H, W * 3, H * 3]; ctx.save(); ctx.globalAlpha = a; if (mode === 'nvg') { ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = '#808080'; ctx.fillRect(x, y, w, h); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#35F06A'; ctx.fillRect(x, y, w, h); }
    else { ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = mode === 'grey' ? '#808080' : '#6E7FA0'; ctx.globalAlpha = a * (mode === 'grey' ? 1 : .75); ctx.fillRect(x, y, w, h); if (mode === 'cat') { ctx.globalAlpha = a; ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#A9C4E8'; ctx.fillRect(x, y, w, h); } } ctx.restore(); };
  CT.soft = (fn, k = .12) => { S1 = half(S1, k); const g = S1.getContext('2d'), m = ctx.getTransform(), main = ctx; g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, S1.width, S1.height); g.setTransform(m.a * k, m.b * k, m.c * k, m.d * k, m.e * k, m.f * k); ctx = g; try { fn(); } finally { ctx = main; }
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(S1, 0, 0, S1.width, S1.height, 0, 0, ctx.canvas.width, ctx.canvas.height); ctx.restore(); };
  CT.photon = (x, y, r, col = '#FFE066') => { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3.2); g.addColorStop(0, col); g.addColorStop(.3, col + '99'); g.addColorStop(1, col + '00'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 3.2, 0, TAU); ctx.fill(); ctx.restore(); circ(x, y, r * .55, '#FFFFFF', 0); };
  CT.stars = (n, seed, a = 1, y1 = 1, lt = 0) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(KIT.cache('ctst' + n + seed + y1, () => { const r = rng(seed); for (let k = 0; k < n; k++) { ctx.globalAlpha = .3 + r() * .7; const big = r() < .06; circ(W * r(), H * r() * y1, (big ? 3.4 : 1 + r() * 1.6) * U(), '#FFFFFF', 0); } ctx.globalAlpha = 1; }), 0, 0); ctx.restore(); };
  // the start time of the caption that contains a phrase (captions are cut at natural pauses, so indices do not equal story lines)
  CT.at = (c, phrase, d) => { const k = (c || []).find(x => String(x[2] || '').toLowerCase().includes(String(phrase).toLowerCase())); return k ? k[0] + .05 : d; };
  CT.punch = (L, a, sc) => { const cw = ctx.canvas.width, ch = ctx.canvas.height, hi = L.findIndex(l => l.includes('*')); ctx.save(); ctx.setTransform(cw / W, 0, 0, ch / H, 0, 0); ctx.globalAlpha = a; ctx.translate(W / 2, H * .17); ctx.scale(sc, sc); ctx.translate(-W / 2, -H * .17); CR.title(L.map(l => l.replace(/\*/g, '')), hi, null, 1); ctx.restore(); };
  Object.assign(CT, { rig, rigAt, ph, pb, T0, txt, mono, INK });
})();
