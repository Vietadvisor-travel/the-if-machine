import React from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { fontsReady } from './kit/fonts';
import { Story, storyMeta, StoryProps } from './engine/Story';
import { PaintTest } from './test/PaintTest';
const h = delayRender('fonts'); fontsReady.then(() => continueRender(h));
// one composition plays every episode: npx remotion render Story out/x.mp4 --props='{"slug":"<slug>"}'
export const Root: React.FC = () => (
  <>
  <Composition id="PaintTest" component={PaintTest} durationInFrames={120} fps={30} width={1920} height={1080} />
  <Composition id="Story" component={Story} calculateMetadata={storyMeta} defaultProps={{ slug: 'moon-laser' } as StoryProps} durationInFrames={300} fps={30} width={1920} height={1080} />
  </>
);
