'use client';

import { useSyncExternalStore, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// External store for reduced-motion preference
function subscribeReducedMotion(callback) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getServerSnapshot() {
  return false;
}

// Crisp inline SVGs to avoid fragile third-party CDN runtime dependencies
const SkillIcons = {
  html: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3 5.25L4.4 18.75L12 22L19.6 18.75L21 5.25L12 2ZM17.4 8.25H9.15L9.35 10.5H17.2L16.65 16.35L12 17.65L7.35 16.35L7.1 13.85H9.35L9.45 14.85L12 15.55L14.55 14.85L14.8 12.45H6.95L6.4 6.35H17.6L17.4 8.25Z" />
    </svg>
  ),
  css: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#1572B6]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3 5.25L4.4 18.75L12 22L19.6 18.75L21 5.25L12 2ZM17.4 8.25H9.15L9.35 10.5H17.2L16.65 16.35L12 17.65L7.35 16.35L7.1 13.85H9.35L9.45 14.85L12 15.55L14.55 14.85L14.8 12.45H6.95L6.4 6.35H17.6L17.4 8.25Z" />
    </svg>
  ),
  javascript: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#F7DF1E]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3H21V21H3V3ZM11.15 16.85C11.15 18.15 10.2 19.05 8.7 19.05C7.45 19.05 6.6 18.3 6.25 17.25L8.15 16.1C8.35 16.65 8.65 17.1 9.15 17.1C9.6 17.1 9.9 16.8 9.9 16.35V11.2H11.15V16.85ZM17.75 16.65C17.75 18.1 16.65 19.05 15.05 19.05C13.55 19.05 12.65 18.1 12.25 17.1L14.1 15.95C14.35 16.45 14.65 17.1 15.1 17.1C15.55 17.1 15.85 16.85 15.85 16.5C15.85 16.1 15.6 15.9 14.9 15.6L14.25 15.35C13.15 14.9 12.45 14.2 12.45 12.9C12.45 11.65 13.5 10.7 14.85 10.7C16.05 10.7 16.85 11.3 17.25 12.15L15.45 13.15C15.3 12.8 15.05 12.5 14.65 12.5C14.3 12.5 14.05 12.75 14.05 13.05C14.05 13.35 14.25 13.55 14.85 13.8L15.5 14.05C16.9 14.6 17.75 15.35 17.75 16.65Z" />
    </svg>
  ),
  react: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" />
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
    </svg>
  ),
  nextjs: (
    <svg aria-hidden="true" className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM17.65 18.45L10.3 9.15V17.5H8.7V6.5H10.15L17.5 15.8V6.5H19.1V18.45H17.65Z" />
    </svg>
  ),
  tailwind: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  ),
  nodejs: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L3.5 6.9V16.7L12 21.6L20.5 16.7V6.9L12 2ZM12 4.3L18.7 8.2V15.8L12 19.7L5.3 15.8V8.2L12 4.3Z" />
    </svg>
  ),
  mongodb: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C11.5 2 11 3.5 11 5C11 8.5 7.5 11 7.5 14.5C7.5 18 10 21 11.5 21.8C11.7 21.9 11.9 22 12 22C12.1 22 12.3 21.9 12.5 21.8C14 21 16.5 18 16.5 14.5C16.5 11 13 8.5 13 5C13 3.5 12.5 2 12 2ZM12 19.5V4.5C13.2 7.2 15 10.4 15 14.2C15 17 13.4 19.1 12 19.5Z" />
    </svg>
  ),
  express: (
    <svg aria-hidden="true" className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
    </svg>
  ),
  mongoose: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#E0234E]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.014 7.37a9.162 9.162 0 0 0-.808.025c-.218.017-.434.072-.65.11.229.118.456.213.68.315.225.103.436.232.629.387-.253-.097-.499-.208-.752-.298a8.046 8.046 0 0 0-1.624-.421c-.273-.037-.546-.073-.819.005-.276.078-.354.18-.38.458-.04.46.098.887.281 1.298a4.432 4.432 0 0 0 1.185 1.573c.391.335.825.598 1.305.787.136.053.274.103.411.155l-.009.032c-.263-.072-.532-.126-.787-.22a4.14 4.14 0 0 1-1.222-.73 4.16 4.16 0 0 1-1.007-1.22 3.43 3.43 0 0 1-.43-1.609l-.012.005C4.891 7.488.402 11.595.035 11.94l-.034.014c-.002.005 0 .01.003.016L0 11.974l.005-.002c.004.008.01.016.013.024.087-.019.173-.042.26-.054l.069-.01c.324-.115.655-.205.997-.253.484-.069.985-.159 1.48-.156.468.002.943.074 1.402.153.129.022.255.052.38.087.335.075.65.21.933.391l.06.03c.403.19.758.47 1.038.811.052.057.141.116.187.178.096.114.142.236.303.363v-1.737h2.01l.939 1.733.942-1.733h2.07v3.357l.343-.226s.375-1 2.116-1.14l1.996-.064c-.308-.637-.307-.637-.159-.83.147-.19 1.28-.314 1.48-.433l2.912-.588c.007-.022.015.012.03.007.072-.022.147-.037.25-.061l.66-.16c.042-.025.093-.034.14-.05.308-.107.577-.245.726-.573.145-.319.339-.616.41-.967.022-.111.003-.208-.078-.288-.097-.096-.222-.138-.35-.171-.421-.173-.84-.35-1.264-.513-.261-.101-.529-.185-.795-.27a30.574 30.574 0 0 0-.794-.243c-.244-.072-.49-.138-.736-.205-.24-.066-.48-.133-.72-.192-.282-.07-.565-.13-.847-.195-.215-.05-.428-.102-.644-.146-.234-.047-.47-.089-.706-.13-.302-.053-.602-.112-.905-.153-.366-.05-.734-.082-1.101-.125-.345-.04-.691-.065-1.038-.07zm-3.303.767a.154.154 0 0 1 .056.007c.42.13.83.277 1.216.491.365.203.695.45.979.756.012.013.02.028.036.05l-.645-.293-.021.026.37.551-.022.022a1.986 1.986 0 0 0-.665-.322l-.02.02.633.74-.416-.136-.017.02c.163.27.376.505.58.775-.354-.2-.665-.42-.956-.669a4.488 4.488 0 0 1-1.01-1.185c-.107-.19-.201-.385-.222-.606a.468.468 0 0 1 .011-.15.123.123 0 0 1 .113-.097zm5.424.668c.154.002.311-.006.464.015.278.037.555.092.832.14.158.027.317.052.474.086.297.064.594.133.89.2.196.046.392.092.587.14l-.329.161c-.365.027-.731.055-1.097.057a3.268 3.268 0 0 1-.675-.074c-.28-.058-.514-.196-.652-.466-.02-.04-.09-.063-.14-.078-.18-.054-.362-.1-.544-.168.063-.005.126-.014.19-.013zm3.223 2.635.005.02c-.08.022-.16.042-.239.067-.455.14-.916.266-1.363.428-.28.101-.544.25-.81.388-.233.119-.315.322-.287.575.019.162.04.324.055.488a1.786 1.786 0 0 1-.288-.701c-.035-.169.058-.273.18-.365.238-.178.496-.318.777-.41.35-.117.702-.233 1.059-.325.251-.065.513-.09.77-.133.048-.008.094-.021.141-.032zM9.141 13.955v2.676h1.869l.064-.066v-2.61l-.97 1.495z" />
    </svg>
  ),
  git: (
    <svg aria-hidden="true" className="w-5 h-5 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.62 10.74L13.26 2.38C12.76 1.88 11.95 1.88 11.45 2.38L9.67 4.16L12.04 6.53C12.58 6.36 13.21 6.49 13.64 6.92C14.18 7.46 14.23 8.3 13.8 8.89L16.08 11.17C16.67 10.74 17.51 10.79 18.05 11.33C18.71 11.99 18.71 13.06 18.05 13.72C17.39 14.38 16.32 14.38 15.66 13.72C15.22 13.28 15.1 12.63 15.29 12.09L13.14 9.94V15.26C13.3 15.42 13.42 15.63 13.49 15.86C13.84 17.06 13.15 18.3 11.95 18.65C10.75 19 9.51 18.31 9.16 17.11C8.88 16.14 9.3 15.14 10.14 14.67V9.5L7.75 11.89C7.25 12.39 7.25 13.2 7.75 13.7L13.26 19.21C13.76 19.71 14.57 19.71 15.07 19.21L21.62 12.66C22.12 12.16 22.12 11.24 21.62 10.74Z" />
    </svg>
  ),
  accessibility: (
    <svg aria-hidden="true" className="w-5 h-5 text-brand-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v7m-6-4l6 2 6-2m-9 9l3-4 3 4" />
    </svg>
  ),
};

