import { cn } from "@/lib/utils";

/**
 * Decorative page background: blueprint grid plus three drifting colour fields.
 * Rendered once behind the hero and pinned so it never affects layout.
 */
export function AuroraBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-blueprint mask-fade-b opacity-70" />

      <div className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[110px] animate-aurora" />
      <div
        className="absolute -top-24 right-[8%] h-[26rem] w-[26rem] rounded-full bg-brand-violet/20 blur-[110px] animate-aurora"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute top-[18%] left-[4%] h-[22rem] w-[22rem] rounded-full bg-brand-cyan/20 blur-[110px] animate-aurora"
        style={{ animationDelay: "-14s" }}
      />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
