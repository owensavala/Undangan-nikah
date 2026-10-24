import React from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection({ data }) {
  return (
    <div className="relative">
      {/* 1. HERO HEADER WITH FULL PHOTO BACKGROUND & SMOOTH TRANSITION */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-between text-center px-4 pt-12 pb-10 overflow-hidden">
        {/* Background Photo with slow breathing Ken Burns */}
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.4]"
          style={{ backgroundImage: `url(${data.couple.coverPhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#09110e]" />

        {/* Top Monogram */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 pt-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 bg-black/50 backdrop-blur-md shadow-lg">
            <Heart className="w-3 h-3 text-gold-400 fill-gold-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-200 font-semibold">
              The Wedding Of
            </span>
            <Heart className="w-3 h-3 text-gold-400 fill-gold-400" />
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="relative z-10 my-auto py-6"
        >
          <h1 className="font-script text-6xl sm:text-7xl text-gold-100 mb-2 drop-shadow-2xl">
            {data.couple.bride.shortName} <span className="text-gold-400 font-serif text-4xl">&</span> {data.couple.groom.shortName}
          </h1>

          <div className="flex items-center justify-center gap-3 my-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
            <p className="font-serif italic text-sm text-gold-200 tracking-widest uppercase font-medium">
              {data.events.dateDisplay}
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
          </div>
        </motion.div>

        {/* Bottom Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="relative z-10 flex flex-col items-center gap-1.5 text-gold-300/80 animate-bounce"
        >
          <span className="text-[10px] tracking-widest uppercase font-serif">Gulir ke Bawah</span>
          <ChevronDown className="w-4 h-4 text-gold-400" />
        </motion.div>
      </section>

      {/* 2. SURAH AR-RUM SECTION WITH SCROLL-DRIVEN ENTRANCE */}
      <section className="relative py-20 px-5 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] blur-[2px]"
          style={{ backgroundImage: `url(${data.couple.quotePhoto})` }}
        />
        <div className="absolute inset-0 bg-[#09110e]/85 backdrop-blur-sm" />

        <div className="relative z-10 max-w-lg mx-auto">
          {/* Framed Couple Photo - Smooth Scale Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-44 h-60 sm:w-52 sm:h-72 mx-auto mb-8 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-gold-400/50 shadow-2xl p-1 bg-gradient-to-b from-gold-400/30 to-transparent"
          >
            <img
              src={data.couple.quotePhoto}
              alt="Mira & Dimas Quote"
              className="w-full h-full object-cover rounded-t-full rounded-b-xl filter contrast-[1.05]"
              loading="lazy"
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold mb-3"
          >
            {data.quotes.surah}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-xl sm:text-2xl text-gold-100 leading-relaxed mb-4"
            dir="rtl"
          >
            وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif italic text-xs sm:text-sm text-gray-300 leading-relaxed px-4"
          >
            "{data.quotes.verse}"
          </motion.p>

          <div className="h-0.5 w-14 bg-gold-400/50 mx-auto mt-6 rounded-full" />
        </div>
      </section>
    </div>
  );
}
