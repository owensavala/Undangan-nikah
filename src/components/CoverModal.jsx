import React, { useState, useEffect } from 'react';
import { MailOpen, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CoverModal({ isOpen, onOpen, data }) {
  const [guestName, setGuestName] = useState('Tamu Undangan');

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
        particleCount: 90,
        spread: 100,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#F3E5AB', '#C5A059', '#FFFFFF', '#AA771C'],
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
            transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] } 
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Background Ambient Photo with Ken Burns Motion */}
          <motion.div 
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center filter brightness-[0.35]"
            style={{ backgroundImage: `url(${data.couple.coverPhoto})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

          {/* Main Card with entrance animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 w-full max-w-[440px] mx-4 p-6 sm:p-8 text-center rounded-3xl border border-gold-400/35 bg-[#0c1512]/90 backdrop-blur-2xl shadow-2xl shadow-gold-500/10 flex flex-col items-center"
          >
            {/* Top Monogram */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center space-x-3 mb-4"
            >
              <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-gold-400" />
              <div className="w-11 h-11 rounded-full border border-gold-400/50 flex items-center justify-center text-gold-300 font-display text-sm tracking-widest bg-gold-950/50 shadow-inner">
                M & D
              </div>
              <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-gold-400" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] uppercase tracking-[0.35em] text-gold-300/80 mb-2 font-medium"
            >
              The Wedding Invitation
            </motion.p>

            {/* Arch Photo with soft float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-28 h-36 rounded-t-full rounded-b-xl overflow-hidden border-2 border-gold-400/50 shadow-2xl my-2 p-0.5 bg-gradient-to-b from-gold-400/30 to-transparent relative"
            >
              <img
                src={data.couple.quotePhoto}
                alt="Mira & Dimas"
                className="w-full h-full object-cover rounded-t-full rounded-b-lg filter contrast-[1.05]"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="font-script text-5xl sm:text-6xl text-gold-200 mt-2 mb-1 drop-shadow-md"
            >
              {data.couple.bride.shortName} <span className="text-gold-400 font-serif text-3xl">&</span> {data.couple.groom.shortName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xs font-serif italic text-gold-300/80 tracking-widest uppercase mb-4"
            >
              {data.events.dateDisplay}
            </motion.p>

            {/* Guest Greeting Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="w-full my-3 p-4 rounded-2xl bg-gold-950/40 border border-gold-400/30 shadow-inner"
            >
              <p className="text-[10px] tracking-wider text-gray-300 uppercase mb-1">
                Kpd Bpk/Ibu/Saudara/i:
              </p>
              <p className="text-lg sm:text-xl font-serif font-bold text-gold-200 tracking-wide capitalize">
                {guestName}
              </p>
              <p className="text-[10px] text-gray-400 mt-1 italic">
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di hari bahagia kami.
              </p>
            </motion.div>

            {/* Button Buka Undangan with Shimmer Sweep */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenClick}
              className="shimmer-button relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 mt-3 rounded-full font-serif text-xs tracking-widest uppercase font-bold text-gray-950 bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 shadow-xl shadow-gold-500/30"
            >
              <MailOpen className="w-4 h-4 text-gray-950" />
              <span>Buka Undangan</span>
              <Sparkles className="w-3.5 h-3.5 text-gold-900" />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-[10px] text-gray-400/80 mt-4 tracking-wider"
            >
              Sentuh tombol untuk membuka & memutar audio
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
