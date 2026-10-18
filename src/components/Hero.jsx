'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const email = 'md20sumon25@gmail.com';

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      } else {
        window.location.href = `mailto:${email}`;
      }
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section
      className="relative pt-36 pb-20 lg:pt-44 lg:pb-32 lg:min-h-screen flex items-center overflow-hidden"
      id="home"
      aria-label="Introduction"
    >
      {/* Ambient Obsidian Radial Spotlight */}
      <div
        className="hero-glow absolute top-1/4 right-1/4 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] -z-10 rounded-full pointer-events-none blur-3xl opacity-75"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content Column */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            {/* Identity & Location Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface/80 border border-border text-xs font-semibold uppercase tracking-wider text-text-muted mb-6 shadow-sm backdrop-blur-md"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-pulse flex-shrink-0" aria-hidden="true" />
              <span>Front-End &amp; Full Stack Developer</span>
              <span className="text-border" aria-hidden="true">·</span>
              <span>Bangladesh (GMT+6)</span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="mb-6"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground tracking-tight leading-[1.08]">
                Hi, I&apos;m <span className="text-brand-primary">Sumon</span> Ahmed
              </h1>
            </motion.div>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10 font-normal"
            >
              I build exceptional, accessible, and high-performance digital experiences for the web. Turning complex ideas into intuitive, scalable software.
            </motion.p>

            {/* Actions Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <Link
                href="#projects"
                className="bg-brand-primary hover:opacity-90 text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-brand-primary/25 inline-flex items-center gap-2 group"
              >
                <span>View Projects</span>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="#contact"
                className="bg-surface/80 hover:bg-surface text-foreground px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all border border-border inline-flex items-center gap-2"
              >
                <span>Contact Me</span>
              </Link>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label={copied ? 'Email address copied' : 'Copy email address to clipboard'}
                className="bg-surface/40 hover:bg-surface/80 text-text-muted hover:text-foreground px-5 py-3.5 rounded-xl font-medium text-sm transition-all border border-border/60 inline-flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg aria-hidden="true" className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-400 font-semibold">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Verified Social Connect Channels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              <span className="text-xs uppercase tracking-widest font-bold text-text-muted/70">Connect:</span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/sumon-ahmed-ss-550"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sumon Ahmed's GitHub Profile"
                  className="w-10 h-10 rounded-xl bg-surface/60 border border-border flex items-center justify-center text-text-muted hover:text-brand-primary hover:border-brand-primary/40 transition-all shadow-sm"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a
                  href="mailto:md20sumon25@gmail.com"
                  aria-label="Email Sumon Ahmed"
                  className="w-10 h-10 rounded-xl bg-surface/60 border border-border flex items-center justify-center text-text-muted hover:text-brand-primary hover:border-brand-primary/40 transition-all shadow-sm"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-12.125-7.955l10.038 8.135c.53.428 1.258.647 1.987.647s1.458-.219 1.988-.647l10.037-8.135v14.497h-24.05v-14.497z" />
                  </svg>
                </a>
                <a
                  href="tel:+8801707286766"
                  aria-label="Call Sumon Ahmed"
                  className="w-10 h-10 rounded-xl bg-surface/60 border border-border flex items-center justify-center text-text-muted hover:text-brand-primary hover:border-brand-primary/40 transition-all shadow-sm"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Portrait Composition Column */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px] aspect-square"
            >
              {/* Obsidian Framing Accents */}
              <div
                className="absolute inset-0 bg-brand-primary/15 rounded-3xl rotate-6 transition-transform hover:rotate-8 duration-500 blur-sm"
                aria-hidden="true"
              />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-border bg-surface shadow-2xl">
                <Image
                  src="/img/natural.png"
                  alt="Sumon Ahmed portrait"
                  width={420}
                  height={420}
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ filter: 'brightness(0.9) contrast(1.05) saturate(1.1)' }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
