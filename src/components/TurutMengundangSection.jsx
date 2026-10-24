import React from 'react';
import { motion } from 'framer-motion';

export default function TurutMengundangSection({ data }) {
  const { brideSide, groomSide } = data.turutMengundang;

  return (
    <section className="relative py-16 px-4 bg-white text-gray-800 text-center">
      <div className="relative z-10 max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 mb-2">
            Turut Mengundang
          </h2>
          <div className="h-[1px] w-14 bg-gray-300 mx-auto" />
        </motion.div>

        <div className="space-y-6 text-left">
          {/* Pihak Mempelai Wanita */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
            <h3 className="text-xs uppercase tracking-wider text-gray-900 font-bold mb-3 font-serif">
              Pihak Mempelai Wanita
            </h3>
            <ul className="space-y-1 text-xs text-gray-700">
              {brideSide.map((person, idx) => (
                <li key={idx} className="leading-relaxed">
                  {idx + 1}. {person}
                </li>
              ))}
            </ul>
          </div>

          {/* Pihak Mempelai Pria */}
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm">
            <h3 className="text-xs uppercase tracking-wider text-gray-900 font-bold mb-3 font-serif">
              Pihak Mempelai Pria
            </h3>
            <ul className="space-y-1 text-xs text-gray-700">
              {groomSide.map((person, idx) => (
                <li key={idx} className="leading-relaxed">
                  {idx + 1}. {person}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
