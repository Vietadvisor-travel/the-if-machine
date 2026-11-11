#!/usr/bin/env python3
"""Free English voice-over with Kokoro-82M (Apache-2.0, runs offline on CPU) — no API key, no cost.
  python3 tools/voice.py setup                                   # one-time: pip deps + model files (~120 MB) into ~/.cache/va-voice
  python3 tools/voice.py voices                                  # list voice ids
  python3 tools/voice.py synth out/x_lines.json out/vo [--voice am_michael] [--speed 1.0]
        → out/vo/vo_<k>.wav per spoken line + out/vo/durs.json (seconds, in line order) — cached by text+voice
  python3 tools/voice.py place out/x_cues.json out/vo out/x_vo.wav  # lay the lines on the timeline (44.1 kHz)
  python3 tools/voice.py say "Text to test" test.wav [--voice af_heart]
Vietnamese names are respelled for an English voice via tools/pron_vi.json (edit/extend freely)."""
import json, os, re, sys, hashlib, unicodedata, subprocess
import numpy as np
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.expanduser(os.environ.get('VA_VOICE_DIR', '~/.cache/va-voice'))
MODEL, VOICES = os.path.join(CACHE, 'kokoro-v1.0.int8.onnx'), os.path.join(CACHE, 'voices-v1.0.bin')
URL = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/'
SR_OUT = 44100
# The If Machine voices (owner, 5 Nov 2026 — the only three): af_heart narrates every episode; af_nicole is the second female voice
# (slow, eerie: quotes, chilling lines); am_santa is the old male storyteller (legends, history told as a tale). Story: `voice: af_heart`,
# `cast: QUOTE=af_nicole LEGEND=am_santa` and lines starting "QUOTE: …" / "LEGEND: …".
DEFAULT_SPK = {'narrator': 'af_heart', 'a': 'af_nicole', 'b': 'am_santa', 'c': 'af_nicole', 'd': 'am_santa', 'quote': 'af_nicole', 'legend': 'am_santa'}

def setup():
    subprocess.call([sys.executable, '-m', 'pip', 'install', '-q', 'kokoro-onnx', 'soundfile', '--break-system-packages'])
    os.makedirs(CACHE, exist_ok=True)
    for f in ['kokoro-v1.0.int8.onnx', 'voices-v1.0.bin']:
        p = os.path.join(CACHE, f)
        if not os.path.exists(p) or os.path.getsize(p) < 1e6: subprocess.check_call(['curl', '-sSL', '-o', p, URL + f])
    print('voice ready:', CACHE)

_k = None
def kokoro():
    global _k
    if _k is None:
        if not os.path.exists(MODEL): setup()
        from kokoro_onnx import Kokoro
        _k = Kokoro(MODEL, VOICES)
    return _k

# ---------------------------------------------------------------- text normalisation for speech
PRON = json.load(open(os.path.join(HERE, 'pron_vi.json'), encoding='utf-8'))
_keys = sorted(PRON, key=len, reverse=True)
def strip_marks(s): return ''.join(c for c in unicodedata.normalize('NFD', s.replace('đ', 'd').replace('Đ', 'D')) if unicodedata.category(c) != 'Mn')
def num_words(m):
    n, unit = m.group(1), (m.group(2) or '').lower()
    return n + {'k': ' thousand', 'm': ' million', 'b': ' billion'}.get(unit, '')  # unit: k, M, B
def speakable(text):
    s = re.sub(r'[\*\[\]]', '', text)
    s = re.sub(r'[\U0001F300-\U0001FAFF☀-➿]', '', s)  # emoji
    for k in _keys:  # Vietnamese words → English respelling (case-insensitive, diacritics-exact first)
        s = re.sub(r'(?<![\w])' + re.escape(k) + r'(?![\w])', PRON[k], s, flags=re.I)
    s = re.sub(r'(\d)\.(\d{3})(?!\d)', r'\1,\2', s)              # 45.000 → 45,000
    s = re.sub(r'(\d)\.(\d{3})(?!\d)', r'\1,\2', s)
    s = re.sub(r'[~≈]\s*', 'about ', s)
    s = re.sub(r'(\d)\s*[–-]\s*(\$?\d)', r'\1 to \2', s)          # 3–4 → 3 to 4
    s = re.sub(r'\$\s*([\d.,]+)\s+to\s+\$?([\d.,]+)', r'\1 to \2 dollars', s)
    s = re.sub(r'\$\s*([\d.,]+)\s*([kKmM])?\b', lambda m: m.group(1) + ({'k': ' thousand', 'm': ' million'}.get((m.group(2) or '').lower(), '')) + ' dollars', s)
    s = re.sub(r'(\d)\s*km\b', r'\1 kilometres', s); s = re.sub(r'(\d)\s*m\b(?!\w)', r'\1 metres', s)
    s = re.sub(r'([\d.,]+)\s*([kKMB])\b', num_words, s)
    s = re.sub(r'\s*(₫|VND|vnd)\b', ' dong', s).replace('₫', ' dong')
    s = re.sub(r'(\d)\s*°C', r'\1 degrees', s)
    s = s.replace('&', ' and ').replace('…', ', ').replace('—', ', ').replace('–', ' to ').replace('·', ',').replace('%', ' percent')
    s = strip_marks(s)
    return re.sub(r'\s+', ' ', s).strip()

