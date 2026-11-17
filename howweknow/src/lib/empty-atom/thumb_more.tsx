// Three more thumbnail designs for "What is inside an atom?" (owner 17 Nov 2026: "chữ to dầy hơn, to hơn, màu sắc đa dạng, bố cục,
// visual chất hơn nữa — cho anh 4 bản"). Every word and number is from the research pack (F-ids in jobs/research/empty-atom.md).
import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { BigTitle, seeded } from './thumb_kit';

const Mark: React.FC = () => <Img src={staticFile('brand/fathom_mark.png')} style={{ position: 'absolute', right: 24, bottom: 20, width: 74, height: 74 }} />;
const Grain: React.FC<{ a?: number }> = ({ a = .14 }) => <Img src={staticFile('core/fibres.jpg')} style={{ position: 'absolute', inset: 0, width: 1280, height: 720, objectFit: 'cover', opacity: a, mixBlendMode: 'overlay' }} />;

// B · If an atom were a stadium (S11, S12): bright, colourful, scale shock
export const Stadium: React.FC = () => {
  const cx = 800, cy = 520, rings = 9, r = seeded(5);
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3e8fd0" /><stop offset=".55" stopColor="#9fd3f2" /><stop offset="1" stopColor="#e9f5fb" /></linearGradient>
        <linearGradient id="pitch" x1="0" y1="0" x2="1" y2="0">{Array.from({ length: 14 }, (_, i) => [<stop key={i + 'a'} offset={i / 14} stopColor={i % 2 ? '#3f9b4a' : '#4fb259'} />, <stop key={i + 'b'} offset={(i + 1) / 14} stopColor={i % 2 ? '#3f9b4a' : '#4fb259'} />])}</linearGradient>
        <radialGradient id="pea"><stop offset="0" stopColor="#fffbe0" /><stop offset=".3" stopColor="#ffd84a" /><stop offset="1" stopColor="#ffb300" stopOpacity="0" /></radialGradient>
        <filter id="g2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <rect width="1280" height="720" fill="url(#sky)" />
      {/* soft clouds */}
      {[[180, 330, 1], [520, 250, .8], [1120, 300, 1.1]].map(([x, y, k], i) => <g key={i} opacity=".85" filter="url(#g2)">{[0, 1, 2, 3].map(j => <ellipse key={j} cx={x + (j - 1.5) * 50 * k} cy={y - (j % 2) * 18 * k} rx={60 * k} ry={30 * k} fill="#fff" />)}</g>)}
      {/* the bowl: rings of empty seats, outer to inner */}
      {Array.from({ length: rings }, (_, i) => { const t = i / (rings - 1), rx = 600 - t * 260, ry = 230 - t * 120, y = cy - 34 + t * 34;
        return <g key={i}><ellipse cx={cx} cy={y} rx={rx} ry={ry} fill={i % 3 === 0 ? '#b8442f' : i % 3 === 1 ? '#d9653f' : '#efe2c4'} stroke="#5a2318" strokeWidth="2" />
          <ellipse cx={cx} cy={y} rx={rx - 10} ry={ry - 6} fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="1.5" strokeDasharray="3 6" /></g>; })}
      {/* the pitch */}
      <ellipse cx={cx} cy={cy} rx="330" ry="104" fill="url(#pitch)" stroke="#2d6e33" strokeWidth="3" />
      <ellipse cx={cx} cy={cy} rx="270" ry="80" fill="none" stroke="#fff" strokeWidth="3" opacity=".85" />
      <line x1={cx} y1={cy - 80} x2={cx} y2={cy + 80} stroke="#fff" strokeWidth="3" opacity=".85" />
      <ellipse cx={cx} cy={cy} rx="56" ry="20" fill="none" stroke="#fff" strokeWidth="3" opacity=".85" />
      {/* electrons: specks of dust round the highest seats */}
      {Array.from({ length: 16 }, (_, i) => { const t = r() * Math.PI * 2; return <circle key={i} cx={cx + Math.cos(t) * 590} cy={cy - 34 + Math.sin(t) * 226} r="4" fill="#fff" stroke="#3e8fd0" strokeWidth="1.5" />; })}
      {/* the pea: the nucleus */}
      <circle cx={cx} cy={cy} r="40" fill="url(#pea)" />
      <circle cx={cx} cy={cy} r="7" fill="#fff4b0" stroke="#b37a00" strokeWidth="1.5" />
      <path d={`M ${cx - 46} ${cy - 18} C ${cx - 40} ${cy - 52}, ${cx + 46} ${cy - 50}, ${cx + 50} ${cy - 6} C ${cx + 54} ${cy + 36}, ${cx - 30} ${cy + 46}, ${cx - 50} ${cy + 14} C ${cx - 58} ${cy}, ${cx - 52} ${cy - 22}, ${cx - 36} ${cy - 34}`} fill="none" stroke="#e8141c" strokeWidth="6" strokeLinecap="round" />
      <path d={`M 420 650 C 520 650, ${cx - 160} ${cy + 80}, ${cx - 48} ${cy + 22}`} fill="none" stroke="#e8141c" strokeWidth="7" strokeLinecap="round" />
      <path d={`M ${cx - 48} ${cy + 22} l -28 -2 M ${cx - 48} ${cy + 22} l -12 24`} stroke="#e8141c" strokeWidth="7" strokeLinecap="round" />
      <g transform="rotate(-4 300 660)"><rect x="160" y="626" width="276" height="64" rx="6" fill="#e8141c" stroke="#5a0a0a" strokeWidth="3" />
        <text x="298" y="671" textAnchor="middle" fontFamily="Alfa Slab One" fontSize="35" fill="#fff">THE NUCLEUS</text></g>
    </svg>
    <Grain a={.1} />
    <BigTitle x={36} y={14} font="Abril Fatface" stroke="#14213d" sw={16} gap={.86}
      lines={[{ t: 'MOSTLY', size: 128, fill: '#ffd23f' }, { t: 'EMPTY', size: 168, fill: '#ffffff' }]} />
    <div style={{ position: 'absolute', right: 40, top: 46, fontFamily: 'IM Fell English SC', fontSize: 38, letterSpacing: 2, color: '#14213d', textAlign: 'right', lineHeight: 1.1, textShadow: '0 0 14px rgba(255,255,255,.95)' }}>if an atom<br />were a stadium…</div>
    <Mark />
  </AbsoluteFill>;
};

// C · The 15-inch shell and the tissue paper (T-01, S8, S9): teal + orange action
export const Shell: React.FC = () => {
  const ix = 470, iy = 360;   // impact
  const spikes = Array.from({ length: 18 }, (_, i) => { const t = i / 18 * Math.PI * 2, rr = i % 2 ? 46 : 104; return `${ix + Math.cos(t) * rr},${iy + Math.sin(t) * rr}`; }).join(' ');
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id="tb" cx=".38" cy=".5" r=".85"><stop offset="0" stopColor="#2a9bb0" /><stop offset=".45" stopColor="#0f5566" /><stop offset="1" stopColor="#041b22" /></radialGradient>
        <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d6a70" /><stop offset=".22" stopColor="#dfe7ea" /><stop offset=".35" stopColor="#f7fbfc" /><stop offset=".6" stopColor="#8d9ba1" /><stop offset="1" stopColor="#2e383d" /></linearGradient>
        <linearGradient id="copper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7a3c16" /><stop offset=".3" stopColor="#f0a35e" /><stop offset=".6" stopColor="#b8692f" /><stop offset="1" stopColor="#4a210b" /></linearGradient>
        <radialGradient id="burst"><stop offset="0" stopColor="#fffbe6" /><stop offset=".35" stopColor="#ffd34d" /><stop offset=".7" stopColor="#ff8a1e" /><stop offset="1" stopColor="#ff5a1e" stopOpacity="0" /></radialGradient>
        <filter id="g3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="sh3" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000" floodOpacity=".6" /></filter>
      </defs>
      <rect width="1280" height="720" fill="url(#tb)" />
      {Array.from({ length: 40 }, (_, i) => { const t = i / 40 * Math.PI * 2, a = 140 + (i % 4) * 30; return <line key={i} x1={ix + Math.cos(t) * a} y1={iy + Math.sin(t) * a} x2={ix + Math.cos(t) * (a + 260 + (i % 3) * 120)} y2={iy + Math.sin(t) * (a + 260 + (i % 3) * 120)} stroke="#bff3ff" strokeOpacity=".16" strokeWidth={i % 3 ? 2 : 4} />; })}
      {/* the tissue paper, hanging, dented where the shell struck */}
      <line x1={ix - 120} y1="196" x2={ix + 130} y2="188" stroke="#3b2a1a" strokeWidth="6" strokeLinecap="round" />
      <path d={`M ${ix - 100} 194 L ${ix + 108} 188 L ${ix + 96} ${iy - 50} Q ${ix + 60} ${iy} ${ix + 104} ${iy + 60} L ${ix + 118} 690 L ${ix - 92} 700 L ${ix - 82} ${iy + 56} Q ${ix - 124} ${iy} ${ix - 86} ${iy - 54} Z`} fill="#fbf7ee" opacity=".82" stroke="#d8cfbd" strokeWidth="2" />
      {[260, 300, 470, 540, 610].map((y, i) => <path key={i} d={`M ${ix - 80 + (i % 2) * 20} ${y} q 60 ${i % 2 ? 10 : -10} ${150 - (i % 2) * 40} 0`} stroke="#d8cfbd" strokeWidth="2" fill="none" />)}
      <circle cx={ix} cy={iy} r="130" fill="url(#burst)" filter="url(#g3)" />
      <polygon points={spikes} fill="#ffd34d" stroke="#ff7a1e" strokeWidth="4" opacity=".95" />
      {/* the path back */}
      <path d={`M ${ix + 70} ${iy - 40} C ${ix + 220} ${iy - 170}, ${ix + 420} ${iy - 120}, ${ix + 470} ${iy - 10}`} fill="none" stroke="#fff" strokeWidth="7" strokeDasharray="18 14" strokeLinecap="round" />
      <path d={`M ${ix + 474} ${iy - 6} l -6 -34 M ${ix + 474} ${iy - 6} l -32 -14`} stroke="#fff" strokeWidth="7" strokeLinecap="round" />
      {/* the shell, flying back out at you, nose still pointing at the paper */}
      <g transform={`rotate(14 ${ix + 520} ${iy + 120})`} filter="url(#sh3)">
        {Array.from({ length: 7 }, (_, i) => <line key={i} x1={ix + 700} y1={iy + 40 + i * 26} x2={ix + 900} y2={iy + 40 + i * 26} stroke="#dff7ff" strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" />)}
        <path d={`M ${ix + 300} ${iy + 120} C ${ix + 340} ${iy + 30}, ${ix + 420} ${iy + 22}, ${ix + 520} ${iy + 22} L ${ix + 790} ${iy + 22} L ${ix + 790} ${iy + 218} L ${ix + 520} ${iy + 218} C ${ix + 420} ${iy + 218}, ${ix + 340} ${iy + 210}, ${ix + 300} ${iy + 120} Z`} fill="url(#steel)" stroke="#1d2427" strokeWidth="4" />
        <rect x={ix + 700} y={iy + 18} width="44" height="204" fill="url(#copper)" stroke="#2a1205" strokeWidth="3" />
        <rect x={ix + 786} y={iy + 26} width="22" height="188" rx="6" fill="#39444a" stroke="#1d2427" strokeWidth="3" />
      </g>
    </svg>
    <Grain a={.12} />
    <BigTitle x={30} y={36} font="Alfa Slab One" stroke="#05222b" sw={14} rot={-3} lines={[{ t: 'IMPOSSIBLE!', size: 126, fill: '#ffb02e' }]} />
    <div style={{ position: 'absolute', left: 40, top: 206, width: 340, fontFamily: 'IM Fell DW Pica', fontStyle: 'italic', fontSize: 31, lineHeight: 1.18, color: '#fff', textShadow: '0 2px 10px #000' }}>
      “as if you fired a 15-inch shell at a piece of tissue paper and it came back”<div style={{ fontFamily: 'IM Fell English SC', fontStyle: 'normal', fontSize: 24, color: '#ffd9a0', marginTop: 8 }}>— Rutherford</div></div>
    <Mark />
  </AbsoluteFill>;
};

// D · They were wrong (S1, S2, S3, S10): pink pudding 1904 vs the blue night of the nucleus 1911
export const Wrong: React.FC = () => {
  const r = seeded(9);
  const raisins = Array.from({ length: 15 }, () => { const t = r() * Math.PI * 2, rr = Math.sqrt(r()) * 180; return [330 + Math.cos(t) * rr, 340 + Math.sin(t) * rr, r() * 180]; });
  return <AbsoluteFill style={{ overflow: 'hidden' }}>
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <linearGradient id="pk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd9dc" /><stop offset="1" stopColor="#f08a98" /></linearGradient>
        <radialGradient id="pud" cx=".38" cy=".32" r=".75"><stop offset="0" stopColor="#ffe6ea" /><stop offset=".55" stopColor="#f2a3b0" /><stop offset="1" stopColor="#c95a72" /></radialGradient>
        <radialGradient id="nv" cx=".55" cy=".5" r=".8"><stop offset="0" stopColor="#1d3f8f" /><stop offset=".6" stopColor="#0b1d4a" /><stop offset="1" stopColor="#040b20" /></radialGradient>
        <radialGradient id="nuc"><stop offset="0" stopColor="#fffbe6" /><stop offset=".2" stopColor="#ffd84a" /><stop offset=".55" stopColor="#ff9d00" stopOpacity=".5" /><stop offset="1" stopColor="#ff9d00" stopOpacity="0" /></radialGradient>
        <clipPath id="L"><polygon points="0,0 668,0 612,720 0,720" /></clipPath>
        <clipPath id="Rr"><polygon points="668,0 1280,0 1280,720 612,720" /></clipPath>
        <filter id="g4" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <g clipPath="url(#L)"><rect width="1280" height="720" fill="url(#pk)" />
        <circle cx="330" cy="340" r="222" fill="url(#pud)" stroke="#7a2440" strokeWidth="5" />
        {raisins.map(([x, y, a], i) => <ellipse key={i} cx={x} cy={y} rx="17" ry="11" transform={`rotate(${a} ${x} ${y})`} fill="#3b1236" stroke="#1d0619" strokeWidth="2" />)}
        <text x="34" y="78" fontFamily="Special Elite" fontSize="58" fill="#7a2440">1904</text></g>
      <g clipPath="url(#Rr)"><rect width="1280" height="720" fill="url(#nv)" />
        {Array.from({ length: 60 }, (_, i) => <circle key={i} cx={640 + r() * 640} cy={r() * 720} r={r() * 1.6 + .3} fill="#fff" opacity={.3 + r() * .5} />)}
        {[0, 60, 120].map(a => <ellipse key={a} cx="965" cy="350" rx="250" ry="86" transform={`rotate(${a} 965 350)`} fill="none" stroke="#8fd8ff" strokeOpacity=".55" strokeWidth="2.5" strokeDasharray="4 10" strokeLinecap="round" />)}
        {[[1215, 350], [840, 140], [870, 560]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" fill="#8fd8ff" filter="url(#g4)" />)}
        {[[1215, 350], [840, 140], [870, 560]].map(([x, y], i) => <circle key={'e' + i} cx={x} cy={y} r="5" fill="#e6f8ff" />)}
        <circle cx="965" cy="350" r="120" fill="url(#nuc)" />
        <circle cx="965" cy="350" r="12" fill="#fffbe6" />
        <text x="1246" y="78" textAnchor="end" fontFamily="Special Elite" fontSize="58" fill="#ffd84a">1911</text></g>
      {/* the crack between the two pictures */}
      <polyline points="668,0 640,150 676,250 630,380 668,470 612,720" fill="none" stroke="#ffd84a" strokeWidth="14" strokeLinejoin="round" filter="url(#g4)" />
      <polyline points="668,0 640,150 676,250 630,380 668,470 612,720" fill="none" stroke="#fff6c8" strokeWidth="6" strokeLinejoin="round" />
      {/* the stamp */}
      <g transform="rotate(-14 330 330)" opacity=".95"><rect x="150" y="270" width="360" height="118" fill="none" stroke="#d1001f" strokeWidth="9" /><rect x="164" y="284" width="332" height="90" fill="none" stroke="#d1001f" strokeWidth="4" />
        <text x="330" y="360" textAnchor="middle" fontFamily="Alfa Slab One" fontSize="76" fill="#d1001f" letterSpacing="4">WRONG</text></g>
    </svg>
    <Grain a={.1} />
    <BigTitle x={640} y={498} anchor="middle" font="Playfair Display" stroke="#0a0a12" sw={16} lines={[{ t: "WHAT'S REALLY INSIDE?", size: 96, fill: '#ffffff' }]} />
    <Mark />
  </AbsoluteFill>;
};
