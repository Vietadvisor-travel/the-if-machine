# Director's script — Trọng lực chỉ còn một nửa (gravity-half)

Written FIRST (owner, 4 Nov 2026). House look: studio/EPISODE.md §00 (2D only, IF CREW v3 + comic layer, CONTENT FIRST).
One vertical 9:16 film, about 8 min, af_heart at --speed 1.0, each beat ONE utterance. No quotations (af_nicole unused), no
legend (am_santa unused). Theme: cosmos. Places soft behind the subjects; subjects in the light.

REAL: Scott Kelly, Apollo, Moon, Earth, Sun, Japan, Andes, Himalaya

## Music (score:, from music/library.json, chosen for the content)
- Hook + chapter 1 (playful wonder) → chapter 2 (pensive, the body) → chapter 3 (airy, the thin air) → chapter 4 (vast, the
  sky) → conclusion (warm). Track ids fixed in the story header once the stock library is synced.

## Spine
- Hook: cold open (half your weight, twice your jump, half the air, the Sun lets go) → the question: gravity half as strong,
  everywhere → it sounds like a superpower → but astronauts show what too little gravity does: Scott Kelly's heart chamber lost
  ~0.74 g a week in 340 days despite exercise → promise: what you gain, what it takes, what it does to the planet.
- 1) The superpower week: weight halves, mass stays → jumps go 2× higher → but things are as hard to stop → Apollo lope at
  1/6 g → walk-run switch at ~0.7× the speed (Kram 1997) → orbit at 5.6 instead of 7.9 km/s → but the body reads it as a message.
- 2) The hidden workout: bone rebuilds to its load → 1–1.5 % a month in space (NASA) → 9 of 17 not recovered a year later
  → muscle up to 20 % in 5–11 days (CSA) → heart shrinks, spine stretches → honest catch: those are zero-g numbers → the mice
  centrifuge (JAXA, 2/3 g protects, 1/3 g does not fully) → half g in between: our guess → the bigger change is around you.
- 3) The thin air: air pressure is the weight of the air → half → like 5,500 m today → the air puffs up, half the oxygen per
  breath → water boils at ~81 °C → people adapt, the planet feels like a mountain top → still not the biggest change.
- 4) The Sun lets go: Earth at 30 km/s on the Sun's string → escape 42 km/s today, 30 at half pull = its own speed → away
  forever or a huge cold loop → the same rule for dying stars and our Moon → the danger is in the sky.
- Conclusion: twice the jump · the body shrinks to match · the air and the orbit change → holiday for the legs, slow bill for
  the body, real problem for the planet → closing thought: the heaviness keeps your bones strong, your air thick and your
  planet near the Sun → next: what if you could see in the dark?

## Transitions (planned, each carries the idea): zoomthru into the dial and the station window and the centrifuge / match the
Moon floor and the body and the kettle / morph the spring into the scale, the balloon into the air column and the outro into one
word / push2 and wipe along the argument / GL shaders where the meaning fits (glCrossWarp for the rocket, glInkBleed for the guess,
glDirectionalWarp up the mountain, glSwirl for the snapping string, glCircleOpen for the answer) / dissolve when time passes /
fade only into chapter cards. Montage: none needed beyond S28–S30 (air → kettle → village), a match cut at S10, S19, S29.

## v2 (owner, 10 Nov 2026: "a real cartoon, every scene its own design, varied 2D camera angles") — the build per shot
VO unchanged. Every shot is an animated scene with an in-scene camera rig (IFM.GH.rig); BUILD per shot:
S01 x_gh_cold (top-down scale → low-angle launch → CU balloon → EWS Sun string snaps) · S02 x_gh_hook (wide street, dial drops → low
angle leaps overhead) · S03 x_gh_station (EWS over Earth → CU visor) · S04 x_gh_kelly (ECU heart → pull back to treadmill runner) ·
S05 x_gh_promise (strip of three living panels) · S06/S14/S25/S31 x_gh_chapter v=spring|stairs|balloon|sun · S07 x_gh_scale (walk-in
→ giant CU take → low close receipt → pull back hop) · S08 x_gh_jump (low angle, tilt up) · S09 x_gh_trolley (top-down aisle → CU
bump) · S10 x_gh_moon (tracking hops + kangaroo → EWS) · S11 x_gh_treadmill (CU display → two treadmills → push in) · S12 x_gh_rocket
(over the crowd, tilt up with the rocket) · S13 x_gh_holiday (top-down beach → CU face) · S15 x_gh_xray · S16 x_gh_months · S17
x_gh_landing · S18 x_gh_muscle · S19 x_gh_body · S20 x_gh_road · S21 x_gh_centrifuge · S22 x_gh_mousegym · S23 x_gh_guess · S24
x_gh_lookup · S26 x_gh_airstack · S27 x_gh_climb · S28 x_gh_breath · S29 x_gh_tea · S30 x_gh_village · S32 x_gh_orbit · S33
x_gh_gauge · S34 x_gh_snap · S35 x_gh_star · S36 x_gh_freeze · S37 x_gh_promise (recap labels) · S38 x_gh_answer · S39 x_gh_outro.

## Shots

