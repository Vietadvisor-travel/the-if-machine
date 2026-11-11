"""Intonation pass for Kokoro lines (owner, 11 Nov 2026: "just add expressive stress and intonation so it sounds better").

Kokoro reads in one even pitch line and cannot be told where to put a pitch accent. This pass reshapes the pitch of a finished
utterance with Praat (PSOLA overlap-add via praat-parselmouth), the standard speech-science way to move intonation without
touching the voice's timbre or timing:
  * accent  — each *word* gets a pitch accent: a rise of ~2.2 semitones from the word's onset to its stressed vowel, held
              through the vowel, then back; the rest of its sentence steps down a little (contrast = focus);
  * endings — a statement settles down into its last syllables, a question lifts at the end, a "…" hold stays level;
  * range   — a gentle widening (×1.15) of the pitch movement Kokoro already has, so long lines do not drone.
Times come from the timestamped Kokoro (voice.py `marks`: exact phoneme times); without them only the range is widened.
~0.1 s a line, deterministic, Kokoro voices only. IFM_PROSODY=0 turns it off.
"""
import numpy as np

try:
    import parselmouth
    from parselmouth.praat import call
except ImportError:   # optional: without Praat the line is returned as read
    parselmouth = None

RANGE = 1.15     # widening of Kokoro's own pitch movement around the median
ACCENT = 2.2     # semitones on a *word*
DEACC = -.7      # semitones on the rest of the sentence after the accent
FALL = -1.6      # statement ending (last ~0.45 s before the full stop)
RISE = 2.2       # question ending (last ~0.4 s before the question mark)


def _bump(T, a, b, amt):
    """a = word onset, b = end of its stressed vowel: rise over the onset, hold through the vowel, release in 0.12 s."""
    b = max(b, a + .08); up = min(.12, max(.05, (b - a) * .5))
    r = np.clip((T - a + .02) / up, 0, 1) * np.clip((b + .12 - T) / .12, 0, 1)
    return amt * (.5 - .5 * np.cos(np.pi * r))


def shape(x, sr, text='', marks=None):
    """x: float32 mono utterance; marks: [('word', onset, vowel_end) | ('.'|'?'|'!', t, t)] in s. Returns the re-intoned audio."""
    if parselmouth is None or len(x) < sr * .4: return x
    snd = parselmouth.Sound(x.astype(np.float64), sampling_frequency=sr)
    try:
        man = call(snd, 'To Manipulation', .01, 75, 500)
        pt = call(man, 'Extract pitch tier')
    except Exception:
        return x
    n = call(pt, 'Get number of points')
    if n < 5: return x
    T = np.array([call(pt, 'Get time from index', i) for i in range(1, n + 1)])
    F = np.array([call(pt, 'Get value at index', i) for i in range(1, n + 1)])
    med = float(np.median(F)); st = 12 * np.log2(F / med) * RANGE; add = np.zeros_like(st)
    marks = sorted(marks or [], key=lambda m: m[1]); dur = len(x) / sr
    ends = [m[1] for m in marks if m[0] in '.?!']
    words = [(a, b) for k, a, b in marks if k == 'word']
    for kind, a, b in marks:
        if kind not in '.!?': continue
        w0 = a - (.4 if kind == '?' else .45)
        hot = [wb for wa, wb in words if w0 - .1 < wb + .12 <= a + .02]   # a focus word right at the end: the ending starts after its peak
        if hot: w0 = min(max(hot) + .1, a - .1)
        span = max(a + .02 - w0, .1); m = (T > w0) & (T <= a + .02); r = np.clip((T[m] - w0) / span, 0, 1)
        add[m] += RISE * r ** 1.5 if kind == '?' else (FALL if kind == '.' else FALL * .6) * r
    for kind, a, b in marks:
        if kind != 'word': continue
        add += _bump(T, a, b, ACCENT)
        se = next((e for e in ends if e >= b), dur); m = (T > b + .12) & (T < se - .45)   # the rest of the sentence steps down
        add[m] += DEACC * np.clip((T[m] - b - .12) / .15, 0, 1)
    newF = np.clip(med * 2 ** ((st + add) / 12), 70, 480)
    call(pt, 'Remove points between', 0, dur + 1)
    for t, f in zip(T, newF): call(pt, 'Add point', float(t), float(f))
    call([pt, man], 'Replace pitch tier')
    try:
        y = call(man, 'Get resynthesis (overlap-add)').values[0].astype(np.float32)
    except Exception:
        return x
    y = np.pad(y, (0, max(0, len(x) - len(y))))[:len(x)]
    pk, py = np.abs(x).max() or 1., np.abs(y).max() or 1.
    return y * min(1., pk / py * 1.02)
