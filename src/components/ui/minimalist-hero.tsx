'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  imageSrc: string;
  imageAlt: string;
  overlayText: React.ReactNode;
  /** Optional signature text rendered behind the portrait, peeking out above the ring. */
  backgroundText?: string;
  className?: string;
}

// The main reusable Hero Section component
export const MinimalistHero = ({
  imageSrc,
  imageAlt,
  overlayText,
  backgroundText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex min-h-[100svh] w-full flex-col items-center justify-between px-6 pb-36 pt-10 font-sans md:px-12 md:pt-12',
        className
      )}
    >
      {/* Main Content Area — name above, portrait in the middle: a centered column that stays narrow at every size. */}
      <div className="relative flex w-full max-w-3xl flex-grow flex-col items-center justify-center gap-2 py-6 md:gap-3">
        {backgroundText && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="pointer-events-none z-30 hidden w-max max-w-none whitespace-nowrap text-center font-heading text-2xl  uppercase leading-tight tracking-[0.12em] text-[#ef1c1c] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:-mb-3 sm:block md:-mb-4 md:text-3xl md:tracking-[0.16em] lg:text-4xl"
          >
            {backgroundText}
          </motion.div>
        )}

        <div className="relative flex h-[min(260px,34vh)] w-[min(260px,34vh)] shrink-0 items-center justify-center sm:h-[min(300px,38vh)] sm:w-[min(300px,38vh)] md:h-[min(340px,42vh)] md:w-[min(340px,42vh)] lg:h-[min(400px,46vh)] lg:w-[min(400px,46vh)]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute inset-0 z-0 overflow-hidden rounded-full bg-foreground/5"
          >
            <img
              src={imageSrc}
              alt=""
              aria-hidden="true"
              className="h-full w-full scale-125 object-cover blur-2xl"
            />
          </motion.div>
          <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-full">
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
              }}
            />
          </div>
        </div>
      </div>

      {/* Bio line — its own full-width row, not confined to the centered column above. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="z-20 w-full text-center"
      >
        <h1 className="w-full font-sans text-base font-medium leading-relaxed tracking-normal text-foreground sm:text-lg md:text-base lg:text-lg">
          {overlayText}
        </h1>
      </motion.div>
    </div>
  );
};
