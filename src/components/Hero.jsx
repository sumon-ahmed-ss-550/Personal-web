'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imageRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.from(titleRef.current, { y: 100, opacity: 0, delay: 0.2 })
        .from(subtitleRef.current, { y: 50, opacity: 0 }, '-=1')
        .from(descRef.current, { y: 30, opacity: 0 }, '-=0.8')
        .from(btnRef.current, { y: 20, opacity: 0 }, '-=0.6')
        .from(imageRef.current, { scale: 0.8, opacity: 0, rotate: -5 }, '-=1.2')
        .from(scrollRef.current, { opacity: 0 }, '-=0.5');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:min-h-screen flex items-center overflow-hidden" id="home">
      <div className="hero-glow absolute top-0 right-0 w-[600px] h-[600px] -z-10 translate-x-1/4 -translate-y-1/4"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="overflow-hidden mb-4">
              <span ref={subtitleRef} className="text-brand-primary font-bold tracking-[0.2em] text-sm block">
                Hi, I'm
              </span>
            </div>
            <div className="overflow-hidden mb-6">
              <h1 ref={titleRef} className="text-5xl md:text-8xl font-black text-foreground leading-[1.1]">
                Sumon <span className="text-brand-primary italic">Ahmed</span>
              </h1>
            </div>
            <div className="overflow-hidden mb-4">
              <span ref={subtitleRef} className="text-xl md:text-2xl font-bold tracking-tight text-foreground block">
                Full Stack <span className="text-brand-primary">Developer |</span>
              </span>
            </div>
            <div className="overflow-hidden mb-10">
              <p ref={descRef} className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-npelaxed">
                I build exceptional and accessible digital experiences for the web.
              </p>
            </div>
            <div ref={btnRef} className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#projects"
                  className="bg-brand-primary hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-primary/20 inline-flex items-center gap-2 group"
                >
                  View My Work
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="#contact"
                  className="bg-white/5 hover:bg-white/10 text-foreground px-8 py-4 rounded-xl font-bold transition-all border border-white/10 inline-flex items-center gap-2 group"
                >
                  Let's Talk
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-6">
              <p className="text-foreground/60 text-sm font-bold uppercase tracking-widest">Follow Me</p>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z' },
                  { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 2a2 2 0 110 4 2 2 0 010-4z' },
                  { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                  { name: 'Email', icon: 'M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-12.125-7.955l10.038 8.135c.53.428 1.258.647 1.987.647s1.458-.219 1.988-.647l10.037-8.135v14.497h-24.05v-14.497z' }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -5, backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/60 hover:text-brand-primary transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-center mt-8 lg:mt-0">
            <div ref={imageRef} className="relative w-full aspect-square max-w-[320px] md:max-w-[450px] group z-20">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-[3rem] rotate-6 transition-transform group-hover:rotate-12 duration-500"></div>
              <div className="absolute inset-0 bg-brand-dark rounded-[3rem] border border-white/5 overflow-hidden">
                <img
                  src="/img/natural.png"
                  alt="Sumon Ahmed"
                  className="w-full h-full object-cover group-hover:scale-110 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-brand-dark border border-white/5 p-4 md:p-6 rounded-2xl shadow-xl backdrop-blur-xl z-30">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center text-brand-primary font-bold text-lg md:text-xl">
                    2+
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-bold text-foreground">Years Of</p>
                    <p className="text-[10px] md:text-xs text-gray-500">Experience</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 14l-7 7-7-7m14-8l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      </div>
    </section>
  );
}
