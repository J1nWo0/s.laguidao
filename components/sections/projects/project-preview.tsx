import { Lock } from "lucide-react";

import { formatUrlLabel } from "@/lib/format";

/**
 * Stand-in browser frame for a live project. Deliberately abstract rather than
 * a screenshot, so it never goes stale when the deployment changes.
 */
export function ProjectPreview({ url, label }: { url: string; label: string }) {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-xl border border-border/70 bg-muted/20"
    >
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-3 py-2">
        <span className="size-2 rounded-full bg-muted-foreground/30" />
        <span className="size-2 rounded-full bg-muted-foreground/30" />
        <span className="size-2 rounded-full bg-muted-foreground/30" />
        <span className="ml-2 flex min-w-0 items-center gap-1.5 rounded-md bg-background/60 px-2 py-0.5 font-mono text-[0.6rem] text-muted-foreground">
          <Lock className="size-2.5 shrink-0" />
          <span className="truncate">{formatUrlLabel(url)}</span>
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-60" />
        <div className="absolute -bottom-16 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-brand/25 blur-3xl" />
        <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-4xl text-gradient-brand sm:text-5xl">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
