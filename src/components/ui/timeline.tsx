"use client";
import { useMotionValueEvent, useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  /** Short label shown in the scrubber card while this entry is active. */
  scrub?: {
    headline: string;
    description: string;
  };
}

const RAIL_TICKS = 48;

export const Timeline = ({
  data,
  scrollContainerRef,
}: {
  data: TimelineEntry[];
  /** Scrollable ancestor to track instead of the window (e.g. a modal's own scroll area). */
  scrollContainerRef?: RefObject<HTMLElement | null>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  const [activeTick, setActiveTick] = useState(0);

  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      data.length - 1,
      Math.max(0, Math.floor(latest * data.length))
    );
    setActiveIndex(idx);

    const tickIdx = Math.round(latest * (RAIL_TICKS - 1));
    setActiveTick(Math.min(RAIL_TICKS - 1, Math.max(0, tickIdx)));
  });

  const active = data[activeIndex];

  return (
    <div
      className="w-full font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 font-bold text-blue-600 dark:text-blue-400 max-w-4xl">
          Timeline of my journey
        </h2>
        <p className="text-foreground/90 text-sm md:text-base max-w-sm">
          I&apos;ve been working on my startup{" "}
          <span className="font-bold text-red-600 dark:text-red-500">NimbusMD</span> for the last year.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {/* Static vertical track behind all entries */}
        <div className="absolute left-8 top-0 h-full w-[2px] -translate-x-1/2 bg-neutral-200 dark:bg-neutral-800" />
        {/* Red beam that grows down the track as you scroll */}
        <motion.div
          style={{ height: beamHeight, opacity: beamOpacity }}
          className="absolute left-8 top-0 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-red-600 via-red-600 to-transparent dark:from-red-500 dark:via-red-500"
        />

        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="absolute left-3 md:left-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background">
                <span className="h-[3px] w-5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)] dark:bg-red-500" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-foreground/85 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-foreground/85">
                {item.title}
              </h3>
              <React.Fragment key={`content-${index}`}>{item.content}</React.Fragment>
            </div>
          </div>
        ))}

        {/* Scrubber: a tick-mark rail with a scroll-driven indicator and popup card */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 hidden md:block"
          aria-hidden="true"
        >
          <div className="sticky top-40 flex items-start gap-4">
            <div className="relative h-72 w-4">
              {Array.from({ length: RAIL_TICKS }).map((_, i) => {
                const isActive = i === activeTick;
                return (
                  <span
                    key={i}
                    className={cn(
                      "absolute left-0 -translate-y-1/2 rounded-full transition-all duration-150 ease-out",
                      isActive
                        ? "h-[2px] w-4 bg-red-600 dark:bg-red-500"
                        : "h-px w-2 bg-neutral-300 dark:bg-neutral-700"
                    )}
                    style={{ top: `${(i / (RAIL_TICKS - 1)) * 100}%` }}
                  />
                );
              })}
            </div>

            {active && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-56 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
              >
                <span className="text-xs font-bold text-red-600 dark:text-red-500">
                  {active.title}
                </span>
                {active.scrub && (
                  <>
                    <p className="mt-1 text-sm font-bold text-foreground">
                      {active.scrub.headline}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground/80">
                      {active.scrub.description}
                    </p>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
