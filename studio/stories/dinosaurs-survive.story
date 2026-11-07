title: What If Dinosaurs Never Went Extinct?   (Nếu khủng long còn sống)
channel: ifm
format: vertical
run: 2
next: What if Earth stopped spinning?
voice: af_heart
cast: QUOTE=af_nicole LEGEND=am_santa
people: facet
theme: museum
chapters: 4
score: curious_mystery_bazaar@1 tension_darkling@12 wonder_lightless_dawn@18 warm_autumn_day@24
sources: jobs/research/dinosaurs-survive.md — F1 first dinosaurs ~230M years ago, ruled ~165M years · F2 Chicxulub impact ~66.04M years ago, Yucatan, Mexico · F3 asteroid ~10-15 km, crater ~200 km · F4 ~75% of species extinct, sunlight blocked · F5 birds are the only surviving dinosaur lineage · F6 Archaeopteryx, Germany 1861 · F7 Liaoning feathered fossils: Sinosauropteryx, Microraptor, Anchiornis · F8 mammals nocturnal, rat/shrew-sized, insects and seeds · F9 bear-sized mammals within ~10M years, early primates soon after · F10 humans ~300,000 years, ~500x shorter

// TRIAL (owner, 7 Nov 2026): Muse makes the episode end to end on its own machine; Claude reviews before the owner judges.
// Director's script: jobs/scripts/dinosaurs-survive.md (S01–S32). One beat per shot, VO verbatim, one smooth camera move per shot.

// S01 SUBJECT: the cold open — a comet, a dinosaur, an egg, one punch per line, then all of it dissolves into gold dust
# vis kind=w act=ex_cold w="ONE|*ROCK.*;TEN KILOMETRES|*WIDE.*;SIXTY-SIX MILLION|YEARS *AGO.*;*NO HUMANS.*" items="comet|dino|egg" end="THE ROCK THAT MADE US" cam=MS.eye.static hook=1 pause=.8
One rock.
Ten kilometres wide.
Sixty-six million years ago.
… No humans.

// S02 SUBJECT: the question over a green Earth in space, a comet streaking past
# vis kind=w act=ex_show place=space e=comet kick="THE IF MACHINE · A THOUGHT EXPERIMENT" head="WHAT IF THE DINOSAURS|HAD *NEVER DIED OUT?*" cam=WS.eye.push trans=zoomthru tc=.5,.45 tc2=.5,.5 then="cam=EWS.low.pull@1"
What if the dinosaurs had never died out?
They ruled the Earth for about 165 million years,
from the Triassic to the end of the Cretaceous.

// S03 SUBJECT: two bars — a long green bar for the dinosaurs, a tiny gold bar for humans
# vis kind=w act=ex_compare place=museum e="dino|person" l="165 MILLION YEARS|300,000 YEARS" sign="500×" cam=MS.eye.pull trans=push2 then="cam=EWS.top.pull@1"
Humans, by contrast, have been here for about 300,000 years,
which is roughly 500 times shorter than the time the dinosaurs ruled.

// S04 SUBJECT: two fact cards — a bird that is still a dinosaur, a shrew that hid 100 million years
# vis kind=w act=x_dino_facts kick="WHAT HISTORY SAYS" head="TWO *SURPRISES*" cam=MS.eye.trackL trans=wipe then="cam=WS.eye.push@1"
Here are two surprises to start with.
Birds are dinosaurs, still alive today,
and the mammals that became us spent about 100 million years hiding in the shadows,
no bigger than rats.

// S05 SUBJECT: a dinosaur skeleton in a museum hall, a comet and an egg orbiting it
# vis kind=w act=ex_show place=museum e=dino around="comet|egg|bone" kick="IN THIS VIDEO" head="THE *QUESTION*" cam=WS.high.crane trans=slide then="cam=EWS.low.push@1|cam=WS.eye.push@2"
So in this video we will look at how long the dinosaurs really ruled,
what the asteroid did, why mammals stayed small for so long,
and what a world without that rock would actually look like.

// S06 SUBJECT: chapter 1 — the number 1 and a dinosaur silhouette
# vis kind=w act=ex_chapter n=1 title="THE RULERS" obj=dino cam=MS.low.static trans=fade pause=1
To see what would be different,
it helps to start with who was in charge, and for how long.

