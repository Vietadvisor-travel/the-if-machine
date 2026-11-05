title: What If Money Disappeared?   (Nếu tiền biến mất)
channel: ifm
format: vertical
run: 1
next: What if the dinosaurs had never died out?
voice: af_heart
cast: QUOTE=af_nicole LEGEND=am_santa
people: facet
theme: banknote
sources: jobs/research/money-disappears.md — F1–F5 history of money (Money.org, Sky HISTORY, Brewminate, Wise) · F6/F13 Inca (Sky HISTORY, Murra, Qullqa) · F7 Finland (Kela trial summaries) · F8 Kenya GiveDirectly · F9 OpenResearch · F11 Radford 1945 (Economica) · F12 Humphrey 1985 (Man) · F14 UK rationing (IWM, Bodleian) · F15 Bank of England QB 2014 Q1

// REMAKE 5 Nov 2026 — neutral explainer (EPISODE.md §00), script jobs/scripts/money-disappears.md (S01–S45)

// 0:00 SUBJECT: the city at night, the question — S01 HOOK
# vis kind=w act=s3 hook=1 set=city time=night cam=EWS.high.orbit on=center words="WHAT IF MONEY@0|DISAPPEARED?@1" then="cam=WS.high.trackL on=street@2"
What if, tonight, every coin,
every banknote,
and every number in every bank account simply disappeared?

// 0:08 SUBJECT: one banknote crumbles to dust — S02 HOOK
# vis kind=w act=x_mv_note title="EVERYTHING FREE?" k=2 cam=WS.eye.push trans=fade dir="0-9 zoom 1.06 .5,.44 ease=io" then="cam=EWS.low.pull@2"
No paper, no coins, no balance on your phone.
Not stolen, just gone.
It sounds like everything would suddenly be free.
History suggests something stranger.

// 0:18 SUBJECT: coins and a chest on a table, two surprising facts — S03 HOOK
# vis kind=w act=s3 set=stage dress=treasure models="pirate/chest@0,0,20,h.6|medieval/sack@-1.1,.4,15,h.45|props/crate_wooden@1.1,.3,-20,h.45" cam=WS.high.orbit on=wide trans=zoom pins="wide:NO PURE BARTER@1|item:REBUILT IN WEEKS@2" then="cam=MS.eye.pull on=wide@1"
Here's a surprising fact.
No society is known to have run on barter alone.
And when people lost their money, they rebuilt it within weeks.

// 0:29 SUBJECT: the money bag in a bank hall, the promise — S04 HOOK
# vis kind=w act=ex_show place=bank e="money bag" around="coin|banknote|credit card" title="THE QUESTION" cam=WS.high.push trans=paper pause=1.2 dir="0-10 zoom 1.08 .5,.46 ease=io" then="cam=EWS.top.pull@2"
So what would really happen?
In this video: what money actually does,
who decides without it, the times it was tried,
and the answer.

// 0:42 SUBJECT: chapter 1, the balance scale — S05 SECTION 1
# vis kind=w act=ex_chapter n=1 title="WHAT MONEY DOES" sub="three jobs" e="balance scale" cam=WS.low.static trans=fade pause=1.2
First, a step back.
What is money actually for?

// 0:48 SUBJECT: a cow and some rice that cannot meet — S06
# vis kind=w act=ex_compare place=farm e="cow|ear of rice" l="A COW|RICE" sign="≠" title="BARTER PROBLEM" cam=WS.low.push trans=slide dir="0-12 zoom 1.07 .5,.46 ease=io" then="cam=EWS.high.pull@2"
Imagine you raise cows, and you want rice.
You'd need to find someone who has rice,
wants a cow, and wants it today.
Then you'd both have to agree how much rice a cow is worth.

// 1:00 SUBJECT: a market stall, have and want — S07
# vis kind=w act=s3 set=stage dress=market models="building/marketstand_1@0,0,15,h1.6|medieval/sack@-1.2,.8,0,h.6|food/loaf@.9,.9,30,h.25|props/crate_wooden@1.6,.4,-10,h.5" cam=MS.eye.trackR on=item trans=match pins="item:HAVE: RICE@0|wide:WANT: A COW?@1" then="cam=WS.high.pull on=item@1"
Economists call this the double coincidence of wants.
In a busy market, it makes the simplest swap surprisingly hard.

