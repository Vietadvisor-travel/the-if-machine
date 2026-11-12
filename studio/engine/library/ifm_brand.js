/* THE IF MACHINE — channel brand layer (brief/BRAND.md). Loaded last; switches the whole engine to the channel look.
   Header `channel: ifm` (default) | `channel: vietadvisor` (legacy travel stories keep their look).
   Header keys read here: run: 1 (RUN #001) · next: What if money disappeared? · enddur: 6
   What it changes:
   - palette tokens (C.*) and font roles: Unbounded (display, lettering), Inter (body, captions), Space Mono (`mono`: machine)
   - captions: small Inter (30/26 u), fixed low band under the picture (9:16 74.5–79 %, 16:9 40 u from the bottom), the spoken word lights Lever Yellow (karaoke), soft shadow, no fat outline
   - end frame: the machine prints the RUN ticket (RUN #00x COMPLETE · NEXT: question · SUBSCRIBE)
   - transitions: `brand` (lever-yellow sweep), `scan` (teal simulation scan line), `ticket` (paper wipe with perforation)
   - HUD: the simulation clock, beat key `clock="HOUR 3"` / `clock="DAY 120"` / `clock=off`; digits roll between beats
   - `# vis kind=ifm act=lever q="WHAT IF|THE INTERNET|SHUT DOWN?"` the 3-second branded hook (lever pull → question → dive)
   - `# vis kind=ifm act=machine` the machine thinking (dials, relays, tape) · `act=answer stamp="NOBODY WINS"` the printed answer */
