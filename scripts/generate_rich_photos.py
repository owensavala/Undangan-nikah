import os
import glob
from PIL import Image

output_dir = os.path.join("public", "photos")
os.makedirs(output_dir, exist_ok=True)

src_dir = "mira"
raw_files = sorted(glob.glob(os.path.join(src_dir, "*.jpg")))

def save_optimized(src_path, dest_name, max_w=1200, quality=80):
    dest_path = os.path.join(output_dir, dest_name)
    with Image.open(src_path) as img:
        img = img.convert("RGB")
        w, h = img.size
        if w > max_w:
            new_h = int(h * (max_w / w))
            img = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
        img.save(dest_path, "WEBP", quality=quality, method=6)
        print(f"Generated {dest_name}: {img.size} ({os.path.getsize(dest_path)//1024} KB)")

# Let's assign rich variety of photos
mapping = {
    "cover_bg.webp": 0,
    "quote_hero.webp": 1,
    "bride_portrait.webp": 7,
    "groom_portrait.webp": 10,
    "couple_standing.webp": 4,
    "couple_sitting.webp": 6,
    "countdown_bg.webp": 15,
    "event_bg.webp": 19,
    "story_1.webp": 12,
    "story_2.webp": 17,
    "story_3.webp": 23,
    "story_4.webp": 28,
    "collage_1.webp": 2,
    "collage_2.webp": 8,
    "collage_3.webp": 14,
    "collage_4.webp": 21,
    "collage_5.webp": 25,
    "closing_bg.webp": 35,
}

for dest, idx in mapping.items():
    if idx < len(raw_files):
        save_optimized(raw_files[idx], dest, max_w=1200, quality=82)

# Also ensure gallery 1-12
for i in range(12):
    file_idx = (i * 4) % len(raw_files)
    save_optimized(raw_files[file_idx], f"gal_{i+1}.webp", max_w=1000, quality=80)

print("All photo frames and backgrounds generated successfully!")
