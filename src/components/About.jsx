"use client";

// import { useEffect, useRef } from "react";
import Link from "next/link";
// import gsap from "gsap";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      className="py-20 md:py-32 bg-brand-dark overflow-hidden"
      id="about"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-[45%] text-center md:text-left"
            >
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-brand-primary mb-4 block">
                About Me
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
                Get to know me
              </h2>
              <p className="text-foreground/70 mb-10 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                I am a passionate Full Stack Developer with a strong focus on
                building modern, responsive, and user-friendly web applications.
                I love turning complex ideas into real-world products.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 border border-brand-primary/30 hover:bg-brand-primary/10 text-foreground px-8 py-4 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-primary/5"
                >
                  <svg
                    className="h-5 w-5 text-brand-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  More About Me
                </Link>
              </motion.div>
            </motion.div>

            <div className="w-full md:w-[60%] flex flex-col gap-4 md:gap-6 items-start">
              {[
                {
                  label: "Name",
                  value: "Sumon Ahmed",
                  icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                },
                {
                  label: "Email",
                  value: "md20sumon25@gmail.com",
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
                {
                  label: "Location",
                  value: "Rangpur, Bangladesh",
                  icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                },
                {
                  label: "Experience",
                  value: "2+ Years",
                  icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    borderColor: "rgba(var(--primary-rgb), 0.3)",
                  }}
                  className="card-glass p-5 md:p-6 rounded-2xl flex flex-row items-center gap-4 transition-all border border-white/5 shadow-xl shadow-black/20 overflow-hidden w-full lg:w-100 lg:ml-(--offset)"
                  style={{
                    "--offset": `${i * 5}vw`,
                  }}
                >
                  <div className="shrink-0 w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary/80">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d={card.icon}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center overflow-hidden min-w-0 flex-1">
                    <p className="text-[10px] text-brand-primary font-black uppercase tracking-widest mb-0.5">
                      {card.label}
                    </p>
                    <p className="text-[13px] sm:text-sm md:text-base font-bold text-foreground break-all sm:wrap-break-word leading-tight">
                      {card.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
