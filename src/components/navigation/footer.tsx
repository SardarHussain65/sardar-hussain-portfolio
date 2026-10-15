"use client";

import React from "react";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#02050c] py-14 px-4 sm:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 text-emerald-400">
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
            </svg>
          </span>
          <span className="font-medium text-sm tracking-tight text-white">
            {site.name}
          </span>
          <span className="text-zinc-600 text-xs">·</span>
          <span className="text-xs text-zinc-500 font-mono">
            {site.title}
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-zinc-400">
          <a href="#about" className="hover:text-white transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-white transition-colors">
            Projects
          </a>
          <a href="#stack" className="hover:text-white transition-colors">
            Stack
          </a>
          <a href="#experience" className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{site.location} · 60 FPS Fluidity</span>
        </div>
      </div>
    </footer>
  );
}
