'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Task Management App',
    description: 'A full stack task management application built with MERN stack, featuring real-time updates.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyDCw3anUQvhv859hDwCa_7vYXDrqb2r9FnsAGI2r6HHqhD-lxAytJQsH09k4np7eLDdUonM_9gTrpXXGFhsEARwD-Y9NMHiaf6UI45iwCojTSYC5bAGagnoQ0Q4-Z1xp2XZKVhP0GtxgA8YPe7WsFA_hFXb6tsqkn1R9SmQhpV7W2Jq0lq6M3aoPVToXWPlg0PSCu0sxCu6GzGmcjNhjNl77xbkPjezEluGfezmR9hpTf8w14fJNIb7S7GIxFLIHYEh38u2bLNmp9',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'E-Commerce Website',
    description: 'A modern e-commerce website with cart functionality, payment integration, and admin dashboard.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmC5Mc9L0NR7tD8mLh8RdRQgZAWVKut8pNRkQwFnF-cWNdaoJgrSyfdjmSYOXnSTnqmA6O2oYLBFLe6i4yl4Hlh3cGrFuyILlaNUWx78Oaqown7ZcmTfNFbg_Wnrh-WiVqqdcZ9gXbbG7noV9G1gDe-p2L21WwA1b59TJVaqJ4dELp7Q6riEZ1HgeJ2tn-fIenveJgNvuJI-xXylWMzIjqG54QmO4QyFVhmSOu38lspNNRwRbgEouIbpRv5K3yjiHQLfFOdye89G3Q',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio website to showcase my work and skills. Built with React and Tailwind CSS.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgulSaizfigCK_OwW4goOUN5V_PJGrmx8wQ3Tlr7fw4Si5GVUqjarFLsakUIZ7xfb9Quk21ekI06pgPV0UYC2jAaxZ-SnoBXtQu2KgRetczIXiRNRUAVB4UjUClf6gnaqzFzryJwxcEWfb11kK_jZbpwbGf8Mud4rVjh-DfrO0ucVWfiUouq5nINps2KKwPtP_hExqb2EsKUAg8155fSjN8zc3B-lZBQ_ofw0ExP35yphcMWLvd0hlIQzICZoudbUsQgtuZROrmn1y',
    demoUrl: '#',
    githubUrl: '#',
  },
];

export default function Projects() {
  return (
    <section className="py-24" id="projects">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2 block">
              My Projects
            </span>
            <h2 className="text-4xl font-bold text-foreground">Things I've built</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: 5 }} 
            className="hidden md:block"
          >
            <Link
              href="#"
              className="text-indigo-400 font-semibold flex items-center gap-2 hover:text-indigo-300 transition-colors"
            >
              View All Projects
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={project.title} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className={`card-glass rounded-3xl overflow-hidden group border border-white/5 ${
                i === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-[calc(50%-16px)] md:mx-auto lg:max-w-none lg:mx-0' : ''
              }`}
            >
              <div className="h-56 overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="text-foreground/70 text-sm mb-8 leading-relaxed line-clamp-3">{project.description}</p>
                <div className="flex gap-6">
                  <Link
                    href={project.demoUrl}
                    className="text-indigo-400 text-sm font-bold flex items-center gap-2 hover:text-foreground transition-all"
                  >
                    Live Demo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </Link>
                  <Link
                    href={project.githubUrl}
                    className="text-foreground/50 text-sm font-bold flex items-center gap-2 hover:text-foreground transition-all"
                  >
                    GitHub
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
