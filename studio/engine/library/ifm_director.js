/* THE IF MACHINE — the director track: second-by-second direction on ANY `# vis` beat (owner, 3 Nov 2026).
   dir="<when> <verb> <args>; <when> <verb> <args>; …"
   <when>: 1.2 | 0.5-2 | @1 (caption 1 starts) | @1+.4 | @2-.2 | @0-@1  (seconds inside the beat)
   CAMERA   zoom <z> <x,y>        push into a point (x,y = 0..1 of the frame), eased; holds after the range
            pan <dx,dy>           move the frame (fractions of W,H)   ·  rot <deg>   ·  shake <amp 0..1>
            ease=spring|back|io|lin  on any camera/3D verb (default io)
   3D       flip                  the shot flips like a card and comes back (the content keeps running)
            tilt <deg>            the world leans back in perspective (a table-top view), then returns
            card                  the shot shrinks into a floating card over the brand night, then fills again
            orbit <deg>           a slow swing around the subject
   TIME     slow <factor>         slow motion over the range  ·  freeze  (a held frame, the clock stops)
   FX       flash · chroma <px> · glitch · speed (speed lines) · shock (shockwave ring at x,y) · zblur (zoom blur)
            mblur (true motion blur: sub-frame samples, for fast moves) · vignette · iris <x,y> (closes to a point)
   TEXT     text <style> 'TEXT|small' <x,y> <colour> <size>     (single quotes inside dir="…")
            styles: pop drop slam (cartoon) · scramble · type · counter · highlight · extrude · glitchtext · outline
                    + the typekit looks: stack count stamp typeon mask gold neon comic hand split sign
            colours: paper yellow coral teal or #hex   ·   text lasts until the next text or the beat end (out=<s> to cut)
   SOUND    sfx <name>            a motivated sound at that second (sfx_pro / ifm_* names)
   New 3D transitions (trans=): flip3d · fold · shatter · pixel · tunnel                                              */
