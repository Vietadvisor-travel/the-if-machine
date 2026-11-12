/* IFM.L3 — the house 3D look (owner, 12 Nov 2026: "three.js, as beautiful as possible, one unified channel style").
   Vinyl-toy figures (big head, glossy eyes, smooth matte skin), real light (ACES tone mapping, soft shadows, projected
   caustics), atmosphere (fog, light shafts, drifting particles), a 2D finish on top (soft bloom, grade, vignette, grain).
   Scenes are built once and cached; each frame only moves things and renders.                                           */
'use strict';
(function () {
  if (typeof THREE === 'undefined' || !window.IFM || !IFM.ACT) return;
  const L = IFM.L3 = {}, V3 = (x, y, z) => new THREE.Vector3(x, y, z);
  // ---------------------------------------------------------------- renderer
  const R = { r: null, cv: null, w: 0, h: 0 };
  L.renderer = () => { if (!R.r) { R.cv = document.createElement('canvas'); R.r = new THREE.WebGLRenderer({ canvas: R.cv, antialias: true, preserveDrawingBuffer: true });
      R.r.outputColorSpace = THREE.SRGBColorSpace; R.r.toneMapping = THREE.ACESFilmicToneMapping; R.r.toneMappingExposure = 1.05; R.r.shadowMap.enabled = true; R.r.shadowMap.type = THREE.PCFSoftShadowMap; }
    const s = window.L3_SCALE || .7; if (R.w !== W || R.h !== H) { R.r.setPixelRatio(1); R.r.setSize(Math.round(W * s), Math.round(H * s), false); R.w = W; R.h = H; } return R.r; };
  // ---------------------------------------------------------------- materials and textures
  const MC = {}; L.mat = (c, o = {}) => { const k = c + JSON.stringify(o); if (MC[k]) return MC[k]; const m = new THREE.MeshStandardMaterial({ color: c, roughness: o.rough ?? .6, metalness: o.metal ?? 0 });
    if (o.emissive) { m.emissive = new THREE.Color(o.emissive); m.emissiveIntensity = o.ei ?? 1; } if (o.opacity != null) { m.transparent = true; m.opacity = o.opacity; m.depthWrite = o.depthWrite ?? true; } if (o.side) m.side = o.side; if (o.flat) m.flatShading = true; return (MC[k] = m); };
  L.canvasTex = (w, h, draw) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t._c = c; return t; };
  L.dotTex = () => L._dot || (L._dot = L.canvasTex(64, 64, (g, w) => { const r = g.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.4, 'rgba(255,255,255,.5)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, w); }));
  L.rayTex = () => L._ray || (L._ray = L.canvasTex(64, 256, (g, w, h) => { const r = g.createLinearGradient(0, 0, 0, h); r.addColorStop(0, 'rgba(255,255,255,.9)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); const s = g.createLinearGradient(0, 0, w, 0); s.addColorStop(0, 'rgba(0,0,0,1)'); s.addColorStop(.5, 'rgba(0,0,0,0)'); s.addColorStop(1, 'rgba(0,0,0,1)'); g.globalCompositeOperation = 'destination-out'; g.fillStyle = s; g.fillRect(0, 0, w, h); }));
  // animated caustics (a bright wobbling web) — projected by a spotlight
  L.caustics = () => { if (L._cau) return L._cau; const t = L.canvasTex(256, 256, () => {}); t.colorSpace = THREE.SRGBColorSpace; L._cau = t; return t; };
  L.causticsAt = lt => { const t = L.caustics(), g = t._c.getContext('2d'), w = 256; g.fillStyle = '#000'; g.fillRect(0, 0, w, w); g.globalCompositeOperation = 'lighter'; g.strokeStyle = 'rgba(190,240,255,.55)'; g.lineWidth = 5;
    for (let k = 0; k < 14; k++) { g.beginPath(); for (let i = 0; i <= 24; i++) { const x = i / 24 * w, y = (k / 14) * w + Math.sin(i * .7 + k * 1.3 + lt * 1.1) * 14 + Math.sin(i * .23 - lt * .7 + k) * 9; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.beginPath(); for (let i = 0; i <= 24; i++) { const y = i / 24 * w, x = (k / 14) * w + Math.sin(i * .6 + k * 1.7 - lt * .9) * 14 + Math.cos(i * .31 + lt * .8) * 9; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
    g.globalCompositeOperation = 'source-over'; t.needsUpdate = true; return t; };
  L.shadows = (o, cast = true, recv = true) => { o.traverse(m => { if (m.isMesh) { m.castShadow = cast; m.receiveShadow = recv; } }); return o; };
  const rnd = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  L.rnd = rnd;
  // ---------------------------------------------------------------- the house figure (vinyl toy): posable joints
  // o: skin, top, bottom, hair, hairStyle 'short'|'none', shoes, build (width), sleeves (bool), helmet (diver)
  L.figure = (o = {}) => { const sk = o.skin || '#C98B5E', top = o.top || '#F4F1EA', bot = o.bottom || '#2B3A55', hair = o.hair || '#17141A', shoe = o.shoes || '#26233A', b = o.build || 1;
    const m = c => L.mat(c, { rough: .55 }), J = n => { const g = new THREE.Group(); g.name = n; return g; }, cap = (r, l, c) => new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 6, 16), m(c));
    const root = J('root'), hips = J('hips'); root.add(hips); hips.position.y = .98;
    const pel = cap(.17 * b, .06, bot); pel.scale.set(1.2, 1, .85); hips.add(pel); const waist = cap(.17 * b, .1, top); waist.scale.set(1.12, 1, .8); waist.position.y = .1; hips.add(waist);
    const spine = J('spine'); hips.add(spine); spine.position.y = .06;
    const tor = cap(.19 * b, .28, top); tor.scale.set(1.18, 1, .78); tor.position.y = .25; spine.add(tor);
    const neck = J('neck'); spine.add(neck); neck.position.y = .54; const nm = new THREE.Mesh(new THREE.CylinderGeometry(.06, .07, .12, 14), m(sk)); nm.position.y = .03; neck.add(nm);
    const head = J('head'); neck.add(head); head.position.y = .08;
    const skull = new THREE.Mesh(new THREE.SphereGeometry(.25, 32, 24), m(sk)); skull.scale.set(.96, 1.04, 1); skull.position.y = .22; head.add(skull);
    [-1, 1].forEach(sd => { const ear = new THREE.Mesh(new THREE.SphereGeometry(.05, 12, 10), m(sk)); ear.scale.set(.5, 1, .8); ear.position.set(sd * .24, .21, -.01); head.add(ear);
      const eye = new THREE.Mesh(new THREE.SphereGeometry(.072, 22, 16), L.mat('#FBFAF6', { rough: .2 })); eye.scale.set(.86, 1.12, .55); eye.position.set(sd * .078, .235, .2); head.add(eye);
      const pup = new THREE.Mesh(new THREE.SphereGeometry(.04, 16, 12), L.mat('#15121C', { rough: .1 })); pup.scale.set(.9, 1.1, .5); pup.position.set(sd * .074, .232, .238); head.add(pup); head.userData['pup' + (sd > 0 ? 'R' : 'L')] = pup;
      const glint = new THREE.Mesh(new THREE.SphereGeometry(.011, 8, 6), new THREE.MeshBasicMaterial({ color: '#FFFFFF' })); glint.position.set(sd * .074 + .013, .25, .258); head.add(glint);
      const brow = new THREE.Mesh(new THREE.CapsuleGeometry(.02, .065, 4, 10), m(hair)); brow.rotation.z = Math.PI / 2; brow.position.set(sd * .082, .335, .21); head.add(brow); head.userData['brow' + (sd > 0 ? 'R' : 'L')] = brow; });
    const nose = new THREE.Mesh(new THREE.SphereGeometry(.05, 16, 12), m(shade(sk, -.05))); nose.scale.set(1, .85, .85); nose.position.set(.012, .155, .25); head.add(nose);
    const smile = new THREE.Mesh(new THREE.TorusGeometry(.075, .014, 8, 24, Math.PI * .8), L.mat('#3A1418', { rough: .7 })); smile.rotation.z = Math.PI + Math.PI * .1; smile.position.set(.01, .1, .228); head.add(smile);
    const mouth = new THREE.Mesh(new THREE.SphereGeometry(.06, 16, 12), L.mat('#4A1620', { rough: .7 })); mouth.scale.set(1, .3, .4); mouth.position.set(.01, .075, .222); head.add(mouth); const tongue = new THREE.Mesh(new THREE.SphereGeometry(.03, 10, 8), L.mat('#E0707A', { rough: .6 })); tongue.scale.set(1, .5, .4); tongue.position.set(.01, .058, .232); head.add(tongue); head.userData.mouth = mouth; head.userData.smile = smile; head.userData.tongue = tongue;
    if (o.hairStyle !== 'none') { const hc = new THREE.Mesh(new THREE.SphereGeometry(.262, 32, 16, 0, Math.PI * 2, 0, Math.PI * .44), L.mat(hair, { rough: .85 })); hc.position.y = .225; hc.rotation.x = -.28; head.add(hc); }
    if (o.helmet) { const hm = new THREE.Mesh(new THREE.SphereGeometry(.29, 32, 24), L.mat(o.helmet, { rough: .35, metal: .2 })); hm.position.y = .22; head.add(hm); const fp = new THREE.Mesh(new THREE.CircleGeometry(.17, 28), L.mat('#0E1822', { rough: .05, metal: .6 })); fp.position.set(0, .22, .288); head.add(fp); const lamp = new THREE.Mesh(new THREE.CylinderGeometry(.05, .06, .12, 16), L.mat('#2B2B2B', { rough: .4 })); lamp.rotation.x = Math.PI / 2; lamp.position.set(.16, .44, .16); head.add(lamp); const lens = new THREE.Mesh(new THREE.CircleGeometry(.045, 16), new THREE.MeshBasicMaterial({ color: '#FFF6D8' })); lens.position.set(.16, .44, .222); head.add(lens); head.userData.lamp = lamp; }
    const arm = sd => { const sh = J('sh'), up = cap(.062 * b, .2, o.sleeves ? top : sk), el = J('el'), fo = cap(.056 * b, .19, sk), hd = J('hand'), hm = new THREE.Mesh(new THREE.SphereGeometry(.07, 16, 12), m(o.gloves || sk));
      sh.position.set(sd * .27 * b, .44, 0); spine.add(sh); const sb = new THREE.Mesh(new THREE.SphereGeometry(.078 * b, 16, 12), m(o.sleeves ? top : top)); sh.add(sb); const eb = new THREE.Mesh(new THREE.SphereGeometry(.058 * b, 14, 10), m(o.sleeves ? top : sk)); eb.position.y = -.31; sh.add(eb); up.position.y = -.16; sh.add(up); el.position.y = -.31; sh.add(el); fo.position.y = -.15; el.add(fo); hd.position.y = -.3; el.add(hd); hm.scale.set(.85, 1.1, .7); hd.add(hm);
      const th = new THREE.Mesh(new THREE.SphereGeometry(.03, 10, 8), m(o.gloves || sk)); th.position.set(sd * -.05, .02, .04); hd.add(th); return { sh, el, hd }; };
    const leg = sd => { const hp = J('hip'), th = cap(.085 * b, .27, bot), kn = J('kn'), sn = cap(.07 * b, .27, o.legs || sk), ft = new THREE.Mesh(new THREE.CapsuleGeometry(.065, .12, 4, 12), m(shoe));
      hp.position.set(sd * .1 * b, -.04, 0); hips.add(hp); const kb = new THREE.Mesh(new THREE.SphereGeometry(.072 * b, 14, 10), m(o.legs || sk)); kb.position.y = -.42; hp.add(kb); th.position.y = -.2; hp.add(th); kn.position.y = -.42; hp.add(kn); sn.position.y = -.2; kn.add(sn); ft.rotation.x = Math.PI / 2; ft.position.set(0, -.44, .06); kn.add(ft); return { hp, kn }; };
    const A = arm(-1), B = arm(1), LA = leg(-1), LB = leg(1);
    const F = { root, hips, spine, neck, head, shA: A.sh, elA: A.el, hdA: A.hd, shB: B.sh, elB: B.el, hdB: B.hd, hipA: LA.hp, knA: LA.kn, hipB: LB.hp, knB: LB.kn };
    F.pose = p => { Object.entries(p).forEach(([k, v]) => { if (F[k] && Array.isArray(v)) F[k].rotation.set(v[0] || 0, v[1] || 0, v[2] || 0); }); if (p.mouth != null) { const op = p.mouth; mouth.visible = head.userData.tongue.visible = op > .12; head.userData.smile.visible = op <= .12; mouth.scale.set(1 - op * .15, .3 + op * 1.0, .4 + op * .2); head.userData.tongue.position.y = .075 - op * .03; }
      if (p.look) ['L', 'R'].forEach((s2, i) => { const q = head.userData['pup' + s2]; q.position.x = (i ? 1 : -1) * .074 + p.look[0] * .022; q.position.y = .232 + p.look[1] * .02; }); if (p.brows != null) ['L', 'R'].forEach((s, i) => { const b2 = head.userData['brow' + s]; b2.rotation.z = Math.PI / 2 + (i ? -1 : 1) * p.brows * .35; b2.position.y = .315 + Math.abs(p.brows) * .012; }); return F; };
    L.shadows(root); return F; };
  // blend two poses (objects of joint → [x,y,z]) by k
  L.mix = (a, b, k) => { const o = {}; new Set([...Object.keys(a), ...Object.keys(b)]).forEach(n => { const x = a[n], y = b[n]; if (Array.isArray(x) || Array.isArray(y)) { const p = x || [0, 0, 0], q = y || [0, 0, 0]; o[n] = [0, 1, 2].map(i => lerp(p[i] || 0, q[i] || 0, k)); } else o[n] = lerp(x ?? 0, y ?? 0, k); }); return o; };
  L.keys = (K, lt) => { let i = 0; while (i < K.length - 1 && lt >= K[i + 1][0]) i++; const a = K[i], b = K[i + 1]; if (!b) return a[1]; const e = E.inOut(clamp((lt - a[0]) / Math.max(.01, b[0] - a[0]))); return L.mix(a[1], b[1], e); };
  // ---------------------------------------------------------------- props and worlds
  // a tugboat: hull from a side profile (rounded by bevels), white deckhouse, wheelhouse, stack, tyre fenders, mast
  L.tug = (o = {}) => { const g = new THREE.Group(), Lh = 14, D = 2.8, Wd = 5.2, s = new THREE.Shape();
    s.moveTo(-Lh / 2 + .6, 0); s.lineTo(Lh / 2 - 3, 0); s.bezierCurveTo(Lh / 2 - .6, 0, Lh / 2 + .6, D * .45, Lh / 2 + 1, D); s.lineTo(-Lh / 2 - .3, D); s.bezierCurveTo(-Lh / 2 - .5, D * .5, -Lh / 2 - .2, .1, -Lh / 2 + .6, 0);
    const hg = new THREE.ExtrudeGeometry(s, { depth: Wd - 1.2, bevelEnabled: true, bevelThickness: .6, bevelSize: .6, bevelSegments: 4, curveSegments: 18 }); hg.translate(0, 0, -(Wd - 1.2) / 2); { const pp = hg.attributes.position; for (let i = 0; i < pp.count; i++) { const x = pp.getX(i), y = pp.getY(i), f = x > Lh / 2 - 5 ? lerp(1, .18, clamp((x - (Lh / 2 - 5)) / 6)) : x < -Lh / 2 + 1.5 ? lerp(1, .8, clamp((-Lh / 2 + 1.5 - x) / 2)) : 1, kz = lerp(.72, 1, clamp(y / D)); pp.setZ(i, pp.getZ(i) * f * kz); } hg.computeVertexNormals(); }
    const hull = new THREE.Mesh(hg, L.mat(o.hull || '#A8352B', { rough: .75 })); g.add(hull);
    const band = new THREE.Mesh(new THREE.BoxGeometry(Lh + 1.4, .35, Wd + .05), L.mat('#1E2A33', { rough: .6 })); band.position.y = D - .2; g.add(band);
    const deck = new THREE.Mesh(new THREE.BoxGeometry(Lh + .6, .2, Wd), L.mat('#6E6253', { rough: .9 })); deck.position.y = D + .1; g.add(deck);
    const house = new THREE.Mesh(new THREE.BoxGeometry(6, 1.8, 3.6), L.mat('#E6E1D6', { rough: .6 })); house.position.set(-.5, D + 1.1, 0); g.add(house);
    const wh = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.5, 3.2), L.mat('#ECE8DE', { rough: .55 })); wh.position.set(.6, D + 2.75, 0); g.add(wh);
    for (let i = 0; i < 4; i++) { const w = new THREE.Mesh(new THREE.BoxGeometry(.6, .55, .05), L.mat('#1B2730', { rough: .1, metal: .4 })); w.position.set(-.3 + i * .7, D + 2.85, 1.62); g.add(w); }
    for (let i = 0; i < 5; i++) { const w = new THREE.Mesh(new THREE.CircleGeometry(.2, 16), L.mat('#1B2730', { rough: .1, metal: .4 })); w.position.set(-3 + i * 1.2, D + 1.2, 1.81); g.add(w); }
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(.45, .55, 1.6, 20), L.mat('#E0A030', { rough: .5 })); stack.position.set(-2.2, D + 2.7, 0); g.add(stack);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(.47, .47, .3, 20), L.mat('#1E1E22', { rough: .6 })); top.position.set(-2.2, D + 3.55, 0); g.add(top);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(.07, .09, 3, 10), L.mat('#C8C2B4', { rough: .5 })); mast.position.set(1.2, D + 4.9, 0); g.add(mast);
    for (let i = 0; i < 6; i++) [-1, 1].forEach(sd => { const t = new THREE.Mesh(new THREE.TorusGeometry(.38, .15, 10, 20), L.mat('#1A1A1A', { rough: .9 })); t.position.set(-5 + i * 2, D - .5, sd * (Wd / 2 + .55)); t.rotation.y = Math.PI / 2; g.add(t); });
    // underwater gear (points up when the boat is capsized): skeg, two ducted propellers, rudders
    const skeg = new THREE.Mesh(new THREE.BoxGeometry(Lh * .7, .7, .3), L.mat('#8E2C24', { rough: .8 })); skeg.position.set(0, -.3, 0); g.add(skeg);
    [-1, 1].forEach(sd => { const z = sd * 1.3, x = -Lh / 2 + 1.2; const duct = new THREE.Mesh(new THREE.TorusGeometry(.85, .16, 12, 28), L.mat('#7A2A22', { rough: .7 })); duct.position.set(x, -.75, z); duct.rotation.y = Math.PI / 2; g.add(duct);
      for (let k = 0; k < 4; k++) { const bl = new THREE.Mesh(new THREE.BoxGeometry(.06, .75, .28), L.mat('#C9A24A', { rough: .3, metal: .8 })); bl.position.set(x, -.75, z); bl.rotation.x = k * Math.PI / 2 + .4; g.add(bl); }
      const rud = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.3, .1), L.mat('#8E2C24', { rough: .8 })); rud.position.set(x - 1.3, -.8, z); g.add(rud); });
    const r = rnd(7); for (let i = 0; i < 26; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(.25 + r() * .5, 10, 8), L.mat(r() < .5 ? '#2F5D3A' : '#4C3B2A', { rough: 1 })); p.scale.set(1, .25, 1); p.position.set((r() - .5) * Lh, r() * D * .8, (r() < .5 ? -1 : 1) * (Wd / 2 + .05)); p.rotation.x = Math.PI / 2; g.add(p); }
    L.shadows(g); return g; };
  L.rock = (seed, s, col = '#5D6A63') => { const geo = new THREE.IcosahedronGeometry(s, 1), p = geo.attributes.position, r = rnd(seed); for (let i = 0; i < p.count; i++) { const k = .75 + r() * .45; p.setXYZ(i, p.getX(i) * k, p.getY(i) * k * .7, p.getZ(i) * k); } geo.computeVertexNormals(); return L.shadows(new THREE.Mesh(geo, L.mat(col, { rough: .95, flat: true }))); };
  L.seabed = (o = {}) => { const geo = new THREE.PlaneGeometry(160, 160, 90, 90); geo.rotateX(-Math.PI / 2); const p = geo.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); p.setY(i, Math.sin(x * .35) * .12 + Math.sin(z * .27 + x * .1) * .18 + Math.sin(x * .08 - z * .06) * .9); } geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, L.mat(o.col || '#B9A77F', { rough: .95 })); m.receiveShadow = true; return m; };
  L.particles = (n, box, seed = 3, size = .06, col = '#D8F4FF') => { const geo = new THREE.BufferGeometry(), a = new Float32Array(n * 3), r = rnd(seed); for (let i = 0; i < n; i++) { a[i * 3] = (r() - .5) * box[0]; a[i * 3 + 1] = r() * box[1]; a[i * 3 + 2] = (r() - .5) * box[2]; } geo.setAttribute('position', new THREE.BufferAttribute(a, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size, map: L.dotTex(), transparent: true, depthWrite: false, color: col, opacity: .75, blending: THREE.AdditiveBlending })); pts.userData.base = a.slice(); pts.userData.box = box; return pts; };
  L.drift = (pts, lt, sp = .05) => { const a = pts.geometry.attributes.position, b = pts.userData.base, h = pts.userData.box[1]; for (let i = 0; i < a.count; i++) { a.setX(i, b[i * 3] + Math.sin(lt * .3 + i) * .15); a.setY(i, ((b[i * 3 + 1] + lt * sp * (1 + (i % 5) * .2)) % h)); a.setZ(i, b[i * 3 + 2] + Math.cos(lt * .25 + i * 1.3) * .15); } a.needsUpdate = true; };
  L.rays = (n, seed, spread, y0, col = '#BFF3FF', op = .16) => { const g = new THREE.Group(), r = rnd(seed); for (let i = 0; i < n; i++) { const w = 1.2 + r() * 2.5, h = 26, m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: L.rayTex(), transparent: true, opacity: op * (.5 + r() * .7), depthWrite: false, blending: THREE.AdditiveBlending, color: col, side: THREE.DoubleSide }));
      m.position.set((r() - .5) * spread, y0 - h / 2 + 2, (r() - .5) * spread * .6); m.rotation.z = (r() - .5) * .35; m.rotation.y = r() * Math.PI; m.userData.ph = r() * 6; g.add(m); } return g; };
  L.sway = (rays, lt) => rays.children.forEach(m => { m.material.opacity = m.material.opacity * .0 + (.08 + .07 * Math.sin(lt * .6 + m.userData.ph)); m.rotation.z = Math.sin(lt * .2 + m.userData.ph) * .12; });
  L.fishSchool = (n, seed, col = '#B8C6CF') => { const geo = new THREE.SphereGeometry(.12, 10, 8); geo.scale(2.2, .8, .5); const im = new THREE.InstancedMesh(geo, L.mat(col, { rough: .3, metal: .5 }), n); im.userData.r = rnd(seed); im.userData.o = Array.from({ length: n }, () => [im.userData.r(), im.userData.r(), im.userData.r()]); return im; };
  L.swim = (im, lt, c, rad) => { const d = new THREE.Object3D(); im.userData.o.forEach(([a, b, e], i) => { const t = lt * .25 + a * 6.28; d.position.set(c.x + Math.cos(t) * rad * (.7 + b * .5), c.y + (e - .5) * 2 + Math.sin(lt + i) * .2, c.z + Math.sin(t) * rad * .6 * (.7 + e * .5)); d.rotation.set(0, -t, Math.sin(lt * 6 + i) * .1); d.updateMatrix(); im.setMatrixAt(i, d.matrix); }); im.instanceMatrix.needsUpdate = true; };
  // ---------------------------------------------------------------- the 2D finish: soft bloom + grade, then the house vignette/grain (CT.end)
  let BL = null; L.present = (o = {}) => { const r = L.renderer(), cv = R.cv; ctx.save(); ctx.setTransform(ctx.canvas.width / W, 0, 0, ctx.canvas.height / H, 0, 0); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high'; ctx.drawImage(cv, 0, 0, W, H);
    const bw = Math.max(8, Math.round(cv.width / 10)), bh = Math.max(8, Math.round(cv.height / 10)); if (!BL || BL.width !== bw) BL = mkCanvas(bw, bh); const g = BL.getContext('2d'); g.clearRect(0, 0, bw, bh); g.drawImage(cv, 0, 0, bw, bh);
    ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = o.bloom ?? .28; ctx.drawImage(BL, 0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (o.grade) { ctx.globalCompositeOperation = 'soft-light'; ctx.globalAlpha = o.gradeA ?? .35; const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, o.grade[0]); gr.addColorStop(1, o.grade[1]); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; }
    ctx.restore(); };
  L.cam = (fov = 38) => new THREE.PerspectiveCamera(fov, W / H, .05, 300);
  L.look = (cam, p, t, roll = 0) => { cam.aspect = W / H; cam.position.copy(p); cam.lookAt(t); cam.rotateZ(roll); cam.updateProjectionMatrix(); };
})();

