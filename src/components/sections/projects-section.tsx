"use client";

import { useCallback, useState } from "react";
import { Inview } from "@/components/common/robot-inview";
import { projects, type Project } from "@/data/projects";
import { ProjectCase } from "./projects/project-case";
import { ProjectStage } from "./projects/project-stage";

const FILTERS = ["All", "Mobile Apps", "Smart TV", "Full-Stack"] as const;

function matches(project: Project, filter: (typeof FILTERS)[number]): boolean {
  if (filter === "All") return true;
  if (filter === "Mobile Apps") return project.deviceType !== "tv";
  if (filter === "Smart TV") return project.deviceType === "tv" || project.tags.includes("Smart TV");
  if (filter === "Full-Stack") {
    return (
      project.category === "fullstack" ||
      project.role.toLowerCase().includes("full-stack") ||
      project.tags.includes("PostgreSQL")
    );
  }
  return true;
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [caseProject, setCaseProject] = useState<Project | null>(null);

  const filtered = projects.filter((project) => matches(project, filter));

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
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-border-subtle pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-mint-text">
              PORTFOLIO
            </p>
            <h2 id="projects-heading" className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              Featured Projects
              <span className="block text-mint-text">& Shipped Apps</span>
            </h2>
          </div>
          <p className="max-w-md text-sm font-medium leading-relaxed text-foreground">
            Explore live mobile apps, Smart TV streaming platforms, and full-stack systems I have built and shipped.
          </p>
        </div>

        {/* Filter Pills */}
        <div role="group" aria-label="Filter projects" className="mt-8 flex flex-wrap gap-2.5">
          {FILTERS.map((item) => {
            const selected = filter === item;
            const count = projects.filter((p) => matches(p, item)).length;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(item)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs font-medium transition-all duration-[var(--duration-fast)] ease-entrance focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${
                  selected
                    ? "border border-mint bg-mint/10 text-mint-text shadow-[0_0_16px_rgba(16,185,129,0.15)]"
                    : "border border-border-subtle bg-surface text-foreground hover:border-border hover:bg-surface/80"
                }`}
              >
                <span>{item}</span>
                <span className="text-[10px] text-text-muted">({count})</span>
              </button>
            );
          })}
        </div>

        {/* All Filtered Projects in Sequence */}
        <div className="mt-14 space-y-20 sm:space-y-28">
          {filtered.map((project, idx) => (
            <Inview
              key={project.slug}
              tag="div"
              from={{ opacity: 0, y: 32 }}
              to={{ opacity: 1, y: 0 }}
              mode="once"
              config={{ tension: 180, friction: 24 }}
              className={idx > 0 ? "pt-16 border-t border-border-subtle sm:pt-24" : ""}
            >
              <ProjectStage
                project={project}
                index={idx + 1}
                onOpen={() => openCase(project)}
              />
            </Inview>
          ))}

          {filtered.length === 0 ? (
            <p className="font-mono text-sm text-text-muted">No projects found in this category.</p>
          ) : null}
        </div>
      </div>

      <ProjectCase project={caseProject} onClose={closeCase} />
    </section>
  );
}
