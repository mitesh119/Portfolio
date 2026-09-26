"use client";

import { ThreeDPhotoCarousel, type CarouselImage } from "@/components/ui/3d-carousel";

const images: CarouselImage[] = [
  { src: "/images/gallery/bio-portrait.jpg", alt: "Miteshkumar Moirangthem, portrait" },
  { src: "/images/gallery/event-2.jpg", alt: "Best Oral Presentation, ICCMR-2026" },
  { src: "/images/gallery/event-6.jpg", alt: "Inter IIT hockey trophy" },
  { src: "/images/gallery/event-11.jpg", alt: "Asian Paints Alchemy Conclave 2025" },
  { src: "/images/gallery/event-3.jpg", alt: "NC-ECFCS-2024, Manipur University" },
  { src: "/images/gallery/event-8.jpg", alt: "Intra Ropar Cricket Championship" },
  { src: "/images/gallery/event-9.jpg", alt: "Best Poster Award, NC-ECFCS-2024" },
  { src: "/images/gallery/event-1.jpg", alt: "Research Ambassador, Springer Nature" },
  { src: "/images/gallery/event-5.jpg", alt: "Hockey team portrait" },
  { src: "/images/gallery/event-4.jpg", alt: "Hockey match in progress" },
  { src: "/images/gallery/event-10.jpg", alt: "Asian Paints Alchemy 2025 moments" },
  { src: "/images/gallery/event-7.jpg", alt: "Miteshkumar Moirangthem" },
  {
    src: "/images/gallery/publication-wiley-cover.jpg",
    alt: "Engineering Nanoparticles for Biomedical Applications, Wiley — book chapter",
  },
  { src: "/images/gallery/proj-1.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-2.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-3.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-4.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-5.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-6.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-7.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-8.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-9.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-10.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-11.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-12.jpg", alt: "Molecular dynamics visualization, ongoing project" },
  { src: "/images/gallery/proj-13.jpg", alt: "Molecular dynamics visualization, ongoing project" },
];

/**
 * A gallery of moments — real photos from the bio site, presented as a
 * draggable 3D rotating carousel (click a photo to expand it).
 */
export function GallerySection() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Moments along the way.
        </h2>
      </div>

      <div className="mt-8 md:mt-10">
        <ThreeDPhotoCarousel images={images} />
      </div>

      <blockquote className="mx-auto mt-8 max-w-md px-6 text-center md:mt-10">
        <p className="text-balance text-sm italic text-foreground/90">
          &ldquo;Nothing in life is to be feared, it is only to be understood.&rdquo;
        </p>
        <footer className="mt-1.5 text-xs not-italic text-foreground/75">— Marie Curie</footer>
      </blockquote>
    </section>
  );
}
