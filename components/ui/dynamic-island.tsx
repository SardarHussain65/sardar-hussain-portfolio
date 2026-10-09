"use client";

import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { BatteryMedium, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GlowingButton } from "./glowing-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "motion/react";

function usePktClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(new Date());

    const tick = () => setTime(format());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

export function DynamicIsland() {
  const time = usePktClock();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );
    
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-obsidian via-obsidian/80 to-transparent" />
    <header className="fixed top-3 left-1/2 z-50 w-[min(980px,calc(100%-1rem))] -translate-x-1/2">
      <div className="rounded-full border border-white/10 bg-[#12141a]/75 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">
          <p className="flex min-w-0 items-center gap-2 rounded-full bg-white/[0.04] py-1 pr-3 pl-2">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-emerald" />
            </span>
            <span className="truncate text-[11px] font-medium text-zinc-200 sm:text-xs">
              <span className="sm:hidden">Open to roles</span>
              <span className="hidden sm:inline">{site.availability}</span>
            </span>
          </p>

          <p className="hidden items-center gap-1.5 font-mono text-[11px] text-zinc-400 md:flex">
            <span className="tabular-nums text-zinc-100">{time || "--:--"}</span>
            <span>PKT</span>
            <BatteryMedium className="h-4 w-4 text-emerald" aria-hidden />
            <span className="sr-only">Battery indicator</span>
          </p>

          <nav className="ml-auto hidden items-center gap-1 lg:flex relative" aria-label="Primary">
            {nav.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-xs transition-colors animated-underline",
                    isActive ? "text-violet font-medium" : "text-zinc-300 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-violet/10 rounded-full z-[-1]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <ThemeToggle />
            <GlowingButton href="#contact" className="px-3 py-1.5 text-xs sm:text-sm !border-violet/50 hover:!border-violet">
              Get in Touch
            </GlowingButton>
          </div>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id="mobile-nav"
            className="mt-2 overflow-hidden rounded-3xl border border-white/10 bg-[#12141a]/90 shadow-2xl backdrop-blur-xl lg:hidden block"
          >
            <p className="flex items-center justify-between px-4 pt-3 font-mono text-xs text-zinc-400">
              <span>
                {time || "--:--"} PKT
              </span>
              <span className="inline-flex items-center gap-1 text-emerald">
                <BatteryMedium className="h-4 w-4" aria-hidden />
                Live
              </span>
            </p>
            <motion.nav 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06 }
                }
              }}
              className="flex flex-col p-2" 
              aria-label="Mobile"
            >
              {nav.map((item) => (
                <motion.a
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 }
                  }}
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-sm text-zinc-100 hover:bg-white/[0.05]"
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