// 1:09 SUBJECT: cow → coin → rice, money as the go-between — S08
# vis kind=w act=ex_flow place=market e="ox|coin|sheaf of rice" l="A COW|MONEY|RICE" title="JOB 1: GO-BETWEEN" cam=WS.top.trackL trans=slide dir="0-9 pan .04,0 ease=io" then="cam=EWS.eye.pull@2"
Money solves it.
You sell the cow to anyone,
and buy rice from anyone else.
That's money's first job: a go-between.

// 1:19 SUBJECT: bread and shoes with price tags, a ruler — S09
# vis kind=w act=x_mv_window title="JOB 2: A RULER" k=1 cam=WS.high.push trans=iris dir="0-10 zoom 1.1 .5,.48 ease=io" then="cam=EWS.low.pull@1"
Its second job is a measuring stick.
A price lets you compare a loaf of bread with a pair of shoes,
or an hour of work, in a single number.

// 1:30 SUBJECT: the aisle, price tags falling — S10
# vis kind=w act=x_mv_shelf k=1 cam=WS.eye.push trans=zoomthru words="~PRICE = MESSAGE@1" dir="0-9 zoom 1.12 .5,.4 ease=io" then="cam=EWS.high.push@1"
Its third job is easy to miss.
A price is a message.
When bread runs short, its price goes up.

// 1:38 SUBJECT: bakers and shoppers on the street get the message — S11
# vis kind=w act=s3 set=street time=day do=walk n=14 cam=WS.high.trackR on=street trans=cut pins="block:BAKE MORE@0|street:BUY LESS@1" then="cam=MS.top.orbit on=street@1"
That rise tells bakers to bake more,
and shoppers to buy a little less.
Nobody has to give an order.

// 1:47 SUBJECT: the same city with and without its messages — S12
# vis kind=w act=s3 set=city time=day cam=MS.high.orbit on=center trans=drop pins="center:WITH PRICES@0" then="act=s3 set=city time=night dark=1 cam=WS.high.orbit on=center@2"
A city sends millions of these signals every day,
on every shelf and every menu.
When money disappears, the messages disappear with it.

// 1:58 SUBJECT: the last loaf on a kitchen counter — S13
# vis kind=w act=ex_stat place=kitchen v=1 unit="loaf left" e="bread" gn=12 hi=1 title="THE LAST LOAF" cam=WS.top.push trans=fade then="cam=EWS.eye.pull@1" dir="0-9 zoom 1.06 .5,.45 ease=io"
Without those messages, how does anyone know what is running out?
And what decides who gets the last loaf?

// 2:06 SUBJECT: chapter 2, a ticket — S14 SECTION 2
# vis kind=w act=ex_chapter n=2 title="WHO GETS IT?" sub="two usual answers" e="ticket" cam=WS.eye.static trans=slide pause=1.2
Who gets the last loaf?
There are two usual answers.

// 2:12 SUBJECT: the queue in a waiting room — S15
# vis kind=w act=s3 set=waiting time=day screen="NOW SERVING|043" cam=WS.high.trackL on=queue trans=zoom pins="queue:PAY WITH TIME@0" pip="ex_show e=hourglass with flowing sand l=TIME" pipPos=mr pipAt=1 then="cam=MS.eye.push on=screen@2"
When something is free and everyone wants it,
the first answer is usually the queue.
You pay with time instead of money.

// 2:22 SUBJECT: people with and without spare time at the stop — S16
# vis kind=w act=s3 set=street time=dusk do=walk n=18 on=street cam=WS.high.push trans=cut pins="street:SPARE TIME@0|block:NO TIME@1" then="cam=WS.high.orbit on=street@1"
Queues favour people with spare hours.
Someone with a shift to get to, or children to collect, loses out.
Free things often end up cheapest for the people with the most time.

// 2:35 SUBJECT: a ration book, coupons cut out — S17
# vis kind=w act=x_mv_ration k=0 s=2 cam=WS.top.push trans=paper dir="0-14 zoom 1.06 .5,.45 ease=io" then="cam=EWS.eye.pull@2"
The second answer is rationing:
a card that says how much each household may take.
Britain did this from 1940 until 1954.
Every person had a book of coupons, and the shopkeeper cut them out.

