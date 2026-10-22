"use client";

// 📖 Docs: obsidian/frontend/webgl-scenes.md → "This portfolio's field"

import { useEffect, useRef } from "react";
import { createDrawGate, createFrameClock, perFrame } from "@/lib/scene/per-frame";
import { keepSceneAlive, releaseContext, watchContext } from "@/lib/scene/webgl-context";
import { useMotionOff } from "@/hooks/use-motion-off";

export type ParticleMode = "orb" | "galaxy" | "brain";

interface VesperParticleFieldProps {
  currentMode?: ParticleMode;
  onModeChange?: (mode: ParticleMode) => void;
  className?: string;
}

/** Desktop buffer. Phones draw a prefix via setDrawRange — both spirals stay, the fill does not. */
const DESKTOP_COUNT = 20000;
const PHONE_COUNT = 6500;

const modeFactor = (mode: ParticleMode): number =>
  mode === "orb" ? 0 : mode === "brain" ? 2 : 1;

/** Phone or tablet: width under 768, or a coarse pointer with no hover. */
const phoneTier = (): boolean =>
  window.innerWidth < 768 ||
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

const constrainedDevice = (): boolean => {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  return Boolean(nav.connection?.saveData) || (nav.deviceMemory !== undefined && nav.deviceMemory <= 2);
};

/**
 * Portrait cameras cannot see spirals centred at x = ±2.65. Narrow viewports
 * fold both disks onto the origin and scale them into the frustum.
 */
const poseFor = (width: number, height: number) => {
  const aspect = width / Math.max(height, 1);
  const narrow = aspect < 0.95;
  const fov = narrow ? 62 : 55;
  const z = narrow ? 5.35 : 5.8;
  const y = narrow ? 0.05 : 1.1;
  const lookY = narrow ? -0.45 : 0;
  const halfH = Math.tan((fov * Math.PI) / 360) * z;
  const halfW = halfH * aspect;
  // Galaxy fit bleeds past the portrait edges so the spiral reads as the background.
  // Shape fit keeps the wider torus and brain inside the same frustum.
  const galaxyFit = narrow ? Math.min(0.85, (halfW * 1.22) / 3.95) : 1;
  const shapeFit = narrow ? Math.min(1, (halfW * 0.92) / 5.2) : 1;
  return { narrow, fov, z, y, lookY, galaxyFit, shapeFit };
};

const fallbackField = (className: string) => (
  <div
    className={`relative h-full w-full pointer-events-none select-none overflow-hidden ${className}`}
    aria-hidden="true"
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.16),transparent_55%),radial-gradient(circle_at_70%_45%,rgba(139,92,246,0.18),transparent_52%)]" />
  </div>
);

