"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/** Fires once the block has come a little way past the bottom of the viewport. */
const ROOT_MARGIN = "0px 0px -12% 0px";

type RevealProps = React.ComponentProps<"div"> & {
  /** Fades the direct children in one after another instead of as one block. */
  stagger?: boolean;
};

/**
 * Fades its contents in the first time they scroll into view — and immediately
 * for anything already on screen at load. The children are server-rendered and
 * only ever animated with opacity and a transform, so the page never reflows
 * and the markup is complete for crawlers.
 *
 * `prefers-reduced-motion` skips straight to the visible state.
 */
export function Reveal({ stagger = false, className, ...props }: RevealProps) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const ref = useRef<HTMLDivElement>(null);
  /** Browsers without the observer skip the effect and start out visible. */
  const [shown, setShown] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window),
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
      },
      { rootMargin: ROOT_MARGIN },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      data-reveal={shown || reduced ? "shown" : "pending"}
      className={cn(stagger ? "reveal-stagger" : "reveal", className)}
      {...props}
    />
  );
}
