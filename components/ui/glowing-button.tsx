"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

const spring = { stiffness: 400, damping: 25 };

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "ghost";
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function GlowingButton({
  children,
  href,
  variant = "solid",
  className,
  external,
  onClick,
  type = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  function onMove(event: React.MouseEvent) {
    if (reduced) return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    x.set(Math.max(-10, Math.min(10, dx * 0.25)));
    y.set(Math.max(-8, Math.min(8, dy * 0.25)));
  }

  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
    variant === "solid"
      ? "bg-violet text-white shadow-[0_0_28px_var(--glow-violet)] hover:bg-cyan hover:text-bg"
      : "border border-[var(--border)] bg-white/[0.04] text-[var(--text-primary)] hover:border-violet/50 hover:bg-white/[0.07]",
    className,
  );

  const inner = href ? (
    <a
      href={href}
      className={classes}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  ) : (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={reduced ? undefined : { scale: 0.96 }}
      className="inline-flex"
    >
      {inner}
    </motion.div>
  );
}
