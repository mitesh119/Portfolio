"use client";

import { AreaChart, type AreaSeries } from "@/components/ui/area-chart";
import { cumulativeResearchCounts } from "@/components/research-areas";

/* ------------------------------------------------------------------ *
 * Update when the Google Scholar profile changes (last: 7 Nov 2026).  *
 * Publications and co-authors are derived from the paper list itself. *
 * ------------------------------------------------------------------ */
/** Citations received in each calendar year, as Scholar reports them. */
const CITATIONS_PER_YEAR: Record<number, number> = { 2023: 0, 2024: 0, 2025: 5, 2026: 39 };

const YEARS = [2023, 2024, 2025, 2026];

const counts = cumulativeResearchCounts(YEARS);
let runningCitations = 0;
const citations = YEARS.map((year) => (runningCitations += CITATIONS_PER_YEAR[year] ?? 0));

const series: AreaSeries[] = [
  { label: "Publications", color: "#3b82f6", data: counts.map((c) => c.publications) },
  { label: "Citations", color: "#ef4444", data: citations },
  { label: "Co-authors", color: "#10b981", data: counts.map((c) => c.coauthors) },
];

/** Cumulative publications, citations and co-authors by year. */
export function ResearchOutput() {
  return <AreaChart xLabels={YEARS.map(String)} series={series} yStep={10} />;
}
