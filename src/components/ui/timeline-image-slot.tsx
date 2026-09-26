"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineImageSlotProps {
  src: string;
  alt: string;
  className?: string;
}

export function TimelineImageSlot({ src, alt, className }: TimelineImageSlotProps) {
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
          "flex h-44 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-neutral-300 bg-neutral-50 p-4 text-center dark:border-neutral-700 dark:bg-neutral-900 md:h-60",
          className
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-6 w-6 text-neutral-400 dark:text-neutral-600"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
          Add photo
        </span>
        <code className="text-[10px] text-neutral-400 dark:text-neutral-600 break-all">
          {src}
        </code>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setMissing(true)}
      className={cn(
        "h-44 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-60",
        className
      )}
    />
  );
}
