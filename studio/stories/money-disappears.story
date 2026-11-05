title: What If Money Disappeared?   (Nếu tiền biến mất)
channel: ifm
format: vertical
run: 1
next: What if the dinosaurs had never died out?
voice: af_heart
cast: QUOTE=af_nicole LEGEND=am_santa
people: facet
theme: banknote
score: curious_easy_lemon@1 tension_deliberate_thought@13 nostalgic_piano@19 warm_gymnopedie_no_1@30
sources: jobs/research/money-disappears.md — F1–F5 history of money (Money.org, Sky HISTORY, Brewminate, Wise) · F6/F13 Inca (Sky HISTORY, Murra, Qullqa) · F7 Finland · F8 Kenya GiveDirectly · F9 OpenResearch · F11 Radford 1945 (Economica) · F12 Humphrey 1985 (Man) · F14 UK rationing (IWM, Bodleian) · F15 Bank of England QB 2014 Q1

// REMAKE v3 (owner, 5 Nov 2026 evening): 2D only, polished, flowing narration, planned transitions — script jobs/scripts/money-disappears.md (S01–S45)

// S01 SUBJECT: the cold open — a coin, a banknote, a bank balance, one punch per line, then all of it dissolves into gold dust
# vis kind=w act=x_px_cold cam=WS.eye.static hook=1 pause=.8
Every coin.
Every banknote.
Every number in every bank account.
… Gone.

// S02 SUBJECT: the question over the city at night, money leaving through the windows
# vis kind=w act=x_px_hook time=night money=1 kick="THE IF MACHINE · A THOUGHT EXPERIMENT" head="WHAT IF MONEY|*DISAPPEARED?*" cam=WS.eye.push trans=zoomthru tc=.5,.45 tc2=.5,.5 then="cam=EWS.low.pull@1"
What if money simply disappeared, overnight, not stolen, just gone?
At first it sounds like a dream, because if nothing has a price, surely everything is free.
But history suggests that something much stranger would happen.

// S03 SUBJECT: two fact cards: a cow with NO PURE BARTER, a cigarette with REBUILT IN WEEKS
# vis kind=w act=x_mv_facts a="cow|NO PURE BARTER|no society ran on swaps alone" b="smoking symbol|REBUILT IN WEEKS|when money was lost" ka=0 kb=1 kick="WHAT HISTORY SAYS" title="TWO *SURPRISES*" cam=WS.eye.pull trans=push2 then="cam=EWS.top.pull@1"
No society is known to have run on barter alone,
and when people have lost their money,
they have usually rebuilt it within a few weeks.

// S04 SUBJECT: a money bag with a coin, a note and a card orbiting
# vis kind=w act=ex_show place=bank e="money bag" around="coin|banknote|ticket" kick="IN THIS VIDEO" title="WHAT WOULD|*REALLY* HAPPEN?" cam=WS.high.push trans=wipe pause=1.2 then="cam=EWS.low.push@1|cam=WS.high.push@3"
So in this video we'll look at what money actually does,
who decides who gets what once it is gone,
the real times it was tried,
and what the answer turns out to be.

// S05 SUBJECT: the number 1 and a balance scale
# vis kind=w act=ex_chapter n=1 title="WHAT MONEY DOES" obj=scale cam=WS.low.static trans=fade pause=1
To see what would go missing,
it helps to start with a simple question: what is money actually for?

// S06 SUBJECT: two traders: an old man with a cow, a farmer with rice, each with a thought bubble wanting something the other
# vis kind=w act=x_px_barter kick="THE DOUBLE COINCIDENCE OF WANTS" head="THE BARTER|*PROBLEM*" k=3 cam=WS.eye.trackR trans=iris tc=.5,.6 then="cam=EWS.high.pull@1|cam=WS.eye.push@3"
Imagine you raise cows and you want rice.
You would need to find someone who has rice,
who happens to want a cow, and who wants it today,
and then the two of you would still have to
agree how much rice a cow is worth.

// S07 SUBJECT: a chain cow → coin → rice
# vis kind=w act=ex_flow place=market e="cow|coin|ear of rice" l="A COW|MONEY|RICE" kick="JOB 1 OF MONEY" title="A *GO-BETWEEN*" cam=WS.top.trackL trans=slide then="cam=EWS.eye.push@1"
Economists call this the double coincidence of wants, and money solves it neatly,
because you can sell the cow to anyone and buy rice from anyone else.
That is money's first job: it is a go-between.

