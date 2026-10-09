"use client";

import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/ui/marquee";
import { skillGroups } from "@/data/skills";

export function TechStack() {
  const allItems = skillGroups.flatMap(g => g.items);
  const half = Math.ceil(allItems.length / 2);
  const marqueeRow1 = allItems.slice(0, half);
  const marqueeRow2 = allItems.slice(half);
  const aiGroup = skillGroups.find(g => g.id === "ai" || g.label.toLowerCase().includes("ai")) || { items: ["OpenAI", "Vector DBs", "LLMs"] };

  return (
    <section id="stack" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          index="03"
          kicker="Stack"
          title="Tools I build with."
          body=""
        />
        
        <Reveal>
          <div className="mt-14 space-y-4 overflow-hidden">
            <Marquee direction="left" speed={40} className="py-2">
              {marqueeRow1.map((item, i) => (
                <span key={i} className="mx-2 inline-block rounded-full border border-[var(--border)] bg-white/[0.04] px-4 py-2 font-mono text-sm text-zinc-300 transition-colors hover:border-violet hover:shadow-[0_0_12px_var(--violet)]">
                  {item}
                </span>
              ))}
            </Marquee>
            <Marquee direction="right" speed={40} className="py-2">
              {marqueeRow2.map((item, i) => (
                <span key={i} className="mx-2 inline-block rounded-full border border-[var(--border)] bg-white/[0.04] px-4 py-2 font-mono text-sm text-zinc-300 transition-colors hover:border-violet hover:shadow-[0_0_12px_var(--violet)]">
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-16 grid gap-8 md:hidden">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs uppercase tracking-wider text-violet">{group.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-[var(--border)] bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        
        <Reveal>
          <div className="mt-16 gradient-border relative overflow-hidden rounded-[24px] p-[1px]">
            <div className="relative h-full w-full rounded-[24px] bg-[#12141a] p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet">Next Horizon</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">AI Engineering</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {aiGroup.items.map((item) => (
                  <span key={item} className="rounded-full border border-[var(--border)] bg-white/[0.04] px-4 py-2 font-mono text-sm text-zinc-300 hover:border-violet hover:shadow-[0_0_12px_var(--violet)] transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
