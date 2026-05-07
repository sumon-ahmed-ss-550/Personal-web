'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="py-24 overflow-hidden" id="contact">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-2/5"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2 block">
              Contact Me
            </span>
            <h2 className="text-4xl font-bold text-foreground mb-6">Let's work together</h2>
            <p className="text-foreground/70 mb-10 text-lg leading-relaxed">
              Have a project in mind or want to work together? Feel free to
              contact me. I'm always open to discussing new projects and
              creative ideas.
            </p>

            <div className="space-y-8">
              {[
                { label: 'Email', value: 'sumon@gmail.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { label: 'Phone', value: '+880 1707-286766', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                { label: 'Location', value: 'Rangpur, Bangladesh', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary/80 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d={item.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 font-black uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-foreground font-bold text-lg">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-3/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  className="w-full bg-brand-card border border-white/8 rounded-2xl px-6 py-4 text-foreground focus:border-brand-primary focus:ring-0 outline-none transition-all placeholder:text-foreground/40"
                  placeholder="Your Name"
                  type="text"
                />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  className="w-full bg-brand-card border border-white/8 rounded-2xl px-6 py-4 text-foreground focus:border-brand-primary focus:ring-0 outline-none transition-all placeholder:text-foreground/40"
                  placeholder="Your Email"
                  type="email"
                />
              </div>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                className="w-full bg-brand-card border border-white/8 rounded-2xl px-6 py-4 text-foreground focus:border-brand-primary focus:ring-0 outline-none transition-all placeholder:text-foreground/40"
                placeholder="Subject"
                type="text"
              />
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                className="w-full bg-brand-card border border-white/8 rounded-2xl px-6 py-4 text-foreground focus:border-brand-primary focus:ring-0 outline-none transition-all placeholder:text-foreground/40 resize-none"
                placeholder="Message"
                rows={6}
              ></motion.textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary hover:opacity-90 text-white font-black px-10 py-5 rounded-2xl flex items-center gap-3 transition-all shadow-xl shadow-brand-primary/20 group"
                type="submit"
              >
                Send Message
                <svg className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
