import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  /** Seconds for one full loop; larger is slower. */
  duration?: number;
  className?: string;
};

/**
 * Infinite horizontal ticker. The list is rendered twice so the CSS animation
 * can translate by exactly -50% and loop without a visible seam.
 */
export function Marquee({ items, duration = 42, className }: MarqueeProps) {
  return (
    <div
      className={cn("group relative flex overflow-hidden mask-fade-x", className)}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex items-center"
          >
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-8 px-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70"
              >
                {item}
                <span className="size-1 rounded-full bg-brand/50" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
