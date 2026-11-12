title: What If You Could Breathe Underwater?   (Thở được dưới nước)
channel: ifm
format: vertical
run: 6
next: What if there was never any night?
voice: af_heart
cast: QUOTE=af_nicole LEGEND=am_santa
people: facet
theme: ocean
chapters: 4
score: aquarium@1 curious_easy_lemon@4 the_lagoon@11 curious_hidden_agenda@18 curious_aftermath@25 wonder_almost_bliss@30
sources: jobs/research/breathe-underwater.md — F1 static apnea on air 11:35 (Mifsud 2009) · F2 29:03 with pure oxygen first (Maričić 2025) · F3 dive reflex, heart to 10–15 bpm · F4 blood to brain and heart, spleen reserve · F5 the urge to breathe is a CO2 alarm · F6 hyperventilation, blood 97–99 % saturated, shallow water blackout the leading cause of breath-hold deaths · F7 133 m on one breath (Molchanov 2024) · F8 lung packing · F9 untrained 30–90 s, ~3 min with grit · F10 blackout near the surface on the way up · F11 water holds ~30× less oxygen, 30× more to pump · F12 water ~800× denser · F13 Kylstra 1961 Leiden: CO2, not oxygen, limited the mice · F14 liquid ventilation in premature infants from 1989, still experimental · F15 Bajau spleens ~50 % larger, genetic (Cell 2018)

// Director's script: jobs/scripts/breathe-underwater.md (S01–S33). Every beat is an animated scene with its own in-scene camera (IFM.CT.rig).

// S01 SUBJECT: a reef at noon; a swimmer stops above it, opens her mouth and takes a breath of water
# vis kind=w act=x_bu_hook kk="THE IF MACHINE" tt="WHAT IF YOU COULD|*BREATHE UNDERWATER?*" tout=5.5 cam=WS.low.static hook=1 then="cam=MCU.eye.push@1"
What if you could *breathe* underwater,
and simply open your mouth in the sea and take a slow, deep breath of *water*?

// S02 SUBJECT: 1961: a mouse in a sealed jar of water, oxygen streams in, a coral cloud of carbon dioxide gathers
# vis kind=w act=x_bu_lab kk="A REAL EXPERIMENT" tt="A MOUSE THAT|BREATHED *WATER*" cam=MS.eye.push trans=glWaterDrop then="cam=CU.eye.static@2"
It sounds like pure fantasy, but in *1961* a scientist in the Netherlands
watched a mouse breathe *liquid*,
and the thing that finally stopped it was *not* a lack of oxygen.

// S03 SUBJECT: three portholes in a hull under water light up: a stopwatch, a heart, a pair of gills
# vis kind=w act=x_bu_ports kk="IN THIS VIDEO" tt="THREE *QUESTIONS*" cam=WS.eye.trackR trans=wipe pause=1.2 then="cam=MS.eye.push@1|cam=MS.eye.push@2"
So in this video, we will see how far people already go on *one* breath,
what your body *secretly* does underwater,
and why gills *alone* would not save you.

// S04 SUBJECT: chapter 1 — a giant stopwatch sinks through blue water
# vis kind=w act=x_bu_chapter v=watch n=1 tt="ONE|*BREATH*" cam=MS.low.drop trans=glFold pause=1.6
Let's start with the simplest version of the question,
which is how long a human can last on a *single* breath.

// S05 SUBJECT: four people at the pool edge hold their breath; the pool clock runs; they burst out one by one, the last at three minutes
# vis kind=w act=x_bu_clock v=avg kk="AN ORDINARY ADULT" tt="HOW LONG|CAN *YOU* LAST?" cam=WS.eye.static trans=push2 then="cam=MCU.eye.push@2"
If you are an ordinary untrained adult, you can probably hold your breath
for about *thirty* to ninety seconds,
and with real determination, maybe *three* minutes before your body overrules you.

// S06 SUBJECT: a diver floats face down in a night pool; a gold bar runs past 3:00 to 11:35
# vis kind=w act=x_bu_clock v=air same=ok kk="THE RECORD ON AIR" tt="11:35 ON|*PLAIN AIR*" cam=WS.high.crane trans=slide then="cam=CU.eye.push@1"
Now look at the record on plain air,
because in 2009 the French freediver Stéphane Mifsud
stayed under for *eleven* minutes and thirty-five seconds.

