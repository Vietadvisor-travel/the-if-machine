// HOW WE KNOW — world kit: re-animated real things in the one style (style.ts). Every piece is an SVG <g> drawn in a 1920×1080 layer.
import React, { useMemo } from 'react';
import { random } from 'remotion';
import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo';
import land from '../data/land110.json';
import { P } from './style';

const seq = (seed: string) => { let i = 0; return () => random(seed + '_' + i++); };

// ---------------------------------------------------------------- defs shared by every layer (gradients, blurs)
export const Defs: React.FC = () => (
  <defs>
    <filter id="b2"><feGaussianBlur stdDeviation="2" /></filter><filter id="b6"><feGaussianBlur stdDeviation="6" /></filter>
    <filter id="b14"><feGaussianBlur stdDeviation="14" /></filter><filter id="b30"><feGaussianBlur stdDeviation="30" /></filter>
    <radialGradient id="glowAmber"><stop offset="0" stopColor="#FFF4D8" /><stop offset=".25" stopColor={P.amber} stopOpacity={0.9} /><stop offset="1" stopColor={P.amber} stopOpacity={0} /></radialGradient>
    <radialGradient id="glowCream"><stop offset="0" stopColor={P.cream} stopOpacity={0.45} /><stop offset="1" stopColor={P.cream} stopOpacity={0} /></radialGradient>
  </defs>
);

