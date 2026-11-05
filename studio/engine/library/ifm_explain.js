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
  // House rendering (owner, 5 Nov 2026: "the emoji look off, they break the style"). The brand look is flat colour, soft gradients, rim
  // light and NO black outlines (BRAND §4) — the same family as the facet people and the 3D toon world. So every illustration is
  // re-drawn: colours pulled into a calmer house palette (no neon yellow/red), the black sticker outline replaced by a thin soft line in a
  // deep tone, a soft light-to-shade gradient and a facet light plane across it, and a thin rim light. o.style='raw' draws the original.
  const HEX = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const toHsl = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0; if (mx !== mn) { const d = mx - mn; s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h /= 6; } return [h, s, l]; };
  const fromHsl = ([h, s, l]) => { const f = (p, q, t) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < .5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; }; if (!s) { const v = Math.round(l * 255); return `rgb(${v},${v},${v})`; } const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q; return `rgb(${Math.round(f(p, q, h + 1 / 3) * 255)},${Math.round(f(p, q, h) * 255)},${Math.round(f(p, q, h - 1 / 3) * 255)})`; };
  const TONE = {}; const tone = (hex, tint) => { const k = hex + tint; if (TONE[k]) return TONE[k]; let [h, s, l] = toHsl(HEX(hex)); s = Math.min(s, .66) * .95; l = clamp(l, .2, .8);
    if (tint) { const [th, ts] = toHsl(HEX(tint)); const dh = ((th - h + 1.5) % 1) - .5; h = (h + dh * .08 + 1) % 1; s = s * .9 + ts * .06; } return (TONE[k] = fromHsl([h, s, l])); };
  function paint(g, key, s, o = {}) { const raw = o.style === 'raw', tint = o.tint || '', lineCol = o.lineCol || (raw ? '#1E2233' : '#2A2E4A'), lwK = o.lw ?? (raw ? .9 : .45); g.save(); g.scale(s / 72, s / 72); g.lineCap = 'round'; g.lineJoin = 'round';
    for (const r of paths(key)) { g.save(); if (r.x.m) g.transform(...r.x.m); if (r.x.o) g.globalAlpha *= +r.x.o;
      if (r.fill) { g.fillStyle = raw || key.startsWith('F_') || !/^#/.test(r.fill) ? r.fill : tone(r.fill, tint);   /* Fluent Flat is already in a calm flat palette */ g.fill(r.p, r.x.e ? 'evenodd' : 'nonzero'); }
      if (r.stroke && o.line !== false) { const blk = /^#0{3}(0{3})?$/.test(r.stroke); g.strokeStyle = blk ? lineCol : (raw ? r.stroke : tone(r.stroke, tint)); if (blk && !raw) g.globalAlpha *= .55; g.lineWidth = r.sw * (blk ? lwK : 1); g.stroke(r.p); }
      g.restore(); } g.restore();
    if (raw) return; g.save(); g.globalCompositeOperation = 'source-atop';
    const gr = g.createLinearGradient(0, 0, s, s); gr.addColorStop(0, 'rgba(255,250,235,.26)'); gr.addColorStop(.45, 'rgba(255,250,235,0)'); gr.addColorStop(1, 'rgba(20,18,40,.22)'); g.fillStyle = gr; g.fillRect(0, 0, s, s);
    g.fillStyle = 'rgba(255,255,255,.07)'; g.beginPath(); g.moveTo(0, 0); g.lineTo(s * .62, 0); g.lineTo(0, s * .7); g.fill();                     // the facet light plane
    g.globalCompositeOperation = 'source-atop'; g.strokeStyle = 'rgba(255,244,214,.35)'; g.lineWidth = s * .018; g.beginPath(); g.arc(s * .5, s * .5, s * .44, Math.PI * .95, Math.PI * 1.55); g.stroke();   // a thin rim light, top left
    g.restore(); }
  IFM.emoji = (name, cx, cy, size, o = {}) => { const key = IFM.emojiFind(name); if (!key || size < 2) return false; const q = Math.max(16, Math.round(size / 8) * 8), tint = o.tint || (IFM.THEMES && IFM.themeOf && (IFM.THEMES[IFM.themeOf(o)] || {}).acc) || '', ck = key + '|' + q + (o.line === false ? 'n' : '') + (o.style || 'h') + tint;
    let b = BMP[ck]; if (!b) { b = mkCanvas(q, q); const g = b.getContext('2d'); paint(g, key, q, { ...o, tint }); BMP[ck] = b; }
    if (o.ground) { ctx.save(); ctx.globalAlpha *= .18 * (o.alpha ?? 1); ell(cx, cy + size * .44, size * .36 * (o.sx ?? 1), size * .06, '#000', 0); ctx.restore(); }
    ctx.save(); ctx.globalAlpha *= o.alpha ?? 1; ctx.translate(cx, cy); if (o.rot) ctx.rotate(o.rot); ctx.scale((o.flip ? -1 : 1) * (o.sx ?? 1), o.sy ?? 1); ctx.drawImage(b, -size / 2, -size / 2, size, size); ctx.restore(); return true; };

  // ---------------------------------------------------------------- calm backgrounds (cached) with slow life
  // light themes stay ≤ ~230 so the calm grade's contrast never blows them out to white (owner: no glare)
  const BG = { paper: ['#E6D9C0', '#DCCBAB', '#CFBB97'], sky: ['#CADDF0', '#B0CBE6', '#B9D1AE'], night: ['#1B2140', '#252C55', '#2E3563'], sand: ['#E4D0A8', '#D8BD88', '#C9A670'],
    mint: ['#CFE7DA', '#B8DBC8', '#A2CDB6'], blush: ['#EDD2CA', '#E4BCB1', '#D9A597'], dusk: ['#3B3561', '#6E5A8C', '#E8A87C'] };
  // ---------------------------------------------------------------- per-episode visual worlds (owner, 5 Nov 2026: "each episode its own visuals; never the same
  // scenes again and again"). Story header `theme: <name>` (or theme= on a beat) dresses every kit act; variety.mjs refuses a theme used
  // in the last 3 episodes. Themes: paper (default) · banknote · museum · chalk · blueprint · noir · desert · ocean · cosmos.
  const THEMES = {
    paper: { dark: 0, ink: INK, soft: '#5A6283' },
    banknote: { dark: 0, ink: '#1E3A2C', soft: '#4E6B57', acc: '#B8923C', base: ['#DCE4CC', '#CFDABD', '#BFCDA9'], line: '#3E6B4F', chapter: ['#17301F', '#1E3A2C', '#244531'] },
    museum: { dark: 1, ink: '#F2E8D6', soft: '#B9BCD4', acc: '#E3B55A', base: ['#1E2236', '#252A42', '#2C2F45'], line: '#3A4060', chapter: ['#14172A', '#1B1F36', '#22263E'] },
    chalk: { dark: 1, ink: '#F1F1E6', soft: '#BFD1C4', acc: '#F2D16B', base: ['#24372E', '#203229', '#1B2B23'], line: '#E9F0E6', chapter: ['#1B2B23', '#1E3027', '#22362C'] },
    blueprint: { dark: 1, ink: '#F4F8FF', soft: '#B8CCEA', acc: '#FFD36A', base: ['#1F4A82', '#1B4176', '#173868'], line: '#CFE0FF', chapter: ['#132C52', '#16325C', '#193866'] },
    noir: { dark: 1, ink: '#F3EEE6', soft: '#B3ADA6', acc: '#E0654F', base: ['#1A1A1E', '#202024', '#26262B'], line: '#5A5A62', chapter: ['#101012', '#151518', '#1A1A1E'] },
    desert: { dark: 0, ink: '#3B2414', soft: '#7A5236', acc: '#C8562E', base: ['#EBC796', '#E2B57E', '#D49E62'], line: '#A8703F', chapter: ['#4A2A16', '#5A331B', '#6B3D21'] },
    ocean: { dark: 1, ink: '#EAF7FA', soft: '#A8D3DE', acc: '#FFC56B', base: ['#0F4C63', '#0D3F55', '#0A3346'], line: '#6FB6C9', chapter: ['#082A3A', '#0A3246', '#0C3A51'] },
    cosmos: { dark: 1, ink: '#F2F0FF', soft: '#B9B4E6', acc: '#FFD36A', base: ['#120F2A', '#18143A', '#1E1847'], line: '#5E56A8', chapter: ['#0B0920', '#100D2A', '#151134'] } };
  const themeOf = o => { const t = o.theme || (IFM.hdr && IFM.hdr.theme); return THEMES[t] ? t : 'paper'; };
  function motif(g, th, C, chapter) { const r = rng(11), L = THEMES[th].line;
    if (th === 'banknote') { // guilloche rosettes, fine wave fields and an engraved frame, like the face of a banknote
      g.lineWidth = Math.max(1, W / 900); for (const [cx, cy, R] of [[W * .5, H * .44, W * .46], [W * .1, H * .08, W * .22], [W * .92, H * .66, W * .26]]) for (let k = 0; k < 26; k++) { g.strokeStyle = chapter ? THEMES[th].acc : L; g.globalAlpha = chapter ? .14 : .12; g.beginPath();
        for (let a = 0; a <= TAU + .01; a += .02) { const rr2 = R * (.55 + k * .017) * (1 + .1 * Math.sin(9 * a + k * .35)); const x = cx + Math.cos(a) * rr2, y = cy + Math.sin(a) * rr2 * .9; a ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
      g.strokeStyle = chapter ? THEMES[th].acc : L; g.globalAlpha = chapter ? .06 : .08; for (let y = 0; y < H; y += H / 140) { g.beginPath(); for (let x = 0; x <= W; x += W / 60) g.lineTo(x, y + Math.sin(x / W * 18 + y * .05) * H * .004); g.stroke(); }
      g.globalAlpha = .55; g.strokeStyle = THEMES[th].acc; g.lineWidth = W / 220; g.strokeRect(W * .035, H * .02, W * .93, H * .96); g.lineWidth = W / 600; g.strokeRect(W * .05, H * .028, W * .9, H * .944);
      for (const [x, y] of [[W * .05, H * .028], [W * .95, H * .028], [W * .05, H * .972], [W * .95, H * .972]]) { g.beginPath(); g.arc(x, y, W * .03, 0, TAU); g.stroke(); } g.globalAlpha = 1; }
    else if (th === 'museum') { for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? 'rgba(255,255,255,.025)' : 'rgba(0,0,0,.06)'; g.fillRect(i * W / 5 - W * .05, H * .04, W / 5 - 10, H * .64); }
      g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, H * .7, W, H); g.fillStyle = 'rgba(255,240,210,.08)'; g.beginPath(); g.moveTo(W * .38, 0); g.lineTo(W * .62, 0); g.lineTo(W * .86, H * .72); g.lineTo(W * .14, H * .72); g.fill(); }
    else if (th === 'chalk') { g.strokeStyle = '#E9F0E6'; for (let i = 0; i < 120; i++) { g.globalAlpha = .03 + r() * .04; g.lineWidth = 6 + r() * 30; g.beginPath(); const x = r() * W, y = r() * H; g.moveTo(x, y); g.lineTo(x + (r() - .5) * W * .4, y + (r() - .5) * 40); g.stroke(); } g.globalAlpha = 1;
      g.fillStyle = '#6B4A33'; g.fillRect(0, H * .985, W, H * .015); }
    else if (th === 'blueprint') { g.strokeStyle = L; g.lineWidth = 1; for (let x = 0; x < W; x += W / 24) { g.globalAlpha = (Math.round(x / (W / 24)) % 4) ? .08 : .18; g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); } for (let y = 0; y < H; y += W / 24) { g.globalAlpha = (Math.round(y / (W / 24)) % 4) ? .08 : .18; g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); } g.globalAlpha = 1; }
    else if (th === 'noir') { const gr = g.createRadialGradient(W / 2, H * .42, W * .1, W / 2, H * .42, H * .7); gr.addColorStop(0, 'rgba(255,240,220,.10)'); gr.addColorStop(1, 'rgba(0,0,0,.35)'); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.globalAlpha = .06; for (let i = 0; i < 14; i++) { g.fillStyle = '#000'; g.fillRect(0, i * H / 14, W, H / 50); } g.globalAlpha = 1; }
    else if (th === 'desert') { g.fillStyle = C[2]; for (let k = 0; k < 3; k++) { g.globalAlpha = .35 + k * .2; g.beginPath(); g.moveTo(0, H * (.62 + k * .05)); for (let x = 0; x <= W; x += W / 20) g.lineTo(x, H * (.62 + k * .05) - Math.sin(x / W * 4 + k) * H * .03); g.lineTo(W, H); g.lineTo(0, H); g.fill(); } g.globalAlpha = 1; }
    else if (th === 'ocean') { for (let k = 0; k < 60; k++) { g.globalAlpha = .04 + r() * .05; g.strokeStyle = L; g.lineWidth = 2 + r() * 4; g.beginPath(); const y = r() * H; for (let x = 0; x <= W; x += W / 30) g.lineTo(x, y + Math.sin(x / W * 10 + k) * 8); g.stroke(); } g.globalAlpha = 1; }
    else if (th === 'cosmos') { for (let i = 0; i < 260; i++) { g.globalAlpha = .2 + r() * .7; g.fillStyle = '#FFFFFF'; g.fillRect(r() * W, r() * H, 1 + r() * 2.5, 1 + r() * 2.5); } g.globalAlpha = .12; const gr = g.createRadialGradient(W * .7, H * .25, 0, W * .7, H * .25, W * .6); gr.addColorStop(0, '#8A5CD6'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(0, 0, W, H); g.globalAlpha = 1; } }
  const isDark = o => { const tn = themeOf(o); return tn === 'paper' ? (!!o._chapter && !BG[o.bg]) || o.bg === 'night' || o.bg === 'dusk' : !!(o._chapter || THEMES[tn].dark); };
  const dark = isDark, ink = o => { const tn = themeOf(o); return tn === 'paper' ? (isDark(o) ? '#F6F1E7' : INK) : (o._chapter && !THEMES[tn].dark ? '#F4EEDC' : THEMES[tn].ink); },
    soft = o => { const tn = themeOf(o); return tn === 'paper' ? (isDark(o) ? '#C9CDE8' : '#5A6283') : (o._chapter && !THEMES[tn].dark ? '#D9CFB2' : THEMES[tn].soft); };
  IFM.themeOf = themeOf; IFM.THEMES = THEMES; IFM.exBg = (o, lt) => bg(o, lt); IFM.exStage = (o, cx, cy, S, lt) => stage(o, cx, cy, S, lt);
  const BGC = {}; function bg(o, lt) { const tn = themeOf(o), TH = THEMES[tn], chap = !!o._chapter, palette = tn === 'paper' ? (BG[o.bg] ? o.bg : chap ? 'night' : 'paper') : null;
    const C = palette ? BG[palette] : chap ? TH.chapter : TH.base, k = tn + (palette || '') + (chap ? 'c' : '') + W + 'x' + H; let cv = BGC[k];
    if (!cv) { cv = mkCanvas(W, H); const g = cv.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, C[0]); gr.addColorStop(.7, C[1]); gr.addColorStop(1, C[2]); g.fillStyle = gr; g.fillRect(0, 0, W, H);
      const r = rng(7), dk = isDark(o); g.globalAlpha = dk ? .05 : .035; for (let i = 0; i < 2600; i++) { g.fillStyle = r() < .5 ? '#000' : '#fff'; g.fillRect(r() * W, r() * H, 2, 2); }
      g.globalAlpha = 1; if (!palette) motif(g, tn, C, chap); else { g.fillStyle = 'rgba(0,0,0,.05)'; g.fillRect(0, H * .72, W, H); g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(0, H * .72, W, 3); } BGC[k] = cv; }
    ctx.drawImage(cv, 0, 0); const u = U(), dk = isDark(o);
    if (tn === 'banknote') { const x = ((lt * .04) % 1.6 - .3) * W; ctx.save(); ctx.globalAlpha = .07; const gr = ctx.createLinearGradient(x - W * .2, 0, x + W * .2, H * .3); gr.addColorStop(0, 'rgba(255,255,240,0)'); gr.addColorStop(.5, '#FFFFF0'); gr.addColorStop(1, 'rgba(255,255,240,0)'); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    else for (let i = 0; i < 6; i++) { const r = rng(i * 13 + 3), x = W * r() + Math.sin(lt * .12 + i) * 40 * u, y = H * (.08 + r() * .6) + Math.cos(lt * .1 + i * 2) * 30 * u; ctx.save(); ctx.globalAlpha = dk ? .05 : .07; circ(x, y, (60 + r() * 110) * u, dk ? '#9FB4FF' : shade(C[1], -.12), 0); ctx.restore(); }
    if (dk && (tn === 'paper' || tn === 'cosmos')) for (let i = 0; i < 40; i++) { const r = rng(i * 7 + 1); ctx.save(); ctx.globalAlpha = .3 + .25 * Math.sin(lt * .8 + i); circ(W * r(), H * r() * .6, (1 + r() * 2) * u, '#FFFFFF', 0); ctx.restore(); } }
  // a stage under the main subject (depth, light): an engraved medallion, a museum plinth, a chalk outline …
  function stage(o, cx, cy, S, lt) { const tn = themeOf(o), TH = THEMES[tn], u = U();
    if (tn === 'banknote') { ctx.save(); ctx.globalAlpha = .9; ctx.strokeStyle = TH.acc; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.arc(cx, cy, S * .62, 0, TAU); ctx.stroke(); ctx.lineWidth = 1.5 * u; for (let k = 0; k < 48; k++) { const a = k / 48 * TAU + lt * .05; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * S * .66, cy + Math.sin(a) * S * .66, S * .05, 0, TAU); ctx.stroke(); } ctx.restore(); }
    else if (tn === 'museum') { rr(cx - S * .5, cy + S * .48, S, H * .3, 4 * u, '#3A3F5C', 0); rr(cx - S * .56, cy + S * .44, S * 1.12, 16 * u, 4 * u, '#4A5070', 0); ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .1; poly([[cx - S * .2, 0], [cx + S * .2, 0], [cx + S * .7, cy + S * .5], [cx - S * .7, cy + S * .5]], '#FFE9C0', 0); ctx.restore(); }
    else if (tn === 'chalk' || tn === 'blueprint') { ctx.save(); ctx.strokeStyle = TH.line; ctx.globalAlpha = .5; ctx.setLineDash([10 * u, 10 * u]); ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.ellipse(cx, cy + S * .46, S * .55, S * .1, 0, 0, TAU); ctx.stroke(); ctx.restore(); } }
  const split = s => String(s ?? '').split('|').map(x => x.trim()).filter(x => x !== ''), ats = (o, c, n, from = 0) => { const a = split(o.at); return Array.from({ length: n }, (_, i) => a[i] != null ? T0(c, +a[i], .4 + i) : T0(c, from + i, .4 + i * 1.5)); };
  const label = (t, x, y, s, o2, col) => { if (!t) return; const sz = Math.min(s, W * .34 / Math.max(.01, textW(t, 100, 'display', 900) / 100)); T(t, x, y, { size: sz, font: 'display', weight: 900, fill: col, lw: 0 }); };
  const title = (o, lt) => { const u = U(); if (o.title && o.title !== 'none') { const k = K(lt, .15, .7), sz = Math.min(64 * u, W * .7 / Math.max(.01, textW(o.title, 100, 'display', 900) / 100)); ctx.save(); ctx.globalAlpha *= k; T(o.title, W / 2, H * .17 + (1 - k) * 14 * u, { size: sz, font: 'display', weight: 900, fill: ink(o), lw: 0 }); ctx.restore(); }
    if (o.sub) { const k = K(lt, .5, .7); ctx.save(); ctx.globalAlpha *= k; T(o.sub, W / 2, H * .22, { size: Math.min(34 * u, W * .72 / Math.max(.01, textW(o.sub, 100, 'body', 700) / 100)), font: 'body', weight: 700, fill: soft(o), lw: 0 }); ctx.restore(); } };
  IFM.exTitle = (o, lt) => title(o, lt); IFM.exInk = o => ink(o);
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
    if (d === 'spin') sx = .55 + .45 * Math.cos(lt * 1.2); else if (d === 'grow') s = S * (.5 + .5 * ease(lt / Math.max(1, dur * .8))); else if (d === 'drop') y = lerp(-S, cy, E.out(clamp((lt - .2) / .9))); else if (d === 'pulse') s = S * (1 + .04 * Math.sin(lt * 3));
    const ar = split(o.around); ar.forEach((n, i) => { const a = lt * .35 + i * TAU / ar.length, rr2 = S * .82; ctx.save(); ctx.globalAlpha *= K(lt, .6 + i * .25, .6); IFM.emoji(n, cx + Math.cos(a) * rr2, cy + Math.sin(a) * rr2 * .55, S * .3, {}); ctx.restore(); });
    if (+o.pile) { const n = +o.pile, r = rng(5); for (let i = 0; i < n; i++) { const k = K(lt, .3 + i * .08, .5); if (k <= 0) continue; const row = Math.floor(Math.sqrt(i * 2)), px = cx + (r() - .5) * S * 1.4 * (1 - row * .12), py = cy + S * .35 - row * S * .1; IFM.emoji(o.e, px, py - (1 - k) * 60 * u, S * .32, { rot: (r() - .5) * .6 }); } }
    else { ctx.save(); ctx.globalAlpha *= pa.k; stage(o, cx, cy, S, lt); IFM.emoji(o.e || 'question', cx, y, s, { sx, ground: themeOf(o) !== 'banknote' }); ctx.restore(); }
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
  A.ex_chapter = (o, c, dur) => ({ sfx: kitSfx(o), draw: lt => { const u = U(), o2 = { ...o, _chapter: 1 }; bg(o2, lt); const k = K(lt, .2, .8);
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
