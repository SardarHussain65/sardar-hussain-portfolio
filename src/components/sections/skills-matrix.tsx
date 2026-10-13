"use client";

import React, { useState, useCallback, useEffect } from "react";
import { skillGroups, SkillGroup } from "@/data/skills";
import { TechIcon } from "@/components/icons/tech-icons";
import {
  Cpu,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Activity,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Layers,
  RotateCcw,
} from "lucide-react";

export function SkillsMatrix() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const total = skillGroups.length;

  // Manual cyclic navigation with direction tracking
  const handlePrev = useCallback(() => {
    setDirection("prev");
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
    setTimeout(() => setIsTransitioning(false), 550);
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection("next");
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
    setTimeout(() => setIsTransitioning(false), 550);
  }, [total]);

  // Jump directly to card with direction awareness
  const handleJumpToCard = useCallback(
    (targetIndex: number) => {
      if (targetIndex === activeIndex) return;
      setDirection(targetIndex > activeIndex ? "next" : "prev");
      setIsTransitioning(true);
      setActiveIndex(targetIndex);
      setTimeout(() => setIsTransitioning(false), 550);
    },
    [activeIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Circular distance so both left and right always have stacked cards
  const getCircularDistance = (index: number, active: number, length: number) => {
    let diff = index - active;
    while (diff > Math.floor(length / 2)) diff -= length;
    while (diff < -Math.floor(length / 2)) diff += length;
    return diff;
  };

  const getAccentTheme = (accent: SkillGroup["accent"]) => {
    switch (accent) {
      case "emerald":
        return {
          glow: "border-emerald-500/40 shadow-[0_30px_70px_rgba(16,185,129,0.25)]",
          gradient: "from-emerald-500/15 via-transparent to-transparent",
          badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.35)]",
          pill: "border-emerald-500/25 bg-emerald-950/30 text-emerald-100 hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]",
          accentText: "text-emerald-400",
          tabActive: "border-emerald-500/70 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
          borderHighlight: "from-transparent via-emerald-400 to-transparent",
          flare: "from-emerald-500/25 to-teal-500/0",
          ambientRgb: "16, 185, 129",
        };
      case "cyan":
        return {
          glow: "border-cyan-500/40 shadow-[0_30px_70px_rgba(6,182,212,0.25)]",
          gradient: "from-cyan-500/15 via-transparent to-transparent",
          badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.35)]",
          pill: "border-cyan-500/25 bg-cyan-950/30 text-cyan-100 hover:border-cyan-400/60 hover:bg-cyan-500/15 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]",
          accentText: "text-cyan-400",
          tabActive: "border-cyan-500/70 bg-cyan-500/20 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]",
          borderHighlight: "from-transparent via-cyan-400 to-transparent",
          flare: "from-cyan-500/25 to-blue-500/0",
          ambientRgb: "6, 182, 212",
        };
      case "violet":
        return {
          glow: "border-violet-500/40 shadow-[0_30px_70px_rgba(139,92,246,0.25)]",
          gradient: "from-violet-500/15 via-transparent to-transparent",
          badge: "bg-violet-500/15 text-violet-300 border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.35)]",
          pill: "border-violet-500/25 bg-violet-950/30 text-violet-100 hover:border-violet-400/60 hover:bg-violet-500/15 hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]",
          accentText: "text-violet-400",
          tabActive: "border-violet-500/70 bg-violet-500/20 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.4)]",
          borderHighlight: "from-transparent via-violet-400 to-transparent",
          flare: "from-violet-500/25 to-purple-500/0",
          ambientRgb: "139, 92, 246",
        };
      case "blue":
        return {
          glow: "border-blue-500/40 shadow-[0_30px_70px_rgba(59,130,246,0.25)]",
          gradient: "from-blue-500/15 via-transparent to-transparent",
          badge: "bg-blue-500/15 text-blue-300 border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.35)]",
          pill: "border-blue-500/25 bg-blue-950/30 text-blue-100 hover:border-blue-400/60 hover:bg-blue-500/15 hover:shadow-[0_0_12px_rgba(59,130,246,0.3)]",
          accentText: "text-blue-400",
          tabActive: "border-blue-500/70 bg-blue-500/20 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]",
          borderHighlight: "from-transparent via-blue-400 to-transparent",
          flare: "from-blue-500/25 to-cyan-500/0",
          ambientRgb: "59, 130, 246",
        };
      case "teal":
        return {
          glow: "border-teal-500/40 shadow-[0_30px_70px_rgba(20,184,166,0.25)]",
          gradient: "from-teal-500/15 via-transparent to-transparent",
          badge: "bg-teal-500/15 text-teal-300 border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.35)]",
          pill: "border-teal-500/25 bg-teal-950/30 text-teal-100 hover:border-teal-400/60 hover:bg-teal-500/15 hover:shadow-[0_0_12px_rgba(20,184,166,0.3)]",
          accentText: "text-teal-400",
          tabActive: "border-teal-500/70 bg-teal-500/20 text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.4)]",
          borderHighlight: "from-transparent via-teal-400 to-transparent",
          flare: "from-teal-500/25 to-emerald-500/0",
          ambientRgb: "20, 184, 166",
        };
      case "purple":
        return {
          glow: "border-purple-500/40 shadow-[0_30px_70px_rgba(168,85,247,0.25)]",
          gradient: "from-purple-500/15 via-transparent to-transparent",
          badge: "bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.35)]",
          pill: "border-purple-500/25 bg-purple-950/30 text-purple-100 hover:border-purple-400/60 hover:bg-purple-500/15 hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]",
          accentText: "text-purple-400",
          tabActive: "border-purple-500/70 bg-purple-500/20 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
          borderHighlight: "from-transparent via-purple-400 to-transparent",
          flare: "from-purple-500/25 to-violet-500/0",
          ambientRgb: "168, 85, 247",
        };
      case "amber":
        return {
          glow: "border-amber-500/40 shadow-[0_30px_70px_rgba(245,158,11,0.25)]",
          gradient: "from-amber-500/15 via-transparent to-transparent",
          badge: "bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.35)]",
          pill: "border-amber-500/25 bg-amber-950/30 text-amber-100 hover:border-amber-400/60 hover:bg-amber-500/15 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]",
          accentText: "text-amber-400",
          tabActive: "border-amber-500/70 bg-amber-500/20 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]",
          borderHighlight: "from-transparent via-amber-400 to-transparent",
          flare: "from-amber-500/25 to-orange-500/0",
          ambientRgb: "245, 158, 11",
        };
      default:
        return {
          glow: "border-emerald-500/40 shadow-[0_30px_70px_rgba(16,185,129,0.25)]",
          gradient: "from-emerald-500/15 via-transparent to-transparent",
          badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.35)]",
          pill: "border-emerald-500/25 bg-emerald-950/30 text-emerald-100 hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:shadow-[0_0_12px_rgba(16,185,129,0.3)]",
          accentText: "text-emerald-400",
          tabActive: "border-emerald-500/70 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]",
          borderHighlight: "from-transparent via-emerald-400 to-transparent",
          flare: "from-emerald-500/25 to-teal-500/0",
          ambientRgb: "16, 185, 129",
        };
    }
  };

  const activeTheme = getAccentTheme(skillGroups[activeIndex].accent);

  return (
    <section id="stack" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
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

        {/* Controls: Reset to First Card & Header Prev/Next */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              Tier 0{activeIndex + 1} / 0{total}
            </span>

            {/* Reset to First Card */}
            {activeIndex !== 0 && (
              <button
                onClick={() => handleJumpToCard(0)}
                title="Reset to first card"
                className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reset (01)</span>
              </button>
            )}

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous skill tier card"
                className="p-2.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] active:scale-95 transition-all shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next skill tier card"
                className="p-2.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] active:scale-95 transition-all shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/20">
            <Layers className="w-3 h-3 text-emerald-400" />
            Tactile tab stack · Click side tabs or arrows to glide
          </span>
        </div>
      </div>

      {/* ─── CATEGORY QUICK TABS BAR ─── */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {skillGroups.map((group, idx) => {
          const isSelected = activeIndex === idx;
          const theme = getAccentTheme(group.accent);

          return (
            <button
              key={group.id}
              onClick={() => handleJumpToCard(idx)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border flex items-center gap-2 ${
                isSelected
                  ? theme.tabActive
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:border-white/20"
              }`}
            >
              <span className="opacity-60">{group.categoryNumber}</span>
              <span>{group.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─── BILATERAL TAB STACK STAGE (FULL WIDE CARDS + ZERO OVERLAP ARROWS) ─── */}
      <div className="relative mt-12 w-full min-h-[660px] sm:min-h-[580px] lg:min-h-[520px] flex items-center justify-center">
        {/* Floating Left Navigation Arrow Button (Dedicated placement with clearance) */}
        <button
          onClick={handlePrev}
          aria-label="Previous skill card"
          className="hidden xl:flex absolute -left-4 2xl:-left-8 z-50 p-4 rounded-full border border-white/20 bg-[#070b16]/95 backdrop-blur-2xl text-white hover:border-emerald-400/80 hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.95)] group"
        >
          <ChevronLeft className="w-6 h-6 text-zinc-300 group-hover:text-emerald-400 group-hover:-translate-x-1 transition-transform" />
        </button>

        {/* Floating Right Navigation Arrow Button (Dedicated placement with clearance) */}
        <button
          onClick={handleNext}
          aria-label="Next skill card"
          className="hidden xl:flex absolute -right-4 2xl:-right-8 z-50 p-4 rounded-full border border-white/20 bg-[#070b16]/95 backdrop-blur-2xl text-white hover:border-emerald-400/80 hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.95)] group"
        >
          <ChevronRight className="w-6 h-6 text-zinc-300 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Full-Width Cards Stack Stage */}
        <div className="relative w-full h-[640px] sm:h-[550px] lg:h-[490px]">
          {skillGroups.map((group, index) => {
            const theme = getAccentTheme(group.accent);
            const dist = getCircularDistance(index, activeIndex, total);
            const absDist = Math.abs(dist);

            const isCenter = dist === 0;
            const isLeft = dist < 0;
            const isRight = dist > 0;
            const isHovered = hoveredTabIndex === index;

            const zIndex = isCenter ? 40 : 40 - absDist;

            return (
              <div
                key={group.id}
                onClick={() => {
                  if (!isCenter) {
                    handleJumpToCard(index);
                  }
                }}
                onMouseEnter={() => {
                  if (!isCenter) setHoveredTabIndex(index);
                }}
                onMouseLeave={() => setHoveredTabIndex(null)}
                style={{
                  zIndex: isHovered ? 45 : zIndex,
                  // Ultra-smooth Quintic deceleration curve used in luxury UI
                  transition:
                    "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease, box-shadow 0.5s ease",
                }}
                className={`card absolute top-0 left-1/2 w-[92vw] sm:w-[720px] lg:w-[840px] rounded-3xl border bg-[#070b16]/95 backdrop-blur-2xl p-6 sm:p-9 origin-center shadow-[0_25px_60px_rgba(0,0,0,0.95)] ${
                  theme.glow
                } ${
                  isCenter
                    ? "ring-1 ring-white/25 cursor-default"
                    : "cursor-pointer select-none"
                }`}
                ref={(el) => {
                  if (el) {
                    const isMobile = window.innerWidth < 640;
                    const step = isMobile ? 16 : 28;
                    const hoverNudge = isHovered ? (isLeft ? -14 : 14) : 0;

                    if (isCenter) {
                      // Center card: full wide scale, flat upright, prominent glow
                      el.style.transform = "translateX(-50%) translateY(0px) scale(1) rotate(0deg)";
                      el.style.opacity = "1";
                      el.style.filter = "brightness(1)";
                    } else if (isLeft) {
                      // Left stack: stacked tabs with gentle cascading drop and organic tilt + hover lift
                      el.style.transform = `translateX(calc(-50% - ${absDist * step}px + ${hoverNudge}px)) translateY(${absDist * 3}px) scale(${1 - absDist * 0.025}) rotate(${-absDist * 1}deg)`;
                      el.style.opacity = "1";
                      el.style.filter = isHovered
                        ? "brightness(1.15)"
                        : `brightness(${Math.max(0.68, 1 - absDist * 0.1)})`;
                    } else if (isRight) {
                      // Right stack: stacked tabs with gentle cascading drop and organic tilt + hover lift
                      el.style.transform = `translateX(calc(-50% + ${absDist * step}px + ${hoverNudge}px)) translateY(${absDist * 3}px) scale(${1 - absDist * 0.025}) rotate(${absDist * 1}deg)`;
                      el.style.opacity = "1";
                      el.style.filter = isHovered
                        ? "brightness(1.15)"
                        : `brightness(${Math.max(0.68, 1 - absDist * 0.1)})`;
                    }
                  }
                }}
              >
                {/* Luminous Top Edge Glow Beam on Active Card */}
                {isCenter && (
                  <div
                    key={`beam-${activeIndex}`}
                    className={`absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r ${theme.borderHighlight} pointer-events-none opacity-90 transition-opacity duration-500`}
                  />
                )}

                {/* Subtle Ambient Background Gradient & Radial Flare */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.gradient} pointer-events-none`}
                />
                <div
                  className={`absolute -top-24 -right-24 w-52 h-52 rounded-full bg-gradient-to-br ${theme.flare} blur-3xl pointer-events-none`}
                />

                {/* Visible Tab indicator for cards stacked on the LEFT */}
                {isLeft && (
                  <div className="absolute left-2.5 top-5 bottom-5 w-4 flex flex-col items-center justify-between pointer-events-none">
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shadow-md transition-transform ${
                        isHovered ? "scale-110" : ""
                      } ${theme.badge}`}
                    >
                      0{index + 1}
                    </span>
                    <div
                      className={`w-0.5 h-full my-2 bg-gradient-to-b ${theme.gradient} opacity-80`}
                    />
                  </div>
                )}

                {/* Visible Tab indicator for cards stacked on the RIGHT */}
                {isRight && (
                  <div className="absolute right-2.5 top-5 bottom-5 w-4 flex flex-col items-center justify-between pointer-events-none">
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border shadow-md transition-transform ${
                        isHovered ? "scale-110" : ""
                      } ${theme.badge}`}
                    >
                      0{index + 1}
                    </span>
                    <div
                      className={`w-0.5 h-full my-2 bg-gradient-to-b ${theme.gradient} opacity-80`}
                    />
                  </div>
                )}

                {/* Card Top Tier / Header */}
                <div className="relative flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${theme.badge}`}
                    >
                      {group.categoryNumber} / 0{total}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light text-white tracking-wide">
                      {group.label}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 flex items-center gap-1.5">
                      <Activity className={`w-3.5 h-3.5 ${theme.accentText}`} />
                      {group.architecture.metric}
                    </span>
                  </div>
                </div>

                {/* Sub-header tagline */}
                <p className="relative text-xs sm:text-sm font-mono text-zinc-400 mt-4 mb-8">
                  {"// " + group.tagline}
                </p>

                {/* Two-Column Card Body */}
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Architectural Blueprint & Capabilities (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <h4 className="text-base sm:text-lg font-normal text-white mb-2 flex items-center gap-2">
                        <span>{group.architecture.headline}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                        {group.architecture.summary}
                      </p>
                    </div>

                    {/* Key Capabilities Checklist */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                        Key Technical Deliverables:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.architecture.highlights.map((point, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2 text-xs text-zinc-300 font-light p-2.5 rounded-xl bg-white/[0.02] border border-white/5"
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${theme.accentText}`}
                            />
                            <span className="line-clamp-2 leading-tight">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Production Apps Badges */}
                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                        Live in Production Systems:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.architecture.shippedWith.map((app) => (
                          <span
                            key={app}
                            className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.03] text-zinc-200 border border-white/10 flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{app}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interactive Tech Pills with Real SVGs (5 cols) */}
                  <div className="lg:col-span-5 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        Verified Stack Arsenal
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {group.items.length} Modules
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((skill) => (
                        <div
                          key={skill}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all duration-200 shadow-sm ${theme.pill}`}
                        >
                          <TechIcon name={skill} className="w-4 h-4 shrink-0" />
                          <span className="font-light">{skill}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tier status indicator */}
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <span>Architecture Tier {group.categoryNumber}</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        Production Ready <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── DEDICATED BOTTOM NAVIGATION DOCK (ZERO OVERLAP, PROPER SPACING) ─── */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-[#070b16]/70 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous skill tier"
            className="p-3 rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 hover:text-white hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1 text-xs font-mono"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next skill tier"
            className="p-3 rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 hover:text-white hover:border-emerald-400/60 hover:bg-emerald-500/15 hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-1 text-xs font-mono"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gradient Progress Bar */}
        <div className="flex-1 w-full max-w-xl mx-2 bg-white/5 h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 transition-all duration-500"
            style={{
              width: `${((activeIndex + 1) / total) * 100}%`,
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400 shrink-0">
            Tier 0{activeIndex + 1} / 0{total}
          </span>
          {activeIndex !== 0 && (
            <button
              onClick={() => handleJumpToCard(0)}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
