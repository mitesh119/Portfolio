"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelClassName?: string;
}

/**
 * A macOS-style swoop-in popup: blurred/dimmed backdrop, spring-animated panel,
 * esc/backdrop-click to close. Rendered via a portal directly onto <body>, so it
 * stacks correctly even when opened from inside another Modal (nested popups).
 */
export function Modal({ open, onClose, children, panelClassName }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-neutral-950/40 backdrop-blur-md"
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "fixed left-1/2 top-1/2 z-[61] flex -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-950",
              panelClassName
            )}
          >
            <DotPattern
              width={22}
              height={22}
              cr={1.4}
              className="-z-10 fill-neutral-400/70 [mask-image:radial-gradient(70%_60%_at_50%_0%,white,transparent)] dark:fill-neutral-600/70"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
