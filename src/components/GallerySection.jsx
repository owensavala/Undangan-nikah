import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Eye, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GallerySection({ data }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [viewMode, setViewMode] = useState(data.theme?.galleryLayout || 'slider'); // 'slider' | 'grid'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const gallery = data.gallery;
  const brightness = (data.theme?.bgBrightness ?? 45) / 100;

  // Next and Prev for carousel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Auto-slide transition every 3.5 seconds
  useEffect(() => {
    if (viewMode !== 'slider' || selectedIndex !== null || isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallery.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [viewMode, selectedIndex, isHovered, gallery.length]);

  // Lightbox handlers
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
    <section className="relative py-20 px-4 border-t border-gold-400/20 overflow-hidden">
      {/* Full Section Photo Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${data.couple.galleryBg || '/photos/collage_4.webp'})`,
          filter: `brightness(${brightness})`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09110e]/95 via-[#09110e]/75 to-[#09110e]/95 backdrop-blur-[1px]" />

      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-400 font-semibold">
            Galeri Kenangan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gold-100 mt-1 mb-2">
            Our Happy Moments Together
          </h2>
          <div className="h-0.5 w-12 bg-gold-400/50 mx-auto rounded-full mb-4" />

          {/* Toggle View Mode: Slider vs Grid */}
          <div className="inline-flex items-center p-1 rounded-full bg-black/60 border border-gold-400/30">
            <button
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif transition-all ${
                viewMode === 'slider'
                  ? 'bg-gold-500 text-black font-bold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Mode Geser (Slider)</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif transition-all ${
                viewMode === 'grid'
                  ? 'bg-gold-500 text-black font-bold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Mode Grid</span>
            </button>
          </div>
        </motion.div>

        {/* 1. HORIZONTAL CAROUSEL / SLIDER MODE */}
        {viewMode === 'slider' ? (
          <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            {/* Main Featured Slide */}
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] border-2 border-gold-400/50 shadow-2xl bg-black/50 group cursor-pointer">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={gallery[currentSlide].src}
                  alt={gallery[currentSlide].title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => openLightbox(currentSlide)}
                  className="w-full h-full object-cover filter contrast-[1.03]"
                />
              </AnimatePresence>

              {/* Gradient & Caption */}
              <div 
                onClick={() => openLightbox(currentSlide)}
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-5 text-center"
              >
                <p className="font-serif text-lg text-gold-200">
                  {gallery[currentSlide].title}
                </p>
                <div className="inline-flex items-center justify-center gap-1.5 text-xs text-gray-300 mt-1">
                  <Eye className="w-3.5 h-3.5 text-gold-400" />
                  <span>Sentuh untuk perbesar</span>
                </div>
              </div>

              {/* Prev and Next Floating Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-gold-400/40 text-gold-300 hover:bg-gold-500 hover:text-black transition-all shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-gold-400/40 text-gold-300 hover:bg-gold-500 hover:text-black transition-all shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2 overflow-x-auto py-3 px-1 mt-4 custom-scrollbar">
              {gallery.map((photo, idx) => (
                <button
                  key={photo.id || idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-14 h-18 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                    currentSlide === idx
                      ? 'border-gold-400 scale-105 ring-2 ring-gold-400/40'
                      : 'border-gold-400/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <p className="text-center text-[11px] text-gray-400 mt-2 font-serif">
              Foto {currentSlide + 1} dari {gallery.length} • Berpindah otomatis setiap 3.5 detik
            </p>
          </div>
        ) : (
          /* 2. GRID MODE */
          <div className="grid grid-cols-2 gap-2.5">
            {gallery.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => openLightbox(index)}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer border border-gold-400/25 bg-black/40 shadow-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter contrast-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <span className="text-xs font-serif text-gold-200">
                    {photo.title}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-300">
                    <Eye className="w-3.5 h-3.5 text-gold-400" />
                    <span>Lihat Foto</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-gold-500 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={prevImage}
              aria-label="Previous"
              className="absolute left-3 p-3 rounded-full bg-black/60 border border-gold-400/30 text-gold-200 hover:bg-gold-500 hover:text-black transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md max-h-[85vh] rounded-2xl overflow-hidden border border-gold-400/50 shadow-2xl relative"
            >
              <img
                src={gallery[selectedIndex].src}
                alt={gallery[selectedIndex].title}
                className="w-full h-full max-h-[85vh] object-contain"
              />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-center">
                <p className="font-serif text-sm text-gold-200">{gallery[selectedIndex].title}</p>
                <p className="text-[10px] text-gray-400">{selectedIndex + 1} / {gallery.length}</p>
              </div>
            </motion.div>

            <button
              onClick={nextImage}
              aria-label="Next"
              className="absolute right-3 p-3 rounded-full bg-black/60 border border-gold-400/30 text-gold-200 hover:bg-gold-500 hover:text-black transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
