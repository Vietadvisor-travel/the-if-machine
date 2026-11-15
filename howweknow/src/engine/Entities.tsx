// Renderers for the entity types of the story world. Each entity is its own full-frame layer (z order = list order, or `z`).
import React from 'react';
import { AbsoluteFill, Img, OffthreadVideo, staticFile } from 'remotion';
import { geoOrthographic, geoPath } from 'd3-geo';
import land from '../data/land110.json';
import * as K from '../kit/world';
import { P, FONT } from '../kit/style';
import { Entity, Props, stateAt } from './state';
import { Cam, SW, SH, toScreen, anchor, planetPoint, mapPoint } from './space';
import { toneCss } from '../kit/tone';
import { geoEquirectangular } from 'd3-geo';
import { TL } from './time';

type Ctx = { t: number; tl: TL; cam: Cam; S: Record<string, Props> };
const src = (s: string) => (/^https?:/.test(s) ? s : staticFile(s));
const camT = (c: Cam) => `translate(${SW / 2} ${SH / 2}) rotate(${c.rot}) scale(${c.zoom}) translate(${-c.x} ${-c.y})`;
const Svg: React.FC<{ a?: number; children: React.ReactNode }> = ({ a = 1, children }) => (
  <svg width={SW} height={SH} viewBox={`0 0 ${SW} ${SH}`} style={{ position: 'absolute', inset: 0, opacity: a, overflow: 'visible' }}><K.Defs />{children}</svg>);

const KIT: Record<string, React.FC<any>> = { NightSky: K.NightSky, Stars: K.Stars, Moon: K.Moon, Earth: K.Earth, Ridge: K.Ridge, Haze: K.Haze, Pines: K.Pines, Observatory: K.Observatory, MoonGround: (p: any) => <K.MoonGround {...p} src={src(p.src)} />, Reflector: K.Reflector };

