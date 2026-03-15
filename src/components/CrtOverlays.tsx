'use client';

import { useEffect, useState, useCallback } from 'react';

export default function CrtOverlays() {
  const [glitchActive, setGlitchActive] = useState(false);
  const [touchGlitch, setTouchGlitch] = useState(false);
  const [touchGlitchKey, setTouchGlitchKey] = useState(0);

  // Passive random glitches
  useEffect(() => {
    const scheduleGlitch = () => {
      const delay = 3000 + Math.random() * 8000;
      const timer = setTimeout(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100 + Math.random() * 250);
        scheduleGlitch();
      }, delay);
      return timer;
    };
    const timer = scheduleGlitch();
    return () => clearTimeout(timer);
  }, []);

  // Touch/click triggered interference
  const handleTouch = useCallback(() => {
    setTouchGlitch(true);
    setTouchGlitchKey(k => k + 1);
    setTimeout(() => setTouchGlitch(false), 350);
  }, []);

  useEffect(() => {
    const handler = () => handleTouch();
    document.addEventListener('pointerdown', handler, { passive: true });
    return () => document.removeEventListener('pointerdown', handler);
  }, [handleTouch]);

  return (
    <>
      {/* Scanlines */}
      <div className="crt-scanlines absolute inset-0 z-[10]" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[11] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.8) 100%)`,
        }}
      />

      {/* Crawling scanline bar */}
      <div
        className="absolute left-0 right-0 h-[3px] z-[12] pointer-events-none opacity-[0.06]"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(74,190,121,0.9), transparent)',
          animation: 'scanline-bar 5s linear infinite',
        }}
      />

      {/* Passive phosphor flicker — subtle brightness pulsing */}
      <div
        className="absolute inset-0 z-[13] pointer-events-none"
        style={{
          animation: 'flicker 6s infinite',
          background: 'rgba(74,190,121,0.04)',
          opacity: 0,
        }}
      />

      {/* Passive random glitch — horizontal shift + stripes */}
      {glitchActive && (
        <div
          className="absolute inset-0 z-[14] pointer-events-none"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent ${2 + Math.random() * 3}px,
              rgba(74,190,121,0.1) ${2 + Math.random() * 3}px,
              rgba(74,190,121,0.1) ${3 + Math.random() * 5}px
            )`,
            transform: `translateX(${(Math.random() - 0.5) * 8}px) skewX(${(Math.random() - 0.5) * 3}deg)`,
          }}
        />
      )}

      {/* Touch-triggered interference */}
      {touchGlitch && (
        <div
          key={touchGlitchKey}
          className="absolute inset-0 z-[16] pointer-events-none crt-touch-glitch"
          style={{
            background: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 1px,
                rgba(74,190,121,0.12) 1px,
                rgba(74,190,121,0.12) 2px
              )
            `,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Screen surface reflection */}
      <div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 40%, rgba(74,190,121,0.02) 0%, transparent 70%)
          `,
        }}
      />
    </>
  );
}
