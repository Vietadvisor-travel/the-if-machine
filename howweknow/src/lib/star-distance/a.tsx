// star-distance — ACT I drawings: the night window and the thumb, the eye, the star cabinet, the telescope's point, candle vs lighthouse,
// the orbit triangle, the January/July fields, three centuries of telescopes, the arc dial, Bessel's tower and heliometer (R-02, R-05),
// the split field, the crawl of 61 Cygni, the coin on the far hill, the bobbin of light, the paper boat on a sea of stars, the globe stand.
import React, { useMemo } from 'react';
import { Region, Ink, Line, Stipple, SEP, ell, SR, Ball, Star, starField, NightWash, Floor, Fell, Hand, N, Pt, f1, cl, ph, lerp, rect, rr, circ, pathOf, rnd } from './kit';

// ================================================================ THE NIGHT WINDOW — a sash window seen from a lamplit room; beyond it old rooftops and a
// chimney, the sky going from dusk to night (night), stars (stars), the Moon (moon). The chimney stands at (x + 30s, y + 60s): the thumb jumps against it.
const NightWindow: React.FC<{ x?: N; y?: N; s?: N; draw?: N; night?: N; stars?: N; lamp?: N; moon?: N; mx?: N; my?: N; glass?: N; wall?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, night = 1, stars = 1, lamp = 1, moon = 0, mx = 1180, my = 300, glass = 1, wall = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, W = 820 * s, H = 900 * s, x0 = X(-410), y0 = Y(-470);
  const sky = useMemo(() => starField(31, 160, -400, -460, 800, 470, 2.4), []);
  const roofs: [N, N, N, N][] = [[-420, 120, 170, 0], [-250, 60, 150, 1], [-100, 150, 130, 0], [30, 70, 160, 2], [190, 130, 140, 0], [330, 40, 120, 1]];   // [x, roof-top y, width, kind]
  const id = 'nwc' + Math.round(x);
  return <g>
    {/* the room's wall, warm in the lamp, with a papered stripe */}
    {wall > 0 && <><SR d={rect(X(-2600), Y(-1600), 5200 * s, 3200 * s)} mat="wood" t={.22 + .3 * (1 - lamp)} draw={draw} sw={0} hatch={0} rim={false} />
    {Array.from({ length: 64 }, (_, i) => <Line key={i} d={`M${X(-2600 + i * 80)} ${Y(-1600)} V${Y(1600)}`} w={.6} a={.18 * draw} />)}</>}
    <defs><clipPath id={id}><rect x={x0} y={y0} width={W} height={H * .72} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <rect x={x0} y={y0} width={W} height={H} fill="#D9B98A" opacity={draw * (1 - night)} />
      <NightWash x={x0} y={y0} w={W} h={H} seed="nwsky" a={draw * night} top="#141C38" bot="#3A4A7A" />
      {sky.map(([sx, sy, r], i) => <Star key={i} x={X(sx)} y={Y(sy)} r={r * s * .8} a={stars * night * draw * (.4 + rnd(i) * .6)} glow={r > 2 ? .6 : 0} />)}
      {moon > 0 && <g opacity={moon * draw}><circle cx={mx} cy={my} r={70 * s} fill="url(#glowW)" opacity={.7} /><Ball x={mx} y={my} r={30 * s} mat="paper" t={.15} draw={draw} hi={.6} /></g>}
      {/* rooftops, gables, chimneys; a few lit attic windows */}
      {roofs.map(([rx, ry, rw, k], i) => { const b = 300, top = ry + 30, gab = k === 1;
        const wall = gab ? pathOf([[X(rx), Y(b)], [X(rx), Y(ry + 60)], [X(rx + rw / 2), Y(ry)], [X(rx + rw), Y(ry + 60)], [X(rx + rw), Y(b)]], true) : rect(X(rx), Y(top + 22), rw * s, (b - top - 22) * s);
        const roof = gab ? '' : pathOf([[X(rx - 10), Y(top + 24)], [X(rx + 18), Y(top - 26)], [X(rx + rw - 18), Y(top - 26)], [X(rx + rw + 10), Y(top + 24)]], true);
        return <g key={i}>
        <SR d={wall} mat="night" t={.58 + .08 * (i % 2)} draw={draw} sw={1.1} hatch={0} />
        {Array.from({ length: Math.floor(rw / 12) }, (_, j) => <Line key={j} d={`M${X(rx + 6 + j * 12)} ${Y(gab ? ry + 66 : top + 26)} V${Y(b)}`} w={.6} col="#0B1030" a={.5 * draw} />)}
        {!gab && <SR d={roof} mat="wall" t={.82} draw={draw} sw={1.1} hatch={0} />}
        {!gab && Array.from({ length: 4 }, (_, j) => <Line key={j} d={`M${X(rx - 4 + j * 4)} ${Y(top + 12 - j * 12)} H${X(rx + rw + 4 - j * 4)}`} w={.7} col="#1A120B" a={.7 * draw} />)}
        {gab && Array.from({ length: 5 }, (_, j) => <Line key={j} d={`M${X(rx + rw / 2 - (j + 1) * rw / 12)} ${Y(ry + (j + 1) * 10)} H${X(rx + rw / 2 + (j + 1) * rw / 12)}`} w={.6} col="#1A120B" a={.5 * draw} />)}
        {!gab && <g><SR d={rect(X(rx + rw * .72), Y(top - 56), 18 * s, 36 * s)} mat="wall" t={.75} draw={draw} sw={.9} hatch={0} /><SR d={rect(X(rx + rw * .72 + 2), Y(top - 64), 6 * s, 8 * s)} mat="wall" t={.6} draw={draw} sw={.7} hatch={0} /></g>}
        {[.25, .6].map((u, j) => { const lit = (i + j) % 3 === 0; return <g key={j}><rect x={X(rx + rw * u)} y={Y(ry + (gab ? 100 : 80))} width={20 * s} height={28 * s} fill={lit ? '#F0D9A8' : '#141C38'} stroke={SEP} strokeWidth={.8} opacity={draw * (lit ? .9 * night : 1)} />
          <Line d={`M${X(rx + rw * u + 10)} ${Y(ry + (gab ? 100 : 80))} v${28 * s} M${X(rx + rw * u)} ${Y(ry + (gab ? 114 : 94))} h${20 * s}`} w={.7} a={draw} /></g>; })}
      </g>; })}
      {/* THE chimney the thumb is held against */}
      <SR d={rect(X(14), Y(-10), 36 * s, 90 * s)} mat="wall" t={.8} draw={draw} sw={1.2} />
      <SR d={rect(X(8), Y(-18), 48 * s, 12 * s)} mat="wall" t={.9} draw={draw} sw={1} />
      {[0, 1].map(j => <SR key={j} d={rect(X(18 + j * 16), Y(-34), 10 * s, 16 * s)} mat="wall" t={.7} draw={draw} sw={.8} hatch={0} />)}
      <Stipple x={X(-410)} y={Y(240)} w={820 * s} h={60 * s} n={300} seed="haze" col="#141C38" a={.4 * draw} />
    </g>
    {/* the glass: a faint reflection streak */}
    <path d={`M${X(120)} ${y0} L${X(260)} ${y0} L${X(60)} ${Y(180)} L${X(-80)} ${Y(180)}Z`} fill="#FFFDF4" opacity={.05 * glass * draw} />
    {/* sash frame, glazing bars, sill */}
    {(() => { const fw = 34 * s, top = y0, bot = y0 + H * .72; return <g>
      <SR d={`M${x0 - fw} ${top - fw} H${x0 + W + fw} V${bot + fw * .5} H${x0 - fw}Z M${x0} ${top} V${bot} H${x0 + W} V${top}Z`} mat="wood" t={.42} draw={draw} sw={1.4} />
      <SR d={rect(x0, Y(-200), W, 18 * s)} mat="wood" t={.5} draw={draw} sw={1.1} />
      <SR d={rect(X(-215), top, 14 * s, Y(-200) - top)} mat="wood" t={.5} draw={draw} sw={1} />
      <SR d={rect(X(205), top, 14 * s, Y(-200) - top)} mat="wood" t={.5} draw={draw} sw={1} />
      <SR d={rect(x0 - fw * 1.6, bot + fw * .5, W + fw * 3.2, 30 * s)} mat="wood" t={.55} ang={0} draw={draw} sw={1.4} />
      <SR d={rect(x0 - fw * 1.2, bot + fw * .5 + 30 * s, W + fw * 2.4, 22 * s)} mat="wood" t={.75} ang={0} draw={draw} sw={1.1} />
      {/* a curtain, left, in folds */}
      {[0, 1, 2, 3].map(j => <SR key={j} d={`M${x0 - 150 * s + j * 34 * s} ${top - 60 * s} Q${x0 - 120 * s + j * 34 * s} ${Y(0)} ${x0 - 160 * s + j * 30 * s} ${bot + 120 * s} H${x0 - 120 * s + j * 30 * s} Q${x0 - 92 * s + j * 34 * s} ${Y(0)} ${x0 - 116 * s + j * 34 * s} ${top - 60 * s}Z`} mat="red" t={.6 + j * .05} ang={88} draw={draw} sw={1} />)}
    </g>; })()}
  </g>;
};

