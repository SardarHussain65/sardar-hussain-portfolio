"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projects, Project } from "@/data/projects";
import { ArrowUpRight, Sparkles, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

export function ProjectsSection() {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const tags = ["all", "React Native", "Mapbox", "Stripe", "PostgreSQL", "HLS"];

  const filteredProjects =
    selectedTag === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(selectedTag));

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-emerald-400 mb-3">
            <Sparkles className="w-3 h-3" />
            <span>PRODUCTION DELIVERIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Flagship Systems &
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">
              Mobile Applications
            </span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-[var(--duration-fast)] ${
                selectedTag === tag
                  ? "bg-white text-zinc-950 font-medium"
                  : "bg-white/[0.04] text-zinc-400 border border-white/10 hover:text-white hover:bg-white/[0.08]"
              }`}
            >
              {tag === "all" ? "All Apps" : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {filteredProjects.map((project, idx) => {
          const featuredImage =
            project.images && project.images.length > 0
              ? project.images[0].src
              : null;

          return (
            <div
              key={project.slug}
              className="group relative rounded-2xl border border-white/10 bg-[#070b16]/70 backdrop-blur-md overflow-hidden hover:border-emerald-400/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all duration-[var(--duration-normal)] flex flex-col justify-between"
            >
              <div>
                {/* Project Media Preview */}
                <div className="relative w-full h-52 bg-zinc-950 overflow-hidden border-b border-white/5">
                  {featuredImage ? (
                    <Image
                      src={featuredImage}
                      alt={project.name}
                      fill
                      className="object-cover object-top opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0c1427] to-[#040813]">
                      <span className="text-3xl font-light text-zinc-600 mb-2 font-mono">
                        {project.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        Production Architecture
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Status Badge */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#030712]/80 backdrop-blur-md border border-white/10 text-emerald-400">
                      {project.role}
                    </span>
                    {project.status && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {project.status.split("·")[0]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-light text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                    <span>{project.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h3>

                  <p className="text-xs text-zinc-400 font-light mt-2 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-4 space-y-1.5">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-[11px] text-zinc-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags Footer */}
              <div className="px-6 pb-6 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-600">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
