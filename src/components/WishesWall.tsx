import React, { useState, useEffect } from 'react';
import { Heart, Send, MessageSquareHeart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Wish } from '../types';
import { getWishes, submitWish } from '../utils/api';

export const WishesWall: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postedSuccess, setPostedSuccess] = useState(false);

  useEffect(() => {
    getWishes().then(setWishes);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newWish = await submitWish(name, relation, message);
      setWishes((prev) => [newWish, ...prev]);
      setName('');
      setRelation('');
      setMessage('');
      setPostedSuccess(true);

      // Sweet celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ec4899', '#f43f5e', '#a855f7', '#fbbf24'],
      });

      setTimeout(() => setPostedSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to post wish:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-3xl bg-white/90 backdrop-blur-xl border border-pink-200/90 shadow-xl shadow-purple-500/10 p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-xs font-semibold text-pink-700 uppercase tracking-wider mb-2">
            <MessageSquareHeart className="w-3.5 h-3.5 text-pink-600" />
            <span>Guestbook of Blessings</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800">
            Shower Your Blessings 💖
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg text-slate-600 mt-1">
            Leave a loving message for Praveen, Saran, and their little angel
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-10 max-w-2xl mx-auto bg-pink-50/50 p-5 sm:p-6 rounded-2xl border border-pink-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="guest-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Your Name *
              </label>
              <input
                id="guest-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="guest-relation" className="block text-xs font-semibold text-slate-700 mb-1">
                Relation / Warm Note
              </label>
              <input
                id="guest-relation"
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="e.g. Athai, Chithi, Friend, Cousin"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="guest-message" className="block text-xs font-semibold text-slate-700 mb-1">
              Your Blessing or Wishes *
            </label>
            <textarea
              id="guest-message"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Wishing you a healthy, happy journey into parenthood with lots of love and joy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-between">
            {postedSuccess ? (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                ✨ Your blessing has been added to the wall!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                Shared with Praveen &amp; Saran
              </span>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || !message.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-semibold shadow-md disabled:opacity-50 transition-all cursor-pointer min-h-[40px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Posting...' : 'Post Blessing'}</span>
            </button>
          </div>
        </form>

        {/* Wishes Cards Grid (Only displayed if users have blessed) */}
        {wishes.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span>Recent Blessings</span>
              <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold tabular-nums">
                {wishes.length}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white border border-pink-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-800 text-sm">
                        {item.name}
                      </span>
                      {item.relation && (
                        <span className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md font-medium">
                          {item.relation}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed italic">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <div className="flex items-center gap-1 text-pink-500 font-medium">
                      <Heart className="w-3 h-3 fill-pink-500" />
                      <span>Blessed</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-5 px-4 rounded-2xl bg-pink-50/50 border border-dashed border-pink-200">
            <Sparkles className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-slate-700">
              Be the first to bless Praveen &amp; Saran!
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Submit your heartfelt message in the form above and it will be shared on this wall.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
