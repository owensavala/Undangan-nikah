import React from 'react';
import { motion } from 'framer-motion';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function CoupleSection({ data }) {
  const { bride, groom } = data.couple;

  return (
    <div id="couple" className="relative bg-[#2B2B2B] text-white py-16 px-4">
      {/* SECTION INTRO */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto text-center mb-12 px-2"
      >
        <p className="font-serif font-bold text-sm text-white tracking-wider mb-2">
          Assalamu’alaikum Warahmatullaahi Wabarakaatuh
        </p>
        <p className="font-serif italic text-xs text-gray-300 leading-relaxed max-w-xs mx-auto">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami
        </p>
      </motion.div>

      {/* MEMPELAI WANITA - PURE WHITE CARD (Matching reference screenshot 4) */}
      <div className="max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl text-center text-gray-800"
        >
          {/* Bride Photo with soft rounded corners */}
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow">
            <img
              src={bride.photo}
              alt={bride.fullName}
              className="w-full h-full object-cover filter contrast-[1.02]"
              loading="lazy"
            />
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">
            {bride.fullName}
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-4 px-2">
            {bride.parents}
          </p>

          <a
            href={`https://instagram.com/${bride.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center mx-auto shadow transition-all duration-300"
            title="Instagram"
          >
            <InstagramIcon />
          </a>
        </motion.div>

        {/* Cursive '&' between bride and groom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center my-6"
        >
          <span className="font-serif italic text-4xl text-white block">
            &amp;
          </span>
        </motion.div>

        {/* MEMPELAI PRIA - PURE WHITE CARD (Matching reference screenshot 4) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-5 sm:p-6 shadow-2xl text-center text-gray-800"
        >
          {/* Groom Photo with soft rounded corners */}
          <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow">
            <img
              src={groom.photo}
              alt={groom.fullName}
              className="w-full h-full object-cover filter contrast-[1.02]"
              loading="lazy"
            />
          </div>

          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">
            {groom.fullName}
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-4 px-2">
            {groom.parents}
          </p>

          <a
            href={`https://instagram.com/${groom.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center mx-auto shadow transition-all duration-300"
            title="Instagram"
          >
            <InstagramIcon />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