### S01 · HOOK COLD OPEN
- VO: Half your weight. Twice your jump. Half the air. … And the Sun lets go.
- LINK: opening shot of the film
- PICTURE: SUBJECT a bathroom scale, a spring, an air balloon and a small Earth, each slamming in on its line, then dissolving into gold dust / BACKGROUND deep cosmos, stars / FOREGROUND drifting gold motes / LIFE the punch words slam in one by one
- ACTION: none (drawn objects)
- SHOT: MS eye static 2D
- CAMERA: still; the punches do the moving
- LOOK: deep night blue, gold spotlight on each punch, tense
- TIMELINE: 0 HALF YOUR WEIGHT, the scale slams in · 1.4 TWICE YOUR JUMP, the spring · 2.8 HALF THE AIR, the balloon · 4.2 held beat · 5 AND THE SUN LETS GO, gold dust
- TEXT: HALF YOUR *WEIGHT.* / TWICE YOUR *JUMP.* / HALF THE *AIR.* / AND THE SUN *LETS GO.*
- FX: trans=none
- SOUND: music bed starts, a held silence before the last line
- BUILD: house act ex_cold items=scale|spring|balloon|earth end=WHAT IF GRAVITY WERE HALF?

### S02 · HOOK
- VO: What if gravity were only half as strong, everywhere, starting tomorrow morning? It sounds like a superpower, because you would weigh half as much and jump twice as high.
- LINK: the gold dust settles into a giant dial
- PICTURE: SUBJECT a great brass dial labelled GRAVITY, its needle swinging from 1 to ½, a crew figure below springing into a huge jump / BACKGROUND cosmos sky over a soft city rooftop / FOREGROUND soft rooftop edge / LIFE the needle swings, the figure rises
- ACTION: a woman (bun) stands, then jumps and hangs high in the air, cheering
- SHOT: WS eye push 2D | MS low crane 2D
- CAMERA: slow push to the dial, then crane up with the jump
- LOOK: night cosmos, warm gold dial, playful wonder
- TIMELINE: 0 the dial, WHAT IF GRAVITY WERE *HALF?* · 2 the needle swings to ½ · 4 the figure crouches · 5.5 she springs up · 8 she hangs high, cheering · 10 push settles
- TEXT: WHAT IF GRAVITY|WERE *HALF?*
- FX: trans=zoomthru tc=.5,.5 tc2=.5,.42
- SOUND: music bed, sfx whoosh on the jump
- BUILD: NEW x_gh_dial v=hook (dial + crew jumper)

### S03 · HOOK
- VO: But we already know what too little gravity does to a body, because astronauts live it every day on the space station.
- LINK: the jumper floats up and out of frame into orbit
- PICTURE: SUBJECT the space station drifting across the frame above a blue Earth limb / BACKGROUND stars / FOREGROUND a soft solar panel edge / LIFE the station glides, the Earth turns, sunlight sweeps
- ACTION: none (drawn station)
- SHOT: EWS high trackR 2D | WS eye push 2D
- CAMERA: track along the station, then push to a window
- LOOK: space black, blue Earth glow, calm awe
- TIMELINE: 0 the station glides in · 2 sunlight sweeps its panels · 4 push to one window · 6 the window glows
- TEXT: ON THE *SPACE STATION*
- FX: trans=push2 tdir=up
- SOUND: music bed only
- BUILD: NEW x_gh_iss v=station

### S04 · HOOK
- VO: Scott Kelly spent 340 days up there, and the main pumping chamber of his heart lost about three quarters of a gram every week, even though he exercised six days a week.
- LINK: through the station window to a heart on a lit card
- PICTURE: SUBJECT a drawn heart on a lit card, slowly getting smaller, a counter ticking 0.74 g A WEEK, a treadmill icon pulsing beside it / BACKGROUND the station interior, soft / FOREGROUND a floating pen / LIFE the heart beats, shrinks a little each beat
- ACTION: none (drawn heart and counter)
- SHOT: MCU eye push 2D | CU eye static 2D
- CAMERA: slow push to the heart
- LOOK: cool station white, red heart, factual
- TIMELINE: 0 the heart beats on the card · 2 340 DAYS kicks in · 4 the counter −0.74 g A WEEK · 6 the treadmill pulses: 6 DAYS A WEEK · 8 the heart is a little smaller
- TEXT: −0.74 G A WEEK
- FX: trans=zoomthru tc=.62,.45 tc2=.5,.45
- SOUND: music bed only
- BUILD: NEW x_gh_iss v=heart

### S05 · HOOK
- VO: So in this video, we will look at what half gravity gives you, what it quietly takes from your body, and what it does to the whole planet that almost nobody thinks about.
- LINK: the heart joins two more pictures as a three-point plan
- PICTURE: SUBJECT three numbered cards: a jumping person, a bone, the Sun and Earth / BACKGROUND cosmos sky / FOREGROUND soft stars / LIFE the cards drop in one by one
- ACTION: none (cards)
- SHOT: MS eye pull 2D | WS high static 2D
- CAMERA: pull back to reveal all three cards
- LOOK: dark cosmos, gold numbering, clean
- TIMELINE: 0 card 1 WHAT YOU GAIN · 3 card 2 WHAT IT TAKES · 6 card 3 THE PLANET · 9 hold
- TEXT: IN THIS *VIDEO*
- FX: trans=wipe
- SOUND: music bed, pause after
- BUILD: kit ex_list e=person running|bone|sun place=space

### S06 · SECTION 1 CHAPTER
- VO: Let's start with the fun part, the first week, when everything suddenly feels lighter than it should.
- LINK: the first card grows into the chapter card
- PICTURE: SUBJECT the number 1 and a bouncing spring / BACKGROUND dark cosmos / FOREGROUND none / LIFE the spring bounces
- ACTION: none (card)
- SHOT: MS low static 2D
- CAMERA: still
- LOOK: dark cosmos, gold numeral, a breath
- TIMELINE: 0 the numeral rises · 2 the title THE SUPERPOWER WEEK · 4 the spring bounces
- TEXT: THE SUPERPOWER WEEK
- FX: trans=fade
- SOUND: music bed, breath
- BUILD: kit ex_chapter n=1 obj=spring

