"use client";

import { ArrowUpRight, Rocket } from "lucide-react";
import {
  OngoingProjects,
  Publications,
  ResearchTopics,
  projectCount,
  publicationCount,
} from "@/components/research-areas";
import { ParametersSection } from "@/components/parameters-section";
import { CollaboratorsMarquee } from "@/components/collaborators-marquee";
import { GlassCard, SectionHeading, SubHeading } from "@/components/sections/section-heading";

export function WorkSection() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-20 px-5 pb-16 pt-16 md:px-10 md:pt-24">
      <SectionHeading eyebrow="Work" title="Simulating matter, molecule by molecule.">
        Molecular dynamics is the common thread, applied to coatings, nanoparticles, gels, water,
        and drug discovery.
      </SectionHeading>

      <GlassCard className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-500/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-foreground/55">
              Venture · Coming soon
            </span>
            <p className="mt-2 text-3xl font-extrabold text-red-600 dark:text-red-500 md:text-4xl">
              NimbusMD
            </p>
            <p className="mt-2 max-w-xl text-foreground/75">
              NimbusMD Private Limited, my startup, is launching soon.
            </p>
            <a
              href="#nimbusmd"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-red-600 underline-offset-4 hover:underline dark:text-red-400"
            >
              Learn more
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/12 text-red-600 dark:text-red-500">
            <Rocket className="h-7 w-7" strokeWidth={1.8} />
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
        <SubHeading>
          Ongoing projects <span className="text-foreground/40">({projectCount})</span>
        </SubHeading>
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
