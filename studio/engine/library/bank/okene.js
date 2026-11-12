/* Style test (owner, 12 Nov 2026): the house 3D look on a true micro-story — Harrison Okene, the cook who lived ~62 hours in
   an air pocket of the capsized tug Jascon-4, 30 m down off Nigeria (May 2013). Acts: x3_okene v=wreck | pocket | hand.
   The figure is an anonymous house figure, not a likeness. */
'use strict';
(function () {
  if (!window.IFM || !IFM.L3 || !IFM.CT) return;
  const A = IFM.ACT, L = IFM.L3, CT = IFM.CT, V3 = (x, y, z) => new THREE.Vector3(x, y, z), S = {};
  // ---------------------------------------------------------------- the wreck on the seabed
  function wreck() { if (S.wreck) return S.wreck; const sc = new THREE.Scene(), col = '#0B3A48'; sc.background = new THREE.Color(col); sc.fog = new THREE.FogExp2(col, .02);
    sc.add(new THREE.HemisphereLight('#8FE3F0', '#06202A', 1.3)); const sun = new THREE.DirectionalLight('#CFF6FF', 2.2); sun.position.set(6, 30, 8); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, { left: -18, right: 18, top: 18, bottom: -18, near: 1, far: 70 }); sun.shadow.bias = -.0015; sc.add(sun);
    const cau = new THREE.SpotLight('#FFFFFF', 5, 0, .75, .7, 0); cau.position.set(-2, 26, 2); cau.target.position.set(0, 0, 0); cau.map = L.caustics(); cau.castShadow = true; cau.shadow.mapSize.set(512, 512); sc.add(cau, cau.target);
    sc.add(L.seabed({ col: '#B3A27C' })); const tug = L.tug(); tug.rotation.set(0, .35, Math.PI + .14); tug.position.set(0, 6.6, 0); sc.add(tug);
    [[-9, 6, 1.4], [8, -5, 1.1], [-5, -9, .8], [11, 7, 1.6], [3, 9, .7], [-13, -2, 1]].forEach(([x, z, s], i) => { const r = L.rock(i + 3, s); r.position.set(x, s * .3, z); sc.add(r); });
    const weed = new THREE.Group(); for (let i = 0; i < 18; i++) { const r = L.rnd(i + 11), x = (r() - .5) * 30, z = (r() - .5) * 26, h = 1 + r() * 2.2, pts = [V3(0, 0, 0), V3((r() - .5) * .4, h * .35, 0), V3((r() - .5) * .6, h * .7, (r() - .5) * .3), V3((r() - .5) * .7, h, 0)]; const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 12, .06 + r() * .05, 6), L.mat(r() < .5 ? '#2E7D4F' : '#4E8F3A', { rough: .8 })); m.position.set(x, 0, z); m.userData.ph = r() * 6; weed.add(m); } sc.add(weed);
    const fish = L.fishSchool(36, 5); sc.add(fish); const pts = L.particles(700, [40, 18, 40], 9, .07); pts.position.set(0, 0, 0); sc.add(pts); const rays = L.rays(9, 4, 26, 24); sc.add(rays);
    return (S.wreck = { sc, cam: L.cam(36), weed, fish, pts, rays }); }
  // ---------------------------------------------------------------- inside: the upside-down washroom, water to the chest, the air pocket
  function pocket() { if (S.pocket) return S.pocket; const sc = new THREE.Scene(), col = '#04090D'; sc.background = new THREE.Color(col); sc.fog = new THREE.FogExp2(col, .09);
    const room = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.0, 4.2), L.mat('#3B4A4E', { rough: .92, side: THREE.BackSide })); room.position.y = 1.5; room.receiveShadow = true; sc.add(room);
    const tiles = L.canvasTex(256, 256, (g, w) => { g.fillStyle = '#D8D0C0'; g.fillRect(0, 0, w, w); g.strokeStyle = '#9A9080'; g.lineWidth = 4; for (let i = 0; i <= 8; i++) { g.beginPath(); g.moveTo(i * w / 8, 0); g.lineTo(i * w / 8, w); g.stroke(); g.beginPath(); g.moveTo(0, i * w / 8); g.lineTo(w, i * w / 8); g.stroke(); } }); tiles.wrapS = tiles.wrapT = THREE.RepeatWrapping; tiles.repeat.set(1.2, 1.2);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2), new THREE.MeshStandardMaterial({ map: tiles, roughness: .7, color: '#B8B0A0' })); ceil.rotation.x = Math.PI / 2; ceil.position.y = 2.99; ceil.receiveShadow = true; sc.add(ceil);
    // the old floor is now the ceiling: an upside-down toilet and basin hang from it
    const wc = new THREE.Group(); const bowl = new THREE.Mesh(new THREE.CylinderGeometry(.24, .18, .4, 20), L.mat('#E8E6E0', { rough: .25 })); bowl.position.y = -.2; wc.add(bowl); const tank = new THREE.Mesh(new THREE.BoxGeometry(.5, .45, .2), L.mat('#E8E6E0', { rough: .25 })); tank.position.set(0, -.25, -.28); wc.add(tank); wc.position.set(-1.2, 2.99, -1.3); wc.rotation.x = Math.PI; sc.add(L.shadows(wc));
    const sink = new THREE.Mesh(new THREE.BoxGeometry(.6, .18, .45), L.mat('#E8E6E0', { rough: .25 })); sink.position.set(1.3, 2.75, -1.75); sc.add(L.shadows(sink));
    for (let i = 0; i < 3; i++) { const p = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, 4.2, 10), L.mat('#6A5A44', { rough: .5, metal: .5 })); p.rotation.z = Math.PI / 2; p.position.set(0, .6 + i * .35, -2.05); sc.add(L.shadows(p)); }
    const door = new THREE.Mesh(new THREE.BoxGeometry(.9, 1.9, .08), L.mat('#55646A', { rough: .6, metal: .3 })); door.position.set(1.2, 1.9, -2.06); sc.add(door);
    // water
    const wg = new THREE.PlaneGeometry(4.2, 4.2, 40, 40); wg.rotateX(-Math.PI / 2); const water = new THREE.Mesh(wg, new THREE.MeshStandardMaterial({ color: '#0E4650', roughness: .08, metalness: .25, transparent: true, opacity: .84 })); water.position.y = 1.32; water.receiveShadow = true; sc.add(water); water.userData.base = wg.attributes.position.array.slice();
    const under = new THREE.Mesh(new THREE.BoxGeometry(4.18, 1.3, 4.18), new THREE.MeshBasicMaterial({ color: '#06262C', transparent: true, opacity: .55, side: THREE.BackSide, depthWrite: false })); under.position.y = .65; sc.add(under);
    // the man (house figure, anonymous): standing on the old ceiling, water to his chest, hands on the new one
    const man = L.figure({ skin: '#6B4228', top: '#E9E4D8', bottom: '#3A4A66', hair: '#141014' }); man.root.position.set(0, 0, 0); sc.add(man.root);
    const diver = L.figure({ skin: '#1C1F24', top: '#1C1F24', bottom: '#1C1F24', legs: '#1C1F24', sleeves: true, gloves: '#2A2D33', helmet: '#D9A52E', hairStyle: 'none' }); diver.root.position.set(1.35, -1.05, -.25); diver.root.rotation.y = -Math.PI * .6; sc.add(diver.root);
    // light: a cold glow through the water, a soft key on his face, caustic ripples thrown up onto the ceiling
    sc.add(new THREE.HemisphereLight('#4A7C88', '#020507', .5)); const rim = new THREE.DirectionalLight('#7FE0EA', 1.6); rim.position.set(1.5, 3.5, -3); sc.add(rim); const key = new THREE.SpotLight('#D6EEF2', 8, 0, .5, .8, 0); key.position.set(-1.6, 2.6, 2.6); key.target.position.set(0, 1.7, 0); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); sc.add(key, key.target);
    const glow = new THREE.PointLight('#2EC4B6', 2.2, 6, 0); glow.position.set(.4, .7, .9); sc.add(glow);
    const cau = new THREE.SpotLight('#9FF3FF', 3.2, 0, .9, .8, 0); cau.position.set(0, 1.0, .4); cau.target.position.set(0, 3, 0); cau.map = L.caustics(); cau.castShadow = true; cau.shadow.mapSize.set(256, 256); sc.add(cau, cau.target);
    const lamp = new THREE.SpotLight('#FFF1CC', 0, 0, .32, .55, 0); lamp.castShadow = false; sc.add(lamp, lamp.target);
    const beam = new THREE.Mesh(new THREE.ConeGeometry(.55, 3.2, 24, 1, true), new THREE.MeshBasicMaterial({ color: '#FFF3D0', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); sc.add(beam);
    const pts = L.particles(260, [4, 1.6, 4], 21, .025, '#BDEFFF'); pts.position.set(0, 1.35, 0); sc.add(pts);
    return (S.pocket = { sc, cam: L.cam(34), water, man, diver, lamp, beam, pts }); }
  const waves = (w, lt, amp = .025) => { const p = w.geometry.attributes.position, b = w.userData.base; for (let i = 0; i < p.count; i++) { const x = b[i * 3], z = b[i * 3 + 2]; p.setY(i, Math.sin(x * 3 + lt * 1.6) * amp + Math.cos(z * 2.6 - lt * 1.2) * amp * .8); } p.needsUpdate = true; w.geometry.computeVertexNormals(); };
  // poses
  const P = { hang: { shA: [0, 0, 0], shB: [0, 0, 0], elA: [0, 0, 0], elB: [0, 0, 0] },
    ceiling: { shA: [.1, 0, -(Math.PI - .45)], shB: [.1, 0, Math.PI - .45], elA: [0, 0, -.35], elB: [0, 0, .35], neck: [-.25, 0, 0], head: [-.35, 0, 0], mouth: .35, brows: .6, spine: [.04, 0, 0] },
    look: { shA: [.2, 0, -(Math.PI - .7)], shB: [-.5, 0, .5], elA: [0, 0, -.5], elB: [-.6, 0, 0], neck: [.1, .2, 0], head: [.12, .25, 0], mouth: .55, brows: .8 },
    reach: { shA: [.2, 0, -(Math.PI - .7)], shB: [-1.25, 0, .25], elB: [-.35, 0, 0], neck: [.15, .15, 0], head: [.2, .2, 0], mouth: .9, brows: 1 } };
  const DV = { rise: { shB: [-1.45, 0, -.15], elB: [-.2, 0, 0], neck: [.25, 0, 0], head: [.1, 0, 0] } };

  A.x3_okene = (o, c, dur) => { const v = o.v || 'wreck'; return { sfx: [], draw: lt => { CT.begin({}, lt); const r = L.renderer(); L.causticsAt(lt);
    if (v === 'wreck') { const s = wreck(), k = clamp(lt / Math.max(1, dur)); s.weed.children.forEach(m => { m.rotation.z = Math.sin(lt * .8 + m.userData.ph) * .12; m.rotation.x = Math.cos(lt * .6 + m.userData.ph) * .08; }); L.swim(s.fish, lt, V3(-3, 7, 2), 9); L.drift(s.pts, lt, .12); L.sway(s.rays, lt);
      L.look(s.cam, V3(lerp(-4, -2, k), lerp(3, 3.6, k), lerp(25, 21, k)), V3(0, lerp(4.2, 4.6, k), 0), .02); r.render(s.sc, s.cam); L.present({ bloom: .3, grade: ['#2BC0C8', '#04121A'], gradeA: .28 }); }
    else { const s = pocket(), hand = v === 'hand', k = clamp(lt / Math.max(1, dur)); waves(s.water, lt, hand ? .035 : .02); L.drift(s.pts, lt, .02);
      const mp = hand ? L.keys([[0, P.look], [1.6, P.reach]], lt) : L.keys([[0, P.ceiling], [2.5, { ...P.ceiling, head: [-.15, .25, 0], mouth: .15 }], [5, P.ceiling]], lt); mp.spine = [.04 + Math.sin(lt * 2) * .02, 0, 0]; s.man.pose(mp); s.man.root.position.y = .05 + Math.sin(lt * 1.6) * .015;
      s.diver.root.visible = hand; if (hand) { const rise = E.out(clamp(lt / 1.4)); s.diver.root.position.y = lerp(-1.2, -.18, rise); s.diver.pose(DV.rise); s.diver.head.updateWorldMatrix(true, true);
        const lp = new THREE.Vector3(.16, .44, .23).applyMatrix4(s.diver.head.matrixWorld), lf = new THREE.Vector3(.18, .2, 2.2).applyMatrix4(s.diver.head.matrixWorld); s.lamp.position.copy(lp); s.lamp.target.position.copy(lf); s.lamp.intensity = 9 * rise;
        s.beam.position.copy(lp.clone().lerp(lf, .5)); s.beam.lookAt(lf); s.beam.rotateX(-Math.PI / 2); s.beam.material.opacity = .12 * rise; }
      else { s.lamp.intensity = 0; s.beam.material.opacity = 0; }
      if (hand) L.look(s.cam, V3(lerp(-1.25, -1.05, k), 1.7, lerp(2.7, 2.45, k)), V3(.55, 1.6, .25), -.03); else L.look(s.cam, V3(lerp(.25, .05, k), lerp(1.45, 1.55, k), lerp(2.75, 2.25, k)), V3(0, 1.95, 0), .015);
      if (!s.sc.environment && L.envRoom) { s.sc.environment = L.envRoom(); s.sc.environmentIntensity = .08; } if (L.renderPost && window.L3_POST) L.renderPost(s, { ao: { radius: .35, samples: 8 }, dof: { focus: s.cam.position.distanceTo(V3(0, 1.85, 0)), aperture: .0015, maxblur: .006 }, bloom: { strength: .22, radius: .5, threshold: .92 } }); else r.render(s.sc, s.cam); L.present({ bloom: .12, grade: ['#3FD0D6', '#02080C'], gradeA: .3 }); }
    if (v === 'pocket' && IFM.BU && IFM.BU.gauge) { const u = U(), t = clamp(lt / Math.max(1, dur)); IFM.BU.gauge(W * .8, H * .2, W * .1, lerp(.62, .48, t), lt, { label: 'O₂', col: '#2EC4B6', }); IFM.BU.gauge(W * .8, H * .37, W * .1, lerp(.08, .32, t), lt, { label: 'CO₂', col: '#FF6B5B', red: 'high'}); }
    CT.end({}, lt, 1, .34); } }; };
})();