### S07 · SECTION 1
- VO: Your mass stays the same, so you are still made of exactly as much stuff, but your weight, the pull you feel, drops by half, and the bathroom scale reads half your number.
- LINK: from the bouncing spring to the spring inside a bathroom scale
- PICTURE: SUBJECT a man (cap) on a big bathroom scale, the needle sweeping from 70 to 35, a label MASS: SAME beside him / BACKGROUND a soft bathroom with tiles / FOREGROUND a towel edge / LIFE the needle sweeps, he looks down, then cheers
- ACTION: a man stands on the scale, looks down, then does a small victory dance (gag: the scale prints a tiny receipt -50 %)
- SHOT: MS eye push 2D | CU high static 2D
- CAMERA: push to the needle, then a close look at the dial
- LOOK: warm morning bathroom, pastel tiles, comic
- TIMELINE: 0 he steps on · 2 the needle sweeps to 35 · 4 callout WEIGHT ½ · 6 MASS: SAME pops in · 8 he looks down in a take · 10 victory dance
- TEXT: WEIGHT *HALF* · MASS *SAME*
- FX: trans=morph tc=.5,.5 tc2=.5,.55 tr1=.15 tr2=.2
- SOUND: music bed, sfx pop on the needle
- BUILD: NEW x_gh_scale + NEW gag GAG.scaleslip (the scale prints a receipt)

### S08 · SECTION 1
- VO: The same push from your legs would launch you twice as high, because jump height depends on gravity, so a thirty-centimetre hop becomes a sixty-centimetre one.
- LINK: he jumps off the scale into the measured jump
- PICTURE: SUBJECT two jump arcs against a tall ruler: 30 cm on the left (Earth), 60 cm on the right (half gravity), a crew figure jumping in each / BACKGROUND a soft gym wall / FOREGROUND a mat edge / LIFE both jump in sync, the arcs draw
- ACTION: two women (braids, hijab) jump side by side, one twice as high
- SHOT: WS eye static 2D | MS low tilt 2D
- CAMERA: hold wide, then tilt up with the higher jump
- LOOK: bright gym, clean lines, playful
- TIMELINE: 0 both crouch · 1.5 they jump together · 3 the arcs draw: 30 CM / 60 CM · 5 tilt up with the higher one · 7 she lands softly · 9 the arcs glow
- TEXT: 30 CM → *60 CM*
- FX: trans=slide
- SOUND: music bed only
- BUILD: NEW x_gh_jump

### S09 · SECTION 1
- VO: That does not make things easier to stop, though, because their mass has not changed, so a rolling shopping trolley hits you just as hard as before.
- LINK: the jump lands in a supermarket aisle
- PICTURE: SUBJECT a loaded shopping trolley rolling toward a man who holds out his hands, then the bump / BACKGROUND a soft supermarket aisle / FOREGROUND a shelf edge / LIFE the trolley rolls, he braces
- ACTION: a man (beard) holds out his hands to stop a trolley, gets pushed back in a take, sweat drops
- SHOT: WS eye trackL 2D | MCU eye static 2D
- CAMERA: track with the trolley, then a close look at his face
- LOOK: cool supermarket light, comic beat
- TIMELINE: 0 the trolley rolls in · 2 callout MASS: SAME · 4 he braces · 5.5 bump, he jolts back · 7 MCU his deadpan face · 9 sweat drop
- TEXT: SAME *MASS* · SAME *BUMP*
- FX: trans=push2
- SOUND: sfx impact on the bump
- BUILD: NEW x_gh_trolley (gag: the take + sweat)

### S10 · SECTION 1
- VO: Walking changes too, because Apollo astronauts on the Moon, at one sixth of Earth's gravity, gave up on normal steps and loped, skipped and hopped like kangaroos instead.
- LINK: from the supermarket floor to the grey Moon floor
- PICTURE: SUBJECT a faceless astronaut in a white suit bounding across the grey Moon in big arcs, footprints left behind / BACKGROUND black sky, Earth on the horizon / FOREGROUND a soft grey rock / LIFE the astronaut hops, dust puffs
- ACTION: an astronaut lopes and hops across the ground
- SHOT: EWS low trackR 2D | WS eye pan 2D
- CAMERA: track with the hops, pan to Earth in the sky
- LOOK: Moon grey, black sky, quiet wonder
- TIMELINE: 0 the astronaut lands · 2 hop, dust puff · 4 hop, footprints · 6 1/6 GRAVITY label · 8 pan to Earth
- TEXT: 1/6 OF EARTH'S *GRAVITY*
- FX: trans=match tc=.5,.6 tc2=.5,.62
- SOUND: music bed only
- BUILD: NEW x_gh_lope

### S11 · SECTION 1
- VO: Lab studies with people in harnesses found that in weaker gravity we switch from walking to running at slower speeds, so at half gravity you would break into a run at about seven tenths of today's pace.
- LINK: from loping to two walkers on a measured track
- PICTURE: SUBJECT two figures on a track: on Earth one walks then breaks into a run at 7 KM/H, at half gravity the other breaks into a run at 5 KM/H / BACKGROUND a soft lab with a harness rig / FOREGROUND none / LIFE both walk, then switch to running
- ACTION: two people walk, then break into a run at different speeds
- SHOT: MS eye trackR 2D | WS high static 2D
- CAMERA: track along the walkers
- LOOK: white lab, teal and gold, factual
- TIMELINE: 0 two walkers · 2 EARTH: RUN AT ~7 KM/H · 4 HALF G: RUN AT ~5 KM/H · 6 the half-g walker breaks into a run first · 9 hold
- TEXT: WALK → *RUN*
- FX: trans=wipe
- SOUND: music bed only
- BUILD: kit ex_compare e=person walking|person running place=lab

