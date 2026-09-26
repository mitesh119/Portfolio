"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AvatarImageSlotProps {
  src: string;
  alt: string;
  className?: string;
}

/** A compact circular version of TimelineImageSlot — same upload-later behavior, sized for a small avatar. */
export function AvatarImageSlot({ src, alt, className }: AvatarImageSlotProps) {
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (!cancelled && !res.ok) setMissing(true);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (missing) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-2 border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900",
          className
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-1/2 w-1/2 text-neutral-400 dark:text-neutral-600"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
        </svg>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setMissing(true)}
      className={cn("rounded-full object-cover", className)}
    />
  );
}
