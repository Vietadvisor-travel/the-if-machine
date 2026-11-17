// Entity renderers for the FATHOM story world (engine v3, signature style). Every entity is a full-frame layer; order = z.
// Drawn things come from src/paint/world.tsx; their `draw` key animates the ink-on (line → wash → hatching).
import React from 'react';
import { AbsoluteFill } from 'remotion';
import * as Wd from '../paint/world';
import { Person } from '../paint/people';
import * as Pl from '../paint/places';
import * as Id from '../kit/Ident';
import { LIB_ART, LIB_COSTUMES } from '../lib';
import { Ink, Line, SEP, PIG } from '../paint/paint';
import { FONT } from '../kit/style';
import { Entity, Props, stateAt } from './state';
import { Cam, SW, SH, toScreen, anchor, planetPoint } from './space';
import { TL, resolveTime } from './time';
import { Fx, hasFx, FX_KEYS } from './Fx';
import { SceneText } from '../kit/SceneText';
import { random } from 'remotion';
import { svgPathProperties } from 'svg-path-properties';
const ptCache = new Map<string, [number, number][]>();
const sample = (d: string, n: number): [number, number][] => { const id = n + '|' + d; let r = ptCache.get(id); if (!r) { const P = new svgPathProperties(d), L = P.getTotalLength(); r = Array.from({ length: n }, (_, i) => { const q = P.getPointAtLength(L * (i + .5) / n); return [q.x, q.y] as [number, number]; }); ptCache.set(id, r); } return r; };

type Ctx = { t: number; tl: TL; cam: Cam; S: Record<string, Props> };
const camT = (c: Cam) => `translate(${SW / 2} ${SH / 2}) rotate(${c.rot}) scale(${c.zoom}) translate(${-c.x} ${-c.y})`;
const Svg: React.FC<{ a?: number; children: React.ReactNode }> = ({ a = 1, children }) => <svg width={SW} height={SH} viewBox={`0 0 ${SW} ${SH}`} style={{ position: 'absolute', inset: 0, opacity: a, overflow: 'visible' }}>{children}</svg>;
const ART: Record<string, React.FC<any>> = { Sky: Wd.Sky, Stars: Wd.Stars, Sun: Wd.Sun, Moon: Wd.Moon, Earth: Wd.Earth, Ridge: Wd.Ridge, Water: Wd.Water, Palm: Wd.Palm, Obelisk: Wd.Obelisk, Temple: Wd.Temple, Well: Wd.Well,
  Scholar: Wd.Scholar, Astrolabe: Wd.Astrolabe, Telescope: Wd.Telescope, Candle: Wd.Candle, SeaChart: Wd.SeaChart, Rose: Wd.Rose, Ship: Wd.Ship, Angle: Wd.Angle, GoldBeam: Wd.GoldBeam,
  Pinned: Wd.Pinned, DocumentPage: Wd.DocumentPage, Eyepiece: Wd.Eyepiece, ShadowCone: Wd.ShadowCone, BloodWash: Wd.BloodWash, Observatory18: Wd.Observatory18, Quadrant: Wd.Quadrant,
  Bedspring: Wd.Bedspring, OldScreen: Wd.OldScreen, LaserDome: Wd.LaserDome, Reflector: Wd.Reflector, MoonGround: Wd.MoonGround, Stopwatch: Wd.Stopwatch,
  FilmStrip: Wd.FilmStrip, Loupe: Wd.Loupe, Clipping: Wd.Clipping, CabinetCard: Wd.CabinetCard, Person: Person,
  Mountains: Pl.Mountains, Window: Pl.Window, Bookshelf: Pl.Bookshelf, Desk: Pl.Desk, Chair: Pl.Chair, Globe: Pl.Globe, Pendulum: Pl.Pendulum, Glassware: Pl.Glassware, City: Pl.City, Tree: Pl.Tree, Birds: Pl.Birds,
  Ident: Id.Ident, EndCard: Id.EndCard, TitleCard: Id.TitleCard };   // v4: the channel's title sequence and end card (core)
