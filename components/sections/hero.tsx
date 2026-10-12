"use client";

import { ParticleField } from "@/components/scene/particle-field";
import { GlowingButton } from "@/components/ui/glowing-button";
import { site } from "@/data/site";
import { motion, useReducedMotion } from "motion/react";

const badges = ["React Native", "Mapbox", "HLS video", "Stripe", "PostgreSQL"];

const stats = [
  { value: "6+", label: "Production apps" },
  { value: "60", label: "FPS motion standard" },
  { value: "1", label: "Solo full-stack platform" },
  { value: "~2", label: "Years shipping" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#030712]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_58%,rgba(139,92,246,0.14),transparent_36%),radial-gradient(ellipse_at_50%_72%,rgba(16,185,129,0.1),transparent_40%)]" />
      <ParticleField />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-5xl flex-col justify-between px-4 pt-28 pb-28 sm:px-6">
        <div className="pt-8 text-center sm:pt-14">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="font-mono text-[11px] uppercase tracking-[0.32em] text-white/55"
          >
            {site.name} · {site.location}
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.05 }}
            className="mx-auto mt-6 max-w-4xl font-display text-[3.1rem] leading-[0.95] font-medium tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            Presence,
            <span className="block bg-gradient-to-r from-white via-[#c4b5fd] to-[#6ee7b7] bg-clip-text text-transparent">
              in motion.
            </span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.12 }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Production React Native products for ride-hailing, live television, lockers,
            and a solo marketplace. The field reads your pointer. The apps answer a real job.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2"
          >
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[11px] tracking-wide text-white/70 backdrop-blur-md"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <GlowingButton href="#projects">View the work</GlowingButton>
            <GlowingButton href="#contact" variant="ghost">
              Contact
            </GlowingButton>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-white/10 px-4 py-5 sm:border-l sm:first:border-l-0">
              <dt className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs text-white/45">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
