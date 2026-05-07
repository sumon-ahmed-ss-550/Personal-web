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
    <div className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen">
      {/* Outer Ring with trailing effect */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          width: isHovered ? 80 : 40,
          height: isHovered ? 80 : 40,
          backgroundColor: isHovered ? 'rgba(0, 229, 255, 0.1)' : 'rgba(0, 229, 255, 0.05)',
        }}
        className="rounded-full border-[1.5px] border-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.4)] backdrop-blur-[1px] flex items-center justify-center transition-colors duration-300"
      />
      
      {/* Inner Glowing Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        className="absolute top-0 left-0 w-2 h-2 bg-[#00e5ff] rounded-full shadow-[0_0_10px_#00e5ff,0_0_20px_#00e5ff]"
      />
    </div>
  );
};

export default CustomCursor;
