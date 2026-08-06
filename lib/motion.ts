import type { Transition } from "motion/react";

/**
 * The site's entire motion vocabulary: one spring, used by the nav highlight.
 * Everything else is a CSS transition.
 */
export const transitions = {
	spring: { type: "spring", stiffness: 320, damping: 32, mass: 0.6 },
} satisfies Record<string, Transition>;
