import React, { useState } from 'react';
import { MessageCircle, Copy, Check, Share2, X, Sparkles } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const whatsappMessage = `You are warmly invited to the Baby Shower Function of Praveen & Saran! 💗

📅 Date: October 25, 2026
🕙 Time: 10:00 AM
📍 Venue: Sivakasi Mandapam (https://maps.app.goo.gl/muGTnbVTF1vX3Aj56)

Join us to celebrate this beautiful moment filled with love and blessings. 🍼💐

We look forward to celebrating with you!
${currentUrl}`;

  const handleWhatsAppShare = () => {
    const encoded = encodeURIComponent(whatsappMessage);
    const url = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Baby Shower Invitation – Praveen & Saran',
          text: whatsappMessage,
          url: currentUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      handleWhatsAppShare();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const input = document.createElement('input');
      input.value = currentUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mb-3">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-slate-800">
            Share the Joy 💌
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Invite family &amp; beloved friends to Praveen &amp; Saran&apos;s Baby Shower
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* WhatsApp Direct Share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-medium text-sm shadow-md transition-all active:scale-[0.98] min-h-[48px] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Share on WhatsApp</span>
          </button>

          {/* Native Web Share API if supported on mobile */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium text-sm shadow-md transition-all active:scale-[0.98] min-h-[48px] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>More Sharing Options (Mobile)</span>
            </button>
          )}

          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-sm transition-all border border-slate-200 min-h-[44px] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Link Copied to Clipboard! ✨</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-600" />
                <span>Copy Invitation Link</span>
              </>
            )}
          </button>
        </div>

        {/* Message Preview Box */}
        <div className="mt-6 p-3.5 rounded-xl bg-pink-50/60 border border-pink-100 text-[11px] text-slate-600">
          <p className="font-semibold text-pink-700 mb-1">WhatsApp Preview:</p>
          <p className="whitespace-pre-line leading-relaxed italic line-clamp-4">
            {whatsappMessage}
          </p>
        </div>
      </div>
    </div>
  );
};