VIS = [('aɪ', 'A'), ('aʊ', 'A'), ('eɪ', 'E'), ('oʊ', 'O'), ('ɔɪ', 'O'), ('tʃ', 'C'), ('dʒ', 'C')]
def vclass(c):
    if c in 'mbp': return 'M'
    if c in 'fv': return 'F'
    if c in 'ɑæaʌɐ': return 'A'
    if c in 'eɛɪiəɚɜ': return 'E'
    if c in 'oɔuʊw': return 'O'
    return 'C'
def visemes(ph, env):
    """Spread the phoneme sequence over the voiced frames of the envelope (vowels weigh more)."""
    ph = re.sub(r"[ˈˌː.,!?;:\-'\"]", '', ph); units = []; i = 0
    while i < len(ph):
        if ph[i] == ' ': i += 1; continue
        hit = next((v for k, v in VIS if ph.startswith(k, i)), None)
        if hit: units.append(hit); i += 2
        else: units.append(vclass(ph[i])); i += 1
    voiced = [k for k, v in enumerate(env) if v > .12]; out = ['X'] * len(env)
    if not units or not voiced: return ''.join(out)
    w = [1.7 if u in 'AEO' else 1.0 for u in units]; tot = sum(w); acc = 0; j = 0
    for k_i, k in enumerate(voiced):
        pos = (k_i + .5) / len(voiced) * tot
        while j < len(units) - 1 and acc + w[j] < pos: acc += w[j]; j += 1
        out[k] = units[j]
    return ''.join(out)

def voice_for(spk, narrator):
    if re.match(r'^[abefhijpz][fm]_\w+$', spk or '') or str(spk or '').startswith('supertonic:'): return spk
    if spk in (None, '', 'narrator'): return narrator
    return DEFAULT_SPK.get(spk, 'af_nicole')

# Supertonic 3 (Supertone; weights OpenRAIL-M: every post must say the narration is AI-generated, brief/BRAND.md §7).
# Spec "supertonic:M1" … "supertonic:F5". Weights: Drive _voice/supertonic (python3 tools/voice.py setup-supertonic), never git.
ST_DIR = os.path.expanduser(os.environ.get('PP_SUPERTONIC_DIR', '~/.cache/pp-voice/supertonic')); _ST = {}
def supertonic():
    if 'tts' not in _ST:
        os.environ.setdefault('HF_HUB_OFFLINE', '1')
        if not os.path.exists(os.path.join(ST_DIR, 'onnx')): sys.exit('Supertonic weights missing: python3 tools/voice.py setup-supertonic')
        from supertonic import TTS; _ST['tts'] = TTS(model='supertonic-3', model_dir=ST_DIR, auto_download=False)
    return _ST['tts']
def setup_supertonic():
    import subprocess, zipfile, glob
    subprocess.call([sys.executable, '-m', 'pip', 'install', '-q', 'supertonic==1.3.1', '--break-system-packages'])
    if not os.path.exists(os.path.join(ST_DIR, 'onnx')):
        dl = os.path.expanduser('~/.cache/pp-voice'); pp = os.environ.get('PP_REPO', '/home/user/vietadvisor-travel/vietadvisor-videos/studio/tools/pp_drive.py')
        tool = pp if os.path.exists(pp) else os.path.join(HERE, 'pp_drive.py')   # the weights live in the Poison Pill Drive folder (_voice/)
        subprocess.check_call([sys.executable, tool, 'get', '_voice/supertonic/*', '--to', dl]); os.makedirs(ST_DIR, exist_ok=True)
        for z in glob.glob(os.path.join(dl, '_voice', 'supertonic', '*.zip')): zipfile.ZipFile(z).extractall(ST_DIR)
    print('supertonic ready:', ST_DIR)

