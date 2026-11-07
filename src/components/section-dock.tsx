"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Mail, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export interface DockSection<T extends string> {
  id: T;
  label: string;
  icon: LucideIcon;
}

interface SectionDockProps<T extends string> {
  sections: DockSection<T>[];
  active: T;
  onSelect: (id: T) => void;
  onContact: () => void;
}

const BASE = 48;
const MAGNIFIED = 64;
const REACH = 140;

function useMagnify(mouseX: MotionValue<number>) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    return rect ? x - (rect.left + rect.width / 2) : Infinity;
  });
  const size = useSpring(
    useTransform(distance, [-REACH, 0, REACH], [BASE, MAGNIFIED, BASE]),
    { mass: 0.1, stiffness: 180, damping: 14 }
  );
  return { ref, size };
}

function DockTile({
  mouseX,
  label,
  icon: Icon,
  active,
  onClick,
}: {
  mouseX: MotionValue<number>;
  label: string;
  icon: LucideIcon;
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
          "relative flex items-center justify-center rounded-2xl transition-colors duration-300",
          active ? "text-primary" : "text-foreground/70 hover:text-foreground"
        )}
      >
        {active && (
          <motion.span
            layoutId="dock-active"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute inset-0 rounded-2xl bg-primary/12 ring-1 ring-primary/25 shadow-[0_0_24px_-4px_rgba(59,130,246,0.55)]"
          />
        )}
        <Icon className="relative h-[42%] w-[42%]" strokeWidth={1.8} />
      </motion.button>
      <span
        className={cn(
          "mt-0.5 whitespace-nowrap text-[9px]  uppercase tracking-normal transition-colors sm:text-[10px] sm:tracking-[0.06em]",
          active ? "text-primary" : "text-foreground/55"
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

  return (
    <motion.nav
      aria-label="Sections"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className="fixed inset-x-0 z-50 flex justify-center px-4"
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass flex items-end gap-1 rounded-[1.75rem] px-2 pb-2 pt-2.5 sm:gap-3 sm:px-3"
      >
        {sections.map((s) => (
          <DockTile
            key={s.id}
            mouseX={mouseX}
            label={s.label}
            icon={s.icon}
            active={s.id === active}
            onClick={() => onSelect(s.id)}
          />
        ))}

        <span aria-hidden className="mx-0.5 mb-5 h-8 w-px self-center bg-foreground/15" />

        <DockTile mouseX={mouseX} label="Contact" icon={Mail} onClick={onContact} />
        <div className="flex flex-col items-center" style={{ width: BASE }}>
          <div className="flex items-center justify-center" style={{ height: BASE }}>
            <ThemeToggle />
          </div>
          <span className="mt-0.5 text-[10px]  uppercase tracking-[0.06em] text-foreground/55">
            Theme
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
