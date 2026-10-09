"use client";

import { ProductMock } from "@/components/mocks/product-mocks";
import { DeviceFrame } from "@/components/ui/device-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { ShotStage } from "@/components/ui/shot-stage";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export function FlagshipProjects() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="scroll-mt-28 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          kicker="Flagship"
          title="Apps with a job to do."
          body="Ride-hailing, a solo marketplace, live television, QBox lockers, and a Play Store Islamic guide. Screenshots are the original files, nothing cropped."
        />

        <div className="mt-14 space-y-16">
          {featured.map((project, index) => (
            <ProjectArticle key={project.slug} project={project} index={index} featured />
          ))}
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {rest.map((project, index) => (
            <ProjectArticle key={project.slug} project={project} index={index} />
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
  const reduced = useReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 400, damping: 28, delay: featured ? 0 : index * 0.04 }}
      className={cn(
        "rounded-[28px] border border-white/[0.08] bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl sm:p-7",
        featured && "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10",
      )}
    >
      <div className={cn(featured && index % 2 === 1 && "lg:order-2")}>
            <ProjectMedia project={project} size={featured ? "feature" : "card"} />
      </div>
      <div className="mt-6 lg:mt-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">{project.role}</p>
        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-white">
          {project.name}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-zinc-300">{project.summary}</p>
        {project.status ? (
          <p className="mt-3 inline-flex rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs text-emerald">
            {project.status}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-zinc-300"
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
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
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
    </motion.article>
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
              "rounded-full px-3 py-1.5 text-xs",
              index === active
                ? "bg-cyan text-obsidian"
                : index < active
                  ? "bg-emerald/15 text-emerald"
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
              "rounded-full px-3 py-1.5 text-xs",
              option === value ? "bg-emerald text-obsidian" : "bg-white/[0.05] text-zinc-300",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
