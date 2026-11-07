"use client";

import type { IconType } from "react-icons";
import { PiBriefcaseDuotone, PiGraduationCapDuotone, PiMedalDuotone } from "react-icons/pi";
import { motion } from "framer-motion";
import { TimelineDemo } from "@/components/ui/timeline-demo";
import { PointDot } from "@/components/ui/point-dot";
import { ConferenceTalks } from "@/components/research-areas";
import { SubHeading } from "@/components/sections/section-heading";
import { CollapsibleSection } from "@/components/ui/collapsible-section";

interface Entry {
  title: string;
  meta: string;
}

const columns: { icon: IconType; color: string; title: string; entries: Entry[] }[] = [
  {
    icon: PiGraduationCapDuotone,
    color: "text-blue-500 dark:text-blue-400",
    title: "Education",
    entries: [
      { title: "PhD, Chemical Engineering — IIT Ropar", meta: "2023 – present · DST-INSPIRE SRF · CGPA 9.25" },
      { title: "MSc, Chemistry — Manipur University", meta: "2022 · Gold Medal & Governor's Gold Medal" },
      { title: "BSc, Chemistry — Nagaland University", meta: "2020 · Gold Medal" },
    ],
  },
  {
    icon: PiBriefcaseDuotone,
    color: "text-violet-500 dark:text-violet-400",
    title: "Roles",
    entries: [
      { title: "Director & CEO, NimbusMD Private Limited", meta: "Nov 2026 – present" },
      { title: "Research Ambassador, Springer Nature", meta: "2024 – 2026" },
      { title: "Campus Ambassador, Asian Paints", meta: "2024 – 2026" },
      { title: "Chemistry Teacher, Northfield School, Nagaland", meta: "Feb – Jun 2023" },
      { title: "Chemistry Tutor, All Manipur Students Union", meta: "2021 – 2023" },
    ],
  },
  {
    icon: PiMedalDuotone,
    color: "text-amber-500 dark:text-amber-400",
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
    <div className="pt-6 md:pt-20">
      <CollapsibleSection title="The path so far">
        <div className="space-y-8 pt-5 md:space-y-14 md:pt-10">
          <p className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
            A foundation in chemistry, now applied to computational research on nanomaterials.
          </p>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {columns.map(({ icon: Icon, color, title, entries }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-current/12 ${color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg text-foreground">{title}</h3>
                </div>
                <ul className="mt-5 space-y-4">
                  {entries.map((e) => (
                    <li key={e.title} className="group flex gap-3">
                      <PointDot />
                      <div>
                        <p className="text-sm leading-snug text-foreground">{e.title}</p>
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
      </CollapsibleSection>

      <TimelineDemo />
    </div>
  );
}
