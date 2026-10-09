"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion, useSpring } from "motion/react";
import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";

export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
};

const caps = { hero: 540, feature: 480, card: 400 } as const;

function displayHeight(height: number, cap: number) {
  if (height < 220) return Math.min(cap, Math.round(height * 2));
  if (height < 500) return Math.min(cap, Math.round(height * 1.6));
  return cap;
}

function restAngles(shot: Shot) {
  const wide = shot.width / shot.height > 1.15;
  return { x: wide ? 5 : 8, y: wide ? -7 : -14 };
}

export function ShotStage({
  shots,
  priority = false,
  size = "hero",
}: {
  shots: Shot[];
  priority?: boolean;
  size?: keyof typeof caps;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const frame = useRef<HTMLDivElement>(null);
  const shot = shots[index];
  const rest = shot ? restAngles(shot) : { x: 0, y: 0 };
  const rotateX = useSpring(reduced ? 0 : rest.x, { stiffness: 260, damping: 26 });
  const rotateY = useSpring(reduced ? 0 : rest.y, { stiffness: 260, damping: 26 });

  if (!shot) return null;

  const cap = caps[size];
  const height = displayHeight(shot.height, cap);
  const width = Math.round(height * (shot.width / shot.height));

  function settle(item: Shot) {
    if (reduced) {
      rotateX.set(0);
      rotateY.set(0);
      return;
    }
    const next = restAngles(item);
    rotateX.set(next.x);
    rotateY.set(next.y);
  }

  function go(next: number) {
    const wrapped = (next + shots.length) % shots.length;
    setIndex(wrapped);
    const item = shots[wrapped];
    if (item) settle(item);
  }

  function onMove(event: MouseEvent) {
    if (reduced) return;
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds) return;
    const px = (event.clientX - bounds.left) / bounds.width - 0.5;
    const py = (event.clientY - bounds.top) / bounds.height - 0.5;
    const pose = restAngles(shot);
    rotateY.set(pose.y + px * 22);
    rotateX.set(pose.x + py * -16);
  }

  return (
    <div className="pb-10">
      <div
        ref={frame}
        className="[perspective:1400px]"
        onMouseMove={onMove}
        onMouseLeave={() => settle(shot)}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative mx-auto w-full"
          animate={reduced ? undefined : { y: [0, -12, 0] }}
          transition={
            reduced
              ? undefined
              : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-[78%] left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-[100%] bg-violet/35 blur-2xl"
            style={{ transform: "translateX(-50%) translateZ(-48px) rotateX(68deg)" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={shot.src}
              initial={reduced ? false : { opacity: 0, rotateY: 48, z: -80 }}
              animate={{ opacity: 1, rotateY: 0, z: 0 }}
              exit={reduced ? undefined : { opacity: 0, rotateY: -48, z: -80 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              drag={reduced || shots.length < 2 ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -36) go(index + 1);
                if (info.offset.x > 36) go(index - 1);
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div
                className="relative mx-auto"
                style={{
                  width: `min(100%, ${width}px)`,
                  aspectRatio: `${shot.width} / ${shot.height}`,
                  transform: "translateZ(28px)",
                  transformStyle: "preserve-3d",
                  boxShadow:
                    "0 46px 80px -32px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.16), 0 0 72px -24px var(--glow-violet)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-white/20 via-violet/15 to-cyan/25"
                  style={{ transform: "translateZ(-26px) scale(1.035)" }}
                />
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  priority={priority && index === 0}
                  draggable={false}
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="object-contain select-none"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {shots.length > 1 ? (
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {shots.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              onClick={() => go(itemIndex)}
              aria-pressed={itemIndex === index}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] transition-colors",
                itemIndex === index
                  ? "bg-violet text-white"
                  : "border border-white/10 text-zinc-400 hover:border-white/25 hover:text-white",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
