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

// ── the channel's own tone (owner 17 Nov 2026: "màu sắc phải theo tone của kênh") — hand-coloured engraving: cream paper, sepia ink,
//    gold leaf, vermilion, indigo (STYLE.md §2 pigments) ──
const INK = '#2B1D12', SEPIA = '#5A3A22', CREAM = '#FBF4E2', GOLD = ['#F3D98A', '#D4A846', '#8A6420'], VERM = '#B8432A', INDIGO = ['#7FA8C4', '#2E5C86', '#1D3557'];

// E · An engraved plate: the atom as Rutherford drew it, on paper — "MOSTLY EMPTY."
export const Plate: React.FC = () => {
  const cx = 860, cy = 380, R = 250, r = seeded(21);
  const hatch = Array.from({ length: 60 }, (_, i) => { const y = cy - R + i * (2 * R / 60), w = Math.sqrt(Math.max(0, R * R - (y - cy) ** 2)); return [cx - w, y, cx + w, y]; });
  const beams = Array.from({ length: 13 }, (_, i) => { const y = cy - 216 + i * 36, b = y - cy; if (Math.abs(b) < 12) return null; const bend = Math.sign(b) * Math.min(120, 2200 / Math.abs(b)); return `M 470 ${y} L ${cx - 30} ${y} Q ${cx + 40} ${y} 1250 ${y + bend}`; }).filter(Boolean) as string[];
  return <AbsoluteFill style={{ overflow: 'hidden', background: CREAM }}>
    <Img src={staticFile('core/paper.jpg')} style={{ position: 'absolute', inset: 0, width: 1280, height: 720, objectFit: 'cover' }} />
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id="wash" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor={INDIGO[0]} stopOpacity=".15" /><stop offset=".8" stopColor={INDIGO[1]} stopOpacity=".32" /><stop offset="1" stopColor={INDIGO[2]} stopOpacity=".5" /></radialGradient>
        <radialGradient id="leaf"><stop offset="0" stopColor="#fff6d2" /><stop offset=".35" stopColor={GOLD[0]} /><stop offset=".7" stopColor={GOLD[1]} stopOpacity=".6" /><stop offset="1" stopColor={GOLD[1]} stopOpacity="0" /></radialGradient>
        <clipPath id="ball"><circle cx={cx} cy={cy} r={R} /></clipPath>
        <radialGradient id="vg" cx=".5" cy=".5" r=".75"><stop offset=".65" stopColor="#5a3a22" stopOpacity="0" /><stop offset="1" stopColor="#5a3a22" stopOpacity=".45" /></radialGradient>
      </defs>
      {/* the plate's double rule */}
      <rect x="18" y="18" width="1244" height="684" fill="none" stroke={INK} strokeWidth="3" /><rect x="28" y="28" width="1224" height="664" fill="none" stroke={INK} strokeWidth="1.2" />
      {/* the atom: an indigo-washed sphere of electron haze, engraved with horizontal hatching that thins toward the light */}
      <circle cx={cx} cy={cy} r={R} fill="url(#wash)" />
      <g clipPath="url(#ball)">{hatch.map(([x1, y, x2], i) => <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke={INK} strokeWidth={.5 + .9 * Math.max(0, (i / 60 + (y - cy) / R * .2))} opacity=".55" />)}</g>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={INK} strokeWidth="3" />
      {Array.from({ length: 22 }, (_, i) => { const t = r() * Math.PI * 2; return <circle key={i} cx={cx + Math.cos(t) * (R - 6)} cy={cy + Math.sin(t) * (R - 6)} r="3.4" fill={INK} />; })}
      {/* alpha tracks in sepia ink */}
      {beams.map((d, i) => <path key={i} d={d} fill="none" stroke={SEPIA} strokeWidth="2.2" strokeDasharray="10 6" opacity=".85" />)}
      {/* gold-leaf nucleus */}
      <circle cx={cx} cy={cy} r="58" fill="url(#leaf)" /><circle cx={cx} cy={cy} r="9" fill={GOLD[0]} stroke={GOLD[2]} strokeWidth="2.5" />
      {/* the one that came back: vermilion */}
      <path d={`M 470 ${cy} L ${cx - 16} ${cy}`} stroke={SEPIA} strokeWidth="2.6" strokeDasharray="10 6" />
      <path d={`M ${cx - 16} ${cy + 4} C ${cx - 140} ${cy + 40}, ${cx - 300} ${cy + 150}, 470 ${cy + 270}`} fill="none" stroke={VERM} strokeWidth="9" strokeLinecap="round" />
      <path d={`M 470 ${cy + 270} l 36 -2 M 470 ${cy + 270} l 18 -30`} stroke={VERM} strokeWidth="9" strokeLinecap="round" />
      <path d={`M ${cx - 46} ${cy - 30} C ${cx - 10} ${cy - 62}, ${cx + 48} ${cy - 40}, ${cx + 42} ${cy + 6} C ${cx + 36} ${cy + 48}, ${cx - 34} ${cy + 52}, ${cx - 52} ${cy + 18} C ${cx - 62} ${cy - 2}, ${cx - 56} ${cy - 24}, ${cx - 38} ${cy - 38}`} fill="none" stroke={VERM} strokeWidth="4.5" strokeLinecap="round" />
      <rect width="1280" height="720" fill="url(#vg)" />
    </svg>
    <div style={{ position: 'absolute', left: cx + 40, top: cy - 112, fontFamily: 'La Belle Aurore', fontSize: 40, color: VERM, transform: 'rotate(-8deg)' }}>the nucleus</div>
    <div style={{ position: 'absolute', left: 56, top: 646, width: 600, textAlign: 'left', fontFamily: 'IM Fell DW Pica', fontStyle: 'italic', fontSize: 24, color: INK }}>Fig. 1 — inside the atom, Manchester, 1911</div>
    <div style={{ position: 'absolute', left: 56, top: 54, fontFamily: 'IM Fell English SC', fontSize: 36, letterSpacing: 6, color: SEPIA }}>what is inside an atom?</div>
    <BigTitle x={48} y={88} font="Abril Fatface" stroke={CREAM} sw={14} gap={.88}
      lines={[{ t: 'MOSTLY', size: 136, fill: INK }, { t: 'EMPTY.', size: 168, fill: VERM }]} />
    <Mark />
  </AbsoluteFill>;
};

