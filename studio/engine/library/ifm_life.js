/* THE IF MACHINE — life and depth on every world beat (owner, 4 Nov 2026: livelier scenes, picture before data, polish).
   Automatic unless switched off:
     life   secondary motion that fits the act (birds, leaves, insects, shooting stars, blinking aircraft, dust, ripples)
            override: life=birds+leaves | life=off ; kinds: birds leaves butterflies stars plane dust ripples fireflies
     fg     a blurred foreground silhouette that drifts against the camera (depth, framing): fg=leaves|branch|window|blinds|grass|rocks|crowd|wires
            default per act (city: wires, field: grass, crowd: crowd…); fg=off to remove
   Crowds react: `react="shock@1|cheer@2"` on act=crowd/stage people — the reaction ripples across the crowd from one side. */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT || !VIS || !VIS.K) return;
  const P = IFM.P;
  const LIFE = { globe: 'stars', zoom: '', city: 'birds+plane', crowd: 'leaves+dust', map: '', count: '', split: '', phone: 'dust', servers: 'dust', sky: 'birds+butterflies', space: 'stars', money: 'dust', scale: '', guess: '', animals: 'butterflies+birds', stage: 'dust' };
  const FG = { city: 'wires', crowd: 'crowd', sky: 'grass', animals: 'grass', space: 'rocks', phone: 'blinds', money: 'window', globe: '', zoom: '', map: '', count: '', split: '', servers: '', scale: '', guess: '', stage: '' };
  function bird(x, y, s, f) { ctx.beginPath(); ctx.moveTo(x - 10 * s, y - 4 * s * f); ctx.quadraticCurveTo(x - 4 * s, y - 6 * s * f, x, y); ctx.quadraticCurveTo(x + 4 * s, y - 6 * s * f, x + 10 * s, y - 4 * s * f); ctx.stroke(); }
  IFM.life = (kinds, lt, seed = 1, night = false) => { const u = U(), r0 = rng(seed); ctx.save();
    for (const k of String(kinds).split('+').filter(Boolean)) { const r = rng(seed * 7 + k.length);
      if (k === 'birds') { ctx.strokeStyle = night ? 'rgba(220,230,255,.6)' : 'rgba(30,30,50,.75)'; ctx.lineWidth = 2.2 * u; ctx.lineCap = 'round'; const fx = ((lt * 50 * u + r() * W) % (W * 1.6)) - W * .3, fy = H * (.12 + r() * .15);
        for (let i = 0; i < 7; i++) { const x = fx + (i % 2 ? -1 : 1) * Math.ceil(i / 2) * 26 * u, y = fy + Math.ceil(i / 2) * 14 * u + Math.sin(lt * 2 + i) * 3 * u; bird(x, y, u * (.9 + r() * .3), Math.sin(lt * 9 + i * 1.3)); } }
      else if (k === 'plane') { const x = ((lt * 30 * u + W * .2) % (W * 1.4)) - W * .2, y = H * .09; ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillRect(x, y, 26 * u, 3 * u); if ((lt * 1.4) % 1 < .25) { ctx.fillStyle = P.coral; ctx.beginPath(); ctx.arc(x, y + 1 * u, 3 * u, 0, TAU); ctx.fill(); } }
      else if (k === 'leaves') for (let i = 0; i < 14; i++) { const x = (r() * W + lt * (40 + r() * 40) * u) % (W + 40 * u) - 20 * u, y = (r() * H + lt * (30 + r() * 30) * u) % H, a = lt * 2 + i; ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.fillStyle = ['#7CB85C', '#E8A23C', '#C9473C'][i % 3]; ctx.globalAlpha = .75; ctx.beginPath(); ctx.ellipse(0, 0, 7 * u, 3.5 * u * Math.abs(Math.cos(a)), 0, 0, TAU); ctx.fill(); ctx.restore(); }
      else if (k === 'butterflies') for (let i = 0; i < 6; i++) { const x = W * (.1 + r() * .8) + Math.sin(lt * .9 + i * 2) * 60 * u, y = H * (.5 + r() * .3) + Math.cos(lt * 1.3 + i) * 30 * u, f = Math.abs(Math.sin(lt * 14 + i)); ctx.fillStyle = ['#F2B33D', '#F28AA5', '#5BC0EB'][i % 3]; ctx.beginPath(); ctx.ellipse(x - 5 * u * f, y, 5 * u * f + 1, 6 * u, -.4, 0, TAU); ctx.ellipse(x + 5 * u * f, y, 5 * u * f + 1, 6 * u, .4, 0, TAU); ctx.fill(); }
      else if (k === 'stars') { const ph = (lt * .35 + r()) % 1; if (ph < .25) { const q = ph / .25, x = W * (.15 + r() * .6) + q * 260 * u, y = H * (.08 + r() * .25) + q * 90 * u; const g = ctx.createLinearGradient(x - 120 * u, y - 42 * u, x, y); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, `rgba(255,255,255,${.8 * (1 - q)})`); ctx.strokeStyle = g; ctx.lineWidth = 2.4 * u; ctx.beginPath(); ctx.moveTo(x - 120 * u, y - 42 * u); ctx.lineTo(x, y); ctx.stroke(); } }
      else if (k === 'dust') for (let i = 0; i < 40; i++) { const x = (r() * W + Math.sin(lt * .3 + i) * 30 * u + lt * 6 * u) % W, y = (r() * H - lt * 8 * u + H * 2) % H; ctx.globalAlpha = .12 + .2 * Math.abs(Math.sin(lt * .8 + i)); ctx.fillStyle = '#FFF4DA'; ctx.beginPath(); ctx.arc(x, y, (1 + r() * 2) * u, 0, TAU); ctx.fill(); }
      else if (k === 'ripples') for (let i = 0; i < 5; i++) { const q = (lt * .5 + i / 5) % 1, x = W * (.2 + r() * .6), y = H * (.75 + r() * .2); ctx.globalAlpha = (1 - q) * .4; ctx.strokeStyle = '#DDEBFF'; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.ellipse(x, y, q * 80 * u, q * 20 * u, 0, 0, TAU); ctx.stroke(); }
      else if (IFM.layer) IFM.layer(k, lt, seed); }
    ctx.restore(); };
  IFM.fg = (kind, lt, camX = 0) => { if (!kind || kind === 'off') return; const u = U(), v = H > W, dx = Math.sin(lt * .35) * 26 * u - camX; ctx.save(); ctx.filter = 'blur(' + Math.round(7 * u) + 'px)'; ctx.globalAlpha = .92; const ink = '#070915';
    switch (kind) {
      case 'leaves': case 'branch': for (let i = 0; i < 9; i++) { const x = dx + (i < 5 ? -40 * u + i * 34 * u : W + 40 * u - (i - 5) * 34 * u), y = (i % 5) * H * .1 + 20 * u; ctx.fillStyle = ink; ctx.beginPath(); ctx.ellipse(x, y, 60 * u, 22 * u, (i < 5 ? .6 : -.6) + Math.sin(lt + i) * .06, 0, TAU); ctx.fill(); } break;
      case 'grass': ctx.fillStyle = ink; ctx.beginPath(); ctx.moveTo(0, H); for (let x = -20 * u; x <= W + 20 * u; x += 14 * u) { const hgt = (40 + 30 * Math.abs(Math.sin(x * .07))) * u * (v ? 1.2 : 1); ctx.lineTo(x + dx * .5 + Math.sin(lt * 1.6 + x * .02) * 6 * u, H - hgt); ctx.lineTo(x + 7 * u, H); } ctx.fill(); break;
      case 'rocks': ctx.fillStyle = ink; ctx.beginPath(); ctx.ellipse(dx - 20 * u, H + 20 * u, W * .22, 90 * u, 0, 0, TAU); ctx.ellipse(W + dx + 30 * u, H + 30 * u, W * .2, 110 * u, 0, 0, TAU); ctx.fill(); break;
      case 'window': ctx.fillStyle = ink; ctx.fillRect(0, 0, W, 36 * u); ctx.fillRect(0, H - 36 * u, W, 36 * u); ctx.fillRect(0, 0, 36 * u, H); ctx.fillRect(W - 36 * u, 0, 36 * u, H); ctx.fillRect(W / 2 - 9 * u + dx * .3, 0, 18 * u, H); break;
      case 'blinds': ctx.globalAlpha = .35; ctx.fillStyle = ink; for (let y = (lt * 4 * u) % (46 * u); y < H; y += 46 * u) ctx.fillRect(0, y, W, 16 * u); break;
      case 'crowd': ctx.fillStyle = ink; for (let i = 0; i < 6; i++) { const x = (i < 3 ? i * 110 * u - 60 * u : W - (i - 3) * 110 * u + 60 * u) + dx, y = H + 40 * u; ctx.beginPath(); ctx.ellipse(x, y - 150 * u, 46 * u, 56 * u, 0, 0, TAU); ctx.ellipse(x, y, 110 * u, 130 * u, 0, 0, TAU); ctx.fill(); } break;
      case 'wires': ctx.filter = 'blur(' + Math.round(3 * u) + 'px)'; ctx.strokeStyle = ink; ctx.lineWidth = 5 * u; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(-20 * u, H * (.06 + k * .05)); ctx.quadraticCurveTo(W / 2 + dx, H * (.16 + k * .05), W + 20 * u, H * (.04 + k * .05)); ctx.stroke(); } break; }
    ctx.restore(); };
  // called by the world dispatcher (ifm_world3) between the scene and its lettering, so text always stays on top
  IFM.lifeHook = (o, lt, i) => { const act = o.act || 'globe', life = o.life != null ? o.life : (LIFE[act] ?? ''), fg = o.fg != null ? o.fg : (FG[act] ?? ''), night = /night|dusk/.test(o.time || '') || ['globe', 'space', 'zoom'].includes(act);
    if (life && life !== 'off') IFM.life(life, lt, (i || 0) + 3, night); if (fg && fg !== 'off') IFM.fg(fg, lt); };
})();
