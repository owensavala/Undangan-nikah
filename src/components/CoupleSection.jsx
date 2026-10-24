import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function CoupleSection({ data }) {
  const { bride, groom } = data.couple;

  const getFrameClasses = (style) => {
    switch (style) {
      case 'oval':
        return {
          wrapper: 'rounded-[50%] p-1',
          image: 'rounded-[50%]'
        };
      case 'rounded':
        return {
          wrapper: 'rounded-3xl p-1',
          image: 'rounded-2xl'
        };
      case 'polaroid':
        return {
          wrapper: 'rounded-xl p-2.5 pb-8 bg-[#FAF7F2] border-white shadow-2xl',
          image: 'rounded-lg'
        };
      case 'arch':
      default:
        return {
          wrapper: 'rounded-t-full rounded-b-2xl p-1 bg-gradient-to-b from-gold-400/30 to-transparent',
          image: 'rounded-t-full rounded-b-xl'
        };
    }
  };

  const brideFrame = getFrameClasses(bride.frameStyle || 'arch');
  const groomFrame = getFrameClasses(groom.frameStyle || 'arch');

  return (
    <div className="relative">
      {/* Opacity Tilt Shape Divider (Matching reference) */}
      <div className="overflow-hidden leading-none z-10 pointer-events-none -mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2600 131.1" preserveAspectRatio="none" className="w-full h-8 sm:h-12 text-[#070e0b] fill-current">
          <path d="M0 0L2600 0 2600 69.1 0 0z"/>
          <path opacity="0.5" d="M0 0L2600 0 2600 69.1 0 69.1z"/>
          <path opacity="0.25" d="M2600 0L0 0 0 130.1 2600 69.1z"/>
        </svg>
      </div>

      {/* SECTION INTRO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 text-center bg-[#070e0b] border-y border-gold-400/20"
      >
        <p className="text-[11px] uppercase tracking-[0.25em] text-gold-300 font-medium mb-1">
          Assalamu’alaikum Warahmatullaahi Wabarakaatuh
        </p>
        <p className="font-serif italic text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami.
        </p>
      </motion.div>

      {/* MEMPELAI WANITA - FULL AMBIENT PHOTO BACKGROUND */}
      <section className="relative py-16 px-4 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] blur-[1px]"
          style={{ backgroundImage: `url(${bride.bgPhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09110e]/90 via-[#09110e]/75 to-[#09110e]/90" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 max-w-md mx-auto p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/80 backdrop-blur-md shadow-2xl"
        >
          {/* Chosen Frame with Scale & Float */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative w-48 h-64 sm:w-56 sm:h-76 mx-auto mb-6"
          >
            <div className={`w-full h-full overflow-hidden border-2 border-gold-400/60 shadow-2xl ${brideFrame.wrapper}`}>
              <img
                src={bride.photo}
                alt={bride.fullName}
                className={`w-full h-full object-cover filter contrast-[1.05] ${brideFrame.image}`}
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center backdrop-blur-md shadow-lg">
              <Heart className="w-4 h-4 text-gold-300 fill-gold-400" />
            </div>
          </motion.div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-1">
            {bride.role}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-100 mb-2">
            {bride.fullName}
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto mb-5">
            {bride.parents}
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://instagram.com/${bride.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-400/40 bg-gold-950/50 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-medium transition-all shadow-md"
          >
            <InstagramIcon />
            <span>@{bride.instagram}</span>
          </motion.a>
        </motion.div>
      </section>

      {/* ORNAMENT DIVIDER */}
      <div className="flex items-center justify-center gap-4 py-4 bg-[#09110e]">
        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gold-400" />
        <span className="font-script text-4xl text-gold-400">&</span>
        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gold-400" />
      </div>

      {/* MEMPELAI PRIA - FULL AMBIENT PHOTO BACKGROUND */}
      <section className="relative py-16 px-4 text-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] blur-[1px]"
          style={{ backgroundImage: `url(${groom.bgPhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09110e]/90 via-[#09110e]/75 to-[#09110e]/90" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative z-10 max-w-md mx-auto p-6 rounded-3xl border border-gold-400/30 bg-[#0d1613]/80 backdrop-blur-md shadow-2xl"
        >
          {/* Chosen Frame with Scale */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative w-48 h-64 sm:w-56 sm:h-76 mx-auto mb-6"
          >
            <div className={`w-full h-full overflow-hidden border-2 border-gold-400/60 shadow-2xl ${groomFrame.wrapper}`}>
              <img
                src={groom.photo}
                alt={groom.fullName}
                className={`w-full h-full object-cover filter contrast-[1.05] ${groomFrame.image}`}
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 w-9 h-9 rounded-full bg-gold-500/20 border border-gold-400/40 flex items-center justify-center backdrop-blur-md shadow-lg">
              <Heart className="w-4 h-4 text-gold-300 fill-gold-400" />
            </div>
          </motion.div>

          <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold block mb-1">
            {groom.role}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gold-100 mb-2">
            {groom.fullName}
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xs mx-auto mb-5">
            {groom.parents}
          </p>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://instagram.com/${groom.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold-400/40 bg-gold-950/50 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-medium transition-all shadow-md"
          >
            <InstagramIcon />
            <span>@{groom.instagram}</span>
          </motion.a>
        </motion.div>
      </section>

      {/* EDITORIAL MULTI-PHOTO COLLAGE SECTION */}
      <section className="relative py-14 px-4 bg-[#0a120f] border-t border-gold-400/20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-md mx-auto text-center mb-8"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-semibold">
            Two Souls, One Destiny
          </span>
          <h3 className="font-serif text-2xl text-gold-100 mt-1">
            Harmoni Dua Hati
          </h3>
          <div className="h-0.5 w-10 bg-gold-400/50 mx-auto mt-2 rounded-full" />
        </motion.div>

        {/* 2-Photo Overlapping Collage with Slide Entrance */}
        <div className="max-w-md mx-auto grid grid-cols-2 gap-3 relative">
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            className="col-span-1 rounded-2xl overflow-hidden border-2 border-gold-400/40 aspect-[3/4] shadow-2xl"
          >
            <img src={data.couple.coupleStanding} alt="Couple standing" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            className="col-span-1 rounded-2xl overflow-hidden border-2 border-gold-400/40 aspect-[3/4] shadow-2xl mt-6"
          >
            <img src={data.couple.coupleSitting} alt="Couple sitting" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
