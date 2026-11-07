"use client";

import MinimalistHeroDemo from "@/components/ui/minimalist-hero-demo";
import { GallerySection } from "@/components/gallery-section";
import { GlassCard } from "@/components/sections/section-heading";
import { CareerSection } from "@/components/sections/career-section";

function Hl({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground">{children}</span>;
}

export function AboutSection() {
  return (
    <>
      <MinimalistHeroDemo />

      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <GlassCard className="text-base leading-relaxed text-foreground/75">
          <p>
            My research asks how matter behaves at the molecular scale. I use{" "}
            <Hl>molecular dynamics</Hl> to watch nanoparticles, coatings, hydrogels, water and drug
            molecules in action, atom by atom, so the design happens on a screen before it happens
            in a flask.
          </p>
        </GlassCard>
      </div>

      <CareerSection />

      <div className="mx-auto w-full max-w-6xl space-y-20 px-5 pb-12 md:px-10">
        <GallerySection />
      </div>
    </>
  );
}
