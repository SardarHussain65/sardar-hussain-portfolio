"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from "motion/react";

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (reduced) {
      if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }
    
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, motionValue, value, reduced, prefix, suffix]);

  useEffect(() => {
    if (reduced) return;
    
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [springValue, reduced, prefix, suffix]);

  return (
    <motion.span ref={ref} className={cn("inline-block", className)}>
      {reduced ? `${prefix}${value}${suffix}` : `${prefix}0${suffix}`}
    </motion.span>
  );
}
