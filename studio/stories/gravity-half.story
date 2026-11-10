title: What If Gravity Were Only Half as Strong?   (Trọng lực chỉ còn một nửa)
channel: ifm
format: vertical
run: 4
next: What if you could see in the dark?
voice: af_heart
cast: QUOTE=af_nicole LEGEND=am_santa
people: facet
theme: cosmos
chapters: 4
score: curious_easy_lemon@1 curious_aftermath@14 wonder_airship_serenity@25 infinite_wonder@31 warm_andreas_theme@37
sources: jobs/research/gravity-half.md — F1 Moon 1/6 g · F2 bone 1–1.5 %/month (NASA NTRS 20170004598, Space.com) · F3 9 of 17 not recovered a year later (Gabel 2022) · F4 Kelly LV −0.74 g/week, 340 days, exercise 6 days/week (UTSW, News-Medical; Circulation 2021) · F5 spine stretches, a few cm taller · F6 up to 20 % muscle in 5–11 days (CSA, ASME) · F7 Apollo lope · F9 jump height ∝ 1/g · F11 JAXA MARS centrifuge mice 0/0.33/0.67/1 g (Sci Adv 2026) · F12 walk-run switch at Fr ≈ 0.5 (Kram 1997) · F13 half pressure ≈ 5,500 m, water boils ~81 °C at 50 kPa · F14 circular orbit speed = escape speed at half mass (Astronomy, Astrobites) · F15 orbital speed 7.9 → 5.6 km/s (√(gR))

// Director's script: jobs/scripts/gravity-half.md (S01–S39). One beat per shot, VO verbatim, one smooth camera move per shot.

// S01 SUBJECT: the cold open — a bathroom scale, a spring, a balloon, the Earth, one punch per line, then gold dust
# vis kind=w act=x_gh_cold w="HALF YOUR|*WEIGHT.*;TWICE YOUR|*JUMP.*;HALF THE|*AIR.*;AND THE SUN|*LETS GO.*" end="WHAT IF GRAVITY WERE HALF?" cam=MS.eye.static hook=1 pause=.8 then="cam=MS.eye.static@1|cam=MS.eye.static@3"
Half your weight.
Twice your jump.
Half the air.
… And the Sun lets go.

// S02 SUBJECT: the gravity dial swings from 1 to ½ while a woman below springs into a huge jump
# vis kind=w act=x_gh_hook kk="THE IF MACHINE" tt="WHAT IF GRAVITY|WERE *HALF?*" cam=WS.eye.static trans=glCrossZoom then="cam=WS.eye.static@1"
What if gravity were only half as strong, everywhere, starting tomorrow morning?
It sounds like a superpower,
because you would weigh half as much and jump twice as high.

// S03 SUBJECT: the space station gliding over the blue limb of the Earth
# vis kind=w act=x_gh_station kk="WHAT WE ALREADY KNOW" tt="ON THE|*SPACE STATION*" cam=EWS.eye.static trans=push2 tdir=up then="cam=EWS.eye.static@1" time=night
But we already know what too little gravity does to a body,
because astronauts live it every day on the space station.

// S04 SUBJECT: a heart on a lit card beating and slowly shrinking, −0.74 g a week
# vis kind=w act=x_gh_kelly kk="SCOTT KELLY · 340 DAYS" tt="THE HEART|*SHRANK*" cam=MS.eye.static trans=zoomthru tc=.55,.5 tc2=.24,.45 same=ok then="cam=MS.eye.static@1"
Scott Kelly spent 340 days up there,
and the main pumping chamber of his heart
lost about three quarters of a gram every week,
even though he exercised six days a week.

// S05 SUBJECT: three numbered cards — what you gain, what it takes, what it does to the planet
# vis kind=w act=x_gh_promise then="cam=WS.eye.static@1|cam=WS.eye.static@2" tt="IN THIS|*VIDEO*" cam=WS.eye.static trans=glCrossWarp pause=1.2
So in this video, we will look at what half gravity gives you,
what it quietly takes from your body,
and what it does to the whole planet that almost nobody thinks about.

