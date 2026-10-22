"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { Inview } from "@/components/common/robot-inview";
import { projects, type Project } from "@/data/projects";
import { useMotionOff } from "@/hooks/use-motion-off";

import { ProjectCase } from "./projects/project-case";
import { ProjectRail } from "./projects/project-rail";
import { ProjectStage } from "./projects/project-stage";

const FILTERS = ["All", "Smart TV", "React Native", "Mapbox", "Stripe", "PostgreSQL", "HLS"] as const;

function matches(project: Project, filter: string): boolean {
  if (filter === "All") return true;
  const needle = filter.toLowerCase();
  return project.tags.some((tag) => tag.toLowerCase().includes(needle));
}

export function ProjectsSection() {
  const motionOff = useMotionOff();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const [caseProject, setCaseProject] = useState<Project | null>(null);
  const generation = useRef(0);
  const entered = useRef(false);

  const [swap, api] = useSpring(() => ({ opacity: 1, y: 0 }));

  const filtered = projects.filter((project) => matches(project, filter));
  const active = projects.find((project) => project.slug === activeSlug) ?? projects[0] ?? null;
  const activeIndex = active ? projects.findIndex((project) => project.slug === active.slug) + 1 : 0;

  const select = useCallback(
    (slug: string) => {
      if (slug === activeSlug) return;
      const id = ++generation.current;
      if (motionOff) {
        setActiveSlug(slug);
        return;
      }
      api.start({
        opacity: 0,
        y: 18,
        config: { tension: 360, friction: 34 },
        onRest: (result) => {
          if (!result.finished || generation.current !== id) return;
          setActiveSlug(slug);
        },
      });
    },
    [activeSlug, api, motionOff],
  );

  useEffect(() => {
    if (!entered.current) {
      entered.current = true;
      return;
    }
    if (motionOff) return;
    api.start({ opacity: 1, y: 0, config: { tension: 210, friction: 24 } });
  }, [activeSlug, api, motionOff]);

  const chooseFilter = (next: (typeof FILTERS)[number]) => {
    setFilter(next);
    const pool = projects.filter((project) => matches(project, next));
    if (pool.length === 0) return;
    if (!pool.some((project) => project.slug === activeSlug)) select(pool[0].slug);
  };

  const openCase = useCallback((project: Project) => {
    setCaseProject(project);
  }, []);

  const closeCase = useCallback(() => {
    setCaseProject(null);
  }, []);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative z-10 py-28">
      <div aria-hidden className="absolute inset-0 bg-surface" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col gap-8 border-b border-border-subtle pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mint">Selected work</p>
            <h2 id="projects-heading" className="mt-3 text-4xl font-light tracking-tight text-foreground sm:text-6xl">
              Shipped work,
              <span className="block text-mint">on stage</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-relaxed text-text-muted">
            Production systems, one at a time. Pick a row and that build takes the stage.
          </p>
        </div>

        <div role="group" aria-label="Filter projects" className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
          {FILTERS.map((item) => {
            const selected = filter === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => chooseFilter(item)}
                className={`border-b pb-1 font-mono text-xs uppercase tracking-wider transition-colors duration-[var(--duration-fast)] ease-entrance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint ${
                  selected ? "border-mint text-foreground" : "border-transparent text-text-muted hover:text-foreground"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {active ? (
          <Inview
            tag="div"
            from={{ opacity: 0, y: 36 }}
            to={{ opacity: 1, y: 0 }}
            mode="once"
            config={{ tension: 170, friction: 24 }}
            className="mt-14"
          >
            <animated.div style={swap}>
              <ProjectStage
                key={active.slug}
                project={active}
                index={activeIndex}
                onOpen={() => openCase(active)}
              />
            </animated.div>
          </Inview>
        ) : (
          <p className="mt-14 font-mono text-sm text-text-muted">Nothing in this filter.</p>
        )}

        <ProjectRail
          entries={filtered
            .filter((project) => project.slug !== active?.slug)
            .map((project) => ({
              project,
              index: projects.findIndex((item) => item.slug === project.slug) + 1,
            }))}
          onSelect={select}
        />
      </div>

      <ProjectCase project={caseProject} onClose={closeCase} />
    </section>
  );
}
