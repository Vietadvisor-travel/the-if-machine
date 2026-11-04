title: What If an AI Ran a Country?   (AI điều hành quốc gia)
channel: ifm
format: vertical
run: 1
next: What if money disappeared?
voice: am_puck
people: facet
sources: Wikipedia, "Robodebt scheme" (2016 start, scrapped 2020, about 470,000 debts repaid); Federal Court of Australia, Prygodicz v Commonwealth; e-Estonia AI strategy factsheet; The Best AI, "AI in Government and Society" ch. 44. The country in the film is fictional and generic.

// VERTICAL 60–90 s: its own hook, 1 setup, 3 escalations, the twist, the ticket, a last line that loops back to the first
// 0:00 HOOK
# vis kind=ifm act=lever q="WHAT IF|AN AI WAS|PRESIDENT?" clock=off
An AI just took over a country.

// 0:04 SUBJECT: the queue vanishes
# vis kind=w act=x_arc_queue trans=whip clock="DAY 1" dir="0-2 pan .04,0; @1 text pop 'IT FIXED THE QUEUE' .5,.32 yellow" then="cam=orbit@1"
Day one, it didn't give a speech.
It fixed the queue.
By day three, nobody is standing in line.

// 0:10 SUBJECT: the tax form fills itself
# vis kind=w act=x_arc_taxform trans=slices clock="DAY 3" dir="0-2.5 zoom 1.08 .5,.5; @1 fx zblur" then="cam=truckL@1"
Your tax form fills itself in.
You tap yes. Done.

// 0:16 SUBJECT: the budget, no bribes
# vis kind=w act=x_arc_budget trans=stripes2 clock="DAY 90" dir="0-2 zoom 1.2 .5,.5; @1 fx flash; @2 text highlight 'NO BRIBES' .5,.12 teal" then="cam=crane@1|cam=pull@2"
Day ninety. It moves the budget like water.
A bridge waits a year.
Nobody can bribe it.

// 0:24 SUBJECT: rejected, no reason
# vis kind=w act=x_arc_reject trans=ripple clock="DAY 150" dir="@1 fx shake .5; @3 text sign 'WHO DO I CALL?' .5,.1 coral" then="cam=pull@1|cam=dutch@2|cam=truckR@3"
Then a letter arrives.
Your benefit application: rejected.
It doesn't say why.
You tap appeal. Who reads it?

// 0:35 SUBJECT: it already happened — Australia, 2016
# vis kind=w act=x_arc_letters label="AUSTRALIA, 2016" then="cam=dutch@1|act=x_arc_verdict@2" trans=shatter clock="DAY 150" dir="@0 text type 'REAL CASE' .5,.8 yellow; @2 fx shake .5"
This already happened.
An automated system in Australia sent out welfare debt notices.
It was found unlawful and scrapped.

// 0:44 SUBJECT: 470,000 debts repaid
# vis kind=w act=count n=120 hl=120 icon=coin value=470,000 label="debts to be repaid" trans=pixel clock="DAY 150" dir="0-2 zoom 1.2 .5,.3; @0+1.5 fx flash"
About four hundred and seventy thousand debts had to be paid back.

// 0:50 SUBJECT: the signs outside the building
# vis kind=w act=x_arc_protest trans=blobs clock="DAY 200" dir="0-2 pan .03,0; @2 fx vignette" then="cam=float@1"
So the signs outside don't say "stop the robot."
They ask: who decides the appeal?

// 0:57 the guess
# vis kind=w act=guess a="It takes over" b="No one to appeal to" answer=b trans=tunnel clock="DAY 300" then="cam=tilt@1"
Biggest problem after one year?
Pick one before the machine prints.

// [silence 0.6 s]
# vis kind=ifm act=answer text="It wins on boring. It loses on appeals." stamp="ASK A HUMAN" trans=ticket clock="DAY 365" drop=.6
It doesn't win by being smarter. It wins by being boringly consistent.
Its first crisis is one person asking who to appeal to.

// 1:12 loop back
# vis kind=w act=x_arc_sign trans=bloom clock=off dir="0-2 zoom 1.25 .5,.55; @2 fx flash" then="cam=push@1"
So on the big calls, a human still signs.
And on day one? It still fixes the queue.
