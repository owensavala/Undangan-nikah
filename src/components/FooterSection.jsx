import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FooterSection({ data }) {
  return (
    <footer className="relative py-24 px-4 text-center overflow-hidden">
      {/* Full Photo Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.4]"
        style={{ backgroundImage: `url(${data.couple.closingPhoto || data.couple.coverPhoto})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/85" />

      <div className="relative z-10 max-w-sm mx-auto space-y-5 text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-xs sm:text-sm text-gray-200 leading-relaxed px-2"
        >
          "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-white/90 font-serif"
        >
          Wassalamu'alaikum Warahmatullaahi Wabarakaatuh
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-2"
        >
          <p className="text-[11px] text-white/70 uppercase tracking-wider mb-1">
            Kami yang berbahagia
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium">
            {data.couple.bride.shortName} &amp; {data.couple.groom.shortName}
          </h3>
          <p className="text-xs text-white/80 font-serif tracking-wider uppercase mt-1">
            Beserta Keluarga Besar Kedua Mempelai
          </p>
        </motion.div>

        <div className="pt-10 text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for Mira &amp; Wahyudi</span>
        </div>
      </div>
    </footer>
  );
}
