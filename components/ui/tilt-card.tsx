"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

const spring = { stiffness: 400, damping: 25 };

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function onMove(event: React.MouseEvent) {
    const element = ref.current;
    if (!element) return;
    const bounds = element.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    element.style.setProperty("--x", `${event.clientX - bounds.left}px`);
    element.style.setProperty("--y", `${event.clientY - bounds.top}px`);
    if (reduced) return;
    rotateX.set((py - 0.5) * -7);
    rotateY.set((px - 0.5) * 8);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("glow-card relative", className)}
    >
      {children}
    </motion.div>
  );
}
