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
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`font-mono text-xs font-semibold uppercase tracking-widest ${tone}`}>
            {number} — {project.role}
          </span>
          {project.status ? (
            <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-mint-text">
              {project.status}
            </span>
          ) : null}
        </div>

        <h3
          id={`stage-${project.slug}`}
          className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-5xl"
        >
          {project.name}
        </h3>

        <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-foreground sm:text-base">
          {project.summary}
        </p>

        <ul className="mt-5 space-y-2.5">
          {project.highlights.slice(0, 3).map((item) => (
            <li key={item} className="flex gap-3 text-sm font-medium text-foreground">
              <span aria-hidden className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${mark}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Tech Stack Badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-lg border border-border-subtle bg-surface/70 px-2.5 py-1 font-mono text-[11px] text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpen}
            className="group inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-5 py-2.5 text-xs font-medium text-foreground transition-all duration-[var(--duration-fast)] ease-entrance hover:border-mint hover:bg-surface/80 hover:text-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
          >
            <span>Read Case Study</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mint" />
          </button>

          {project.storeUrl ? (
            <a
              href={project.storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs font-mono font-medium text-mint-text transition-colors hover:bg-emerald-500/20"
            >
              <span>Google Play (5.0 ★)</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-mono font-medium text-foreground transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <span>Live Platform</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
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