// ---------------------------------------------------------------- sky and stars
export const NightSky: React.FC<{ horizon?: number; t: number }> = ({ horizon = 1, t }) => (
  <g>
    <defs><linearGradient id="nsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.night} /><stop offset={0.62 * horizon} stopColor={P.navy} /><stop offset="1" stopColor="#2E3A5C" /></linearGradient></defs>
    <rect width={1920} height={1080} fill="url(#nsky)" />
    <MilkyWay t={t} />
  </g>
);
const MilkyWay: React.FC<{ t: number }> = () => {
  const r = useMemo(() => seq('mw'), []); const blobs = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ x: 200 + i * 62 + r() * 40, y: 120 + i * 18 + r() * 60, rx: 90 + r() * 120, ry: 30 + r() * 40, a: 0.03 + r() * 0.05 })), [r]);
  return <g filter="url(#b30)">{blobs.map((b, i) => <ellipse key={i} cx={b.x} cy={b.y} rx={b.rx} ry={b.ry} fill="#C9D4FF" opacity={b.a} transform={`rotate(24 ${b.x} ${b.y})`} />)}</g>;
};
export const Stars: React.FC<{ n?: number; t: number; y1?: number; seed?: string }> = ({ n = 320, t, y1 = 1080, seed = 'st' }) => {
  const S = useMemo(() => { const r = seq(seed); return Array.from({ length: n }, () => ({ x: r() * 1920, y: r() * y1, s: r() < 0.05 ? 1.9 : 0.5 + r() * 1.1, a: 0.3 + r() * 0.6, ph: r() * 6.28, w: 0.6 + r() * 1.6 })); }, [n, y1, seed]);
  return <g>{S.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#FFFFFF" opacity={s.a * (0.75 + 0.25 * Math.sin(t * s.w + s.ph))} />)}</g>;
};

// ---------------------------------------------------------------- the Moon (lit from the right, maria, craters with rim light)
export const Moon: React.FC<{ cx: number; cy: number; r: number; glow?: number }> = ({ cx, cy, r, glow = 1 }) => {
  const C = useMemo(() => { const q = seq('moon'); return Array.from({ length: 34 }, () => { const a = q() * 6.28, d = Math.sqrt(q()) * 0.86; return { x: Math.cos(a) * d, y: Math.sin(a) * d, s: 0.025 + q() * q() * 0.12 }; }); }, []);
  const maria = [[-0.28, -0.22, 0.34, 0.24, -20], [0.1, -0.35, 0.22, 0.15, 10], [-0.05, 0.12, 0.2, 0.28, 30], [0.32, 0.05, 0.16, 0.2, -10], [-0.42, 0.3, 0.14, 0.1, 0]];
  const id = `m${Math.round(cx)}${Math.round(r)}`;
  return (
    <g>
      <defs>
        <radialGradient id={id + 'b'} cx=".66" cy=".34" r=".85"><stop offset="0" stopColor={P.moonLit} /><stop offset=".6" stopColor={P.moonMid} /><stop offset="1" stopColor={P.moonDark} /></radialGradient>
        <radialGradient id={id + 'l'} cx=".5" cy=".5" r=".5"><stop offset=".8" stopColor="#000" stopOpacity={0} /><stop offset="1" stopColor="#000" stopOpacity={0.28} /></radialGradient>
        <clipPath id={id + 'c'}><circle cx={cx} cy={cy} r={r} /></clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r * 2.1} fill="url(#glowCream)" opacity={0.55 * glow} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}b)`} />
      <g clipPath={`url(#${id}c)`}>
        <g filter="url(#b6)">{maria.map(([x, y, rx, ry, rot], i) => <ellipse key={i} cx={cx + x * r} cy={cy + y * r} rx={rx * r} ry={ry * r} fill="#8E887C" opacity={0.42} transform={`rotate(${rot} ${cx + x * r} ${cy + y * r})`} />)}</g>
        {C.map((c, i) => { const x = cx + c.x * r, y = cy + c.y * r, s = c.s * r; return <g key={i}><circle cx={x} cy={y} r={s} fill="#9A9488" opacity={0.55} /><circle cx={x + s * 0.18} cy={y - s * 0.2} r={s * 0.78} fill={P.moonMid} opacity={0.6} /><path d={`M${x - s * 0.7} ${y + s * 0.5} A${s} ${s} 0 0 0 ${x + s * 0.8} ${y - s * 0.4}`} stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={Math.max(1, s * 0.12)} fill="none" /></g>; })}
        <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill={`url(#${id}l)`} />
        <ellipse cx={cx - r * 0.75} cy={cy + r * 0.2} rx={r * 0.7} ry={r * 1.2} fill="#1A2033" opacity={0.28} filter="url(#b14)" />
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- the Earth: REAL coastlines (Natural Earth 110 m), orthographic
export const Earth: React.FC<{ cx: number; cy: number; r: number; lon?: number; lat?: number; clouds?: number; spin?: number }> = ({ cx, cy, r, lon = -100, lat = 25, clouds = 1, spin = 0 }) => {
  const proj = geoOrthographic().scale(r).translate([cx, cy]).rotate([-lon - spin, -lat]).clipAngle(90), path = geoPath(proj);
  const d = path(land as never) || '', grat = path(geoGraticule10()) || '';
  const id = `e${Math.round(cx)}${Math.round(r)}`;
  const cl = useMemo(() => { const q = seq('cl'); return Array.from({ length: 22 }, () => ({ x: (q() - 0.5) * 1.8, y: (q() - 0.5) * 1.8, w: 0.08 + q() * 0.22, h: 0.012 + q() * 0.03, rot: -25 + q() * 30 })); }, []);
  return (
    <g>
      <defs>
        <radialGradient id={id + 'o'} cx=".7" cy=".3" r=".85"><stop offset="0" stopColor={P.oceanLit} /><stop offset=".6" stopColor={P.ocean} /><stop offset="1" stopColor="#0E2F52" /></radialGradient>
        <radialGradient id={id + 'a'} cx=".5" cy=".5" r=".5"><stop offset=".9" stopColor="#8CCBF5" stopOpacity={0} /><stop offset=".965" stopColor="#8CCBF5" stopOpacity={0.6} /><stop offset="1" stopColor="#8CCBF5" stopOpacity={0} /></radialGradient>
        <linearGradient id={id + 'n'} x1="1" y1="0" x2="0" y2="1"><stop offset=".42" stopColor="#020611" stopOpacity={0} /><stop offset=".85" stopColor="#020611" stopOpacity={0.78} /></linearGradient>
        <clipPath id={id + 'c'}><circle cx={cx} cy={cy} r={r} /></clipPath>
      </defs>
      <circle cx={cx} cy={cy} r={r * 1.075} fill={`url(#${id}a)`} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}o)`} />
      <g clipPath={`url(#${id}c)`}>
        <path d={grat} stroke="#FFFFFF" strokeOpacity={0.05} strokeWidth={1} fill="none" />
        <path d={d} fill={P.land} />
        <path d={d} fill={P.landLit} opacity={0.35} transform={`translate(${r * 0.004} ${-r * 0.004})`} />
        {clouds > 0 && <g filter="url(#b6)" opacity={0.42 * clouds}>{cl.map((c, i) => <ellipse key={i} cx={cx + c.x * r} cy={cy + c.y * r} rx={c.w * r} ry={c.h * r} fill="#FFFFFF" transform={`rotate(${c.rot} ${cx + c.x * r} ${cy + c.y * r})`} />)}</g>}
        <rect x={cx - r} y={cy - r} width={r * 2} height={r * 2} fill={`url(#${id}n)`} />
      </g>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#BFE3FF" strokeOpacity={0.35} strokeWidth={Math.max(1.5, r * 0.006)} />
    </g>
  );
};