### S12 · SECTION 1
- VO: Even rockets get a break, because the speed you need to stay in orbit would fall from about 7.9 to about 5.6 kilometres a second, which makes space far cheaper to reach.
- LINK: the runner becomes a rocket on the pad
- PICTURE: SUBJECT a rocket on a pad lifting off, two speed gauges: 7.9 KM/S crossed, 5.6 KM/S lit / BACKGROUND a soft launch site at dawn / FOREGROUND a tower edge / LIFE the rocket rises, smoke billows
- ACTION: none (rocket)
- SHOT: WS low crane 2D | MS eye static 2D
- CAMERA: crane up with the rocket
- LOOK: dawn launch, warm smoke, optimistic
- TIMELINE: 0 the rocket on the pad · 2 7.9 KM/S gauge · 4 it lifts · 6 5.6 KM/S lights up · 8 crane with the rise
- TEXT: ORBIT AT *5.6 KM/S*
- FX: trans=glCrossWarp
- SOUND: sfx rocket rumble on the lift
- BUILD: NEW x_gh_rocket

### S13 · SECTION 1
- VO: So for a week, half gravity feels like a holiday for your legs. But your body is not on holiday, and it starts reading the change as a message.
- LINK: the rocket lands back in a sunny deck chair scene
- PICTURE: SUBJECT a woman relaxing on a deck chair, legs up, sunglasses; then she frowns and thinks / BACKGROUND a soft street stage / FOREGROUND a beach umbrella edge / LIFE she relaxes, then thinks
- ACTION: a woman (bun) relaxes, then thinks, worried
- SHOT: MS eye pull 2D | MCU eye push 2D
- CAMERA: pull back, then push to her face
- LOOK: warm afternoon, then a cooler shade, a turn
- TIMELINE: 0 she relaxes, happy · 3 A HOLIDAY FOR YOUR LEGS · 5 her face turns to think · 7 worried · 9 hold
- TEXT: A HOLIDAY FOR|YOUR *LEGS*
- FX: trans=iris tc=.5,.5
- SOUND: music bed only
- BUILD: house act crew set=stage

### S14 · SECTION 2 CHAPTER
- VO: Because gravity is not just a pull, it is the workout you never notice, every step, every stair, every time you stand up.
- LINK: her thought becomes the chapter card
- PICTURE: SUBJECT the number 2 and a bone / BACKGROUND dark cosmos / FOREGROUND none / LIFE the bone glints
- ACTION: none (card)
- SHOT: MS low static 2D
- CAMERA: still
- LOOK: dark cosmos, gold numeral, a breath
- TIMELINE: 0 numeral · 2 THE HIDDEN WORKOUT · 4 the bone glints
- TEXT: THE HIDDEN WORKOUT
- FX: trans=fade
- SOUND: music changes: pensive
- BUILD: kit ex_chapter n=2 obj=bone

### S15 · SECTION 2
- VO: Bones are living tissue that rebuilds itself to match the load it carries, so when the load drops, the body starts taking apart bone it no longer seems to need.
- LINK: the chapter bone grows into a cut-away bone
- PICTURE: SUBJECT a big cut-away thigh bone with its inner lattice, a weight arrow pressing on top, then the arrow halves and the lattice thins / BACKGROUND a soft lab / FOREGROUND none / LIFE the lattice thins strut by strut
- ACTION: none (drawn bone)
- SHOT: MCU eye push 2D | CU eye static 2D
- CAMERA: slow push into the lattice
- LOOK: clean lab white, bone ivory, gold arrow, calm
- TIMELINE: 0 the bone with LOAD arrow · 3 the arrow halves · 5 struts fade one by one · 8 callout LESS LOAD, LESS BONE · 10 hold
- TEXT: LESS LOAD,|LESS *BONE*
- FX: trans=zoom tc=.5,.45
- SOUND: music bed only
- BUILD: NEW x_gh_bone

### S16 · SECTION 2
- VO: On long space missions, astronauts have lost about one to one and a half percent of their bone density every month, mostly in the hips, legs and spine.
- LINK: the thinning lattice becomes a number
- PICTURE: SUBJECT the number 1.5 % big, a bone beside it / BACKGROUND a soft lab / FOREGROUND none / LIFE the number counts up
- ACTION: none (number)
- SHOT: MS eye pull 2D
- CAMERA: pull back from the number
- LOOK: lab white, gold number, factual
- TIMELINE: 0 counter 0 → 1.5 % · 3 A MONTH · 6 the bone dims slightly · 9 hold
- TEXT: 1.5 % A MONTH
- FX: trans=push2
- SOUND: music bed only
- BUILD: kit ex_stat v=1.5 e=bone place=lab

### S17 · SECTION 2
- VO: And it does not simply grow back, because in a study of seventeen space station astronauts, nine still had not recovered their shin bone density a full year after landing.
- LINK: from one number to seventeen people
- PICTURE: SUBJECT a grid of 17 people, 9 of them highlighted / BACKGROUND a soft classroom / FOREGROUND none / LIFE the people pop in, nine light up
- ACTION: none (grid)
- SHOT: WS high static 2D | MS eye push 2D
- CAMERA: push to the highlighted nine
- LOOK: classroom warm, gold highlight, sober
- TIMELINE: 0 17 people pop in · 4 nine light up · 6 9 OF 17 · 8 A YEAR LATER
- TEXT: 9 OF 17
- FX: trans=slide
- SOUND: music bed only
- BUILD: kit ex_stat v=9 gn=17 hi=9 e=person place=classroom

