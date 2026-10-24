import React, { useState } from 'react';
import { Gift, Copy, Check, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GiftSection({ data }) {
  const [copiedBank, setCopiedBank] = useState(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [isAmplopOpen, setIsAmplopOpen] = useState(false);

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
    <section className="relative py-16 px-4 bg-[#2B2B2B] text-white text-center">
      <div className="relative z-10 max-w-sm mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <h2 className="font-serif text-3xl font-medium text-white mb-2">
            Amplop Digital
          </h2>
          <div className="h-[1px] w-14 bg-white/40 mx-auto mb-4" />
          <p className="text-xs text-gray-300 leading-relaxed px-2 mb-6">
            Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
          </p>

          {/* Kirim Amplop Toggle Button (Crisp white border matching reference) */}
          <button
            onClick={() => setIsAmplopOpen(!isAmplopOpen)}
            className="border border-white/80 bg-black/40 hover:bg-white hover:text-black text-white text-xs font-serif uppercase tracking-widest px-7 py-3 rounded-lg inline-flex items-center gap-2 shadow-xl transition-all duration-300 cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>{isAmplopOpen ? 'Tutup Amplop' : 'Kirim Amplop'}</span>
          </button>
        </motion.div>

        {/* Expandable Bank Account Cards */}
        <AnimatePresence>
          {isAmplopOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 my-6 text-left"
            >
              {data.giftInfo.map((gift, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white text-gray-800 shadow-xl"
                >
                  <p className="text-sm font-bold tracking-wider text-gray-900 uppercase font-serif mb-3">
                    {gift.bank}
                  </p>

                  <div className="mb-4">
                    <p className="font-mono text-xl font-bold tracking-widest text-gray-900">
                      {gift.accountNumber}
                    </p>
                    <p className="text-xs text-gray-600 uppercase font-serif mt-0.5">
                      a.n {gift.accountName}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyAccount(gift.accountNumber, gift.bank)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#2B2B2B] hover:bg-black text-white text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow"
                  >
                    {copiedBank === gift.bank ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              ))}

              {/* Physical Gift Address */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-xs text-white/80 underline underline-offset-4 hover:text-white"
                >
                  {showAddress ? 'Tutup Alamat Hadiah Fisik' : 'Kirim Hadiah Fisik? Klik Disini'}
                </button>

                {showAddress && (
                  <div className="mt-3 p-4 rounded-2xl bg-white text-gray-800 text-left shadow-lg">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-gray-700 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-xs text-gray-900">
                          {data.giftAddress.receiver} ({data.giftAddress.phone})
                        </p>
                        <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                          {data.giftAddress.fullAddress}
                        </p>
                        <button
                          onClick={() => handleCopyAddress(`${data.giftAddress.receiver} (${data.giftAddress.phone}) - ${data.giftAddress.fullAddress}`)}
                          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2B2B2B] text-white text-[11px] font-semibold"
                        >
                          {copiedAddress ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedAddress ? 'Tersalin!' : 'Salin Alamat'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