// S08 SUBJECT: a shop window with a loaf and shoes, price tags 2 and 60, a ruler slides under
# vis kind=w act=x_mv_window kick="JOB 2 OF MONEY" title="A MEASURING|*STICK*" k=1 cam=WS.high.push trans=push2 then="cam=EWS.low.pull@1"
Its second job is to be a measuring stick,
since a price lets you compare a loaf of bread with a pair of shoes,
or with an hour of your work, using a single number.

// S09 SUBJECT: a supermarket aisle in deep perspective, price tags falling
# vis kind=w act=x_mv_shelf k=1 kick="JOB 3 OF MONEY" title="A PRICE IS|A *MESSAGE*" cam=WS.eye.static trans=zoomthru tc=.5,.5 tc2=.5,.4 then="cam=EWS.high.push@1"
Its third job is the easiest to miss,
because a price is also a message.
When bread starts to run short, its price goes up,

// S10 SUBJECT: a bread price tag rising 2.00 → 2.60, its message travelling to a baker (BAKE MORE) and a shopper (BUY LESS)
# vis kind=w act=x_px_signal kick="WHEN BREAD RUNS SHORT" head="THE PRICE|*SPEAKS*" kb=0 cam=WS.eye.crane trans=match tc=.5,.42 tc2=.5,.35 then="cam=EWS.top.pull@1"
and that small change tells bakers to bake more and tells shoppers to buy a little less,
without anyone having to give an order.

// S11 SUBJECT: a city at dusk with golden arcs of price signals between towers
# vis kind=w act=x_px_hook time=dusk signals=1 cut=2 kick="EVERY SHELF · EVERY MENU" head="MILLIONS OF|*SIGNALS*" cam=EWS.low.pull trans=zoom then="cam=EWS.high.push@1"
A city sends millions of these signals every day,
on every shelf and every menu, so when money disappears,
the messages quietly disappear with it.

// S12 SUBJECT: 12 loaves in a grid, only one still lit: 1 loaf left
# vis kind=w act=ex_stat place=kitchen v=1 unit="loaf left on the shelf" e="bread" gn=12 hi=1 kick="WITHOUT THE MESSAGES" title="THE LAST|*LOAF*" cam=WS.top.push trans=dissolve then="cam=EWS.high.pull@1"
Which leaves a very practical problem, because without those messages,
nobody knows what is running out,
and nothing decides who gets the last loaf.

// S13 SUBJECT: the number 2 and a ticket
# vis kind=w act=ex_chapter n=2 title="WHO GETS IT?" obj=ticket cam=WS.eye.static trans=fade pause=1
So who does get the last loaf?
In practice there are two usual answers.

// S14 SUBJECT: a FREE shop with a queue that keeps growing, a clock turning
# vis kind=w act=x_px_queue kick="ANSWER 1 · THE QUEUE" head="FREE COSTS|*TIME*" k=2 cam=WS.eye.trackL trans=wipe then="cam=EWS.top.push@1"
The first answer is the queue.
When something is free and everyone wants it, people line up for it,
and you end up paying with your time instead of your money.

// S15 SUBJECT: an hourglass against a briefcase, the hourglass wins
# vis kind=w act=ex_compare place=street e="alarm clock|man briefcase" l="SPARE TIME|A SHIFT TO GET TO" sign=">" win=0@2 kick="WHO WINS THE QUEUE?" title="TIME BEATS|*BUSY*" cam=WS.eye.push trans=push2 then="cam=EWS.low.pull@1|cam=WS.eye.push@3"
That sounds fair until you notice who wins,
because queues favour people with spare hours,
while anyone with a shift to get to or children to collect loses out.
Free things often end up cheapest for the people with the most time.

// S16 SUBJECT: a ration book, coupons cut out one by one, a 1940–1954 stamp
# vis kind=w act=x_mv_ration k=0 s=2 kick="ANSWER 2 · RATIONING" title="BRITAIN|*1940–1954*" cam=WS.top.drop trans=slide then="cam=EWS.high.push@1|cam=WS.top.push@3"
The second answer is rationing,
a card that says how much each household may take.
Britain did exactly this from 1940 until 1954,
when every person had a book of coupons and the shopkeeper cut them out.

