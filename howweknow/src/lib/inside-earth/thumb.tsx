// "What is inside the Earth?" — the standard poster (kit/ThumbPoster) with this film's hero: the Earth cut open in a brass seismograph ring,
// earthquake rays bending through it, and Lehmann's one faint wave (P′) surfacing inside the shadow zone, ringed in red ink.
// Facts: research F1 (deepest hole ≈ 12 km), F9 (Lehmann, Copenhagen, 1936), F7/F10 (core 2,900 km down; inner core ≈ 1,220 km).
import React from 'react';
import { ThumbPoster, ThumbPosterV, TONE } from '../../kit/ThumbPoster';

const G = TONE.gold, VERM = TONE.verm;
const pol = (cx: number, cy: number, r: number, a: number) => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
const wedge = (cx: number, cy: number, r: number, a0: number, a1: number) => { const [x0, y0] = pol(cx, cy, r, a0), [x1, y1] = pol(cx, cy, r, a1); return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`; };

const EarthHero: React.FC<{ cx: number; cy: number; R: number; W: number; H: number }> = ({ cx, cy, R, W, H }) => {
  const q = pol(cx, cy, R, 200);   // the earthquake (Buller, NZ — drawn as a star on the rim)
  const rays = [236, 262, 290, 318, 338].map(a => { const [x, y] = pol(cx, cy, R, a), m = [(q[0] + x) / 2, (q[1] + y) / 2], k = .32; return `M ${q[0]} ${q[1]} Q ${m[0] + (cx - m[0]) * -k} ${m[1] + (cy - m[1]) * -k} ${x} ${y}`; });
  const [ex, ey] = pol(cx, cy, R, 52);   // P′ surfaces inside the shadow zone
  const id = `eh${W}`;
  return <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <radialGradient id={`${id}sea`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#7FA8C4" /><stop offset=".6" stopColor="#2E5C86" /><stop offset="1" stopColor="#14284a" /></radialGradient>
      <radialGradient id={`${id}mantle`} cx="0" cy="0" r={R} gradientUnits="userSpaceOnUse" gradientTransform={`translate(${cx} ${cy})`}><stop offset=".55" stopColor="#F2A672" /><stop offset=".8" stopColor="#D2643E" /><stop offset="1" stopColor="#8C3424" /></radialGradient>
      <radialGradient id={`${id}outer`} cx="0" cy="0" r={R * .546} gradientUnits="userSpaceOnUse" gradientTransform={`translate(${cx} ${cy})`}><stop offset=".35" stopColor="#F8DC8A" /><stop offset="1" stopColor="#E89A3E" /></radialGradient>
      <radialGradient id={`${id}inner`}><stop offset="0" stopColor="#fffbe8" /><stop offset=".5" stopColor="#FFF4D2" /><stop offset="1" stopColor="#E9B456" /></radialGradient>
      <radialGradient id={`${id}halo`}><stop offset=".55" stopColor="#ffcf80" stopOpacity=".38" /><stop offset="1" stopColor="#ffcf80" stopOpacity="0" /></radialGradient>
      <linearGradient id={`${id}brass`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff0b8" /><stop offset=".25" stopColor={G[0]} /><stop offset=".5" stopColor={G[1]} /><stop offset=".62" stopColor="#ffeeb0" /><stop offset=".85" stopColor={G[1]} /><stop offset="1" stopColor={G[2]} /></linearGradient>
      <pattern id={`${id}h`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><line x1="0" y1="0" x2="0" y2="6" stroke="#2B1D12" strokeWidth="1" /></pattern>
      <filter id={`${id}sh`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="-10" dy="22" stdDeviation="18" floodColor="#000" floodOpacity=".8" /></filter>
      <filter id={`${id}gl`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10" /></filter>
      <clipPath id={`${id}disk`}><circle cx={cx} cy={cy} r={R} /></clipPath>
    </defs>
    <circle cx={cx} cy={cy} r={R + 120} fill={`url(#${id}halo)`} />
    <g filter={`url(#${id}sh)`}>
      {/* the brass ring of a seismograph globe, engraved in degrees */}
      <circle cx={cx} cy={cy} r={R + 46} fill={`url(#${id}brass)`} stroke="#3a2414" strokeWidth="5" />
      {Array.from({ length: 180 }, (_, i) => { const a = i * 2, l = i % 5 ? 12 : 22, [x0, y0] = pol(cx, cy, R + 40 - l, a), [x1, y1] = pol(cx, cy, R + 40, a); return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={G[2]} strokeWidth={i % 5 ? 1.5 : 2.5} />; })}
      <circle cx={cx} cy={cy} r={R + 6} fill="#1a120b" stroke="#3a2414" strokeWidth="6" />
      {/* the planet: indigo sea, ochre land, engraved */}
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}sea)`} />
      <g clipPath={`url(#${id}disk)`}>
        {[-60, -30, 0, 30, 60].map(l => <ellipse key={'la' + l} cx={cx} cy={cy + R * Math.sin(l * Math.PI / 180)} rx={R * Math.cos(l * Math.PI / 180)} ry={R * Math.cos(l * Math.PI / 180) * .18} fill="none" stroke="#FBF4E2" strokeOpacity=".22" strokeWidth="1.6" />)}
        {[-60, -30, 0, 30, 60].map(m => <ellipse key={'lo' + m} cx={cx} cy={cy} rx={Math.abs(R * Math.sin(m * Math.PI / 180)) || 1} ry={R} fill="none" stroke="#FBF4E2" strokeOpacity=".22" strokeWidth="1.6" />)}
        <circle cx={cx} cy={cy} r={R} fill={`url(#${id}h)`} opacity=".14" />
      </g>
      {/* the cut: a wedge opened to the centre — crust, mantle, liquid outer core, solid inner core */}
      <path d={wedge(cx, cy, R, -90, 20)} fill="#8C5A36" stroke="#2B1D12" strokeWidth="3" />
      <path d={wedge(cx, cy, R * .975, -90, 20)} fill={`url(#${id}mantle)`} />
      <path d={wedge(cx, cy, R * .546, -90, 20)} fill={`url(#${id}outer)`} stroke="#8C3424" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={R * .26} fill="#fff4d2" opacity=".5" filter={`url(#${id}gl)`} />
      <path d={wedge(cx, cy, R * .19, -90, 20)} fill={`url(#${id}inner)`} stroke="#B98A50" strokeWidth="2" />
      <path d={wedge(cx, cy, R, -90, 20)} fill={`url(#${id}h)`} opacity=".12" />
    </g>
    {/* earthquake rays bending through the planet, and the shadow zone where they should not arrive */}
    <g clipPath={`url(#${id}disk)`}>{rays.map((d, i) => <path key={i} d={d} fill="none" stroke="#FBF4E2" strokeWidth="3" strokeDasharray="10 8" opacity=".8" />)}
      <path d={`M ${q[0]} ${q[1]} L ${cx - R * .1} ${cy + R * .05} L ${ex} ${ey}`} fill="none" stroke={VERM} strokeWidth="5" strokeDasharray="12 7" /></g>
    <path d={`M ${q[0] - 22} ${q[1]} l 14 -6 l 8 -16 l 8 16 l 16 6 l -16 6 l -8 16 l -8 -16 Z`} fill={VERM} stroke="#2B1D12" strokeWidth="2" />
    {/* Lehmann's faint wave, surfacing where none should be — ringed in red ink */}
    <circle cx={ex} cy={ey} r="10" fill="#fff" />
    <path d={`M ${ex - 44} ${ey - 24} C ${ex - 20} ${ey - 58}, ${ex + 40} ${ey - 46}, ${ex + 44} ${ey - 4} C ${ex + 48} ${ey + 38}, ${ex - 16} ${ey + 52}, ${ex - 42} ${ey + 20} C ${ex - 56} ${ey + 2}, ${ex - 52} ${ey - 20}, ${ex - 32} ${ey - 36}`} fill="none" stroke={VERM} strokeWidth="5.5" strokeLinecap="round" />
  </svg>;
};

