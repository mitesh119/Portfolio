"use client";

import { CloudRain, Droplet, FlaskConical, Pill, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { TimelineImageSlot } from "@/components/ui/timeline-image-slot";
import { PointDot } from "@/components/ui/point-dot";

interface Publication {
  title: string;
  journal: string;
  year: string;
  authors: string[];
  link: string;
  toc?: string;
}

// Real, bibliographic data from Google Scholar (title / journal / year / authors — factual, not reproducing
// article content), ordered newest to oldest by exact publication date. `link` is each paper's DOI/publisher
// landing page (from Scholar); `toc` is the paper's own TOC graphic, mirrored from the author's Sites page.
const publications: Publication[] = [
  {
    title: "Cholesterol Condensation and Phospholipid Convergence in cis-ssPalmO-phe Bilayers: A Molecular Dynamics Study",
    journal: "ChemRxiv (preprint)",
    year: "2026",
    authors: ["Anjana Barange", "Miteshkumar Moirangthem", "Santosh Kumar Meena"],
    link: "https://doi.org/10.26434/chemrxiv.15011622",
  },
  {
    title: "Decoding Membrane Biophysics for Nucleic Acid Delivery: Bridging Bilayer Simulations and Lipid Nanoparticle Functionality",
    journal: "ChemRxiv (preprint)",
    year: "2026",
    authors: ["Anjana Barange", "Miteshkumar Moirangthem", "Santosh Kumar Meena"],
    link: "https://doi.org/10.26434/chemrxiv.15008480",
  },
  {
    title: "Unit-Cell Molecular Dynamics Framework for Cross-Linked Hydrogels: Linking Cross-Link Density, Hydration Shells, and Swelling",
    journal: "ChemRxiv (preprint)",
    year: "2026",
    authors: ["Miteshkumar Moirangthem", "Tanu Tiwari", "Karthik Pushpavanam", "Santosh Kumar Meena"],
    link: "https://doi.org/10.26434/chemrxiv.15008483",
  },
  {
    title: "Tailoring the Fusogenic Properties of cis-ssPalmO-phe Based Lipid Nanoparticles for mRNA Delivery",
    journal: "ChemRxiv (preprint)",
    year: "2026",
    authors: ["Anjana Barange", "Miteshkumar Moirangthem", "Meitram Niraj Luwang", "Santosh Kumar Meena"],
    link: "https://doi.org/10.26434/chemrxiv.15008485",
  },
  {
    title: "Facet Selective Adsorption and Mobility of Anthracene Based Nanocars on Gold Surfaces",
    journal: "ChemRxiv (preprint)",
    year: "2026",
    authors: ["Kush Kumar", "Miteshkumar Moirangthem", "Santosh Kumar Meena"],
    link: "https://doi.org/10.26434/chemrxiv.15008484",
  },
  {
    title:
      "Integrated Machine Learning and Molecular Dynamics for Functional Nanoparticle Design: Synthesis, Characterization, Force-Field Development, and Property Prediction",
    journal: "Langmuir",
    year: "2026",
    authors: ["Miteshkumar Moirangthem", "Vrindha P.", "Irfan Ahmed Fani", "Chandrakala Meena", "Santosh Kumar Meena"],
    link: "https://doi.org/10.1021/acs.langmuir.5c05632",
    toc: "/images/toc/toc-1.png",
  },
  {
    title: "From Crystallites to Columns: Hierarchical Zn/Ni Bimetallic MOF-Biopolymer Composite Beads as High-Capacity Adsorbents for 17β-Estradiol in Water",
    journal: "Chemical Engineering Journal Advances",
    year: "2026",
    authors: [
      "Anam Afaq",
      "Kartiki Chandratre",
      "Miteshkumar Moirangthem",
      "Vikrant Sharma",
      "Santosh Kumar Meena",
      "Sarang P. Gumfekar",
    ],
    link: "https://www.sciencedirect.com/science/article/pii/S2666821126002048",
    toc: "/images/toc/toc-2.png",
  },
  {
    title: "Novel Copper-Thioproline Complex as an Efficient Catalyst for Knoevenagel Condensation in Green Solvent: DFT and Catalytic Activity Study",
    journal: "ChemistrySelect",
    year: "2026",
    authors: [
      "Sanatombi D. Khongbantabam",
      "Atom Rajiv Singh",
      "Miteshkumar Moirangthem",
      "Lokendrajit Nahakpam",
      "Santosh Kumar Meena",
      "Laitonjam Warjeet Singh",
      "Keisham Surjit Singh",
    ],
    link: "https://doi.org/10.1002/slct.202506138",
    toc: "/images/toc/toc-3.png",
  },
  {
    title: "Molecular Dynamics (MD)",
    journal: "Engineering Nanoparticles for Biomedical Applications (Wiley, book chapter)",
    year: "2026",
    authors: ["Miteshkumar Moirangthem", "Kush Kumar", "Santosh Kumar Meena"],
    link: "https://onlinelibrary.wiley.com/doi/abs/10.1002/9783527844791.ch11",
    toc: "/images/toc/toc-4.png",
  },
  {
    title: "Investigating the Design of ssPalmO-Derived Lipid Nanoparticles for mRNA Delivery Applications Using Molecular Dynamics Simulations",
    journal: "ACS Omega",
    year: "2025",
    authors: ["Anjana Barange", "Meitram Niraj Luwang", "Santosh Kumar Meena"],
    link: "https://pubs.acs.org/acsodf/article/10/50/61256/3660292",
    toc: "/images/toc/toc-5.png",
  },
  {
    title: "Investigating the Multifunctional Coating Design for Metal Surfaces: Insights from Molecular Dynamics Simulations",
    journal: "ACS Omega",
    year: "2025",
    authors: ["Miteshkumar Moirangthem", "Kush Kumar", "Lagan Dhanda", "Santosh Kumar Meena"],
    link: "https://pubs.acs.org/acsodf/article/10/41/48900/3657189",
    toc: "/images/toc/toc-6.png",
  },
  {
    title: "Unlocking Long Life Aqueous Zinc-Sulfur Rechargeable Battery Derived from Zinc Waste Powering 30 LEDs",
    journal: "Advanced Energy Materials",
    year: "2025",
    authors: [
      "Shivangi Mehta",
      "Man Singh",
      "Kalpana Garg",
      "Rashmi Nidhi Mishra",
      "Kush Kumar",
      "Miteshkumar Moirangthem",
      "Santosh Kumar Meena",
      "Tharamani C. Nagaiah",
    ],
    link: "https://doi.org/10.1002/aenm.202501214",
    toc: "/images/toc/toc-7.jpg",
  },
  {
    title:
      "Supramolecular Gels from Sulfonic Acid-Containing Two-Component Gelators: Molecular Dynamics Simulation, Dye Absorption and Multianalyte Sensing Studies",
    journal: "Langmuir",
    year: "2025",
    authors: [
      "Ayekpam Thoungamba Meitei",
      "Miteshkumar Moirangthem",
      "Ningombam Yaiphaba",
      "Santosh Kumar Meena",
      "Rajkumar Sunil Singh",
    ],
    link: "https://doi.org/10.1021/acs.langmuir.5c01976",
    toc: "/images/toc/toc-8.png",
  },
];

// Doubled for a seamless marquee loop.
const tocPubs = publications.filter((pub) => pub.toc);
const tocTrack = [...tocPubs, ...tocPubs];

interface OngoingProject {
  slug: string;
  title: string;
}

// Real project titles, from the Ongoing Projects page.
const ongoingProjects: OngoingProject[] = [
  { slug: "proj-1", title: "DFT Calculations for Activated Carbon" },
  { slug: "proj-2", title: "DFT Calculations for Organic Composite" },
  { slug: "proj-3", title: "MD Calculations for Protein–Drug Interaction" },
  { slug: "proj-4", title: "MD Calculations for Protein–Ligand Interaction" },
  { slug: "proj-5", title: "Understanding Supramolecular Gelation" },
  { slug: "proj-6", title: "Decoding Water Dynamics in Polymeric Gels" },
  { slug: "proj-7", title: "Understanding Amino Acid Self-Assembly" },
  { slug: "proj-8", title: "Decoding Microwave-Assisted COF Synthesis" },
  { slug: "proj-9", title: "Unlocking the Behavior of Molecular Machines" },
  { slug: "proj-10", title: "Elucidating the Behavior of Ligand-Coated Nanoparticles on Janus Surfaces" },
  { slug: "proj-11", title: "How Metal Nanoflowers Are Formed" },
  { slug: "proj-12", title: "Tailoring Lipid Nanoparticles for RNA Delivery" },
  { slug: "proj-13", title: "Biomolecule-Enhanced Lipid Nanoparticles for Gene Therapy" },
];

interface ConferenceTalk {
  slug: string;
  title: string;
}

// Real conference presentations and talks, from the Conferences & Workshops page.
const conferenceTalks: ConferenceTalk[] = [
  { slug: "conf-1", title: "Best Oral Presentation — ICCMR-2026, Nagaland University" },
  { slug: "conf-2", title: "Semi-finalist — Asian Paints Alchemy Conclave 2026" },
  { slug: "conf-3", title: "Semi-finalist — Asian Paints Alchemy Conclave 2025" },
  { slug: "conf-4", title: "Best Poster Award — NC-ECFCS-2024, Manipur University" },
];

interface ResearchArea {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Real research areas, drawn from the "I am a..." intro on the Bio page: metal nanoparticles, protective
// surface coatings, hydrogels, atmospheric water harvesting, and drug discovery systems.
const researchTopics: ResearchArea[] = [
  {
    icon: FlaskConical,
    title: "Metal Nanoparticles",
    description: "Synthesis, characterization, and property prediction — integrating machine learning with molecular dynamics.",
  },
  {
    icon: ShieldCheck,
    title: "Protective Surface Coatings",
    description: "Multifunctional coating design for metal surfaces, modeled before it's synthesized.",
  },
  {
    icon: Droplet,
    title: "Hydrogels",
    description: "Supramolecular gel self-assembly, dye absorption, and multianalyte sensing.",
  },
  {
    icon: CloudRain,
    title: "Atmospheric Water Harvesting",
    description: "Rational design of nanomaterials that pull water directly from air.",
  },
  {
    icon: Pill,
    title: "Drug Discovery Systems",
    description: "Molecular dynamics applied to protein–ligand and protein–drug interaction problems.",
  },
];

const cardHover =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_6px_rgba(59,130,246,0.3)]";

export function ResearchTopics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {researchTopics.map((area, index) => (
        <motion.div
          key={area.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.06 * index }}
          className={`glass rounded-2xl p-5 ${cardHover}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
            <area.icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <h4 className="mt-4 text-base font-semibold text-foreground">{area.title}</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">{area.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function Publications() {
  return (
    <>
      <div
        className="relative overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
      >
        <div className="flex w-max animate-[marquee_32s_linear_infinite] items-center gap-5 py-2 hover:[animation-play-state:paused]">
          {tocTrack.map((pub, i) => (
            <a
              key={`${pub.title}-${i}`}
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_8px_rgba(59,130,246,0.3)] md:h-36 md:w-36"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pub.toc} alt={pub.title} title={pub.title} className="h-full w-full object-cover" />
            </a>
          ))}
        </div>
      </div>

      <ul className="mt-8 space-y-5">
        {publications.map((pub) => (
          <li key={pub.title} className="group flex gap-3 text-sm leading-relaxed">
            <PointDot />
            <span>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground underline decoration-foreground/30 underline-offset-2 transition-colors hover:text-blue-500 hover:decoration-blue-500 dark:hover:text-blue-400 dark:hover:decoration-blue-400"
              >
                {pub.title}
              </a>
              <span className="text-foreground/75"> — {pub.journal}, {pub.year}</span>
              <br />
              <span className="text-xs text-foreground/70">
                {pub.authors.map((author, i) => (
                  <span key={author}>
                    <span
                      className={
                        author === "Miteshkumar Moirangthem"
                          ? "font-semibold text-blue-500 dark:text-blue-400"
                          : undefined
                      }
                    >
                      {author}
                    </span>
                    {i < pub.authors.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

function ImageTileGrid({ tiles }: { tiles: { slug: string; title: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {tiles.map((tile) => (
        <div
          key={tile.slug}
          className="glass group relative rounded-2xl text-center transition-shadow duration-300 hover:z-20 hover:shadow-[0_10px_40px_rgba(59,130,246,0.4)]"
        >
          <div className="relative z-10 overflow-visible rounded-t-2xl">
            <TimelineImageSlot
              src={`/images/gallery/${tile.slug}.jpg`}
              alt={tile.title}
              className="h-24 w-full origin-bottom rounded-2xl transition-transform duration-300 group-hover:scale-125 md:h-28"
            />
          </div>
          <p className="relative z-0 flex min-h-[3.5rem] items-center justify-center p-2 text-center text-xs leading-snug text-foreground/85">
            {tile.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export function OngoingProjects() {
  return <ImageTileGrid tiles={ongoingProjects} />;
}

export function ConferenceTalks() {
  return <ImageTileGrid tiles={conferenceTalks} />;
}

export const publicationCount = publications.length;
export const projectCount = ongoingProjects.length;
