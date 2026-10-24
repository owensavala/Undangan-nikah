import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquareHeart, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_WISHES = [
  {
    id: 1,
    name: 'dr. Farhan & Istri',
    attendance: 'hadir',
    pax: '2 Orang',
    message: 'Barakallahu lakum wa baraka alaikum wa jama\'a bainakuma fii khoir. Selamat menempuh hidup baru dr. Mira dan Mas Wahyudi! Semoga sakinah mawaddah warahmah.',
    date: '10 menit yang lalu'
  },
  {
    id: 2,
    name: 'Keluarga Besar Brawijaya',
    attendance: 'hadir',
    pax: '2 Orang',
    message: 'Selamat untuk kedua mempelai yang sangat serasi. Semoga Allah SWT senantiasa melimpahkan berkah dan kebahagiaan tak berujung.',
    date: '35 menit yang lalu'
  },
  {
    id: 3,
    name: 'Rian & Rekan Kampus',
    attendance: 'hadir',
    pax: '1 Orang',
    message: 'Lancar sampai hari H bro Wahyudi & mbak Mira! Selamat berbahagia selamanya!',
    date: '1 jam yang lalu'
  }
];

export default function RsvpSection({ data }) {
  const [wishes, setWishes] = useState(INITIAL_WISHES);
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'hadir',
    pax: '1 Orang',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const brightness = (data?.theme?.bgBrightness ?? 45) / 100;

  useEffect(() => {
    const saved = localStorage.getItem('wedding_wishes_mira_wahyudi');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const newWish = {
      id: Date.now(),
      name: formData.name,
      attendance: formData.attendance,
      pax: formData.pax,
      message: formData.message,
      date: 'Baru saja'
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes_mira_wahyudi', JSON.stringify(updated));

    setFormData({
      name: '',
      attendance: 'hadir',
      pax: '1 Orang',
      message: ''
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative py-20 px-4 border-t border-gold-400/20 overflow-hidden">
      {/* Full Photo Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${data?.couple?.rsvpBg || '/photos/collage_5.webp'})`,
          filter: `brightness(${brightness})`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09110e]/95 via-[#09110e]/80 to-[#09110e]/95 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-400 font-semibold">
            Ucapan & Kehadiran
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gold-100 mt-1 mb-2">
            Buku Tamu / RSVP
          </h2>
          <div className="h-0.5 w-12 bg-gold-400/50 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {/* Form RSVP */}
          <div className="p-6 rounded-3xl border border-gold-400/35 bg-[#0d1613]/85 backdrop-blur-xl shadow-xl">
            <h3 className="font-serif text-lg font-bold text-gold-200 mb-4 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-gold-400" />
              <span>Konfirmasi Kehadiran</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Hendy Pratama & Rekan"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold-400/30 text-gold-100 placeholder-gray-500 text-xs focus:outline-none focus:border-gold-400 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                    Kehadiran
                  </label>
                  <select
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0e1713] border border-gold-400/30 text-gold-200 text-xs focus:outline-none focus:border-gold-400"
                  >
                    <option value="hadir">Pasti Hadir</option>
                    <option value="ragu">Masih Ragu</option>
                    <option value="tidak">Tidak Hadir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                    Jumlah Tamu
                  </label>
                  <select
                    value={formData.pax}
                    onChange={(e) => setFormData({ ...formData, pax: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0e1713] border border-gold-400/30 text-gold-200 text-xs focus:outline-none focus:border-gold-400"
                  >
                    <option value="1 Orang">1 Orang</option>
                    <option value="2 Orang">2 Orang</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gold-300 mb-1 uppercase tracking-wider">
                  Doa & Ucapan *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan ucapan dan doa tulus untuk kedua mempelai..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-gold-400/30 text-gold-100 placeholder-gray-500 text-xs focus:outline-none focus:border-gold-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-serif text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 hover:from-gold-100 hover:to-gold-300 flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Konfirmasi & Doa</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-400/50 flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Terima kasih! Ucapan Anda telah tersimpan.</span>
                </div>
              )}
            </form>
          </div>

          {/* List of Wishes */}
          <div className="p-6 rounded-3xl border border-gold-400/35 bg-[#0d1613]/85 backdrop-blur-xl shadow-xl max-h-[460px] flex flex-col">
            <h3 className="font-serif text-lg font-bold text-gold-200 mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MessageSquareHeart className="w-5 h-5 text-gold-400" />
                <span>Doa Restu ({wishes.length})</span>
              </span>
            </h3>

            <div className="space-y-3 overflow-y-auto pr-1 flex-1 custom-scrollbar text-left">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-black/50 border border-gold-400/20"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-serif font-bold text-xs text-gold-100">
                      {item.name}
                    </p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                      item.attendance === 'hadir'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                    }`}>
                      {item.attendance === 'hadir' ? 'Hadir' : 'Berhalangan'}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                    {item.message}
                  </p>
                  <p className="text-[9px] text-gray-500 text-right mt-1">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