const skillCategories = [
  {
    category: 'Frontend Engineering',
    tagline: 'Component architecture, reactive state, and responsive layouts',
    skills: [
      { name: 'React', role: 'Component Architecture & Hooks', icon: SkillIcons.react },
      { name: 'Next.js', role: 'App Router, SSR & Turbopack', icon: SkillIcons.nextjs },
      { name: 'JavaScript (ES6+)', role: 'Modern Syntax, Async & DOM', icon: SkillIcons.javascript },
      { name: 'Tailwind CSS', role: 'Utility-First Modern Styling', icon: SkillIcons.tailwind },
      { name: 'HTML5', role: 'Semantic & Accessible Structure', icon: SkillIcons.html },
      { name: 'CSS3', role: 'Modern Grid, Flexbox & Animations', icon: SkillIcons.css },
    ],
  },
  {
    category: 'Backend & Data',
    tagline: 'Server environments, REST APIs, and database persistence',
    skills: [
      { name: 'Node.js', role: 'Server Runtime & API Development', icon: SkillIcons.nodejs },
      { name: 'Express.js', role: 'RESTful Routing & Middleware', icon: SkillIcons.express },
      { name: 'MongoDB', role: 'NoSQL Schemas & Querying', icon: SkillIcons.mongodb },
      { name: 'Mongoose', role: 'ODM, Data Modeling & Validation', icon: SkillIcons.mongoose },
    ],
  },
  {
    category: 'Workflow & Standards',
    tagline: 'Version control, web standards, and digital accessibility',
    skills: [
      { name: 'Git & GitHub', role: 'Branching, PRs & Version Control', icon: SkillIcons.git },
      { name: 'WCAG Accessibility', role: 'Keyboard Navigation & Contrast', icon: SkillIcons.accessibility },
    ],
  },
];

