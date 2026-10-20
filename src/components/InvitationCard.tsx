import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Heart, Sparkles, Maximize2, Share2, CalendarPlus, Check } from 'lucide-react';
import { downloadCalendarInvite, getGoogleCalendarUrl } from '../utils/calendar';

interface InvitationCardProps {
  onOpenShare: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({ onOpenShare }) => {
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const invitationImagePath = '/assets/aistudio/WhatsApp_Image_2026-10-20_at_9.35.16_AM_c27c72a4.jpeg';

  const handleSaveDate = () => {
    downloadCalendarInvite();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8">
      {/* Decorative Gold & Floral Frame Envelope */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white/95 via-pink-50/70 to-purple-50/80 backdrop-blur-xl border-2 border-amber-300/80 shadow-2xl shadow-pink-500/10 p-4 sm:p-8 overflow-hidden">
        
        {/* Subtle Golden Inner Border */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-amber-300/50 pointer-events-none" />

        {/* Corner Floral Motifs (Top-Left & Top-Right) */}
        <div className="absolute top-2 left-2 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none opacity-90">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M10 10 Q50 15 80 10" stroke="#d4af37" strokeWidth="1.5" />
            <path d="M10 10 Q15 50 10 80" stroke="#d4af37" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="14" fill="#fbcfe8" opacity="0.8" />
            <circle cx="45" cy="20" r="10" fill="#e9d5ff" opacity="0.8" />
            <circle cx="20" cy="45" r="10" fill="#f472b6" opacity="0.7" />
            <circle cx="28" cy="28" r="4" fill="#fbbf24" />
          </svg>
        </div>

        <div className="absolute top-2 right-2 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none opacity-90">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full scale-x-[-1]">
            <path d="M10 10 Q50 15 80 10" stroke="#d4af37" strokeWidth="1.5" />
            <path d="M10 10 Q15 50 10 80" stroke="#d4af37" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="14" fill="#fbcfe8" opacity="0.8" />
            <circle cx="45" cy="20" r="10" fill="#e9d5ff" opacity="0.8" />
            <circle cx="20" cy="45" r="10" fill="#f472b6" opacity="0.7" />
            <circle cx="28" cy="28" r="4" fill="#fbbf24" />
          </svg>
        </div>

        {/* Card Header: Cute Baby Footprints & Auspicious Blessing */}
        <div className="relative z-10 text-center pt-4 pb-2">
          {/* Baby Footprints Icon Motif */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-amber-400"></span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200/80">
              {/* Pink & Purple Footprints */}
              <svg width="18" height="20" viewBox="0 0 24 30" fill="#ec4899">
                <ellipse cx="12" cy="20" rx="6.5" ry="8" />
                <circle cx="6.5" cy="7" r="2.2" />
                <circle cx="10" cy="5" r="2.3" />
                <circle cx="14" cy="5.2" r="2.1" />
                <circle cx="17.5" cy="7" r="1.8" />
              </svg>
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
              <svg width="18" height="20" viewBox="0 0 24 30" fill="#a855f7">
                <ellipse cx="12" cy="20" rx="6.5" ry="8" />
                <circle cx="6.5" cy="7" r="2.2" />
                <circle cx="10" cy="5" r="2.3" />
                <circle cx="14" cy="5.2" r="2.1" />
                <circle cx="17.5" cy="7" r="1.8" />
              </svg>
            </div>
            <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-amber-400"></span>
          </div>

          <p className="font-serif italic text-base sm:text-lg text-amber-800/90 tracking-wide">
            With Joyful Hearts &amp; God&apos;s Blessings
          </p>

          <h2 className="font-display uppercase tracking-[0.22em] text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            Baby Shower <span className="text-pink-600">Function</span>
          </h2>

          <div className="w-16 h-0.5 mx-auto mt-2 bg-gradient-to-r from-pink-400 via-amber-400 to-purple-400 rounded-full" />
        </div>

        {/* Main Grid: Responsive 2-Column Split (Desktop) / Vertical Stack (Mobile) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
          
          {/* Column 1: Couple Photo with Golden Royal Framing */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px] rounded-2xl p-2 bg-gradient-to-tr from-amber-300 via-pink-200 to-amber-300 shadow-xl shadow-pink-500/15">
              <div className="relative rounded-xl overflow-hidden bg-white shadow-inner aspect-[2/3]">
                <img
                  src={invitationImagePath}
                  alt="Praveen and Saran - Baby Shower Invitation"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="eager"
                />

                {/* Hover overlay hint */}
                <button
                  onClick={() => setIsPhotoZoomed(true)}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium hover:bg-black/80 transition-all opacity-90 hover:opacity-100 min-h-[36px]"
                  title="View full invitation image"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Zoom Card</span>
                </button>
              </div>

              {/* Decorative Corner Filigrees on Photo */}
              <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-amber-500 pointer-events-none rounded-tl-sm" />
              <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-amber-500 pointer-events-none rounded-tr-sm" />
              <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-amber-500 pointer-events-none rounded-bl-sm" />
              <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-amber-500 pointer-events-none rounded-br-sm" />
            </div>

            <p className="text-xs text-slate-500 mt-2 italic flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Praveen &amp; Saran • Celebrating Love &amp; Life
            </p>
          </div>

          {/* Column 2: Event Details, Couple Names, and Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
            
            {/* Couple Names */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-700/80">
                Celebrating Parents-To-Be
              </span>
              <h1 className="font-script text-5xl sm:text-6xl md:text-7xl text-pink-700 my-1 leading-tight drop-shadow-sm">
                Praveen &amp; Saran
              </h1>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-pink-500 my-1">
                <span className="h-px w-10 bg-pink-300"></span>
                <Heart className="w-4 h-4 fill-pink-500" />
                <span className="h-px w-10 bg-pink-300"></span>
              </div>
            </div>

            {/* Invitation Message */}
            <blockquote className="font-cormorant italic text-lg sm:text-xl text-slate-700 leading-relaxed border-y border-pink-200/60 py-3 bg-white/40 rounded-xl px-4">
              “We are delighted to invite you to our Baby Shower function. Join us as we celebrate a precious new chapter filled with love, blessings, and happiness.”
            </blockquote>

            {/* Event Details Grid with Icons matching the card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              
              {/* Date Card */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-purple-200 shadow-sm hover:border-purple-300 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-600 block">
                    Date
                  </span>
                  <span className="text-base font-bold text-slate-800 font-display">
                    Oct 25, 2026
                  </span>
                  <span className="text-[11px] text-slate-500 block">Sunday</span>
                </div>
              </div>

              {/* Time Card */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-pink-200 shadow-sm hover:border-pink-300 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center text-pink-700 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-600 block">
                    Time
                  </span>
                  <span className="text-base font-bold text-slate-800 font-display">
                    10:00 AM
                  </span>
                  <span className="text-[11px] text-slate-500 block">Indian Standard Time</span>
                </div>
              </div>

              {/* Venue Card */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-amber-200 shadow-sm hover:border-amber-300 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block">
                    Venue
                  </span>
                  <span className="text-base font-bold text-slate-800 font-display">
                    Sivakasi Mandapam
                  </span>
                  <a
                    href="https://maps.app.goo.gl/muGTnbVTF1vX3Aj56"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-purple-700 hover:underline font-medium block"
                  >
                    View on Map →
                  </a>
                </div>
              </div>

            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Save Date / Calendar Download */}
              <button
                onClick={handleSaveDate}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm font-medium shadow-md hover:shadow-lg transition-all active:scale-95 min-h-[44px]"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Saved to Calendar!</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4 text-amber-300" />
                    <span>Save the Date 📅</span>
                  </>
                )}
              </button>

              {/* Google Calendar Link */}
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white border border-slate-300 hover:border-purple-300 text-slate-700 text-sm font-medium shadow-sm hover:shadow transition-all min-h-[44px]"
              >
                <span className="text-xs">Add to Google Cal</span>
              </a>

              {/* Share Invitation */}
              <button
                onClick={onOpenShare}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-sm font-medium shadow-md shadow-pink-500/20 transition-all active:scale-95 min-h-[44px]"
              >
                <Share2 className="w-4 h-4 text-pink-200" />
                <span>Share Invitation 💌</span>
              </button>
            </div>

            {/* Bottom Card Accents: Teddy & Booties Illustration Motif */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-1 text-slate-500 text-xs">
              <span className="inline-flex items-center gap-1.5">
                🧸 <span>Cute Teddy Bear</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                🍼 <span>Warm Blessings</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                👡 <span>Traditional Feast</span>
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {isPhotoZoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setIsPhotoZoomed(false)}
        >
          <div
            className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPhotoZoomed(false)}
              className="absolute -top-12 right-0 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium transition-colors"
            >
              Close (Esc) ✕
            </button>
            <img
              src={invitationImagePath}
              alt="Praveen and Saran Full Baby Shower Invitation"
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl border-2 border-amber-300"
            />
            <p className="text-white/80 text-xs mt-3 text-center">
              Original Invitation Card – Praveen &amp; Saran Baby Shower
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
