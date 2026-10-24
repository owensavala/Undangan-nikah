import re
# We can use standard re or simple parser
with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's extract each section and save clean readable text & elements to a file
sections = re.findall(r'<section[^>]+class="[^"]*elementor-top-section[^"]*"[^>]*>(.*?)</section>', html, re.DOTALL)

with open('ref_sections_deep_analysis.txt', 'w', encoding='utf-8') as f:
    for idx, s in enumerate(sections):
        f.write(f"\n{'='*30} SECTION {idx+1} {'='*30}\n")
        # Extract all elementor-widget
        widgets = re.findall(r'<div[^>]+class="[^"]*elementor-widget-([^"\s]+)[^"]*"[^>]*>(.*?)</div>\s*</div>\s*</div>', s, re.DOTALL)
        f.write(f"Widgets found ({len(widgets)}):\n")
        for w_type, w_content in widgets:
            # clean text
            w_text = re.sub(r'<[^>]+>', ' ', w_content)
            w_text = re.sub(r'\s+', ' ', w_text).strip()
            imgs = re.findall(r'src="([^"]+)"', w_content)
            f.write(f"  [{w_type}]: {w_text[:120]}\n")
            if imgs:
                f.write(f"     -> Imgs: {imgs}\n")

print("Wrote ref_sections_deep_analysis.txt")
