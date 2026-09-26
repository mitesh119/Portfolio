"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  start: number;
}

const SPACING = 34;
const WARP_RADIUS = 150;
const WARP_STRENGTH = 16;
const RIPPLE_DURATION = 1100;
const RIPPLE_SPEED = 0.5;
const RIPPLE_BAND = 60;
const RIPPLE_STRENGTH = 18;

function withAlpha(rawColor: string, alpha: number) {
  return `color-mix(in oklab, ${rawColor.trim()} ${Math.round(alpha * 100)}%, transparent)`;
}

/**
 * Full-viewport fixed canvas: a dot grid that warps away from the cursor and
 * ripples outward on click/tap. Acts as the site-wide background — it paints
 * the current --background color itself, so sections just need to stay
 * transparent for it to show through.
 */
export function KineticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let rawBg = "";
    let rawFg = "";
    let rawAccent = "";

    const readColors = () => {
      const s = getComputedStyle(document.documentElement);
      rawBg = s.getPropertyValue("--background").trim();
      rawFg = s.getPropertyValue("--foreground").trim();
      rawAccent = s.getPropertyValue("--primary").trim();
    };
    readColors();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pointer = { x: -9999, y: -9999 };
    let ripples: Ripple[] = [];

    const renderFrame = (now: number) => {
      ripples = ripples.filter((r) => now - r.start < RIPPLE_DURATION);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = rawBg;
      ctx.fillRect(0, 0, width, height);

      const baseColor = withAlpha(rawFg, 0.15);
      const nearColor = withAlpha(rawAccent, 0.55);

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x0 = i * SPACING;
          const y0 = j * SPACING;

          let dx = 0;
          let dy = 0;
          let heat = 0;

          const pdx = x0 - pointer.x;
          const pdy = y0 - pointer.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pdist < WARP_RADIUS && pdist > 0.01) {
            const falloff = 1 - pdist / WARP_RADIUS;
            const push = falloff * falloff * WARP_STRENGTH;
            dx += (pdx / pdist) * push;
            dy += (pdy / pdist) * push;
            heat = Math.max(heat, falloff);
          }

          for (const r of ripples) {
            const age = now - r.start;
            const radius = age * RIPPLE_SPEED;
            const rdx = x0 - r.x;
            const rdy = y0 - r.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const band = Math.abs(rdist - radius);
            if (band < RIPPLE_BAND && rdist > 0.01) {
              const decay = 1 - age / RIPPLE_DURATION;
              const bandFalloff = 1 - band / RIPPLE_BAND;
              const push = bandFalloff * decay * RIPPLE_STRENGTH;
              dx += (rdx / rdist) * push;
              dy += (rdy / rdist) * push;
              heat = Math.max(heat, bandFalloff * decay);
            }
          }

          const x = x0 + dx;
          const y = y0 + dy;
          const radius = 1.1 + heat * 1.3;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = heat > 0.05 ? nearColor : baseColor;
          ctx.fill();
        }
      }
    };

    let animId = 0;

    if (reduceMotion) {
      renderFrame(performance.now());
    } else {
      const loop = (now: number) => {
        renderFrame(now);
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);

      const onPointerMove = (e: PointerEvent) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      };
      const onPointerLeave = () => {
        pointer.x = -9999;
        pointer.y = -9999;
      };
      const onPointerDown = (e: PointerEvent) => {
        ripples.push({ x: e.clientX, y: e.clientY, start: performance.now() });
        if (ripples.length > 6) ripples.shift();
      };
      const onResize = () => resize();

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("resize", onResize);

      const observer = new MutationObserver(readColors);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("resize", onResize);
        observer.disconnect();
      };
    }
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
