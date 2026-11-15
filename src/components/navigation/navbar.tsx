"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { nav, site } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-6">
      <nav
        className={`nav-day pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-[var(--duration-normal)] ease-[var(--ease-entrance)] sm:px-6 ${
          scrolled
            ? "border-white/15 bg-[#030712]/90 shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            : "border-white/10 bg-[#030712]/55 shadow-lg backdrop-blur-md"
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 text-white group cursor-pointer"
        >
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 text-emerald-400 group-hover:text-purple-400 group-hover:rotate-45 transition-transform duration-[var(--duration-normal)]">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
            </svg>
          </span>
          <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-white transition-colors duration-[var(--duration-fast)] ease-entrance group-hover:text-emerald-300">
            {site.name}
          </span>
        </a>

        {/* Center Links */}
        <div className="nav-links hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-3 py-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-xs font-medium text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          {/* GitHub Quick Link */}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.04] text-foreground hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-colors"
            title="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn Quick Link */}
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/[0.04] text-foreground hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-colors"
            title="LinkedIn Profile"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          <ThemeToggle />

          <a
            href="#contact"
            className="group relative hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-white transition-all duration-[var(--duration-normal)] ease-entrance hover:border-emerald-400/40 hover:bg-white/[0.12] active:scale-95 sm:px-5 sm:py-2 sm:text-sm md:inline-flex"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-foreground group-hover:text-mint-text group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
