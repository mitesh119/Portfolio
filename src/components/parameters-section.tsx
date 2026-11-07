"use client";

import { ResearchOutput } from "@/components/research-output";
import { GlobePulse, type GlobeMarker } from "@/components/ui/globe-pulse";
import { CollaboratorsMarquee } from "@/components/collaborators-marquee";

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
 * Two-panel dashboard: headline research figures with a citations-per-year
 * chart on the left, and a rotating globe marking collaborator locations,
 * with the collaborating institutions' logos beneath it, on the right.
 * Globe built with cobe (see "Globe Pulse", cobe/shuding), restyled with
 * the site's theme tokens.
 */
export function ParametersSection() {
  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-5 md:grid-cols-2">
        {/* Left — headline figures and citations per year */}
        <div className="flex flex-col glass rounded-3xl p-6 md:p-8">
          <ResearchOutput />
        </div>

        {/* Right — globe with the collaborating institutions' logos beneath it */}
        <div className="flex flex-col glass rounded-3xl p-6 md:p-8">
          <div className="flex flex-1 items-center justify-center">
            <GlobePulse markers={markers} className="relative mx-auto w-full max-w-[220px]" />
          </div>
          <div className="mt-6">
            <CollaboratorsMarquee />
          </div>
        </div>
    </div>
  );
}
