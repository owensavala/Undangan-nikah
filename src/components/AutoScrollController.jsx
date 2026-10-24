import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Compass } from 'lucide-react';

export default function AutoScrollController({ isInvitationOpened, isEditing = false }) {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const idleTimerRef = useRef(null);
  const animFrameRef = useRef(null);
  const isInteractingRef = useRef(false);

  // Resume auto-scroll after inactivity
  const resetInactivityTimer = () => {
    isInteractingRef.current = true;
    setIsPausedByUser(true);

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Resume after 3.5 seconds of no interaction
    idleTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setIsPausedByUser(false);
    }, 3500);
  };

  useEffect(() => {
    if (!isInvitationOpened || isEditing || !isEnabled) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    // Delay start of auto-scroll for 2 seconds after opening so guest can admire the hero cover
    const startDelay = setTimeout(() => {
      const scrollLoop = () => {
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

        if (!isInteractingRef.current && isEnabled && !atBottom) {
          // Smooth micro scroll ~ 0.8px per frame for a gentle cinematic pace
          window.scrollBy({ top: 0.85, left: 0, behavior: 'instant' });
        }

        if (!atBottom) {
          animFrameRef.current = requestAnimationFrame(scrollLoop);
        }
      };

      animFrameRef.current = requestAnimationFrame(scrollLoop);
    }, 2000);

    // Event listeners to detect manual user scroll or touch
    const handleUserInteraction = () => {
      resetInactivityTimer();
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('mousedown', handleUserInteraction, { passive: true });

    return () => {
      clearTimeout(startDelay);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
    };
  }, [isInvitationOpened, isEditing, isEnabled]);

  if (!isInvitationOpened || isEditing) return null;

  return (
    <div className="fixed bottom-20 right-6 z-40">
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold-400/40 bg-[#0e1713]/90 text-gold-200 text-xs font-serif backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isEnabled && !isPausedByUser
            ? 'gold-glow border-gold-400 text-gold-300'
            : 'opacity-70 border-white/20'
        }`}
        title={isEnabled ? "Matikan Auto-Scroll" : "Nyalakan Auto-Scroll"}
      >
        {isEnabled && !isPausedByUser ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
            <span className="text-[11px] font-semibold">Auto-Scroll</span>
          </>
        ) : (
          <>
            <Pause className="w-3 h-3 text-gray-400" />
            <span className="text-[11px] text-gray-400">Jeda Scroll</span>
          </>
        )}
      </button>
    </div>
  );
}
