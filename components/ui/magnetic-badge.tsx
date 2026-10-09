"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

const spring = { stiffness: 400, damping: 25 };

export function MagneticBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
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
    x.set(Math.max(-8, Math.min(8, dx * 0.18)));
    y.set(Math.max(-6, Math.min(6, dy * 0.18)));
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={reduced ? undefined : { y: -3 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      className={cn(
        "glass-card px-3 py-3 shadow-2xl",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