// ================================================================ THE THUMB — your own hand at arm's length, from behind: forearm from the lower right, the fist's
// curled fingers, the thumb upright with its nail toward you. nail 0..1 = the nail pales and glows (it will become the Moon).
const ThumbHand: React.FC<{ x?: N; y?: N; s?: N; draw?: N; nail?: N; rot?: N; sleeve?: string }> = ({ x = 960, y = 640, s = 1, draw = 1, nail = 0, rot = 0, sleeve = 'sky' }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  const thumb = `M${X(-118)} ${Y(-40)} C${X(-134)} ${Y(-110)} ${X(-140)} ${Y(-150)} ${X(-128)} ${Y(-176)} C${X(-122)} ${Y(-230)} ${X(-112)} ${Y(-282)} ${X(-92)} ${Y(-306)} C${X(-70)} ${Y(-334)} ${X(-26)} ${Y(-332)} ${X(-10)} ${Y(-298)} C${X(0)} ${Y(-262)} ${X(2)} ${Y(-214)} ${X(-2)} ${Y(-176)} C${X(10)} ${Y(-150)} ${X(8)} ${Y(-110)} ${X(10)} ${Y(-60)}Z`;
  const fist = `M${X(-130)} ${Y(-60)} C${X(-150)} ${Y(20)} ${X(-140)} ${Y(170)} ${X(-80)} ${Y(220)} C${X(-10)} ${Y(270)} ${X(110)} ${Y(250)} ${X(150)} ${Y(170)} C${X(185)} ${Y(90)} ${X(170)} ${Y(-40)} ${X(120)} ${Y(-80)} C${X(70)} ${Y(-110)} ${X(-60)} ${Y(-100)} ${X(-130)} ${Y(-60)}Z`;
  const arm = `M${X(40)} ${Y(200)} C${X(160)} ${Y(330)} ${X(300)} ${Y(500)} ${X(420)} ${Y(760)} L${X(760)} ${Y(760)} C${X(600)} ${Y(500)} ${X(330)} ${Y(220)} ${X(160)} ${Y(80)}Z`;
  const cuff = `M${X(210)} ${Y(330)} C${X(290)} ${Y(300)} ${X(380)} ${Y(250)} ${X(440)} ${Y(220)} C${X(560)} ${Y(380)} ${X(660)} ${Y(560)} ${X(760)} ${Y(760)} L${X(330)} ${Y(760)} C${X(300)} ${Y(560)} ${X(260)} ${Y(430)} ${X(210)} ${Y(330)}Z`;
  return <g transform={rot ? `rotate(${rot} ${x} ${y})` : undefined}>
    <SR d={arm} mat="skin" t={.5} ang={55} draw={draw} sw={1.6} />
    <SR d={cuff} mat={sleeve} t={.62} ang={60} draw={draw} sw={1.6} />
    {[0, 1, 2, 3, 4].map(i => <Line key={i} d={`M${X(250 + i * 30)} ${Y(330 - i * 22)} C${X(300 + i * 40)} ${Y(480 - i * 10)} ${X(380 + i * 50)} ${Y(620)} ${X(420 + i * 60)} ${Y(760)}`} w={.9} a={.35 * draw} />)}
    <SR d={fist} mat="skin" t={.42} ang={30} draw={draw} sw={1.8} />
    {/* the four curled fingers seen end-on: knuckle folds stacked down the fist's left side */}
    {[0, 1, 2, 3].map(i => <g key={i}>
      <Ink d={`M${X(-128)} ${Y(-20 + i * 60)} C${X(-90)} ${Y(-34 + i * 60)} ${X(-30)} ${Y(-28 + i * 60)} ${X(10)} ${Y(-6 + i * 60)}`} w={1.5 * s} draw={draw} />
      <Line d={`M${X(-110)} ${Y(4 + i * 60)} C${X(-80)} ${Y(-6 + i * 60)} ${X(-40)} ${Y(-2 + i * 60)} ${X(-12)} ${Y(14 + i * 60)}`} w={.8} a={.45 * draw} />
      <ellipse cx={X(-60)} cy={Y(-8 + i * 60)} rx={22 * s} ry={7 * s} fill="#FFFDF4" opacity={.18 * draw} />
    </g>)}
    {/* knuckles along the top, tendons on the back of the hand */}
    {[0, 1, 2, 3].map(i => <Line key={i} d={`M${X(10 + i * 38)} ${Y(-82 + i * 6)} C${X(40 + i * 40)} ${Y(-10 + i * 10)} ${X(80 + i * 30)} ${Y(80)} ${X(120 + i * 16)} ${Y(150)}`} w={.9} a={.3 * draw} />)}
    <SR d={thumb} mat="skin" t={.36} ang={80} draw={draw} sw={1.8} />
    {[0, 1, 2].map(j => <Line key={j} d={`M${X(-126 + j * 3)} ${Y(-166 + j * 12)} C${X(-96)} ${Y(-152 + j * 12)} ${X(-44)} ${Y(-154 + j * 12)} ${X(-4)} ${Y(-170 + j * 12)}`} w={j === 1 ? 1.1 : .7} a={(.65 - j * .15) * draw} />)}
    {[0, 1, 2, 3, 4, 5].map(j => <Line key={'h' + j} d={`M${X(-124 + j * 4)} ${Y(-60 - j * 38)} C${X(-110 + j * 3)} ${Y(-70 - j * 38)} ${X(-100 + j * 2)} ${Y(-74 - j * 38)} ${X(-92)} ${Y(-80 - j * 38)}`} w={.6} a={.45 * draw} />)}
    <path d={`M${X(-8)} ${Y(-296)} C${X(2)} ${Y(-262)} ${X(2)} ${Y(-214)} ${X(-2)} ${Y(-176)} C${X(10)} ${Y(-150)} ${X(8)} ${Y(-110)} ${X(10)} ${Y(-60)}`} fill="none" stroke="#C9DDE6" strokeWidth={4 * s} opacity={.55 * draw} />
    <path d={`M${X(-100)} ${Y(-244)} C${X(-104)} ${Y(-260)} ${X(-24)} ${Y(-262)} ${X(-20)} ${Y(-244)}`} fill="none" stroke={SEP} strokeWidth={1} opacity={.6 * draw} />
    {/* the nail */}
    <path d={`M${X(-96)} ${Y(-262)} C${X(-98)} ${Y(-312)} ${X(-30)} ${Y(-318)} ${X(-24)} ${Y(-266)} C${X(-40)} ${Y(-248)} ${X(-80)} ${Y(-248)} ${X(-96)} ${Y(-262)}Z`}
      fill={nail > 0 ? '#FFF8E4' : '#EBC9AE'} stroke={SEP} strokeWidth={1.3} opacity={draw} />
    <path d={`M${X(-90)} ${Y(-282)} C${X(-80)} ${Y(-300)} ${X(-44)} ${Y(-302)} ${X(-32)} ${Y(-284)}`} fill="none" stroke="#FFFDF4" strokeWidth={2.4 * s} opacity={.6 * draw} />
    <path d={`M${X(-84)} ${Y(-256)} C${X(-74)} ${Y(-266)} ${X(-46)} ${Y(-266)} ${X(-36)} ${Y(-256)}`} fill="#FBF4E2" stroke={SEP} strokeWidth={.6} opacity={.7 * draw} />
    {nail > 0 && <circle cx={X(-60)} cy={Y(-280)} r={(40 + 120 * nail) * s} fill="url(#glowW)" opacity={nail * .9} />}
  </g>;
};

