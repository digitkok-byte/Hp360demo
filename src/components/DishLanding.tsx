'use client';

import { motion } from 'framer-motion';
import type { MenuItem } from '@/data/menu';

interface DishLandingProps {
  item: MenuItem;
  onBack: () => void;
}

export default function DishLanding({ item, onBack }: DishLandingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 z-[10] flex flex-col bg-[rgba(2,8,4,0.97)] overflow-hidden"
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[11]"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
        }}
      />

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-3 left-3 z-[12] text-[clamp(11px,3vw,13px)] crt-text-dim border border-border-col px-3 py-1.5 hover:bg-[rgba(74,190,121,0.15)] transition-colors cursor-pointer tracking-[0.1em]"
      >
        ← НАЗАД
      </button>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto crt-scroll pt-12 pb-6 px-4 relative z-[1]">
        {/* Image */}
        {item.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="relative w-full max-w-[85vw] mx-auto mb-4 rounded overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto object-cover"
              style={{
                filter: 'brightness(0.85) contrast(1.1) saturate(0.9)',
                boxShadow: '0 0 30px rgba(74,190,121,0.2), inset 0 0 60px rgba(0,0,0,0.3)',
              }}
            />
            {/* Green CRT overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(74,190,121,0.05), rgba(74,190,121,0.12))',
                mixBlendMode: 'overlay',
              }}
            />
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-phosphor opacity-60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-phosphor opacity-60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-phosphor opacity-60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-phosphor opacity-60" />
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[clamp(16px,4.5vw,20px)] crt-text leading-[1.35] mb-2 tracking-[0.05em]"
        >
          {item.name}
          {item.tag && (
            <span className="crt-text-amber text-[clamp(9px,2.2vw,11px)] border border-amber px-1 ml-2 align-middle tracking-[0.05em]">
              {item.tag}
            </span>
          )}
        </motion.h1>

        {/* Price & Weight row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="text-[clamp(18px,5vw,24px)] crt-text tracking-[0.08em]">
            {item.price} ₽
          </div>
          {item.weight && (
            <div className="text-[clamp(11px,3vw,13px)] crt-text-mid border border-border-col px-2 py-0.5">
              {item.weight}
            </div>
          )}
        </motion.div>

        {/* Description */}
        {item.desc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[clamp(11px,3vw,13px)] crt-text-dim leading-[1.6] mb-3 opacity-80"
          >
            {item.desc}
          </motion.div>
        )}

        {/* Composition */}
        {item.composition && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-3 border border-border-col p-3"
          >
            <div className="text-[clamp(9px,2.5vw,11px)] crt-text-mid tracking-[0.15em] mb-1.5">
              СОСТАВ
            </div>
            <div className="text-[clamp(11px,3vw,13px)] crt-text-dim leading-[1.6]">
              {item.composition}
            </div>
          </motion.div>
        )}

        {/* Calories */}
        {item.calories && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border border-[rgba(255,176,0,0.3)] p-3"
          >
            <div className="text-[clamp(9px,2.5vw,11px)] crt-text-amber tracking-[0.15em] mb-1.5">
              БЖУ
            </div>
            <div className="text-[clamp(11px,3vw,13px)] crt-text-dim leading-[1.6]">
              {item.calories}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="h-[2px] flex-shrink-0"
        style={{ background: 'linear-gradient(to right, transparent, rgba(74,190,121,0.5), transparent)' }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
