"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "motion/react";
import { ReactNode } from "react";

export function Marquee({
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("flex overflow-hidden", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn("flex overflow-hidden", className)}
      style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex w-max animate-marquee items-center marquee-track",
          direction === "right" && "reverse",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
