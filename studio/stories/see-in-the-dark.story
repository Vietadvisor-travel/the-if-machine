title: What If You Could See in the Dark?   (Nhìn xuyên bóng tối)
channel: ifm
format: vertical
run: 5
next: What if you could breathe underwater?
voice: af_heart
cast: QUOTE=af_nicole LEGEND=am_santa
people: facet
theme: noir
chapters: 4
score: curious_mystery_bazaar@1 curious_hidden_agenda@5 wonder_silver_blue_light@11 tech_bit_quest@18 wonder_lightless_dawn@23 warm_ahdah@30
sources: jobs/research/see-in-the-dark.md — F1 cats need ~1/6 of the light · F2 rods 6–8× denser · F3 tapetum (mirror) · F5 pit viper: a mouse's warmth at ~1 m, a few thousandths of a degree · F7 dark adaptation 20–30 min · F8 ×100,000 · F9 red light keeps night vision, white light resets it · F10 nothing sees with zero light · F11 TRPA1 "wasabi receptor", pit signals join vision in the optic tectum (Gracheva 2010) · F12 single-photon detection, 51.6 % (Tinsley 2016) · F13 mice see near-infrared with nanoparticles (Ma 2019) · F14 the wartime carrot story · F15 goggles multiply light tens of thousands of times · F16 glass blocks thermal infrared · F17 pupil area 135× (cat) vs 15× (human) (Banks 2015) · F18 warm eyes glow (reasoning)

// Director's script: jobs/scripts/see-in-the-dark.md (S01–S32). Every beat is an animated scene with its own in-scene camera (IFM.CT.rig).

// S01 SUBJECT: the moon clicks off, the lamp clicks off, black with two eyes, then the ring of sight sweeps out and the room appears
# vis kind=w act=x_sd_cold w="NO|*MOON.*;NO|*LAMP.*;NO LIGHT|*AT ALL.*;AND YOU SEE|*EVERYTHING.*" cam=EWS.eye.static hook=1 pause=.8 time=night then="cam=CU.eye.static@2|cam=WS.eye.static@3"
No moon.
No lamp.
No light at all.
… And you see everything.

// S02 SUBJECT: she crosses the pitch-dark bedroom and bumps a toy; then a giant close-up of her eyes, the irises opening
# vis kind=w act=x_sd_hook kk="THE IF MACHINE" tt="WHAT IF YOU COULD|*SEE IN THE DARK?*" cam=WS.high.static trans=glCrossZoom time=night then="cam=ECU.eye.static@1"
What if you could see in the dark, as easily as you see at noon?
It sounds simple, until you ask what there is to see
when there is no light.

// S03 SUBJECT: black and a squeak; then the snake's heat-sight opens and a mouse glows like a lamp, one metre away
# vis kind=w act=x_sd_viper kk="A PIT VIPER · TOTAL DARKNESS" tt="IT SEES|*WARMTH*" cam=WS.low.static trans=iris tc=.5,.5 time=night then="cam=WS.low.static@1"
A pit viper already hunts this way,
because in total darkness it can pick out the warmth of a mouse
from about a metre away.

// S04 SUBJECT: one night street through three lenses: the cat's, yours after half an hour, a heat-seer's
# vis kind=w act=x_sd_lenses kk="IN THIS VIDEO" tt="THREE WAYS|TO *SEE*" cam=MS.eye.static trans=wipe pause=1.2 time=night then="cam=MS.eye.static@1|cam=MS.eye.static@2"
So in this video, we will look at how a cat stretches the light,
what your own eyes can secretly do,
and what it really takes to see when the light is gone.

// S05 SUBJECT: chapter 1 — a cat padding down a dark staircase, eyes glowing
# vis kind=w act=x_sd_chapter v=cat n=1 tt="THE CAT|*UPGRADE*" cam=MS.low.static trans=glFold pause=1 time=night
Let's start with the animal everyone thinks of first,
the cat on the stairs at midnight.

// S06 SUBJECT: close on the far street lamp in the window, pull back: one room, two exposures split by a sliding divider (you | the cat)
# vis kind=w act=x_sd_sixth kk="THE SAME ROOM · THE SAME LAMP" tt="ONE SIXTH|OF THE *LIGHT*" cam=EWS.eye.static trans=push2 time=night then="cam=WS.eye.static@1"
A cat needs only about one sixth of the light you need,
which means a street lamp down the road is enough
for it to cross a room you would stumble through.

