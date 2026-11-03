/* THE IF MACHINE — world kit 1: the planet, cities, people, maps, numbers, split worlds.
   `# vis kind=w act=<act> [view=…] [cam=…] [words="TEXT@k|!TEXT@k"] …`
   Every act has several views and the camera rig is chosen per beat, so the same act never looks the same twice.
   words=: lettering on caption k (0-based) of the beat; "!" = twist colour (coral); "~" = teal (machine data).
   cam=  push | pull | truckL | truckR | crane | drop | tilt | orbit | whip | dutch | float  (default: rotates by beat index)
   Acts and their own keys:
     globe  view=full|limb|side|night  lon= lat= spin=  night=0..1  lights=0..1  off=<s> (lights die east→west)  arcs=<n> (network)  cut=<s> (arcs die)
     zoom   to=city|street  rev=1 (from street out to space)  — the continuous cosmic dive
     city   view=skyline|aerial|street  time=day|dusk|night  dark=<s> (blackout cascade)  traffic=0..1  people=<n>
     crowd  view=wide|street|close  pose=phone|look|walk|run|cheer|sleep|scared|wait|talk  n=  time=  phones=0..1 (screens lit)  dark=<s>
     map    view=flat|tilt  pins="lon,lat,LABEL;…"  arcs="lon,lat>lon,lat;…"  band="latMin,latMax"  dim=0..1
     count  icon=person|phone|coin|car|plane|dot  n=<icons>  value="8,100,000,000"  label=  view=grid|wave|pile
     split  a="<act> key=val …"  b="<act> key=val …"  la=NOW lb="WHAT IF"  at=<s> (divider sweeps)  */
