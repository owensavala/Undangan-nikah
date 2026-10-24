import re

with open('ref_full_html.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect gallery in Section 7
gallery_match = re.search(r'Our Happy Moments Together(.*?)Love Story', html, re.DOTALL)
if gallery_match:
    gal_text = gallery_match.group(1)
    imgs = re.findall(r'src="([^"]+)"', gal_text)
    hrefs = re.findall(r'href="([^"]+\.jpe?g)"', gal_text)
    print("Gallery images:", list(set(imgs + hrefs)))

# Let's inspect Section 12 (between Turut Mengundang and Made with)
sec12_match = re.search(r'Turut Mengundang(.*?)Made with', html, re.DOTALL)
if sec12_match:
    sec12_text = sec12_match.group(1)
    # Check if there is guest book / comments / rsvp
    print("\nSection 12 length:", len(sec12_text))
    comments = re.findall(r'class="[^"]*comment[^"]*"', sec12_text)
    print("Comment classes found:", len(comments))
    # print all form or input elements
    inputs = re.findall(r'<(?:input|textarea|button)[^>]+>', sec12_text)
    print("Inputs/Buttons in Sec 12:", len(inputs))
