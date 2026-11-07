"use client";

import { motion, type Variants } from "framer-motion";
import { SiInstagram, SiGooglescholar, SiResearchgate } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const socials = [
  { label: "Instagram", href: "#", Icon: SiInstagram, color: "text-[#E4405F]", rotate: 5 },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=6Nt1fYcAAAAJ&hl=en",
    Icon: SiGooglescholar,
    color: "text-[#4285F4]",
    rotate: -5,
  },
  {
    label: "ResearchGate",
    href: "https://www.researchgate.net/profile/Miteshkumar-Moirangthem",
    Icon: SiResearchgate,
    color: "text-[#00B5A5] dark:text-[#00CCBB]",
    rotate: 5,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mitesh-moirangthem/",
    Icon: FaLinkedin,
    color: "text-[#0A66C2] dark:text-[#4C9BE8]",
    rotate: -5,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

/**
 * Animated footer — structure adapted from SolaceUI's "Animated Footer
 * Section" (solaceui.com), restyled with the site's theme tokens and its
 * established blue-glow hover language instead of the reference's plain
 * black/white hover treatment.
 */
export function SiteFooter() {
  return (
    <footer className="w-full overflow-hidden py-8 text-foreground">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={containerVariants}
        className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-8 md:px-12"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          {socials.map(({ label, href, Icon, color, rotate }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={`${color} transition-[filter] duration-200 hover:drop-shadow-[0_0_10px_currentColor]`}
              whileHover={{ scale: 1.2, rotate }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Animated diagonal-stripe divider */}
      <motion.div
        className="mt-10 h-10 w-full bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] text-foreground opacity-10"
        style={{ backgroundSize: "10px 10px" }}
        initial={{ backgroundPositionX: "0%" }}
        whileInView={{ backgroundPositionX: "100%" }}
        viewport={{ once: true }}
        transition={{ ease: "linear", duration: 20 }}
      />

      <div className="mx-auto mt-6 flex w-full max-w-7xl justify-center px-8 text-xs text-foreground/75 md:px-12">
        <span>© {new Date().getFullYear()} Miteshkumar Moirangthem. All rights reserved.</span>
      </div>
    </footer>
  );
}