export function VesperParticleField({
  currentMode = "galaxy",
  className = "",
}: VesperParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetModeFactor = useRef(modeFactor(currentMode));
  const currentModeFactor = useRef(modeFactor(currentMode));
  const motionOff = useMotionOff();

  useEffect(() => {
    targetModeFactor.current = modeFactor(currentMode);
  }, [currentMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || motionOff) return;

    const stop = keepSceneAlive({
      container,
      build: async ({ onContextChange }) => {
        const THREE = await import("three");
        if (!container.isConnected) {
          throw new Error("Particle field unmounted before the scene could start");
        }

        const constrained = constrainedDevice();
        const bufferCount = constrained ? 8000 : DESKTOP_COUNT;
        const phoneDraw = constrained ? 4000 : PHONE_COUNT;
        const desktopDraw = constrained ? 8000 : DESKTOP_COUNT;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x030712, 0.045);

        const pose = poseFor(container.clientWidth, container.clientHeight);
        const camera = new THREE.PerspectiveCamera(
          pose.fov,
          container.clientWidth / Math.max(container.clientHeight, 1),
          0.1,
          100,
        );
        camera.position.set(0, pose.y, pose.z);
        camera.lookAt(0, pose.lookY, 0);

        const renderer = new THREE.WebGLRenderer({
          powerPreference: phoneTier() ? "default" : "high-performance",
          antialias: false,
          alpha: true,
          depth: false,
          stencil: false,
        });
        const canvas = renderer.domElement;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";
        renderer.setClearColor(0x000000, 0);
        container.appendChild(canvas);

        let lost = false;
        let animId = 0;
        let frames = 0;
        let lastW = 0;
        let lastH = 0;
        let lastDpr = 0;
        const gate = createDrawGate(true);

        const stopWatch = watchContext(canvas, () => {
          lost = true;
          cancelAnimationFrame(animId);
          onContextChange();
        });

        const geometry = new THREE.BufferGeometry();
        const posOrb = new Float32Array(bufferCount * 3);
        const posGalaxy = new Float32Array(bufferCount * 3);
        const posBrain = new Float32Array(bufferCount * 3);
        const colors = new Float32Array(bufferCount * 3);
        const sizes = new Float32Array(bufferCount);
        const randomness = new Float32Array(bufferCount * 3);

        const mintColor = new THREE.Color("#10b981");
        const emeraldColor = new THREE.Color("#34d399");
        const cyanColor = new THREE.Color("#06b6d4");
        const violetColor = new THREE.Color("#8b5cf6");
        const orchidColor = new THREE.Color("#a855f7");
        const diamondWhite = new THREE.Color("#ffffff");
        const pColor = new THREE.Color();

        for (let i = 0; i < bufferCount; i++) {
          const i3 = i * 3;
          const u = Math.random();
          const v = Math.random();
          const w = Math.random();
          randomness[i3] = u;
          randomness[i3 + 1] = v;
          randomness[i3 + 2] = w;

          const sideOrb = i % 2 === 0 ? -1 : 1;
          const thetaOrb = u * Math.PI * 2;
          const phiOrb = v * Math.PI * 2;
          const majorR = 2.4;
          const wave = 0.35 * Math.sin(4 * thetaOrb) * Math.cos(3 * phiOrb);
          const minorR = 0.85 + wave + (w - 0.5) * 0.25;
          posOrb[i3] = sideOrb * 1.8 + (majorR + minorR * Math.cos(phiOrb)) * Math.cos(thetaOrb);
          posOrb[i3 + 1] = minorR * Math.sin(phiOrb) * 1.1;
          posOrb[i3 + 2] = (majorR + minorR * Math.cos(phiOrb)) * Math.sin(thetaOrb) - 0.5;

          const flank = i % 2 === 0 ? -1 : 1;
          const centerX = flank * 2.65;
          const isCore = i % Math.floor(bufferCount / 2) < Math.floor(bufferCount * 0.09);

          let lx = 0;
          let ly = 0;
          let lz = 0;
          if (isCore) {
            const rCore = Math.pow(u, 1.7) * 0.88;
            const thetaCore = v * Math.PI * 2;
            const phiCore = Math.acos(2 * w - 1);
            lx = rCore * Math.sin(phiCore) * Math.cos(thetaCore);
            ly = rCore * Math.cos(phiCore) * 0.45;
            lz = rCore * Math.sin(phiCore) * Math.sin(thetaCore);
          } else {
            const armIndex = i % 4 < 2 ? 0 : 1;
            const rGalaxy = 0.55 + Math.pow(u, 0.85) * 3.35;
            const armAngle = armIndex * Math.PI + rGalaxy * 1.38 + (v - 0.5) * 0.7;
            const diskThickness = (0.28 / (rGalaxy * 0.55 + 0.35)) * (w - 0.5);
            lx = rGalaxy * Math.cos(armAngle);
            ly = diskThickness * (0.8 + 0.3 * Math.sin(rGalaxy * 2.8));
            lz = rGalaxy * Math.sin(armAngle);
          }

          posGalaxy[i3] = centerX + flank * lx;
          posGalaxy[i3 + 1] = ly;
          posGalaxy[i3 + 2] = lz;

          const signX = i % 2 === 0 ? 1 : -1;
          const lat = (u - 0.5) * Math.PI;
          const lon = v * Math.PI * 2;
          const baseRx = 0.95 + 0.18 * Math.sin(6 * lat) * Math.cos(6 * lon);
          const baseRy = 1.25 + 0.22 * Math.cos(5 * lat);
          const baseRz = 1.45 + 0.2 * Math.sin(7 * lon);
          const noise = (w - 0.5) * 0.15;
          posBrain[i3] = (1.9 + baseRx * Math.cos(lat) * Math.cos(lon)) * signX + noise;
          posBrain[i3 + 1] = baseRy * Math.sin(lat) + 0.1 + noise;
          posBrain[i3 + 2] = baseRz * Math.cos(lat) * Math.sin(lon) + noise;

          if (flank < 0) {
            if (isCore && u < 0.2) pColor.copy(diamondWhite);
            else if (v < 0.5) pColor.lerpColors(mintColor, emeraldColor, v / 0.5);
            else pColor.lerpColors(emeraldColor, cyanColor, (v - 0.5) / 0.5);
          } else if (isCore && u < 0.2) {
            pColor.copy(diamondWhite);
          } else if (v < 0.5) {
            pColor.lerpColors(violetColor, orchidColor, v / 0.5);
          } else {
            pColor.lerpColors(orchidColor, cyanColor, (v - 0.5) / 0.5);
          }
          colors[i3] = pColor.r;
          colors[i3 + 1] = pColor.g;
          colors[i3 + 2] = pColor.b;
          sizes[i] = 1.25 + Math.pow(w, 2.1) * 2.8;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(posGalaxy, 3));
        geometry.setAttribute("aTargetOrb", new THREE.BufferAttribute(posOrb, 3));
        geometry.setAttribute("aTargetGalaxy", new THREE.BufferAttribute(posGalaxy, 3));
        geometry.setAttribute("aTargetBrain", new THREE.BufferAttribute(posBrain, 3));
        geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        geometry.setAttribute("aRandom", new THREE.BufferAttribute(randomness, 3));

        const vertexShader = `
          uniform float uTime;
          uniform float uMorph;
          uniform vec2 uMouse;
          uniform float uPixelRatio;
          uniform float uFit;
          uniform float uShape;
          uniform float uNarrow;
          uniform float uDensity;

          attribute vec3 aTargetOrb;
          attribute vec3 aTargetGalaxy;
          attribute vec3 aTargetBrain;
          attribute vec3 aColor;
          attribute float aSize;
          attribute vec3 aRandom;

          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vColor = aColor;

            vec3 morphedPos = uMorph <= 1.0
              ? mix(aTargetOrb, aTargetGalaxy, uMorph)
              : mix(aTargetGalaxy, aTargetBrain, uMorph - 1.0);

            float pulse = sin(uTime * 1.6 + aRandom.x * 6.28) * 0.05;
            morphedPos += normalize(morphedPos + vec3(0.001)) * pulse;

            vec3 mouseWorld = vec3(uMouse.x * 3.5, uMouse.y * 2.2, 1.2);
            vec3 toMouse = morphedPos - mouseWorld;
            float dist = length(toMouse);
            if (dist < 2.2) {
              float force = (1.0 - dist / 2.2);
              morphedPos += normalize(toMouse) * force * 0.75;
              morphedPos.x += sin(morphedPos.y * 3.0 + uTime * 2.0) * force * 0.3;
              morphedPos.y += cos(morphedPos.x * 3.0 + uTime * 2.0) * force * 0.3;
            }

            float flank = sign(aTargetGalaxy.x);
            vec3 galaxyCenter = vec3(flank * 2.65, 0.0, 0.0);
            float localRotAngle = uTime * 0.16 * flank;
            float cosL = cos(localRotAngle);
            float sinL = sin(localRotAngle);
            vec3 localOffset = morphedPos - galaxyCenter;
            vec3 rotatedGalaxy = vec3(
              localOffset.x * cosL - localOffset.z * sinL,
              localOffset.y,
              localOffset.x * sinL + localOffset.z * cosL
            ) + galaxyCenter;

            float tilt = 0.48;
            float cosT = cos(tilt);
            float sinT = sin(tilt);
            rotatedGalaxy = vec3(
              rotatedGalaxy.x,
              rotatedGalaxy.y * cosT - rotatedGalaxy.z * sinT,
              rotatedGalaxy.y * sinT + rotatedGalaxy.z * cosT
            );

            float globalRotAngle = uTime * 0.08;
            float cosG = cos(globalRotAngle);
            float sinG = sin(globalRotAngle);
            vec3 rotatedGlobal = vec3(
              morphedPos.x * cosG - morphedPos.z * sinG,
              morphedPos.y,
              morphedPos.x * sinG + morphedPos.z * cosG
            );

            float isGalaxyMode = clamp(1.0 - abs(uMorph - 1.0), 0.0, 1.0);
            vec3 finalPos = mix(rotatedGlobal, rotatedGalaxy, isGalaxyMode);

            // Portrait: both spirals share one disk, dropped under the headline so the arms stay visible.
            vec3 shown = finalPos;
            if (uNarrow > 0.5) {
              vec3 folded = finalPos - galaxyCenter;
              folded.y -= 1.05;
              shown = mix(finalPos, folded, isGalaxyMode);
            }
            float scale = mix(uShape, uFit, isGalaxyMode);
            shown *= vec3(scale, mix(1.0, max(scale, 0.75), uNarrow), scale);

            vec4 mvPosition = modelViewMatrix * vec4(shown, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float size = (aSize * uPixelRatio * uDensity * 40.0) / max(-mvPosition.z, 0.25);
            gl_PointSize = min(size, 48.0);

            float corridorWide = smoothstep(0.35, 1.9, abs(finalPos.x));
            float centerCorridor = mix(corridorWide, 1.0, uNarrow);
            vAlpha = clamp(1.15 / (-mvPosition.z * 0.4 + 0.6), 0.22, 0.95) * (0.16 + 0.84 * centerCorridor);
          }
        `;

        const fragmentShader = `
          varying vec3 vColor;
          varying float vAlpha;

          void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float dist = length(coord);
            if (dist > 0.5) discard;

            float intensity = pow(1.0 - dist * 2.0, 1.7);
            float core = smoothstep(0.18, 0.0, dist);
            vec3 finalColor = vColor + vec3(core * 0.85);
            gl_FragColor = vec4(finalColor, intensity * vAlpha * 0.92);
          }
        `;

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTime: { value: 0 },
            uMorph: { value: currentModeFactor.current },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uPixelRatio: { value: 1 },
            uFit: { value: pose.galaxyFit },
            uShape: { value: pose.shapeFit },
            uNarrow: { value: pose.narrow ? 1 : 0 },
            uDensity: { value: 1 },
          },
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        const mouse = { current: new THREE.Vector2(0, 0), target: new THREE.Vector2(0, 0) };
        let phone = phoneTier();
        let restY = pose.y;
        let restZ = pose.z;
        let lookY = pose.lookY;
        let listenPointer = false;

        const drawCountFor = (isPhone: boolean) =>
          Math.min(isPhone ? phoneDraw : desktopDraw, bufferCount);

        const applyBudget = (isPhone: boolean) => {
          const count = drawCountFor(isPhone);
          geometry.setDrawRange(0, count);
          material.uniforms.uDensity.value = count < 10000 ? 1.4 : 1;
        };

        const applySize = () => {
          const width = container.clientWidth;
          const height = container.clientHeight;
          if (width < 2 || height < 2) return;
          const nextPhone = phoneTier();
          const coarse = window.matchMedia("(pointer: coarse)").matches;
          const dprCap = nextPhone ? 1.25 : 1.5;
          const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
          const heightOnly =
            coarse && width === lastW && Math.abs(dpr - lastDpr) < 0.01 && height !== lastH;
          if (heightOnly) return;
          if (width === lastW && height === lastH && Math.abs(dpr - lastDpr) < 0.01 && nextPhone === phone) {
            return;
          }
          lastW = width;
          lastH = height;
          lastDpr = dpr;
          phone = nextPhone;

          const next = poseFor(width, height);
          restY = next.y;
          restZ = next.z;
          lookY = next.lookY;
          camera.fov = next.fov;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setPixelRatio(dpr);
          renderer.setSize(width, height, false);
          material.uniforms.uPixelRatio.value = dpr;
          material.uniforms.uFit.value = next.galaxyFit;
          material.uniforms.uShape.value = next.shapeFit;
          material.uniforms.uNarrow.value = next.narrow ? 1 : 0;
          applyBudget(phone);
          if (!phone) gate.force();
          renderer.render(scene, camera);
          frames += 1;
        };

        applySize();

        const onPointerMove = (event: PointerEvent) => {
          if (phone) return;
          mouse.target.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
          );
        };
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
        const bindPointer = () => {
          const want = finePointer.matches;
          if (want === listenPointer) return;
          if (want) window.addEventListener("pointermove", onPointerMove, { passive: true });
          else window.removeEventListener("pointermove", onPointerMove);
          listenPointer = want;
        };
        bindPointer();
        finePointer.addEventListener("change", bindPointer);

        const resizeObserver = new ResizeObserver(() => applySize());
        resizeObserver.observe(container);
        window.addEventListener("resize", applySize);

        const clock = createFrameClock();
        let running = true;

        const onVisibility = () => {
          if (document.hidden || lost) return;
          clock.reset();
          gate.force();
          if (!running) {
            running = true;
            animId = requestAnimationFrame(tick);
          }
        };
        document.addEventListener("visibilitychange", onVisibility);

        const tick = (now: number) => {
          if (lost) return;
          if (document.hidden) {
            running = false;
            return;
          }
          const { dt, t } = clock.tick(now);

          if (phone) {
            mouse.target.set(Math.sin(t * 0.15) * 0.12, Math.cos(t * 0.11) * 0.06);
          }
          mouse.current.lerp(mouse.target, perFrame(0.08, dt));
          material.uniforms.uMouse.value.copy(mouse.current);

          currentModeFactor.current +=
            (targetModeFactor.current - currentModeFactor.current) * perFrame(0.05, dt);
          material.uniforms.uMorph.value = currentModeFactor.current;
          material.uniforms.uTime.value = t;

          const sway = phone ? 0.12 : 0.45;
          camera.position.x = mouse.current.x * sway;
          camera.position.y = restY + mouse.current.y * (phone ? 0.12 : 0.35);
          camera.position.z = restZ;
          camera.lookAt(0, lookY, 0);

          const draw = phone || gate.shouldDraw(dt);
          if (draw) {
            renderer.render(scene, camera);
            frames += 1;
          }
          animId = requestAnimationFrame(tick);
        };
        animId = requestAnimationFrame(tick);

        return {
          isBroken: () => lost || renderer.getContext().isContextLost(),
          frames: () => frames,
          dispose: () => {
            lost = true;
            running = false;
            cancelAnimationFrame(animId);
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("resize", applySize);
            finePointer.removeEventListener("change", bindPointer);
            if (listenPointer) window.removeEventListener("pointermove", onPointerMove);
            resizeObserver.disconnect();
            stopWatch();
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            releaseContext(renderer.getContext());
            canvas.remove();
          },
        };
      },
    });

    return () => {
      stop();
    };
  }, [motionOff]);

  if (motionOff) return fallbackField(className);

  return (
    <div
      ref={mountRef}
      className={`relative h-full w-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
