"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";
import { animated, useTransition } from "@react-spring/web";

import { useScrollLock } from "@/hooks/use-scroll-lock";
import type { Project } from "@/data/projects";

interface ProjectCaseProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectCase({ project, onClose }: ProjectCaseProps) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useScrollLock(project !== null);

  const transitions = useTransition(project, {
    key: project?.slug ?? "closed",
    from: { opacity: 0, y: 28 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 16 },
    config: { tension: 280, friction: 28 },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!project) return;
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener.current?.focus();
    };
  }, [project, onClose]);

  const trap = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const nodes = panel.querySelectorAll<HTMLElement>("button, a[href], input, textarea, select");
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    transitions((style, item) =>
      item ? (
        <animated.div
          style={{ opacity: style.opacity }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 p-3 sm:items-center sm:p-6"
        >
          <button
            type="button"
            aria-label="Close case study"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
          />
          <animated.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-case-title"
            data-lenis-prevent
            onKeyDown={trap}
            style={{ y: style.y }}
            className="relative flex max-h-[88dvh] w-full max-w-3xl flex-col overflow-y-auto rounded-2xl border border-border-subtle bg-surface p-6 text-left sm:p-10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <p className="font-mono text-xs font-medium uppercase tracking-widest text-mint-text">{item.role}</p>
            <h3 id="project-case-title" className="mt-3 pr-12 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {item.name}
            </h3>
            {item.status ? <p className="mt-3 font-mono text-xs text-text-muted">{item.status}</p> : null}
            <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-foreground sm:text-base">
              {item.summary}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <section className="rounded-xl border border-border-subtle p-5">
                <h4 className="font-mono text-xs font-medium uppercase tracking-widest text-violet-text">The constraint</h4>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">{item.problem}</p>
              </section>
              <section className="rounded-xl border border-border-subtle p-5">
                <h4 className="font-mono text-xs font-medium uppercase tracking-widest text-mint-text">What shipped</h4>
                <p className="mt-3 text-sm font-medium leading-relaxed text-foreground">{item.solution}</p>
              </section>
            </div>

            {item.images.length > 0 ? (
              <section className="mt-8">
                <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted">Screens</h4>
                <ul className="mt-4 flex gap-4 overflow-x-auto pb-2">
                  {item.images.map((shot) => (
                    <li key={shot.src} className={item.deviceType === "tv" ? "w-72 shrink-0" : "w-40 shrink-0"}>
                      <div
                        className={`relative overflow-hidden rounded-lg border border-border-subtle bg-background ${
                          item.deviceType === "tv" ? "aspect-video" : "aspect-[9/19]"
                        }`}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes={item.deviceType === "tv" ? "288px" : "160px"}
                          className="object-cover object-top"
                        />
                      </div>
                      <p className="mt-2 font-mono text-xs text-text-muted">{shot.label}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="mt-8">
              <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted">On the record</h4>
              <ul className="mt-4 space-y-2">
                {item.highlights.map((itemText) => (
                  <li key={itemText} className="flex gap-3 text-sm font-medium text-foreground">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
                    <span>{itemText}</span>
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-8 border-t border-border-subtle pt-6 font-mono text-xs leading-relaxed text-text-muted">
              {item.tags.join("  ·  ")}
            </p>
          </animated.div>
        </animated.div>
      ) : null,
    ),
    document.body,
  );
}