// S17 SUBJECT: a planner's clipboard: RATIONS · WEEK 1 written line by line, stamp WHO DECIDES?
# vis kind=w act=x_mv_planner kick="BUT SOMEONE WRITES IT" title="WHO|*DECIDES?*" k=1 cam=WS.high.push trans=match tc=.5,.45 tc2=.5,.46 then="cam=EWS.top.pull@1"
Rationing is fairer to people without spare time,
but it creates a new question,
because someone has to decide what goes on the card.

// S18 SUBJECT: a list: the queue, the card, whoever writes the card
# vis kind=w act=ex_list place=office e="alarm clock|ticket|bust in silhouette" l="The queue|The ration card|Whoever writes the card" kick="SO WITHOUT MONEY" title="THE JOB|*MOVES*" cam=WS.high.tilt trans=iris tc=.56,.6 then="cam=EWS.low.push@1|cam=WS.high.push@3"
So money's job does not vanish when money does.
It moves to the queue, to the card,
and to whoever writes the card.
Has anyone actually lived like this?

// S19 SUBJECT: number 3 and a classical building
# vis kind=w act=ex_chapter n=3 title="IT HAS BEEN TRIED" obj="classical building" cam=WS.low.static trans=fade pause=1
It turns out that it has been tried, and more than once.

// S20 SUBJECT: the Andes as a paper-cut diorama, terraces, llamas on the road
# vis kind=w act=x_mv_andes kick="SOUTH AMERICA · 1400s–1500s" title="THE INCA|*EMPIRE*" k=1 cam=EWS.high.push trans=wipe then="cam=EWS.eye.pull@1"
The Inca Empire stretched along the Andes mountains, a huge state with roads,
farms and armies,
yet it had no coins and no markets as we know them.

// S21 SUBJECT: rows of round stone storehouses (qullqa) on a slope, a llama caravan carrying the harvest in
# vis kind=w act=x_mv_qullqa kick="WORK, NOT COINS" title="THE STATE'S|*STOREHOUSES*" k=1 cam=WS.low.crane trans=push2 tdir=up then="cam=EWS.top.push@1"
LEGEND: Instead, families owed the state their work, in turns called mit'a.
LEGEND: The harvest went into stone storehouses along the roads,
LEGEND: and it was handed out again as it was needed.

// S22 SUBJECT: a khipu, coloured cords with knots
# vis kind=w act=x_mv_khipu kick="RECORDS IN STRING" title="KNOTS,|*NOT COINS*" k=1 cam=WS.eye.tilt trans=zoom tc=.5,.4 then="cam=EWS.low.pull@1"
The records were kept on knotted cords called khipu, so it was knots,
not coins, that tracked who owed what.

// S23 SUBJECT: a cycle: your work → the harvest → the store → your share
# vis kind=w act=ex_flow place=village e="hammer and pick|ear of rice|house|family" l="YOUR WORK|THE HARVEST|THE STORE|YOUR SHARE" kick="IT WORKED, BUT" title="THE STATE|*DECIDED*" cam=WS.eye.trackR trans=slide then="cam=EWS.high.push@1"
It worked for a long time and on a huge scale,
but nothing about it was free,
because the state decided what you made and what you received.

// S24 SUBJECT: a camp at dusk: barracks, fence, a jar and cigarettes swapping on a crate
# vis kind=w act=x_mv_camp k=1 kick="SECOND WORLD WAR" title="PRISON|*CAMPS*" cam=WS.eye.push trans=dissolve then="cam=EWS.top.pull@1"
A sharper case comes from the Second World War,
where in prisoner-of-war camps nobody had any money at all.

// S25 SUBJECT: a parcel opening, food, chocolate, soap and cigarettes rising out
# vis kind=w act=x_px_parcel kick="RED CROSS PARCELS · 1940s" head="WHAT CAME IN|THE *PARCEL*" cam=WS.high.drop trans=zoomthru tc=.5,.66 tc2=.5,.6 then="cam=EWS.low.push@1"
Red Cross parcels arrived with food, chocolate, soap and cigarettes,
and very quickly people began to trade them.

// S26 SUBJECT: the camp notice board EXCHANGE & MART: jam, bread, soap priced in cigarettes
# vis kind=w act=x_mv_board k=1 kick="WITHIN WEEKS" title="CIGARETTES|BECAME *MONEY*" cam=WS.dutch.pan trans=match tc=.75,.42 tc2=.8,.3 then="cam=EWS.high.pull@1"
Within weeks, cigarettes had become money.
Prices were quoted in cigarettes, and they rose and fell with the supply,
just like prices outside.

