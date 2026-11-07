"use client";

import { useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";

export interface AreaSeries {
  label: string;
  color: string;
  data: number[];
}

interface AreaChartProps {
  xLabels: string[];
  series: AreaSeries[];
  /** Highest gridline; defaults to the next multiple of `yStep` above the data. */
  yMax?: number;
  yStep?: number;
  className?: string;
}

/** Smooth path through a list of points (flat handles, so it never overshoots the data). */
function smoothLine(points: [number, number][]): string {
  if (points.length === 0) return "";
  let d = `M ${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return d;
}

const PAD = { top: 20, right: 40, bottom: 30, left: 36 };

/**
 * A small custom area chart (no chart library), drawn in the site's theme tokens.
 * Hover or tap to read exact values for a year; the last value of each series is
 * labelled directly on the chart.
 */
export function AreaChart({ xLabels, series, yMax, yStep = 10, className }: AreaChartProps) {
  const uid = useId().replace(/:/g, "");
  const [active, setActive] = useState<number | null>(null);

  // Draw at the container's real pixel width so text stays readable on narrow screens.
  const wrapRef = useRef<HTMLDivElement>(null);
  const [WIDTH, setWidth] = useState(600);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(260, Math.round(entry.contentRect.width)));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const HEIGHT = Math.round(Math.min(280, Math.max(200, WIDTH * 0.5)));

  const innerW = WIDTH - PAD.left - PAD.right;
  const innerH = HEIGHT - PAD.top - PAD.bottom;
  const last = xLabels.length - 1;

  const dataMax = Math.max(...series.flatMap((s) => s.data));
  const top = yMax ?? Math.max(yStep, Math.ceil((dataMax * 1.08) / yStep) * yStep);

  const xScale = (i: number) => PAD.left + (i / last) * innerW;
  const yScale = (v: number) => PAD.top + innerH - (v / top) * innerH;

  const gridValues: number[] = [];
  for (let v = 0; v <= top; v += yStep) gridValues.push(v);

  const handlePointer = (e: PointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const idx = Math.round(((x - PAD.left) / innerW) * last);
    setActive(Math.min(last, Math.max(0, idx)));
  };

  // End labels: keep them from colliding when final values are close together.
  const endLabels = series
    .map((s) => ({ s, y: yScale(s.data[last]) }))
    .sort((a, b) => a.y - b.y);
  for (let i = 1; i < endLabels.length; i++) {
    if (endLabels[i].y - endLabels[i - 1].y < 13) endLabels[i].y = endLabels[i - 1].y + 13;
  }

  return (
    <div className={className}>
      <ul className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
        {series.map((s) => (
          <li key={s.label} className="flex items-center gap-1.5 text-xs text-foreground/80">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>

      <div ref={wrapRef} className="relative">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full touch-pan-y"
          role="img"
          aria-label={`Cumulative totals by year. ${series
            .map((s) => `${s.label}: ${s.data.map((v, i) => `${xLabels[i]} ${v}`).join(", ")}`)
            .join(". ")}`}
          onPointerMove={handlePointer}
          onPointerDown={handlePointer}
          onPointerLeave={() => setActive(null)}
        >
          <defs>
            {series.map((s, i) => (
              <linearGradient key={s.label} id={`${uid}-fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity={0.22} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          {/* Gridlines + y labels */}
          {gridValues.map((v) => (
            <g key={v}>
              <line
                x1={PAD.left}
                x2={WIDTH - PAD.right}
                y1={yScale(v)}
                y2={yScale(v)}
                stroke="currentColor"
                className={v === 0 ? "text-foreground/25" : "text-foreground/10"}
                strokeWidth={1}
                strokeDasharray={v === 0 ? undefined : "3 4"}
              />
              <text
                x={PAD.left - 8}
                y={yScale(v) + 4}
                textAnchor="end"
                className="fill-foreground/60"
                fontSize={11}
              >
                {v}
              </text>
            </g>
          ))}

          {/* X labels */}
          {xLabels.map((label, i) => (
            <text
              key={label}
              x={xScale(i)}
              y={HEIGHT - PAD.bottom + 20}
              textAnchor="middle"
              className={active === i ? "fill-foreground" : "fill-foreground/65"}
              fontSize={12}
            >
              {label}
            </text>
          ))}

          {/* Hover guide */}
          {active !== null && (
            <line
              x1={xScale(active)}
              x2={xScale(active)}
              y1={PAD.top}
              y2={yScale(0)}
              stroke="currentColor"
              className="text-foreground/30"
              strokeWidth={1}
            />
          )}

          {/* Series: area fill + smooth line + points */}
          {series.map((s, si) => {
            const points: [number, number][] = s.data.map((v, i) => [xScale(i), yScale(v)]);
            const line = smoothLine(points);
            const area = `${line} L ${xScale(last)},${yScale(0)} L ${xScale(0)},${yScale(0)} Z`;
            return (
              <g key={s.label}>
                <motion.path
                  d={area}
                  fill={`url(#${uid}-fill-${si})`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, delay: 0.3 + si * 0.1 }}
                />
                <motion.path
                  d={line}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: si * 0.12 }}
                />
                {points.map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={active === i ? 5 : 3.5}
                    fill={s.color}
                    stroke="var(--card)"
                    strokeWidth={1.5}
                    style={{ transition: "r 150ms" }}
                  />
                ))}
              </g>
            );
          })}

          {/* Direct labels for the final value of each series */}
          {endLabels.map(({ s, y }) => (
            <text
              key={s.label}
              x={xScale(last) + 11}
              y={y + 4}
              fill={s.color}
              fontSize={12}
              className="font-medium"
            >
              {s.data[last]}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        {active !== null && (
          <div
            className="pointer-events-none absolute top-0 z-10 w-36 -translate-x-1/2 rounded-xl border border-border bg-popover/95 p-3 text-xs shadow-lg backdrop-blur"
            style={{
              left: `${Math.min(86, Math.max(14, (xScale(active) / WIDTH) * 100))}%`,
            }}
          >
            <p className="font-mono tracking-[0.15em] text-foreground/60">{xLabels[active]}</p>
            <ul className="mt-2 space-y-1.5">
              {series.map((s) => (
                <li key={s.label} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-foreground/80">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.label}
                  </span>
                  <span className="tabular-nums text-foreground">{s.data[active]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
