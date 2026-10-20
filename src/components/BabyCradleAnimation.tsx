import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MailOpen } from 'lucide-react';

interface BabyCradleAnimationProps {
  onContinue: () => void;
}

export const BabyCradleAnimation: React.FC<BabyCradleAnimationProps> = ({ onContinue }) => {
  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-purple-100/90 via-pink-50/95 to-purple-100/90">
      {/* Warm Golden Glow Behind Cradle */}
      <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-amber-200/40 via-pink-200/50 to-purple-200/40 blur-3xl pointer-events-none" />

      {/* Floating Hearts Around Cradle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [-20, -180],
              x: [(i % 2 === 0 ? 1 : -1) * 15, (i % 2 === 0 ? -1 : 1) * 30],
            }}
            transition={{
              duration: 4.5 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeOut',
            }}
            className="absolute left-1/2 bottom-1/3"
            style={{ marginLeft: `${(i - 2.5) * 55}px` }}
          >
            <Heart
              className={`w-${i % 2 === 0 ? 5 : 4} h-${i % 2 === 0 ? 5 : 4} ${
                i % 2 === 0 ? 'text-pink-400 fill-pink-300' : 'text-purple-400 fill-purple-300'
              }`}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: -20 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-lg mx-auto text-center px-6 py-8 sm:px-10 sm:py-10 rounded-3xl bg-white/85 backdrop-blur-xl border border-amber-200/80 shadow-2xl shadow-purple-500/15"
      >
        {/* Top Header Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-xs font-semibold text-pink-700 tracking-wider uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>A Precious Gift Arrives</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        {/* Rocking Cradle & Blooming Flowers Showcase */}
        <div className="relative my-4 flex items-center justify-center min-h-[220px]">
          {/* Left Blooming Floral Cluster */}
          <motion.div
            initial={{ scale: 0, rotate: -40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
            className="absolute -left-4 sm:left-4 bottom-2 z-10 pointer-events-none"
          >
            <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
              {/* Leaves */}
              <path d="M40 90 C15 70 20 40 50 65" fill="#86efac" opacity="0.8" />
              <path d="M25 80 C5 95 10 120 45 100" fill="#4ade80" opacity="0.7" />
              {/* Pink Rose Blossom */}
              <g transform="translate(45, 55)">
                <circle cx="0" cy="0" r="22" fill="#fbcfe8" />
                <path d="M-12 -12 C0 -24 18 -12 12 6 C6 18 -18 12 -12 -12 Z" fill="#f472b6" opacity="0.9" />
                <path d="M-6 -6 C0 -12 10 -6 6 4 C2 10 -10 6 -6 -6 Z" fill="#ec4899" />
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
              </g>
              {/* Purple Companion Flower */}
              <g transform="translate(20, 85)">
                <circle cx="0" cy="0" r="14" fill="#e9d5ff" />
                <circle cx="0" cy="0" r="8" fill="#c084fc" opacity="0.9" />
                <circle cx="0" cy="0" r="3" fill="#fef08a" />
              </g>
            </svg>
          </motion.div>

          {/* Right Blooming Floral Cluster */}
          <motion.div
            initial={{ scale: 0, rotate: 40, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 1, ease: 'easeOut' }}
            className="absolute -right-4 sm:right-4 bottom-2 z-10 pointer-events-none"
          >
            <svg width="100" height="120" viewBox="0 0 100 120" fill="none" className="transform scale-x-[-1]">
              <path d="M40 90 C15 70 20 40 50 65" fill="#86efac" opacity="0.8" />
              <path d="M25 80 C5 95 10 120 45 100" fill="#4ade80" opacity="0.7" />
              <g transform="translate(45, 55)">
                <circle cx="0" cy="0" r="22" fill="#fbcfe8" />
                <path d="M-12 -12 C0 -24 18 -12 12 6 C6 18 -18 12 -12 -12 Z" fill="#f472b6" opacity="0.9" />
                <path d="M-6 -6 C0 -12 10 -6 6 4 C2 10 -10 6 -6 -6 Z" fill="#ec4899" />
                <circle cx="0" cy="0" r="4" fill="#fbbf24" />
              </g>
              <g transform="translate(20, 85)">
                <circle cx="0" cy="0" r="14" fill="#e9d5ff" />
                <circle cx="0" cy="0" r="8" fill="#c084fc" opacity="0.9" />
                <circle cx="0" cy="0" r="3" fill="#fef08a" />
              </g>
            </svg>
          </motion.div>

          {/* Dedicated Rocking Cradle SVG (CSS rocking animation + baby breathing) */}
          <div className="relative animate-cradle">
            <svg width="240" height="210" viewBox="0 0 240 210" fill="none" className="drop-shadow-lg">
              {/* Golden Hanging Ribbons */}
              <path d="M65 0 L85 70" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="3 2" />
              <path d="M175 0 L155 70" stroke="#d4af37" strokeWidth="2.5" strokeDasharray="3 2" />
              {/* Bows on Ribbons */}
              <circle cx="65" cy="18" r="5" fill="#f472b6" />
              <circle cx="175" cy="18" r="5" fill="#c084fc" />

              {/* Cradle Hood / Canopy (Pastel Lavender & Pink Drapery) */}
              <path
                d="M50 85 C50 35, 120 30, 140 75"
                fill="#fce7f3"
                stroke="#d4af37"
                strokeWidth="2"
                opacity="0.9"
              />
              <path
                d="M48 85 C65 65, 100 55, 138 75"
                fill="#fae8ff"
                opacity="0.6"
              />

              {/* Cradle Outer Basket (Pastel Lavender with Gold Filigree Trim) */}
              <path
                d="M40 95 C40 155, 200 155, 200 95 L190 85 C175 140, 65 140, 50 85 Z"
                fill="#f3e8ff"
                stroke="#d4af37"
                strokeWidth="2.5"
              />

              {/* Cradle Rocker Curved Bottom Runners */}
              <path
                d="M30 165 Q120 195 210 165"
                stroke="#c59b27"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M55 145 L45 170"
                stroke="#c59b27"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M185 145 L195 170"
                stroke="#c59b27"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="120" cy="178" r="4" fill="#fbbf24" />

              {/* Soft Quilted Pillow inside cradle */}
              <ellipse cx="85" cy="100" rx="22" ry="14" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.5" />
              <ellipse cx="140" cy="110" rx="45" ry="18" fill="#fdf2f8" />

              {/* BABY RESTING INSIDE (Breathing Animation Group) */}
              <g className="animate-baby-breathe">
                {/* Baby Head */}
                <circle cx="85" cy="94" r="16" fill="#fde68a" stroke="#f59e0b" strokeWidth="0.8" />
                {/* Soft Cheeks */}
                <circle cx="80" cy="98" r="3" fill="#f43f5e" opacity="0.4" />
                <circle cx="91" cy="98" r="3" fill="#f43f5e" opacity="0.4" />
                {/* Closed Eyes */}
                <path d="M78 93 Q81 96 84 93" stroke="#78350f" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <path d="M88 93 Q91 96 94 93" stroke="#78350f" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                {/* Smile */}
                <path d="M83 100 Q85 102 87 100" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                {/* Golden Baby Cap / Headband with pink flower */}
                <path d="M72 88 Q85 79 98 88" stroke="#d4af37" strokeWidth="1.8" fill="none" />
                <circle cx="85" cy="81" r="3.5" fill="#f472b6" />
                <circle cx="85" cy="81" r="1.5" fill="#fef08a" />

                {/* Swaddled Baby Blanket Body with Golden Star */}
                <path
                  d="M92 98 C120 95, 170 102, 165 125 C145 135, 95 128, 88 112 Z"
                  fill="#fbcfe8"
                  stroke="#f472b6"
                  strokeWidth="1.5"
                />
                {/* Gold star on blanket */}
                <path
                  d="M130 110 L132 115 L137 116 L133 119 L134 124 L130 121 L126 124 L127 119 L123 116 L128 115 Z"
                  fill="#fbbf24"
                  opacity="0.85"
                />
              </g>

              {/* Decorative Stars and Hearts on Cradle Frame */}
              <circle cx="75" cy="122" r="3" fill="#d4af37" />
              <circle cx="120" cy="132" r="3" fill="#d4af37" />
              <circle cx="165" cy="122" r="3" fill="#d4af37" />
            </svg>
          </div>
        </div>

        {/* Emotionally Touching Quote */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="my-3 space-y-1.5"
        >
          <blockquote className="font-display italic text-lg sm:text-xl text-slate-800 leading-snug">
            “Tiny Hands, Tiny Feet,
            <br />
            <span className="text-pink-600 font-semibold">
              A Little Miracle We Can’t Wait to Meet!
            </span>”
          </blockquote>
          <p className="text-xs text-purple-700/80 font-medium">
            Celebrating the blessings of parenthood with Praveen &amp; Saran
          </p>
        </motion.div>

        {/* Action Button: "View Invitation 💌" */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6"
        >
          <button
            onClick={onContinue}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-base font-medium text-white shadow-xl shadow-pink-500/25 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 active:scale-95 transition-all border border-pink-300/40 cursor-pointer min-h-[48px]"
          >
            <MailOpen className="w-5 h-5 text-pink-100" />
            <span>View Invitation 💌</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