// her study: a seismogram strip pinned on the wall, card boxes on a shelf, the lamp, the desk
const Study: React.FC<{ W: number; H: number }> = ({ W, H }) => {
  const wig = Array.from({ length: 120 }, (_, i) => { const x = i * 6, a = i > 60 && i < 74 ? 26 : i > 74 ? 8 : 3; return `${x},${(Math.sin(i * 1.7) * a + Math.sin(i * .6) * a * .5).toFixed(1)}`; }).join(' ');
  return <g opacity=".6">
    <g transform={`translate(${W > 1100 ? 70 : 60} ${W > 1100 ? 610 : 1690}) rotate(-2)`}><rect width="720" height="62" fill="#e9dcbc" /><polyline points={wig} transform="translate(0 31)" fill="none" stroke="#2B1D12" strokeWidth="2" /></g>
    <rect x={W - 560} y="146" width="560" height="10" fill="#120a05" />
    {[0, 1, 2, 3, 4].map(i => <rect key={i} x={W - 520 + i * 96} y={92 - (i % 2) * 8} width="78" height={54 + (i % 2) * 8} fill="#120a05" />)}
    <line x1={W > 1100 ? 935 : 540} y1="0" x2={W > 1100 ? 935 : 540} y2={W > 1100 ? 16 : 70} stroke="#120a05" strokeWidth="4" />
    {W > 1100 ? <><path d="M 885 52 L 905 14 L 965 14 L 985 52 Z" fill="#2f5440" stroke="#d4a846" strokeWidth="3" /><ellipse cx="935" cy="54" rx="40" ry="7" fill="#fff1c8" /></>
      : <><path d="M 470 140 L 500 70 L 580 70 L 610 140 Z" fill="#2f5440" stroke="#d4a846" strokeWidth="4" /><ellipse cx="540" cy="142" rx="58" ry="10" fill="#fff1c8" /></>}
    <rect x="0" y={H - 56} width={W} height="56" fill="#24160b" /><rect x="0" y={H - 60} width={W} height="6" fill="#6a4430" />
  </g>;
};

const words = (p: any) => ({ kicker: p.kicker ?? 'Copenhagen · 1936', title: p.lines ?? ["WHAT'S", 'INSIDE', 'THE EARTH?'], accent: p.accent ?? 1, note: p.note ?? 'We have dug only 12 km.' });
export const THUMB: React.FC<any> = (p) => <ThumbPoster {...words(p)} hero={<EarthHero cx={935} cy={390} R={222} W={1280} H={720} />} back={<Study W={1280} H={720} />} lamp={[935, 300]} />;
export const THUMB_V: React.FC<any> = (p) => <ThumbPosterV {...words(p)} hero={<EarthHero cx={540} cy={1062} R={250} W={1080} H={1920} />} back={<Study W={1080} H={1920} />} />;
