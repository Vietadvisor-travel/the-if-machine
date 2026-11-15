// Entity renderers for the FATHOM story world (engine v3, signature style). Every entity is a full-frame layer; order = z.
// Drawn things come from src/paint/world.tsx; their `draw` key animates the ink-on (line → wash → hatching).
import React from 'react';
import { AbsoluteFill } from 'remotion';
import * as Wd from '../paint/world';
import { Ink, Line, SEP, PIG } from '../paint/paint';
import { FONT } from '../kit/style';
import { Entity, Props, stateAt } from './state';
import { Cam, SW, SH, toScreen, anchor, planetPoint } from './space';
import { TL } from './time';

type Ctx = { t: number; tl: TL; cam: Cam; S: Record<string, Props> };
const camT = (c: Cam) => `translate(${SW / 2} ${SH / 2}) rotate(${c.rot}) scale(${c.zoom}) translate(${-c.x} ${-c.y})`;
const Svg: React.FC<{ a?: number; children: React.ReactNode }> = ({ a = 1, children }) => <svg width={SW} height={SH} viewBox={`0 0 ${SW} ${SH}`} style={{ position: 'absolute', inset: 0, opacity: a, overflow: 'visible' }}>{children}</svg>;
const ART: Record<string, React.FC<any>> = { Sky: Wd.Sky, Stars: Wd.Stars, Sun: Wd.Sun, Moon: Wd.Moon, Earth: Wd.Earth, Ridge: Wd.Ridge, Water: Wd.Water, Palm: Wd.Palm, Obelisk: Wd.Obelisk, Temple: Wd.Temple, Well: Wd.Well,
  Scholar: Wd.Scholar, Astrolabe: Wd.Astrolabe, Telescope: Wd.Telescope, Candle: Wd.Candle, SeaChart: Wd.SeaChart, Rose: Wd.Rose, Ship: Wd.Ship, Angle: Wd.Angle, GoldBeam: Wd.GoldBeam,
  Pinned: Wd.Pinned, DocumentPage: Wd.DocumentPage, Eyepiece: Wd.Eyepiece, ShadowCone: Wd.ShadowCone, BloodWash: Wd.BloodWash, Observatory18: Wd.Observatory18, Quadrant: Wd.Quadrant,
  Bedspring: Wd.Bedspring, OldScreen: Wd.OldScreen, LaserDome: Wd.LaserDome, Reflector: Wd.Reflector, MoonGround: Wd.MoonGround, Stopwatch: Wd.Stopwatch };
export const ART_NAMES = Object.keys(ART);
const strip = (s: Props) => { const { a: _a, name: _n, space: _s, _type, ...rest } = s; return rest; };

export const renderEntity = (e: Entity, s: Props, c: Ctx): React.ReactNode => {
  if ((s.a ?? 1) <= 0.002) return null;
  const { cam, S, t } = c, a = s.a ?? 1;
  switch (e.type) {
    case 'art': {   // any drawn element of the library; space "world" = it lives in the world and the camera moves past it
      const C = ART[s.name]; if (!C) return null; const p = strip(s);
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
        <circle cx={q.x} cy={q.y} r={r * .38 * d} fill={PIG.red[1]} />{s.label && <text x={q.x + r * 1.8} y={q.y + 7} fontFamily="Fraunces" fontStyle="italic" fontSize={s.size ?? 28} fill={s.color ?? '#FBF1D8'} opacity={d} style={{ paintOrder: 'stroke' }} stroke={SEP} strokeWidth={4} strokeOpacity={.6}>{s.label}</text>}</Svg>;
    }
    case 'beam': {   // gold light between two anchors (world, planet points, screen), k = how far it has travelled
      const [x1, y1] = anchor(s.from, cam, S), [x2, y2] = anchor(s.to, cam, S);
      return <Svg a={a}><Wd.GoldBeam x1={x1} y1={y1} x2={x2} y2={y2} k={s.k ?? 1} w={s.w ?? 3} /></Svg>;
    }
    case 'arc': {   // a dashed sepia measuring arc between anchors with ONE small italic label
      const [x1, y1] = anchor(s.from, cam, S), [x2, y2] = anchor(s.to, cam, S), mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - (s.bend ?? 160), d = s.k ?? 1;
      return <Svg a={a}><path d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} fill="none" stroke="#FBF1D8" strokeOpacity={.75} strokeWidth={2} strokeDasharray="6 9" pathLength={1} style={{ strokeDasharray: `${d} 1` }} />
        {s.label && <text x={mx} y={my + 34} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize={s.size ?? 32} fill="#FBF1D8" opacity={Math.min(1, d * 1.5)}>{s.label}</text>}</Svg>;
    }
    case 'shape': {   // an inked form that MORPHS into another (form = path in a 0–100 box; draw = ink-on)
      const [x, y] = s.space === 'world' ? toScreen(cam, s.x, s.y) : [s.x, s.y], sc = (s.s ?? 1) * (s.space === 'world' ? cam.zoom : 1);
      return <Svg a={a}><g transform={`translate(${x} ${y}) rotate(${s.rot ?? 0}) scale(${sc}) translate(-50 -50)`}><Ink d={s.form} w={(s.sw ?? 3) / sc} draw={s.draw ?? 1} col={s.col ?? SEP} /></g></Svg>;
    }
    case 'label': return <AbsoluteFill style={{ opacity: a }}><div style={{ position: 'absolute', left: s.x, top: s.y, translate: '-50% -50%', fontFamily: 'Fraunces', fontStyle: 'italic', fontSize: s.size ?? 30, color: s.color ?? SEP }}>{s.text}</div></AbsoluteFill>;
    case 'lens': {   // a WINDOW into another place opening from a point (the continuity device): an inked, gold-rimmed circle
      const [ax, ay] = anchor(s.at, cam, S), k = s.center ?? 0, lx = ax + (SW / 2 - ax) * k, ly = ay + (SH / 2 - ay) * k, r = s.r ?? 0; if (r < 1) return null;
      const inner: Ctx = { ...c, cam: { x: SW / 2, y: SH / 2, zoom: 1, rot: 0 } }, sc = s.inner ?? 1, ring = Math.max(0, 1 - r / 1400);
      return <AbsoluteFill style={{ opacity: a }}>
        <AbsoluteFill style={{ clipPath: `circle(${r}px at ${lx}px ${ly}px)` }}>
          <AbsoluteFill style={{ transformOrigin: '0 0', transform: `translate(${lx}px, ${ly}px) scale(${sc}) translate(${-SW / 2}px, ${-SH / 2}px)` }}>
            <Wd.PaperSheet />{(e.children || []).map(ch => <React.Fragment key={ch.id}>{renderEntity(ch, { ...stateAt(ch, t, c.tl), _type: ch.type }, inner)}</React.Fragment>)}</AbsoluteFill></AbsoluteFill>
        {ring > 0 && <Svg><circle cx={lx} cy={ly} r={r + 7} fill="none" stroke="url(#gold)" strokeWidth={10} opacity={ring} /><circle cx={lx} cy={ly} r={r + 13} fill="none" stroke={SEP} strokeWidth={1.4} opacity={ring} /><circle cx={lx} cy={ly} r={r + 1} fill="none" stroke={SEP} strokeWidth={1.2} opacity={ring} /></Svg>}
      </AbsoluteFill>;
    }
    default: return null;
  }
};
export { Line, FONT };
