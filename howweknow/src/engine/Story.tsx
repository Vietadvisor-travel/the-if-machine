// The one composition for every FATHOM episode: reads public/ep/<slug>/{episode,timeline}.json and plays the story world
// on the paper: paper sheet → entities (in order) → paper fibres over everything → clue tag → captions → brand.
import React from 'react';
import { AbsoluteFill, CalculateMetadataFunction, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Entity, stateAt } from './state';
import { renderEntity } from './Entities';
import { Fx, hasFx } from './Fx';
import { TL } from './time';
import { Cam } from './space';
import { PaintDefs } from '../paint/paint';
import { PaperSheet, PaperFibres } from '../paint/world';
import { Captions } from '../kit/Caption';
import { ClueTag } from '../kit/ClueTag';
import { Brand } from '../kit/Brand';
import { LIGHT6_TYPES } from './Light6';
import { lookOf, EngraveOver, gradeFilter, weaveT, shakeOf, LookOver, blurOf } from './Look';

export type StoryProps = { slug: string; ep?: { world: Entity[]; captions?: boolean; engine?: number }; tl?: TL; at?: number; nocap?: boolean; look?: number; lookcfg?: Record<string, number> };   // look: 6 = force the v6 look (demos)   // at/nocap: a still of the world at time `at` without captions/brand (thumbnail)
export const storyMeta: CalculateMetadataFunction<StoryProps> = async ({ props }) => {
  const get = (f: string) => fetch(staticFile(`ep/${props.slug}/${f}.json`)).then(r => r.json());
  const [ep, tl] = await Promise.all([get('episode'), get('timeline')]);
  return { durationInFrames: Math.ceil(tl.duration * 30), props: { ...props, ep, tl } };
};

// v4 camera LIFE (owner 16 Nov 2026: never a static picture): the whole page breathes under a slow, never-repeating hand-held drift
// (a few px, a slight push in and out, a hair of roll) and every layer moves with its own depth (prop `para`) — the 2.5D parallax that makes the
// drawing feel like a deep set. camera.drift (0..2, keyable) scales it; entity prop `para` overrides the default by type
// (sky −.5 · far art 0 · people .1 · words .25 · particles .6). Big world camera moves stay in `camera` keys as before.
type Life = { dx: number; dy: number; sc: number; r: number; px: number; py: number; push: number };
const TAU = Math.PI * 2;
// + the page camera (keyed on `camera`): pan_x pan_y (px) and push (1 = none) move the whole screen-space page, every layer by its depth —
//   a slow push-in while a scene is told, a drift across it, so the picture is always travelling (world.py keys them line by line)
const camLife = (t: number, A: number, c: Record<string, any> = {}): Life => ({ px: c.pan_x ?? 0, py: c.pan_y ?? 0, push: c.push ?? 1,
  dx: A * (11 * Math.sin(TAU * t / 27) + 5 * Math.sin(TAU * t / 13 + 1)), dy: A * (7 * Math.sin(TAU * t / 31 + 2) + 3 * Math.sin(TAU * t / 17)),
  sc: A * (.012 * Math.sin(TAU * t / 41 + .5)), r: A * .2 * Math.sin(TAU * t / 47 + 1.3) });
