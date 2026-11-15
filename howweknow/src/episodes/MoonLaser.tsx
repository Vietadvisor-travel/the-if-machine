// LOOK TEST v2 — "How do we know how far away the Moon is?" (15 s, one continuous move). Not an episode.
import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import TL from '../../episodes/moon-laser/timeline.json';
import { Layer } from '../kit/Layer';
import { NightSky, Stars, Moon, Earth, Ridge, Haze, Pines, Observatory, Beam, Pulse, MoonGround, Reflector } from '../kit/world';
import { Captions } from '../kit/Caption';
import { ClueTag } from '../kit/ClueTag';
import { Finish } from '../kit/Finish';
import { k, lerp, zoomThrough } from '../kit/ease';
import { P, FONT } from '../kit/style';

export const MoonLaser: React.FC = () => {
  const f = useCurrentFrame(), { fps } = useVideoConfig(), t = f / fps, L = TL.lines;
  const fire = L[0].start + 1.35, cross = L[1].start, hit = L[2].start + 1.4;
  // ---- A: the summit. Camera drifts up; the beam fires; then we rush up the beam into the sky (zoom-through toward the Moon)
  const aUp = k(t, 0, fire), beamK = k(t, fire, fire + 0.9), leave = k(t, cross - 0.9, cross + 0.9);
  const MX = 1430, MY = 300;
  // ---- B: space. Earth falls behind, the pulse crosses, we close in on the Moon and dive into it
  const bIn = k(t, cross - 0.6, cross + 0.6), pulseB = k(t, cross + 0.2, hit - 1.6), dive = k(t, hit - 2.2, hit - 0.6);
  // ---- C: on the Moon. The pulse lands on the reflector, flashes, and flies home to the Earth in the sky
  const cIn = k(t, hit - 1.4, hit - 0.5), flash = Math.max(0, 1 - Math.abs(t - hit) / 0.5) + 0.25 * k(t, hit, hit + 0.4) * (1 - k(t, hit + 1.5, hit + 3)), back = k(t, hit + 0.1, hit + 2.4);
  const aScale = lerp(1, 1.08, aUp) * zoomThrough(leave * 0.85), aOp = 1 - k(t, cross - 0.1, cross + 0.7);
  const bScale = lerp(0.35, 1, bIn) * zoomThrough(dive * 0.9), bOp = Math.min(bIn * 1.3, 1) * (1 - k(t, hit - 1.2, hit - 0.5));
  const cScale = lerp(0.55, 1, cIn) * lerp(1, 1.06, k(t, hit, TL.duration)), cOp = cIn;
  const pulseA = k(t, fire + 0.2, fire + 1.6);
  return (
    <AbsoluteFill style={{ background: P.night }}>
      <Layer scale={aScale} ox={MX} oy={MY} y={lerp(30, 0, aUp)} opacity={aOp} blur={leave * 6}>
        <NightSky t={t} /><Stars t={t} y1={760} />
        <Moon cx={MX} cy={MY} r={170} />
        <Ridge y={690} amp={60} col="#26324F" seed="r1" /><Haze y={640} h={140} />
        <Ridge y={780} amp={55} col="#1B2541" seed="r2" /><Haze y={760} h={110} a={0.22} />
        <Ridge y={880} amp={34} col="#111A2E" seed="r3" />
        <Observatory x={520} y={858} s={1} />
        <Pines y={935} n={30} seed="p1" col="#0A1020" />
        <Beam x1={575} y1={697} x2={MX - 40} y2={MY + 40} k={beamK} />
        {pulseA > 0 && pulseA < 1 && <Pulse x={lerp(575, MX - 40, pulseA)} y={lerp(697, MY + 40, pulseA)} r={34} />}
      </Layer>
      <Layer scale={bScale} ox={1520} oy={330} opacity={bOp} blur={dive * 4}>
        <rect width={1920} height={1080} fill="#04070E" /><Stars t={t} n={520} seed="sp" />
        <Earth cx={lerp(380, 300, bIn)} cy={1180} r={lerp(760, 620, bIn)} lon={-106} lat={20} spin={t * 2} />
        <Moon cx={1520} cy={330} r={150} glow={0.8} />
        <Beam x1={700} y1={640} x2={1430} y2={370} k={1} dash a={0.9} />
        {pulseB > 0 && pulseB < 1 && <Pulse x={lerp(700, 1430, pulseB)} y={lerp(640, 370, pulseB)} r={44} />}
        <path d="M760 520 Q1100 330 1440 300" fill="none" stroke={P.fog} strokeOpacity={0.45 * k(t, cross + 0.8, cross + 1.6)} strokeWidth={2} strokeDasharray="6 10" />
        <text x={1090} y={380} textAnchor="middle" fontFamily={FONT.mono} fontSize={24} letterSpacing={5} fill={P.fog} opacity={k(t, cross + 1, cross + 1.8)}>384,400 KM</text>
      </Layer>
      <Layer scale={cScale} ox={960} oy={700} opacity={cOp}>
        <rect width={1920} height={1080} fill="#03050A" /><Stars t={t} n={340} y1={600} seed="ms" />
        <Earth cx={1500} cy={210} r={70} lon={-100} lat={25} clouds={0.8} />
        <MoonGround src={staticFile('tex/regolith_photo.jpg')} horizon={640} t={t} />
        <Reflector x={930} y={770} s={0.82} flash={flash} />
        <Beam x1={lerp(760, 960, k(t, hit - 0.8, hit))} y1={lerp(-40, 720, k(t, hit - 0.8, hit))} x2={960} y2={720} k={t < hit ? 1 : 0} />
        {t >= hit && <Beam x1={960} y1={720} x2={1500} y2={210} k={back} />}
        {back > 0 && back < 1 && <Pulse x={lerp(960, 1500, back)} y={lerp(720, 210, back)} r={30} />}
      </Layer>
      <ClueTag n={1} />
      <Captions lines={L} />
      <Finish />
    </AbsoluteFill>
  );
};