// ---------------------------------------------------------------- land: ridges with haze, pines
export const Ridge: React.FC<{ y: number; amp: number; col: string; seed: string; rough?: number }> = ({ y, amp, col, seed, rough = 0.25 }) => {
  const d = useMemo(() => { const q = seq(seed), o = q() * 6; let s = `M0 1080 L0 ${y}`; for (let x = 0; x <= 1920; x += 24) s += ` L${x} ${(y - Math.sin(x / 310 + o) * amp - Math.sin(x / 97 + o * 2) * amp * 0.3 - q() * amp * rough).toFixed(1)}`; return s + ' L1920 1080Z'; }, [y, amp, seed, rough]);
  return <path d={d} fill={col} />;
};
export const Haze: React.FC<{ y: number; h: number; col?: string; a?: number }> = ({ y, h, col = '#4A5A82', a = 0.35 }) => <rect x={0} y={y} width={1920} height={h} fill={col} opacity={a} filter="url(#b30)" />;
export const Pines: React.FC<{ y: number; n: number; seed: string; col: string; h0?: number; h1?: number }> = ({ y, n, seed, col, h0 = 50, h1 = 120 }) => {
  const T = useMemo(() => { const q = seq(seed); return Array.from({ length: n }, (_, i) => ({ x: (i + q() * 0.8) * (1920 / n), y: y + q() * 26, h: h0 + q() * (h1 - h0) })); }, [y, n, seed, h0, h1]);
  return <g>{T.map((t, i) => { const w = t.h * 0.34; return <path key={i} d={`M${t.x} ${t.y - t.h} L${t.x + w * 0.45} ${t.y - t.h * 0.55} L${t.x + w * 0.3} ${t.y - t.h * 0.55} L${t.x + w * 0.7} ${t.y - t.h * 0.15} L${t.x + w * 0.12} ${t.y - t.h * 0.15} L${t.x + w * 0.12} ${t.y} L${t.x - w * 0.12} ${t.y} L${t.x - w * 0.12} ${t.y - t.h * 0.15} L${t.x - w * 0.7} ${t.y - t.h * 0.15} L${t.x - w * 0.3} ${t.y - t.h * 0.55} L${t.x - w * 0.45} ${t.y - t.h * 0.55}Z`} fill={col} />; })}</g>;
};

