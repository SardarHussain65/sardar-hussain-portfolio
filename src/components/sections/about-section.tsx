"use client";

import React from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { Sparkles, Terminal, Code2, Layers, CheckCircle } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="night-panel relative overflow-hidden rounded-3xl border border-white/10 bg-[#060a15]/80 p-5 backdrop-blur-xl sm:p-10 lg:p-14">
        {/* Atmosphere glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="relative w-44 h-56 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,246,0.2)]">
              <Image
                src="/portrait.jpg"
                alt="Sardar Hussain"
                fill
                sizes="(max-width: 640px) 176px, 224px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a15] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-left" data-keep-dark>
                <p className="text-xs font-semibold text-white">{site.name}</p>
                <p className="text-[11px] font-mono text-emerald-400">{site.title}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-zinc-400">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                Virtual University (CS)
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                Repla Technologies
              </span>
            </div>
          </div>

          {/* Right Column: Bio & Core Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-emerald-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE DEVELOPER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight leading-snug">
              Building apps that feel native, responsive, and relentless.
            </h2>

            <p className="mt-5 text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              I am a Mobile App Engineer specializing in high-performance React Native
              applications, Smart TV media platforms (Roku BrightScript & LG webOS), and
              end-to-end full-stack architectures.
            </p>

            <p className="mt-4 text-sm text-zinc-400 font-light leading-relaxed">
              From sub-second live GPS vehicle polylines on Mapbox to low-latency HLS
              streaming pipelines and Stripe payment sheets, my code focuses on
              deterministic frame rates, zero memory leaks, and seamless native integration.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-emerald-400">60 FPS Native Performance</p>
                <p className="text-xs text-zinc-400 mt-1">Reanimated 3 & gesture-handler architectures tuned for buttery 60fps.</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-purple-400">Low-Latency Media</p>
                <p className="text-xs text-zinc-400 mt-1">HLS live and VoD video pipelines with hardware acceleration & MMKV cache.</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-teal-400">Full-Stack Autonomy</p>
                <p className="text-xs text-zinc-400 mt-1">Solo platform builds with Node.js, PostgreSQL, Socket.IO, and React admin desks.</p>
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-zinc-300">Smart TV Mastery</p>
                <p className="text-xs text-zinc-400 mt-1">Production Roku BrightScript channels & LG webOS IPTV applications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
