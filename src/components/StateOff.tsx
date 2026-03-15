'use client';

import { motion } from 'framer-motion';

interface StateOffProps {
  onStart: () => void;
}

export default function StateOff({ onStart }: StateOffProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#040904] z-[2]">
      {/* Static noise */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.05 0 0 0 0 0.18 0 0 0 0 0.07 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: 'noise-jitter 0.08s steps(1) infinite',
        }}
      />

      {/* Logo */}
      <div className="relative z-[2] text-center mb-8">
        <span className="block text-[clamp(14px,4vw,18px)] text-phosphor-mid tracking-[0.25em] opacity-20">
          HOOKAHPLACE
        </span>
        <span className="block text-[clamp(14px,4vw,18px)] text-phosphor-mid tracking-[0.25em] opacity-20">
          360
        </span>
      </div>

      {/* START button */}
      <motion.button
        onClick={onStart}
        className="relative z-[2] cursor-pointer group"
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(74,190,121,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Button body */}
        <div
          className="relative px-10 py-4 border-2 border-[rgba(74,190,121,0.5)] group-hover:border-[rgba(74,190,121,0.9)] transition-all duration-300"
          style={{
            background: 'rgba(74,190,121,0.05)',
            boxShadow: '0 0 20px rgba(74,190,121,0.1), inset 0 0 20px rgba(74,190,121,0.05)',
          }}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-phosphor opacity-70" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-phosphor opacity-70" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-phosphor opacity-70" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-phosphor opacity-70" />

          <span
            className="text-[clamp(18px,5vw,24px)] tracking-[0.3em] crt-text"
          >
            START
          </span>
        </div>
      </motion.button>

      {/* Hint text */}
      <motion.div
        className="relative z-[2] mt-6 text-[clamp(9px,2.5vw,11px)] text-phosphor-dim tracking-[0.15em] opacity-30"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        НАЖМИТЕ ДЛЯ ЗАПУСКА
      </motion.div>

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        }}
      />
    </div>
  );
}
