"use client";

import React, { useEffect, useRef } from "react";
import { roles, credentials, ExperienceRole } from "@/data/experience";
import { TechIcon } from "@/components/icons/tech-icons";
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Rocket,
  ShieldCheck,
  Layers,
  ArrowUpRight,
  GraduationCap,
  Award,
} from "lucide-react";

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth depth scaling on scroll matching the Webflow sticky-stacking cards design
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cards = cardRefs.current;
          const numCards = cards.length;

          const stacking = window.matchMedia("(min-width: 768px)").matches;

          cards.forEach((card, i) => {
            if (!card) return;
            if (!stacking) {
              card.style.transform = "";
              card.style.filter = "";
              return;
            }
            const nextCard = cards[i + 1];
            if (nextCard) {
              const nextRect = nextCard.getBoundingClientRect();
              const nextStickyTop = 80 + (i + 1) * 32;

              const distance = nextRect.top - nextStickyTop;
              const maxDist = window.innerHeight * 0.6;

              if (distance < maxDist && distance > 0) {
                const progress = 1 - distance / maxDist;
                const scale = 1 - progress * 0.05;
                const brightness = 1 - progress * 0.15;
                card.style.transform = `scale(${scale})`;
                card.style.filter = `brightness(${brightness})`;
              } else if (distance <= 0) {
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

  const getAccentTheme = (accent: ExperienceRole["accent"]) => {
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
      case "teal":
        return {
          glow: "border-teal-500/30 hover:border-teal-400/60 shadow-[0_20px_50px_rgba(20,184,166,0.12)]",
          gradient: "from-teal-500/10 via-transparent to-transparent",
          badge: "bg-teal-500/10 text-teal-300 border-teal-500/30",
          pill: "border-teal-500/20 bg-teal-950/20 text-teal-100 hover:border-teal-400/50 hover:bg-teal-500/10",
          accentText: "text-teal-400",
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
    <section id="experience" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-border-subtle">
        <div
          aria-hidden
          className="field-wash pointer-events-none absolute -inset-x-4 -top-10 -bottom-4 bg-[linear-gradient(180deg,transparent,var(--background)_18%,var(--background)_78%,transparent)] sm:-inset-x-8"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-background/80 text-xs font-mono text-mint mb-3">
            <Briefcase className="w-3.5 h-3.5 text-teal-300" />
            <span>CAREER TRAJECTORY & IMPACT</span>
          </div>
          <h2 className="text-3xl font-light tracking-tight text-foreground [text-shadow:0_2px_12px_rgba(3,7,18,0.55)] sm:text-5xl">
            Work Experience &
            <span className="block font-normal text-foreground">
              Shipped Engagements
            </span>
          </h2>
        </div>
        <div className="relative flex flex-col items-start md:items-end gap-2 text-left md:text-right">
          <p className="text-sm text-text-muted max-w-md font-light leading-relaxed">
            From solo greenfield product architecture to core mobile engineering at
            Repla Technologies.
          </p>
          <span className="hidden items-center gap-1.5 rounded border border-emerald-500/20 bg-emerald-950/40 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400 md:inline-flex">
            <Layers className="w-3 h-3 text-emerald-400" />
            Scroll to stack career milestones
          </span>
        </div>
      </div>

      {/* ─── STICKY-STACKING CARDS CONTAINER ─── */}
      <div
        ref={containerRef}
        className="cards-container relative mt-10 space-y-6 pb-12 sm:space-y-10 md:mt-16 md:space-y-16 md:pb-36"
      >
        {roles.map((role, index) => {
          const theme = getAccentTheme(role.accent);
          const stickyTop = 80 + index * 32;

          return (
            <div
              key={role.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              style={{
                top: `${stickyTop}px`,
                zIndex: index + 10,
              }}
              className={`night-panel card w-full rounded-3xl border bg-[#070b16]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-300 origin-top sm:p-10 md:sticky ${theme.glow}`}
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
                    0{index + 1} / 0{roles.length}
                  </span>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-2xl sm:text-3xl font-light text-white tracking-wide">
                      {role.title}
                    </h3>
                    <span className="text-zinc-500 font-mono text-base">@</span>
                    <span className={`text-xl sm:text-2xl font-normal ${theme.accentText}`}>
                      {role.org}
                    </span>
                  </div>
                </div>

                {/* Right Header Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/10 flex items-center gap-1.5">
                    <Rocket className={`w-3.5 h-3.5 ${theme.accentText}`} />
                    {role.impactMetric}
                  </span>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-zinc-300">
                    {role.current && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{role.dates}</span>
                  </div>
                </div>
              </div>

              {/* Sub-header tagline */}
              <div className="relative flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-mono text-zinc-400 mt-4 mb-8">
                <span>{"// " + role.badge}</span>
                <span className="flex items-center gap-1 text-zinc-500">
                  <MapPin className="w-3.5 h-3.5" />
                  {role.place}
                </span>
              </div>

              {/* Two-Column Card Body */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Responsibilities & Shipped Products (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-normal text-white mb-2">
                      Key Engineering Responsibilities & Impact
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-400 font-light">
                      Delivered high-reliability mobile architecture, cross-platform UI, and systems integration.
                    </p>
                  </div>

                  {/* Points Checklist */}
                  <div className="space-y-2.5 pt-1">
                    {role.points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 font-light p-3 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${theme.accentText}`}
                        />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Production Apps Badges (if present) */}
                  {role.shippedProjects && role.shippedProjects.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                        Shipped Commercial Platforms:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {role.shippedProjects.map((proj) => (
                          <span
                            key={proj}
                            className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.03] text-zinc-200 border border-white/10 flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{proj}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Stack Arsenal with SVGs (5 cols) */}
                <div className="lg:col-span-5 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                    <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Production Tech Stack
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {role.techStack.length} Technologies
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {role.techStack.map((tech) => (
                      <div
                        key={tech}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all duration-200 shadow-sm ${theme.pill}`}
                      >
                        <TechIcon name={tech} className="w-4 h-4 shrink-0" />
                        <span className="font-light">{tech}</span>
                      </div>
                    ))}
                  </div>

                  {/* Verification Indicator */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>Role Milestone 0{index + 1}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      Verified Engagement <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Academic Credentials Card Footer */}
      <div className="night-panel mt-12 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#070b16]/90 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-medium text-white">
              Academic Foundation & Diplomas
            </h4>
            <p className="text-xs font-mono text-zinc-400 mt-0.5">
              UPS College & CODSOFT Certified Foundations
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {credentials.map((cred, cIdx) => (
            <span
              key={cIdx}
              className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-white/[0.03] text-zinc-300 border border-white/10 flex items-center gap-2 hover:border-amber-400/40 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{cred}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
