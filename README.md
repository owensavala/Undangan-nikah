<div align="center">

# 💌 Interactive Digital Wedding Invitation
### Modern, Elegant & Animated Web Invitation Platform

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

<p align="center">
  Aplikasi undangan pernikahan digital interaktif dengan desain mobile-first, animasi transisi halus berbasis <b>Framer Motion</b>, efek selebrasi <b>Canvas Confetti</b>, pemutar musik latar terintegrasi, serta modul RSVP & amplop digital.
</p>

</div>

---

## ✨ Fitur Unggulan

* **Smooth Micro-Animations:** Didukung oleh **Framer Motion** untuk efek buka undangan, transisi section, dan interaksi yang halus.
* **Celebration Effects:** Efek konfeti interaktif menggunakan **Canvas Confetti** saat tamu membuka sampul undangan.
* **Background Audio Player:** Pemutar audio latar responsif dengan kontrol putar/jeda mengambang (*floating music controller*).
* **Love Story & Gallery:** Linimasa kisah cinta mempelai serta galeri foto pre-wedding dengan transisi responsif.
* **Event Countdown & Maps:** Hitung mundur waktu menuju akad & resepsi serta integrasi Google Maps navigasi rute ke lokasi acara.
* **Digital Envelope & Gift:** Fitur salin nomor rekening instan untuk amplop digital dan pengiriman hadiah cashless.
* **Konfirmasi Kehadiran (RSVP) & Ucapan:** Formulir ucapan selamat dan konfirmasi kehadiran tamu secara interaktif.

---

## 🛠 Tech Stack

| Lapisan | Pustaka / Teknologi |
| :--- | :--- |
| **Framework UI** | [React 18](https://react.dev) |
| **Build Tool & Bundler** | [Vite 6](https://vitejs.dev) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com) + PostCSS + Autoprefixer |
| **Animasi & Interaksi** | [Framer Motion](https://www.framer.com/motion/) |
| **Efek Visual** | `canvas-confetti` |
| **Ikonografi** | `lucide-react` |
| **Utility** | `clsx` & `tailwind-merge` |

---

## ⚙️ Petunjuk Menjalankan Proyek

### Prasyarat:
* Node.js (versi 18 ke atas disarankan)
* npm atau yarn / pnpm

### Langkah Instalasi:

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/owensavala/Undangan-nikah.git
   cd Undangan-nikah
   ```

2. **Install Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan (Dev Mode):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173` dengan fitur *Hot Module Replacement (HMR)* aktif.

4. **Kompilasi untuk Produksi (Build):**
   ```bash
   npm run build
   ```
   Hasil build siap saji akan dibuat di folder `dist/` dan siap dideploy ke Vercel, Netlify, atau GitHub Pages.

---

## 📂 Struktur Direktori

```text
Undangan-nikah/
├── src/
│   ├── components/        # Komponen React (Cover, Couple, Event, RSVP, Audio, dll.)
│   ├── assets/            # Berkas gambar, audio latar, dan ikon
│   ├── App.jsx            # Komponen root aplikasi
│   └── main.jsx           # Entry point Vite React
├── public/                # Asset statis publik
├── tailwind.config.js     # Konfigurasi custom tema & warna Tailwind
├── vite.config.js         # Konfigurasi build Vite & plugin React
└── package.json           # Dependensi & skrip proyek
```

---

## 👨‍💻 Pengembang

* **Muh. Sattar Barakati** ([@owensavala](https://github.com/owensavala))
  * Website: [muhsattarbarakati.my.id](https://muhsattarbarakati.my.id)
  * WhatsApp: [0852-1840-3629](https://wa.me/6285218403629)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
