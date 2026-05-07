'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
];

export default function Skills() {
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth / 2;

    animationRef.current = gsap.to(marquee, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (animationRef.current) animationRef.current.pause();
  };

  const handleMouseLeave = () => {
    if (animationRef.current) animationRef.current.play();
  };

  return (
    <section className="py-24 overflow-hidden" id="skills">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 block">
            My Skills
          </span>
          <h2 className="text-4xl font-bold text-foreground">Technologies I work with</h2>
        </div>
        
        <div 
          className="relative overflow-hidden py-12 group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Gradient Masks for seamless fading */}
          <div className="absolute left-0 top-0 w-32 md:w-64 h-full bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 md:w-64 h-full bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none"></div>
          
          <div 
            ref={marqueeRef}
            className="flex gap-4 md:gap-6 w-max items-center"
          >
            {/* Double the array for seamless looping */}
            {[...skills, ...skills, ...skills].map((skill, i) => (
              <motion.div
                key={`${skill.name}-${i}`}
                whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(var(--primary-rgb), 0.3)' }}
                className="flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/5 bg-white/5 transition-all cursor-default backdrop-blur-sm group/skill"
              >
                <div className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain relative z-10 brightness-110 filter drop-shadow-[0_0_8px_rgba(var(--primary-rgb), 0.3)]"
                  />
                </div>
                <span className="font-bold text-sm md:text-base tracking-tight text-white/90 whitespace-nowrap">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