# ---------------------------------------------------------------- delivery: *word* = stress this word (owner, 11 Nov 2026: "stress and intonation that fit each line")
# Kokoro reads IPA with stress marks: the marked word gets a primary stress and a longer stressed vowel; the other stresses in the
# same sentence are softened to secondary, so the marked word carries the line. Questions keep their rising '?', '…' holds a beat.
_VOW = set('aeiouɑɐɒæəɘɚɛɜɝɞɤɨɪʊʉʌɔøœɵɯɶʏyIEAOW')
def _emph(pw):
    pw = pw.replace('ˌ', '')
    if 'ˈ' not in pw:
        i = next((k for k, ch in enumerate(pw) if ch in _VOW), 0); pw = pw[:i] + 'ˈ' + pw[i:]
    i = pw.index('ˈ') + 1
    while i < len(pw) and pw[i] not in _VOW: i += 1
    j = i
    while j < len(pw) and (pw[j] in _VOW or pw[j] == 'ː'): j += 1
    return pw[:j] + ('ːː' if 'ː' not in pw[i:j] else 'ː') + pw[j:]
def emphasis_phonemes(text, lang='en-us'):
    """Phonemes for a line with *marked* words, or None when nothing could be placed (then the plain text is read)."""
    K = kokoro(); marked = re.findall(r'\*([^*]+)\*', text)
    if not marked: return None
    full = K.tokenizer.phonemize(speakable(text.replace('*', '')), lang)
    norm, idx = '', []
    for k, ch in enumerate(full):
        if ch in 'ˈˌ': continue
        norm += ch; idx.append(k)
    out, cur, spans = full, 0, []
    for w in marked:
        pw = K.tokenizer.phonemize(speakable(w), lang).strip(' .,!?;:')
        key = pw.replace('ˈ', '').replace('ˌ', '')
        if not key: continue
        p = norm.find(key, cur)
        if p < 0: continue
        a, b = idx[p], idx[p + len(key) - 1] + 1; spans.append((a, b, pw)); cur = p + len(key)
    if not spans: return None
    res, last = '', 0
    for a, b, pw in sorted(spans):
        res += out[last:a].replace('ˈ', 'ˌ').rstrip('ˌ') + _emph(out[a:b] if 'ˈ' in out[a:b] else pw); last = b
    return res + out[last:].replace('ˈ', 'ˌ')

def tts(text, voice, speed=1.0):
    if (voice or '').startswith('supertonic:'):
        T = supertonic(); name = voice.split(':', 1)[1]; key = 'st_' + name
        if key not in _ST: _ST[key] = T.get_voice_style(voice_name=name)
        wav, _ = T.synthesize(speakable(text), voice_style=_ST[key], total_steps=int(os.environ.get('PP_SUPERTONIC_STEPS', 8)), speed=max(.7, min(2., speed)), lang='en')
        s, sr = np.asarray(wav, dtype=np.float32).squeeze(), 44100
        a = np.abs(s); thr = max(1e-3, a.max() * .02); idx = np.where(a > thr)[0]
        if len(idx): s = s[max(0, idx[0] - int(sr * .03)): idx[-1] + int(sr * .08)]
        return s, sr
    lang = 'en-gb' if voice.startswith('b') else 'en-us'
    ph = emphasis_phonemes(text, lang) if '*' in text else None
    s, sr = kokoro().create(ph, voice=voice, speed=speed, lang=lang, is_phonemes=True) if ph else kokoro().create(speakable(text), voice=voice, speed=speed, lang=lang)
    s = np.asarray(s, dtype=np.float32)
    a = np.abs(s); thr = max(1e-3, a.max() * .02); idx = np.where(a > thr)[0]   # trim silence
    if len(idx): s = s[max(0, idx[0] - int(sr * .03)): idx[-1] + int(sr * .08)]
    return s, sr

def tts_expr(text, voice, speed=1.0):
    """Delivery pass: comic timing and rhythm on top of Kokoro.
    '…' or ' — ' = a held beat (0.38 s) before the next words (set-up → punchline); sentences get a 0.14 s breath;
    very short lines (≤ 4 words, the punchlines) are spoken 7 % slower so they land."""
    words = len(re.sub(r'[*\[\]]', '', text).split()); sp = speed * (.93 if words <= 4 else 1.0)
    chunks = [c for c in re.split(r'(…|\.\.\.| — | – )', text)]; out = []; sr0 = 24000
    for c in chunks:
        if c in ('…', '...', ' — ', ' – '): out.append(('gap', .38)); continue
        if not c.strip(): continue
        for k, sent in enumerate([x for x in re.split(r'(?<=[.!?])\s+', c.strip()) if x.strip()]):
            if k: out.append(('gap', .26))   # a breath between sentences (owner, 4 Nov 2026: slower, clearer)
            if not re.search(r'[A-Za-z0-9À-ỹ]', sent): continue
            x, sr0 = tts(sent, voice, sp); out.append(('sig', x))
    while out and out[-1][0] == 'gap': out.pop()
    while out and out[0][0] == 'gap': out.pop(0)
    if not out: return tts(text, voice, sp)
    parts = [np.zeros(int(sr0 * v), np.float32) if t == 'gap' else v for t, v in out]
    return np.concatenate(parts), sr0

