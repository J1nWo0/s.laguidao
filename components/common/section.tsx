import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

/** Derives the heading id a section's `aria-labelledby` points at. */
export function sectionHeadingId(id: SectionId): string {
  return `${id}-heading`;
}

type SectionProps = Omit<React.ComponentProps<"section">, "id"> & {
  id: SectionId;
  /** Escape hatch for sections that manage their own container width. */
  bleed?: boolean;
  containerClassName?: string;
};

/**
 * Consistent vertical rhythm, scroll-spy anchor and accessible labelling for
 * every top-level section of the page.
 */
export function Section({
  id,
  bleed = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={sectionHeadingId(id)}
      className={cn(
        "relative scroll-mt-20 py-20 sm:py-24 lg:py-32",
        className,
      )}
      {...props}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
