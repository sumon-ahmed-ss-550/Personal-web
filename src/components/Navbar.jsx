'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (innerHeight + scrollY >= scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-white/8"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-xl font-bold text-foreground italic">
            SMN<span className="text-brand-primary">WEB</span>
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex space-x-8 text-sm font-medium">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Link
                  href={link.href}
                  className={`relative transition-all duration-300 ${isActive ? 'text-brand-primary/80' : 'text-gray-400 hover:text-foreground'
                    }`}
                  onClick={() => setActiveSection(link.href.substring(1))}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="/cv/johan.jpg"
              download="Johan_CV.jpg"
              className="hidden xl:flex items-center gap-2 bg-brand-primary hover:opacity-90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-brand-primary/20"
            >
              Download CV
              <FileDown className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 text-foreground/50 hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="xl:hidden p-2 text-foreground/50 hover:text-foreground transition-colors z-[70]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </motion.button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 0% 0%)', opacity: 0 }}
            animate={{ clipPath: 'circle(150% at 0% 0%)', opacity: 1 }}
            exit={{ clipPath: 'circle(0% at 0% 0%)', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full h-screen bg-brand-dark z-[60] flex flex-col items-center justify-center"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <ul className="flex flex-col items-center gap-8 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.li
                    key={link.name}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-4xl md:text-6xl font-black transition-all hover:tracking-widest ${isActive ? 'text-brand-primary' : 'text-foreground/40 hover:text-foreground'
                        }`}
                      onClick={() => {
                        setActiveSection(link.href.substring(1));
                        setIsOpen(false);
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                );
              })}

              <motion.li
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 px-6 w-full max-w-xs"
              >
                <a
                  href="/cv/johan.jpg"
                  download="Johan_CV.jpg"
                  className="flex items-center justify-center gap-3 bg-brand-primary hover:opacity-90 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-brand-primary/20"
                  onClick={() => setIsOpen(false)}
                >
                  Download CV
                  <FileDown className="h-6 w-6" />
                </a>
              </motion.li>
            </ul>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 flex gap-8"
            >
              <Link href="#" className="text-foreground/20 hover:text-brand-primary transition-colors font-bold tracking-widest uppercase text-xs">LinkedIn</Link>
              <Link href="#" className="text-foreground/20 hover:text-brand-primary transition-colors font-bold tracking-widest uppercase text-xs">GitHub</Link>
              <Link href="#" className="text-foreground/20 hover:text-brand-primary transition-colors font-bold tracking-widest uppercase text-xs">Twitter</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
