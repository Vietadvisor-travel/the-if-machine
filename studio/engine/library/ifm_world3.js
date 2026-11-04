/* THE IF MACHINE — world kit 3 + layers on any `# vis kind=w` beat (owner, 3 Nov 2026: more effects, more life).
   Layers (any world act):
     fx=rain|snow|dust|sparks|rays|bokeh|embers|glitch|confetti|fireflies|holo   (combine with +: fx=rain+rays)
     look=blueprint|xray|night|vintage|mono|warm|cold                             (a whole-frame treatment for that beat)
   Acts:
     scale    items="person,bus,tower,mountain,earth" labels="YOU|A BUS|…"   a size ladder, the camera pulls back with each step
              (one familiar thing beside every big number); kinds: person car bus whale tower plane mountain earth moon sun
     guess    a="ON TIME" b="LATE" (answer=a|b)  the viewer commits: two cards, a 3-2-1, the machine lights one (before the twist)
     animals  kinds="dog,cat,horse,dino,bird,fish,whale,robot" n=  time=  pose=walk|run|stand  view=field|sea|sky             */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT) return;
  const P = IFM.P, A = IFM.ACT, T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d, num = (o, k, d) => (o[k] != null && o[k] !== '' ? +o[k] : d);

  // ---------------------------------------------------------------- particle / light layers
  function layer(kind, lt, seed = 1) { const u = U(), r = rng(seed * 17 + kind.length); ctx.save();
    switch (kind) {
      case 'rain': ctx.strokeStyle = 'rgba(190,210,255,.45)'; ctx.lineWidth = 2 * u; ctx.beginPath(); for (let i = 0; i < 160; i++) { const x = (r() * W * 1.2 + lt * 120 * u) % (W * 1.2) - W * .1, y = (r() * H + lt * 1400 * u * (.8 + r() * .4)) % (H + 60 * u) - 30 * u; ctx.moveTo(x, y); ctx.lineTo(x - 8 * u, y + 34 * u); } ctx.stroke(); break;
      case 'snow': ctx.fillStyle = 'rgba(255,255,255,.85)'; for (let i = 0; i < 140; i++) { const s = (1.5 + r() * 4) * u, x = (r() * W + Math.sin(lt + i) * 30 * u + W) % W, y = (r() * H + lt * (40 + r() * 60) * u) % H; ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fill(); } break;
      case 'dust': for (let i = 0; i < 70; i++) { const x = (r() * W + lt * (8 + r() * 14) * u) % W, y = (r() * H - lt * 6 * u + H) % H; ctx.globalAlpha = .15 + .25 * Math.abs(Math.sin(lt + i)); ctx.fillStyle = '#FFF1D0'; ctx.beginPath(); ctx.arc(x, y, (1 + r() * 2.5) * u, 0, TAU); ctx.fill(); } break;
      case 'sparks': case 'embers': for (let i = 0; i < 60; i++) { const life = (lt * (.6 + r() * .8) + r()) % 1, x = r() * W + Math.sin(lt * 3 + i) * 20 * u, y = H * (1.05 - life * (kind === 'sparks' ? 1.1 : .8)); ctx.globalAlpha = 1 - life; ctx.fillStyle = kind === 'sparks' ? '#FFE08A' : '#FF8A4A'; ctx.beginPath(); ctx.arc(x, y, (kind === 'sparks' ? 2 : 3) * u, 0, TAU); ctx.fill(); glow(x, y, 14 * u, ctx.fillStyle, .4 * (1 - life)); } break;
      case 'rays': ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 6; i++) { const a = -.9 + i * .14 + Math.sin(lt * .4 + i) * .03, g = ctx.createLinearGradient(W * .15, 0, W * .15 + Math.cos(a) * H * 1.6, Math.sin(-a) * -H * 1.6); g.addColorStop(0, 'rgba(255,240,200,.22)'); g.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(W * .1, -10); ctx.lineTo(W * .1 + Math.cos(a) * H * 2, Math.sin(-a) * -H * 2); ctx.lineTo(W * .1 + Math.cos(a + .06) * H * 2, Math.sin(-(a + .06)) * -H * 2); ctx.fill(); } break;
      case 'bokeh': ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 26; i++) { const x = (r() * W + Math.sin(lt * .3 + i) * 40 * u), y = r() * H, s = (20 + r() * 60) * u; ctx.globalAlpha = .12 + .1 * Math.sin(lt + i); ctx.fillStyle = [P.yellow, P.teal, P.coral, '#FFFFFF'][i % 4]; ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.fill(); } break;
      case 'fireflies': ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 40; i++) { const x = r() * W + Math.sin(lt * .7 + i * 2) * 50 * u, y = H * (.4 + r() * .55) + Math.cos(lt * .9 + i) * 30 * u, a = Math.max(0, Math.sin(lt * 2 + i * 1.7)); glow(x, y, 26 * u, '#D8FF8A', .6 * a); ctx.globalAlpha = a; ctx.fillStyle = '#F4FFC8'; ctx.beginPath(); ctx.arc(x, y, 2.4 * u, 0, TAU); ctx.fill(); } break;
      case 'confetti': for (let i = 0; i < 90; i++) { const x = r() * W + Math.sin(lt * 2 + i) * 30 * u, y = (r() * H * 1.3 + lt * (180 + r() * 160) * u) % (H * 1.3) - H * .15; ctx.save(); ctx.translate(x, y); ctx.rotate(lt * 4 + i); ctx.fillStyle = [P.yellow, P.coral, P.teal, P.paper][i % 4]; ctx.fillRect(-6 * u, -3 * u, 12 * u, 6 * u * Math.abs(Math.sin(lt * 6 + i))); ctx.restore(); } break;
      case 'glitch': if ((lt * 7 % 1) < .35) for (let i = 0; i < 7; i++) { const y = r() * H, hh = (4 + r() * 26) * u; ctx.globalAlpha = .5; ctx.fillStyle = [P.coral, P.teal, '#FFFFFF'][i % 3]; ctx.fillRect(0, (y + lt * 400) % H, W, hh); } break;
      case 'holo': ctx.globalAlpha = .08; ctx.fillStyle = P.teal; for (let y = (lt * 40 * u) % (8 * u); y < H; y += 8 * u) ctx.fillRect(0, y, W, 2 * u); ctx.globalAlpha = .3; ctx.fillStyle = P.teal; ctx.fillRect(0, (lt * 220 * u) % H, W, 3 * u); break;
    } ctx.restore(); }
  IFM.layer = layer;
  const FILT = { blueprint: 'grayscale(1) contrast(1.35) brightness(1.05)', xray: 'grayscale(1) invert(1) brightness(1.1) contrast(1.4)', night: 'grayscale(1) sepia(1) hue-rotate(60deg) saturate(4) brightness(.9) contrast(1.2)',
    vintage: 'sepia(.65) saturate(.8) contrast(1.05) brightness(.97)', mono: 'grayscale(1) contrast(1.15)', warm: 'sepia(.25) saturate(1.25) hue-rotate(-8deg)', cold: 'saturate(.8) hue-rotate(12deg) brightness(.95)' };
  let BUF = null; IFM.withLook = (look, draw) => { const f = FILT[look]; if (!f) return draw(); if (!BUF || BUF.width !== W || BUF.height !== H) BUF = mkCanvas(W, H); const main = ctx; ctx = BUF.getContext('2d'); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
    try { draw(); } finally { ctx = main; } ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.filter = f; ctx.drawImage(BUF, 0, 0); ctx.filter = 'none'; if (look === 'blueprint') { ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#1E6BD0'; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = .6; IFM.grid(.18, 0, 60); } if (look === 'night') { const g = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * .8); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); } ctx.restore(); };

  // ---------------------------------------------------------------- scale ladder
  IFM.thing = (k, x, y, h, lt) => thing(k, x, y, h, lt);
  function thing(k, x, y, h, lt) { const u = h / 100; switch (k) {
    case 'person': IFM.human(x, y, h, 11, 'stand', lt, {}); break;
    case 'car': rr(x - 50 * u, y - 36 * u, 100 * u, 26 * u, 10 * u, '#E8574A', 0); poly([[x - 28 * u, y - 36 * u], [x - 16 * u, y - 60 * u], [x + 22 * u, y - 60 * u], [x + 34 * u, y - 36 * u]], '#C9473C', 0); circ(x - 28 * u, y - 10 * u, 11 * u, '#222', 0); circ(x + 28 * u, y - 10 * u, 11 * u, '#222', 0); break;
    case 'bus': rr(x - 120 * u, y - 100 * u, 240 * u, 86 * u, 12 * u, P.yellow, 0); for (let i = 0; i < 6; i++) rr(x - 108 * u + i * 38 * u, y - 90 * u, 30 * u, 30 * u, 4 * u, '#2D3A66', 0); circ(x - 70 * u, y - 12 * u, 14 * u, '#222', 0); circ(x + 70 * u, y - 12 * u, 14 * u, '#222', 0); break;
    case 'whale': ctx.save(); ctx.translate(x, y - 50 * u); IFM.creature('whale', 0, 0, 100 * u * .6, lt, {}); ctx.restore(); break;
    case 'plane': rr(x - 160 * u, y - 60 * u, 320 * u, 40 * u, 20 * u, '#E9EEF5', 0); poly([[x - 30 * u, y - 40 * u], [x + 40 * u, y - 40 * u], [x - 60 * u, y + 20 * u]], '#C9D2DE', 0); poly([[x - 160 * u, y - 60 * u], [x - 180 * u, y - 110 * u], [x - 130 * u, y - 60 * u]], P.coral, 0); break;
    case 'tower': poly([[x - 40 * u, y], [x - 8 * u, y - 100 * u], [x + 8 * u, y - 100 * u], [x + 40 * u, y]], '#5E6F98', 0); poly([[x, y], [x - 8 * u, y - 100 * u], [x + 8 * u, y - 100 * u], [x + 40 * u, y]], '#4A5A82', 0); line(x, y - 100 * u, x, y - 116 * u, 2 * u, '#5E6F98'); break;
    case 'mountain': poly([[x - 80 * u, y], [x, y - 100 * u], [x + 80 * u, y]], '#6C7FA6', 0); poly([[x, y - 100 * u], [x + 80 * u, y], [x + 10 * u, y]], '#55668C', 0); poly([[x - 22 * u, y - 72 * u], [x, y - 100 * u], [x + 20 * u, y - 74 * u], [x + 4 * u, y - 66 * u]], '#F6F1E7', 0); break;
    case 'earth': IFM.globe(x, y - 50 * u, 50 * u, lt, { clouds: false }); break; case 'moon': IFM.planet(x, y - 50 * u, 50 * u, 'moon', lt); break; case 'sun': IFM.planet(x, y - 50 * u, 50 * u, 'sun', lt); break;
    default: rr(x - 40 * u, y - 100 * u, 80 * u, 100 * u, 8 * u, P.teal, 0); } }
  const SIZE = { person: 1.75, car: 1.5, bus: 3.2, whale: 6, plane: 18, tower: 330, mountain: 8800, moon: 3.47e6, earth: 1.27e7, sun: 1.39e9 }, ASP = { person: .35, car: 2.1, bus: 2.5, whale: 4.5, plane: 3.6, tower: .8, mountain: 1.6, moon: 1, earth: 1, sun: 1 };
  A.scale = (o, c, dur) => { const items = String(o.items || 'person,bus,tower,mountain').split(','), labels = String(o.labels || '').split('|'), n = items.length; const at = items.map((_, i) => T0(c, i, .3 + i * (dur / n)));
    return { sfx: items.map((_, i) => [at[i], ['ifm_motion_pop', 'ifm_motion_impact_soft', 'ifm_motion_impact_thump', 'ifm_motion_impact_big'][Math.min(3, i)]]),
    draw: lt => { const u = U(), v = H > W; IFM.nightBg(lt, { cy: .7 }); const gy = H * (v ? .56 : .8); ctx.fillStyle = '#141833'; ctx.fillRect(0, gy, W, H - gy); line(0, gy, W, gy, 3 * u, 'rgba(46,230,197,.4)');
      let k = 0; at.forEach((t, i) => { if (lt >= t) k = i; }); const sz = i => SIZE[items[i]] || 1, asp = i => ASP[items[i]] || 1;
      const fit = i => Math.min(H * (v ? .3 : .5), W * .5 / asp(i)) / sz(i); // px per metre that makes item i the hero (fits the frame both ways)
      const e = E.inOut(clamp((lt - at[k]) / .9)), s = k ? Math.exp(lerp(Math.log(fit(k - 1)), Math.log(fit(k)), e)) : fit(0);
      let x = W * (v ? .62 : .6); for (let i = k; i >= 0; i--) { const hp = sz(i) * s * (i === k && lt < at[i] + .45 ? E.back(clamp((lt - at[i]) / .45)) : 1), wp = hp * asp(i); if (hp < 1.5) { circ(x, gy - 4 * u, 3 * u, P.coral, 0); x -= 24 * u; continue; }
        thing(items[i], x, gy, hp, lt); if (labels[i] && x > W * .1 && x < W * .9) T(labels[i], x, gy + 40 * u + (i % 2) * 34 * u, { size: (v ? 28 : 26) * u, font: 'mono', fill: i === k ? P.teal : P.steel, lw: 0, alpha: clamp((lt - at[i]) / .3) }); x -= wp / 2 + Math.max(30 * u, (sz(Math.max(0, i - 1)) * s * asp(Math.max(0, i - 1))) / 2) + 24 * u; } } }; };

  // ---------------------------------------------------------------- guess before the twist
  A.guess = (o, c, dur) => { const tPick = num(o, 'at', Math.max(2.4, dur - 1.4)); return { sfx: [[.2, 'ifm_motion_slide_up'], [tPick - 2.4, 'ifm_world_clock_tick'], [tPick - 1.6, 'ifm_world_clock_tick'], [tPick - .8, 'ifm_world_clock_tick'], [tPick, 'ifm_machine_chime'], [tPick, 'ifm_motion_impact_big']],
    draw: lt => { const u = U(), v = H > W; IFM.nightBg(lt, { cy: .45 }); const cw = v ? W * .78 : W * .34, ch = v ? H * .14 : H * .44, gap = v ? H * .025 : W * .05; const pos = v ? [[W / 2 - cw / 2, H * .29], [W / 2 - cw / 2, H * .29 + ch + gap]] : [[W / 2 - cw - gap / 2, H * .24], [W / 2 + gap / 2, H * .24]];
      const win = (o.answer || 'b') === 'a' ? 0 : 1, done = lt >= tPick; T('YOUR GUESS?', W / 2, v ? H * .245 : H * .14, { size: (v ? 46 : 42) * u, font: 'display', fill: P.paper, lw: 0, scale: E.back(clamp(lt / .4)) });
      [o.a || 'A', o.b || 'B'].forEach((txt, i) => { const [x, y] = pos[i], k = E.back(clamp((lt - .2 - i * .15) / .4)), lose = done && i !== win, hit = done && i === win; ctx.save(); ctx.translate(x + cw / 2, y + ch / 2); ctx.scale(k * (hit ? 1 + .05 * Math.sin((lt - tPick) * 10) * Math.exp(-(lt - tPick) * 2) : 1), k); ctx.globalAlpha *= lose ? .35 : 1;
        rr(-cw / 2 + 8 * u, -ch / 2 + 10 * u, cw, ch, 24 * u, 'rgba(0,0,0,.4)', 0); rr(-cw / 2, -ch / 2, cw, ch, 24 * u, hit ? P.yellow : '#232B5A', 0); ctx.strokeStyle = hit ? P.yellow : 'rgba(140,149,184,.5)'; ctx.lineWidth = 4 * u; ctx.stroke();
        T(i ? 'B' : 'A', -cw / 2 + 50 * u, -ch / 2 + 46 * u, { size: 30 * u, font: 'mono', fill: hit ? P.midnight : P.teal, lw: 0 }); const fs = Math.min((v ? 60 : 56) * u, cw * .8 / Math.max(1, textW(String(txt).toUpperCase(), 100, 'display')) * 100); T(String(txt).toUpperCase(), 0, 8 * u, { size: fs, font: 'display', fill: hit ? P.midnight : P.paper, lw: 0 }); ctx.restore(); if (hit) glow(x + cw / 2, y + ch / 2, cw * .8, P.yellow, .3 * Math.exp(-(lt - tPick))); });
      if (!done && lt > tPick - 2.4) { const nn = Math.ceil(tPick - lt), q = (tPick - lt) % 1; T(String(Math.min(3, nn)), W / 2, v ? H * .76 : H * .84, { size: (90 + 30 * q) * u, font: 'display', fill: P.yellow, lw: 0, alpha: .4 + .6 * q }); } } }; };

  // ---------------------------------------------------------------- animals
  A.animals = (o, c, dur) => { const kinds = String(o.kinds || 'dog,cat,horse').split(','), n = num(o, 'n', kinds.length * 2), view = o.view || 'field'; return { sfx: [[.1, view === 'sea' ? 'amb_waves' : view === 'sky' ? 'ifm_world_wind_forest' : 'amb_countryside']], draw: lt => { const u = U(), v = H > W;
    if (view === 'sea') { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#1C6FA8'); g.addColorStop(1, '#0A2340'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); IFM.layer('rays', lt); const r = rng(4); for (let i = 0; i < n; i++) { const k = kinds[i % kinds.length], x = ((r() * W * 1.4 + lt * (30 + r() * 50) * u) % (W * 1.4)) - W * .2, y = H * (.2 + r() * .65); IFM.creature(k === 'whale' ? 'whale' : 'fish', x, y, H * (k === 'whale' ? .12 : .05), lt, { seed: i, col: k === 'whale' ? undefined : ['#F28A2E', '#F2B33D', '#E8574A', '#5BC0EB'][i % 4] }); } IFM.layer('bokeh', lt, 3); return; }
    if (view === 'sky') { IFM.sky(o.time || 'day', lt); const r = rng(5); for (let i = 0; i < n; i++) { const x = ((r() * W * 1.4 + lt * (60 + r() * 60) * u) % (W * 1.4)) - W * .2, y = H * (.15 + r() * .5) + Math.sin(lt * 2 + i) * 10 * u; IFM.creature('bird', x, y, H * (.025 + r() * .03), lt, { seed: i, col: ['#2D3A66', '#E8574A', '#3E7CE0'][i % 3] }); } return; }
    IFM.sky(o.time || 'day', lt); const gy = H * (v ? .5 : .78); const g = ctx.createLinearGradient(0, gy, 0, H); g.addColorStop(0, o.time === 'night' ? '#14203A' : '#7CB85C'); g.addColorStop(1, o.time === 'night' ? '#0A1022' : '#4F8F4A'); ctx.fillStyle = g; ctx.fillRect(0, gy, W, H - gy);
    const r = rng(6), L = []; for (let i = 0; i < n; i++) L.push({ k: kinds[i % kinds.length], x: r(), d: r(), dir: r() < .5 ? -1 : 1 }); L.sort((a, b) => a.d - b.d);
    for (const a of L) { const h = H * (a.k === 'horse' || a.k === 'dino' ? .2 : a.k === 'robot' ? .16 : .1) * lerp(.6, 1, a.d), y = gy + (H - gy) * .05 + a.d * (H - gy) * (v ? .14 : .7), sp = (o.pose || 'walk') === 'run' ? 140 : (o.pose === 'stand' ? 0 : 60); const x = ((a.x * W * 1.3 + lt * sp * u * a.dir * lerp(.6, 1, a.d)) % (W * 1.3) + W * 1.3) % (W * 1.3) - W * .15;
      if (a.k === 'bird') IFM.creature('bird', x, gy - H * .25 * a.d, H * .04, lt, { seed: a.x * 99 }); else IFM.creature(a.k, x, y, h, lt, { pose: o.pose || 'walk', flip: a.dir < 0, seed: a.x * 99 }); } } }; };

  // ---------------------------------------------------------------- hook the layers into the world dispatcher
  const K = VIS.K.w; VIS.K.w = (o, c, Pal, dur, i) => { const B = K({ ...o, _noWords: 1 }, c, Pal, dur, i); const fx = String(o.fx || '').split('+').filter(Boolean);
    const sfx = B.sfx.slice(); fx.forEach(f => { const s = { rain: 'ifm_world_rain', snow: 'ifm_world_wind_snow', glitch: 'ifm_sci_glitch_zap', confetti: 'crowd_cheer', sparks: 'magic_sparkle', holo: 'ifm_sci_hologram' }[f]; if (s) sfx.push([.1, s]); });
    return { sfx, draw: lt => { IFM.withLook(o.look, () => B.draw(lt)); fx.forEach((f, j) => layer(f, lt, (i || 0) + j)); if (IFM.lifeHook) IFM.lifeHook(o, lt, i); B.letters(lt); } }; };
})();
