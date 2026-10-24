import re
import json

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's extract scripts to see animation libraries, swiper, aos, or scroll effects
scripts = re.findall(r'<script[^>]+src="([^"]+)"', html)
print("--- EXTERNAL SCRIPTS ---")
for s in scripts:
    if any(k in s for k in ['swiper', 'animation', 'scroll', 'wedding', 'custom', 'uikit']):
        print(s)

# Let's extract inline scripts
inline_scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
print(f"\n--- INLINE SCRIPTS ({len(inline_scripts)}) ---")
for idx, scr in enumerate(inline_scripts):
    if any(k in scr for k in ['buka', 'scroll', 'audio', 'play', 'weddingpress', 'swiper']):
        print(f"Script {idx}:", scr.strip()[:200], "\n---")
