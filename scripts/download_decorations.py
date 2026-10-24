import urllib.request
import os

os.makedirs('public/decorations', exist_ok=True)

decor_urls = {
    'flower-bouquet-2.png': 'https://my-invitation.com/wp-content/uploads/2024/02/flower-bouquet-2.png',
}

for name, u in decor_urls.items():
    dest = os.path.join('public/decorations', name)
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            with open(dest, 'wb') as f:
                f.write(resp.read())
        print("Downloaded:", name, "size:", os.path.getsize(dest))
    except Exception as e:
        print("Failed to download", name, e)
