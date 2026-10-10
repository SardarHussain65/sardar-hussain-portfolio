"use client";

import React from "react";
import { Sparkles, Cpu, Layers, Radio, Shield, Gauge } from "lucide-react";

const capabilities = [
  {
    index: "01",
    title: "Kinetic Vector Warping",
    subtitle: "Real-Time Pointer Physics",
    desc: "Every particle calculates proximity to the cursor in real time. Instead of pre-baked keyframes, forces compute dynamically on the GPU.",
    stat: "0.2ms GPU frame",
    tag: "GLSL Shader",
  },
  {
    index: "02",
    title: "Three-Phase State Morph",
    subtitle: "Torus · Galaxy · Neural Mesh",
    desc: "Seamless mathematical transitions between a condensed organic breathing torus, a swirling logarithmic galaxy, and an interconnected neural mesh.",
    stat: "3 Dimensional States",
    tag: "Vector Buffer",
  },
  {
    index: "03",
    title: "Adaptive Density Scaling",
    subtitle: "Device-Aware Budgets",
    desc: "From 120Hz ProMotion displays down to mobile GPUs, particle counts dynamically scale from 75k to 42k to maintain an unwavering 60fps budget.",
    stat: "120Hz ProMotion Ready",
    tag: "Adaptive DPR",
  },
  {
    index: "04",
    title: "Zero GC Allocations",
    subtitle: "Memory Leak Free",
    desc: "Strictly pooled typed arrays and deterministic requestAnimationFrame loops prevent garbage collection pauses during critical scroll interactions.",
    stat: "0 KB Garbage Spikes",
    tag: "Engine Hardened",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-emerald-400 mb-4">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>ENGINE ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Motion instead <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">
              of chrome
            </span>
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
            STEP DOWN BY DEVICE, NEVER BY FRAME RATE.
          </p>
          <p className="text-sm text-zinc-400 leading-relaxed font-light">
            An interface architecture engineered to eliminate visual static.
            Living WebGL particles that transform your product into a kinetic,
            responsive atmosphere.
          </p>
        </div>
      </div>

      {/* Grid of Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {capabilities.map((item) => (
          <div
            key={item.index}
            className="group relative p-8 rounded-2xl border border-white/10 bg-[#070b16]/60 backdrop-blur-md hover:border-emerald-500/40 hover:bg-[#070b16]/90 transition-all duration-[var(--duration-normal)] shadow-lg hover:shadow-[0_0_35px_rgba(16,185,129,0.12)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-emerald-400/80 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                  {item.index}
                </span>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs font-mono text-purple-400/90 mt-1 mb-3">
                {item.subtitle}
              </p>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">Benchmark</span>
              <span className="text-xs font-mono text-white font-medium">
                {item.stat}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
