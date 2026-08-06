"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = React.ComponentProps<"div"> & {
  /** Diameter of the cursor-following glow, in pixels. */
  radius?: number;
};

/**
 * Surface with a soft glow that tracks the pointer. Purely decorative, so the
 * overlay is hidden from assistive tech and stays inert on touch devices.
 */
export function SpotlightCard({
  radius = 340,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-radius);
  const mouseY = useMotionValue(-radius);
  const [visible, setVisible] = React.useState(false);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--surface-glow), transparent 70%)`;

  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 ring-hairline backdrop-blur-sm transition-colors duration-500 hover:border-brand/30",
        className,
      )}
      onMouseMove={(event) => {
        const { left, top } = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - left);
        mouseY.set(event.clientY - top);
        setVisible(true);
        onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        setVisible(false);
        onMouseLeave?.(event);
      }}
      {...props}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background, opacity: visible ? 1 : 0 }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
