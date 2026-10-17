import { Inter } from "next/font/google";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeCustomizer from "@/components/ThemeCustomizer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('http://localhost:3000');

export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Sumon Ahmed | Front-End & Full Stack Developer",
    template: "%s | Sumon Ahmed",
  },
  description:
    "Personal portfolio of Sumon Ahmed, a Front-End & Full Stack Developer based in Bangladesh specializing in React, Next.js, and modern accessible web applications.",
  keywords: [
    "Sumon Ahmed",
    "Front-End Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Bangladesh",
    "JavaScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Sumon Ahmed", url: "https://github.com/sumon-ahmed-ss-550" }],
  creator: "Sumon Ahmed",
  openGraph: {
    title: "Sumon Ahmed | Front-End & Full Stack Developer",
    description:
      "Personal portfolio of Sumon Ahmed, a Front-End & Full Stack Developer based in Bangladesh specializing in React, Next.js, and modern accessible web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumon Ahmed | Front-End & Full Stack Developer",
    description:
      "Personal portfolio of Sumon Ahmed, a Front-End & Full Stack Developer based in Bangladesh specializing in React, Next.js, and modern accessible web applications.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sumon Ahmed",
  jobTitle: "Front-End & Full Stack Developer",
  email: "mailto:md20sumon25@gmail.com",
  telephone: "+8801707286766",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rangpur",
    addressCountry: "Bangladesh",
  },
  sameAs: [
    "https://github.com/sumon-ahmed-ss-550",
    "https://www.linkedin.com/in/sumon-ahmed-ss",
  ],
  knowsAbout: [
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Git",
    "Web Accessibility",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-brand-dark text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-lg focus:shadow-2xl focus:font-bold focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <CustomCursor />
        <ScrollToTop />
        <ThemeCustomizer />
        {children}
      </body>
    </html>
  );
}