// 2:51 SUBJECT: the planner at a desk who writes the card — S18
# vis kind=w act=s3 set=office time=day cam=MCU.ots.push on=screen trans=slide pins="screen:WHO DECIDES?@1" then="cam=WS.low.push on=screen@1"
Rationing is fairer to people without spare time.
But someone has to decide what goes on the card.

// 2:59 SUBJECT: the job moves: queue, card, who writes it — S19
# vis kind=w act=ex_list place=office e="hourglass|ticket|clipboard" l="The queue|The card|Whoever writes the card" title="THE JOB MOVES" cam=WS.high.push trans=zoom dir="0-11 zoom 1.06 .5,.45 ease=io" then="cam=EWS.eye.push@2"
So money's job doesn't vanish. It moves:
to the queue, to the card,
and to whoever writes the card.
Has anyone actually lived this way?

// 3:12 SUBJECT: chapter 3, a classical building — S20 SECTION 3
# vis kind=w act=ex_chapter n=3 title="IT HAS BEEN TRIED" sub="more than once" e="classical building" cam=WS.low.static trans=fade pause=1.2
It has been tried, more than once.

// 3:17 SUBJECT: the Andes, llamas on the road — S21
# vis kind=w act=x_mv_andes title="THE INCA EMPIRE" k=1 cam=EWS.high.push trans=liquid dir="0-11 zoom 1.1 .5,.5 ease=io" then="cam=EWS.top.pull@1"
The Inca Empire stretched along the Andes mountains:
a huge state with roads, farms and armies,
but no coins and no markets as we know them.

// 3:28 SUBJECT: a village storehouse, work and harvest — S22
# vis kind=w act=s3 set=stage dress=village models="building/mill@0,-.6,-20,h2|building/stable@2,.2,25,h1.4|medieval/sack@-1,1,0,h.6|building/cart@-2,.4,40,h.9" floor=#B9C98A back=#E8D9B5 cam=WS.low.crane on=wide trans=fade pins="wide:MIT'A: WORK@0|item:STOREHOUSE@1" then="cam=MS.high.push on=wide@1"
LEGEND: Families owed the state their work, in turns called mit'a.
LEGEND: The harvest went into stone storehouses along the roads,
LEGEND: and was handed out as needed.

// 3:41 SUBJECT: a khipu, knotted cords — S23
# vis kind=w act=x_mv_khipu k=1 cam=WS.eye.tilt trans=fold dir="0-9 zoom 1.08 .5,.4 ease=io" then="cam=EWS.high.push@1"
Records were kept on knotted cords called khipu.
Knots, not coins, tracked who owed what.

// 3:49 SUBJECT: the cycle the state ran — S24
# vis kind=w act=ex_flow place=village e="hammer and pick|ear of corn|house|family" l="YOUR WORK|THE HARVEST|THE STORE|YOUR SHARE" title="THE STATE DECIDES" cam=WS.eye.trackR trans=cut dir="0-11 pan .04,0 ease=io" then="cam=EWS.top.pull@1"
It worked, for a long time and at a huge scale.
But nothing was free.
The state decided what you made, and what you received.

// 4:00 SUBJECT: a prisoner-of-war camp at dusk — S25
# vis kind=w act=x_mv_camp k=1 cam=WS.eye.push trans=ink dir="0-9 zoom 1.08 .5,.6 ease=io" then="cam=EWS.low.pull@1"
A sharper case comes from the Second World War.
In prisoner-of-war camps, nobody had money at all.

// 4:08 SUBJECT: an open parcel crate: food, chocolate, cigarettes — S26
# vis kind=w act=s3 set=stage dress=treasure models="props/crate_wooden@0,-.3,10,h.6|food/carton@-.8,.6,20,h.35|food/bag@.8,.6,-15,h.4|food/loaf@.1,.9,40,h.25" floor=#A08868 back=#6A5848 cam=WS.high.drop on=wide trans=zoom pins="item:RED CROSS PARCEL@0|wide:CIGARETTES@1" then="cam=MS.eye.pull on=wide@1"
Red Cross parcels arrived with food, chocolate and cigarettes.
And people began to trade.

