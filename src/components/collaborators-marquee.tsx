"use client";

interface Institution {
  name: string;
  src: string;
}

const institutions: Institution[] = [
  { name: "IIT Ropar", src: "/images/logos/iit-ropar.png" },
  { name: "Manipur University", src: "/images/logos/manipur-university.png" },
  { name: "IISER Pune", src: "/images/logos/iiser-pune.png" },
  { name: "IIT Gandhinagar", src: "/images/logos/iit-gandhinagar.png" },
  { name: "IIT Mandi", src: "/images/logos/iit-mandi.png" },
  { name: "INRS, Canada", src: "/images/logos/inrs.png" },
  { name: "Rensselaer Polytechnic Institute", src: "/images/logos/rpi.png" },
  { name: "NCL Pune", src: "/images/logos/ncl-pune.png" },
  { name: "Nagaland University", src: "/images/logos/nagaland-university.png" },
  { name: "North-Eastern Hill University", src: "/images/logos/nehu.png" },
];

// Doubled for a seamless loop.
const track = [...institutions, ...institutions];

/** A floating strip of collaborating institutions' logos, flowing left to right, just above the footer. */
export function CollaboratorsMarquee() {
  return (
    <div className="w-full py-2">
      <div
        className="w-full overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)" }}
      >
        <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-10 hover:[animation-play-state:paused]">
          {track.map(({ name, src }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex h-14 w-28 shrink-0 items-center justify-center rounded-xl border border-border bg-white p-2 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] dark:border-border/60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={name} title={name} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
