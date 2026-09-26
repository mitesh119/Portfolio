'use client';

import React from 'react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const MinimalistHeroDemo = () => {
  return (
    <MinimalistHero
      imageSrc="/images/hero-portrait.jpg"
      imageAlt="A person in a hooded winter jacket and reflective goggles, standing before a mountain range at sunrise."
      overlayText={
        <>
          I&apos;m a Doctoral Scholar in Chemical Engineering at IIT Ropar, applying molecular dynamics
          simulations to nanotechnology. I currently hold a DST-INSPIRE Fellowship with a 9.25 CGPA and
          serve as Research Ambassador for Springer Nature. I am also actively engaged with my startup{" "}
          <span className="text-red-600 dark:text-red-500">NimbusMD</span>, please do check it out.
        </>
      }
      backgroundText="MITESHKUMAR MOIRANGTHEM"
    />
  );
};

export default MinimalistHeroDemo;
