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
  if (typeof SB === 'undefined' || !window.IFM) return;
  // smooth transitions only (no blur streaks, flashes, shards, pixels, glitches); used in rotation so the film is varied
  const SMOOTH = ['slide', 'ink', 'zoomthru', 'paper', 'iris', 'fold', 'liquid', 'cube', 'drop', 'zoom', 'flip3d', 'morph', 'push2', 'wipe', 'dissolve']; // no full-screen colour wipes (stripes, blobs): they read as flashes
  const CALM_TR = ['cut', 'fade', 'match', ...SMOOTH];
  const BAD_FX = /^(flash|shake|glitch|chroma|speed|zblur|shock|mblur|strobe)$/;
  IFM.CALM_TR = CALM_TR; IFM.SMOOTH_TR = SMOOTH; IFM.BAD_FX = BAD_FX; IFM.calm = true;
  const cleanDir = d => String(d).split(';').map(x => x.trim()).filter(x => { const t = x.split(/\s+/); return !(t[1] === 'fx' && BAD_FX.test(t[2] || '')); }).join('; ');
  const cleanLine = ln => { if (!/^#\s*vis\b/.test(ln)) return ln; return ln
    .replace(/\bdir="([^"]*)"/, (m, d) => 'dir="' + cleanDir(d) + '"')
    .replace(/\bcam=(whip|dutch|snap)\b/g, (m, c) => 'cam=' + (c === 'dutch' ? 'float' : 'push'))
    .replace(/\btrans=(\w+)/, (m, t) => (CALM_TR.includes(t) || /^gl[A-Z]/.test(t)) ? m : ''); };
  const compile = SB.compile;
  SB.compile = (text, opts) => { const calm = !/^calm\s*:\s*off\b/m.test(String(text)); IFM.calm = calm; IFM.soundFull = /^sound\s*:\s*full\b/m.test(String(text)); const src = calm ? String(text).split('\n').map(cleanLine).join('\n') : text; const ep = compile(src, opts); // pass options through (collect: 1 gathers the voice lines)
    if (calm && ep) { ep.look = { ...(ep.look || {}) }; if (!ep.look.grade || ep.look.grade === 'warm') ep.look.grade = 'calm'; ep.look.smear = false; }
    if (calm && ep && ep.scenes) ep.scenes.forEach((s, i) => { if (!s.transition) return; const t = s.transition.type; if (!(CALM_TR.includes(t) || /^gl[A-Z]/.test(t))) { const prev = i > 0 && ep.scenes[i - 1].transition ? ep.scenes[i - 1].transition.type : ''; let k = (i * 5) % SMOOTH.length; if (SMOOTH[k] === prev) k = (k + 1) % SMOOTH.length; s.transition = { ...s.transition, type: i === ep.scenes.length - 1 ? 'fade' : SMOOTH[k], dur: Math.max(.6, s.transition.dur || .6) }; } if (s.shakes) s.shakes = []; });
      ep.finish = { ...(ep.finish || {}), grain: false };
    return ep; };
  // the calm grade: no bloom haze, a touch of warmth and contrast so colours stay clean
  if (typeof GRADES !== 'undefined') { GRADES.calm = { sat: 1.05, con: 1.06, bri: .98, tint: '#ffb070', tintA: .03, bloom: 0 }; for (const k of Object.keys(GRADES)) GRADES[k].bloom = 0; } // no bloom anywhere (owner: glare is unbearable)
  // the WebGL post pass had no 'calm' grade and fell back to 'warm' (bloom .26 + halation .1): the white haze on every light
  // frame (owner, 4 Nov 2026: glare). A real calm grade for the GL path: no bloom, no halation, highlights never lifted.
  if (typeof GRADE_GL !== 'undefined') { GRADE_GL.calm = { sat: 1.04, con: 1.04, lift: 0, gam: 1, gain: .99, sh: [0, 0, .005], hi: [.01, .005, -.005], bloom: 0, hal: 0 }; for (const k of Object.keys(GRADE_GL)) { GRADE_GL[k].bloom = 0; GRADE_GL[k].hal = 0; } }
  // soft light: glow never blows the frame out
  if (typeof glow === 'function' && !glow._calm) { const g0 = glow; glow = function (x, y, r, col, a = .6) { return g0(x, y, r, col, a * (IFM.calm ? .3 : 1)); }; glow._calm = 1; }
  // dust only (no light shafts) when a scene asks to fill a band
  IFM.fillFrame = (lt, o = {}) => { const u = U(), top = o.top ?? 0, bot = o.bottom ?? 1, col = o.col || '#FFF3D6'; ctx.save(); for (let i = 0; i < 30; i++) { const r = rng(i * 7 + 3), x = (r() * W + lt * (4 + r() * 8) * u) % W, y = H * (top + (bot - top) * r()); ctx.globalAlpha = .12 + .2 * r(); circ(x, y, (1 + r() * 2) * u, col, 0); } ctx.restore(); };
})();
