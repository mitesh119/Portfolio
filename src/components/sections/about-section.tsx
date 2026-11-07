"use client";

import { GraduationCap, Award, Briefcase, FlaskConical, UserRound, MapPin, Mail } from "lucide-react";
import MinimalistHeroDemo from "@/components/ui/minimalist-hero-demo";
import { GallerySection } from "@/components/gallery-section";
import { CONTACT_ADDRESS, CONTACT_EMAIL } from "@/components/contact-modal";
import { GlassCard, SectionHeading, SubHeading } from "@/components/sections/section-heading";

function Hl({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground">{children}</span>;
}

const facts = [
  { icon: GraduationCap, label: "PhD, Chemical Engineering", value: "IIT Ropar · since 2023" },
  { icon: Award, label: "Fellowship", value: "DST-INSPIRE Senior Research Fellow" },
  { icon: Briefcase, label: "Venture", value: "Director & CEO, NimbusMD Private Limited · since Nov 2026" },
  { icon: UserRound, label: "Supervisor", value: "Dr. Santosh Kumar Meena" },
  { icon: FlaskConical, label: "Toolkit", value: "GROMACS · Gaussian · VMD · Material Studio" },
];

export function AboutSection() {
  return (
    <>
      <MinimalistHeroDemo />

      <div className="mx-auto w-full max-w-6xl space-y-20 px-5 pb-12 md:px-10">
        <div>
          <SectionHeading eyebrow="About" title="Hi, I am Mitesh." />

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr]">
            <GlassCard className="text-base leading-relaxed text-foreground/75">
              <p>
                I am a <Hl>Doctoral Research Scholar</Hl> in the{" "}
                <Hl>Department of Chemical Engineering</Hl> at the{" "}
                <Hl>Indian Institute of Technology (IIT) Ropar</Hl>, India, working as a{" "}
                <Hl>DST-INSPIRE Senior Research Fellow</Hl> under <Hl>Dr. Santosh Kumar Meena</Hl>.
                My research applies molecular dynamics (MD) simulations to study metal
                nanoparticles, protective surface coatings, hydrogels, atmospheric water
                harvesting, and drug discovery systems.
              </p>
              <p className="mt-4">
                I am the{" "}
                <Hl>
                  Director &amp; CEO of{" "}
                  <a
                    href="#nimbusmd"
                    className="text-red-600 underline-offset-4 hover:underline dark:text-red-500"
                  >
                    NimbusMD Private Limited
                  </a>
                </Hl>
                , my startup. I also serve as <Hl>Research Ambassador for Springer Nature</Hl> and{" "}
                <Hl>Campus Ambassador for Asian Paints</Hl>. I earned my <Hl>BSc (2020)</Hl> and{" "}
                <Hl>MSc (2022)</Hl> in Chemistry from Nagaland University and Manipur University,
                graduating top of my class with <Hl>Gold Medals</Hl> at both levels, including the{" "}
                <Hl>Governor&apos;s Gold Medal</Hl>.
              </p>
            </GlassCard>

            <GlassCard className="flex flex-col gap-5">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-xs  uppercase tracking-wider text-foreground/55">
                      {label}
                    </p>
                    <p className="text-sm  text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>

        <GallerySection />

        <div>
          <SubHeading>Get in touch</SubHeading>
          <GlassCard className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.8} />
              <address className="space-y-1 text-sm not-italic leading-relaxed text-foreground/85">
                {CONTACT_ADDRESS.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            </div>
            <div className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.8} />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="break-all text-sm  text-blue-600 underline decoration-blue-600/40 underline-offset-4 transition-colors hover:decoration-blue-600 dark:text-blue-400 dark:decoration-blue-400/40"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
