"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
} from "lucide-react";

export function SkillsMatrix() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const total = skillGroups.length;

  // Horizontal Sticky-Stacking depth scaling listener
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = cardRefs.current;
    const numCards = cards.length;
    const containerRect = container.getBoundingClientRect();

    let currentActive = 0;

    cards.forEach((card, i) => {
      if (!card) return;

      const stickyOffset = 24 + i * 36;
      const cardRect = card.getBoundingClientRect();
      const currentLeft = cardRect.left - containerRect.left;

      // Track active card
      if (currentLeft <= stickyOffset + 50) {
        currentActive = i;
      }

      // Check if subsequent card is scrolling over this one horizontally
      const nextCard = cards[i + 1];
      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();
        const nextStickyLeft = containerRect.left + 24 + (i + 1) * 36;

        // Distance from when next card touches this card to when it sticks
        const distance = nextRect.left - nextStickyLeft;
        const maxDist = containerRect.width * 0.6;

        if (distance < maxDist && distance > 0) {
          // Smoothly scale down as next card approaches horizontally
          const progress = 1 - distance / maxDist;
          const scale = 1 - progress * 0.08;
          const brightness = 1 - progress * 0.15;
          card.style.transform = `scale(${scale})`;
          card.style.filter = `brightness(${brightness})`;
        } else if (distance <= 0) {
          // Next card has stacked over this card
          const depthIndex = numCards - 1 - i;
          const finalScale = Math.max(0.85, 1 - depthIndex * 0.03);
          card.style.transform = `scale(${finalScale})`;
          card.style.filter = `brightness(${Math.max(0.68, 1 - depthIndex * 0.07)})`;
        } else {
          card.style.transform = "scale(1)";
          card.style.filter = "brightness(1)";
        }
      } else {
        card.style.transform = "scale(1)";
        card.style.filter = "brightness(1)";
      }
    });

    setActiveCardIndex(currentActive);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Support vertical mouse wheel to scroll horizontally through the stack
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const canScrollRight =
          container.scrollLeft < container.scrollWidth - container.clientWidth - 5;
        const canScrollLeft = container.scrollLeft > 5;

        if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("wheel", onWheel);
    };
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const card = cardRefs.current[index];
    const container = containerRef.current;
    if (card && container) {
      const stickyOffset = 24 + index * 36;
      const targetScroll = card.offsetLeft - stickyOffset;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
      setActiveCardIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeCardIndex - 1);
    scrollToIndex(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = Math.min(total - 1, activeCardIndex + 1);
    scrollToIndex(nextIndex);
  };

  const getAccentTheme = (accent: SkillGroup["accent"]) => {
    switch (accent) {
      case "emerald":
        return {
          glow: "border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_25px_60px_rgba(16,185,129,0.14)]",
          gradient: "from-emerald-500/10 via-transparent to-transparent",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          pill: "border-emerald-500/20 bg-emerald-950/20 text-emerald-100 hover:border-emerald-400/50 hover:bg-emerald-500/10",
          accentText: "text-emerald-400",
          tabActive: "border-emerald-500/60 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
        };
      case "cyan":
        return {
          glow: "border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_25px_60px_rgba(6,182,212,0.14)]",
          gradient: "from-cyan-500/10 via-transparent to-transparent",
          badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
          pill: "border-cyan-500/20 bg-cyan-950/20 text-cyan-100 hover:border-cyan-400/50 hover:bg-cyan-500/10",
          accentText: "text-cyan-400",
          tabActive: "border-cyan-500/60 bg-cyan-500/15 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
        };
      case "violet":
        return {
          glow: "border-violet-500/30 hover:border-violet-400/60 shadow-[0_25px_60px_rgba(139,92,246,0.14)]",
          gradient: "from-violet-500/10 via-transparent to-transparent",
          badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
          pill: "border-violet-500/20 bg-violet-950/20 text-violet-100 hover:border-violet-400/50 hover:bg-violet-500/10",
          accentText: "text-violet-400",
          tabActive: "border-violet-500/60 bg-violet-500/15 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]",
        };
      case "blue":
        return {
          glow: "border-blue-500/30 hover:border-blue-400/60 shadow-[0_25px_60px_rgba(59,130,246,0.14)]",
          gradient: "from-blue-500/10 via-transparent to-transparent",
          badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
          pill: "border-blue-500/20 bg-blue-950/20 text-blue-100 hover:border-blue-400/50 hover:bg-blue-500/10",
          accentText: "text-blue-400",
          tabActive: "border-blue-500/60 bg-blue-500/15 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
        };
      case "teal":
        return {
          glow: "border-teal-500/30 hover:border-teal-400/60 shadow-[0_25px_60px_rgba(20,184,166,0.14)]",
          gradient: "from-teal-500/10 via-transparent to-transparent",
          badge: "bg-teal-500/10 text-teal-300 border-teal-500/30",
          pill: "border-teal-500/20 bg-teal-950/20 text-teal-100 hover:border-teal-400/50 hover:bg-teal-500/10",
          accentText: "text-teal-400",
          tabActive: "border-teal-500/60 bg-teal-500/15 text-teal-300 shadow-[0_0_15px_rgba(20,184,166,0.3)]",
        };
      case "purple":
        return {
          glow: "border-purple-500/30 hover:border-purple-400/60 shadow-[0_25px_60px_rgba(168,85,247,0.14)]",
          gradient: "from-purple-500/10 via-transparent to-transparent",
          badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
          pill: "border-purple-500/20 bg-purple-950/20 text-purple-100 hover:border-purple-400/50 hover:bg-purple-500/10",
          accentText: "text-purple-400",
          tabActive: "border-purple-500/60 bg-purple-500/15 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.3)]",
        };
      case "amber":
        return {
          glow: "border-amber-500/30 hover:border-amber-400/60 shadow-[0_25px_60px_rgba(245,158,11,0.14)]",
          gradient: "from-amber-500/10 via-transparent to-transparent",
          badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
          pill: "border-amber-500/20 bg-amber-950/20 text-amber-100 hover:border-amber-400/50 hover:bg-amber-500/10",
          accentText: "text-amber-400",
          tabActive: "border-amber-500/60 bg-amber-500/15 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
        };
      default:
        return {
          glow: "border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_25px_60px_rgba(16,185,129,0.14)]",
          gradient: "from-emerald-500/10 via-transparent to-transparent",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          pill: "border-emerald-500/20 bg-emerald-950/20 text-emerald-100 hover:border-emerald-400/50 hover:bg-emerald-500/10",
          accentText: "text-emerald-400",
          tabActive: "border-emerald-500/60 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
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

        {/* Horizontal Navigation Controls */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-400">
              Tier 0{activeCardIndex + 1} / 0{total}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                disabled={activeCardIndex === 0}
                aria-label="Previous skill tier card"
                className="p-2.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeCardIndex === total - 1}
                aria-label="Next skill tier card"
                className="p-2.5 rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 hover:text-white hover:border-white/30 hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/20">
            <Layers className="w-3 h-3 text-emerald-400" />
            Scroll horizontally to stack architecture tiers
          </span>
        </div>
      </div>

      {/* ─── CATEGORY QUICK TABS BAR ─── */}
      <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {skillGroups.map((group, idx) => {
          const isSelected = activeCardIndex === idx;
          const theme = getAccentTheme(group.accent);

          return (
            <button
              key={group.id}
              onClick={() => scrollToIndex(idx)}
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

      {/* ─── HORIZONTAL STICKY-STACKING CARDS CONTAINER ─── */}
      <div
        ref={containerRef}
        className="cards-container relative flex items-start gap-12 sm:gap-16 overflow-x-auto pb-16 pt-6 pl-4 sm:pl-8 pr-[75vw] sm:pr-[65vw] scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {skillGroups.map((group, index) => {
          const theme = getAccentTheme(group.accent);
          const stickyLeft = 24 + index * 36;

          return (
            <div
              key={group.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                left: `${stickyLeft}px`,
                zIndex: index + 10,
              }}
              className={`card sticky shrink-0 w-[88vw] sm:w-[680px] lg:w-[820px] rounded-3xl border bg-[#070b16]/95 backdrop-blur-2xl p-6 sm:p-10 transition-all duration-300 origin-left shadow-[0_25px_60px_rgba(0,0,0,0.95)] ${theme.glow}`}
            >
              {/* Subtle Ambient Background Gradient */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.gradient} pointer-events-none`}
              />

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

      {/* ─── HORIZONTAL PROGRESS BAR INDICATOR ─── */}
      <div className="mt-2 flex items-center justify-between gap-4">
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-violet-400 transition-all duration-300"
            style={{
              width: `${((activeCardIndex + 1) / total) * 100}%`,
            }}
          />
        </div>
        <span className="text-xs font-mono text-zinc-400 shrink-0">
          Tier 0{activeCardIndex + 1} / 0{total}
        </span>
      </div>
    </section>
  );
}
