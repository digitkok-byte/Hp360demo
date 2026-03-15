'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function HoloFigure() {
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

      // Convert to phosphor green monochrome + remove dark background
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Luminance — green channel dominant
        const lum = r * 0.15 + g * 0.75 + b * 0.1;

        // Threshold: remove blurred green background
        if (lum < 125) {
          data[i + 3] = 0; // transparent
        } else {
          // Map to phosphor green palette — boosted brightness
          const intensity = Math.min(255, (lum - 100) * 2.2);
          data[i] = Math.floor(intensity * 0.55);      // R
          data[i + 1] = Math.min(255, Math.floor(intensity * 1.1)); // G — brightest
          data[i + 2] = Math.floor(intensity * 0.75);    // B
          data[i + 3] = Math.min(255, Math.floor(intensity * 1.4)); // A — more opaque
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setReady(true);
    };
    img.src = '/vault-boy.png';
  }, []);

  return (
    <div className="absolute bottom-0 right-0 pointer-events-none z-[3]">
      <motion.div
        animate={{
          opacity: [0.6, 0.8, 0.55, 0.8, 0.25, 0.75, 0.6],
          scaleY: [1, 1, 1.005, 1, 0.995, 1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="relative"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(74,190,121,0.7)) drop-shadow(0 0 20px rgba(74,190,121,0.3))',
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-[clamp(130px,38vw,180px)] h-auto"
          style={{
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />

        {/* Scanlines over the figure */}
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
            background: 'linear-gradient(to bottom, transparent, rgba(74,190,121,0.4), transparent)',
          }}
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  );
}
