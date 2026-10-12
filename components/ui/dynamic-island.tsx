"use client";

import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { GlowingButton } from "./glowing-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "motion/react";

export function DynamicIsland() {
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
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -70% 0px" },
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[min(920px,calc(100%-1.25rem))] -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/55 px-2 py-1.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <a href="#content" className="flex items-center gap-2 rounded-full py-1 pr-2 pl-2">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/5 text-[11px] text-white">
            ✶
          </span>
          <span className="font-display text-sm font-medium tracking-tight text-white">
            {site.name.split(" ")[0]}
          </span>
        </a>

        <nav className="mx-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  isActive ? "text-white" : "text-white/55 hover:text-white",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <GlowingButton href="#contact" className="px-4 py-1.5 text-xs">
            Contact
          </GlowingButton>
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
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-2 flex flex-col rounded-3xl border border-white/10 bg-black/80 p-2 backdrop-blur-xl lg:hidden"
            aria-label="Mobile"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