// S07 SUBJECT: a timeline — an egg, a small dinosaur, a big dinosaur, 230M, 165M, 66M years ago
# vis kind=w act=ex_timeline place=museum e="egg|dino|bone" l="FIRST DINOSAURS|THE LONG RULE|THE END" d="230M YEARS AGO|165 MILLION YEARS|66M YEARS AGO" cam=WS.eye.trackR trans=match tc=.5,.5 tc2=.5,.5 then="cam=MS.high.push@1|cam=EWS.low.pull@2"
The first dinosaurs appeared about 230 million years ago, in the Triassic period,
and they went on to rule the land for about 165 million years,
from the Triassic to the end of the Cretaceous.

// S08 SUBJECT: the number 500, big, with a tiny calendar of one year beside it
# vis kind=w act=ex_stat v=500 unit="times longer than us" e="dino" place=museum kick="THE COMPARISON" head="FIVE *CENTURIES*" cam=MS.eye.tilt trans=zoom tc=.5,.4 then="cam=EWS.high.push@1"
Five hundred times longer.
If the whole of human history were a single year, the dinosaurs ruled for five centuries.

// S09 SUBJECT: a comet streaking down over the Yucatan coast, a dinosaur below looking up
# vis kind=w act=x_dino_impact kick="66 MILLION YEARS AGO" head="THE ROCK *FALLS*" cam=EWS.high.orbit trans=zoomthru tc=.5,.6 tc2=.5,.5 then="cam=EWS.low.push@1|cam=WS.low.crane@2"
Then, about 66 million years ago,
an asteroid about 10 to 15 kilometres wide hit near Chicxulub,
on the Yucatan Peninsula in Mexico, at the boundary between the Cretaceous and the Palaeogene.

// S10 SUBJECT: a map of the Yucatan with a great circle marking the crater, 200 kilometres across
# vis kind=w act=map view=flat pins="-89,21,CHICXULUB" words="~200 KM WIDE@0" cam=WS.top.pull trans=match tc=.5,.5 tc2=.5,.5 then="cam=WS.top.push@1"
The impact made a crater about 200 kilometres wide,
and it threw up dust, soot and sulfur that blocked the sunlight.

// S11 SUBJECT: the sun dimming behind dust, a wilting plant, a dinosaur silhouette fading into the dark
# vis kind=w act=x_dino_dark cam=WS.eye.drop trans=dissolve then="cam=MS.high.static@1|cam=EWS.low.push@2"
With the sunlight gone, photosynthesis collapsed,
and the food chain fell apart from the bottom up,
until about 75 percent of all species on Earth were gone, including every non-avian dinosaur.

// S12 SUBJECT: chapter 2 — the number 2 and a small mouse in the dark
# vis kind=w act=ex_chapter n=2 title="THE SHADOWS" obj=mouse cam=MS.low.static trans=fade pause=1 then="cam=EWS.low.push@1"
So the top of the food chain was suddenly empty.
But the animals that took it over had spent a very long time waiting in the shadows.

// S13 SUBJECT: a burrow at night — a shrew with big eyes, insects, seeds, a dinosaur foot passing overhead
# vis kind=w act=x_dino_burrow cam=MS.eye.trackR trans=wipe then="cam=WS.eye.push@1"
Before the impact, most mammals were nocturnal, many no bigger than rats or shrews,
living on insects and seeds and whatever the giant reptiles left behind.

// S14 SUBJECT: a split picture — above, a dinosaur in the sun; below, a shrew in the moonlit burrow
# vis kind=w act=x_dino_daynight cam=WS.eye.static trans=slide then="cam=MS.top.push@1|cam=EWS.low.pull@2"
For about 100 million years, that was the deal.
The dinosaurs owned the day, and the mammals owned the night,
in burrows, out of sight, waiting for a change that never came.

// S15 SUBJECT: a comet streaking past a green Earth, missing it by a hair, the sky staying blue
# vis kind=w act=x_dino_miss head="WHAT IF IT *MISSED?*" cam=WS.eye.push trans=zoomthru tc=.5,.5 tc2=.5,.5 then="cam=EWS.high.pull@1|cam=EWS.low.push@2"
Now imagine the asteroid misses.
The rock flies past, the sky stays clear, and nothing changes.
The dinosaurs keep ruling, and the mammals keep waiting.

