/* L3 shot grammar — a whole clip is written as shots in the story, no code per clip (owner, 12 Nov 2026: "build everything,
   then 'làm tập' just works"). One beat = one shot:

   # vis kind=w act=l3 set=<preset> env=hdr/<id> cam=<SIZE>.<angle>.<move> on=<actor|prop|x,y,z>
         actors="a=glb/<id>@x,z,rotDeg:Clip1>Clip2@2.5>Clip3@4|b=vinyl/okene@x,z,rot:pose"
         props="glb/<id>@x,y,z,rotDeg,scale|model:food/apple@x,y,z,rot,scale"
         fx="rays dust rain bubbles snow fog=0.03" light=<preset> grade=<preset> post="dof ao bloom"
         ov="tag:30 M@.7,.3|gauge:O2:.62>.48@.8,.22|count:0>133:M@.5,.3|quarter@.5,.4" look=<x,y,z|actor>

   SIZE  EWS WS MS MCU CU ECU (frames the subject: the "on" actor's whole body, waist, chest, face …)
   angle eye high low top dutch ots   move static push pull orbit trackL trackR crane drop handheld
   Clips are the glTF animation names (see `python3 tools/assets3d.py list` and L3.clips(id)); vinyl = the house toy figure.  */
'use strict';
(function () {
  if (typeof THREE === 'undefined' || !window.IFM || !IFM.L3 || !IFM.ACT) return;
  const L = IFM.L3, A = IFM.ACT, CT = IFM.CT, V3 = (x, y, z) => new THREE.Vector3(x, y, z), X = window.THREE_X;
  const num = (s, d = 0) => { const v = parseFloat(s); return isNaN(v) ? d : v; };
  // ---------------------------------------------------------------- actors: glTF people with deterministic animation (any lt, any order)
  const findBone = (root, rx) => { let b = null; root.traverse(o => { if (!b && o.isBone && rx.test(o.name)) b = o; }); return b; };
  L.actor = (spec, seed = 0) => { const m = String(spec).match(/^([a-z]+\/[a-z0-9_\-]+)(?:@([^:]*))?(?::(.*))?$/i); if (!m) return null; const [, id, at = '', anim = ''] = m, p = at.split(',').map(Number);
    let root, mixer = null, clips = {}, kind = 'glb', F = null;
    if (id.startsWith('vinyl/')) { F = L.figure(L.CAST && L.CAST[id.slice(6)] || {}); root = F.root; kind = 'vinyl'; }
    else { const a = L.A[id]; if (!a) { F = L.figure({}); root = F.root; kind = 'vinyl'; console.warn('L3 actor fallback (asset not loaded): ' + id); }
      else { root = X.SkeletonUtils.clone(a.gltf.scene); root.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; [].concat(o.material || []).forEach(m => { if (m.envMapIntensity != null) m.envMapIntensity = 1; if (m.map && (m.transparent || m.alphaTest > 0 || /hair|brow|lash|eyebrow|eyelash|teeth|tongue/i.test((m.name || '') + ' ' + (o.name || '')))) { m.alphaTest = .5; m.transparent = false; m.depthWrite = true; m.side = THREE.DoubleSide; m.needsUpdate = true; } }); } }); mixer = new THREE.AnimationMixer(root); clips = Object.assign({}, ...L.ANIMLIBS.map(k => (L.A[k] && L.A[k].clips) || {}), a.clips); } }
    root.position.set(p[0] || 0, p[3] || 0, p[1] || 0); root.rotation.y = (p[2] || 0) * Math.PI / 180;
    const keys = String(anim).split('>').filter(Boolean).map((k, i) => { const [n, t] = k.split('@'); return [i ? num(t, i * 2) : 0, n]; });
    const acts = {}; const act = n => acts[n] || (acts[n] = (() => { const c = clips[n] || Object.values(clips).find(x => x.name.toLowerCase() === String(n).toLowerCase()); if (!c) return null; const a = mixer.clipAction(c); a.play(); a.setEffectiveWeight(0); return a; })());
    const head = kind === 'glb' ? findBone(root, /head$/i) || findBone(root, /head/i) : null;
    return { id, kind, root, F, keys, clips, head,
      at(lt, look) { if (kind === 'glb' && mixer) { Object.values(acts).forEach(a => a && a.setEffectiveWeight(0)); let i = 0; while (i < keys.length - 1 && lt >= keys[i + 1][0]) i++; const cur = keys[i], prev = keys[i - 1], fade = .45, w = prev ? clamp((lt - cur[0]) / fade) : 1;
          const A1 = act(cur[1]); if (A1) { A1.time = Math.max(0, lt - cur[0]); A1.setEffectiveWeight(w); } if (prev && w < 1) { const A0 = act(prev[1]); if (A0) { A0.time = Math.max(0, lt - prev[0]); A0.setEffectiveWeight(1 - w); } } mixer.update(0);
          if (look && head) { const q0 = head.quaternion.clone(); head.lookAt(look); const q1 = head.quaternion.clone(); head.quaternion.copy(q0).slerp(q1, .55); } }
        else if (F && keys.length) { const pz = L.POSES && L.POSES[keys[0][1]]; if (pz) F.pose(pz); } },
      box() { root.updateMatrixWorld(true); if (head) { const hp = head.getWorldPosition(V3()), b = new THREE.Box3(); b.expandByPoint(V3(root.position.x - .25, root.position.y, root.position.z - .25)); b.expandByPoint(V3(hp.x + .25, hp.y + .14, hp.z + .25)); return b; } return new THREE.Box3().setFromObject(root); } }; };
  L.ANIMLIBS = ['glb/quaternius_animations_mixamo_rig', 'glb/mixamo_animations_mixamo_rig'];   // shared clip libraries (Muse's library: one mixamo skeleton)
  L.clips = id => Object.keys(Object.assign({}, ...L.ANIMLIBS.map(k => (L.A[k] && L.A[k].clips) || {}), (L.A[id] && L.A[id].clips) || {}));
  L.POSES = L.POSES || {};
  // ---------------------------------------------------------------- sets (presets): build(sc, o) adds ground/rooms/fx; assets listed for preload
  const SETS = L.SETS; const tex = (id, rep, fb) => L.pbr(id, { repeat: rep, fallback: fb });
  SETS.studio = { build(sc, o) { const g = new THREE.Mesh(new THREE.CircleGeometry(30, 64), L.mat(o.floor || '#8C8A86', { rough: .6 })); g.rotation.x = -Math.PI / 2; g.receiveShadow = true; sc.add(g); } };
  SETS.outdoor = { build(sc, o) { const g = new THREE.Mesh(new THREE.PlaneGeometry(400, 400, 1, 1), o.ground ? tex(o.ground, 80, '#7A6A55') : L.mat(o.floor || '#7A6A55', { rough: .95 })); g.rotation.x = -Math.PI / 2; g.receiveShadow = true; sc.add(g); } };
  SETS.room = { build(sc, o) { const w = num(o.w, 5), d = num(o.d, 5), h = num(o.h, 2.8), wall = o.wall ? tex(o.wall, 2, '#C9C1B2') : L.mat(o.wallc || '#C9C1B2', { rough: .9 }), floor = o.ground ? tex(o.ground, 3, '#8A6A4A') : L.mat(o.floorc || '#8A6A4A', { rough: .7 });
      const mk = (geo, mat, pos, rot) => { const m = new THREE.Mesh(geo, mat); m.position.copy(pos); if (rot) m.rotation.set(...rot); m.receiveShadow = true; m.castShadow = true; sc.add(m); return m; };
      mk(new THREE.PlaneGeometry(w, d), floor, V3(0, 0, 0), [-Math.PI / 2, 0, 0]); mk(new THREE.PlaneGeometry(w, d), wall, V3(0, h, 0), [Math.PI / 2, 0, 0]); mk(new THREE.PlaneGeometry(w, h), wall, V3(0, h / 2, -d / 2)); mk(new THREE.PlaneGeometry(d, h), wall, V3(-w / 2, h / 2, 0), [0, Math.PI / 2, 0]); mk(new THREE.PlaneGeometry(d, h), wall, V3(w / 2, h / 2, 0), [0, -Math.PI / 2, 0]);
      if (o.window) { const win = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.2), new THREE.MeshBasicMaterial({ color: '#FFF4DA' })); win.position.set(-w / 2 + .01, h * .55, -d * .15); win.rotation.y = Math.PI / 2; sc.add(win); } } };
  SETS.seabed = { build(sc, o) { sc.add(L.seabed({ col: o.floorc || '#B3A27C' })); const r = L.rnd(3); for (let i = 0; i < 10; i++) { const k = L.rock(i + 9, .5 + r() * 1.4); k.position.set((r() - .5) * 40, 0, (r() - .5) * 40); sc.add(k); } } };
  SETS.xray = { build(sc) { const grid = new THREE.GridHelper(40, 80, '#1E5A8C', '#12385C'); grid.material.transparent = true; grid.material.opacity = .45; sc.add(grid); } };
  // ---------------------------------------------------------------- light and grade presets
  const LIGHTS = L.LIGHTS = {
    day: sc => { const s = new THREE.DirectionalLight('#FFF1DC', 2.6); s.position.set(-8, 14, 6); return [s]; },
    golden: sc => { const s = new THREE.DirectionalLight('#FFC58A', 3.2); s.position.set(-12, 5, -6); return [s]; },
    overcast: sc => { const s = new THREE.DirectionalLight('#E8EEF4', 1.2); s.position.set(2, 12, 4); return [s]; },
    night: sc => { const s = new THREE.DirectionalLight('#8FA8FF', .7); s.position.set(6, 10, -4); const p = new THREE.PointLight('#FFB36B', 6, 9, 1.4); p.position.set(-2, 2.6, 2); return [s, p]; },
    interior: sc => { const s = new THREE.PointLight('#FFE0B8', 9, 10, 1.4); s.position.set(.5, 2.4, .8); const k = new THREE.DirectionalLight('#FFF6E8', 1.2); k.position.set(-3, 4, 3); return [s, k]; },
    lamp: sc => { const s = new THREE.PointLight('#FFB36B', 10, 8, 1.5); s.position.set(-1.6, 1.8, .4); return [s]; },
    underwater: sc => { const s = new THREE.DirectionalLight('#CFF6FF', 2.2); s.position.set(6, 30, 8); const c = new THREE.SpotLight('#FFFFFF', 5, 0, .75, .7, 0); c.position.set(-2, 26, 2); c.map = L.caustics(); c.castShadow = true; c.shadow.mapSize.set(512, 512); sc.add(c.target); return [s, c]; },
    dark: sc => { const k = new THREE.SpotLight('#D6EEF2', 8, 0, .5, .8, 0); k.position.set(-1.6, 2.6, 2.6); return [k]; } };
  const GRADES = L.GRADES = { neutral: null, teal: ['#2BC0C8', '#04121A'], warm: ['#FFB36B', '#2A1408'], golden: ['#FFB47A', '#4A2A50'], night: ['#8A5CFF', '#05040F'], cold: ['#9FD3FF', '#06142A'], clinic: ['#7FD3FF', '#020814'] };
  const FOG = { underwater: ['#0B3A48', .03], night: ['#1E1640', .02], dark: ['#04090D', .08], lamp: ['#120B07', .05] };
  // ---------------------------------------------------------------- camera: SIZE.angle.move around a subject
  const SZ = { EWS: 9, WS: 4.2, MS: 2.2, MCU: 1.25, CU: .7, ECU: .35 }, ANG = { eye: [0, 0], high: [.55, 0], low: [-.35, 0], top: [1.35, 0], dutch: [.05, .18], ots: [.1, 0] };
  function camAt(S, o, lt, dur) { const [size = 'MS', ang = 'eye', mv = 'static'] = String(o.cam || 'MS.eye.static').split('.'), k = E.inOut(clamp(lt / Math.max(1, dur)));
    let tgt; const on = o.on || 'a'; if (S.actors[on]) { const b = S.actors[on].box(), h = b.max.y - b.min.y, c = b.getCenter(V3()); const fy = { EWS: .5, WS: .5, MS: .7, MCU: .82, CU: .9, ECU: .92 }[size] || .6; tgt = V3(c.x, b.min.y + h * fy, c.z); }
    else if (/^-?[\d.]+,/.test(on)) { const p = on.split(',').map(Number); tgt = V3(p[0], p[1], p[2]); } else tgt = V3(0, 1.4, 0);
    let dist = (SZ[size] || 2.2) * (/^[A-Z]/.test(size) ? 1 : 1) * num(o.zoom, 1), [el, roll] = ANG[ang] || ANG.eye, az = num(o.az, 20) * Math.PI / 180;
    if (mv === 'push') dist *= lerp(1.25, .85, k); if (mv === 'pull') dist *= lerp(.85, 1.3, k); if (mv === 'orbit') az += lerp(-.35, .35, k); if (mv === 'trackL') az += lerp(.3, -.3, k); if (mv === 'trackR') az += lerp(-.3, .3, k); if (mv === 'crane') el += lerp(-.2, .35, k); if (mv === 'drop') el += lerp(.4, -.1, k);
    const pos = V3(tgt.x + Math.sin(az) * Math.cos(el) * dist, tgt.y + Math.sin(el) * dist, tgt.z + Math.cos(az) * Math.cos(el) * dist);
    if (mv === 'handheld') { pos.x += Math.sin(lt * 1.3) * .02 * dist; pos.y += Math.sin(lt * 1.7 + 1) * .015 * dist; }
    S.cam.fov = num(o.fov, 34); L.look(S.cam, pos, tgt, roll + (mv === 'handheld' ? Math.sin(lt * .9) * .01 : 0)); return tgt; }
  // ---------------------------------------------------------------- build a shot scene (cached per beat)
  const CACHE = {}; function build(o) { const key = JSON.stringify(o); if (CACHE[key]) return CACHE[key]; const sc = new THREE.Scene(), S = { sc, cam: L.cam(34), actors: {}, props: [], fx: {} };
    const env = o.env && L.A[o.env] ? L.env(o.env) : (L.envRoom ? L.envRoom() : null); sc.environment = env; sc.environmentIntensity = num(o.envk, 1);
    if (o.env && L.A[o.env] && o.bg !== 'none') { sc.background = L.A[o.env].tex; sc.backgroundIntensity = num(o.bgk, 1); sc.backgroundBlurriness = num(o.blur, 0); } else sc.background = new THREE.Color(o.bgc || (FOG[o.light] || ['#20242C'])[0]);
    const fg = o.fog ? [o.fogc || (FOG[o.light] || ['#20242C'])[0], num(o.fog, .02)] : FOG[o.light]; if (fg) sc.fog = new THREE.FogExp2(fg[0], fg[1]);
    (SETS[o.set] || SETS.studio).build(sc, o);
    (LIGHTS[o.light] || LIGHTS.day)(sc).forEach(l => { if (l.castShadow !== false && (l.isDirectionalLight || l.isSpotLight)) { l.castShadow = true; l.shadow.mapSize.set(2048, 2048); l.shadow.bias = -.0008; l.shadow.normalBias = .02; if (l.isDirectionalLight) Object.assign(l.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: .5, far: 80 }); } sc.add(l); });
    String(o.actors || '').split('|').filter(Boolean).forEach((s, i) => { const [nm, spec] = s.includes('=') ? s.split(/=(.*)/s) : ['a', s]; const a = L.actor(spec, i); if (a) { S.actors[nm] = a; sc.add(a.root); } });
    String(o.props || '').split('|').filter(Boolean).forEach(s => { const [id, at = ''] = s.split('@'), p = at.split(',').map(Number); let m = null; if (id.startsWith('proc:')) { const k = id.slice(5); m = k === 'tug' ? L.tug() : k === 'rock' ? L.rock(7, 1) : null; if (m && k === 'tug' && /flip/.test(at)) m.rotation.z = Math.PI + .14; } else if (id.startsWith('model:')) m = IFM.model && IFM.model(id.slice(6)); else if (L.A[id]) m = X.SkeletonUtils.clone(L.A[id].gltf.scene); if (!m) return; m.position.set(p[0] || 0, p[1] || 0, p[2] || 0); m.rotation.y = (p[3] || 0) * Math.PI / 180; if (p[4]) m.scale.setScalar(p[4]); L.shadows(m); sc.add(m); S.props.push(m); });
    const fx = String(o.fx || ''); if (/dust|bubbles|snow/.test(fx)) { S.fx.pts = L.particles(/snow/.test(fx) ? 1500 : 600, [24, 10, 24], 7, /snow/.test(fx) ? .05 : .035, /bubbles/.test(fx) ? '#DDF6FF' : '#FFF1D8'); sc.add(S.fx.pts); }
    if (/rays/.test(fx)) { S.fx.rays = L.rays(8, 5, 18, 16, o.rayc || '#FFF3D6', .14); sc.add(S.fx.rays); }
    if (/rain/.test(fx)) { const g = new THREE.BufferGeometry(), n = 1600, a = new Float32Array(n * 6), r = L.rnd(4); for (let i = 0; i < n; i++) { const x = (r() - .5) * 20, y = r() * 12, z = (r() - .5) * 20; a.set([x, y, z, x - .04, y - .45, z], i * 6); } g.setAttribute('position', new THREE.BufferAttribute(a, 3)); S.fx.rain = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: '#B8C8FF', transparent: true, opacity: .35 })); sc.add(S.fx.rain); }
    return (CACHE[key] = S); }
  // ---------------------------------------------------------------- 2D overlays (minimal, house look)
  function overlays(o, lt, dur) { const u = U(); String(o.ov || '').split('|').filter(Boolean).forEach((s, i) => { const [body, at = '.5,.3'] = s.split('@'), [x, y] = at.split(',').map(Number), [kind, ...rest] = body.split(':'), t0 = .3 + i * .4;
      if (kind === 'tag') CT.sign(rest.join(':'), W * x, H * y, 34 * u, lt, t0, { bg: '#FFFFFF' });
      if (kind === 'gauge' && IFM.BU && IFM.BU.gauge) { const [lb, rng = '.6>.4'] = rest, [a, b] = rng.split('>').map(Number); IFM.BU.gauge(W * x, H * y, W * .1, lerp(a, b, clamp(lt / Math.max(1, dur))), lt, { label: lb, col: /co/i.test(lb) ? '#FF6B5B' : '#2EC4B6', red: /co/i.test(lb) ? 'high' : 'low' }); }
      if (kind === 'count') { const [rng, unit = ''] = rest, [a, b] = rng.split('>').map(Number), v = lerp(a, b, E.inOut(clamp((lt - .3) / Math.max(1, dur - 1)))); CT.sign(Math.round(v) + (unit ? ' ' + unit : ''), W * x, H * y, 44 * u, lt, 0, { bg: '#FFC93C' }); } }); }
  // ---------------------------------------------------------------- the act
  A.l3 = (o, c, dur) => { L.REQ = L.REQ || new Set(); Object.values(o).forEach(v => (String(v).match(/\b(?:hdr|glb|tex)\/[a-z0-9_\-]+/gi) || []).forEach(x => L.REQ.add(x))); if (/glb\//.test(String(o.actors || ''))) L.ANIMLIBS.forEach(x => L.REQ.add(x)); if (SETS[o.set] && SETS[o.set].assets) SETS[o.set].assets.forEach(x => L.REQ.add(x)); return { sfx: [], draw: lt => { CT.begin({}, lt); const S = build(o), r = L.renderer();
    if (S.fx.pts) L.drift(S.fx.pts, lt, /bubbles/.test(o.fx) ? .25 : .03); if (S.fx.rays) L.sway(S.fx.rays, lt); if (S.fx.rain) S.fx.rain.position.y = -((lt * 14) % 6); if (o.light === 'underwater') L.causticsAt(lt);
    const tgt = camAt(S, o, lt, dur), lookAt = o.look ? (S.actors[o.look] ? S.actors[o.look].box().getCenter(V3()) : V3(...String(o.look).split(',').map(Number))) : S.cam.position.clone(); Object.values(S.actors).forEach(a => a.at(lt, lookAt));
    r.toneMappingExposure = num(o.exposure, 1.0); const post = String(o.post || 'dof bloom'); if (L.renderPost && window.L3_POST !== 0) L.renderPost(S, { ao: /ao/.test(post) ? { radius: .4, samples: 8 } : null, dof: /dof/.test(post) ? { focus: S.cam.position.distanceTo(tgt), aperture: num(o.aperture, .0012), maxblur: .006 } : null, bloom: /bloom/.test(post) ? { strength: .18, radius: .45, threshold: .95 } : null }); else r.render(S.sc, S.cam);
    L.present({ bloom: 0, grade: GRADES[o.grade || 'neutral'], gradeA: .22 }); overlays(o, lt, dur); CT.end({}, lt, 1, .28); } }; };
})();
