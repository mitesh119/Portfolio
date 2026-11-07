'use client';

import React from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

interface MinimalistHeroProps {
  imageSrc: string;
  imageAlt: string;
  /** The intro paragraph shown under the name. */
  overlayText: React.ReactNode;
  /** The name, shown as the page heading. */
  backgroundText?: string;
  /** CSS object-position used to centre the crop on the face. */
  imagePosition?: string;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const MinimalistHero = ({
  imageSrc,
  imageAlt,
  overlayText,
  backgroundText,
  imagePosition = '50% 50%',
  className,
}: MinimalistHeroProps) => {
  const reduceMotion = useReducedMotion();

  // The portrait tilts a few degrees toward the pointer.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-7, 7]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [6, -6]), { stiffness: 120, damping: 18 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
    pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
  };
  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-center gap-6 px-6 pb-12 pt-28 font-sans md:gap-8 md:px-12 md:pt-32',
        className
      )}
    >
      {/* Name above, portrait below: a centred column, the name tucked slightly into the photo's top edge. */}
      <div className="relative flex flex-col items-center gap-2 md:gap-3">
        {backgroundText && (
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="pointer-events-none relative z-30 hidden w-max max-w-none whitespace-nowrap text-center font-heading text-2xl uppercase leading-tight tracking-[0.12em] text-[#ef1c1c] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:-mb-3 sm:block md:-mb-4 md:text-3xl md:tracking-[0.16em] lg:text-4xl"
          >
            {backgroundText}
          </motion.h1>
        )}

        {/* Portrait: soft coloured glow, gentle tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
          className="relative h-[min(200px,28vh)] w-[min(200px,28vh)] shrink-0 sm:h-[min(240px,32vh)] sm:w-[min(240px,32vh)] md:h-[min(280px,36vh)] md:w-[min(280px,36vh)] lg:h-[min(320px,40vh)] lg:w-[min(320px,40vh)]"
        >
          <div
            aria-hidden
            className="absolute -inset-8 rounded-full bg-gradient-to-br from-blue-500/35 via-violet-500/25 to-transparent blur-3xl"
          />
          <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_20px_60px_-15px_rgba(99,102,241,0.45)]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, (min-width: 640px) 240px, 200px"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </div>
        </motion.div>
      </div>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mx-auto max-w-3xl text-balance text-center text-base font-medium leading-relaxed text-foreground sm:text-lg"
      >
        {overlayText}
      </motion.p>
    </div>
  );
};
