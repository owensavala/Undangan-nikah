import React, { useState } from 'react';
import { Lock, KeyRound, ArrowRight, X, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLockModal({ isOpen, correctPin = "1212", onUnlock, onCancel }) {
  const [inputPin, setInputPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPin.trim() === correctPin.trim()) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
      setInputPin('');
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-sm p-6 sm:p-8 rounded-3xl border border-gold-400/40 bg-[#0d1613] text-center shadow-2xl shadow-gold-500/10"
      >
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Lock Icon Badge */}
        <div className="w-14 h-14 rounded-full border border-gold-400/50 bg-gold-950/40 text-gold-300 mx-auto flex items-center justify-center mb-4 shadow-inner">
          <Lock className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-xl font-bold text-gold-100 mb-1">
          Akses Khusus Mempelai
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          Halaman ini dilindungi PIN agar tidak bisa diubah sembarangan oleh tamu.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              autoFocus
              maxLength={12}
              value={inputPin}
              onChange={(e) => setInputPin(e.target.value)}
              placeholder="Masukkan PIN..."
              className={`w-full px-4 py-3 text-center rounded-2xl bg-black/60 border text-gold-100 placeholder-gray-600 text-sm tracking-widest focus:outline-none transition-all ${
                error
                  ? 'border-rose-500 ring-2 ring-rose-500/30'
                  : 'border-gold-400/40 focus:border-gold-400 focus:ring-1 focus:ring-gold-400'
              }`}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>PIN salah! Silakan coba lagi.</span>
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-2xl font-serif text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 hover:from-gold-100 hover:to-gold-300 flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 transition-all active:scale-98"
          >
            <span>Buka Dashboard Edit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-gray-500 mt-6">
          *PIN Default awal: <strong className="text-gold-300">1212</strong> (Bisa diganti di dalam Dashboard)
        </p>
      </motion.div>
    </div>
  );
}