// ---------------------------------------------------------------- an observatory on a summit (dome panels, open slit, lit windows)
export const Observatory: React.FC<{ x: number; y: number; s: number; slit?: number }> = ({ x, y, s, slit = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <defs><linearGradient id="dome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6E778C" /><stop offset=".55" stopColor="#C9CFDC" /><stop offset=".85" stopColor="#E9ECF2" /><stop offset="1" stopColor="#AEB5C4" /></linearGradient>
      <linearGradient id="wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#2E364B" /><stop offset="1" stopColor="#56607A" /></linearGradient></defs>
    <ellipse cx={0} cy={4} rx={190} ry={16} fill="#000" opacity={0.35} filter="url(#b6)" />
    <rect x={-150} y={-70} width={300} height={74} fill="url(#wall)" /><rect x={-150} y={-70} width={300} height={8} fill="#7A84A0" />
    <rect x={-120} y={-46} width={26} height={30} rx={3} fill={P.amber} /><rect x={-120} y={-46} width={26} height={30} fill={P.amber} opacity={0.6} filter="url(#b14)" />
    <rect x={60} y={-44} width={22} height={28} rx={3} fill={P.warm} opacity={0.85} />
    <path d="M-132 -70 A132 132 0 0 1 132 -70Z" fill="url(#dome)" />
    {[-88, -44, 0, 44, 88].map(k => <path key={k} d={`M${k} -70 Q${k * 0.9} -150 ${k * 0.3} -${70 + Math.sqrt(132 * 132 - k * k)}`} stroke="#000" strokeOpacity={0.08} strokeWidth={2} fill="none" />)}
    <path d={`M${22 - 14 * slit} -196 L${40 + 10 * slit} -190 L${52 + 10 * slit} -72 L${22 - 14 * slit} -72Z`} fill="#0B1020" />
    <path d="M18 -120 L70 -168" stroke="#A9B1C4" strokeWidth={13} strokeLinecap="round" />
    <path d="M-132 -70 A132 132 0 0 1 132 -70" stroke={P.cream} strokeOpacity={0.35} strokeWidth={2.5} fill="none" strokeDasharray="0 200 400" />
  </g>
);

// ---------------------------------------------------------------- light: a beam and a travelling pulse (bloom)
export const Beam: React.FC<{ x1: number; y1: number; x2: number; y2: number; k: number; w?: number; dash?: boolean; a?: number }> = ({ x1, y1, x2, y2, k, w = 3.5, dash = false, a = 1 }) => {
  if (k <= 0) return null; const x = x1 + (x2 - x1) * Math.min(1, k), y = y1 + (y2 - y1) * Math.min(1, k);
  return <g opacity={a}><line x1={x1} y1={y1} x2={x} y2={y} stroke={P.amber} strokeWidth={w * 6} opacity={0.16} filter="url(#b6)" /><line x1={x1} y1={y1} x2={x} y2={y} stroke={P.amber} strokeWidth={w} strokeDasharray={dash ? '2 14' : undefined} strokeLinecap="round" opacity={0.9} /></g>;
};
export const Pulse: React.FC<{ x: number; y: number; r?: number; a?: number }> = ({ x, y, r = 40, a = 1 }) => <g opacity={a}><circle cx={x} cy={y} r={r * 3} fill={P.amber} opacity={0.1} filter="url(#b30)" /><circle cx={x} cy={y} r={r} fill="url(#glowAmber)" /></g>;

// ---------------------------------------------------------------- the Moon's ground from a REAL photo (Poly Haven CC0), toned to the palette
export const MoonGround: React.FC<{ src: string; horizon: number; t: number }> = ({ src, horizon }) => (
  <g>
    <defs>
      <filter id="duoMoon" colorInterpolationFilters="sRGB"><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncR type="table" tableValues="0.13 0.62 0.93" /><feFuncG type="table" tableValues="0.13 0.6 0.9" /><feFuncB type="table" tableValues="0.15 0.57 0.85" /></feComponentTransfer></filter>
      <clipPath id="ground"><path d={`M0 ${horizon + 40} Q960 ${horizon - 80} 1920 ${horizon + 40} L1920 1080 L0 1080Z`} /></clipPath>
      <linearGradient id="gshade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#05070C" stopOpacity={0.55} /><stop offset=".35" stopColor="#05070C" stopOpacity={0} /><stop offset="1" stopColor="#05070C" stopOpacity={0.35} /></linearGradient>
      <linearGradient id="glit" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor={P.warm} stopOpacity={0.16} /><stop offset=".6" stopColor={P.warm} stopOpacity={0} /></linearGradient>
    </defs>
    <g clipPath="url(#ground)">
      <image href={src} x={-200} y={horizon - 120} width={2320} height={1300} preserveAspectRatio="xMidYMid slice" filter="url(#duoMoon)" transform={`translate(0 0)`} style={{ transformOrigin: '960px 1080px' }} />
      <rect width={1920} height={1080} fill="url(#gshade)" /><rect width={1920} height={1080} fill="url(#glit)" />
    </g>
    <path d={`M0 ${horizon + 40} Q960 ${horizon - 80} 1920 ${horizon + 40}`} stroke={P.cream} strokeOpacity={0.4} strokeWidth={2} fill="none" />
  </g>
);

// ---------------------------------------------------------------- the Apollo laser reflector (a panel of 100 corner cubes on legs)
export const Reflector: React.FC<{ x: number; y: number; s: number; flash: number }> = ({ x, y, s, flash }) => {
  const cells: React.ReactNode[] = []; for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) { const cx = -135 + i * 30, cy = -135 + j * 30, lit = Math.max(0, flash - Math.hypot(i - 4.5, j - 4.5) * 0.08); cells.push(<g key={i * 10 + j}><rect x={cx - 13} y={cy - 13} width={26} height={26} rx={3} fill="#1B2030" /><circle cx={cx} cy={cy} r={10} fill="#3A4560" /><path d={`M${cx} ${cy - 10} L${cx + 8.6} ${cy + 5} L${cx - 8.6} ${cy + 5}Z`} fill="#56648A" opacity={0.7} /><circle cx={cx} cy={cy} r={10} fill={P.amber} opacity={lit} /></g>); }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={10} cy={150} rx={240} ry={26} fill="#000" opacity={0.5} filter="url(#b14)" />
      <path d="M-120 60 L-130 150 M120 60 L130 150 M0 70 L0 150" stroke="#8D93A3" strokeWidth={9} strokeLinecap="round" />
      <g transform="skewX(-12) rotate(-14)"><rect x={-162} y={-162} width={324} height={324} rx={10} fill="#B9BECB" /><rect x={-156} y={-156} width={312} height={312} rx={8} fill="#2A3045" />{cells}
        <rect x={-162} y={-162} width={324} height={324} rx={10} fill="none" stroke={P.cream} strokeOpacity={0.5} strokeWidth={3} strokeDasharray="0 330 650" /></g>
      {flash > 0.02 && <circle cx={0} cy={-10} r={220} fill="url(#glowAmber)" opacity={Math.min(1, flash) * 0.55} />}
    </g>
  );
};
