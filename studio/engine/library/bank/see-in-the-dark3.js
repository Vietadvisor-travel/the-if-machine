/* "Nhìn xuyên bóng tối" — part 3: four content beats added after the first render ran short (5:14): grey nights, averted vision,
   the eye that wakes up, the heat-sensor podium. Same rules as parts 1–2. */
'use strict';
(function () {
  if (!window.IFM || !IFM.CT || !IFM.SD || !IFM.CAST || !IFM.CAST.kit) return;
  const A = IFM.ACT, CT = IFM.CT, CR = IFM.CAST, KIT = CR.kit, GAG = CR.GAG, CREW = CR.draw, SD = IFM.SD;
  const { flat, fo, sticker, burst, sparkle, hills, tree, bush } = KIT, { rectF, polyF, tube } = CR, { rig, ph, pb, T0, txt, mono, sign } = CT, { eyes, bigEye, rod, night, grad, fill } = SD, INK = '#26233A';

  // ================================================================ S10b x_sd_grey — a garden at dusk loses its colours; on a card the colour-hatted cones fall asleep while the rods wake up
  function flower(x, y, s, col, lt, k) { tube(x, y, x + Math.sin(lt + k) * s * .1, y - s, s * .08, '#3FB984'); for (let i = 0; i < 6; i++) { const a = i * TAU / 6 + lt * .2; fo(x + Math.cos(a) * s * .22, y - s + Math.sin(a) * s * .22, s * .16, s * .12, col, .1, a); } fo(x, y - s, s * .12, s * .12, '#FFE066', .1); }
  A.x_sd_grey = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U(), q = ph(lt, .5, dur * .75); CT.begin(o, lt);
    rig(lt, [[0, W * .3, H * .56, 1.4, -.05], [dur * .5, W * .55, H * .5, 1.12, .03], [dur, W * .6, H * .46, 1.0, -.02]], () => { ctx.fillStyle = grad(mix('#FF9A6B', '#0B1030', q), mix('#FFE0B8', '#27306B', q)); ctx.fillRect(-W, -H, W * 3, H * 3); fo(W * .8, H * (.3 + q * .2), W * .09, W * .09, mix('#FFF4C2', '#3A4378', q), .08); CT.stars(120, 7, q, .5);
      hills(mix('#7BC97A', '#1F3A4F', q), mix('#5DB35E', '#1A3142', q), H * .55); rectF(-W, H * .66, W * 3, H, 0, mix('#5DB35E', '#16303A', q), { plane: 0 });
      ctx.save(); ctx.globalAlpha = 1; [['#FF4D4D', .12], ['#FFC93C', .26], ['#3E8EDE', .4], ['#FF4D6D', .56], ['#B5179E', .7], ['#FF9F1C', .86]].forEach(([col, x], k) => flower(W * x, H * .7, H * (.1 + (k % 2) * .03), col, lt, k)); ctx.restore();
      for (let i = 0; i < 10; i++) { const r = rng(i + 4), pq = (lt * .3 + r()) % 1; ctx.save(); ctx.globalAlpha = Math.sin(pq * Math.PI); ctx.translate(W * r() + pq * W * .2, H * (.4 + pq * .3)); ctx.rotate(pq * 6); fo(0, 0, 10 * u, 6 * u, ['#FF4D4D', '#FFC93C', '#3E8EDE'][i % 3], 0); ctx.restore(); } CT.tint('grey', q * .95, [-W, H * .45, W * 3, H]); CT.dark(q * .45, []); for (let i = 0; i < 8; i++) { const r = rng(i + 30); ctx.save(); ctx.globalAlpha = q * (.4 + .5 * Math.sin(lt * 3 + i)); CT.photon(W * r() + Math.sin(lt + i) * W * .04, H * (.5 + r() * .15), 4 * u, '#C8FF7A'); ctx.restore(); }
      // the card: cones and rods
      const cx = W * .5, cy = H * .36, cw = W * .7, chh = H * .16; CT.reserve(cx - cw / 2, cy - chh / 2, cw, chh); sticker(() => { rectF(cx - cw / 2, cy - chh / 2, cw, chh, 24 * u, '#1B0F4A', { plane: 0 }); for (let i = 0; i < 3; i++) { rod(cx - cw * .32 + i * cw * .12, cy - chh * .2, cw * .07, chh * .5, lt + i, { sleep: q > .55, col: '#FFD9A8', nomitt: 1 }); fo(cx - cw * .32 + i * cw * .12, cy - chh * .26, cw * .04, cw * .03, ['#FF4D4D', '#7BD389', '#3E8EDE'][i], .1); }
        for (let i = 0; i < 3; i++) rod(cx + cw * .1 + i * cw * .12, cy - chh * .2, cw * .07, chh * .5, lt + i, { sleep: q < .45, lit: q > .55 ? .3 : 0, nomitt: 1 }); }, 5);
      mono('CONES · COLOUR', cx - cw * .2, cy + chh * .38, 20 * u, '#FFD9A8'); mono('RODS · GREY', cx + cw * .22, cy + chh * .38, 20 * u, '#B9A6FF'); });
    CT.end(o, lt, q > .5 ? 1 : 0, .3); } });

  // ================================================================ S16b x_sd_averted — through a telescope eyepiece: the faint star vanishes when stared at, reappears when the gaze slides aside → CUT: a retina with no rods in its centre
  A.x_sd_averted = (o, c, dur) => { const tC = Math.max(CT.at(c, 'because the very', 3), 2.6), tS = CT.at(c, 'so a faint star', 6), tA = CT.at(c, 'and reappear', 9); return { sfx: [], draw: lt => { const u = U(); CT.begin(o, lt);
    rig(lt, [[0, W / 2, H * .46, 1.4, -.05], [dur * .5, W / 2, H * .46, 1.15, .04], [dur, W / 2, H * .46, 1.0, -.02]], () => { fill('#05040F'); const R = W * .4, cx = W / 2, cy = H * .46; ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip(); ctx.save(); ctx.translate(cx, cy); ctx.rotate(lt * .06); ctx.translate(-cx, -cy); night('ev', '#070A22', '#1B2A5E', 1, lt); ctx.restore(); for (let i = 0; i < 3; i++) { const sq = (lt * .3 + i * .33) % 1; ctx.save(); ctx.globalAlpha = Math.sin(sq * Math.PI) * .8; line(cx - R + sq * R * 2, cy - R * .6 + i * R * .4, cx - R + sq * R * 2 - 40 * u, cy - R * .6 + i * R * .4 - 14 * u, 3 * u, '#FFFFFF'); ctx.restore(); }
      const gaze = lt < tA ? 0 : ph(lt, tA, .9), gx = cx + gaze * R * .45, gy = cy - gaze * R * .1, starA = lt < tS ? .9 : lt < tA + .4 ? .9 * (1 - ph(lt, tS, .7)) : ph(lt, tA + .3, .6);
      ctx.save(); ctx.globalAlpha = starA; CT.photon(cx - R * .05, cy - R * .08, 10 * u, '#FFFFFF'); ctx.restore();
      ctx.save(); ctx.strokeStyle = 'rgba(255,224,102,.7)'; ctx.lineWidth = 4 * u; ctx.setLineDash([10 * u, 8 * u]); ctx.beginPath(); ctx.arc(gx, gy, R * .14, 0, TAU); ctx.stroke(); ctx.restore(); mono('YOUR GAZE', gx, gy + R * .2, 20 * u, '#FFE066'); ctx.restore();
      ctx.save(); ctx.strokeStyle = '#26233A'; ctx.lineWidth = 36 * u; ctx.beginPath(); ctx.arc(cx, cy, R + 18 * u, 0, TAU); ctx.stroke(); ctx.restore();
      if (lt > tC) { const k = pb(lt, tC, .6), ex = W * .5, ey = H * .7 - H * .045; ctx.save(); ctx.translate(W * .78, H * .2); ctx.scale(k, k); sticker(() => { fo(0, 0, W * .12, W * .12, '#FFF4E2', .08); for (let i = 0; i < 24; i++) { const a = i * TAU / 24; fo(Math.cos(a) * W * .085, Math.sin(a) * W * .085, 5 * u, 5 * u, '#B9A6FF', 0); } fo(0, 0, W * .035, W * .035, '#FFD9A8', 0); }, 5); ctx.restore(); CT.reserve(W * .64, H * .13, W * .28, H * .14); sign('NO RODS IN THE CENTRE', W * .5, H * .87 - H * .78 + H * .06, 26 * u, lt, tC + .4, { bg: '#B9A6FF' }); }
      if (lt > tS && lt < tA) sign('STARE: GONE', W * .3, H * .66, 28 * u, lt, tS + .3, { bg: '#FF4D6D', col: '#FFFFFF' }); if (lt > tA + .5) sign('LOOK ASIDE: THERE', W * .66, H * .66, 28 * u, lt, tA + .5, { bg: '#7BD389' }); });
    CT.end(o, lt, 1, .4); } }; };

  // ================================================================ S14b x_sd_prime — two particles: the first lands and leaves the eye glowing a little awake; the second is caught with a bigger sparkle
  A.x_sd_prime = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U(), t1 = 1.2, t2 = Math.max(CT.at(c, 'made the next', 3.5), 2.8) + .6; CT.begin(o, lt);
    rig(lt, [[0, W * .4, H * .42, 1.35, -.06], [dur * .5, W * .6, H * .5, 1.05, .04], [dur, W / 2, H * .46, 1.22, -.02]], () => { fill('#05040F'); for (let i = 0; i < 16; i++) { const r = rng(i + 90), a = lt * (.3 + r() * .4) + r() * 6, rr2 = W * (.42 + r() * .2); ctx.save(); ctx.globalAlpha = .35; CT.photon(W / 2 + Math.cos(a) * rr2, H * .46 + Math.sin(a) * rr2 * .9, 3 * U(), '#7FD3FF'); ctx.restore(); } const awake = ph(lt, t1, .6) * (1 - .4 * ph(lt, t2 + 2, 2)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = awake * .6; const g = ctx.createRadialGradient(W / 2, H * .46, 0, W / 2, H * .46, W * .5); g.addColorStop(0, '#2EC4B6'); g.addColorStop(1, 'rgba(46,196,182,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
      bigEye(W / 2, H * .46, W * .36, lt, { iris: '#2EC4B6', pupil: .9, rim: '#151A3F', sclera: '#D9D4E6', lx: Math.sin(lt * .7) * .3 });
      [[t1, -1, 10, 1.1], [t2, 1, 18, .6]].forEach(([tt, sd, sz, dd], i) => { const p = clamp((lt - (tt - dd)) / dd); if (p > 0 && p < 1) CT.photon(lerp(W * (.5 + sd * .6), W / 2, p), lerp(H * .2, H * .46, p), 9 * u); if (lt > tt && lt < tt + .9) { GAG.zing(W / 2, H * .46, W * (.06 + i * .07), lt, i ? '#FFE066' : '#7FF5DD'); CT.photon(W / 2, H * .46, sz * u * (1 - (lt - tt) / .9)); } });
      sign('1ST: A FLICKER', W * .26, H * .24, 28 * u, lt, t1 + .2, { bg: '#7FF5DD' }); sign('2ND: EASIER!', W * .74, H * .64, 30 * u, lt, t2 + .2, { bg: '#FFC93C' }); });
    CT.end(o, lt, 1, .4); } });

  // ================================================================ S25b x_sd_podium — LOW ANGLE: a podium with confetti; the snake's heat gate climbs to gold and gets a tiny crown
  A.x_sd_podium = (o, c, dur) => ({ sfx: [], draw: lt => { const u = U(); CT.begin(o, lt);
    rig(lt, [[0, W / 2, H * .6, 1.25, -.04], [dur, W / 2, H * .48, 1.0, .03]], () => { burst('#5A189A', '#B5179E', .5, .45); const gy = H * .68;
      [[.5, .2, '#FFC93C', '1'], [.24, .13, '#C9CED9', '2'], [.76, .09, '#E0A060', '3']].forEach(([x, h, col, n]) => sticker(() => { rectF(W * (x - .13), gy - H * h, W * .26, H * h + H * .2, 10 * u, col); txt(n, W * x, gy - H * h * .5, 70 * u, '#FFFFFF'); }, 5));
      const g = (x, y, s, open) => { rectF(x - s * .5, y - s * .1, s, s * .2, s * .08, '#1F8A84', { plane: 0 }); ctx.save(); ctx.translate(x - s * .4, y); ctx.rotate(-open * 1.3); rectF(0, -s * .08, s * .8, s * .16, s * .06, '#2EC4B6', { plane: .3 }); ctx.restore(); };
      const up = E.back(clamp((lt - .6) / .9)), wy = lerp(H * .9, gy - H * .2 - H * .05, up); sticker(() => { g(W * .5, wy, W * .2, .5 + .5 * Math.sin(lt * 6)); GAG.crown(W * .5, wy - W * .1, W * .1, lt); }, 5);
      sticker(() => { fo(W * .24, gy - H * .13 - H * .045, W * .06, W * .04, '#C9C2D6', .1); }, 4); sticker(() => { fo(W * .76, gy - H * .09 - H * .04, W * .05, W * .035, '#9AA3B5', .1); }, 4);
      for (let i = 0; i < 24; i++) { const r = rng(i + 3), q = (lt * .35 + r()) % 1; ctx.save(); ctx.translate(W * r(), H * (q * .75)); ctx.rotate(q * 8 + i); rr(-7 * u, -3 * u, 14 * u, 6 * u, 2 * u, ['#FFC93C', '#FF4D6D', '#7FF5DD', '#FFFFFF'][i % 4], 0); ctx.restore(); }
      sign('TRPA1 · PIT VIPER', W * .5, H * .3, 32 * u, lt, 1.4, { bg: '#2EC4B6', col: '#FFFFFF' }); });
    CT.end(o, lt, 1, .35); } });
})();
