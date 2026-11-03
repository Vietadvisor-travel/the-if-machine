title: The If Machine — brand test
channel: ifm
run: 1
next: What if money disappeared?
voice: am_michael
// 0:00 HOOK — the lever, the question types on the machine screen, dive in
# vis kind=ifm act=lever q="WHAT IF|THE INTERNET|SHUT DOWN?" clock=off dur=3.2
What if the internet shut down? Everywhere. For one whole day.
// machine thinking
# vis kind=ifm act=machine clock="HOUR 0" trans=scan dur=4
Let's run it.
The machine starts at midnight.
// answer
# vis kind=ifm act=answer text="Most of it survives. Your bank card doesn't." stamp="CASH ONLY" clock="HOUR 24" trans=ticket dur=4
Here's what the machine printed.
Cash only.
