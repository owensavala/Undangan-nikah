import re
import json

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# All background images in style attributes
style_bgs = re.findall(r'style="[^"]*background(?:-image)?:\s*url\((?:&quot;|"|\')?([^"\'\)\&]+)(?:&quot;|"|\')?\)', html)

# All img tags
imgs = re.findall(r'<img[^>]+src="([^"]+)"[^>]*>', html)

# All elementor background images
elem_bgs = re.findall(r'url\(&quot;([^&"]+)&quot;\)', html)

result = {
    'style_bgs': list(set(style_bgs)),
    'imgs': list(set(imgs)),
    'elem_bgs': list(set(elem_bgs))
}

with open('ref_media.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, indent=2)

print("Saved ref_media.json")
print("Total style_bgs:", len(result['style_bgs']))
print("Total imgs:", len(result['imgs']))
print("Total elem_bgs:", len(result['elem_bgs']))
