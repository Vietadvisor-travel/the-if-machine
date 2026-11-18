#!/usr/bin/env python3
"""ETCH — real antique engravings as the film's raw material (owner 17 Nov 2026: "nới… thoải mái mà làm, không vi phạm pháp luật").
Old engravings (18th–19th c. books, journals, plates) are public domain; cut from their paper they become layers we colour, light and move.
  python3 tools/etch.py search "<words>" [--n 12]                 → candidates on Wikimedia Commons that are PUBLIC DOMAIN / CC0 only
  python3 tools/etch.py cats "<words>" · incat "<Category name>"  → find engravings by CATEGORY (far better than text search)
  python3 tools/etch.py get <slug> "File:<title>" [--as name]     → public/stock/_pd/<slug>/<name>.jpg + licence proof in jobs/stock_pd/<slug>.md
  python3 tools/etch.py cut <slug> <name> [--keep-colour] [--crop x,y,w,h] [--soft .1]
        → <name>_ink.png: the INK alone on transparency (sepia), so the engine's paper, washes and light show through;
          --keep-colour keeps the scan's own colour (a coloured plate) with the paper made transparent instead
  python3 tools/etch.py local <slug> <file> --as <name> --licence "…" --source <url>   → a plate from Muse's kit (Wikimedia rate-limits us)
  python3 tools/etch.py ship <slug>                               → copies the folder to Drive _hwk/<slug>/_pd/ (sync.sh brings it back)
In episode.json: an `art` entity {name: 'Etch', src: 'stock/_pd/<slug>/<name>_ink.png', x, y, w, …} (src/paint/world.tsx Etch) — or `Pinned`.
LAW: only files whose Commons licence is Public domain / PD-* / CC0 are taken; author, date, source page and licence are recorded and the
film's delivery note credits them. Anything else is refused (exit 1)."""
import json, os, re, subprocess, sys, urllib.error, urllib.parse, urllib.request
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(H)
UA = {'User-Agent': 'FATHOM-film-research/1.0 (public-domain engraving finder)'}
API = 'https://commons.wikimedia.org/w/api.php'
OK = re.compile(r'(public\s*domain|^pd\b|pd-|cc0|no restrictions)', re.I)
strip = lambda h: re.sub(r'<[^>]+>', '', h or '').strip()


def fetch(url, timeout=60):
    import time
    for k in range(6):   # Wikimedia rate-limits bursts (429): wait as asked, then try again
        try: return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout).read()
        except urllib.error.HTTPError as e:
            if e.code != 429 or k == 5: raise
            time.sleep(int(e.headers.get('Retry-After') or 0) or 5 * (k + 1))


def q(params):
    return json.loads(fetch(API + '?' + urllib.parse.urlencode({**params, 'format': 'json', 'maxlag': 5})))


def info(pages):
    out = []
    for p in pages.values():
        ii = (p.get('imageinfo') or [{}])[0]; m = ii.get('extmetadata') or {}
        lic = strip(m.get('LicenseShortName', {}).get('value')) or strip(m.get('License', {}).get('value'))
        out.append({'title': p['title'], 'licence': lic, 'pd': bool(OK.search(lic or '')), 'url': ii.get('url'), 'w': ii.get('width'), 'h': ii.get('height'),
                    'artist': strip(m.get('Artist', {}).get('value'))[:120], 'date': strip(m.get('DateTimeOriginal', {}).get('value'))[:40],
                    'desc': strip(m.get('ImageDescription', {}).get('value'))[:160], 'page': ii.get('descriptionurl')})
    return out


def search(words, n=12):
    d = q({'action': 'query', 'generator': 'search', 'gsrsearch': words + ' filetype:bitmap', 'gsrnamespace': 6, 'gsrlimit': n, 'prop': 'imageinfo',
           'iiprop': 'url|size|extmetadata'})
    rows = info(d.get('query', {}).get('pages', {}))
    for r in rows:
        print(('PD  ' if r['pd'] else 'no  ') + f"{r['title'][:160]}  [{r['licence']}] {r['w']}×{r['h']}  {r['date']}  — {r['desc'][:90]}")
    return rows


def cats(words, n=15):
    """Commons CATEGORIES matching words (engravings are best found by category, not by description text)."""
    d = q({'action': 'query', 'list': 'search', 'srsearch': words, 'srnamespace': 14, 'srlimit': n})
    for r in d.get('query', {}).get('search', []): print(r['title'])


def incat(cat, n=40):
    """Files in a category, public-domain ones marked PD."""
    d = q({'action': 'query', 'generator': 'categorymembers', 'gcmtitle': cat if cat.startswith('Category:') else 'Category:' + cat, 'gcmtype': 'file',
           'gcmlimit': n, 'prop': 'imageinfo', 'iiprop': 'url|size|extmetadata'})
    rows = info(d.get('query', {}).get('pages', {}))
    for r in rows: print(('PD  ' if r['pd'] else 'no  ') + f"{r['title'][:90]}  [{r['licence']}] {r['w']}×{r['h']}  {r['date']}")
    return rows


