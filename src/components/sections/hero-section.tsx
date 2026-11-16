"use client";

import React from "react";
import Image from "next/image";
import { ParticleMode } from "@/components/scene/vesper-particle-field";
import { site, roles } from "@/data/site";
import { MapPin, ArrowDown, FileDown, ArrowUpRight, MessageCircle } from "lucide-react";

interface HeroSectionProps {
  currentMode: ParticleMode;
  onModeChange: (mode: ParticleMode) => void;
}

/** Dark halo so small type stays readable when the particle field passes behind it. */
const overField =
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.98),0_0_18px_rgba(0,0,0,0.95)]";

export function HeroSection({ currentMode, onModeChange }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="hero-day relative z-10 mx-auto flex min-h-screen max-w-7xl max-w-full flex-col justify-between px-4 pt-28 pb-12 sm:px-8 sm:pt-36 overflow-x-clip"
    >
      {/* Top Profile Badge & Intro */}
      <div className="flex flex-col items-center text-center mt-2 sm:mt-6">
        <div className="hero-chip mb-6 flex items-center gap-3.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <Image
              src="/portrait.jpg"
              alt="Sardar Hussain"
              fill
              sizes="32px"
              className="object-cover"
              priority
            />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-white tracking-wide">
              {site.name}
            </p>
            <div className="flex items-center gap-1 font-mono text-xs font-medium text-foreground">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{site.location}</span>
            </div>
          </div>
        </div>

        {/* Clear, Friendly Headline */}
        <h1 className="max-w-5xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] sm:text-6xl md:text-7xl lg:text-8xl">
          Building Fast, Reliable
          <span className="block bg-gradient-to-r from-mint-text via-mint-text to-violet-text bg-clip-text font-medium text-transparent drop-shadow-[0_2px_12px_rgba(3,7,18,0.95)]">
            Mobile & Smart TV Apps.
          </span>
        </h1>

        {/* Role Tagline */}
        <div className="hero-chip mt-4 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-3xl border border-purple-500/30 bg-[#070b14]/85 px-4 py-2 text-center font-mono text-xs font-medium text-foreground shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
          <span className="whitespace-nowrap">React Native</span>
          <span aria-hidden className="text-purple-300/50">·</span>
          <span className="whitespace-nowrap">iOS & Android</span>
          <span aria-hidden className="text-purple-300/50">·</span>
          <span className="whitespace-nowrap">Smart TV Apps</span>
          <span aria-hidden className="text-purple-300/50">·</span>
          <span className="whitespace-nowrap">Full-Stack Systems</span>
        </div>

        {/* Subtext */}
        <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)] sm:text-base md:text-lg">
          {site.bio}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-emerald-300 transition-all duration-[var(--duration-fast)] shadow-[0_0_24px_rgba(16,185,129,0.4)] active:scale-95"
          >
            <span>Explore Projects</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-chip inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#070b14]/85 px-5 py-3 text-xs font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:border-emerald-400/50 hover:bg-white/15 active:scale-95 sm:text-sm"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-chip inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#070b14]/85 px-5 py-3 text-xs font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:border-emerald-400/50 hover:bg-white/15 active:scale-95 sm:text-sm"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>Resume</span>
          </a>

          <a
            href="#contact"
            className="hero-chip inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#070b14]/85 px-5 py-3 text-xs font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:bg-white/15 active:scale-95 sm:text-sm"
          >
            <span>Contact</span>
          </a>
        </div>
      </div>

      {/* Center Spacer */}
      <div className="my-8 sm:my-14 pointer-events-none" />

      {/* HUD metrics. The scrim keeps the numbers readable over the spirals. */}
      <div className="relative w-full">
        <div
          aria-hidden
          className="hero-scrim pointer-events-none absolute inset-x-0 -top-16 -bottom-12 bg-gradient-to-t from-field via-field/80 to-transparent"
        />
        <div className="relative w-full">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
            <div className="border-l border-white/25 pl-4 py-1">
              <p className="text-2xl font-medium tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.95)] sm:text-3xl">
                2+ yrs
              </p>
              <p className={`mt-0.5 font-mono text-xs font-medium uppercase tracking-wider text-white ${overField}`}>
                Hands-on Experience
              </p>
            </div>

            <div className="border-l border-white/25 pl-4 py-1">
              <p className="text-2xl font-medium tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.95)] sm:text-3xl">
                6+
              </p>
              <p className={`mt-0.5 font-mono text-xs font-medium uppercase tracking-wider text-white ${overField}`}>
                Shipped Mobile Apps
              </p>
            </div>

            <div className="border-l border-white/25 pl-4 py-1">
              <p className="text-2xl font-medium tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.95)] sm:text-3xl">
                60 FPS
              </p>
              <p className={`mt-0.5 font-mono text-xs font-medium uppercase tracking-wider text-white ${overField}`}>
                Smooth App Fluidity
              </p>
            </div>

            <div className="border-l border-white/25 pl-4 py-1">
              <p className="text-2xl font-medium tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.95)] sm:text-3xl">
                1 Solo
              </p>
              <p className={`mt-0.5 font-mono text-xs font-medium uppercase tracking-wider text-white ${overField}`}>
                Full-Stack Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
