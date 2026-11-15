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

export type StoryProps = { slug: string; ep?: { world: Entity[] }; tl?: TL; at?: number; nocap?: boolean };   // at/nocap: a still of the world at time `at` without captions/brand (thumbnail)
export const storyMeta: CalculateMetadataFunction<StoryProps> = async ({ props }) => {
  const get = (f: string) => fetch(staticFile(`ep/${props.slug}/${f}.json`)).then(r => r.json());
  const [ep, tl] = await Promise.all([get('episode'), get('timeline')]);
  return { durationInFrames: Math.ceil(tl.duration * 30), props: { ...props, ep, tl } };
};

export const Story: React.FC<StoryProps> = ({ ep, tl, at, nocap }) => {
  const fr = useCurrentFrame(), { fps } = useVideoConfig(), f = at !== undefined ? Math.round(at * fps) : fr, t = f / fps;
  if (!ep || !tl) return null;
  const S: Record<string, any> = {}; for (const e of ep.world) S[e.id] = { ...stateAt(e, t, tl), _type: e.type };
  const cam: Cam = { x: 0, y: 0, zoom: 1, rot: 0, ...(S.camera || {}) }, ctx = { t, tl, cam, S };
  const clue = ep.world.find(e => e.type === 'clue'), layers = ep.world.filter(e => e.type !== 'camera' && e.type !== 'clue').map((e, i) => ({ e, z: e.z ?? i })).sort((a, b) => a.z - b.z);
  return (
    <AbsoluteFill>
      <PaintDefs boil={Math.floor(f / 4) % 3} />
      <PaperSheet />
      {layers.map(({ e }, i) => { const n = renderEntity(e, S[e.id], ctx); return n && hasFx(S[e.id]) ? <Fx key={e.id} s={S[e.id]} t={t} seed={i}>{n}</Fx> : <React.Fragment key={e.id}>{n}</React.Fragment>; })}
      <PaperFibres />
      {clue && (S[clue.id].a ?? 1) > 0 && <ClueTag n={Math.round(S[clue.id].n ?? 1)} of={S[clue.id].of ?? 4} label={S[clue.id].label} />}
      {!nocap && <Captions lines={tl.lines} />}
      {!nocap && <Brand t={t} dur={tl.duration} />}
    </AbsoluteFill>
  );
};