// 4:16 SUBJECT: the camp price board, prices in cigarettes — S27
# vis kind=w act=x_mv_board k=2 cam=WS.dutch.pan trans=slide dir="0-10 zoom 1.07 .5,.42 ease=io" then="cam=EWS.eye.pull@1"
Within weeks, cigarettes had become money.
Prices were quoted in cigarettes,
and they rose and fell with the supply.

// 4:26 SUBJECT: Radford's words — S28
# vis kind=w act=ex_quote place=library q="rose from the status of|a normal commodity|to that of currency" by="R. A. Radford, 1945" cam=WS.low.push trans=fade dir="0-11 zoom 1.06 .5,.45 ease=io" then="cam=EWS.high.pull@1"
One prisoner, an economist named Radford, wrote it down.
QUOTE: Cigarettes rose from the status of a normal commodity to that of currency.

// 4:38 SUBJECT: coins piling up again — S29
# vis kind=w act=s3 set=stage dress=market models="medieval/building_market_red@0,-.5,10,h1.8|building/marketstand_1@1.8,.6,-30,h1.4|medieval/sack@-1.3,.8,0,h.5|building/cart@-2,-.2,30,h.9" cam=MS.low.orbit on=wide trans=zoom pins="wide:TRADE RETURNS@1" then="cam=WS.eye.pull on=wide@1"
Take money away from people, and they invent it again,
often within weeks.
History shows it over and over, with very different things.

// 4:49 SUBJECT: money through time: cattle, cowries, coins, paper (montage) — S30
# vis kind=w act=ex_timeline place=library e="cow|spiral shell|coin|banknote" l="CATTLE|COWRIES|COINS|PAPER" d="9000 BC|1200 BC|630 BC|800s AD" title="IT KEEPS COMING BACK" cam=WS.eye.trackR trans=liquid then="cam=EWS.top.pull@2"
Cattle, around nine thousand years before Christ.
Cowrie shells, in China.
The first coins, in Lydia, around 630 BCE.
Paper money, in China, in the 800s.

// 5:03 SUBJECT: chapter 4, speech balloons — S31 SECTION 4
# vis kind=w act=ex_chapter n=4 title="WHAT PEOPLE SAY" sub="and what is known" e="speech balloon" cam=WS.high.static trans=fade pause=1.2
Now, what people say,
and what is actually known.

// 5:09 SUBJECT: a square full of people: the barter belief — S32
# vis kind=w act=s3 set=street time=day do=talk n=24 cam=WS.high.crane on=street trans=zoom pins="street:BELIEF: BARTER@0" then="cam=MS.low.push on=street@1"
A popular belief is that, without money, we'd simply go back to barter,
swapping goods directly, like a giant market.

// 5:18 SUBJECT: Humphrey's words — S33
# vis kind=w act=ex_quote place=library q="No example of a|barter economy, pure and simple,|has ever been described." by="Caroline Humphrey, 1985" cam=WS.low.push trans=paper dir="0-10 zoom 1.06 .5,.45 ease=io" then="cam=EWS.eye.push@1"
But the anthropologist Caroline Humphrey wrote:
QUOTE: No example of a barter economy, pure and simple, has ever been described.

// 5:28 SUBJECT: a package and a coin side by side — S34
# vis kind=w act=ex_compare place=market e="package|coin" l="BARTER|MONEY" sign="+" title="ALONGSIDE, NOT INSTEAD" cam=WS.top.push trans=slide dir="0-8 zoom 1.07 .5,.46 ease=io" then="cam=EWS.eye.pull@1"
Barter does happen, mostly where money is scarce.
But it lives alongside money, never instead of it.

// 5:36 SUBJECT: an office of workers: the work belief — S35
# vis kind=w act=s3 set=office time=day cam=WS.eye.trackL on=room trans=cut pins="room:BELIEF: NOBODY WORKS@0" then="cam=MS.low.push on=room@1"
Another belief: if everything were free, nobody would bother to work.
Here, the honest answer is more careful than either side likes.

