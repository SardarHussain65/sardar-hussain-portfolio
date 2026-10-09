"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { credentials, roles } from "@/data/experience";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export function ExperienceTimeline() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1200px]" ref={containerRef}>
        <SectionHeading
          index="04"
          kicker="Timeline"
          title="Production, in parallel."
          body="Repla, a solo platform, a live Play Store app, and a computer science degree — the same years, different surfaces."
        />

        <Reveal>
          <div className="relative mt-12 pl-6">
            <div className="absolute left-0 top-0 h-full w-[1px] bg-white/10" />
            <motion.div 
              className="absolute left-0 top-0 w-[1px] bg-violet origin-top"
              style={{ height: lineHeight }}
            />
            
            <ol className="relative space-y-4">
              {roles.map((role, index) => (
                <motion.li
                  key={role.id}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28, delay: index * 0.03 }}
                  className="relative"
                >
                  <span className="absolute top-6 -left-[31px] h-3 w-3 rounded-full border border-violet bg-obsidian shadow-[0_0_12px_var(--violet)]" />
                  <article className={cn(
                    "glass-card rounded-[24px] border bg-white/[0.03] p-5 backdrop-blur-xl",
                    index === 0 ? "border-violet/40 shadow-[inset_0_0_20px_rgba(139,92,246,0.1)]" : "border-white/[0.08]"
                  )}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl font-semibold text-white">{role.org}</h3>
                      <p className="font-mono text-xs text-violet">{role.dates}</p>
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
          </div>

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
        </Reveal>
      </div>
    </section>
  );
}