// S06 SUBJECT: chapter 1 — the number 1 and a bouncing spring
# vis kind=w act=x_gh_chapter v=spring n=1 tt="THE SUPERPOWER|*WEEK*" cam=MS.low.static trans=glFold pause=1
Let's start with the fun part, the first week,
when everything suddenly feels lighter than it should.

// S07 SUBJECT: a man on a bathroom scale, the needle sweeps from 70 to 35, MASS: SAME — gag: the scale prints a -50 % receipt
# vis kind=w act=x_gh_scale kk="WEIGHT IS NOT MASS" tt="HALF THE|*WEIGHT*" cam=WS.eye.static trans=morph tc=.5,.6 tc2=.5,.7 tr1=.15 tr2=.2 then="cam=WS.eye.static@1|cam=WS.eye.static@2"
Your mass stays the same, so you are still made of exactly as much stuff,
but your weight, the pull you feel, drops by half,
and the bathroom scale reads half your number.

// S08 SUBJECT: two jumpers by a tall ruler — 30 cm on Earth, 60 cm at half gravity
# vis kind=w act=x_gh_jump tt="TWICE AS|*HIGH*" cam=MS.low.static trans=push2 tdir=up
The same push from your legs would launch you twice as high,
because jump height depends on gravity,
so a thirty-centimetre hop becomes a sixty-centimetre one.

// S09 SUBJECT: a loaded shopping trolley rolls into a man who braces — the bump, the take, the sweat
# vis kind=w act=x_gh_trolley tt="SAME|*BUMP*" cam=WS.high.static trans=glDirectionalWarp then="cam=WS.high.static@1"
That does not make things easier to stop, though,
because their mass has not changed,
so a rolling shopping trolley hits you just as hard as before.

// S10 SUBJECT: an astronaut bounding across the grey Moon, the Earth on the horizon
# vis kind=w act=x_gh_moon kk="APOLLO · THE MOON" tt="THE KANGAROO|*HOP*" cam=WS.eye.static trans=zoomthru tc=.5,.5 tc2=.42,.6 then="cam=WS.eye.static@1" time=night
Walking changes too, because Apollo astronauts on the Moon, at one sixth of Earth's gravity,
gave up on normal steps and loped, skipped and hopped like kangaroos instead.

// S11 SUBJECT: walking versus running — the switch comes at about 7 km/h on Earth and 5 km/h at half gravity
# vis kind=w act=x_gh_treadmill kk="KRAM ET AL. · 1997" tt="WALK →|*RUN*" cam=MS.eye.static trans=wipe
Lab studies with people in harnesses found that in weaker gravity,
we switch from walking to running at slower speeds,
so at half gravity you would break into a run
at about seven tenths of today's pace.

// S12 SUBJECT: a rocket lifting off at dawn — 7.9 KM/S crossed out, 5.6 KM/S lit
# vis kind=w act=x_gh_rocket kk="THE SPEED TO STAY IN ORBIT" tt="SPACE GETS|*CHEAPER*" cam=WS.low.static trans=push2 tdir=up
Even rockets get a break,
because the speed you need to stay in orbit
would fall from about 7.9 to about 5.6 kilometres a second,
which makes space far cheaper to reach.

// S13 SUBJECT: a woman on a sunny stage relaxing, then thinking, worried
# vis kind=w act=x_gh_holiday kk="THE FIRST WEEK" tt="A HOLIDAY FOR|YOUR *LEGS*" cam=WS.top.static trans=glCrossZoom then="cam=WS.top.static@1"
So for a week, half gravity feels like a holiday for your legs.
But your body is not on holiday,
and it starts reading the change as a message.

// S14 SUBJECT: chapter 2 — the number 2 and a bone
# vis kind=w act=x_gh_chapter v=stairs n=2 tt="THE HIDDEN|*WORKOUT*" cam=MS.low.static trans=glFold pause=1 same=ok
Because gravity is not just a pull, it is the workout you never notice,
every step, every stair, every time you stand up.

