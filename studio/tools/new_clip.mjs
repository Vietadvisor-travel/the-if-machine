// Scaffold a 60-second true-story clip (studio/STORY.md, studio/CLIP.md):  node tools/new_clip.mjs <slug> "<tên tiếng Việt>"
//   → ../jobs/scripts/<slug>.md (script table to fill) + stories/<slug>.story (clip header + one l3 shot per line)
import fs from 'fs';
const [slug, vi = ''] = process.argv.slice(2); if (!/^[a-z0-9-]+$/.test(slug || '')) { console.log('usage: node tools/new_clip.mjs <slug> "<tên tiếng Việt>"'); process.exit(1); }
const w = (p, s) => { if (fs.existsSync(p)) { console.log('exists, kept: ' + p); return; } fs.writeFileSync(p, s); console.log('wrote ' + p); };
w(`../jobs/scripts/${slug}.md`, `# 60 s true story — <title> (${vi}) · standard: studio/STORY.md

## Sources
1. <outlet, title, date, URL>
2. <outlet, title, date, URL>

## Score  /10 (STORY.md §1, one line per criterion)

## The 4 tests
1. Hook:
2. Turn:
3. Sound-off:
4. Truth:

## Script (am_adam, speed 1.0, 150–190 words)
| time | VO | SHOT (set · actors · action · cam) | 2D | SFX | src |
|---|---|---|---|---|---|
| 0:00 | <verb-first hook line> | | — | — | 1 |
`);
w(`stories/${slug}.story`, `title: <title>   (${vi})
channel: ifm
format: vertical
clip: yes
voice: am_adam
look: classic
score: infinite_wonder@1
enddur: 1.5
sources: jobs/scripts/${slug}.md

// One beat = one shot (studio/CLIP.md §shot grammar). Keep one sentence per beat.
# vis kind=w act=l3 set=studio env=hdr/royal_esplanade light=day actors="a=glb/xbot@0,0,0:idle" cam=MS.eye.push on=a
<hook line>
`);
