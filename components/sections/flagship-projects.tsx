"use client";

import { ProductMock } from "@/components/mocks/product-mocks";
import { DeviceFrame } from "@/components/ui/device-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { ShotStage } from "@/components/ui/shot-stage";
import { Reveal } from "@/components/ui/reveal";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type Filter = "All" | "Production" | "Personal";

export function FlagshipProjects() {
  const [filter, setFilter] = useState<Filter>("All");
  
  const filtered = projects.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Production") return project.status === "Production" || project.status === "Live" || !project.status?.includes("Personal");
    if (filter === "Personal") return project.status?.includes("Personal") || project.status?.includes("Solo");
    return true;
  });

  return (
    <section id="projects" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          index="02"
          kicker="Flagship"
          title="Selected work."
          body="Ride-hailing, a solo marketplace, live television, QBox lockers, and a Play Store guide. Each frame is the original screenshot."
        />

        <div className="mt-8 flex justify-center gap-2">
          {(["All", "Production", "Personal"] as Filter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium text-zinc-300 hover:text-white outline-none transition-colors"
            >
              {filter === tab && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 z-0 rounded-full bg-violet/20 border border-violet/40"
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {filtered.map((project, index) => (
            <Reveal
              key={project.slug}
              className={cn(index === 0 && "lg:col-span-2")}
            >
              <ProjectArticle project={project} index={index} featured={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectArticle({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "glass-card glow-card group relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2 sm:p-7 h-full",
        featured && "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10",
      )}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--y", `${event.clientY - bounds.top}px`);
      }}
    >
      <div className={cn("overflow-hidden rounded-[16px]", featured && index % 2 === 1 && "lg:order-2")}>
        <div className="transition-transform duration-500 group-hover:scale-105">
          <ProjectMedia project={project} size={featured ? "feature" : "card"} />
        </div>
      </div>
      <div className="mt-6 lg:mt-0 relative z-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-violet">{project.role}</p>
        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">
          {project.name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-zinc-300">{project.summary}</p>
        {project.status ? (
          <p className="mt-3 inline-flex rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs text-violet">
            {project.status}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 border-l-violet border-l-2 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">Problem</p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
              Engineering
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">{project.solution}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-1.5 text-sm text-zinc-300">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {project.interactive === "booking" ? <BookingMachine /> : null}
        {project.interactive === "tracks" ? <TrackSelector /> : null}
        {project.mock && project.images.length === 0 ? (
          <p className="mt-4 text-[11px] text-zinc-500">
            Interface study. A screenshot for this build was not in the set.
          </p>
        ) : null}
      </div>
    </article>
  );
}

function ProjectMedia({
  project,
  size,
}: {
  project: Project;
  size: "feature" | "card";
}) {
  if (project.images.length > 0) {
    return <ShotStage shots={project.images} size={size} />;
  }

  if (!project.mock) return null;

  return (
    <DeviceFrame className="max-w-[220px]">
      <ProductMock name={project.mock} />
    </DeviceFrame>
  );
}

const bookingSteps = ["pending", "accepted", "in-progress", "completed"] as const;

function BookingMachine() {
  const [active, setActive] = useState(2);
  return (
    <div className="mt-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
        Booking state machine
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {bookingSteps.map((step, index) => (
          <button
            key={step}
            type="button"
            onClick={() => setActive(index)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs transition-colors",
              index === active
                ? "bg-violet text-white"
                : index < active
                  ? "bg-violet/15 text-violet"
                  : "bg-white/[0.05] text-zinc-400",
            )}
          >
            {step}
          </button>
        ))}
      </div>
    </div>
  );
}

function TrackSelector() {
  const [audio, setAudio] = useState("English");
  const [subs, setSubs] = useState("Off");
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <TrackRow label="Audio" value={audio} options={["English", "Urdu"]} onChange={setAudio} />
      <TrackRow label="Subtitles" value={subs} options={["Off", "English"]} onChange={setSubs} />
    </div>
  );
}

function TrackRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{label}</p>
      <div className="mt-2 flex gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs transition-colors",
              option === value ? "bg-violet text-white" : "bg-white/[0.05] text-zinc-300",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
