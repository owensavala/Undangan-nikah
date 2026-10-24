import React from 'react';
import { motion } from 'framer-motion';

export default function TurutMengundangSection({ data }) {
  const { brideSide, groomSide } = data.turutMengundang;
  const brightness = (data.theme?.bgBrightness ?? 45) / 100;

  return (
    <section className="relative py-20 px-4 border-t border-gold-400/20 overflow-hidden">
      {/* Full Photo Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${data.couple.familyBg || '/photos/story_3.webp'})`,
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
          className="text-center mb-10"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-400 font-semibold">
            Keluarga Besar
          </span>
          <h2 className="font-serif text-3xl text-gold-100 mt-1 mb-2">
            Turut Mengundang
          </h2>
          <div className="h-0.5 w-12 bg-gold-400/50 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {/* Pihak Mempelai Wanita */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 rounded-3xl border border-gold-400/35 bg-[#0d1613]/85 backdrop-blur-xl text-center shadow-xl"
          >
            <p className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-4 font-serif">
              Pihak Mempelai Wanita
            </p>
            <ul className="space-y-1.5 text-xs text-gray-200">
              {brideSide.map((person, idx) => (
                <li key={idx} className="leading-relaxed">
                  {idx + 1}. {person}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pihak Mempelai Pria */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="p-6 rounded-3xl border border-gold-400/35 bg-[#0d1613]/85 backdrop-blur-xl text-center shadow-xl"
          >
            <p className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-4 font-serif">
              Pihak Mempelai Pria
            </p>
            <ul className="space-y-1.5 text-xs text-gray-200">
              {groomSide.map((person, idx) => (
                <li key={idx} className="leading-relaxed">
                  {idx + 1}. {person}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