def get(slug, title, name=None):
    d = q({'action': 'query', 'titles': title, 'prop': 'imageinfo', 'iiprop': 'url|size|extmetadata', 'iiurlwidth': 2400})
    r = info(d.get('query', {}).get('pages', {}))[0]
    if not r['pd']: sys.exit(f'REFUSED: {title} is "{r["licence"]}" — only public domain / CC0 is taken')
    pages = d['query']['pages']; ii = list(pages.values())[0]['imageinfo'][0]; url = ii.get('thumburl') or ii['url']
    name = name or re.sub(r'[^a-z0-9]+', '-', title.split(':', 1)[1].rsplit('.', 1)[0].lower()).strip('-')[:48]
    D = f'public/stock/_pd/{slug}'; os.makedirs(D, exist_ok=True); dst = f'{D}/{name}.jpg'
    raw = fetch(url, 120)
    tmp = dst + '.src'; open(tmp, 'wb').write(raw)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-q:v', '2', dst], check=True); os.remove(tmp)
    os.makedirs('../jobs/stock_pd', exist_ok=True); L = f'../jobs/stock_pd/{slug}.md'
    if not os.path.exists(L): open(L, 'w').write(f'# Public-domain engravings — {slug} (tools/etch.py; credit them in the delivery note)\n\n| file | title | artist | date | licence | source |\n|---|---|---|---|---|---|\n')
    open(L, 'a').write(f"| {name}.jpg | {r['title']} | {r['artist'] or '—'} | {r['date'] or '—'} | {r['licence']} | {r['page']} |\n")
    print(f'{dst}  ({r["licence"]}; {r["artist"] or "artist unknown"}, {r["date"] or "date unknown"}) — proof in {L}')


def cut(slug, name, keep=False, crop=None, soft=.1):
    import numpy as np
    from PIL import Image
    src = f'public/stock/_pd/{slug}/{name}.jpg'; im = Image.open(src).convert('RGB')
    if crop: x, y, w, h = map(int, crop.split(',')); im = im.crop((x, y, x + w, y + h))
    a = np.asarray(im).astype(np.float32) / 255; L = a @ np.array([.2126, .7152, .0722], np.float32)
    paper, ink = np.percentile(L, 90), np.percentile(L, 3)   # the paper is the bright majority, the ink the darkest cuts
    alpha = np.clip((paper - soft * .1 - L) / max(.05, paper - ink), 0, 1) ** .85
    if keep: rgb = a
    else: rgb = np.broadcast_to(np.array([43, 29, 18], np.float32) / 255, a.shape)   # the channel's sepia ink
    out = np.dstack([rgb, alpha]); o = f'public/stock/_pd/{slug}/{name}_ink.png'
    Image.fromarray((out * 255).astype(np.uint8), 'RGBA').save(o, optimize=True); print(f'{o}  {im.size[0]}×{im.size[1]}  paper {paper:.2f} ink {ink:.2f}')


if __name__ == '__main__':
    a = sys.argv[1:]; opt = lambda k, d=None: a[a.index('--' + k) + 1] if '--' + k in a else d
    if not a: sys.exit(__doc__)
    if a[0] == 'search': search(a[1], int(opt('n', 12)))
    elif a[0] == 'cats': cats(a[1], int(opt('n', 15)))
    elif a[0] == 'incat': incat(a[1], int(opt('n', 40)))
    elif a[0] == 'get': get(a[1], a[2], opt('as'))
    elif a[0] == 'local':   # a plate Muse delivered (public domain, proof in her manifest): python3 tools/etch.py local <slug> <path> --as name --licence "PD (…)" --source <url>
        import shutil; D = f'public/stock/_pd/{a[1]}'; os.makedirs(D, exist_ok=True); nm = opt('as') or os.path.basename(a[2]).rsplit('.', 1)[0]
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', a[2], '-q:v', '2', f'{D}/{nm}.jpg'], check=True)
        os.makedirs('../jobs/stock_pd', exist_ok=True); L = f'../jobs/stock_pd/{a[1]}.md'
        if not os.path.exists(L): open(L, 'w').write(f'# Public-domain engravings — {a[1]}\n\n| file | title | artist | date | licence | source |\n|---|---|---|---|---|---|\n')
        open(L, 'a').write(f"| {nm}.jpg | {os.path.basename(a[2])} | — | — | {opt('licence', 'see Muse manifest')} | {opt('source', 'Muse kit')} |\n"); print(f'{D}/{nm}.jpg')
    elif a[0] == 'cut': cut(a[1], a[2], '--keep-colour' in a, opt('crop'), float(opt('soft', .1)))
    elif a[0] == 'ship': subprocess.run(['python3', '../studio/tools/pp_drive.py', 'put', *[f'public/stock/_pd/{a[1]}/{f}' for f in sorted(os.listdir(f'public/stock/_pd/{a[1]}'))], '--to', f'_hwk/{a[1]}/_pd'], check=True)
    else: sys.exit(__doc__)
