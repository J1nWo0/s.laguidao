import { RevealItem } from "@/components/common/reveal";
import { TechPill } from "@/components/common/tech-pill";
import { Badge } from "@/components/ui/badge";
import { formatDateRange, formatDuration } from "@/lib/format";
import type { WorkExperience } from "@/types";

/** One entry on the experience timeline, including its dot and rail segment. */
export function ExperienceItem({ experience }: { experience: WorkExperience }) {
  const isCurrent = experience.end === null;

  return (
    <RevealItem
      as="li"
      className="group relative pb-14 pl-8 last:pb-0 sm:pl-12"
    >
      <span
        aria-hidden
        className="absolute top-2 left-0 h-full w-px bg-gradient-to-b from-border via-border to-transparent group-last:hidden"
      />
      <span
        aria-hidden
        className="absolute top-1.5 left-0 grid size-3 -translate-x-1/2 place-items-center rounded-full border border-border bg-background transition-colors duration-500 group-hover:border-brand"
      >
        <span className="size-1.5 rounded-full bg-brand opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
      </span>

      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-lg font-medium sm:text-xl">{experience.role}</h3>
          <Badge
            variant={isCurrent ? "default" : "secondary"}
            className="font-mono text-[0.6rem] tracking-wider uppercase"
          >
            {isCurrent ? "Current" : experience.type}
          </Badge>
        </div>

        <p className="text-sm text-brand">{experience.company}</p>

        <p className="font-mono text-xs text-muted-foreground">
          {formatDateRange(experience.start, experience.end)} ·{" "}
          {formatDuration(experience.start, experience.end)} ·{" "}
          {experience.location}
        </p>
      </div>

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {experience.summary}
      </p>

      <ul className="mt-5 flex max-w-2xl flex-col gap-2.5">
        {experience.highlights.map((highlight) => (
          <li
            key={highlight.slice(0, 32)}
            className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
          >
            <span
              aria-hidden
              className="mt-2 size-1 shrink-0 rounded-full bg-brand/60"
            />
            {highlight}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {experience.stack.map((tech) => (
          <li key={tech}>
            <TechPill size="sm">{tech}</TechPill>
          </li>
        ))}
      </ul>
    </RevealItem>
  );
}
