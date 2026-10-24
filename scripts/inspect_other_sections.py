import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect sections 5, 6, 8, 9, 10, 11
sections = re.findall(r'(<section[^>]+class="[^"]*elementor-top-section[^"]*"[^>]*data-id="([^"]+)"[^>]*>.*?</section>)', html, re.DOTALL)

for full_sec, data_id in sections:
    # Look for Akad Nikah, Resepsi, Amplop, Turut Mengundang
    if any(k in full_sec for k in ['Akad Nikah', 'Resepsi', 'Love Story', 'Amplop Digital', 'Turut Mengundang', 'Kirim Hadiah']):
        title_m = re.search(r'<(?:h[1-6]|p)[^>]*class="[^"]*heading-title[^"]*"[^>]*>(.*?)</(?:h[1-6]|p)>', full_sec)
        title = title_m.group(1) if title_m else "No title"
        clean_title = re.sub(r'<[^>]+>', '', title)
        print(f"\nSection {data_id} -> {clean_title}")
        # check shape dividers
        shapes = re.findall(r'shape_divider_([a-z]+)&quot;:&quot;([^&]+)&quot;', full_sec)
        print("  Shapes:", shapes)
        # check background settings
        bg_set = re.findall(r'background_([a-z_]+)&quot;:&quot;([^&]+)&quot;', full_sec)
        print("  Bg Settings:", bg_set[:3])
        # check images
        imgs = re.findall(r'<img[^>]+src="([^"]+)"', full_sec)
        if imgs:
            print("  Images:", imgs)
