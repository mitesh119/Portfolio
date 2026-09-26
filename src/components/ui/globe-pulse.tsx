"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export interface GlobeMarker {
  location: [number, number];
  label: string;
  size?: number;
}

interface GlobePulseProps {
  markers: GlobeMarker[];
  className?: string;
}

/**
 * A rotating dotted globe (cobe, MIT — github.com/shuding/cobe) with markers
 * that pulse in size at each location, styled to the site's blue/red theme.
 * cobe v2 has no onRender hook, so the rotation + pulse loop is driven here
 * via requestAnimationFrame, calling globe.update() every frame. A
 * ResizeObserver (rather than a one-time offsetWidth read) makes sure the
 * globe still sizes correctly if the canvas is 0×0 at the moment it mounts.
 */
export function GlobePulse({ markers, className }: GlobePulseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let phi = 0;
    let frameId = 0;

    const loop = () => {
      if (!globe) return;
      phi += 0.0032;
      const t = performance.now() / 1000;
      globe.update({
        phi,
        markers: markers.map((m, i) => ({
          location: m.location,
          size: (m.size ?? 0.06) + Math.abs(Math.sin(t * 1.6 + i * 1.1)) * 0.045,
        })),
      });
      frameId = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width;
      if (newWidth <= 0) return;
      width = newWidth;

      if (!globe) {
        globe = createGlobe(canvas, {
          devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
          width: width * 2,
          height: width * 2,
          phi: 0,
          theta: 0.32,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 5.5,
          baseColor: [0.32, 0.36, 0.48],
          markerColor: [0.86, 0.15, 0.15],
          glowColor: [0.18, 0.36, 0.86],
          markers: markers.map((m) => ({ location: m.location, size: m.size ?? 0.06 })),
        });
        frameId = requestAnimationFrame(loop);
      } else {
        globe.update({ width: width * 2, height: width * 2 });
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      globe?.destroy();
    };
  }, [markers]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "auto", aspectRatio: 1, contain: "layout paint size" }}
      />
    </div>
  );
}