// S15 SUBJECT: a cut-away bone under a gold load arrow; the arrow halves and the inner lattice thins
# vis kind=w act=x_gh_xray kk="BONE IS ALIVE" tt="LESS LOAD,|LESS *BONE*" cam=WS.eye.static trans=slide then="cam=WS.eye.static@1"
Bones are living tissue that rebuilds itself to match the load it carries,
so when the load drops,
the body starts taking apart bone it no longer seems to need.

// S16 SUBJECT: the number 1.5 % a month, big, beside a bone
# vis kind=w act=x_gh_months kk="NASA · LONG MISSIONS" tt="EVERY|*MONTH*" cam=MS.eye.static trans=match tc=.5,.5 tc2=.74,.46
On long space missions, astronauts have lost
about one to one and a half percent of their bone density every month,
mostly in the hips, legs and spine.

// S17 SUBJECT: a grid of 17 people, 9 of them highlighted — not recovered a year later
# vis kind=w act=x_gh_landing kk="17 ASTRONAUTS · 2022 STUDY" tt="A YEAR|*LATER*" cam=EWS.eye.static trans=glCrossWarp then="cam=EWS.eye.static@1" time=dusk
And it does not simply grow back,
because in a study of seventeen space station astronauts,
nine still had not recovered their shin bone density a full year after landing.

// S18 SUBJECT: a man holding a dumbbell labelled GRAVITY; it grows wings and floats away — gag: he slumps, deadpan
# vis kind=w act=x_gh_muscle kk="MUSCLE FOLLOWS THE LOAD" tt="THE WORKOUT|*LEAVES*" cam=MS.low.static trans=push2 tdir=up then="cam=MS.low.static@2"
Muscles follow the same rule,
and space agencies report losses of up to twenty percent of muscle mass,
on flights as short as five to eleven days.

// S19 SUBJECT: a heart pumping blood up to the head while the pull arrow halves; a spine stretching beside a ruler
# vis kind=w act=x_gh_body kk="THE HEART AND THE SPINE" tt="SMALLER *AND*|TALLER" cam=MS.eye.static trans=morph tc=.5,.5 tc2=.14,.62 tr1=.1 tr2=.2 then="cam=MS.eye.static@2"
The heart shrinks for a simple reason,
because it no longer has to pump blood uphill against the pull,
and the spine stretches out, so astronauts come home a few centimetres taller for a while.

// S20 SUBJECT: the gravity dial from 0 to 1 with the whole space between marked as untested
# vis kind=w act=x_gh_road kk="THE HONEST CATCH" tt="NEVER|*TESTED*" cam=WS.top.static trans=glDirectionalWarp
Here is the honest catch,
because all of those numbers come from near zero gravity, not half,
and no human has ever lived for months anywhere between zero and Earth's gravity.

// S21 SUBJECT: a centrifuge on the space station with four cages, 0, 1/3, 2/3 and 1 g, a mouse in each
# vis kind=w act=x_gh_centrifuge kk="JAXA · THE SPACE STATION" tt="MICE IN A|*CENTRIFUGE*" cam=MS.top.static trans=zoomthru tc=.5,.4 tc2=.5,.47 then="cam=MS.top.static@2"
The closest test so far used mice,
when Japan's space agency spun them in a centrifuge on the space station,
for about a month, at four different levels of gravity.

// S22 SUBJECT: two mice — 2/3 g flexing, strong; 1/3 g slumped, weaker
# vis kind=w act=x_gh_mousegym kk="THE RESULT · 2026" tt="TWO THIRDS|*HELD*" cam=WS.eye.static trans=wipe then="cam=WS.eye.static@1|cam=WS.eye.static@2"
At two thirds of Earth's gravity, their muscles stayed strong,
while at one third, the loss slowed down,
but their muscles still got weaker.

