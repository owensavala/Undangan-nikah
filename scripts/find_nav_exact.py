import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Look for widget-one-page-nav
m = re.search(r'(<div[^>]+class="[^"]*widget-one-page-nav[^"]*"[^>]*>.*?</div>\s*</div>\s*</div>)', html, re.DOTALL)
if m:
    with open('nav_html.html', 'w', encoding='utf-8') as f:
        f.write(m.group(1))
    print("Found widget-one-page-nav! Saved to nav_html.html")
else:
    print("Not found by class, let's search for pp-one-page-nav")
    m2 = re.search(r'(<div[^>]+class="[^"]*pp-one-page-nav[^"]*"[^>]*>.*?</div>\s*</div>)', html, re.DOTALL)
    if m2:
        with open('nav_html.html', 'w', encoding='utf-8') as f:
            f.write(m2.group(1))
        print("Found pp-one-page-nav!")