/* L3 v2 — realistic pipeline (owner, 12 Nov 2026: "full upgrade, simulation level"): image-based light (PMREM), a post chain
   (ambient occlusion → depth of field → bloom → output/tone mapping, SMAA), glTF loading with skeletal animation. */
(function () {
  if (typeof THREE === 'undefined' || !window.THREE_X || !IFM.L3) return;
  const L = IFM.L3, X = window.THREE_X;
  // image-based light: a neutral room (always available) or an HDRI decoded from base64 (Muse's Poly Haven pack)
  const ENV = {}; L.envRoom = (k = .04) => { const r = L.renderer(); if (!ENV.room) { const pm = new THREE.PMREMGenerator(r); ENV.room = pm.fromScene(new X.RoomEnvironment(r), k).texture; pm.dispose(); } return ENV.room; };
  L.envHDR = (name, b64) => { if (ENV[name]) return ENV[name]; const r = L.renderer(), bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0)); const tex = new X.RGBELoader().parse(bin.buffer); const t = new THREE.DataTexture(tex.data, tex.width, tex.height, THREE.RGBAFormat, tex.type); t.mapping = THREE.EquirectangularReflectionMapping; t.colorSpace = THREE.LinearSRGBColorSpace; t.needsUpdate = true; t.flipY = true; const pm = new THREE.PMREMGenerator(r); ENV[name] = pm.fromEquirectangular(t).texture; pm.dispose(); return ENV[name]; };
  // post chain per scene (cached): o.ao (GTAO), o.dof {focus, aperture, maxblur}, o.bloom {strength, radius, threshold}
  L.composer = (S, o = {}) => { const r = L.renderer(), w = r.domElement.width, h = r.domElement.height; if (S._cmp && S._cmpW === w) { if (o.dof && S._bokeh) { S._bokeh.uniforms.focus.value = o.dof.focus; S._bokeh.uniforms.aperture.value = o.dof.aperture; } return S._cmp; }
    const c = new X.EffectComposer(r); c.setPixelRatio(1); c.setSize(w, h); c.addPass(new X.RenderPass(S.sc, S.cam));
    if (o.ao) { const ao = new X.GTAOPass(S.sc, S.cam, w, h); ao.updateGtaoMaterial({ radius: o.ao.radius ?? .5, distanceExponent: 1, thickness: 1, scale: 1, samples: o.ao.samples ?? 8 }); ao.blendIntensity = o.ao.k ?? 1; c.addPass(ao); }
    if (o.dof) { const b = new X.BokehPass(S.sc, S.cam, { focus: o.dof.focus, aperture: o.dof.aperture, maxblur: o.dof.maxblur ?? .008 }); c.addPass(b); S._bokeh = b; }
    if (o.bloom) c.addPass(new X.UnrealBloomPass(new THREE.Vector2(w, h), o.bloom.strength ?? .35, o.bloom.radius ?? .5, o.bloom.threshold ?? .85));
    c.addPass(new X.OutputPass()); if (o.smaa !== 0) c.addPass(new X.SMAAPass(w, h)); S._cmp = c; S._cmpW = w; return c; };
  L.renderPost = (S, o = {}) => { const r = L.renderer(); if (window.L3_POST === 0) { r.render(S.sc, S.cam); return; } L.composer(S, o).render(); };
  // glTF from base64 (sync API over async parse: the act calls L.gltf every frame; the first frames wait until it is ready)
  const GL = {}; L.gltf = (name, b64) => { if (GL[name]) return GL[name].ready ? GL[name] : null; GL[name] = { ready: false }; const bin = Uint8Array.from(atob(b64), c => c.charCodeAt(0)); new X.GLTFLoader().parse(bin.buffer, '', g => { GL[name] = { ready: true, gltf: g }; }, e => console.warn('gltf', name, e)); return null; };
  L.cloneSkinned = g => X.SkeletonUtils.clone(g);
})();
