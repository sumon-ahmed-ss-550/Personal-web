'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for smooth, premium movement
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    // Add hover listeners to interactive elements
    const updateListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, .cursor-pointer, input, textarea');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    updateListeners();
    
    // Mutation observer to handle dynamically added elements
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[9999]">
      {/* Main Cursor Container */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="relative flex items-center justify-center"
      >
        {/* Outer Glow Ring */}
        <motion.div
          animate={{
            scale: isHovered ? 2 : 1,
            opacity: isHovered ? 0.3 : 0.15,
            borderColor: 'rgba(var(--primary-rgb), 0.5)',
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-12 h-12 rounded-full border border-brand-primary/30 blur-[2px]"
        />

        {/* Primary Glow Disk */}
        <motion.div
          animate={{
            scale: isHovered ? 1.5 : 1,
            backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
          }}
          transition={{ duration: 0.3 }}
          className="absolute w-8 h-8 rounded-full blur-md"
        />

        {/* Inner Core Dot */}
        <motion.div
          animate={{
            scale: isHovered ? 0.5 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="relative w-2.5 h-2.5 bg-brand-primary rounded-full shadow-[0_0_10px_var(--primary),0_0_20px_var(--primary)]"
        />

        {/* Trail Effect for Premium Feel */}
        <motion.div
          animate={{
            scale: [1, 2],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute w-6 h-6 border border-brand-primary/20 rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
