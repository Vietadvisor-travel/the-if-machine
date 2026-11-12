/* cook-under-the-sea (ODDLY TRUE, 60 s): Harrison Okene, cook of the tug Jascon-4, ~60 h in an air pocket 30 m down off
   Nigeria (May 2013). Act x3_cook v=flip|night|sink|wreck|upside|corridor|surface|cabin|can|waterline|eyes|divers|pass|hand|
   alive|bell|echo. People are Muse's glTF figures (generic, no likeness) with the shared Mixamo clips; divers = the same
   figures in a neoprene material with a helmet and chest lamp. Reusable: washroom(), cabin(), seabedScene(), diver(). */
'use strict';
(function () {
  if (!window.IFM || !IFM.L3 || !IFM.CT || !IFM.L3.actor) return;
  const A = IFM.ACT, L = IFM.L3, CT = IFM.CT, V3 = (x, y, z) => new THREE.Vector3(x, y, z), S = {};
  const MAN = 'glb/wa-man', DIV1 = 'glb/eu-man', DIV2 = 'glb/la-man';
  // in-place locomotion: strip the horizontal root motion of the swim/walk clips once (the act moves the root itself)
  let fixed = false; const inPlace = () => { if (fixed) return; const lib = L.A['glb/mixamo_animations_mixamo_rig']; if (!lib) return; fixed = true;
    ['Swimming', 'Treading_Water', 'Swimming_To_Edge', 'Walking', 'Running'].forEach(n => { const c = lib.clips[n]; if (!c) return; c.tracks.forEach(t => { if (/Hips\.position$/.test(t.name)) { const v = t.values, x0 = v[0], z0 = v[2]; for (let i = 0; i < v.length; i += 3) { v[i] = x0; v[i + 2] = z0; } } }); }); };
  const actor = spec => { inPlace(); return L.actor(spec); };
  const bone = (a, rx) => { let b = null; a.root.traverse(o => { if (!b && o.isBone && rx.test(o.name)) b = o; }); return b; };
  const wpos = o => o.getWorldPosition(V3());
  const tex = (id, rep, fb, col) => L.A[id] ? L.pbr(id, { repeat: rep, color: col }) : L.mat(fb, { rough: .7 });
  const glb = (id, s = 1) => { if (!L.A[id]) return null; const m = THREE_X.SkeletonUtils.clone(L.A[id].gltf.scene); m.scale.setScalar(s); return L.shadows(m); };
  const neo = L.mat('#15181D', { rough: .45, metal: .1 });
  const waterMat = (col = '#0E4650', op = .86) => new THREE.MeshStandardMaterial({ color: col, roughness: .06, metalness: .3, transparent: true, opacity: op, side: THREE.DoubleSide });
  const waterPlane = (w, d, col, op) => { const g = new THREE.PlaneGeometry(w, d, 48, 48); g.rotateX(-Math.PI / 2); const m = new THREE.Mesh(g, waterMat(col, op)); m.receiveShadow = true; m.userData.base = g.attributes.position.array.slice(); return m; };
  const waves = (w, lt, amp = .025, f = 1) => { const p = w.geometry.attributes.position, b = w.userData.base; for (let i = 0; i < p.count; i++) { const x = b[i * 3], z = b[i * 3 + 2]; p.setY(i, Math.sin(x * 3 * f + lt * 1.6) * amp + Math.cos(z * 2.6 * f - lt * 1.2) * amp * .8); } p.needsUpdate = true; w.geometry.computeVertexNormals(); };
  const proj = (cam, v) => { const p = v.clone().project(cam); return [(p.x + 1) / 2 * W, (1 - p.y) / 2 * H]; };
  const post = (s, focus, o = {}) => { if (L.renderPost && window.L3_POST !== 0) L.renderPost(s, { ao: o.ao === 0 ? null : { radius: .35, samples: 8 }, dof: { focus, aperture: o.ap ?? .0015, maxblur: .007 }, bloom: { strength: o.bloom ?? .25, radius: .5, threshold: o.th ?? .9 } }); else L.renderer().render(s.sc, s.cam); };
  const base = (bg, fog) => { const sc = new THREE.Scene(); sc.background = new THREE.Color(bg); if (fog) sc.fog = new THREE.FogExp2(bg, fog); if (L.envRoom) { sc.environment = L.envRoom(); sc.environmentIntensity = .12; } return sc; };
  const spot = (sc, col, int, pos, tgt, ang = .6, pen = .8, shadow = 1024) => { const l = new THREE.SpotLight(col, int, 0, ang, pen, 0); l.position.copy(pos); l.target.position.copy(tgt); if (shadow) { l.castShadow = true; l.shadow.mapSize.set(shadow, shadow); l.shadow.bias = -.0008; l.shadow.normalBias = .02; } sc.add(l, l.target); return l; };
  const beamMesh = (col = '#FFF3D0') => new THREE.Mesh(new THREE.ConeGeometry(.5, 3, 24, 1, true), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  const aimBeam = (b, from, to, op) => { b.position.copy(from.clone().lerp(to, .5)); b.lookAt(to); b.rotateX(-Math.PI / 2); b.scale.set(1, from.distanceTo(to) / 3, 1); b.material.opacity = op; };

  // ---------------------------------------------------------------- the tug's washroom: booths + toilet, sinks, washing machines
  function washroom() { const P = new THREE.Group(), G = new THREE.Group(); P.add(G); const w = 4.6, h = 2.5, d = 3.6; G.position.y = -h / 2;
    const wall = tex('tex/white_plaster_02', 2, '#D2CCBE', '#CFC8B8'), floor = tex('tex/floor_tiles_08', 3, '#8C8578'), metal = L.mat('#8FA3A8', { rough: .45, metal: .35 });
    const mk = (geo, mat, x, y, z, rx = 0, ry = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); m.receiveShadow = m.castShadow = true; G.add(m); return m; };
    mk(new THREE.PlaneGeometry(w, d), floor, 0, 0, 0, -Math.PI / 2); mk(new THREE.PlaneGeometry(w, d), wall, 0, h, 0, Math.PI / 2); mk(new THREE.PlaneGeometry(w, h), wall, 0, h / 2, -d / 2); mk(new THREE.PlaneGeometry(w, h), wall, 0, h / 2, d / 2, 0, Math.PI);
    mk(new THREE.PlaneGeometry(d, h), wall, -w / 2, h / 2, 0, 0, Math.PI / 2); mk(new THREE.PlaneGeometry(d, h), wall, w / 2, h / 2, 0, 0, -Math.PI / 2);
    // booths on the back wall: partitions, an open door, the toilet
    [-2.3, -.1].forEach(x => mk(new THREE.BoxGeometry(.04, 1.9, 1.3), metal, x + 1.1, .95, -d / 2 + .65)); [-2.3 + 1.1 - .55].forEach(x => mk(new THREE.BoxGeometry(.04, 1.9, 1.3), metal, -2.25, .95, -d / 2 + .65));
    const door = new THREE.Group(); door.position.set(-.1, 0, -d / 2 + 1.3); const dm = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.75, .035), metal); dm.position.set(-.5, .95, 0); dm.castShadow = dm.receiveShadow = true; door.add(dm); door.rotation.y = -1.25; G.add(door);
    const wc = glb('glb/local_toilet'); if (wc) { wc.position.set(-1.0, 0, -d / 2 + .25); G.add(wc); } else { const b = mk(new THREE.CylinderGeometry(.22, .17, .42, 20), L.mat('#ECEAE4', { rough: .2 }), -1.0, .21, -d / 2 + .45); }
    [-.6, .4].forEach(z => { const s = glb('glb/local_bathroom_sink'); if (s) { s.position.set(w / 2 - .3, 0, z); s.rotation.y = -Math.PI / 2; G.add(s); } else mk(new THREE.BoxGeometry(.45, .2, .55), L.mat('#ECEAE4', { rough: .2 }), w / 2 - .3, .85, z); });
    mk(new THREE.PlaneGeometry(1.6, .8), L.mat('#9FB4BA', { rough: .05, metal: .9 }), w / 2 - .01, 1.55, -.1, 0, -Math.PI / 2);
    [.1, .8].forEach(z => { mk(new THREE.BoxGeometry(.62, .86, .62), L.mat('#E6E4DE', { rough: .35 }), -w / 2 + .33, .43, z); const dr = mk(new THREE.CylinderGeometry(.2, .2, .03, 28), L.mat('#2B3238', { rough: .1, metal: .5 }), -w / 2 + .65, .48, z); dr.rotation.z = Math.PI / 2; });
    mk(new THREE.CylinderGeometry(.05, .05, w, 10), L.mat('#6A5A44', { rough: .5, metal: .5 }), 0, h - .15, d / 2 - .2, 0, 0).rotation.z = Math.PI / 2;
    const tube = mk(new THREE.BoxGeometry(1.4, .05, .12), L.mat('#FFFFFF', { emissive: '#EAF4FF', ei: 2.2 }), .3, h - .03, 0);
    const lamp = new THREE.PointLight('#E8F2FF', 6, 7, 1.3); lamp.position.set(.3, h - .3, 0); lamp.castShadow = true; lamp.shadow.mapSize.set(1024, 1024); lamp.shadow.bias = -.002; G.add(lamp);
    const port = mk(new THREE.CircleGeometry(.22, 28), L.mat('#FFF1D6', { emissive: '#FFE7BF', ei: 1.4 }), w / 2 - .01, 1.75, 1.15, 0, -Math.PI / 2);
    return { P, G, door, tube, lamp, port, w, h, d }; }

  // ---------------------------------------------------------------- the engineer's cabin, upside down (desk, chair, bunk on the ceiling)
  function cabinRoom(sc, air = 1.2) { const w = 3.4, h = 2.4, d = 3.2, g = new THREE.Group(), wall = L.mat('#4A5A5E', { rough: .85 }), ceil = tex('tex/laminate_floor_02', 2, '#5A4A3A', '#8A7A68');
    const mk = (geo, mat, x, y, z, rx = 0, ry = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); m.receiveShadow = m.castShadow = true; g.add(m); return m; };
    mk(new THREE.PlaneGeometry(w, d), ceil, 0, h, 0, Math.PI / 2); mk(new THREE.PlaneGeometry(w, d), wall, 0, 0, 0, -Math.PI / 2); mk(new THREE.PlaneGeometry(w, h), wall, 0, h / 2, -d / 2); mk(new THREE.PlaneGeometry(d, h), wall, -w / 2, h / 2, 0, 0, Math.PI / 2); mk(new THREE.PlaneGeometry(d, h), wall, w / 2, h / 2, 0, 0, -Math.PI / 2);
    // furniture hanging from the old floor (now the ceiling)
    const wood = L.mat('#6B5440', { rough: .7 }); mk(new THREE.BoxGeometry(1.2, .05, .6), wood, -.9, h - .75, -d / 2 + .35); [[-1.45, -d / 2 + .1], [-.35, -d / 2 + .1], [-1.45, -d / 2 + .6], [-.35, -d / 2 + .6]].forEach(([x, z]) => mk(new THREE.BoxGeometry(.05, .72, .05), wood, x, h - .37, z));
    mk(new THREE.BoxGeometry(.45, .05, .45), L.mat('#3A3F45', { rough: .6 }), .2, h - .45, -d / 2 + .9); mk(new THREE.BoxGeometry(.04, .42, .04), L.mat('#2A2D30', { metal: .6, rough: .4 }), .2, h - .22, -d / 2 + .9);
    mk(new THREE.BoxGeometry(.9, .35, 2.0), L.mat('#2F4A6A', { rough: .9 }), w / 2 - .5, h - .5, .2); mk(new THREE.BoxGeometry(.95, .08, 2.05), wood, w / 2 - .5, h - .3, .2);
    [0, 1, 2].forEach(i => mk(new THREE.CylinderGeometry(.045, .045, d, 10), L.mat('#6A5A44', { rough: .5, metal: .5 }), -w / 2 + .15, .4 + i * .3, 0, Math.PI / 2));
    mk(new THREE.BoxGeometry(.8, 1.9, .06), L.mat('#55646A', { rough: .6, metal: .3 }), .7, h - 1.0, -d / 2 + .03);
    sc.add(g); const water = waterPlane(w - .02, d - .02, '#0B3E48', .88); water.position.y = h - air; sc.add(water);
    const under = new THREE.Mesh(new THREE.BoxGeometry(w - .04, 3, d - .04), new THREE.MeshBasicMaterial({ color: '#04191E', transparent: true, opacity: .6, side: THREE.BackSide, depthWrite: false })); under.position.y = h - air - 1.5; sc.add(under);
    return { g, water, h, air, w, d, level: h - air }; }

  // ---------------------------------------------------------------- the seabed with the wreck (shared by sink / wreck / divers)
  function seabedScene() { const col = '#0B3A48', sc = base(col, .022); sc.add(new THREE.HemisphereLight('#8FE3F0', '#06202A', 1.2));
    const sun = new THREE.DirectionalLight('#CFF6FF', 2.0); sun.position.set(6, 30, 8); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -18, right: 18, top: 18, bottom: -18, near: 1, far: 70 }); sun.shadow.bias = -.0015; sc.add(sun);
    const cau = spot(sc, '#FFFFFF', 4.5, V3(-2, 26, 2), V3(0, 0, 0), .75, .7, 512); cau.map = L.caustics();
    sc.add(L.seabed({ col: '#A99A78' })); const tug = L.tug(); tug.rotation.set(0, .35, Math.PI + .14); tug.position.set(0, 6.6, 0); sc.add(tug);
    [[-9, 6, 1.4], [8, -5, 1.1], [-5, -9, .8], [11, 7, 1.6], [3, 9, .7], [-13, -2, 1]].forEach(([x, z, s], i) => { const r = L.rock(i + 3, s); r.position.set(x, s * .3, z); sc.add(r); });
    const fish = L.fishSchool(30, 5); sc.add(fish); const pts = L.particles(700, [40, 18, 40], 9, .07); sc.add(pts); const rays = L.rays(9, 4, 26, 24); sc.add(rays);
    const sand = L.particles(260, [16, 3, 8], 13, .22, '#CBB994'); sand.material.opacity = 0; sand.material.blending = THREE.NormalBlending; sc.add(sand);
    return { sc, cam: L.cam(36), tug, fish, pts, rays, sand }; }
  const seaAt = (s, lt) => { L.causticsAt(lt); L.swim(s.fish, lt, V3(-3, 7, 2), 9); L.drift(s.pts, lt, .12); L.sway(s.rays, lt); };

  // ---------------------------------------------------------------- a saturation diver (generic figure, neoprene, helmet, chest lamp)
  function diver(sc, spec) { const a = actor(spec); if (!a) return null; a.root.traverse(o => { if (o.isMesh) o.material = neo; }); sc.add(a.root);
    const helm = new THREE.Group(), shell = new THREE.Mesh(new THREE.SphereGeometry(.19, 24, 18), L.mat('#D9A52E', { rough: .35, metal: .2 })); helm.add(shell);
    const plate = new THREE.Mesh(new THREE.CircleGeometry(.1, 24), L.mat('#0D1418', { rough: .05, metal: .6 })); plate.position.set(0, 0, .185); helm.add(plate);
    const lampG = new THREE.Mesh(new THREE.CylinderGeometry(.04, .05, .1, 14), L.mat('#FFF6DA', { emissive: '#FFF1C8', ei: 3 })); lampG.rotation.x = Math.PI / 2; lampG.position.set(.12, .12, .12); helm.add(lampG); L.shadows(helm, false, true); sc.add(helm);
    const light = new THREE.SpotLight('#FFF1CC', 0, 14, .38, .6, 1.2); sc.add(light, light.target); const beam = beamMesh(); sc.add(beam);
    const hb = bone(a, /Head$/i) || a.head, bub = L.particles(60, [.5, 4, .5], 31, .06, '#DDF6FF'); sc.add(bub);
    const upd = (lt, int = 9, reach = 4, op = .1) => { a.at(lt); a.root.updateMatrixWorld(true); const hp = wpos(hb); helm.position.copy(hp).add(V3(0, .05, 0)); const q = new THREE.Quaternion(); hb.getWorldQuaternion(q); helm.quaternion.copy(q);
      const lp = V3(.12, .12, .2).applyQuaternion(q).add(helm.position), dir = V3(0, -.15, 1).applyQuaternion(q).normalize(); light.position.copy(lp); light.target.position.copy(lp.clone().addScaledVector(dir, 3)); light.intensity = int; aimBeam(beam, lp, lp.clone().addScaledVector(dir, reach), op);
      bub.position.copy(hp); L.drift(bub, lt, .8); return hp; };
    return { a, helm, light, beam, upd, bub }; }

  // ---------------------------------------------------------------- scenes (built once, cached)
  const B = {
    flip() { const sc = base('#0A0D10'); sc.environmentIntensity = .25; sc.add(new THREE.HemisphereLight('#C8D6DA', '#20262A', .35)); const R = washroom(); R.P.position.set(0, 1.25, 0); sc.add(R.P);
      const man = actor(MAN + '@-1.0,-1.3,0:Sitting_Idle>Scared@.9>Falling_Down@1.9'); sc.add(man.root); const water = waterPlane(5.6, 4.4, '#0F4A55', .82); sc.add(water);
      const spray = L.particles(240, [3, 2.4, 2], 17, .05, '#E6FBFF'); spray.position.set(1.6, 0, -.2); sc.add(spray); return { sc, cam: L.cam(42), R, man, water, spray }; },
    night() { const sc = new THREE.Scene(); sc.background = L.canvasTex(8, 256, (g, w, h) => { const r = g.createLinearGradient(0, 0, 0, h); r.addColorStop(0, '#05070F'); r.addColorStop(.42, '#101A33'); r.addColorStop(.52, '#3A3550'); r.addColorStop(.56, '#6A4A4A'); r.addColorStop(.6, '#0A1018'); r.addColorStop(1, '#03060A'); g.fillStyle = r; g.fillRect(0, 0, w, h); });
      sc.fog = new THREE.Fog('#1A2238', 30, 160); if (L.envRoom) { sc.environment = L.envRoom(); sc.environmentIntensity = .08; } sc.add(new THREE.HemisphereLight('#4A5A80', '#05080C', .5));
      const moon = new THREE.DirectionalLight('#AFC4FF', 1.1); moon.position.set(-20, 18, -30); moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); Object.assign(moon.shadow.camera, { left: -15, right: 15, top: 15, bottom: -15, near: 1, far: 90 }); sc.add(moon);
      const geo = new THREE.PlaneGeometry(260, 260, 140, 140); geo.rotateX(-Math.PI / 2); const sea = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: '#0A1A26', roughness: .18, metalness: .55 })); sea.userData.base = geo.attributes.position.array.slice(); sea.receiveShadow = true; sc.add(sea);
      const tanker = new THREE.Group(); const hull = new THREE.Mesh(new THREE.BoxGeometry(70, 7, 11), L.mat('#22262C', { rough: .7 })); hull.position.y = 2; tanker.add(hull); const bridge = new THREE.Mesh(new THREE.BoxGeometry(8, 8, 10), L.mat('#C9C4B8', { rough: .6 })); bridge.position.set(-28, 9, 0); tanker.add(bridge);
      for (let i = 0; i < 16; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(.28, 8, 6), L.mat('#FFE2A8', { emissive: '#FFD58A', ei: 4 })); b.position.set(-32 + i * 4.3, 6, 5.6); tanker.add(b); } for (let i = 0; i < 6; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(.8, .5, .1), L.mat('#FFE2A8', { emissive: '#FFD58A', ei: 3 })); b.position.set(-30 + i * 1.3, 10 + (i % 2) * 1.6, 5.05); tanker.add(b); }
      tanker.position.set(-6, 0, -42); tanker.rotation.y = .12; sc.add(tanker);
      const plat = new THREE.Group(); [[-5, -5], [5, -5], [-5, 5], [5, 5]].forEach(([x, z]) => { const l = new THREE.Mesh(new THREE.CylinderGeometry(.8, .8, 26, 10), L.mat('#2A2E33', { rough: .8 })); l.position.set(x, 8, z); plat.add(l); }); const pd = new THREE.Mesh(new THREE.BoxGeometry(16, 3, 16), L.mat('#30353B', { rough: .8 })); pd.position.y = 21; plat.add(pd);
      const flare = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 10), L.mat('#FF9A4A', { emissive: '#FF8A3A', ei: 6 })); flare.position.set(6, 30, 0); plat.add(flare); for (let i = 0; i < 10; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(.35, 8, 6), L.mat('#FFE9B8', { emissive: '#FFE0A0', ei: 4 })); b.position.set(-7 + i * 1.6, 22.8, 8.1); plat.add(b); }
      plat.position.set(55, 0, -110); sc.add(plat); const glow = new THREE.PointLight('#FFB070', 30, 70, 1.2); glow.position.set(-6, 10, -30); sc.add(glow);
      const tug = L.tug(); const T = new THREE.Group(); tug.position.y = -1.6; T.add(tug); sc.add(T); const deck = new THREE.PointLight('#FFE7C0', 14, 14, 1.5); deck.position.set(.6, 6, 2.5); T.add(deck);
      const spray = L.particles(300, [16, 4, 8], 19, .12, '#DDEBFF'); spray.material.opacity = 0; sc.add(spray); return { sc, cam: L.cam(36), sea, T, tug, spray }; },
    sink() { const s = seabedScene(); return s; },
    upside() { const sc = base('#04090D', .06); sc.environmentIntensity = .08; const R = washroom(); R.P.position.set(0, 1.25, 0); R.P.rotation.z = Math.PI; R.lamp.intensity = 0; R.tube.material = L.mat('#5A6266', { rough: .5 }); R.door.rotation.y = -.6; sc.add(R.P);
      const water = waterPlane(4.56, 3.56, '#0D4650', .86); water.position.y = 1.0; sc.add(water); const man = actor(MAN + '@.1,-.2,-15:Treading_Water'); man.root.position.y = -.35; sc.add(man.root);
      sc.add(new THREE.HemisphereLight('#4A7C88', '#020507', .45)); const glow = new THREE.PointLight('#2EC4B6', 3.5, 6, 1); glow.position.set(.9, .4, .6); sc.add(glow); const key = spot(sc, '#BFE8EE', 7, V3(-1.4, 2.2, 1.6), V3(0, 1.4, 0), .55, .8); const cau = spot(sc, '#9FF3FF', 3, V3(0, .9, .3), V3(0, 3, 0), .9, .8, 256); cau.map = L.caustics();
      const pts = L.particles(220, [4, 1.2, 3.4], 21, .025, '#BDEFFF'); pts.position.y = .2; sc.add(pts); return { sc, cam: L.cam(40), R, water, man, pts }; },
    corridor() { const sc = base('#03141A', .16); sc.environmentIntensity = .05; const g = new THREE.Group(), wall = L.mat('#3E4E52', { rough: .85 }), len = 14, w = 1.5, h = 2.2;
      const mk = (geo, mat, x, y, z, rx = 0, ry = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); m.receiveShadow = m.castShadow = true; g.add(m); return m; };
      mk(new THREE.PlaneGeometry(len, w), tex('tex/rubber_tiles', 6, '#3A3F44'), 0, h, 0, Math.PI / 2); mk(new THREE.PlaneGeometry(len, w), wall, 0, 0, 0, -Math.PI / 2); mk(new THREE.PlaneGeometry(len, h), wall, 0, h / 2, -w / 2); mk(new THREE.PlaneGeometry(len, h), wall, 0, h / 2, w / 2, 0, Math.PI);
      for (let i = 0; i < 6; i++) { mk(new THREE.BoxGeometry(.06, h, .12), L.mat('#55666A', { rough: .5, metal: .4 }), -6 + i * 2.4, h / 2, -w / 2 + .06); const lt2 = mk(new THREE.BoxGeometry(.5, .05, .12), L.mat('#C9D2D4', { rough: .4 }), -5 + i * 2.4, .03, 0); }
      [0, 1].forEach(i => mk(new THREE.CylinderGeometry(.04, .04, len, 8), L.mat('#6A5A44', { rough: .5, metal: .5 }), 0, .35 + i * .22, w / 2 - .1, 0, 0).rotation.z = Math.PI / 2);
      sc.add(g); const man = actor(MAN + '@0,0,90:Swimming'); man.root.position.y = .55; sc.add(man.root); sc.add(new THREE.HemisphereLight('#3A8C98', '#010406', .35));
      const glow = new THREE.PointLight('#4FD6DA', 5, 5, 1.4); sc.add(glow); const pts = L.particles(500, [14, 2.2, 1.5], 23, .03, '#BDEFFF'); sc.add(pts); return { sc, cam: L.cam(40), man, glow, pts, h }; },
    surface() { const sc = base('#04090D', .05); sc.environmentIntensity = .1; const C = cabinRoom(sc, 1.2); const man = actor(MAN + '@0,-.2,10:Treading_Water'); sc.add(man.root); sc.add(new THREE.HemisphereLight('#3E6E78', '#020507', .4));
      const key = spot(sc, '#C8EEF2', 9, V3(-1.2, 2.3, 1.4), V3(0, 1.4, -.2), .5, .8); const under = new THREE.PointLight('#2EC4B6', 4, 4, 1.2); under.position.set(.4, .6, .4); sc.add(under); const cau = spot(sc, '#9FF3FF', 3, V3(0, .8, .2), V3(0, 3, 0), .9, .8, 256); cau.map = L.caustics();
      const splash = L.particles(160, [.9, .8, .9], 27, .035, '#E6FBFF'); splash.material.opacity = 0; sc.add(splash); return { sc, cam: L.cam(38), C, man, splash }; },
    cabin() { const sc = base('#04090D', .045); sc.environmentIntensity = .1; const C = cabinRoom(sc, 1.2); const man = actor(MAN + '@.3,.2,-30:Treading_Water'); sc.add(man.root); sc.add(new THREE.HemisphereLight('#3E6E78', '#020507', .45));
      spot(sc, '#C8EEF2', 8, V3(-1.3, 2.3, 1.5), V3(.2, 1.5, 0), .6, .8); const g2 = new THREE.PointLight('#2EC4B6', 3, 5, 1.2); g2.position.set(-.6, .7, .8); sc.add(g2); const cau = spot(sc, '#9FF3FF', 2.6, V3(0, .9, .3), V3(0, 3, 0), .95, .8, 256); cau.map = L.caustics();
      const lamp = new THREE.SpotLight('#FFF1CC', 0, 10, .45, .6, 1.2); lamp.castShadow = true; lamp.shadow.mapSize.set(512, 512); sc.add(lamp, lamp.target); const blob = new THREE.Sprite(new THREE.SpriteMaterial({ map: L.dotTex(), color: '#FFF0C8', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); blob.scale.set(1.6, 1.6, 1); sc.add(blob);
      return { sc, cam: L.cam(36), C, man, lamp, blob }; },
    can() { const sc = base('#03080B', .1); sc.environmentIntensity = .12; const C = cabinRoom(sc, 1.2); const man = actor(MAN + '@.15,-.6,180:Treading_Water'); sc.add(man.root);
      const can = new THREE.Group(), body = new THREE.Mesh(new THREE.CylinderGeometry(.033, .033, .122, 32), new THREE.MeshStandardMaterial({ color: '#B0141C', roughness: .28, metalness: .6 })); can.add(body); [.061, -.061].forEach(y => { const r = new THREE.Mesh(new THREE.CylinderGeometry(.031, .033, .006, 32), L.mat('#C9CCD0', { rough: .2, metal: .9 })); r.position.y = y; can.add(r); });
      can.rotation.z = Math.PI / 2 - .25; L.shadows(can); sc.add(can); spot(sc, '#D8F2F4', 5, V3(-.6, 2.1, .9), V3(0, 1.2, 0), .35, .9, 512); const g2 = new THREE.PointLight('#2EC4B6', 1.6, 3, 1.2); g2.position.set(.3, .9, .5); sc.add(g2); sc.add(new THREE.HemisphereLight('#3E6E78', '#020507', .3));
      return { sc, cam: L.cam(30), C, man, can }; },
    waterline() { const sc = base('#04090D', .05); sc.environmentIntensity = .12; const C = cabinRoom(sc, 1.2); const man = actor(MAN + '@-.2,-.7,15:Treading_Water'); sc.add(man.root); sc.add(new THREE.HemisphereLight('#3E6E78', '#020507', .45));
      spot(sc, '#C8EEF2', 8, V3(.8, 2.3, 1.3), V3(-.2, 1.5, -.7), .5, .8); const cau = spot(sc, '#9FF3FF', 3.5, V3(0, .9, .3), V3(0, 3, 0), .95, .8, 256); cau.map = L.caustics(); const g2 = new THREE.PointLight('#2EC4B6', 2.5, 4, 1.2); g2.position.set(.5, .8, .6); sc.add(g2); return { sc, cam: L.cam(34), C, man }; },
    eyes() { const sc = base('#020406', .08); sc.environmentIntensity = .04; const C = cabinRoom(sc, 1.2); const man = actor(MAN + '@0,0,0:Treading_Water'); sc.add(man.root); const key = spot(sc, '#9FD8E0', 5, V3(-.7, 1.9, 1.2), V3(0, 1.75, 0), .3, .9, 512); const rim = new THREE.PointLight('#2EC4B6', 1.5, 3, 1.2); rim.position.set(.6, 1.6, -.6); sc.add(rim);
      return { sc, cam: L.cam(30), C, man, key, rim }; },
    divers() { const s = seabedScene(); s.d1 = diver(s.sc, DIV1 + '@-2,9,200:Treading_Water'); s.d2 = diver(s.sc, DIV2 + '@1.5,10,195:Treading_Water'); return s; },
    pass() { const s = B.cabin(); delete S.cabin; return s; },
    hand() { const sc = base('#04090D', .05); sc.environmentIntensity = .08; const C = cabinRoom(sc, 1.2); const man = actor(MAN + '@-.1,-.3,20:Reaching_Out'); sc.add(man.root); sc.add(new THREE.HemisphereLight('#3E6E78', '#020507', .35));
      const d = diver(sc, DIV1 + '@.35,.75,200:Treading_Water'); spot(sc, '#9FD8E0', 3, V3(-1, 2.2, 1.3), V3(0, 1.4, 0), .5, .8, 512); return { sc, cam: L.cam(34), C, man, d }; },
    alive() { const sc = base('#04090D', .05); sc.environmentIntensity = .08; const C = cabinRoom(sc, 1.2); const man = actor(MAN + '@-.2,-.5,30:Treading_Water'); sc.add(man.root); sc.add(new THREE.HemisphereLight('#3E6E78', '#020507', .35));
      const d = diver(sc, DIV1 + '@.25,.55,205:Treading_Water>Reacting@.3'); return { sc, cam: L.cam(34), C, man, d }; },
    bell() { const col = '#0C4A60', sc = base(col, .03); sc.add(new THREE.HemisphereLight('#9FE8F8', '#06202A', 1.3)); const sun = new THREE.DirectionalLight('#DDF8FF', 2.4); sun.position.set(4, 30, 6); sc.add(sun); const cau = spot(sc, '#FFFFFF', 3, V3(0, 30, 0), V3(0, 0, 0), .7, .7, 0); cau.map = L.caustics();
      const bell = new THREE.Group(), y = L.mat('#E0A62A', { rough: .4, metal: .3 }); const body = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.2, 2.0, 32), y); bell.add(body); const dome = new THREE.Mesh(new THREE.SphereGeometry(1.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), y); dome.position.y = 1; bell.add(dome);
      for (let i = 0; i < 3; i++) { const p = new THREE.Mesh(new THREE.CircleGeometry(.2, 24), L.mat('#FFF0C8', { emissive: '#FFE6B0', ei: 1.6 })); const a = i * 2.1; p.position.set(Math.sin(a) * 1.17, .3, Math.cos(a) * 1.17); p.lookAt(p.position.clone().multiplyScalar(2)); bell.add(p); const rim = new THREE.Mesh(new THREE.TorusGeometry(.22, .04, 8, 24), L.mat('#3A3A3A', { metal: .7, rough: .3 })); rim.position.copy(p.position); rim.lookAt(p.position.clone().multiplyScalar(2)); bell.add(rim); }
      [-1, 1].forEach(sd => { const f = new THREE.Mesh(new THREE.BoxGeometry(.12, 2.4, 2.4), L.mat('#2A3036', { rough: .6, metal: .5 })); f.position.set(sd * 1.25, .1, 0); bell.add(f); }); const cable = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, 40, 6), L.mat('#1A1A1A', { rough: .8 })); cable.position.y = 21.5; bell.add(cable);
      const hose = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([V3(.4, 1.8, 0), V3(.9, 6, .5), V3(.6, 14, 1.2), V3(1.2, 30, .8)]), 40, .06, 8), L.mat('#202020', { rough: .7 })); bell.add(hose);
      L.shadows(bell); sc.add(bell); const rays = L.rays(10, 6, 20, 30); sc.add(rays); const pts = L.particles(600, [30, 30, 30], 33, .07); pts.position.y = -10; sc.add(pts); const bub = L.particles(120, [2.2, 10, 2.2], 35, .09, '#E8FAFF'); sc.add(bub);
      return { sc, cam: L.cam(40), bell, rays, pts, bub }; },
    echo() { const sc = base('#0A0D10'); sc.environmentIntensity = .35; sc.add(new THREE.HemisphereLight('#FFE9CC', '#2A2420', .45)); const R = washroom(); R.P.position.set(0, 1.25, 0); R.lamp.intensity = 2.5; sc.add(R.P);
      const sunb = spot(sc, '#FFD9A0', 30, V3(4.5, 2.6, 1.2), V3(-1, .4, -.6), .35, .7, 1024); return { sc, cam: L.cam(40), R }; },
  };
  const get = v => S[v] || (S[v] = B[v]());

  // ---------------------------------------------------------------- per-frame direction
  const D = {
    flip(s, lt, k) { const R = s.R, rot = lt < 1.0 ? Math.sin(lt * 9) * .025 + lt * .1 : .1 + E.inOut(clamp((lt - 1.0) / 2.4)) * 1.85; R.P.rotation.z = rot; R.lamp.intensity = 6 * (lt > 1.4 ? (.55 + .45 * (Math.sin(lt * 37) > .2 ? 1 : .25)) : 1); R.tube.material.emissiveIntensity = R.lamp.intensity / 3;
      const fall = E.inOut(clamp((lt - 1.9) / 1.6)); s.man.root.position.set(lerp(-1.0, -.7, fall), lerp(0, -.6, fall), lerp(-1.3, -.6, fall)); s.man.root.rotation.y = lerp(0, .5, fall); s.man.at(lt);
      s.water.position.y = lerp(-.9, .55, E.inOut(clamp((lt - 1.3) / 3.2))); waves(s.water, lt, .06, 1.4); s.spray.material.opacity = .8 * clamp((lt - 1.2) * 2) * (1 - clamp((lt - 4) * .5)); L.drift(s.spray, lt, -1.2);
      L.look(s.cam, V3(.9 + Math.sin(lt * 1.3) * .03, 1.45 + Math.sin(lt * 1.9) * .025, 1.55), V3(-.85, .75, -1.2), 0); post(s, 2.6, { bloom: .2 }); L.present({ bloom: .05, grade: ['#B8E0E6', '#0A1418'], gradeA: .2 }); },
    night(s, lt, k) { const p = s.sea.geometry.attributes.position, b = s.sea.userData.base; for (let i = 0; i < p.count; i++) { const x = b[i * 3], z = b[i * 3 + 2]; p.setY(i, Math.sin(x * .12 + lt * .9) * .7 + Math.sin(z * .09 - lt * .7 + x * .03) * .9 + Math.sin(x * .5 + z * .4 + lt * 1.7) * .12); } p.needsUpdate = true; s.sea.geometry.computeVertexNormals();
      const roll = E.inOut(clamp((lt - .6) / 3.0)); s.T.rotation.set(roll * 2.7 + Math.sin(lt * .9) * .06, .5, Math.sin(lt * .7) * .04); s.T.position.set(0, Math.sin(lt * .9) * .4 - roll * 1.6, 0); s.spray.position.set(0, 0, 0); s.spray.material.opacity = .55 * clamp((lt - 1.4) * 1.5) * (1 - roll * .5); L.drift(s.spray, lt, .6);
      L.look(s.cam, V3(lerp(-16, -13, k), 2.4 + Math.sin(lt * .8) * .25, lerp(19, 16, k)), V3(0, 1.6, 0), Math.sin(lt * .6) * .02); post(s, 22, { ao: 0, bloom: .5, th: .8, ap: .0006 }); L.present({ bloom: .12, grade: ['#6A80C0', '#05070C'], gradeA: .25 }); },
    sink(s, lt, k, dur) { seaAt(s, lt); const f = E.out(clamp(lt / Math.max(1, dur * .7))); s.tug.position.y = lerp(17, 6.6, f); s.tug.rotation.set(0, .35 + (1 - f) * .2, Math.PI + .14 + (1 - f) * .15); const hit = clamp((lt - dur * .55) * 1.2); s.sand.material.opacity = .55 * hit * (1 - clamp((lt - dur) * .5)); s.sand.position.set(0, hit * .8, 0); s.sand.scale.set(1 + hit * .6, 1 + hit, 1 + hit * .6); L.drift(s.sand, lt, .15);
      L.look(s.cam, V3(lerp(-6, -4, k), lerp(16, 7, E.inOut(k)), lerp(30, 26, k)), V3(0, lerp(10, 5, E.inOut(k)), 0), .02); post(s, 26, { ao: 0, ap: .0005 }); L.present({ bloom: .25, grade: ['#2BC0C8', '#04121A'], gradeA: .28 });
      const u = U(); CT.sign('30 M', W * .72, H * .3, 40 * u, lt, .6, { bg: '#FFFFFF' }); },
    wreck(s, lt, k) { seaAt(s, lt); s.tug.position.y = 6.6; s.tug.rotation.set(0, .35, Math.PI + .14); s.sand.material.opacity = 0; L.look(s.cam, V3(lerp(18, 15, k), 4.5, lerp(-16, -12, k)), V3(0, 4.4, 0), -.01); post(s, 22, { ao: 0, ap: .0006 }); L.present({ bloom: .2, grade: ['#1E8C98', '#020A10'], gradeA: .35 }); },
    upside(s, lt, k) { L.causticsAt(lt); waves(s.water, lt, .02); L.drift(s.pts, lt, .02); s.man.root.position.y = -.35 + Math.sin(lt * 1.6) * .03; s.man.at(lt); L.look(s.cam, V3(lerp(1.1, .8, k), lerp(.95, 1.05, k), lerp(1.75, 1.35, k)), V3(-.55, 1.85, -.9), .02); post(s, 2.2); L.present({ bloom: .12, grade: ['#3FD0D6', '#02080C'], gradeA: .3 }); },
    corridor(s, lt, k, dur) { L.drift(s.pts, lt, .05); const x = lerp(3.5, -2.0, lt / Math.max(1, dur)); s.man.root.position.x = x; s.man.at(lt); s.glow.position.set(x - 1.2, 1.5, .4); L.look(s.cam, V3(x - 1.9, 1.25, .55), V3(x - .2, .7, -.05), -.03); post(s, 2.0, { bloom: .3 }); L.present({ bloom: .1, grade: ['#3FD0D6', '#010608'], gradeA: .32 }); },
    surface(s, lt, k) { L.causticsAt(lt); const C = s.C, up = E.out(clamp((lt - .5) / 1.3)); s.man.root.position.y = lerp(-1.25, -.25, up) + Math.sin(lt * 1.6) * .025; s.man.at(lt); waves(C.water, lt, .02 + .05 * clamp(1 - Math.abs(lt - 1.2))); s.splash.material.opacity = .9 * clamp(1 - Math.abs(lt - 1.3) * 1.5); s.splash.position.set(0, C.level - .1, -.2); L.drift(s.splash, lt, .5);
      const hd = s.man.head ? wpos(s.man.head) : V3(0, 1.6, 0); L.look(s.cam, V3(.35, C.level + .1, 1.0), V3(hd.x, C.level + .2, hd.z), 0); post(s, 1.0, { ap: .002 }); L.present({ bloom: .12, grade: ['#3FD0D6', '#02080C'], gradeA: .3 }); },
    cabin(s, lt, k) { L.causticsAt(lt); const C = s.C; waves(C.water, lt, .015); s.man.root.position.y = -.3 + Math.sin(lt * 1.6) * .025; s.man.at(lt); L.look(s.cam, V3(lerp(1.25, 1.05, k), 1.75, lerp(1.45, 1.3, k)), V3(-.3, 1.55, -.6), 0); post(s, 2.2); L.present({ bloom: .1, grade: ['#3FD0D6', '#02080C'], gradeA: .3 });
      const u = U(), a = proj(s.cam, V3(-1.35, C.level, -1.0)), b = proj(s.cam, V3(-1.35, C.h, -1.0)), e = E.out(clamp((lt - .5) / .8)); ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 4 * u; ctx.globalAlpha = e; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(a[0], lerp(a[1], b[1], e)); ctx.stroke(); [a, b].forEach(p => { ctx.beginPath(); ctx.moveTo(p[0] - 14 * u, p[1]); ctx.lineTo(p[0] + 14 * u, p[1]); ctx.stroke(); }); ctx.restore(); CT.sign('1.2 M', a[0] + 70 * u, (a[1] + b[1]) / 2, 34 * u, lt, .9, { bg: '#FFFFFF' }); },
    can(s, lt, k) { L.causticsAt(lt); const C = s.C; waves(C.water, lt, .012); s.man.root.position.y = -.25; s.man.at(lt); s.can.position.set(.05 + Math.sin(lt * .7) * .02, C.level + .012 + Math.sin(lt * 1.7) * .008, .55); s.can.rotation.y = lt * .15; s.can.rotation.x = Math.sin(lt * 1.3) * .08;
      L.look(s.cam, V3(lerp(.32, .26, k), C.level + .14, lerp(.92, .84, k)), V3(.05, C.level + .03, .55), .02); post(s, s.cam.position.distanceTo(s.can.position), { ap: .004, ao: 0 }); L.present({ bloom: .12, grade: ['#3FD0D6', '#02080C'], gradeA: .28 }); },
    waterline(s, lt, k) { L.causticsAt(lt); const C = s.C; C.water.position.y = C.level + lt * .012; waves(C.water, lt, .02, 1.6); s.man.root.position.y = -.3 + Math.sin(lt * 1.6) * .03; s.man.at(lt); L.look(s.cam, V3(lerp(1.2, .9, k), C.level + .09, 1.3), V3(-.2, C.level + .55, -.7), .03); post(s, 2.3, { ap: .002 }); L.present({ bloom: .1, grade: ['#3FD0D6', '#02080C'], gradeA: .3 }); },
    eyes(s, lt, k, dur) { const C = s.C; waves(C.water, lt, .01); s.man.root.position.y = -.3 + Math.sin(lt * 1.4) * .02; s.man.at(lt); const pulse = .55 + .45 * Math.cos(lt * 1.6); s.key.intensity = 5 * pulse; s.rim.intensity = 1.5 * (1.2 - pulse);
      const hd = s.man.head ? wpos(s.man.head).add(V3(0, .06, 0)) : V3(0, 1.75, 0); L.look(s.cam, hd.clone().add(V3(-.12, .02, .42)), hd, .02); post(s, .45, { ap: .003, ao: 0 }); L.present({ bloom: .08, grade: ['#3FD0D6', '#010406'], gradeA: .3 });
      const u = U(), h = Math.round(48 * E.inOut(clamp((lt - .3) / Math.max(1, dur - .8)))); CT.sign(h + ' H', W * .74, H * .28, 44 * u, lt, 0, { bg: '#FFC93C' }); },
    divers(s, lt, k) { seaAt(s, lt); s.tug.position.y = 6.6; s.tug.rotation.set(0, .35, Math.PI + .14); s.sand.material.opacity = 0; const dy = lerp(16, 11.5, E.out(clamp(lt / 4.5)));
      s.d1.a.root.position.set(-2.4, dy, 8); s.d2.a.root.position.set(1.6, dy + 1.4, 9.4); s.d1.upd(lt, 14, 7, .12); s.d2.upd(lt + .7, 14, 7, .12);
      L.look(s.cam, V3(lerp(-6, -4.5, k), lerp(11, 15, E.inOut(k)), lerp(20, 17, k)), V3(-.5, lerp(12, 11, k), 8), .01); post(s, 11, { ao: 0, ap: .0008, bloom: .4, th: .85 }); L.present({ bloom: .2, grade: ['#2BC0C8', '#03101A'], gradeA: .3 }); },
    pass(s, lt, k, dur) { L.causticsAt(lt); const C = s.C; waves(C.water, lt, .015); s.man.root.position.set(-.4, -.32 + Math.sin(lt * 1.6) * .02, -.6); s.man.root.rotation.y = .6; s.man.at(lt); const x = lerp(-2.2, 2.4, E.inOut(clamp((lt - .2) / Math.max(1, dur - .4))));
      s.lamp.position.set(x, C.level - .55, .7); s.lamp.target.position.set(x + .4, C.h, -.4); s.lamp.intensity = 10; s.blob.position.set(x, C.level - .25, .6); s.blob.material.opacity = .55;
      const az = lerp(-.25, .25, k); L.look(s.cam, V3(Math.sin(az) * 2.0 + .1, 1.7, Math.cos(az) * 2.0 - .4), V3(-.2, 1.45, -.4), 0); post(s, 2.0); L.present({ bloom: .15, grade: ['#3FD0D6', '#02080C'], gradeA: .3 }); },
    hand(s, lt, k) { L.causticsAt(lt); const C = s.C; waves(C.water, lt, .03); s.man.root.position.y = -.35; s.man.at(lt); const rise = E.out(clamp(lt / 1.3)); s.d.a.root.position.y = lerp(-1.9, -1.15, rise); s.d.upd(lt, 9 * rise + 2, 2.5, .08 * rise);
      const hb = bone(s.man, /RightHand$/i), hp = hb ? wpos(hb) : V3(0, 1.3, .5); L.look(s.cam, hp.clone().add(V3(-.75, .25, .55)), hp, -.03); post(s, .95, { ap: .002 }); L.present({ bloom: .15, grade: ['#3FD0D6', '#02080C'], gradeA: .3 }); },
    alive(s, lt, k) { L.causticsAt(lt); const C = s.C; waves(C.water, lt, .035); s.man.root.position.y = -.3; s.man.at(lt); s.d.a.root.position.y = lerp(-1.1, -1.25, E.out(clamp((lt - .3) / .5))); const hp = s.d.upd(lt, 12, 2.2, .1);
      const mh = s.man.head ? wpos(s.man.head) : V3(-.2, 1.6, -.5); s.d.light.target.position.copy(mh); L.look(s.cam, hp.clone().add(V3(.35, .12, .45)).lerp(hp.clone().add(V3(.3, .1, .4)), k), mh.clone().lerp(hp, .35), .02); post(s, s.cam.position.distanceTo(mh), { ap: .0015 }); L.present({ bloom: .18, grade: ['#3FD0D6', '#02080C'], gradeA: .28 }); },
    bell(s, lt, k) { L.causticsAt(lt); L.sway(s.rays, lt); L.drift(s.pts, lt, .1); s.bell.position.y = lerp(-2, 4, k); s.bell.rotation.y = lt * .05; s.bub.position.copy(s.bell.position).add(V3(0, 2, 0)); L.drift(s.bub, lt, 1.4);
      L.look(s.cam, V3(lerp(5.5, 4.8, k), lerp(-4, -2.5, k), 7), s.bell.position.clone().add(V3(0, 1.2, 0)), .03); post(s, 8.5, { ao: 0, ap: .0008 }); L.present({ bloom: .3, grade: ['#5FD8E8', '#04182A'], gradeA: .25 }); },
    echo(s, lt, k) { const R = s.R; R.door.rotation.y = lerp(-1.25, -.02, E.inOut(clamp((lt - .6) / 1.8))); L.look(s.cam, V3(lerp(1.5, 1.1, k), 1.45, lerp(1.6, 1.25, k)), V3(-.6, .9, -1.2), 0); post(s, 2.4, { bloom: .3 }); L.present({ bloom: .1, grade: ['#FFD9A0', '#20140C'], gradeA: .22 }); },
  };

  A.x3_cook = (o, c, dur) => { const v = o.v || 'flip'; return { sfx: [], draw: lt => { CT.begin({}, lt); L.renderer(); const s = get(v), k = E.inOut(clamp(lt / Math.max(1, dur))); D[v](s, lt, k, dur); CT.end({}, lt, 1, .3); } }; };
})();
