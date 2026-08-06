"use client";

import { motion } from "motion/react";

import { transitions } from "@/lib/motion";

/** Subtle nudge that the page continues below the fold. */
export function ScrollCue({ href }: { href: string }) {
  return (
    <motion.a
      href={href}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ...transitions.entrance, delay: 1.1 }}
      className="group inline-flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
    >
      <span className="relative h-8 w-px overflow-hidden bg-border">
        <motion.span
          className="absolute inset-x-0 top-0 h-3 bg-brand"
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      Scroll
    </motion.a>
  );
}
