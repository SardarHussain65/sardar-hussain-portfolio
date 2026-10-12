import { About } from "@/components/sections/about";
import { ArchitectureMatrix } from "@/components/sections/architecture-matrix";
import { Capabilities } from "@/components/sections/capabilities";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { FlagshipProjects } from "@/components/sections/flagship-projects";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { TerminalContact } from "@/components/sections/terminal-contact";
import { BottomDock } from "@/components/ui/bottom-dock";
import { DynamicIsland } from "@/components/ui/dynamic-island";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import { Preloader } from "@/components/ui/preloader";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <Preloader />
      <ScrollProgress />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-violet focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <MagneticCursor />
      <DynamicIsland />
      <main id="content">
        <Hero />
        <Capabilities />
        <FlagshipProjects />
        <TechStack />
        <ArchitectureMatrix />
        <ExperienceTimeline />
        <About />
        <TerminalContact />
      </main>
      <Footer />
      <BottomDock />
    </>
  );
}
