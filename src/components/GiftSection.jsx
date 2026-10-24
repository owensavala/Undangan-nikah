import React, { useState } from 'react';
import { Gift, Copy, Check, MapPin, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GiftSection({ data }) {
  const [copiedBank, setCopiedBank] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const brightness = (data.theme?.bgBrightness ?? 45) / 100;

  const handleCopyAccount = (accountNumber, bankName) => {
    navigator.clipboard.writeText(accountNumber.replace(/\s+/g, ''));
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  const handleCopyAddress = (addressText) => {
    navigator.clipboard.writeText(addressText);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section className="relative py-20 px-4 border-t border-gold-400/20 overflow-hidden">
      {/* Full Photo Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${data.couple.giftBg || '/photos/collage_3.webp'})`,
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
          className="text-center mb-12"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-400 font-semibold">
            Tanda Kasih
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gold-100 mt-1 mb-2">
            Amplop Digital
          </h2>
          <div className="h-0.5 w-12 bg-gold-400/50 mx-auto rounded-full" />
          <p className="text-xs text-gray-300 max-w-sm mx-auto mt-3 leading-relaxed">
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>
        </motion.div>

        {/* Bank Account Cards */}
        <div className="space-y-4 mb-8">
          {data.giftInfo.map((gift, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              whileHover={{ y: -3 }}
              className="p-6 rounded-3xl border border-gold-400/35 bg-[#0d1613]/85 backdrop-blur-xl text-left relative overflow-hidden shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold tracking-widest uppercase text-gold-300 font-display">
                  {gift.bank}
                </span>
                <CreditCard className="w-5 h-5 text-gold-400/80" />
              </div>

              <div className="mb-5">
                <span className="text-[10px] tracking-wider uppercase text-gray-400 block mb-0.5">
                  Nomor Rekening:
                </span>
                <p className="font-mono text-xl font-bold tracking-widest text-gold-100">
                  {gift.accountNumber}
                </p>
                <p className="text-xs text-gold-300/80 mt-1 font-serif uppercase tracking-wider">
                  a.n {gift.accountName}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCopyAccount(gift.accountNumber, gift.bank)}
                className="w-full py-2.5 px-4 rounded-xl border border-gold-400/40 bg-gold-950/60 hover:bg-gold-500 hover:text-black text-gold-200 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
              >
                {copiedBank === gift.bank ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Rekening</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Physical Gift Accordion */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddress(!showAddress)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold-400 hover:text-gold-200 underline underline-offset-4 font-medium transition-colors"
          >
            <Gift className="w-4 h-4" />
            <span>{showAddress ? 'Tutup Alamat Kirim Kado' : 'Kirim Hadiah Fisik? Klik Disini'}</span>
          </motion.button>

          {showAddress && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-5 rounded-2xl border border-gold-400/30 bg-[#0d1613]/90 backdrop-blur-md text-left shadow-xl"
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs text-gold-200">
                    Penerima: {data.giftAddress.receiver} ({data.giftAddress.phone})
                  </p>
                  <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                    {data.giftAddress.fullAddress}
                  </p>
                  <button
                    onClick={() => handleCopyAddress(`${data.giftAddress.receiver} (${data.giftAddress.phone}) - ${data.giftAddress.fullAddress}`)}
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gold-400/40 text-gold-300 text-[11px] font-semibold hover:bg-gold-500 hover:text-black transition-all"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Alamat Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
