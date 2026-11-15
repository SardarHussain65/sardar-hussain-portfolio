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
  const tone = television ? "text-violet-text" : "text-mint-text";
  const mark = television ? "bg-violet" : "bg-mint";
  const rule = television ? "border-violet" : "border-mint";
  const number = String(index).padStart(2, "0");

  return (
    <article
      ref={frame}
      aria-labelledby={`stage-${project.slug}`}
      className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div>
        <p className={`font-mono text-xs uppercase tracking-widest ${tone}`}>
          {number} — {project.role}
        </p>
        <h3
          id={`stage-${project.slug}`}
          className="mt-3 text-4xl font-medium tracking-tight text-foreground sm:text-6xl"
        >
          {project.name}
        </h3>
        {project.status ? (
          <p className="mt-3 font-mono text-xs text-text-muted">{project.status}</p>
        ) : null}
        <p className="mt-5 max-w-md text-sm font-medium leading-relaxed text-foreground sm:text-base">
          {project.summary}
        </p>
        <ul className="mt-6 space-y-2.5">
          {project.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-3 text-sm font-medium text-foreground">
              <span aria-hidden className={`mt-2 h-1 w-1 shrink-0 rounded-full ${mark}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-xs leading-relaxed text-text-muted">
          {project.tags.join("  ·  ")}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onOpen}
            className={`inline-flex items-center gap-2 border-b pb-1 text-sm font-medium text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:text-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint ${rule}`}
          >
            Read Case Study
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </button>

          {project.storeUrl ? (
            <a
              href={project.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono font-medium text-mint-text transition-colors hover:bg-emerald-500/20"
            >
              <span>Google Play (5.0 ★)</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : null}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-mono font-medium text-foreground transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <span>Live Platform</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          ) : null}
        </div>
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
