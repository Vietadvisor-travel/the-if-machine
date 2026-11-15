// FATHOM signature style — the drawing core for static art (brand files, boards). STYLE.md is the rule book; the engine has the React port.
// Usage: const F = Fathom(); F.fill(d, 'sand', .4, 30) … then F.svg(w, h, body, {paper:true}).
window.Fathom = (opt = {}) => {
  const SEP = '#2B1D12', PAPER = '#F3E7CC';
  const PIG = { sky: ['#C9DDE6', '#7FA8C4', '#2E5C86'], sand: ['#F0D9A8', '#D9AE6C', '#A8743E'], stone: ['#EFE0C2', '#C9AE84', '#8C6E4A'], water: ['#8FC1CF', '#3E7FA3', '#1D4566'],
    leaf: ['#A9C08A', '#5F8A5A', '#2F5440'], wood: ['#C99A6A', '#8C5A36', '#4F3020'], brass: ['#F3D98A', '#D4A846', '#8A6420'], cloth: ['#EFE2C6', '#C7A57A', '#7E5E3E'],
    skin: ['#EDC3A0', '#C78F66', '#8A5A3C'], paper: ['#FBF4E2', '#EBDDBC', '#C9B48A'], night: ['#5A6E9A', '#2B3B66', '#141C38'], wall: ['#9A6E50', '#6A4430', '#3A2418'],
    land: ['#E2CF94', '#A9B97A', '#6E8F5A'], sea: ['#9CCAD6', '#4A88AE', '#22507A'], red: ['#F2A672', '#D2643E', '#8C3424'], deep: ['#4A88AE', '#22507A', '#0E2A48'], ice: ['#FFFFFF', '#E8EEF0', '#B9C8D0'] };
  let seed = opt.seed || 7; const R = () => (seed = (seed * 16807) % 2147483647) / 2147483647; const setSeed = s => { seed = s; };
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)), toHex = a => '#' + a.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, k) => toHex(hex(a).map((v, i) => v + (hex(b)[i] - v) * k));
  const tone = (mat, t) => { const M = PIG[mat] || PIG.stone; return t < .5 ? mix(M[0], M[1], t * 2) : mix(M[1], M[2], (t - .5) * 2); };
  const defs = new Set(); let D = '';
  const hatch = (lvl, ang, col = SEP) => { const id = `h${lvl}_${Math.round(ang)}_${col.slice(1)}`; if (!defs.has(id)) { defs.add(id); const sp = [0, 7, 4.6, 4.2, 3.2][lvl], w = [0, .7, .85, .95, 1.05][lvl];
    D += `<pattern id="${id}" width="${sp}" height="${sp}" patternUnits="userSpaceOnUse" patternTransform="rotate(${ang})"><path d="M0 ${sp / 2} H${sp}" stroke="${col}" stroke-width="${w}"/>${lvl >= 3 ? `<path d="M${sp / 2} 0 V${sp}" stroke="${col}" stroke-width="${w * .8}"/>` : ''}</pattern>`; } return id; };
  // a region: wash off the line + pooled rim, hatching in the shade (following `ang`), the swelling sepia line
  const fill = (d, mat, t = .3, ang = 0, o = {}) => { const c = o.color || tone(mat, t), lvl = o.hatch ?? (t < .5 ? 0 : t < .72 ? 1 : 2), wash = mat === 'gold' ? 'url(#gold)' : c, k = o.k || 1;
    return `<g><path d="${d}" fill="${wash}" transform="translate(${2.4 * k} ${-1.6 * k})" filter="url(#wc)"/>${o.rim === false ? '' : `<path d="${d}" fill="none" stroke="${mix(c, '#000000', .35)}" stroke-width="${6 * k}" opacity=".22" transform="translate(${2.4 * k} ${-1.6 * k})" filter="url(#b2s)"/>`}</g>`
      + (lvl ? `<path d="${d}" fill="url(#${hatch(lvl, ang)})" opacity="${o.hatchA ?? .5}"/>` : '')
      + (o.stroke === false ? '' : ink(d, (o.sw || 1.4) * k)); };
  const ink = (d, w = 1.4, col = SEP) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w * 1.5}" opacity=".5" transform="translate(${-w * .6} ${w * .6})" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w * .8}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const line = (d, w = 1.2, col = SEP, a = .9) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" opacity="${a}"/>`;
  const stipple = (x0, y0, w, h, n, dens = () => 1, col = SEP, s0 = 3, r0 = .6) => { seed = s0; let o = ''; for (let i = 0; i < n; i++) { const x = x0 + R() * w, y = y0 + R() * h; if (R() < dens((x - x0) / w, (y - y0) / h)) o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r0 + R() * .7).toFixed(2)}" fill="${col}" opacity=".55"/>`; } return o; };
  const contour = (cx, cy, r, side = -1, k = .55, n = 26) => { const id = 'cs' + Math.round(cx) + '_' + Math.round(cy) + '_' + Math.round(r); D += `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`; let o = `<g clip-path="url(#${id})" opacity=".55">`;
    for (let i = 0; i < n; i++) { const t = i / n; if (t > k) break; const ex = cx + side * r * (1 - t * k * 1.6), rx = r * (.25 + t * .9); o += `<ellipse cx="${ex - side * rx * .2}" cy="${cy}" rx="${rx * .3 + t * r * .2}" ry="${r * 1.02}" fill="none" stroke="${SEP}" stroke-width="${(1.3 - t).toFixed(2)}" transform="rotate(${-18 * side} ${cx} ${cy})"/>`; } return o + '</g>'; };
  const ell = (x, y, rx, ry) => `M${x - rx} ${y} A${rx} ${ry} 0 1 0 ${x + rx} ${y} A${rx} ${ry} 0 1 0 ${x - rx} ${y}Z`;
  const poly = pts => 'M' + pts.map(p => p.map(v => +v.toFixed(1)).join(' ')).join(' L') + 'Z';
  const baseDefs = (W, H) => `<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7E3A0"/><stop offset=".35" stop-color="#D9AE4C"/><stop offset=".55" stop-color="#F3D88E"/><stop offset=".8" stop-color="#B8862B"/><stop offset="1" stop-color="#E6C266"/></linearGradient>
    <filter id="wc"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="${opt.boil || 6}"/><feDisplacementMap in="SourceGraphic" scale="5"/><feGaussianBlur stdDeviation=".5"/></filter><filter id="b2s"><feGaussianBlur stdDeviation="2.5"/></filter><filter id="b8"><feGaussianBlur stdDeviation="8"/></filter><filter id="b30"><feGaussianBlur stdDeviation="30"/></filter>
    <filter id="fib" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .22" numOctaves="3" seed="11"/><feColorMatrix values="0 0 0 0 .55 0 0 0 0 .45 0 0 0 0 .3 0 0 0 .5 -.12"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .09 0"/></filter>
    <radialGradient id="fox"><stop offset="0" stop-color="#9A6A3A" stop-opacity=".22"/><stop offset="1" stop-color="#9A6A3A" stop-opacity="0"/></radialGradient>
    <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#3A2A14" stop-opacity="0"/><stop offset="1" stop-color="#3A2A14" stop-opacity=".35"/></radialGradient>
    <radialGradient id="glowW"><stop offset="0" stop-color="#FFF4D2" stop-opacity=".9"/><stop offset="1" stop-color="#FFF4D2" stop-opacity="0"/></radialGradient>`;
  const finish = (W, H, o = {}) => `<rect width="${W}" height="${H}" filter="url(#fib)" style="mix-blend-mode:multiply"/>${(o.fox || [[.08, .88, .05], [.92, .12, .06], [.85, .9, .035]]).map(([x, y, r]) => `<circle cx="${x * W}" cy="${y * H}" r="${r * Math.max(W, H)}" fill="url(#fox)"/>`).join('')}${o.vig === false ? '' : `<rect width="${W}" height="${H}" fill="url(#vig)"/>`}<rect width="${W}" height="${H}" filter="url(#grain)"/>`;
  const svg = (W, H, body, o = {}) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${o.viewBox || `0 0 ${W} ${H}`}"><defs>${baseDefs(W, H)}${D}</defs>${o.paper === false ? '' : `<rect width="${W}" height="${H}" fill="${PAPER}"/>`}${body}${o.finish === false ? '' : finish(W, H, o)}</svg>`;
  return { SEP, PAPER, PIG, R, setSeed, mix, tone, hatch, fill, ink, line, stipple, contour, ell, poly, svg, addDef: s => { D += s; } };
};
