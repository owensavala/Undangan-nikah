import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for bottom nav or one-page-nav or navbar
nav_m = re.findall(r'<div[^>]+class="[^"]*(?:nav|navbar|menu|dock|fixed|one-page-nav)[^"]*"[^>]*>.*?(?:</a>|\s*</div>)', html, re.DOTALL)
print("Nav matches:", len(nav_m))

# Search for icons in the floating menu
icons = re.findall(r'<i[^>]+class="[^"]*fa[srb]? fa-([^"\s]+)[^"]*"', html)
print("Font awesome icons:", set(icons))

# Search for the navbar container
navbars = re.findall(r'<(?:div|nav|section)[^>]+id="[^"]*(?:nav|menu|bottom)[^"]*"[^>]*>(.*?)</(?:div|nav|section)>', html, re.DOTALL)
print("Navbars by ID:", len(navbars))
for n in navbars:
    print(n[:200])
