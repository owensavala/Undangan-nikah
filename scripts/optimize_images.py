import os
import glob
from PIL import Image

output_dir = os.path.join("public", "photos")
os.makedirs(output_dir, exist_ok=True)

src_dir = "mira"
raw_files = sorted(glob.glob(os.path.join(src_dir, "*.jpg")))

print(f"Found {len(raw_files)} raw images.")

def process_image(src_path, dest_name, max_width=1200, quality=82):
    dest_path = os.path.join(output_dir, dest_name)
    with Image.open(src_path) as img:
        img = img.convert("RGB")
        w, h = img.size
        if w > max_width:
            new_h = int(h * (max_width / w))
            img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
        img.save(dest_path, "WEBP", quality=quality, method=6)
        file_size_kb = os.path.getsize(dest_path) / 1024
        print(f"Saved {dest_name} ({img.size[0]}x{img.size[1]}, {file_size_kb:.1f} KB)")

# Let's optimize key images for specific roles
# 1C8A4171: Cover / Hero
if len(raw_files) > 0:
    process_image(raw_files[0], "cover.webp", max_width=1600, quality=85)

# Profile bride / groom / couple
if len(raw_files) > 4:
    process_image(raw_files[4], "couple_hero.webp", max_width=1400, quality=85)
if len(raw_files) > 7:
    process_image(raw_files[7], "bride.webp", max_width=1000, quality=85)
if len(raw_files) > 9:
    process_image(raw_files[9], "groom.webp", max_width=1000, quality=85)
if len(raw_files) > 12:
    process_image(raw_files[12], "story_1.webp", max_width=1000, quality=85)
if len(raw_files) > 17:
    process_image(raw_files[17], "story_2.webp", max_width=1000, quality=85)
if len(raw_files) > 23:
    process_image(raw_files[23], "story_3.webp", max_width=1000, quality=85)

# Gallery selection (16 gorgeous photos)
step = max(1, len(raw_files) // 16)
gallery_indices = [i * step for i in range(16) if i * step < len(raw_files)]
for idx, file_idx in enumerate(gallery_indices):
    process_image(raw_files[file_idx], f"gallery_{idx+1}.webp", max_width=1000, quality=80)

print("Image processing completed successfully!")
