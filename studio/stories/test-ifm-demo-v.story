title: ENGINE DEMO (not an episode) — What if the internet shut down for a day?
channel: ifm
format: vertical
run: 0
next: What if money disappeared?
voice: supertonic:M1
music: wonder
people: flat
sources: ITU Facts and Figures 2024 (about 5.5 billion people online); UN World Population Prospects 2024 (about 8.1 billion people). Demo only, not for publishing.
// 0:00 HOOK — macro on the lever, the question types on the machine, dive through the screen
# vis kind=ifm act=lever q="WHAT IF|THE INTERNET|SHUT DOWN?" clock=off
What if the internet shut down? Everywhere. For one whole day.
// 0:04 SCAN into the globe, network arcs alive; at line 2 they die
# vis kind=w act=globe view=side night=.6 arcs=26 cut=2.6 then="view=full@1" trans=scan clock="HOUR 0" words="~5.5 BILLION@0|!OFFLINE@1"
About five and a half billion people use it.
At midnight, every link goes quiet.
// 0:11 DESK phone: messages that never arrive
# vis kind=w act=phone view=desk screen=chat msgs="Morning!@0|!You up??@1" then="view=pov screen=offline@1" trans=whip clock="HOUR 7"
Your phone still works. Messages don't.
You send one anyway.
// 0:17 ZOOM out of the street… the card terminal
# vis kind=w act=money view=card word="DECLINED" trans=ticket clock="HOUR 9" words="!CARD DECLINED@1"
At the coffee shop, the card machine thinks.
Then it says no.
// 0:23 the street: phones go dark one by one
# vis kind=w act=crowd view=street pose=phone dark=1.6 n=14 then="view=close pose=look@1" trans=liquid tc=.5,.6 clock="HOUR 10"
Millions of people look down at the same blank screen.
And then, slowly, they look up.
// 0:30 data centre aisle dies far to near
# vis kind=w act=servers off=.8 then="act=city view=aerial time=night dark=0@2.4s" trans=slices clock="HOUR 12"
Somewhere, a data centre waits, fully powered, with nobody to talk to.
// 0:36 the time-lapse day: town keeps going
# vis kind=w act=sky days=1 town=1 then="act=city view=street time=day@1" trans=bloom clock="HOUR 18"
But the lights stay on. Trains still run. Most of the world keeps turning.
// 0:43 the machine prints the twist
# vis kind=ifm act=answer text="The internet survives. Your habits don't." stamp="CASH IS KING" trans=ticket clock="HOUR 24"
Here's what the machine printed.
The internet comes back. But for one day, cash is king.
// 0:51 back out to space: the arcs return
# vis kind=w act=globe view=limb night=.8 arcs=30 trans=zoomthru clock=off words="^BACK ONLINE@0"
At midnight, it all reconnects, as if nothing happened.
What should the machine run next?
