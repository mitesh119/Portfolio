"use client";

import { AreaChart, type AreaSeries } from "@/components/ui/area-chart";
import { GlobePulse, type GlobeMarker } from "@/components/ui/globe-pulse";

// Years with a real milestone on record (from the CV / timeline / Scholar profile).
const years = ["2020", "2022", "2023", "2024", "2025", "2026"];

const series: AreaSeries[] = [
  { label: "Papers", color: "#3b82f6", data: [0, 0, 0, 3, 9, 15] },
  { label: "Citations", color: "#ef4444", data: [0, 0, 0, 0, 5, 44] },
  { label: "Achievements", color: "#10b981", data: [1, 3, 4, 5, 6, 8] },
  { label: "Collaborators", color: "#f59e0b", data: [0, 0, 1, 5, 18, 32] },
  { label: "Positions", color: "#8b5cf6", data: [0, 0, 0, 2, 2, 3] },
];

// Institution clusters for the 32 unique co-authors found across the 15
// Scholar-indexed papers (deduplicated by name), plus the 3 collaborators
// from the Collaborators page not yet co-authored on a Scholar paper.
const markers: GlobeMarker[] = [
  { location: [30.9679, 76.5271], label: "IIT Ropar — 10 co-authors", size: 0.11 },
  { location: [24.7594, 93.9426], label: "Manipur University — 8 co-authors", size: 0.098 },
  { location: [18.5593, 73.8078], label: "IISER Pune — Chandrakala Meena", size: 0.056 },
  { location: [23.2156, 72.6836], label: "IIT Gandhinagar — Karthik S. Pushpavanam, Tanu Tiwari", size: 0.07 },
  { location: [31.7756, 76.9668], label: "IIT Mandi — Amit Jaiswal", size: 0.056 },
  { location: [45.7578, 4.832], label: "Laboratoire de Chimie, Lyon, France — 4 co-authors", size: 0.08 },
  { location: [44.4949, 11.3426], label: "University of Bologna, Italy — Ivan Rivalta", size: 0.056 },
  { location: [45.6833, -73.4333], label: "INRS, Canada — Dongling Ma", size: 0.056 },
  { location: [42.7284, -73.6918], label: "Rensselaer Polytechnic Institute, USA", size: 0.056 },
  { location: [18.5308, 73.806], label: "NCL Pune", size: 0.056 },
  { location: [25.6751, 94.1086], label: "Nagaland University — Dr. Upasana Bora Sinha", size: 0.056 },
  { location: [25.6087, 91.8933], label: "NEHU, Shillong", size: 0.056 },
];

/**
 * Two-column dashboard: real research metrics charted over time on the
 * left, a rotating globe marking real collaborator locations on the right —
 * pattern borrowed from 21st.dev's "Area Chart" (SubframeApp) and "Globe
 * Pulse" (cobe/shuding) references, rebuilt with the site's own theme
 * tokens and real data. Collaborator count (32) is every unique co-author
 * across the 15 papers indexed on Google Scholar, deduplicated by name.
 */
export function ParametersSection() {
  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-5 md:grid-cols-2">
        {/* Left — area chart */}
        <div className="flex flex-col glass rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-foreground md:text-2xl">Output</h2>

          <AreaChart xLabels={years} series={series} yMax={50} yStep={10} />
        </div>

        {/* Right — globe */}
        <div className="flex flex-col glass rounded-3xl p-6 md:p-8">
          <h2 className="text-xl font-extrabold text-foreground md:text-2xl">Collaborator map</h2>
          <div className="flex flex-1 items-center justify-center">
            <GlobePulse markers={markers} className="relative mx-auto w-full max-w-[220px]" />
          </div>
        </div>
    </div>
  );
}