// S07 SUBJECT: a second track: an oxygen tank, a teal bar to 29:03, a dashed line keeps the two records apart
# vis kind=w act=x_bu_clock v=oxy same=ok kk="WITH A TRICK" tt="29:03 · *OXYGEN FIRST*" cam=MS.eye.static trans=match tc=.5,.5 tc2=.5,.5 then="cam=WS.eye.pull@2"
And there is an even bigger number, *twenty-nine* minutes and three seconds,
set in 2025 by Vitomir Maričić,
but that one comes with a trick, because he breathed pure *oxygen* first,
which is why it is kept as a *separate* kind of record.

// S08 SUBJECT: two lungs at FULL take gulp after gulp, straps strain like an overpacked suitcase
# vis kind=w act=x_bu_pack kk="AN ELITE TRICK" tt="LUNG|*PACKING*" cam=CU.eye.push trans=zoomthru tc=.5,.45 tc2=.5,.45
The best freedivers even squeeze *extra* air into their lungs before a dive,
gulping it in mouthful by mouthful, a trick called *lung packing*.

// S09 SUBJECT: a diver kicks down a rope past a ghost forty-storey tower; the depth counter runs to 133 M
# vis kind=w act=x_bu_deep kk="DOWN, NOT JUST STILL" tt="133|*METRES*" cam=EWS.eye.drop trans=push2 tdir=up then="cam=MS.high.static@2"
Divers also go *down*, not just stay still,
and in 2024 Alexey Molchanov swam to *133* metres on one breath,
which is about as deep as a *forty-storey* tower is tall.

// S10 SUBJECT: two people at dusk with identical see-through lungs: 0:30 and 11:35, a glowing question mark between them
# vis kind=w act=x_bu_gap kk="THE SAME LUNGS" tt="SO WHAT'S|THE *DIFFERENCE?*" cam=MS.eye.push trans=morph tc=.5,.5 tc2=.5,.45 tr1=.2 tr2=.2
So the same human lungs can last thirty seconds or *eleven* minutes,
and the difference is hiding inside the *body* itself.

// S11 SUBJECT: chapter 2 — a face dips into a bowl of icy water; the heart beside it slows
# vis kind=w act=x_bu_chapter v=face n=2 tt="THE DIVE|*REFLEX*" cam=MS.eye.static trans=glLiquidFill pause=1.6
Because the moment *cold* water touches your face,
your body quietly switches into a *different* mode.

// S12 SUBJECT: a big heart on a monitor slows from 70 to 12, yawns, a sleeping cap drops on; cut wide: a calm diver
# vis kind=w act=x_bu_reflex kk="THE MAMMALIAN DIVE REFLEX" tt="THE HEART|*SLOWS DOWN*" cam=CU.eye.push trans=zoomthru tc=.5,.5 tc2=.5,.45 then="cam=WS.low.static@2"
This is the mammalian dive reflex,
and in elite freedivers it can slow the heart to as few as *ten* to fifteen beats a minute,
which saves oxygen with every beat it *skips*.

// S13 SUBJECT: a see-through body: the vessels in the arms and legs squeeze pale, the flow runs to the brain and the heart
# vis kind=w act=x_bu_body v=blood kk="AT THE SAME TIME" tt="BRAIN AND|HEART *FIRST*" cam=WS.eye.static trans=wipe then="cam=MCU.eye.push@1"
At the same time, the blood vessels in your arms and legs *tighten*,
so the blood is sent where it matters most,
to the *brain* and the heart.

// S14 SUBJECT: close on the spleen under the ribs: two hands wring it like a sponge, red blood cells pour out
# vis kind=w act=x_bu_body v=spleen same=ok kk="A HIDDEN RESERVE" tt="THE *SPLEEN*" cam=CU.eye.push trans=zoom
And your *spleen*, a small organ tucked under your ribs,
squeezes like a sponge and releases a *reserve* of red blood cells full of oxygen.

// S15 SUBJECT: a stilt village over a turquoise sea, a diver glides under the boats; cut: two spleens, one half again bigger
# vis kind=w act=x_bu_bajau kk="THE BAJAU · CELL, 2018" tt="BUILT FOR|*DIVING*" cam=EWS.eye.trackR trans=glInkBleed then="cam=MS.eye.static@2"
There are even people built for this,
because the Bajau sea nomads of Southeast Asia, who dive for a living,
have spleens about *fifty* percent larger than their land-dwelling neighbours,
and the difference is in their *genes*.