// F · The eyepiece in the dark lab: the governing image of the film — "1 IN 8,000 came back."
export const Eyepiece: React.FC = () => {
  const cx = 880, cy = 360, R = 260, r = seeded(33);
  const flashes = Array.from({ length: 26 }, () => { const t = r() * Math.PI * 2, rr = Math.sqrt(r()) * (R - 40); return [cx + 60 + Math.cos(t) * rr * .55, cy + Math.sin(t) * rr * .8, .4 + r() * .6]; });
  return <AbsoluteFill style={{ overflow: 'hidden', background: '#1a120b' }}>
    <svg width={1280} height={720} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <radialGradient id="lamp" cx=".7" cy=".45" r=".7"><stop offset="0" stopColor="#6a4424" stopOpacity=".9" /><stop offset=".5" stopColor="#3a2414" stopOpacity=".7" /><stop offset="1" stopColor="#140d07" stopOpacity="1" /></radialGradient>
        <radialGradient id="screen" cx=".55" cy=".5" r=".6"><stop offset="0" stopColor="#1f3a2c" /><stop offset=".8" stopColor="#0c1a13" /><stop offset="1" stopColor="#050b08" /></radialGradient>
        <linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={GOLD[0]} /><stop offset=".35" stopColor={GOLD[1]} /><stop offset=".55" stopColor="#fff0b8" /><stop offset=".75" stopColor={GOLD[1]} /><stop offset="1" stopColor={GOLD[2]} /></linearGradient>
        <radialGradient id="fl"><stop offset="0" stopColor="#f2fff4" /><stop offset=".25" stopColor="#a8f0c0" /><stop offset="1" stopColor="#5ad08a" stopOpacity="0" /></radialGradient>
        <filter id="g5" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        <pattern id="h5" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><line x1="0" y1="0" x2="0" y2="6" stroke="#000" strokeWidth="1.2" /></pattern>
      </defs>
      <rect width="1280" height="720" fill="url(#lamp)" />
      <rect width="1280" height="720" fill="url(#h5)" opacity=".18" />
      {/* the brass eyepiece, engraved knurling round its rim */}
      <circle cx={cx} cy={cy} r={R + 46} fill="url(#brass)" stroke="#3a2414" strokeWidth="5" />
      {Array.from({ length: 120 }, (_, i) => { const t = i / 120 * Math.PI * 2; return <line key={i} x1={cx + Math.cos(t) * (R + 22)} y1={cy + Math.sin(t) * (R + 22)} x2={cx + Math.cos(t) * (R + 42)} y2={cy + Math.sin(t) * (R + 42)} stroke={GOLD[2]} strokeWidth="2" />; })}
      <circle cx={cx} cy={cy} r={R + 8} fill="none" stroke="#3a2414" strokeWidth="6" />
      <circle cx={cx} cy={cy} r={R} fill="url(#screen)" />
      {/* the scintillations: most on the far side, where the beam goes */}
      {flashes.map(([x, y, s], i) => <g key={i}><circle cx={x} cy={y} r={22 * s} fill="url(#fl)" opacity=".75" /><circle cx={x} cy={y} r={2.6 * s + 1} fill="#f2fff4" /></g>)}
      {/* THE flash on the wrong side, ringed in red ink */}
      <circle cx={cx - 170} cy={cy - 40} r="54" fill="url(#fl)" /><circle cx={cx - 170} cy={cy - 40} r="7" fill="#fff" filter="url(#g5)" /><circle cx={cx - 170} cy={cy - 40} r="5" fill="#fff" />
      <path d={`M ${cx - 214} ${cy - 66} C ${cx - 186} ${cy - 100}, ${cx - 120} ${cy - 88}, ${cx - 118} ${cy - 40} C ${cx - 116} ${cy + 6}, ${cx - 178} ${cy + 20}, ${cx - 212} ${cy - 6} C ${cx - 230} ${cy - 22}, ${cx - 228} ${cy - 50}, ${cx - 204} ${cy - 72}`} fill="none" stroke={VERM} strokeWidth="5" strokeLinecap="round" />
    </svg>
    <Img src={staticFile('core/fibres.jpg')} style={{ position: 'absolute', inset: 0, width: 1280, height: 720, objectFit: 'cover', opacity: .12, mixBlendMode: 'screen' }} />
    <div style={{ position: 'absolute', left: 52, top: 70, fontFamily: 'IM Fell English SC', fontSize: 36, letterSpacing: 6, color: GOLD[0] }}>Manchester · 1909</div>
    <BigTitle x={44} y={110} font="Special Elite" stroke="#140d07" sw={14} gap={.95}
      lines={[{ t: '1 IN', size: 150, fill: GOLD[0] }, { t: '8,000', size: 172, fill: GOLD[0] }]} />
    <div style={{ position: 'absolute', left: 60, top: 470, fontFamily: 'La Belle Aurore', fontSize: 74, color: CREAM, transform: 'rotate(-5deg)', textShadow: '0 3px 12px #000' }}>came back.</div>
    <Mark />
  </AbsoluteFill>;
};

