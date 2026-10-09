"use client";

import { heroSlides } from "@/data/hero";
import { mailHref, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { GlowingButton } from "@/components/ui/glowing-button";
import { MagneticBadge } from "@/components/ui/magnetic-badge";
import { ShotStage } from "@/components/ui/shot-stage";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const metrics = [
  { value: "6+", label: "Production apps shipped" },
  { value: "60 FPS", label: "Reanimated and MMKV standard" },
  { value: "Solo", label: "React Native, Node, Postgres, admin" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];

  return (
    <section className="relative px-4 pt-28 pb-20 sm:px-6 lg:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="flex items-center gap-4">
            <motion.div
              className="[perspective:800px]"
              initial={reduced ? false : { opacity: 0, rotateY: -18 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Image
                src="/portrait.jpg"
                alt="Portrait of Sardar Hussain"
                width={687}
                height={1024}
                priority
                className="h-auto w-28 shadow-[0_28px_50px_-18px_rgba(0,245,212,0.55),0_0_0_1px_rgba(255,255,255,0.14)]"
                style={{ transform: "rotateY(-12deg) rotateX(4deg)" }}
              />
            </motion.div>
            <div>
              <p className="font-display text-lg font-semibold text-white">{site.name}</p>
              <p className="mt-1 max-w-xs text-sm leading-snug text-zinc-400">{site.title}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-xs text-zinc-500">
                <MapPin className="h-3.5 w-3.5 text-cyan" aria-hidden />
                {site.location}
              </p>
            </div>
          </div>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mt-8 max-w-xl font-display text-[2.6rem] leading-[1.02] font-semibold tracking-tight text-white sm:text-6xl"
          >
            Crafting{" "}
            <span className="font-serif font-normal whitespace-nowrap text-cyan italic">
              High‑Framerate
            </span>
            {", "}
            Production‑Grade{" "}
            <span className="bg-gradient-to-r from-ios to-cyan bg-clip-text text-transparent">
              React Native
            </span>{" "}
            Experiences.
          </motion.h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Native-feeling apps with Mapbox routing, HLS video pipelines, Stripe payment
            sheets, and a solo full-stack platform from the phone to Postgres and the admin
            desk.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <GlowingButton href="#contact">Get in Touch</GlowingButton>
            <GlowingButton href="#projects" variant="ghost">
              View the work
            </GlowingButton>
            <GlowingButton href={mailHref} variant="ghost">
              {site.email}
            </GlowingButton>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            {metrics.map((metric) => (
              <MagneticBadge key={metric.value}>
                <p className="font-display text-lg font-semibold text-cyan sm:text-2xl">
                  {metric.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-zinc-400 sm:text-xs">
                  {metric.label}
                </p>
              </MagneticBadge>
            ))}
          </div>
        </div>

        <div>
          <ShotStage key={slide.id} shots={slide.frames} priority={index === 0} />
          <div className="mt-4 text-center">
            <p className="font-display text-lg text-white">{slide.app}</p>
            <p className="mt-1 text-sm text-zinc-400">{slide.caption}</p>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 pb-2">
            {heroSlides.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(itemIndex)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs",
                  itemIndex === index
                    ? "bg-cyan text-obsidian"
                    : "bg-white/[0.05] text-zinc-300",
                )}
                aria-pressed={itemIndex === index}
              >
                {item.app}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
