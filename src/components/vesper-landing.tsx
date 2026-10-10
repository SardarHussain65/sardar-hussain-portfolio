"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WorksShowcase } from "@/components/sections/works-showcase";
import { TechArchitecture } from "@/components/sections/tech-architecture";
import { CtaSection } from "@/components/sections/cta-section";
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
        {/* Soft Ethereal Atmospheric Lighting Gradients */}
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* ─── UI LAYOUT & SECTIONS ─── */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection
          currentMode={currentMode}
          onModeChange={setCurrentMode}
        />
        <ServicesSection />
        <WorksShowcase onSelectMode={setCurrentMode} />
        <TechArchitecture />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