// ── the standard (design F, owner 17 Nov 2026): kit/ThumbPoster + this film's hero (the brass eyepiece) and its lab furniture ──
import { ThumbPoster } from '../../kit/ThumbPoster';
const EyepieceHero: React.FC<{ cx?: number; cy?: number; R?: number }> = ({ cx = 935, cy = 385, R = 222 }) => {
  const r = seeded(33);
  const flashes = Array.from({ length: 24 }, () => { const t = r() * Math.PI * 2, rr = Math.sqrt(r()) * (R - 40); return [cx + 50 + Math.cos(t) * rr * .55, cy + Math.sin(t) * rr * .8, .4 + r() * .6]; });
  return <svg width={1280} height={720} style={{ position: 'absolute', inset: 0 }}>
    <defs>
      <radialGradient id="ehScreen" cx=".55" cy=".5" r=".6"><stop offset="0" stopColor="#21402f" /><stop offset=".8" stopColor="#0c1a13" /><stop offset="1" stopColor="#040906" /></radialGradient>
      <linearGradient id="ehBrass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff0b8" /><stop offset=".25" stopColor={GOLD[0]} /><stop offset=".5" stopColor={GOLD[1]} /><stop offset=".62" stopColor="#ffeeb0" /><stop offset=".85" stopColor={GOLD[1]} /><stop offset="1" stopColor={GOLD[2]} /></linearGradient>
      <radialGradient id="ehFl"><stop offset="0" stopColor="#f2fff4" /><stop offset=".25" stopColor="#a8f0c0" /><stop offset="1" stopColor="#5ad08a" stopOpacity="0" /></radialGradient>
      <radialGradient id="ehHalo"><stop offset=".6" stopColor="#ffcf80" stopOpacity=".35" /><stop offset="1" stopColor="#ffcf80" stopOpacity="0" /></radialGradient>
      <filter id="ehSh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="-10" dy="22" stdDeviation="18" floodColor="#000" floodOpacity=".8" /></filter>
      <filter id="ehG" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
    </defs>
    <circle cx={cx} cy={cy} r={R + 110} fill="url(#ehHalo)" />
    {/* the microscope tube coming down into the eyepiece from the upper right */}
    <polygon points={`${cx + 120},${cy - 170} ${cx + 330},${cy - 420} ${cx + 430},${cy - 340} ${cx + 210},${cy - 100}`} fill="url(#ehBrass)" stroke="#3a2414" strokeWidth="4" opacity=".9" />
    <g filter="url(#ehSh)">
      <circle cx={cx} cy={cy} r={R + 48} fill="url(#ehBrass)" stroke="#3a2414" strokeWidth="5" />
      {Array.from({ length: 130 }, (_, i) => { const t = i / 130 * Math.PI * 2; return <line key={i} x1={cx + Math.cos(t) * (R + 24)} y1={cy + Math.sin(t) * (R + 24)} x2={cx + Math.cos(t) * (R + 44)} y2={cy + Math.sin(t) * (R + 44)} stroke={GOLD[2]} strokeWidth="2" />; })}
      <circle cx={cx} cy={cy} r={R + 9} fill="none" stroke="#3a2414" strokeWidth="7" />
      <circle cx={cx} cy={cy} r={R} fill="url(#ehScreen)" />
    </g>
    {/* glint on the brass */}
    <path d={`M ${cx - R - 30} ${cy - 80} A ${R + 36} ${R + 36} 0 0 1 ${cx - 60} ${cy - R - 34}`} fill="none" stroke="#fff8dc" strokeWidth="5" strokeLinecap="round" opacity=".75" />
    {flashes.map(([x, y, s], i) => <g key={i}><circle cx={x} cy={y} r={20 * s} fill="url(#ehFl)" opacity=".75" /><circle cx={x} cy={y} r={2.4 * s + 1} fill="#f2fff4" /></g>)}
    {/* THE flash, on the wrong side, ringed in red ink */}
    <circle cx={cx - 140} cy={cy - 36} r="52" fill="url(#ehFl)" /><circle cx={cx - 140} cy={cy - 36} r="7" fill="#fff" filter="url(#ehG)" /><circle cx={cx - 140} cy={cy - 36} r="4.5" fill="#fff" />
    <path d={`M ${cx - 184} ${cy - 62} C ${cx - 156} ${cy - 96}, ${cx - 90} ${cy - 84}, ${cx - 88} ${cy - 36} C ${cx - 86} ${cy + 10}, ${cx - 148} ${cy + 24}, ${cx - 182} ${cy - 2} C ${cx - 200} ${cy - 18}, ${cx - 198} ${cy - 46}, ${cx - 174} ${cy - 68}`} fill="none" stroke={VERM} strokeWidth="5" strokeLinecap="round" />
  </svg>;
};
const LabBack: React.FC = () => <g opacity=".55">
  {/* a shelf of bottles and flasks, high on the back wall, in lamplit silhouette */}
  <rect x="560" y="146" width="720" height="10" fill="#120a05" />
  {[600, 650, 712, 1110, 1160, 1215].map((x, i) => i % 3 === 1
    ? <path key={i} d={`M ${x} 146 L ${x - 24} 146 L ${x - 6} 104 L ${x - 6} 84 L ${x + 6} 84 L ${x + 6} 104 L ${x + 24} 146 Z`} fill="#120a05" />
    : <path key={i} d={`M ${x - 16} 146 L ${x - 16} ${96 - (i % 2) * 14} L ${x - 6} ${88 - (i % 2) * 14} L ${x - 6} ${76 - (i % 2) * 14} L ${x + 6} ${76 - (i % 2) * 14} L ${x + 6} ${88 - (i % 2) * 14} L ${x + 16} ${96 - (i % 2) * 14} L ${x + 16} 146 Z`} fill="#120a05" />)}
  {/* the green-shaded lamp hanging over the bench */}
  <line x1="935" y1="0" x2="935" y2="16" stroke="#120a05" strokeWidth="4" />
  <path d="M 885 52 L 905 14 L 965 14 L 985 52 Z" fill="#2f5440" stroke="#d4a846" strokeWidth="3" />
  <ellipse cx="935" cy="54" rx="40" ry="7" fill="#fff1c8" />
  {/* the bench edge */}
  <rect x="0" y="664" width="1280" height="56" fill="#24160b" /><rect x="0" y="660" width="1280" height="6" fill="#6a4430" />
</g>;
export const Standard: React.FC<any> = (p) => <ThumbPoster kicker={p.kicker ?? 'Manchester · 1909'} title={p.lines ?? ["WHAT'S", 'INSIDE', 'AN ATOM?']} accent={p.accent ?? 1}
  note={p.note ?? '1 in 8,000 came back.'} hero={<EyepieceHero />} back={<LabBack />} lamp={[935, 300]} />;
