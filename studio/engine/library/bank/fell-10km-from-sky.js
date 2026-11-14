/* fell-10km-from-sky (ODDLY TRUE clip): Vesna Vulović, JAT Flight 367, 26 Jan 1972 — the tail of a DC-9 falls a recorded 10,160 m
   into a snowy wooded slope near Srbská Kamenice; a villager, Bruno Honke, finds her pinned by a food cart. Act x3_fall v=<view>.
   Real models only: DC-9 (Sketchfab CC-BY nobilishornet), cut into its three pieces with clipping planes; airline trolley (Sketchfab
   CC-BY Bellatrix613); wooden office desk + paper stack (CGTrader RF / Sketchfab CC-BY); Poly Haven trees with the leaves removed
   (January), HDRIs and PBR snow; people = Muse's MPFB figures (generic, no likeness) with the shared Mixamo clips.
   Scenes: sky (open climb windows bomb break fall record) · tail interior (galley badge pinned cart faint bp aid) ·
   forest (impact silence heard honke alone end) · hospital (injury coma wake walk) · office (desk) · stage (medal cat). */
'use strict';
(function () {
  if (!window.IFM || !IFM.L3 || !IFM.CT || !IFM.L3.actor) return;
  const A = IFM.ACT, L = IFM.L3, CT = IFM.CT, V3 = (x, y, z) => new THREE.Vector3(x, y, z), S = {};
  const WOM = 'glb/eu-woman', OLD = 'glb/eu-man-elder', MAN = 'glb/eu-man';
  let fixed = false; const inPlace = () => { if (fixed) return; const lib = L.A['glb/mixamo_animations_mixamo_rig']; if (!lib) return; fixed = true;
    ['Walking'].forEach(n => { const c = lib.clips[n]; if (!c) return; c.tracks.forEach(t => { if (/Hips\.position$/.test(t.name)) { const v = t.values, x0 = v[0], z0 = v[2]; for (let i = 0; i < v.length; i += 3) { v[i] = x0; v[i + 2] = z0; } } }); }); };
  const bone = (a, rx) => { let b = null; a.root.traverse(o => { if (!b && o.isBone && rx.test(o.name)) b = o; }); return b; };
  const wpos = o => o.getWorldPosition(V3());
  const actor = (spec, o = {}) => { inPlace(); const a = L.actor(spec); if (!a) return a; a.root.traverse(m => { if (!m.isMesh) return; if (/low-poly/i.test(m.name)) m.visible = false;
      const nm = (m.material && m.material.name || '') + ' ' + m.name;
      if (o.hair && /hair|bob|short0|brow/i.test(nm)) { m.material = m.material.clone(); m.material.color.set(o.hair); }
      if (o.cloth && /suit|shirt|pants|jacket|coat/i.test(nm)) { m.material = m.material.clone(); m.material.map = null; m.material.color.set(o.cloth); m.material.roughness = .85; m.material.needsUpdate = true; } });
    return a; };
  /* a lying clip keeps the standing hip height: put the lowest bone on the floor and the hips on a chosen spot (parent space) */
  const BN = ['Hips', 'Head', 'LeftFoot', 'RightFoot', 'LeftHand', 'RightHand', 'Spine2', 'LeftLeg', 'RightLeg'];
  const settle = (a, floorY, hx, hz) => { a.root.updateMatrixWorld(true); const par = a.root.parent; a._b = a._b || BN.map(n => bone(a, new RegExp(n + '$'))).filter(Boolean); let mn = Infinity;
    a._b.forEach(b => { mn = Math.min(mn, par.worldToLocal(wpos(b)).y); }); a.root.position.y += floorY + .07 - mn;
    if (hx != null) { a.root.updateMatrixWorld(true); const h = par.worldToLocal(wpos(a._b[0])); a.root.position.x += hx - h.x; a.root.position.z += hz - h.z; } a.root.updateMatrixWorld(true); };
  const tex = (id, rep, fb, col) => L.A[id] ? L.pbr(id, { repeat: rep, color: col }) : L.mat(fb, { rough: .7 });
  const glb = (id, s = 1) => { if (!L.A[id]) return null; const m = THREE_X.SkeletonUtils.clone(L.A[id].gltf.scene); m.scale.setScalar(s); return L.shadows(m); };
  const post = (s, focus, o = {}) => { if (L.renderPost && window.L3_POST !== 0) L.renderPost(s, { ao: o.ao ? { radius: .35, samples: 8 } : null, dof: o.dof === 0 ? null : { focus, aperture: o.ap ?? .0015, maxblur: .007 }, bloom: { strength: o.bloom ?? .25, radius: .5, threshold: o.th ?? .9 } }); else L.renderer().render(s.sc, s.cam); };
  const look = (s, p, t, roll = 0, fov) => { if (fov) s.cam.fov = fov; L.look(s.cam, p, t, roll); };
  const spot = (sc, col, int, pos, tgt, ang = .6, pen = .8, shadow = 1024) => { const l = new THREE.SpotLight(col, int, 0, ang, pen, 0); l.position.copy(pos); l.target.position.copy(tgt); if (shadow) { l.castShadow = true; l.shadow.mapSize.set(shadow, shadow); l.shadow.bias = -.0008; l.shadow.normalBias = .02; } sc.add(l, l.target); return l; };
  const sun = (sc, col, int, pos, box = 14) => { const d = new THREE.DirectionalLight(col, int); d.position.copy(pos); d.castShadow = true; d.shadow.mapSize.set(2048, 2048); d.shadow.bias = -.0006; d.shadow.normalBias = .03; Object.assign(d.shadow.camera, { left: -box, right: box, top: box, bottom: -box, near: .5, far: 200 }); sc.add(d, d.target); return d; };
  const proj = (cam, v) => { const p = v.clone().project(cam); return [(p.x + 1) / 2 * W, (1 - p.y) / 2 * H]; };
  const rnd = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
  const shake = (lt, a) => V3(Math.sin(lt * 23) * a + Math.sin(lt * 37) * a * .5, Math.sin(lt * 29 + 1) * a, Math.sin(lt * 31 + 2) * a * .6);

  // ---------------------------------------------------------------- the DC-9, whole or in its three pieces (clipping planes, inner skin dark)
  const NOSE_CUT = 5.2, TAIL_CUT = -6.4;   // model space: nose at +z, tail at -z (27.4 m)
  function darkInside(m) { m.side = THREE.DoubleSide; m.onBeforeCompile = sh => { sh.fragmentShader = sh.fragmentShader.replace('#include <dithering_fragment>', '#include <dithering_fragment>\nif (!gl_FrontFacing) gl_FragColor.rgb *= vec3(.16, .15, .14);'); }; m.customProgramCacheKey = () => 'darkInside'; }
  function dc9(piece) { const G = new THREE.Group(), m = glb('glb/dc9_airliner'); if (!m) return { G, upd() {} }; m.position.set(-1.55, -3.2, .8); G.add(m);
    if (!piece) return { G, upd() {} };
    const zc = { nose: (NOSE_CUT + 13.7) / 2, mid: (NOSE_CUT + TAIL_CUT) / 2, tail: (TAIL_CUT - 13.7) / 2 }[piece]; m.position.z -= zc;   /* the piece's own centre is the group origin */
    const loc = { nose: [[V3(0, 0, 1), -NOSE_CUT]], mid: [[V3(0, 0, -1), NOSE_CUT], [V3(0, 0, 1), -TAIL_CUT]], tail: [[V3(0, 0, -1), TAIL_CUT]] }[piece].map(([n, c]) => new THREE.Plane(n, c + n.z * zc)), planes = loc.map(p => p.clone());
    m.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); darkInside(o.material); o.material.clippingPlanes = planes; o.material.clipShadows = true; } });
    return { G, upd() { G.updateMatrixWorld(true); loc.forEach((p, i) => planes[i].copy(p).applyMatrix4(G.matrixWorld)); } }; }

  // ---------------------------------------------------------------- sky: golden-hour sky, a cloud deck, snowy mountains far below
  const cloudTex = (() => { let t = null; return () => t || (t = L.canvasTex(256, 256, (g, w, h) => { const r = rnd(7); for (let i = 0; i < 26; i++) { const x = w * (.22 + r() * .56), y = h * (.35 + r() * .35), rr = w * (.1 + r() * .16), gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, w, h); } })); })();
  function clouds(sc, n, y0, y1, R, seed, col = '#FFF4E6', op = .9) { const r = rnd(seed), G = new THREE.Group(); for (let i = 0; i < n; i++) { const m = new THREE.SpriteMaterial({ map: cloudTex(), color: col, transparent: true, opacity: op * (.6 + r() * .4), depthWrite: false, fog: true }), s = new THREE.Sprite(m), sz = 60 + r() * 140; s.scale.set(sz * 1.8, sz, 1); const a = r() * Math.PI * 2, d = Math.sqrt(r()) * R; s.position.set(Math.cos(a) * d, y0 + r() * (y1 - y0), Math.sin(a) * d); G.add(s); } sc.add(G); return G; }
  function terrain(sc, y, seed = 3) { const g = new THREE.PlaneGeometry(9000, 9000, 160, 160); g.rotateX(-Math.PI / 2); const p = g.attributes.position, r = rnd(seed), ph = [r() * 9, r() * 9, r() * 9];
    for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); p.setY(i, (Math.sin(x * .0021 + ph[0]) * Math.cos(z * .0017 + ph[1]) * 260 + Math.sin(x * .007 + z * .005 + ph[2]) * 70 + Math.abs(Math.sin(x * .013 - z * .011)) * 40)); } g.computeVertexNormals();
    const m = new THREE.Mesh(g, tex('tex/snow_02', 220, '#E8ECF0', '#F2F5FA')); m.position.y = y; m.receiveShadow = true; sc.add(m); return m; }
  function skyScene() { const sc = new THREE.Scene(), id = 'hdr/kloppenheim_06_puresky'; if (L.A[id]) { sc.background = L.A[id].tex; sc.environment = L.env(id); sc.environmentIntensity = .8; sc.backgroundIntensity = .7; } else sc.background = new THREE.Color('#9FB6D0');
    sc.fog = new THREE.FogExp2('#B9B4B6', .00022); const s = sun(sc, '#FFD3A0', 3.2, V3(-60, 40, -30), 22); sc.add(new THREE.HemisphereLight('#BFD4F0', '#8A8A90', .35));
    const plane = dc9(), nose = dc9('nose'), mid = dc9('mid'), tail = dc9('tail'); [plane, nose, mid, tail].forEach(p => sc.add(p.G));
    const deck = clouds(sc, 90, -140, -90, 1400, 11, '#F0E2D2', .75), high = new THREE.Group(), land = terrain(sc, -1400);
    const debris = L.particles(260, [30, 30, 30], 17, .18, '#2A2826'); debris.material.opacity = 0; debris.material.transparent = true; debris.material.blending = THREE.NormalBlending; sc.add(debris);
    const smoke = L.particles(500, [6, 6, 6], 19, .9, '#4A4440'); smoke.material.opacity = 0; smoke.material.transparent = true; smoke.material.blending = THREE.NormalBlending; smoke.material.depthWrite = false; sc.add(smoke);
    const flash = new THREE.PointLight('#FFC27A', 0, 40, 1.6); sc.add(flash); const cam = L.cam(40); cam.far = 9000;
    return { sc, cam, sun: s, plane, nose, mid, tail, deck, high, land, debris, smoke, flash }; }
  const pieceVis = (s, whole) => { s.plane.G.visible = whole; [s.nose, s.mid, s.tail].forEach(p => p.G.visible = !whole); };
  const flyPose = (s, lt, z0 = 0, v = 0) => { const G = s.plane.G; G.position.set(0, Math.sin(lt * .6) * .3, z0 + v * lt); G.rotation.set(-.03 + Math.sin(lt * .5) * .01, 0, Math.sin(lt * .4) * .02); };

  // ---------------------------------------------------------------- the tail cabin (galley end): skin, ribs, windows, carpet, the cart
  function cabin(torn) { const g = new THREE.Group(), R = 1.62, Ln = 5.2, skin = tex('tex/Plastic010', 2, '#E9E4D8', '#EDE6D6'), rib = L.mat('#B9B2A4', { rough: .5, metal: .2 });
    const shell = new THREE.Mesh(new THREE.CylinderGeometry(R, R, Ln, 48, 1, true), skin); shell.material = shell.material.clone(); shell.material.side = THREE.BackSide; shell.rotation.x = Math.PI / 2; shell.receiveShadow = true; g.add(shell);
    for (let i = 0; i <= 8; i++) { const t = new THREE.Mesh(new THREE.TorusGeometry(R - .03, .035, 8, 48), rib); t.position.z = -Ln / 2 + i * Ln / 8; t.receiveShadow = t.castShadow = true; g.add(t); }
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(2.7, Ln), tex('tex/dirty_carpet', 2, '#4A4E5A', '#7A7E8E')); fl.rotation.x = -Math.PI / 2; fl.position.y = -1.0; fl.receiveShadow = true; g.add(fl);
    const winMat = L.mat('#DDEBFA', { emissive: '#CFE4FA', ei: 1.4 }), wins = [];
    for (let i = 0; i < 7; i++) [-1, 1].forEach(sd => { const w = new THREE.Mesh(new THREE.CircleGeometry(.13, 24), winMat); w.scale.y = 1.35; const a = sd * 1.34; w.position.set(Math.sin(a) * (R - .04), .2, -Ln / 2 + .5 + i * .66); w.rotation.y = -sd * Math.PI / 2; g.add(w); wins.push(w); });
    const bins = [-1, 1].map(sd => { const b = new THREE.Mesh(new THREE.BoxGeometry(.5, .38, Ln), L.mat('#E2DCCF', { rough: .45 })); b.position.set(sd * 1.12, .95, 0); b.castShadow = b.receiveShadow = true; g.add(b); return b; });
    const bulk = new THREE.Mesh(new THREE.CircleGeometry(R, 48), skin); bulk.position.z = -Ln / 2 + .01; g.add(bulk);
    if (!torn) { const fr = new THREE.Mesh(new THREE.CircleGeometry(R, 48), L.mat('#C8C0B0', { rough: .6 })); fr.position.z = Ln / 2 - .01; fr.rotation.y = Math.PI; g.add(fr); }
    else { const sh = new THREE.Shape(), r = rnd(5); sh.absarc(0, 0, R + .4, 0, Math.PI * 2, false); const hole = new THREE.Path(); for (let i = 0; i <= 40; i++) { const a = i / 40 * Math.PI * 2, rr = R * (.62 + r() * .3); i ? hole.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : hole.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); } sh.holes.push(hole);
      const edge = new THREE.Mesh(new THREE.ShapeGeometry(sh), tex('tex/rusty_painted_metal', 1, '#6A6662', '#C8C4BE')); edge.material = edge.material.clone(); edge.material.side = THREE.DoubleSide; edge.position.z = Ln / 2 - .05; edge.castShadow = true; g.add(edge); }
    const cart = glb('glb/airline_trolley'); if (cart) g.add(cart);
    return { g, R, Ln, wins, winMat, cart }; }
  function tailScene(state) { const sc = new THREE.Scene(); sc.background = new THREE.Color(state === 'calm' ? '#0C0E12' : '#E8EEF4'); if (L.envRoom) { sc.environment = L.envRoom(); sc.environmentIntensity = .25; }
    const C = cabin(state !== 'calm'); sc.add(C.g); const s = { sc, C, cam: L.cam(44), state };
    if (state === 'calm') { [-1.5, .2, 1.8].forEach(z => { const l = new THREE.PointLight('#FFE6C4', 2.2, 4, 1.4); l.position.set(0, 1.1, z); sc.add(l); }); sc.add(new THREE.HemisphereLight('#FFF0DC', '#3A3630', .5));
      C.cart.position.set(.55, -1.0, -1.7); C.cart.rotation.y = Math.PI / 2; s.v = actor(WOM + '@-.2,-1.0,30:Look_Around', { hair: '#2A1C14', cloth: '#26304A' }); s.v.root.position.set(-.15, -1.0, -1.3); C.g.add(s.v.root); }
    else { const out = spot(sc, '#EAF2FF', 9, V3(0, .3, C.Ln / 2 + .8), V3(0, -1, -1.5), .9, .7, 1024); out.decay = 1.2; out.distance = 12;   /* one shadow pass, not six (cost) */ sc.add(new THREE.HemisphereLight('#DCE8F4', '#2A2C30', .45)); s.out = out;
      C.winMat.emissiveIntensity = .6; C.cart.position.set(.15, -.62, -.6); C.cart.rotation.set(0, .25, Math.PI / 2 - .12);
      s.v = actor(WOM + '@0,0,0:Laying_Sleeping', { hair: '#2A1C14', cloth: '#26304A' }); s.v.root.position.set(-.35, -.98, -1.6); s.v.root.rotation.y = .1; C.g.add(s.v.root);
      s.wind = L.particles(500, [2.6, 2.2, 5], 23, .02, '#FFFFFF'); s.wind.position.set(0, -1.1, -2.6); sc.add(s.wind); s.frost = L.particles(300, [2.4, 2, 4], 29, .012, '#E8F4FF'); s.frost.position.set(0, -1, -2); sc.add(s.frost);
      if (state === 'snow') { const drift = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), tex('tex/snow_02', 2, '#F0F4F8', '#F4F7FB')); drift.scale.set(1.5, .5, 1.4); drift.position.set(.2, -1.0, C.Ln / 2 - .3); drift.receiveShadow = true; C.g.add(drift);
        s.h = actor(OLD + '@0,0,0:Crouching', { cloth: '#6B5440' }); s.h.root.position.set(.75, -1.0, -.5); s.h.root.rotation.y = -2.1; C.g.add(s.h.root); } }
    return s; }

  // ---------------------------------------------------------------- the forest: snowy slope, bare January trees, the tail in the snow
  function bareTree(id, s) { const t = glb(id, s); if (!t) return null; t.traverse(o => { if (o.isMesh) { const n = (o.material && o.material.name || '') + o.name; if (/leaves/i.test(n)) o.visible = false; else { o.material = o.material.clone(); o.material.color.lerp(new THREE.Color('#8E9196'), .35); } } }); return t; }
  function forestScene() { const sc = new THREE.Scene(), id = 'hdr/snowy_hillside'; if (L.A[id]) { sc.background = L.A[id].tex; sc.environment = L.env(id); sc.backgroundBlurriness = .04; sc.environmentIntensity = .9; } else sc.background = new THREE.Color('#C8CED6');
    sc.fog = new THREE.FogExp2('#D4DAE2', .012); sun(sc, '#EEF2F8', 1.3, V3(-20, 30, 12), 30); sc.add(new THREE.HemisphereLight('#E4ECF6', '#8C8E92', .55));
    const g = new THREE.PlaneGeometry(400, 400, 120, 120); g.rotateX(-Math.PI / 2); const p = g.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); p.setY(i, -z * .18 + Math.sin(x * .21) * .35 + Math.cos(z * .17 + x * .05) * .4 + Math.sin(x * .9 + z * .7) * .06); } g.computeVertexNormals();
    const ground = new THREE.Mesh(g, tex('tex/snow_02', 70, '#EEF2F6', '#F6F8FC')); ground.receiveShadow = true; sc.add(ground); const hY = (x, z) => -z * .18 + Math.sin(x * .21) * .35 + Math.cos(z * .17 + x * .05) * .4;
    const r = rnd(41), trees = []; for (let i = 0; i < 26; i++) { const a = r() * Math.PI * 2, d = 9 + r() * 46, x = Math.cos(a) * d, z = Math.sin(a) * d - 4; if (Math.abs(x + 3) < 6 && z > 4 && z < 30) continue; const t = bareTree(i % 3 ? 'glb/island_tree_02' : 'glb/tree_small_02', .9 + r() * .6); if (!t) continue; t.position.set(x, hY(x, z) - .1, z); t.rotation.y = r() * 6; sc.add(t); trees.push(t); }
    const tail = dc9('tail'); tail.G.position.set(0, hY(0, 0) + .9, 0); tail.G.rotation.set(-.32, .9, .22); sc.add(tail.G);
    const mounds = []; [[2.2, 2.8, 1.6], [-2.4, 1.2, 1.2], [1.2, -3.6, 1.4], [-1.4, 4.2, 1.0]].forEach(([x, z, s]) => { const m = new THREE.Mesh(new THREE.SphereGeometry(s, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), ground.material); m.scale.set(1.4, .45, 1.2); m.position.set(x, hY(x, z) - .05, z); m.receiveShadow = true; sc.add(m); mounds.push(m); });
    const snow = L.particles(2200, [60, 26, 60], 43, .05, '#FFFFFF'); snow.position.y = -4; sc.add(snow);
    const burst = L.particles(700, [8, 5, 8], 47, .12, '#F4F8FF'); burst.material.opacity = 0; burst.material.transparent = true; burst.material.blending = THREE.NormalBlending; burst.material.depthWrite = false; sc.add(burst);
    const h = actor(OLD + '@0,0,0:Look_Around', { cloth: '#6B5440' }); sc.add(h.root);
    const cam = L.cam(38); cam.far = 600; return { sc, cam, ground, hY, trees, tail, snow, burst, h, mounds }; }

  // ---------------------------------------------------------------- the hospital (1972): a ward bed by a winter window
  function wardScene() { const sc = new THREE.Scene(), id = 'hdr/surgery'; if (L.A[id]) { sc.background = L.A[id].tex; sc.environment = L.env(id); sc.backgroundBlurriness = .35; sc.backgroundIntensity = .35; sc.environmentIntensity = .25; } else sc.background = new THREE.Color('#2A2E34');
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), tex('tex/tiled_floor_001', 6, '#B8BCC0')); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; sc.add(fl);
    const bed = glb('glb/local_mattress'); const sheet = tex('tex/cotton_jersey', 3, '#F2F2EE', '#F4F4F0'); if (bed) { bed.traverse(o => { if (o.isMesh) o.material = sheet; }); const b0 = new THREE.Box3().setFromObject(bed); bed.position.y = .6 - b0.min.y; sc.add(bed); }   /* framed so only the sheet is seen */
    const bb = bed ? new THREE.Box3().setFromObject(bed) : new THREE.Box3(V3(-1, .4, -.45), V3(1, .6, .45)); const top = bb.max.y;
    const v = actor(WOM + '@0,0,0:Laying_Sleeping', { hair: '#2A1C14', cloth: '#26304A' }); sc.add(v.root);
    const win = sun(sc, '#EAF0F8', 1.1, V3(-4, 5, 2), 4); sc.add(new THREE.HemisphereLight('#E8EEF6', '#4A4440', .5)); const warm = new THREE.PointLight('#FFE2B8', 0, 5, 1.5); warm.position.set(1.2, 1.8, 1.2); sc.add(warm);
    const walker = actor(WOM + '@0,0,0:Walking', { hair: '#2A1C14', cloth: '#26304A' }); walker.root.visible = false; sc.add(walker.root);
    return { sc, cam: L.cam(40), bed, bb, top, v, win, warm, walker }; }

  // ---------------------------------------------------------------- the office (her desk job) and the stage (1985)
  function officeScene() { const sc = new THREE.Scene(), id = 'hdr/kiara_interior'; if (L.A[id]) { sc.background = L.A[id].tex; sc.environment = L.env(id); sc.backgroundBlurriness = .3; sc.backgroundIntensity = .6; sc.environmentIntensity = .6; } else sc.background = new THREE.Color('#3A3530');
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), tex('tex/wood_floor', 4, '#6A5440')); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; sc.add(fl);
    const desk = glb('glb/wooden_desk_office'); if (desk) { desk.rotation.y = Math.PI; sc.add(desk); } const db = desk ? new THREE.Box3().setFromObject(desk) : new THREE.Box3(V3(-.75, 0, -.3), V3(.75, .75, .3));
    const paper = glb('glb/paper_stack', .35); if (paper) { paper.position.set(.25, db.max.y, db.getCenter(V3()).z - .05); sc.add(paper); } const lamp = glb('glb/desk_lamp_arm_01'); if (lamp) { lamp.position.set(-.55, db.max.y, db.min.z + .12); lamp.rotation.y = .6; sc.add(lamp); }
    const chair = glb('glb/modern_arm_chair_01'); if (chair) { chair.position.set(0, 0, db.max.z + .45); chair.rotation.y = Math.PI; sc.add(chair); } const v = actor(WOM + '@0,0,0:Typing', { hair: '#2A1C14', cloth: '#26304A' }); v.root.position.set(0, 0, db.max.z + .38); v.root.rotation.y = Math.PI; sc.add(v.root);
    const key = new THREE.PointLight('#FFD9A8', 6, 5, 1.4); key.position.set(-.5, db.max.y + .6, db.min.z + .3); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); sc.add(key); sun(sc, '#E6EEF8', 1.2, V3(3, 5, -3), 4);
    return { sc, cam: L.cam(40), v, db }; }
  function stageScene() { const sc = new THREE.Scene(); sc.background = new THREE.Color('#07080B'); if (L.envRoom) { sc.environment = L.envRoom(); sc.environmentIntensity = .12; }
    const fl = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), tex('tex/wood_floor', 6, '#3A2E24', '#9A8A78')); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; sc.add(fl);
    const key = spot(sc, '#FFE8C8', 16, V3(.5, 6, 3), V3(0, 1, 0), .32, .6, 1024); const fill = spot(sc, '#9FB0D0', 6, V3(-3, 3, 2), V3(0, 1.3, 0), .5, .8, 0);
    const v = actor(WOM + '@0,0,15:Breathing_Idle>Taking_Item@1.6', { hair: '#2A1C14', cloth: '#26304A' }); sc.add(v.root); const m = actor(MAN + '@.6,.6,-150:Idle', { cloth: '#3A3A40' }); sc.add(m.root);
    const flash = new THREE.PointLight('#FFFFFF', 0, 12, 1.2); flash.position.set(-1.5, 1.8, 4); sc.add(flash); const bokeh = L.particles(60, [16, 4, 2], 51, .14, '#FFE2B0'); bokeh.position.set(0, 0, -6); sc.add(bokeh);
    const warm = new THREE.PointLight('#FFC88A', 0, 4, 1.4); warm.position.set(.6, 1.9, 1.2); sc.add(warm);
    return { sc, cam: L.cam(40), v, m, key, flash, bokeh, warm }; }

  const B = { sky: skyScene, calm: () => tailScene('calm'), air: () => tailScene('air'), snowtail: () => tailScene('snow'), forest: forestScene, ward: wardScene, office: officeScene, stage: stageScene };
  const SCENE = { open: 'sky', climb: 'sky', windows: 'sky', bomb: 'sky', break: 'sky', fall: 'sky', record: 'sky', galley: 'calm', badge: 'calm', pinned: 'air', cart: 'air', faint: 'air', bp: 'air', aid: 'snowtail',
    impact: 'forest', silence: 'forest', heard: 'forest', honke: 'forest', alone: 'forest', end: 'forest', injury: 'ward', coma: 'ward', wake: 'ward', walk: 'ward', desk: 'office', medal: 'stage', cat: 'stage' };
  const get = (v, o = {}) => { const b = SCENE[v] || o.sc; return S[b] || (S[b] = B[b]()); }; L.FALL = { S, get };

  // ---------------------------------------------------------------- per-shot direction (lt = local time, k = eased progress)
  const SKYG = ['#FFC48A', '#3A4660'], COLD = ['#B8D4F0', '#1A2230'], SNOWG = ['#E0ECF8', '#2A3440'], WARD = ['#E8E6E0', '#20242A'], WARM = ['#FFC890', '#2A1A10'];
  const tumble = (s, lt, y0, rate = .22) => { const T = s.tail.G; T.position.set(lt * .4, y0 - lt * lt * .6, -lt * 1.2); T.rotation.set(-.6 - lt * rate, .3 + lt * .05, .25 + Math.sin(lt * .7) * .2); s.tail.upd(); return T.position.clone(); };
  const cloudsAt = (s, lt, rise = 0) => { s.deck.position.y = rise * lt; s.high.position.y = rise * lt * .5; };
  const tag = (txt, x, y, lt, t0, bg = '#FFFFFF', sz = 34) => CT.sign(txt, x, y, sz * U(), lt, t0, { bg });
  const D = {
    dbg(s, lt, k, dur, o) { const pre = o.pre; if (pre && D[pre]) D[pre](s, o.t != null ? +o.t : lt, k, dur, o); const P = String(o.cp).split(',').map(Number), T = String(o.ct).split(',').map(Number); look(s, V3(...P), V3(...T), 0, 50); L.renderer().render(s.sc, s.cam); L.present({ bloom: 0 }); },
    open(s, lt, k, dur) { pieceVis(s, false); [s.nose, s.mid].forEach(p => p.G.visible = false); cloudsAt(s, lt, 2.5); const p = tumble(s, lt + 2, -10); s.debris.material.opacity = .9; s.debris.position.copy(p).add(V3(-15, -12, -15)); L.drift(s.debris, lt, -1.2);
      look(s, p.clone().add(V3(lerp(-13, -10, k), lerp(-5, -6, k), lerp(11, 9, k))), p.clone().add(V3(0, .5, 0)), .03, 42); s.tail.upd(); post(s, 17, { ap: .0003, dof: 0 }); L.present({ bloom: .06, grade: SKYG, gradeA: .25 }); },
    climb(s, lt, k) { pieceVis(s, true); s.debris.material.opacity = 0; cloudsAt(s, lt, 0); flyPose(s, lt, 0, 0); s.plane.G.rotation.x = -.09; s.deck.position.z = -lt * 9;
      look(s, V3(lerp(-46, -38, k), lerp(-6, -3, k), lerp(30, 12, k)), V3(0, 0, lerp(2, 0, k)), -.04, 36); post(s, 46, { dof: 0 }); L.present({ bloom: .06, grade: SKYG, gradeA: .25 }); },
    windows(s, lt, k, dur) { pieceVis(s, true); s.debris.material.opacity = 0; flyPose(s, lt, 0, 0); s.deck.position.z = -lt * 9; const z = lerp(8, -4, E.inOut(k));
      look(s, V3(-7.5, .9, z + 6), V3(-1.2, .2, z - 3), -.03, 36); post(s, 4.6, { ap: .0012 }); L.present({ bloom: .06, grade: SKYG, gradeA: .22 });
      const n = Math.round(28 * E.inOut(clamp((lt - .3) / Math.max(1, dur - 1)))); tag(n + ' ON BOARD', W * .5, H * .2, lt, 0, '#FFC93C', 44); },
    bomb(s, lt, k) { pieceVis(s, true); s.debris.material.opacity = 0; flyPose(s, lt, 0, 0); s.deck.position.z = -lt * 9; const t = lt - .9, f = t > 0 ? Math.exp(-t * 3.5) : 0, j = t > 0 ? Math.exp(-t * 1.6) : 0;
      s.plane.G.rotation.z += j * Math.sin(t * 9) * .05; s.plane.G.rotation.x += j * .04; s.flash.position.set(0, -1.4, 7.2); s.flash.intensity = 2200 * f;
      s.smoke.material.opacity = t > 0 ? .75 * Math.min(1, t * 3) * Math.max(0, 1 - t * .25) : 0; s.smoke.position.set(-3 * Math.max(0, t), -4 - t * .5, 4.2 - t * 9); s.smoke.scale.setScalar(.4 + Math.max(0, t) * .6); L.drift(s.smoke, lt, .3);
      const sh = t > 0 ? shake(lt, .35 * j) : V3(0, 0, 0); look(s, V3(20, -11, -14).add(sh), V3(0, -.5, 3), -.05, 38); post(s, 28, { dof: 0 }); L.present({ bloom: .06 + f * .3, grade: SKYG, gradeA: .25 }); },
    break(s, lt, k) { pieceVis(s, false); s.flash.intensity = 0; s.smoke.material.opacity = 0; const e = E.out(clamp(lt / 4)); cloudsAt(s, lt, 1.2);
      s.nose.G.position.set(-e * 2, -e * 6, 6 + e * 10); s.nose.G.rotation.set(e * .9, e * .3, e * .4); s.mid.G.position.set(e * 1.5, -e * 3, 0); s.mid.G.rotation.set(e * .2, -e * .1, -e * .6); s.tail.G.position.set(e * 2.5, -e * 4, -6 - e * 10); s.tail.G.rotation.set(-e * .7, e * .2, e * .3); [s.nose, s.mid, s.tail].forEach(p => p.upd());
      s.debris.material.opacity = .9; s.debris.position.set(-15, -16, -15); L.drift(s.debris, lt, -1.5); look(s, V3(lerp(-48, -40, k), lerp(22, 16, k), lerp(14, 8, k)), V3(0, -4, 0), .02, 40); post(s, 45, { dof: 0 }); L.present({ bloom: .06, grade: SKYG, gradeA: .25 }); },
    fall(s, lt, k, dur) { pieceVis(s, false); [s.nose, s.mid].forEach(p => p.G.visible = false); s.debris.material.opacity = 0; const p = tumble(s, lt, 0, .35); cloudsAt(s, lt, 0); s.deck.position.y = p.y + 40 + lt * 30 - 150 * k;
      look(s, p.clone().add(V3(-16 + Math.sin(lt * .5) * 2, -18, 12)), p.clone(), Math.sin(lt * .6) * .05, 44); post(s, 25, { dof: 0 }); L.present({ bloom: .2, grade: COLD, gradeA: .25 });
      const m = Math.round(10160 * (1 - E.inOut(clamp((lt - .2) / Math.max(1, dur - .6))))); tag(m.toLocaleString('en-US') + ' M', W * .5, H * .2, lt, 0, '#FFFFFF', 46); },
    record(s, lt, k, dur) { pieceVis(s, false); [s.nose, s.mid].forEach(p => p.G.visible = false); s.debris.material.opacity = 0; const p = tumble(s, lt + 5, 0, .2); cloudsAt(s, lt, 1);
      look(s, p.clone().add(V3(-55, -22, 36)), p.clone().add(V3(0, -4, 0)), 0, 40); post(s, 70, { dof: 0 }); L.present({ bloom: .06, grade: SKYG, gradeA: .25 });
      const a = proj(s.cam, p), u = U(), e = E.out(clamp((lt - .3) / 1.4)); ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4 * u; ctx.setLineDash([14 * u, 10 * u]); ctx.globalAlpha = e; ctx.beginPath(); ctx.moveTo(a[0], a[1] + 60 * u); ctx.lineTo(a[0], lerp(a[1] + 60 * u, H * .74, e)); ctx.stroke(); ctx.restore();
      tag('10,160 M', a[0] + (a[0] > W * .5 ? -1 : 1) * 150 * u, lerp(a[1], H * .74, .5), lt, .8, '#FFC93C', 44); tag('NO PARACHUTE', W * .5, H * .16, lt, 1.6, '#FFFFFF', 34); },
    galley(s, lt, k) { s.v.at(lt); const hd = s.v.head ? wpos(s.v.head) : V3(-.15, .55, -1.3); look(s, V3(lerp(-.55, -.3, k), .35, lerp(1.6, 1.1, k)), V3(.05, hd.y - .45, -1.4), 0, 42); post(s, 2.6, { ap: .002 }); L.present({ bloom: .12, grade: WARM, gradeA: .16 }); },
    badge(s, lt, k, dur) { s.v.at(lt); const hd = s.v.head ? wpos(s.v.head) : V3(-.15, .55, -1.3); look(s, hd.clone().add(V3(lerp(.8, .7, k), -.08, lerp(1.15, .95, k))), hd.clone().add(V3(0, -.14, 0)), 0, 40); post(s, 1.2, { ap: .002 }); L.present({ bloom: .12, grade: WARM, gradeA: .16 });
      const sw = E.inOut(clamp((lt - 1.4) / 1.2)); tag('VESNA', W * lerp(.3, .7, sw), H * .2, lt, .4, '#FFFFFF', 40); tag('VESNA', W * lerp(.7, .3, sw), H * .2 + 6 * U(), lt, .9, '#FFC93C', 40); },
    pinned(s, lt, k) { const C = s.C, g = C.g, sh = shake(lt, .02); g.rotation.set(.5 + Math.sin(lt * .8) * .05, 0, -.35 + Math.sin(lt * .6) * .08); g.position.copy(sh); g.updateMatrixWorld(true); s.v.at(lt); settle(s.v, -1.0, -.2, -1.5); D._cart(s);
      L.drift(s.wind, lt, -3.5); s.out.intensity = 9 * (.75 + .25 * Math.sin(lt * 13)); const hp = V3(-.35, -.75, -1.0).applyMatrix4(g.matrixWorld); look(s, V3(.9, .4, .9).applyMatrix4(g.matrixWorld), hp, .12 + Math.sin(lt * 2) * .02, 52); post(s, 1.7, { ap: .0015 }); L.present({ bloom: .15, grade: COLD, gradeA: .25 }); },
    cart(s, lt, k) { D.pinned(s, lt, 0); const g = s.C.g, c = V3(.1, -.75, -.7).applyMatrix4(g.matrixWorld); look(s, V3(lerp(.95, .7, k), lerp(-.25, -.35, k), lerp(.4, .25, k)).applyMatrix4(g.matrixWorld), c, .08, 46); post(s, s.cam.position.distanceTo(c), { ap: .003 }); L.present({ bloom: .12, grade: COLD, gradeA: .25 }); },
    faint(s, lt, k, dur) { D.pinned(s, lt, 0); L.drift(s.frost, lt, -.6); const hd = s.v.head ? wpos(s.v.head) : V3(-.3, -.7, -2.3), g = s.C.g; look(s, hd.clone().add(V3(.45, .35, .45).applyQuaternion(g.quaternion)), hd, .05, 40); post(s, .75, { ap: .003 }); L.present({ bloom: .1, grade: COLD, gradeA: .3 });
      const d = E.inOut(clamp((lt - dur * .45) / (dur * .5))); ctx.save(); const gr = ctx.createRadialGradient(W / 2, H * .45, H * (.6 - .45 * d), W / 2, H * .45, H * .75); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, `rgba(0,0,0,${.35 + .6 * d})`); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H); ctx.restore(); },
    bp(s, lt, k, dur) { D.pinned(s, lt, 0); const hd = wpos(s.v.head), g = s.C.g, hp = wpos(bone(s.v, /Hips$/)), t = hp.clone().lerp(hd, .6); look(s, t.clone().add(V3(.35, 1.25, .25).applyQuaternion(g.quaternion)), t, -.05, 44); post(s, 1.3, { ap: .002 }); L.present({ bloom: .1, grade: COLD, gradeA: .3 });
      ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(0, 0, W, H); ctx.restore(); if (IFM.BU && IFM.BU.gauge) IFM.BU.gauge(W * .5, H * .24, W * .13, lerp(.62, .2, E.inOut(clamp((lt - .3) / Math.max(1, dur * .6)))), lt, { label: 'BLOOD PRESSURE', col: '#2EC4B6', red: 'low' }); else tag('LOW BLOOD PRESSURE', W * .5, H * .22, lt, .3); },
    aid(s, lt, k) { const C = s.C, g = C.g; g.rotation.set(.18, 0, -.22); g.position.set(0, 0, 0); g.updateMatrixWorld(true); s.v.at(lt); settle(s.v, -1.0, -.2, -1.5); D._cart(s); s.h.at(lt); settle(s.h, -1.0); L.drift(s.frost, lt, -.2); s.out.intensity = 7;
      const hp = V3(.0, -.75, -1.2).applyMatrix4(g.matrixWorld); look(s, V3(lerp(.5, .35, k), lerp(.35, .25, k), lerp(2.1, 1.8, k)).applyMatrix4(g.matrixWorld), hp, .05, 52); post(s, 3.0, { ap: .001 }); L.present({ bloom: .15, grade: SNOWG, gradeA: .22 }); },
    impact(s, lt, k, dur) { const T = s.tail.G, hit = 1.1, t = lt - hit, y0 = s.hY(0, 0) + .9; if (t < 0) { const u = -t; T.position.set(-u * 8, y0 + u * 26, -u * 12); T.rotation.set(-.32 - u * .4, .9, .22 + u * .3); } else { T.position.set(0, y0 - .25 * Math.exp(-t * 6) * Math.sin(t * 20), 0); T.rotation.set(-.32, .9, .22); } s.tail.upd();
      s.burst.material.opacity = t > 0 ? .95 * Math.exp(-t * .55) : 0; s.burst.position.set(-4, y0 - 1.5 + Math.max(0, t) * .4, -4); s.burst.scale.setScalar(.6 + Math.max(0, t) * .9); L.drift(s.burst, lt, .3); L.drift(s.snow, lt, -.6);
      s.trees.forEach((tr, i) => tr.rotation.z = t > 0 ? Math.sin(t * 10 + i) * .02 * Math.exp(-t * 2) : 0); s.h.root.visible = false; const sh = t > 0 ? shake(lt, .25 * Math.exp(-t * 2.5)) : V3(0, 0, 0);
      look(s, V3(-17, y0 + 1.6, 19).add(sh), V3(0, y0 + 1.2, 0), -.02, 40); post(s, 25, { ap: .0006 }); L.present({ bloom: .15, grade: SNOWG, gradeA: .22 }); },
    silence(s, lt, k) { s.burst.material.opacity = 0; s.trees.forEach(t => t.rotation.z = 0); D._rest(s); s.h.root.visible = false; L.drift(s.snow, lt, -.5); const y0 = s.hY(0, 0);
      look(s, V3(lerp(-8.2, -7, k), y0 + 2.3, lerp(7.2, 6.2, k)), V3(.3, y0 + .7, -.5), 0, 40); post(s, 10, { ap: .001 }); L.present({ bloom: .12, grade: SNOWG, gradeA: .22 }); },
    _cart(s) { if (s._cp) { s.C.cart.position.copy(s._cp); return; } const L1 = bone(s.v, /LeftLeg$/), R1 = bone(s.v, /RightLeg$/); if (!L1) return; const g = s.C.g, m = g.worldToLocal(wpos(L1)).add(g.worldToLocal(wpos(R1))).multiplyScalar(.5);
      const hh = g.worldToLocal(wpos(bone(s.v, /Hips$/))); m.lerp(hh, .35); s._cp = V3(m.x, -1.0 + .36, m.z); s.C.cart.position.copy(s._cp); s.C.cart.rotation.set(0, .3, Math.PI / 2 - .1); },
    _rest(s) { s.tail.G.position.set(0, s.hY(0, 0) + .9, 0); s.tail.G.rotation.set(-.32, .9, .22); s.tail.upd(); },
    heard(s, lt, k) { D._rest(s); s.burst.material.opacity = 0; L.drift(s.snow, lt, -.5); const x = -6, z = 8.5, h = s.h; h.root.visible = true; h.root.position.set(x, s.hY(x, z), z); h.root.rotation.y = Math.atan2(-x, -z); h.at(lt, V3(0, s.hY(0, 0) + 1.5, 0));
      const hd = h.head ? wpos(h.head) : V3(x, s.hY(x, z) + 1.6, z), wr = V3(0, s.hY(0, 0) + 1.2, 0), dir = wr.clone().sub(hd).setY(0).normalize(), sd = V3(-dir.z, 0, dir.x);
      look(s, hd.clone().addScaledVector(dir, -lerp(1.9, 1.5, k)).addScaledVector(sd, .5).add(V3(0, .3, 0)), hd.clone().addScaledVector(dir, 3).add(V3(0, .1, 0)), 0, 40); post(s, 2, { ap: .0012 }); L.present({ bloom: .12, grade: SNOWG, gradeA: .22 }); },
    honke(s, lt, k, dur) { D._rest(s); L.drift(s.snow, lt, -.5); const h = s.h; if (!s.walk) { s.walk = actor(OLD + '@0,0,0:Walking', { cloth: '#6B5440' }); s.sc.add(s.walk.root); } h.root.visible = false; const w = s.walk; w.root.visible = true; const f = lt / Math.max(1, dur), x = lerp(-9.5, -5, f), z = lerp(15, 8, f); w.root.position.set(x, s.hY(x, z), z); w.root.rotation.y = Math.atan2(-3.5, -6.5); w.at(lt * .8);
      const hp = V3(x, s.hY(x, z) + 1.0, z); look(s, hp.clone().add(V3(-3.6, .4, -1.6)), hp.clone().add(V3(.5, 0, -.4)), -.01, 40); post(s, 3.9, { ap: .0015 }); L.present({ bloom: .12, grade: SNOWG, gradeA: .22 }); },
    alone(s, lt, k) { D._rest(s); if (s.walk) s.walk.root.visible = false; s.h.root.visible = true; s.h.root.position.set(-2.6, s.hY(-2.6, 3.4), 3.4); s.h.root.rotation.y = 2.6; s.h.at(lt); L.drift(s.snow, lt, -.4); const y0 = s.hY(0, 0);
      look(s, V3(lerp(-30, -17, k), y0 + lerp(19, 11, k), lerp(30, 19, k)), V3(0, y0 + .5, 1), 0, 38); post(s, 32, { ap: .0005 }); L.present({ bloom: .1, grade: ['#C8D4E4', '#141A24'], gradeA: .3 }); },
    end(s, lt, k) { D._rest(s); if (s.walk) s.walk.root.visible = false; s.h.root.visible = false; L.drift(s.snow, lt, -.5); const y0 = s.hY(0, 0), c = E.inOut(k);
      look(s, V3(lerp(-7, -5, c), y0 + lerp(1.2, 7, c), lerp(9, 5, c)), V3(0, y0 + lerp(1.6, 9, c * c), lerp(0, -2, c)), 0, 40); post(s, 10, { ap: .0008 }); L.present({ bloom: .14, grade: SNOWG, gradeA: .22 }); },
    _lie(s, lt) { const v = s.v; v.root.visible = true; if (s.bed) s.bed.visible = true; s.walker.root.visible = false; const c = s.bb.getCenter(V3()); v.root.rotation.y = s.bb.max.x - s.bb.min.x > s.bb.max.z - s.bb.min.z ? Math.PI / 2 : 0; v.at(lt == null ? 0 : lt); settle(v, s.top - .04, c.x + .15, c.z); },
    _wardCam(s, off, tgtK, fov) { const hp = wpos(bone(s.v, /Hips$/)), hd = wpos(s.v.head), up = hd.clone().sub(hp).setY(0).normalize(), t = hp.clone().lerp(hd, tgtK); s.cam.up.copy(up); s.cam.fov = fov; s.cam.position.copy(t).add(off(up)); s.cam.lookAt(t); s.cam.aspect = W / H; s.cam.updateProjectionMatrix(); s.cam.up.set(0, 1, 0); return t; },
    injury(s, lt, k, dur) { D._lie(s, lt); D._wardCam(s, up => V3(0, lerp(2.5, 2.2, k), 0).addScaledVector(up, -.15), .25, 44); post(s, 2.3, { ap: .001 }); L.present({ bloom: .1, grade: WARD, gradeA: .2 });
      const u = U(), parts = [[/Head$/, 'SKULL'], [/Spine$/, '3 VERTEBRAE'], [/Hips$/, 'PELVIS'], [/LeftLeg$/, 'LEGS']]; parts.forEach(([rx, lb], i) => { const b = bone(s.v, rx); if (!b) return; const p = proj(s.cam, wpos(b)), t0 = .4 + i * .55, e = E.out(clamp((lt - t0) / .4)); if (e <= 0) return;
        const tx = p[0] < W / 2 ? W * .2 : W * .8; ctx.save(); ctx.globalAlpha = e; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 3 * u; ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(lerp(p[0], tx, e), p[1]); ctx.stroke(); ctx.fillStyle = '#FF6B5B'; ctx.beginPath(); ctx.arc(p[0], p[1], 9 * u, 0, 7); ctx.fill(); ctx.restore(); tag(lb, tx, p[1], lt, t0 + .2, '#FFFFFF', 30); }); },
    coma(s, lt, k) { D._lie(s, lt); const hd = D._wardCam(s, up => V3(-up.z, 0, up.x).multiplyScalar(lerp(.7, .55, k)).add(V3(0, lerp(.9, .75, k), 0)).addScaledVector(up, -.5), .85, 40); post(s, 1.1, { ap: .002 }); L.present({ bloom: .08, grade: ['#B8C8D8', '#101418'], gradeA: .3 }); },
    wake(s, lt, k) { D._lie(s, lt); s.warm.intensity = 6 * E.inOut(clamp(lt / 2.5)); const hd = D._wardCam(s, up => V3(0, lerp(1.0, .85, k), 0).addScaledVector(up, -.45), .95, 38); post(s, .8, { ap: .003 }); L.present({ bloom: .12, grade: WARD, gradeA: .2 }); },
    walk(s, lt, k, dur) { s.v.root.visible = false; if (s.bed) s.bed.visible = false; const w = s.walker; w.root.visible = true; const x = lerp(-1.2, 1.6, lt / Math.max(1, dur)); w.root.position.set(x, 0, 1.6); w.root.rotation.y = Math.PI / 2; w.at(lt * .62);
      const hp = V3(x, 1.0, 1.6); look(s, hp.clone().add(V3(.6, .15, 3.0)), hp.clone().add(V3(.3, 0, 0)), 0, 40); post(s, 3.1, { ap: .0015 }); L.present({ bloom: .12, grade: WARD, gradeA: .2 }); },
    desk(s, lt, k) { s.v.at(lt); const c = s.db.getCenter(V3()); look(s, V3(c.x + lerp(1.9, 1.5, k), s.db.max.y + .55, s.db.max.z + lerp(-.1, .1, k)), V3(c.x, s.db.max.y + .3, s.db.max.z + .35), 0, 40); post(s, 2.2, { ap: .0015 }); L.present({ bloom: .12, grade: WARM, gradeA: .18 }); },
    medal(s, lt, k) { s.v.at(lt); s.m.at(lt); L.drift(s.bokeh, lt, .02); const f = [.6, 1.5, 2.1, 3.2].reduce((a, t0) => a + Math.exp(-Math.max(0, lt - t0) * 12) * (lt > t0 ? 1 : 0), 0); s.flash.intensity = 40 * f; const hd = s.v.head ? wpos(s.v.head) : V3(0, 1.6, 0);
      look(s, V3(lerp(-.5, -.3, k), 1.45, lerp(4.0, 3.5, k)), V3(.2, hd.y - .45, .2), 0, 40); post(s, 3.6, { ap: .0015 }); L.present({ bloom: .2 + f * .2, grade: WARM, gradeA: .2 }); },
    cat(s, lt, k) { s.m.root.visible = false; s.v.at(Math.min(lt, 1.4), s.cam.position); s.key.intensity = 6; s.key.color.set('#FFD7A8'); s.warm.intensity = 3; L.drift(s.bokeh, lt, .02); const hd = s.v.head ? wpos(s.v.head) : V3(0, 1.6, 0);
      look(s, hd.clone().add(V3(lerp(-.75, -.6, k), -.08, lerp(1.25, 1.05, k))), hd.clone().add(V3(0, -.14, 0)), 0, 38); post(s, 1.4, { ap: .0025 }); L.present({ bloom: .15, grade: WARM, gradeA: .22 }); },
  };

  /* recorded sounds of what is on screen (real_* vocabulary, studio/CLIP.md §2c) */
  const SND = { open: [[0, 'real_wind']], bomb: [[.9, 'real_metal_groan'], [1.0, 'real_wind']], break: [[0, 'real_metal_groan']], pinned: [[0, 'real_wind'], [.3, 'real_metal_groan']], cart: [[.2, 'real_metal_groan']],
    faint: [[.2, 'real_breath']], fall: [[0, 'real_wind']], impact: [[1.1, 'real_body_fall'], [1.15, 'real_metal_groan']], heard: [[.4, 'real_snow_footsteps']], honke: [[0, 'real_snow_footsteps']],
    aid: [[.3, 'real_cloth'], [.6, 'real_breath']], wake: [[.4, 'real_breath']], walk: [[0, 'real_footsteps']], desk: [[.3, 'real_cloth']], medal: [[0, 'real_crowd']], cat: [[.2, 'real_cloth']] };
  const NEED = ['glb/dc9_airliner', 'glb/airline_trolley', WOM, OLD, MAN, 'glb/island_tree_02', 'glb/tree_small_02', 'glb/local_mattress', 'glb/modern_arm_chair_01', 'tex/cotton_jersey', 'glb/wooden_desk_office', 'glb/paper_stack', 'glb/desk_lamp_arm_01',
    'hdr/kloppenheim_06_puresky', 'hdr/snowy_hillside', 'hdr/surgery', 'hdr/kiara_interior', 'tex/snow_02', 'tex/Plastic010', 'tex/dirty_carpet', 'tex/rusty_painted_metal', 'tex/tiled_floor_001', 'tex/wood_floor'];
  A.x3_fall = (o, c, dur) => { const v = o.v || 'open'; L.REQ = L.REQ || new Set(); [...NEED, ...L.ANIMLIBS].forEach(x => L.REQ.add(x));
    return { sfx: SND[v] || [], draw: lt => { CT.begin({}, lt); const r = L.renderer(); r.localClippingEnabled = true; r.toneMappingExposure = ({ sky: .85, ward: .8, stage: .9, calm: .9, air: .85, snowtail: .85 })[SCENE[v] || o.sc] || 1.0; const s = get(v, o), k = E.inOut(clamp(lt / Math.max(1, dur))); D[v](s, lt, k, dur, o); CT.end({}, lt, 1, .3); } }; };
})();
