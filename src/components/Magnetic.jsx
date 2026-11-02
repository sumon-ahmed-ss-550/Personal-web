'use client';

import { useRef, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

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

/**
 * Magnetic component
 * Wraps children and gently pulls them toward the cursor on hover.
 *
 * @param {React.ReactNode} children - Target child element
 * @param {number} strength - Magnetic pull strength (default: 0.35)
 * @param {string} className - Optional container styling
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (reducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

