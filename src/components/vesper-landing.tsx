"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsMatrix } from "@/components/sections/skills-matrix";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EngagementSection } from "@/components/sections/engagement-section";
import { Footer } from "@/components/navigation/footer";
import { SceneViewport } from "@/components/common/scene-viewport";
import {
  VesperParticleField,
  ParticleMode,
} from "@/components/scene/vesper-particle-field";

export function VesperLanding() {
  const [currentMode, setCurrentMode] = useState<ParticleMode>("galaxy");

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Living field. SceneViewport ignores the iOS toolbar so the buffer is not rebuilt on every scroll. */}
      <SceneViewport className="z-0 overflow-hidden pointer-events-none bg-field">
        <VesperParticleField currentMode={currentMode} className="h-full w-full" />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[18%] -left-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16),transparent_68%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[18%] -right-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_68%)]"
        />
        <div
          aria-hidden
          className="hero-shield pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_48%_at_50%_28%,rgba(3,7,18,0.92)_0%,rgba(3,7,18,0.55)_48%,transparent_76%)]"
        />
      </SceneViewport>

      {/* ─── SARDAR HUSSAIN PORTFOLIO LAYOUT & SECTIONS ─── */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection
          currentMode={currentMode}
          onModeChange={setCurrentMode}
        />
        <div className="relative bg-transparent">
          <AboutSection />
          <ProjectsSection />
          <SkillsMatrix />
          <ExperienceSection />
          <EngagementSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </div>
  );
}
