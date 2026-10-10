"use client";

import React from "react";
import { roles, credentials } from "@/data/experience";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-xs font-mono text-teal-300 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRAJECTORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Work Experience &
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">
              Shipped Engagements
            </span>
          </h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-md font-light leading-relaxed">
          From solo greenfield product architecture to core mobile engineering at
          Repla Technologies.
        </p>
      </div>

      {/* Timeline List */}
      <div className="mt-12 space-y-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="p-8 rounded-2xl border border-white/10 bg-[#070b16]/70 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-[var(--duration-normal)] group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-light text-white group-hover:text-emerald-300 transition-colors">
                    {role.title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">·</span>
                  <span className="text-sm font-mono text-emerald-400 font-medium">
                    {role.org}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mt-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span>{role.place}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-zinc-300">
                <Calendar className="w-3 h-3 text-emerald-400" />
                <span>{role.dates}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              {role.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400 font-light">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
