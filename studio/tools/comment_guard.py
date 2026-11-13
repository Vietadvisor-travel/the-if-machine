#!/usr/bin/env python3
"""Comment guard (13 Nov 2026: three times a comment pasted mid-line silently cut the code after it).
   python3 tools/comment_guard.py [files…]  → lists lines where code follows a // or # comment marker; exit 1 if any."""
import re, sys, glob
files = sys.argv[1:] or (glob.glob('engine/library/bank/*.js') + ['engine/library/l3_shot.js', 'engine/library/ifm3d_look.js', 'engine/library/ifm_world.js'] + glob.glob('tools/*.py') + glob.glob('tools/*.mjs'))
CODE_AFTER = re.compile(r'\)\s*;\s*[A-Za-z_$][\w.$]*\s*\(|\)\s*;\s*\}\s*,?\s*$|\}\s*\)\s*;\s*\}|sys\.exit\(|^\s*\S.*\bconst\s+\w+\s*=')
bad = []
for f in files:
    py = f.endswith('.py')
    for n, line in enumerate(open(f, encoding='utf-8', errors='ignore'), 1):
        s = re.sub(r"'(?:\\.|[^'\\])*'|\"(?:\\.|[^\"\\])*\"|`(?:\\.|[^`\\])*`", '""', line)   # drop string literals
        m = re.search(r'(?<![:/])//\s|(?<!\S)#\s' if not py else r'(?<!\S)#\s', s) if not py else re.search(r'\s#\s', s)
        if not m or (not py and m.group(0).startswith('#')): continue
        if CODE_AFTER.search(s[m.end():]): bad.append(f'{f}:{n}: {line.strip()[:110]}')
for b in bad: print('  ERROR code after a comment: ' + b)
print(f'comment guard: {len(bad)} suspicious line(s)'); sys.exit(1 if bad else 0)
