'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const subscribeReducedMotion = (callback) => {
  if (typeof window === 'undefined') return () => {};
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getReducedMotionServerSnapshot = () => false;

export default function TiltCard({ children, className = '', maxTilt = 8 }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    mouseX.set(xPct);
    mouseY.set(yPct);
    cardRef.current.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group perspective-1000 ${className}`}
    >
      {/* Dynamic Cursor Spotlight Border Glow */}
      <div
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(var(--primary-rgb), 0.15), transparent 70%)`
            : 'transparent',
        }}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      />
      <div className="relative z-0 h-full">{children}</div>
    </motion.div>
  );
}

