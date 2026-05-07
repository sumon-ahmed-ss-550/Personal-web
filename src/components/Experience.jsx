'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: '2023 - Present',
    description: 'Building modern web applications and delivering solutions for clients worldwide. Specialized in React and Node.js ecosystems.',
    isLatest: true,
  },
  {
    role: 'Frontend Developer',
    company: 'Tech Solutions Ltd.',
    period: '2022 - 2023',
    description: 'Worked on building responsive UI and improving user experience for large-scale enterprise dashboards.',
    isLatest: false,
  },
  {
    role: 'Web Developer Intern',
    company: 'Creative IT Institute',
    period: '2021 - 2022',
    description: 'Learned and worked on real-world projects using HTML, CSS, and JavaScript. Assisted in bug fixes and landing page designs.',
    isLatest: false,
  },
];

export default function Experience() {
  return (
    <section className="py-24 relative overflow-hidden" id="experience">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2 block">
                Experience
              </span>
              <h2 className="text-4xl font-bold text-foreground mb-12">My Work Journey</h2>
            </motion.div>
            
            <div className="relative">
              {/* Vertical Line */}
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-indigo-500/30 origin-top" 
              />
              
              <div className="space-y-12 relative">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative pl-10"
                  >
                    {/* Timeline Dot */}
                    <motion.div 
                      whileHover={{ scale: 1.5 }}
                      className={`absolute left-0 top-1 w-6 h-6 rounded-full bg-brand-dark border-2 z-10 ${
                        exp.isLatest ? 'border-indigo-500' : 'border-foreground/20'
                      }`}
                    >
                      {exp.isLatest && (
                        <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-25" />
                      )}
                    </motion.div>

                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        exp.isLatest ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-400 bg-white/5'
                      }`}>
                        {exp.company}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-indigo-500/60 mb-3">{exp.period}</p>
                    <p className="text-foreground/70 text-sm leading-relaxed max-w-xl">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 flex justify-center"
          >
            <motion.div 
              whileHover={{ rotateY: 10, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative group perspective-1000"
            >
              <div className="w-full max-w-lg aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative z-10">
                <img
                  src="/img/laptop.png"
                  alt="Coding on laptop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <p className="text-white font-bold text-lg">Building the Future</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
