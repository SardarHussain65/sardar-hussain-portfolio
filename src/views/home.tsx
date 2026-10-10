import { RobotProvider, RobotView } from "@/components/common/robot-view";
import { VesperLanding } from "@/components/vesper-landing";

/**
 * Home view — a Server Component delegating interactive sections to client leaves.
 * Route: `/`
 */
export const HomeView = ({ robot = false }: { robot?: boolean }) => {
  return (
    <RobotProvider robot={robot}>
      {robot && <RobotView />}
      <main className="min-h-lvh w-full">
        <VesperLanding />
      </main>
    </RobotProvider>
  );
};