// S23 SUBJECT: the dial with marks at 1/3 and 2/3, the needle settling on ½, a big question mark
# vis kind=w act=x_gh_guess kk="HALF GRAVITY" tt="RIGHT IN THE|*MIDDLE*" cam=MS.low.static trans=glInkBleed
Half gravity sits right between those two results,
so here we have to guess, and the honest guess
is a slower loss than astronauts suffer, but probably not zero.

// S24 SUBJECT: people in a street looking up at the sky one by one
# vis kind=w act=x_gh_lookup kk="THE BIGGER CHANGE" tt="ALL *AROUND*|YOU" cam=WS.low.static trans=push2 tdir=down
So your body would adjust, slowly and quietly, to carrying less.
But the biggest change would not happen inside you,
it would happen all around you.

// S25 SUBJECT: chapter 3 — the number 3 and a balloon
# vis kind=w act=x_gh_chapter v=balloon n=3 tt="THE THIN|*AIR*" cam=MS.low.static trans=glFold pause=1
Because gravity also holds the air down,
and that air has weight of its own.

// S26 SUBJECT: a woman under a tall column of stacked air blocks; the blocks lighten and the pressure dial drops from 1 to ½
# vis kind=w act=x_gh_airstack kk="AIR PRESSURE = THE WEIGHT OF AIR" tt="THE WEIGHT|OF *AIR*" cam=WS.high.static trans=morph tc=.5,.36 tc2=.5,.45 tr1=.1 tr2=.2
The pressure you feel at sea level
is simply the weight of all the air stacked above you,
so if that air weighed half as much,
the pressure at the ground would drop to about half.

// S27 SUBJECT: a snowy mountain with a dashed line at 5,500 m, a climber resting by a tent on the line
# vis kind=w act=x_gh_climb kk="TODAY, AIR THAT THIN IS UP HERE" tt="LIKE LIVING AT|*5,500 M*" cam=EWS.low.static trans=glDirectionalWarp then="cam=EWS.low.static@2"
Today you only find air that thin about five and a half kilometres up,
higher than any town on Earth,
where most people feel short of breath,
and climbers stop for days to let their bodies adjust.

// S28 SUBJECT: the air column stretched twice as tall and paler, a pair of lungs at the bottom taking a smaller breath
# vis kind=w act=x_gh_breath kk="THE AIR PUFFS UP" tt="HALF THE|*OXYGEN*" cam=MS.eye.static trans=dissolve then="cam=MS.eye.static@1"
The air would not disappear, it would puff up and stretch higher into the sky,
but every breath at the bottom would carry only about half as much oxygen as today.

// S29 SUBJECT: a kettle boiling at 81 °C beside a mug — gag: the teabag stares at the viewer, deadpan
# vis kind=w act=x_gh_tea kk="HALF AN ATMOSPHERE" tt="BOILS AT|*81 °C*" cam=MCU.eye.static trans=match tc=.6,.6 tc2=.42,.55 then="cam=MCU.eye.static@2"
Even your kitchen would notice,
because at half an atmosphere water boils at about eighty-one degrees,
so pasta takes longer and the tea never gets properly hot.

// S30 SUBJECT: a high mountain village under snowy peaks, people adapting
# vis kind=w act=x_gh_village kk="THE ANDES · THE HIMALAYA" tt="PEOPLE|*ADAPT*" cam=WS.high.static trans=glBokehDissolve
Lungs would cope over time, the way people adapt in the high Andes and the Himalaya,
but the whole planet would feel like a mountain top,
and that is still not the biggest change.

// S31 SUBJECT: chapter 4 — the number 4 and the Sun
# vis kind=w act=x_gh_chapter v=sun n=4 tt="THE SUN|*LETS GO*" cam=MS.low.static trans=glFold pause=1
Because half gravity everywhere
also means half the pull between the Earth and the Sun.

