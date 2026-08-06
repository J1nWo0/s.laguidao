import type { Transition, Variants } from "motion/react";

/**
 * Shared motion vocabulary. Every animated component pulls from here so the
 * whole page decelerates on the same curve.
 */

/** Gentle deceleration used for entrances. */
export const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const;

export const transitions = {
  entrance: { duration: 0.7, ease: EASE_OUT_SOFT },
  quick: { duration: 0.35, ease: EASE_OUT_SOFT },
  spring: { type: "spring", stiffness: 320, damping: 32, mass: 0.6 },
  softSpring: { type: "spring", stiffness: 140, damping: 20, mass: 0.8 },
} satisfies Record<string, Transition>;

export const VIEWPORT_ONCE = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.entrance },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.entrance },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.entrance },
};

/** Parent variant that reveals children one after another. */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
