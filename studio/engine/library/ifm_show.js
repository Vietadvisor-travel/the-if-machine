/* THE IF MACHINE — show toolkit (owner, 4 Nov 2026): objective voice, the picture IS the line, full frames, a real hook.
   # vis kind=w act=hook scene="<act> key=val …" q="WHAT IF AN AI|RAN YOUR COUNTRY?" at=.3
     → the most striking picture of the episode, full bleed, a punch-in, the headline slams in word by word (first 3 s).
   IFM.fillFrame(lt, {top, bottom})  → texture for empty bands (light rays, dust, depth haze) so no part of the frame is dead. */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT) return; const A = IFM.ACT, P = IFM.P;
  const sub = s => { const o = {}; String(s || '').replace(/(\w+)=("([^"]*)"|\S+)/g, (m, k, v, q) => { o[k] = q != null ? q : v; return ''; }); o.act = String(s || '').trim().split(/\s+/)[0]; return o; };
  A.hook = (o, c, dur) => { const so = sub(o.scene || 'city time=night'), S = (A[so.act] || A.city)(so, c, dur), at = +(o.at || .25), words = String(o.q || 'WHAT IF?').split('|');
    const sfx = IFM.calm !== false ? [...(S.sfx || []).slice(0, 2)] : [...(S.sfx || []).slice(0, 2), [at, 'ifm_motion_impact_big'], ...words.slice(1).map((_, i) => [at + .35 * (i + 1), 'ifm_motion_impact_soft'])];
    return { sfx, draw: lt => { const v = H > W, u = U(), calm = IFM.calm !== false, pk = calm ? 1 + .06 * E.inOut(clamp(lt / Math.max(1, dur))) : 1.14 - .14 * E.out(clamp(lt / .5)) + .03 * clamp((lt - .5) / Math.max(1, dur)), sh = !calm && lt > at && lt < at + .25 ? Math.sin(lt * 90) * 8 * u * (1 - (lt - at) / .25) : 0;
      ctx.save(); ctx.translate(W / 2 + sh, H / 2); ctx.scale(pk, pk); ctx.translate(-W / 2, -H / 2); S.draw(lt); ctx.restore();
      const g = ctx.createLinearGradient(0, 0, 0, H * .5); g.addColorStop(0, 'rgba(5,7,15,.75)'); g.addColorStop(1, 'rgba(5,7,15,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * .5);
      const fs = (v ? 96 : 90) * u; words.forEach((w, i) => { const k = calm ? E.inOut(clamp((lt - at - .5 * i) / .6)) : E.back(clamp((lt - at - .35 * i) / .28)); if (k <= 0) return; const y = H * (v ? .13 : .16) + i * fs * 1.08, size = Math.min(fs, W * .76 / Math.max(1, textW(w, 1, 'display')));
        ctx.save(); ctx.translate(W / 2, y); if (calm) { ctx.globalAlpha *= k; } else { ctx.scale(k * (1 + .15 * (1 - k)), k * (1 + .15 * (1 - k))); ctx.rotate((i % 2 ? .02 : -.02)); } T(w, 0, 0, { size, font: 'display', fill: i === words.length - 1 ? P.yellow : '#FFFFFF', lw: 0, shadow: 10 * u }); ctx.restore(); });
      if (!calm && lt > at + .35 * words.length) { const k = E.out(clamp((lt - at - .35 * words.length) / .3)), y = H * (v ? .13 : .16) + (words.length - .45) * fs * 1.08; rr(W / 2 - W * .3 * k, y, W * .6 * k, 8 * u, 4 * u, P.coral, 0); } } }; };

  // light, dust and haze for a band that would otherwise be flat (call last in a bespoke act)
  IFM.fillFrame = (lt, o = {}) => { const u = U(), top = o.top ?? 0, bot = o.bottom ?? 1, col = o.col || '#FFE7B0';
    ctx.save(); ctx.globalCompositeOperation = 'screen'; for (let i = 0; i < 5; i++) { const x = W * (.1 + i * .22) + Math.sin(lt * .3 + i) * 30 * u; const g = ctx.createLinearGradient(x, H * top, x + W * .2, H * bot); g.addColorStop(0, 'rgba(255,231,176,.10)'); g.addColorStop(1, 'rgba(255,231,176,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, H * top); ctx.lineTo(x + W * .08, H * top); ctx.lineTo(x + W * .3, H * bot); ctx.lineTo(x + W * .12, H * bot); ctx.fill(); }
    for (let i = 0; i < 46; i++) { const r = rng(i * 7 + 3), x = (r() * W + lt * (6 + r() * 14) * u) % W, y = H * (top + (bot - top) * ((r() + lt * .01 * r()) % 1)); ctx.globalAlpha = .25 + .4 * r(); circ(x, y, (1 + r() * 2.5) * u, col, 0); } ctx.restore(); };
})();
