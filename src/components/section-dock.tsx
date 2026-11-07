"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { PiEnvelopeSimpleDuotone, PiListDuotone } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export type DockIcon = ComponentType<{ className?: string; strokeWidth?: number }>;

export interface DockSection<T extends string> {
  id: T;
  label: string;
  icon: DockIcon;
  /** Tailwind text-color classes for this item's icon (and its active highlight). */
  color?: string;
}

interface SectionDockProps<T extends string> {
  sections: DockSection<T>[];
  active: T;
  onSelect: (id: T) => void;
  onContact: () => void;
}

const BASE = 36;
const MAGNIFIED = 48;
const REACH = 110;
/** Scroll distance (px) after which the bar folds into a single button. */
const COLLAPSE_AT = 120;

function useMagnify(mouseX: MotionValue<number>) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    return rect ? x - (rect.left + rect.width / 2) : Infinity;
  });
  const size = useSpring(useTransform(distance, [-REACH, 0, REACH], [BASE, MAGNIFIED, BASE]), {
    mass: 0.1,
    stiffness: 180,
    damping: 14,
  });
  return { ref, size };
}

function DockTile({
  mouseX,
  label,
  icon: Icon,
  color = "text-foreground/70",
  active,
  onClick,
}: {
  mouseX: MotionValue<number>;
  label: string;
  icon: DockIcon;
  color?: string;
  active?: boolean;
  onClick: () => void;
}) {
  const { ref, size } = useMagnify(mouseX);

  return (
    <motion.div ref={ref} style={{ width: size }} className="flex flex-col items-center">
      <motion.button
        type="button"
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        aria-label={label}
        style={{ width: size, height: size }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "relative flex items-center justify-center rounded-xl transition-transform duration-300 hover:scale-105",
          color,
        )}
      >
        {active && (
          <motion.span
            layoutId="dock-active"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute inset-0 rounded-xl bg-current/12 ring-1 ring-current/30 shadow-[0_0_20px_-6px_currentColor]"
          />
        )}
        <Icon className="relative h-[56%] w-[56%]" strokeWidth={1.8} />
      </motion.button>
      <span
        className={cn(
          "mt-0.5 whitespace-nowrap text-[8px] uppercase tracking-normal transition-colors sm:text-[9px] sm:tracking-[0.06em]",
          active ? color : "text-foreground/55",
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}

export function SectionDock<T extends string>({
  sections,
  active,
  onSelect,
  onContact,
}: SectionDockProps<T>) {
  const mouseX = useMotionValue(Infinity);
  const navRef = useRef<HTMLElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isCollapsed = window.scrollY > COLLAPSE_AT;
      setCollapsed(isCollapsed);
      if (!isCollapsed) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const expanded = !collapsed || open;

  return (
    <>
      <motion.nav
        ref={navRef}
        aria-label="Sections"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {expanded ? (
            <motion.div
              key="bar"
              initial={{ opacity: 0, scale: 0.92, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onMouseMove={(e) => mouseX.set(e.clientX)}
              onMouseLeave={() => mouseX.set(Infinity)}
              className="glass pointer-events-auto flex items-start gap-5 rounded-3xl px-4 pb-2 pt-2 sm:gap-10 sm:px-7"
            >
              {sections.map((s) => (
                <DockTile
                  key={s.id}
                  mouseX={mouseX}
                  label={s.label}
                  icon={s.icon}
                  color={s.color}
                  active={s.id === active}
                  onClick={() => {
                    onSelect(s.id);
                    setOpen(false);
                  }}
                />
              ))}

              <DockTile
                mouseX={mouseX}
                label="Contact"
                icon={PiEnvelopeSimpleDuotone}
                color="text-emerald-500 dark:text-emerald-400"
                onClick={() => {
                  onContact();
                  setOpen(false);
                }}
              />
            </motion.div>
          ) : (
            <motion.button
              key="pill"
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="glass pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full text-blue-500 dark:text-blue-400"
            >
              <PiListDuotone className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        className="glass fixed right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full sm:right-5 sm:h-11 sm:w-11"
        style={{ top: "calc(env(safe-area-inset-top, 0px) + 1rem)" }}
      >
        <ThemeToggle />
      </motion.div>
    </>
  );
}
