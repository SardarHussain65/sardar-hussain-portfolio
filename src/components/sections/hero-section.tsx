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

export function HeroSection({ currentMode, onModeChange }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-36 pb-12 px-4 sm:px-8 max-w-7xl mx-auto z-10"
    >
      {/* Top Profile Badge & Intro */}
      <div className="flex flex-col items-center text-center mt-2 sm:mt-6">
        <div className="flex items-center gap-3.5 mb-6 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <Image
              src="/portrait.jpg"
              alt="Sardar Hussain"
              fill
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
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white max-w-5xl leading-[1.05]">
          Crafting Production-Grade
          <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400">
            React Native Experiences.
          </span>
        </h1>

        {/* Role Typewriter / Tagline */}
        <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 font-mono text-xs text-purple-300">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span>Mobile App Engineer · TV Systems · Full-Stack Builder</span>
        </div>

        {/* Subtext */}
        <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg text-zinc-400 font-light leading-relaxed">
          {site.bio}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-zinc-950 font-medium text-xs sm:text-sm hover:bg-zinc-100 transition-all duration-[var(--duration-fast)] shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-95"
          >
            <span>View Flagship Projects</span>
            <span className="text-emerald-600 font-bold">✳</span>
          </a>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 bg-white/[0.05] text-white text-xs sm:text-sm font-medium hover:bg-white/[0.1] hover:border-emerald-400/40 transition-all active:scale-95"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>Download CV</span>
          </a>

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 text-xs sm:text-sm font-medium hover:bg-white/[0.08] hover:text-white transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Interactive 3D State Switcher */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full border border-white/10 bg-[#030712]/60 backdrop-blur-xl">
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
      </div>

      {/* Center Spacer for 3D Particle Visual Presence */}
      <div className="my-16 sm:my-28 pointer-events-none" />

      {/* Bottom Area: Footnote Description + HUD Metrics Bar */}
      <div className="w-full space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="max-w-md">
            <p className="text-xs uppercase font-mono tracking-wider text-emerald-400 mb-2">
              [ REAL-TIME 3D CANVAS ] · [ KINETIC INTERACTION ]
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed font-light">
              Interactive WebGL particle field reacting dynamically to pointer velocity,
              scroll acceleration, and touch physics in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open to High-Impact Contracts & Roles</span>
          </div>
        </div>

        {/* HUD Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div className="border-l border-white/10 pl-4 py-1">
            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              ~2+ yrs
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              Production Experience
            </p>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              6+
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              Shipped Production Apps
            </p>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              60 FPS
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              Gesture Fluidity
            </p>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <p className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              1 Solo
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
              Full-Stack Platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
