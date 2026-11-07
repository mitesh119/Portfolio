"use client";

import Image from "next/image";
import {
  PiArrowUpRightBold,
  PiEnvelopeSimpleDuotone,
  PiFlaskDuotone,
  PiPillDuotone,
  PiRocketLaunchDuotone,
  PiStackDuotone,
} from "react-icons/pi";
import { GlassCard, SectionHeading, SubHeading } from "@/components/sections/section-heading";

export const NIMBUS_LEGAL_NAME = "NimbusMD Private Limited";

// Fill these in once the company has a public inbox / site; the CTA adapts automatically.
const NIMBUS_EMAIL: string | null = null;
export const NIMBUS_WEBSITE = "https://nimbusmd.co.in";

const offerings = [
  {
    icon: PiFlaskDuotone,
    color: "text-violet-500 dark:text-violet-400",
    title: "Simulation services",
    body: "Computational chemistry services for industry and research groups: nanoparticles, protective coatings, hydrogels, and water and interfacial behaviour, from system setup to analysis.",
  },
  {
    icon: PiStackDuotone,
    color: "text-blue-500 dark:text-blue-400",
    title: "Software & platform",
    body: "Tooling that makes simulation workflows repeatable, so setting up, running and interpreting molecular dynamics takes less expert time.",
  },
  {
    icon: PiPillDuotone,
    color: "text-emerald-500 dark:text-emerald-400",
    title: "Research & drug discovery",
    body: "In-house research and partnerships applying simulation to drug discovery systems and molecular-scale design.",
  },
];

const ctaClass =
  "inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-red-600 px-5 py-2.5 text-sm  text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:text-red-950 dark:hover:bg-red-400";

export function NimbusMDSection({ onContact }: { onContact: () => void }) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-5 pb-10 pt-28 md:space-y-20 md:px-10 md:pb-16 md:pt-36">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-10 h-64 w-64 rounded-full bg-red-500/15 blur-3xl"
        />
        <SectionHeading
          eyebrow="Venture"
          title={
            <>
              <Image
                src="/images/nimbusmd/nimbusmd-horizontal.svg"
                alt="NimbusMD"
                width={1050}
                height={256}
                priority
                className="h-12 w-auto dark:hidden md:h-[4.5rem]"
              />
              <Image
                src="/images/nimbusmd/nimbusmd-horizontal-white.svg"
                alt="NimbusMD"
                width={1050}
                height={256}
                priority
                className="hidden h-12 w-auto dark:block md:h-[4.5rem]"
              />
            </>
          }
          className="relative"
        >
          A startup I am building to bring computational chemistry calculations out of the lab and
          into practical use.
        </SectionHeading>
        <p className="relative mt-3 text-sm  text-foreground/55">
          {NIMBUS_LEGAL_NAME} · Miteshkumar Moirangthem, Director &amp; CEO
        </p>
        <span className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-red-500/12 px-3 py-1 text-xs  uppercase tracking-[0.15em] text-red-600 dark:text-red-400">
          <PiRocketLaunchDuotone className="h-3.5 w-3.5" />
          Launching soon
        </span>
      </div>

      <div>
        <SubHeading>What we do</SubHeading>
        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-3 md:gap-5">
          {offerings.map(({ icon: Icon, color, title, body }) => (
            <GlassCard key={title} className="flex flex-col gap-4">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-current/12 ${color}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h4 className="text-lg  text-foreground">{title}</h4>
              <p className="text-sm leading-relaxed text-foreground/75">{body}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-500/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xl tracking-tight text-foreground md:text-2xl">
              <span>Work with</span>
              <Image
                src="/images/nimbusmd/nimbusmd-horizontal.svg"
                alt="NimbusMD"
                width={1050}
                height={256}
                className="h-7 w-auto dark:hidden md:h-9"
              />
              <Image
                src="/images/nimbusmd/nimbusmd-horizontal-white.svg"
                alt="NimbusMD"
                width={1050}
                height={256}
                className="hidden h-7 w-auto dark:block md:h-9"
              />
            </h3>
            <p className="mt-2 max-w-xl text-foreground/75">
              Interested in a simulation project, a collaboration, or early access? Get in touch.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {NIMBUS_EMAIL ? (
              <a href={`mailto:${NIMBUS_EMAIL}`} className={ctaClass}>
                <PiEnvelopeSimpleDuotone className="h-4 w-4" />
                {NIMBUS_EMAIL}
              </a>
            ) : (
              <button type="button" onClick={onContact} className={ctaClass}>
                <PiEnvelopeSimpleDuotone className="h-4 w-4" />
                Get in touch
              </button>
            )}
            {NIMBUS_WEBSITE && (
              <a
                href={NIMBUS_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm  text-foreground transition-colors hover:bg-foreground/5"
              >
                nimbusmd.co.in
                <PiArrowUpRightBold className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
