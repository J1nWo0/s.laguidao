import { MetaRow } from "@/components/common/section";
import { TechList } from "@/components/common/tech-list";
import { TreeList } from "@/components/common/tree-list";
import { formatCompactRange, formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { WorkExperience } from "@/types";

/** One entry: dates and duration in the gutter, everything else to the right. */
export function ExperienceItem({ experience }: { experience: WorkExperience }) {
  const isCurrent = experience.end === null;

  return (
    <li className="rule-dashed py-8 first:border-t-0 first:pt-0 last:pb-0">
      <MetaRow
        meta={
          <>
            <span className={cn(isCurrent && "text-term")}>
              {formatCompactRange(experience.start, experience.end)}
            </span>
            <span className="opacity-70">
              {formatDuration(experience.start, experience.end)}
            </span>
          </>
        }
      >
        <h3 className="flex flex-wrap items-baseline gap-x-2 text-sm sm:text-base">
          <span>{experience.role}</span>
          <span aria-hidden className="text-muted-foreground">
            @
          </span>
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="text-term underline decoration-dotted underline-offset-4"
            >
              {experience.company}
            </a>
          ) : (
            <span className="text-term">{experience.company}</span>
          )}
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">
          {experience.location} &#183; {experience.type}
        </p>

        <p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
          {experience.summary}
        </p>

        <TreeList
          items={experience.highlights}
          className="mt-4 max-w-[68ch] leading-relaxed text-muted-foreground"
        />

        <TechList items={experience.stack} className="mt-4" />
      </MetaRow>
    </li>
  );
}
