"use client";

export interface AreaSeries {
  label: string;
  color: string;
  data: number[];
}

interface AreaChartProps {
  xLabels: string[];
  series: AreaSeries[];
  yMax: number;
  yStep: number;
  className?: string;
}

/** Smooth cubic-bezier path through a list of points. */
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

const WIDTH = 600;
const HEIGHT = 300;
const PAD = { top: 16, right: 12, bottom: 28, left: 32 };

/** A small custom area chart — no chart library dependency, matches the site's theme tokens. */
export function AreaChart({ xLabels, series, yMax, yStep, className }: AreaChartProps) {
  const innerW = WIDTH - PAD.left - PAD.right;
  const innerH = HEIGHT - PAD.top - PAD.bottom;

  const xScale = (i: number) => PAD.left + (i / (xLabels.length - 1)) * innerW;
  const yScale = (v: number) => PAD.top + innerH - (v / yMax) * innerH;

  const gridValues: number[] = [];
  for (let v = 0; v <= yMax; v += yStep) gridValues.push(v);

  return (
    <div className={className}>
      <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        {series.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs font-medium text-foreground/90">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label}
          </div>
        ))}
      </div>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Research parameters over time">
        <defs>
          {series.map((s) => (
            <linearGradient key={s.label} id={`fill-${s.label.replace(/\s+/g, "-")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
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
              className="text-foreground/10"
              strokeWidth={1}
            />
            <text x={PAD.left - 8} y={yScale(v) + 3} textAnchor="end" className="fill-foreground/70" fontSize={9}>
              {v}
            </text>
          </g>
        ))}

        {/* X labels */}
        {xLabels.map((label, i) => (
          <text
            key={label}
            x={xScale(i)}
            y={HEIGHT - PAD.bottom + 16}
            textAnchor="middle"
            className="fill-foreground/75"
            fontSize={10}
          >
            {label}
          </text>
        ))}

        {/* Series: area fill + smooth line */}
        {series.map((s) => {
          const points: [number, number][] = s.data.map((v, i) => [xScale(i), yScale(v)]);
          const line = smoothLine(points);
          const area = `${line} L ${xScale(points.length - 1)},${yScale(0)} L ${xScale(0)},${yScale(0)} Z`;
          return (
            <g key={s.label}>
              <path d={area} fill={`url(#fill-${s.label.replace(/\s+/g, "-")})`} />
              <path d={line} fill="none" stroke={s.color} strokeWidth={2} strokeLinecap="round" />
              {points.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={2.5} fill={s.color} />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
