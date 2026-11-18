// The thumbnail of "What killed the dinosaurs?" (FATHOM standard poster, kit/ThumbPoster). HERO: a slab of Gubbio limestone stood on end —
// pale beds full of tiny shells below, a thin band of red clay, almost empty stone above — with a theropod skull lying on the top edge and
// the clay line ringed in vermilion ink. Title: the big question. Kicker: Gubbio · Yucatán. Note: one centimetre (F2). Words from the pack.
import React from 'react';
import { ThumbPoster, ThumbPosterV } from '../../kit/ThumbPoster';

const seeded = (n: number) => { let s = n; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const VERM = '#B8432A';
const BEDS = ['#EFE0C2', '#E8C9A8', '#F3E7CC', '#E2BFA0', '#EFE0C2', '#E6CDB0', '#F0D9A8', '#8C3424', '#F3E7CC', '#EBD6B8', '#F0E2C8', '#E4CBAA'];

const Slab: React.FC<{ cx: number; cy: number; w: number; h: number; W: number }> = ({ cx, cy, w, h, W }) => {
  const r = seeded(11), id = 'dkt' + W, x0 = cx - w / 2, y0 = cy - h / 2, bh = h / BEDS.length;
  const clayY = y0 + bh * 7;
  return <svg width={W} height={W > 1100 && W < 1300 ? 720 : 1920} style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <filter id={`${id}sh`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="18" dy="24" stdDeviation="12" floodColor="#000" floodOpacity=".75" /></filter>
      <linearGradient id={`${id}side`} x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".45" /></linearGradient>
      <pattern id={`${id}h`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="5" stroke="#2B1D12" strokeWidth=".9" /></pattern>
      <clipPath id={`${id}c`}><path d={`M${x0} ${y0 + 10} L${x0 + w - 6} ${y0} L${x0 + w} ${y0 + h} L${x0 + 8} ${y0 + h - 6}Z`} /></clipPath>
    </defs>
    <g filter={`url(#${id}sh)`}>
      <g clipPath={`url(#${id}c)`}>
        {BEDS.map((c, i) => { const t = i === 7 ? bh * .45 : bh; const y = y0 + bh * i + (i > 7 ? -bh * .55 : 0); return <rect key={i} x={x0 - 10} y={y} width={w + 20} height={i === 7 ? t : t + 1} fill={c} />; })}
        {BEDS.map((_, i) => <path key={'l' + i} d={`M${x0} ${y0 + bh * i} q ${w / 2} ${(r() - .5) * 8} ${w} 0`} stroke="#5A3A22" strokeWidth="1.6" fill="none" opacity=".7" />)}
        {/* the tiny shells: crowded below the clay, almost none above */}
        {Array.from({ length: 220 }, (_, i) => { const below = i < 200, y = below ? clayY + 10 + r() * (y0 + h - clayY - 20) : y0 + 10 + r() * (clayY - y0 - 30), x = x0 + 10 + r() * (w - 20), s = 2 + r() * 4;
          return <g key={i} opacity=".75"><circle cx={x} cy={y} r={s} fill="none" stroke="#5A3A22" strokeWidth="1" /><circle cx={x + s * .6} cy={y - s * .3} r={s * .55} fill="none" stroke="#5A3A22" strokeWidth=".8" /></g>; })}
        <rect x={x0} y={y0} width={w} height={h} fill={`url(#${id}h)`} opacity=".12" />
        <rect x={x0 + w * .72} y={y0} width={w * .28} height={h} fill={`url(#${id}side)`} />
      </g>
      <path d={`M${x0} ${y0 + 10} L${x0 + w - 6} ${y0} L${x0 + w} ${y0 + h} L${x0 + 8} ${y0 + h - 6}Z`} fill="none" stroke="#2B1D12" strokeWidth="4" />
    </g>
    {/* a theropod skull lying on the top edge */}
    <g transform={`translate(${cx - w * .32} ${y0 - 6}) scale(${w / 520})`}>
      <path d="M0 0 C20 -70 120 -110 240 -96 C320 -86 380 -60 400 -22 L392 0 Z" fill="#E9DCC0" stroke="#2B1D12" strokeWidth="4" />
      <ellipse cx="110" cy="-56" rx="34" ry="24" fill="#2B1D12" /><ellipse cx="220" cy="-48" rx="50" ry="20" fill="#2B1D12" /><ellipse cx="330" cy="-36" rx="22" ry="12" fill="#2B1D12" />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${60 + i * 28} -2 l7 18 l7 -18`} fill="#FBF4E2" stroke="#2B1D12" strokeWidth="2" />)}
    </g>
    {/* the vermilion ink ring round the clay line */}
    <path d={`M ${x0 - 30} ${clayY - 6} C ${x0 + w * .2} ${clayY - 60}, ${x0 + w * .9} ${clayY - 54}, ${x0 + w + 36} ${clayY + 4} C ${x0 + w + 40} ${clayY + 48}, ${x0 + w * .3} ${clayY + 62}, ${x0 - 20} ${clayY + 30} C ${x0 - 44} ${clayY + 14}, ${x0 - 30} ${clayY - 18}, ${x0 + 6} ${clayY - 36}`} fill="none" stroke={VERM} strokeWidth="7" strokeLinecap="round" />
  </svg>;
};

// the field behind: a dark gorge wall with tilted beds and a strip of night sky with one falling point
const Gorge: React.FC<{ W: number; H: number }> = ({ W, H }) => <g opacity=".5">
  {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M -20 ${H * .3 + i * 46} L ${W + 20} ${H * .1 + i * 46}`} stroke="#120a05" strokeWidth={i % 3 ? 3 : 7} />)}
  <circle cx={W * .62} cy={H * .1} r="5" fill="#FFF4D2" /><path d={`M ${W * .62} ${H * .1} l -60 -34`} stroke="#F2A672" strokeWidth="3" opacity=".8" />
  <rect x="0" y={H - 56} width={W} height="56" fill="#24160b" /><rect x="0" y={H - 60} width={W} height="6" fill="#6a4430" />
</g>;

const words = (p: any) => ({ kicker: p.kicker ?? 'Gubbio · Yucatán', title: p.lines ?? ['WHAT', 'KILLED THE', 'DINOSAURS?'], accent: p.accent ?? 2, note: p.note ?? 'One centimetre of clay.' });
export const THUMB: React.FC<any> = (p) => <ThumbPoster {...words(p)} hero={<Slab cx={930} cy={410} w={330} h={470} W={1280} />} back={<Gorge W={1280} H={720} />} lamp={[930, 260]} />;
export const THUMB_V: React.FC<any> = (p) => <ThumbPosterV {...words(p)} hero={<Slab cx={540} cy={1080} w={420} h={600} W={1080} />} back={<Gorge W={1080} H={1920} />} />;
