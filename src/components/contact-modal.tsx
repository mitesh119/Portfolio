"use client";

import { Modal } from "@/components/ui/modal";

export const CONTACT_EMAIL = "miteshkumar.23chz0012@iitrpr.ac.in";

export const CONTACT_ADDRESS = [
  "Miteshkumar Moirangthem",
  "SAB-B204, SAB Building",
  "Indian Institute of Technology Ropar",
  "Rupnagar, Punjab 140001, India",
];

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} panelClassName="w-[92vw] max-w-md">
      <div className="p-8 md:p-10">
        <h2 className="text-2xl font-extrabold text-foreground">Contact</h2>

        <address className="mt-6 space-y-1.5 text-sm font-bold not-italic leading-relaxed text-foreground">
          {CONTACT_ADDRESS.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </address>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-4 inline-block break-all text-sm font-bold text-blue-600 underline decoration-blue-600/40 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-600 dark:text-blue-400 dark:decoration-blue-400/40 dark:hover:text-blue-300 dark:hover:decoration-blue-400"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </Modal>
  );
}
