import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect the CSS in the HTML (style tags)
styles = re.findall(r'<style[^>]*>(.*?)</style>', html, re.DOTALL)
print(f"Found {len(styles)} style tags")

with open('ref_styles_dump.css', 'w', encoding='utf-8') as f:
    for s in styles:
        f.write(s + "\n/* --- END STYLE TAG --- */\n")

print("Wrote ref_styles_dump.css")

# Look for colors in styles
colors = set(re.findall(r'#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b', "".join(styles)))
print("Found hex colors:", list(colors)[:25])

# Look for font-family
font_families = set(re.findall(r'font-family:\s*([^;\}]+)', "".join(styles)))
print("Font families:", font_families)
