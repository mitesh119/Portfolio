"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { Briefcase, Route, UserRound } from "lucide-react";
import { SectionDock, type DockSection } from "@/components/section-dock";
import { ContactModal } from "@/components/contact-modal";
import { SiteFooter } from "@/components/site-footer";
import { WorkSection } from "@/components/sections/work-section";
import { AboutSection } from "@/components/sections/about-section";
import { CareerSection } from "@/components/sections/career-section";

type SectionId = "work" | "about" | "career";

const sections: DockSection<SectionId>[] = [
  { id: "work", label: "Work", icon: Briefcase },
  { id: "about", label: "About", icon: UserRound },
  { id: "career", label: "Career", icon: Route },
];

const order = sections.map((s) => s.id);
const DEFAULT_SECTION: SectionId = "about";

function isSectionId(value: string): value is SectionId {
  return (order as string[]).includes(value);
}

const EASE = [0.22, 1, 0.36, 1] as const;

interface Transition {
  dir: number;
  instant: boolean;
}

const settled = { opacity: 1, x: 0, scale: 1, filter: "none" };

const slide: Variants = {
  enter: ({ dir, instant }: Transition) =>
    instant ? settled : { opacity: 0, x: dir * 90, scale: 0.985, filter: "blur(14px)" },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
    // A lingering filter would trap position:fixed descendants (e.g. the carousel lightbox).
    transitionEnd: { filter: "none" },
  },
  exit: ({ dir, instant }: Transition) =>
    instant
      ? { opacity: 0, transition: { duration: 0 } }
      : {
          opacity: 0,
          x: dir * -90,
          scale: 0.985,
          filter: "blur(14px)",
          transition: { duration: 0.3, ease: EASE },
        },
};

const fade: Variants = {
  enter: ({ instant }: Transition) => ({ opacity: instant ? 1 : 0 }),
  center: { opacity: 1, transition: { duration: 0.25 } },
  exit: ({ instant }: Transition) => ({ opacity: 0, transition: { duration: instant ? 0 : 0.15 } }),
};

export function HomeClient() {
  const [view, setView] = useState<{ id: SectionId } & Transition>({
    id: DEFAULT_SECTION,
    dir: 0,
    instant: true,
  });
  const [contactOpen, setContactOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const show = useCallback((id: SectionId, instant = false) => {
    setView((prev) =>
      prev.id === id
        ? prev
        : { id, instant, dir: Math.sign(order.indexOf(id) - order.indexOf(prev.id)) }
    );
  }, []);

  const select = useCallback((id: SectionId) => {
    if (window.location.hash.slice(1) === id) return;
    window.location.hash = id;
  }, []);

  useEffect(() => {
    const sync = (instant = false) => {
      const hash = window.location.hash.slice(1);
      show(isSectionId(hash) ? hash : DEFAULT_SECTION, instant);
    };
    const onHashChange = () => sync();
    sync(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [show]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (contactOpen || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!step) return;
      const next = order[order.indexOf(view.id) + step];
      if (next) select(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contactOpen, view.id, select]);

  return (
    <>
      <main className="relative flex-1 overflow-x-clip">
        <AnimatePresence
          mode="wait"
          custom={view}
          initial={false}
          onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
        >
          <motion.div
            key={view.id}
            custom={view}
            variants={reduceMotion ? fade : slide}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {view.id === "work" && <WorkSection />}
            {view.id === "about" && <AboutSection />}
            {view.id === "career" && <CareerSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      <div className="pb-28">
        <SiteFooter />
      </div>

      <SectionDock
        sections={sections}
        active={view.id}
        onSelect={select}
        onContact={() => setContactOpen(true)}
      />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