// S32 SUBJECT: the Sun at the centre, the Earth circling on a gold string, 30 KM/S
# vis kind=w act=x_gh_orbit kk="EARTH'S ORBIT" tt="A BALL ON A|*STRING*" cam=EWS.top.static trans=zoom tc=.5,.5 time=night
Right now Earth races around the Sun at about thirty kilometres a second,
and the Sun's pull bends that straight line into a circle,
like a ball swung on a string.

// S33 SUBJECT: three steps — orbit 30 km/s, escape today 42 km/s, escape at half pull 30 km/s
# vis kind=w act=x_gh_gauge kk="THE ESCAPE SPEED" tt="30 =|*30*" cam=MS.eye.static trans=morph tc=.6,.4 tc2=.5,.5 tr1=.1 tr2=.2 then="cam=MS.eye.static@2" time=night
Today Earth would need about forty-two kilometres a second to escape the Sun,
but with half the pull, the escape speed drops to about thirty,
which is exactly how fast it is already going.

// S34 SUBJECT: the string frays and snaps, the Earth drifts off along a dashed path and waves goodbye
# vis kind=w act=x_gh_snap kk="RIGHT ON THE EDGE" tt="THE STRING|*SNAPS*" cam=CU.eye.static trans=glSwirl then="cam=CU.eye.static@1" time=night
So Earth would sit right on the edge,
and depending on the day it happened, it would either drift away from the Sun forever,
or swing out on a huge, cold loop.

// S35 SUBJECT: a glowing star with planets drifting outward, the Moon drifting from the Earth
# vis kind=w act=x_gh_star kk="DYING STARS · OUR MOON" tt="THE SAME|*RULE*" cam=WS.eye.static trans=slide then="cam=WS.eye.static@2" time=night
Astronomers describe the same thing for dying stars,
because if a star lost half its mass in an instant, its planets would fly off,
and our Moon would be in the same position around the Earth.

// S36 SUBJECT: a coast where a tiny pale Sun shrinks in the sky and the sea ices over, two people in the cold look up
# vis kind=w act=x_gh_freeze kk="IF EARTH ESCAPED" tt="THE DANGER IS|IN THE *SKY*" cam=WS.low.static trans=dissolve pause=1 time=dusk
If Earth escaped, the Sun would shrink in the sky year by year,
and the oceans would slowly freeze over,
which is why the real danger of half gravity is not in your bones,
it is in the sky.

// S37 SUBJECT: a numbered recap of three ideas — a spring, a bone, the Sun
# vis kind=w act=x_gh_promise then="cam=MS.high.static@1|cam=MS.high.static@2" l="TWICE THE JUMP|THE BODY SHRINKS|THE ORBIT CHANGES" tt="SO, WHAT|*HAPPENS?*" kk="THE RECAP" cam=MS.high.static trans=wipe pause=1 same=ok
So, what would happen if gravity were only half as strong?
You would jump twice as high and feel light for a while,
your bones, muscles and heart would slowly shrink to match,
and the air, and even Earth's path around the Sun, would change.

// S38 SUBJECT: a chain of three — a beach umbrella (HOLIDAY), a bone (SLOW BILL), the Earth (REAL PROBLEM)
# vis kind=w act=x_gh_answer kk="THE ANSWER" tt="IN ONE|*SENTENCE*" cam=MS.eye.static trans=glCircleOpen tout=0 then="cam=MS.eye.static@1|cam=MS.eye.static@2"
In one sentence, half gravity would be a holiday for your legs,
a slow bill for your body,
and a real problem for the whole planet.

// S39 SUBJECT: the closing thought said out loud — a spring, a bone and the Earth merge into one word, HEAVY IS GOOD; then the next question
# vis kind=w act=x_gh_outro next="WHAT IF YOU COULD|SEE IN THE *DARK?*" cam=WS.eye.static trans=glCrossZoom tail=2.4 then="cam=WS.eye.static@3" time=night
So the next time getting out of bed feels heavy,
remember that this weight keeps your bones strong,
your air thick and your planet close to the Sun.
Next time on The If Machine: what if you could see in the dark?
