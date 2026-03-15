'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HoloLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Keep only red parts, remove white background
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Detect red: high R, low G and B
        const isRed = r > 150 && g < 100 && b < 100;
        // Detect white/light background
        const isWhite = r > 200 && g > 200 && b > 200;

        if (isWhite || !isRed) {
          data[i + 3] = 0; // transparent
        } else {
          // Map to red phosphor/neon palette
          const intensity = r / 255;
          data[i] = Math.min(255, Math.floor(255 * intensity));     // R — max bright
          data[i + 1] = Math.floor(60 * intensity);                  // G — slight
          data[i + 2] = Math.floor(70 * intensity);                  // B — slight
          data[i + 3] = 255;                                          // A — fully opaque
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setReady(true);
    };
    img.src = '/hp-logo.jpg';
  }, []);

  return (
    <div className="absolute bottom-[20%] left-[20%] pointer-events-none z-[3]">
      <motion.div
        animate={{
          opacity: [0.3, 0.45, 0.25, 0.4, 0.15, 0.35, 0.3],
          scaleY: [1, 1, 1.005, 1, 0.995, 1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="relative"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(255,50,60,0.5)) drop-shadow(0 0 20px rgba(255,30,40,0.25)) drop-shadow(0 0 35px rgba(255,20,30,0.12))',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-[clamp(90px,26vw,130px)] h-auto"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />

        {/* Scanlines over the logo */}
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              to bottom,
              transparent 0px,
              transparent 2px,
              rgba(0,0,0,0.15) 2px,
              rgba(0,0,0,0.15) 4px
            )`,
          }}
        />

        {/* Crawling scanline bar */}
        <motion.div
          className="absolute left-0 right-0 h-[3px] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(255,50,60,0.4), transparent)',
          }}
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}