// 5:45 SUBJECT: 2,000 people in Finland's trial — S36
# vis kind=w act=ex_stat place=office v=2000 unit="unemployed people, 560 € a month" e="bust in silhouette" gn=40 title="FINLAND, 2017–2018" cam=WS.high.push trans=cube dir="0-12 zoom 1.06 .5,.45 ease=io" then="cam=EWS.eye.push@1"
The closest tests gave people money, rather than removing it.
In Finland, two thousand unemployed people
got 560 euros a month for two years.

// 5:57 SUBJECT: map pins on Finland and Kenya — S37
# vis kind=w act=map view=flat pins="26,64,FINLAND;37.9,0.2,KENYA" cam=WS.top.push:.5,.45 trans=slide words="~SAME WORK@0|~LESS STRESS@1|~NO REAL DROP@2" dir="0-13 zoom 1.12 .55,.55 ease=io" then="cam=EWS.eye.pull@1"
Their employment ended up about the same as the comparison group's,
and they reported less stress.
In Kenya, a long study found no real drop in work.

// 6:09 SUBJECT: a whole city at dusk: the case nobody tested — S38
# vis kind=w act=s3 set=city time=dusk cam=EWS.high.push on=center trans=zoom pins="park:US: 1–2 H LESS@0|center:NEVER TESTED@1" then="cam=WS.low.push on=center@1"
In one American study, people worked one to two hours less a week.
So it depends.
And nobody has ever tested a world with no money at all.

// 6:21 SUBJECT: chapter 5, a handshake — S39 SECTION 5
# vis kind=w act=ex_chapter n=5 title="WHAT MONEY REALLY IS" e="handshake" cam=WS.low.static trans=fade pause=1.2
Which leaves one question.
What is money, really?

// 6:27 SUBJECT: the Earth at night, money as numbers — S40
# vis kind=w act=globe view=night lights=1 arcs=40 cam=EWS.low.push trans=zoomthru words="~MOSTLY NUMBERS@1" then="cam=EWS.eye.push@1"
Today, most money isn't paper at all.
In Britain, about ninety-seven percent of it is deposits in banks:
numbers, moving between computers.

// 6:38 SUBJECT: a bank balance on a phone, accepted — S41
# vis kind=w act=x_mv_digits k=1 cam=WS.eye.push trans=iris dir="0-8 zoom 1.08 .5,.42 ease=io" then="cam=EWS.top.pull@1"
Those numbers work for one reason.
Everyone agrees to accept them:
your employer, your shop, your landlord, and you.

// 6:46 SUBJECT: a crowd in a square: a shared promise — S42
# vis kind=w act=s3 set=plaza time=dusk do=cheer n=40 cam=WS.low.crane on=crowd trans=drop pins="crowd:A SHARED PROMISE@1" then="cam=MS.high.push on=crowd@1"
A banknote is paper. An account is a number.
What's real is the trust behind them,
a promise millions of strangers keep.

// 6:56 SUBJECT: the recap, three ideas — S43 CONCLUSION RECAP
# vis kind=w act=ex_list place=classroom n=1 e="busts in silhouette|coin|balance scale" l="Queues and rules decide|People rebuild money fast|The cost just moves" title="SO, WHAT HAPPENS?" cam=WS.high.push trans=slide pause=1.2 dir="0-14 zoom 1.06 .5,.45 ease=io" then="cam=EWS.eye.push@2"
So, what would happen?
Without prices, queues and rules would decide who gets what.
People would rebuild money, fast.
And the cost of things would not vanish. It would just move.

// 7:12 SUBJECT: the answer: not free — S44 CONCLUSION ANSWER
# vis kind=w act=ex_show place=bank e="label" l="NOT FREE" x=1 do=pulse cam=WS.low.push trans=fold dir="0-9 zoom 1.08 .5,.46 ease=io" then="cam=EWS.top.pull@1"
If money disappeared, things wouldn't become free.
They would just lose their price tags.
Someone, or something, would still decide who gets what.

// 7:22 SUBJECT: the same city, now at dawn — S45 CONCLUSION
# vis kind=w act=s3 set=city time=dawn cam=EWS.high.orbit on=center trans=match pins="center:AN AGREEMENT@1" then="cam=WS.low.push on=center@1"
Money was never the coins.
It's an agreement between millions of strangers.
And that is much harder to make disappear.
