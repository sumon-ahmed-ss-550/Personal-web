'use client';

import { motion } from 'framer-motion';
import { GitBranch, GitPullRequest, Code2, ExternalLink, Star } from 'lucide-react';

export default function GitHubStats() {
  const stats = [
    {
      label: 'Verified Repositories',
      value: '10+',
      detail: 'Client, Server & Architecture Codebases',
      icon: <GitBranch className="w-5 h-5 text-brand-primary" />,
    },
    {
      label: 'Core Ecosystem',
      value: 'JavaScript / Next.js',
      detail: 'Full-Stack MERN & Modern Web Standards',
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
    },
    {
      label: 'Engineering Philosophy',
      value: 'Clean & Accessible',
      detail: 'WCAG Compliance & Maintainable Code',
      icon: <GitPullRequest className="w-5 h-5 text-cyan-400" />,
    },
    {
      label: 'Work Status',
      value: 'Open to Work',
      detail: 'Full-time, Contract & Remote Collaboration',
      icon: <Star className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12 sm:mt-16 card-glass p-6 sm:p-8 rounded-3xl border border-border relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/70">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-foreground shadow-sm">
            <svg aria-hidden="true" className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              GitHub Engineering Footprint
            </h3>
            <p className="text-xs text-text-muted">
              @sumon-ahmed-ss-550 · Open Source &amp; Architecture
            </p>
          </div>
        </div>

        <a
          href="https://github.com/sumon-ahmed-ss-550"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface hover:bg-surface/80 border border-border text-xs font-bold text-foreground transition-all self-start md:self-auto hover:border-brand-primary/40 shadow-sm"
        >
          <span>Explore Repositories</span>
          <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-2xl bg-surface/30 border border-border/60 hover:border-brand-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-text-muted">{stat.label}</span>
              <div className="p-1.5 rounded-lg bg-surface border border-border">
                {stat.icon}
              </div>
            </div>
            <div className="text-lg sm:text-xl font-black text-foreground mb-1 tracking-tight">
              {stat.value}
            </div>
            <p className="text-[11px] text-text-muted leading-relaxed">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

