import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's extract Section 3 and Section 4
m = re.search(r'(<section[^>]+data-id="2694c2c7"[^>]*>.*?</section>\s*<section[^>]+data-id="47f19aab"[^>]*>.*?</section>)', html, re.DOTALL)
if m:
    with open('sec3_and_4.html', 'w', encoding='utf-8') as f:
        f.write(m.group(1))
    print("Wrote sec3_and_4.html")
