import re
with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

links = re.findall(r'href=[\'"]([^\'"]+\.css[^\'"]*)[\'"]', html)
for l in links:
    if 'my-invita' in l:
        print(l)
