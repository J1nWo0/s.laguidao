import { PROFILE } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Blinking block cursor. Pure CSS, and stilled by `prefers-reduced-motion`. */
export function Caret({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block h-[1em] w-[0.55em] translate-y-[0.1em] bg-term animate-caret",
        className,
      )}
    />
  );
}

/** `guest@s.laguidao:~$` on its own, for places that need their own wrapper. */
export function PromptChrome({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("text-muted-foreground", className)}>
      guest@{PROFILE.name}:~
      <span className="text-term">$</span>
    </span>
  );
}

type PromptLineProps = {
  /** The typed command, e.g. `"cat about.txt"`. Omit for a bare prompt. */
  command?: string;
  /** Appends a blinking cursor after the command. */
  caret?: boolean;
  className?: string;
};

/**
 * `guest@s.laguidao:~$ whoami`. The shell chrome is decorative and hidden from
 * assistive tech; the command itself stays readable because it narrates the
 * content that follows.
 */
export function PromptLine({ command, caret = false, className }: PromptLineProps) {
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2 text-sm", className)}>
      <PromptChrome />

      {command ? <span className="text-foreground">{command}</span> : null}
      {caret ? <Caret /> : null}
    </p>
  );
}
