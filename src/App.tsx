import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Share2, CalendarPlus, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { InvitationStage } from './types';
import { OpeningScreen } from './components/OpeningScreen';
import { BabyCradleAnimation } from './components/BabyCradleAnimation';
import { InvitationCard } from './components/InvitationCard';
import { MemoriesCarousel } from './components/MemoriesCarousel';
import { GenderPrediction } from './components/GenderPrediction';
import { CountdownTimer } from './components/CountdownTimer';
import { VenueDetails } from './components/VenueDetails';
import { WishesWall } from './components/WishesWall';
import { ShareModal } from './components/ShareModal';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingDecorations } from './components/FloatingDecorations';
import { downloadCalendarInvite } from './utils/calendar';

export default function App() {
  const [stage, setStage] = useState<InvitationStage>('opening');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const handleOpenInvitation = () => {
    // Start gentle instrumental lullaby on first interaction
    setMusicStarted(true);
    setStage('cradle');
  };

  const handleContinueToCard = () => {
    setStage('card');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayEntrance = () => {
    setStage('opening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-slate-800 font-outfit overflow-x-hidden selection:bg-pink-200 selection:text-pink-900">
      
      {/* Background Floating Hearts, Petals, and Golden Sparkles */}
      <FloatingDecorations density="medium" />

      {/* Floating Lullaby Music Player */}
      <MusicPlayer autoStartOnOpen={musicStarted} />

      {/* Animate Sequence: Opening Scene -> Cradle Scene -> Main Interactive Experience */}
      <AnimatePresence mode="wait">
        {stage === 'opening' && (
          <OpeningScreen key="opening" onOpen={handleOpenInvitation} />
        )}

        {stage === 'cradle' && (
          <BabyCradleAnimation key="cradle" onContinue={handleContinueToCard} />
        )}
      </AnimatePresence>

      {/* Main Invitation Website Experience (Shown when on 'card' stage) */}
      {stage === 'card' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="pb-24"
        >
          {/* Top Bar Contract: 3 Zones (Wordmark, Nav Links, Primary CTA) */}
          <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-xs">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
              
              {/* Zone 1: Single text element wordmark in display script */}
              <a
                href="#invitation"
                className="font-script text-2xl sm:text-3xl text-pink-700 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
              >
                Praveen &amp; Saran
              </a>

              {/* Zone 2: Concise single-line navigation links */}
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <a href="#invitation" className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0">
                  Invitation
                </a>
                <a href="#memories" className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0">
                  Memories
                </a>
                <a href="#countdown" className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0">
                  Countdown
                </a>
                <a href="#prediction" className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0">
                  Boy or Girl Poll
                </a>
                <a href="#venue" className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0">
                  Venue &amp; Rituals
                </a>
                <a href="#wishes" className="hover:text-pink-600 transition-colors whitespace-nowrap shrink-0">
                  Blessings Wall
                </a>
              </nav>

              {/* Zone 3: 1 Primary Action */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-sm hover:shadow-md transition-all whitespace-nowrap shrink-0 min-h-[40px] flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

            </div>
          </header>

          {/* Hero Welcome Banner */}
          <div className="text-center pt-8 pb-2 px-4 max-w-xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-purple-700 bg-purple-100/70 border border-purple-200/80 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Baby Shower Celebration</span>
            </span>
            <p className="font-cormorant italic text-lg sm:text-xl text-slate-600">
              Welcoming the little blessing with boundless joy and traditional warmth
            </p>
          </div>

          {/* Section 1: Main Invitation Card */}
          <div id="invitation">
            <InvitationCard onOpenShare={() => setIsShareModalOpen(true)} />
          </div>

          {/* Section 2: Cherished Memories Carousel */}
          <div id="memories">
            <MemoriesCarousel />
          </div>

          {/* Section 3: Countdown Timer */}
          <div id="countdown">
            <CountdownTimer />
          </div>

          {/* Section 3: Interactive Boy vs Girl Prediction Poll */}
          <div id="prediction">
            <GenderPrediction />
          </div>

          {/* Section 4: Venue & Hospitality Details */}
          <div id="venue">
            <VenueDetails />
          </div>

          {/* Section 5: Guestbook / Wishes Wall */}
          <div id="wishes">
            <WishesWall />
          </div>

          {/* Replay Entrance Button Footer Area */}
          <div className="text-center py-6 px-4">
            <button
              onClick={handleReplayEntrance}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-pink-200 text-slate-600 hover:text-pink-700 hover:border-pink-300 text-xs font-medium shadow-xs hover:shadow-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Entrance Animation</span>
            </button>
          </div>

          {/* Footer */}
          <footer className="text-center py-8 px-4 border-t border-pink-100/80 text-xs text-slate-500 space-y-2">
            <div className="flex items-center justify-center gap-2 text-pink-600 font-script text-2xl">
              <span>Praveen</span>
              <Heart className="w-4 h-4 fill-pink-500 text-pink-500 inline" />
              <span>Saran</span>
            </div>
            <p>
              October 25, 2026 • Sivakasi Mandapam • 10:00 AM IST
            </p>
            <p className="text-[11px] text-slate-400">
              Made with boundless love &amp; blessings for our upcoming little angel 🍼✨
            </p>
          </footer>

          {/* Mobile Bottom Sticky Action Bar (within 15% mobile viewport cap) */}
          <div className="fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-md border-t border-pink-200/80 shadow-lg md:hidden">
            <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
              <button
                onClick={downloadCalendarInvite}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 text-white text-xs font-semibold min-h-[44px]"
              >
                <CalendarPlus className="w-4 h-4 text-amber-300" />
                <span>Save Date</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold min-h-[44px]"
              >
                <Share2 className="w-4 h-4 text-pink-100" />
                <span>Share 💌</span>
              </button>
            </div>
          </div>

          {/* Share Modal Dialog */}
          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
          />
        </motion.div>
      )}

    </div>
  );
}
