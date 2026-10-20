import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { lullabyPlayer } from '../utils/audio';

interface MusicPlayerProps {
  autoStartOnOpen?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoStartOnOpen }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (autoStartOnOpen && !isPlaying) {
      lullabyPlayer.start();
      setIsPlaying(true);
    }
  }, [autoStartOnOpen]);

  const toggleSound = () => {
    const active = lullabyPlayer.toggle();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleSound}
        type="button"
        className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/80 shadow-md hover:shadow-lg hover:border-pink-300 transition-all text-pink-700 active:scale-95 min-h-[44px] min-w-[44px]"
        aria-label={isPlaying ? 'Mute background lullaby' : 'Play background lullaby'}
        title={isPlaying ? 'Mute lullaby music' : 'Play peaceful lullaby'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-pink-600 animate-pulse" />
            <div className="flex items-end gap-0.5 h-3.5 px-0.5" aria-hidden="true">
              <span className="w-0.5 bg-pink-500 rounded-full animate-bounce [animation-duration:800ms] h-2"></span>
              <span className="w-0.5 bg-purple-500 rounded-full animate-bounce [animation-duration:600ms] h-3.5"></span>
              <span className="w-0.5 bg-pink-500 rounded-full animate-bounce [animation-duration:900ms] h-1.5"></span>
            </div>
            <span className="text-xs font-medium text-pink-700 hidden sm:inline">Lullaby On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-pink-600 transition-colors" />
            <Music className="w-3.5 h-3.5 text-slate-400 group-hover:text-pink-600 transition-colors" />
            <span className="text-xs font-medium text-slate-500 hidden sm:inline group-hover:text-pink-700">Play Music</span>
          </>
        )}
      </button>
    </div>
  );
};
