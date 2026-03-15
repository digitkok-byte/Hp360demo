'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, menuData } from '@/data/menu';
import type { MenuItem } from '@/data/menu';
import HoloFigure from './HoloFigure';
import HoloLogo from './HoloLogo';
import DishLanding from './DishLanding';

export default function MenuView() {
  const [activeCategory, setActiveCategory] = useState('hookah');
  const [clock, setClock] = useState('00:00:00');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(true);
  const [loadKey, setLoadKey] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(
        `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const data = menuData[activeCategory];

  const handleCategory = useCallback((id: string) => {
    setActiveCategory(id);
    setShowCategoryMenu(false);
    setLoadKey(k => k + 1);
  }, []);

  const currentLabel = categories.find(c => c.id === activeCategory)?.label || '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-[2] grid grid-rows-[auto_1fr] overflow-hidden"
    >
      {/* Header — two rows: centered logo on top, clock below */}
      <div className="border-b border-border-col bg-[rgba(6,18,9,0.9)]">
        {/* Logo row — centered */}
        <div className="text-[28px] font-semibold tracking-[0.2em] text-center py-3 pl-[5%] pr-[15px] animate-pulse" style={{ color: '#ff4050', textShadow: '0 0 12px rgba(255,64,80,1), 0 0 28px rgba(255,40,60,0.9), 0 0 50px rgba(255,20,40,0.6), 0 0 80px rgba(255,0,30,0.4), 0 0 120px rgba(255,0,20,0.2)' }}>
          HOOKAHPLACE <span style={{ color: '#ff6070', textShadow: '0 0 12px rgba(255,96,112,1), 0 0 28px rgba(255,70,90,0.9), 0 0 50px rgba(255,50,70,0.6), 0 0 80px rgba(255,30,50,0.4)' }}>360</span>
        </div>
        {/* Clock & RAD row */}
        <div className="flex items-center justify-center gap-3 pb-2 px-3">
          <div className="flex items-center gap-1">
            <svg viewBox="0 0 40 12" className="w-9 h-3" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="39" height="11" rx="1" fill="none" stroke="var(--color-phosphor-dim)" strokeWidth="1" />
              <rect
                x="0.5" y="0.5" width="39" height="11" rx="1"
                fill="none" stroke="var(--color-amber)" strokeWidth="1"
                strokeDasharray="32" strokeDashoffset="20"
                style={{ animation: 'rad-pulse 3s ease-in-out infinite' }}
              />
              <text x="4" y="9" fontFamily="Share Tech Mono, monospace" fontSize="7" fill="var(--color-amber)" opacity="0.9">RAD</text>
            </svg>
          </div>
          <div className="text-[16px] crt-text-dim tracking-[0.08em] border border-border-col px-2 py-0.5">
            {clock}
          </div>
        </div>
      </div>

      {/* Body — full width content, no sidebar */}
      <div className="flex flex-col overflow-hidden min-h-0 relative">
        {/* Category selector bar */}
        <button
          onClick={() => setShowCategoryMenu(true)}
          className="flex items-center gap-2 pl-[5%] pr-[15px] py-4 border-b border-border-col bg-[rgba(4,10,5,0.8)] cursor-pointer flex-shrink-0 hover:bg-[rgba(74,190,121,0.08)] transition-colors"
        >
          <div className="text-[28px] font-semibold tracking-[0.1em] crt-text-dim">
            {data?.title}
          </div>
          <div className="text-[clamp(12px,3.2vw,14px)] tracking-[0.12em] border border-[rgba(255,180,40,0.7)] rounded-md px-3 py-1.5 bg-[rgba(255,160,40,0.15)] flex-shrink-0 animate-pulse" style={{ color: '#ffcc40', textShadow: '0 0 10px rgba(255,180,40,1), 0 0 22px rgba(255,150,20,0.8), 0 0 40px rgba(255,120,10,0.5), 0 0 60px rgba(255,100,0,0.3)', boxShadow: '0 0 12px rgba(255,180,40,0.4), 0 0 24px rgba(255,140,20,0.15), inset 0 0 8px rgba(255,180,40,0.15)' }}>
            МЕНЮ
          </div>
        </button>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${loadKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-y-auto overflow-x-hidden pl-[5%] pr-[15px] py-4 crt-scroll"
          >
            {(() => {
              let itemIndex = 0;
              const totalItems = data?.sections.reduce((sum, s) => sum + (s.title ? 1 : 0) + s.items.length, 0) || 1;
              const delayPerItem = 2 / totalItems;
              return data?.sections.map((section, si) => (
                <div key={si} className={si > 0 ? 'mt-[60px]' : ''}>
                  {section.title && (() => {
                    const idx = itemIndex++;
                    return (
                      <motion.div
                        initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                        transition={{ delay: idx * delayPerItem, duration: 0.4, ease: 'easeOut' }}
                        className="text-[24px] font-semibold crt-text-dim tracking-[0.2em] py-3 pl-[10px] border-b-2 border-[rgba(74,190,121,0.35)] mb-[30px] uppercase"
                      >
                        {section.title}
                      </motion.div>
                    );
                  })()}
                  {section.items.map((item, ii) => {
                    const idx = itemIndex++;
                    return (
                      <motion.div
                        key={ii}
                        initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                        transition={{ delay: idx * delayPerItem, duration: 0.4, ease: 'easeOut' }}
                        whileHover={{
                          backgroundColor: 'rgba(74,190,121,0.08)',
                          transition: { duration: 0.1 },
                        }}
                        className="grid grid-cols-[1fr_auto_auto] items-baseline gap-2 py-[15px] border-b border-[rgba(74,190,121,0.1)] cursor-default"
                      >
                        <div>
                          <div className="text-[16px] crt-text-dim leading-[1.4]">
                            {item.name}
                            {item.tag && (
                              <span className="crt-text-amber text-[11px] border border-amber px-1 ml-1.5 align-middle tracking-[0.05em]">
                                {item.tag}
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <div className="text-[13px] crt-text-mid mt-[2px] opacity-70">
                              {item.desc}
                            </div>
                          )}
                        </div>
                        <div className="text-[16px] crt-text whitespace-nowrap">
                          {item.price} ₽
                        </div>
                        {(item.image || item.composition) && (
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="text-[16px] crt-text-dim hover:crt-text transition-all cursor-pointer p-1 leading-none"
                            title="Подробнее"
                          >
                            👁
                          </button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ));
            })()}
          </motion.div>
        </AnimatePresence>

        {/* Holographic logo — bottom left */}
        <HoloLogo />
        {/* Holographic figure — bottom right */}
        <HoloFigure />
      </div>

      {/* Fullscreen Category Menu overlay */}
      <AnimatePresence>
        {showCategoryMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[20] bg-[rgba(2,8,4,0.97)] flex flex-col"
          >
            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none z-[21]"
              style={{
                background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
              }}
            />

            {/* Category list */}
            <div className="flex-1 flex flex-col justify-center items-center gap-1 pl-[5%] pr-[15px] relative z-[22] overflow-y-auto">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  onClick={() => handleCategory(cat.id)}
                  className={`w-full max-w-[320px] text-center py-[18px] pl-[10px] text-[20px] font-semibold tracking-[0.15em] border-b border-[rgba(74,190,121,0.15)] transition-all cursor-pointer ${
                    cat.id === activeCategory
                      ? 'crt-text bg-[rgba(74,190,121,0.12)]'
                      : 'crt-text-dim hover:crt-text hover:bg-[rgba(74,190,121,0.08)]'
                  }`}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Bottom decorative line */}
            <motion.div
              className="h-[2px] flex-shrink-0"
              style={{ background: 'linear-gradient(to right, transparent, rgba(74,190,121,0.5), transparent)' }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dish Landing overlay */}
      <AnimatePresence>
        {selectedItem && (
          <DishLanding
            item={selectedItem}
            onBack={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
