"use client";

import Image from "next/image";
import { type RefObject } from "react";

import { Hover } from "@/components/common/robot-hover";
import type { Shot } from "@/data/projects";

interface ScreenFanProps {
  shots: Shot[];
  projectName: string;
  wide: boolean;
  trigger: RefObject<HTMLElement | null>;
  onOpen: () => void;
}

interface Pose {
  x: number;
  y: number;
  rotate: number;
}

/** Rest is already a slight fan. Hover opens it further. */
function poses(count: number, wide: boolean): { from: Pose; to: Pose }[] {
  const spread = wide ? 48 : 64;
  const tilt = wide ? 7 : 14;
  const mid = (count - 1) / 2;

  return Array.from({ length: count }, (_, index) => {
    const delta = index - mid;
    return {
      from: {
        x: delta * 10,
        y: Math.abs(delta) * 12,
        rotate: delta * tilt * 0.65,
      },
      to: {
        x: delta * spread,
        y: delta === 0 ? -18 : 6,
        rotate: delta * tilt,
      },
    };
  });
}

export function ScreenFan({ shots, projectName, wide, trigger, onOpen }: ScreenFanProps) {
  const visible = shots.slice(0, 3);
  const fan = poses(visible.length, wide);

  if (visible.length === 0) {
    return (
      <p className="font-mono text-xs text-text-muted">Screens live in the case study.</p>
    );
  }

  return (
    <figure>
      <div className="flex items-end justify-center px-6 py-8">
        {visible.map((shot, index) => {
          const pose = fan[index];
          const center = Math.abs(index - (visible.length - 1) / 2);
          return (
            <Hover
              key={shot.src}
              tag="button"
              trigger={trigger}
              from={pose.from}
              to={pose.to}
              delayIn={index * 35}
              config={{ tension: 280, friction: 20 }}
              onClick={onOpen}
              aria-label={`Open ${projectName}, ${shot.label}`}
              style={{ zIndex: 30 - Math.round(center) * 10 }}
              className={`relative origin-bottom overflow-hidden rounded-lg border border-border-subtle bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${
                wide
                  ? "-mx-6 aspect-video w-36 sm:-mx-8 sm:w-52"
                  : "-mx-4 aspect-[9/19] w-24 sm:-mx-6 sm:w-32"
              }`}
            >
              <Image
                src={shot.src}
                alt=""
                fill
                loading="eager"
                sizes={wide ? "(max-width: 640px) 144px, 208px" : "(max-width: 640px) 96px, 128px"}
                className="object-cover object-top"
              />
            </Hover>
          );
        })}
      </div>
      <figcaption className="text-center font-mono text-xs tracking-wide text-text-muted">
        {visible.map((shot) => shot.label).join("  ·  ")}
      </figcaption>
    </figure>
  );
}
