import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Navigation, CalendarPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventSection({ data }) {
  const { akad, reception } = data.events;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const brightness = (data.theme?.bgBrightness ?? 45) / 100;

  useEffect(() => {
    const target = new Date(data.events.targetDate).getTime();
    const calculate = () => {
      const difference = target - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [data.events.targetDate]);

  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Mira+%26+Wahyudi&dates=20261212T010000Z/20261212T070000Z&details=Walimatul+Urs+dr.+Mira+Amelia+Putri+%26+Wahyudi&location=${encodeURIComponent(akad.venue + ', ' + akad.address)}`;

  return (
    <div className="relative">
      {/* 1. COUNT THE DATE - WITH FULL PHOTO BACKGROUND & ANIMATION */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 16, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${data.couple.countdownPhoto})`,
            filter: `brightness(${brightness})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09110e]/95 via-[#09110e]/60 to-[#09110e]/95" />

        <div className="relative z-10 max-w-md mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.35em] text-gold-400 font-bold"
          >
            Count The Date
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl text-gold-100 mt-2 mb-2"
          >
            Save The Date
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif italic text-sm text-gold-200/90 mb-8"
          >
            {data.events.dateDisplay}
          </motion.p>

          {/* 4 Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto mb-8">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-3 rounded-2xl border border-gold-400/40 bg-[#0d1613]/85 backdrop-blur-md shadow-lg"
              >
                <span className="block text-2xl font-display font-bold text-gold-200">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-serif uppercase tracking-widest text-gold-400/80">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-400/60 bg-gold-950/60 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-serif font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Simpan ke Google Calendar</span>
          </motion.a>
        </div>
      </section>

      {/* 2. AKAD NIKAH & RESEPSI CARDS - FULL PHOTO BACKGROUND */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* Full Section Photo Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ 
            backgroundImage: `url(${data.couple.eventsBg || data.couple.eventPhoto})`,
            filter: `brightness(${brightness})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09110e]/90 via-[#09110e]/75 to-[#09110e]/90 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-md mx-auto space-y-8">
          
          {/* Card Akad Nikah */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden border border-gold-400/40 p-7 text-center shadow-2xl bg-[#0d1613]/85 backdrop-blur-xl"
          >
            {/* Watermark photo inside */}
            <div 
              className="absolute inset-0 bg-cover bg-center filter opacity-20 scale-105 pointer-events-none"
              style={{ backgroundImage: `url(${data.couple.coupleStanding})` }}
            />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full border border-gold-400/50 flex items-center justify-center mx-auto mb-4 bg-gold-950/60 text-gold-300 shadow-inner">
                <Calendar className="w-5 h-5 text-gold-400" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-gold-200 mb-2">
                {akad.title}
              </h3>

              <div className="h-0.5 w-12 bg-gold-400/40 mx-auto my-3 rounded-full" />

              <p className="font-semibold text-sm text-gold-100 mb-1">{akad.dateFormatted}</p>
              
              <div className="inline-flex items-center gap-1.5 text-xs text-gold-300 mb-4 px-3 py-1 rounded-full bg-black/50 border border-gold-400/30">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>{akad.time}</span>
              </div>

              <p className="font-semibold text-xs text-gold-200">{akad.venue}</p>
              <p className="text-[11px] text-gray-300 mt-1 leading-relaxed max-w-xs mx-auto mb-6">
                {akad.address}
              </p>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={akad.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-gold-400/40 bg-gold-950/60 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Card Resepsi */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative rounded-3xl overflow-hidden border border-gold-400/40 p-7 text-center shadow-2xl bg-[#0d1613]/85 backdrop-blur-xl"
          >
            {/* Watermark photo inside */}
            <div 
              className="absolute inset-0 bg-cover bg-center filter opacity-20 scale-105 pointer-events-none"
              style={{ backgroundImage: `url(${data.couple.coupleSitting})` }}
            />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full border border-gold-400/50 flex items-center justify-center mx-auto mb-4 bg-gold-950/60 text-gold-300 shadow-inner">
                <Clock className="w-5 h-5 text-gold-400" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-gold-200 mb-2">
                {reception.title}
              </h3>

              <div className="h-0.5 w-12 bg-gold-400/40 mx-auto my-3 rounded-full" />

              <p className="font-semibold text-sm text-gold-100 mb-1">{reception.dateFormatted}</p>
              
              <div className="inline-flex items-center gap-1.5 text-xs text-gold-300 mb-4 px-3 py-1 rounded-full bg-black/50 border border-gold-400/30">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                <span>{reception.time}</span>
              </div>

              <p className="font-semibold text-xs text-gold-200">{reception.venue}</p>
              <p className="text-[11px] text-gray-300 mt-1 leading-relaxed max-w-xs mx-auto mb-6">
                {reception.address}
              </p>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={reception.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border border-gold-400/40 bg-gold-950/60 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-semibold tracking-wider uppercase transition-all shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah</span>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
