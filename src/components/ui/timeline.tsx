"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { IconType } from "react-icons";
import {
  PiBriefcaseDuotone,
  PiChalkboardTeacherDuotone,
  PiGraduationCapDuotone,
  PiPersonSimpleRunDuotone,
  PiTrophyDuotone,
} from "react-icons/pi";
import { CollapsibleSection } from "@/components/ui/collapsible-section";

export type TimelineKind = "award" | "education" | "role" | "training" | "sport";

export interface TimelineItem {
  kind: TimelineKind;
  text: ReactNode;
}

export interface TimelineEntry {
  year: string;
  headline: string;
  summary: string;
  items: TimelineItem[];
}

const kinds: Record<TimelineKind, { icon: IconType; label: string; color: string }> = {
  award: { icon: PiTrophyDuotone, label: "Award", color: "text-amber-500 dark:text-amber-400" },
  education: {
    icon: PiGraduationCapDuotone,
    label: "Education",
    color: "text-blue-500 dark:text-blue-400",
  },
  role: { icon: PiBriefcaseDuotone, label: "Role", color: "text-violet-500 dark:text-violet-400" },
  training: {
    icon: PiChalkboardTeacherDuotone,
    label: "Training",
    color: "text-emerald-500 dark:text-emerald-400",
  },
  sport: {
    icon: PiPersonSimpleRunDuotone,
    label: "Sport",
    color: "text-red-500 dark:text-red-400",
  },
};

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: Math.min(index, 2) * 0.05 }}
      className="relative pl-10 md:pl-14"
    >
      {/* Node on the rail */}
      <span
        aria-hidden
        className="absolute left-0 top-7 flex h-[18px] w-[18px] -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:top-8"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      </span>

      <article className="glass rounded-3xl p-5 md:p-7">
        <header className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium tracking-[0.15em] text-primary">
            {entry.year}
          </span>
          <h3 className="text-xl text-foreground md:text-2xl">{entry.headline}</h3>
        </header>

        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70 md:text-base">
          {entry.summary}
        </p>

        <ul className="mt-5 grid gap-3">
          {entry.items.map((item, i) => {
            const { icon: Icon, label, color } = kinds[item.kind];
            return (
              <li key={i} className="flex items-start gap-3">
                <span
                  title={label}
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-current/12 ${color}`}
                >
                  <Icon className="h-4 w-4" aria-label={label} />
                </span>
                <span className="text-sm leading-relaxed text-foreground/90 md:text-[0.95rem]">
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>
      </article>
    </motion.li>
  );
}

function TimelineBody({ data }: { data: TimelineEntry[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  return (
    <div className="pt-8 md:pt-10">
      <p className="max-w-2xl text-base leading-relaxed text-foreground/75 md:text-lg">
        I&apos;ve been working on my startup{" "}
        <a
          href="#nimbusmd"
          className="text-red-600 underline-offset-4 hover:underline dark:text-red-500"
        >
          NimbusMD
        </a>{" "}
        for the last year.
      </p>

      <div className="relative ml-[9px] mt-10">
        {/* Rail and scroll-driven progress line */}
        <span
          aria-hidden
          className="absolute bottom-0 left-0 top-0 w-px -translate-x-1/2 bg-foreground/15"
        />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-0 top-0 w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-primary to-primary/30"
        />

        <ol ref={listRef} className="relative space-y-8 md:space-y-10">
          {data.map((entry, index) => (
            <TimelineCard key={entry.year} entry={entry} index={index} />
          ))}
        </ol>
      </div>
    </div>
  );
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => (
  <CollapsibleSection title="Timeline">
    <TimelineBody data={data} />
  </CollapsibleSection>
);
