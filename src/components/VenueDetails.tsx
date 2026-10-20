import React from 'react';
import { MapPin, Navigation, Utensils, HeartHandshake } from 'lucide-react';

export const VenueDetails: React.FC = () => {
  const mapsUrl = 'https://maps.app.goo.gl/muGTnbVTF1vX3Aj56';

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-pink-200/90 shadow-xl shadow-purple-500/10 p-6 sm:p-10">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>Venue &amp; Hospitality</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800">
            Sivakasi Mandapam
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-slate-600 mt-1">
            Where hearts gather to celebrate new life and everlasting love
          </p>
        </div>

        {/* Feature Cards Grid (Auspicious Rituals & Traditional Feast) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
          
          <div className="p-5 rounded-2xl bg-gradient-to-b from-pink-50/70 to-white border border-pink-100 text-center flex flex-col items-center shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">Auspicious Rituals</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Valakaappu &amp; Seemantham blessings commencing promptly at 10:00 AM.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-50/70 to-white border border-purple-100 text-center flex flex-col items-center shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
              <Utensils className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-slate-800 text-sm">Traditional Feast</h4>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Sumptuous South Indian feast served with love following the ceremony.
            </p>
          </div>

        </div>

        {/* Action Link & Directions */}
        <div className="text-center pt-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Open Google Maps Directions</span>
          </a>
        </div>

      </div>
    </section>
  );
};
