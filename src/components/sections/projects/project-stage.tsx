"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/data/projects";

import { ScreenFan } from "./screen-fan";

interface ProjectStageProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

export function ProjectStage({ project, index, onOpen }: ProjectStageProps) {
  const frame = useRef<HTMLElement>(null);
  const television = project.deviceType === "tv";
  const tone = television ? "text-violet" : "text-mint";
  const mark = television ? "bg-violet" : "bg-mint";
  const rule = television ? "border-violet" : "border-mint";
  const number = String(index).padStart(2, "0");

  return (
    <article
      ref={frame}
      aria-labelledby={`stage-${project.slug}`}
      className="relative grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div>
        <p className={`font-mono text-xs uppercase tracking-widest ${tone}`}>
          {number} — {project.role}
        </p>
        <h3
          id={`stage-${project.slug}`}
          className="mt-3 text-4xl font-light tracking-tight text-foreground sm:text-6xl"
        >
          {project.name}
        </h3>
        {project.status ? (
          <p className="mt-3 font-mono text-xs text-text-muted">{project.status}</p>
        ) : null}
        <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-text-muted sm:text-base">
          {project.summary}
        </p>
        <ul className="mt-6 space-y-2.5">
          {project.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-3 text-sm text-text-muted">
              <span aria-hidden className={`mt-2 h-1 w-1 shrink-0 rounded-full ${mark}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-xs leading-relaxed text-text-muted">
          {project.tags.join("  ·  ")}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className={`mt-8 inline-flex items-center gap-2 border-b pb-1 text-sm text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint ${rule}`}
        >
          Open the case
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <ScreenFan
        shots={project.images}
        projectName={project.name}
        wide={television}
        trigger={frame}
        onOpen={onOpen}
      />
    </article>
  );
}
