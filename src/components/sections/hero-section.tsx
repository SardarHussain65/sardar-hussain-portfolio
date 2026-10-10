"use client";

import React from "react";
import { ParticleMode } from "@/components/scene/vesper-particle-field";
import { Sparkles, Activity, Cpu, Zap, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  currentMode: ParticleMode;
  onModeChange: (mode: ParticleMode) => void;
}

export function HeroSection({ currentMode, onModeChange }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-4 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top Tag Badges & Vision */}
      <div className="flex flex-col items-center text-center mt-4 sm:mt-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-[11px] font-mono tracking-wider text-emerald-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ESSENCE IN MOTION · REAL-TIME 3D</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white max-w-5xl leading-[1.05]">
          Reads presence,
          <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400">
            in motion
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-400 font-normal leading-relaxed">
          Every particle here is a reply to you — pointer, scroll and dwell,
          read live and answered as pure, drawn motion.
        </p>

        {/* Interactive State Switcher / Mode Selector */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full border border-white/10 bg-[#030712]/60 backdrop-blur-xl">
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
            02 · Spiral Galaxy
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

        {/* Tech Stack Implementation Badges */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-zinc-500">
          <span className="px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02]">
            landing page
          </span>
          <span>·</span>
          <span className="px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02]">
            threejs
          </span>
          <span>·</span>
          <span className="px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02]">
            nextjs
          </span>
          <span>·</span>
          <span className="px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02]">
            webgl 2.0
          </span>
        </div>
      </div>

      {/* Center Spacer for 3D Particle Visual Presence */}
      <div className="my-16 sm:my-28 pointer-events-none" />

      {/* Bottom Area: Footnote Description + Action + HUD Metrics Bar */}
      <div className="w-full space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-md">
            <p className="text-xs uppercase font-mono tracking-wider text-zinc-400 mb-2">
              [ LIVING INTERFACE ] · [ MOTION LAYER ]
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              A rendering and interaction layer that turns your presence into
              motion, tuned to feel alive under every pointer.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-zinc-950 font-medium text-xs sm:text-sm hover:bg-zinc-100 transition-all duration-[var(--duration-fast)] shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95"
            >
              <span>Send Request</span>
              <span className="text-emerald-600 font-bold">✳</span>
            </a>
          </div>
        </div>

        {/* HUD Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div className="border-l border-white/10 pl-4 py-1">
            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              91k
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              Live particles
            </p>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              8.3
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              Frame budget ms
            </p>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              0.9
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              Cold start secs
            </p>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              60
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              Frames per sec
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
