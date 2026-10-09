"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const spring = { stiffness: 400, damping: 25 };

export function MagneticCursor() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const followX = useSpring(x, spring);
  const followY = useSpring(y, spring);
  const scale = useSpring(1, spring);

  useEffect(() => {
    const pointer = window.matchMedia("(pointer: fine)");
    const update = () => setFine(pointer.matches);
    update();
    pointer.addEventListener("change", update);
    return () => pointer.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!fine || reduced) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target;
      const hot =
        target instanceof Element && Boolean(target.closest("a, button, input"));
      scale.set(hot ? 1.7 : 1);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [fine, reduced, scale, x, y]);

  if (!fine || reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/80 shadow-[0_0_24px_rgba(0,245,212,0.45)]"
      style={{ x: followX, y: followY, scale, opacity: visible ? 1 : 0 }}
    />
  );
}
