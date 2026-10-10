"use client";

import React from "react";
import { Terminal, ShieldCheck, Zap, Activity } from "lucide-react";

export function TechArchitecture() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#060a15]/80 backdrop-blur-xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-emerald-400 mb-6">
              <Terminal className="w-3.5 h-3.5" />
              <span>STACK SPECIFICATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-snug">
              Engineered for buttery-smooth 60fps across every screen.
            </h2>

            <p className="mt-5 text-sm text-zinc-400 font-light leading-relaxed">
              Vesper replaces heavy DOM nodes and bloated video loops with lightweight
              GPU-rendered particle shaders. A single draw call handles up to 91,000
              points with zero CPU overhead, ensuring instant cold starts and smooth
              scroll continuity.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-emerald-400">WebGL 2.0 Pipeline</p>
                <p className="text-xs text-zinc-400 mt-1">Multi-stage vertex interpolation with additive blending.</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-purple-400">Spring Physics Sync</p>
                <p className="text-xs text-zinc-400 mt-1">Cursor momentum buffered via damped frame clock math.</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-teal-400">Context Recovery</p>
                <p className="text-xs text-zinc-400 mt-1">Auto-restores WebGL context on mobile memory pressure.</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-zinc-300">Next.js 16 Ready</p>
                <p className="text-xs text-zinc-400 mt-1">Static pre-render with zero hydration flicker.</p>
              </div>
            </div>
          </div>

          {/* Interactive Code Preview / Matrix HUD */}
          <div className="p-6 rounded-2xl border border-white/10 bg-[#02050c]/90 font-mono text-xs text-zinc-300 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-zinc-500 text-[11px] ml-2">vesper-core.glsl</span>
              </div>
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider">
                COMPILATION: ACTIVE
              </span>
            </div>

            <pre className="overflow-x-auto text-zinc-400 leading-relaxed text-[11px]">
              <code>{`// Multi-phase vector interpolation
void main() {
  vec3 pos = mix(aTargetOrb, aTargetGalaxy, uMorph);
  float dist = length(pos - uMouseWorld);
  if (dist < 2.2) {
    float force = (1.0 - dist / 2.2);
    pos += normalize(pos - uMouseWorld) * force * 0.75;
  }
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (aSize * uPixelRatio * 38.0) / -mvPosition.z;
}`}</code>
            </pre>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
              <span>DRAW CALLS: 1</span>
              <span>GEOMETRY: 75,000 VERTICES</span>
              <span className="text-emerald-400">STATUS: 60 FPS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
