// The YouTube thumbnail (1280×720). Preferred: the film's own designed THUMB (src/lib/<slug>/thumb.tsx). Fallback: one frame of the
// film (t seconds) + the title in the brand face (IM Fell French Canon SC, a gold word),
// the FATHOM mark small. Render: npx remotion still Thumb out/<slug>_thumb.jpg --props='{"slug":"<slug>","t":42,"title":"How far is the *Moon*?"}'
import React from 'react';
import { AbsoluteFill, CalculateMetadataFunction, Img, staticFile } from 'remotion';
import { Story, storyMeta, StoryProps } from '../engine/Story';
import { LIB_EP } from '../lib';
export type ThumbProps = StoryProps & { t: number; title: string; kicker?: string; side?: 'left' | 'right' };
export const thumbMeta: CalculateMetadataFunction<ThumbProps> = async (o) => { const m = await storyMeta(o as any); return { durationInFrames: 1, props: { ...o.props, ...(m.props as any) } }; };
export const Thumb: React.FC<ThumbProps> = (p) => {
  const Own = LIB_EP[p.slug]?.THUMB;   // owner 17 Nov 2026: a thumbnail DESIGNED for each film (src/lib/<slug>/thumb.tsx), not a frame of it
  if (Own) return <Own {...p} />;
  const words = p.title.split(/(\*[^*]+\*)/), right = p.side === 'right';
  return <AbsoluteFill style={{ background: '#F3E7CC' }}>
    <AbsoluteFill style={{ transform: 'scale(.6667)', transformOrigin: '0 0', width: 1920, height: 1080 }}><Story {...p} at={p.t} nocap /></AbsoluteFill>
    <AbsoluteFill style={{ background: `linear-gradient(${right ? 270 : 90}deg, rgba(30,20,12,.82) 0%, rgba(30,20,12,.55) 38%, rgba(30,20,12,0) 62%)` }} />
    <div style={{ position: 'absolute', [right ? 'right' : 'left']: 56, top: 120, width: 600, textAlign: right ? 'right' : 'left' }}>
      {p.kicker && <div style={{ fontFamily: 'IM Fell English SC', fontSize: 30, letterSpacing: 5, color: '#E6C266', marginBottom: 16 }}>{p.kicker.toUpperCase()}</div>}
      <div style={{ fontFamily: 'IM Fell French Canon SC', fontWeight: 400, fontSize: 92, lineHeight: 1.02, color: '#FBF1D8', textShadow: '0 4px 18px rgba(0,0,0,.5)' }}>
        {words.map((w, i) => w.startsWith('*') ? <span key={i} style={{ color: '#F3D98A' }}>{w.slice(1, -1)}</span> : <span key={i}>{w}</span>)}</div>
    </div>
    <Img src={staticFile('brand/fathom_mark.png')} style={{ position: 'absolute', [right ? 'left' : 'right']: 30, bottom: 26, width: 86, height: 86 }} />
  </AbsoluteFill>;
};
