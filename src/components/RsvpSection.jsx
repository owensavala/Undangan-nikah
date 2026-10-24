import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { motion } from 'framer-motion';

const INITIAL_WISHES = [
  {
    id: 1,
    name: 'dr. Farhan & Istri',
    attendance: 'hadir',
    message: 'Barakallahu lakum wa baraka alaikum wa jama\'a bainakuma fii khoir. Selamat menempuh hidup baru dr. Mira dan Mas Wahyudi! Semoga sakinah mawaddah warahmah.',
    date: '10 menit yang lalu'
  },
  {
    id: 2,
    name: 'Keluarga Besar Brawijaya',
    attendance: 'hadir',
    message: 'Selamat untuk kedua mempelai yang sangat serasi. Semoga Allah SWT senantiasa melimpahkan berkah dan kebahagiaan tak berujung.',
    date: '35 menit yang lalu'
  },
  {
    id: 3,
    name: 'Rian & Rekan Kampus',
    attendance: 'hadir',
    message: 'Lancar sampai hari H bro Wahyudi & mbak Mira! Selamat berbahagia selamanya!',
    date: '1 jam yang lalu'
  }
];

export default function RsvpSection() {
  const [wishes, setWishes] = useState(INITIAL_WISHES);
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'hadir',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

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
      message: formData.message,
      date: 'Baru saja'
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes_mira_wahyudi', JSON.stringify(updated));

    setFormData({
      name: '',
      attendance: 'hadir',
      message: ''
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="guestbook" className="relative py-16 px-4 bg-white text-gray-800 text-center border-t border-gray-100">
      <div className="relative z-10 max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 mb-2">
            Ucapan &amp; Doa Restu
          </h2>
          <div className="h-[1px] w-14 bg-gray-300 mx-auto mb-3" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Berikan doa dan ucapan terbaik untuk kedua mempelai
          </p>
        </motion.div>

        {/* RSVP Form */}
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-left mb-8 shadow-sm">
          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Nama Anda
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Contoh: Bpk. Ahmad & Keluarga"
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-xs focus:ring-1 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Konfirmasi Kehadiran
            </label>
            <select
              value={formData.attendance}
              onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-xs focus:ring-1 focus:ring-gray-900 focus:outline-none"
            >
              <option value="hadir">Hadir</option>
              <option value="tidak_hadir">Maaf, Tidak Bisa Hadir</option>
              <option value="ragu">Masih Ragu</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
              Ucapan &amp; Doa
            </label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tuliskan ucapan dan doa terbaik..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-xs focus:ring-1 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#2B2B2B] hover:bg-black text-white text-xs font-serif uppercase tracking-wider font-medium flex items-center justify-center gap-2 shadow transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Ucapan</span>
          </button>

          {submitted && (
            <div className="mt-3 p-2 rounded bg-emerald-50 text-emerald-700 text-xs text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Terima kasih atas doa restunya!</span>
            </div>
          )}
        </form>

        {/* Wishes List */}
        <div className="space-y-3 max-h-72 overflow-y-auto text-left pr-1">
          {wishes.map((w) => (
            <div key={w.id} className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-gray-900">{w.name}</span>
                <span className="text-[10px] text-gray-400">{w.date}</span>
              </div>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mb-1.5 font-medium ${
                w.attendance === 'hadir' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'
              }`}>
                {w.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
              </span>
              <p className="text-xs text-gray-700 leading-relaxed font-sans">{w.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
