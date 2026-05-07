import { Inter } from "next/font/google";
import "./globals.css";

import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeCustomizer from "@/components/ThemeCustomizer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Asif Mahmud | Full Stack Developer Portfolio",
  description: "I build exceptional and accessible digital experiences for the web. Turning complex problems into simple, beautiful, and intuitive solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-brand-dark text-gray-300`}>
        <CustomCursor />
        <ScrollToTop />
        <ThemeCustomizer />
        {children}
      </body>
    </html>
  );
}
