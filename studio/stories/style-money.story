title: What If Money Disappeared? (style frames)   (Nếu tiền biến mất — ảnh mẫu phong cách)
channel: ifm
format: vertical
run: 0
next: What if the dinosaurs had never died out?
voice: af_heart
cast: QUOTE=af_nicole LEGEND=am_santa
people: facet
theme: banknote
sources: style test only (facts from jobs/research/money-disappears.md F2–F13)

// STYLE FRAMES ONLY (owner, 5 Nov 2026): the new objective explainer look on the money topic — not the episode.

// HOOK · 3D city at night, the question
# vis kind=w act=s3 hook=1 set=city time=night cam=EWS.high.orbit on=center words="WHAT IF MONEY@0|DISAPPEARED?@1" then="cam=WS.low.pull on=tower@1" pause=1.2
What if every coin, every banknote and every number in every bank account disappeared tonight?
Not stolen. Just gone.

// HOOK · the thing itself
# vis kind=w act=x_mv_note title="EVERYTHING IS FREE?" k=1 cam=WS.eye.push
It sounds like everything would be free.
History says something stranger would happen.

// SECTION 1 card
# vis kind=w act=ex_chapter n=1 title="WHAT MONEY DOES" sub="it's not the paper" e="balance scale" pause=1.2
So first, what does money actually do?

// barter's problem
# vis kind=w act=ex_compare e="cow|ear of rice" l="A COW|SOME RICE" sign="≠" title="THE BARTER PROBLEM" bg=sand win=1@1
To swap a cow for rice, you need someone with rice who wants a cow. Today.
Economists call it the double coincidence of wants.

// prices are messages: the aisle, the tags fall
# vis kind=w act=x_mv_shelf k=1 cam=WS.eye.push
A price is a message.
When it disappears, shops lose the one signal that says what's running short.

// the queue: 3D waiting room + a 2D inset
# vis kind=w act=s3 set=waiting time=day screen="NOW SERVING|042" cam=WS.high.trackL on=queue pins="queue:WITHOUT PRICES@0" pip="ex_show e=hourglass with flowing sand l=TIME" pipPos=mr pipAt=1 then="cam=MS.eye.push on=screen@2"
Take prices away, and something else decides who gets what.
Usually, it's the queue.
You pay with time instead.

// before / after: the same city with and without its messages
# vis kind=w act=split a="s3 set=city time=day cam=WS.high.orbit on=center" b="s3 set=city time=night dark=1 cam=WS.high.orbit on=center" la="WITH PRICES" lb="WITHOUT" at=1.5
A city sends millions of these signals every day.
Remove them, and nobody hears about shortages in time.

// SECTION 2 card
# vis kind=w act=ex_chapter n=2 title="IT HAS BEEN TRIED" sub="two real cases" e="classical building" bg=dusk pause=1.2
Has anyone actually lived without money?

// the Inca on a tilted map
# vis kind=w act=x_mv_andes title="THE INCA EMPIRE" k=1 cam=WS.eye.push
The Inca Empire ran along the Andes
with no coins and no markets as we know them.

// how it worked, told like a legend
# vis kind=w act=ex_flow e="hammer and pick|ear of maize|house building|family" l="WORK (MIT'A)|HARVEST|STOREHOUSES|FAMILIES" title="WORK, NOT COINS" bg=sand look=vintage
LEGEND: Families owed the empire their work, a turn called mit'a.
LEGEND: The harvest went into stone storehouses,
LEGEND: and was handed back when it was needed.

// WWII prison camps: the trade at dusk
# vis kind=w act=x_mv_camp k=1 cam=WS.eye.push
In prisoner-of-war camps in the Second World War, nobody had money.
Within weeks, cigarettes had become it. Prices were quoted in cigarettes.

// the quotation (second voice)
# vis kind=w act=ex_quote q="No example of a|barter economy,|pure and simple,|has ever been described." by="Caroline Humphrey, 1985" bg=paper
QUOTE: No example of a barter economy, pure and simple, has ever been described.

// the money timeline
# vis kind=w act=ex_timeline e="cow|spiral shell|coin|banknote with yen sign" l="CATTLE|COWRIES|COINS|PAPER" d="9000 BC|1200 BC|630 BC|800s AD" title="IT KEEPS COMING BACK" bg=sand
Cattle.
Cowrie shells.
The first coins.
Paper money.

// SECTION 3 card
# vis kind=w act=ex_chapter n=3 title="WHAT MONEY REALLY IS" e="handshake" pause=1.2
So what is money, really?

// money today: the globe
# vis kind=w act=globe view=night lights=1 arcs=40 cam=WS.eye.push words="~MOSTLY NUMBERS@1"
Today, most money isn't paper at all.
It's numbers, moving between computers.

// everyone agrees: 3D crowd + label
# vis kind=w act=s3 set=plaza time=dusk do=cheer n=40 cam=WS.low.crane on=crowd pins="crowd:EVERYONE AGREES@0"
It works for one reason:
everyone agrees to accept it.

// what we know: the trials
# vis kind=w act=ex_stat v=2000 unit="people in Finland's basic income trial" e="bust in silhouette" gn=40 title="FREE MONEY ≠ NO MONEY" bg=mint
Free money has been tested.
In Finland, two thousand people got 560 euros a month for two years.

// CONCLUSION · recap
# vis kind=w act=ex_list n=1 e="busts in silhouette|ticket|smoking symbol" l="Without prices, queues and rules decide|People rebuild money fast|Money is trust, not paper" title="SO, WHAT WOULD HAPPEN?" bg=blush
Without prices, queues and rules decide who gets what.
People rebuild money within weeks.
Because money was never the paper.

// CONCLUSION · the answer
# vis kind=w act=ex_show e="handshake" do=pulse title="MONEY = TRUST" l="A PROMISE WE ALL KEEP" bg=blush
It's a promise millions of strangers agree to keep.
