import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

inline_scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
for idx in [5, 6, 7]:
    if idx < len(inline_scripts):
        print(f"=== SCRIPT {idx} ===")
        print(inline_scripts[idx])
