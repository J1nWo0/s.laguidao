import { Reveal } from "@/components/common/reveal";
import { sectionHeadingId } from "@/components/common/section";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

type SectionHeadingProps = {
  sectionId: SectionId;
  /** Two-digit chapter number, e.g. `"01"`. */
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  sectionId,
  index,
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        centered ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <Reveal className="flex items-center gap-3">
        <span className="font-mono text-xs tabular-nums text-brand">{index}</span>
        <span className="h-px w-8 bg-gradient-to-r from-brand to-transparent" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.06}>
        <h2
          id={sectionHeadingId(sectionId)}
          className="max-w-2xl text-3xl font-semibold sm:text-4xl lg:text-5xl"
        >
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
              centered && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