'use strict';
(function () {
  const IFM = window.IFM = { on: false, hdr: {} };
  const P = { midnight: '#0F1226', space: '#1C2347', steel: '#8C95B8', paper: '#F6F1E7', yellow: '#FFC531', coral: '#FF5B4F', teal: '#2EE6C5', lever: '#2A335F' };
  IFM.P = P;
  const OLD = { C: { ...C }, FONT: { ...FONT }, FW: { ...FW } };

  // ---------------------------------------------------------------- channel switch (called by SB.compile)
  window.CHANNEL_APPLY = (h = {}) => {
    if (IFM.wrapAll) IFM.wrapAll();
    IFM.hdr = h; IFM.peopleStyle = h.people || 'facet'; IFM.seedBase = [...String(h.title || '')].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 9973, 0); IFM.on = String(h.channel || 'ifm').toLowerCase() === 'ifm';
    Object.assign(C, OLD.C); Object.assign(FONT, OLD.FONT); Object.assign(FW, OLD.FW);
    if (!IFM.on) return;
    Object.assign(C, { brand: P.yellow, brandDark: '#D99B00', yel: P.yellow, yel2: '#E8A400', ink: '#141833', inkSoft: '#3A4270', night: P.midnight, dusk: P.coral, cream: P.paper, white: '#FFFDF7' });
    Object.assign(FONT, { display: '"Unbounded", "Inter", sans-serif', toon: '"Unbounded", "Inter", sans-serif', heavy: '"Unbounded", "Inter", sans-serif', round: '"Unbounded", "Inter", sans-serif',
      body: '"Inter", sans-serif', mono: '"Space Mono", monospace', impact: '"Unbounded", sans-serif', sign: '"Space Mono", monospace' });
    Object.assign(FW, { display: 800, toon: 900, heavy: 900, round: 800, body: 700, mono: 700, impact: 900, sign: 700 });
  };

  // ---------------------------------------------------------------- logo (drawn, so it scales and animates)
  // lever-I: slot, stick pulled right (pull 0..1 swings it), coral knob. (x, y) = foot of the I on the baseline, h = cap height
  function lever(x, y, h, pull = 1, o = {}) { const k = h / 100; ctx.save(); ctx.translate(x, y - 100 * k); ctx.scale(k, k);
    ctx.fillStyle = o.slot || '#2A335F'; ctx.beginPath(); ctx.roundRect(2, 84, 60, 16, 8); ctx.fill(); ctx.fillStyle = '#3C4782'; ctx.beginPath(); ctx.roundRect(8, 86, 48, 4, 2); ctx.fill();
    const a = lerp(-.42, .25, pull), L = 69, px = 27, py = 91, tx = px + Math.sin(a) * L, ty = py - Math.cos(a) * L;
    ctx.lineCap = 'round'; ctx.strokeStyle = o.stick || P.yellow; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(tx, ty); ctx.stroke();
    ctx.globalAlpha *= .6; ctx.strokeStyle = '#FFE08A'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(px - 4, py - 11); ctx.lineTo(px - 4 + Math.sin(a) * L * .78, py - 11 - Math.cos(a) * L * .78); ctx.stroke(); ctx.globalAlpha /= .6;
    ctx.fillStyle = '#3C4782'; ctx.beginPath(); ctx.arc(px, py, 8, 0, TAU); ctx.fill();
    const kx = tx + Math.sin(a) * 6, ky = ty - Math.cos(a) * 6; ctx.fillStyle = o.knob || P.coral; ctx.beginPath(); ctx.arc(kx, ky, 17, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(kx - 6, ky - 6, 5.5, 0, TAU); ctx.fill(); ctx.restore(); return 64 * k; }
  IFM.lever = lever;
  // full lockup centred on (x, y): small THE, lever-I, F (yellow), MACHINE (paper). size = cap height in px. Returns width.
  function logo(x, y, size, o = {}) { const a = o.alpha ?? 1; if (a <= 0) return 0; ctx.save(); ctx.globalAlpha *= a; const fs = size / .74; setFont(fs, 'display', 900);
    const wF = ctx.measureText('F').width, wM = ctx.measureText('MACHINE').width, gap = size * .34, wI = size * .64, tot = wI + wF + gap + (o.short ? 0 : wM);
    let x0 = x - tot / 2; const base = y + size / 2; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    if (!o.short) { setFont(size * .28, 'mono', 700); ctx.letterSpacing = (size * .1) + 'px'; ctx.fillStyle = o.theCol || P.steel; ctx.fillText('THE', x0 + size * .04, base - size * 1.14); ctx.letterSpacing = '0px'; }
    lever(x0, base + size * .02, size * 1.02, o.pull ?? 1); x0 += wI; setFont(fs, 'display', 900); ctx.fillStyle = o.ifCol || P.yellow; ctx.fillText('F', x0, base);
    if (!o.short) { ctx.fillStyle = o.col || P.paper; ctx.fillText('MACHINE', x0 + wF + gap, base); }
    ctx.restore(); return tot; }
  IFM.logo = logo;

  // ---------------------------------------------------------------- shared brand painters
  function nightBg(t = 0, o = {}) { const g = ctx.createRadialGradient(W * (o.cx ?? .5), H * (o.cy ?? .42), 10, W * .5, H * .45, Math.max(W, H) * .8); g.addColorStop(0, o.c0 || '#232C5C'); g.addColorStop(.5, '#151A38'); g.addColorStop(1, P.midnight); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    if (o.grid !== false) grid(o.gridA ?? .07, t); if (o.stars !== false) starsF(t, o.stars || 1); }
  function grid(a = .07, t = 0, step) { const u = U(), s = (step || 80) * u; ctx.save(); ctx.strokeStyle = `rgba(140,149,184,${a})`; ctx.lineWidth = 2 * u; ctx.beginPath(); const ox = (t * 6 * u) % s;
    for (let x = -s + ox; x < W + s; x += s) { ctx.moveTo(x, 0); ctx.lineTo(x, H); } for (let y = 0; y < H + s; y += s) { ctx.moveTo(0, y); ctx.lineTo(W, y); } ctx.stroke(); ctx.restore(); }
  function starsF(t = 0, k = 1, seed = 7) { const r = rng(seed), u = U(), n = Math.round(W * H / 9000 * k); ctx.save(); for (let i = 0; i < n; i++) { const x = r() * W, y = r() * H, s = (.8 + r() * 2.2) * u, ph = r() * 9, yel = r() < .1; ctx.globalAlpha = (.15 + r() * .55) * (.6 + .4 * Math.sin(t * 2 + ph)); ctx.fillStyle = yel ? P.yellow : P.paper; ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fill(); } ctx.restore(); }
  IFM.nightBg = nightBg; IFM.grid = grid; IFM.stars = starsF;
  // a paper ticket (x, y top-left), w×h; perforated left edge; lines [{t, size, font, col, y}]; printed 0..1 reveals from the top
  function ticket(x, y, w, h, printed = 1, rot = 0, draw) { const u = U(); ctx.save(); ctx.translate(x + w / 2, y); ctx.rotate(rot); ctx.translate(-w / 2, 0);
    const hh = h * clamp(printed); ctx.save(); ctx.globalAlpha *= .35; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.roundRect(10 * u, 14 * u, w, hh, 6 * u); ctx.fill(); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, hh); ctx.clip(); ctx.fillStyle = P.paper; ctx.beginPath(); ctx.roundRect(0, 0, w, h, 6 * u); ctx.fill();
    ctx.fillStyle = 'rgba(15,18,38,.06)'; for (let yy = 0; yy < h; yy += 6 * u) ctx.fillRect(0, yy, w, 1.2 * u); // thermal paper lines
    ctx.globalCompositeOperation = 'destination-out'; for (let yy = 14 * u; yy < h; yy += 28 * u) { ctx.beginPath(); ctx.arc(0, yy, 8 * u, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(w, yy, 8 * u, 0, TAU); ctx.fill(); } ctx.globalCompositeOperation = 'source-over';
    if (draw) draw(w, h); ctx.restore(); ctx.restore(); }
  function perf(x0, x1, y) { const u = U(); ctx.save(); ctx.setLineDash([10 * u, 9 * u]); ctx.strokeStyle = 'rgba(15,18,38,.3)'; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); ctx.restore(); }
  function typed(s, n) { return String(s).slice(0, Math.max(0, Math.floor(n))); }
  function wrap(s, size, role, maxW, weight) { setFont(size, role, weight); const words = String(s).split(/\s+/), out = []; let cur = ''; for (const w of words) { const tr = cur ? cur + ' ' + w : w; if (ctx.measureText(tr).width > maxW && cur) { out.push(cur); cur = w; } else cur = tr; } if (cur) out.push(cur); return out; }
  IFM.ticket = ticket; IFM.perf = perf; IFM.wrap = wrap;
  // pill tag: yellow, lever icon, label
  function tag(text, x, y, size, o = {}) { const u = U(); setFont(size, 'display', 900); const w = ctx.measureText(text).width + size * 1.5, h = size * 1.45; ctx.save(); ctx.translate(x, y); ctx.scale(o.s || 1, o.s || 1);
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.roundRect(-w / 2 + 6 * u, -h / 2 + 8 * u, w, h, h * .3); ctx.fill(); ctx.fillStyle = o.bg || P.yellow; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h * .3); ctx.fill();
    lever(-w / 2 + size * .3, size * .5, size * .95, .5 + .5 * Math.sin((o.t || 0) * 3), { stick: P.midnight, knob: P.coral, slot: 'rgba(15,18,38,.5)' }); ctx.fillStyle = o.col || P.midnight; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, -w / 2 + size * 1.05, size * .04); ctx.restore(); }
  IFM.tag = tag;

  // ---------------------------------------------------------------- captions: small, fixed, Inter, spoken word in yellow
  const _cap = window.caption;
  caption = function (text, t0, t1, t, o = {}) { if (!IFM.on) return _cap(text, t0, t1, t, o); if (t < t0 || t > t1) return;
    const u = U(), vert = H > W, size = (vert ? 30 : 26) * u, maxW = vert ? W * .72 : W * .62, out = clamp((t1 - t) / .14), pin = E.out(clamp((t - t0) / .18));
    const toks = []; String(text).replace(/[\*\[\]]/g, '').split(/\s+/).forEach(w => { if (w) toks.push(w); }); if (!toks.length) return;
    const wt = toks.map(w => Math.max(1, w.replace(/[^\p{L}\p{N}]/gu, '').length * .12 + .55)), tot = wt.reduce((a, b) => a + b, 0), span = Math.max(.3, (t1 - t0) * .9); const st = []; let acc = 0; wt.forEach(w => { st.push(t0 + acc / tot * span); acc += w; });
    setFont(size, 'body', 700); const sp = ctx.measureText(' ').width; const lines = [[]]; let lw = 0; toks.forEach((w, i) => { const ww = ctx.measureText(w).width; if (lw + ww > maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push(i); lw += ww + sp; });
    const lh = size * 1.28, y0 = vert ? H * .745 : H - 40 * u - (lines.length - 1) * lh; // owner 4 Nov 2026: low band under the picture; 9:16 starts at 74.5 % and grows DOWN (≤ ~79 %), clear of the Shorts/Reels UI (bottom ~20 %, right-side buttons: maxW 72 %) ctx.save(); ctx.globalAlpha *= out * pin; if (!IFM.calm) ctx.translate(0, (1 - pin) * 10 * u); ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    lines.forEach((ln, li) => { setFont(size, 'body', 700); const tw = ln.reduce((s, i) => s + ctx.measureText(toks[i]).width + sp, -sp); let x = W / 2 - tw / 2; const y = y0 + li * lh; if (window.LINT && LINT.on) LINT.boxes.push({ k: 'caption', s: ln.map(i => toks[i]).join(' '), x0: x, x1: x + tw, y0: y - size * .6, y1: y + size * .6 });
      for (const i of ln) { const w = toks[i], ww = ctx.measureText(w).width, cur = t >= st[i] && (i === toks.length - 1 || t < st[i + 1]);
        ctx.lineJoin = 'round'; ctx.lineWidth = size * .2; ctx.strokeStyle = 'rgba(10,12,30,.82)'; ctx.strokeText(w, x, y); ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillText(w, x + 2 * u, y + 3 * u);
        ctx.fillStyle = cur && !IFM.calm ? P.yellow : '#FFFFFF'; ctx.fillText(w, x, y); /* calm: no word-by-word highlight (owner: it flickers) */ x += ww + sp; } });
    if (o.who) { const nm = String(o.who), ns = size * .62; setFont(ns, 'display', 800); const nw = ctx.measureText(nm).width, px = W / 2 - nw / 2, py = y0 - lh * .92; // who is speaking: a small name pill above the line
      rr(px - ns * .55, py - ns * .72, nw + ns * 1.1, ns * 1.44, ns * .72, IFM.castCol(nm), 0); ctx.fillStyle = '#0B1026'; ctx.fillText(nm, px, py + ns * .04); }
    ctx.restore(); };
  IFM.castCol = nm => [P.coral, P.yellow, '#9FB7FF', '#C7A6FF', '#7FE0A0'][[...nm].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 5];

  // ---------------------------------------------------------------- end frame: the machine prints the RUN ticket
  const _end = UI.endFrame;
  // end card (owner, 4 Nov 2026: no machine identity, no ticket): the next question big, one call to action, the channel name small
  UI.endFrame = (p, o, t) => { if (!IFM.on) return _end(p, o, t); if (p <= 0) return; const u = U(), v = H > W, h = IFM.hdr; ctx.save(); ctx.globalAlpha *= clamp(p * 2);
    if (/^yes$/i.test(String(h.clip || ''))) { /* 60 s clips (owner, 12 Nov 2026): a short brand sting, the Oddly True wordmark */ const g0 = ctx.createRadialGradient(W / 2, H * .45, 0, W / 2, H * .45, H * .7); g0.addColorStop(0, '#1F2A5C'); g0.addColorStop(.5, '#101633'); g0.addColorStop(1, '#05070F'); ctx.fillStyle = g0; ctx.fillRect(0, 0, W, H);
      const k = E.back(clamp(t / .5)), fs = (v ? 120 : 110) * u; ctx.translate(W / 2, H * .46); ctx.scale(.85 + .15 * k, .85 + .15 * k); ctx.globalAlpha *= clamp(t / .3); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `900 ${fs}px "Unbounded"`; ctx.fillStyle = '#FFFFFF'; ctx.fillText('ODDLY', 0, -fs * .55); ctx.fillStyle = '#FFC93C'; ctx.fillText('TRUE', 0, fs * .55);
      ctx.font = `700 ${26 * u}px "Space Mono"`; ctx.fillStyle = 'rgba(232,228,216,.8)'; ctx.fillText('STRANGE THINGS THAT REALLY HAPPENED', 0, fs * 1.55); ctx.restore(); return; }
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#101633'); g.addColorStop(1, '#05070F'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 14; i++) { const r = rng(i * 7 + 5), bx = r() * W, by = r() * H * .8, br = (80 + r() * 220) * u * (1 + .08 * Math.sin(t + i)); const bg = ctx.createRadialGradient(bx, by, 0, bx, by, br); bg.addColorStop(0, [P.teal, P.yellow, P.coral, '#6C7BFF'][i % 4] + '55'); bg.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = bg; ctx.fillRect(bx - br, by - br, br * 2, br * 2); }
    for (let i = 0; i < 40; i++) { const r = rng(i * 13 + 1), x = r() * W, y = (r() * H - t * (10 + r() * 30) * u) % H, a = .15 + r() * .35; ctx.save(); ctx.globalAlpha *= a; circ(x, y < 0 ? y + H : y, (1.5 + r() * 3) * u, r() < .3 ? P.yellow : P.paper, 0); ctx.restore(); }
    const next = String(h.next || '').replace(/^next\s*:\s*/i, ''), cx = W / 2, k1 = E.back(clamp((t - .2) / .5)), k2 = E.out(clamp((t - .6) / .6));
    if (next) { ctx.save(); ctx.globalAlpha *= k2; T('NEXT', cx, H * (v ? .3 : .26), { size: 30 * u, font: 'mono', fill: P.teal, lw: 0, ls: 8 * u }); ctx.restore();
      const fsz = (v ? 76 : 70) * u, L = wrap(next.toUpperCase(), fsz, 'display', W * (v ? .82 : .7), 900); L.slice(0, 4).forEach((ln, i) => { const kk = E.back(clamp((t - .7 - i * .15) / .45)); if (kk <= 0) return; ctx.save(); ctx.translate(cx, H * (v ? .38 : .38) + i * fsz * 1.12); ctx.scale(kk, kk); T(ln, 0, 0, { size: fsz, font: 'display', fill: '#FFFFFF', lw: 0, shadow: 6 * u }); ctx.restore(); }); }
    const ca = E.back(clamp((t - 1.6) / .45)); if (ca > 0) tag('FOLLOW FOR MORE', cx, H * (v ? .62 : .72), (v ? 44 : 40) * u, { s: ca * (1 + .03 * Math.sin(t * 5)), t });
    if (h.title) { ctx.save(); ctx.globalAlpha *= clamp((t - 2) / .5) * .7; T(String(h.channelName || 'ODDLY TRUE'), cx, H * (v ? .68 : .82), { size: 22 * u, font: 'mono', fill: P.steel, lw: 0, ls: 6 * u }); ctx.restore(); }
    ctx.restore(); };

  // ---------------------------------------------------------------- transitions
  const TR = window.TR2_DUR = window.TR2_DUR || {};
  const _brand = FX.brand;
  FX.brand = (A, B, p, t, c, tr) => { if (!IFM.on) return _brand(A, B, p, t, c, tr); ctx.drawImage(p < .5 ? A : B, 0, 0); const e = p < .5 ? E.inOut(p * 2) : 1 - E.inOut(p * 2 - 1);
    ctx.save(); for (let i = 0; i < 3; i++) { const ee = clamp(e * 1.4 - i * .2); ctx.fillStyle = [P.yellow, P.coral, P.midnight][i]; ctx.beginPath(); const x = p < .5 ? -W * .3 : W * 1.3 - (W * 1.6) * ee; if (p < .5) { ctx.moveTo(-W * .3, 0); ctx.lineTo(-W * .3 + W * 1.6 * ee, 0); ctx.lineTo(-W * .3 + W * 1.6 * ee - W * .3, H); ctx.lineTo(-W * .6, H); } else { ctx.moveTo(x, 0); ctx.lineTo(W * 1.3, 0); ctx.lineTo(W * 1.3, H); ctx.lineTo(x - W * .3, H); } ctx.fill(); } ctx.restore();
    /* no machine logo (owner, 4 Nov 2026) */ };
  // simulation scan: a teal line sweeps down, B is "rendered" behind it with a scan grid
  FX.scan = (A, B, p) => { const e = E.inOut(p), y = e * H, u = U(); ctx.drawImage(A, 0, 0); ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, y); ctx.clip(); ctx.drawImage(B, 0, 0); ctx.globalAlpha = .25 * (1 - e); grid(.5, 0, 40); ctx.restore();
    const g = ctx.createLinearGradient(0, y - 60 * u, 0, y); g.addColorStop(0, 'rgba(46,230,197,0)'); g.addColorStop(1, 'rgba(46,230,197,.55)'); ctx.fillStyle = g; ctx.fillRect(0, y - 60 * u, W, 60 * u); ctx.fillStyle = P.teal; ctx.fillRect(0, y - 2 * u, W, 4 * u); };
  TR.scan = .6;
  // ticket: B arrives as a paper strip pulled down from the top, perforated edge, slight swing
  FX.ticket = (A, B, p) => { const e = E.out(p), u = U(); ctx.drawImage(A, 0, 0); const y = -H + e * H, sw = (1 - e) * .04; ctx.save(); ctx.translate(W / 2, y); ctx.rotate(sw); ctx.translate(-W / 2, 0);
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(0, H, W, 24 * u); ctx.drawImage(B, 0, 0); ctx.fillStyle = P.paper; ctx.fillRect(0, H - 6 * u, W, 16 * u); ctx.globalCompositeOperation = 'destination-out'; for (let x = 0; x < W; x += 36 * u) { ctx.beginPath(); ctx.arc(x, H + 10 * u, 9 * u, 0, TAU); ctx.fill(); } ctx.restore(); };
  TR.ticket = .55;

  // ---------------------------------------------------------------- HUD: the simulation clock
  // value "HOUR 3" / "DAY 120" / "YEAR 2" / "T+90 MIN"; label + number roll from the previous beat's value
  function parseClock(s) { const m = String(s || '').match(/^(.*?)(-?\d+(?:\.\d+)?)(.*)$/); return m ? { pre: m[1].trim(), n: +m[2], post: m[3].trim() } : { pre: String(s), n: null, post: '' }; }
  IFM.hud = (t) => { if (!IFM.on || typeof EP === 'undefined' || !EP || !EP.scenes || typeof _starts === 'undefined') return; let i = 0; for (let k = 0; k < EP.scenes.length; k++) if (t >= _starts[k]) i = k;
    const sc = EP.scenes[i]; if (!sc || sc.id === 'end') return; let cur = null, prev = null, curK = -1; for (let k = 0; k <= i; k++) { const v = EP.scenes[k].clock; if (v != null) { prev = cur; cur = v; curK = k; } }
    if (!cur || cur === 'off' || sc.clock === 'off') return; const u = U(), vert = H > W, lt = t - _starts[curK], a = parseClock(cur), b = parseClock(prev);
    const roll = clamp(lt / 1.2), n = a.n == null ? null : (b.n != null && b.pre === a.pre ? lerp(b.n, a.n, E.inOut(roll)) : a.n * E.out(roll));
    const num = n == null ? '' : (Number.isInteger(a.n) ? String(Math.round(n)) : n.toFixed(1)); const label = (a.pre + ' ' + num + (a.post ? ' ' + a.post : '')).trim();
    const appear = E.back(clamp((t - _starts[curK === 0 ? 0 : curK]) / .35 + (prev ? 1 : 0))), keep = String(IFM.hdr.clock || '') === 'always', fade = keep ? 1 : 1 - clamp((lt - 2.6) / .5); if (fade <= 0) return;
    const size = (vert ? 26 : 22) * u; setFont(size, 'mono', 700); const tw = ctx.measureText(label).width + size * 2.2, hh = size * 1.9; const x = vert ? W / 2 - tw / 2 : 40 * u, y = vert ? H * .155 : 36 * u;
    ctx.save(); ctx.globalAlpha *= fade; ctx.translate(x + tw / 2, y + hh / 2); ctx.scale(appear, appear); ctx.translate(-tw / 2, -hh / 2); ctx.fillStyle = 'rgba(10,12,30,.72)'; ctx.beginPath(); ctx.roundRect(0, 0, tw, hh, hh / 2); ctx.fill();
    ctx.strokeStyle = 'rgba(46,230,197,.55)'; ctx.lineWidth = 2 * u; ctx.stroke(); const blink = (t * 2 % 1) < .6; ctx.fillStyle = blink ? P.coral : 'rgba(255,91,79,.3)'; ctx.beginPath(); ctx.arc(size * .9, hh / 2, size * .26, 0, TAU); ctx.fill();
    ctx.fillStyle = P.teal; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(label, size * 1.5, hh / 2 + size * .05); ctx.restore(); };

  // ---------------------------------------------------------------- `# vis kind=ifm` — the machine itself (only at the start, the twist and the end)
  if (!window.VIS || !VIS.K || !window.TOON) { console.warn('ifm_brand needs vis + toontype'); return; }
  const T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d;
  function machineLayout() { const u = U(), v = H > W, cx = W / 2 - (v ? 30 * u : 50 * u), cy = H * (v ? .46 : .5), mw = Math.min(W * (v ? .84 : .64), 1400 * u), mh = mw * (v ? .95 : .52);
    const sw = mw * .62, sh = mh * (v ? .42 : .56), sx = cx - mw / 2 + mw * .06, sy = cy - mh / 2 + mh * .1; return { cx, cy, mw, mh, sw, sh, sx, sy }; }
  IFM.machineLayout = machineLayout;
  function machineFace(lt, o = {}, L) { const u = U(), v = H > W, { cx, cy, mw, mh } = L || machineLayout();
    // body
    ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.roundRect(cx - mw / 2 + 16 * u, cy - mh / 2 + 22 * u, mw, mh, 40 * u); ctx.fill(); ctx.restore();
    const g = ctx.createLinearGradient(0, cy - mh / 2, 0, cy + mh / 2); g.addColorStop(0, '#2B3466'); g.addColorStop(1, '#161B3C'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(cx - mw / 2, cy - mh / 2, mw, mh, 40 * u); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 4 * u; ctx.stroke(); for (const sx of [-1, 1]) for (const sy of [-1, 1]) circ(cx + sx * (mw / 2 - 30 * u), cy + sy * (mh / 2 - 30 * u), 8 * u, '#3C4782', 0);
    // screen
    const { sw, sh, sx, sy } = L || machineLayout(); ctx.fillStyle = '#060A1C'; ctx.beginPath(); ctx.roundRect(sx, sy, sw, sh, 18 * u); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.roundRect(sx, sy, sw, sh, 18 * u); ctx.clip(); ctx.globalAlpha = .12; ctx.fillStyle = P.teal; for (let yy = sy; yy < sy + sh; yy += 5 * u) ctx.fillRect(sx, yy, sw, 1.5 * u); ctx.restore();
    // dials + lights
    const dx = sx + sw + mw * .07, dw = mw * .23; for (let k = 0; k < 2; k++) { const r = dw * .32, x = dx + dw / 2, y = sy + r + k * (r * 2.6); circ(x, y, r, '#0E1230', 0); ctx.strokeStyle = 'rgba(140,149,184,.5)'; ctx.lineWidth = 3 * u; ctx.stroke();
      for (let m = 0; m < 9; m++) { const a = -2.4 + m * .6; line(x + Math.cos(a) * r * .78, y + Math.sin(a) * r * .78, x + Math.cos(a) * r * .9, y + Math.sin(a) * r * .9, 3 * u, P.steel); }
      const na = -2.4 + (o.spin ?? 0) * (k ? 3.1 : 4.2) + Math.sin(lt * (k ? 7 : 11)) * .15 * (o.spin ? 1 : 0); line(x, y, x + Math.cos(na) * r * .8, y + Math.sin(na) * r * .8, 6 * u, k ? P.teal : P.coral); circ(x, y, 9 * u, P.paper, 0); }
    for (let k = 0; k < 6; k++) { const on = o.busy ? (Math.sin(lt * 9 + k * 1.7) > 0) : k < 2; circ(sx + sw * (k + .5) / 6, sy + sh + mh * .09, 11 * u, on ? [P.yellow, P.teal, P.coral][k % 3] : '#2A335F', 0); if (on) glow(sx + sw * (k + .5) / 6, sy + sh + mh * .09, 34 * u, [P.yellow, P.teal, P.coral][k % 3], .5); }
    // ticket slot
    rr(cx - mw * .2, cy + mh / 2 - mh * .12, mw * .4, 18 * u, 9 * u, '#060815', 0);
    return { sx, sy, sw, sh, cx, cy, mw, mh }; }
  IFM.machineFace = machineFace;
  const ACT = {}, LET = {};
  // HOOK 0–3 s: macro on the lever knob, a hand-less yank (clunk), dials spin, the question types on the machine screen, dive in through the screen
  ACT.lever = (o, c, dur) => { const tQ = .62, tDive = Math.max(2.1, Math.min(dur - .45, cap(o, 'dive', 2.7))); return { sfx: [[.02, 'ifm_machine_ratchet'], [.34, 'ifm_machine_lever_clunk'], [.36, 'ifm_lever'], [.45, 'ifm_machine_gear_whirr'], [.62, 'ifm_motion_whoosh_short'], [.7, 'ifm_sci_ui_typing'], [tDive - .35, 'riser_short'], [tDive, 'whoosh_huge']],
    draw: lt => { const u = U(), v = H > W; nightBg(lt, { cy: .5 }); const M = machineLayout(), pull = E.back(clamp((lt - .12) / .24));
      const lx = M.cx + M.mw / 2 + 10 * u, ly = M.cy + M.mh * .12, lh = 260 * u, knob = [lx + 40 * u, ly - lh * .9];
      // camera: macro on the knob → yank (shake) → whip to the screen as the question types → ease back → dive through the screen
      const scr = [M.sx + M.sw / 2, M.sy + M.sh / 2], a1 = E.inOut(clamp((lt - .5) / .3)), a2 = E.inOut(clamp((lt - 1.25) / Math.max(.4, tDive - 1.35))), dive = E.in(clamp((lt - tDive) / .42));
      let fx = lerp(knob[0], scr[0], a1), fy = lerp(knob[1], scr[1], a1), z = lerp(3.4, 1.75, a1); z = lerp(z, v ? 1.12 : 1.18, a2); fx = lerp(fx, M.cx + (v ? 0 : 40 * u), a2); fy = lerp(fy, M.cy, a2);
      if (dive > 0) { fx = lerp(fx, scr[0], dive); fy = lerp(fy, scr[1], dive); z *= lerp(1, 9, dive); }
      ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(z, z); if (lt > .3 && lt < .62) ctx.translate(Math.sin(lt * 95) * 5 * u * (.62 - lt) * 3, Math.cos(lt * 77) * 4 * u * (.62 - lt) * 3); ctx.translate(-fx, -fy);
      machineFace(lt, { spin: clamp((lt - .36) / 1.6), busy: lt > .36 }, M);
      if (lt > .12 && lt < .5) { ctx.save(); ctx.globalAlpha = .35 * (1 - clamp((lt - .3) / .2)); ctx.strokeStyle = P.yellow; ctx.lineWidth = 10 * u; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(lx + 8 * u, ly, lh * (.78 + k * .08), -1.95, -1.25); ctx.stroke(); } ctx.restore(); }
      lever(lx, ly, lh, pull);
      // the question types on the screen, fitted to it
      const lines = String(o.q || 'WHAT IF|…?').split('|'), ch = (lt - tQ) * 38; ctx.save(); ctx.beginPath(); ctx.roundRect(M.sx, M.sy, M.sw, M.sh, 18 * u); ctx.clip(); ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      setFont(100, 'display', 900); const widest = Math.max(...lines.slice(1).map(l => ctx.measureText(l).width), 1); let fs = Math.min(M.sw * .86 / widest * 100, M.sh / (lines.length + .9)); const pad = M.sw * .07;
      let used = 0, y = M.sy + M.sh * .12; lines.forEach((ln, i) => { const s = typed(ln, ch - used); used += ln.length + 3; const sz = i ? fs : fs * .5; setFont(sz, i ? 'display' : 'mono', i ? 900 : 700); ctx.fillStyle = i ? (i === lines.length - 1 ? P.yellow : P.paper) : P.teal; ctx.fillText(s, M.sx + pad, y); y += sz * (i ? 1.08 : 1.5); });
      if ((lt * 3 % 1) < .55 && ch < used + 6) { ctx.fillStyle = P.teal; ctx.fillRect(M.sx + pad, y + fs * .05, fs * .4, fs * .09); } ctx.restore(); ctx.restore();
      if (dive > 0) { ctx.save(); ctx.globalAlpha = dive * dive; ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H); ctx.restore(); } } }; };
  // the machine "thinking": dials race, relays flicker, the screen shows a value
  ACT.machine = (o, c, dur) => ({ sfx: [[.1, 'ifm_machine_click_mech'], [.4, 'ifm_machine_gear_whirr'], [.8, 'ifm_sci_data_chatter'], [1.6, 'ifm_machine_relay']], draw: lt => { const u = U(); nightBg(lt); ctx.save(); const z = 1.02 + .05 * lt / Math.max(3, dur); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
    const M = machineFace(lt, { spin: lt * .4, busy: true }); ctx.save(); ctx.beginPath(); ctx.rect(M.sx, M.sy, M.sw, M.sh); ctx.clip(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    setFont(M.sh * .12, 'mono', 700); ctx.fillStyle = P.teal; ctx.fillText(typed(o.label || 'RUNNING SIMULATION', lt * 30), M.sx + M.sw / 2, M.sy + M.sh * .28);
    const pr = clamp(lt / Math.max(1, dur - .5)); rr(M.sx + M.sw * .1, M.sy + M.sh * .55, M.sw * .8, M.sh * .1, M.sh * .05, '#1A2048', 0); rr(M.sx + M.sw * .1, M.sy + M.sh * .55, M.sw * .8 * pr, M.sh * .1, M.sh * .05, P.yellow, 0);
    setFont(M.sh * .1, 'mono', 700); ctx.fillStyle = P.paper; ctx.fillText(Math.round(pr * 100) + '%', M.sx + M.sw / 2, M.sy + M.sh * .8); ctx.restore(); ctx.restore(); } });
  // the answer: the slot prints a ticket, a coral stamp lands on the punch word
  ACT.answer = (o, c, dur) => { const tS = cap(o, 'at', T0(c, 1, 1.6)); return { sfx: [[.15, 'ifm_machine_printer'], [.3, 'ifm_machine_typewriter'], [tS, 'ifm_motion_impact_slam'], [tS + .05, 'ifm_machine_chime']], draw: lt => { const u = U(), v = H > W; nightBg(lt, { cy: .3 });
    const tw = v ? W * .8 : W * .44, th = v ? H * .5 : H * .74, tx = (W - tw) / 2, ty = H * (v ? .2 : .1); rr(tx - 30 * u, ty - 30 * u, tw + 60 * u, 40 * u, 20 * u, '#060815', 0);
    ticket(tx, ty, tw, th, E.out(clamp(lt / 1.2)), Math.sin(lt * 1.2) * .01, (w, h) => { const m = 50 * u; ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = P.midnight; setFont(24 * u, 'mono', 700); ctx.fillText(typed('THE MACHINE PRINTED:', lt * 30), m, m); perf(m * .5, w - m * .5, m + 52 * u);
      const L = wrap(String(o.text || 'THE ANSWER').toUpperCase(), (v ? 64 : 58) * u, 'display', w - m * 2, 900); setFont((v ? 64 : 58) * u, 'display', 900); L.forEach((ln, i) => { ctx.save(); ctx.globalAlpha *= clamp((lt - .25 - i * .12) * 4); ctx.fillText(ln, m, m + 90 * u + i * (v ? 74 : 68) * u); ctx.restore(); }); });
    if (o.stamp && lt > tS) { const k = E.out5(clamp((lt - tS) / .18)), s = lerp(2.4, 1, k); ctx.save(); ctx.translate(W / 2 + tw * .12, ty + th * .72); ctx.rotate(-.14); ctx.scale(s, s); ctx.globalAlpha *= k * .92; const sz = (v ? 54 : 50) * u; setFont(sz, 'display', 900); const sw2 = ctx.measureText(o.stamp).width + sz;
      ctx.strokeStyle = P.coral; ctx.lineWidth = 7 * u; ctx.beginPath(); ctx.roundRect(-sw2 / 2, -sz * .85, sw2, sz * 1.7, 12 * u); ctx.stroke(); ctx.fillStyle = P.coral; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(o.stamp, 0, sz * .05); ctx.restore(); } } }; };
  const cap = (o, k, d) => (o[k] != null ? +o[k] : d);
  VIS.K.ifm = (o, c, Pal, dur, i) => { const A = (ACT[o.act] || ACT.lever)(o, c, dur); return { sfx: A.sfx.slice(), draw: lt => { A.draw(lt); (LET[o.act] || (() => {}))(o, c, lt); } }; };
})();
