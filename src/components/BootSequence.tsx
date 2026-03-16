'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const bootScript = [
  { text: '> HOOKAHPLACE 360 v3.0.1', bright: true },
  { text: '> INITIALIZING DISPLAY SYSTEM...', bright: false },
  { text: '> PHOSPHOR OK    SCANLINES OK', bright: false },
  { text: '> CRT TUBE WARMING UP...', bright: false },
  { text: '> LOADING MENU DATABASE...', bright: false },
  { text: '> [OK] 9 CATEGORIES / 89 ITEMS', bright: false },
  { text: '> RADIATION SENSOR: NOMINAL', bright: false },
  { text: '> CRT CALIBRATION COMPLETE', bright: false },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < bootScript.length; i++) {
        if (cancelled) return;
        await sleep(140);
        setVisibleLines(i + 1);
        setProgress(((i + 1) / bootScript.length) * 90);
      }
      await sleep(100);
      setProgress(100);
      await sleep(150);
      if (!cancelled) setReady(true);
      await sleep(400);
      if (!cancelled) onComplete();
    };

    run();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 bg-screen-bg z-[2] flex flex-col p-[clamp(16px,4vw,24px)] overflow-hidden">
      <div className="flex-1 flex flex-col gap-0">
        <AnimatePresence>
          {bootScript.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`text-[clamp(11px,3vw,14px)] leading-[1.7] whitespace-nowrap overflow-hidden ${
                line.bright ? 'crt-text' : 'crt-text-mid'
              }`}
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-3 border border-phosphor-dim h-[14px] relative overflow-hidden">
        <motion.div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, var(--color-phosphor-dim), var(--color-phosphor))',
            boxShadow: '0 0 8px var(--color-phosphor)',
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.15, ease: 'linear' }}
        />
      </div>

      {/* SYSTEM READY */}
      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="mt-3 text-[clamp(13px,3.5vw,16px)] crt-text"
        >
          &#9632; SYSTEM READY
        </motion.div>
      )}
    </div>
  );
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}
