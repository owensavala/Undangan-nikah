import re
import urllib.request

url = 'https://my-invitation.com/van-dan-rama/?to=Mira+%26+Calon'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=12) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

matches = re.findall(r'<section[^>]*>(.*?)</section>', html, re.DOTALL)
with open('ref_sections.txt', 'w', encoding='utf-8') as out:
    out.write(f'Total section tags: {len(matches)}\n\n')
    for i, m in enumerate(matches):
        clean_text = re.sub(r'<[^>]+>', ' ', m)
        clean_text = ' '.join(clean_text.split())
        imgs = re.findall(r'src=[\'"]([^\'"]+)[\'"]', m)
        bgs = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', m)
        classes = re.findall(r'class=[\'"]([^\'"]+)[\'"]', m)
        out.write(f'=== Section {i+1} ===\n')
        out.write(f'Text: {clean_text[:300]}\n')
        out.write(f'Imgs: {imgs}\n')
        out.write(f'BGs: {bgs}\n\n')

print("Wrote ref_sections.txt successfully")
