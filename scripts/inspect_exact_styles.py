import re
import json

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('elementor_all.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Let's inspect each elementor section class and find its styles in CSS
section_matches = re.findall(r'<section[^>]+class="([^"]*elementor-top-section[^"]*)"[^>]*data-id="([^"]+)"', html)
print(f"Found {len(section_matches)} sections with data-id")

for cls, data_id in section_matches:
    print(f"\n================ SECTION data-id: {data_id} ================")
    # Find css for this data-id
    # e.g. .elementor-222908 .elementor-element.elementor-element-data_id
    rules = re.findall(rf'(\.elementor-element-{data_id}\b[^{{]*\{{[^}}]+\}})', css)
    for r in rules:
        # print background or border or color rules
        bg = re.search(r'background[^;]+;', r)
        bg_col = re.search(r'background-color:[^;]+;', r)
        border = re.search(r'border[^;]+;', r)
        rad = re.search(r'border-radius:[^;]+;', r)
        pad = re.search(r'padding:[^;]+;', r)
        if bg: print(" ", bg.group(0))
        if bg_col: print(" ", bg_col.group(0))
        if rad: print(" ", rad.group(0))

    # Also find text inside this section in html
    sec_html_m = re.search(rf'<section[^>]+data-id="{data_id}"[^>]*>(.*?)</section>', html, re.DOTALL)
    if sec_html_m:
        sec_content = sec_html_m.group(1)
        # find images
        imgs = re.findall(r'<img[^>]+src="([^"]+)"', sec_content)
        # find headings
        headings = re.findall(r'<h[1-6][^>]*>(.*?)</h[1-6]>', sec_content, re.DOTALL)
        clean_headings = [re.sub(r'<[^>]+>', '', h).strip() for h in headings]
        print("  Headings:", clean_headings)
        if imgs:
            print("  Images:", imgs[:3])