// Flat ticker items for secondary decorative marquee
const tickerItems = [
  { name: 'React', icon: SkillIcons.react },
  { name: 'Next.js', icon: SkillIcons.nextjs },
  { name: 'JavaScript', icon: SkillIcons.javascript },
  { name: 'Tailwind CSS', icon: SkillIcons.tailwind },
  { name: 'Node.js', icon: SkillIcons.nodejs },
  { name: 'Express.js', icon: SkillIcons.express },
  { name: 'MongoDB', icon: SkillIcons.mongodb },
  { name: 'Mongoose', icon: SkillIcons.mongoose },
  { name: 'HTML5', icon: SkillIcons.html },
  { name: 'CSS3', icon: SkillIcons.css },
  { name: 'Git', icon: SkillIcons.git },
];

export default function Skills() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  const [isPaused, setIsPaused] = useState(false);
  const marqueeRef = useRef(null);

  // Keyboard navigation & mouse interaction pause handler
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleFocus = () => setIsPaused(true);
  const handleBlur = () => setIsPaused(false);

  return (
    <section
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      id="skills"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-3 block">
                Technical Capabilities
              </span>
              <h2
                id="skills-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-4"
              >
                Technologies &amp; Toolkit
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                A verified inventory of frontend, backend, and development tools I use to build clean, dependable web applications.
              </p>
            </motion.div>
          </div>

          {/* Primary Semantic Categorized Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {skillCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="card-glass p-6 sm:p-8 rounded-3xl border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-foreground mb-1">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>

                  <ul role="list" className="space-y-3">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface/50 border border-border/60 hover:border-brand-primary/40 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          {skill.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-foreground truncate">
                            {skill.name}
                          </p>
                          <p className="text-xs text-text-muted truncate">
                            {skill.role}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secondary Decorative Ambient Marquee */}
          <div
            aria-hidden="true"
            className="relative overflow-hidden py-4 rounded-2xl bg-surface/40 border border-border backdrop-blur-sm group select-none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 w-24 sm:w-36 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-24 sm:w-36 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div
              ref={marqueeRef}
              className={`flex items-center gap-4 w-max ${
                prefersReducedMotion || isPaused ? '' : 'animate-skills-marquee'
              }`}
            >
              {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                <div
                  key={`${item.name}-${i}`}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-surface/80 text-foreground text-xs font-semibold whitespace-nowrap shadow-sm"
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