// S07 SUBJECT: extreme close-up of a cat's eye: the slit swells into a giant circle, light pours in; your eye beside it for scale
# vis kind=w act=x_sd_pupil kk="THE PUPIL" tt="FROM A SLIT|TO A *CIRCLE*" cam=ECU.eye.static trans=zoomthru tc=.7,.5 tc2=.46,.42
Part of the trick is the pupil,
which can change its area about 135-fold, opening from a thin slit into a huge black circle,
while yours manages only about fifteen-fold.

// S08 SUBJECT: a cut-away eye: the ray crosses the sensors, hits the mirror, crosses again; then a torch in the garden finds two shining eyes
# vis kind=w act=x_sd_mirror kk="BEHIND THE RETINA" tt="A *MIRROR*" cam=MS.eye.static trans=morph tc=.46,.42 tc2=.5,.46 tr1=.2 tr2=.2 time=night then="cam=WS.eye.static@2"
Behind the retina sits a mirror called the tapetum,
so any light that slips past the sensors is bounced back for a second chance,
and that is why cat eyes shine in a torch beam.

// S09 SUBJECT: rod cells as little catchers: your sparse row drops the light, the cat's packed row catches it all
# vis kind=w act=x_sd_rods kk="THE RODS · BUILT FOR DIM LIGHT" tt="PACKED *TIGHT*" cam=CU.eye.static trans=glDirectionalWarp then="cam=CU.eye.static@1"
The retina itself is packed with rods, the cells built for dim light,
six to eight times more densely than yours.

// S10 SUBJECT: the fruit bowl as the cat sees it, wiped against your sharp colour; then click: black, two puzzled pairs of eyes
# vis kind=w act=x_sd_price kk="THE PRICE" tt="BLURRY,|LESS *COLOUR*" cam=MS.eye.static trans=slide then="cam=WS.eye.static@2" time=night
But there is a price, because a cat's world is blurrier and less colourful than yours,
and in a room with no light at all,
it sees exactly what you see, which is nothing.

// S11 SUBJECT: chapter 2 — a huge eye opening, stars in it
# vis kind=w act=x_sd_chapter v=eye n=2 tt="WHAT YOU|*ALREADY HAVE*" cam=CU.eye.static trans=glFold pause=1 same=ok time=night
Now for the surprise,
because your own eyes are far better in the dark than you think.

// S12 SUBJECT: he steps out of the bright door into black; the clock runs to 30 minutes while hills, trees and thousands of stars come out
# vis kind=w act=x_sd_adapt kk="DARK ADAPTATION" tt="GIVE IT|*30 MINUTES*" cam=WS.eye.static trans=push2 time=night then="cam=EWS.low.static@2"
Walk out of a bright room into the night,
and over the next twenty to thirty minutes
your eyes rebuild a light-sensitive pigment called rhodopsin.

// S13 SUBJECT: one giant rod charging with purple pigment like a battery; the counter races to ×100,000
# vis kind=w act=x_sd_charge kk="YOUR RETINA, RECHARGED" tt="100,000 TIMES|MORE *SENSITIVE*" cam=CU.low.static trans=zoomthru tc=.5,.3 tc2=.5,.5
By the end, your retina is roughly a hundred thousand times more sensitive
than it was in daylight.

// S14 SUBJECT: a vast dark lab: one particle of light drifts all the way across; then the eye: the smallest sparkle
# vis kind=w act=x_sd_photon kk="A 2016 EXPERIMENT" tt="ONE PARTICLE|OF *LIGHT*" cam=EWS.eye.static trans=glBokehDissolve time=night then="cam=ECU.eye.static@2"
In a 2016 experiment, people sitting in total darkness
could even tell, slightly better than chance,
when a single particle of light hit their eye.

// S15 SUBJECT: the starry field; he lifts his phone: a white blast, the pigment drains, the stars go out, the clock snaps to 00:00
# vis kind=w act=x_sd_phone kk="THE CATCH" tt="ONE *GLANCE*" cam=MS.eye.static trans=wipe time=night then="cam=CU.eye.static@1"
The catch is that one glance at a bright phone screen
bleaches that pigment in seconds,
and the thirty-minute clock starts again.

