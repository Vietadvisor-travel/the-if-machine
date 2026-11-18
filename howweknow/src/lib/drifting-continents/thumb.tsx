// The thumbnail of "How do we know the continents move?" (FATHOM poster, kit/ThumbPoster). HERO: an old atlas page torn down the middle of
// the Atlantic — South America on the left half, Africa on the right, the two coasts still matching across a dark gap, the tear's edge inked
// in vermilion. Back: the striped sea floor (gold/indigo bands, symmetric about the ridge). Words from the pack (F8: a few centimetres a year).
import React from 'react';
import { ThumbPoster, ThumbPosterV } from '../../kit/ThumbPoster';
const VERM = '#B8432A';
const SA = 'M120 40 C170 20 230 30 270 60 C320 90 360 110 350 160 C340 200 300 230 280 280 C260 330 240 380 200 420 C180 440 170 470 160 500 C150 470 150 430 140 390 C130 330 100 280 90 220 C80 160 70 100 120 40Z';
const AF = 'M60 30 C120 10 200 20 250 40 C300 60 330 90 340 130 C350 170 330 200 320 240 C310 290 280 330 240 380 C210 410 190 420 180 400 C170 360 160 320 150 280 C140 240 100 220 70 200 C40 180 20 150 20 110 C20 70 30 45 60 30Z';
const Torn: React.FC<{ cx: number; cy: number; s: number; W: number; H: number }> = ({ cx, cy, s, W, H }) => {
  const w = 520 * s, h = 600 * s, x0 = cx - w / 2, y0 = cy - h / 2, g = 34 * s;
  const tear = Array.from({ length: 16 }, (_, i) => `${(i % 2 ? 10 : -10) * s} ${(h / 15) * i}`);
  const edge = (dx: number) => tear.map((p, i) => { const [a, b] = p.split(' ').map(Number); return `${i ? 'L' : 'M'}${cx + dx + a} ${y0 + b}`; }).join(' ');
  return <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
    <defs><filter id={`tt${W}`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="14" dy="20" stdDeviation="12" floodColor="#000" floodOpacity=".7" /></filter></defs>
    <g filter={`url(#tt${W})`}>
      <g transform={`translate(${-g} 0) rotate(-3 ${cx} ${cy})`}>
        <path d={`M${x0} ${y0} L${cx} ${y0} ${edge(0).replace(/^M/, 'L')} L${x0} ${y0 + h}Z`} fill="#F1E3C4" stroke="#2B1D12" strokeWidth="3" />
        <path d={SA} transform={`translate(${x0 + w * .12} ${y0 + h * .12}) scale(${s * 1.05})`} fill="#C9A86A" stroke="#2B1D12" strokeWidth="3" />
        <path d={`M${cx} ${y0} ${edge(0).replace(/^M/, 'L')}`} fill="none" stroke={VERM} strokeWidth="5" />
      </g>
      <g transform={`translate(${g} 0) rotate(3 ${cx} ${cy})`}>
        <path d={`M${x0 + w} ${y0} L${cx} ${y0} ${edge(0).replace(/^M/, 'L')} L${x0 + w} ${y0 + h}Z`} fill="#F1E3C4" stroke="#2B1D12" strokeWidth="3" />
        <path d={AF} transform={`translate(${cx + w * .04} ${y0 + h * .06}) scale(${s * 1.05})`} fill="#C9A86A" stroke="#2B1D12" strokeWidth="3" />
        <path d={`M${cx} ${y0} ${edge(0).replace(/^M/, 'L')}`} fill="none" stroke={VERM} strokeWidth="5" />
      </g>
    </g>
  </svg>;
};
const Stripes: React.FC<{ W: number; H: number }> = ({ W, H }) => { const ws = [18, 30, 12, 26, 40, 16, 22, 34]; let x = 0; const bands: [number, number][] = [];
  ws.forEach(w => { bands.push([x, w]); x += w; });
  return <g opacity=".55">{bands.map(([o, w], i) => <g key={i}><rect x={W / 2 + o} y={0} width={w} height={H} fill={i % 2 ? '#1E2A44' : '#C9A24A'} /><rect x={W / 2 - o - w} y={0} width={w} height={H} fill={i % 2 ? '#1E2A44' : '#C9A24A'} /></g>)}
    <rect x={W / 2 - 3} y={0} width={6} height={H} fill={VERM} /></g>; };
const words = (p: any) => ({ kicker: p.kicker ?? 'Wegener · 1912', title: p.lines ?? ['HOW DO WE', 'KNOW THE', 'CONTINENTS MOVE?'], accent: p.accent ?? 2, note: p.note ?? 'A few centimetres a year.' });
export const THUMB: React.FC<any> = (p) => <ThumbPoster {...words(p)} hero={<Torn cx={930} cy={390} s={.72} W={1280} H={720} />} back={<Stripes W={1280} H={720} />} lamp={[930, 260]} />;
export const THUMB_V: React.FC<any> = (p) => <ThumbPosterV {...words(p)} hero={<Torn cx={540} cy={1080} s={1} W={1080} H={1920} />} back={<Stripes W={1080} H={1920} />} />;
