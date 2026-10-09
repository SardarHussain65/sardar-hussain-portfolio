"use client";

import { Reveal } from "@/components/ui/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { site, stats } from "@/data/site";
import { GraduationCap, MapPin, Building2 } from "lucide-react";

export function About() {
  return (
    <section id="about" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-violet">About</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Building products people tap every day.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
                {site.bio}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                  <MapPin className="h-4 w-4 text-violet" />
                  {site.location}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                  <GraduationCap className="h-4 w-4 text-violet" />
                  {site.education}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300">
                  <Building2 className="h-4 w-4 text-violet" />
                  {site.company}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card flex flex-col items-center justify-center rounded-[24px] p-6 text-center border border-white/[0.08] bg-white/[0.03] shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex items-baseline font-display text-4xl font-semibold text-violet">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
