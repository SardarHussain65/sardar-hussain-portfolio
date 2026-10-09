"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { credentials, roles } from "@/data/experience";
import { motion, useReducedMotion } from "motion/react";

export function ExperienceTimeline() {
  const reduced = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          kicker="Timeline"
          title="Production, in parallel."
          body="Repla, a solo platform, a live Play Store app, and a computer science degree — the same years, different surfaces."
        />

        <ol className="relative mt-12 space-y-4 border-l border-white/10 pl-6">
          {roles.map((role, index) => (
            <motion.li
              key={role.id}
              initial={reduced ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ type: "spring", stiffness: 400, damping: 28, delay: index * 0.03 }}
              className="relative"
            >
              <span className="absolute top-6 -left-[31px] h-3 w-3 rounded-full border border-cyan bg-obsidian shadow-[0_0_12px_rgba(0,245,212,0.8)]" />
              <article className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-xl">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-semibold text-white">{role.org}</h3>
                  <p className="font-mono text-xs text-cyan">{role.dates}</p>
                </div>
                <p className="mt-1 text-sm text-zinc-300">
                  {role.title}
                  <span className="text-zinc-500"> · {role.place}</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-400">
                  {role.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ol>

        <ul className="mt-8 flex flex-wrap gap-2">
          {credentials.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
