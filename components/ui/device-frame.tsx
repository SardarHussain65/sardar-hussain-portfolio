import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function DeviceFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[280px]", className)}>
      <span className="absolute top-24 -left-[3px] h-8 w-[3px] rounded-l bg-zinc-500" />
      <span className="absolute top-36 -left-[3px] h-14 w-[3px] rounded-l bg-zinc-500" />
      <span className="absolute top-32 -right-[3px] h-16 w-[3px] rounded-r bg-zinc-500" />
      <div className="rounded-[2.5rem] bg-gradient-to-b from-zinc-200 via-zinc-600 to-zinc-950 p-px shadow-[0_40px_90px_-36px_rgba(0,245,212,0.55)]">
        <div className="rounded-[2.45rem] bg-[#090a0d] p-[9px]">
          <div className="relative overflow-hidden rounded-[1.9rem] bg-carbon">
            <div className="absolute top-2 left-1/2 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]" />
            <div className="relative aspect-[9/19.5]">{children}</div>
            <div className="pointer-events-none absolute inset-x-0 bottom-1.5 z-20 flex justify-center">
              <span className="h-1 w-24 rounded-full bg-white/75" />
            </div>
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DisplayFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.6rem] border border-white/10 bg-zinc-900/80 p-2 shadow-2xl",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.15rem] bg-carbon">
        {children}
      </div>
    </div>
  );
}
