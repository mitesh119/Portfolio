"use client";

import Image from "next/image";
import { PiArrowUpRightBold, PiRocketLaunchDuotone } from "react-icons/pi";
import {
  OngoingProjects,
  Publications,
  ResearchTopics,
  publicationCount,
} from "@/components/research-areas";
import { ParametersSection } from "@/components/parameters-section";
import { CollaboratorsMarquee } from "@/components/collaborators-marquee";
import { GlassCard, SectionHeading, SubHeading } from "@/components/sections/section-heading";

export function WorkSection() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-20 px-5 pb-16 pt-32 md:px-10 md:pt-36">
      <SectionHeading title="Simulating matter, molecule by molecule." />

      <GlassCard className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-500/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground/55">
              Venture
            </span>
            <Image
              src="/images/nimbusmd/nimbusmd-horizontal.svg"
              alt="NimbusMD"
              width={1050}
              height={256}
              className="mt-3 h-12 w-auto dark:hidden md:h-14"
            />
            <Image
              src="/images/nimbusmd/nimbusmd-horizontal-white.svg"
              alt="NimbusMD"
              width={1050}
              height={256}
              className="mt-3 hidden h-12 w-auto dark:block md:h-14"
            />
            <p className="mt-2 max-w-xl text-foreground/75">
              NimbusMD Private Limited, my startup, is launching soon.
            </p>
            <a
              href="#nimbusmd"
              className="mt-4 inline-flex items-center gap-1 text-sm  text-red-600 underline-offset-4 hover:underline dark:text-red-400"
            >
              Learn more
              <PiArrowUpRightBold className="h-4 w-4" />
            </a>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/12 text-red-600 dark:text-red-500">
            <PiRocketLaunchDuotone className="h-7 w-7" />
          </span>
        </div>
      </GlassCard>

      <div>
        <SubHeading>Research areas</SubHeading>
        <div className="mt-6">
          <ResearchTopics />
        </div>
      </div>

      <div>
        <SubHeading>
          Publications <span className="text-foreground/40">({publicationCount})</span>
        </SubHeading>
        <GlassCard className="mt-6">
          <Publications />
        </GlassCard>
      </div>

      <div>
        <SubHeading>Ongoing projects</SubHeading>
        <div className="mt-6">
          <OngoingProjects />
        </div>
      </div>

      <div>
        <SubHeading>Output &amp; reach</SubHeading>
        <div className="mt-6">
          <ParametersSection />
        </div>
      </div>

      <div>
        <SubHeading>Collaborating institutions</SubHeading>
        <div className="mt-6">
          <CollaboratorsMarquee />
        </div>
      </div>
    </div>
  );
}
