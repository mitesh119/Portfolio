"use client";

import { useTheme } from "next-themes";
import { PiMoonDuotone, PiSunDuotone } from "react-icons/pi";
import { useMounted } from "@/lib/use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      {mounted && (
        <>
          <PiSunDuotone
            className={`absolute h-[18px] w-[18px] text-amber-500 transition-all duration-300 ${
              isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
            }`}
          />
          <PiMoonDuotone
            className={`absolute h-[18px] w-[18px] text-indigo-400 transition-all duration-300 ${
              isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
            }`}
          />
        </>
      )}
    </button>
  );
}
