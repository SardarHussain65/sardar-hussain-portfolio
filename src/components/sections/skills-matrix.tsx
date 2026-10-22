"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { animated, useTransition } from "@react-spring/web";

import { TechIcon } from "@/components/icons/tech-icons";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { useMotionOff } from "@/hooks/use-motion-off";

const READING = { tension: 220, friction: 26 } as const;

/** Dark halo so type stays readable when a spiral passes behind it. */
const overField =
  "[text-shadow:0_1px_2px_rgba(3,7,18,0.95),0_0_16px_rgba(3,7,18,0.9)]";

/**
 * Chapter index for the technical stack. One tier is open at a time.
 * Choosing a chapter springs the writing up into the panel.
 */
export function SkillsMatrix() {
  const motionOff = useMotionOff();
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const total = skillGroups.length;
  const active = skillGroups[activeIndex];

  const readings = useTransition(activeIndex, {
    keys: (index) => skillGroups[index].id,
    initial: null,
    from: { opacity: 0, y: 16 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -12 },
    config: READING,
    immediate: motionOff,
  });

  const select = (index: number, focus = false) => {
    const next = (index + total) % total;
    setActiveIndex(next);
    if (focus) buttonRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(activeIndex + 1, true);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(activeIndex - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      select(total - 1, true);
    }
  };

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-8"
    >
      <header className="relative flex flex-col justify-between gap-6 border-b border-border-subtle pb-12 md:flex-row md:items-end">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-4 -top-10 -bottom-4 bg-[linear-gradient(180deg,transparent,var(--background)_18%,var(--background)_78%,transparent)] sm:-inset-x-8"
        />
        <div className="relative">
          <p
            className={`mb-3 inline-flex rounded-full border border-border-subtle bg-background/80 px-3 py-1 font-mono text-xs text-mint ${overField}`}
          >
            Architecture
          </p>
          <h2
            id="stack-heading"
            className="text-3xl font-light tracking-tight text-foreground sm:text-5xl"
          >
            <span className={overField}>Engineering skills</span>
            <span className="mt-1 block bg-gradient-to-r from-mint to-violet bg-clip-text font-normal text-transparent">
              and technical stack
            </span>
          </h2>
        </div>
        <p
          className={`relative max-w-sm text-sm font-light leading-relaxed text-foreground ${overField}`}
        >
          Seven tiers, from the native gesture thread to the store release.
          Open a chapter to read how that part of the stack ships.
        </p>
      </header>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Skill tiers">
          <ol role="tablist" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {skillGroups.map((group, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={group.id}>
                  <button
                    ref={(node) => {
                      buttonRefs.current[index] = node;
                    }}
                    id={`stack-tab-${group.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="stack-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => select(index)}
                    className={`relative flex w-full items-baseline gap-4 rounded-md py-3 pr-3 pl-5 text-left transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${overField} ${
                      isActive
                        ? "bg-background/80 text-foreground"
                        : "text-foreground/90 hover:bg-background/70 hover:text-foreground"
                    }`}
                  >
                    {isActive ? (
                      <span
                        aria-hidden
                        className="absolute top-2 bottom-2 left-0 w-1 rounded-full bg-mint"
                      />
                    ) : null}
                    <span
                      className={`w-6 shrink-0 font-mono text-xs ${
                        isActive ? "text-mint" : "text-text-muted"
                      }`}
                    >
                      {group.categoryNumber}
                    </span>
                    <span className="text-sm font-light tracking-tight sm:text-base">
                      {group.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div
          id="stack-panel"
          role="tabpanel"
          aria-labelledby={`stack-tab-${active.id}`}
          aria-live="polite"
          className="relative rounded-2xl border border-border-subtle bg-surface/90 p-6 backdrop-blur-xl sm:p-10"
        >
          {readings((style, index) => {
            const group = skillGroups[index];
            const current = index === activeIndex;
            return (
              <animated.div
                aria-hidden={!current}
                style={{
                  opacity: style.opacity,
                  transform: style.y.to((value) => `translate3d(0, ${value}px, 0)`),
                }}
                className={
                  current
                    ? "relative"
                    : "pointer-events-none absolute inset-x-6 top-6 sm:inset-x-10 sm:top-10"
                }
              >
                <TierReading group={group} />
              </animated.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface TierReadingProps {
  group: SkillGroup;
}

function TierReading({ group }: TierReadingProps) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="font-mono text-4xl font-light text-mint sm:text-5xl">
            {group.categoryNumber}
          </p>
          <h3 className="mt-4 text-2xl font-light tracking-tight text-foreground sm:text-3xl">
            {group.label}
          </h3>
          <p className="mt-2 text-sm font-light text-text-muted">{group.tagline}</p>
          <p className="mt-6 font-mono text-xs text-mint">{group.architecture.metric}</p>
        </div>

        <div className="lg:col-span-7">
          <h4 className="text-lg font-light text-foreground">{group.architecture.headline}</h4>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-text-muted">
            {group.architecture.summary}
          </p>
          <ul className="mt-6 space-y-3">
            {group.architecture.highlights.map((point) => (
              <li
                key={point}
                className="border-l-2 border-mint/40 pl-3 text-sm font-light leading-relaxed text-foreground/90"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t border-border-subtle pt-6">
        <ul className="flex flex-wrap gap-x-5 gap-y-3">
          {group.items.map((skill) => (
            <li key={skill} className="inline-flex items-center gap-2 text-sm text-foreground/85">
              <span aria-hidden className="inline-flex">
                <TechIcon name={skill} className="h-4 w-4 shrink-0" />
              </span>
              <span className="font-light">{skill}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs font-light text-text-muted">
          <span className="font-mono text-foreground/80">In production</span>
          {group.architecture.shippedWith.map((name) => (
            <span key={name} className="whitespace-nowrap">
              {name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
