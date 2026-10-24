import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

sections = re.findall(r'<section[^>]+class="[^"]*elementor-top-section[^"]*"[^>]*>(.*?)</section>', html, re.DOTALL)

with open('sections_summary.txt', 'w', encoding='utf-8') as out_f:
    out_f.write(f"Inline styles count: {len(re.findall(r'style=\"[^\"]+\"', html))}\n")
    out_f.write(f"Top sections count: {len(sections)}\n")

    for idx, s in enumerate(sections):
        imgs = re.findall(r'<img[^>]+src="([^"]+)"', s)
        bgs = re.findall(r'url\(&quot;?([^&"\)]+)&quot;?\)', s)
        text = re.sub(r'<[^>]+>', ' ', s)
        text = re.sub(r'\s+', ' ', text).strip()[:250]
        out_f.write(f"\n--- Section {idx+1} ---\n")
        out_f.write(f"Text: {text}\n")
        if imgs:
            out_f.write(f"  Images: {imgs[:4]}\n")
        if bgs:
            out_f.write(f"  BGs: {bgs[:2]}\n")

print("Finished writing to sections_summary.txt")