### S18 · SECTION 2
- VO: Muscles follow the same rule, and space agencies report losses of up to twenty percent of muscle mass on flights as short as five to eleven days.
- LINK: one of the nine lifts a dumbbell
- PICTURE: SUBJECT a man (cap) holding a dumbbell labelled GRAVITY; the dumbbell floats out of his hand and his arm slowly deflates like a balloon / BACKGROUND a soft gym / FOREGROUND a bench edge / LIFE the dumbbell floats, the arm shrinks
- ACTION: a man holds a dumbbell, it floats away, he stares (gag: the arm deflates)
- SHOT: MS eye push 2D | MCU eye static 2D
- CAMERA: push in on the arm
- LOOK: gym warm light, comic deadpan
- TIMELINE: 0 he lifts the dumbbell GRAVITY · 2 it floats up · 4 his arm deflates · 6 UP TO 20 % · 8 he stares at the viewer, deadpan
- TEXT: UP TO *20 %*
- FX: trans=dissolve
- SOUND: sfx deflate
- BUILD: NEW x_gh_muscle + NEW gag GAG.floatbell

### S19 · SECTION 2
- VO: The heart shrinks for a simple reason, because it no longer has to pump blood uphill against the pull, and the spine stretches out, so astronauts come home a few centimetres taller for a while.
- LINK: the deflated arm leads to a body diagram
- PICTURE: SUBJECT a body outline with a heart pumping blood up a slope that flattens, and a spine that stretches with a ruler beside it / BACKGROUND a soft lab / FOREGROUND none / LIFE the slope flattens, the spine stretches
- ACTION: none (diagram)
- SHOT: MS eye tilt 2D | CU eye static 2D
- CAMERA: tilt down from the head to the heart
- LOOK: lab white, red heart, teal spine, clear
- TIMELINE: 0 the heart pumps uphill · 3 the slope flattens · 5 HEART SHRINKS · 7 the spine stretches · 9 A FEW CM TALLER
- TEXT: HEART *SHRINKS* · SPINE *STRETCHES*
- FX: trans=match tc=.5,.5 tc2=.5,.48
- SOUND: music bed only
- BUILD: NEW x_gh_heart

### S20 · SECTION 2
- VO: Here is the honest catch, because all of those numbers come from near zero gravity, not half, and no human has ever lived for months anywhere between zero and Earth's gravity.
- LINK: back to the gravity dial
- PICTURE: SUBJECT the gravity dial from 0 to 1, the space between marked UNTESTED in a dashed band, an astronaut at 0 and a person at 1 / BACKGROUND cosmos / FOREGROUND none / LIFE the needle sweeps across the gap
- ACTION: none (dial)
- SHOT: WS eye static 2D | MS low push 2D
- CAMERA: push to the empty band
- LOOK: cosmos, gold dial, honest
- TIMELINE: 0 the dial · 2 SPACE STATION at 0 · 4 EARTH at 1 · 6 the gap: UNTESTED · 9 hold
- TEXT: NEVER *TESTED*
- FX: trans=wipe
- SOUND: music bed only
- BUILD: x_gh_dial v=gap

### S21 · SECTION 2
- VO: The closest test so far used mice, when Japan's space agency spun them in a centrifuge on the space station for about a month at four different levels of gravity.
- LINK: the dial's gap becomes a spinning wheel
- PICTURE: SUBJECT a round centrifuge with four little cages labelled 0 G, 1/3 G, 2/3 G, 1 G, a mouse in each / BACKGROUND the station interior, soft / FOREGROUND a floating cable / LIFE the wheel spins slowly, mice look out
- ACTION: none (drawn centrifuge and mice)
- SHOT: MS top orbit 2D | CU eye push 2D
- CAMERA: slow orbit over the wheel, push to one cage
- LOOK: cool station white, warm mice, curious
- TIMELINE: 0 the wheel spins · 2 cages labelled · 4 push to a mouse · 6 ABOUT A MONTH · 9 hold
- TEXT: MICE IN A *CENTRIFUGE*
- FX: trans=zoomthru tc=.5,.5 tc2=.5,.5
- SOUND: sfx soft hum
- BUILD: NEW x_gh_mice v=wheel

### S22 · SECTION 2
- VO: At two thirds of Earth's gravity their muscles stayed strong, while at one third the loss slowed down but their muscles still got weaker.
- LINK: two cages come forward
- PICTURE: SUBJECT two mice side by side: 2/3 G flexing, strong, 1/3 G slumped, weaker / BACKGROUND soft station / FOREGROUND none / LIFE the strong mouse flexes, the weak one slumps
- ACTION: none (mice)
- SHOT: MS eye trackL 2D
- CAMERA: track from one mouse to the other
- LOOK: station white, gold vs grey, clear
- TIMELINE: 0 2/3 G: STRONG · 3 the mouse flexes · 5 1/3 G: WEAKER · 7 the mouse slumps · 9 hold
- TEXT: 2/3 G *STRONG* · 1/3 G *WEAKER*
- FX: trans=push2
- SOUND: music bed only
- BUILD: x_gh_mice v=result

