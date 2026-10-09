import { ArchitectureMatrix } from "@/components/sections/architecture-matrix";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { FlagshipProjects } from "@/components/sections/flagship-projects";
import { Hero } from "@/components/sections/hero";
import { TerminalContact } from "@/components/sections/terminal-contact";
import { BottomDock } from "@/components/ui/bottom-dock";
import { DynamicIsland } from "@/components/ui/dynamic-island";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";

export default function Home() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-obsidian"
      >
        Skip to content
      </a>
      <MagneticCursor />
      <DynamicIsland />
      <main id="content">
        <Hero />
        <FlagshipProjects />
        <ArchitectureMatrix />
        <ExperienceTimeline />
        <TerminalContact />
      </main>
      <BottomDock />
    </>
  );
}
