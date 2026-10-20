import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, PartyPopper } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Target: October 25, 2026 at 10:00:00 AM IST (+05:30)
  const targetDate = new Date('2026-10-25T10:00:00+05:30').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'text-pink-600', bg: 'bg-pink-50/80 border-pink-200' },
    { label: 'Hours', value: timeLeft.hours, color: 'text-purple-600', bg: 'bg-purple-50/80 border-purple-200' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'text-amber-600', bg: 'bg-amber-50/80 border-amber-200' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'text-rose-600', bg: 'bg-rose-50/80 border-rose-200' },
  ];

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-3xl bg-gradient-to-r from-pink-50/90 via-white/95 to-purple-50/90 backdrop-blur-xl border border-amber-200/90 shadow-xl shadow-pink-500/10 p-6 sm:p-10 text-center">
        
        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-xs font-semibold text-purple-700 uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5 text-purple-600" />
          <span>Counting Down The Moments</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800">
          Until We Celebrate Together 🍼✨
        </h2>
        <p className="font-cormorant italic text-base sm:text-lg text-slate-600 mt-1 mb-8">
          October 25, 2026 • 10:00 AM IST • Sivakasi Mandapam
        </p>

        {timeLeft.isPast ? (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white shadow-lg flex flex-col items-center gap-2">
            <PartyPopper className="w-10 h-10 text-amber-300 animate-bounce" />
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              The Celebration Has Begun! 🎉
            </h3>
            <p className="text-sm text-pink-100 max-w-md">
              Showering unconditional love and blessings on Praveen, Saran, and the precious bundle of joy!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className={`relative rounded-2xl p-4 sm:p-6 border shadow-sm ${unit.bg} flex flex-col items-center justify-center transition-all hover:scale-[1.02]`}
              >
                {/* Golden corner flourishes */}
                <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-amber-400 pointer-events-none" />
                <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-amber-400 pointer-events-none" />

                <span className={`text-3xl sm:text-4xl md:text-5xl font-bold font-display tabular-nums ${unit.color}`}>
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-xs uppercase tracking-widest font-semibold text-slate-600 mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-slate-400 mt-6">
          Synchronized to Indian Standard Time (IST UTC+05:30)
        </p>

      </div>
    </section>
  );
};
