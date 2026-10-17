"use client";

import { useState } from "react";
import { motion } from "framer-motion"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [fallbackMailto, setFallbackMailto] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name (at least 2 characters).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus("error");
      setErrorMessage("Please provide a message with at least 10 characters.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.error || "Unable to send message. Please use direct email."
        );
        if (data.fallbackMailto) {
          setFallbackMailto(data.fallbackMailto);
        } else {
          const subject = encodeURIComponent(
            formData.subject || `Inquiry from ${formData.name}`
          );
          const body = encodeURIComponent(
            `From: ${formData.name} (${formData.email})\n\n${formData.message}`
          );
          setFallbackMailto(
            `mailto:md20sumon25@gmail.com?subject=${subject}&body=${body}`
          );
        }
        return;
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please use direct email below.");
      const subject = encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      );
      const body = encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      );
      setFallbackMailto(
        `mailto:md20sumon25@gmail.com?subject=${subject}&body=${body}`
      );
    }
  };

  return (
    <section
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/5 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-primary mb-3 block">
                Get In Touch
              </span>
              <h2
                id="contact-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight mb-6"
              >
                Let&apos;s Build Together
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-10">
                Have a project, role, or technical inquiry? Reach out through
                the form or connect directly through verified communication
                channels.
              </p>

              <div className="space-y-6">
                {/* Email Channel */}
                <a
                  href="mailto:md20sumon25@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-surface/60 border border-border hover:border-brand-primary/40 transition-all group"
                  aria-label="Send direct email to md20sumon25@gmail.com"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform shrink-0">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                      Direct Email
                    </p>
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-brand-primary transition-colors">
                      md20sumon25@gmail.com
                    </p>
                  </div>
                </a>

                {/* Phone Channel */}
                <a
                  href="tel:+8801707286766"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-surface/60 border border-border hover:border-brand-primary/40 transition-all group"
                  aria-label="Call +880 1707-286766"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform shrink-0">
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                      Phone &amp; WhatsApp
                    </p>
                    <p className="text-sm font-bold text-foreground truncate group-hover:text-brand-primary transition-colors">
                      +880 1707-286766
                    </p>
                  </div>
                </a>

                {/* Location Channel */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-surface/60 border border-border">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                      Location
                    </p>
                    <p className="text-sm font-bold text-foreground truncate">
                      Rangpur, Bangladesh (GMT+6)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-3/5"
          >
            <div className="card-glass p-6 sm:p-10 rounded-3xl border border-border shadow-sm">
              {status === "success" ? (
                <div className="py-8 text-center space-y-4" role="status">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <svg
                      aria-hidden="true"
                      className="w-7 h-7"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Message Delivered
                  </h3>
                  <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out! Your message has been sent
                    successfully. I will review it and reply promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-surface border border-border text-foreground hover:border-brand-primary text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot field (hidden from human visitors) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="contact-honeypot">Do not fill this</label>
                    <input
                      id="contact-honeypot"
                      name="honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Error Notification Alert */}
                  {status === "error" && (
                    <div
                      role="alert"
                      className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs sm:text-sm space-y-2"
                    >
                      <p className="font-semibold">{errorMessage}</p>
                      {fallbackMailto && (
                        <div className="pt-2">
                          <a
                            href={fallbackMailto}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-colors"
                          >
                            <span>Open in Email App</span>
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
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2"
                      >
                        Your Name <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Taylor"
                        className="w-full bg-surface/80 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:border-brand-primary focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2"
                      >
                        Your Email <span className="text-brand-primary">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@example.com"
                        className="w-full bg-surface/80 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:border-brand-primary focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry / Opportunity"
                      className="w-full bg-surface/80 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:border-brand-primary focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2"
                    >
                      Message <span className="text-brand-primary">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, timeline, or requirements..."
                      className="w-full bg-surface/80 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-muted focus:border-brand-primary focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md ${
                      status === "submitting"
                        ? "bg-brand-primary/60 cursor-not-allowed"
                        : "bg-brand-primary hover:bg-brand-secondary active:scale-[0.98]"
                    }`}
                  >
                    <span>
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </span>
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4"
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
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