// S16 SUBJECT: an observatory under the stars, an astronomer in a small red pool of light; inside her eye the rods sleep through red particles
# vis kind=w act=x_sd_red kk="ASTRONOMERS · PILOTS" tt="RED KEEPS|THE *NIGHT*" cam=WS.low.static trans=glCrossWarp time=night then="cam=CU.eye.static@1"
That is why astronomers and pilots use dim red lamps,
because the rods barely respond to deep red light,
so the night vision survives.

// S17 SUBJECT: a cartoon poster of a carrot in flying goggles; the poster peels and behind it a radar dish sweeps
# vis kind=w act=x_sd_carrot kk="WHAT PEOPLE SAY" tt="THE *CARROT*|STORY" cam=MS.eye.static trans=glInkBleed time=night then="cam=WS.low.static@3"
And carrots?
People still say they help you see in the dark,
a claim that spread in the Second World War,
when Britain credited its night pilots' carrots while its radar stayed secret.
Vitamin A keeps eyes healthy, but extra carrots add no night vision.

// S18 SUBJECT: chapter 3 — night goggles drop onto a face and power up green
# vis kind=w act=x_sd_chapter v=goggles n=3 tt="BORROWED|*EYES*" cam=MCU.eye.static trans=glFold pause=1 same=ok time=night
So what happens when we build night vision instead?

// S19 SUBJECT: track along a cut-away goggle tube: gold particles, blue electrons, a storm, a green screen; then the forest through the goggles
# vis kind=w act=x_sd_tube kk="INSIDE THE GOGGLES" tt="MULTIPLY THE|*LIGHT*" cam=WS.eye.static trans=zoomthru tc=.5,.5 tc2=.2,.46 time=night then="cam=WS.pov.static@3"
Night-vision goggles collect the few particles of light that are there,
turn them into electrons,
and multiply them tens of thousands of times
before they hit a glowing green screen.

// S20 SUBJECT: a caver in goggles walks down into a cave; the round green view in the corner dims until it reads NO LIGHT
# vis kind=w act=x_sd_cave kk="A SEALED CAVE" tt="NO LIGHT,|NO *PICTURE*" cam=EWS.eye.static trans=glDirectionalWarp time=night
They still need a little starlight to work with, though,
so in a sealed cave, even the best goggles show nothing.

// S21 SUBJECT: inside a mouse's eye crystals turn a dark red beam into green sparks; then a maze from above: the mouse picks the infrared triangle
# vis kind=w act=x_sd_mice kk="2019 · A LAB EXPERIMENT" tt="MICE THAT SEE|*INFRARED*" cam=ECU.eye.static trans=slide then="cam=WS.top.static@3"
In 2019, scientists went further
and injected tiny particles into the eyes of mice,
which turned invisible infrared light into green light the mice could see,
and the mice could pick out infrared shapes while their normal vision carried on as before.

// S22 SUBJECT: the lamp clicks off over a kitchen; in the black the kettle, the cat, the radiator and the person start to shine by themselves
# vis kind=w act=x_sd_glow kk="NO LAMP AT ALL" tt="THE GLOW OF|*HEAT*" cam=WS.eye.static trans=dissolve time=night
But that is still light from a lamp.
To see with no lamp at all,
you need the one glow that everything warm gives off by itself, heat.

// S23 SUBJECT: chapter 4 — a snake uncoils, its tongue flicking
# vis kind=w act=x_sd_chapter v=snake n=4 tt="SEEING|*HEAT*" cam=MS.low.static trans=glFold pause=1 same=ok time=night
And one animal has been reading that glow for millions of years.

// S24 SUBJECT: a huge front close-up of a pit viper: the two pits pulse as waves of warmth arrive
# vis kind=w act=x_sd_pits kk="BETWEEN THE EYE AND THE NOSTRIL" tt="THE *PITS*" cam=CU.eye.static trans=zoom tc=.5,.5 time=night then="cam=ECU.eye.static@2"
Every warm object shines in infrared, including you,
and a pit viper has two small pits on its face,
between the eye and the nostril, that feel that glow.