'use strict';
(function () {
  if (!window.VIS || !VIS.K || !window.TOON || !window.IFM) { console.warn('ifm_world needs vis + toontype + ifm_brand'); return; }
  const P = IFM.P, A = {}; IFM.ACT = A;
  const T0 = (c, k, d) => c && c[k] ? c[k][0] + .05 : d;
  const num = (o, k, d) => (o[k] != null && o[k] !== '' ? +o[k] : d);
  const vy = (a, b) => H * (H > W ? a : b);
  const sm = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

  // ---------------------------------------------------------------- camera rigs
  const CAMS = ['push', 'truckR', 'crane', 'pull', 'orbit', 'truckL', 'drop', 'tilt', 'float', 'dutch'];
  function cam(name, lt, dur) { const q = clamp(lt / Math.max(1, dur)), e = E.inOut(q), u = U(); let z = 1, x = 0, y = 0, r = 0;
    switch (name) {
      case 'push': z = lerp(1.02, 1.16, e); break; case 'pull': z = lerp(1.18, 1.02, e); break;
      case 'truckR': z = 1.1; x = lerp(W * .05, -W * .05, e); break; case 'truckL': z = 1.1; x = lerp(-W * .05, W * .05, e); break;
      case 'crane': z = 1.08; y = lerp(H * .05, -H * .04, e); break; case 'drop': z = lerp(1.12, 1.04, e); y = lerp(-H * .06, H * .02, e); break;
      case 'tilt': z = 1.1; r = lerp(-.025, .025, e); break; case 'orbit': z = lerp(1.06, 1.14, e); r = lerp(.04, -.02, e); x = lerp(-W * .02, W * .02, e); break;
      case 'whip': { const w = E.out5(clamp(lt / .55)); z = lerp(1.7, 1.06, w) + .04 * e; r = (1 - w) * .12; break; }
      case 'dutch': z = lerp(1.08, 1.14, e); r = .045; break;
      default: z = 1.06 + .03 * Math.sin(lt * .5); x = Math.sin(lt * .37) * 12 * u; y = Math.cos(lt * .29) * 9 * u; }
    x += Math.sin(lt * .9) * 3 * u; y += Math.cos(lt * .7) * 3 * u; // a breath, never fully still
    ctx.translate(W / 2 + x, H / 2 + y); ctx.rotate(r); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2); }
  IFM.cam = cam;

  // ---------------------------------------------------------------- lettering on cue (words="TEXT@k|!TEXT@k")
  function words(o, c, lt) { if (!o.words) return; const v = H > W; String(o.words).split('|').forEach((w, j, all) => { let s = w.trim(); if (!s) return; let fill = [P.paper, '#FFE7A8']; if (s[0] === '!') { s = s.slice(1); fill = ['#FFC2BC', P.coral]; } else if (s[0] === '~') { s = s.slice(1); fill = ['#C8FFF3', P.teal]; } else if (s[0] === '^') { s = s.slice(1); fill = ['#FFF3B0', P.yellow]; }
      const m = s.match(/^(.*)@(\d+)$/); const txt = m ? m[1] : s, k = m ? +m[2] : j, at = T0(c, k, .3 + j), nxt = all[j + 1] && /@(\d+)$/.test(all[j + 1]) ? T0(c, +all[j + 1].match(/@(\d+)$/)[1], 99) : 99;
      const y = vy(.17, .15) + (o.wordsY ? (+o.wordsY) * H : 0), size = (v ? 104 : 96) * Math.min(1, 11 / Math.max(6, txt.length));
      if (window.LINT && LINT.on && lt >= at && (nxt >= 99 || lt < nxt)) { const sz = Math.max(56, size) * U(), tw = Math.min(W * .86, textW(txt.toUpperCase(), sz, 'toon', 900) + sz * .3); LINT.boxes.push({ k: 'ui', s: txt, x0: W / 2 - tw / 2, x1: W / 2 + tw / 2, y0: y - sz * .6, y1: y + sz * .6 }); }
      TOON.word(txt.toUpperCase(), W / 2, y, { size: Math.max(56, size), lt, at, out: nxt < 99 ? nxt - .12 : undefined, enter: ['slam', 'pop', 'drop'][j % 3], idle: ['wobble', 'bounce', 'none'][j % 3], fill, stroke: '#0E1124', depthCol: '#0E1124', maxW: .86 }); }); }

  // ---------------------------------------------------------------- skies and grounds
  const SKY = { day: ['#5FB6F2', '#A9DDF7', '#E8F6FB'], dusk: ['#2B2D6E', '#C2557A', '#FFB36B'], night: ['#070A1F', '#141B45', '#28306A'], dawn: ['#34407E', '#E58C8A', '#FFD9A0'] };
  function sky(time = 'day', lt = 0, o = {}) { const s = SKY[time] || SKY.day, g = ctx.createLinearGradient(0, 0, 0, H * (o.h || 1)); g.addColorStop(0, s[0]); g.addColorStop(.6, s[1]); g.addColorStop(1, s[2]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const u = U(); if (time === 'night' || time === 'dusk') IFM.stars(lt, time === 'night' ? 1 : .35);
    if (time === 'day') { glow(W * .8, H * .16, 300 * u, '#FFF6C8', .7); circ(W * .8, H * .16, 60 * u, '#FFF8DC', 0); }
    if (time === 'dusk' || time === 'dawn') { glow(W * .3, H * .62, 420 * u, '#FFB36B', .55); circ(W * .3, H * .62, 80 * u, '#FFD58A', 0); }
    if (time === 'night') { circ(W * .82, H * .14, 46 * u, '#F3EEDD', 0); circ(W * .82 + 16 * u, H * .14 - 10 * u, 42 * u, SKY.night[0], 0); glow(W * .82, H * .14, 160 * u, '#DDE6FF', .25); }
    if (o.clouds !== false && time !== 'night') { const r = rng(5); ctx.save(); ctx.globalAlpha = time === 'day' ? .85 : .35; for (let i = 0; i < 6; i++) { const cx = ((r() * W * 1.4 + lt * (14 + i * 5) * u) % (W * 1.4)) - W * .2, cy = H * (.08 + r() * .3), s2 = (.6 + r() * .9) * u; cloud(cx, cy, s2); } ctx.restore(); } }
  function cloud(x, y, s) { ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(x, y, 110 * s, 34 * s, 0, 0, TAU); ctx.ellipse(x - 50 * s, y - 10 * s, 50 * s, 36 * s, 0, 0, TAU); ctx.ellipse(x + 30 * s, y - 24 * s, 62 * s, 44 * s, 0, 0, TAU); ctx.fill(); }
  IFM.sky = sky; IFM.cloud = cloud;

  // people: engine/library/ifm_people.js (new house styles). h is a share of the frame height.
  function figure(x, y, s, seed, pose, lt, o = {}) { IFM.human(x, y, H * .42 * s, seed, pose, lt, { ...o, phone: o.phones === 0 ? 'off' : o.screen }); }
  function crowd(n, yBase, lt, o = {}) { IFM.people(n, yBase, lt, { ...o, h: H * .42 * (o.scale || .5), phone: o.phones != null && o.phones < .1 ? 'off' : o.screen }); }
  IFM.figure = figure; IFM.crowd = crowd;
  // ---------------------------------------------------------------- the globe (orthographic, Natural Earth land)
  let LIGHTS = null; function pip(pt, ring) { let c = false; for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) { const a = ring[i], b = ring[j]; if (((a[1] > pt[1]) !== (b[1] > pt[1])) && (pt[0] < (b[0] - a[0]) * (pt[1] - a[1]) / (b[1] - a[1]) + a[0])) c = !c; } return c; }
  function lights() { if (LIGHTS) return LIGHTS; const r = rng(42), out = []; const rings = IFM_LAND.filter(g => g.length > 20); let guard = 0;
    while (out.length < 1400 && guard++ < 40000) { const lon = r() * 360 - 180, lat = r() * 120 - 55; if (lat > 66) continue; const w = Math.cos(lat * Math.PI / 180) * (lat > 15 && lat < 55 ? 1 : .45); if (r() > w) continue; if (rings.some(g => pip([lon, lat], g))) out.push([lon, lat, r()]); }
    LIGHTS = out; return out; }
  const RAD = Math.PI / 180;
  function proj(lon, lat, l0, p0) { const la = lat * RAD, dl = (lon - l0) * RAD, cp = Math.cos(p0 * RAD), sp = Math.sin(p0 * RAD); const x = Math.cos(la) * Math.sin(dl), y = cp * Math.sin(la) - sp * Math.cos(la) * Math.cos(dl), z = sp * Math.sin(la) + cp * Math.cos(la) * Math.cos(dl); return [x, y, z]; }
  function globe(cx, cy, R, lt, o = {}) { const u = U(), l0 = (o.lon ?? 10) + lt * (o.spin ?? 6), p0 = o.lat ?? 18;
    glow(cx, cy, R * 1.35, '#5AC8FF', .22); const g = ctx.createRadialGradient(cx - R * .35, cy - R * .4, R * .1, cx, cy, R); g.addColorStop(0, '#2E8FD0'); g.addColorStop(.7, '#155A9C'); g.addColorStop(1, '#0B2D5E'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.clip();
    for (const ring of IFM_LAND) { ctx.beginPath(); let vis = 0; ring.forEach(([lo, la], i) => { let [x, y, z] = proj(lo, la, l0, p0); if (z < 0) { const m = Math.hypot(x, y) || 1; x /= m; y /= m; } else vis++; const X = cx + x * R, Y = cy - y * R; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); if (!vis) continue; ctx.closePath();
      const lg = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R); lg.addColorStop(0, o.land0 || '#7BD389'); lg.addColorStop(1, o.land1 || '#3FA36B'); ctx.fillStyle = lg; ctx.fill(); }
    // ice caps
    ctx.fillStyle = 'rgba(240,248,255,.92)'; for (const pole of [1, -1]) { ctx.beginPath(); let vis = 0; for (let k = 0; k <= 48; k++) { let [x, y, z] = proj(k * 7.5, pole * 81, l0, p0); if (z < 0) { const m = Math.hypot(x, y) || 1; x /= m; y /= m; } else vis++; k ? ctx.lineTo(cx + x * R, cy - y * R) : ctx.moveTo(cx + x * R, cy - y * R); } const [px, py, pz] = proj(0, pole * 90, l0, p0); if (vis && pz > -.3) { ctx.closePath(); ctx.fill(); } }
    // clouds drifting
    if (o.clouds !== false) { const r = rng(8); ctx.save(); ctx.globalAlpha = .5; ctx.fillStyle = '#FFFFFF'; for (let i = 0; i < 26; i++) { const lo = r() * 360 + lt * 4, la = r() * 120 - 60, [x, y, z] = proj(lo, la, l0, p0); if (z < .05) continue; ctx.beginPath(); ctx.ellipse(cx + x * R, cy - y * R, R * (.05 + r() * .09) * (.4 + .6 * z), R * .025 * (.5 + z), r(), 0, TAU); ctx.fill(); } ctx.restore(); }
    // night side + city lights
    const nt = o.night ?? 0; if (nt > 0) { const ang = o.sunAng ?? -.4, dx = Math.cos(ang), dy = Math.sin(ang); const ng = ctx.createLinearGradient(cx + dx * R * (1.4 - 2.6 * nt), cy + dy * R * (1.4 - 2.6 * nt), cx + dx * R * (2.2 - 2.6 * nt), cy + dy * R * (2.2 - 2.6 * nt)); ng.addColorStop(0, 'rgba(4,6,22,.88)'); ng.addColorStop(1, 'rgba(4,6,22,0)'); ctx.fillStyle = ng; ctx.fillRect(cx - R, cy - R, R * 2, R * 2); }
    const lg2 = o.lights ?? nt; if (lg2 > 0) { for (const [lo, la, k] of lights()) { const [x, y, z] = proj(lo, la, l0, p0); if (z < .05) continue; let on = lg2; if (o.off != null) { const lag = ((180 - lo) / 360) * (o.offSpan ?? 2.2); on *= 1 - sm(o.off + lag, o.off + lag + .25, lt); } if (on <= .02) continue; const X = cx + x * R, Y = cy - y * R, s = (1.2 + k * 2) * u * (.5 + .5 * z);
        ctx.globalAlpha = on * (.55 + .45 * Math.sin(lt * 3 + k * 40)) ; ctx.fillStyle = k > .85 ? '#FFFFFF' : '#FFD27A'; ctx.fillRect(X - s / 2, Y - s / 2, s, s); } ctx.globalAlpha = 1; }
    // network arcs
    const na = o.arcs | 0; if (na > 0) { const L = lights(), r = rng(11); for (let i = 0; i < na; i++) { const a = L[Math.floor(r() * L.length)], b = L[Math.floor(r() * L.length)], pa = proj(a[0], a[1], l0, p0), pb = proj(b[0], b[1], l0, p0); if (pa[2] < .1 || pb[2] < .1) continue;
        let alive = 1; if (o.cut != null) alive = 1 - sm(o.cut + r() * .8, o.cut + r() * .8 + .2, lt); if (alive <= 0) continue; const ax = cx + pa[0] * R, ay = cy - pa[1] * R, bx = cx + pb[0] * R, by = cy - pb[1] * R, mx = (ax + bx) / 2, my = (ay + by) / 2, lift = 1 + Math.hypot(bx - ax, by - ay) / R * .35, hx = cx + (mx - cx) * lift, hy = cy + (my - cy) * lift;
        ctx.save(); ctx.globalAlpha = .7 * alive; ctx.strokeStyle = P.teal; ctx.lineWidth = 2.5 * u; ctx.setLineDash([16 * u, 12 * u]); ctx.lineDashOffset = -lt * 60 * u - i * 7; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.quadraticCurveTo(hx, hy, bx, by); ctx.stroke(); ctx.restore(); circ(ax, ay, 3.5 * u, P.teal, 0); } }
    ctx.restore();
    // rim light + shade
    const rg = ctx.createRadialGradient(cx + R * .3, cy + R * .3, R * .3, cx, cy, R * 1.02); rg.addColorStop(0, 'rgba(0,0,0,0)'); rg.addColorStop(.85, 'rgba(5,10,40,.25)'); rg.addColorStop(1, 'rgba(5,10,40,.6)'); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(140,220,255,.55)'; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.arc(cx, cy, R + 2 * u, Math.PI * 1.05, Math.PI * 1.85); ctx.stroke(); }
  IFM.globe = globe;
  A.globe = (o, c, dur) => ({ sfx: [[.1, 'magic_shimmer'], ...(o.off != null ? [[+o.off, 'glitch_power_down']] : []), ...(o.cut != null ? [[+o.cut, 'glitch_data']] : [])], draw: lt => { const u = U(), v = H > W, view = o.view || 'full';
    IFM.nightBg(lt, { grid: false, c0: '#141A40' }); const go = { lon: num(o, 'lon', 10), lat: num(o, 'lat', 18), spin: num(o, 'spin', 5), night: num(o, 'night', 0), lights: o.lights != null ? +o.lights : undefined, off: o.off != null ? +o.off : undefined, arcs: num(o, 'arcs', 0), cut: o.cut != null ? +o.cut : undefined };
    if (view === 'limb') { const R = Math.max(W, H) * 1.1; globe(W / 2, H + R * .72, R, lt, { ...go, lat: o.lat != null ? +o.lat : -12, spin: go.spin * .25 }); }
    else if (view === 'side') { const R = Math.min(W, H) * (v ? .42 : .48); globe(v ? W / 2 : W * .68, v ? H * .62 : H * .52, R, lt, go); }
    else { const R = Math.min(W, H) * (v ? .4 : .4) * (1 + .04 * Math.sin(lt * .4)); globe(W / 2, H * (v ? .52 : .53), R, lt, go); } } });

  // ---------------------------------------------------------------- city
  function towers(seed, yBase, k, lt, o = {}) { const u = U(), r = rng(seed); let x = -60 * u; const out = []; while (x < W + 60 * u) { const w = (90 + r() * 120) * u * k, h = (180 + r() * 420) * u * k * (o.tall || 1); out.push({ x, w, h, s: r() * 1000 }); x += w + (6 + r() * 20) * u * k; } return out.map(b => ({ ...b, y: yBase })); }
  function drawTowers(L, col, lt, o = {}) { const u = U(); for (const b of L) { const r = rng(b.s | 0), top = b.y - b.h; ctx.fillStyle = col; ctx.fillRect(b.x, top, b.w, b.h);
      if (r() < .3) { ctx.fillRect(b.x + b.w * .4, top - 40 * u, 4 * u, 40 * u); if ((lt * 1.5 + b.s) % 1 < .5) circ(b.x + b.w * .4 + 2 * u, top - 42 * u, 4 * u, P.coral, 0); }
      if (o.windows === false) continue; const ww = 10 * u * (o.k || 1), gap = 22 * u * (o.k || 1);
      for (let yy = top + gap; yy < b.y - gap; yy += gap) for (let xx = b.x + gap * .6; xx < b.x + b.w - ww - 4; xx += gap) { const kk = r(); if (kk < .35) continue; let on = o.lit ?? 1; if (o.dark != null) { const lag = (xx / W) * 1.6 + kk * .6; on *= 1 - sm(o.dark + lag, o.dark + lag + .12, lt); } if (on < .05) { ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(xx, yy, ww, ww * 1.3); continue; }
        ctx.globalAlpha = on; ctx.fillStyle = kk > .9 ? '#9FE8FF' : '#FFD27A'; ctx.fillRect(xx, yy, ww, ww * 1.3); ctx.globalAlpha = 1; } } }
  IFM.towers = towers; IFM.drawTowers = drawTowers;
  A.city = (o, c, dur) => { const view = o.view || 'skyline', time = o.time || 'night', dark = o.dark != null ? +o.dark : undefined; return { sfx: [[.1, time === 'night' ? 'amb_traffic_far' : 'amb_city_traffic'], ...(dark != null ? [[dark, 'glitch_power_down'], [dark + 1.2, 'crowd_gasp']] : [])], draw: lt => { const u = U(), v = H > W;
    if (view === 'aerial') { ctx.fillStyle = time === 'day' ? '#9AA6B8' : '#141933'; ctx.fillRect(0, 0, W, H); const blk = 170 * u, st = 46 * u, r = rng(4); ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(-.5); ctx.translate(-W, -H);
      for (let gx = 0; gx < W * 2 + blk; gx += blk + st) for (let gy = 0; gy < H * 2 + blk; gy += blk + st) { const kk = r(); const park = kk < .08; ctx.fillStyle = park ? (time === 'day' ? '#6CC57A' : '#1F4A3A') : (time === 'day' ? '#E7E2D6' : '#262C55'); ctx.fillRect(gx, gy, blk, blk);
        if (!park) for (let q = 0; q < 4; q++) { const bx = gx + (q % 2) * blk * .5 + 8 * u, by = gy + Math.floor(q / 2) * blk * .5 + 8 * u, bw = blk * .5 - 16 * u; ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(bx + 10 * u, by + 10 * u, bw, bw); ctx.fillStyle = time === 'day' ? ['#F6F1E7', '#D9DEE8', '#F2C9A0'][q % 3] : ['#343C72', '#2B3263', '#3B437E'][q % 3]; ctx.fillRect(bx, by, bw, bw);
          if (time !== 'day') { let on = 1; if (dark != null) on = 1 - sm(dark + (gx + gy) / (W * 4) * 2, dark + (gx + gy) / (W * 4) * 2 + .15, lt); if (on > .05) { ctx.globalAlpha = on * .9; ctx.fillStyle = '#FFD27A'; ctx.fillRect(bx + bw * .3, by + bw * .3, bw * .15, bw * .15); ctx.globalAlpha = 1; } } } }
      // cars along streets
      const tr = num(o, 'traffic', 1); for (let i = 0; i < 70 * tr; i++) { const lane = i % 12, horiz = i % 2, off = ((i * 197 + lt * (120 + (i % 5) * 30) * u * (1 - (dark != null ? sm(dark, dark + 1.2, lt) : 0))) % (W * 2)); const pos = lane * (blk + st) + blk + st / 2; const x = horiz ? off : pos, y = horiz ? pos : off;
        ctx.fillStyle = ['#FF5B4F', '#FFC531', '#F6F1E7', '#5BC0EB'][i % 4]; ctx.fillRect(x - (horiz ? 10 : 5) * u, y - (horiz ? 5 : 10) * u, (horiz ? 20 : 10) * u, (horiz ? 10 : 20) * u); if (time !== 'day') glow(x, y, 22 * u, '#FFE7A8', .35); }
      ctx.restore(); return; }
    sky(time, lt); const lit = time === 'day' ? .0 : 1;
    if (view === 'street') { // worm's-eye: towers lean in
      const r = rng(9); for (let i = 0; i < 9; i++) { const left = i % 2 === 0, k = 1 - Math.floor(i / 2) * .16, bw = W * .26 * k, x0 = left ? -W * .02 + i * W * .03 : W - bw + W * .02 - i * W * .03, lean = (left ? 1 : -1) * W * .22 * k;
        ctx.fillStyle = shade(time === 'day' ? '#7D8FB5' : '#232A5A', -(1 - k) * .4); ctx.beginPath(); ctx.moveTo(x0, H); ctx.lineTo(x0 + bw, H); ctx.lineTo(x0 + bw + lean * .3 + (left ? 0 : 0), -H * .1); ctx.lineTo(x0 + lean * .3 + (left ? bw * .4 : -bw * .4) * 0, -H * .1); ctx.closePath(); ctx.fill();
        for (let yy = 0; yy < 22; yy++) for (let xx = 0; xx < 5; xx++) { const f = yy / 22, X = lerp(x0 + bw * (xx + .3) / 5, x0 + lean * .3 + bw * (xx + .3) / 5, 1 - f), Y = lerp(-H * .1, H, f); let on = lit * (r() > .3 ? 1 : 0); if (dark != null) on *= 1 - sm(dark + (1 - f) * .9 + r() * .4, dark + (1 - f) * .9 + r() * .4 + .1, lt); if (on > .05) { ctx.globalAlpha = on; ctx.fillStyle = '#FFD27A'; ctx.fillRect(X, Y, 12 * u * (1.2 - f * .6) * k, 8 * u * k); ctx.globalAlpha = 1; } } } return; }
    // skyline: 3 depth layers, haze, street with people
    const ground = vy(.8, .82); const L3 = towers(31, ground - 80 * u, .7, lt, { tall: 1.3 }), L2 = towers(32, ground - 30 * u, .9, lt), L1 = towers(33, ground, 1.15, lt, { tall: .9 });
    const pal = time === 'day' ? ['#A9B9D6', '#8396BD', '#5E6F98'] : time === 'dusk' ? ['#5A4A86', '#3E3870', '#2A2756'] : ['#1D2350', '#161B42', '#10142F'];
    ctx.save(); ctx.translate(-lt * 6 * u, 0); drawTowers(L3, pal[0], lt, { lit: lit * .7, dark, k: .7 }); ctx.restore(); ctx.fillStyle = time === 'day' ? 'rgba(255,255,255,.18)' : 'rgba(40,40,100,.25)'; ctx.fillRect(0, 0, W, H);
    ctx.save(); ctx.translate(-lt * 12 * u, 0); drawTowers(L2, pal[1], lt, { lit, dark, k: .9 }); ctx.restore();
    ctx.save(); ctx.translate(-lt * 22 * u, 0); drawTowers(L1, pal[2], lt, { lit, dark, k: 1.1 }); ctx.restore();
    ctx.fillStyle = time === 'day' ? '#4A4F66' : '#0B0E22'; ctx.fillRect(0, ground, W, H - ground); for (let x = ((-lt * 200 * u) % (120 * u)); x < W; x += 120 * u) rr(x, ground + 40 * u, 60 * u, 8 * u, 4 * u, 'rgba(255,255,255,.35)', 0);
    const pn = num(o, 'people', 10); if (pn > 0) crowd(pn, ground + 20 * u, lt, { pose: o.pose || 'walk', scale: .32, rows: 2, depth: .02, seed: 7 }); } }; };

  // ---------------------------------------------------------------- crowd (people as the subject)
  A.crowd = (o, c, dur) => { const pose = o.pose || 'phone', view = o.view || 'wide', time = o.time || 'night', dark = o.dark != null ? +o.dark : undefined; return { sfx: [[.1, 'amb_crowd_festival'], ...(dark != null ? [[dark, 'glitch_power_down'], [dark + .3, 'crowd_gasp']] : [])], draw: lt => { const u = U(), v = H > W;
    const phones = (o.phones != null ? +o.phones : 1) * (dark != null ? 1 - sm(dark, dark + .3, lt) : 1), scr = dark != null && lt > dark ? '#3A3F5C' : (o.screen || '#9FE8FF');
    if (view === 'close') { sky(time, lt, { clouds: false }); ctx.fillStyle = time === 'day' ? '#C9C2B0' : '#141833'; ctx.fillRect(0, H * .8, W, H * .2); const n = v ? 2 : 3; for (let i = 0; i < n; i++) figure(W * (i + .5) / n, H * (v ? .77 : 1.02), v ? 1.05 : 1.1, 40 + i * 3 + num(o, 'seed', 0), pose, lt, { phones, screen: scr, role: o.role }); return; }
    if (view === 'street') { A.city({ ...o, view: 'skyline', people: 0, time }, c, dur).draw(lt); crowd(num(o, 'n', 18), H * (v ? .76 : 1), lt, { pose, scale: v ? .42 : .55, rows: 3, depth: v ? .1 : .16, seed: num(o, 'seed', 2), phones, screen: scr, role: o.role }); return; }
    sky(time, lt, { clouds: time !== 'night' }); const g = ctx.createLinearGradient(0, H * .55, 0, H); g.addColorStop(0, time === 'day' ? '#B7C7A0' : '#1A1F45'); g.addColorStop(1, time === 'day' ? '#8FA57A' : '#0C0F26'); ctx.fillStyle = g; ctx.fillRect(0, H * .55, W, H * .45);
    crowd(num(o, 'n', 40), H * (v ? .77 : 1.02), lt, { pose: o.mix ? o.mix.split(',') : pose, scale: v ? .5 : .46, rows: 5, depth: .4, seed: num(o, 'seed', 5), phones, screen: scr, role: o.role }); } }; };

  // ---------------------------------------------------------------- map (flat world)
  A.map = (o, c, dur) => { const pins = String(o.pins || '').split(';').filter(Boolean).map(s => s.split(',')), arcs = String(o.arcs || '').split(';').filter(Boolean).map(s => s.split('>').map(p => p.split(',').map(Number)));
    return { sfx: pins.map((p, i) => [T0(c, i, .6 + i * .5), 'ui_pin_drop']), draw: lt => { const u = U(), v = H > W, tilt = (o.view || 'flat') === 'tilt'; ctx.fillStyle = '#0D1433'; ctx.fillRect(0, 0, W, H); IFM.grid(.05, lt);
      const lons = pins.map(p => +p[0]).concat(arcs.flat().map(p => p[0])), lo0 = lons.length ? Math.min(...lons) : -20, lo1 = lons.length ? Math.max(...lons) : 60, foc = o.focus != null ? +o.focus : (lo0 + lo1) / 2, mw = v ? Math.min(W * 2.4, W * .62 * 360 / Math.max(40, lo1 - lo0)) : W * 1.02, mh = mw / 2, ox = v ? W / 2 - mw * ((foc + 180) / 360) : (W - mw) / 2, oy = (H - mh) / 2 + (v ? 0 : H * .02); const X = lo => ox + (lo + 180) / 360 * mw, Y = la => oy + (90 - la) / 180 * mh;
      ctx.save(); if (tilt) { ctx.translate(W / 2, H * .55); ctx.transform(1, 0, -.25, .62, 0, 0); ctx.translate(-W / 2, -H * .55); }
      if (o.band) { const [a, b] = o.band.split(',').map(Number); ctx.fillStyle = 'rgba(255,197,49,.12)'; ctx.fillRect(ox, Y(b), mw, Y(a) - Y(b)); }
      for (const ring of IFM_LAND) { ctx.beginPath(); ring.forEach(([lo, la], i) => i ? ctx.lineTo(X(lo), Y(la)) : ctx.moveTo(X(lo), Y(la))); ctx.closePath(); ctx.fillStyle = `rgba(60,72,130,${1 - num(o, 'dim', 0) * .5})`; ctx.fill(); ctx.strokeStyle = 'rgba(46,230,197,.35)'; ctx.lineWidth = 1.5 * u; ctx.stroke(); }
      arcs.forEach(([a, b], i) => { const ax = X(a[0]), ay = Y(a[1]), bx = X(b[0]), by = Y(b[1]), q = clamp((lt - .3 - i * .25) / 1); if (q <= 0) return; const mx = (ax + bx) / 2, my = Math.min(ay, by) - Math.abs(bx - ax) * .25; ctx.save(); ctx.strokeStyle = P.yellow; ctx.lineWidth = 3 * u; ctx.beginPath(); for (let s = 0; s <= 30 * q; s++) { const t = s / 30, x = (1 - t) * (1 - t) * ax + 2 * (1 - t) * t * mx + t * t * bx, y = (1 - t) * (1 - t) * ay + 2 * (1 - t) * t * my + t * t * by; s ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); });
      pins.forEach((p, i) => { const at = T0(c, i, .6 + i * .5), k = E.back(clamp((lt - at) / .35)); if (k <= 0) return; const x = X(+p[0]), y = Y(+p[1]); glow(x, y, 80 * u, P.coral, .5 * k); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); circ(0, -26 * u, 16 * u, P.coral, 0); ctx.beginPath(); ctx.moveTo(-10 * u, -18 * u); ctx.lineTo(0, 0); ctx.lineTo(10 * u, -18 * u); ctx.fillStyle = P.coral; ctx.fill(); circ(0, -26 * u, 6 * u, P.paper, 0); ctx.restore();
        if (p[2]) T(p[2], clamp(x, textW(p[2], 26 * u, 'mono') / 2 + W * .1, W - textW(p[2], 26 * u, 'mono') / 2 - W * .1), y + 30 * u, { size: 26 * u, font: 'mono', fill: P.paper, lw: 6 * u, stroke: '#0D1433', alpha: k }); });
      ctx.restore(); } }; };

  // ---------------------------------------------------------------- count (a number made of things)
  function icon(kind, x, y, s, col) { const u = U() * s; switch (kind) {
    case 'person': circ(x, y - 22 * u, 9 * u, col, 0); rr(x - 11 * u, y - 12 * u, 22 * u, 26 * u, 9 * u, col, 0); break;
    case 'phone': rr(x - 9 * u, y - 16 * u, 18 * u, 32 * u, 4 * u, '#15192F', 0); rr(x - 7 * u, y - 13 * u, 14 * u, 25 * u, 2 * u, col, 0); break;
    case 'coin': circ(x, y, 13 * u, '#E8A400', 0); circ(x, y, 10 * u, P.yellow, 0); break;
    case 'car': rr(x - 16 * u, y - 6 * u, 32 * u, 12 * u, 5 * u, col, 0); rr(x - 9 * u, y - 13 * u, 18 * u, 9 * u, 4 * u, col, 0); circ(x - 9 * u, y + 7 * u, 4 * u, '#111', 0); circ(x + 9 * u, y + 7 * u, 4 * u, '#111', 0); break;
    case 'plane': ctx.save(); ctx.translate(x, y); ctx.rotate(-.5); rr(-16 * u, -3 * u, 32 * u, 6 * u, 3 * u, col, 0); poly([[-3 * u, 0], [6 * u, -14 * u], [9 * u, 0]], col, 0); poly([[-3 * u, 0], [6 * u, 14 * u], [9 * u, 0]], col, 0); ctx.restore(); break;
    default: circ(x, y, 7 * u, col, 0); } }
  IFM.icon = icon;
  A.count = (o, c, dur) => { const n = num(o, 'n', 400), kind = o.icon || 'person'; return { sfx: [[.2, 'ui_counter'], [Math.min(dur - .5, 2.2), 'impact_cinematic']], draw: lt => { const u = U(), v = H > W; IFM.nightBg(lt, { cy: .5 }); const view = o.view || 'grid';
    const cols = Math.round(Math.sqrt(n * (v ? .56 : 1.78))), rows = Math.ceil(n / cols), cw = W * (v ? .86 : .8) / cols, ch = H * (v ? .5 : .56) / rows, s = Math.min(cw, ch) / 34, x0 = (W - cw * cols) / 2 + cw / 2, y0 = H * (v ? .3 : .3) + ch / 2, fill = clamp(lt / Math.max(1, dur * .6));
    for (let i = 0; i < n; i++) { const q = i / n; if (q > fill) break; const cx = i % cols, cy = Math.floor(i / cols); let x = x0 + cx * cw, y = y0 + cy * ch; if (view === 'wave') y += Math.sin(lt * 3 - cx * .4) * ch * .25; if (view === 'pile') { const dropK = E.bounce(clamp((fill - q) * 12)); y = lerp(-40 * u, y, dropK); }
      const hl = o.hl != null && i < +o.hl; icon(kind, x, y, s, hl ? P.coral : [P.paper, P.teal, P.yellow, '#9FB4FF'][i % 4]); }
    if (o.value) { const shown = String(o.value).replace(/\d/g, (d, k) => (lt * 30 + k * 3) % 10 < 9 * fill + 1 && fill < 1 ? String(Math.floor((lt * 37 + k * 7) % 10)) : d); const vs = Math.min((v ? 92 : 100) * u, W * .86 / Math.max(1, textW(o.value, 100, 'display')) * 100); T(fill < 1 ? shown : o.value, W / 2, H * (v ? .2 : .16), { size: vs, font: 'display', fill: P.yellow, lw: 0, scale: E.back(clamp(lt / .4)) }); if (o.label) T(o.label.toUpperCase(), W / 2, H * (v ? .2 : .16) + 80 * u, { size: 28 * u, font: 'mono', fill: P.teal, lw: 0, ls: 4 * u }); } } }; };

  // ---------------------------------------------------------------- split: NOW | WHAT IF, divider sweeps
  function parseSub(s) { const o = {}; String(s || '').replace(/(\w+)=("([^"]*)"|\S+)/g, (m, k, v, q) => { o[k] = q != null ? q : v; return ''; }); o.act = String(s || '').trim().split(/\s+/)[0]; return o; }
  A.split = (o, c, dur) => { const oa = parseSub(o.a || 'city time=day'), ob = parseSub(o.b || 'city time=night dark=0'), Aa = (A[oa.act] || A.city)(oa, c, dur), Ab = (A[ob.act] || A.city)(ob, c, dur), at = num(o, 'at', .4);
    return { sfx: [...Aa.sfx.slice(0, 1), [at, 'whoosh_med']], draw: lt => { const u = U(), v = H > W, k = E.inOut(clamp((lt - at) / .9)), d = v ? lerp(H, H * .5, k) : lerp(W, W * .5, k);
      ctx.save(); ctx.beginPath(); v ? ctx.rect(0, 0, W, d) : ctx.rect(0, 0, d, H); ctx.clip(); Aa.draw(lt); ctx.restore(); ctx.save(); ctx.beginPath(); v ? ctx.rect(0, d, W, H - d) : ctx.rect(d, 0, W - d, H); ctx.clip(); Ab.draw(lt); ctx.restore();
      ctx.fillStyle = P.yellow; v ? ctx.fillRect(0, d - 4 * u, W, 8 * u) : ctx.fillRect(d - 4 * u, 0, 8 * u, H); glow(v ? W / 2 : d, v ? d : H / 2, 120 * u, P.yellow, .4);
      const lab = (t, x, y, col) => IFM.tag(t, x, y, 30 * u, { bg: col, t: lt }); if (k > .3) { ctx.save(); ctx.globalAlpha *= clamp((k - .3) * 3); lab(o.la || 'NOW', v ? W / 2 : d / 2, v ? H * .1 : H * .1, P.paper); lab(o.lb || 'WHAT IF', v ? W / 2 : d + (W - d) / 2, v ? d + H * .06 : H * .1, P.yellow); ctx.restore(); } } }; };

  // ---------------------------------------------------------------- the dispatcher (shared by world kit 2)
  // then="view=close@1|act=map pins=…@2": the beat cuts to a new angle or a new picture on caption k (a shot every 2–3 s)
  function segs(o, c) { const L = [{ o, at: 0 }]; String(o.then || '').split('|').map(x => x.trim()).filter(Boolean).forEach((x, j) => { const m = x.match(/^(.*)@(\d+(?:\.\d+)?s?)$/); const body = m ? m[1] : x, at = !m ? 1.5 * (j + 1) : /s$/.test(m[2]) ? parseFloat(m[2]) : T0(c, +m[2], 1.5 * (j + 1)) - .05;
      const add = {}; body.replace(/(\w+)=("([^"]*)"|\S+)/g, (q, k, v, qq) => { add[k] = qq != null ? qq : v; return ''; }); const prev = L[L.length - 1].o; const n = { ...prev, ...add, then: '', words: '' }; if (add.act && add.act !== prev.act) { for (const k of ['view', 'off', 'dark', 'cut', 'screen']) if (!(k in add)) delete n[k]; } L.push({ o: n, at }); }); return L; }
  let beatN = 0;
  VIS.K.w = (o, c, Pal, dur, i) => { const S = segs(o, c), idx = i ?? beatN++; const B = S.map((sg, j) => ({ ...sg, b: (A[sg.o.act] || A.globe)(sg.o, c, dur), cam: sg.o.cam || CAMS[(idx * 3 + j * 4) % CAMS.length] }));
    const sfx = []; B.forEach((sg, j) => { const end = B[j + 1] ? B[j + 1].at : 1e9; sg.b.sfx.forEach(([t, n]) => { const tt = j ? Math.max(t, sg.at) : t; if (tt < end) sfx.push([tt, n]); }); if (j) sfx.push([sg.at, ['whoosh_small', 'whoosh_swish', 'trans_swipe'][j % 3]]); });
    return { sfx, draw: lt => { let k = 0; for (let j = 0; j < B.length; j++) if (lt >= B[j].at) k = j; const sg = B[k], q = lt - sg.at;
      ctx.save(); if (sg.o.act !== 'zoom' && sg.o.act !== 'split') { if (k && q < .22) { const e = 1 - E.out(q / .22); ctx.translate(W / 2, H / 2); ctx.scale(1 + .12 * e, 1 + .12 * e); ctx.translate(-W / 2, -H / 2); } cam(sg.cam, lt, dur); } sg.b.draw(lt); ctx.restore();
      if (k && q < .12) { ctx.save(); ctx.globalAlpha = .55 * (1 - q / .12); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
      words(o, c, lt); if (sg.b.post) sg.b.post(lt); } }; };
})();
