"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-60 h-[3px] bg-gradient-to-r from-[var(--violet)] to-[var(--cyan)] origin-left"
      style={{ scaleX }}
    />
  );
}
