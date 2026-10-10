"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
            ? "border-white/10 bg-[#030712]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
            : "border-white/8 bg-[#030712]/40 backdrop-blur-md shadow-lg"
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link
          href="/"
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
          <span className="font-semibold text-base sm:text-lg tracking-tight text-white group-hover:text-emerald-300 transition-colors">
            Vesper
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
          <a
            href="#home"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            Home
          </a>
          <a
            href="#services"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            Services
          </a>
          <a
            href="#works"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            Works
          </a>
          <a
            href="#about"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full transition-colors hover:bg-white/[0.06]"
          >
            About
          </a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] hover:border-emerald-400/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)] transition-all duration-[var(--duration-normal)] active:scale-95"
          >
            <span>Contact Us</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </nav>
    </header>
  );
}
