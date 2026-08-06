import { cn } from "@/lib/utils";

/** Availability chip with a pulsing indicator. */
export function StatusPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/60 py-1.5 pr-4 pl-3 text-xs text-muted-foreground backdrop-blur-sm",
        className,
      )}
    >
      <span className="relative grid size-2 place-items-center">
        <span className="absolute size-2 rounded-full bg-emerald-500/70 animate-pulse-ring" />
        <span className="size-2 rounded-full bg-emerald-500" />
      </span>
      {children}
    </span>
  );
}
