// The thumbnail of "How far away are the stars?" (FATHOM standard poster, kit/ThumbPoster). HERO: the brass ring of Bessel's eyepiece with a
// patch of night inside it — the far stars still, ONE near star caught twice (January, July), a hair apart, ringed in vermilion ink.
// Title: the big question. Kicker: Königsberg · 1838. Note: the coin seen from 13 km. Every word from the research pack (F2, F4).
import React from 'react';
import { ThumbPoster, ThumbPosterV } from '../../kit/ThumbPoster';

const seeded = (n: number) => { let s = n; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const VERM = '#B8432A', G = ['#F3D98A', '#D4A846', '#8A6420'];
const pol = (cx: number, cy: number, r: number, a: number) => [cx + Math.cos(a * Math.PI / 180) * r, cy + Math.sin(a * Math.PI / 180) * r];

const EyeHero: React.FC<{ cx: number; cy: number; R: number; W: number; H: number }> = ({ cx, cy, R, W, H }) => {
  const r = seeded(5), id = 'sdt' + W;
  const stars = Array.from({ length: 150 }, () => { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * R * .96; return [cx + Math.cos(a) * d, cy + Math.sin(a) * d, .7 + Math.pow(r(), 4) * 3.4]; });
  const nx = cx + R * .16, ny = cy - R * .1, gap = R * .14;
  return <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <radialGradient id={`${id}halo`}><stop offset=".6" stopColor="#ffd98a" stopOpacity=".35" /><stop offset="1" stopColor="#ffd98a" stopOpacity="0" /></radialGradient>
      <radialGradient id={`${id}sky`} cx=".45" cy=".4" r=".7"><stop offset="0" stopColor="#2E5C86" /><stop offset=".6" stopColor="#1D3557" /><stop offset="1" stopColor="#0B1030" /></radialGradient>
      <linearGradient id={`${id}brass`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={G[0]} /><stop offset=".5" stopColor={G[1]} /><stop offset="1" stopColor={G[2]} /></linearGradient>
      <filter id={`${id}sh`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="14" dy="20" stdDeviation="10" floodColor="#000" floodOpacity=".7" /></filter>
      <filter id={`${id}gl`} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="7" /></filter>
      <clipPath id={`${id}disk`}><circle cx={cx} cy={cy} r={R} /></clipPath>
      <pattern id={`${id}h`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><line x1="0" y1="0" x2="0" y2="6" stroke="#000" strokeWidth="1.2" /></pattern>
    </defs>
    <circle cx={cx} cy={cy} r={R + 130} fill={`url(#${id}halo)`} />
    <g filter={`url(#${id}sh)`}>
      {/* the eyepiece's brass drum, divided in degrees, and its knurled rim */}
      <circle cx={cx} cy={cy} r={R + 54} fill={`url(#${id}brass)`} stroke="#3a2414" strokeWidth="5" />
      {Array.from({ length: 180 }, (_, i) => { const a = i * 2, l = i % 5 ? 12 : 24, [x0, y0] = pol(cx, cy, R + 48 - l, a), [x1, y1] = pol(cx, cy, R + 48, a); return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke={G[2]} strokeWidth={i % 5 ? 1.5 : 2.6} />; })}
      <circle cx={cx} cy={cy} r={R + 8} fill="#1a120b" stroke="#3a2414" strokeWidth="6" />
      <circle cx={cx} cy={cy} r={R} fill={`url(#${id}sky)`} />
      <g clipPath={`url(#${id}disk)`}>
        {stars.map(([x, y, s], i) => <g key={i}><circle cx={x} cy={y} r={s * 1.3} fill="#2B1D12" opacity=".5" /><circle cx={x} cy={y} r={s} fill="#FFF4D2" /></g>)}
        <line x1={cx - R} y1={cy} x2={cx + R} y2={cy} stroke="#C9AE84" strokeWidth="1.4" opacity=".55" /><line x1={cx} y1={cy - R} x2={cx} y2={cy + R} stroke="#C9AE84" strokeWidth="1.4" opacity=".55" />
        <circle cx={cx} cy={cy} r={R} fill={`url(#${id}h)`} opacity=".16" />
      </g>
      {/* the near star caught twice: January (cream) and July (gold), a hair apart — the parallax */}
      <circle cx={nx - gap / 2} cy={ny} r="26" fill="#FFF4D2" opacity=".55" filter={`url(#${id}gl)`} /><circle cx={nx - gap / 2} cy={ny} r="9" fill="#FFFDF4" />
      <circle cx={nx + gap / 2} cy={ny} r="26" fill="#F7E3A0" opacity=".55" filter={`url(#${id}gl)`} /><circle cx={nx + gap / 2} cy={ny} r="9" fill="#F3D98A" />
      <path d={`M ${nx - gap / 2 + 14} ${ny + 26} L ${nx + gap / 2 - 14} ${ny + 26}`} stroke={VERM} strokeWidth="4" />
      {[-1, 1].map(k => <path key={k} d={`M ${nx + k * (gap / 2 - 14)} ${ny + 18} v 16`} stroke={VERM} strokeWidth="4" />)}
    </g>
    {/* one vermilion ink ring round the star that moved */}
    <path d={`M ${nx - 70} ${ny - 30} C ${nx - 34} ${ny - 78}, ${nx + 70} ${ny - 70}, ${nx + 76} ${ny - 6} C ${nx + 80} ${ny + 52}, ${nx - 20} ${ny + 70}, ${nx - 66} ${ny + 30} C ${nx - 86} ${ny + 8}, ${nx - 80} ${ny - 22}, ${nx - 52} ${ny - 44}`} fill="none" stroke={VERM} strokeWidth="6" strokeLinecap="round" />
  </svg>;
};

// the observing room behind: the dome's timber ribs, a shelf of log books, the hanging lantern
const Tower: React.FC<{ W: number; H: number }> = ({ W, H }) => <g opacity=".55">
  {Array.from({ length: 9 }, (_, i) => { const u = (i - 4) / 4; return <path key={i} d={`M ${W / 2 + u * W * .7} ${H} Q ${W / 2 + u * W * .5} ${H * .35} ${W / 2 + u * 60} -10`} fill="none" stroke="#120a05" strokeWidth="5" />; })}
  <rect x={W - 470} y={H > 1000 ? 420 : 150} width="470" height="10" fill="#120a05" />
  {[0, 1, 2, 3, 4].map(i => <rect key={i} x={W - 440 + i * 84} y={(H > 1000 ? 360 : 92) - (i % 2) * 8} width="66" height={58 + (i % 2) * 8} fill="#120a05" />)}
  <rect x="0" y={H - 56} width={W} height="56" fill="#24160b" /><rect x="0" y={H - 60} width={W} height="6" fill="#6a4430" />
</g>;

const words = (p: any) => ({ kicker: p.kicker ?? 'Königsberg · 1838', title: p.lines ?? ['HOW FAR', 'ARE THE', 'STARS?'], accent: p.accent ?? 2, note: p.note ?? 'A coin, seen from 13 km away.' });
export const THUMB: React.FC<any> = (p) => <ThumbPoster {...words(p)} hero={<EyeHero cx={930} cy={380} R={228} W={1280} H={720} />} back={<Tower W={1280} H={720} />} lamp={[930, 300]} />;
export const THUMB_V: React.FC<any> = (p) => <ThumbPosterV {...words(p)} hero={<EyeHero cx={540} cy={1062} R={260} W={1080} H={1920} />} back={<Tower W={1080} H={1920} />} />;
