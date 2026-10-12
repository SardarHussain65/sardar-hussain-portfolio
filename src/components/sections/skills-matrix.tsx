"use client";

import React, { useState } from "react";
import { skillGroups, SkillGroup } from "@/data/skills";
import { TechIcon } from "@/components/icons/tech-icons";
import {
  Cpu,
  RotateCw,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export function SkillsMatrix() {
  // Track which cards are flipped (front vs back)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getAccentColors = (accent: SkillGroup["accent"]) => {
    switch (accent) {
      case "emerald":
        return {
          glow: "hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.18)]",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          pill: "hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-200",
          highlight: "text-emerald-400",
        };
      case "cyan":
        return {
          glow: "hover:border-cyan-500/40 hover:shadow-[0_0_40px_rgba(6,182,212,0.18)]",
          badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
          pill: "hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:text-cyan-200",
          highlight: "text-cyan-400",
        };
      case "violet":
        return {
          glow: "hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.18)]",
          badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
          pill: "hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-violet-200",
          highlight: "text-violet-400",
        };
      case "blue":
        return {
          glow: "hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]",
          badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
          pill: "hover:border-blue-400/50 hover:bg-blue-500/10 hover:text-blue-200",
          highlight: "text-blue-400",
        };
      case "teal":
        return {
          glow: "hover:border-teal-500/40 hover:shadow-[0_0_40px_rgba(20,184,166,0.18)]",
          badge: "bg-teal-500/10 text-teal-300 border-teal-500/30",
          pill: "hover:border-teal-400/50 hover:bg-teal-500/10 hover:text-teal-200",
          highlight: "text-teal-400",
        };
      case "purple":
        return {
          glow: "hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.18)]",
          badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
          pill: "hover:border-purple-400/50 hover:bg-purple-500/10 hover:text-purple-200",
          highlight: "text-purple-400",
        };
      case "amber":
        return {
          glow: "hover:border-amber-500/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.18)]",
          badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
          pill: "hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-200",
          highlight: "text-amber-400",
        };
      default:
        return {
          glow: "hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.18)]",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          pill: "hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:text-emerald-200",
          highlight: "text-emerald-400",
        };
    }
  };

  return (
    <section id="stack" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs font-mono text-purple-300 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>ARCHITECTURE & ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Engineering Skills &
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400">
              Technical Stack
            </span>
          </h2>
        </div>
        <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
          <p className="text-sm text-zinc-300 max-w-md font-light leading-relaxed">
            Full-lifecycle mobile and system stacks tailored for low-latency delivery,
            strict memory boundaries, and 60fps gesture continuity.
          </p>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-500/20">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            Click any card to flip architecture blueprints
          </span>
        </div>
      </div>

      {/* Grid of Interactive 3D Flip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {skillGroups.map((group) => {
          const isFlipped = !!flippedCards[group.id];
          const styles = getAccentColors(group.accent);

          return (
            <div
              key={group.id}
              className="relative h-[430px] [perspective:1200px] cursor-pointer group select-none"
              onClick={() => toggleFlip(group.id)}
            >
              {/* Inner 3D Card Flipper */}
              <div
                className={`w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] rounded-2xl ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* ─── FRONT FACE: Tech Stack with SVGs ─── */}
                <div
                  className={`absolute inset-0 w-full h-full p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#070b16]/85 backdrop-blur-xl flex flex-col justify-between overflow-hidden [backface-visibility:hidden] transition-all duration-300 ${styles.glow}`}
                >
                  {/* Subtle corner aura */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

                  {/* Top Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${styles.badge}`}>
                          {group.categoryNumber}
                        </span>
                        <h3 className="text-xl font-light text-white group-hover:text-emerald-300 transition-colors">
                          {group.label}
                        </h3>
                      </div>

                      {/* Flip Hint Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleFlip(group.id, e)}
                        className="p-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/20 transition-all hover:rotate-180 duration-500"
                        title="Flip to inspect architecture"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-mono text-zinc-400 mb-5 line-clamp-1">
                      {group.tagline}
                    </p>

                    {/* Interactive Tech Pills with Real SVG Logos */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {group.items.map((skill) => (
                        <div
                          key={skill}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-zinc-200 text-xs font-mono transition-all duration-200 shadow-sm ${styles.pill}`}
                        >
                          <TechIcon name={skill} className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-light">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Verified Stack & Flip Action */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Production Verified</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleFlip(group.id, e)}
                      className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Inspect Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* ─── BACK FACE: Architecture Blueprint ─── */}
                <div
                  className={`absolute inset-0 w-full h-full p-6 sm:p-7 rounded-2xl border border-emerald-500/30 bg-[#090e1d]/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[0_0_50px_rgba(16,185,129,0.12)]`}
                >
                  <div>
                    {/* Header with Benchmark Metric */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {group.architecture.metric}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleFlip(group.id, e)}
                        className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white transition-all hover:-rotate-180 duration-500"
                        title="Flip back"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="text-base font-light text-white mb-2">
                      {group.architecture.headline}
                    </h4>

                    <p className="text-xs text-zinc-400 font-light leading-relaxed mb-4">
                      {group.architecture.summary}
                    </p>

                    {/* Key Engineering Deliverables */}
                    <div className="space-y-1.5">
                      {group.architecture.highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipped In Production Apps */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1.5">
                      Live in Production Platforms
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.architecture.shippedWith.map((app) => (
                        <span
                          key={app}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-300 border border-white/5"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
