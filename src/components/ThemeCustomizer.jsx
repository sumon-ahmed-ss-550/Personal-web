'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const colors = [
  { name: 'Indigo', value: '#6366f1', light: '#a855f7' },
  { name: 'Cyan', value: '#06b6d4', light: '#22d3ee' },
  { name: 'Rose', value: '#f43f5e', light: '#fb7185' },
  { name: 'Emerald', value: '#10b981', light: '#34d399' },
  { name: 'Amber', value: '#f59e0b', light: '#fbbf24' },
  { name: 'Sky', value: '#0ea5e9', light: '#38bdf8' },
];

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState(colors[0].value);
  const [customColor, setCustomColor] = useState(colors[0].value);
  const panelRef = useRef(null);

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const updateTheme = (colorObj) => {
    const root = document.documentElement;
    root.style.setProperty('--primary', colorObj.value);
    root.style.setProperty('--primary-rgb', hexToRgb(colorObj.value));
    root.style.setProperty('--primary-light', colorObj.light || colorObj.value);
    setActiveColor(colorObj.value);
    setCustomColor(colorObj.value);
  };

  const handleCustomColor = (e) => {
    const val = e.target.value;
    setCustomColor(val);
    const root = document.documentElement;
    root.style.setProperty('--primary', val);
    root.style.setProperty('--primary-rgb', hexToRgb(val));
    root.style.setProperty('--primary-light', val);
    setActiveColor(val);
  };

  useEffect(() => {
    // GSAP micro-interaction for icons
    if (isOpen) {
      gsap.to('.theme-trigger', { rotate: 90, duration: 0.5 });
    } else {
      gsap.to('.theme-trigger', { rotate: 0, duration: 0.5 });
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Trigger - Centered vertically on the right */}
      <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="theme-trigger w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-card/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] group transition-shadow hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]"
        >
          <div className="animate-[spin_4s_linear_infinite] group-hover:[animation-play-state:paused] flex items-center justify-center">
            <svg className="w-5 h-5 md:w-6 md:h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </motion.button>
      </div>

      {/* Theme Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            className="fixed right-4 md:right-20 top-1/2 -translate-y-1/2 z-[101] w-[calc(100%-2rem)] max-w-xs md:w-72 bg-brand-card/90 backdrop-blur-2xl border border-white/10 p-5 md:p-6 rounded-3xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <h3 className="text-lg font-bold text-white">Theme Settings</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-5 md:space-y-6">
              <div>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 md:mb-4">Accent Color</p>
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {colors.map((color) => (
                    <motion.button
                      key={color.name}
                      onClick={() => updateTheme(color)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all ${
                        activeColor === color.value ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.value, boxShadow: `0 0 10px ${color.value}44` }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 md:mb-4">Custom Color</p>
                <div className="flex items-center gap-3 md:gap-4 bg-black/20 p-2 md:p-3 rounded-xl border border-white/5">
                  <input
                    type="color"
                    value={customColor}
                    onChange={handleCustomColor}
                    className="w-8 h-8 md:w-10 md:h-10 bg-transparent border-none rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColor.toUpperCase()}
                    onChange={handleCustomColor}
                    className="bg-transparent border-none text-xs md:text-sm font-mono text-white focus:outline-none w-full"
                  />
                </div>
              </div>

              <div className="pt-3 md:pt-4 border-t border-white/5">
                <p className="text-[9px] md:text-[10px] text-gray-500 text-center leading-relaxed">
                  Changes apply instantly to buttons, glows, and interactive elements.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[99] lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