// ================================================================ THE EYE — engraved like an anatomy plate: lids, lashes, crease, brow, an iris with radial fibres,
// pupil, catch-light. pair = both eyes (gap apart); lidL / lidR 0 open … 1 shut; look = where the irises turn (−1..1).
const OneEye: React.FC<{ x: N; y: N; r: N; lid: N; look: [N, N]; draw: N; flip?: boolean; skin?: boolean }> = ({ x, y, r, lid, look, draw, flip, skin = true }) => {
  const f = flip ? -1 : 1, up = (k: N) => `M${x - r} ${y} C${x - r * .5} ${y - r * .62 * (1 - k)} ${x + r * .45} ${y - r * .7 * (1 - k)} ${x + r} ${y - r * .04}`;
  const lo = `C${x + r * .5} ${y + r * .44} ${x - r * .5} ${y + r * .46} ${x - r} ${y}`, id = `eyec${Math.round(x)}${Math.round(y)}`;
  const ix = x + look[0] * r * .32, iy = y + look[1] * r * .18, ir = r * .4, open = 1 - lid;
  return <g transform={flip ? `translate(${2 * x} 0) scale(-1 1)` : undefined}>
    {skin && <SR d={`M${x - r * 1.5} ${y - r * 1.25} C${x - r * .4} ${y - r * 1.6} ${x + r * .9} ${y - r * 1.5} ${x + r * 1.55} ${y - r * .9} L${x + r * 1.5} ${y + r * .9} C${x + r * .4} ${y + r * 1.2} ${x - r * .9} ${y + r * 1.1} ${x - r * 1.5} ${y + r * .6}Z`} mat="skin" t={.3} draw={draw} sw={0} hatch={0} rim={false} />}
    <defs><clipPath id={id}><path d={`${up(0)} ${lo}Z`} /></clipPath></defs>
    <path d={`${up(0)} ${lo}Z`} fill="#FBF4E2" opacity={draw} />
    <g clipPath={`url(#${id})`} opacity={draw}>
      <circle cx={ix} cy={iy} r={ir} fill="#7A5A3A" />
      {Array.from({ length: 36 }, (_, i) => { const a = i / 36 * Math.PI * 2; return <line key={i} x1={ix + Math.cos(a) * ir * .35} y1={iy + Math.sin(a) * ir * .35} x2={ix + Math.cos(a) * ir * .95} y2={iy + Math.sin(a) * ir * .95} stroke={SEP} strokeWidth={.7} opacity={.55} />; })}
      <circle cx={ix} cy={iy} r={ir} fill="none" stroke={SEP} strokeWidth={1.6} />
      <circle cx={ix} cy={iy} r={ir * .38} fill="#1A120B" />
      <circle cx={ix + ir * .3 * f} cy={iy - ir * .32} r={ir * .14} fill="#FFFDF4" />
      {/* the closing lid */}
      <path d={`M${x - r} ${y} C${x - r * .5} ${y - r * .62} ${x + r * .45} ${y - r * .7} ${x + r} ${y - r * .04} L${x + r} ${y - r * .04} C${x + r * .45} ${lerp(y - r * .7, y + r * .46, lid)} ${x - r * .5} ${lerp(y - r * .62, y + r * .44, lid)} ${x - r} ${y}Z`}
        fill="#D9A580" stroke={SEP} strokeWidth={lid > .05 ? 1.4 : 0} />
      <path d={`M${x - r} ${y} ${up(0).slice(up(0).indexOf('C'))}`} fill="none" stroke={SEP} strokeWidth={r * .05} opacity={.35} transform={`translate(0 ${r * .06})`} />
    </g>
    {/* lid edge, lashes, crease, lower lid, brow */}
    <path d={`M${x - r} ${y} C${x - r * .5} ${lerp(y - r * .62, y + r * .44, lid)} ${x + r * .45} ${lerp(y - r * .7, y + r * .46, lid)} ${x + r} ${y - r * .04}`} fill="none" stroke={SEP} strokeWidth={2.4} opacity={draw} />
    {Array.from({ length: 11 }, (_, i) => { const u = .12 + i * .075, px = lerp(x - r, x + r, u), py = lerp(y, lerp(y - r * .66, y + r * .45, lid), Math.sin(u * Math.PI)); return <Line key={i} d={`M${px} ${py} q${(u - .5) * r * .2} ${-r * .16 * open - r * .08} ${(u - .4) * r * .26} ${-r * .2 * open - r * .1}`} w={1.2} a={.8 * draw} />; })}
    <Line d={`M${x - r * .9} ${y - r * .3} C${x - r * .4} ${y - r * .95} ${x + r * .5} ${y - r * .95} ${x + r * 1.05} ${y - r * .4}`} w={1} a={.5 * draw} />
    {Array.from({ length: 6 }, (_, j) => <Line key={'s' + j} d={`M${x - r * (1.15 - j * .05)} ${y - r * (.15 + j * .1)} C${x - r * .6} ${y - r * (.85 + j * .07)} ${x + r * .3} ${y - r * (.95 + j * .07)} ${x + r * (.9 - j * .06)} ${y - r * (.6 + j * .08)}`} w={.55} a={.3 * draw} />)}
    {Array.from({ length: 4 }, (_, j) => <Line key={'u' + j} d={`M${x - r * .8} ${y + r * (.42 + j * .12)} C${x - r * .3} ${y + r * (.62 + j * .12)} ${x + r * .3} ${y + r * (.6 + j * .12)} ${x + r * .8} ${y + r * (.36 + j * .12)}`} w={.5} a={(.32 - j * .06) * draw} />)}
    {Array.from({ length: 5 }, (_, j) => <Line key={'n' + j} d={`M${x - r * (1.2 + j * .05)} ${y - r * .5 + j * r * .2} q${-r * .1} ${r * .3} 0 ${r * .5}`} w={.55} a={.3 * draw} />)}
    <Line d={lo.replace('C', `M${x + r} ${y - r * .04} C`)} w={1.2} a={.6 * draw} />
    <SR d={`M${x - r * 1.2} ${y - r * 1.05} C${x - r * .5} ${y - r * 1.45} ${x + r * .6} ${y - r * 1.42} ${x + r * 1.3} ${y - r * 1.05} C${x + r * .6} ${y - r * 1.25} ${x - r * .5} ${y - r * 1.27} ${x - r * 1.2} ${y - r * 1.05}Z`} mat="wood" t={.7} ang={10} draw={draw} sw={1} />
  </g>;
};
const BlinkEye: React.FC<{ x?: N; y?: N; r?: N; draw?: N; pair?: N; gap?: N; lidL?: N; lidR?: N; look?: [N, N]; ring?: N }> = ({ x = 960, y = 540, r = 120, draw = 1, pair = 0, gap = 340, lidL = 0, lidR = 0, look = [0, 0], ring = 0 }) => <g>
  {ring > 0 && (() => { const R = pair > 0 ? gap / 2 + r * 1.75 : r * 1.9; return <g opacity={ring * draw}><circle cx={x} cy={y} r={R} fill="#EBDDBC" /><circle cx={x} cy={y} r={R} fill="none" stroke="url(#gold)" strokeWidth={r * .12} /><Ink d={ell(x, y, R * 1.04, R * 1.04)} w={1.6} draw={draw} /></g>; })()}
  {pair > 0 ? <g>
    <defs><radialGradient id={`fc${Math.round(x)}`}><stop offset=".55" stopColor="#E5B892" stopOpacity={1} /><stop offset="1" stopColor="#E5B892" stopOpacity={0} /></radialGradient></defs>
    <ellipse cx={x} cy={y + r * .2} rx={gap / 2 + r * 2.1} ry={r * 2.3} fill={`url(#fc${Math.round(x)})`} opacity={draw} />
    <OneEye x={x - gap / 2} y={y} r={r} lid={lidL} look={look} draw={draw} flip skin={false} />
    <OneEye x={x + gap / 2} y={y} r={r} lid={lidR} look={look} draw={draw} skin={false} />
    <path d={`M${x - r * .12} ${y - r * .7} C${x - r * .1} ${y} ${x - r * .3} ${y + r * .8} ${x - r * .42} ${y + r * 1.25} C${x - r * .25} ${y + r * 1.45} ${x + r * .1} ${y + r * 1.42} ${x + r * .3} ${y + r * 1.3}`} fill="none" stroke="#2B1D12" strokeWidth={1.4} opacity={.7 * draw} />
  </g> : <OneEye x={x} y={y} r={r} lid={lidL} look={look} draw={draw} />}
</g>;

// ================================================================ THE STAR CABINET — a collector's case: carved walnut frame, a glazed door, dark velvet, the stars
// pinned in rows like specimens on brass pins, each with a blank paper label. sheen 0..1 = a band of light across the glass.
const StarCabinet: React.FC<{ x?: N; y?: N; s?: N; draw?: N; sheen?: N; dim?: N; one?: N; tremble?: N; ph?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, sheen = 0, dim = 0, one = 0, tremble = 0, ph: t = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, W = 1240 * s, H = 820 * s, x0 = X(-620), y0 = Y(-410);
  const rows = 4, cols = 7;
  return <g>
    <Floor x={x} y={Y(440)} rx={700 * s} ry={30 * s} a={.35 * draw} />
    <SR d={rr(x0 - 50 * s, y0 - 70 * s, W + 100 * s, H + 120 * s, 10 * s)} mat="wood" t={.62} ang={0} draw={draw} sw={1.8} />
    {/* the cornice: a carved band with a shell at the centre */}
    <SR d={`M${x0 - 70 * s} ${y0 - 70 * s} H${x0 + W + 70 * s} L${x0 + W + 40 * s} ${y0 - 110 * s} H${x0 - 40 * s}Z`} mat="wood" t={.5} ang={0} draw={draw} sw={1.4} />
    {Array.from({ length: 9 }, (_, i) => <Line key={i} d={`M${x} ${y0 - 100 * s} L${x + (i - 4) * 14 * s} ${y0 - 76 * s}`} w={1} a={.7 * draw} />)}
    <SR d={rect(x0, y0, W, H)} mat="night" t={.82} draw={draw} sw={1.4} hatch={0} />
    <Stipple x={x0} y={y0} w={W} h={H} n={900} seed="velvet" col="#0B1030" a={.5 * draw} />
    {Array.from({ length: rows * cols }, (_, i) => {
      const c = i % cols, r = Math.floor(i / cols), px = x0 + (c + .5) * W / cols, py = y0 + (r + .42) * H / rows, isOne = c === 3 && r === 1;
      const sz = (7 + rnd(i * 3) * 9) * s, a = draw * (1 - dim * (isOne ? 0 : .85)), tr = isOne ? Math.sin(t * 9) * tremble * 4 : 0;
      return <g key={i} opacity={a}>
        <Line d={`M${px} ${py} v${44 * s}`} w={1.4} col="#D4A846" a={.9} />
        <g transform={`translate(${tr} 0)`}>
          <path d={Array.from({ length: 8 }, (_, k) => { const ang = k / 8 * Math.PI * 2 - Math.PI / 2, rr2 = k % 2 ? sz * .42 : sz; return `${k ? 'L' : 'M'}${f1(px + Math.cos(ang) * rr2)} ${f1(py + Math.sin(ang) * rr2)}`; }).join(' ') + 'Z'} fill="url(#gold)" stroke={SEP} strokeWidth={.8} />
          <circle cx={px} cy={py} r={sz * 2.2} fill="url(#glowW)" opacity={.25 + (isOne ? one * .6 : 0)} />
        </g>
        <SR d={rect(px - 34 * s, py + 46 * s, 68 * s, 26 * s)} mat="paper" t={.1} draw={1} sw={.8} hatch={0} />
        <Line d={`M${px - 22 * s} ${py + 60 * s} h${44 * s}`} w={.5} a={.25} />
      </g>;
    })}
    {/* the glazed door: muntins, a brass escutcheon, the glass catching the lamp */}
    <Ink d={rect(x0 + 10 * s, y0 + 10 * s, W - 20 * s, H - 20 * s)} w={1.4} draw={draw} />
    <path d={`M${x0} ${y0} H${x0 + W} V${y0 + H} H${x0}Z`} fill="#C9DDE6" opacity={.06 * draw} />
    {sheen > 0 && sheen < 1 && (() => { const sx = x0 - 300 * s + (W + 600 * s) * sheen; return <path d={`M${sx} ${y0} L${sx + 120 * s} ${y0} L${sx - 80 * s} ${y0 + H} L${sx - 200 * s} ${y0 + H}Z`} fill="#FFFDF4" opacity={.16 * draw} />; })()}
    <Ball x={x0 + W + 22 * s} y={y} r={11 * s} mat="brass" draw={draw} />
  </g>;
};

