import urllib.request
import re
import json

url = 'https://my-invitation.com/van-dan-rama/?to=Mira+%26+Calon'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
except Exception as e:
    print("Error fetching:", e)
    exit(1)

with open('ref_full_html.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Downloaded HTML, length:", len(html))

# Fonts
fonts = re.findall(r'fonts\.googleapis\.com/css2?\?[^"\'\s<>]+', html)
print("\n--- GOOGLE FONTS ---")
for f in set(fonts):
    print(f)

# Stylesheets
css_files = re.findall(r'<link[^>]+rel=[\'"]stylesheet[\'"][^>]+href=[\'"]([^\'"]+)[\'"]', html)
print("\n--- STYLESHEETS ---")
for c in css_files[:8]:
    print(c)

# Audio
audios = re.findall(r'(https?://[^\s"\'<>]+\.mp3)', html)
print("\n--- AUDIOS ---")
for a in set(audios):
    print(a)

# Images in Elementor / Jet / uploads
uploads = re.findall(r'https?://my-invit[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', html)
print("\n--- UPLOADED ASSETS ---")
for u in set(uploads):
    print(u)

# Section IDs and classes
elements = re.findall(r'<(?:section|div)[^>]+(?:id=[\'"]([^\'"]+)[\'"]|class=[\'"]([^\'"]+)[\'"])', html)
print("\n--- KEY ELEMENTOR CLASSES/IDS ---")
for el_id, el_cls in elements[:20]:
    if el_id:
        print("ID:", el_id)
