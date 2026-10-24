import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, Image as ImageIcon, Gift, Users, Music, 
  Save, RotateCcw, Download, Eye, Check, Layers, Palette, Lock, LogOut,
  Sliders, Sun, Send, Copy, ExternalLink, MessageCircle, Plus, Trash2
} from 'lucide-react';
import PhotoPickerModal from './PhotoPickerModal';
import { THEME_PRESETS } from '../data/themes';

export default function AdminDashboard({ data, onSave, onReset, onClosePreview, onLogout }) {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState('share'); // default to share so user can see it right away!
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [guestNameInput, setGuestNameInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [useCustomDomain, setUseCustomDomain] = useState(true);

  // Sync formData when data prop changes
  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(data)));
  }, [data]);
  
  // State for Photo Picker Modal
  const [pickerConfig, setPickerConfig] = useState({
    isOpen: false,
    title: '',
    currentPhoto: '',
    onSelect: null
  });

  const openPicker = (title, currentPhoto, onSelect) => {
    setPickerConfig({
      isOpen: true,
      title,
      currentPhoto,
      onSelect
    });
  };

  const closePicker = () => {
    setPickerConfig((prev) => ({ ...prev, isOpen: false }));
  };

  // Handle Save
  const handleSave = () => {
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Download invitationData.js file directly
  const handleDownloadCode = () => {
    const fileContent = `// Updated invitation data exported from Admin Editor\nexport const invitationData = ${JSON.stringify(formData, null, 2)};\n`;
    const blob = new Blob([fileContent], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invitationData.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentThemePreset = formData.theme?.preset || 'emerald-gold';
  const currentBrightness = formData.theme?.bgBrightness ?? 45;

  return (
    <div className="min-h-screen bg-[#070d0a] text-gray-200 font-sans pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#0d1613]/95 backdrop-blur-md border-b border-gold-400/30 px-4 py-3.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-400/50 flex items-center justify-center text-gold-300 font-display font-bold text-xs">
            EDIT
          </div>
          <div>
            <h1 className="font-serif text-sm sm:text-base font-bold text-gold-200">
              Dashboard Edit Undangan
            </h1>
            <p className="text-[10px] text-gray-400">
              Atur foto background, opasitas, informasi, dan tema
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded-xl font-serif text-xs font-bold text-black bg-gradient-to-r from-gold-200 to-gold-400 hover:from-gold-100 hover:to-gold-300 flex items-center gap-1.5 shadow-md shadow-gold-500/20 transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan</span>
          </button>

          <button
            onClick={onClosePreview}
            className="px-3.5 py-1.5 rounded-xl border border-gold-400/40 bg-gold-950/40 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-serif font-semibold flex items-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lihat Preview</span>
          </button>

          <button
            onClick={onLogout}
            className="p-1.5 rounded-xl border border-rose-500/30 bg-rose-950/30 hover:bg-rose-500 hover:text-white text-rose-300 text-xs transition-all"
            title="Kunci / Keluar Dashboard"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="bg-emerald-950/90 border-b border-emerald-400/50 p-2.5 text-center text-xs text-emerald-300 flex items-center justify-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Perubahan berhasil disimpan! Klik tombol "Lihat Preview" untuk mengecek langsung.</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        
        {/* Navigation Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 custom-scrollbar text-xs">
          {[
            { id: 'share', label: '📨 Buat Link Tamu (WA)', icon: Send },
            { id: 'backgrounds', label: '🖼️ Background Foto & Opasitas', icon: Layers },
            { id: 'gallery', label: '📷 Galeri & Mode Slider', icon: ImageIcon },
            { id: 'couple', label: '💍 Mempelai & Frame', icon: Heart },
            { id: 'theme', label: '🎨 Tema & Warna', icon: Palette },
            { id: 'events', label: '📅 Waktu & Acara', icon: Calendar },
            { id: 'story', label: '📖 Kisah Cinta', icon: Heart },
            { id: 'gift', label: '🎁 Amplop & Kado', icon: Gift },
            { id: 'family', label: '👨‍👩‍👧‍👦 Turut Mengundang', icon: Users },
            { id: 'music', label: '🎵 Musik & Kutipan', icon: Music },
            { id: 'security', label: '🔒 Keamanan & PIN', icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl whitespace-nowrap font-serif text-xs font-semibold transition-all border ${
                  isActive
                    ? 'border-gold-400 bg-gold-500 text-black shadow-lg shadow-gold-500/20'
                    : 'border-gold-400/20 bg-[#0d1613] text-gray-300 hover:border-gold-400/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB: GENERATOR LINK TAMU & WHATSAPP */}
        {/* ============================================================== */}
        {activeTab === 'share' && (() => {
          const defaultDomain = 'https://undangan-kita.online';
          const currentOrigin = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : defaultDomain;
          const baseUrl = useCustomDomain ? defaultDomain : currentOrigin;
          const guestParam = guestNameInput.trim() ? encodeURIComponent(guestNameInput.trim()) : 'Nama+Tamu';
          const generatedLink = `${baseUrl}/?to=${guestParam}`;
          
          const guestDisplayName = guestNameInput.trim() || 'Bapak/Ibu/Saudara/i';
          const waMessage = `Kepada Yth.
Bpk/Ibu/Saudara/i: *${guestDisplayName}*

Assalamu’alaikum Warahmatullaahi Wabarakaatuh.

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:

💍 *${formData.couple.bride.fullName} & ${formData.couple.groom.fullName}*
📅 *${formData.events.dateDisplay}*

Berikut tautan undangan resmi kami:
👉 ${generatedLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Wassalamu’alaikum Warahmatullaahi Wabarakaatuh.
Hormat kami,
*${formData.couple.bride.shortName} & ${formData.couple.groom.shortName}*`;

          const handleCopyLink = () => {
            navigator.clipboard.writeText(generatedLink);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2500);
          };

          const handleCopyMsg = () => {
            navigator.clipboard.writeText(waMessage);
            setCopiedMsg(true);
            setTimeout(() => setCopiedMsg(false), 2500);
          };

          const handleSendWhatsApp = () => {
            const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessage)}`;
            window.open(url, '_blank');
          };

          return (
            <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-gold-200 mb-1 flex items-center gap-2">
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Pembuat Link Nama Tamu & Pesan WhatsApp</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Cukup ketik nama tamu di bawah, link khusus dan format pesan WhatsApp akan otomatis terbuat! Anda tinggal salin atau kirim langsung ke WhatsApp.
                </p>
              </div>

              {/* Domain Selection Pill */}
              <div className="p-4 rounded-2xl bg-black/40 border border-gold-400/20 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-300 font-serif">Alamat Website untuk Link:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUseCustomDomain(true)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      useCustomDomain
                        ? 'bg-gold-500 text-black shadow-md'
                        : 'bg-black/60 border border-gold-400/30 text-gray-400 hover:text-white'
                    }`}
                  >
                    undangan-kita.online (Resmi)
                  </button>
                  <button
                    onClick={() => setUseCustomDomain(false)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      !useCustomDomain
                        ? 'bg-gold-500 text-black shadow-md'
                        : 'bg-black/60 border border-gold-400/30 text-gray-400 hover:text-white'
                    }`}
                  >
                    Domain Browser ({currentOrigin.replace(/^https?:\/\//, '')})
                  </button>
                </div>
              </div>

              {/* Form Input Guest Name */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gold-400/30 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                  1. Masukkan Nama Tamu Undangan
                </label>
                <input
                  type="text"
                  value={guestNameInput}
                  onChange={(e) => setGuestNameInput(e.target.value)}
                  placeholder="Contoh: Bpk. Ahmad Fauzi & Keluarga"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-gold-400/40 text-gold-100 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all font-medium"
                />

                {/* Quick Name Suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-400">Contoh format:</span>
                  {[
                    "Keluarga Besar Bpk. Ahmad",
                    "dr. Farhan & Rekan",
                    "Sahabat Tercinta",
                    "Teman-teman Alumni"
                  ].map((sug, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => setGuestNameInput(sug)}
                      className="px-2.5 py-0.5 rounded-full bg-gold-950/50 border border-gold-400/20 text-[10px] text-gold-300 hover:bg-gold-500 hover:text-black transition-colors"
                    >
                      + {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated Link Box */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gold-400/30 space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300">
                  2. Link Khusus Undangan Tamu
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-gold-400/25 text-gold-200 text-xs font-mono select-all truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-xl border border-gold-400/40 bg-gold-950/60 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-serif font-bold uppercase whitespace-nowrap flex items-center gap-1.5 transition-all shadow-md"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Tersalin!' : 'Salin Link'}</span>
                  </button>
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-gold-400/30 bg-gold-950/40 hover:bg-gold-500 hover:text-black text-gold-300 transition-colors"
                    title="Buka Link Ini di Tab Baru"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* WhatsApp Message Preview */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gold-400/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gold-300 flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>3. Pratinjau Teks Pesan WhatsApp</span>
                  </label>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Siap Dikirim
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#091410] border border-emerald-500/20 text-gray-200 text-xs font-sans whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto custom-scrollbar select-all">
                  {waMessage}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleCopyMsg}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl border border-gold-400/40 bg-gold-950/50 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-serif font-bold uppercase flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    {copiedMsg ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedMsg ? 'Pesan Tersalin ke Clipboard!' : 'Salin Pesan Lengkap'}</span>
                  </button>

                  <button
                    onClick={handleSendWhatsApp}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl font-serif text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Kirim Langsung ke WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ============================================================== */}
        {/* TAB: BACKGROUND FOTO & SLIDER OPASITAS */}
        {/* ============================================================== */}
        {activeTab === 'backgrounds' && (
          <div className="space-y-6">
            {/* Opacity & Brightness Slider Box */}
            <div className="p-6 rounded-3xl border border-gold-400/40 bg-gradient-to-r from-[#0d1613] to-gold-950/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-gold-400" />
                  <h3 className="font-serif text-base font-bold text-gold-200">
                    Pengatur Kecerahan / Keterlihatan Foto Background
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 font-mono font-bold text-xs">
                  {currentBrightness}% Terang
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Geser ke kanan untuk membuat semua foto latar belakang lebih terang & jelas terlihat, atau ke kiri untuk membuatnya lebih redup/gelap agar teks lebih dominan.
              </p>

              <div className="space-y-2 pt-2">
                <input
                  type="range"
                  min="20"
                  max="85"
                  value={currentBrightness}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      theme: { ...prev.theme, bgBrightness: parseInt(e.target.value) }
                    }))
                  }
                  className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-gold-400 border border-gold-400/30"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-serif">
                  <span>20% (Redup & Elegan)</span>
                  <span className="text-gold-300 font-bold">45% (Rekomendasi Seimbang)</span>
                  <span>85% (Sangat Terang)</span>
                </div>
              </div>
            </div>

            {/* List of Background Photos in all Divs */}
            <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold-200 mb-1 flex items-center gap-2">
                <Layers className="w-4 h-4 text-gold-400" />
                <span>Foto Background di Seluruh Div / Bagian Website</span>
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Setiap bagian sekarang memiliki background fotonya masing-masing. Klik tombol ganti foto untuk menyesuaikan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Background Cover Layar Pembuka", key: "coverPhoto", desc: "Foto saat tamu pertama kali membuka website" },
                  { label: "Background Seksi Ayat Ar-Rum 21", key: "quotePhoto", desc: "Latar belakang di bawah kutipan suci" },
                  { label: "Background Save The Date / Countdown", key: "countdownPhoto", desc: "Latar belakang di bawah 4 kotak hitung mundur" },
                  { label: "Background Jadwal Akad & Resepsi", key: "eventsBg", desc: "Latar belakang di seksi jadwal acara pernikahan" },
                  { label: "Background Galeri Foto", key: "galleryBg", desc: "Latar belakang di seksi galeri kenangan" },
                  { label: "Background Amplop Digital & Kado", key: "giftBg", desc: "Latar belakang di seksi nomor rekening" },
                  { label: "Background Turut Mengundang", key: "familyBg", desc: "Latar belakang daftar keluarga besar" },
                  { label: "Background RSVP & Buku Tamu", key: "rsvpBg", desc: "Latar belakang form doa restu" },
                  { label: "Background Seksi Penutup (Doa)", key: "closingPhoto", desc: "Foto romantis di bagian akhir halaman" },
                  { label: "Background Kartu Mempelai Wanita", subKey: "bride.bgPhoto", desc: "Latar belakang kartu profil wanita" },
                  { label: "Background Kartu Mempelai Pria", subKey: "groom.bgPhoto", desc: "Latar belakang kartu profil pria" },
                ].map((item, idx) => {
                  const currentImg = item.subKey 
                    ? (item.subKey === 'bride.bgPhoto' ? formData.couple.bride.bgPhoto : formData.couple.groom.bgPhoto)
                    : (formData.couple[item.key] || '/photos/cover_bg.webp');

                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-gold-400/20 flex items-center gap-4">
                      <div className="w-16 h-20 rounded-xl overflow-hidden border border-gold-400/40 shrink-0 bg-black">
                        <img src={currentImg} alt={item.label} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif font-bold text-xs text-gold-200 truncate">{item.label}</p>
                        <p className="text-[10px] text-gray-400 mb-2 truncate">{item.desc}</p>
                        <button
                          onClick={() =>
                            openPicker(`Ganti ${item.label}`, currentImg, (newUrl) => {
                              if (item.subKey === 'bride.bgPhoto') {
                                setFormData((prev) => ({
                                  ...prev,
                                  couple: { ...prev.couple, bride: { ...prev.couple.bride, bgPhoto: newUrl } }
                                }));
                              } else if (item.subKey === 'groom.bgPhoto') {
                                setFormData((prev) => ({
                                  ...prev,
                                  couple: { ...prev.couple, groom: { ...prev.couple.groom, bgPhoto: newUrl } }
                                }));
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  couple: { ...prev.couple, [item.key]: newUrl }
                                }));
                              }
                            })
                          }
                          className="px-3 py-1 rounded-lg border border-gold-400/40 text-gold-300 text-[10px] font-semibold hover:bg-gold-500 hover:text-black transition-all"
                        >
                          Ganti Foto Ini
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: GALERI FOTO & PILIHAN MODE SLIDER */}
        {/* ============================================================== */}
        {activeTab === 'gallery' && (
          <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-gold-200 mb-1 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gold-400" />
                <span>Pengaturan Tampilan Galeri Foto</span>
              </h3>
              <p className="text-xs text-gray-400">
                Pilih apakah foto galeri ingin tampil sebagai Slider / Carousel yang bisa digeser kiri-kanan, atau Grid kotak klasik.
              </p>
            </div>

            {/* Layout Mode Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    theme: { ...prev.theme, galleryLayout: 'slider' }
                  }))
                }
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  (formData.theme?.galleryLayout || 'slider') === 'slider'
                    ? 'border-gold-400 bg-gold-950/40 shadow-xl shadow-gold-500/20'
                    : 'border-gold-400/20 bg-black/40 hover:border-gold-400/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-bold text-sm text-gold-200">
                    🔄 Mode Slider / Carousel Geser (Rekomendasi)
                  </span>
                  {(formData.theme?.galleryLayout || 'slider') === 'slider' && (
                    <Check className="w-4 h-4 text-gold-400" />
                  )}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Tamu bisa menggeser foto ke kiri & kanan secara interaktif, ada tombol panah dan deretan foto thumbnail di bawahnya. Lebih rapi dan tidak memanjang ke bawah.
                </p>
              </div>

              <div
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    theme: { ...prev.theme, galleryLayout: 'grid' }
                  }))
                }
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.theme?.galleryLayout === 'grid'
                    ? 'border-gold-400 bg-gold-950/40 shadow-xl shadow-gold-500/20'
                    : 'border-gold-400/20 bg-black/40 hover:border-gold-400/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif font-bold text-sm text-gold-200">
                    ⊞ Mode Grid Kotak (Klasik)
                  </span>
                  {formData.theme?.galleryLayout === 'grid' && (
                    <Check className="w-4 h-4 text-gold-400" />
                  )}
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Semua 12 foto ditampilkan berderet ke bawah dalam susunan 2 kolom kotak foto.
                </p>
              </div>
            </div>

            {/* List of Photos */}
            <div className="pt-4 border-t border-gold-400/20">
              <h4 className="font-serif text-sm font-bold text-gold-200 mb-3">
                Koleksi 12 Foto Galeri
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {formData.gallery.map((photo, idx) => (
                  <div key={photo.id || idx} className="p-2.5 rounded-2xl bg-black/40 border border-gold-400/20 flex flex-col items-center text-center">
                    <div className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-gold-400/30 mb-2 relative group">
                      <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() =>
                          openPicker(`Ganti Foto Galeri #${idx + 1}`, photo.src, (newUrl) => {
                            const updated = [...formData.gallery];
                            updated[idx].src = newUrl;
                            setFormData((prev) => ({ ...prev, gallery: updated }));
                          })
                        }
                        className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-serif text-gold-200"
                      >
                        Ganti Foto
                      </button>
                    </div>
                    <input
                      type="text"
                      value={photo.title}
                      onChange={(e) => {
                        const updated = [...formData.gallery];
                        updated[idx].title = e.target.value;
                        setFormData((prev) => ({ ...prev, gallery: updated }));
                      }}
                      placeholder="Judul Foto"
                      className="w-full px-2 py-1 text-center rounded-lg bg-black/50 border border-gold-400/20 text-gold-100 text-[11px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: MEMPELAI & PILIHAN FRAME */}
        {/* ============================================================== */}
        {activeTab === 'couple' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-gold-200 mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-gold-400" />
                <span>Data Mempelai Wanita (Bride)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center text-center">
                  <div className="relative w-36 h-48 rounded-2xl overflow-hidden border-2 border-gold-400/50 shadow-xl mb-3">
                    <img src={formData.couple.bride.photo} alt="Preview Bride" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() =>
                      openPicker("Pilih Foto Mempelai Wanita", formData.couple.bride.photo, (url) => {
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, bride: { ...prev.couple.bride, photo: url } }
                        }));
                      })
                    }
                    className="px-3.5 py-1.5 rounded-full border border-gold-400/50 bg-gold-950/40 text-gold-200 text-xs hover:bg-gold-500 hover:text-black transition-all mb-4"
                  >
                    Ganti Foto Wanita
                  </button>

                  <div className="w-full text-left">
                    <label className="block text-[11px] font-semibold text-gold-300 uppercase tracking-wider mb-1.5">
                      Pilihan Bentuk Frame Foto:
                    </label>
                    <select
                      value={formData.couple.bride.frameStyle || 'arch'}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, bride: { ...prev.couple.bride, frameStyle: e.target.value } }
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-200 text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="arch">Lengkung Kerajaan (Royal Arch)</option>
                      <option value="oval">Oval Klasik Mewah (Classic Oval)</option>
                      <option value="rounded">Modern Minimalis (Rounded 3XL)</option>
                      <option value="polaroid">Vintage Polaroid Frame</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                      Nama Lengkap & Gelar
                    </label>
                    <input
                      type="text"
                      value={formData.couple.bride.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, bride: { ...prev.couple.bride, fullName: e.target.value } }
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                      Nama Panggilan (Short Name)
                    </label>
                    <input
                      type="text"
                      value={formData.couple.bride.shortName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, bride: { ...prev.couple.bride, shortName: e.target.value } }
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                      Nama Orang Tua & Keterangan
                    </label>
                    <textarea
                      rows={2}
                      value={formData.couple.bride.parents}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, bride: { ...prev.couple.bride, parents: e.target.value } }
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                      Username Instagram (tanpa @)
                    </label>
                    <input
                      type="text"
                      value={formData.couple.bride.instagram}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, bride: { ...prev.couple.bride, instagram: e.target.value } }
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mempelai Pria */}
            <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-gold-200 mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-gold-400" />
                <span>Data Mempelai Pria (Groom)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 flex flex-col items-center text-center">
                  <div className="relative w-36 h-48 rounded-2xl overflow-hidden border-2 border-gold-400/50 shadow-xl mb-3">
                    <img src={formData.couple.groom.photo} alt="Preview Groom" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() =>
                      openPicker("Pilih Foto Mempelai Pria", formData.couple.groom.photo, (url) => {
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, groom: { ...prev.couple.groom, photo: url } }
                        }));
                      })
                    }
                    className="px-3.5 py-1.5 rounded-full border border-gold-400/50 bg-gold-950/40 text-gold-200 text-xs hover:bg-gold-500 hover:text-black transition-all mb-4"
                  >
                    Ganti Foto Pria
                  </button>

                  <div className="w-full text-left">
                    <label className="block text-[11px] font-semibold text-gold-300 uppercase tracking-wider mb-1.5">
                      Pilihan Bentuk Frame Foto:
                    </label>
                    <select
                      value={formData.couple.groom.frameStyle || 'arch'}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, groom: { ...prev.couple.groom, frameStyle: e.target.value } }
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-200 text-xs focus:outline-none focus:border-gold-400"
                    >
                      <option value="arch">Lengkung Kerajaan (Royal Arch)</option>
                      <option value="oval">Oval Klasik Mewah (Classic Oval)</option>
                      <option value="rounded">Modern Minimalis (Rounded 3XL)</option>
                      <option value="polaroid">Vintage Polaroid Frame</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                      Nama Lengkap & Gelar
                    </label>
                    <input
                      type="text"
                      value={formData.couple.groom.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, groom: { ...prev.couple.groom, fullName: e.target.value } }
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                      Nama Panggilan (Short Name)
                    </label>
                    <input
                      type="text"
                      value={formData.couple.groom.shortName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, groom: { ...prev.couple.groom, shortName: e.target.value } }
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                      Nama Orang Tua & Keterangan
                    </label>
                    <textarea
                      rows={2}
                      value={formData.couple.groom.parents}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, groom: { ...prev.couple.groom, parents: e.target.value } }
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                      Username Instagram (tanpa @)
                    </label>
                    <input
                      type="text"
                      value={formData.couple.groom.instagram}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          couple: { ...prev.couple, groom: { ...prev.couple.groom, instagram: e.target.value } }
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TEMA */}
        {activeTab === 'theme' && (
          <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-gold-200 mb-1 flex items-center gap-2">
                <Palette className="w-4 h-4 text-gold-400" />
                <span>Pilihan Palet Warna Tema Undangan</span>
              </h3>
              <p className="text-xs text-gray-400">
                Pilih palet warna yang paling disukai. Seluruh font, garis emas, tombol, dan kartu akan otomatis berganti mengikuti warna pilihan Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {THEME_PRESETS.map((preset) => {
                const isSelected = currentThemePreset === preset.id;
                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        theme: { ...prev.theme, preset: preset.id }
                      }));
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative ${
                      isSelected
                        ? 'border-gold-400 bg-gold-950/40 shadow-xl shadow-gold-500/20 scale-[1.02]'
                        : 'border-gold-400/20 bg-black/40 hover:border-gold-400/50 hover:bg-black/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {preset.previewColors.map((color, cIdx) => (
                        <span key={cIdx} className="w-6 h-6 rounded-full border border-white/30 shadow-md" style={{ backgroundColor: color }} />
                      ))}
                    </div>

                    <p className="font-serif font-bold text-sm text-gold-100 mb-1">{preset.name}</p>
                    <p className="text-[11px] text-gray-300 leading-relaxed">{preset.description}</p>

                    {isSelected && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-gold-500 text-black font-bold uppercase tracking-wider">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Dipilih</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB: ACARA */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold-200 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>Pengaturan Tanggal Target & Akad Nikah</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Target Tanggal Hitung Mundur</label>
                  <input
                    type="text"
                    value={formData.events.targetDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, targetDate: e.target.value } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Format Tanggal Display (Teks)</label>
                  <input
                    type="text"
                    value={formData.events.dateDisplay}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, dateDisplay: e.target.value } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gold-400/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Waktu / Jam Akad</label>
                  <input
                    type="text"
                    value={formData.events.akad.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, akad: { ...prev.events.akad, time: e.target.value } } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Nama Gedung / Lokasi Akad</label>
                  <input
                    type="text"
                    value={formData.events.akad.venue}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, akad: { ...prev.events.akad, venue: e.target.value } } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Alamat Lengkap Akad</label>
                  <input
                    type="text"
                    value={formData.events.akad.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, akad: { ...prev.events.akad, address: e.target.value } } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Link Google Maps Lokasi</label>
                  <input
                    type="text"
                    value={formData.events.akad.googleMapsUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, akad: { ...prev.events.akad, googleMapsUrl: e.target.value } } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-4">
              <h3 className="font-serif text-lg font-bold text-gold-200 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                <span>Pengaturan Resepsi Pernikahan</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Waktu / Jam Resepsi</label>
                  <input
                    type="text"
                    value={formData.events.reception.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, reception: { ...prev.events.reception, time: e.target.value } } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Nama Gedung / Lokasi Resepsi</label>
                  <input
                    type="text"
                    value={formData.events.reception.venue}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, reception: { ...prev.events.reception, venue: e.target.value } } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">Alamat Lengkap Resepsi</label>
                  <input
                    type="text"
                    value={formData.events.reception.address}
                    onChange={(e) => setFormData((prev) => ({ ...prev, events: { ...prev.events, reception: { ...prev.events.reception, address: e.target.value } } }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: KISAH CINTA */}
        {activeTab === 'story' && (
          <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-gold-200 mb-1 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-gold-400" />
                  <span>Kisah Cinta (Love Story)</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Ubah babak perjalanan kisah cinta Anda, tahun, foto, dan cerita deskripsinya.
                </p>
              </div>
              <button
                onClick={() => {
                  const newStory = {
                    year: "2026",
                    title: "Babak Baru",
                    description: "Tuliskan cerita perjalanan kisah cinta Anda di sini...",
                    image: "/photos/story_1.webp"
                  };
                  setFormData((prev) => ({
                    ...prev,
                    loveStory: [...prev.loveStory, newStory]
                  }));
                }}
                className="px-3.5 py-1.5 rounded-xl border border-gold-400/40 bg-gold-950/30 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-serif font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Babak</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.loveStory.map((story, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-gold-400/20 grid grid-cols-1 sm:grid-cols-4 gap-4 items-start relative">
                  {/* Delete button if more than 1 item */}
                  {formData.loveStory.length > 1 && (
                    <button
                      onClick={() => {
                        const updated = formData.loveStory.filter((_, i) => i !== idx);
                        setFormData((prev) => ({ ...prev, loveStory: updated }));
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                      title="Hapus Babak Ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div className="sm:col-span-1 flex flex-col items-center text-center pt-1">
                    <div className="w-24 h-32 rounded-xl overflow-hidden border border-gold-400/40 mb-2 bg-black">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() =>
                        openPicker(`Ganti Foto Babak ${idx + 1}`, story.image, (newUrl) => {
                          const updated = [...formData.loveStory];
                          updated[idx].image = newUrl;
                          setFormData((prev) => ({ ...prev, loveStory: updated }));
                        })
                      }
                      className="px-2.5 py-1 rounded-lg border border-gold-400/40 text-gold-300 text-[10px] hover:bg-gold-500 hover:text-black transition-all cursor-pointer"
                    >
                      Ganti Foto
                    </button>
                  </div>

                  <div className="sm:col-span-3 space-y-3 pr-6 sm:pr-8">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Tahun</label>
                        <input
                          type="text"
                          value={story.year}
                          onChange={(e) => {
                            const updated = [...formData.loveStory];
                            updated[idx].year = e.target.value;
                            setFormData((prev) => ({ ...prev, loveStory: updated }));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Judul Babak</label>
                        <input
                          type="text"
                          value={story.title}
                          onChange={(e) => {
                            const updated = [...formData.loveStory];
                            updated[idx].title = e.target.value;
                            setFormData((prev) => ({ ...prev, loveStory: updated }));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400 font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">Kisah / Cerita Babak Ini</label>
                      <textarea
                        rows={5}
                        value={story.description}
                        onChange={(e) => {
                          const updated = [...formData.loveStory];
                          updated[idx].description = e.target.value;
                          setFormData((prev) => ({ ...prev, loveStory: updated }));
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400 resize-y leading-relaxed font-sans"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => {
                  const newStory = {
                    year: "2026",
                    title: "Babak Baru",
                    description: "Tuliskan cerita perjalanan kisah cinta Anda di sini...",
                    image: "/photos/story_1.webp"
                  };
                  setFormData((prev) => ({
                    ...prev,
                    loveStory: [...prev.loveStory, newStory]
                  }));
                }}
                className="w-full py-3 rounded-2xl border border-dashed border-gold-400/50 bg-gold-950/20 text-gold-300 hover:bg-gold-500 hover:text-black font-serif text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Tambah Babak Cerita Baru</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB: AMPLOP & KADO */}
        {activeTab === 'gift' && (
          <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-gold-200 mb-1 flex items-center gap-2">
                  <Gift className="w-4 h-4 text-gold-400" />
                  <span>Amplop Digital & Alamat Pengiriman Kado</span>
                </h3>
                <p className="text-xs text-gray-400">
                  Atur nomor rekening transfer bank, e-wallet, dan alamat fisik tujuan kirim kado.
                </p>
              </div>
              <button
                onClick={() => {
                  const newGift = {
                    bank: "Bank BCA",
                    accountNumber: "",
                    accountName: "MIRA KADIR"
                  };
                  setFormData((prev) => ({
                    ...prev,
                    giftInfo: [...prev.giftInfo, newGift]
                  }));
                }}
                className="px-3.5 py-1.5 rounded-xl border border-gold-400/40 bg-gold-950/30 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-serif font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Rekening</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.giftInfo.map((gift, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-gold-400/20 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center relative">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Nama Bank / E-Wallet</label>
                    <input
                      type="text"
                      value={gift.bank}
                      onChange={(e) => {
                        const updated = [...formData.giftInfo];
                        updated[idx].bank = e.target.value;
                        setFormData((prev) => ({ ...prev, giftInfo: updated }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Nomor Rekening</label>
                    <input
                      type="text"
                      value={gift.accountNumber}
                      onChange={(e) => {
                        const updated = [...formData.giftInfo];
                        updated[idx].accountNumber = e.target.value;
                        setFormData((prev) => ({ ...prev, giftInfo: updated }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Atas Nama (A.N)</label>
                    <input
                      type="text"
                      value={gift.accountName}
                      onChange={(e) => {
                        const updated = [...formData.giftInfo];
                        updated[idx].accountName = e.target.value;
                        setFormData((prev) => ({ ...prev, giftInfo: updated }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs uppercase"
                    />
                  </div>
                  <div className="flex sm:justify-center">
                    {formData.giftInfo.length > 1 && (
                      <button
                        onClick={() => {
                          const updated = formData.giftInfo.filter((_, i) => i !== idx);
                          setFormData((prev) => ({ ...prev, giftInfo: updated }));
                        }}
                        className="px-3 py-2 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white text-xs flex items-center gap-1 transition-all cursor-pointer"
                        title="Hapus Rekening Ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="sm:hidden">Hapus</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gold-400/20 space-y-3">
              <h4 className="font-serif text-sm font-bold text-gold-200">
                Alamat Kirim Kado Fisik
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Nama Penerima</label>
                  <input
                    type="text"
                    value={formData.giftAddress.receiver}
                    onChange={(e) => setFormData((prev) => ({ ...prev, giftAddress: { ...prev.giftAddress, receiver: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">No. Handphone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.giftAddress.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, giftAddress: { ...prev.giftAddress, phone: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1">Alamat Lengkap Pengiriman</label>
                  <textarea
                    rows={2}
                    value={formData.giftAddress.fullAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, giftAddress: { ...prev.giftAddress, fullAddress: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-gold-400/30 text-gold-100 text-xs resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TURUT MENGUNDANG */}
        {activeTab === 'family' && (
          <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-6">
            <h3 className="font-serif text-lg font-bold text-gold-200 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-gold-400" />
              <span>Daftar Keluarga Besar Turut Mengundang</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-serif font-bold text-gold-300 mb-1.5 uppercase">
                  Pihak Mempelai Wanita (Pisahkan tiap baris)
                </label>
                <textarea
                  rows={8}
                  value={formData.turutMengundang.brideSide.join('\n')}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      turutMengundang: {
                        ...prev.turutMengundang,
                        brideSide: e.target.value.split('\n')
                      }
                    }))
                  }
                  className="w-full p-3 rounded-2xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-serif font-bold text-gold-300 mb-1.5 uppercase">
                  Pihak Mempelai Pria (Pisahkan tiap baris)
                </label>
                <textarea
                  rows={8}
                  value={formData.turutMengundang.groomSide.join('\n')}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      turutMengundang: {
                        ...prev.turutMengundang,
                        groomSide: e.target.value.split('\n')
                      }
                    }))
                  }
                  className="w-full p-3 rounded-2xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: MUSIK */}
        {activeTab === 'music' && (
          <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-gold-200 mb-2 flex items-center gap-2">
              <Music className="w-4 h-4 text-gold-400" />
              <span>Musik Pengiring & Kutipan Doa</span>
            </h3>

            <div>
              <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                URL Lagu Audio Pengiring (.mp3)
              </label>
              <input
                type="text"
                value={formData.audioUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, audioUrl: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                Nama Surah / Referensi Doa
              </label>
              <input
                type="text"
                value={formData.quotes.surah}
                onChange={(e) => setFormData((prev) => ({ ...prev, quotes: { ...prev.quotes, surah: e.target.value } }))}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                Terjemahan Teks Ayat
              </label>
              <textarea
                rows={3}
                value={formData.quotes.verse}
                onChange={(e) => setFormData((prev) => ({ ...prev, quotes: { ...prev.quotes, verse: e.target.value } }))}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400 resize-none"
              />
            </div>
          </div>
        )}

        {/* TAB: KEAMANAN & PIN */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl space-y-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-gold-200 mb-1 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gold-400" />
                <span>Pengaturan Kunci Keamanan & PIN</span>
              </h3>
              <p className="text-xs text-gray-400">
                PIN ini digunakan untuk mengunci halaman edit agar orang lain / tamu tidak bisa sembarangan mengubah data pernikahan.
              </p>
            </div>

            <div className="max-w-md space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gold-300 mb-1.5 uppercase tracking-wider">
                  PIN Akses Editor Saat Ini
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={formData.security?.pin || "1212"}
                  onChange={(e) => setFormData((prev) => ({ ...prev, security: { ...prev.security, pin: e.target.value } }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold-400/40 text-gold-100 font-mono text-sm tracking-widest focus:outline-none focus:border-gold-400"
                />
                <p className="text-[11px] text-gray-400 mt-1.5">
                  Bisa angka atau huruf (contoh: <strong>1212</strong>, <strong>mira2026</strong>, <strong>bacan2026</strong>).
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl font-serif text-xs font-bold uppercase text-black bg-gradient-to-r from-gold-200 to-gold-400 hover:from-gold-100 hover:to-gold-300 transition-all shadow-md"
                >
                  Simpan PIN Baru
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BAR */}
        <div className="mt-8 p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-3 rounded-2xl font-serif text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 hover:from-gold-100 hover:to-gold-300 flex items-center gap-2 shadow-lg shadow-gold-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>

            <button
              onClick={handleDownloadCode}
              className="px-4 py-3 rounded-2xl border border-gold-400/40 bg-gold-950/40 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-serif font-semibold flex items-center gap-2 transition-all"
              title="Download file invitationData.js siap pakai untuk hosting"
            >
              <Download className="w-4 h-4" />
              <span>Download File invitationData.js</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Apakah Anda yakin ingin mereset semua data kembali ke default awal?")) {
                onReset();
              }
            }}
            className="text-xs text-rose-400/80 hover:text-rose-300 underline font-sans flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Pengaturan Awal</span>
          </button>
        </div>

      </div>

      {/* Visual Photo Picker Modal */}
      <PhotoPickerModal
        isOpen={pickerConfig.isOpen}
        onClose={closePicker}
        title={pickerConfig.title}
        currentPhoto={pickerConfig.currentPhoto}
        onSelect={pickerConfig.onSelect}
      />
    </div>
  );
}
