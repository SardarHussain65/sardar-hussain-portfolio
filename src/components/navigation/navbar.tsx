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
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium font-mono text-foreground hover:text-mint-text transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Hire</span>
          </a>

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
