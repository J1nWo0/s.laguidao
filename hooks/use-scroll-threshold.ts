"use client";

import * as React from "react";

/** True once the window has scrolled past `threshold` pixels. */
export function useScrollThreshold(threshold = 24): boolean {
  const [passed, setPassed] = React.useState(false);

  React.useEffect(() => {
    const update = () => setPassed(window.scrollY > threshold);

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return passed;
}
