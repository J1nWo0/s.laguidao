"use client";

import {
  Highlight,
  HighlightItem,
} from "@/components/animate-ui/primitives/effects/highlight";
import { NAV_ITEMS } from "@/data/navigation";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Section links with a pill that glides to whichever section is in view.
 * `activeId` is owned by the header so the mobile nav can share the same state.
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
      className="rounded-full bg-muted/70"
    >
      {NAV_ITEMS.map((item) => (
        <HighlightItem key={item.id} value={item.id} asChild>
          <a
            href={`#${item.id}`}
            aria-current={activeId === item.id ? "true" : undefined}
            className={cn(
              "relative rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors duration-300 outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/50",
              activeId === item.id && "text-foreground",
            )}
          >
            {item.label}
          </a>
        </HighlightItem>
      ))}
    </Highlight>
  );
}