### S23 · SECTION 2
- VO: Half gravity sits right between those two results, so here we have to guess, and the honest guess is a slower loss than astronauts suffer, but probably not zero.
- LINK: the two mice slide onto the dial
- PICTURE: SUBJECT the gravity dial with marks at 1/3 and 2/3 and the needle stopping at ½ with a big question mark / BACKGROUND cosmos / FOREGROUND none / LIFE the needle settles, the question mark pulses
- ACTION: none (dial)
- SHOT: MCU eye push 2D
- CAMERA: push to the ½ mark
- LOOK: cosmos, gold needle, thoughtful
- TIMELINE: 0 marks 1/3 and 2/3 · 3 the needle stops at ½ · 5 the question mark · 7 OUR GUESS: SLOWER, NOT ZERO
- TEXT: OUR GUESS
- FX: trans=glInkBleed
- SOUND: music bed only
- BUILD: x_gh_dial v=guess

### S24 · SECTION 2
- VO: So your body would adjust, slowly and quietly, to carrying less. But the biggest change would not happen inside you, it would happen all around you.
- LINK: the question mark lifts into the sky above a street
- PICTURE: SUBJECT a crew of people in a street looking up at the sky / BACKGROUND a soft street / FOREGROUND none / LIFE they look up one by one
- ACTION: people stand in a street and look up at the sky
- SHOT: WS low pan 2D
- CAMERA: pan up with their gaze
- LOOK: late afternoon street, cool sky, a turn
- TIMELINE: 0 people in the street · 3 they look up one by one · 6 AROUND YOU · 9 pan to the sky
- TEXT: ALL *AROUND* YOU
- FX: trans=slide
- SOUND: music bed only
- BUILD: house act crew set=street

### S25 · SECTION 3 CHAPTER
- VO: Because gravity also holds the air down, and that air has weight of its own.
- LINK: the sky becomes the chapter card
- PICTURE: SUBJECT the number 3 and a balloon / BACKGROUND dark cosmos / FOREGROUND none / LIFE the balloon bobs
- ACTION: none (card)
- SHOT: MS low static 2D
- CAMERA: still
- LOOK: dark cosmos, gold numeral, a breath
- TIMELINE: 0 numeral · 2 THE THIN AIR · 4 the balloon bobs
- TEXT: THE THIN AIR
- FX: trans=fade
- SOUND: music changes: airy
- BUILD: kit ex_chapter n=3 obj=balloon

### S26 · SECTION 3
- VO: The pressure you feel at sea level is simply the weight of all the air stacked above you, so if that air weighed half as much, the pressure at the ground would drop to about half.
- LINK: the balloon rises into a stack of air
- PICTURE: SUBJECT a person at the bottom of a tall column of stacked air blocks; then half the blocks turn transparent and a pressure gauge drops from 1 to ½ / BACKGROUND a soft blue sky over a coast / FOREGROUND none / LIFE the blocks stack, then lighten
- ACTION: a woman (hijab) stands under the column, looks up
- SHOT: WS low tilt 2D | MS eye push 2D
- CAMERA: tilt up the column, then push to the gauge
- LOOK: blue sky, white blocks, clean
- TIMELINE: 0 the column stacks up · 3 THE WEIGHT OF AIR · 5 the blocks lighten · 7 gauge 1 → ½ · 10 hold
- TEXT: THE WEIGHT|OF *AIR*
- FX: trans=morph tc=.5,.4 tc2=.5,.3 tr1=.1 tr2=.2
- SOUND: music bed only
- BUILD: NEW x_gh_air

### S27 · SECTION 3
- VO: Today you only find air that thin about five and a half kilometres up, higher than any town on Earth, where most people feel short of breath and climbers stop for days to let their bodies adjust.
- LINK: the column of air becomes a mountain
- PICTURE: SUBJECT a snowy mountain with a dashed line at 5,500 M, a climber resting at a tent on the line / BACKGROUND a soft pale sky / FOREGROUND a soft rock / LIFE snow drifts, the climber breathes
- ACTION: a climber (beard) sits by a tent, breathing hard
- SHOT: EWS low crane 2D | MS eye static 2D
- CAMERA: crane up the mountain to the line
- LOOK: cold blue-white, thin light, sober
- TIMELINE: 0 the mountain · 3 the line 5,500 M · 5 the climber at the tent · 7 HALF THE PRESSURE · 10 hold
- TEXT: LIKE LIVING AT *5,500 M*
- FX: trans=glDirectionalWarp
- SOUND: music bed only
- BUILD: NEW x_gh_mountain

### S28 · SECTION 3
- VO: The air would not disappear, it would puff up and stretch higher into the sky, but every breath at the bottom would carry only about half as much oxygen as today.
- LINK: the mountain's sky becomes the air column again, now stretched
- PICTURE: SUBJECT the air column stretching twice as tall and paler, a pair of lungs at the bottom taking a smaller breath / BACKGROUND blue sky / FOREGROUND none / LIFE the column stretches, the lungs breathe
- ACTION: none (diagram)
- SHOT: WS eye pull 2D | MCU eye static 2D
- CAMERA: pull back as the column stretches
- LOOK: pale blue, airy, calm
- TIMELINE: 0 the column stretches up · 3 TALLER, THINNER · 5 lungs breathe · 7 ½ THE OXYGEN · 10 hold
- TEXT: ½ THE *OXYGEN*
- FX: trans=dissolve
- SOUND: music bed only
- BUILD: x_gh_air v=puff