// S16 SUBJECT: a man holds his breath in the bathroom: a fire grows in his chest window, an alarm blinks on his head
# vis kind=w act=x_bu_alarm v=bath kk="THE BURNING URGE" tt="IT'S NOT|*OXYGEN*" cam=MCU.eye.push trans=slide
But here is the part almost nobody knows,
which is that the burning urge to breathe is *not* an oxygen alarm at all.

// S17 SUBJECT: inside the head: the brain at its desk; the oxygen gauge has NO SENSOR, the CO2 gauge climbs into the red, the alarm rings
# vis kind=w act=x_bu_alarm v=brain same=ok kk="INSIDE YOUR HEAD" tt="A CO₂|*ALARM*" cam=MS.eye.tilt trans=match tc=.5,.3 tc2=.5,.4 then="cam=CU.eye.push@2"
Your brain *cannot* measure the oxygen in your blood directly,
so it watches *carbon dioxide* instead, the waste gas your body makes,
and when that rises, the alarm goes *off*.

// S18 SUBJECT: chapter 3 — gills pop out on a man's neck and flutter; he grins
# vis kind=w act=x_bu_chapter v=gills n=3 tt="GIVE YOURSELF|*GILLS*" cam=MS.eye.push trans=glRipple pause=1.6
So let's give you *gills*,
and see whether the problem goes away.

// S19 SUBJECT: two glass litre cubes: AIR fills with thirty oxygen dots, WATER holds one lonely dot that shrugs
# vis kind=w act=x_bu_litre kk="ONE LITRE EACH" tt="AIR VS|*WATER*" cam=MS.eye.trackR trans=push2 then="cam=CU.eye.push@1"
The first surprise is that water is a *poor* place to find oxygen,
because a litre of water holds about *thirty* times less oxygen than a litre of air.

// S20 SUBJECT: a man with gills under a torrent; the gills flap like a sweaty fan; ~800× denser, 30× more to pump
# vis kind=w act=x_bu_pump v=fall kk="HEAVY STUFF" tt="BREATHING|*WATER*" cam=WS.eye.tilt trans=morph tc=.5,.5 tc2=.5,.45 tr1=.15 tr2=.2 then="cam=MCU.eye.push@2"
And water is about *eight hundred* times denser than air,
which means your gills would have to pump about *thirty* times more of this heavy stuff
just to keep up.

// S21 SUBJECT: back to 1961: the mouse in the pressure jar, the oxygen bar full, the gauge at HIGH PRESSURE
# vis kind=w act=x_bu_lab v=back kk="BACK TO 1961" tt="OXYGEN WAS|*FINE*" cam=MS.eye.pull trans=glPhotoDevelop
And remember that mouse in the Netherlands,
because it breathed salt water loaded with oxygen under *high* pressure,
so oxygen was *never* the problem.

// S22 SUBJECT: inside the lung: teal oxygen walkers stroll in through IN; coral CO2 walkers jam at OUT
# vis kind=w act=x_bu_door kk="THE REAL PROBLEM" tt="CO₂ GETS|*STUCK*" cam=MS.eye.pan trans=zoomthru tc=.5,.5 tc2=.5,.5 then="cam=CU.eye.push@1"
The real problem was getting *rid* of carbon dioxide fast enough,
because a liquid simply cannot carry that waste gas out of the lungs
as *quickly* as air can.

// S23 SUBJECT: a quiet night ward: an incubator glows, a nurse checks the monitor; an inset lung fills with a clear liquid
# vis kind=w act=x_bu_ward kk="LIQUID BREATHING" tt="IN *HOSPITALS*" cam=WS.eye.dolly trans=dissolve then="cam=MS.eye.push@1"
Doctors later tried a special oxygen-rich liquid
in the lungs of very sick premature babies, starting in *1989*,
and today it is still an *experimental* treatment, not a way to live underwater.

// S24 SUBJECT: the man with gills swims along; a coral CO2 cloud follows him, then turns into a lifebuoy
# vis kind=w act=x_bu_pump v=cloud kk="EVEN WITH PERFECT GILLS" tt="THE REAL|*ENEMY*" cam=WS.eye.trackL trans=wipe then="cam=MS.eye.static@1"
So even with perfect gills, your real enemy underwater would be *carbon dioxide*,
and that same gas turns out to be what keeps divers *alive*.