export const renderEntity = (e: Entity, s: Props, c: Ctx): React.ReactNode => {
  if ((s.a ?? 1) <= 0.002) return null;
  const { cam, S, t } = c, a = s.a ?? 1;
  switch (e.type) {
    case 'sky': {   // screen backdrop: space | night | dusk | day
      const G: Record<string, string[]> = { space: ['#02040A', '#060B18', '#0A1224'], night: [P.night, P.navy, '#2E3A5C'], dusk: ['#1B2140', '#5A4A6E', '#E3A06A'], day: ['#3E7CC0', '#8FB9E3', '#DCE9F2'] };
      const g = G[s.kind || 'space'];
      return <AbsoluteFill style={{ opacity: a, background: `linear-gradient(180deg, ${g[0]} 0%, ${g[1]} 62%, ${g[2]} 100%)` }} />;
    }
    case 'stars': {  // parallax with the camera (depth 0 = fixed, 1 = moves with the world)
      const d = s.depth ?? 0.05, ox = (-cam.x * cam.zoom * d) % SW, oy = (-cam.y * cam.zoom * d) % SH;
      return <Svg a={a}><g transform={`translate(${ox} ${oy})`}><K.Stars t={t} n={s.n ?? 360} seed={e.id} /><g transform={`translate(${ox > 0 ? -SW : SW} 0)`}><K.Stars t={t} n={s.n ?? 360} seed={e.id} /></g><g transform={`translate(0 ${oy > 0 ? -SH : SH})`}><K.Stars t={t} n={s.n ?? 360} seed={e.id} /></g></g></Svg>;
    }
    case 'planet': {  // 2D (owner: no 3D): earth = REAL coastlines (Natural Earth) lit in the house style, or a real photo (src) from Muse; moon = drawn or photo
      const [x, y] = toScreen(cam, s.x, s.y), size = s.size * cam.zoom;
      if (size < 2 || x + size < -200 || x - size > SW + 200 || y + size < -200 || y - size > SH + 200) return null;
      if (s.src) return <AbsoluteFill style={{ opacity: a }}><Img src={src(s.src)} style={{ position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} /></AbsoluteFill>;
      if (s.kind === 'moon') return <Svg a={a}><K.Moon cx={x} cy={y} r={size / 2} glow={s.glow ?? 1} /></Svg>;
      return <Svg a={a}><K.Earth cx={x} cy={y} r={size / 2} lon={s.lon ?? 0} lat={s.lat ?? 0} clouds={s.clouds ?? 1} /></Svg>;
    }
    case 'geo': {   // real borders/coasts drawn ON a planet, aligned with it (orthographic, same lon/lat/size), + a pin
      const p = S[s.planet || 'earth']; if (!p) return null; const [x, y] = toScreen(cam, p.x, p.y), r = (p.size * cam.zoom) / 2;
      const proj = geoOrthographic().scale(r).translate([x, y]).rotate([-(p.lon ?? 0), -(p.lat ?? 0)]).clipAngle(90), path = geoPath(proj), d = path(land as never) || '';
      const pin = s.pin ? planetPoint(cam, p, s.pin[0], s.pin[1]) : null, pa = s.pinA ?? 1;
      return <Svg a={a}><path d={d} fill="none" stroke={P.cream} strokeOpacity={s.border ?? 0.55} strokeWidth={s.width ?? 1.4} />
        {pin && pin.vis > 0 && pa > 0 && <g opacity={pa}><circle cx={pin.x} cy={pin.y} r={(s.pinR ?? 10) * 3} fill={P.amber} opacity={0.18} filter="url(#b14)" /><circle cx={pin.x} cy={pin.y} r={s.pinR ?? 10} fill="none" stroke={P.amber} strokeWidth={3} /><circle cx={pin.x} cy={pin.y} r={(s.pinR ?? 10) * 0.35} fill={P.amber} />
          {s.pinLabel && <text x={pin.x + (s.pinR ?? 10) * 2} y={pin.y + 6} fontFamily={FONT.mono} fontSize={20} letterSpacing={4} fill={P.cream}>{s.pinLabel}</text>}</g>}</Svg>;
    }
    case 'kit': {   // a drawn element of the kit, in screen space (default) or in the world (space: "world")
      const C = KIT[s.name]; if (!C) return null; const { name, space, a: _a, ...rest } = s;
      return <Svg a={a}>{space === 'world' ? <g transform={camT(cam)}><C {...rest} t={t} /></g> : <C {...rest} t={t} />}</Svg>;
    }
    case 'beam': {  // light between two anchors; k = how far it has travelled
      const [x1, y1] = anchor(s.from, cam, S), [x2, y2] = anchor(s.to, cam, S);
      return <Svg a={a}><K.Beam x1={x1} y1={y1} x2={x2} y2={y2} k={s.k ?? 1} dash={!!s.dash} w={s.w ?? 3.5} /></Svg>;
    }
    case 'pulse': {  // a glowing packet riding a beam (on = beam id, k = 0..1 along it)
      const b = S[s.on]; if (!b || s.k <= 0 || s.k >= 1) return null; const [x1, y1] = anchor(b.from, cam, S), [x2, y2] = anchor(b.to, cam, S);
      return <Svg a={a}><K.Pulse x={x1 + (x2 - x1) * s.k} y={y1 + (y2 - y1) * s.k} r={s.r ?? 36} /></Svg>;
    }
    case 'arc': {   // a dashed measuring arc between two anchors, with an optional small label (the only kind of number on screen)
      const [x1, y1] = anchor(s.from, cam, S), [x2, y2] = anchor(s.to, cam, S), mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - (s.bend ?? 160), d = s.k ?? 1;
      return <Svg a={a}><path d={`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`} fill="none" stroke={P.fog} strokeOpacity={0.6} strokeWidth={2} strokeDasharray="6 10" pathLength={1} style={{ strokeDasharray: `${d} 1` }} />
        {s.label && <text x={mx} y={my + 30} textAnchor="middle" fontFamily={FONT.mono} fontSize={s.size ?? 24} letterSpacing={5} fill={P.fog} opacity={Math.min(1, d * 1.5)}>{s.label}</text>}</Svg>;
    }
    case 'photo': case 'video': {   // REAL stock (Muse), toned to the palette; frame: pinned | plate | full; reveal 0..1 = circle wipe
      const [x, y] = s.space === 'world' ? toScreen(cam, s.x, s.y) : [s.x ?? SW / 2, s.y ?? SH / 2], z = s.space === 'world' ? cam.zoom : 1, w = (s.w ?? SW) * z, h = (s.h ?? SH) * z;
      const tone = toneCss(s.tone), kb = { scale: String(s.kz ?? 1), translate: `${s.kx ?? 0}% ${s.ky ?? 0}%` };   // Ken Burns: kz zoom, kx/ky pan (%)
      const rv = s.reveal ?? 1, clip = rv < 1 ? `circle(${rv * 75}% at 50% 50%)` : undefined, pinned = s.frame === 'pinned';
      const media = e.type === 'video' ? <OffthreadVideo src={src(s.src)} muted startFrom={Math.round((s.from ?? 0) * 30)} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: tone, ...kb }} /> : <Img src={src(s.src)} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: tone, ...kb }} />;
      return <AbsoluteFill style={{ opacity: a }}><div style={{ position: 'absolute', overflow: 'hidden', left: x - w / 2, top: y - h / 2, width: w, height: h, rotate: `${s.rot ?? 0}deg`, clipPath: clip, padding: pinned ? 14 * z : 0, paddingBottom: pinned ? 50 * z : 0, background: pinned ? '#EFE9DC' : undefined, boxShadow: s.frame === 'full' ? undefined : '0 24px 50px rgba(0,0,0,.55)' }}>{media}
        {s.frame !== 'full' && <div style={{ position: 'absolute', inset: pinned ? `${14 * z}px ${14 * z}px ${50 * z}px` : 0, boxShadow: 'inset 0 0 80px rgba(0,0,0,.45)', pointerEvents: 'none' }} />}
        {pinned && s.caption && <div style={{ position: 'absolute', left: 16 * z, bottom: 14 * z, fontFamily: FONT.mono, fontSize: 15 * z, color: '#5A5246', letterSpacing: 2 }}>{s.caption}</div>}</div></AbsoluteFill>;
    }
    case 'label': return <AbsoluteFill style={{ opacity: a }}><div style={{ position: 'absolute', left: s.x, top: s.y, translate: '-50% -50%', fontFamily: FONT.mono, fontSize: s.size ?? 24, letterSpacing: 5, color: s.color ?? P.fog }}>{s.text}</div></AbsoluteFill>;
    case 'shape': {   // a drawn form that can MORPH into another (form = SVG path in a 0..100 box), draw = 0..1 line reveal
      const [x, y] = s.space === 'world' ? toScreen(cam, s.x, s.y) : [s.x, s.y], sc = (s.s ?? 1) * (s.space === 'world' ? cam.zoom : 1);
      return <Svg a={a}><g transform={`translate(${x} ${y}) rotate(${s.rot ?? 0}) scale(${sc}) translate(-50 -50)`}><path d={s.form} fill={s.fill ?? 'none'} stroke={s.stroke ?? P.amber} strokeWidth={(s.sw ?? 3) / sc} pathLength={1} strokeDasharray={s.draw !== undefined ? `${s.draw} 1` : undefined} strokeLinecap="round" strokeLinejoin="round" /></g></Svg>;
    }
    case 'lens': {   // a WINDOW into another place, opening from a point of this one (the continuity device): r px, inner = zoom of the inner scene
      const [ax, ay] = anchor(s.at, cam, S), k = s.center ?? 0, lx = ax + (SW / 2 - ax) * k, ly = ay + (SH / 2 - ay) * k, r = s.r ?? 0; if (r < 1) return null;
      const id = 'lens_' + e.id, inner: Ctx = { ...c, cam: { x: SW / 2, y: SH / 2, zoom: 1, rot: 0 } }, sc = s.inner ?? 1;
      return <AbsoluteFill style={{ opacity: a, clipPath: `circle(${r}px at ${lx}px ${ly}px)` }}>
        <AbsoluteFill style={{ transformOrigin: '0 0', transform: `translate(${lx}px, ${ly}px) scale(${sc}) translate(${-SW / 2}px, ${-SH / 2}px)` }}>
          {(e.children || []).map(ch => <React.Fragment key={ch.id}>{renderEntity(ch, stateAt(ch, t, c.tl), inner)}</React.Fragment>)}</AbsoluteFill>
        {r < 1400 && <svg width={SW} height={SH} style={{ position: 'absolute', inset: 0 }}><circle cx={lx} cy={ly} r={r} fill="none" stroke={P.cream} strokeOpacity={0.6 * (1 - Math.min(1, r / 1400))} strokeWidth={3} /></svg>}
      </AbsoluteFill>;
    }
    case 'map': {   // a flat REAL map in the world (Muse: Blue Marble / relief / old map, equirectangular) or the drawn one; x,y = lon 0/lat 0, w = 360°
      const [x0, y0] = toScreen(cam, s.x - s.w / 2, s.y - s.w / 4), W2 = s.w * cam.zoom, H2 = W2 / 2;
      if (x0 > SW || y0 > SH || x0 + W2 < 0 || y0 + H2 < 0) return null;
      const proj = geoEquirectangular().scale(W2 / (2 * Math.PI)).translate([x0 + W2 / 2, y0 + H2 / 2]), d = geoPath(proj)(land as never) || '';
      return <AbsoluteFill style={{ opacity: a }}>
        {s.src ? <Img src={src(s.src)} style={{ position: 'absolute', left: x0, top: y0, width: W2, height: H2, filter: toneCss(s.tone) }} />
          : <svg width={SW} height={SH} style={{ position: 'absolute', inset: 0 }}><rect x={x0} y={y0} width={W2} height={H2} fill={P.ocean} /><path d={d} fill={P.land} /></svg>}
        {(s.border ?? 0) > 0 && <svg width={SW} height={SH} style={{ position: 'absolute', inset: 0 }}><path d={d} fill="none" stroke={P.cream} strokeOpacity={s.border} strokeWidth={1.2} /></svg>}
      </AbsoluteFill>;
    }
    case 'route': {   // a path drawn across a map or planet: points = [[lon, lat], …] on entity `on`; k = how much is drawn
      const pts = (s.points || []).map((q: number[]) => anchor({ entity: s.on, lon: q[0], lat: q[1] }, cam, S)); if (pts.length < 2) return null;
      const d = 'M' + pts.map((p: number[]) => p.join(' ')).join(' L');
      return <Svg a={a}><path d={d} fill="none" stroke={s.color ?? P.amber} strokeWidth={(s.w ?? 3) * 4} opacity={0.15} filter="url(#b6)" pathLength={1} strokeDasharray={`${s.k ?? 1} 1`} />
        <path d={d} fill="none" stroke={s.color ?? P.amber} strokeWidth={s.w ?? 3} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={s.dash ? '0.004 0.008' : `${s.k ?? 1} 1`} /></Svg>;
    }
    default: return null;
  }
};
