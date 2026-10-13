"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projects, Project, Shot } from "@/data/projects";
import {
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Smartphone,
  Tv,
  Layers,
  X,
  Eye,
} from "lucide-react";

export function ProjectsSection() {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Screen preview index tracked per project slug
  const [activeScreenIndex, setActiveScreenIndex] = useState<{ [key: string]: number }>({
    apnaustad: 0,
    ayy: 0,
    duplex: 0,
    hamdania: 0,
    vena: 0,
    qbox: 0,
  });

  const tags = ["all", "Smart TV", "React Native", "Mapbox", "Stripe", "PostgreSQL", "HLS"];

  const filteredProjects =
    selectedTag === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedTag));

  const handleSelectScreen = (slug: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveScreenIndex((prev) => ({ ...prev, [slug]: index }));
  };

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-emerald-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED PRODUCTION DELIVERIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Flagship Systems &
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">
              Mobile Applications
            </span>
          </h1>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-[var(--duration-fast)] ${
                selectedTag === tag
                  ? "bg-white text-zinc-950 font-medium shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.04] text-zinc-400 border border-white/10 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {tag === "all" ? "All Projects" : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid: Bento Architecture */}
      <div className="space-y-10 mt-12">
        {/* Top Flagship: ApnaUstad (Full-Width Bento Spotlight) */}
        {filteredProjects.find((p) => p.slug === "apnaustad") && (
          <div
            onClick={() => setActiveModalProject(projects[0])}
            className="group relative rounded-3xl border border-white/10 bg-[#060a16]/80 backdrop-blur-xl overflow-hidden hover:border-emerald-400/50 hover:shadow-[0_0_60px_rgba(16,185,129,0.14)] transition-all duration-500 cursor-pointer"
          >
            {/* Ambient Background Aura */}
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
              {/* Left Column: Product Story & Architecture */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Solo Full-Stack Architect
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono border border-white/10 bg-white/[0.03] text-zinc-400">
                      Marketplace Platform
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight flex items-center gap-3">
                    <span>ApnaUstad</span>
                    <ArrowUpRight className="w-6 h-6 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 font-light mt-3 leading-relaxed">
                    Complete on-demand services platform engineered from scratch alone:
                    dual-role mobile app (Client & Worker), real-time GPS tracking over Socket.IO,
                    PostgreSQL state machine, and dedicated React web admin desk.
                  </p>
                </div>

                {/* Highlights List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Dual-role mobile navigation in one codebase</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Sub-second live worker GPS tracking over Socket.IO</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>PostgreSQL database with Sequelize booking state machine</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>React web admin panel for dispute escrow & revenue</span>
                  </div>
                </div>

                {/* Tags & Action */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["React Native", "Node.js", "PostgreSQL", "Socket.IO", "React.js", "Expo Push"].map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-3 py-1 rounded-lg border border-white/8 bg-white/[0.03] text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 group-hover:underline">
                    View Details & Screens <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Right Column: Realistic Smartphone Mockup & Screen Switcher */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="relative">
                  {/* Smartphone Bezel */}
                  <div className="relative w-[240px] sm:w-[270px] h-[490px] sm:h-[550px] rounded-[2.5rem] p-3 border-[3px] border-white/20 bg-[#0d1322] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(16,185,129,0.2)] flex flex-col justify-between overflow-hidden">
                    {/* Dynamic Island Notch */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-end px-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                    </div>

                    {/* Active Screenshot Display */}
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-zinc-950">
                      <Image
                        src={projects[0].images[activeScreenIndex["apnaustad"] || 0].src}
                        alt={projects[0].images[activeScreenIndex["apnaustad"] || 0].alt}
                        fill
                        sizes="(max-width: 640px) 240px, 270px"
                        className="object-cover object-top transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Interactive Screen Selector Pills */}
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                    {projects[0].images.slice(0, 4).map((shot, idx) => (
                      <button
                        key={shot.label}
                        type="button"
                        onClick={(e) => handleSelectScreen("apnaustad", idx, e)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all ${
                          (activeScreenIndex["apnaustad"] || 0) === idx
                            ? "bg-emerald-400 text-zinc-950 font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                            : "bg-white/[0.05] text-zinc-400 hover:text-white border border-white/5"
                        }`}
                      >
                        {shot.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-Column Grid for Ayy Ride, Duplex TV, Hamdania, Vena AI, QBox */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects
            .filter((p) => p.slug !== "apnaustad")
            .map((project) => {
              const currentScreenIdx = activeScreenIndex[project.slug] || 0;
              const currentImage =
                project.images && project.images.length > 0
                  ? project.images[currentScreenIdx] || project.images[0]
                  : null;

              return (
                <div
                  key={project.slug}
                  onClick={() => setActiveModalProject(project)}
                  className="group relative rounded-3xl border border-white/10 bg-[#060a16]/75 backdrop-blur-xl overflow-hidden hover:border-emerald-400/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.12)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
                >
                  <div className="p-6 sm:p-8">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-emerald-300">
                        {project.role}
                      </span>
                      {project.status && (
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {project.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-light text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 font-light mt-2.5 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>

                    {/* Frame Showcase: Cinema Smart TV 16:9 Frame vs Smartphone Mockup */}
                    <div className="my-6 relative flex flex-col items-center justify-center pt-2">
                      {project.deviceType === "tv" ? (
                        /* Dedicated 16:9 Cinema Smart TV Mockup Frame */
                        <div className="w-full flex flex-col items-center group-hover:scale-[1.03] transition-transform duration-500">
                          {/* TV Display Bezel */}
                          <div className="relative w-full aspect-[16/10] rounded-xl p-2 sm:p-2.5 border-[2px] border-zinc-700/80 bg-[#070b14] shadow-[0_20px_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
                            {/* Top Smart TV Status Bar */}
                            <div className="flex items-center justify-between px-2 pb-1.5 text-[9px] font-mono text-zinc-400 border-b border-white/5">
                              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wide">
                                <Tv className="w-3 h-3 text-cyan-400" />
                                <span>SMART TV APP</span>
                              </span>
                              <span className="flex items-center gap-1 text-[8px] text-zinc-400 font-mono">
                                <span className="text-purple-300">ROKU</span> · <span className="text-sky-300">TIZEN</span> · <span className="text-pink-300">webOS</span> · <span className="text-emerald-300">ANDROID TV</span>
                              </span>
                            </div>

                            {/* 16:9 TV Screen Display */}
                            <div className="relative flex-1 w-full rounded-md overflow-hidden bg-black mt-1">
                              {currentImage ? (
                                <Image
                                  src={currentImage.src}
                                  alt={currentImage.alt}
                                  fill
                                  sizes="(max-width: 640px) 100vw, 400px"
                                  className="object-cover object-top"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Tv className="w-8 h-8 text-cyan-400" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                            </div>

                            {/* Bottom TV Bezel & Power LED */}
                            <div className="pt-1.5 flex items-center justify-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                            </div>
                          </div>

                          {/* TV Stand Base */}
                          <div className="w-12 h-2.5 bg-gradient-to-b from-zinc-700 to-zinc-900 mx-auto" />
                          <div className="w-32 h-1 rounded-full bg-zinc-600/70 shadow-[0_4px_10px_rgba(0,0,0,0.8)] mx-auto" />

                          {/* TV Ecosystem Chips */}
                          <div className="mt-3 flex flex-wrap items-center justify-center gap-1">
                            {["Roku SceneGraph", "Samsung Tizen", "LG webOS", "Android TV"].map((plat) => (
                              <span
                                key={plat}
                                className="text-[9px] font-mono px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-950/40 text-cyan-300"
                              >
                                {plat}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : currentImage ? (
                        /* Smartphone Titanium Mockup */
                        <div className="relative w-[200px] sm:w-[220px] h-[380px] sm:h-[420px] rounded-[2.2rem] p-2.5 border-[2.5px] border-white/15 bg-[#0a0f1d] shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                          {/* Top Notch Pill */}
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20" />

                          {/* Screenshot */}
                          <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden bg-zinc-950">
                            <Image
                              src={currentImage.src}
                              alt={currentImage.alt}
                              fill
                              sizes="(max-width: 640px) 200px, 220px"
                              className="object-cover object-top"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-56 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent flex flex-col items-center justify-center p-6 text-center">
                          <Smartphone className="w-8 h-8 text-zinc-600 mb-2" />
                          <span className="text-xs font-mono text-zinc-400">Production Application</span>
                        </div>
                      )}

                      {/* Screen selector mini-pills */}
                      {project.images && project.images.length > 1 && (
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 z-10">
                          {project.images.map((shot, sIdx) => (
                            <button
                              key={shot.label}
                              type="button"
                              onClick={(e) => handleSelectScreen(project.slug, sIdx, e)}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                                currentScreenIdx === sIdx
                                  ? project.deviceType === "tv"
                                    ? "bg-cyan-400 text-zinc-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                                    : "bg-emerald-400 text-zinc-950 font-bold"
                                  : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5"
                              }`}
                            >
                              {shot.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Highlights bullet points */}
                    <div className="space-y-2 mt-4">
                      {project.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-400 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags Footer */}
                  <div className="px-6 sm:px-8 py-4 border-t border-white/5 bg-white/[0.01] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/5 bg-white/[0.02] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] font-mono px-2 py-1 text-zinc-500">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-zinc-400 group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                      Details <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* ─── DETAILED PROJECT MODAL / CASE STUDY DRAWER ─── */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#060a16] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9)] text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                {activeModalProject.role}
              </span>
              {activeModalProject.status && (
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-zinc-300 border border-white/10">
                  {activeModalProject.status}
                </span>
              )}
            </div>

            <h3 className="text-3xl sm:text-4xl font-light text-white mb-4">
              {activeModalProject.name}
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed mb-6">
              {activeModalProject.summary}
            </p>

            {/* Problem & Solution Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 mb-2">
                  The Problem & Challenge
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {activeModalProject.problem}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                  Engineered Solution
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {activeModalProject.solution}
                </p>
              </div>
            </div>

            {/* Screenshots Gallery - Smart TV Cinema vs Mobile Application */}
            {activeModalProject.images && activeModalProject.images.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    {activeModalProject.deviceType === "tv"
                      ? "Smart TV 10-Foot Spatial UI & Live Playback Screens"
                      : "Application Screens & Flow"}
                  </h4>
                  {activeModalProject.deviceType === "tv" && (
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5" />
                      Roku · Samsung Tizen · LG webOS · Android TV
                    </span>
                  )}
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
                  {activeModalProject.images.map((img, i) => (
                    <div
                      key={i}
                      className={
                        activeModalProject.deviceType === "tv"
                          ? "shrink-0 w-80 sm:w-96 rounded-2xl p-2.5 border border-zinc-700/80 bg-[#070b14] shadow-xl flex flex-col justify-between"
                          : "shrink-0 w-44 sm:w-52 h-80 sm:h-96 rounded-2xl p-2 border border-white/10 bg-[#0d1322] shadow-lg flex flex-col justify-between"
                      }
                    >
                      <div
                        className={`relative w-full rounded-xl overflow-hidden bg-black ${
                          activeModalProject.deviceType === "tv" ? "aspect-video" : "h-full"
                        }`}
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          sizes="(max-width: 640px) 320px, 384px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between px-1">
                        <span className="text-[10px] font-mono text-zinc-300">
                          {img.label}
                        </span>
                        {activeModalProject.deviceType === "tv" && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/20">
                            10-ft UI
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Key Technical Achievements
              </h4>
              <div className="space-y-2">
                {activeModalProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 font-light">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Tags */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
              {activeModalProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-3 py-1 rounded-lg border border-white/10 bg-white/[0.04] text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