// ================================================================ THE TELESCOPE'S FIELD — a round dark field where one star stays a POINT however hard you magnify:
// mag 1..4 pushes the other stars outward (the field magnifies), the centre star never grows. cross 0..1 = crosshairs.
const ScopeField: React.FC<{ x?: N; y?: N; r?: N; draw?: N; mag?: N; cross?: N; glow?: N }> = ({ x = 960, y = 540, r = 380, draw = 1, mag = 1, cross = 0, glow = 1 }) => {
  const st = useMemo(() => starField(77, 260, -1, -1, 2, 2, 2.2), []), id = 'scf' + Math.round(x);
  return <g opacity={Math.min(1, draw * 1.4)}>
    <circle cx={x} cy={y} r={r * 1.2} fill="#000" opacity={.3} filter="url(#b8)" />
    <defs><clipPath id={id}><circle cx={x} cy={y} r={r} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <NightWash x={x - r} y={y - r} w={2 * r} h={2 * r} seed="scf" top="#0E1430" bot="#1C2650" />
      {st.map(([u, v, sr], i) => <Star key={i} x={x + u * r * mag} y={y + v * r * mag} r={sr * .9} a={.75} />)}
      <Star x={x} y={y} r={3.2} glow={glow} rays={.5} />
      {cross > 0 && <g opacity={cross * .8}><line x1={x - r} y1={y} x2={x + r} y2={y} stroke="#C9AE84" strokeWidth={1} /><line x1={x} y1={y - r} x2={x} y2={y + r} stroke="#C9AE84" strokeWidth={1} />
        {[-.6, -.3, .3, .6].map(f => <line key={f} x1={x + f * r} y1={y - 7} x2={x + f * r} y2={y + 7} stroke="#C9AE84" strokeWidth={1} />)}</g>}
    </g>
    <circle cx={x} cy={y} r={r * 1.05} fill="none" stroke="url(#gold)" strokeWidth={r * .1} /><Ink d={ell(x, y, r * 1.1, r * 1.1)} w={1.6} draw={draw} /><Ink d={ell(x, y, r, r)} w={1.2} draw={draw} />
    {Array.from({ length: 72 }, (_, i) => { const a = i / 72 * Math.PI * 2; return <Line key={i} d={`M${x + Math.cos(a) * r * 1.09} ${y + Math.sin(a) * r * 1.09} L${x + Math.cos(a) * r * (i % 6 ? 1.06 : 1.03)} ${y + Math.sin(a) * r * (i % 6 ? 1.06 : 1.03)}`} w={.8} a={.8 * draw} />; })}
  </g>;
};

// ================================================================ A CANDLE NEAR, A LIGHTHOUSE FAR — two engraved panels; shrink 0..1 = both scenes fall away
// until only their two lights are left, two identical points.
const CandleAndLighthouse: React.FC<{ x?: N; y?: N; draw?: N; shrink?: N; gap?: N }> = ({ x = 960, y = 540, draw = 1, shrink = 0, gap = 1 }) => {
  const L = x - 430 * gap, R = x + 430 * gap, sc = 1 - shrink, a = draw * (1 - ph(shrink, .3, .9));
  const fL: Pt = [L + 10, y - 40], fR: Pt = [R + 150, y - 150];
  return <g>
    <g opacity={a}>
      {/* left: a candle on a sill, close */}
      <SR d={rect(L - 390, y - 330, 780, 660)} mat="wall" t={.78} draw={draw} sw={1.4} hatch={0} />
      <circle cx={fL[0]} cy={fL[1]} r={260} fill="url(#glowW)" opacity={.6} />
      <SR d={rect(L - 390, y + 150, 780, 50)} mat="wood" t={.55} ang={0} draw={draw} sw={1.2} />
      <SR d={`M${L - 80} ${y + 150} C${L - 80} ${y + 120} ${L + 100} ${y + 120} ${L + 100} ${y + 150}Z`} mat="brass" t={.45} draw={draw} sw={1.2} />
      <SR d={rect(L - 12, y + 10, 44, 130)} mat="paper" t={.12} draw={draw} sw={1.3} />
      <Line d={`M${L + 10} ${y + 10} v-18`} w={1.4} />
      <path d={`M${fL[0]} ${fL[1] - 40} C${fL[0] + 16} ${fL[1] - 6} ${fL[0] + 12} ${fL[1] + 22} ${fL[0]} ${fL[1] + 24} C${fL[0] - 12} ${fL[1] + 22} ${fL[0] - 16} ${fL[1] - 6} ${fL[0]} ${fL[1] - 40}Z`} fill="#F7E3A0" stroke={SEP} strokeWidth={1.2} />
      {/* right: a lighthouse far out on a headland */}
      <NightWash x={R - 390} y={y - 330} w={780} h={660} seed="lhn" top="#1C2650" bot="#3A4A7A" />
      <SR d={`M${R - 390} ${y + 120} C${R - 200} ${y + 90} ${R + 60} ${y - 40} ${R + 150} ${y - 60} C${R + 240} ${y - 70} ${R + 320} ${y + 40} ${R + 390} ${y + 80} V${y + 330} H${R - 390}Z`} mat="night" t={.6} draw={draw} sw={1.2} />
      <SR d={rect(R - 390, y + 160, 780, 170)} mat="sea" t={.75} ang={0} draw={draw} sw={1} hatch={0} />
      {Array.from({ length: 8 }, (_, i) => <Line key={i} d={`M${R - 380 + rnd(i) * 300} ${y + 180 + i * 18} h${80 + rnd(i + 9) * 200}`} w={.8} col="#C9DDE6" a={.5} />)}
      <SR d={pathOf([[R + 140, y - 60], [R + 143, y - 140], [R + 157, y - 140], [R + 160, y - 60]], true)} mat="paper" t={.2} draw={draw} sw={.9} />
      <path d={`M${fR[0]} ${fR[1]} L${R - 360} ${y - 260} L${R - 360} ${y - 200}Z`} fill="#F7E3A0" opacity={.12} />
      <Ink d={rect(L - 390, y - 330, 780, 660)} w={1.6} draw={draw} /><Ink d={rect(R - 390, y - 330, 780, 660)} w={1.6} draw={draw} />
    </g>
    {/* the two lights: the same point */}
    {[fL, fR].map((p, i) => { const k = ph(shrink, .2, 1), px = lerp(p[0], i ? x + 180 : x - 180, k), py = lerp(p[1], y, k);
      return <g key={i} opacity={draw}><circle cx={px} cy={py} r={lerp(i ? 30 : 90, 40, k) * sc + 20 * k} fill="url(#glowW)" opacity={.9} /><Star x={px} y={py} r={lerp(i ? 3 : 8, 4.5, k)} glow={k} /></g>; })}
  </g>;
};

// ================================================================ THE ORBIT AND THE TRIANGLE — the Earth's path round a gold Sun seen obliquely, the Earth in January
// and in July at its two ends, two sight lines to a near star; stretch 0..1 sends the star away and the triangle grows thin.
const OrbitTriangle: React.FC<{ x?: N; y?: N; s?: N; draw?: N; orbit?: N; sun?: N; earths?: N; tri?: N; stretch?: N; angle?: N; spread?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, orbit = 1, sun = 1, earths = 1, tri = 0, stretch = 0, angle = 0, spread = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, rx = 520 * s * spread, ry = 140 * s * spread, oy = Y(230);
  const sy = Y(-280) - stretch * 1400 * s, star: Pt = [x, sy], e1: Pt = [x - rx, oy], e2: Pt = [x + rx, oy];
  return <g>
    <path d={ell(x, oy, rx, ry)} fill="none" stroke={SEP} strokeWidth={1.6} pathLength={1} strokeDasharray={`${orbit} 1`} opacity={draw} />
    <path d={ell(x, oy, rx, ry)} fill="none" stroke="#B8862B" strokeWidth={1} strokeDasharray="4 9" opacity={draw * orbit * .8} />
    {sun > 0 && <g opacity={sun * draw}><circle cx={x} cy={oy} r={110 * s} fill="url(#glowW)" />{Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2; return <Line key={i} d={`M${x + Math.cos(a) * 46 * s} ${oy + Math.sin(a) * 46 * s} L${x + Math.cos(a) * (64 + (i % 2) * 14) * s} ${oy + Math.sin(a) * (64 + (i % 2) * 14) * s}`} w={1.4} col="#B8862B" a={.9} />; })}<Ball x={x} y={oy} r={40 * s} mat="gold" t={.3} draw={draw} /></g>}
    {earths > 0 && [e1, e2].map((e, i) => <g key={i} opacity={earths * draw}><Ball x={e[0]} y={e[1]} r={26 * s} mat="sea" t={.45} draw={draw} /><path d={`M${e[0] - 14 * s} ${e[1] - 8 * s} q${10 * s} ${-10 * s} ${20 * s} ${-2 * s} q${4 * s} ${10 * s} ${-8 * s} ${18 * s}Z`} fill="#A9B97A" opacity={.9} /></g>)}
    {tri > 0 && <g opacity={draw}>
      {[e1, e2].map((e, i) => <path key={i} d={`M${e[0]} ${e[1]} L${star[0]} ${star[1]}`} stroke="#B8862B" strokeWidth={2.2 * s} pathLength={1} strokeDasharray={`${tri} 1`} fill="none" />)}
      <Line d={`M${e1[0]} ${e1[1]} L${e2[0]} ${e2[1]}`} w={1.4} col="#8C3424" a={tri * .7} />
      {tri > .95 && <Star x={star[0]} y={star[1]} r={5 * s} glow={1} rays={.8} />}
      {angle > 0 && <path d={`M${star[0] - 22 * s} ${star[1] + 60 * s} Q${star[0]} ${star[1] + 70 * s} ${star[0] + 22 * s} ${star[1] + 60 * s}`} stroke="#D2643E" strokeWidth={3} fill="none" pathLength={1} strokeDasharray={`${angle} 1`} />}
    </g>}
  </g>;
};