// S16 SUBJECT: a montage — a forest grows and falls, a river changes course, a desert spreads, the same small shrew in each
# vis kind=w act=x_dino_ages cam=WS.eye.static trans=dissolve then="cam=WS.high.push@1|cam=WS.low.pull@2"
A million years pass, then ten, then fifty.
The continents drift, the climate shifts,
but the mammals are still rat-sized, still nocturnal, still waiting in the shadows after 100 million years.

// S17 SUBJECT: a shrew in its burrow beside a wall calendar that reads 100,000,000 YEARS, tapping its foot, bored
# vis kind=w act=x_dino_wait kick="100 MILLION YEARS" head="STILL *WAITING*" cam=MS.eye.push trans=push2 then="cam=EWS.low.push@1|cam=WS.eye.push@2"
The world keeps turning without us in it.
Forests grow and fall, rivers change course,
and in the dark, generation after generation of small mammals is born, lives, and dies, still waiting.

// S18 SUBJECT: chapter 3 — the number 3 and a bird in flight
# vis kind=w act=ex_chapter n=3 title="THE SURVIVORS" obj=bird cam=MS.low.static trans=fade pause=1
But the dinosaurs never really left.
One branch of the family survived the impact, and you have almost certainly seen one today.

// S19 SUBJECT: a family tree — a small theropod at the root, feathers in the middle, a modern bird at the top
# vis kind=w act=ex_flow place=museum e="dino|egg|bird" l="THEROPODS|FEATHERS|BIRDS" cam=WS.eye.pull trans=morph tc=.5,.5 tc2=.5,.5 tr1=.1 tr2=.2 then="cam=MS.high.push@1|cam=EWS.low.pull@2"
Birds are the only surviving dinosaur lineage.
They evolved from small feathered theropod dinosaurs,
and modern birds sit inside the dinosaur family tree, not just beside it.

// S20 SUBJECT: a fossil slab — Archaeopteryx with feathers, hollow bones and a wishbone, each labelled
# vis kind=w act=x_dino_archae kick="1861 · GERMANY" head="*ARCHAEOPTERYX*" cam=MS.eye.tilt trans=zoom tc=.5,.4 then="cam=WS.eye.push@1|cam=EWS.low.push@2"
The first clue came in 1861,
when Archaeopteryx was found in Germany,
a fossil with feathers, hollow bones and a wishbone, linking birds and small theropods.

// S21 SUBJECT: a dig site in layered rock — a brush uncovering feather shapes in the stone
# vis kind=w act=x_dino_liaoning head="*LIAONING* · CHINA" cam=WS.high.trackL trans=slide then="cam=WS.eye.push@1"
Then, from the 1990s, feathered dinosaur fossils
from Liaoning Province in China filled in the picture.

// S22 SUBJECT: a list of three names, each with a small feathered dinosaur beside it
# vis kind=w act=ex_list place=library e="dino|bird|egg" l="Sinosauropteryx|Microraptor|Anchiornis" cam=MS.eye.pull trans=wipe then="cam=EWS.top.push@1|cam=WS.eye.push@2"
Three of them have names worth knowing:
Sinosauropteryx, Microraptor and Anchiornis,
all feathered, all from the same rocks in Liaoning.

// S23 SUBJECT: a chicken in a farmyard, wearing a tiny gold crown, strutting like a tyrant
# vis kind=w act=x_dino_chicken kick="THE FARMYARD" head="STILL A *DINOSAUR*" cam=MS.eye.crane trans=iris tc=.5,.6 then="cam=EWS.high.push@1|cam=WS.eye.push@2"
So the chicken in the farmyard is a dinosaur, no joke.
It walks on two legs, it has scales on its feet,
and it descends from the small feathered theropods that outlived the asteroid.

// S24 SUBJECT: chapter 4 — the number 4 and a speech balloon
# vis kind=w act=ex_chapter n=4 title="WHAT PEOPLE SAY" obj=bubble cam=MS.low.static trans=fade pause=1
Now for what people say, and for what is actually known.