### S29 · SECTION 3
- VO: Even your kitchen would notice, because at half an atmosphere water boils at about eighty-one degrees, so pasta takes longer and the tea never gets properly hot.
- LINK: a breath fogs into kettle steam
- PICTURE: SUBJECT a kettle boiling with a thermometer reading 81 °C, a teabag with a face hanging out of a mug, unimpressed / BACKGROUND a soft kitchen / FOREGROUND a mug edge / LIFE steam rises, the teabag sighs
- ACTION: none (drawn kettle; gag: the teabag stares, deadpan)
- SHOT: MS eye static 2D | CU eye push 2D
- CAMERA: push to the teabag
- LOOK: warm kitchen, steam, comic
- TIMELINE: 0 the kettle boils · 2 thermometer 81 °C · 4 the teabag dips in · 6 it stares at the viewer · 8 LUKEWARM TEA
- TEXT: BOILS AT *81 °C*
- FX: trans=match tc=.5,.5 tc2=.5,.5
- SOUND: sfx kettle whistle (soft)
- BUILD: NEW x_gh_kettle + NEW gag GAG.sadtea

### S30 · SECTION 3
- VO: Lungs would cope over time, the way people adapt in the high Andes and the Himalaya, but the whole planet would feel like a mountain top, and that is still not the biggest change.
- LINK: the steam lifts into high mountain clouds
- PICTURE: SUBJECT a mountain village with terraces and a few people walking / BACKGROUND soft high peaks / FOREGROUND soft grass / LIFE prayer flags flutter, people walk
- ACTION: people walk through a high village
- SHOT: WS high pan 2D
- CAMERA: slow pan across the village
- LOOK: high-altitude sun, clear, hopeful
- TIMELINE: 0 the village · 3 PEOPLE ADAPT · 6 the pan crosses the peaks · 9 STILL NOT THE BIGGEST
- TEXT: PEOPLE *ADAPT*
- FX: trans=glBokehDissolve
- SOUND: music bed only
- BUILD: kit ex_show e=snow-capped mountain place=village

### S31 · SECTION 4 CHAPTER
- VO: Because half gravity everywhere also means half the pull between the Earth and the Sun.
- LINK: the peaks give way to the chapter card
- PICTURE: SUBJECT the number 4 and the Sun / BACKGROUND dark cosmos / FOREGROUND none / LIFE the Sun glows
- ACTION: none (card)
- SHOT: MS low static 2D
- CAMERA: still
- LOOK: dark cosmos, gold numeral, a breath
- TIMELINE: 0 numeral · 2 THE SUN LETS GO · 4 the Sun glows
- TEXT: THE SUN LETS GO
- FX: trans=fade
- SOUND: music changes: vast
- BUILD: kit ex_chapter n=4 obj=sun

### S32 · SECTION 4
- VO: Right now Earth races around the Sun at about thirty kilometres a second, and the Sun's pull bends that straight line into a circle, like a ball swung on a string.
- LINK: the chapter Sun becomes the centre of an orbit
- PICTURE: SUBJECT the Sun at the centre, the Earth circling on a gold string, a callout 30 KM/S / BACKGROUND cosmos / FOREGROUND soft stars / LIFE the Earth circles, the string stays taut
- ACTION: none (orbit)
- SHOT: EWS top orbit 2D | WS eye push 2D
- CAMERA: slow orbit around the system
- LOOK: deep space, warm Sun, blue Earth, grand
- TIMELINE: 0 the Sun · 2 the Earth swings on its string · 4 30 KM/S · 6 the string glows · 9 push in
- TEXT: 30 KM *A SECOND*
- FX: trans=zoom tc=.5,.5
- SOUND: music bed only
- BUILD: NEW x_gh_orbit v=string + NEW gag GAG.leash (Earth on a leash)

### S33 · SECTION 4
- VO: Today Earth would need about forty-two kilometres a second to escape the Sun, but with half the pull, the escape speed drops to about thirty, which is exactly how fast it is already going.
- LINK: the orbit flattens into three numbers
- PICTURE: SUBJECT three steps: ORBIT 30 KM/S, ESCAPE TODAY 42 KM/S, ESCAPE AT HALF PULL 30 KM/S / BACKGROUND cosmos / FOREGROUND none / LIFE the steps appear, the last one matches the first
- ACTION: none (chain)
- SHOT: MS eye trackR 2D
- CAMERA: track along the chain
- LOOK: cosmos, gold numbers, precise
- TIMELINE: 0 ORBIT 30 · 3 ESCAPE TODAY 42 · 6 HALF PULL: ESCAPE 30 · 8 the first and last glow together
- TEXT: 30 = *30*
- FX: trans=push2
- SOUND: music bed only
- BUILD: kit ex_flow e=globe showing americas|rocket|sun l=ORBIT 30 KM/S|ESCAPE 42 KM/S|HALF PULL: 30 place=space

### S34 · SECTION 4
- VO: So Earth would sit right on the edge, and depending on the day it happened, it would either drift away from the Sun forever or swing out on a huge, cold loop.
- LINK: back to the orbit; the string frays
- PICTURE: SUBJECT the Earth on its string; the string frays and snaps, the Earth drifts off along a wide dashed path, waving a tiny hand / BACKGROUND cosmos / FOREGROUND soft stars / LIFE the string snaps, the Earth drifts
- ACTION: none (orbit; gag: the Earth waves goodbye)
- SHOT: EWS eye pull 2D | WS high static 2D
- CAMERA: pull back as the Earth drifts
- LOOK: deep space, colder palette, gentle
- TIMELINE: 0 the string frays · 3 it snaps · 5 the Earth drifts on a dashed path · 7 two paths: AWAY · A HUGE LOOP · 10 the Earth waves
- TEXT: AWAY *FOREVER*|OR A *HUGE LOOP*
- FX: trans=glSwirl
- SOUND: sfx snap
- BUILD: x_gh_orbit v=snap

