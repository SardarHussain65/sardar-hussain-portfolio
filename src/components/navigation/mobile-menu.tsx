"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { animated, useSpring } from "@react-spring/web";
import { Menu, X } from "lucide-react";

import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useMotionOff } from "@/hooks/use-motion-off";
import { nav, site } from "@/data/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-4 w-4" />
        <span className="sr-only">Open menu</span>
      </button>
      {open ? <MenuPanel onClose={close} /> : null}
    </>
  );
}

function MenuPanel({ onClose }: { onClose: () => void }) {
  const firstLink = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const motionOff = useMotionOff();
  useScrollLock(true);

  const enter = useSpring({
    from: { opacity: motionOff ? 1 : 0, y: motionOff ? 0 : 24 },
    to: { opacity: 1, y: 0 },
    immediate: motionOff,
    config: { tension: 280, friction: 28 },
  });

  useEffect(() => {
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const trap = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const panel = panelRef.current;
    if (!panel) return;
    const nodes = panel.querySelectorAll<HTMLElement>("button, a[href]");
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

  return createPortal(
    <animated.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      onKeyDown={trap}
      style={{
        opacity: enter.opacity,
        transform: enter.y.to((value) => `translate3d(0, ${value}px, 0)`),
      }}
      className="fixed inset-x-0 top-0 z-[100] flex h-dvh flex-col overflow-y-auto overscroll-contain bg-menu-surface px-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] text-menu-foreground"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{site.name}</p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <nav aria-label="Mobile" className="mt-10 flex flex-col gap-2">
        {nav.map((item, index) => (
          <a
            key={item.href}
            ref={index === 0 ? firstLink : undefined}
            href={item.href}
            onClick={onClose}
            className="border-b border-border-subtle py-4 text-2xl font-light"
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        onClick={onClose}
        className="mt-auto inline-flex items-center justify-center rounded-full bg-mint px-5 py-3 text-sm font-medium text-background"
      >
        Get in Touch
      </a>
    </animated.div>,
    document.body,
  );
}
