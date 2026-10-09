"use client";

import { heroSlides } from "@/data/hero";
import { mailHref, site, roles as roleTexts } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { GlowingButton } from "@/components/ui/glowing-button";
import { Typewriter } from "@/components/ui/typewriter";
import { DeviceFrame } from "@/components/ui/device-frame";
import { MapPin, ChevronDown } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect } from "react";

const words = [
  { text: "Crafting", className: "text-white" },
  { text: "Production-Grade", className: "bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent" },
  { text: "React Native", className: "text-white" },
  { text: "Experiences.", className: "text-white" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = heroSlides[index];

  return (
    <section className="relative px-4 pt-28 pb-20 sm:px-6 lg:pt-36">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="order-2 lg:order-1">
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
                className="h-auto w-28 shadow-[0_28px_50px_-18px_var(--violet),0_0_0_1px_rgba(255,255,255,0.14)]"
                style={{ transform: "rotateY(-12deg) rotateX(4deg)" }}
              />
            </motion.div>
            <div>
              <p className="font-display text-lg font-semibold text-white">{site.name}</p>
              <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-300">
                <MapPin className="h-3 w-3 text-violet" aria-hidden />
                {site.location}
              </div>
            </div>
          </div>

          <h1 className="mt-8 max-w-xl font-display text-[2.6rem] leading-[1.02] font-semibold tracking-tight sm:text-6xl flex flex-wrap gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 25 }}
                className={word.className}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          <div className="mt-4 font-mono text-lg text-violet">
            <Typewriter words={[...roleTexts]} pauseDuration={3000} />
          </div>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Native-feeling apps with Mapbox routing, HLS video pipelines, Stripe payment
            sheets, and a solo full-stack platform from the phone to Postgres and the admin desk.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <GlowingButton href="#projects" variant="solid">View Projects</GlowingButton>
            <GlowingButton href={site.resume} variant="ghost">Download CV</GlowingButton>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center gap-2 text-sm text-zinc-500"
          >
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
            Scroll to explore
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <motion.div 
            className="relative flex justify-center [perspective:1000px]"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              e.currentTarget.style.setProperty("--rotate-x", `${-y * 10}deg`);
              e.currentTarget.style.setProperty("--rotate-y", `${x * 10}deg`);
            }}
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))",
              transition: "transform 0.1s ease-out"
            }}
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <DeviceFrame className="max-w-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={slide.frames[0].src}
                      alt={slide.frames[0].alt}
                      width={slide.frames[0].width}
                      height={slide.frames[0].height}
                      priority
                      className="h-auto w-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </DeviceFrame>
            </motion.div>
          </motion.div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pb-2">
            {heroSlides.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(itemIndex)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs transition-colors",
                  itemIndex === index
                    ? "bg-violet text-white font-medium"
                    : "bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1]",
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
