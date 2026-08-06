"use client";

import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import { useMounted } from "@/hooks/use-mounted";

/**
 * The resolved theme is only known in the browser, so the toggler renders a
 * same-sized placeholder until mount rather than guessing and mismatching.
 */
export function ThemeToggle() {
  const mounted = useMounted();

  if (!mounted) {
    return <div aria-hidden className="size-8 shrink-0" />;
  }

  return (
    <ThemeTogglerButton
      variant="ghost"
      size="sm"
      modes={["light", "dark"]}
      direction="btt"
      aria-label="Toggle theme"
      className="text-muted-foreground hover:text-foreground"
    />
  );
}
