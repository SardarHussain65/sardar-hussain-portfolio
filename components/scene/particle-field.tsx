"use client";

import { useEffect, useRef } from "react";

const vertexShader = /* glsl */ `
  attribute vec3 aOrb;
  attribute vec3 aGalaxy;
  attribute vec3 aBrain;
  attribute vec3 aColor;
  uniform float uMorph;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uSize;
  uniform float uTilt;
  varying vec3 vColor;

  void main() {
    vColor = aColor;
    float phase = mod(uMorph, 3.0);
    float idx = floor(phase);
    float t = phase - idx;
    t = t * t * (3.0 - 2.0 * t);
    vec3 a = idx < 0.5 ? aOrb : (idx < 1.5 ? aGalaxy : aBrain);
    vec3 b = idx < 0.5 ? aGalaxy : (idx < 1.5 ? aBrain : aOrb);
    vec3 p = mix(a, b, t);

    float ang = uTilt;
    float cy = cos(ang);
    float sy = sin(ang);
    float y = p.y * cy - p.z * sy;
    float z = p.y * sy + p.z * cy;
    p.y = y;
    p.z = z;

    vec2 delta = p.xy - uPointer;
    float dist = length(delta) + 0.4;
    p.xy -= delta * (0.34 / dist);
    p.x += sin(uTime * 0.55 + aOrb.y * 5.0) * 0.02;
    p.y += cos(uTime * 0.4 + aOrb.x * 4.0) * 0.016;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (320.0 / max(1.2, -mv.z));
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.08, d);
    glow = pow(glow, 1.8);
    gl_FragColor = vec4(vColor * glow, glow);
  }
`;

function hash(index: number) {
  const x = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function ParticleField() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    const boot = async () => {
      const THREE = await import("three");
      if (disposed || !host.current) return;

      const mobile = window.matchMedia("(max-width: 768px)").matches;
      const count = mobile ? 3200 : 12000;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
      camera.position.set(0, 0.2, 8.4);

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      canvas.style.pointerEvents = "none";
      host.current.appendChild(canvas);

      const orb = new Float32Array(count * 3);
      const galaxy = new Float32Array(count * 3);
      const brain = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const a = hash(i + 1);
        const b = hash(i + 19);
        const c = hash(i + 41);
        const i3 = i * 3;

        const theta = a * Math.PI * 2;
        const phi = Math.acos(2 * b - 1);
        const radius = 0.35 + Math.pow(c, 0.65) * 1.35;
        orb[i3] = radius * Math.sin(phi) * Math.cos(theta);
        orb[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        orb[i3 + 2] = radius * Math.cos(phi);

        const arm = i % 3;
        const gr = Math.pow(a, 0.62) * 3.7;
        const spin = gr * 2.35 + arm * ((Math.PI * 2) / 3);
        const jitter = (b - 0.5) * (0.08 + gr * 0.03);
        galaxy[i3] = Math.cos(spin) * gr + jitter;
        galaxy[i3 + 1] = Math.sin(spin) * gr * 0.92 + (c - 0.5) * 0.08;
        galaxy[i3 + 2] = (b - 0.5) * 0.28 * (1.1 - gr / 4.2);

        const lobe = a > 0.5 ? 1 : -1;
        const bt = b * Math.PI * 2;
        const bp = Math.acos(2 * c - 1);
        const br = 0.85 + hash(i + 7) * 0.45;
        let bx = br * Math.sin(bp) * Math.cos(bt) * 0.95 + lobe * 0.62;
        let by = br * Math.sin(bp) * Math.sin(bt) * 0.78 + 0.2;
        let bz = br * Math.cos(bp) * 1.15;
        bx += Math.sin(by * 7.5) * Math.cos(bz * 6.0) * 0.08;
        by += Math.cos(bx * 5.0) * 0.04;
        if (a < 0.07) {
          bx *= 0.22;
          by = -1.15 - b * 0.85;
          bz *= 0.3;
        }
        brain[i3] = bx * 1.15;
        brain[i3 + 1] = by * 1.15;
        brain[i3 + 2] = bz * 1.15;

        const tone = gr / 3.7;
        const violet = [0.42, 0.28, 0.72];
        const ice = [0.35, 0.62, 0.6];
        const mint = [0.08, 0.55, 0.38];
        const mix = tone < 0.35 ? tone / 0.35 : (tone - 0.35) / 0.65;
        const from = tone < 0.35 ? violet : ice;
        const to = tone < 0.35 ? ice : mint;
        colors[i3] = from[0] + (to[0] - from[0]) * mix;
        colors[i3 + 1] = from[1] + (to[1] - from[1]) * mix;
        colors[i3 + 2] = from[2] + (to[2] - from[2]) * mix;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(orb, 3));
      geometry.setAttribute("aOrb", new THREE.BufferAttribute(orb, 3));
      geometry.setAttribute("aGalaxy", new THREE.BufferAttribute(galaxy, 3));
      geometry.setAttribute("aBrain", new THREE.BufferAttribute(brain, 3));
      geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

      const uniforms = {
        uMorph: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uSize: { value: mobile ? 0.72 : 0.48 },
        uTilt: { value: 0.12 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      points.position.y = -1.15;
      scene.add(points);

      const pointer = { x: 0, y: 0 };
      const onPointer = (event: PointerEvent) => {
        const rect = host.current?.getBoundingClientRect();
        if (!rect || rect.width === 0) return;
        pointer.x = (((event.clientX - rect.left) / rect.width) * 2 - 1) * 2.4;
        pointer.y = (-((event.clientY - rect.top) / rect.height) * 2 + 1) * 1.5;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const resize = () => {
        if (!host.current) return;
        const width = host.current.clientWidth;
        const height = host.current.clientHeight;
        camera.aspect = width / Math.max(height, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(host.current);

      let visible = true;
      const view = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      view.observe(host.current);

      const tilts = [0.05, 0.38, 0.1];
      let last = performance.now();

      const tick = (now: number) => {
        frame = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        uniforms.uTime.value += dt;
        uniforms.uMorph.value += dt / 7.5;
        uniforms.uPointer.value.x += (pointer.x - uniforms.uPointer.value.x) * 0.08;
        uniforms.uPointer.value.y += (pointer.y - uniforms.uPointer.value.y) * 0.08;

        const phase = uniforms.uMorph.value % 3;
        const from = Math.floor(phase);
        const to = (from + 1) % 3;
        const t = phase - from;
        const ease = t * t * (3 - 2 * t);
        uniforms.uTilt.value = tilts[from] + (tilts[to] - tilts[from]) * ease;

        points.rotation.y += dt * 0.08;
        camera.position.x += (pointer.x * 0.18 - camera.position.x) * 0.04;
        camera.lookAt(0, -0.2, 0);
        renderer.render(scene, camera);
      };
      frame = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pointermove", onPointer);
        observer.disconnect();
        view.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        canvas.remove();
      };
    };

    void boot();

    return () => {
      disposed = true;
      cleanup();
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={host} className="absolute inset-0" aria-hidden />;
}
