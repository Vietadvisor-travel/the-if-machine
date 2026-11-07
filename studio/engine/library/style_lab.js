/* STYLE LAB (owner, 7 Nov 2026: "every scene in ONE consistent graphic/animation style, not patched together — show me 5–7
   beautiful styles to choose from, different from what we have"). One shared composition, drawn by six style systems.
   Each style supplies primitives (rect, ellipse, poly, line, text) and a palette; every object (building, person, cow, sack, coin,
   note, clock, shop) is built from those primitives, so a whole film drawn in one style stays coherent by construction.
   act: x_style s=paper|riso|ink|iso|neon|bauhaus v=hook|barter|queue */
'use strict';
(function () {
  if (!window.IFM || !IFM.ACT) return;
  const A = IFM.ACT, R = s => rng(s), CH = {};
  const cache = (k, fn) => { const key = k + W + 'x' + H; if (!CH[key]) { const cv = mkCanvas(W, H); withCtx(cv.getContext('2d'), fn); CH[key] = cv; } return CH[key]; };
  const font = (f, w, s) => `${w} ${s}px ${f}`;

  // ---------------------------------------------------------------- noise / textures
  const noise = (k, a, mono = true) => cache('nz' + k, () => { const id = ctx.createImageData(W, H), r = R(k); for (let i = 0; i < id.data.length; i += 4) { const v = r() * 255; id.data[i] = v; id.data[i + 1] = mono ? v : r() * 255; id.data[i + 2] = mono ? v : r() * 255; id.data[i + 3] = 255; } ctx.putImageData(id, 0, 0); });
  const grain = (a = .06, mode = 'overlay') => { ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = mode; ctx.drawImage(noise(7), 0, 0); ctx.restore(); };
  const dots = (col, step, rmax) => { const c = mkCanvas(step, step), g = c.getContext('2d'); g.fillStyle = col; g.beginPath(); g.arc(step / 2, step / 2, rmax, 0, TAU); g.fill(); return c; };

  // ---------------------------------------------------------------- the six styles
  const S = {};
  // 1. PAPER CRAFT — layered cut paper, hard soft-edged shadows, paper fibre, slightly irregular edges, warm craft palette
  S.paper = { pal: { bg: '#F3E6CF', sky: '#BFE0D8', far: '#8FC1B5', mid: '#3F8F8A', ground: '#E8B860', a: '#E4572E', b: '#2E86AB', c: '#F2C14E', d: '#7A4E8C', ink: '#2B2D42', paper: '#FFF8EC', skin: '#F2C9A0' },
    font: ['"Paytone One"', 400], sub: ['"Patrick Hand"', 400],
    jit: (pts, k) => { const r = R(k); return pts.map(([x, y]) => [x + (r() - .5) * 3, y + (r() - .5) * 3]); },
    shape(path, col, o = {}) { const u = U(); ctx.save(); ctx.shadowColor = 'rgba(40,30,20,.35)'; ctx.shadowBlur = 6 * u; ctx.shadowOffsetX = 4 * u; ctx.shadowOffsetY = 7 * u; ctx.beginPath(); path(); ctx.fillStyle = col; ctx.fill(); ctx.restore();
      ctx.save(); ctx.beginPath(); path(); ctx.clip(); ctx.globalAlpha = .1; ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(noise(3), 0, 0); ctx.restore(); },
    rect(x, y, w, h, col, k = 1) { const p = this.jit([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], k); this.shape(() => { ctx.moveTo(...p[0]); p.slice(1).forEach(q => ctx.lineTo(...q)); ctx.closePath(); }, col); },
    ell(x, y, rx, ry, col) { this.shape(() => { for (let a = 0; a <= TAU; a += TAU / 28) { const r = 1 + Math.sin(a * 7 + x) * .012; ctx.lineTo(x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r); } ctx.closePath(); }, col); },
    poly(pts, col, k = 2) { const p = this.jit(pts, k); this.shape(() => { ctx.moveTo(...p[0]); p.slice(1).forEach(q => ctx.lineTo(...q)); ctx.closePath(); }, col); },
    line(x1, y1, x2, y2, col, w) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.shadowColor = 'rgba(40,30,20,.3)'; ctx.shadowOffsetY = 3 * U(); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); },
    back(v) { const P = this.pal; ctx.fillStyle = P.bg; ctx.fillRect(0, 0, W, H); this.rect(-20, -20, W + 40, H * .68, P.sky, 1); this.ell(W * .78, H * .26, W * .1, W * .1, '#FFF3C4');
      for (let i = 0; i < 3; i++) this.ell(W * (.15 + i * .35), H * (.16 + (i % 2) * .05), W * .12, W * .045, P.paper); this.poly([[-20, H * .6], [W * .25, H * .5], [W * .55, H * .57], [W * .8, H * .49], [W + 20, H * .56], [W + 20, H * .68], [-20, H * .68]], P.far); },
    ground() { this.rect(-20, H * .66, W + 40, H * .5, this.pal.ground, 4); },
    finish() { grain(.06); } };
  // 2. RISOGRAPH — two spot inks (fluorescent pink + blue) overprinted on off-white, halftone shading, a hint of misregistration
  S.riso = { pal: { bg: '#F4EFE6', sky: '#F4EFE6', far: '#0078BF', mid: '#0078BF', ground: '#FF48B0', a: '#FF48B0', b: '#0078BF', c: '#FF48B0', d: '#0078BF', ink: '#0078BF', paper: '#F4EFE6', skin: '#FF48B0' },
    font: ['"Anton"', 400], sub: ['"Space Mono"', 700],
    tone(col) { return col === '#FF48B0' ? 'p' : 'b'; },
    pat(col, dens) { const key = 'pat' + col + dens; if (!CH[key]) CH[key] = ctx.createPattern(dots(col, Math.round(9 * U()), 9 * U() * dens * .5), 'repeat'); return CH[key]; },
    shape(path, col, o = {}) { const u = U(), off = this.tone(col) === 'p' ? 2.2 * u : 0; ctx.save(); ctx.translate(off, off * .6); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .88; ctx.beginPath(); path(); ctx.fillStyle = o.dens ? this.pat(col, o.dens) : col; ctx.fill(); ctx.restore(); },
    rect(x, y, w, h, col, k, o) { this.shape(() => ctx.rect(x, y, w, h), col, o); }, ell(x, y, rx, ry, col, o) { this.shape(() => ctx.ellipse(x, y, rx, ry, 0, 0, TAU), col, o); }, poly(pts, col, k, o) { this.shape(() => { ctx.moveTo(...pts[0]); pts.slice(1).forEach(q => ctx.lineTo(...q)); ctx.closePath(); }, col, o); },
    line(x1, y1, x2, y2, col, w) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); },
    back() { ctx.fillStyle = this.pal.bg; ctx.fillRect(0, 0, W, H); this.rect(0, 0, W, H * .68, '#0078BF', 0, { dens: .35 }); this.ell(W * .76, H * .25, W * .11, W * .11, '#FF48B0'); },
    ground() { this.rect(0, H * .66, W, H * .4, '#FF48B0', 0, { dens: .6 }); },
    finish() { ctx.save(); ctx.globalAlpha = .18; ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(noise(11), 0, 0); ctx.restore(); grain(.05); } };
  // 3. INK & WATERCOLOUR — editorial: confident black ink lines with a slight tremble, loose watercolour washes that bleed past them
  S.ink = { pal: { bg: '#F7F1E3', sky: '#A9C9E3', far: '#9CB8A3', mid: '#6E9E8A', ground: '#D9B98C', a: '#D9604C', b: '#4F7FAE', c: '#E8B44F', d: '#8C6BAE', ink: '#1E1B18', paper: '#F7F1E3', skin: '#E8B796' },
    font: ['"Playfair Display"', 900], sub: ['"Patrick Hand"', 400],
    wash(path, col) { const u = U(); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = .55; ctx.filter = `blur(${2.5 * u}px)`; ctx.translate(3 * u, 4 * u); ctx.beginPath(); path(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); },
    pen(path, w = 3) { const u = U(); ctx.save(); ctx.strokeStyle = this.pal.ink; ctx.lineWidth = w * u; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath(); path(true); ctx.stroke(); ctx.restore(); },
    wob(pts, k) { const r = R(k), out = []; for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; for (let t = 0; t < 1; t += .25) out.push([lerp(a[0], b[0], t) + (r() - .5) * 2.4, lerp(a[1], b[1], t) + (r() - .5) * 2.4]); } return out; },
    rect(x, y, w, h, col, k = 1) { const P = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]; this.wash(() => ctx.rect(x, y, w, h), col); const q = this.wob(P, k); this.pen(() => { ctx.moveTo(...q[0]); q.forEach(p => ctx.lineTo(...p)); ctx.closePath(); }); },
    ell(x, y, rx, ry, col) { this.wash(() => ctx.ellipse(x, y, rx, ry, 0, 0, TAU), col); this.pen(() => { for (let a = 0; a <= TAU + .3; a += TAU / 30) ctx.lineTo(x + Math.cos(a) * rx * (1 + Math.sin(a * 5) * .015), y + Math.sin(a) * ry); }); },
    poly(pts, col, k = 2) { this.wash(() => { ctx.moveTo(...pts[0]); pts.slice(1).forEach(q => ctx.lineTo(...q)); ctx.closePath(); }, col); const q = this.wob(pts, k); this.pen(() => { ctx.moveTo(...q[0]); q.forEach(p => ctx.lineTo(...p)); ctx.closePath(); }); },
    line(x1, y1, x2, y2, col, w) { this.pen(() => { ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2 + 2, (y1 + y2) / 2 - 2, x2, y2); }, Math.max(2, w / U() * .5)); },
    back() { const P = this.pal; ctx.fillStyle = P.bg; ctx.fillRect(0, 0, W, H); ctx.drawImage(cache('inksky', () => { ctx.globalCompositeOperation = 'multiply'; for (let i = 0; i < 9; i++) { const r = R(i + 4); const g = ctx.createRadialGradient(W * r(), H * r() * .5, 0, W * r(), H * r() * .5, W * (.3 + r() * .3)); g.addColorStop(0, rgba(P.sky, .45)); g.addColorStop(1, rgba(P.sky, 0)); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); } }), 0, 0);
      this.ell(W * .78, H * .25, W * .08, W * .08, '#F2C46B'); },
    ground() { this.wash(() => ctx.rect(0, H * .66, W, H * .4), this.pal.ground); this.pen(() => { ctx.moveTo(0, H * .66); for (let x = 0; x <= W; x += W / 12) ctx.lineTo(x, H * .66 + Math.sin(x * .05) * 2); }); },
    finish() { ctx.save(); ctx.globalAlpha = .12; ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(noise(5), 0, 0); ctx.restore(); } };
  // 4. ISOMETRIC MINIATURE — a tiny tidy world in true isometric: three-tone blocks, soft pastels, crisp, toy-like
  S.iso = { pal: { bg: '#EAF0F6', sky: '#DCE7F2', far: '#C8D6E6', mid: '#9BB7D4', ground: '#BFD8B8', a: '#F28F79', b: '#6FA8DC', c: '#F6C667', d: '#9C89D9', ink: '#33415C', paper: '#FFFFFF', skin: '#F2C9A8' },
    font: ['"Inter"', 800], sub: ['"Inter"', 700], iso: 1,
    box(x, y, w, d, h, col) { const cx = .866, top = [[x, y - h], [x + w * cx, y - h - w * .5], [x + w * cx - d * cx, y - h - w * .5 - d * .5], [x - d * cx, y - h - d * .5]];
      const L = [[x, y], [x, y - h], [x - d * cx, y - h - d * .5], [x - d * cx, y - d * .5]], Rt = [[x, y], [x + w * cx, y - w * .5], [x + w * cx, y - w * .5 - h], [x, y - h]];
      poly(L, shade(col, -.12), 0); poly(Rt, shade(col, -.25), 0); poly(top, shade(col, .1), 0); },
    rect(x, y, w, h, col) { this.box(x + w * .1, y + h, w * .55, w * .45, h, col); }, ell(x, y, rx, ry, col) { ell(x, y + ry * .2, rx, ry * .6, shade(col, -.2), 0); ell(x, y, rx, ry * .6, col, 0); ell(x - rx * .25, y - ry * .2, rx * .35, ry * .2, shade(col, .2), 0); },
    poly(pts, col) { poly(pts, col, 0); }, line(x1, y1, x2, y2, col, w) { line(x1, y1, x2, y2, w, col); },
    back() { const P = this.pal; const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#F4F7FB'); g.addColorStop(1, '#DDE6EF'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); },
    ground() { const u = U(), cx = W / 2, cy = H * .68, s = W * .62; poly([[cx, cy - s * .5], [cx + s * .866, cy], [cx, cy + s * .5], [cx - s * .866, cy]], this.pal.ground, 0); poly([[cx - s * .866, cy], [cx, cy + s * .5], [cx, cy + s * .5 + 18 * u], [cx - s * .866, cy + 18 * u]], shade(this.pal.ground, -.2), 0); poly([[cx + s * .866, cy], [cx, cy + s * .5], [cx, cy + s * .5 + 18 * u], [cx + s * .866, cy + 18 * u]], shade(this.pal.ground, -.32), 0); },
    finish() { grain(.025); } };
  // 5. NEON LINE — one continuous light-line language on deep navy: every object is a few glowing strokes, soft bloom, no fills
  S.neon = { pal: { bg: '#0A0F24', sky: '#0A0F24', far: '#1B2A5A', mid: '#3DDCFF', ground: '#3DDCFF', a: '#FF6FB5', b: '#3DDCFF', c: '#FFC857', d: '#9B8CFF', ink: '#E8F1FF', paper: '#0A0F24', skin: '#FFC857' },
    font: ['"Bungee"', 400], sub: ['"Space Mono"', 700],
    glowStroke(path, col, w = 3) { const u = U(); ctx.save(); ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.shadowColor = col; ctx.shadowBlur = 14 * u; ctx.lineWidth = w * u; ctx.beginPath(); path(); ctx.stroke(); ctx.shadowBlur = 0; ctx.lineWidth = w * .45 * u; ctx.strokeStyle = '#FFFFFF'; ctx.globalAlpha = .55; ctx.stroke(); ctx.restore(); },
    rect(x, y, w, h, col) { this.glowStroke(() => ctx.rect(x, y, w, h), col); }, ell(x, y, rx, ry, col) { this.glowStroke(() => ctx.ellipse(x, y, rx, ry, 0, 0, TAU), col); },
    poly(pts, col) { this.glowStroke(() => { ctx.moveTo(...pts[0]); pts.slice(1).forEach(q => ctx.lineTo(...q)); ctx.closePath(); }, col); }, line(x1, y1, x2, y2, col) { this.glowStroke(() => { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); }, col); },
    back() { ctx.drawImage(cache('neonbg', () => { const g = ctx.createRadialGradient(W / 2, H * .45, 0, W / 2, H * .45, H * .8); g.addColorStop(0, '#16204A'); g.addColorStop(1, '#05070F'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.strokeStyle = 'rgba(61,220,255,.07)'; ctx.lineWidth = 1; for (let x = 0; x < W; x += W / 18) { ctx.beginPath(); ctx.moveTo(x, H * .66); ctx.lineTo(W / 2 + (x - W / 2) * 3, H); ctx.stroke(); } for (let k = 0; k < 10; k++) { const y = H * .66 + Math.pow(k / 10, 2) * H * .4; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); } }), 0, 0); },
    ground() { this.line(0, H * .66, W, H * .66, '#3DDCFF'); }, finish() { grain(.04, 'screen'); } };
  // 6. BAUHAUS / SWISS — geometry only: circles, squares, triangles in primary colours on cream, black bars, a strict grid
  S.bauhaus = { pal: { bg: '#F1EBDD', sky: '#F1EBDD', far: '#1D3C8F', mid: '#1D3C8F', ground: '#111111', a: '#D7263D', b: '#1D3C8F', c: '#F4B400', d: '#111111', ink: '#111111', paper: '#F1EBDD', skin: '#F4B400' },
    font: ['"Oswald"', 700], sub: ['"Oswald"', 500], flat: 1,
    rect(x, y, w, h, col) { rr(x, y, w, h, 0, col, 0); }, ell(x, y, rx, ry, col) { ell(x, y, rx, ry, col, 0); }, poly(pts, col) { poly(pts, col, 0); }, line(x1, y1, x2, y2, col, w) { line(x1, y1, x2, y2, w, col); },
    back() { ctx.fillStyle = this.pal.bg; ctx.fillRect(0, 0, W, H); const u = U(); ctx.strokeStyle = 'rgba(17,17,17,.08)'; ctx.lineWidth = 1; for (let x = W / 12; x < W; x += W / 12) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } ell(W * .82, H * .26, W * .14, W * .14, '#D7263D', 0); rr(0, H * .085, W * .08, H * .3, 0, '#111', 0); },
    ground() { rr(0, H * .66, W, 14 * U(), 0, '#111', 0); }, finish() { grain(.035); } };

  // ---------------------------------------------------------------- objects, built from each style's primitives
  const O = {
    building(St, x, yb, w, h, i) { const P = St.pal, col = [P.a, P.b, P.c, P.d][i % 4], u = U();
      if (St.iso) { St.box(x, yb, w * .5, w * .5, h, col); for (let j = 0; j < Math.floor(h / (H * .03)); j++) { poly([[x + w * .1, yb - h + H * .015 + j * H * .03 - w * .05], [x + w * .2, yb - h + H * .015 + j * H * .03 - w * .1], [x + w * .2, yb - h + H * .03 + j * H * .03 - w * .1], [x + w * .1, yb - h + H * .03 + j * H * .03 - w * .05]], '#FFF6D8', 0); } return; }
      St.rect(x, yb - h, w, h, col, i + 2); const cols = 3, rows = Math.floor(h / (H * .035)); for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { if ((r * 7 + c * 3 + i) % 5 === 0) continue; const wx = x + w * (.15 + c * .26), wy = yb - h + H * .02 + r * H * .035;
        if (St === S.neon) St.rect(wx, wy, w * .16, H * .016, P.c); else if (St === S.riso) St.rect(wx, wy, w * .16, H * .016, '#FF48B0'); else St.rect(wx, wy, w * .16, H * .016, St === S.bauhaus ? '#111' : '#FFF3C4', i * 10 + r * 3 + c); } },
    person(St, x, yf, h, i, pose = 'stand') { const P = St.pal, col = [P.a, P.b, P.c, P.d][i % 4], u = U();
      if (St.iso) { ell(x, yf, h * .16, h * .06, 'rgba(0,0,0,.12)', 0); St.box(x - h * .05, yf, h * .14, h * .12, h * .55, col); ell(x + h * .02, yf - h * .72, h * .09, h * .09, P.skin, 0); return; }
      if (St === S.bauhaus) { rr(x - h * .1, yf - h * .62, h * .2, h * .62, 0, col, 0); ell(x, yf - h * .76, h * .1, h * .1, '#111', 0); return; }
      St.line(x - h * .05, yf - h * .38, x - h * .06, yf, St === S.neon ? col : P.ink, h * .06); St.line(x + h * .05, yf - h * .38, x + h * .06, yf, St === S.neon ? col : P.ink, h * .06);
      St.poly([[x - h * .12, yf - h * .38], [x - h * .1, yf - h * .7], [x + h * .1, yf - h * .7], [x + h * .12, yf - h * .38]], col, i + 30); St.ell(x, yf - h * .84, h * .1, h * .1, P.skin); },
    cow(St, x, y, s) { const P = St.pal, body = St === S.neon ? P.ink : St === S.riso ? '#0078BF' : St === S.bauhaus ? '#F1EBDD' : '#FFFDF7';
      if (St.iso) { St.box(x - s * .2, y, s * .55, s * .25, s * .28, '#FFFDF7'); St.box(x + s * .3, y - s * .1, s * .15, s * .15, s * .2, '#FFFDF7'); ell(x, y - s * .3, s * .08, s * .05, '#333', 0); return; }
      [-.28, -.14, .16, .3].forEach(l => St.line(x + s * l, y - s * .2, x + s * l, y, P.ink, s * .05)); St.ell(x, y - s * .32, s * .4, s * .17, body); St.ell(x + s * .43, y - s * .44, s * .12, s * .1, body);
      if (St !== S.neon) { St.ell(x - s * .1, y - s * .36, s * .1, s * .07, St === S.bauhaus ? '#111' : P.ink); St.ell(x + s * .15, y - s * .28, s * .07, s * .05, St === S.bauhaus ? '#111' : P.ink); } else { St.ell(x - s * .1, y - s * .36, s * .08, s * .05, P.a); } },
    sack(St, x, y, s) { const P = St.pal, col = St === S.riso ? '#FF48B0' : St === S.neon ? P.c : St === S.bauhaus ? P.c : '#D8B47A'; if (St.iso) { St.box(x - s * .15, y, s * .3, s * .3, s * .45, col); return; }
      St.poly([[x - s * .3, y], [x - s * .36, y - s * .45], [x - s * .12, y - s * .7], [x + s * .12, y - s * .7], [x + s * .36, y - s * .45], [x + s * .3, y]], col, 9); St.line(x - s * .14, y - s * .62, x + s * .14, y - s * .62, P.ink, s * .04); },
    coin(St, x, y, r) { const P = St.pal; if (St.iso) { ell(x, y + r * .25, r, r * .45, shade('#F6C667', -.3), 0); ell(x, y, r, r * .45, '#F6C667', 0); ell(x, y, r * .7, r * .3, shade('#F6C667', .15), 0); return; }
      St.ell(x, y, r, r, St === S.riso ? '#FF48B0' : P.c); St.ell(x, y, r * .7, r * .7, St === S.riso ? '#0078BF' : St === S.bauhaus ? P.a : shade(P.c, -.1)); },
    note(St, x, y, w, rot = 0) { const P = St.pal, h = w * .45; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); if (St.iso) { St.box(-w * .3, h * .2, w * .6, w * .3, h * .15, '#9ED39A'); ctx.restore(); return; }
      St.rect(-w / 2, -h / 2, w, h, St === S.riso ? '#0078BF' : St === S.neon ? P.b : St === S.bauhaus ? P.b : '#A7D3A6', 7); St.ell(0, 0, h * .3, h * .3, St === S.riso ? '#FF48B0' : St === S.bauhaus ? P.c : '#E9F4E6'); ctx.restore(); },
    clock(St, x, y, r) { const P = St.pal; if (St.iso) { St.box(x - r * .5, y + r, r, r * .3, r * 1.6, '#FFFFFF'); return; } St.ell(x, y, r, r, St === S.riso ? '#F4EFE6' : St === S.neon ? P.d : '#FFFFFF'); St.line(x, y, x, y - r * .7, P.ink, r * .08); St.line(x, y, x + r * .5, y + r * .1, P.a, r * .07); },
    shop(St, x, yb, w, h) { const P = St.pal; if (St.iso) { St.box(x, yb, w * .55, w * .5, h, P.a); poly([[x - w * .45, yb - h - w * .23], [x + w * .48, yb - h - w * .28], [x + w * .48, yb - h - w * .18], [x - w * .45, yb - h - w * .13]], P.c, 0); return; }
      St.rect(x, yb - h, w, h, St === S.neon ? P.a : St === S.riso ? '#FF48B0' : P.a, 21); for (let i = 0; i < 5; i++) St.rect(x + i * w / 5, yb - h - H * .03, w / 5, H * .045, i % 2 ? (St === S.riso ? '#F4EFE6' : P.paper) : P.b, 40 + i); St.rect(x + w * .35, yb - h * .55, w * .3, h * .55, P.ink === '#E8F1FF' ? P.c : P.ink, 50); },
  };
  const headline = (St, lines, y, hi) => { const u = U(), [f, wgt] = St.font; let s = 92 * u; lines.forEach(l => { ctx.font = font(f, wgt, s); s = Math.min(s, s * W * .84 / ctx.measureText(l).width); }); const lh = s * 1.05;
    lines.forEach((l, i) => { ctx.save(); ctx.font = font(f, wgt, s); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; const P = St.pal, col = i === hi ? (St === S.neon ? P.a : St === S.riso ? '#FF48B0' : St === S.bauhaus ? P.a : P.a) : (St === S.neon ? '#E8F1FF' : P.ink);
      if (St === S.neon) { ctx.shadowColor = col; ctx.shadowBlur = 18 * u; } if (St === S.paper) { ctx.shadowColor = 'rgba(40,30,20,.35)'; ctx.shadowOffsetY = 6 * u; ctx.shadowBlur = 4 * u; } if (St === S.riso) { ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = '#FF48B0'; ctx.fillText(l, W / 2 + 3 * u, y + i * lh + 2 * u); }
      ctx.fillStyle = col; ctx.fillText(l, W / 2, y + i * lh); ctx.restore(); }); };
  const kicker = (St, t, y) => { const u = U(), [f, wgt] = St.sub; ctx.save(); ctx.font = font(f, wgt, 30 * u); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = St === S.neon ? '#3DDCFF' : St.pal.ink; ctx.globalAlpha = .85; ctx.fillText(t, W / 2, y); ctx.restore(); };
  const caption = () => {}; const caption0 = (St, t) => { const u = U(); ctx.save(); ctx.font = font('"Inter"', 700, 30 * u); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = St === S.neon ? '#E8F1FF' : '#FFFFFF'; ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 8 * u; ctx.fillText(t, W / 2, H * .77); ctx.restore(); };

  const detail = (St, city) => { const P = St.pal, u = U(); if (St.iso) return; const y = H * .7;
    St.rect(-10, y, W + 20, H * .035, St === S.neon ? P.b : St === S.riso ? '#0078BF' : St === S.bauhaus ? '#111' : shade(P.ground, -.15), 77);
    for (let i = 0; i < 6; i++) { const x = W * (.08 + i * .17); if (St === S.neon) St.line(x, y + H * .0175, x + W * .06, y + H * .0175, P.c); else St.rect(x, y + H * .014, W * .07, H * .008, St === S.riso ? '#F4EFE6' : St === S.bauhaus ? P.c : P.paper, 80 + i); }
    for (let i = 0; i < 4; i++) { const x = W * (.05 + i * .3), yy = H * .9 + (i % 2) * H * .03; if (St === S.bauhaus) { ell(x, yy, W * .05, W * .05, [P.a, P.b, P.c, P.a][i], 0); continue; } St.ell(x, yy, W * .07, H * .02, St === S.riso ? '#0078BF' : St === S.neon ? P.d : shade(P.ground, -.25)); } };
  // ---------------------------------------------------------------- the three sample scenes (same layout in every style)
  const SC = {
    hook(St, lt) { St.back(); const u = U(); detail(St, 1); for (let i = 0; i < 7; i++) { const w = W * .16, h = H * (.14 + ((i * 37) % 9) / 50), x = W * (-.04 + i * .155); O.building(St, x, H * .68, w, h, i); } St.ground();
      [[.18, .3, -.3], [.4, .22, .2], [.66, .34, -.15], [.85, .18, .35], [.3, .42, .1]].forEach(([x, y, r], i) => i % 2 ? O.coin(St, W * x, H * y, W * .035) : O.note(St, W * x, H * y, W * .16, r));
      kicker(St, 'THE IF MACHINE · A THOUGHT EXPERIMENT', H * .08); headline(St, ['WHAT IF MONEY', 'DISAPPEARED?'], H * .14, 1); caption(St, 'What if, tonight, every coin and every banknote disappeared?'); },
    barter(St, lt) { St.back(); St.ground(); detail(St); kicker(St, 'THE DOUBLE COINCIDENCE OF WANTS', H * .08); headline(St, ['THE BARTER', 'PROBLEM'], H * .14, 1); const u = U(), P = St.pal, bub = St === S.neon ? P.d : P.paper;
      O.person(St, W * .12, H * .66, H * .24, 2); O.cow(St, W * .34, H * .66, W * .4); O.person(St, W * .88, H * .66, H * .24, 0); O.sack(St, W * .7, H * .66, W * .2);
      St.ell(W * .27, H * .385, W * .2, H * .065, bub); O.sack(St, W * .27, H * .41, W * .1); St.ell(W * .73, H * .385, W * .2, H * .065, bub); O.coin(St, W * .73, H * .385, W * .045);
      St.ell(W * .15, H * .46, W * .02, W * .02, bub); St.ell(W * .85, H * .46, W * .02, W * .02, bub); St.ell(W * .5, H * .5, W * .065, W * .065, P.a); headline(St, ['≠'], H * .5, -1); },
    queue(St, lt) { St.back(); ctx.save(); ctx.globalAlpha = .45; for (let i = 0; i < 4; i++) O.building(St, W * (.0 + i * .17), H * .68, W * .15, H * (.1 + (i % 2) * .05), i + 3); ctx.restore(); St.ground(); detail(St); kicker(St, 'ANSWER 1 · THE QUEUE', H * .08); headline(St, ['FREE COSTS', 'TIME'], H * .14, 1);
      O.shop(St, W * .68, H * .66, W * .3, H * .22); for (let i = 6; i >= 0; i--) O.person(St, W * (.6 - i * .085), H * (.66 + i * .006), H * (.17 - i * .007), i); O.clock(St, W * .2, H * .36, W * .09); },
  };
  A.x_style = (o, c, dur) => ({ sfx: [], draw: lt => { const St = S[o.s] || S.paper; (SC[o.v] || SC.hook)(St, lt); St.finish(); } });
  IFM.STYLES = S;
})();
