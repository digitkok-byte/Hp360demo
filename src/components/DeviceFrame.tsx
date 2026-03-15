'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrtOverlays from './CrtOverlays';
import StateOff from './StateOff';
import BootSequence from './BootSequence';
import MenuView from './MenuView';

type AppState = 'off' | 'boot' | 'menu';

export default function DeviceFrame() {
  const [state, setState] = useState<AppState>('off');
  const [showFlash, setShowFlash] = useState(false);

  const handlePower = useCallback(() => {
    if (state === 'off') {
      setShowFlash(true);
      setTimeout(() => setShowFlash(false), 500);
      setState('boot');
    } else if (state === 'menu') {
      setState('off');
    }
  }, [state]);

  const handleBootComplete = useCallback(() => {
    setState('menu');
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Workshop background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg-workshop.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3) saturate(0.7)',
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(10,28,10,0.5) 0%, rgba(6,12,6,0.85) 70%)',
        }}
      />
      {/* Device body */}
      <div
        className="relative z-[1] grid grid-rows-[1fr_auto] w-[min(420px,100vw)] h-[min(760px,100svh)]"
        style={{
          background: `linear-gradient(155deg,
            #7a9882 0%, #6a8870 20%, #5e7c64 40%,
            #527060 65%, #3e5a48 85%, #2e4436 100%)`,
          borderRadius: 'clamp(14px, 3vw, 22px)',
          padding: 'clamp(12px, 3vw, 18px) clamp(12px, 3vw, 18px) clamp(8px, 2vw, 12px)',
          boxShadow: `
            0 0 0 1px #8aac90,
            0 0 0 3px #1a2a1c,
            inset 2px 2px 4px rgba(255,255,255,0.10),
            inset -2px -2px 4px rgba(0,0,0,0.40),
            inset 0 0 20px rgba(0,0,0,0.15),
            6px 14px 44px rgba(0,0,0,0.85),
            0 4px 80px rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Worn texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] mix-blend-overlay opacity-[0.06]"
          style={{
            borderRadius: 'clamp(14px, 3vw, 22px)',
            background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E") repeat`,
          }}
        />

        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 'clamp(8px, 2vw, 14px)',
            background: 'var(--color-screen-bg)',
            border: '2px solid #111a12',
            boxShadow: state === 'menu'
              ? `inset 0 0 30px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(74,190,121,0.12),
                 0 0 30px rgba(74,190,121,0.08), 0 0 60px rgba(74,190,121,0.04)`
              : `inset 0 0 50px rgba(0,0,0,0.95), inset 2px 2px 8px rgba(0,0,0,0.7),
                 inset -2px -2px 8px rgba(0,0,0,0.7), inset 0 0 0 2px #111a12,
                 0 0 4px rgba(74,190,121,0.04)`,
            transition: 'box-shadow 0.5s ease',
          }}
        >
          {/* Background motion + grid pattern */}
          <div
            className="absolute pointer-events-none z-0"
            style={{
              inset: '-10%',
              width: '120%',
              height: '120%',
              background: `
                linear-gradient(135deg, rgba(74,190,121,0.04) 0%, transparent 50%),
                radial-gradient(ellipse at 30% 40%, rgba(74,190,121,0.07) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 70%, rgba(45,138,85,0.05) 0%, transparent 40%)
              `,
              animation: 'ken-burns 16s ease-in-out infinite alternate',
            }}
          />
          {/* CRT grid / circuit board background */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(74,190,121,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74,190,121,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }}
          />

          {/* CRT overlays — always visible */}
          <CrtOverlays />

          {/* Boot flash */}
          <AnimatePresence>
            {showFlash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0.1, 0.7, 0] }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-phosphor-bright pointer-events-none z-50"
              />
            )}
          </AnimatePresence>

          {/* States */}
          <AnimatePresence mode="wait">
            {state === 'off' && (
              <motion.div
                key="off"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <StateOff />
              </motion.div>
            )}

            {state === 'boot' && (
              <motion.div
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <BootSequence onComplete={handleBootComplete} />
              </motion.div>
            )}

            {state === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MenuView />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Power button area */}
        <div
          className="flex items-center justify-end gap-2 px-3 relative z-[5]"
          style={{
            padding: 'clamp(5px,1.5vw,8px) clamp(8px,2vw,12px) clamp(3px,1vw,5px)',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 100%)',
            borderTop: '1px solid rgba(0,0,0,0.3)',
            borderRadius: '0 0 calc(clamp(14px,3vw,22px) - 12px) calc(clamp(14px,3vw,22px) - 12px)',
            margin: '0 -2px -2px',
          }}
        >
          <span
            className="tracking-[0.2em]"
            style={{
              fontSize: 'clamp(8px, 2vw, 10px)',
              color: 'rgba(200,230,210,0.4)',
            }}
          >
            POWER
          </span>
          <button
            onClick={handlePower}
            aria-label="Включить устройство"
            className="relative cursor-pointer"
            style={{
              width: 'clamp(28px, 7vw, 36px)',
              height: 'clamp(18px, 4.5vw, 22px)',
              background: 'linear-gradient(135deg, #3a1a08, #5a2a10)',
              border: '1px solid #7a3a18',
              borderRadius: '3px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 6px rgba(0,0,0,0.5)',
            }}
          >
            <span
              className="absolute rounded-[2px]"
              style={{
                inset: '3px',
                background: 'var(--color-power-on)',
                boxShadow: `0 0 6px var(--color-power-on), 0 0 14px rgba(212,66,10,0.4)`,
                animation: 'power-pulse 2s ease-in-out infinite',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
