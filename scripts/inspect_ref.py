import urllib.request
import re

url = 'https://my-invitation.com/van-dan-rama/?to=Mira+%26+Calon'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})

try:
    with urllib.request.urlopen(req, timeout=12) as resp:
        html = resp.read().decode('utf-8', errors='ignore')
        print('Fetched successfully, length:', len(html))
        titles = re.findall(r'<title>(.*?)</title>', html, re.I)
        print('Title:', titles)
        
        # Save a summary or inspect sections
        sections = re.findall(r'<section[^>]*id=[\'"]([^\'"]+)[\'"]', html, re.I)
        print('Sections with ID:', sections)
        
        # Find background images in inline styles or classes
        bg_imgs = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', html)
        print(f'Total background images: {len(bg_imgs)}')
        for bg in bg_imgs[:10]:
            print('BG:', bg)
            
        imgs = re.findall(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', html, re.I)
        print(f'Total img tags: {len(imgs)}')
        for img in imgs[:15]:
            print('IMG:', img)
            
        # Let's search for keywords like layout, fonts, theme
        fonts = re.findall(r'fonts\.googleapis\.com[^\'"]+', html)
        print('Google fonts used:', list(set(fonts)))
except Exception as e:
    print('Error:', e)
