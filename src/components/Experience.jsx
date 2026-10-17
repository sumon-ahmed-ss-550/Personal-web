'use client';

import { motion } from 'framer-motion';

/**
 * Career & Experience Timeline Component
 * Grounded in authentic, verified career history.
 * In accordance with Master Audit Prompt 11, unverified placeholder records
 * ("Tech Solutions Ltd.", "Creative IT Institute") have been omitted.
 *
 * To add verified positions, add items to the `experiences` array below:
 * {
 *   role: string,
 *   organization: string,
 *   period: string,
 *   description: string,
 *   isCurrent: boolean,
 * }
 */

export const experiences = [];

export default function Experience() {
  // If no verified career history has been supplied, return null to avoid rendering empty or unverified sections
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-3 block">
              Career Journey
            </span>
            <h2
              id="experience-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight"
            >
              Professional Experience
            </h2>
          </motion.div>

          {/* Timeline Structure */}
          <div className="relative border-l border-border/80 ml-4 sm:ml-8 space-y-12">
            {experiences.map((exp, index) => (
              <motion.article
                key={`${exp.organization}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 sm:pl-10"
              >
                {/* Node Dot */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-background transition-colors ${
                    exp.isCurrent
                      ? 'border-brand-primary ring-4 ring-brand-primary/20'
                      : 'border-border'
                  }`}
                />

                <div className="card-glass p-6 sm:p-8 rounded-3xl border border-border">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20 uppercase tracking-wider">
                      {exp.organization}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-text-muted mb-4">
                    {exp.period}
                  </p>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