// ================================================================ JANUARY AND JULY — two round eyepiece fields of the same patch of sky: the far stars identical,
// one near star sitting a hair apart. sep 1 = side by side, 0 = laid one over the other like tracing paper; shift = how far the near star slid.
const ParallaxField: React.FC<{ x?: N; y?: N; r?: N; draw?: N; sep?: N; shift?: N; tick?: N; b?: N }> = ({ x = 960, y = 540, r = 300, draw = 1, sep = 1, shift = 1, tick = 0, b = 1 }) => {
  const far = useMemo(() => starField(19, 120, -1, -1, 2, 2, 2.4), []), near: Pt = [.12, -.08];
  const one = (cx: N, k: 0 | 1, a: N) => { const id = `pxf${k}${Math.round(x)}`, dx = (k ? 1 : -1) * shift * 9;
    return <g opacity={a} key={k}>
      <defs><clipPath id={id}><circle cx={cx} cy={y} r={r} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        {k === 0 || sep > .02 ? <NightWash x={cx - r} y={y - r} w={2 * r} h={2 * r} seed={'pxf' + k} top="#0E1430" bot="#1C2650" /> : null}
        {far.map(([u, v, sr], i) => <Star key={i} x={cx + u * r} y={y + v * r} r={sr} a={.85} />)}
        <Star x={cx + near[0] * r + dx} y={y + near[1] * r} r={4.4} glow={.8} rays={.4} col={k ? '#F2A672' : '#FFF4D2'} />
      </g>
      <circle cx={cx} cy={y} r={r * 1.04} fill="none" stroke="url(#gold)" strokeWidth={r * .07} /><Ink d={ell(cx, y, r * 1.08, r * 1.08)} w={1.4} draw={draw} />
    </g>; };
  const c0 = x - sep * r * 1.18, c1 = x + sep * r * 1.18;
  return <g opacity={Math.min(1, draw * 1.4)}>
    {one(c0, 0, 1)}{b > 0 && one(c1, 1, sep > .02 ? b : b * .75)}
    {tick > 0 && <g opacity={tick}>{[-1, 1].map(k => <line key={k} x1={x + near[0] * r + k * shift * 9} y1={y + near[1] * r - 16} x2={x + near[0] * r + k * shift * 9} y2={y + near[1] * r - 30} stroke="#D2643E" strokeWidth={2.2} />)}
      <path d={`M${x + near[0] * r - shift * 9} ${y + near[1] * r - 24} H${x + near[0] * r + shift * 9}`} stroke="#D2643E" strokeWidth={1.6} /></g>}
  </g>;
};

