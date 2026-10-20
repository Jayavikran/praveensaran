import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Maximize2, Pause, Play } from 'lucide-react';
import { getAssetPath } from '../utils/assets';

interface MemoryItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  caption: string;
  tag: string;
}

const memories: MemoryItem[] = [
  {
    id: 'memory-kiss',
    image: getAssetPath('/assets/aistudio/WhatsApp_Image_2026-10-20_at_2.39.18_PM_657fb89f.jpeg'),
    title: 'A Forehead Kiss & Infinite Love',
    subtitle: 'Chapter I • Pure Affection',
    caption: 'A tender moment of promise, gratitude, and devotion as we await our precious bundle of joy.',
    tag: 'Forehead Kiss 🌸',
  },
  {
    id: 'memory-bump',
    image: getAssetPath('/assets/aistudio/WhatsApp_Image_2026-10-20_at_2.39.17_PM__1__578c2fab.jpeg'),
    title: 'Two Hearts Holding One Miracle',
    subtitle: 'Chapter II • The Miracle Within',
    caption: 'Our hands united around our little angel. Adorned in traditional glass bangles and boundless maternal love.',
    tag: 'Little Miracle 🍼',
  },
  {
    id: 'memory-gaze',
    image: getAssetPath('/assets/aistudio/WhatsApp_Image_2026-10-20_at_2.39.17_PM_7635eb39.jpeg'),
    title: 'Shared Smiles & Whispered Dreams',
    subtitle: 'Chapter III • Soulmates',
    caption: 'Catching each other&apos;s eyes and smiling at the wonderful new chapter unfolding before us.',
    tag: 'Shared Smiles ✨',
  },
  {
    id: 'memory-together',
    image: getAssetPath('/assets/aistudio/WhatsApp_Image_2026-10-20_at_2.39.16_PM_c0962596.jpeg'),
    title: 'Walking Hand in Hand',
    subtitle: 'Chapter IV • Journey Together',
    caption: 'Standing strong together with happy hearts, ready to become the happiest parents in the world.',
    tag: 'Hand in Hand 💖',
  },
  {
    id: 'memory-poster',
    image: getAssetPath('/assets/aistudio/WhatsApp_Image_2026-10-20_at_9.35.16_AM_c27c72a4.jpeg'),
    title: 'Baby Shower Celebration',
    subtitle: 'Chapter V • October 25, 2026',
    caption: 'Dressed in celebration silks, eagerly waiting to receive your warm blessings at Sivakasi Mandapam!',
    tag: 'The Celebration 💌',
  },
];

export const MemoriesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = window.setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  const activeMemory = memories[currentIndex];

  return (
    <section id="memories" className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-pink-200/90 shadow-xl shadow-purple-500/10 p-5 sm:p-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-xs font-semibold text-pink-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Nostalgic Moments</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800">
            Our Journey of Love 📸
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-slate-600 mt-1">
            Cherished milestones and real moments of Praveen &amp; Saran welcoming their little miracle
          </p>
        </div>

        {/* Carousel Showcase Container */}
        <div
          className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-pink-100/70 via-purple-50/80 to-pink-100/70 border-2 border-amber-300/80 p-2 sm:p-3 shadow-lg"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Visual Display with Ambient Glow Backdrop */}
          <div className="relative h-[480px] sm:h-[560px] w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
            
            {/* Ambient Blurred Background of the current photo */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`bg-${activeMemory.id}`}
                src={activeMemory.image}
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.45 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full object-cover filter blur-2xl scale-110 pointer-events-none"
              />
            </AnimatePresence>

            {/* Foreground Crisp Uncropped Portrait Photo */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeMemory.id}
                src={activeMemory.image}
                alt={activeMemory.title}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain drop-shadow-2xl mx-auto"
              />
            </AnimatePresence>

            {/* Scrim Overlay at the Bottom for Text Contrast */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-15" />

            {/* Tag Badge Top Left */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-semibold border border-amber-300/40 shadow-sm">
                <Heart className="w-3 h-3 fill-pink-400 text-pink-400" />
                <span>{activeMemory.tag}</span>
              </span>
            </div>

            {/* Fullscreen Zoom Trigger Top Right */}
            <button
              onClick={() => setZoomedImage(activeMemory.image)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-black/80 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer shadow-md"
              title="View full resolution"
              aria-label="Zoom image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Slide Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-xl backdrop-blur-md transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Previous memory"
            >
              <ChevronLeft className="w-5 h-5 text-slate-800" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-xl backdrop-blur-md transition-all active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Next memory"
            >
              <ChevronRight className="w-5 h-5 text-slate-800" />
            </button>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-20 text-white text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMemory.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-amber-300 text-xs font-semibold tracking-wider uppercase mb-0.5">
                    {activeMemory.subtitle}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                    {activeMemory.title}
                  </h3>
                  <p className="font-cormorant italic text-sm sm:text-base text-pink-100/95 mt-0.5 line-clamp-2 max-w-2xl drop-shadow-sm">
                    &ldquo;{activeMemory.caption}&rdquo;
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Golden Filigree Accents on Frame */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400 pointer-events-none" />
        </div>

        {/* Carousel Controls Bar */}
        <div className="flex items-center justify-between mt-4 px-1">
          {/* Pause / Play Autoplay Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-medium transition-colors min-h-[36px] cursor-pointer"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-pink-700" />
                <span>Play</span>
              </>
            )}
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {memories.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 h-2.5 bg-gradient-to-r from-pink-500 to-purple-600'
                    : 'w-2.5 h-2.5 bg-slate-200 hover:bg-pink-300'
                }`}
                aria-label={`Jump to memory ${idx + 1}`}
              />
            ))}
          </div>

          {/* Slide Count */}
          <span className="text-xs text-slate-500 font-medium tabular-nums">
            {currentIndex + 1} of {memories.length}
          </span>
        </div>

        {/* Interactive Thumbnail Gallery Strip */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mt-4 pt-4 border-t border-slate-100">
          {memories.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative rounded-xl overflow-hidden aspect-[3/4] border-2 transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-pink-500 ring-2 ring-pink-300 scale-[1.03] shadow-md'
                  : 'border-transparent opacity-65 hover:opacity-100'
              }`}
            >
              <img
                src={m.image}
                alt={m.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <span className="absolute bottom-1 left-1 right-1 text-[9px] sm:text-[10px] text-white font-medium bg-black/60 backdrop-blur-xs rounded px-1 truncate block text-center">
                {m.tag.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {zoomedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setZoomedImage(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[92vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Close (Esc) ✕
            </button>
            <img
              src={zoomedImage}
              alt="Praveen & Saran Memory Full View"
              className="w-full h-auto max-h-[84vh] object-contain rounded-2xl shadow-2xl border-2 border-amber-300"
            />
            <p className="text-white/90 text-xs mt-3 text-center font-serif italic">
              Praveen &amp; Saran • A Journey of Love &amp; Blessings
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
