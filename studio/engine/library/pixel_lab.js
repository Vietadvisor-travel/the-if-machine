/* PIXEL LAB (owner, 7 Nov 2026: "try 4 different pixel styles") — any IF CREW scene (IFM.CAST.SC) re-rendered as pixel art:
   the scene is drawn at full size, shrunk to a small grid, snapped to a palette (optional ordered dither, ink outlines,
   scanlines), and blown up with hard pixels; the title gets its own crisper grid so it stays readable.
   Story: # vis kind=w act=x_pixel s=nes|gb|bit16|arcade v=<scene: lineup|hook|w_hook|s_moon|s_ocean|s_net|s_map|s_brain|s_chart …> */
'use strict';
(function () {
  if (!window.IFM || !IFM.CAST) return;
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const PAL = {
    nes: ['#000000', '#FCFCFC', '#BCBCBC', '#7C7C7C', '#A4E4FC', '#3CBCFC', '#0058F8', '#0000BC', '#F8B8F8', '#F878F8', '#D800CC', '#E45C10', '#F83800', '#FCA044', '#F8D878', '#FCE0A8', '#B8F818', '#58D854', '#00A800', '#AC7C00', '#503000', '#F0D0B0', '#6844FC', '#A80020', '#F87858', '#00E8D8', '#008888', '#24188C', '#402080', '#181838'].map(hex),
    gb: ['#0F380F', '#306230', '#8BAC0F', '#9BBC0F'].map(hex),
    pico: ['#000000', '#1D2B53', '#7E2553', '#008751', '#AB5236', '#5F574F', '#C2C3C7', '#FFF1E8', '#FF004D', '#FFA300', '#FFEC27', '#00E436', '#29ADFF', '#83769C', '#FF77A8', '#FFCCAA'].map(hex),
  };
  // grid width, palette (or posterize levels), dither strength, ink outline, scanlines + glow
  const STY = {
    nes:    { w: 96, pal: 'nes', dith: 0, ink: 1, label: '8-BIT · NES' },
    gb:     { w: 144, pal: 'gb', dith: 48, ink: 0, gray: 1, label: 'GAME BOY' },
    bit16:  { w: 216, post: 6, dith: 0, ink: 1, label: '16-BIT' },
    arcade: { w: 168, pal: 'pico', dith: 22, ink: 0, scan: 1, label: 'ARCADE · PICO' },
  };
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => v / 16 - .5);
  const near = (pal, r, g, b) => { let bi = 0, bd = 1e9; for (let i = 0; i < pal.length; i++) { const p = pal[i], d = (p[0] - r) ** 2 * .3 + (p[1] - g) ** 2 * .59 + (p[2] - b) ** 2 * .11; if (d < bd) { bd = d; bi = i; } } return pal[bi]; };
  let BIG = null, SM = null, TB = null, TS = null;
  function quant(img, st, alphaCut) { const d = img.data, w = img.width, pal = st.pal && PAL[st.pal], L = st.post || 0;
    for (let y = 0; y < img.height; y++) for (let x = 0; x < w; x++) { const i = (y * w + x) * 4; if (alphaCut) { if (d[i + 3] < 110) { d[i + 3] = 0; continue; } d[i + 3] = 255; }
      const t = st.dith ? BAYER[(y & 3) * 4 + (x & 3)] * st.dith : 0; let r = d[i] + t, g = d[i + 1] + t, b = d[i + 2] + t;
      if (st.gray) { const l = r * .3 + g * .59 + b * .11; const q = l < 95 ? 0 : l < 155 ? 1 : l < 212 ? 2 : 3, p = PAL.gb[q]; d[i] = p[0]; d[i + 1] = p[1]; d[i + 2] = p[2]; continue; }
      if (pal) { const p = near(pal, r, g, b); d[i] = p[0]; d[i + 1] = p[1]; d[i + 2] = p[2]; }
      else { const s = 255 / (L - 1); d[i] = Math.round(clamp(r / 255) * (L - 1)) * s; d[i + 1] = Math.round(clamp(g / 255) * (L - 1)) * s; d[i + 2] = Math.round(clamp(b / 255) * (L - 1)) * s; } }
    if (st.ink && !alphaCut) { const src = new Uint8ClampedArray(d), lum = i => src[i] * .3 + src[i + 1] * .59 + src[i + 2] * .11;
      for (let y = 0; y < img.height - 1; y++) for (let x = 0; x < w - 1; x++) { const i = (y * w + x) * 4, a = lum(i), r = lum(i + 4), b = lum(i + w * 4); if (Math.abs(a - r) > 70 || Math.abs(a - b) > 70) { if (a < Math.max(r, b)) { d[i] = d[i] * .35; d[i + 1] = d[i + 1] * .3; d[i + 2] = d[i + 2] * .4; } } } }
    return img; }
  IFM.ACT.x_pixel = (o, c, dur) => { const st = STY[o.s] || STY.nes, scene = IFM.CAST.SC[o.v] || IFM.CAST.SC.lineup; return { sfx: [], draw: lt => {
    if (!BIG || BIG.width !== W || BIG.height !== H) { BIG = mkCanvas(W, H); TB = mkCanvas(W, H); }
    const gw = st.w, gh = Math.round(st.w * H / W); if (!SM || SM.width !== gw || SM.height !== gh) SM = mkCanvas(gw, gh);
    // the scene without its title
    IFM.CAST._capT = []; const bg = BIG.getContext('2d'); bg.setTransform(1, 0, 0, 1, 0, 0); withCtx(bg, () => scene(lt)); const T = IFM.CAST._capT; IFM.CAST._capT = null;
    const sg = SM.getContext('2d'); sg.imageSmoothingEnabled = true; sg.imageSmoothingQuality = 'medium'; sg.clearRect(0, 0, gw, gh); sg.drawImage(BIG, 0, 0, gw, gh); sg.putImageData(quant(sg.getImageData(0, 0, gw, gh), st), 0, 0);
    ctx.save(); ctx.imageSmoothingEnabled = false; ctx.drawImage(SM, 0, 0, W, H);
    // the title on a grid twice as fine, hard alpha, same palette
    if (T.length) { const tw = gw * 2, th = gh * 2; if (!TS || TS.width !== tw || TS.height !== th) TS = mkCanvas(tw, th); const tg = TB.getContext('2d'); tg.setTransform(1, 0, 0, 1, 0, 0); tg.clearRect(0, 0, W, H); withCtx(tg, () => T.forEach(a => IFM.CAST.title(...a)));
      const ts = TS.getContext('2d'); ts.clearRect(0, 0, tw, th); ts.drawImage(TB, 0, 0, tw, th); ts.putImageData(quant(ts.getImageData(0, 0, tw, th), { ...st, dith: 0, ink: 0 }, 1), 0, 0); ctx.drawImage(TS, 0, 0, W, H); }
    if (st.scan) { ctx.fillStyle = 'rgba(0,0,0,.22)'; const step = H / gh; for (let y = 0; y < gh; y++) ctx.fillRect(0, y * step + step * .62, W, step * .38); const g = ctx.createRadialGradient(W / 2, H / 2, H * .3, W / 2, H / 2, H * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
    // style tag
    ctx.font = `700 ${22 * U()}px "Space Mono", monospace`; ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(W * .04, H * .955, ctx.measureText(st.label).width + 24 * U(), 34 * U()); ctx.fillStyle = '#FFFFFF'; ctx.fillText(st.label, W * .04 + 12 * U(), H * .955 + 24 * U()); ctx.restore(); } }; };
})();
