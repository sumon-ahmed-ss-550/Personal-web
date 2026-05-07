'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring for the progress ring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-8 right-8 z-[100]"
        >
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative w-14 h-14 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all hover:border-indigo-500/50 shadow-2xl shadow-black/50"
          >
            {/* Progress Ring (SVG) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="#6366f1" // indigo-500
                strokeWidth="4"
                strokeDasharray="0 1"
                style={{ pathLength: scrollYProgress }}
                className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]"
              />
            </svg>

            {/* Icon */}
            <motion.svg
              whileHover={{ y: -5, x: 5 }}
              className="w-6 h-6 text-foreground group-hover:text-indigo-400 transition-colors relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
              <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
              <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
            </motion.svg>
            
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/5 transition-colors -z-10" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
