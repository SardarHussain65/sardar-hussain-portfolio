"use client";

import React, { useState } from "react";
import { ArrowUpRight, Zap, Play, Eye } from "lucide-react";
import { ParticleMode } from "@/components/scene/vesper-particle-field";

interface WorksShowcaseProps {
  onSelectMode: (mode: ParticleMode) => void;
}

const showcases = [
  {
    id: "galaxy",
    title: "Galactic Disk Vortex",
    type: "Spiral Particle Geometry",
    description: "Mirrored logarithmic spirals. On a phone they fold into one disk so the galaxy stays inside the portrait frame.",
    mode: "galaxy" as ParticleMode,
    stats: "20k desktop · lighter on a phone",
    accent: "from-teal-500/20 to-emerald-500/5",
  },
  {
    id: "brain",
    title: "Synaptic Neural Matrix",
    type: "3D Cortex Mesh Formation",
    description: "Two distinct cerebral hemispheres rendered as interconnected thinking particles with localized synaptic pulse clusters.",
    mode: "brain" as ParticleMode,
    stats: "Bilateral Lobes · Synaptic Glow",
    accent: "from-purple-500/20 to-violet-500/5",
  },
  {
    id: "orb",
    title: "Harmonic Torus Wave",
    type: "Continuous Surface Resonance",
    description: "Parametric breathing torus with organic surface undulations answering cursor inertia and touch velocity.",
    mode: "orb" as ParticleMode,
    stats: "5-Wave Harmonic · Pure Math",
    accent: "from-emerald-500/20 to-cyan-500/5",
  },
];

export function WorksShowcase({ onSelectMode }: WorksShowcaseProps) {
  const [activeItem, setActiveItem] = useState("galaxy");

  return (
    <section id="works" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            [ EXPERIMENTAL CATALOG ]
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-2">
            Selected Motion Layers
          </h2>
        </div>
        <p className="text-sm text-zinc-400 max-w-md font-light">
          Click any layer below to instantly morph the living 3D particle canvas above into its exact dimensional state.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {showcases.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setActiveItem(item.id);
              onSelectMode(item.mode);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`group relative p-7 rounded-2xl border transition-all duration-[var(--duration-normal)] cursor-pointer flex flex-col justify-between overflow-hidden bg-gradient-to-b ${item.accent} ${
              activeItem === item.id
                ? "border-emerald-400/60 shadow-[0_0_40px_rgba(16,185,129,0.18)] scale-[1.02]"
                : "border-white/10 hover:border-white/20 hover:scale-[1.01]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  {item.type}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-zinc-950 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </span>
              </div>

              <h3 className="text-xl font-light text-white group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-3 leading-relaxed font-light">
                {item.description}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">{item.stats}</span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Preview <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