// S25 SUBJECT: a person walking a tiny dinosaur on a leash, like a dog, in a park
# vis kind=w act=x_dino_pet cam=WS.eye.trackR trans=push2 then="cam=MS.low.push@1|cam=EWS.low.pull@2"
A popular belief is that humans and dinosaurs would simply live side by side,
the way we live with elephants and crocodiles today,
maybe even keeping a small one as a pet.

// S26 SUBJECT: a great long-necked dinosaur at a bus stop, holding a tiny ticket, while the bus waits and the driver stares
# vis kind=w act=x_dino_bus kick="THE CITY" head="TOO BIG FOR|THE *BUS*" cam=WS.eye.push trans=zoomthru tc=.5,.5 tc2=.5,.45 then="cam=MS.top.static@1|cam=EWS.low.push@2"
But a city built for us would be a strange place for a dinosaur.
The buses are too small, the doors are too low,
and a long-necked neighbour would block the whole road.

// S27 SUBJECT: the number 10, big, with a bear beside it and a small primate in a tree
# vis kind=w act=ex_stat place=forest v=10 unit="million years, to bear size" e="bear" kick="WHAT IS ACTUALLY KNOWN" head="BEAR-SIZED IN|10 MILLION *YEARS*" cam=MS.eye.pull trans=match tc=.5,.5 tc2=.5,.5 then="cam=WS.eye.push@1|cam=EWS.low.push@2"
And here is what is actually known.
Within about 10 million years of the extinction, some mammals had already reached the size of modern bears,
and early primates appeared soon after the impact.

// S28 SUBJECT: an empty throne on a hill, the top of the food chain, with small mammals looking up at it from below
# vis kind=w act=x_dino_empty head="THE TOP WAS *EMPTY*" cam=WS.low.tilt trans=dissolve then="cam=EWS.high.static@1|cam=WS.eye.push@2"
That growth only happened because the top of the food chain was empty.
Without the asteroid, the dinosaurs would still own the day,
and the mammals would still be waiting in the dark.

// S29 SUBJECT: a great door opening with light behind it, small mammals walking in and growing taller as they cross the light
# vis kind=w act=x_dino_room kick="THE ASTEROID CLEARED THE ROOM" head="THE MAMMALS|WALKED *IN*" cam=WS.eye.crane trans=wipe then="cam=MS.low.push@1|cam=EWS.low.pull@2"
The asteroid did not just kill the dinosaurs.
It cleared the room, and the mammals walked in, grew tall,
and eventually stood up and started asking questions about the sky.

// S30 SUBJECT: a numbered recap of three ideas — a comet, a mouse, a bird
# vis kind=w act=ex_list place=classroom n=1 e="comet|mouse|bird" l="The asteroid cleared the top|The mammals grew into it|The birds never left" kick="THE RECAP" title="SO, WHAT|*HAPPENS?*" cam=MS.eye.pull trans=slide pause=1 then="cam=EWS.low.pull@1|cam=MS.eye.pull@3"
So, what would happen if the dinosaurs had never died out?
The asteroid cleared the top of the food chain.
The mammals grew into that empty space.
And the birds remind us that the dinosaurs never fully left.

// S31 SUBJECT: a great egg in a museum hall, with the words NO ROCK, NO US beside it
# vis kind=w act=x_dino_egg kick="THE ANSWER" head="NO ROCK,|NO *US*" cam=MS.eye.static trans=push2 then="cam=EWS.high.push@1"
In other words, without that rock, there would be no us.
No primates, no humans, no one to ask the question in the first place.

// S32 SUBJECT: the closing thought said out loud — an egg, a bird and a bone become one word, STILL HERE; then the next question
# vis kind=w act=ex_outro items="egg|bird|bone" word="STILL HERE" sub="THE DINOSAURS NEVER LEFT" next="WHAT IF EARTH|STOPPED *SPINNING?*" e=dino tail=2.4 cam=WS.eye.static trans=morph tc=.5,.45 tc2=.5,.44 tr1=.2 tr2=.2
So the next time you see a chicken cross the road,
remember what you are really looking at.
A dinosaur, still here,
still ruling the farmyard.
And next time on The If Machine: what if Earth stopped spinning?
