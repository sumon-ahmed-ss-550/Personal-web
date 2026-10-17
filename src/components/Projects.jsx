'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, projects } from '@/data/projects';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  // Filter projects by category
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Open modal and preserve trigger element reference for focus return
  const handleOpenDetails = (project, event) => {
    triggerRef.current = event.currentTarget;
    setSelectedProject(project);
  };

  // Close modal and return focus to triggering element
  const handleCloseDetails = () => {
    setSelectedProject(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  // Keyboard accessibility and body scroll locking for dialog
  useEffect(() => {
    if (!selectedProject) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseDetails();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-3 block">
                Featured Work
              </span>
              <h2
                id="projects-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight"
              >
                Things I&apos;ve Built &amp; Explored
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="https://github.com/sumon-ahmed-ss-550?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-secondary transition-colors group"
                aria-label="View all repositories on GitHub (opens in new tab)"
              >
                <span>View All on GitHub</span>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Accessible Category Filters */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeCategory === category
                    ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                    : 'bg-surface/80 text-text-muted border-border hover:text-foreground hover:border-brand-primary/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="card-glass p-12 rounded-3xl text-center border border-border">
              <p className="text-text-muted text-sm">
                No projects found in this category.
              </p>
            </div>
          )}

          {/* Responsive Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, i) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card-glass rounded-3xl overflow-hidden border border-border group flex flex-col justify-between hover:border-brand-primary/40 transition-colors shadow-sm"
              >
                <div>
                  {/* Project Visual Mockup */}
                  <div className="relative aspect-video w-full overflow-hidden bg-surface border-b border-border">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-background/90 border border-border text-foreground backdrop-blur-md shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Quick View Button on Image */}
                    <button
                      type="button"
                      onClick={(e) => handleOpenDetails(project, e)}
                      aria-haspopup="dialog"
                      className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-background/90 hover:bg-background text-foreground border border-border text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm transition-all opacity-90 hover:opacity-100"
                    >
                      Case Details
                    </button>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 sm:p-8">
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-brand-primary">
                        {project.type}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-1 group-hover:text-brand-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm text-text-muted leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Verified Technology Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-2.5 py-1 rounded-lg bg-surface border border-border text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-6 sm:p-8 pt-0 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 mt-auto">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Primary GitHub Repository */}
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground hover:text-brand-primary transition-colors py-1.5"
                      aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>Repository</span>
                    </Link>

                    {/* Optional Backend Repository */}
                    {project.serverGithubUrl && (
                      <Link
                        href={project.serverGithubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-foreground transition-colors py-1.5"
                        aria-label={`View ${project.title} backend server repository on GitHub (opens in new tab)`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>API Repo</span>
                      </Link>
                    )}
                  </div>

                  {/* Quick View trigger or Live site link */}
                  <button
                    type="button"
                    onClick={(e) => handleOpenDetails(project, e)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-brand-primary/10 text-brand-primary border border-border hover:border-brand-primary/30 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>Details</span>
                    <svg
                      aria-hidden="true"
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Quick-View Case Study Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseDetails}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-3xl shadow-2xl p-6 sm:p-8 z-10"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-border">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                    {selectedProject.type}
                  </span>
                  <h3
                    id="project-dialog-title"
                    className="text-2xl sm:text-3xl font-black text-foreground mt-1"
                  >
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 font-medium">
                    Role: {selectedProject.role}
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={handleCloseDetails}
                  aria-label="Close project details dialog"
                  className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-text-muted hover:text-foreground transition-colors shrink-0"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Image */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-border bg-background">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
              </div>

              {/* Details Sections */}
              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                    Project Overview
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {selectedProject.context}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">
                    Engineering Approach
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {selectedProject.approach}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                    Verified Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-background border border-border text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-secondary transition-colors"
                  >
                    <span>View Repository</span>
                    <svg
                      aria-hidden="true"
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </Link>

                  {selectedProject.serverGithubUrl && (
                    <Link
                      href={selectedProject.serverGithubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border text-foreground text-xs font-bold uppercase tracking-wider hover:border-brand-primary transition-colors"
                    >
                      <span>Backend API Code</span>
                    </Link>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCloseDetails}
                  className="text-xs font-semibold text-text-muted hover:text-foreground transition-colors px-2 py-1"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
