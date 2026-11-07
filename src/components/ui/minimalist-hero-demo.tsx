'use client';

import React from 'react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const MinimalistHeroDemo = () => {
  return (
    <MinimalistHero
      imageSrc="/images/profile/avatar.jpg"
      imageAlt="Portrait of Miteshkumar Moirangthem"
      overlayText={
        <>
          I&apos;m a Doctoral Scholar in Chemical Engineering at IIT Ropar, applying computational
          chemistry calculations to nanoscience and nanotechnology. I currently hold a DST-INSPIRE Fellowship and
          serve as Research Ambassador for Springer Nature. I am also the Director &amp; CEO of my startup{" "}
          <a href="#nimbusmd" className="text-red-600 underline-offset-4 hover:underline dark:text-red-500">
            NimbusMD
          </a>, please do check it out.
        </>
      }
      backgroundText="MITESHKUMAR MOIRANGTHEM"
    />
  );
};

export default MinimalistHeroDemo;
