"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";

import {
  VIEWPORT_ONCE,
  fadeInUp,
  staggerContainer,
  transitions,
} from "@/lib/motion";

/**
 * Tags these wrappers can render as. Every entry accepts the props forwarded
 * below, but their per-element event handler types don't unify — hence the
 * `ElementType` annotation at the point of use.
 */
const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  ul: motion.ul,
  article: motion.article,
} as const;

type RevealTag = keyof typeof MOTION_TAGS;

type BaseRevealProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "variants"
> & {
  as?: RevealTag;
  variants?: Variants;
};

type RevealProps = BaseRevealProps & {
  /** Seconds to hold before this element animates in. */
  delay?: number;
};

/**
 * Reveals its children once when scrolled into view, using the shared easing.
 * Standalone — for sequenced children use `RevealGroup` + `RevealItem`.
 */
export function Reveal({
  as = "div",
  delay = 0,
  variants = fadeInUp,
  transition,
  ...props
}: RevealProps) {
  const Component: React.ElementType = MOTION_TAGS[as];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants}
      transition={transition ?? { ...transitions.entrance, delay }}
      {...props}
    />
  );
}

type RevealGroupProps = Omit<BaseRevealProps, "variants"> & {
  /** Seconds between each child's entrance. */
  stagger?: number;
  /** Seconds to hold before the first child animates in. */
  delayChildren?: number;
};

/** Parent that cascades every nested `RevealItem` into view. */
export function RevealGroup({
  as = "div",
  stagger = 0.08,
  delayChildren = 0,
  ...props
}: RevealGroupProps) {
  const Component: React.ElementType = MOTION_TAGS[as];
  const variants = React.useMemo(
    () => staggerContainer(stagger, delayChildren),
    [stagger, delayChildren],
  );

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={variants}
      {...props}
    />
  );
}

/** Child of `RevealGroup`; inherits the parent's in-view trigger. */
export function RevealItem({
  as = "div",
  variants = fadeInUp,
  ...props
}: BaseRevealProps) {
  const Component: React.ElementType = MOTION_TAGS[as];
  return <Component variants={variants} {...props} />;
}
