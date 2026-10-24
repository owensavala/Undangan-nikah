import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('elementor_all.css', 'r', encoding='utf-8') as f:
    css = f.read()

urls_html = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', html)
urls_css = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp)', css)

all_urls = sorted(list(set(urls_html + urls_css)))
for u in all_urls:
    if 'my-invita' in u:
        print(u)