// S27 SUBJECT: the quotation typed on a card
# vis kind=w act=ex_quote q="Cigarettes rose from the status of a normal commodity to that of currency." by="R. A. Radford, 1945" kick="A PRISONER WROTE IT DOWN" cam=WS.low.push trans=paper then="cam=EWS.top.push@1"
One of the prisoners, an economist named Radford, wrote it down.
QUOTE: Cigarettes rose from the status of a normal commodity to that of currency.

// S28 SUBJECT: things that became money orbiting (cattle, shells, cigarettes, rice, notes) and fusing into one coin
# vis kind=w act=x_px_reborn kick="9000 BC → TODAY" head="MONEY KEEPS|*COMING BACK*" k=1 cam=WS.eye.push trans=morph tc=.16,.3 tc2=.5,.47 tr1=.09 tr2=.17 then="cam=EWS.low.pull@1"
Take money away from people and they invent it again, often within weeks,
and history shows this over and over with very different things.

// S29 SUBJECT: a timeline of money: cow, shell, coin, banknote, a montage of money through time
# vis kind=w act=ex_timeline place=library e="cow|spiral shell|coin|banknote" l="CATTLE|COWRIES|COINS|PAPER" d="9000 BC|1200 BC|630 BC|800s AD" kick="A SHORT HISTORY" title="MONEY THROUGH|*TIME*" cam=WS.eye.trackR trans=slide then="cam=EWS.high.push@1|cam=WS.eye.push@3"
Cattle served as money around nine thousand years before Christ,
then cowrie shells in China,
then the first coins in Lydia around 630 BCE,
and paper money in China in the 800s.

// S30 SUBJECT: number 4 and a speech balloon
# vis kind=w act=ex_chapter n=4 title="WHAT PEOPLE SAY" obj=bubble cam=WS.high.static trans=fade pause=1
Now for what people say, and for what is actually known.

// S31 SUBJECT: a big speech bubble with goods swapping in a ring: cow, rice, chicken, shoes, labelled A POPULAR BELIEF
# vis kind=w act=x_mv_belief v=barter kick="A POPULAR BELIEF" title="BACK TO|*BARTER?*" cam=WS.eye.push trans=iris tc=.5,.6 then="cam=EWS.top.pull@1"
A popular belief is that without money we would simply go back to barter,
swapping goods directly as if the whole world were one giant market.

// S32 SUBJECT: the quotation typed on a card
# vis kind=w act=ex_quote q="No example of a barter economy, pure and simple, has ever been described." by="Caroline Humphrey, 1985" kick="WHAT IS ACTUALLY KNOWN" cam=WS.low.push trans=wipe then="cam=EWS.high.push@1"
But the anthropologist Caroline Humphrey put it bluntly.
QUOTE: No example of a barter economy, pure and simple, has ever been described.

// S33 SUBJECT: a package and a coin side by side with a plus sign
# vis kind=w act=ex_compare place=market e="package|coin" l="BARTER|MONEY" sign="+" kick="WHERE MONEY IS SCARCE" title="ALONGSIDE,|*NOT INSTEAD*" cam=WS.top.push trans=push2 then="cam=EWS.high.pull@1"
Barter does happen, mostly where money is scarce,
but it lives alongside money rather than instead of it.

// S34 SUBJECT: a speech bubble with three workers asleep (Z z z), labelled A POPULAR BELIEF: NOBODY WORKS
# vis kind=w act=x_mv_belief v=work kick="ANOTHER BELIEF" title="NOBODY|*WORKS?*" cam=WS.eye.pull trans=slide then="cam=EWS.top.push@1"
Another belief is that if everything were free, nobody would bother to work,
and here the honest answer is more careful than either side likes.

// S35 SUBJECT: the number 2,000 as a grid of people
# vis kind=w act=x_px_stat kick="FINLAND · 2017–2018" head="FREE MONEY,|*SAME WORK*" v=2000 unit="unemployed people, 560 € a month" n=100 cam=WS.high.push trans=zoom tc=.5,.45 then="cam=EWS.low.pull@1"
The closest tests gave people money rather than taking it away.
In Finland,
two thousand unemployed people received 560 euros a month for two years,

