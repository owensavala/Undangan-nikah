import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StorySection({ data }) {
  const stories = data.loveStory;

  return (
    <section className="py-20 px-4 bg-[#070e0b] border-t border-gold-400/20 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-md mx-auto text-center mb-14"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-gold-400 font-semibold">
          Kisah Indah Kami
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-gold-100 mt-1 mb-2">
          Love Story
        </h2>
        <div className="h-0.5 w-12 bg-gold-400/50 mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-md mx-auto space-y-10">
        {stories.map((story, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-gold-400/30 bg-[#0d1613]/90 overflow-hidden shadow-2xl transition-all duration-300 hover:border-gold-400/60"
          >
            {/* Story Photo Frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gold-400/20">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover filter contrast-[1.05] transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500 text-gray-950 font-bold text-xs font-serif shadow-md">
                <Heart className="w-3 h-3 fill-gray-950" />
                <span>{story.year}</span>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6 text-left">
              <h3 className="font-serif text-xl font-bold text-gold-200 mb-2">
                {story.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {story.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
