import React, { useState, useEffect } from 'react';
import { MailOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CoverModal({ isOpen, onOpen, data }) {
  const [guestName, setGuestName] = useState('Mira & Calon');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to') || params.get('guest');
    if (to) {
      setGuestName(decodeURIComponent(to).replace(/\+/g, ' '));
    }
  }, []);

  const handleOpenClick = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#FFFFFF', '#D4AF37', '#E5E7EB', '#C5A059'],
      });
    } catch (e) {}
    onOpen();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          exit={{ 
            y: '-100%', 
            opacity: 0.95,
            transition: { duration: 1.0, ease: [0.77, 0, 0.175, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-end sm:justify-center bg-black overflow-hidden"
        >
          {/* Full Screen Bleed Background Photo (Matching van-dan-rama) */}
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.65]"
            style={{ backgroundImage: `url(${data.couple.coverPhoto})` }}
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />

          {/* Centered Cover Content (Matching reference screenshot 1) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 w-full max-w-sm px-6 pb-16 sm:pb-8 text-center text-white flex flex-col items-center"
          >
            <p className="font-serif italic text-sm tracking-wider text-white/90 mb-1">
              The Invitation of
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-wide drop-shadow-md mb-2">
              {data.couple.bride.shortName} & {data.couple.groom.shortName}
            </h1>

            <p className="text-xs text-white/80 font-sans tracking-widest mb-6">
              {data.events.dateDisplay}
            </p>

            {/* Guest Box */}
            <div className="w-full my-2 text-center">
              <p className="text-[11px] text-white/80 uppercase tracking-wider mb-1">
                Kpd Bpk/Ibu/Saudara/i
              </p>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide mb-2 drop-shadow">
                {guestName}
              </h2>
              <p className="text-[11px] text-white/80 leading-relaxed max-w-xs mx-auto">
                Tanpa Mengurangi Rasa Hormat, Kami Mengundang<br />Anda Untuk Hadir di Acara Kami.
              </p>
            </div>

            {/* Button Buka Undangan (Crisp white border button matching van-dan-rama) */}
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255, 255, 255, 0.9)', color: '#000000' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleOpenClick}
              className="mt-6 border border-white/80 bg-black/50 text-white font-serif text-xs uppercase tracking-widest px-7 py-3 rounded-lg inline-flex items-center gap-2.5 shadow-2xl transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <MailOpen className="w-4 h-4" />
              <span>Buka Undangan</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
