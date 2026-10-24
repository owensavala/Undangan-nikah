import React from 'react';
import { motion } from 'framer-motion';

export default function StorySection({ data }) {
  const stories = data.loveStory;

  return (
    <section className="relative py-16 px-4 bg-[#2B2B2B] text-white">
      {/* Opacity Tilt Shape Divider */}
      <div className="overflow-hidden leading-none z-10 pointer-events-none -mt-16 mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2600 131.1" preserveAspectRatio="none" className="w-full h-8 sm:h-12 text-[#2B2B2B] fill-current">
          <path d="M0 0L2600 0 2600 69.1 0 0z"/>
          <path opacity="0.5" d="M0 0L2600 0 2600 69.1 0 69.1z"/>
          <path opacity="0.25" d="M2600 0L0 0 0 130.1 2600 69.1z"/>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-md mx-auto text-center mb-10"
      >
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-2">
          Love Story
        </h2>
        <div className="h-[1px] w-14 bg-white/40 mx-auto" />
      </motion.div>

      <div className="max-w-sm mx-auto space-y-6">
        {stories.map((story, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            className="rounded-3xl bg-white text-gray-800 overflow-hidden shadow-2xl"
          >
            {/* Story Photo */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover filter contrast-[1.02]"
                loading="lazy"
              />
            </div>

            {/* Story Content */}
            <div className="p-5 text-left">
              <h3 className="font-serif text-lg font-bold text-gray-900 uppercase tracking-wide mb-1">
                {story.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">
                {story.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