// S36 SUBJECT: a map with pins on Finland and Kenya
# vis kind=w act=map view=flat pins="26,64,FINLAND;37.9,0.2,KENYA" cam=WS.top.push:.5,.45 trans=slide words="~SAME WORK@0|~LESS STRESS@0|~NO REAL DROP@1" dir="0-12 zoom 1.12 .55,.55 ease=io" then="cam=EWS.high.push@1"
and their employment ended up about the same as the comparison group's,
while they reported less stress.
In Kenya, a long-running study found no real drop in work,

// S37 SUBJECT: a whole city at dusk, tag NEVER TESTED
# vis kind=w act=x_px_hook time=dusk tag="NEVER TESTED@1" kick="ONE US STUDY · 1–2 HOURS LESS A WEEK" head="A WHOLE WORLD|*WITHOUT MONEY?*" cam=EWS.eye.push trans=dissolve then="cam=EWS.top.pull@1"
while in one American study people worked one to two hours less a week.
So the answer depends,
and nobody has ever tested a world with no money at all.

// S38 SUBJECT: number 5 and a handshake
# vis kind=w act=ex_chapter n=5 title="WHAT MONEY REALLY IS" obj=hands cam=WS.low.static trans=fade pause=1
Which leaves one last question: what is money, really?

// S39 SUBJECT: the Earth at night with arcs of light
# vis kind=w act=globe view=night lights=1 arcs=40 cam=EWS.low.push trans=zoomthru tc=.5,.6 tc2=.5,.5 words="~MOSTLY NUMBERS@1" then="cam=EWS.high.push@1"
Today most money is not paper at all.
In Britain, about ninety-seven percent of it is deposits in banks,
which means numbers moving between computers,

// S40 SUBJECT: a phone with a bank balance, digits rolling, a payment, a tick ACCEPTED
# vis kind=w act=x_mv_digits k=1 kick="ABOUT 97% OF UK MONEY" title="JUST|*NUMBERS*" cam=WS.eye.push trans=match tc=.5,.5 tc2=.5,.4 then="cam=EWS.high.pull@1"
and those numbers work for one reason only: everyone agrees to accept them,
your employer, your shop, your landlord, and you.

// S41 SUBJECT: a ring of people around a banknote, a thread of light joining them
# vis kind=w act=x_px_promise kick="WHAT MONEY REALLY IS" head="A SHARED|*PROMISE*" k=1 cam=WS.eye.pull trans=morph tc=.5,.59 tc2=.5,.47 tr1=.08 tr2=.2 then="cam=EWS.top.push@1"
A banknote is paper and an account is a number,
so what is real is the trust behind them,
a promise that millions of strangers keep every day.

// S42 SUBJECT: a numbered recap of three ideas
# vis kind=w act=ex_list place=classroom n=1 e="alarm clock|coin|balance scale" l="Queues and rules decide|People rebuild money fast|The cost just moves" kick="THE RECAP" title="SO, WHAT|*HAPPENS?*" cam=WS.high.push trans=slide pause=1 then="cam=EWS.low.pull@1|cam=WS.high.push@3"
So, what would happen if money disappeared?
Without prices, queues and rules would decide who gets what.
People would rebuild money, and fast.
And the cost of things would not vanish, it would simply move.

// S43 SUBJECT: a price tag crossed out: NOT FREE
# vis kind=w act=ex_show place=bank e="label" l="NOT FREE" x=1 do=pulse kick="THE ANSWER" title="NOT FREE,|JUST *UNPRICED*" cam=WS.eye.static trans=push2 then="cam=EWS.high.push@1"
In other words, things would not become free,
they would just lose their price tags,
and someone or something would still decide who gets what.

// S44 SUBJECT: the same city as the opening, now at dawn, windows lit, no money leaving
# vis kind=w act=x_px_hook time=dawn back=1 tag="AN AGREEMENT@1" kick="THE CITY WAKES UP" head="MONEY IS|AN *AGREEMENT*" cam=EWS.high.push trans=dissolve then="cam=EWS.top.pull@1"
Money was never really the coins.
It is an agreement between millions of strangers,
and that is much harder to make disappear.

// S45 SUBJECT: the closing thought said out loud — a note, a card and a coin become one word, A PROMISE; then the next question
# vis kind=w act=x_px_outro kick="ONE LAST THOUGHT" cam=WS.eye.static trans=morph tc=.5,.45 tc2=.5,.44 tr1=.2 tr2=.2 tail=2.4
So the next time you tap a card or hand over a note,
remember what you are really holding.
Not paper. Not numbers. … A promise.
And next time on The If Machine: what if the dinosaurs had never died out?
