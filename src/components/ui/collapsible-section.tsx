"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiCaretDownBold } from "react-icons/pi";

/**
 * A full-width heading bar that folds its content away. Collapsed by default;
 * the content is only mounted while open.
 */
export function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-6xl px-5 py-2 md:px-10 md:py-5">
        <h2>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group glass flex w-full items-center justify-between rounded-3xl px-6 py-5 text-left transition-shadow hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.45)] md:px-8 md:py-6"
          >
            <span className="font-heading text-xl uppercase tracking-[0.14em] text-foreground sm:text-2xl sm:tracking-[0.2em] md:text-3xl">
              {title}
            </span>
            <span
              aria-hidden
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:bg-primary/15 ${
                open ? "rotate-180" : ""
              }`}
            >
              <PiCaretDownBold className="h-5 w-5" />
            </span>
          </button>
        </h2>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
