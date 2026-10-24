import React, { useRef } from 'react';
import { Heart } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function StorySection({ data }) {
  const stories = data.loveStory;
  const timelineRef = useRef(null);

  // Dynamic connecting line that follows scroll position through the story section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="story" className="relative pt-16 pb-20 px-4 bg-[#2B2B2B] text-white overflow-hidden">
      {/* Top Shape Divider (Opacity Tilt seamlessly transitioning from pure white Gallery) */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-10 pointer-events-none -mt-[1px]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2600 131.1" preserveAspectRatio="none" className="w-full h-8 sm:h-12 text-white fill-current">
          <path d="M0 0L2600 0 2600 69.1 0 0z"/>
          <path opacity="0.5" d="M0 0L2600 0 2600 69.1 0 69.1z"/>
          <path opacity="0.25" d="M2600 0L0 0 0 130.1 2600 69.1z"/>
        </svg>
      </div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-md mx-auto text-center mb-12 relative z-10"
      >
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-medium mb-2">
          Love Story
        </h2>
        <div className="h-[1px] w-14 bg-white/40 mx-auto" />
      </motion.div>

      {/* Vertical Timeline Container (Exact clone of Elementor jet-timeline--align-left) */}
      <div ref={timelineRef} className="relative max-w-sm mx-auto pl-6 sm:pl-8 pr-1">
        {/* Background Static Connecting Track */}
        <div className="absolute left-[24px] sm:left-[28px] top-4 bottom-8 w-[2px] bg-white/20 rounded-full" />

        {/* Dynamic Scroll-driven Connecting Progress Line */}
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute left-[24px] sm:left-[28px] top-4 bottom-8 w-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)] rounded-full z-0"
        />

        {/* Timeline Items */}
        <div className="space-y-8 relative z-10">
          {stories.map((story, idx) => (
            <div key={idx} className="relative flex items-start gap-4">
              {/* White Heart Badge Node centered directly over the connecting line */}
              <motion.div 
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative -ml-[13px] sm:-ml-[17px] flex-shrink-0 z-20 w-8 h-8 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center border border-gray-100"
              >
                <Heart className="w-3.5 h-3.5 text-[#2B2B2B] fill-current" />
              </motion.div>

              {/* White Story Card to the right */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative flex-1 bg-white rounded-2xl overflow-hidden shadow-2xl text-gray-800"
              >
                {/* Triangular pointer pointing towards the heart node */}
                <div 
                  className="absolute -left-2 top-3 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-white z-20"
                  aria-hidden="true"
                />

                {/* Story Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover filter contrast-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Story Content */}
                <div className="p-4 sm:p-5 text-left">
                  {story.year && (
                    <div className="text-[11px] font-sans font-medium text-gray-400 mb-1 tracking-wider">
                      {story.year}
                    </div>
                  )}
                  <h3 className="font-serif text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wide mb-2">
                    {story.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}