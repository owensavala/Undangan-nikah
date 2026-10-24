import os
import json

photos_dir = os.path.join("public", "photos")
files = sorted([f"/photos/{f}" for f in os.listdir(photos_dir) if f.lower().endswith(('.webp', '.jpg', '.jpeg', '.png'))])

content = f"// Automatically generated photo library for Admin Picker\nexport const photoLibrary = {json.dumps(files, indent=2)};\n"

with open("src/data/photoLibrary.js", "w", encoding="utf-8") as out:
    out.write(content)

print(f"Generated photoLibrary.js with {len(files)} photos.")