'use strict';
(function () {
  if (!window.VIS || !VIS.K || !window.IFM) return;
  const P = IFM.P, COL = { paper: P.paper, yellow: P.yellow, coral: P.coral, teal: P.teal, white: '#FFFFFF' }, EASE = { io: E.inOut, spring: E.back, back: E.back, lin: t => t, out: E.out };
  const sm = (a, b, x) => clamp((x - a) / Math.max(1e-3, b - a));
  function when(tok, c) { const one = s => { const m = String(s).match(/^@(\d+)([+-][\d.]+)?$/); if (m) return (c && c[+m[1]] ? c[+m[1]][0] : 1.5 * +m[1]) + (m[2] ? +m[2] : 0); return +s; };
    const m = String(tok).match(/^(@\d+(?:[+-][\d.]+)?|[\d.]+)(?:-(@\d+(?:[+-][\d.]+)?|[\d.]+))?$/); if (!m) return null; const a = one(m[1]), b = m[2] != null ? one(m[2]) : null; return [a, b]; }
  function parse(src, c) { const out = []; String(src || '').split(';').map(s => s.trim()).filter(Boolean).forEach(s => { const toks = s.match(/'[^']*'|"[^"]*"|\S+/g) || []; const w = when(toks[0], c); if (!w) return;
      const kv = {}; const args = []; toks.slice(2).forEach(t => { const m = t.match(/^(\w+)=(.*)$/); if (m) kv[m[1]] = m[2]; else args.push(t.replace(/^["']|["']$/g, '')); }); out.push({ a: w[0], b: w[1], v: toks[1], args, kv }); }); return out; }
  const xy = (s, dx = .5, dy = .5) => { const m = String(s || '').split(',').map(Number); return [isFinite(m[0]) ? m[0] : dx, isFinite(m[1]) ? m[1] : dy]; };
  // ---------------------------------------------------------------- time remap (slow / freeze)
  function remap(ev, lt) { let t = lt; for (const e of ev) { if (e.v !== 'slow' && e.v !== 'freeze') continue; const a = e.a, b = e.b ?? e.a + .6, f = e.v === 'freeze' ? 0 : +(e.args[0] || .35); if (lt <= a) continue; const inside = Math.min(lt, b) - a; t -= inside * (1 - f); } return t; }
  // ---------------------------------------------------------------- camera + 3D
  function camera(ev, lt) { const u = U(); for (const e of ev) { if (lt < e.a) continue; const b = e.b ?? e.a + .8, k = (EASE[e.kv.ease] || E.inOut)(sm(e.a, b, lt));
      if (e.v === 'zoom') { const z = +(e.args[0] || 1.4), [x, y] = xy(e.args[1]); ctx.translate(x * W, y * H); const s = lerp(1, z, k); ctx.scale(s, s); ctx.translate(-x * W, -y * H); }
      else if (e.v === 'pan') { const [dx, dy] = xy(e.args[0], 0, 0); ctx.translate(-dx * W * k, -dy * H * k); }
      else if (e.v === 'rot') { ctx.translate(W / 2, H / 2); ctx.rotate((+(e.args[0] || 8)) * Math.PI / 180 * k); ctx.translate(-W / 2, -H / 2); }
      else if (e.v === 'orbit') { const d = (+(e.args[0] || 12)) * Math.PI / 180 * k; ctx.translate(W / 2, H / 2); ctx.transform(Math.cos(d), 0, Math.sin(d) * .25, 1, 0, 0); ctx.translate(-W / 2, -H / 2); }
      else if (e.v === 'shake' && lt <= b) { const amp = +(e.args[0] || .5) * 22 * u * (1 - sm(e.a, b, lt)); ctx.translate(Math.sin(lt * 71) * amp, Math.cos(lt * 53) * amp); }
      else if (e.v === 'flip' && lt <= b) { const q = sm(e.a, b, lt), sx = Math.abs(Math.cos(q * Math.PI)); ctx.translate(W / 2, H / 2); ctx.transform(Math.max(.02, sx), (1 - sx) * .12 * (q < .5 ? 1 : -1), 0, 1, 0, 0); ctx.translate(-W / 2, -H / 2); }
      else if (e.v === 'tilt' && lt <= b + .6) { const q = Math.sin(Math.PI * Math.min(1, sm(e.a, b + .6, lt))), d = (+(e.args[0] || 35)) / 90 * q; ctx.translate(W / 2, H * .55); ctx.transform(1 - d * .2, 0, -d * .55, 1 - d * .6, 0, 0); ctx.translate(-W / 2, -H * .55); } } }
  function cardBack(ev, lt) { const e = ev.find(e => e.v === 'card' && lt >= e.a && lt <= (e.b ?? e.a + 2) + .5); if (!e) return 0; const b = e.b ?? e.a + 2, q = Math.min(sm(e.a, e.a + .5, lt), 1 - sm(b, b + .5, lt)); return E.inOut(clamp(q)); }
  // ---------------------------------------------------------------- text styles
  const scr = '01#$%&*?ABCDEFGHJKLMNPQRSTUVWXYZ';
  function text(e, lt, nextAt) { const at = e.a, out = e.kv.out != null ? at + +e.kv.out : nextAt, style = e.args[0] || 'pop', str = String(e.args[1] || ''), [x, y] = xy(e.args[2], .5, H > W ? .25 : .2), col = COL[e.args[3]] || e.args[3] || P.paper, sz = +(e.args[4] || 1);
    if (lt < at || lt > out + .4) return; const u = U(), v = H > W, p = lt - at, X = x * W, Y = y * H, [main, small] = str.split('|'), base = (v ? 96 : 88) * sz * u;
    if (window.LINT && LINT.on) { const tw = Math.min(W * .9, textW(main, base, 'display', 900) + base * .4); LINT.boxes.push({ k: 'ui', s: main, x0: X - tw / 2, x1: X + tw / 2, y0: Y - base * .7, y1: Y + base * .7 }); }
    const fade = 1 - sm(out, out + .3, lt); ctx.save(); ctx.globalAlpha *= fade;
    const fit = s => Math.min(base, W * .88 / Math.max(1, textW(s, 100, 'display', 900)) * 100);
    const plain = (s, size, fill, o2 = {}) => T(s, X, Y, { size, font: o2.font || 'display', weight: 900, fill, lw: o2.lw ?? size * .14, stroke: '#0B0E22', shadow: o2.shadow ?? 6 * u, alpha: o2.alpha ?? 1, scale: o2.scale ?? 1, ls: o2.ls });
    switch (style) {
      case 'pop': case 'drop': case 'slam': TOON.word(main.toUpperCase(), X, Y, { size: fit(main) / u, lt, at, out: out < 98 ? out : undefined, enter: style, idle: 'none', fill: [shade(col, .15), col], stroke: '#0B0E22', depthCol: '#0B0E22' }); break;
      case 'scramble': { const n = main.length, done = Math.floor(p * 18); const s = [...main].map((ch, i) => ch === ' ' || i < done - 4 ? ch : scr[Math.floor((lt * 30 + i * 7) % scr.length)]).join(''); plain(s, fit(main), col, { font: 'mono' }); break; }
      case 'type': { const s = main.slice(0, Math.floor(p * 22)); plain(s + ((lt * 3 % 1) < .55 ? '▌' : ''), fit(main) * .8, col, { font: 'mono', lw: 0 }); break; }
      case 'counter': { const m = main.match(/^(\D*)([\d,.]+)(.*)$/); if (!m) { plain(main, fit(main), col); break; } const target = +m[2].replace(/,/g, ''), k = E.out(clamp(p / 1.4)), val = target * k, dec = (m[2].split('.')[1] || '').length; const s = m[1] + (dec ? val.toFixed(dec) : Math.round(val).toLocaleString('en-US')) + m[3]; plain(s, fit(main), col, { font: 'mono', scale: 1 + .06 * Math.sin(Math.min(1, p / 1.4) * Math.PI) }); break; }
      case 'highlight': { const sz2 = fit(main); setFont(sz2, 'display', 900); const tw = ctx.measureText(main).width; const k = E.out(clamp(p / .5)); ctx.fillStyle = col; ctx.fillRect(X - tw / 2 - 14 * u, Y - sz2 * .5, (tw + 28 * u) * k, sz2 * 1.05); plain(main, sz2, P.midnight, { lw: 0, shadow: 0 }); break; }
      case 'extrude': { const sz2 = fit(main), k = E.back(clamp(p / .5)), d = Math.round(18 * sz2 / base); for (let i = d; i >= 1; i--) T(main, X + i * 1.2 * u, Y + i * 1.6 * u, { size: sz2, font: 'display', weight: 900, fill: shade(col, -.45 + i / d * .1), lw: 0, scale: k }); plain(main, sz2, col, { lw: 0, shadow: 0, scale: k }); break; }
      case 'glitchtext': { const sz2 = fit(main); const j = (lt * 9 % 1) < .3; ctx.save(); ctx.globalCompositeOperation = 'screen'; T(main, X + (j ? 6 : 2) * u, Y, { size: sz2, font: 'display', weight: 900, fill: '#FF3B5C', lw: 0 }); T(main, X - (j ? 6 : 2) * u, Y, { size: sz2, font: 'display', weight: 900, fill: '#2EE6C5', lw: 0 }); ctx.restore(); plain(main, sz2, col, { lw: 0, shadow: 0, alpha: .9 }); break; }
      case 'outline': { const sz2 = fit(main), k = clamp(p / .6); setFont(sz2, 'display', 900); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 3 * u; ctx.strokeStyle = col; ctx.setLineDash([sz2 * 4 * k, sz2 * 4]); ctx.strokeText(main, X, Y); ctx.setLineDash([]); if (p > .6) plain(main, sz2, col, { lw: 0, shadow: 0, alpha: clamp((p - .6) / .3) }); break; }
      default: if (window.TYPE) TYPE.draw(style, str, lt, { at, out: out < 98 ? out : undefined, x, y, col, size: sz }); }
    if (small && !['stack', 'count', 'stamp', 'typeon', 'mask', 'gold', 'neon', 'comic', 'hand', 'split', 'sign'].includes(style)) T(small.toUpperCase(), X, Y + base * .85, { size: base * .3, font: 'mono', fill: P.teal, lw: 0, alpha: clamp((p - .3) / .3) });
    ctx.restore(); }
  // ---------------------------------------------------------------- frame effects (on the composited buffer)
  function post(ev, lt, buf, draw) { const u = U(); for (const e of ev) { const b = e.b ?? e.a + ({ flash: .25, shock: .7, chroma: .4, glitch: .5, speed: .8, zblur: .5, iris: .8, vignette: 1.5, mblur: .8 }[e.v] || .5); if (lt < e.a || lt > b) continue; const q = sm(e.a, b, lt);
      switch (e.v) {
        case 'flash': ctx.save(); ctx.globalAlpha = (1 - q) * .85; ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H); ctx.restore(); break;
        case 'chroma': { const d = +(e.args[0] || 10) * u * (1 - q); ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = .45; ctx.filter = 'sepia(1) saturate(6) hue-rotate(-40deg)'; ctx.drawImage(buf, d, 0); ctx.filter = 'sepia(1) saturate(6) hue-rotate(150deg)'; ctx.drawImage(buf, -d, 0); ctx.restore(); ctx.filter = 'none'; break; }
        case 'glitch': { const r = rng(Math.floor(lt * 12)); for (let i = 0; i < 8; i++) { const y = r() * H, h = (6 + r() * 40) * u, dx = (r() - .5) * 60 * u; ctx.drawImage(buf, 0, y, W, h, dx, y, W, h); } break; }
        case 'speed': { const [x, y] = xy(e.args[0]); ctx.save(); ctx.globalAlpha = .35 * Math.sin(Math.PI * q); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3 * u; const r = rng(5); ctx.beginPath(); for (let i = 0; i < 60; i++) { const a = r() * TAU, d0 = (220 + r() * 400) * u; ctx.moveTo(x * W + Math.cos(a) * d0, y * H + Math.sin(a) * d0); ctx.lineTo(x * W + Math.cos(a) * (d0 + 300 * u), y * H + Math.sin(a) * (d0 + 300 * u)); } ctx.stroke(); ctx.restore(); break; }
        case 'shock': { const [x, y] = xy(e.args[0]); ctx.save(); ctx.globalAlpha = 1 - q; ctx.strokeStyle = e.args[1] ? (COL[e.args[1]] || e.args[1]) : P.paper; ctx.lineWidth = 10 * u * (1 - q) + 2 * u; ctx.beginPath(); ctx.arc(x * W, y * H, q * Math.max(W, H) * .7, 0, TAU); ctx.stroke(); ctx.restore(); break; }
        case 'zblur': { ctx.save(); for (let i = 1; i <= 5; i++) { const s = 1 + i * .025 * Math.sin(Math.PI * q); ctx.globalAlpha = .18; ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-W / 2, -H / 2); ctx.drawImage(buf, 0, 0); ctx.setTransform(1, 0, 0, 1, 0, 0); } ctx.restore(); break; }
        case 'mblur': { const n = 5, dt = 1 / 30 / n * 3; ctx.save(); for (let i = 1; i <= n; i++) { ctx.globalAlpha = 1 / (i + 1); draw(lt - i * dt, ctx); } ctx.restore(); break; }
        case 'vignette': { const g = ctx.createRadialGradient(W / 2, H / 2, H * .25, W / 2, H / 2, H * .85); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${.7 * Math.sin(Math.PI * q)})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); break; }
        case 'iris': { const [x, y] = xy(e.args[0]); ctx.save(); ctx.fillStyle = P.midnight; ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.arc(x * W, y * H, Math.max(1, (1 - E.inOut(q)) * Math.hypot(W, H)), 0, TAU, true); ctx.fill('evenodd'); ctx.restore(); break; } } } }
  // ---------------------------------------------------------------- wrap a vis beat
  let BUF = null; const buffer = () => { if (!BUF || BUF.width !== W || BUF.height !== H) BUF = mkCanvas(W, H); return BUF; };
  IFM.direct = (B, o, c, dur) => { const ev = parse(o.dir, c); if (!ev.length) return B; const texts = ev.filter(e => e.v === 'text').sort((a, b) => a.a - b.a);
    const sfx = B.sfx.slice(); ev.forEach(e => { if (e.v === 'sfx' && e.args[0]) sfx.push([e.a, e.args[0]]); if (IFM.soundFull !== true) return; if (e.v === 'flip') sfx.push([e.a, 'whoosh_small']); if (e.v === 'shock') sfx.push([e.a, 'ifm_motion_impact_soft']); if (e.v === 'freeze') sfx.push([e.a, 'world_camera_shutter'.replace('world', 'ifm_world')]); });
    const scene = (lt, g) => { const main = ctx; ctx = g; ctx.save(); camera(ev, lt); B.draw(remap(ev, lt)); ctx.restore(); ctx = main; };
    return { ...B, sfx, draw: lt => { const buf = buffer(), g = buf.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); scene(lt, g);
      const cb = cardBack(ev, lt); if (cb > 0) { IFM.nightBg(lt); const s = lerp(1, .68, cb), u = U(); ctx.save(); ctx.translate(W / 2, H / 2); ctx.transform(s, -.04 * cb, .05 * cb, s, 0, 0); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(-W / 2 + 18 * u, -H / 2 + 26 * u, W, H); ctx.beginPath(); ctx.roundRect(-W / 2, -H / 2, W, H, 40 * u * cb); ctx.clip(); ctx.drawImage(buf, -W / 2, -H / 2); ctx.restore(); }
      else ctx.drawImage(buf, 0, 0);
      post(ev, lt, buf, (t, gg) => { const b2 = mkCanvas(W, H); const main = ctx; ctx = b2.getContext('2d'); camera(ev, t); B.draw(remap(ev, t)); ctx = main; gg.drawImage(b2, 0, 0); });
      texts.forEach((e, i) => text(e, lt, texts[i + 1] ? texts[i + 1].a - .05 : 99)); } }; };
  // every vis kind (world kits, brand, bespoke episode sets) accepts dir=: wrapped when a story compiles (vis.js keeps its own K reference)
  IFM.wrapAll = () => { for (const k of Object.keys(VIS.K)) { const f = VIS.K[k]; if (typeof f !== 'function' || f._dir) continue; const g = (o, c, Pal, dur, i) => { const B = f(o, c, Pal, dur, i); return o && o.dir ? IFM.direct(B, o, c, dur) : B; }; g._dir = 1; VIS.K[k] = g; } };
  // ---------------------------------------------------------------- 3D transitions
  const TR = window.TR2_DUR = window.TR2_DUR || {};
  FX.flip3d = (A, B, p) => { const q = E.inOut(p), sx = Math.abs(Math.cos(q * Math.PI)), img = q < .5 ? A : B; IFM.nightBg(0, { grid: false }); ctx.save(); ctx.translate(W / 2, H / 2); ctx.transform(Math.max(.01, sx), (1 - sx) * .1 * (q < .5 ? 1 : -1), 0, 1 - (1 - sx) * .08, 0, 0); ctx.drawImage(img, -W / 2, -H / 2); ctx.restore(); }; TR.flip3d = .7;
  FX.fold = (A, B, p) => { const q = E.inOut(p); ctx.drawImage(B, 0, 0); ctx.save(); ctx.globalAlpha = 1 - q * .2; const half = W / 2; ctx.drawImage(A, 0, 0, half, H, 0, 0, half, H); ctx.translate(half, 0); ctx.transform(Math.max(.01, Math.cos(q * Math.PI / 2)), -q * .15, 0, 1, 0, 0); ctx.drawImage(A, half, 0, half, H, 0, 0, half, H); ctx.fillStyle = `rgba(0,0,0,${q * .5})`; ctx.fillRect(0, 0, half, H); ctx.restore();
    if (q > .5) { ctx.save(); const q2 = (q - .5) * 2; ctx.translate(half, 0); ctx.transform(-Math.max(.01, Math.cos((1 - q2) * Math.PI / 2)), q2 * .15, 0, 1, 0, 0); ctx.restore(); ctx.save(); ctx.globalAlpha = q2; ctx.drawImage(B, 0, 0); ctx.restore(); } }; TR.fold = .8;
  FX.shatter = (A, B, p) => { ctx.drawImage(B, 0, 0); const u = U(), r = rng(9), n = 7, m = 5, q = E.in(p); for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const w = W / n, h = H / m, x = i * w, y = j * h, d = q * (1 + r()) ; ctx.save(); ctx.globalAlpha = 1 - q; ctx.translate(x + w / 2 + (r() - .5) * 300 * u * d, y + h / 2 + d * H * .8 * (.5 + r())); ctx.rotate((r() - .5) * 2 * d); ctx.drawImage(A, x, y, w, h, -w / 2, -h / 2, w, h); ctx.restore(); } }; TR.shatter = .75;
  FX.pixel = (A, B, p) => { const img = p < .5 ? A : B, k = Math.sin(p * Math.PI), s = Math.max(1, Math.round(k * 48)); const b = mkCanvas(Math.ceil(W / s), Math.ceil(H / s)); b.getContext('2d').drawImage(img, 0, 0, b.width, b.height); ctx.save(); ctx.imageSmoothingEnabled = false; ctx.drawImage(b, 0, 0, W, H); ctx.restore(); }; TR.pixel = .6;
  FX.tunnel = (A, B, p) => { const q = E.in(p), u = U(); ctx.drawImage(B, 0, 0); ctx.save(); for (let i = 0; i < 6; i++) { const s = 1 + q * (2 + i * 1.5); ctx.globalAlpha = (1 - q) * (1 - i / 6); ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-W / 2, -H / 2); ctx.drawImage(A, 0, 0); ctx.setTransform(1, 0, 0, 1, 0, 0); } ctx.restore(); ctx.save(); ctx.globalAlpha = Math.sin(p * Math.PI) * .6; ctx.strokeStyle = P.teal; ctx.lineWidth = 4 * u; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(W / 2, H / 2, ((q * 3 + i / 5) % 1) * Math.hypot(W, H) * .6, 0, TAU); ctx.stroke(); } ctx.restore(); }; TR.tunnel = .7;
})();
