import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc } from 'lucide-react';

export default function AudioPlayer({ audioUrl, isInvitationOpened }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
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

  if (!isInvitationOpened) return null;

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      
      {/* Floating Audio Controller */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={togglePlay}
          aria-label="Toggle Background Music"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/85 hover:bg-black text-white shadow-2xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Disc className={`w-5 h-5 text-white ${isPlaying ? 'animate-spinSlow' : ''}`} />
        </button>
      </div>
    </>
  );
}