// S25 SUBJECT: inside the pit tiny gates pop open at +0.003 °C; then a sushi counter: wasabi, flames from the nose, the same gate
# vis kind=w act=x_sd_wasabi kk="THE SENSOR" tt="THOUSANDTHS OF|A *DEGREE*" cam=ECU.eye.static trans=zoomthru tc=.6,.5 tc2=.5,.5 then="cam=MCU.eye.static@1"
The membrane inside each pit reacts to changes of a few thousandths of a degree,
using the same kind of sensor that makes wasabi burn your nose.

// S26 SUBJECT: a little cinema inside the snake's head: projector EYES and projector PITS throw two images that click into one
# vis kind=w act=x_sd_cinema kk="INSIDE THE SNAKE'S BRAIN" tt="TWO SENSES,|*ONE PICTURE*" cam=WS.eye.static trans=push2 time=night then="cam=MS.eye.static@1"
Those signals travel to the same part of the brain as the snake's eyes,
so the snake gets one picture, with the heat laid over the view.

// S27 SUBJECT: your living room in heat-sight: two glowing people, a handprint cooling on the wall, a warm seat left behind, footprints fading
# vis kind=w act=x_sd_heatmap kk="IF YOU HAD THAT SENSE" tt="A MAP OF|*WARMTH*" cam=WS.high.static trans=glCrossZoom time=night then="cam=WS.eye.static@1"
If you had that sense, darkness would turn into a map of warmth:
faces glowing, a handprint fading on the wall,
the seat someone just left.

// S28 SUBJECT: a friend waves outside the window; the wipe to heat-sight makes the friend vanish: the pane is a blank slab
# vis kind=w act=x_sd_glass kk="THE TRADE" tt="NO COLOUR,|NO *WINDOWS*" cam=MS.eye.static trans=wipe then="cam=MS.eye.static@1"
Colour would be gone, though, and so would windows,
because ordinary glass blocks this kind of infrared
and would look like a solid wall.

// S29 SUBJECT: a warm eye glowing like a bulb from inside; then the snake's membrane in its cool pocket of air; then a thermal camera with a tiny freezer
# vis kind=w act=x_sd_warmeye kk="ONE LAST CATCH" tt="WARM EYES|*GLOW*" cam=CU.eye.static trans=slide time=night then="cam=MS.eye.static@2|cam=MS.eye.static@3"
And there is one last catch, because your own eyes are warm,
so they would glow from the inside,
which is why the snake's sensor hangs in a cool pocket of air,
and thermal cameras often chill theirs.

// S30 SUBJECT: the three lenses again, labelled with the three ideas
# vis kind=w act=x_sd_lenses at="like a cat|your own eyes already|and to see in true" l="STRETCH THE LIGHT|YOUR EYES ADAPT|TRUE DARK = HEAT" kk="THE RECAP" tt="SO, WHAT|*HAPPENS?*" cam=WS.eye.static trans=glCrossWarp pause=1 same=ok time=night then="cam=WS.eye.static@2|cam=WS.eye.static@3"
So, what would happen if you could see in the dark?
Like a cat, you could stretch a little light a long way.
Your own eyes already do a quieter version of that.
And to see in true darkness, you would have to see heat.

// S31 SUBJECT: black, then starlight, then the warm glow of every living thing in a valley; the camera pulls back
# vis kind=w act=x_sd_never kk="THE ANSWER" tt="THE DARK WAS|*NEVER EMPTY*" cam=CU.eye.static trans=glCircleOpen time=night then="cam=EWS.eye.static@1"
In one sentence, seeing in the dark is not about brighter eyes,
it is about a different kind of light,
and the dark was never empty.

// S32 SUBJECT: the lamp clicks off, the phone goes face down, the window fills with stars; then the room floods with blue water: next time
# vis kind=w act=x_sd_outro next="WHAT IF YOU COULD|*BREATHE UNDERWATER?*" cam=WS.eye.static trans=glCrossZoom tail=2.4 then="cam=MS.eye.static@3"
So tonight, switch off the lamp, leave the phone face down,
and give your eyes thirty minutes.
You have more night vision than you think.
Next time on The If Machine: what if you could breathe underwater?