### S35 · SECTION 4
- VO: Astronomers describe the same thing for dying stars, because if a star lost half its mass in an instant, its planets would fly off, and our Moon would be in the same position around the Earth.
- LINK: the drifting Earth passes a distant star
- PICTURE: SUBJECT a glowing star with planets drifting outward from it, the Moon beside the Earth drifting too / BACKGROUND deep space / FOREGROUND soft dust / LIFE the planets drift out
- ACTION: none (space)
- SHOT: WS eye orbit 2D
- CAMERA: slow orbit around the star
- LOOK: deep space, violet glow, wonder
- TIMELINE: 0 the star glows · 3 planets drift out · 6 HALF THE MASS · 8 the Moon drifts from the Earth
- TEXT: THE SAME *RULE*
- FX: trans=slide
- SOUND: music bed only
- BUILD: kit ex_show e=glowing star around=ringed planet|full moon|globe showing americas place=space

### S36 · SECTION 4
- VO: If Earth escaped, the Sun would shrink in the sky year by year and the oceans would slowly freeze over, which is why the real danger of half gravity is not in your bones, it is in the sky.
- LINK: the drifting Earth seen from its own surface
- PICTURE: SUBJECT a seaside with a tiny, pale Sun shrinking in the sky, the sea icing over, two people in coats looking up / BACKGROUND a soft coast / FOREGROUND soft frozen reeds / LIFE the Sun shrinks, ice spreads
- ACTION: two people in coats stand on the shore and look up at the shrinking Sun
- SHOT: WS eye static 2D | MS low push 2D
- CAMERA: hold, then push low to the people
- LOOK: cold blue dusk, pale Sun, quiet
- TIMELINE: 0 the coast · 3 the Sun shrinks · 5 the sea ices over · 7 they look up · 10 THE DANGER IS IN THE SKY
- TEXT: THE DANGER IS|IN THE *SKY*
- FX: trans=dissolve
- SOUND: music bed, a held note
- BUILD: NEW x_gh_freeze

### S37 · CONCLUSION RECAP
- VO: So, what would happen if gravity were only half as strong? You would jump twice as high and feel light for a while, your bones, muscles and heart would slowly shrink to match, and the air and even Earth's path around the Sun would change.
- LINK: the cold coast warms into the recap card
- PICTURE: SUBJECT a numbered list of three: a spring, a bone, the Sun / BACKGROUND a soft classroom / FOREGROUND none / LIFE the lines appear one by one
- ACTION: none (list)
- SHOT: MS eye pull 2D | WS high static 2D
- CAMERA: pull back across the list
- LOOK: warm classroom, gold numbers, clear
- TIMELINE: 0 SO, WHAT HAPPENS? · 3 1 TWICE THE JUMP · 6 2 THE BODY SHRINKS TO MATCH · 9 3 THE AIR AND THE ORBIT CHANGE · 12 hold
- TEXT: SO, WHAT|*HAPPENS?*
- FX: trans=wipe
- SOUND: music changes: warm
- BUILD: kit ex_list n=1 e=spring|bone|sun place=classroom

### S38 · CONCLUSION ANSWER
- VO: In one sentence, half gravity would be a holiday for your legs, a slow bill for your body, and a real problem for the whole planet.
- LINK: the three recap items line up as the answer
- PICTURE: SUBJECT a chain of three: a beach umbrella (HOLIDAY), a bone (SLOW BILL), the Earth (REAL PROBLEM) / BACKGROUND cosmos / FOREGROUND none / LIFE the chain draws
- ACTION: none (chain)
- SHOT: MS eye trackL 2D
- CAMERA: track along the chain
- LOOK: cosmos, gold and coral, decisive
- TIMELINE: 0 HOLIDAY · 3 SLOW BILL · 5 REAL PROBLEM · 7 hold
- TEXT: THE *ANSWER*
- FX: trans=glCircleOpen
- SOUND: music bed only
- BUILD: kit ex_flow e=beach with umbrella|bone|globe showing asia-australia l=HOLIDAY|SLOW BILL|REAL PROBLEM place=space

### S39 · CONCLUSION OUTRO
- VO: So the next time getting out of bed feels heavy, remember that this weight keeps your bones strong, your air thick and your planet close to the Sun. Next time on The If Machine: what if you could see in the dark?
- LINK: the chain merges into one word
- PICTURE: SUBJECT a spring, a bone and the Earth merging into the glowing word HEAVY IS GOOD; then the next question with an eye / BACKGROUND cosmos / FOREGROUND gold motes / LIFE the things merge, the word glows
- ACTION: none (outro)
- SHOT: WS eye static 2D
- CAMERA: still, the merge does the moving
- LOOK: cosmos, warm gold, gentle close
- TIMELINE: 0 the three things drift together · 4 they merge into HEAVY IS GOOD · 8 the sub KEEPS YOU HERE · 11 NEXT: WHAT IF YOU COULD SEE IN THE DARK? · 14 end card
- TEXT: HEAVY IS *GOOD* / WHAT IF YOU COULD|SEE IN THE *DARK?*
- FX: trans=morph tc=.5,.45 tc2=.5,.44 tr1=.2 tr2=.2
- SOUND: music resolves
- BUILD: house act ex_outro items=spring|bone|earth word=HEAVY IS GOOD next=WHAT IF YOU COULD|SEE IN THE *DARK?* e=eye
