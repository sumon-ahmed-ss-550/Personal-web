'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [bioMode, setBioMode] = useState('brief'); // 'brief' | 'detailed'

  const bentoCards = [
    {
      title: 'Core Focus',
      description: 'Modern front-end architecture, responsive component design, and dynamic web interfaces.',
      icon: (
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Engineering Principles',
      description: 'Semantic markup, accessible user experiences (WCAG), and clean, maintainable code.',
      icon: (
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Location & Timezone',
      description: 'Rangpur, Bangladesh · GMT+6 · Open to local and remote collaboration worldwide.',
      icon: (
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Communication & Workflow',
      description: 'Direct collaboration, git-driven version control, and clear asynchronous communication.',
      icon: (
        <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-3 block">
                About Me
              </span>
              <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
                Engineering with Precision &amp; Purpose
              </h2>
            </motion.div>

            {/* Accessible Density Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center p-1 rounded-xl bg-surface/80 border border-border backdrop-blur-md self-start md:self-auto shadow-sm"
              role="group"
              aria-label="Biography view mode"
            >
              <button
                type="button"
                onClick={() => setBioMode('brief')}
                aria-pressed={bioMode === 'brief'}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  bioMode === 'brief'
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                Brief Summary
              </button>
              <button
                type="button"
                onClick={() => setBioMode('detailed')}
                aria-pressed={bioMode === 'detailed'}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  bioMode === 'detailed'
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'text-text-muted hover:text-foreground'
                }`}
              >
                Full Detail
              </button>
            </motion.div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Narrative Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 card-glass p-8 rounded-3xl border border-border flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  The Developer Story
                </h3>

                <AnimatePresence mode="wait">
                  {bioMode === 'brief' ? (
                    <motion.div
                      key="brief"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 text-text-muted leading-relaxed"
                    >
                      <p>
                        I&apos;m a Front-End &amp; Full Stack Developer based in Rangpur, Bangladesh. I specialize in building responsive, accessible, and high-performance web applications using React, Next.js, and modern JavaScript ecosystems.
                      </p>
                      <p>
                        My objective is to deliver digital products that balance clean code architectures with refined, intuitive visual design.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="detailed"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 text-text-muted leading-relaxed text-sm"
                    >
                      <p>
                        My engineering journey is driven by a deep appreciation for web standards, user ergonomics, and performance. I work extensively across the JavaScript ecosystem, architecting scalable component hierarchies and interactive user experiences.
                      </p>
                      <p>
                        I treat accessibility, responsive layout behavior, and fast loading times as fundamental requirements rather than optional enhancements. Whether structuring component state, fine-tuning micro-interactions, or connecting back-end APIs, I focus on building software that is maintainable and dependable.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-8 mt-8 border-t border-border/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-foreground">Sumon Ahmed</p>
                  <p className="text-xs text-text-muted">Front-End Developer</p>
                </div>
                <Link
                  href="#contact"
                  className="text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Start a conversation</span>
                  <svg aria-hidden="true" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>

            {/* Bento Grid Column */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {bentoCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card-glass p-6 rounded-2xl border border-border group transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-4 transition-colors group-hover:bg-brand-primary/20">
                    {card.icon}
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-2">
                    {card.title}
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