// ================================================================ THREE CENTURIES OF LOOKING — a long 17th-century tube on a mast, an 18th-century reflector in its
// timber frame, a 19th-century brass refractor; before each, an open notebook with empty pages. page 0..1 turns the pages.
const TelescopeRow: React.FC<{ x?: N; y?: N; s?: N; draw?: N; page?: N }> = ({ x = 960, y = 760, s = 1, draw = 1, page = 0 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s;
  const book = (bx: N) => { const turn = Math.abs(Math.sin(page * Math.PI * 3)); return <g>
    <SR d={rect(X(bx - 16), Y(40), 32 * s, 110 * s)} mat="wood" t={.7} draw={draw} sw={1} />
    <SR d={`M${X(bx - 90)} ${Y(30)} L${X(bx)} ${Y(42)} L${X(bx + 90)} ${Y(30)} L${X(bx + 86)} ${Y(-28)} L${X(bx)} ${Y(-18)} L${X(bx - 86)} ${Y(-28)}Z`} mat="paper" t={.12} draw={draw} sw={1.2} hatch={0} />
    <path d={`M${X(bx)} ${Y(-18)} L${X(bx + 86 * (1 - 2 * turn))} ${Y(-28 - 30 * turn)} L${X(bx + 90 * (1 - 2 * turn))} ${Y(30 - 20 * turn)} L${X(bx)} ${Y(42)}Z`} fill="#FBF4E2" stroke={SEP} strokeWidth={1} opacity={draw} />
  </g>; };
  return <g>
    <Line d={`M${X(-900)} ${Y(150)} H${X(900)}`} w={1.6} a={draw} />
    <Stipple x={X(-900)} y={Y(150)} w={1800 * s} h={80 * s} n={500} seed="trg" a={.4 * draw} />
    {/* 1. the long tube on a mast, slung on ropes (17th c.) */}
    <SR d={rect(X(-640), Y(-560), 22 * s, 710 * s)} mat="wood" t={.6} ang={90} draw={draw} sw={1.2} />
    <g transform={`rotate(-24 ${X(-630)} ${Y(-520)})`}><SR d={rect(X(-1000), Y(-534), 760 * s, 26 * s)} mat="wood" t={.5} ang={0} draw={draw} sw={1.2} />
      {[-940, -800, -660, -520, -380].map(b => <Line key={b} d={`M${X(b)} ${Y(-534)} v${26 * s}`} w={1} a={.7 * draw} />)}</g>
    <Line d={`M${X(-630)} ${Y(-560)} L${X(-900)} ${Y(-380)} M${X(-630)} ${Y(-560)} L${X(-330)} ${Y(-640)}`} w={1} a={.7 * draw} />
    {book(-560)}
    {/* 2. a reflector in a timber A-frame (18th c.) */}
    <SR d={pathOf([[X(-200), Y(150)], [X(-60), Y(-420)], [X(-40), Y(-420)], [X(-160), Y(150)]], true)} mat="wood" t={.58} draw={draw} sw={1.2} />
    <SR d={pathOf([[X(200), Y(150)], [X(60), Y(-420)], [X(40), Y(-420)], [X(160), Y(150)]], true)} mat="wood" t={.58} draw={draw} sw={1.2} />
    {[-240, -120, 0].map(h => <Line key={h} d={`M${X(-140 + (h + 240) * .2)} ${Y(h)} H${X(140 - (h + 240) * .2)}`} w={1.4} a={draw} />)}
    <g transform={`rotate(-38 ${X(20)} ${Y(-80)})`}><SR d={rect(X(-200), Y(-120), 420 * s, 80 * s)} mat="wood" t={.62} ang={0} draw={draw} sw={1.4} />
      <SR d={rect(X(212), Y(-126), 16 * s, 92 * s)} mat="brass" t={.5} draw={draw} sw={1} /></g>
    {book(20)}
    {/* 3. a brass refractor on a tripod (19th c.) */}
    {[-50, 0, 50].map(d => <Line key={d} d={`M${X(560)} ${Y(-200)} L${X(560 + d * 2.2)} ${Y(150)}`} w={2.4} a={draw} />)}
    <g transform={`rotate(-30 ${X(560)} ${Y(-210)})`}><SR d={rect(X(380), Y(-226), 420 * s, 30 * s)} mat="brass" t={.48} ang={0} draw={draw} sw={1.2} />
      <SR d={rect(X(780), Y(-232), 40 * s, 42 * s)} mat="brass" t={.4} draw={draw} sw={1} /><SR d={rect(X(350), Y(-220), 32 * s, 18 * s)} mat="brass" t={.6} draw={draw} sw={1} /></g>
    {book(600)}
  </g>;
};

// ================================================================ THE ARC DIAL — one degree cut into sixty, and sixty again: a brass protractor (lvl 0) whose 1° becomes
// a ruler of sixty minutes (lvl 1), whose 1′ becomes a ruler of sixty seconds (lvl 2), until one second is a single hair (lvl 3).
const ArcDial: React.FC<{ x?: N; y?: N; draw?: N; lvl?: N }> = ({ x = 960, y = 540, draw = 1, lvl = 0 }) => {
  const stage = (i: N) => {
    const g = lvl - i, S = Math.pow(60, cl(g, -1, 1.1)), a = draw * cl(1 - Math.abs(g) * 1.25) * (i === 0 && g < 0 ? 1 : 1);
    if (a <= .01) return null;
    const ruler = (lab: string, sub: string) => <g>
      <SR d={rect(-700, -40, 1400, 80)} mat="brass" t={.4} ang={0} draw={1} sw={1.6} hatch={0} />
      {Array.from({ length: 61 }, (_, k) => <line key={k} x1={-690 + k * 23} y1={-40} x2={-690 + k * 23} y2={k % 10 ? -14 : 4} stroke={SEP} strokeWidth={k % 5 ? 1.4 : 2.4} vectorEffect="non-scaling-stroke" />)}
      <rect x={-690 + 37 * 23} y={-40} width={23} height={80} fill="#D2643E" opacity={.25} />
      <text x={-700} y={84} fontSize={36} fontFamily="'IM Fell English', serif" fill={SEP}>{lab}</text>
      <text x={700} y={84} fontSize={30} fontFamily="'IM Fell DW Pica', serif" fontStyle="italic" fill={SEP} textAnchor="end">{sub}</text>
    </g>;
    const F: Pt = i === 0 ? [0, -380] : [-690 + 37.5 * 23, 0], k = cl(g / 1, 0, 1), cx = lerp(0, F[0], k), cy = lerp(i === 0 ? -150 : 0, F[1], k);
    return <g key={i} opacity={a} transform={`translate(${x} ${y}) scale(${S}) translate(${-cx} ${-cy})`}>
      {i === 0 ? <g>
        <SR d={`M-420 0 A420 420 0 0 1 420 0 L360 0 A360 360 0 0 0 -360 0Z`} mat="brass" t={.42} draw={1} sw={2} hatch={0} />
        {Array.from({ length: 181 }, (_, d) => { const t = Math.PI * (1 - d / 180), r1 = 420, r2 = d % 10 ? (d % 5 ? 404 : 396) : 386; return <line key={d} x1={Math.cos(t) * r1} y1={-Math.sin(t) * r1} x2={Math.cos(t) * r2} y2={-Math.sin(t) * r2} stroke={SEP} strokeWidth={d % 10 ? .7 : 1.4} vectorEffect="non-scaling-stroke" />; })}
        <line x1={0} y1={0} x2={0} y2={-380} stroke="#D2643E" strokeWidth={2} vectorEffect="non-scaling-stroke" />
        <circle cx={0} cy={0} r={10} fill="url(#gold)" stroke={SEP} />
      </g> : i === 1 ? ruler('1°', 'sixty minutes') : i === 2 ? ruler('1′', 'sixty seconds') : <g>
        <line x1={0} y1={-300} x2={0} y2={300} stroke={SEP} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
        <text x={30} y={-240} fontSize={44} fontFamily="'IM Fell English', serif" fill={SEP}>1″</text></g>}
    </g>;
  };
  return <g>{[0, 1, 2, 3].map(stage)}</g>;
};

// ================================================================ BESSEL'S TOWER AT KÖNIGSBERG — the round observing room under a timber dome (R-05: plain plaster,
// a wooden floor, a stool), the shutter slit open on the night (slit 0..1), a shuttered lantern low left; moon −1..1 swings the moonlit patch.
const KoenigsbergDome: React.FC<{ x?: N; y?: N; s?: N; draw?: N; slit?: N; moon?: N; snow?: N; lantern?: N }> = ({ x = 960, y = 540, s = 1, draw = 1, slit = 1, moon = 0, snow = 0, lantern = 1 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, sw = 150 * s * slit, sx = X(140);
  const st = useMemo(() => starField(5, 40, -75, -540, 150, 460, 2), []);
  return <g>
    <SR d={rect(X(-1100), Y(-700), 2200 * s, 1400 * s)} mat="stone" t={.62} draw={draw} sw={0} hatch={0} rim={false} />
    {/* the dome's inner shell: timber ribs converging up toward the crown */}
    {Array.from({ length: 13 }, (_, i) => { const u = (i - 6) / 6; return <Line key={i} d={`M${X(u * 1100)} ${Y(140)} Q${X(u * 760)} ${Y(-420)} ${X(u * 120)} ${Y(-720)}`} w={2} a={.75 * draw} />; })}
    {[-120, -320, -500].map((h, i) => <Line key={i} d={`M${X(-1100)} ${Y(h + 140)} Q${x} ${Y(h - 140 - i * 40)} ${X(1100)} ${Y(h + 140)}`} w={1.4} a={.6 * draw} />)}
    {/* the open shutter slit */}
    <SR d={rect(sx - sw / 2 - 16 * s, Y(-720), sw + 32 * s, 870 * s)} mat="wood" t={.7} draw={draw} sw={1.4} />
    <g opacity={draw * cl(slit * 3)}><NightWash x={sx - sw / 2} y={Y(-720)} w={Math.max(1, sw)} h={860 * s} seed="kgs" top="#141C38" bot="#2B3B66" />
      {st.map(([u, v, r], i) => Math.abs(u * s) < sw / 2 ? <Star key={i} x={sx + u * s} y={Y(v)} r={r} /> : null)}
      {snow > 0 && Array.from({ length: 40 }, (_, i) => <circle key={i} cx={sx - sw / 2 + rnd(i) * sw} cy={Y(-700 + rnd(i + 5) * 840)} r={2} fill="#FFFDF4" opacity={snow * .8} />)}</g>
    {/* the low wall round the room and the wooden floor */}
    <SR d={rect(X(-1100), Y(140), 2200 * s, 90 * s)} mat="wood" t={.62} ang={0} draw={draw} sw={1.4} />
    <SR d={rect(X(-1100), Y(230), 2200 * s, 500 * s)} mat="wood" t={.48} ang={0} draw={draw} sw={1} hatch={0} />
    {Array.from({ length: 24 }, (_, i) => <Line key={i} d={`M${X(-1100 + i * 100)} ${Y(230)} L${X(-1700 + i * 150)} ${Y(730)}`} w={.9} a={.45 * draw} />)}
    {/* the moonlit patch on the floor, swinging through the nights */}
    <path d={`M${X(80 + moon * 260)} ${Y(320)} L${X(250 + moon * 260)} ${Y(320)} L${X(420 + moon * 380)} ${Y(700)} L${X(120 + moon * 380)} ${Y(700)}Z`} fill="#C9DDE6" opacity={.22 * draw * slit} />
    {/* the shuttered lantern on a stool, the log desk */}
    {lantern > 0 && <g opacity={draw}>
      <circle cx={X(-620)} cy={Y(280)} r={260 * s} fill="url(#glowW)" opacity={.45 * lantern} />
      <SR d={rect(X(-660), Y(330), 80 * s, 16 * s)} mat="wood" t={.6} draw={draw} sw={1} />{[-650, -592].map(l => <Line key={l} d={`M${X(l)} ${Y(346)} L${X(l + (l < -620 ? -14 : 14))} ${Y(460)}`} w={2} />)}
      <SR d={rect(X(-650), Y(250), 60 * s, 80 * s)} mat="brass" t={.55} draw={draw} sw={1.2} /><path d={`M${X(-650)} ${Y(250)} L${X(-620)} ${Y(222)} L${X(-590)} ${Y(250)}Z`} fill="#8A6420" stroke={SEP} />
      <rect x={X(-640)} y={Y(266)} width={40 * s} height={48 * s} fill="#F7E3A0" opacity={.9 * lantern} />
    </g>}
    <SR d={rect(X(-980), Y(290), 260 * s, 24 * s)} mat="wood" t={.58} ang={0} draw={draw} sw={1.2} />
    {[-960, -740].map(l => <SR key={l} d={rect(X(l), Y(314), 16 * s, 170 * s)} mat="wood" t={.7} draw={draw} sw={1} />)}
    <SR d={`M${X(-950)} ${Y(290)} L${X(-860)} ${Y(282)} L${X(-770)} ${Y(290)} L${X(-860)} ${Y(296)}Z`} mat="paper" t={.12} draw={draw} sw={1} hatch={0} />
  </g>;
};

// ================================================================ THE HELIOMETER (R-02, the Fraunhofer instrument at Königsberg) — a mahogany tube with brass bands
// on a brass equatorial head, a brass column on a three-footed base; at the eye end the micrometer screw and its drum (turn = degrees);
// at the far end the objective cell, cut in two (cut 0..1 shows the lens face, split 0..1 slides its halves apart).
const Heliometer: React.FC<{ x?: N; y?: N; s?: N; draw?: N; turn?: N; cut?: N; split?: N; ang?: N }> = ({ x = 960, y = 760, s = 1, draw = 1, turn = 0, cut = 0, split = 0, ang = -38 }) => {
  const X = (d: N) => x + d * s, Y = (d: N) => y + d * s, hx = X(0), hy = Y(-430);
  return <g>
    <Floor x={x} y={Y(10)} rx={260 * s} ry={22 * s} a={.35 * draw} />
    {/* the three curved feet and the column */}
    {[-1, 0, 1].map(k => <g key={k}><SR d={`M${X(-8)} ${Y(-90)} C${X(k * 60)} ${Y(-60)} ${X(k * 170)} ${Y(-40)} ${X(k * 200 - 6)} ${Y(-4)} L${X(k * 200 + 6)} ${Y(-4)} C${X(k * 175 + 10)} ${Y(-50)} ${X(k * 60 + 12)} ${Y(-74)} ${X(8)} ${Y(-100)}Z`} mat="brass" t={.5} draw={draw} sw={1.1} />
      <Ball x={X(k * 200)} y={Y(-4)} r={12 * s} mat="brass" draw={draw} /></g>)}
    <SR d={rect(X(-16), Y(-400), 32 * s, 310 * s)} mat="brass" t={.45} ang={90} draw={draw} sw={1.3} />
    {[-400, -260, -110].map(h => <SR key={h} d={rect(X(-24), Y(h), 48 * s, 14 * s)} mat="brass" t={.6} draw={draw} sw={1} />)}
    {/* the equatorial head: polar axis box, declination axis, counterweight */}
    <SR d={`M${X(-40)} ${Y(-400)} L${X(40)} ${Y(-400)} L${X(70)} ${Y(-470)} L${X(-10)} ${Y(-470)}Z`} mat="brass" t={.55} draw={draw} sw={1.3} />
    <g transform={`rotate(${ang + 90} ${hx} ${hy})`}><SR d={rect(hx - 12 * s, hy - 10 * s, 24 * s, 230 * s)} mat="brass" t={.5} draw={draw} sw={1.1} /><SR d={rect(hx - 28 * s, hy + 200 * s, 56 * s, 60 * s)} mat="brass" t={.62} draw={draw} sw={1.2} /></g>
    {/* the tube: mahogany between brass bands */}
    <g transform={`rotate(${ang} ${hx} ${hy})`}>
      <SR d={rect(hx - 460 * s, hy - 42 * s, 1060 * s, 60 * s)} mat="wood" t={.62} ang={0} draw={draw} sw={1.6} />
      {Array.from({ length: 6 }, (_, i) => <Line key={i} d={`M${hx - 440 * s + i * 170 * s} ${hy - 36 * s} c${60 * s} ${8 * s} ${110 * s} ${-6 * s} ${160 * s} ${4 * s}`} w={.7} a={.4 * draw} />)}
      {[-460, -60, 520].map(b => <SR key={b} d={rect(hx + b * s, hy - 48 * s, 26 * s, 72 * s)} mat="brass" t={.45} draw={draw} sw={1.1} />)}
      {/* objective cell (far end) */}
      <SR d={rect(hx + 590 * s, hy - 58 * s, 70 * s, 92 * s)} mat="brass" t={.4} draw={draw} sw={1.3} />
      <SR d={ell(hx + 664 * s, hy - 12 * s, 14 * s, 44 * s)} mat="sky" t={.35} draw={draw} sw={1.2} hatch={0} />
      <Line d={`M${hx + 652 * s} ${hy - 56 * s} L${hx + 676 * s} ${hy + 32 * s}`} w={1.6} a={draw} />
      <SR d={rect(hx + 600 * s, hy + 34 * s, 50 * s, 12 * s)} mat="brass" t={.55} draw={draw} sw={1} />
      <Line d={`M${hx + 625 * s} ${hy + 46 * s} L${hx - 470 * s} ${hy + 52 * s}`} w={1.2} col="#8A6420" a={draw} />
      {/* eye end: draw tube, eyepiece, the micrometer screw and its drum, the long slow-motion rods */}
      <SR d={rect(hx - 560 * s, hy - 26 * s, 100 * s, 28 * s)} mat="brass" t={.45} draw={draw} sw={1.1} />
      <SR d={rect(hx - 610 * s, hy - 20 * s, 50 * s, 16 * s)} mat="brass" t={.6} draw={draw} sw={1} />
      <Line d={`M${hx - 500 * s} ${hy + 30 * s} H${hx + 560 * s}`} w={1.6} col="#8A6420" a={draw} />
      <Line d={`M${hx - 470 * s} ${hy + 40 * s} H${hx + 300 * s}`} w={1.2} col="#8A6420" a={draw} />
      <g transform={`translate(${hx - 520 * s} ${hy + 58 * s})`}>
        <circle r={30 * s} fill="url(#gold)" stroke={SEP} strokeWidth={1.3} opacity={draw} />
        {Array.from({ length: 24 }, (_, i) => { const a = (i * 15 + turn) * Math.PI / 180; return <line key={i} x1={Math.cos(a) * 22 * s} y1={Math.sin(a) * 22 * s} x2={Math.cos(a) * 30 * s} y2={Math.sin(a) * 30 * s} stroke={SEP} strokeWidth={i % 6 ? .7 : 1.4} opacity={draw} />; })}
        <circle r={8 * s} fill="#8A6420" stroke={SEP} opacity={draw} />
      </g>
      {/* the finder, alongside */}
      <SR d={rect(hx - 200 * s, hy - 74 * s, 380 * s, 18 * s)} mat="brass" t={.5} ang={0} draw={draw} sw={1} />
      {[-140, 120].map(b => <Line key={b} d={`M${hx + b * s} ${hy - 56 * s} v${14 * s}`} w={2} a={draw} />)}
    </g>
    {/* the split objective, seen face on (an inset) */}
    {cut > 0 && (() => { const cx = X(420), cy = Y(-880), r = 120 * s, d = split * 26 * s; return <g opacity={cut * draw}>
      <circle cx={cx} cy={cy} r={r * 1.18} fill="url(#gold)" stroke={SEP} strokeWidth={1.6} />
      <path d={`M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy}Z`} fill="#9CCAD6" stroke={SEP} strokeWidth={1.4} transform={`translate(${-d} ${-d * .3})`} opacity={.9} />
      <path d={`M${cx - r} ${cy} A${r} ${r} 0 0 0 ${cx + r} ${cy}Z`} fill="#7FA8C4" stroke={SEP} strokeWidth={1.4} transform={`translate(${d} ${d * .3})`} opacity={.9} />
      <ellipse cx={cx + r * .35} cy={cy - r * .45} rx={r * .25} ry={r * .1} fill="#FFFDF4" opacity={.6} transform={`rotate(-30 ${cx + r * .35} ${cy - r * .45})`} />
    </g>; })()}
  </g>;
};

// ================================================================ THE SPLIT FIELD — the heliometer's view: the round field cut along one line; one half slides
// (slide 0..1) until the near star of one half sits exactly on the other star; a vernier along the bottom reads the gap.
const SplitField: React.FC<{ x?: N; y?: N; r?: N; draw?: N; slide?: N; vernier?: N }> = ({ x = 960, y = 520, r = 340, draw = 1, slide = 0, vernier = 1 }) => {
  const A: Pt = [-.28, .1], B: Pt = [.22, -.12], off: Pt = [(A[0] - B[0]) * r * slide, (A[1] - B[1]) * r * slide];
  const st = useMemo(() => starField(41, 70, -1, -1, 2, 2, 2), []);
  const half = (k: 0 | 1) => { const id = `spl${k}${Math.round(x)}`, tx = k ? off[0] : 0, ty = k ? off[1] : 0;
    return <g key={k}><defs><clipPath id={id}><path d={k ? `M${x - r * 1.2} ${y + r * .4} L${x + r * 1.2} ${y - r * .4} L${x + r * 1.2} ${y + r * 1.2} L${x - r * 1.2} ${y + r * 1.2}Z` : `M${x - r * 1.2} ${y + r * .4} L${x + r * 1.2} ${y - r * .4} L${x + r * 1.2} ${y - r * 1.2} L${x - r * 1.2} ${y - r * 1.2}Z`} /></clipPath></defs>
      <g clipPath={`url(#${id})`}><g clipPath={`url(#splc${Math.round(x)})`}>
        <NightWash x={x - r} y={y - r} w={2 * r} h={2 * r} seed={'spl' + k} top={k ? '#18204A' : '#0E1430'} bot="#1C2650" />
        <g transform={`translate(${tx} ${ty})`}>{st.map(([u, v, sr], i) => <Star key={i} x={x + u * r} y={y + v * r} r={sr} a={.7} />)}
          <Star x={x + A[0] * r} y={y + A[1] * r} r={5} glow={.7} rays={.5} /><Star x={x + B[0] * r} y={y + B[1] * r} r={4} glow={.6} rays={.4} col="#F2A672" /></g></g></g>
      </g>; };
  return <g opacity={Math.min(1, draw * 1.4)}>
    <defs><clipPath id={`splc${Math.round(x)}`}><circle cx={x} cy={y} r={r} /></clipPath></defs>
    {half(0)}{half(1)}
    <line x1={x - r} y1={y + r * .34} x2={x + r} y2={y - r * .34} stroke="#C9AE84" strokeWidth={1.4} opacity={.8} />
    <circle cx={x} cy={y} r={r * 1.05} fill="none" stroke="url(#gold)" strokeWidth={r * .1} /><Ink d={ell(x, y, r * 1.1, r * 1.1)} w={1.6} draw={draw} />
    {vernier > 0 && <g opacity={vernier * draw} transform={`translate(${x - 300} ${y + r + 70})`}>
      <SR d={rect(0, 0, 600, 34)} mat="brass" t={.4} draw={1} sw={1.2} hatch={0} />
      {Array.from({ length: 31 }, (_, i) => <line key={i} x1={i * 20} y1={0} x2={i * 20} y2={i % 5 ? 12 : 20} stroke={SEP} strokeWidth={i % 5 ? .8 : 1.4} />)}
      <g transform={`translate(${120 + slide * 180} 0)`}><SR d={rect(0, 34, 200, 26)} mat="brass" t={.55} draw={1} sw={1} hatch={0} />{Array.from({ length: 11 }, (_, i) => <line key={i} x1={i * 18} y1={34} x2={i * 18} y2={48} stroke={SEP} strokeWidth={.9} />)}</g>
    </g>}
  </g>;
};

// ================================================================ THE CRAWL OF 61 CYGNI — the double star (two close points) creeping across the chart, leaving a
// dotted track year by year (crawl 0..1), a vermilion ring when found (ring 0..1). Laid over the Flamsteed plate (Etch, M-01).
const CygniCrawl: React.FC<{ x?: N; y?: N; draw?: N; crawl?: N; ring?: N; len?: N; ang?: N }> = ({ x = 960, y = 540, draw = 1, crawl = 0, ring = 0, len = 220, ang = -150 }) => {
  const a = ang * Math.PI / 180, px = x + Math.cos(a) * len * crawl, py = y + Math.sin(a) * len * crawl, n = Math.floor(crawl * 12);
  return <g opacity={draw}>
    {Array.from({ length: n }, (_, i) => <circle key={i} cx={x + Math.cos(a) * len * i / 12} cy={y + Math.sin(a) * len * i / 12} r={3} fill="#8C3424" opacity={.6} />)}
    <circle cx={px} cy={py} r={9} fill="#2B1D12" /><circle cx={px + 13} cy={py - 5} r={7} fill="#2B1D12" />
    {ring > 0 && <path d={ell(px + 6, py - 2, 36, 32)} fill="none" stroke="#D2643E" strokeWidth={4} pathLength={1} strokeDasharray={`${ring} 1`} />}
  </g>;
};

// ================================================================ A COIN ON A FAR HILL — the third of an arc-second made into a landscape: a straight road running
// thirteen kilometres to a hill, a coin standing on its crest (cr = its radius on screen, so it can shrink from a gold figure to a glint).
const CoinFarHill: React.FC<{ x?: N; y?: N; draw?: N; cr?: N; cx?: N; cy?: N; glint?: N; tilt?: N }> = ({ x = 960, y = 540, draw = 1, cr = 3, cx = 960, cy = 402, glint = 1, tilt = 0 }) => {
  const vp: Pt = [x, y - 130];
  return <g>
    <rect x={-200} y={-200} width={2320} height={y - 120 + 200} fill="#F0D9A8" opacity={draw} />
    <circle cx={1700} cy={y - 300} r={420} fill="url(#glowW)" opacity={.75 * draw} /><circle cx={1700} cy={y - 300} r={70} fill="#FFF4D2" opacity={.85 * draw} />
    {[[.0, 'stone', .28], [.35, 'sand', .32], [.7, 'stone', .45]].map(([d, m, t], i) => <SR key={i} d={`M-200 ${y - 140 + (d as N) * 120} C300 ${y - 200 + (d as N) * 140} 700 ${y - 160 + (d as N) * 130} ${x} ${y - 138 + (d as N) * 128} C1300 ${y - 120 + (d as N) * 120} 1700 ${y - 190 + (d as N) * 150} 2120 ${y - 150 + (d as N) * 130} V1300 H-200Z`} mat={m as string} t={t as N} draw={draw} sw={1.2} hatch={0} />)}
    {/* the road, straight to the hill */}
    <path d={`M${vp[0] - 3} ${vp[1] + 10} L${x - 520} 1300 L${x + 520} 1300 L${vp[0] + 3} ${vp[1] + 10}Z`} fill="#E2CF94" stroke={SEP} strokeWidth={1.3} opacity={draw} />
    {Array.from({ length: 14 }, (_, i) => { const k = Math.pow((i + 1) / 14, 2.2), yy = lerp(vp[1] + 12, 1300, k); return <g key={i} opacity={draw}>
      <Line d={`M${lerp(vp[0], x - 520, k) - 2} ${yy} l${-10 * k} ${-40 * k}`} w={1 + 2 * k} />
      <Line d={`M${vp[0]} ${yy} v${18 * k}`} w={2 * k + .4} col="#FBF4E2" a={.8} /></g>; })}
    {/* hedgerows and trees, hatched, getting smaller toward the hill */}
    {Array.from({ length: 18 }, (_, i) => { const k = Math.pow(rnd(i) * .9 + .1, 2), side = i % 2 ? 1 : -1, yy = lerp(vp[1] + 20, 1100, k), xx = vp[0] + side * lerp(30, 900, k) * (1.1 + rnd(i + 3));
      return <g key={i}><SR d={ell(xx, yy - 30 * k, 40 * k + 4, 34 * k + 3)} mat="forest" t={.55} draw={draw} sw={.9} /><Line d={`M${xx} ${yy} v${-10 * k}`} w={1} a={draw} /></g>; })}
    <Stipple x={-200} y={y - 160} w={2320} h={60} n={300} seed="chz" col="#C9AE84" a={.3 * draw} />
    {/* the coin, on its edge, catching the low sun */}
    <g opacity={draw} transform={tilt ? `rotate(${tilt} ${cx} ${cy})` : undefined}>
      <ellipse cx={cx} cy={cy} rx={cr * .82} ry={cr} fill="url(#gold)" stroke={SEP} strokeWidth={Math.max(.6, cr / 30)} />
      {cr > 20 && <g>{Array.from({ length: 48 }, (_, i) => { const a = i / 48 * Math.PI * 2; return <line key={i} x1={cx + Math.cos(a) * cr * .82} y1={cy + Math.sin(a) * cr} x2={cx + Math.cos(a) * cr * .76} y2={cy + Math.sin(a) * cr * .93} stroke={SEP} strokeWidth={.8} />; })}
        <ellipse cx={cx} cy={cy} rx={cr * .6} ry={cr * .74} fill="none" stroke={SEP} strokeWidth={1} opacity={.6} /></g>}
      {glint > 0 && <g opacity={glint}><circle cx={cx + cr * .3} cy={cy - cr * .3} r={Math.max(10, cr * .6)} fill="url(#glowW)" /><path d={`M${cx - 18} ${cy} H${cx + 18} M${cx} ${cy - 18} V${cy + 18}`} stroke="#FFFDF4" strokeWidth={1.4} opacity={cr < 12 ? .9 : 0} /></g>}
    </g>
  </g>;
};

// ================================================================ THE BOBBIN OF LIGHT — a turned wooden bobbin at the star, its gold thread unspooling (k 0..1) along a
// curve to (x2, y2), one bead per year (ten years, ten beads), labelled when `years` is on.
const LightBobbin: React.FC<{ x?: N; y?: N; x2?: N; y2?: N; draw?: N; k?: N; s?: N; years?: N; y0?: N }> = ({ x = 1500, y = 300, x2 = 300, y2 = 760, draw = 1, k = 0, s = 1, years = 1, y0 = 1828 }) => {
  const c1: Pt = [lerp(x, x2, .3), y - 160], c2: Pt = [lerp(x, x2, .7), y2 + 140], P = (t: N): Pt => { const u = 1 - t; return [u * u * u * x + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * x2, u * u * u * y + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * y2]; };
  const d = `M${x} ${y} C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${x2} ${y2}`;
  return <g opacity={draw}>
    <path d={d} fill="none" stroke="#F7E3A0" strokeWidth={9} opacity={.35} pathLength={1} strokeDasharray={`${k} 1`} filter="url(#b8)" />
    <path d={d} fill="none" stroke="#D9AE4C" strokeWidth={2.6} pathLength={1} strokeDasharray={`${k} 1`} />
    {Array.from({ length: 11 }, (_, i) => i / 10 <= k + .001 ? <g key={i}><circle cx={P(i / 10)[0]} cy={P(i / 10)[1]} r={6} fill="url(#gold)" stroke={SEP} strokeWidth={1} />
      {years > 0 && <text x={P(i / 10)[0]} y={P(i / 10)[1] - 16} fontSize={22} fontFamily="'IM Fell DW Pica', serif" fontStyle="italic" fill="#F3E7CC" textAnchor="middle" opacity={years}>{y0 + i}</text>}</g> : null)}
    {/* the bobbin */}
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(-12)`}>
      <SR d={rect(-34, -60, 68, 120)} mat="gold" t={.4} draw={draw} sw={1.2} hatch={0} />
      {Array.from({ length: 12 }, (_, i) => <Line key={i} d={`M-34 ${-54 + i * 10} C-10 ${-50 + i * 10} 10 ${-58 + i * 10} 34 ${-54 + i * 10}`} w={.8} col="#8A6420" a={.8} />)}
      {[-74, 60].map(t => <SR key={t} d={ell(0, t + 7, 58, 16)} mat="wood" t={.52} draw={draw} sw={1.3} />)}
    </g>
  </g>;
};

// ================================================================ THE PAPER BOAT — Bessel's page folding into a boat (fold 0..1) that sails onto a sea of stars and
// sinks (sink 0..1). The page keeps faint lines of type on its folds.
const PaperBoat: React.FC<{ x?: N; y?: N; s?: N; draw?: N; fold?: N; sink?: N; rock?: N }> = ({ x = 960, y = 600, s = 1, draw = 1, fold = 1, sink = 0, rock = 0 }) => {
  const X = (d: N) => d * s, wl = 40 * s, f = cl(fold), sk = cl(sink);
  const page = <g opacity={1 - ph(f, .3, .7)}><SR d={rect(X(-200), X(-260), 400 * s, 520 * s)} mat="paper" t={.1} draw={draw} sw={1.3} hatch={0} />
    {Array.from({ length: 18 }, (_, i) => <Line key={i} d={`M${X(-170)} ${X(-220 + i * 26)} h${(300 - (i % 4) * 30) * s}`} w={1.2} a={.35} />)}</g>;
  const boat = <g opacity={ph(f, .35, .75)}>
    <SR d={`M${X(-230)} ${X(-10)} L${X(230)} ${X(-10)} L${X(160)} ${X(70)} L${X(-160)} ${X(70)}Z`} mat="paper" t={.22} ang={0} draw={draw} sw={1.6} />
    <SR d={`M${X(-150)} ${X(-10)} L${X(0)} ${X(-210)} L${X(150)} ${X(-10)}Z`} mat="paper" t={.08} draw={draw} sw={1.6} hatch={0} />
    <SR d={`M${X(0)} ${X(-210)} L${X(150)} ${X(-10)} L${X(70)} ${X(-10)}Z`} mat="paper" t={.32} draw={draw} sw={1.2} />
    {Array.from({ length: 6 }, (_, i) => <Line key={i} d={`M${X(-110 + i * 8)} ${X(-40 - i * 26)} l${(150 - i * 22) * s} ${2 * s}`} w={1} a={.3} />)}
    {Array.from({ length: 3 }, (_, i) => <Line key={i} d={`M${X(-190 + i * 20)} ${X(14 + i * 18)} h${(360 - i * 50) * s}`} w={1} a={.3} />)}
  </g>;
  const id = 'pbw' + Math.round(x);
  return <g>
    <defs><clipPath id={id}><rect x={x - 600} y={y - 900} width={1200} height={900 + wl + sk * 10} /></clipPath></defs>
    <g clipPath={sk > 0 ? `url(#${id})` : undefined}><g transform={`translate(${x} ${y + sk * 320 * s}) rotate(${rock * 6 + sk * 24})`}>{page}{boat}</g></g>
    {sk > 0 && <ellipse cx={x} cy={y + wl} rx={(160 + sk * 200) * s} ry={(10 + sk * 12) * s} fill="none" stroke="#C9DDE6" strokeWidth={1.4} opacity={(1 - sk) * .8} />}
  </g>;
};
// the sea of stars it sails on: black water below a horizon, every star doubled as a broken reflection
const StarSea: React.FC<{ y?: N; draw?: N; seed?: N }> = ({ y = 640, draw = 1, seed = 3 }) => {
  const st = useMemo(() => starField(seed, 260, -100, -200, 2120, y + 200, 2.6), [seed, y]);
  return <g opacity={draw}>
    <NightWash x={-200} y={-200} w={2320} h={y + 200} seed="ssk" top="#0B1030" bot="#1C2650" />
    {st.map(([sx, sy, r], i) => <Star key={i} x={sx} y={sy} r={r} a={.85} glow={r > 2.2 ? .5 : 0} />)}
    <rect x={-200} y={y} width={2320} height={700} fill="#0B1030" />
    {st.filter((_, i) => i % 2 === 0).map(([sx, sy, r], i) => { const ry = y + (y - sy) * .55 + 10; return ry < 1300 ? <Line key={i} d={`M${sx - 8 - r * 3} ${ry} h${16 + r * 6}`} w={r * .6} col="#F3E7CC" a={.35} /> : null; })}
    {Array.from({ length: 30 }, (_, i) => <Line key={i} d={`M${rnd(i) * 1920} ${y + 20 + i * 14} h${60 + rnd(i + 2) * 200}`} w={.8} col="#4A88AE" a={.4} />)}
  </g>;
};

// ================================================================ A GLOBE STAND — the brass meridian ring and turned wooden stand for a globe (the globe itself is the
// core Earth, a `planet` entity, laid inside the ring).
const GlobeStand: React.FC<{ x?: N; y?: N; r?: N; draw?: N }> = ({ x = 960, y = 520, r = 300, draw = 1 }) => <g>
  <Floor x={x} y={y + r * 1.62} rx={r * .8} ry={r * .08} a={.3 * draw} />
  <SR d={`M${x - r * .5} ${y + r * 1.6} C${x - r * .4} ${y + r * 1.5} ${x - r * .14} ${y + r * 1.45} ${x - r * .08} ${y + r * 1.2} L${x + r * .08} ${y + r * 1.2} C${x + r * .14} ${y + r * 1.45} ${x + r * .4} ${y + r * 1.5} ${x + r * .5} ${y + r * 1.6}Z`} mat="wood" t={.55} draw={draw} sw={1.4} />
  <SR d={rect(x - r * .06, y + r * 1.02, r * .12, r * .2)} mat="wood" t={.62} draw={draw} sw={1.2} />
  <path d={`M${x} ${y - r * 1.12} A${r * 1.12} ${r * 1.12} 0 1 1 ${x - .1} ${y - r * 1.12}`} fill="none" stroke="url(#gold)" strokeWidth={r * .06} opacity={draw} transform={`rotate(23 ${x} ${y})`} />
  <path d={ell(x, y, r * 1.15, r * 1.15)} fill="none" stroke={SEP} strokeWidth={1.2} opacity={draw} transform={`rotate(23 ${x} ${y})`} />
  <SR d={`M${x - r * 1.3} ${y + r * .1} A${r * 1.3} ${r * .3} 0 0 0 ${x + r * 1.3} ${y + r * .1} L${x + r * 1.22} ${y + r * .16} A${r * 1.22} ${r * .26} 0 0 1 ${x - r * 1.22} ${y + r * .16}Z`} mat="wood" t={.5} draw={draw} sw={1.2} />
</g>;

export const ART_A: Record<string, React.FC<any>> = { NightWindow, ThumbHand, BlinkEye, StarCabinet, ScopeField, CandleAndLighthouse, OrbitTriangle, ParallaxField, TelescopeRow, ArcDial,
  KoenigsbergDome, Heliometer, SplitField, CygniCrawl, CoinFarHill, LightBobbin, PaperBoat, StarSea, GlobeStand };
