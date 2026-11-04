/* THE IF MACHINE — calm house look (owner, 4 Nov 2026):
   "remove the glare; too many jerky, flickering effects; vary effects, transitions and motion to suit the scene,
    not to fill a quota; don't dramatise; normal, clear, lively."
   Applied at compile time to every story (story header calm: off to disable, only for a special case):
   - transitions: only calm ones (cut, fade, slide, match, zoom, zoomthru, ink); anything else becomes a fade
   - dir= frame effects: flash, shake, glitch, chroma, speed lines, zoom blur, shock rings, motion blur are dropped
     (vignette and iris stay); whip/dutch camera moves become push/float
   - glow() is softened everywhere (no blown-out light) */
'use strict';
(function () {
  if (!window.SB || !window.IFM) return;
  const CALM_TR = ['cut', 'fade', 'slide', 'match', 'zoom', 'zoomthru', 'ink'];
  const BAD_FX = /^(flash|shake|glitch|chroma|speed|zblur|shock|mblur|strobe)$/;
  IFM.CALM_TR = CALM_TR; IFM.BAD_FX = BAD_FX; IFM.calm = true;
  const cleanDir = d => String(d).split(';').map(x => x.trim()).filter(x => { const t = x.split(/\s+/); return !(t[1] === 'fx' && BAD_FX.test(t[2] || '')); }).join('; ');
  const cleanLine = ln => { if (!/^#\s*vis\b/.test(ln)) return ln; return ln
    .replace(/\bdir="([^"]*)"/, (m, d) => 'dir="' + cleanDir(d) + '"')
    .replace(/\bcam=(whip|dutch|snap)\b/g, (m, c) => 'cam=' + (c === 'dutch' ? 'float' : 'push'))
    .replace(/\btrans=(\w+)/, (m, t) => 'trans=' + (CALM_TR.includes(t) ? t : 'fade')); };
  const compile = SB.compile;
  SB.compile = text => { const calm = !/^calm\s*:\s*off\b/m.test(String(text)); IFM.calm = calm; const src = calm ? String(text).split('\n').map(cleanLine).join('\n') : text; const ep = compile(src);
    if (calm && ep && ep.scenes) ep.scenes.forEach((s, i) => { if (!s.transition) return; const t = s.transition.type; if (!CALM_TR.includes(t)) s.transition = { ...s.transition, type: i === ep.scenes.length - 1 ? 'fade' : 'fade', dur: Math.max(.45, s.transition.dur || .5) }; if (s.shakes) s.shakes = []; });
    return ep; };
  // soft light: glow never blows the frame out
  if (typeof glow === 'function' && !glow._calm) { const g0 = glow; glow = function (x, y, r, col, a = .6) { return g0(x, y, r, col, a * (IFM.calm ? .45 : 1)); }; glow._calm = 1; }
  // dust only (no light shafts) when a scene asks to fill a band
  IFM.fillFrame = (lt, o = {}) => { const u = U(), top = o.top ?? 0, bot = o.bottom ?? 1, col = o.col || '#FFF3D6'; ctx.save(); for (let i = 0; i < 30; i++) { const r = rng(i * 7 + 3), x = (r() * W + lt * (4 + r() * 8) * u) % W, y = H * (top + (bot - top) * r()); ctx.globalAlpha = .12 + .2 * r(); circ(x, y, (1 + r() * 2) * u, col, 0); } ctx.restore(); };
})();
