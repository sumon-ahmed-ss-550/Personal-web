'use client';

import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';

/**
 * DownloadCV Component
 * A modern, accessible download button for the CV/Resume.
 * Uses Framer Motion for smooth interactions and Lucide icons for visual appeal.
 */
const DownloadCV = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <a
        href="/cv/resume.pdf"
        download="Sumon_Ahmed_CV.pdf"
        aria-label="Download my CV"
        className="group relative flex items-center gap-3 px-8 py-4 bg-brand-dark/40 backdrop-blur-md text-foreground font-bold rounded-xl border border-white/10 transition-all duration-300 shadow-xl hover:shadow-brand-primary/20 hover:border-brand-primary/30 overflow-hidden"
      >
        {/* Subtle background glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="relative z-10">Download CV</span>

        <div className="relative z-10 p-1 bg-brand-primary/10 rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
          <FileDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
        </div>
      </a>
    </motion.div>
  );
};

export default DownloadCV;
