"use client";

import React from "react";
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
  ArrowUpRight,
  GraduationCap,
  Award,
} from "lucide-react";

export function ExperienceSection() {
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
    <section id="experience" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-7xl max-w-full mx-auto z-10 overflow-x-clip">
      {/* Section Header */}
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14 border-b border-border-subtle">
        <div
          aria-hidden
          className="field-wash pointer-events-none absolute inset-x-0 -top-10 -bottom-4 bg-[linear-gradient(180deg,transparent,var(--background)_18%,var(--background)_78%,transparent)]"
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-background/80 text-xs font-medium font-mono text-mint-text mb-3">
            <Briefcase className="w-3.5 h-3.5 text-teal-300" />
            <span>WORK HISTORY</span>
          </div>
          <h2 className="text-3xl font-medium tracking-tight text-foreground [text-shadow:0_2px_12px_rgba(3,7,18,0.55)] sm:text-5xl">
            Work Experience
            <span className="block font-normal text-foreground">
              & Key Projects
            </span>
          </h2>
        </div>
        <div className="relative flex flex-col items-start md:items-end gap-2 text-left md:text-right">
          <p className="max-w-md text-sm font-medium leading-relaxed text-foreground">
            From independent full-stack products to core mobile app engineering at Repla Technologies.
          </p>
        </div>
      </div>

      {/* ─── STICKY-STACKING CARDS CONTAINER ─── */}
      <div className="cards-container relative mt-8 space-y-5 pb-8 sm:mt-12 sm:space-y-8 md:mt-16 md:space-y-16 md:pb-36">
        {roles.map((role, index) => {
          const theme = getAccentTheme(role.accent);
          const stickyTop = 80 + index * 32;

          return (
            <div
              key={role.id}
              style={{
                zIndex: index + 10,
              }}
              className={`night-panel card w-full rounded-2xl sm:rounded-3xl border bg-[#070b16]/95 p-4 sm:p-8 lg:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl origin-top transition-colors duration-[var(--duration-fast)] ease-entrance md:sticky md:top-[var(--sticky-top)] ${theme.glow}`}
              ref={(el) => {
                if (el) el.style.setProperty("--sticky-top", `${stickyTop}px`);
              }}
            >
              {/* Subtle Ambient Background Gradient */}
              <div
                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${theme.gradient} pointer-events-none`}
              />

              {/* Card Header: Clean Mobile-First Layout */}
              <div className="relative pb-4 sm:pb-6 border-b border-white/10">
                {/* Row 1: Index Badge, Location & Dates */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-[11px] sm:text-xs font-mono font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border whitespace-nowrap shrink-0 ${theme.badge}`}
                    >
                      0{index + 1} / 0{roles.length}
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-text-muted flex items-center gap-1 min-w-0">
                      <MapPin className="w-3 h-3 text-text-muted shrink-0" />
                      <span className="truncate">{role.place}</span>
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px] sm:text-xs font-mono text-foreground whitespace-nowrap shrink-0">
                    {role.current && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    <Calendar className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{role.dates}</span>
                  </div>
                </div>

                {/* Row 2: Role Title & Organization */}
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-1">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-white tracking-tight">
                    {role.title}
                  </h3>
                  <span className="text-text-muted font-mono text-sm sm:text-base">@</span>
                  <span className={`text-lg sm:text-xl lg:text-2xl font-normal ${theme.accentText}`}>
                    {role.org}
                  </span>
                </div>

                {/* Row 3: Impact metric & badge tagline */}
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="text-[11px] sm:text-xs font-mono px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/[0.04] text-foreground border border-white/10 flex items-center gap-1.5">
                    <Rocket className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${theme.accentText} shrink-0`} />
                    <span>{role.impactMetric}</span>
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-text-muted">
                    {"// " + role.badge}
                  </span>
                </div>
              </div>

              {/* Two-Column Card Body */}
              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start mt-4 sm:mt-6">
                {/* Left Column: Responsibilities & Shipped Products (7 cols) */}
                <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                  <div className="hidden sm:block">
                    <h4 className="text-sm sm:text-base font-normal text-white mb-1">
                      Key Engineering Responsibilities & Impact
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground/80 font-medium">
                      Delivered high-reliability mobile architecture, cross-platform UI, and systems integration.
                    </p>
                  </div>

                  {/* Points Checklist */}
                  <div className="space-y-2 sm:space-y-2.5">
                    {role.points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-foreground font-medium p-2.5 sm:p-3 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5 ${theme.accentText}`}
                        />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Production Apps Badges (if present) */}
                  {role.shippedProjects && role.shippedProjects.length > 0 && (
                    <div className="pt-1 sm:pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-1.5">
                        Shipped Commercial Platforms:
                      </span>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {role.shippedProjects.map((proj) => (
                          <span
                            key={proj}
                            className="text-[11px] sm:text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] text-foreground border border-white/10 flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{proj}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Stack Arsenal with SVGs (5 cols) */}
                <div className="lg:col-span-5 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] sm:bg-black/40 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
                      Production Tech Stack
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">
                      {role.techStack.length} Techs
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
                    {role.techStack.map((tech) => (
                      <div
                        key={tech}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl border text-[11px] sm:text-xs font-mono transition-all duration-200 shadow-sm ${theme.pill}`}
                      >
                        <TechIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>

                  {/* Verification Indicator */}
                  <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-white/5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-text-muted">
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
      <div className="night-panel mt-8 sm:mt-12 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#070b16]/90 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-400 shrink-0">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-medium text-white">
              Academic Foundation & Diplomas
            </h4>
            <p className="text-[11px] sm:text-xs font-mono text-foreground mt-0.5">
              UPS College & CODSOFT Certified Foundations
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {credentials.map((cred, cIdx) => (
            <span
              key={cIdx}
              className="text-[11px] sm:text-xs font-mono px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.03] text-foreground border border-white/10 flex items-center gap-1.5 sm:gap-2 hover:border-amber-400/40 transition-colors"
            >
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
              <span>{cred}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
