import os
from PIL import Image, ImageDraw, ImageFont

svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1A1A"/>
      <stop offset="100%" stop-color="#2B2B2B"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBF3DC"/>
      <stop offset="40%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#AA8035"/>
    </linearGradient>
  </defs>
  <!-- Background Circle with Gold Border -->
  <circle cx="256" cy="256" r="246" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="14"/>
  <circle cx="256" cy="256" r="230" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="3" stroke-dasharray="8 6"/>

  <!-- Romantic Heart Motif -->
  <path d="M256,120 C256,98 238,82 216,82 C190,82 172,102 172,128 C172,162 216,195 256,216 C296,195 340,162 340,128 C340,102 322,82 296,82 C274,82 256,98 256,120 Z" fill="url(#goldGrad)"/>

  <!-- Monogram M & Y -->
  <text x="256" y="348" font-family="'Playfair Display', Georgia, 'Times New Roman', serif" font-size="140" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="4">M&amp;Y</text>

  <!-- Subtitle -->
  <text x="256" y="415" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="28" font-weight="bold" fill="#FFFFFF" opacity="0.9" text-anchor="middle" letter-spacing="8">WEDDING</text>
</svg>"""

for dest in ['public', 'dist']:
    os.makedirs(dest, exist_ok=True)
    with open(os.path.join(dest, 'favicon.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f'Wrote favicon.svg to {dest}')

# Render PNG & multi-resolution ICO using PIL
im = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
draw = ImageDraw.Draw(im)

# Circle background
draw.ellipse([8, 8, 504, 504], fill='#2B2B2B', outline='#D4AF37', width=16)
draw.ellipse([22, 22, 490, 490], outline=(255, 255, 255, 60), width=3)

# Fonts
try:
    font_large = ImageFont.truetype('georgiab.ttf', 135)
    font_small = ImageFont.truetype('arialbd.ttf', 32)
except Exception:
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Heart top motif
draw.polygon([(256, 185), (205, 135), (220, 105), (256, 125), (292, 105), (307, 135)], fill='#D4AF37')
draw.ellipse([205, 95, 240, 130], fill='#D4AF37')
draw.ellipse([272, 95, 307, 130], fill='#D4AF37')

# Text
draw.text((256, 280), "M & Y", fill='#D4AF37', font=font_large, anchor='mm')
draw.text((256, 385), "WEDDING", fill='#FFFFFF', font=font_small, anchor='mm')

for dest in ['public', 'dist']:
    png_path = os.path.join(dest, 'apple-touch-icon.png')
    im.save(png_path, 'PNG')
    
    png32 = im.resize((32, 32), Image.Resampling.LANCZOS)
    png32.save(os.path.join(dest, 'favicon-32x32.png'), 'PNG')
    
    png16 = im.resize((16, 16), Image.Resampling.LANCZOS)
    png16.save(os.path.join(dest, 'favicon-16x16.png'), 'PNG')

    ico_path = os.path.join(dest, 'favicon.ico')
    im.save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print(f'Generated favicon.ico and PNGs in {dest}')

print('All wedding monogram favicons generated successfully!')
