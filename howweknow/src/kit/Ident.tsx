// FATHOM title sequence + end card (engine v4, owner 16 Nov 2026: "mở đầu và kết thúc" — a film opens with a hook, then the channel's
// ident and the episode title; it closes on the end card). Both are DRAWN in the house style (engraved line, gold leaf, sea-blue wash),
// keyed by one progress prop `k` 0..1 so a world key glides them (art entities: name Ident / EndCard — core, every film may use them).
//   Ident   {k, title?, x=960, y=500, s=1}   0–.4 the dial is engraved round, the sea floods in · .2–.6 the sounding line drops, rings spread
//                                            .5–.8 FATHOM is written, the gold rule grows · .75–1 the tagline, then the episode title (if any)
//   EndCard {k, next?, ask?}                 the mark settles, the wordmark + tagline, an engraved ribbon with `ask` (default: subscribe line),
//                                            an optional `next` plate ("Next: …")
import React from 'react';
import { BRAND } from './brand';
const SEP = '#2B1D12';
const cl = (x: number) => Math.max(0, Math.min(1, x));
const seg = (k: number, a: number, b: number) => { const x = cl((k - a) / (b - a)); return x * x * (3 - 2 * x); };   // smoothstep inside [a, b]

// the mark: a gold dial, sky above, sea below, the sounding line with its markers and the lead weight (brand/brand.html, redrawn as live SVG)
export const Mark: React.FC<{ x: number; y: number; r: number; k?: number; id?: string; t?: number }> = ({ x, y, r, k = 1, id = 'mk', t = 0 }) => {
  const ring = seg(k, 0, .38), sea = seg(k, .12, .42), drop = seg(k, .22, .6), ripple = seg(k, .38, .8), ticks = seg(k, .05, .4), ri = r * .86;
  const lineY = y - ri * .9 + (ri * 1.62) * drop, mk = [-.7, -.5, -.3, -.12, .2, .4];
  return <g>
    <defs>
      <clipPath id={`${id}c`}><circle cx={x} cy={y} r={ri} /></clipPath>
      <linearGradient id={`${id}sea`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A86AE" /><stop offset="1" stopColor="#173B63" /></linearGradient>
      <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F8EED8" /><stop offset="1" stopColor="#E6D6B2" /></linearGradient>
      <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F7E3A0" /><stop offset=".35" stopColor="#D9AE4C" /><stop offset=".55" stopColor="#F3D88E" /><stop offset=".8" stopColor="#B8862B" /><stop offset="1" stopColor="#E6C266" /></linearGradient>
    </defs>
    <g clipPath={`url(#${id}c)`} opacity={cl(ring * 1.6)}>
      <rect x={x - ri} y={y - ri} width={ri * 2} height={ri * 2} fill={`url(#${id}sky)`} />
      <rect x={x - ri} y={y} width={ri * 2} height={ri * sea} fill={`url(#${id}sea)`} />
      {Array.from({ length: 12 }, (_, i) => { const yy = y + ri * (i + 1) / 13; if (yy > y + ri * sea) return null;
        return <path key={i} d={`M${x - ri} ${yy} q${ri * .25} ${-6 - i * .4} ${ri * .5} 0 t${ri * .5} 0 t${ri * .5} 0 t${ri * .5} 0`} fill="none" stroke="#10243C" strokeOpacity={.45} strokeWidth={1.2} transform={`translate(${Math.sin(t * .6 + i) * 8} 0)`} />; })}
      {[0, 1, 2].map(i => { const q = cl(ripple * 1.4 - i * .2); return q > 0 && q < 1 ? <ellipse key={i} cx={x} cy={y} rx={ri * .9 * q} ry={ri * .12 * q} fill="none" stroke={SEP} strokeWidth={2.2 * (1 - q)} opacity={1 - q} /> : null; })}
      <path d={`M${x} ${y - ri * .92} L${x} ${lineY}`} stroke={SEP} strokeWidth={r * .022} />
      {mk.map((m, i) => { const my = y + ri * m; if (my > lineY) return null; const side = i % 2 ? 1 : -1;
        return <g key={i}><circle cx={x} cy={my} r={r * .022} fill={SEP} /><rect x={side > 0 ? x : x - r * .1} y={my - r * .018} width={r * .1} height={r * .036} rx={r * .012} fill={['#A5714A', '#F3E6CC', '#D96B45'][i % 3]} stroke={SEP} strokeWidth={1.2} /></g>; })}
      <g transform={`translate(${x} ${lineY})`}><circle cx={0} cy={r * .02} r={r * .03} fill="none" stroke={SEP} strokeWidth={r * .012} />
        <path d={`M${-r * .06} ${r * .05} L${r * .06} ${r * .05} L${r * .1} ${r * .26} Q0 ${r * .3} ${-r * .1} ${r * .26} Z`} fill={`url(#${id}g)`} stroke={SEP} strokeWidth={r * .014} strokeLinejoin="round" /></g>
      <line x1={x - ri} y1={y} x2={x + ri} y2={y} stroke={SEP} strokeWidth={2} />
    </g>
    <circle cx={x} cy={y} r={r * .93} fill="none" stroke={`url(#${id}g)`} strokeWidth={r * .12} pathLength={1} strokeDasharray={`${ring} 1`} transform={`rotate(-90 ${x} ${y})`} />
    <circle cx={x} cy={y} r={r * .99} fill="none" stroke={SEP} strokeWidth={2} pathLength={1} strokeDasharray={`${ring} 1`} transform={`rotate(-90 ${x} ${y})`} />
    <circle cx={x} cy={y} r={ri} fill="none" stroke={SEP} strokeWidth={1.6} pathLength={1} strokeDasharray={`${ring} 1`} transform={`rotate(-90 ${x} ${y})`} />
    {Array.from({ length: 72 }, (_, i) => { const a = i / 72 * Math.PI * 2, L = i % 6 ? .05 : .1; if (i / 72 > ticks) return null;
      return <line key={i} x1={x + Math.sin(a) * r * .93} y1={y - Math.cos(a) * r * .93} x2={x + Math.sin(a) * r * (.93 - L)} y2={y - Math.cos(a) * r * (.93 - L)} stroke={SEP} strokeWidth={i % 6 ? 1 : 1.8} opacity={.8} />; })}
  </g>;
};

const Word: React.FC<{ x: number; y: number; size: number; k: number; spacing?: number }> = ({ x, y, size, k, spacing = .25 }) => {
  const letters = BRAND.name.split(''), adv = size * (.78 + spacing), x0 = x - (letters.length - 1) * adv / 2;
  return <g>{letters.map((c, i) => { const q = seg(k, i * .1, i * .1 + .45);
    return <text key={i} x={x0 + i * adv} y={y + (1 - q) * 18} textAnchor="middle" fontFamily="Fraunces" fontWeight={700} fontSize={size} fill={SEP} opacity={q}
      style={{ filter: q < .98 ? `blur(${(1 - q) * 6}px)` : undefined }}>{c}</text>; })}</g>;
};
const Rule: React.FC<{ x: number; y: number; w: number; k: number }> = ({ x, y, w, k }) => <g>
  <rect x={x - w * k / 2} y={y - 2} width={w * k} height={4} fill="url(#gold)" />
  {k > .95 && <path d={`M${x} ${y - 9} l7 9 l-7 9 l-7 -9 Z`} fill="url(#gold)" stroke={SEP} strokeWidth={1} />}</g>;

export const Ident: React.FC<{ k?: number; title?: string; kicker?: string; x?: number; y?: number; s?: number; flicker?: number }> = ({ k = 1, title, kicker, x = 960, y = 470, s = 1, flicker = 0 }) => {
  const mk = seg(k, 0, .62), word = seg(k, .48, .8), rule = seg(k, .62, .85), tag = seg(k, .74, .92), tit = seg(k, .86, 1);
  const lift = title ? seg(k, .82, 1) * 70 : 0;
  return <g transform={`translate(${x} ${y - lift}) scale(${s}) translate(${-x} ${-y})`}>
    <Mark x={x} y={y - 120} r={150} k={mk} id="idm" t={flicker} />
    <Word x={x} y={y + 140} size={110} k={word} />
    <Rule x={x} y={y + 180} w={560} k={rule} />
    <text x={x} y={y + 236} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize={40} fill={SEP} opacity={tag}>{BRAND.tagline}</text>
    {title && <g opacity={tit} transform={`translate(0 ${(1 - tit) * 20})`}>
      {kicker && <text x={x} y={y + 330} textAnchor="middle" fontFamily="IM Fell English SC" fontSize={30} letterSpacing={8} fill="#8C3424">{kicker}</text>}
      <text x={x} y={y + 400} textAnchor="middle" fontFamily="IM Fell English" fontStyle="italic" fontSize={74} fill={SEP}>{title}</text></g>}
  </g>;
};

export const EndCard: React.FC<{ k?: number; ask?: string; next?: string; flicker?: number }> = ({ k = 1, ask = 'Subscribe for the next impossible question', next, flicker = 0 }) => {
  const mk = seg(k, 0, .5), word = seg(k, .25, .6), rule = seg(k, .4, .65), tag = seg(k, .5, .7), rib = seg(k, .62, .85), nx = seg(k, .75, .95);
  const rw = 760, ry = 820;
  return <g>
    <Mark x={960} y={300} r={150} k={mk} id="endm" t={flicker} />
    <Word x={960} y={560} size={96} k={word} />
    <Rule x={960} y={598} w={500} k={rule} />
    <text x={960} y={652} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize={38} fill={SEP} opacity={tag}>{BRAND.tagline}</text>
    <g opacity={rib} transform={`translate(0 ${(1 - rib) * 24})`}>
      <path d={`M${960 - rw / 2 - 40} ${ry - 30} l40 30 l-40 30 h60 v-60 Z M${960 + rw / 2 + 40} ${ry - 30} l-40 30 l40 30 h-60 v-60 Z`} fill="#8C3424" stroke={SEP} strokeWidth={1.4} />
      <rect x={960 - rw / 2} y={ry - 38} width={rw} height={76} fill="#B4432F" stroke={SEP} strokeWidth={1.6} />
      <rect x={960 - rw / 2 + 8} y={ry - 30} width={rw - 16} height={60} fill="none" stroke="#F3D98A" strokeWidth={1.2} strokeDasharray="5 5" />
      <text x={960} y={ry + 12} textAnchor="middle" fontFamily="IM Fell English SC" fontSize={34} letterSpacing={3} fill="#FBF1D8">{ask}</text></g>
    {next && <g opacity={nx}><text x={960} y={960} textAnchor="middle" fontFamily="IM Fell English" fontStyle="italic" fontSize={40} fill={SEP}>{next}</text></g>}
  </g>;
};

// The EPISODE title card (owner 16 Nov 2026: the opening belongs to the film's content, not the channel): a large engraved gold dial
// (the same ring as the planet it replaces — a match) with the episode's question written inside, a short line under it, the channel
// name only as a small kicker.  {k, title (use \n for two lines), sub?, kicker?, x=960, y=540, r=430}
export const TitleCard: React.FC<{ k?: number; title?: string; sub?: string; kicker?: string; x?: number; y?: number; r?: number }> = ({ k = 1, title = '', sub, kicker = BRAND.name, x = 960, y = 540, r = 430 }) => {
  const ring = seg(k, 0, .45), ticks = seg(k, .1, .5), tl = seg(k, .3, .75), rule = seg(k, .55, .8), sb = seg(k, .7, .95), kc = seg(k, .2, .5);
  const lines = title.split('\n'), fs = lines.length > 1 ? 104 : 96;
  return <g>
    <circle cx={x} cy={y} r={r * .985} fill="#F6EBD2" opacity={.55 * ring} />
    <circle cx={x} cy={y} r={r} fill="none" stroke="url(#gold)" strokeWidth={22} pathLength={1} strokeDasharray={`${ring} 1`} transform={`rotate(-90 ${x} ${y})`} />
    <circle cx={x} cy={y} r={r + 13} fill="none" stroke={SEP} strokeWidth={2} pathLength={1} strokeDasharray={`${ring} 1`} transform={`rotate(-90 ${x} ${y})`} />
    <circle cx={x} cy={y} r={r - 13} fill="none" stroke={SEP} strokeWidth={1.4} pathLength={1} strokeDasharray={`${ring} 1`} transform={`rotate(-90 ${x} ${y})`} />
    {Array.from({ length: 120 }, (_, i) => { const a = i / 120 * Math.PI * 2, L = i % 10 ? 9 : 20; if (i / 120 > ticks) return null;
      return <line key={i} x1={x + Math.sin(a) * (r - 13)} y1={y - Math.cos(a) * (r - 13)} x2={x + Math.sin(a) * (r - 13 - L)} y2={y - Math.cos(a) * (r - 13 - L)} stroke={SEP} strokeWidth={i % 10 ? .9 : 1.6} opacity={.75} />; })}
    <text x={x} y={y - 150} textAnchor="middle" fontFamily="IM Fell English SC" fontSize={30} letterSpacing={10} fill="#8C3424" opacity={kc}>{kicker}</text>
    {lines.map((ln, i) => { const q = seg(tl, i * .35, i * .35 + .65), yy = y - 30 + (i - (lines.length - 1) / 2) * fs * 1.05 + (lines.length > 1 ? 30 : 0);
      return <text key={i} x={x} y={yy + (1 - q) * 14} textAnchor="middle" fontFamily="IM Fell English" fontStyle="italic" fontSize={fs} fill={SEP} opacity={q}
        style={{ filter: q < .98 ? `blur(${(1 - q) * 5}px)` : undefined }}>{ln}</text>; })}
    <Rule x={x} y={y + 120} w={420} k={rule} />
    {sub && <text x={x} y={y + 178} textAnchor="middle" fontFamily="Fraunces" fontStyle="italic" fontSize={36} fill={SEP} opacity={sb}>{sub}</text>}
  </g>;
};
