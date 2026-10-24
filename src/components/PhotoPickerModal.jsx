import React, { useState } from 'react';
import { X, Upload, Check, Image as ImageIcon, Search } from 'lucide-react';
import { photoLibrary } from '../data/photoLibrary';

export default function PhotoPickerModal({ isOpen, onClose, onSelect, currentPhoto, title = "Pilih Foto" }) {
  const [activeTab, setActiveTab] = useState('library'); // 'library' | 'upload'
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onSelect(event.target.result);
          onClose();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredLibrary = photoLibrary.filter((src) =>
    src.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-3xl bg-[#0e1713] border border-gold-400/40 rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gold-400/20 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-gold-200">
              {title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Tersedia 52 foto asli prewedding. Klik foto untuk langsung menerapkannya.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 hover:bg-gold-500 hover:text-black text-gray-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gold-400/20 bg-black/30">
          <button
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-3 text-xs sm:text-sm font-serif font-semibold tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'library'
                ? 'border-gold-400 text-gold-200 bg-gold-950/20'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Koleksi Foto Prewedding ({photoLibrary.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 text-xs sm:text-sm font-serif font-semibold tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'border-gold-400 text-gold-200 bg-gold-950/20'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload dari HP / Laptop</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
          {activeTab === 'library' ? (
            <div className="space-y-4">
              {/* Quick Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari kode foto (contoh: 4205, 4171)..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-gold-400/30 text-gold-100 text-xs focus:outline-none focus:border-gold-400"
                />
              </div>

              {/* Grid of 52 Photos */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {filteredLibrary.map((imgSrc, idx) => {
                  const isSelected = currentPhoto === imgSrc;
                  const photoCode = imgSrc.split('/').pop().replace('.webp', '');
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        onSelect(imgSrc);
                        onClose();
                      }}
                      className={`group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer border-2 transition-all duration-200 bg-black ${
                        isSelected
                          ? 'border-gold-400 ring-2 ring-gold-400/50 scale-95 shadow-lg'
                          : 'border-gold-400/20 hover:border-gold-400 hover:scale-[1.03]'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`Photo ${photoCode}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* Filename Badge */}
                      <span className="absolute bottom-1 left-1 right-1 bg-black/80 backdrop-blur-xs text-[9px] font-mono text-gray-200 text-center rounded py-0.5 truncate px-1 border border-white/10 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                        {photoCode}
                      </span>

                      {isSelected && (
                        <div className="absolute inset-0 bg-gold-500/30 backdrop-blur-[1px] flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full bg-gold-400 text-black flex items-center justify-center shadow-lg">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 rounded-full border border-dashed border-gold-400/60 bg-gold-950/30 flex items-center justify-center mb-4 text-gold-300">
                <Upload className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base text-gold-200 font-bold mb-1">
                Pilih Foto dari Perangkat
              </h4>
              <p className="text-xs text-gray-400 max-w-sm mb-6">
                Mendukung file JPG, PNG, atau WEBP. Foto akan langsung tampil di undangan Anda.
              </p>
              <label className="cursor-pointer px-6 py-3 rounded-full font-serif text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 hover:from-gold-100 hover:to-gold-300 transition-all shadow-xl">
                <span>Pilih File Gambar</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
