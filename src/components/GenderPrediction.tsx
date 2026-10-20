import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, RotateCcw, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VoteStats } from '../types';
import { getStoredUserVote, getVoteStats, submitVote, removeVote, subscribeToVoteStream } from '../utils/api';

export const GenderPrediction: React.FC = () => {
  const [stats, setStats] = useState<VoteStats | null>(null);
  const [userVote, setUserVote] = useState<'boy' | 'girl' | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [votingAction, setVotingAction] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const loadAuthoritativeStats = useCallback(async () => {
    try {
      setError(null);
      const data = await getVoteStats();
      setStats(data);
      if (data.userChoice) {
        setUserVote(data.userChoice);
      } else {
        setUserVote(getStoredUserVote());
      }
    } catch (err) {
      console.error('Failed to load authoritative vote stats:', err);
      setError('Unable to reach the live voting database. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    loadAuthoritativeStats();

    // Subscribe to live Server-Sent Events stream for real-time live updates
    const unsubscribe = subscribeToVoteStream(
      (newStats) => {
        setStats(newStats);
        if (newStats.userChoice) {
          setUserVote(newStats.userChoice);
        }
      },
      () => {
        // SSE error fallback: keep polling quietly every 5 seconds
      }
    );

    // Backup polling every 5 seconds
    const interval = setInterval(() => {
      getVoteStats()
        .then((data) => {
          setStats(data);
          setError(null);
        })
        .catch(() => {
          // If offline, maintain error state
        });
    }, 5000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [loadAuthoritativeStats]);

  const handleVote = async (choice: 'boy' | 'girl') => {
    if (votingAction) return;

    // If already voted this exact choice, show informative toast
    if (userVote === choice) {
      setFeedback({
        message: `You have already cast your vote for ${choice === 'boy' ? 'Baby Boy (Little Prince) 👑' : 'Baby Girl (Little Princess) 🎀'}.`,
        type: 'info',
      });
      setTimeout(() => setFeedback(null), 3500);
      return;
    }

    setVotingAction(true);
    setError(null);

    const isChangingVote = userVote !== null && userVote !== choice;

    // Themed celebration burst
    if (choice === 'boy') {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#60a5fa', '#93c5fd', '#38bdf8', '#fbbf24', '#ffffff'],
      });
    } else {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#f472b6', '#fbcfe8', '#c084fc', '#fbbf24', '#ffffff'],
      });
    }

    try {
      const updated = await submitVote(choice);
      setStats(updated);
      setUserVote(choice);
      setFeedback({
        message: isChangingVote
          ? `Vote successfully updated to ${choice === 'boy' ? 'Team Little Prince 👑' : 'Team Little Princess 🎀'}!`
          : `Thank you! Your vote for ${choice === 'boy' ? 'Team Little Prince 👑' : 'Team Little Princess 🎀'} has been recorded!`,
        type: 'success',
      });
    } catch (err) {
      console.error('Failed to submit vote:', err);
      setError('Could not record your vote to the database. Please try again.');
    } finally {
      setVotingAction(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleRetractVote = async () => {
    if (votingAction || !userVote) return;
    setVotingAction(true);
    try {
      const updated = await removeVote();
      setStats(updated);
      setUserVote(null);
      setFeedback({
        message: 'Your previous vote has been removed. You can cast a fresh vote anytime!',
        type: 'info',
      });
    } catch (err) {
      console.error('Failed to retract vote:', err);
      setError('Failed to retract vote. Please try again.');
    } finally {
      setVotingAction(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <section id="prediction" className="relative w-full max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-pink-200/90 shadow-xl shadow-purple-500/10 p-6 sm:p-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-xs font-semibold text-pink-700 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Live Guest Poll</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800">
            Guess the Little One! 🍼
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-slate-600 mt-1">
            What do you think Praveen &amp; Saran are waiting for?
          </p>
        </div>

        {/* Database Error Banner (Never showing fake numbers on failure) */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={loadAuthoritativeStats}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all shrink-0 cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Friendly Confirmation / Update Feedback Toast */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-3.5 rounded-2xl text-center text-sm font-medium shadow-md flex items-center justify-center gap-2 ${
                feedback.type === 'success'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-purple-100 border border-purple-200 text-purple-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>{feedback.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Spinner for initial database load */}
        {loading && !stats ? (
          <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
            <span className="text-xs font-medium">Connecting to live voting database...</span>
          </div>
        ) : (
          <>
            {/* Two Voting Cards Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Baby Boy (Little Prince) */}
              <div
                onClick={() => handleVote('boy')}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer border-2 text-center select-none flex flex-col items-center justify-between min-h-[310px] ${
                  userVote === 'boy'
                    ? 'bg-gradient-to-b from-blue-50/95 to-sky-100/95 border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.02]'
                    : 'bg-gradient-to-b from-slate-50/70 to-blue-50/40 border-blue-200/70 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                {/* Active Selection Badge */}
                {userVote === 'boy' && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-blue-700 bg-white/95 px-2.5 py-1 rounded-full shadow-sm border border-blue-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Your Active Vote</span>
                  </span>
                )}

                {/* Baby Boy SVG Illustration */}
                <div className="my-2">
                  <svg width="120" height="110" viewBox="0 0 120 110" fill="none">
                    <ellipse cx="60" cy="95" rx="45" ry="12" fill="#dbeafe" />
                    <ellipse cx="60" cy="62" rx="36" ry="26" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.5" />
                    <circle cx="60" cy="40" r="22" fill="#fde68a" stroke="#f59e0b" strokeWidth="0.8" />
                    <circle cx="50" cy="46" r="3.5" fill="#f87171" opacity="0.4" />
                    <circle cx="70" cy="46" r="3.5" fill="#f87171" opacity="0.4" />
                    <path d="M48 39 Q52 43 56 39" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    <path d="M64 39 Q68 43 72 39" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    <path d="M57 48 Q60 51 63 48" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M48 20 L54 28 L60 18 L66 28 L72 20 L70 30 L50 30 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                    <circle cx="60" cy="18" r="2" fill="#3b82f6" />
                    <path d="M54 62 L66 62 L60 67 Z" fill="#2563eb" />
                    <path d="M54 72 L66 72 L60 67 Z" fill="#2563eb" />
                    <circle cx="60" cy="67" r="2" fill="#fbbf24" />
                  </svg>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-blue-600 block mb-0.5">
                    Little Prince
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-1.5">
                    <span>Baby Boy</span>
                    <span className="text-blue-500">💙</span>
                  </h3>
                  {stats && (
                    <p className="text-xs font-semibold text-blue-700 mt-1 tabular-nums">
                      {stats.boyPct}% ({stats.boy} {stats.boy === 1 ? 'vote' : 'votes'})
                    </p>
                  )}
                </div>

                <div className="w-full mt-4">
                  <button
                    type="button"
                    disabled={votingAction}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
                      userVote === 'boy'
                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                        : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {userVote === 'boy' ? 'Selected • Team Prince 👑' : userVote === 'girl' ? 'Switch to Baby Boy 💙' : 'Vote Baby Boy 👑'}
                  </button>
                </div>
              </div>

              {/* Card 2: Baby Girl (Little Princess) */}
              <div
                onClick={() => handleVote('girl')}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer border-2 text-center select-none flex flex-col items-center justify-between min-h-[310px] ${
                  userVote === 'girl'
                    ? 'bg-gradient-to-b from-pink-50/95 to-rose-100/95 border-pink-500 shadow-xl shadow-pink-500/20 scale-[1.02]'
                    : 'bg-gradient-to-b from-slate-50/70 to-pink-50/40 border-pink-200/70 hover:border-pink-400 hover:shadow-md'
                }`}
              >
                {/* Active Selection Badge */}
                {userVote === 'girl' && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-pink-700 bg-white/95 px-2.5 py-1 rounded-full shadow-sm border border-pink-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />
                    <span>Your Active Vote</span>
                  </span>
                )}

                {/* Baby Girl SVG Illustration */}
                <div className="my-2">
                  <svg width="120" height="110" viewBox="0 0 120 110" fill="none">
                    <ellipse cx="60" cy="95" rx="45" ry="12" fill="#fce7f3" />
                    <ellipse cx="60" cy="62" rx="36" ry="26" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1.5" />
                    <circle cx="60" cy="40" r="22" fill="#fde68a" stroke="#f59e0b" strokeWidth="0.8" />
                    <circle cx="50" cy="46" r="3.5" fill="#f43f5e" opacity="0.45" />
                    <circle cx="70" cy="46" r="3.5" fill="#f43f5e" opacity="0.45" />
                    <path d="M48 39 Q52 43 56 39" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    <path d="M64 39 Q68 43 72 39" stroke="#78350f" strokeWidth="1.6" strokeLinecap="round" fill="none" />
                    <path d="M57 48 Q60 51 63 48" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M40 32 Q60 22 80 32" stroke="#d4af37" strokeWidth="2" fill="none" />
                    <circle cx="60" cy="23" r="5" fill="#f472b6" />
                    <circle cx="54" cy="23" r="3.5" fill="#fbcfe8" />
                    <circle cx="66" cy="23" r="3.5" fill="#fbcfe8" />
                    <circle cx="60" cy="23" r="2" fill="#fbbf24" />
                  </svg>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-pink-600 block mb-0.5">
                    Little Princess
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-1.5">
                    <span>Baby Girl</span>
                    <span className="text-pink-500">💗</span>
                  </h3>
                  {stats && (
                    <p className="text-xs font-semibold text-pink-700 mt-1 tabular-nums">
                      {stats.girlPct}% ({stats.girl} {stats.girl === 1 ? 'vote' : 'votes'})
                    </p>
                  )}
                </div>

                <div className="w-full mt-4">
                  <button
                    type="button"
                    disabled={votingAction}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
                      userVote === 'girl'
                        ? 'bg-pink-600 text-white shadow-md hover:bg-pink-700'
                        : 'bg-white text-pink-700 border border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    {userVote === 'girl' ? 'Selected • Team Princess 🎀' : userVote === 'boy' ? 'Switch to Baby Girl 💗' : 'Vote Baby Girl 🎀'}
                  </button>
                </div>
              </div>

            </div>

            {/* Authoritative Calculation & Live Percentage Bar Section */}
            {stats && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                
                {/* Result Labels formatted as requested in the specification */}
                <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left items-center">
                    
                    <div className="text-blue-700">
                      <span className="text-xs font-semibold uppercase tracking-wider block text-slate-500">
                        Baby Boy 💙
                      </span>
                      <span className="text-lg font-bold font-display tabular-nums">
                        {stats.boyPct}%
                      </span>
                      <span className="text-xs text-slate-600 ml-1.5 tabular-nums">
                        ({stats.boy} {stats.boy === 1 ? 'vote' : 'votes'})
                      </span>
                      {stats.total > 0 && stats.exactBoyPct && (
                        <span className="text-[10px] text-slate-400 block tabular-nums">
                          Exact: {stats.exactBoyPct}%
                        </span>
                      )}
                    </div>

                    <div className="text-pink-700 sm:text-center">
                      <span className="text-xs font-semibold uppercase tracking-wider block text-slate-500">
                        Baby Girl 💗
                      </span>
                      <span className="text-lg font-bold font-display tabular-nums">
                        {stats.girlPct}%
                      </span>
                      <span className="text-xs text-slate-600 ml-1.5 tabular-nums">
                        ({stats.girl} {stats.girl === 1 ? 'vote' : 'votes'})
                      </span>
                      {stats.total > 0 && stats.exactGirlPct && (
                        <span className="text-[10px] text-slate-400 block tabular-nums">
                          Exact: {stats.exactGirlPct}%
                        </span>
                      )}
                    </div>

                    <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                      <span className="text-xs font-semibold uppercase tracking-wider block text-slate-500">
                        Total Votes
                      </span>
                      <span className="text-xl font-bold font-display text-slate-900 tabular-nums">
                        {stats.total}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Animated Percentage Bar */}
                {stats.total === 0 ? (
                  <div className="w-full h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden flex items-center justify-center border border-slate-200">
                    <span className="text-[10px] font-medium text-slate-400 tracking-wide">
                      No votes yet — 0% for both options
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-4 sm:h-5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner border border-slate-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.boyPct}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-gradient-to-r from-blue-400 to-sky-500 h-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20" />
                    </motion.div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.girlPct}%` }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-gradient-to-r from-pink-400 to-rose-500 h-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20" />
                    </motion.div>
                  </div>
                )}

                {/* Status & Change Vote Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 mt-3">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-time live sync active</span>
                  </div>

                  {userVote && (
                    <div className="flex items-center gap-3">
                      <span className="text-slate-700 font-medium">
                        Your pick: <strong>{userVote === 'boy' ? 'Baby Boy 💙' : 'Baby Girl 💗'}</strong>
                      </span>
                      <button
                        onClick={handleRetractVote}
                        disabled={votingAction}
                        className="inline-flex items-center gap-1 text-[11px] text-purple-700 hover:text-purple-900 underline font-medium cursor-pointer"
                        title="Remove your vote to clear or vote again"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Retract / Change Vote</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}
          </>
        )}

        {/* Disclaimer / Note as specified */}
        <div className="mt-6 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-center">
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            ✨ <strong>Just for fun – the real surprise awaits!</strong> ✨
            <br />
            <span className="text-amber-800/80 font-normal">
              This friendly family poll is purely for fun and celebration. Each visitor is granted 1 active vote per browser session, which you can switch or update anytime.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};
