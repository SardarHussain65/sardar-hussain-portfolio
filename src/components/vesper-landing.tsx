"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsMatrix } from "@/components/sections/skills-matrix";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/navigation/footer";
import {
  VesperParticleField,
  ParticleMode,
} from "@/components/scene/vesper-particle-field";

export function VesperLanding() {
  const [currentMode, setCurrentMode] = useState<ParticleMode>("galaxy");

  return (
    <div className="relative w-full min-h-screen bg-[#030712] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* ─── LIVING 3D WEBGL PARTICLE SYSTEM (Fixed Background Canvas) ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <VesperParticleField
          currentMode={currentMode}
          onModeChange={setCurrentMode}
          className="w-full h-full"
        />
        {/* Ethereal Atmospheric Lighting Gradients matching Twin Spirals */}
        <div className="absolute top-1/4 -left-32 w-[650px] h-[650px] bg-emerald-500/12 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] bg-violet-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/08 rounded-full blur-[140px] pointer-events-none" />

        {/* Central Readability & Depth Shield: keeps text 100% crisp and readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_50%_35%,rgba(3,7,18,0.78)_0%,rgba(3,7,18,0.30)_60%,transparent_100%)] pointer-events-none" />
      </div>

      {/* ─── SARDAR HUSSAIN PORTFOLIO LAYOUT & SECTIONS ─── */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection
          currentMode={currentMode}
          onModeChange={setCurrentMode}
        />
        <AboutSection />
        <ProjectsSection />
        <SkillsMatrix />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