Object.assign(ART, LIB_ART);   // every film's own drawings (src/lib/<slug>/, tools/lib_index.py)
export const ART_NAMES = Object.keys(ART);
const strip = (s: Props) => { const { a: _a, name: _n, space: _s, _type, play: _p, fx_box: _b, who: _w, ...rest } = s; for (const k of FX_KEYS) delete (rest as any)[k]; return rest; };
const kids = (e: Entity, c: Ctx) => (e.children || []).map((ch, i) => { const cs = { ...stateAt(ch, c.t, c.tl), _type: ch.type }, n = renderEntity(ch, cs, c); return n && hasFx(cs) ? <Fx key={ch.id} s={cs} t={c.t} seed={i + 7} uid={ch.id}>{n}</Fx> : <React.Fragment key={ch.id}>{n}</React.Fragment>; });

export const renderEntity = (e: Entity, s: Props, c: Ctx): React.ReactNode => {
  if ((s.a ?? 1) <= 0.002) return null;
  const { cam, S, t } = c, a = s.a ?? 1;
  switch (e.type) {
    case 'art': {   // any drawn element of the library; space "world" = it lives in the world and the camera moves past it
      const C = ART[s.name]; if (!C) return null; const p: Props = strip(s); if (s.play !== undefined) p.t0 = resolveTime(s.play, c.tl);
      if (s.name === 'Person' && typeof p.costume === 'string' && LIB_COSTUMES[p.costume]) p.costume = LIB_COSTUMES[p.costume];   // footage starts at its `play` time ref
      return <Svg a={a}>{s.space === 'world' ? <g transform={camT(cam)}><C {...p} flicker={t} /></g> : <C {...p} flicker={t} />}</Svg>;
    }
    case 'planet': {   // a planet placed in the WORLD (x, y, size in world units) so the camera can travel between planets at true scale
      const [x, y] = toScreen(cam, s.x, s.y), r = (s.size * cam.zoom) / 2; if (r < 1 || x + r < -300 || x - r > SW + 300 || y + r < -300 || y - r > SH + 300) return null;
      return <Svg a={a}>{s.kind === 'moon' ? <Wd.Moon x={x} y={y} r={r} phase={s.phase ?? .85} draw={s.draw ?? 1} id={e.id} /> : s.kind === 'sun' ? <Wd.Sun x={x} y={y} r={r} draw={s.draw ?? 1} />
        : <Wd.Earth cx={x} cy={y} r={r} lon={s.lon ?? 0} lat={s.lat ?? 20} clouds={s.clouds ?? 1} draw={s.draw ?? 1} night={s.night ?? 1} id={e.id} />}</Svg>;
    }
    case 'pin': {   // a place marked on a planet: gold ring + red dot (+ an italic name), drawn in
      const p = S[s.on]; if (!p) return null; const q = planetPoint(cam, p, s.lon, s.lat); if (q.vis <= 0) return null; const r = s.r ?? 10, d = s.draw ?? 1;
      return <Svg a={a}><circle cx={q.x} cy={q.y} r={r * 3} fill="url(#glowG)" opacity={.6 * d} /><Ink d={`M${q.x - r} ${q.y} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`} w={1.6} draw={d} />
        <circle cx={q.x} cy={q.y} r={r * .38 * d} fill={PIG.red[1]} />{s.label && <text x={q.x + r * 1.8} y={q.y + 7} fontFamily="IM Fell DW Pica" fontStyle="italic" fontSize={s.size ?? 28} fill={s.color ?? '#FBF1D8'} opacity={d} style={{ paintOrder: 'stroke' }} stroke={SEP} strokeWidth={4} strokeOpacity={.6}>{s.label}</text>}</Svg>;
    }
    case 'beam': {   // gold light between two anchors (world, planet points, screen), k = how far it has travelled
      const [x1, y1] = anchor(s.from, cam, S), [x2, y2] = anchor(s.to, cam, S);
      return <Svg a={a}><Wd.GoldBeam x1={x1} y1={y1} x2={x2} y2={y2} k={s.k ?? 1} w={s.w ?? 3} /></Svg>;
    }
    case 'arc': {   // a dashed sepia measuring arc between anchors with ONE small italic label
      const [x1, y1] = anchor(s.from, cam, S), [x2, y2] = anchor(s.to, cam, S), mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - (s.bend ?? 160), d = s.k ?? 1;
      return <Svg a={a}><path d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} fill="none" stroke="#FBF1D8" strokeOpacity={.75} strokeWidth={2} strokeDasharray="6 9" pathLength={1} style={{ strokeDasharray: `${d} 1` }} />
        {s.label && <text x={mx} y={my + 34} textAnchor="middle" fontFamily="IM Fell DW Pica" fontStyle="italic" fontSize={s.size ?? 32} fill="#FBF1D8" opacity={Math.min(1, d * 1.5)}>{s.label}</text>}</Svg>;
    }
    case 'shape': {   // an inked form that MORPHS into another (form = path in a 0–100 box; draw = ink-on). v5: `fill` (a colour that glides) + fillA makes it a
      // solid body that morphs; `erase` 0..1 trims the line from its start, so with `draw` a stroke TRAVELS (leaves one thing, becomes the outline of the next)
      const [x, y] = s.space === 'world' ? toScreen(cam, s.x, s.y) : [s.x, s.y], sc = (s.s ?? 1) * (s.space === 'world' ? cam.zoom : 1), dr = s.draw ?? 1, er = s.erase ?? 0;
      return <Svg a={a}><g transform={`translate(${x} ${y}) rotate(${s.rot ?? 0}) scale(${sc}) translate(-50 -50)`}>
        {s.fill && <path d={s.form} fill={s.fill} opacity={(s.fillA ?? 1) * Math.min(1, dr * 1.5)} filter={s.wash === false ? undefined : 'url(#wc)'} />}
        {er > 0 ? <path d={s.form} fill="none" stroke={s.col ?? SEP} strokeWidth={(s.sw ?? 3) / sc} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${Math.max(0, dr - er)} 2`} strokeDashoffset={-er} />
          : <Ink d={s.form} w={(s.sw ?? 3) / sc} draw={dr} col={s.col ?? SEP} />}</g></Svg>;
    }
    case 'swarm': {   // v5: a thing comes apart into ink grains that fly and settle as ANOTHER thing: n grains from points along path `from` to points along
      // path `to` (screen px), k 0..1; each grain leaves a little later than the last and swings out on its own arc (`arc` px); `spin` twists the cloud
      if (!s.from || !s.to) return null; const n = s.n ?? 160, A = sample(s.from, n), Bp = sample(s.to, n), k = Math.max(0, Math.min(1, s.k ?? 0)), arc = s.arc ?? 140, out: React.ReactNode[] = [];
      for (let i = 0; i < n; i++) { const r1 = random(e.id + 'd' + i), r2 = random(e.id + 'e' + i), j = Math.floor(r2 * n * (s.shuffle ?? 0) + i) % n, d0 = r1 * .45, q0 = Math.max(0, Math.min(1, (k - d0) / .55)), q = q0 * q0 * (3 - 2 * q0);
        const [x1, y1] = A[i], [x2, y2] = Bp[j], dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, bow = Math.sin(Math.PI * q) * arc * (r2 - .5) * 2;
        const px = x1 + dx * q - dy / L * bow, py = y1 + dy * q + dx / L * bow, sz = (s.size ?? 3) * (.6 + r1 * .9) * (1 + Math.sin(Math.PI * q) * .8);
        out.push(<circle key={i} cx={px} cy={py} r={sz} fill={s.col ?? SEP} opacity={.55 + .45 * r2} />); }
      return <Svg a={a}>{out}</Svg>;
    }
    case 'flash': {   // v5 (empty-atom): SCINTILLATIONS — a point of light that blooms in 60 ms and fades with an afterglow, like an α particle striking
      // zinc sulphide. at: [[time, x, y, size?], …] (time = a time ref; x,y screen px); life = afterglow s; col = core colour; glow = halo colour
      const life = s.life ?? 1.1, out: React.ReactNode[] = [];
      (s.at || []).forEach((f: any[], i: number) => { const t0 = resolveTime(f[0], c.tl), age = t - t0; if (age < 0 || age > life) return;
        const I = age < .06 ? age / .06 : Math.exp(-(age - .06) * (4.2 / life)), r = (f[3] ?? 6) * (1 + (1 - I) * .4), x = f[1], y = f[2];
        out.push(<g key={i} opacity={I}><circle cx={x} cy={y} r={r * 7} fill={s.glow ?? '#B8F0C8'} opacity={.22} filter="url(#b8)" /><circle cx={x} cy={y} r={r * 2.4} fill={s.glow ?? '#B8F0C8'} opacity={.6} />
          <path d={`M${x - r * 4.5} ${y} L${x + r * 4.5} ${y} M${x} ${y - r * 4.5} L${x} ${y + r * 4.5}`} stroke={s.col ?? '#F4FFF0'} strokeWidth={r * .35} opacity={.7 * I} strokeLinecap="round" />
          <circle cx={x} cy={y} r={r} fill={s.col ?? '#F4FFF0'} /></g>); });
      return out.length ? <Svg a={a}>{out}</Svg> : null;
    }
    case 'stream': {   // v5 (empty-atom): a STREAM of beads flowing along computed paths (svg paths in screen px): bead j sets off at t0 + j·every on
      // paths[j % n] and takes `dur` s to run it; `until` (time ref) stops new launches; a short tail of the path is inked behind each bead (`tail` 0..1);
      // `trace` = how much of each run path stays drawn faintly (shows where the particles went). col / r / glow.
      const P: string[] = s.paths || []; if (!P.length) return null; const t0 = resolveTime(s.t0 ?? 0, c.tl), t1 = s.until !== undefined ? resolveTime(s.until, c.tl) : 1e9, ev = s.every ?? .25, dur = s.dur ?? 1.6, M = 120, out: React.ReactNode[] = [];
      if (t < t0) return null; const jmax = Math.floor((Math.min(t, t1) - t0) / ev);
      for (let j = Math.max(0, jmax - Math.ceil(dur / ev) - 1); j <= jmax; j++) { const age = t - (t0 + j * ev), q = age / dur; if (q < 0 || q > 1) continue;
        const pts = sample(P[s.order === 'random' ? Math.floor(random(e.id + j) * P.length) : j % P.length], M), qi = Math.min(M - 1, Math.floor(q * (M - 1))), ti = Math.max(0, qi - Math.round((s.tail ?? .12) * M));
        const [x, y] = pts[qi], tl = 'M' + pts.slice(ti, qi + 1).map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L');
        out.push(<g key={j}>{qi > ti && <path d={tl} fill="none" stroke={s.col ?? '#B8862B'} strokeWidth={(s.r ?? 5) * .9} strokeLinecap="round" opacity={.55} />}
          <circle cx={x} cy={y} r={(s.r ?? 5) * 3.2} fill="url(#glowG)" opacity={s.glow ?? .8} /><circle cx={x} cy={y} r={s.r ?? 5} fill="url(#gold)" stroke={SEP} strokeWidth={1} /></g>); }
      const tr = s.trace ?? 0;
      return <Svg a={a}>{tr > 0 && P.map((d, i) => <path key={'t' + i} d={d} fill="none" stroke={s.col ?? '#B8862B'} strokeWidth={1.3} strokeDasharray="5 7" opacity={.5 * tr} />)}{out}</Svg>;
    }
    case 'spot': {   // v5: a spotlight — everything dims except a soft circle at an anchor (guides the eye to the one thing the line is about); k 0..1
      const [x, y] = anchor(s.at, cam, S), r = s.r ?? 220, k = s.k ?? 1; if (k <= 0) return null;
      return <AbsoluteFill style={{ opacity: a * k, background: `radial-gradient(circle ${r * 1.5}px at ${x}px ${y}px, rgba(43,29,18,0) 0%, rgba(43,29,18,0) ${62}%, rgba(43,29,18,${s.dark ?? .5}) 100%)`, mixBlendMode: 'multiply' }} />;
    }
    case 'label': return <AbsoluteFill style={{ opacity: a }}><div style={{ position: 'absolute', left: s.x, top: s.y, translate: '-50% -50%', fontFamily: 'IM Fell DW Pica', fontStyle: 'italic', fontSize: s.size ?? 30, color: s.color ?? SEP }}>{s.text}</div></AbsoluteFill>;
    case 'lens': {   // a WINDOW into another place opening from a point (the continuity device): an inked, gold-rimmed circle
      const [ax, ay] = anchor(s.at, cam, S), k = s.center ?? 0, lx = ax + (SW / 2 - ax) * k, ly = ay + (SH / 2 - ay) * k, r = s.r ?? 0; if (r < 1) return null;
      const inner: Ctx = { ...c, cam: { x: SW / 2, y: SH / 2, zoom: 1, rot: 0 } }, sc = s.inner ?? 1, ring = Math.max(0, 1 - r / 1400);
      return <AbsoluteFill style={{ opacity: a }}>
        <AbsoluteFill style={{ clipPath: `circle(${r}px at ${lx}px ${ly}px)` }}>
          <AbsoluteFill style={{ transformOrigin: '0 0', transform: `translate(${lx}px, ${ly}px) scale(${sc}) translate(${-SW / 2}px, ${-SH / 2}px)` }}>
            <Wd.PaperSheet />{kids(e, inner)}</AbsoluteFill></AbsoluteFill>
        {ring > 0 && <Svg><circle cx={lx} cy={ly} r={r + 7} fill="none" stroke="url(#gold)" strokeWidth={10} opacity={ring} /><circle cx={lx} cy={ly} r={r + 13} fill="none" stroke={SEP} strokeWidth={1.4} opacity={ring} /><circle cx={lx} cy={ly} r={r + 1} fill="none" stroke={SEP} strokeWidth={1.2} opacity={ring} /></Svg>}
      </AbsoluteFill>;
    }
    case 'text': {   // words IN the scene (no subtitles): title | plate | note | label | figure | stamp — kit/SceneText.tsx; to = leader-line anchor
      const [x, y] = s.space === 'world' ? toScreen(cam, s.x, s.y) : [s.x, s.y], to = s.to ? anchor(s.to, cam, S) : null;
      // v5: `num` (glides) + `fmt` ("{n} km", `dec` decimals) = a COUNTER — the number itself runs up while the thing it measures grows
      const txt = s.num !== undefined ? String(s.fmt ?? '{n}').replace('{n}', Number(s.num).toLocaleString('en-US', { minimumFractionDigits: s.dec ?? 0, maximumFractionDigits: s.dec ?? 0 })) : s.text;
      return <AbsoluteFill style={{ pointerEvents: 'none' }}><SceneText {...(s as any)} text={txt} x={x} y={y} to={to as any} a={a} /></AbsoluteFill>;
    }
    case 'group': return <AbsoluteFill style={{ opacity: a }}>{kids(e, c)}</AbsoluteFill>;   // children share this entity's fx (move/flip/wipe a whole composition)
    case 'trail': {   // something TRAVELS along a path of anchors (k 0..1): the inked path is drawn behind it; head = a gold dot or an art (headArt + headProps)
      const pts = (s.points || []).map((q: any) => anchor(q, cam, S)); if (pts.length < 2) return null;
      const seg = pts.slice(1).map((p: number[], i: number) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1])), L = seg.reduce((x: number, y: number) => x + y, 0), k = Math.max(0, Math.min(1, s.k ?? 0));
      let d = k * L, i = 0; while (i < seg.length - 1 && d > seg[i]) d -= seg[i++]; const f = seg[i] ? d / seg[i] : 0, hx = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, hy = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f;
      const dd = 'M' + [...pts.slice(0, i + 1), [hx, hy]].map((p: number[]) => p.map(v => v.toFixed(1)).join(' ')).join(' L'), H = s.headArt ? ART[s.headArt] : null;   // only the part already travelled
      return <Svg a={a}>{k > 0 && <path d={dd} fill="none" stroke={s.col ?? PIG.red[1]} strokeWidth={s.w ?? 3} strokeDasharray={s.dash ? '10 8' : undefined} strokeLinecap="round" strokeLinejoin="round" />}
        {k > 0 && (H ? <H {...(s.headProps || {})} x={hx} y={hy} /> : <g><circle cx={hx} cy={hy} r={(s.r ?? 8) * 3} fill="url(#glowG)" /><circle cx={hx} cy={hy} r={s.r ?? 8} fill="url(#gold)" stroke={SEP} strokeWidth={1.2} /></g>)}</Svg>;
    }
    case 'particles': {   // drifting matter, deterministic: dust | snow | sparks | photons | rain | embers | bubbles — n, box [x,y,w,h], speed, k (density 0..1)
      const [bx, by, bw, bh] = s.box || [0, 0, SW, SH], n = s.n ?? 60, kind = s.kind || 'dust', sp = s.speed ?? 1, dens = s.k ?? 1, out: React.ReactNode[] = [];
      for (let i = 0; i < n * dens; i++) { const r1 = random(e.id + 'a' + i), r2 = random(e.id + 'b' + i), r3 = random(e.id + 'c' + i), vy = kind === 'snow' ? 40 : kind === 'rain' ? 900 : kind === 'embers' || kind === 'bubbles' || kind === 'sparks' ? -70 : 8, vx = kind === 'rain' ? -120 : Math.sin(t * .6 + i) * 14;
        const x = bx + ((r1 * bw + vx * t * sp * (.5 + r3)) % bw + bw) % bw, y = by + ((r2 * bh + vy * t * sp * (.5 + r3)) % bh + bh) % bh, sz = 1.2 + r3 * 2.6, tw = .5 + .5 * Math.sin(t * (2 + r3 * 4) + i);
        out.push(kind === 'rain' ? <path key={i} d={`M${x} ${y} l-5 22`} stroke="#22507A" strokeWidth={1.2} opacity={.55} /> : kind === 'snow' ? <circle key={i} cx={x} cy={y} r={sz} fill="#FBF6EA" stroke={SEP} strokeWidth={.4} opacity={.9} />
          : kind === 'bubbles' ? <circle key={i} cx={x} cy={y} r={sz * 1.6} fill="none" stroke="#FBF1D8" strokeWidth={1} opacity={.7} /> : kind === 'dust' ? <circle key={i} cx={x} cy={y} r={sz * .7} fill="#FBF1D8" opacity={.25 + .35 * tw} />
          : <g key={i}><circle cx={x} cy={y} r={sz * 3} fill="url(#glowG)" opacity={.5 * tw} /><circle cx={x} cy={y} r={sz * .8} fill={kind === 'embers' ? '#F2A672' : '#F7E3A0'} opacity={.6 + .4 * tw} /></g>); }
      return <Svg a={a}>{out}</Svg>;
    }
    case 'ripple': {   // inked rings spreading from an anchor (an impact, a signal, a sound): k 0..1, n rings, max radius r
      const [x, y] = anchor(s.at, cam, S), n = s.n ?? 4, R = s.r ?? 300, k = s.k ?? 0; if (k <= 0) return null;
      return <Svg a={a}>{Array.from({ length: n }, (_, i) => { const kk = k * (1 + i * .25) - i * .25; if (kk <= 0 || kk >= 1) return null; return <ellipse key={i} cx={x} cy={y} rx={R * kk} ry={R * kk * (s.flat ?? 1)} fill="none" stroke={s.col ?? SEP} strokeWidth={(s.w ?? 2.4) * (1 - kk)} opacity={1 - kk} />; })}</Svg>;
    }
    case 'hand': {   // the illustrator's hand: a quill writing/drawing at an anchor — follows `at`, with an ink tip (use while something is inked on)
      const [x, y] = anchor(s.at, cam, S), sc = s.s ?? 1, wob = Math.sin(t * 9) * 3;
      return <Svg a={a}><g transform={`translate(${x + wob} ${y + Math.cos(t * 7) * 2}) scale(${sc}) rotate(${s.rot ?? -20})`}>
        <path d="M4 -10 L14 -40 Q20 -150 150 -310 Q170 -200 60 -60 L22 -18 Z" fill="#FBF4E2" stroke={SEP} strokeWidth={1.6} strokeLinejoin="round" /><path d="M10 -22 Q60 -170 150 -310" fill="none" stroke={SEP} strokeWidth={1.4} />
        {Array.from({ length: 10 }, (_, i) => { const f = (i + 1) / 11, x = 10 + 140 * f * f * .9 + 20 * f, y = -22 - 288 * f; return <g key={i}><path d={`M${x} ${y} l${18 + 14 * Math.sin(f * 3)} ${10}`} stroke={SEP} strokeWidth={.7} opacity={.6} /><path d={`M${x} ${y} l${-14 - 8 * Math.sin(f * 3)} ${14}`} stroke={SEP} strokeWidth={.7} opacity={.6} /></g>; })}
        <path d="M0 0 L6 -16 L12 -12 Z" fill={SEP} /></g></Svg>;
    }
    default: return null;
  }
};
export { Line, FONT };
