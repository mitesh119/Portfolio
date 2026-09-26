"use client";

import { motion } from "framer-motion";
import { AvatarImageSlot } from "@/components/ui/avatar-image-slot";

export function ProfileBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="absolute left-6 top-6 z-20 md:left-12 md:top-10"
    >
      <AvatarImageSlot
        src="/images/profile/avatar.jpg"
        alt="Miteshkumar Moirangthem"
        className="h-20 w-20 border-2 border-background shadow-lg transition-all duration-300 ease-out hover:scale-125 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.3),0_0_40px_14px_rgba(59,130,246,0.55)] md:h-24 md:w-24"
      />
    </motion.div>
  );
}
