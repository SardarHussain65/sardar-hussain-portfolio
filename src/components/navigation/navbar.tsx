"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-4 py-2.5 sm:px-6 rounded-full border transition-all duration-[var(--duration-normal)] ease-[var(--ease-entrance)] ${
          scrolled
            ? "border-white/10 bg-[#030712]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
            : "border-white/8 bg-[#030712]/40 backdrop-blur-md shadow-lg"
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
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-white group-hover:text-emerald-300 transition-colors">
              {site.name}
            </span>
          </div>
        </a>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
          <a
            href="#about"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            About
          </a>
          <a
            href="#projects"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            Projects
          </a>
          <a
            href="#stack"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            Stack
          </a>
          <a
            href="#experience"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            Contact
          </a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2.5">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Hire</span>
          </a>

          <a
            href="#contact"
            className="group relative inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] hover:border-emerald-400/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)] transition-all duration-[var(--duration-normal)] active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </nav>
    </header>
  );
}
