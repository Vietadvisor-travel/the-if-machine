import React from 'react';
import { Composition, continueRender, delayRender } from 'remotion';
import { fontsReady } from './kit/fonts';
import { Story, storyMeta, StoryProps } from './engine/Story';
import { PaintTest } from './test/PaintTest';
import { PeopleTest } from './test/PeopleTest';
import { PlacesTest } from './test/PlacesTest';
import { LibSheet } from './test/LibSheet';
import { Thumb, thumbMeta, ThumbProps } from './kit/Thumb';
const h = delayRender('fonts'); fontsReady.then(() => continueRender(h));
// one composition plays every episode: npx remotion render Story out/x.mp4 --props='{"slug":"<slug>"}'
export const Root: React.FC = () => (
  <>
  <Composition id="PaintTest" component={PaintTest} durationInFrames={180} fps={30} width={1920} height={1080} />
  <Composition id="PeopleTest" component={PeopleTest} durationInFrames={90} fps={30} width={1920} height={1080} />
  <Composition id="PlacesTest" component={PlacesTest} durationInFrames={90} fps={30} width={1920} height={1080} />
  <Composition id="Thumb" component={Thumb} calculateMetadata={thumbMeta} defaultProps={{ slug: 'fx-board', t: 7, title: 'How far is the *Moon*?' } as ThumbProps} durationInFrames={1} fps={30} width={1280} height={720} />
  <Composition id="LibSheet" component={LibSheet} defaultProps={{ slug: 'pipeline-test', page: 0 }} durationInFrames={60} fps={30} width={1920} height={1080} />
  <Composition id="Story" component={Story} calculateMetadata={storyMeta} defaultProps={{ slug: 'moon-laser' } as StoryProps} durationInFrames={300} fps={30} width={1920} height={1080} />
  </>
);
