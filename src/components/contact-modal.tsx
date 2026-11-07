"use client";

import { PiEnvelopeSimpleDuotone, PiMapPinDuotone } from "react-icons/pi";
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
        <h2 className="text-2xl  text-foreground">Contact</h2>

        <div className="mt-6 flex gap-3">
          <PiMapPinDuotone className="mt-0.5 h-5 w-5 shrink-0 text-red-500 dark:text-red-400" />
          <address className="space-y-1.5 text-sm not-italic leading-relaxed text-foreground">
            {CONTACT_ADDRESS.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </div>

        <div className="mt-4 flex gap-3">
          <PiEnvelopeSimpleDuotone className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400" />
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="break-all text-sm text-blue-600 underline decoration-blue-600/40 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-600 dark:text-blue-400 dark:decoration-blue-400/40 dark:hover:text-blue-300 dark:hover:decoration-blue-400"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </Modal>
  );
}
