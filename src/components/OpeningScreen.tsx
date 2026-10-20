import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OpeningScreenProps {
  onOpen: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);

    // Fire celebratory pastel confetti burst
    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#f472b6', '#c084fc', '#fbcfe8', '#fef08a', '#d4af37'],
    });

    // Allow bloom transition to play before proceeding
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-pink-100/90 via-purple-50/95 to-pink-100/90">
      {/* Decorative Floral Background Corners */}
      <div className="absolute -top-10 -left-10 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none opacity-85">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <circle cx="60" cy="60" r="45" fill="#fbcfe8" opacity="0.6" />
          <circle cx="95" cy="50" r="35" fill="#e9d5ff" opacity="0.6" />
          <circle cx="50" cy="95" r="35" fill="#f472b6" opacity="0.4" />
          <path d="M40 40 Q70 10 90 40 T140 50" stroke="#d4af37" strokeWidth="2" strokeDasharray="4 4" />
          {/* Pastel rose petals */}
          <path d="M50 50 C40 30, 80 20, 70 50 C60 70, 30 60, 50 50 Z" fill="#f472b6" opacity="0.75" />
          <path d="M85 45 C75 30, 110 20, 105 45 C100 65, 75 60, 85 45 Z" fill="#c084fc" opacity="0.75" />
          <circle cx="65" cy="48" r="8" fill="#fbbf24" />
        </svg>
      </div>

      <div className="absolute -bottom-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 pointer-events-none opacity-85">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full rotate-180">
          <circle cx="60" cy="60" r="45" fill="#fbcfe8" opacity="0.6" />
          <circle cx="95" cy="50" r="35" fill="#e9d5ff" opacity="0.6" />
          <circle cx="50" cy="95" r="35" fill="#f472b6" opacity="0.4" />
          <path d="M40 40 Q70 10 90 40 T140 50" stroke="#d4af37" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M50 50 C40 30, 80 20, 70 50 C60 70, 30 60, 50 50 Z" fill="#f472b6" opacity="0.75" />
          <path d="M85 45 C75 30, 110 20, 105 45 C100 65, 75 60, 85 45 Z" fill="#c084fc" opacity="0.75" />
          <circle cx="65" cy="48" r="8" fill="#fbbf24" />
        </svg>
      </div>

      {/* Main Entrance Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-md mx-auto text-center p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-pink-200/90 shadow-2xl shadow-pink-300/20"
      >
        {/* Golden Filigree Top Ribbon */}
        <div className="flex items-center justify-center gap-2 mb-2 text-amber-500">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-400"></span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin [animation-duration:8s]" />
          <span className="text-xs tracking-widest uppercase font-semibold text-amber-700/80">A Blessed Beginning</span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin [animation-duration:8s]" />
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-400"></span>
        </div>

        {/* Sequential Baby Footprints */}
        <div className="flex items-center justify-center gap-3 py-2 mb-1" aria-label="Baby footprints">
          {[0, 1, 2, 3].map((step) => {
            const isLeft = step % 2 === 0;
            const color = isLeft ? '#ec4899' : '#a855f7';
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0, y: 10 }}
                animate={{ opacity: 0.85, scale: 1, y: 0 }}
                transition={{
                  delay: 0.3 + step * 0.25,
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                className={`transform ${isLeft ? '-rotate-12 translate-y-1' : 'rotate-12 -translate-y-1'}`}
              >
                {/* SVG Tiny Baby Footprint */}
                <svg width="22" height="28" viewBox="0 0 24 30" fill="none">
                  {/* Heel & Sole */}
                  <ellipse cx="12" cy="20" rx="6.5" ry="8" fill={color} opacity="0.85" />
                  {/* 5 Tiny Toes */}
                  <circle cx="6.5" cy="7" r="2.2" fill={color} />
                  <circle cx="10" cy="5" r="2.3" fill={color} />
                  <circle cx="14" cy="5.2" r="2.1" fill={color} />
                  <circle cx="17.5" cy="7" r="1.8" fill={color} />
                  <circle cx="20" cy="9.5" r="1.5" fill={color} />
                </svg>
              </motion.div>
            );
          })}
        </div>

        {/* Cute Baby Illustration on Fluffy Cloud with gentle bounce */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative my-4 flex justify-center"
        >
          {/* Cloud Base */}
          <div className="relative">
            {/* Soft Glow */}
            <div className="absolute inset-0 bg-pink-300/40 rounded-full blur-xl transform scale-110"></div>

            {/* SVG Baby on Cloud */}
            <svg width="180" height="130" viewBox="0 0 200 150" fill="none" className="relative drop-shadow-md">
              {/* Cloud */}
              <g fill="#ffffff" opacity="0.95">
                <circle cx="60" cy="110" r="30" />
                <circle cx="95" cy="95" r="38" />
                <circle cx="135" cy="105" r="32" />
                <circle cx="160" cy="115" r="24" />
                <rect x="50" y="105" width="115" height="30" rx="15" />
              </g>

              {/* Baby Body */}
              <ellipse cx="100" cy="85" rx="36" ry="26" fill="#fde047" opacity="0.25" />
              {/* Swaddle Blanket in pastel pink with polka dots */}
              <ellipse cx="98" cy="86" rx="34" ry="24" fill="#fce7f3" stroke="#f472b6" strokeWidth="1.5" />
              <circle cx="85" cy="80" r="2" fill="#ec4899" opacity="0.6" />
              <circle cx="105" cy="84" r="2" fill="#ec4899" opacity="0.6" />
              <circle cx="94" cy="95" r="2" fill="#ec4899" opacity="0.6" />
              <circle cx="118" cy="90" r="2" fill="#ec4899" opacity="0.6" />

              {/* Baby Head */}
              <circle cx="70" cy="74" r="20" fill="#fde68a" stroke="#f59e0b" strokeWidth="0.8" />
              {/* Rosy Cheeks */}
              <circle cx="64" cy="79" r="4" fill="#f43f5e" opacity="0.35" />
              <circle cx="78" cy="79" r="4" fill="#f43f5e" opacity="0.35" />
              {/* Sleeping Peaceful Closed Eyes */}
              <path d="M62 73 Q65 77 68 73" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d="M74 73 Q77 77 80 73" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              {/* Gentle Smile */}
              <path d="M68 82 Q71 85 74 82" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              {/* Tiny hair curl */}
              <path d="M70 54 Q72 48 76 52" stroke="#b45309" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Golden Crown/Halo */}
              <path d="M62 50 L66 43 L70 48 L74 43 L78 50 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
            </svg>
          </div>
        </motion.div>

        {/* Header Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xs uppercase tracking-[0.2em] font-medium text-purple-700/80 mb-1"
        >
          A Little Miracle Is on the Way
        </motion.p>

        {/* Couple Names in script style */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="font-script text-4xl sm:text-5xl text-pink-700 tracking-wide my-1 py-1"
        >
          Praveen &amp; Saran
        </motion.h1>

        {/* Function Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-sm text-slate-600 font-cormorant italic text-base mb-6"
        >
          <span>Cordially invite you to celebrate our Baby Shower</span>
        </motion.div>

        {/* Blooming Transition Overlay on Click */}
        <AnimatePresence>
          {isOpening && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0, rotate: -30 }}
              animate={{ scale: 1.8, opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            >
              {/* Blooming Floral Blossom SVG */}
              <svg width="240" height="240" viewBox="0 0 200 200" fill="none">
                <g transform="translate(100, 100)">
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <path
                      key={i}
                      d="M0 0 C-15 -35, 15 -35, 0 0"
                      fill={i % 2 === 0 ? '#f472b6' : '#c084fc'}
                      opacity="0.8"
                      transform={`rotate(${angle}) scale(2.2)`}
                    />
                  ))}
                  <circle cx="0" cy="0" r="16" fill="#fbbf24" stroke="#d4af37" strokeWidth="2" />
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Open Your Invitation ✨" Button */}
        <motion.button
          onClick={handleOpenClick}
          disabled={isOpening}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-base font-medium text-white shadow-lg shadow-pink-500/25 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all border border-pink-300/40 min-h-[48px] cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-amber-200 animate-spin [animation-duration:6s]" />
          <span className="tracking-wide font-medium">Open Your Invitation ✨</span>
          <Heart className="w-4 h-4 text-pink-200 fill-pink-200 animate-pulse" />
        </motion.button>

        {/* Small subtle footer note */}
        <p className="mt-4 text-[11px] text-slate-400">
          Touch or click to reveal the celebration card &amp; blessings
        </p>
      </motion.div>
    </div>
  );
};
