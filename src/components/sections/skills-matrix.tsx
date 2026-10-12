"use client";

import React, { useEffect, useRef } from "react";
import { skillGroups, SkillGroup } from "@/data/skills";
import { TechIcon } from "@/components/icons/tech-icons";
import {
  Cpu,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Activity,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export function SkillsMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth depth scaling on scroll (pure rAF style updates to avoid React re-render jank)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cards = cardRefs.current;
          const numCards = cards.length;

          cards.forEach((card, i) => {
            if (!card) return;
            const rect = card.getBoundingClientRect();
            const stickyTop = 80 + i * 32;

            // Check if subsequent card is scrolling over this one
            const nextCard = cards[i + 1];
            if (nextCard) {
              const nextRect = nextCard.getBoundingClientRect();
              const nextStickyTop = 80 + (i + 1) * 32;

              // Distance from when next card touches this card's bottom to when it reaches sticky top
              const distance = nextRect.top - nextStickyTop;
              const maxDist = window.innerHeight * 0.6;

              if (distance < maxDist && distance > 0) {
                // Smoothly scale down as next card approaches
                const progress = 1 - distance / maxDist;
                const scale = 1 - progress * 0.05;
                const brightness = 1 - progress * 0.15;
                card.style.transform = `scale(${scale})`;
                card.style.filter = `brightness(${brightness})`;
              } else if (distance <= 0) {
                // Next card has covered this card
                const depthIndex = numCards - 1 - i;
                const finalScale = Math.max(0.88, 1 - depthIndex * 0.03);
                card.style.transform = `scale(${finalScale})`;
                card.style.filter = `brightness(${Math.max(0.7, 1 - depthIndex * 0.08)})`;
              } else {
                card.style.transform = "scale(1)";
                card.style.filter = "brightness(1)";
              }
            } else {
              card.style.transform = "scale(1)";
              card.style.filter = "brightness(1)";
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getAccentTheme = (accent: SkillGroup["accent"]) => {
    switch (accent) {
      case "emerald":
        return {
          glow: "border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_20px_50px_rgba(16,185,129,0.12)]",
          gradient: "from-emerald-500/10 via-transparent to-transparent",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          pill: "border-emerald-500/20 bg-emerald-950/20 text-emerald-100 hover:border-emerald-400/50 hover:bg-emerald-500/10",
          accentText: "text-emerald-400",
        };
      case "cyan":
        return {
          glow: "border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_20px_50px_rgba(6,182,212,0.12)]",
          gradient: "from-cyan-500/10 via-transparent to-transparent",
          badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
          pill: "border-cyan-500/20 bg-cyan-950/20 text-cyan-100 hover:border-cyan-400/50 hover:bg-cyan-500/10",
          accentText: "text-cyan-400",
        };
      case "violet":
        return {
          glow: "border-violet-500/30 hover:border-violet-400/60 shadow-[0_20px_50px_rgba(139,92,246,0.12)]",
          gradient: "from-violet-500/10 via-transparent to-transparent",
          badge: "bg-violet-500/10 text-violet-300 border-violet-500/30",
          pill: "border-violet-500/20 bg-violet-950/20 text-violet-100 hover:border-violet-400/50 hover:bg-violet-500/10",
          accentText: "text-violet-400",
        };
      case "blue":
        return {
          glow: "border-blue-500/30 hover:border-blue-400/60 shadow-[0_20px_50px_rgba(59,130,246,0.12)]",
          gradient: "from-blue-500/10 via-transparent to-transparent",
          badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
          pill: "border-blue-500/20 bg-blue-950/20 text-blue-100 hover:border-blue-400/50 hover:bg-blue-500/10",
          accentText: "text-blue-400",
        };
      case "teal":
        return {
          glow: "border-teal-500/30 hover:border-teal-400/60 shadow-[0_20px_50px_rgba(20,184,166,0.12)]",
          gradient: "from-teal-500/10 via-transparent to-transparent",
          badge: "bg-teal-500/10 text-teal-300 border-teal-500/30",
          pill: "border-teal-500/20 bg-teal-950/20 text-teal-100 hover:border-teal-400/50 hover:bg-teal-500/10",
          accentText: "text-teal-400",
        };
      case "purple":
        return {
          glow: "border-purple-500/30 hover:border-purple-400/60 shadow-[0_20px_50px_rgba(168,85,247,0.12)]",
          gradient: "from-purple-500/10 via-transparent to-transparent",
          badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
          pill: "border-purple-500/20 bg-purple-950/20 text-purple-100 hover:border-purple-400/50 hover:bg-purple-500/10",
          accentText: "text-purple-400",
        };
      case "amber":
        return {
          glow: "border-amber-500/30 hover:border-amber-400/60 shadow-[0_20px_50px_rgba(245,158,11,0.12)]",
          gradient: "from-amber-500/10 via-transparent to-transparent",
          badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
          pill: "border-amber-500/20 bg-amber-950/20 text-amber-100 hover:border-amber-400/50 hover:bg-amber-500/10",
          accentText: "text-amber-400",
        };
      default:
        return {
          glow: "border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_20px_50px_rgba(16,185,129,0.12)]",
          gradient: "from-emerald-500/10 via-transparent to-transparent",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          pill: "border-emerald-500/20 bg-emerald-950/20 text-emerald-100 hover:border-emerald-400/50 hover:bg-emerald-500/10",
          accentText: "text-emerald-400",
        };
    }
  };

  return (
    <section id="stack" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
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
            <Layers className="w-3 h-3 text-emerald-400" />
            Scroll to stack architecture tiers
          </span>
        </div>
      </div>

      {/* ─── STICKY-STACKING CARDS CONTAINER ─── */}
      <div
        ref={containerRef}
        className="cards-container relative mt-16 pb-36 space-y-16 sm:space-y-20"
      >
        {skillGroups.map((group, index) => {
          const theme = getAccentTheme(group.accent);
          const stickyTop = 80 + index * 32;

          return (
            <div
              key={group.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                top: `${stickyTop}px`,
                zIndex: index + 10,
              }}
              className={`card sticky w-full rounded-3xl border bg-[#070b16]/95 backdrop-blur-2xl p-6 sm:p-10 transition-all duration-300 origin-top shadow-[0_20px_50px_rgba(0,0,0,0.95)] ${theme.glow}`}
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
                    {group.categoryNumber} / 0{skillGroups.length}
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
                          className="flex items-start gap-2 text-xs text-zinc-300 font-light p-2 rounded-xl bg-white/[0.02] border border-white/5"
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
    </section>
  );
}
