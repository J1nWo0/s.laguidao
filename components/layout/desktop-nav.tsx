"use client";

import {
  Highlight,
  HighlightItem,
} from "@/components/animate-ui/primitives/effects/highlight";
import { NAV_ITEMS } from "@/data/navigation";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Section links with a sharp accent block that glides to whichever section is
 * in view. `activeId` is owned by the header so the mobile nav can share the
 * same state.
 */
export function DesktopNav({ activeId }: { activeId: string | null }) {
  return (
    <Highlight
      as="nav"
      aria-label="Sections"
      mode="parent"
      controlledItems
      value={activeId}
      hover={false}
      transition={transitions.spring}
      containerClassName="hidden items-center md:flex"
      className="rounded-none bg-term/15"
    >
      {NAV_ITEMS.map((item) => (
        <HighlightItem key={item.id} value={item.id} asChild>
          <a
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "true" : undefined}
            className={cn(
              "relative px-2.5 py-1 text-xs lowercase text-muted-foreground transition-colors duration-200 outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-term",
              activeId === item.id && "text-term",
            )}
          >
            {item.label}
          </a>
        </HighlightItem>
      ))}
    </Highlight>
  );
}
