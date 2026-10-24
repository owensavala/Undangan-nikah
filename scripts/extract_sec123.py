import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's see Section 1 (Cover)
sec1_match = re.search(r'(<section[^>]+data-id="30b3cf6e"[^>]*>.*?</section>)', html, re.DOTALL)
if sec1_match:
    with open('sec1_cover.html', 'w', encoding='utf-8') as f:
        f.write(sec1_match.group(1))
    print("Wrote sec1_cover.html")

# Let's see Section 2 (Ar-Rum)
sec2_match = re.search(r'(<section[^>]+data-id="529c8837"[^>]*>.*?</section>)', html, re.DOTALL)
if sec2_match:
    with open('sec2_hero.html', 'w', encoding='utf-8') as f:
        f.write(sec2_match.group(1))
    print("Wrote sec2_hero.html")

# Let's see Section 3 (Couple)
sec3_match = re.search(r'(<section[^>]+data-id="2694c2c7"[^>]*>.*?</section>)', html, re.DOTALL)
if sec3_match:
    with open('sec3_couple.html', 'w', encoding='utf-8') as f:
        f.write(sec3_match.group(1))
    print("Wrote sec3_couple.html")
