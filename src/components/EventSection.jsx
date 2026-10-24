import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventSection({ data }) {
  const { akad, reception } = data.events;
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    <div id="event" className="relative">
      {/* 1. COUNT THE DATE: PURE WHITE CARD (Matching reference screenshot 5) */}
      <section className="relative py-14 px-4 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-sm mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 text-center text-gray-800"
        >
          <h2 className="font-serif text-2xl font-medium text-gray-900 mb-2">
            Count The Date
          </h2>
          <div className="h-[1px] w-16 bg-gray-300 mx-auto mb-3" />
          <p className="text-xs text-gray-600 font-sans tracking-wider mb-6">
            {data.events.dateDisplay}
          </p>

          {/* 4 Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto mb-6">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center"
              >
                <span className="block text-xl font-serif font-bold text-gray-900">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Save the Date button (Dark rounded button matching reference) */}
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#2B2B2B] hover:bg-black text-white text-xs font-serif uppercase tracking-widest px-7 py-2.5 rounded-full shadow-md transition-all duration-300"
          >
            Save the Date
          </a>
        </motion.div>
      </section>

      {/* 2. AKAD NIKAH: FULL COUPLE PHOTO WITH DARK OVERLAY (Matching reference screenshot 5) */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.55]"
          style={{ backgroundImage: `url(${data.couple.eventPhoto || data.couple.coverPhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-sm mx-auto text-white flex flex-col items-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-wide mb-6">
            {akad.title}
          </h2>

          <div className="flex items-center gap-2 text-white/90 text-xs mb-1">
            <Calendar className="w-4 h-4 text-white/80" />
            <span className="font-medium tracking-wide">{akad.dateFormatted}</span>
          </div>

          <div className="flex items-center gap-2 text-white/90 text-xs mb-6">
            <Clock className="w-4 h-4 text-white/80" />
            <span className="tracking-wide">{akad.time}</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center text-xs text-white/90 max-w-xs mb-8">
            <MapPin className="w-5 h-5 text-white/90 mb-1" />
            <p className="font-bold text-sm text-white">{akad.venue}</p>
            <p className="text-[11px] text-white/80 leading-relaxed">{akad.address}</p>
          </div>

          {/* Petunjuk Arah Button (Crisp white outline matching reference) */}
          <a
            href={akad.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/80 bg-black/40 hover:bg-white hover:text-black text-white text-xs font-serif uppercase tracking-widest px-6 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Petunjuk Arah</span>
          </a>
        </motion.div>
      </section>

      {/* 3. RESEPSI: FULL COUPLE PHOTO WITH DARK OVERLAY (Matching reference screenshot 5) */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 overflow-hidden border-t border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.55]"
          style={{ backgroundImage: `url(${data.couple.closingPhoto || data.couple.coverPhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-sm mx-auto text-white flex flex-col items-center"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-wide mb-6">
            {reception.title}
          </h2>

          <div className="flex items-center gap-2 text-white/90 text-xs mb-1">
            <Calendar className="w-4 h-4 text-white/80" />
            <span className="font-medium tracking-wide">{reception.dateFormatted}</span>
          </div>

          <div className="flex items-center gap-2 text-white/90 text-xs mb-6">
            <Clock className="w-4 h-4 text-white/80" />
            <span className="tracking-wide">{reception.time}</span>
          </div>

          <div className="flex flex-col items-center gap-1.5 text-center text-xs text-white/90 max-w-xs mb-8">
            <MapPin className="w-5 h-5 text-white/90 mb-1" />
            <p className="font-bold text-sm text-white">{reception.venue}</p>
            <p className="text-[11px] text-white/80 leading-relaxed">{reception.address}</p>
          </div>

          {/* Petunjuk Arah Button */}
          <a
            href={reception.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/80 bg-black/40 hover:bg-white hover:text-black text-white text-xs font-serif uppercase tracking-widest px-6 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-xl transition-all duration-300 backdrop-blur-sm"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Petunjuk Arah</span>
          </a>
        </motion.div>
      </section>
    </div>
  );
}