def tts_flow(text, voice, speed=1.0):
    """One utterance for a whole beat: Kokoro reads it in one go (natural sentence pauses, continuous intonation);
    only '…' and ' — ' still insert a held beat (0.38 s)."""
    chunks = [c for c in re.split(r'(…|\.\.\.| — | – )', text)]; out = []; sr0 = 24000
    for c in chunks:
        if c in ('…', '...', ' — ', ' – '): out.append(np.zeros(int(sr0 * .38), np.float32)); continue
        if not re.search(r'[A-Za-z0-9À-ỹ]', c): continue
        held = bool(out) and isinstance(out[-1], np.ndarray) and not np.any(out[-1])   # this chunk follows a held beat: it is the punchline
        short = len(re.sub(r'[*\[\]]', '', c).split()) <= 6
        x, sr0 = tts(c.strip(), voice, speed * (.92 if held and short else 1.0)); out.append(x)   # owner, 11 Nov 2026: punchlines land a touch slower
    return (np.concatenate(out), sr0) if out else tts(text, voice, speed)

def split_at_pauses(x, sr, weights):
    """Cut one utterance into len(weights) pieces: each cut goes to the quietest moment within ±0.6 s of the point where that
    line's share of the text (weights = characters) ends. The pieces are contiguous, so placed end to end they ARE the utterance."""
    n = len(weights)
    if n == 1: return [x]
    hop = max(1, sr // 100); fr = len(x) // hop
    rms = np.array([np.sqrt(np.mean(x[i * hop:(i + 1) * hop] ** 2)) for i in range(fr)]) if fr else np.zeros(1)
    sm = np.convolve(rms, np.ones(5) / 5, 'same'); tot = float(sum(weights)); cuts = []; acc = 0; last = 0
    for w in weights[:-1]:
        acc += w; c = int(acc / tot * fr); a, b = max(last + 20, c - 60), min(fr - 20, c + 60)
        if b <= a: c2 = min(max(c, last + 1), fr - 1)
        else: c2 = a + int(np.argmin(sm[a:b] + np.abs(np.arange(a, b) - c) * (sm.max() * .002)))
        cuts.append(c2); last = c2
    edges = [0] + [c * hop for c in cuts] + [len(x)]
    return [x[edges[i]:edges[i + 1]] for i in range(n)]

def resample(x, sr, to=SR_OUT):
    if sr == to: return x
    n = int(len(x) * to / sr); return np.interp(np.linspace(0, len(x) - 1, n), np.arange(len(x)), x).astype(np.float32)

def write_wav(path, x, sr):
    from scipy.io import wavfile
    wavfile.write(path, sr, (np.clip(x, -1, 1) * 32767).astype(np.int16))
def read_wav(path):
    from scipy.io import wavfile
    sr, x = wavfile.read(path); return x.astype(np.float32) / 32768, sr

def synth(lines_path, outdir, voice=None, speed=1.0):
    L = json.load(open(lines_path, encoding='utf-8')); os.makedirs(outdir, exist_ok=True)
    narr = voice or L.get('voice') or 'am_puck'; durs = []
    if speed in (None, 'auto'):  # calibrate to ~2.7 words/s (≈160 wpm, explainer pace) from the first lines
        probe = [ln['text'] for ln in L['lines'][:4]] or ['This is a short calibration line for the narrator.']
        dur = 0
        for pr in probe: x, sr = tts(pr, narr, 1.0); dur += len(x) / sr
        words = len(' '.join(probe).split()); wps = words / dur
        speed = min(1.2, max(.85, round(3.15 / wps, 2)))
        print(f'  narrator {narr}: {wps:.2f} words/s at speed 1.0 → speed {speed}')
    speed = float(speed)
    # flow (owner, 5 Nov 2026: 'the sentences feel disconnected'): the lines of one beat by one voice are spoken as ONE utterance,
    # so the intonation runs on from line to line; the clip is then cut at the pauses nearest each line's share of the text.
    groups = []
    for ln in L['lines']:
        v = voice_for(ln.get('spk'), narr)
        if groups and groups[-1]['v'] == v and groups[-1]['b'] == ln.get('b', -1) and ln.get('b') is not None and len(groups[-1]['lines']) < 6: groups[-1]['lines'].append(ln)
        else: groups.append({'v': v, 'b': ln.get('b'), 'lines': [ln]})
    durs = [None] * len(L['lines']); kidx = {ln['k']: i for i, ln in enumerate(L['lines'])}
    for g in groups:
        v, lines = g['v'], g['lines']; text = ' '.join(ln['text'].strip() for ln in lines)
        key = hashlib.md5(f"{text}|{v}|{speed}|flow1".encode()).hexdigest()[:12]; cp = os.path.join(outdir, f'c_{key}.wav')
        if not os.path.exists(cp):
            x, sr = tts_flow(text, v, speed); write_wav(cp, resample(x, sr), SR_OUT)
        x, sr = read_wav(cp); segs = split_at_pauses(x, sr, [len(speakable(ln['text'])) + 1 for ln in lines])
        for j, (ln, seg) in enumerate(zip(lines, segs)):
            write_wav(os.path.join(outdir, f"vo_{ln['k']}.wav"), seg, sr); d = round(len(seg) / sr, 3)
            durs[kidx[ln['k']]] = [d, 1] if j < len(lines) - 1 else d
            print(f"  [{ln['k']:>3}] {v:<11} {d:5.2f}s{' ↴' if j < len(lines) - 1 else '  '} {speakable(ln['text'])[:68]}")
    json.dump(durs, open(os.path.join(outdir, 'durs.json'), 'w'))
    envs = []   # mouth-openness envelope per line at 30 fps (for lip sync)
    for ln in L['lines']:
        x, sr = read_wav(os.path.join(outdir, f"vo_{ln['k']}.wav")); hop = sr // 30; n = len(x) // hop
        rms = np.array([np.sqrt(np.mean(x[i * hop:(i + 1) * hop] ** 2)) for i in range(n)]) if n else np.zeros(1)
        ref = np.percentile(rms, 95) or 1; e = np.clip(rms / ref, 0, 1); e = np.convolve(e, [.25, .5, .25], 'same')
        envs.append([round(float(v), 2) for v in e])
    json.dump(envs, open(os.path.join(outdir, 'envs.json'), 'w'))
    vis = []   # viseme track per line at 15 fps: X rest · M m/b/p · F f/v · A open · E wide/teeth · O round · C consonant
    for ln, e in zip(L['lines'], envs):
        try: ph = kokoro().tokenizer.phonemize(speakable(ln['text']), 'en-gb' if voice_for(ln.get('spk'), narr).startswith('b') else 'en-us')
        except Exception: ph = ''
        vis.append(visemes(ph, e[::2]))
    json.dump(vis, open(os.path.join(outdir, 'visemes.json'), 'w'))
    print('voice-over:', len(durs), 'lines,', round(sum(d[0] if isinstance(d, list) else d for d in durs), 1), 's total')

def place(cues_path, vodir, out_path):
    C = json.load(open(cues_path, encoding='utf-8')); D = C.get('duration') or max(s['t1'] for s in C['subs']) + 1
    track = np.zeros(int(SR_OUT * (D + 1)), np.float32)
    for s in C['subs']:
        if s.get('vo') is None: continue
        p = os.path.join(vodir, f"vo_{s['vo']}.wav")
        if not os.path.exists(p): continue
        x, sr = read_wav(p); i = int((s['t0'] + .05) * SR_OUT); j = min(len(track), i + len(x)); track[i:j] += x[:j - i]
    write_wav(out_path, track, SR_OUT); print('vo track:', out_path)

if __name__ == '__main__':
    a = sys.argv[1:]; opt = lambda k, d=None: a[a.index('--' + k) + 1] if '--' + k in a else d
    cmd = a[0] if a else 'help'
    if cmd == 'setup': setup()
    elif cmd == 'setup-supertonic': setup_supertonic()
    elif cmd == 'voices': print(' '.join(sorted(kokoro().get_voices())))
    elif cmd == 'synth': synth(a[1], a[2], opt('voice'), opt('speed', 'auto'))
    elif cmd == 'place': place(a[1], a[2], a[3])
    elif cmd == 'say': x, sr = tts(a[1], opt('voice', 'am_michael'), float(opt('speed', 1.0))); write_wav(a[2], resample(x, sr), SR_OUT); print(speakable(a[1]))
    elif cmd == 'text': print(speakable(a[1]))
    else: print(__doc__)
