"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const subscribeTheme = (callback) => {
  window.addEventListener("storage", callback);
  window.addEventListener("themechange", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("themechange", callback);
  };
};

const getThemeSnapshot = () => {
  return localStorage.getItem("theme") || "dark";
};

const getThemeServerSnapshot = () => "dark";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  // Background scroll management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard Escape key handler to close mobile navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Synchronize document dark class with active theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("themechange"));
  };

  // Scrollspy for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (innerHeight + scrollY >= scrollHeight - 100) {
        setActiveSection("contact");
        return;
      }

      const sections = navLinks.map((link) => link.href.substring(1));
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center" aria-label="Main Navigation">
        <Link
          href="#home"
          className="flex items-center gap-0 text-xl font-black tracking-tight text-foreground group"
        >
          <span>SMN</span>
          <span className="text-brand-primary">.DEV</span>
        </Link>

        {/* Desktop Menu (768px+) */}
        <ul className="hidden md:flex items-center gap-1 bg-surface/50 p-1.5 rounded-full border border-border backdrop-blur-md text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <li key={link.name} className="relative">
                <Link
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 block ${
                    isActive
                      ? "text-brand-primary font-bold"
                      : "text-foreground/60 hover:text-foreground"
                  }`}
                  onClick={() => setActiveSection(link.href.substring(1))}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-brand-primary/10 border border-brand-primary/20 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions Row */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-surface/60 border border-border flex items-center justify-center text-foreground/70 hover:text-brand-primary transition-colors"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
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
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
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
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </motion.button>

          {/* Mobile Menu Button (below 768px) */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="md:hidden w-10 h-10 rounded-xl bg-surface/60 border border-border flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors z-[70]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isOpen ? (
              <svg
                aria-hidden="true"
                className="w-6 h-6"
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
            ) : (
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </nav>

      {/* Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 w-full h-screen bg-background/95 backdrop-blur-2xl z-[60] flex flex-col items-center justify-center"
          >
            {/* Ambient Background Accents */}
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <ul className="flex flex-col items-center gap-6 relative z-10">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.li
                    key={link.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-3xl font-black uppercase tracking-wider transition-colors ${
                        isActive
                          ? "text-brand-primary"
                          : "text-foreground/50 hover:text-foreground"
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
            </ul>

            {/* Verified External Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex gap-8 text-xs uppercase tracking-widest font-bold"
            >
              <a
                href="https://github.com/sumon-ahmed-ss-550"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/40 hover:text-brand-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                GitHub
              </a>
              <a
                href="mailto:md20sumon25@gmail.com"
                className="text-foreground/40 hover:text-brand-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Email
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
