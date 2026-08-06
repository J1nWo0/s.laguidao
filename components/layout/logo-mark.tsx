import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Plain text wordmark with a prompt chevron, used in the header and footer. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <a
      href="#hero"
      className={cn(
        "group inline-flex items-baseline gap-1.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-term",
        className,
      )}
    >
      <span aria-hidden className="text-term">
        &#10095;
      </span>
      <span className="transition-colors group-hover:text-term">{PROFILE.name}</span>
      <span className="sr-only">Back to top</span>
    </a>
  );
}
