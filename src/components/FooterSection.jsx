import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FooterSection({ data }) {
  return (
    <footer className="relative py-24 px-4 text-center overflow-hidden border-t border-gold-400/20">
      {/* Full Photo Background with Ken Burns */}
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: 1.07 }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.25]"
        style={{ backgroundImage: `url(${data.couple.closingPhoto})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/90" />

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-12 h-12 rounded-full border border-gold-400/50 mx-auto flex items-center justify-center text-gold-300 font-display text-base tracking-widest bg-gold-950/40 shadow-inner"
        >
          M & W
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-xs sm:text-sm text-gray-200 leading-relaxed px-4"
        >
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold"
        >
          Kami yang berbahagia
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-script text-5xl sm:text-6xl text-gold-100"
        >
          {data.couple.bride.shortName} <span className="text-gold-400 font-serif text-3xl">&</span> {data.couple.groom.shortName}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs text-gold-300/80 font-serif tracking-wider uppercase"
        >
          Beserta Keluarga Besar Kedua Mempelai
        </motion.p>

        <div className="pt-8 text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for Mira & Wahyudi</span>
        </div>
      </div>
    </footer>
  );
}
