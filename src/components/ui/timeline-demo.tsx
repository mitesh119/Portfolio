import type { RefObject } from "react";
import { Timeline } from "@/components/ui/timeline";
import { TimelineImageSlot } from "@/components/ui/timeline-image-slot";
import { PointDot } from "@/components/ui/point-dot";

function Point({ children }: { children: React.ReactNode }) {
  return (
    <div className="group flex items-start gap-3 text-foreground/90 text-xs md:text-sm">
      <PointDot />
      <span>{children}</span>
    </div>
  );
}

export function TimelineDemo({
  scrollContainerRef,
}: {
  /** Scrollable ancestor to track instead of the window (e.g. a modal's own scroll area). */
  scrollContainerRef?: RefObject<HTMLElement | null>;
} = {}) {
  const data = [
    {
      title: "2026",
      scrub: {
        headline: "Coating research takes the stage",
        description: "Best Oral Presentation at ICCMR-2026, and a semi-final finish at the Asian Paints Alchemy Conclave.",
      },
      content: (
        <div>
          <p className="text-foreground/95 text-xs md:text-sm font-normal mb-8">
            The coating work took the biggest stage yet this year, earning a
            national presentation and a spot among the semi-finalists at
            Asian Paints.
          </p>
          <div className="mb-8 space-y-2">
            <Point>
              Best Oral Presentation — ICCMR-2026, Nagaland University, on
              multifunctional coating design for metal surfaces
            </Point>
            <Point>
              Semi-finalist — Asian Paints Alchemy Conclave 2026, on the same
              coating research
            </Point>
            <Point>Currently holding a 9.25 CGPA in the PhD program</Point>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TimelineImageSlot
              src="/images/timeline/2026-1.jpg"
              alt="ICCMR-2026 oral presentation"
            />
            <TimelineImageSlot
              src="/images/timeline/2026-2.jpg"
              alt="Asian Paints Alchemy Conclave 2026"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      scrub: {
        headline: "Fellowship, workshops, and a hockey stick",
        description: "Semi-finalist at Asian Paints Alchemy 2025, a granular-simulation workshop, and an Inter IIT hockey run.",
      },
      content: (
        <div>
          <p className="text-foreground/95 text-xs md:text-sm font-normal mb-8">
            A year that stretched beyond the lab — a coating-simulation
            semi-final, a hands-on workshop in granular dynamics, and a run to
            the Inter IIT Sports Championship with the hockey team.
          </p>
          <div className="mb-8 space-y-2">
            <Point>
              Semi-finalist — Asian Paints Alchemy Conclave 2025, on
              &quot;PFOTS as a Smart Coating Material&quot;
            </Point>
            <Point>
              Completed a two-day workshop on DEM Simulation of Granular
              Materials (ANRF-sponsored)
            </Point>
            <Point>
              Research Ambassador, Springer Nature, and Campus Ambassador,
              Asian Paints — both roles ongoing
            </Point>
            <Point>
              Hockey team, Inter IIT Sports Championship 2025 at IIT
              Hyderabad; also won the IYSC and the Intra Ropar Cricket
              Championship at IIT Ropar
            </Point>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TimelineImageSlot
              src="/images/timeline/2025-1.jpg"
              alt="Asian Paints Alchemy Conclave 2025"
            />
            <TimelineImageSlot
              src="/images/timeline/2025-2.jpg"
              alt="Springer Nature Research Ambassador"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      scrub: {
        headline: "First award as a scholar",
        description: "Best Poster Award at NC-ECFCS-2024, a DFT workshop in Delhi, and two ambassadorships begin.",
      },
      content: (
        <div>
          <p className="text-foreground/95 text-xs md:text-sm font-normal mb-8">
            First award as a PhD scholar, a hands-on DFT workshop in Delhi,
            and two ambassadorships that opened up the following two years of
            work.
          </p>
          <div className="mb-8 space-y-2">
            <Point>
              Best Poster Award — NC-ECFCS-2024, Manipur University, on
              atmospheric water harvesting nanomaterials
            </Point>
            <Point>
              Completed hands-on training in DFT computation using Gaussian,
              Centre for Advanced Computational Research, Delhi
            </Point>
            <Point>Appointed Research Ambassador, Springer Nature</Point>
            <Point>Appointed Campus Ambassador, Asian Paints</Point>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TimelineImageSlot
              src="/images/timeline/2024-1.jpg"
              alt="Best Poster Award, NC-ECFCS-2024"
            />
            <TimelineImageSlot
              src="/images/timeline/2024-2.jpg"
              alt="Manipur University, 2024"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      scrub: {
        headline: "From the classroom to IIT Ropar",
        description: "Taught chemistry in Nagaland, then joined IIT Ropar's PhD program on a DST-INSPIRE fellowship.",
      },
      content: (
        <div>
          <p className="text-foreground/95 text-xs md:text-sm font-normal mb-8">
            The bridge year — still tutoring chemistry back home, then a short
            stint teaching, before the move to Ropar to start a PhD in
            Chemical Engineering.
          </p>
          <div className="mb-8 space-y-2">
            <Point>Chemistry Teacher, Northfield School, Nagaland (Feb–Jun 2023)</Point>
            <Point>Chemistry Tutor, All Manipur Students Union (2021–2023)</Point>
            <Point>
              Joined IIT Ropar&apos;s PhD program in Chemical Engineering,
              July 2023, as a DST-INSPIRE Senior Research Fellow
            </Point>
            <Point>Began work under Dr. Santosh Kumar Meena</Point>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TimelineImageSlot
              src="/images/timeline/2023-1.jpg"
              alt="Joining IIT Ropar, 2023"
            />
            <TimelineImageSlot
              src="/images/timeline/2023-2.jpg"
              alt="IIT Ropar campus"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      scrub: {
        headline: "Top of the class, twice",
        description: "MSc in Chemistry from Manipur University, with the Gold Medal and the Governor's Gold Medal.",
      },
      content: (
        <div>
          <p className="text-foreground/95 text-xs md:text-sm font-normal mb-8">
            Finished the Master&apos;s at the top of the class, twice over.
          </p>
          <div className="mb-8 space-y-2">
            <Point>MSc in Chemistry, Manipur University</Point>
            <Point>Gold Medal — top of class</Point>
            <Point>Governor&apos;s Gold Medal</Point>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TimelineImageSlot
              src="/images/timeline/2022-1.jpg"
              alt="MSc convocation, Manipur University"
            />
            <TimelineImageSlot
              src="/images/timeline/2022-2.jpg"
              alt="Governor's Gold Medal"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2020",
      scrub: {
        headline: "Where it started",
        description: "BSc in Chemistry from Nagaland University, Gold Medal, top of the class.",
      },
      content: (
        <div>
          <p className="text-foreground/95 text-xs md:text-sm font-normal mb-8">
            Where it started — a Bachelor&apos;s in Chemistry, finished top of
            the class.
          </p>
          <div className="mb-8 space-y-2">
            <Point>BSc in Chemistry, Nagaland University</Point>
            <Point>Gold Medal — top of class</Point>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TimelineImageSlot
              src="/images/timeline/2020-1.jpg"
              alt="BSc convocation, Nagaland University"
            />
            <TimelineImageSlot
              src="/images/timeline/2020-2.jpg"
              alt="Nagaland University"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} scrollContainerRef={scrollContainerRef} />
    </div>
  );
}
