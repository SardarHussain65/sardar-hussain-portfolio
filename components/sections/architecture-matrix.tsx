"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { systems } from "@/data/skills";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function ArchitectureMatrix() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string>(systems[0].id);

  return (
    <section id="architecture" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div id="skills" className="mx-auto max-w-[1200px] scroll-mt-28">
        <SectionHeading
          index="03"
          kicker="Systems"
          title="Native architecture, not a layout kit."
          body="The work sits under the screen: storage, sockets, video, release builds, and the agent stack now in progress."
        />

        <Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {systems.map((system, index) => {
              const expanded = open === system.id;
              return (
                <motion.button
                  key={system.id}
                  type="button"
                  initial={reduced ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ type: "spring", stiffness: 400, damping: 28, delay: index * 0.04 }}
                  onClick={() => setOpen(system.id)}
                  aria-expanded={expanded}
                  className={cn(
                    "glass-card glow-card relative rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5 text-left shadow-2xl backdrop-blur-xl",
                    (index === 0 || index > 2) && "xl:col-span-2",
                    expanded && "border-violet/40",
                  )}
                  onMouseMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    event.currentTarget.style.setProperty("--x", `${event.clientX - bounds.left}px`);
                    event.currentTarget.style.setProperty("--y", `${event.clientY - bounds.top}px`);
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet">
                    {system.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">{system.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">{system.summary}</p>
                  {expanded ? (
                    <p className="mt-3 text-sm leading-relaxed text-zinc-200">{system.detail}</p>
                  ) : (
                    <p className="mt-3 text-xs text-zinc-500">Open for the build notes</p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
