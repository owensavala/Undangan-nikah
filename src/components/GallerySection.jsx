import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, SlidersHorizontal, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GallerySection({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const gallery = data.gallery;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  useEffect(() => {
    if (viewMode !== 'slider' || selectedIndex !== null || isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallery.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [viewMode, selectedIndex, isHovered, gallery.length]);

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section id="moment" className="relative py-16 px-4 bg-white text-gray-800 text-center">
      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-gray-900 mb-2">
            Our Happy Moments Together
          </h2>
          <div className="h-[1px] w-16 bg-gray-300 mx-auto mb-4" />

          {/* Toggle View Mode */}
          <div className="inline-flex items-center p-1 rounded-full bg-gray-100 border border-gray-200 shadow-sm">
            <button
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif transition-all ${
                viewMode === 'slider'
                  ? 'bg-[#2B2B2B] text-white font-medium shadow'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Slider</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#2B2B2B] text-white font-medium shadow'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>
        </motion.div>

        {/* SLIDER CAROUSEL MODE */}
        {viewMode === 'slider' && (
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Featured Slide */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xl bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={gallery[currentSlide].src}
                  alt={gallery[currentSlide].title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => openLightbox(currentSlide)}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </AnimatePresence>

              {/* Prev / Next Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md shadow hover:bg-black transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md shadow hover:bg-black transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
              {gallery.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`relative flex-shrink-0 w-14 h-18 rounded-lg overflow-hidden transition-all duration-300 ${
                    currentSlide === idx
                      ? 'ring-2 ring-gray-900 scale-105 opacity-100'
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2-COLUMN GRID MODE */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => openLightbox(idx)}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md cursor-pointer group"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX ZOOM */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-50"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <motion.img
              key={selectedIndex}
              src={gallery[selectedIndex].src}
              alt={gallery[selectedIndex].title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-50"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
