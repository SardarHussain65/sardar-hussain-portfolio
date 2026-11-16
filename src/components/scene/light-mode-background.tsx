"use client";

import React, { useEffect, useRef, useState } from "react";
import { createFrameClock, perFrame } from "@/lib/scene/per-frame";
import { useMotionOff } from "@/hooks/use-motion-off";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  colorIdx: number;
  pulsePhase: number;
}

export function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const motionOff = useMotionOff();
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const mouseRef = useRef({
    current: { x: -1000, y: -1000 },
    target: { x: -1000, y: -1000 },
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = 0;
    let isDay = document.documentElement.getAttribute("data-theme") === "light";
    let radarAngle = 0;

    // Day palette (high contrast on slate-50)
    const dayColors = [
      { fill: "rgba(5, 150, 105, 0.75)", glow: "rgba(16, 185, 129, 0.25)" },
      { fill: "rgba(124, 58, 237, 0.75)", glow: "rgba(139, 92, 246, 0.25)" },
      { fill: "rgba(8, 145, 178, 0.75)", glow: "rgba(6, 182, 212, 0.25)" },
    ];

    // Night palette (neon luminescence on obsidian)
    const nightColors = [
      { fill: "rgba(52, 211, 153, 0.95)", glow: "rgba(16, 185, 129, 0.45)" },
      { fill: "rgba(192, 132, 252, 0.95)", glow: "rgba(139, 92, 246, 0.45)" },
      { fill: "rgba(34, 211, 238, 0.95)", glow: "rgba(6, 182, 212, 0.45)" },
    ];

    let nodes: Node[] = [];

    const initNodes = (w: number, h: number) => {
      const count = Math.min(Math.floor((w * h) / 20000), 50);
      const newNodes: Node[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 10 + Math.random() * 16;
        newNodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2 + Math.random() * 1.5,
          colorIdx: i % 3,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      nodes = newNodes;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (nodes.length === 0) {
        initNodes(width, height);
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.target.x = x;
      mouseRef.current.target.y = y;
      mouseRef.current.active = true;
      setMousePos({ x, y });
    };

    const onPointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.target.x = -1000;
      mouseRef.current.target.y = -1000;
      setMousePos({ x: -1000, y: -1000 });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const clock = createFrameClock();

    const render = (nowMs: number) => {
      // In light mode: always run.
      // In dark mode: run only on mobile / narrow widths (< 768px).
      const currentDay = document.documentElement.getAttribute("data-theme") === "light";
      const isNarrow = window.innerWidth < 768;
      const shouldRun = currentDay || isNarrow;

      if (!shouldRun) {
        animId = requestAnimationFrame(render);
        return;
      }

      isDay = currentDay;
      const colors = isDay ? dayColors : nightColors;
      const { dt, t } = clock.tick(nowMs);

      // Smooth mouse lerp
      const mouse = mouseRef.current;
      if (mouse.active) {
        mouse.current.x += (mouse.target.x - mouse.current.x) * perFrame(0.12, dt);
        mouse.current.y += (mouse.target.y - mouse.current.y) * perFrame(0.12, dt);
      } else {
        mouse.current.x = -1000;
        mouse.current.y = -1000;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // ─── 1. ARCHITECTURAL RADAR TELEMETRY ───
      const cx = width / 2;
      const cy = Math.min(height * 0.32, 340);
      const baseRadius = Math.min(width * 0.38, 320);

      if (baseRadius > 100) {
        if (!motionOff) {
          radarAngle = (radarAngle + 0.35 * dt) % (Math.PI * 2);
        }

        // Concentric rings
        ctx.lineWidth = 1;
        ctx.strokeStyle = isDay ? "rgba(15, 23, 42, 0.08)" : "rgba(255, 255, 255, 0.08)";
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 0.45, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = isDay ? "rgba(15, 23, 42, 0.06)" : "rgba(255, 255, 255, 0.05)";
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius * 0.78, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = isDay ? "rgba(15, 23, 42, 0.045)" : "rgba(255, 255, 255, 0.035)";
        ctx.beginPath();
        ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Crosshairs
        ctx.setLineDash([4, 8]);
        ctx.strokeStyle = isDay ? "rgba(15, 23, 42, 0.04)" : "rgba(255, 255, 255, 0.05)";
        ctx.beginPath();
        ctx.moveTo(cx - baseRadius * 1.05, cy);
        ctx.lineTo(cx + baseRadius * 1.05, cy);
        ctx.moveTo(cx, cy - baseRadius * 1.05);
        ctx.lineTo(cx, cy + baseRadius * 1.05);
        ctx.stroke();
        ctx.setLineDash([]);

        // Sweeping radar beam
        if (!motionOff) {
          const sweepLength = baseRadius * 0.95;
          const endX = cx + Math.cos(radarAngle) * sweepLength;
          const endY = cy + Math.sin(radarAngle) * sweepLength;

          const sweepGrad = ctx.createLinearGradient(cx, cy, endX, endY);
          sweepGrad.addColorStop(0, "rgba(16, 185, 129, 0)");
          sweepGrad.addColorStop(0.7, isDay ? "rgba(16, 185, 129, 0.08)" : "rgba(16, 185, 129, 0.16)");
          sweepGrad.addColorStop(1, isDay ? "rgba(16, 185, 129, 0.22)" : "rgba(52, 211, 153, 0.38)");

          ctx.strokeStyle = sweepGrad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Radar tip glow
          ctx.fillStyle = isDay ? "rgba(16, 185, 129, 0.45)" : "rgba(52, 211, 153, 0.8)";
          ctx.beginPath();
          ctx.arc(endX, endY, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ─── 2. NODE MOTION & PROXIMITY CONNECTIONS ───
      const threshold = 135;
      const mouseThreshold = 180;

      // Update positions
      if (!motionOff) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx * dt;
          n.y += n.vy * dt;

          if (n.x < -20) n.x = width + 20;
          else if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          else if (n.y > height + 20) n.y = -20;

          // Gentle mouse repel
          if (mouse.active) {
            const dx = n.x - mouse.current.x;
            const dy = n.y - mouse.current.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 70 && dist > 1) {
              const force = (1 - dist / 70) * 40 * dt;
              n.x += (dx / dist) * force;
              n.y += (dy / dist) * force;
            }
          }
        }
      }

      // Draw inter-node links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const na = nodes[i];
          const nb = nodes[j];
          const dist = Math.hypot(na.x - nb.x, na.y - nb.y);

          if (dist < threshold) {
            const alpha = 1 - dist / threshold;
            ctx.strokeStyle = isDay
              ? `rgba(15, 23, 42, ${alpha * 0.22})`
              : `rgba(255, 255, 255, ${alpha * 0.24})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(na.x, na.y);
            ctx.lineTo(nb.x, nb.y);
            ctx.stroke();
          }
        }
      }

      // Draw cursor connections
      if (mouse.active && mouse.current.x > 0) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dist = Math.hypot(n.x - mouse.current.x, n.y - mouse.current.y);
          if (dist < mouseThreshold) {
            const alpha = 1 - dist / mouseThreshold;
            ctx.strokeStyle = isDay
              ? `rgba(16, 185, 129, ${alpha * 0.35})`
              : `rgba(52, 211, 153, ${alpha * 0.55})`;
            ctx.lineWidth = 1.2;
            ctx.setLineDash([3, 5]);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.current.x, mouse.current.y);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = motionOff ? 1 : 0.85 + Math.sin(t * 2 + n.pulsePhase) * 0.15;
        const currentRadius = n.radius * pulse;
        const c = colors[n.colorIdx];

        // Halo
        ctx.fillStyle = c.glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = c.fill;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      cancelAnimationFrame(animId);
      clock.reset();
      animId = requestAnimationFrame(render);
    };

    startLoop();

    const themeObserver = new MutationObserver(() => {
      startLoop();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [motionOff]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="blueprint-bg-field pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* 1. Base clean canvas: adaptive field ground */}
      <div className="absolute inset-0 bg-field" />

      {/* 2. Interactive Spotlight tracking cursor */}
      {mousePos.x > 0 && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.10) 0%, rgba(139, 92, 246, 0.06) 45%, transparent 75%)`,
          }}
        />
      )}

      {/* 3. Luminous Fluid Aurora Blooms */}
      <div className="absolute -top-36 -left-36 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16)_0%,rgba(16,185,129,0.04)_50%,transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute -top-36 -right-36 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,rgba(139,92,246,0.04)_50%,transparent_75%)] blur-3xl pointer-events-none" />
      <div
        className="absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[34rem] w-[56rem] rounded-full blur-2xl pointer-events-none"
        style={{ background: "var(--center-shield)" }}
      />

      {/* 4. Crisp Blueprint Grid Block Lines */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_85%_75%_at_50%_35%,#000_45%,transparent_95%)] [-webkit-mask-image:radial-gradient(ellipse_85%_75%_at_50%_35%,#000_45%,transparent_95%)]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px),
            radial-gradient(circle, var(--grid-dot-color) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 20px 20px",
        }}
      />

      {/* 5. Interactive Constellation & Telemetry Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

      {/* 6. Smooth bottom blend */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
        style={{ background: "var(--bottom-blend)" }}
      />
    </div>
  );
}

export const LightModeBackground = BlueprintBackground;
