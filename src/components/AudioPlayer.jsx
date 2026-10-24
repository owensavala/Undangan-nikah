import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ audioUrl, isInvitationOpened }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.55;
    }
  }, []);

  useEffect(() => {
    if (isInvitationOpened && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log("Autoplay was prevented by browser:", err);
            setIsPlaying(false);
          });
      }
    }
  }, [isInvitationOpened]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      
      {/* Floating Audio Controller */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={togglePlay}
          aria-label="Toggle Background Music"
          className={`group flex items-center justify-center w-12 h-12 rounded-full border border-gold-400/50 bg-[#0e1713]/90 text-gold-300 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${
            isPlaying ? 'gold-glow ring-2 ring-gold-400/30' : 'opacity-70'
          }`}
        >
          <div className={`relative flex items-center justify-center ${isPlaying ? 'animate-spinSlow' : ''}`}>
            {isPlaying ? (
              <Music className="w-5 h-5 text-gold-300" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
          </div>
          
          {/* Subtle pulse wave if playing */}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold-500"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
}
