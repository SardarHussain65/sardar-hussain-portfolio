"use client";

import React from "react";
import { skillGroups } from "@/data/skills";
import { Cpu, Terminal, Radio, Shield, Smartphone, Zap } from "lucide-react";

export function SkillsMatrix() {
  return (
    <section id="stack" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs font-mono text-purple-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>ARCHITECTURE & ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Engineering Skills &
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">
              Technical Stack
            </span>
          </h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-md font-light leading-relaxed">
          Full-lifecycle mobile and system stacks tailored for low-latency delivery,
          strict memory boundaries, and 60fps gesture continuity.
        </p>
      </div>

      {/* Grid of Skill Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {skillGroups.map((group, index) => (
          <div
            key={group.id}
            className="p-7 rounded-2xl border border-white/10 bg-[#070b16]/70 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-[var(--duration-normal)] group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-light text-white group-hover:text-emerald-300 transition-colors">
                  {group.label}
                </h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-2 py-0.5 rounded bg-white/[0.03] border border-white/5">
                  0{index + 1}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/8 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-emerald-400/40 hover:bg-emerald-500/5 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Stack verified</span>
              <span className="text-emerald-400">Production</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
