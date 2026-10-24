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
          className="relative z-10 flex flex-col items-center gap-1.5 text-gold-300/80 animate-bounce pb-6"
        >
          <span className="text-[10px] tracking-widest uppercase font-serif">Gulir ke Bawah</span>
          <ChevronDown className="w-4 h-4 text-gold-400" />
        </motion.div>

        {/* Mountains Curve Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-10 sm:h-14 text-[#070e0b] fill-current">
            <path opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"/>
            <path opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"/>
            <path d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"/>
          </svg>
        </div>
      </section>

      {/* 2. SURAH AR-RUM SECTION WITH SCROLL-DRIVEN ENTRANCE */}
      <section className="relative py-20 px-5 text-center overflow-hidden bg-[#070e0b]">
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] blur-[2px]"
          style={{ backgroundImage: `url(${data.couple.quotePhoto})` }}
        />
        <div className="absolute inset-0 bg-[#070e0b]/85 backdrop-blur-sm" />

        <div className="relative z-10 max-w-lg mx-auto">
          {/* Flower Bouquet Accent (Identical to reference) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4"
          >
            <img 
              src="/decorations/flower-bouquet-2.png" 
              alt="Floral Ornament" 
              className="w-full h-full object-contain filter drop-shadow-lg"
            />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs uppercase tracking-[0.25em] text-gold-400 font-bold mb-3 font-serif"
          >
            QS. Ar-Rum Ayat 21
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-arabic text-2xl sm:text-3xl text-gold-200 leading-loose mb-5 px-2"
            dir="rtl"
          >
            وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif italic text-xs sm:text-sm text-gray-300 leading-relaxed px-4 mb-8"
          >
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
          </motion.p>

          {/* Framed Couple Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full max-w-md mx-auto rounded-3xl overflow-hidden border-2 border-gold-400/50 shadow-2xl p-1 bg-gradient-to-b from-gold-400/30 to-transparent"
          >
            <img
              src={data.couple.quotePhoto}
              alt="Mira & Wahyudi Quote"
              className="w-full h-64 sm:h-80 object-cover rounded-2xl filter contrast-[1.05]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
