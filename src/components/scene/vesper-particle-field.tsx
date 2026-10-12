"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { createFrameClock, perFrame } from "@/lib/scene/per-frame";

export type ParticleMode = "orb" | "galaxy" | "brain";

interface VesperParticleFieldProps {
  currentMode?: ParticleMode;
  onModeChange?: (mode: ParticleMode) => void;
  className?: string;
}

export function VesperParticleField({
  currentMode = "galaxy",
  onModeChange,
  className = "",
}: VesperParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetModeFactor = useRef(1.0); // 0 = orb, 1 = galaxy, 2 = brain
  const currentModeFactor = useRef(1.0);

  // Sync prop changes to target mode factor
  useEffect(() => {
    if (currentMode === "orb") targetModeFactor.current = 0.0;
    else if (currentMode === "galaxy") targetModeFactor.current = 1.0;
    else if (currentMode === "brain") targetModeFactor.current = 2.0;
  }, [currentMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect mobile for particle density adjustment
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 48000 : 85000;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.06);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 5.8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      alpha: true,
      depth: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Geometry & Position Buffers
    const geometry = new THREE.BufferGeometry();
    const posOrb = new Float32Array(PARTICLE_COUNT * 3);
    const posGalaxy = new Float32Array(PARTICLE_COUNT * 3);
    const posBrain = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const randomness = new Float32Array(PARTICLE_COUNT * 3);

    const mintColor = new THREE.Color("#10b981");
    const emeraldColor = new THREE.Color("#34d399");
    const cyanColor = new THREE.Color("#06b6d4");
    const violetColor = new THREE.Color("#8b5cf6");
    const orchidColor = new THREE.Color("#a855f7");
    const diamondWhite = new THREE.Color("#ffffff");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Random seeds
      const u = Math.random();
      const v = Math.random();
      const w = Math.random();
      randomness[i3] = u;
      randomness[i3 + 1] = v;
      randomness[i3 + 2] = w;

      // ─── 1. ORB / TORUS WAVE (Framing elliptical orbital rings) ───
      const sideOrb = i % 2 === 0 ? -1 : 1;
      const thetaOrb = u * Math.PI * 2;
      const phiOrb = v * Math.PI * 2;
      const majorR = 2.4;
      const wave = 0.35 * Math.sin(4 * thetaOrb) * Math.cos(3 * phiOrb);
      const minorR = 0.85 + wave + (w - 0.5) * 0.25;
      posOrb[i3] = sideOrb * 1.8 + (majorR + minorR * Math.cos(phiOrb)) * Math.cos(thetaOrb);
      posOrb[i3 + 1] = minorR * Math.sin(phiOrb) * 1.1;
      posOrb[i3 + 2] = (majorR + minorR * Math.cos(phiOrb)) * Math.sin(thetaOrb) - 0.5;

      // ─── 2. DUAL COSMIC SPIRAL GALAXIES (Flanking Left & Right) ───
      // Scaled up size and centered at ±2.65 so both spirals are fully apparent on screen
      const flank = i % 2 === 0 ? -1 : 1;
      const centerX = flank * 2.65;
      const centerY = flank * 0.08;
      const isCore = (i % Math.floor(PARTICLE_COUNT / 2)) < Math.floor(PARTICLE_COUNT * 0.09);

      if (isCore) {
        // High density luminous galactic core (scaled up size)
        const rCore = Math.pow(u, 1.7) * 0.88;
        const thetaCore = v * Math.PI * 2;
        const phiCore = Math.acos(2 * w - 1);
        posGalaxy[i3] = centerX + rCore * Math.sin(phiCore) * Math.cos(thetaCore);
        posGalaxy[i3 + 1] = centerY + (rCore * Math.cos(phiCore)) * 0.45;
        posGalaxy[i3 + 2] = rCore * Math.sin(phiCore) * Math.sin(thetaCore);
      } else {
        // Dual tight, defined logarithmic spiral ribbons (scaled up radius to 3.35)
        const armIndex = i % 4 < 2 ? 0 : 1;
        const rGalaxy = 0.55 + Math.pow(u, 0.85) * 3.35;
        const armAngle = armIndex * Math.PI + flank * (rGalaxy * 1.38) + (v - 0.5) * 0.70;
        const diskThickness = (0.28 / (rGalaxy * 0.55 + 0.35)) * (w - 0.5);
        posGalaxy[i3] = centerX + rGalaxy * Math.cos(armAngle);
        posGalaxy[i3 + 1] = centerY + diskThickness * (0.8 + 0.3 * Math.sin(rGalaxy * 2.8));
        posGalaxy[i3 + 2] = rGalaxy * Math.sin(armAngle);
      }

      // ─── 3. NEURAL BRAIN MESH (Separated Hemispheres) ───
      const signX = i % 2 === 0 ? 1 : -1;
      const lat = (u - 0.5) * Math.PI;
      const lon = v * Math.PI * 2;
      const baseRx = 0.95 + 0.18 * Math.sin(6 * lat) * Math.cos(6 * lon);
      const baseRy = 1.25 + 0.22 * Math.cos(5 * lat);
      const baseRz = 1.45 + 0.2 * Math.sin(7 * lon);
      const bx = (1.9 + baseRx * Math.cos(lat) * Math.cos(lon)) * signX;
      const by = baseRy * Math.sin(lat) + 0.1;
      const bz = baseRz * Math.cos(lat) * Math.sin(lon);
      const noise = (w - 0.5) * 0.15;
      posBrain[i3] = bx + noise;
      posBrain[i3 + 1] = by + noise;
      posBrain[i3 + 2] = bz + noise;

      // ─── PARTICLE COLOR GRADIENT (Left: Mint & Cyan / Right: Violet & Orchid) ───
      const pColor = new THREE.Color();
      if (flank < 0) {
        // Left Galaxy: Brilliant Emerald, Mint, Electric Cyan, White Core
        if (isCore && u < 0.2) {
          pColor.copy(diamondWhite);
        } else if (v < 0.5) {
          pColor.lerpColors(mintColor, emeraldColor, v / 0.5);
        } else {
          pColor.lerpColors(emeraldColor, cyanColor, (v - 0.5) / 0.5);
        }
      } else {
        // Right Galaxy: Electric Violet, Orchid, Cyan Accents, White Core
        if (isCore && u < 0.2) {
          pColor.copy(diamondWhite);
        } else if (v < 0.5) {
          pColor.lerpColors(violetColor, orchidColor, v / 0.5);
        } else {
          pColor.lerpColors(orchidColor, cyanColor, (v - 0.5) / 0.5);
        }
      }
      colors[i3] = pColor.r;
      colors[i3 + 1] = pColor.g;
      colors[i3 + 2] = pColor.b;

      // Variable particle size
      sizes[i] = 1.25 + Math.pow(w, 2.1) * 2.8;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(posGalaxy, 3));
    geometry.setAttribute("aTargetOrb", new THREE.BufferAttribute(posOrb, 3));
    geometry.setAttribute("aTargetGalaxy", new THREE.BufferAttribute(posGalaxy, 3));
    geometry.setAttribute("aTargetBrain", new THREE.BufferAttribute(posBrain, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aRandom", new THREE.BufferAttribute(randomness, 3));

    // Custom Shaders
    const vertexShader = `
      uniform float uTime;
      uniform float uMorph; // 0 = Orb, 1 = Galaxy, 2 = Brain
      uniform vec2 uMouse;
      uniform float uPixelRatio;

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

        // Multi-stage morphing: 0..1 (Orb -> Galaxy), 1..2 (Galaxy -> Brain)
        vec3 morphedPos;
        if (uMorph <= 1.0) {
          morphedPos = mix(aTargetOrb, aTargetGalaxy, uMorph);
        } else {
          morphedPos = mix(aTargetGalaxy, aTargetBrain, uMorph - 1.0);
        }

        // Subtle organic breathing & wave pulsation
        float pulse = sin(uTime * 1.6 + aRandom.x * 6.28) * 0.05;
        morphedPos += normalize(morphedPos + vec3(0.001)) * pulse;

        // Interactive cursor repulsion / turbulence
        vec3 mouseWorld = vec3(uMouse.x * 3.5, uMouse.y * 2.2, 1.2);
        vec3 toMouse = morphedPos - mouseWorld;
        float dist = length(toMouse);
        if (dist < 2.2) {
          float force = (1.0 - dist / 2.2);
          morphedPos += normalize(toMouse) * force * 0.75;
          morphedPos.x += sin(morphedPos.y * 3.0 + uTime * 2.0) * force * 0.3;
          morphedPos.y += cos(morphedPos.x * 3.0 + uTime * 2.0) * force * 0.3;
        }

        // Dual Galaxy local rotation: each galaxy rotates on its own local flank center
        float flank = sign(aTargetGalaxy.x);
        vec3 galaxyCenter = vec3(flank * 2.65, flank * 0.08, 0.0);

        float localRotAngle = uTime * 0.16 * flank;
        float cosL = cos(localRotAngle);
        float sinL = sin(localRotAngle);
        vec3 localOffset = morphedPos - galaxyCenter;
        vec3 rotatedGalaxy = vec3(
          localOffset.x * cosL - localOffset.z * sinL,
          localOffset.y,
          localOffset.x * sinL + localOffset.z * cosL
        ) + galaxyCenter;

        // Perspective tilt: tilt both galaxies forward towards the camera so both spiral faces swirl clearly
        float tilt = 0.48;
        float cosT = cos(tilt);
        float sinT = sin(tilt);
        rotatedGalaxy = vec3(
          rotatedGalaxy.x,
          rotatedGalaxy.y * cosT - rotatedGalaxy.z * sinT,
          rotatedGalaxy.y * sinT + rotatedGalaxy.z * cosT
        );

        // Global drift for Orb / Brain modes
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

        vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Attenuated point size with depth
        gl_PointSize = (aSize * uPixelRatio * 40.0) / -mvPosition.z;

        // Center Clearance Corridor: Fades out any particles in the center text reading zone
        float centerCorridor = smoothstep(0.35, 1.9, abs(finalPos.x));
        vAlpha = clamp(1.2 / (-mvPosition.z * 0.4 + 0.6), 0.20, 0.95) * (0.10 + 0.90 * centerCorridor);
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;

      void main() {
        // Circular soft-particle SDF
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        if (dist > 0.5) discard;

        // Soft ethereal glow falloff
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
        uMorph: { value: 1.0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse & Pointer Tracking
    const mouse = { current: new THREE.Vector2(0, 0), target: new THREE.Vector2(0, 0) };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      mouse.target.set(x, y);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop with per-frame dt scaling
    const clock = createFrameClock();
    let animId = 0;

    const tick = (now: number) => {
      const { dt, t } = clock.tick(now);

      // Smooth mouse interpolation (spring inertia)
      mouse.current.lerp(mouse.target, perFrame(0.08, dt));
      material.uniforms.uMouse.value.copy(mouse.current);

      // Smooth morph transition interpolation
      currentModeFactor.current +=
        (targetModeFactor.current - currentModeFactor.current) * perFrame(0.05, dt);
      material.uniforms.uMorph.value = currentModeFactor.current;
      material.uniforms.uTime.value = t;

      // Slight camera parallax responsive to pointer
      camera.position.x = mouse.current.x * 0.45;
      camera.position.y = 1.1 + mouse.current.y * 0.35;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    // Cleanup and resource disposal
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative h-full w-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
