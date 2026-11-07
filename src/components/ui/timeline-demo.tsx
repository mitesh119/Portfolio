import { Timeline, type TimelineEntry } from "@/components/ui/timeline";

const data: TimelineEntry[] = [
  {
    year: "2026",
    headline: "Coating research takes the stage",
    summary:
      "The coating work took the biggest stage yet this year, earning a national presentation and a spot among the semi-finalists at Asian Paints.",
    items: [
      {
        kind: "award",
        text: "Best Oral Presentation — ICCMR-2026, Nagaland University, on multifunctional coating design for metal surfaces",
      },
      {
        kind: "award",
        text: "Semi-finalist — Asian Paints Alchemy Conclave 2026, on the same coating research",
      },
      { kind: "education", text: "Currently holding a 9.25 CGPA in the PhD program" },
    ],
  },
  {
    year: "2025",
    headline: "Fellowship, workshops, and a hockey stick",
    summary:
      "A year that stretched beyond the lab — a coating-simulation semi-final, a hands-on workshop in granular dynamics, and a run to the Inter IIT Sports Championship with the hockey team.",
    items: [
      {
        kind: "award",
        text: (
          <>
            Semi-finalist — Asian Paints Alchemy Conclave 2025, on &quot;PFOTS as a Smart Coating
            Material&quot;
          </>
        ),
      },
      {
        kind: "training",
        text: "Completed a two-day workshop on DEM Simulation of Granular Materials (ANRF-sponsored)",
      },
      {
        kind: "role",
        text: "Research Ambassador, Springer Nature, and Campus Ambassador, Asian Paints — both roles ongoing",
      },
      {
        kind: "sport",
        text: "Hockey team, Inter IIT Sports Championship 2025 at IIT Hyderabad; also won the IYSC and the Intra Ropar Cricket Championship at IIT Ropar",
      },
    ],
  },
  {
    year: "2024",
    headline: "First award as a scholar",
    summary:
      "First award as a PhD scholar, a hands-on DFT workshop in Delhi, and two ambassadorships that opened up the following two years of work.",
    items: [
      {
        kind: "award",
        text: "Best Poster Award — NC-ECFCS-2024, Manipur University, on atmospheric water harvesting nanomaterials",
      },
      {
        kind: "training",
        text: "Completed hands-on training in DFT computation using Gaussian, Centre for Advanced Computational Research, Delhi",
      },
      { kind: "role", text: "Appointed Research Ambassador, Springer Nature" },
      { kind: "role", text: "Appointed Campus Ambassador, Asian Paints" },
    ],
  },
  {
    year: "2023",
    headline: "From the classroom to IIT Ropar",
    summary:
      "The bridge year — still tutoring chemistry back home, then a short stint teaching, before the move to Ropar to start a PhD in Chemical Engineering.",
    items: [
      { kind: "role", text: "Chemistry Teacher, Northfield School, Nagaland (Feb–Jun 2023)" },
      { kind: "role", text: "Chemistry Tutor, All Manipur Students Union (2021–2023)" },
      {
        kind: "education",
        text: "Joined IIT Ropar's PhD program in Chemical Engineering, July 2023, as a DST-INSPIRE Senior Research Fellow",
      },
      { kind: "education", text: "Began work under Dr. Santosh Kumar Meena" },
    ],
  },
  {
    year: "2022",
    headline: "Top of the class, twice",
    summary: "Finished the Master's at the top of the class, twice over.",
    items: [
      { kind: "education", text: "MSc in Chemistry, Manipur University" },
      { kind: "award", text: "Gold Medal — top of class" },
      { kind: "award", text: "Governor's Gold Medal" },
    ],
  },
  {
    year: "2020",
    headline: "Where it started",
    summary: "Where it started — a Bachelor's in Chemistry, finished top of the class.",
    items: [
      { kind: "education", text: "BSc in Chemistry, Nagaland University" },
      { kind: "award", text: "Gold Medal — top of class" },
    ],
  },
];

export function TimelineDemo() {
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
