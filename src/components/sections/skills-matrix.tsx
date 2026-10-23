"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { animated, useTransition } from "@react-spring/web";

import { TechIcon } from "@/components/icons/tech-icons";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { useMotionOff } from "@/hooks/use-motion-off";

const READING = { tension: 220, friction: 26 } as const;

/** Dark halo so type stays readable when a spiral passes behind it. */
const overField =
  "[text-shadow:0_1px_2px_rgba(3,7,18,0.98),0_0_18px_rgba(3,7,18,0.95)]";

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
          className="field-wash pointer-events-none absolute -inset-x-4 -top-10 -bottom-4 bg-[linear-gradient(180deg,transparent,var(--background)_18%,var(--background)_78%,transparent)] sm:-inset-x-8"
        />
        <div className="relative">
          <p
            className={`mb-3 inline-flex rounded-full border border-border-subtle bg-background/80 px-3 py-1 font-mono text-xs font-medium text-mint-text ${overField}`}
          >
            Architecture
          </p>
          <h2
            id="stack-heading"
            className="text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
          >
            <span className={overField}>Engineering skills</span>
            <span className="mt-1 block bg-gradient-to-r from-mint-text to-violet-text bg-clip-text font-medium text-transparent drop-shadow-[0_2px_12px_rgba(3,7,18,0.95)]">
              and technical stack
            </span>
          </h2>
        </div>
        <p
          className={`relative max-w-sm text-sm font-medium leading-relaxed text-foreground ${overField}`}
        >
          Seven tiers, from the native gesture thread to the store release.
          Open a chapter to read how that part of the stack ships.
        </p>
      </header>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
        <nav
          aria-label="Skill tiers"
          className="rounded-2xl border border-border-subtle bg-background/80 p-2 backdrop-blur-md"
        >
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
                    className={`relative flex w-full items-baseline gap-4 rounded-md py-3 pr-3 pl-5 text-left font-medium text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${
                      isActive
                        ? "bg-surface text-foreground"
                        : "hover:bg-surface/80"
                    }`}
                  >
                    {isActive ? (
                      <span
                        aria-hidden
                        className="absolute top-2 bottom-2 left-0 w-1 rounded-full bg-mint"
                      />
                    ) : null}
                    <span
                      className={`w-6 shrink-0 font-mono text-xs font-medium ${
                        isActive ? "text-mint-text" : "text-foreground"
                      }`}
                    >
                      {group.categoryNumber}
                    </span>
                    <span className="text-sm font-medium tracking-tight sm:text-base">
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
          <p className="font-mono text-4xl font-medium text-mint-text sm:text-5xl">
            {group.categoryNumber}
          </p>
          <h3 className="mt-4 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {group.label}
          </h3>
          <p className="mt-2 text-sm font-medium text-foreground">{group.tagline}</p>
          <p className="mt-6 font-mono text-xs font-medium text-mint-text">{group.architecture.metric}</p>
        </div>

        <div className="lg:col-span-7">
          <h4 className="text-lg font-medium text-foreground">{group.architecture.headline}</h4>
          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-foreground">
            {group.architecture.summary}
          </p>
          <ul className="mt-6 space-y-3">
            {group.architecture.highlights.map((point) => (
              <li
                key={point}
                className="border-l-2 border-mint-text/70 pl-3 text-sm font-medium leading-relaxed text-foreground"
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
            <li key={skill} className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
              <span aria-hidden className="inline-flex">
                <TechIcon name={skill} className="h-4 w-4 shrink-0" />
              </span>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm font-medium text-foreground">
          <span className="font-mono text-mint-text">In production</span>
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
