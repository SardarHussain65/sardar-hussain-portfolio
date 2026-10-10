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
    const PARTICLE_COUNT = isMobile ? 42000 : 75000;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.06);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5.8);
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
    const violetColor = new THREE.Color("#8b5cf6");
    const cyanColor = new THREE.Color("#06b6d4");
    const coreColor = new THREE.Color("#f5f3ff");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Random seeds
      const u = Math.random();
      const v = Math.random();
      const w = Math.random();
      randomness[i3] = u;
      randomness[i3 + 1] = v;
      randomness[i3 + 2] = w;

      // ─── 1. ORB / TORUS WAVE (Organic pulsating torus) ───
      const thetaOrb = u * Math.PI * 2;
      const phiOrb = v * Math.PI * 2;
      const majorR = 1.9;
      const wave = 0.45 * Math.sin(5 * thetaOrb) * Math.cos(3 * phiOrb);
      const minorR = 0.85 + wave + (w - 0.5) * 0.25;
      posOrb[i3] = (majorR + minorR * Math.cos(phiOrb)) * Math.cos(thetaOrb);
      posOrb[i3 + 1] = minorR * Math.sin(phiOrb) * 1.1;
      posOrb[i3 + 2] = (majorR + minorR * Math.cos(phiOrb)) * Math.sin(thetaOrb);

      // ─── 2. SPIRAL GALAXY (Logarithmic double-arm galaxy) ───
      const isCore = i < PARTICLE_COUNT * 0.18;
      if (isCore) {
        // High density central core
        const rCore = Math.pow(u, 1.8) * 0.85;
        const thetaCore = v * Math.PI * 2;
        const phiCore = Math.acos(2 * w - 1);
        posGalaxy[i3] = rCore * Math.sin(phiCore) * Math.cos(thetaCore);
        posGalaxy[i3 + 1] = (rCore * Math.cos(phiCore)) * 0.45;
        posGalaxy[i3 + 2] = rCore * Math.sin(phiCore) * Math.sin(thetaCore);
      } else {
        // Spiral arms
        const armIndex = i % 2;
        const rGalaxy = 0.6 + Math.pow(u, 0.9) * 3.6;
        const armAngle = armIndex * Math.PI + rGalaxy * 1.45 + (v - 0.5) * 0.65;
        const diskThickness = (0.28 / (rGalaxy * 0.7 + 0.4)) * (w - 0.5);
        posGalaxy[i3] = rGalaxy * Math.cos(armAngle);
        posGalaxy[i3 + 1] = diskThickness * (0.8 + 0.3 * Math.sin(rGalaxy * 3));
        posGalaxy[i3 + 2] = rGalaxy * Math.sin(armAngle);
      }

      // ─── 3. NEURAL BRAIN MESH (Two hemispheres with folded cortex) ───
      const signX = (i % 2 === 0 ? 1 : -1);
      const lat = (u - 0.5) * Math.PI; // -pi/2 to pi/2
      const lon = v * Math.PI * 2;
      const baseRx = 1.05 + 0.2 * Math.sin(6 * lat) * Math.cos(6 * lon);
      const baseRy = 1.35 + 0.25 * Math.cos(5 * lat);
      const baseRz = 1.55 + 0.22 * Math.sin(7 * lon);

      // Cerebrum curvature
      const bx = (0.4 + baseRx * Math.cos(lat) * Math.cos(lon)) * signX;
      const by = baseRy * Math.sin(lat) + 0.15;
      const bz = baseRz * Math.cos(lat) * Math.sin(lon);
      const noise = (w - 0.5) * 0.18;
      posBrain[i3] = (bx + noise) * 1.1;
      posBrain[i3 + 1] = (by + noise) * 1.1;
      posBrain[i3 + 2] = (bz + noise) * 1.1;

      // ─── PARTICLE COLOR GRADIENT (Mint to Violet with Core Spark) ───
      const colorMix = (u + v) * 0.5;
      const pColor = new THREE.Color();
      if (isCore && u < 0.08) {
        pColor.copy(coreColor);
      } else if (colorMix < 0.45) {
        pColor.lerpColors(mintColor, cyanColor, colorMix / 0.45);
      } else {
        pColor.lerpColors(cyanColor, violetColor, (colorMix - 0.45) / 0.55);
      }
      colors[i3] = pColor.r;
      colors[i3 + 1] = pColor.g;
      colors[i3 + 2] = pColor.b;

      // Variable particle size
      sizes[i] = 1.2 + Math.pow(w, 2.2) * 2.8;
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
        float pulse = sin(uTime * 1.8 + aRandom.x * 6.28) * 0.06;
        morphedPos += normalize(morphedPos + vec3(0.001)) * pulse;

        // Interactive cursor repulsion / turbulence
        vec3 mouseWorld = vec3(uMouse.x * 3.2, uMouse.y * 2.2, 1.2);
        vec3 toMouse = morphedPos - mouseWorld;
        float dist = length(toMouse);
        if (dist < 2.2) {
          float force = (1.0 - dist / 2.2);
          morphedPos += normalize(toMouse) * force * 0.75;
          // Add kinetic curl
          morphedPos.x += sin(morphedPos.y * 3.0 + uTime * 2.0) * force * 0.3;
          morphedPos.y += cos(morphedPos.x * 3.0 + uTime * 2.0) * force * 0.3;
        }

        // Slow global axial rotation based on mode
        float rotAngle = uTime * 0.12;
        float cosA = cos(rotAngle);
        float sinA = sin(rotAngle);
        vec3 rotatedPos = vec3(
          morphedPos.x * cosA - morphedPos.z * sinA,
          morphedPos.y,
          morphedPos.x * sinA + morphedPos.z * cosA
        );

        // Tilt galaxy disk slightly towards viewer for cinematic perspective
        if (uMorph < 1.5) {
          float tilt = 0.55 * (1.0 - abs(uMorph - 1.0));
          float cosT = cos(tilt);
          float sinT = sin(tilt);
          rotatedPos = vec3(
            rotatedPos.x,
            rotatedPos.y * cosT - rotatedPos.z * sinT,
            rotatedPos.y * sinT + rotatedPos.z * cosT
          );
        }

        vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Attenuated point size with depth
        gl_PointSize = (aSize * uPixelRatio * 38.0) / -mvPosition.z;
        vAlpha = clamp(1.2 / (-mvPosition.z * 0.4 + 0.6), 0.25, 1.0);
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
