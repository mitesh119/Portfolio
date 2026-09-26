"use client";

import { Award, Briefcase, GraduationCap, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { TimelineDemo } from "@/components/ui/timeline-demo";
import { PointDot } from "@/components/ui/point-dot";
import { ConferenceTalks } from "@/components/research-areas";
import { SectionHeading, SubHeading } from "@/components/sections/section-heading";

interface Entry {
  title: string;
  meta: string;
}

const columns: { icon: LucideIcon; title: string; entries: Entry[] }[] = [
  {
    icon: GraduationCap,
    title: "Education",
    entries: [
      { title: "PhD, Chemical Engineering — IIT Ropar", meta: "2023 – present · DST-INSPIRE SRF · CGPA 9.25" },
      { title: "MSc, Chemistry — Manipur University", meta: "2022 · Gold Medal & Governor's Gold Medal" },
      { title: "BSc, Chemistry — Nagaland University", meta: "2020 · Gold Medal" },
    ],
  },
  {
    icon: Briefcase,
    title: "Roles",
    entries: [
      { title: "Research Ambassador, Springer Nature", meta: "2024 – 2026" },
      { title: "Campus Ambassador, Asian Paints", meta: "2024 – 2026" },
      { title: "Chemistry Teacher, Northfield School, Nagaland", meta: "Feb – Jun 2023" },
      { title: "Chemistry Tutor, All Manipur Students Union", meta: "2021 – 2023" },
    ],
  },
  {
    icon: Award,
    title: "Honors",
    entries: [
      { title: "Best Oral Presentation", meta: "ICCMR-2026, Nagaland University" },
      { title: "Semi-finalist, Asian Paints Alchemy Conclave", meta: "2025 & 2026" },
      { title: "Best Poster Award", meta: "NC-ECFCS-2024, Manipur University" },
      { title: "Gold Medals, BSc & MSc", meta: "Including the Governor's Gold Medal (2022)" },
    ],
  },
];

export function CareerSection() {
  return (
    <div className="pt-16 md:pt-24">
      <div className="mx-auto w-full max-w-6xl space-y-20 px-5 md:px-10">
        <SectionHeading eyebrow="Career" title="The path so far.">
          From gold medals in chemistry to simulating nanomaterials at IIT Ropar.
        </SectionHeading>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {columns.map(({ icon: Icon, title, entries }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass rounded-3xl p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="text-lg font-extrabold text-foreground">{title}</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {entries.map((e) => (
                  <li key={e.title} className="group flex gap-3">
                    <PointDot />
                    <div>
                      <p className="text-sm font-semibold leading-snug text-foreground">{e.title}</p>
                      <p className="mt-0.5 text-xs text-foreground/60">{e.meta}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div>
          <SubHeading>Conferences &amp; talks</SubHeading>
          <div className="mt-6">
            <ConferenceTalks />
          </div>
        </div>
      </div>

      <TimelineDemo />
    </div>
  );
}
