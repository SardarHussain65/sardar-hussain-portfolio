"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Hover } from "@/components/common/robot-hover";
import type { Project } from "@/data/projects";

interface RailEntry {
  project: Project;
  index: number;
}

interface ProjectRailProps {
  entries: RailEntry[];
  onSelect: (slug: string) => void;
}

function RailRow({ entry, onSelect }: { entry: RailEntry; onSelect: (slug: string) => void }) {
  const row = useRef<HTMLButtonElement>(null);
  const { project, index } = entry;
  const shot = project.images[0];
  const television = project.deviceType === "tv";

  return (
    <li className="border-b border-border-subtle">
      <button
        ref={row}
        type="button"
        onClick={() => onSelect(project.slug)}
        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint sm:grid-cols-[3rem_1fr_auto]"
      >
        <span className="font-mono text-xs text-text-muted">{String(index).padStart(2, "0")}</span>
        <span className="min-w-0">
          <span className="flex items-center gap-2">
            <span className="truncate text-lg font-light text-foreground transition-colors duration-[var(--duration-fast)] ease-entrance group-hover:text-mint sm:text-2xl">
              {project.name}
            </span>
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 shrink-0 text-text-muted transition-colors duration-[var(--duration-fast)] ease-entrance group-hover:text-mint"
            />
          </span>
          <span className="mt-1 block truncate text-sm text-text-muted">{project.summary}</span>
        </span>
        {shot ? (
          <Hover
            tag="span"
            trigger={row}
            from={{ x: 0 }}
            to={{ x: 8 }}
            config={{ tension: 320, friction: 20 }}
            className={`relative hidden overflow-hidden rounded-md border border-border-subtle bg-surface sm:block ${
              television ? "aspect-video w-24" : "aspect-[9/16] w-12"
            }`}
          >
            <Image
              src={shot.src}
              alt=""
              fill
              sizes="96px"
              className="object-cover object-top"
            />
          </Hover>
        ) : (
          <span className="w-12" />
        )}
      </button>
    </li>
  );
}

export function ProjectRail({ entries, onSelect }: ProjectRailProps) {
  if (entries.length === 0) {
    return (
      <p className="mt-10 border-t border-border-subtle pt-6 font-mono text-xs text-text-muted sm:mt-16 sm:pt-8">
        Nothing else matches this filter.
      </p>
    );
  }

  return (
    <div className="mt-10 sm:mt-16">
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted">The rest of the set</p>
      <ol aria-label="Other projects" className="mt-4 border-t border-border-subtle">
        {entries.map((entry) => (
          <RailRow key={entry.project.slug} entry={entry} onSelect={onSelect} />
        ))}
      </ol>
    </div>
  );
}