const lifeT = (L: Life, d: number) => { const k = 1 + d; return `translate(${(L.dx + L.px) * k}px, ${(L.dy + L.py) * k}px) rotate(${L.r * Math.max(0, k)}deg) scale(${(1.035 + L.sc * k) * (1 + (L.push - 1) * Math.max(0, k))})`; };
const depthOf = (e: Entity, s: Record<string, any>) => e.type === 'particles' ? .6 : e.type === 'text' || e.type === 'hand' ? .25 : e.type === 'art' && (s.name === 'Sky' || s.name === 'Stars') ? -.5 : e.type === 'art' && s.name === 'Person' ? .1 : 0;
// the light of the page: a warm lamp that wanders slowly + a soft vignette (no flat, even light anywhere)
const Light: React.FC<{ t: number; k: number }> = ({ t, k }) => { if (k <= 0) return null; const x = 50 + 22 * Math.sin(TAU * t / 53), y = 38 + 10 * Math.sin(TAU * t / 61 + 1);
  return <AbsoluteFill style={{ pointerEvents: 'none', opacity: k }}>
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 60% at ${x}% ${y}%, rgba(255,236,190,.22), rgba(255,236,190,0) 70%)`, mixBlendMode: 'soft-light' }} />
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse 85% 80% at 50% 50%, rgba(0,0,0,0) 55%, rgba(43,29,18,.22) 100%)', mixBlendMode: 'multiply' }} /></AbsoluteFill>; };

export const Story: React.FC<StoryProps> = ({ ep, tl, at, nocap, look, lookcfg }) => {
  const fr = useCurrentFrame(), { fps } = useVideoConfig(), f = at !== undefined ? Math.round(at * fps) : fr, t = f / fps;
  if (!ep || !tl) return null;
  const S: Record<string, any> = {}; for (const e of ep.world) S[e.id] = { ...stateAt(e, t, tl), _type: e.type };
  const cam: Cam = { x: 0, y: 0, zoom: 1, rot: 0, ...(S.camera || {}) }, ctx = { t, tl, cam, S };
  const L = camLife(t, S.camera?.drift ?? 1, S.camera);
  const clue = ep.world.find(e => e.type === 'clue'), layers = ep.world.filter(e => e.type !== 'camera' && e.type !== 'clue').map((e, i) => ({ e, z: e.z ?? i })).sort((a, b) => a.z - b.z);
  const Lk0 = lookOf(S.camera, (ep.engine ?? 0) >= 6 || look === 6), Lk = Lk0 && lookcfg ? { ...Lk0, ...lookcfg } : Lk0;
  if (Lk) {   // ENGINE v6 (Look.tsx): engraving pass + grade + projector + depth of field + shake; v5 films never reach this branch
    const [sx, sy, sr] = shakeOf(Lk, t); L.dx += sx; L.dy += sy; L.r += sr;
    const moving = true, wrap = (e: Entity, st: Record<string, any>, body: React.ReactNode) => { const d = st.para ?? depthOf(e, st), b = st.defocus ?? blurOf(Lk, d);
      return <AbsoluteFill key={e.id} style={{ transform: lifeT(L, d), filter: b > .3 ? `blur(${b.toFixed(1)}px)` : undefined }}>{body}</AbsoluteFill>; };
    const map6 = (d: number) => { const kk = 1 + d, sc = (1.035 + L.sc * kk) * (1 + (L.push - 1) * Math.max(0, kk)), tx = (L.dx + L.px) * kk, ty = (L.dy + L.py) * kk;
      return { sc, pt: (p: [number, number]): [number, number] => [960 + (p[0] - 960) * sc + tx, 540 + (p[1] - 540) * sc + ty] }; };
    const draw = (want: (e: Entity) => boolean) => layers.filter(({ e }) => want(e)).map(({ e }, i) => { const st = S[e.id];
      if (LIGHT6_TYPES.includes(e.type)) return <React.Fragment key={e.id}>{renderEntity(e, st, { ...ctx, M6: map6(st.para ?? 0) } as any)}</React.Fragment>;   // lights blend with the picture: no wrapper
      const n = renderEntity(e, st, ctx); if (!n) return null;
      return wrap(e, st, hasFx(st) ? <Fx s={st} t={t} seed={i} uid={e.id}>{n}</Fx> : n); });
    const isWord = (e: Entity) => e.type === 'text';
    return (
      <AbsoluteFill style={{ background: '#1a120b' }}>
        <PaintDefs boil={Math.floor(f / 4) % 3} />
        <AbsoluteFill style={{ filter: gradeFilter(Lk), transform: Lk.weave > 0 ? weaveT(Lk, f) : undefined }}>
          <AbsoluteFill>
            {moving && <AbsoluteFill style={{ transform: lifeT(L, -.6) }}><PaperSheet /></AbsoluteFill>}
            {draw(e => !isWord(e))}
          </AbsoluteFill>
          <EngraveOver k={Lk.engrave} ox={L.dx + L.px} oy={L.dy + L.py} />
          <Light t={t} k={S.camera?.light ?? 0} />
          {draw(isWord)}
          <PaperFibres />
          <LookOver L={Lk} f={f} />
        </AbsoluteFill>
        {clue && (S[clue.id].a ?? 1) > 0 && <ClueTag n={Math.round(S[clue.id].n ?? 1)} of={S[clue.id].of ?? 4} label={S[clue.id].label} />}
      </AbsoluteFill>);
  }
  return (
    <AbsoluteFill>
      <PaintDefs boil={Math.floor(f / 4) % 3} />
      {L.dx || L.dy || L.px || L.py || L.push !== 1 ? <AbsoluteFill style={{ transform: lifeT(L, -.6) }}><PaperSheet /></AbsoluteFill> : <PaperSheet />}
      {layers.map(({ e }, i) => { const st = S[e.id], n = renderEntity(e, st, ctx); if (!n) return null;
        const body = hasFx(st) ? <Fx s={st} t={t} seed={i} uid={e.id}>{n}</Fx> : n;
        return L.dx || L.dy || L.px || L.py || L.push !== 1 ? <AbsoluteFill key={e.id} style={{ transform: lifeT(L, st.para ?? depthOf(e, st)) }}>{body}</AbsoluteFill> : <React.Fragment key={e.id}>{body}</React.Fragment>; })}   {/* no wrapper when the page is still: each wrapper is a full-frame compositing layer (2× render time, measured 16 Nov 2026) */}
      <Light t={t} k={S.camera?.light ?? 0} />
      <PaperFibres />
      {clue && (S[clue.id].a ?? 1) > 0 && <ClueTag n={Math.round(S[clue.id].n ?? 1)} of={S[clue.id].of ?? 4} label={S[clue.id].label} />}
      {!nocap && ep.captions && <Captions lines={tl.lines} />}   {/* owner, 15 Nov 2026: NO subtitles — words are `text` entities in the scene */}
      {!nocap && !ep.world.some(e => e.props?.name === 'Ident' || e.props?.name === 'EndCard') && <Brand t={t} dur={tl.duration} />}   {/* v4 films draw their own ident + end card */}
    </AbsoluteFill>
  );
};
