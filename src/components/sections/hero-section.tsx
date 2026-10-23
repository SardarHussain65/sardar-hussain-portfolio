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
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_0_12px_rgba(0,0,0,0.85)]";

export function HeroSection({ currentMode, onModeChange }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="hero-day relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-4 pt-28 pb-12 sm:px-8 sm:pt-36"
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
            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{site.location}</span>
            </div>
          </div>
        </div>

        {/* Cinematic Headline */}
        <h1 className="max-w-5xl text-balance text-4xl font-light leading-[1.1] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] sm:text-6xl md:text-7xl lg:text-8xl">
          Crafting Production-Grade
          <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 drop-shadow-[0_0_35px_rgba(16,185,129,0.35)]">
            React Native Experiences.
          </span>
        </h1>

        {/* Role Typewriter / Tagline */}
        <div className="hero-chip mt-4 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-3xl border border-purple-500/30 bg-[#070b14]/85 px-4 py-2 text-center font-mono text-xs text-purple-200 shadow-[0_0_20px_rgba(139,92,246,0.15)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
          <span className="whitespace-nowrap">Mobile App Engineer</span>
          <span aria-hidden className="text-purple-300/50">·</span>
          <span className="whitespace-nowrap">TV Systems</span>
          <span aria-hidden className="text-purple-300/50">·</span>
          <span className="whitespace-nowrap">Full-Stack Builder</span>
        </div>

        {/* Subtext */}
        <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-200 font-light leading-relaxed drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
          {site.bio}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-400 text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-emerald-300 transition-all duration-[var(--duration-fast)] shadow-[0_0_28px_rgba(16,185,129,0.4)] active:scale-95"
          >
            <span>View Flagship Projects</span>
            <span className="text-zinc-950 font-bold">✳</span>
          </a>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-chip inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#070b14]/80 px-5 py-3 text-xs font-medium text-white shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:border-emerald-400/50 hover:bg-white/15 active:scale-95 sm:text-sm"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>Download CV</span>
          </a>

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-chip inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#070b14]/80 px-5 py-3 text-xs font-medium text-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all hover:bg-white/15 hover:text-white active:scale-95 sm:text-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Interactive 3D State Switcher */}
        <div className="hero-chip mt-10 flex w-full max-w-lg flex-wrap items-center justify-center gap-2 rounded-3xl border border-white/15 bg-[#070b14]/90 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
          <button
            type="button"
            onClick={() => onModeChange("orb")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-[var(--duration-fast)] ${
              currentMode === "orb"
                ? "bg-white/15 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            01 · Orb Wave
          </button>

          <button
            type="button"
            onClick={() => onModeChange("galaxy")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-[var(--duration-fast)] ${
              currentMode === "galaxy"
                ? "bg-white/15 text-teal-300 border border-teal-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            02 · Twin Cosmic Spirals
          </button>

          <button
            type="button"
            onClick={() => onModeChange("brain")}
            className={`flex items-center gap-2 px-4 py-1.5 text-xs font-mono rounded-full transition-all duration-[var(--duration-fast)] ${
              currentMode === "brain"
                ? "bg-white/15 text-purple-300 border border-purple-500/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            03 · Neural Mesh
          </button>
        </div>
      </div>

      {/* Center Spacer */}
      <div className="my-8 sm:my-14 pointer-events-none" />

      {/* HUD metrics. The scrim keeps the numbers readable over the spirals. */}
      <div className="relative w-full">
        <div
          aria-hidden
          className="hero-scrim pointer-events-none absolute -inset-x-4 -top-16 -bottom-12 bg-gradient-to-t from-[#030712]/70 via-[#030712]/40 to-transparent sm:-inset-x-8"
        />
        <div className="relative w-full">
          {/* HUD Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/20">
            <div className="border-l border-white/25 pl-4 py-1">
              <p className="text-2xl sm:text-3xl font-light text-white tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                ~2+ yrs
              </p>
              <p className={`text-[11px] font-mono text-zinc-200 uppercase tracking-wider mt-0.5 ${overField}`}>
                Production Experience
              </p>
            </div>

            <div className="border-l border-white/25 pl-4 py-1">
              <p className="text-2xl sm:text-3xl font-light text-white tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                6+
              </p>
              <p className={`text-[11px] font-mono text-zinc-200 uppercase tracking-wider mt-0.5 ${overField}`}>
                Shipped Production Apps
              </p>
            </div>

            <div className="border-l border-white/25 pl-4 py-1">
              <p className="text-2xl sm:text-3xl font-light text-white tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                60 FPS
              </p>
              <p className={`text-[11px] font-mono text-zinc-200 uppercase tracking-wider mt-0.5 ${overField}`}>
                Gesture Fluidity
              </p>
            </div>

            <div className="border-l border-white/25 pl-4 py-1">
              <p className="text-2xl sm:text-3xl font-light text-white tracking-tight [text-shadow:0_2px_10px_rgba(0,0,0,0.95)]">
                1 Solo
              </p>
              <p className={`text-[11px] font-mono text-zinc-200 uppercase tracking-wider mt-0.5 ${overField}`}>
                Full-Stack Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
