'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0d0e15] border border-border/80 shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-surface/50">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                  <FileText className="w-5 h-5" />
                </span>
                <div>
                  <h2 id="resume-modal-title" className="text-lg font-bold text-foreground">
                    Sumon Ahmed — Resume
                  </h2>
                  <p className="text-xs text-text-muted">Front-End &amp; Full Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/cv/sumon_resume.pdf"
                  download="Sumon_Ahmed_Resume.pdf"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold transition-all shadow-md shadow-brand-primary/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="p-2 rounded-xl text-text-muted hover:text-foreground hover:bg-surface border border-transparent hover:border-border transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-surface/40 border border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Primary Stack
                  </span>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    React / Next.js
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface/40 border border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Backend
                  </span>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Node &amp; Express
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface/40 border border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Database
                  </span>
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    MongoDB
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface/40 border border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted block mb-1">
                    Availability
                  </span>
                  <span className="text-xs font-semibold text-brand-primary flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                    Open to Offers
                  </span>
                </div>
              </div>

              {/* PDF Document Preview Viewer */}
              <div className="relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden border border-border bg-black/40 flex flex-col shadow-inner">
                <iframe
                  src="/cv/sumon_resume.pdf#toolbar=0&navpanes=0"
                  title="Sumon Ahmed Professional Resume Document"
                  className="w-full h-full border-none rounded-xl bg-surface"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-border bg-surface/40">
              <span className="text-xs text-text-muted">
                Official Resume of Sumon Ahmed · PDF Document
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="/cv/sumon_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-xs font-semibold text-foreground hover:border-brand-primary/40 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full PDF</span>
                </a>
                <a
                  href="/cv/sumon_resume.pdf"
                  download="Sumon_Ahmed_Resume.pdf"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-brand-primary hover:bg-brand-secondary text-white text-xs font-bold transition-all shadow-md shadow-brand-primary/20"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
