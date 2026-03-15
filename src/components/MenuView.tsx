'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, menuData } from '@/data/menu';
import type { MenuItem } from '@/data/menu';
import HoloFigure from './HoloFigure';
import DishLanding from './DishLanding';

export default function MenuView() {
  const [activeCategory, setActiveCategory] = useState('hookah');
  const [clock, setClock] = useState('00:00:00');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

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
  }, []);

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
        <div className="text-[clamp(16px,4.5vw,20px)] tracking-[0.2em] crt-text text-center py-2.5 px-3">
          HOOKAHPLACE <span className="crt-text">360</span>
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
          <div className="text-[clamp(12px,3.2vw,14px)] crt-text-dim tracking-[0.08em] border border-border-col px-2 py-0.5">
            {clock}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-[auto_1fr] overflow-hidden min-h-0 relative">
        {/* Category Nav — much more spacing */}
        <nav className="flex flex-col border-r border-[rgba(74,190,121,0.25)] overflow-y-auto overflow-x-hidden bg-[rgba(4,10,5,0.7)] min-w-[clamp(100px,30vw,130px)] w-[clamp(100px,30vw,130px)] flex-shrink-0 crt-scroll">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className={`block w-full text-left px-3 py-[clamp(44px,13vw,72px)] text-[clamp(12px,3.5vw,15px)] leading-[1.35] border-l-[3px] transition-all duration-150 break-words ${
                i < categories.length - 1 ? 'border-b border-[rgba(74,190,121,0.12)]' : ''
              } ${
                cat.id === activeCategory
                  ? 'crt-text border-l-phosphor bg-[rgba(74,190,121,0.15)]'
                  : 'crt-text-dim border-l-transparent hover:bg-[rgba(74,190,121,0.07)] hover:border-l-phosphor-dim'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex flex-col overflow-hidden min-h-0 relative">
          {/* Category title */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + '-title'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="px-3 py-2.5 text-[clamp(15px,4vw,18px)] tracking-[0.1em] crt-text border-b border-border-col flex-shrink-0"
            >
              {data?.title}
            </motion.div>
          </AnimatePresence>

          {/* Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 crt-scroll"
            >
              {data?.sections.map((section, si) => (
                <div key={si} className={si > 0 ? 'mt-5' : ''}>
                  {section.title && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: si * 0.08 }}
                      className="text-[clamp(10px,2.8vw,12px)] crt-text-mid tracking-[0.18em] py-3 pb-2 border-b border-[rgba(74,190,121,0.25)] border-t border-t-[rgba(74,190,121,0.1)] mb-2"
                    >
                      {section.title}
                    </motion.div>
                  )}
                  {section.items.map((item, ii) => (
                    <motion.div
                      key={ii}
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: si * 0.06 + ii * 0.03 }}
                      whileHover={{
                        backgroundColor: 'rgba(74,190,121,0.08)',
                        transition: { duration: 0.1 },
                      }}
                      className="grid grid-cols-[1fr_auto_auto] items-baseline gap-2 py-[clamp(10px,3vw,14px)] border-b border-[rgba(74,190,121,0.15)] cursor-default"
                    >
                      <div>
                        <div className="text-[clamp(13px,3.5vw,15px)] crt-text-dim leading-[1.4]">
                          {item.name}
                          {item.tag && (
                            <span className="crt-text-amber text-[clamp(9px,2.2vw,11px)] border border-amber px-1 ml-1.5 align-middle tracking-[0.05em]">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        {item.desc && (
                          <div className="text-[clamp(9px,2.5vw,11px)] crt-text-mid mt-[2px] opacity-70">
                            {item.desc}
                          </div>
                        )}
                      </div>
                      <div className="text-[clamp(13px,3.5vw,15px)] crt-text whitespace-nowrap">
                        {item.price} ₽
                      </div>
                      {(item.image || item.composition) && (
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-[clamp(12px,3vw,14px)] crt-text-dim hover:crt-text transition-all cursor-pointer p-1 leading-none"
                          title="Подробнее"
                        >
                          👁
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Holographic figure — bottom right */}
          <HoloFigure />
        </div>
      </div>
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
