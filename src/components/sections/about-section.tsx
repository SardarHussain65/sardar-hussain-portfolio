"use client";

import React from "react";
import Image from "next/image";
import { site } from "@/data/site";
import { Sparkles, Terminal, Code2, Layers, CheckCircle } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="relative py-16 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      <div className="night-panel relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#060a15]/80 p-4 sm:p-10 lg:p-14 backdrop-blur-xl">
        {/* Atmosphere glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Portrait & Stats */}
          <div className="lg:col-span-5 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="relative w-40 h-52 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,246,0.2)]">
              <Image
                src="/portrait.jpg"
                alt="Sardar Hussain"
                fill
                sizes="(max-width: 640px) 160px, 224px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a15] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-left" data-keep-dark>
                <p className="text-xs font-semibold text-white">{site.name}</p>
                <p className="text-[11px] font-mono text-mint-text">{site.title}</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center sm:justify-start gap-2 text-xs font-mono text-foreground">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                Virtual University (CS)
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03]">
                Repla Technologies
              </span>
            </div>
          </div>

          {/* Right Column: Bio & Core Focus */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-mono text-mint-text mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT ME</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-medium text-white tracking-tight leading-snug">
              Building apps that are fast, smooth, and easy to use.
            </h2>

            <p className="mt-3.5 sm:mt-5 text-sm sm:text-base text-foreground font-medium leading-relaxed">
              I am a mobile developer specializing in high-quality React Native apps,
              Smart TV platforms (Roku, Android TV & LG webOS), and full-stack web architectures.
            </p>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-foreground font-medium leading-relaxed">
              From real-time GPS ride tracking with Mapbox to smooth video streaming pipelines
              and secure Stripe payments, I care about clean code, battery efficiency, and apps
              that never freeze or crash.
            </p>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-mint-text">Smooth 60 FPS</p>
                <p className="text-xs text-foreground mt-1">Snappy touch gestures and animations that feel fast and responsive.</p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-purple-400">Video & Audio Streaming</p>
                <p className="text-xs text-foreground mt-1">Fast video startup with buffer-free playback for live streams and videos.</p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-teal-400">Full-Stack Capability</p>
                <p className="text-xs text-foreground mt-1">Building both mobile apps and their backends with Node.js, PostgreSQL, and Socket.IO.</p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <p className="text-xs font-mono text-foreground">Smart TV Apps</p>
                <p className="text-xs text-foreground mt-1">Creating custom TV apps for Roku, Android TV, Samsung, and LG with remote navigation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
