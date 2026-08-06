import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Wordmark + monogram used in the header and footer. */
export function LogoMark({
  className,
  showName = true,
}: {
  className?: string;
  showName?: boolean;
}) {
  return (
    <a
      href="#hero"
      className={cn(
        "group flex items-center gap-2.5 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
        className,
      )}
    >
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg border border-border/70 bg-card font-mono text-[0.7rem] font-medium tracking-tight">
        <span className="absolute inset-0 bg-gradient-to-br from-brand/25 via-transparent to-brand-violet/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative">{PROFILE.initials}</span>
      </span>
      {showName ? (
        <span className="text-sm font-medium tracking-tight">
          {PROFILE.name}
        </span>
      ) : null}
      <span className="sr-only">Back to top</span>
    </a>
  );
}
