import urllib.request
import re

urls = [
    'https://my-invitation.com/wp-content/uploads/elementor/css/post-222908.css?ver=1792503741',
    'https://my-invitation.com/wp-content/uploads/elementor/css/post-222722.css?ver=1792500815',
    'https://my-invitation.com/wp-content/uploads/elementor/css/post-5.css?ver=1792500809'
]

combined = ""
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            combined += f"\n/* SOURCE: {u} */\n" + content
    except Exception as e:
        print("Error fetching", u, e)

with open('elementor_all.css', 'w', encoding='utf-8') as f:
    f.write(combined)

print("Downloaded elementor css, size:", len(combined))

# Find background images in elementor css
bgs = re.findall(r'background(?:-image)?:\s*url\([\'"]?([^\'"\)]+)[\'"]?\)', combined)
print("\n--- BACKGROUND IMAGES IN ELEMENTOR CSS ---")
for b in set(bgs):
    print(b)

# Find background colors
bg_colors = re.findall(r'background-color:\s*([^;\}]+)', combined)
print("\n--- BACKGROUND COLORS (Top 10) ---")
for c in list(set(bg_colors))[:10]:
    print(c)

# Find font family definitions
fonts = re.findall(r'font-family:\s*([^;\}]+)', combined)
print("\n--- FONTS USED ---")
for f in set(fonts):
    print(f)
