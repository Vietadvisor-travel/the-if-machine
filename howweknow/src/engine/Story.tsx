// The one composition for every episode: reads public/ep/<slug>/{episode,timeline}.json and plays the story world.
import React from 'react';
import { AbsoluteFill, CalculateMetadataFunction, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Entity, stateAt } from './state';
import { renderEntity } from './Entities';
import { TL } from './time';
import { Cam } from './space';
import { Captions } from '../kit/Caption';
import { ClueTag } from '../kit/ClueTag';
import { Finish } from '../kit/Finish';
import { P } from '../kit/style';
import { ToneFilters } from '../kit/tone';
import { Brand } from '../kit/Brand';

export type StoryProps = { slug: string; ep?: { world: Entity[] }; tl?: TL };
export const storyMeta: CalculateMetadataFunction<StoryProps> = async ({ props }) => {
  const get = (f: string) => fetch(staticFile(`ep/${props.slug}/${f}.json`)).then(r => r.json());
  const [ep, tl] = await Promise.all([get('episode'), get('timeline')]);
  return { durationInFrames: Math.ceil(tl.duration * 30), props: { ...props, ep, tl } };
};

export const Story: React.FC<StoryProps> = ({ ep, tl }) => {
  const f = useCurrentFrame(), { fps } = useVideoConfig(), t = f / fps;
  if (!ep || !tl) return null;
  const S: Record<string, any> = {}; for (const e of ep.world) S[e.id] = { ...stateAt(e, t, tl), _type: e.type };
  const cam: Cam = { x: 0, y: 0, zoom: 1, rot: 0, ...(S.camera || {}) }, ctx = { t, tl, cam, S };
  const clue = ep.world.find(e => e.type === 'clue'), layers = ep.world.filter(e => e.type !== 'camera' && e.type !== 'clue').map((e, i) => ({ e, z: e.z ?? i })).sort((a, b) => a.z - b.z);
  return (
    <AbsoluteFill style={{ background: P.night }}>
      <ToneFilters />
      {layers.map(({ e }) => <React.Fragment key={e.id}>{renderEntity(e, S[e.id], ctx)}</React.Fragment>)}
      {clue && <ClueTag n={Math.round(S[clue.id].n ?? 1)} />}
      <Captions lines={tl.lines} />
      <Brand t={t} dur={tl.duration} />
      <Finish />
    </AbsoluteFill>
  );
};