// S25 SUBJECT: chapter 4 — a red warning buoy bobs on dark water, its lamp blinking
# vis kind=w act=x_bu_chapter v=buoy n=4 tt="THE DEADLY|*TRICK*" cam=MS.low.static trans=glFold pause=1.6
Which brings us to the most *dangerous* mistake a breath-holder can make.

// S26 SUBJECT: a man pants on a boat deck; the oxygen gauge is already at 97–99 % and barely moves
# vis kind=w act=x_bu_gauges v=fast kk="BREATHING FAST FIRST" tt="MORE|*OXYGEN?*" cam=MS.eye.static trans=slide then="cam=CU.eye.push@1"
Some people breathe fast and deep before a dive, thinking they are loading up on oxygen,
but your blood is already about *ninety-seven* to ninety-nine percent full.

// S27 SUBJECT: CO2 drains away, the alarm's plug falls out, oxygen falls with no alarm, the edges of the frame dim
# vis kind=w act=x_bu_gauges v=silent same=ok kk="WHAT IT REALLY DOES" tt="THE ALARM|IS *OFF*" cam=CU.eye.orbit trans=zoom then="cam=MS.eye.pull@2"
What fast breathing really does is *flush out* carbon dioxide,
so the alarm is switched off while your oxygen keeps *falling*,
and that silent drop is called *shallow water blackout*.

// S28 SUBJECT: a diver rises toward the bright surface; pressure falls, oxygen drops in the last metres, the view closes in
# vis kind=w act=x_bu_ascent kk="THE LEADING CAUSE OF DEATH" tt="ON THE|WAY *UP*" cam=WS.low.crane trans=push2 tdir=up then="cam=MCU.eye.static@2"
It is the *leading* cause of death in breath-hold diving,
and it often strikes near the surface on the way *up*,
because as the water pressure falls, the oxygen in your blood suddenly has *less* push.

// S29 SUBJECT: at the surface a buddy catches his arm and lifts his face out of the water: NEVER ALONE
# vis kind=w act=x_bu_buddy kk="THE ONE RULE" tt="A BUDDY|*SAVES LIVES*" cam=MS.eye.static trans=iris tc=.5,.4 then="cam=WS.high.static@1"
That is why freediving safety comes down to one simple rule,
which is never hold your breath in water *alone*.

// S30 SUBJECT: she hugs a giant oxygen tank (BELIEF); a stamp lands, KNOWN: CO₂, and the tank turns into the little alarm
# vis kind=w act=x_bu_belief kk="WHAT PEOPLE SAY" tt="BELIEF VS|*WHAT'S KNOWN*" cam=MCU.eye.push trans=glBrushWipe
Many people believe that breathing underwater is just about getting *more* oxygen,
but you already carry almost all the oxygen you can,
and the alarm that keeps you safe runs on *carbon dioxide*.

// S31 SUBJECT: the three portholes again, labelled with the three ideas: 11:35 on air, the dive reflex, CO2 not oxygen
# vis kind=w act=x_bu_ports v=recap kk="THE RECAP" tt="SO, WHAT|*HAPPENS?*" cam=WS.eye.trackR trans=wipe pause=1 then="cam=MS.eye.push@2|cam=MS.eye.push@3"
So, what would it take to breathe underwater?
Humans already last *eleven* minutes on one breath of plain air.
Your body has a dive reflex, the same trick that *whales* and seals use.
And gills would not fix the real problem, which is *carbon dioxide*.

// S32 SUBJECT: two giant bubbles: O₂ gets a soft cross, CO₂ glows gold and rises to the light
# vis kind=w act=x_bu_answer kk="THE ANSWER" tt="A CARBON DIOXIDE|*PROBLEM*" cam=MCU.eye.push trans=glCircleOpen then="cam=WS.low.static@2"
In one sentence, breathing underwater is not an *oxygen* problem,
it is a *carbon dioxide* problem,
and your body has been telling you that every time you held your breath.

// S33 SUBJECT: a bath at dusk: she dips her face under, comes up smiling and points at the window, where the sun refuses to set: next time
# vis kind=w act=x_bu_outro next="WHAT IF THERE WAS|*NEVER ANY NIGHT?*" cam=MS.eye.static trans=glWaterDrop tail=2.4 then="cam=WS.eye.pull@3"
So next time you hold your breath in the bath, listen to that *burning* feeling,
because it is not panic, it is a very *old* alarm doing its job.
Next time on The If Machine: what if there was *never* any night?
