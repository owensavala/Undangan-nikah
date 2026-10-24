import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ data }) {
  return (
    <div id="home" className="relative">
      {/* 1. HERO TOP: FULL PHOTO WITH ELEGANT SERIF & MOUNTAINS BOTTOM DIVIDER */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-20 overflow-hidden">
        {/* Full Screen Background Photo */}
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.7]"
          style={{ backgroundImage: `url(${data.couple.coverPhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75" />

        {/* Top Text */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-4"
        >
          <p className="font-serif italic text-sm tracking-widest text-white/90">
            The Wedding Of
          </p>
        </motion.div>

        {/* Hero Title (Matching reference van-dan-rama serif font) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 py-6"
        >
          <h1 className="font-serif text-4xl sm:text-5xl text-white font-medium tracking-wide drop-shadow-lg mb-3">
            {data.couple.bride.shortName} & {data.couple.groom.shortName}
          </h1>
          <p className="font-serif text-xs text-white/90 tracking-widest uppercase">
            {data.events.dateDisplay}
          </p>
        </motion.div>

        {/* Mountains Curve Shape Divider (Seamlessly merges into the pure white Surah section) */}
        <div className="absolute -bottom-1 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1000 100" 
            preserveAspectRatio="none" 
            className="w-full h-10 sm:h-14 text-white fill-current rotate-180 translate-y-[2px]"
          >
            <path opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"/>
            <path opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"/>
            <path d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"/>
          </svg>
        </div>
      </section>

      {/* 2. SURAH AR-RUM SECTION: PURE WHITE BACKGROUND */}
      <section className="relative py-16 px-5 text-center bg-white text-gray-800 overflow-hidden">
        <div className="relative z-10 max-w-md mx-auto">
          {/* Flower Bouquet Ornament */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3"
          >
            <img 
              src="/decorations/flower-bouquet-2.png" 
              alt="Flower Bouquet" 
              className="w-full h-full object-contain mx-auto"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-sm sm:text-base font-bold text-gray-900 tracking-wider mb-4"
          >
            QS. Ar-Rum Ayat 21
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-arabic text-xl sm:text-2xl text-gray-900 leading-loose mb-5 px-2"
            dir="rtl"
          >
            وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-xs text-gray-600 leading-relaxed px-2 mb-8"
          >
            Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          </motion.p>

          {/* Wide Landscape Couple Photo Sitting on White Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={data.couple.quotePhoto}
              alt="Mira & Wahyudi"
              className="w-full h-56 sm:h-72 object-cover filter contrast-[1.02]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
