import { GraduationCap } from "lucide-react";

import { SpotlightCard } from "@/components/common/spotlight-card";
import { TechPill } from "@/components/common/tech-pill";
import { formatDateRange } from "@/lib/format";
import type { Education } from "@/types";

export function EducationCard({ education }: { education: Education }) {
  return (
    <SpotlightCard className="p-6">
      <div className="flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border/70 bg-muted/40 text-brand">
          <GraduationCap className="size-5" />
        </span>

        <div className="min-w-0">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            Education
          </p>
          <h3 className="mt-2 text-base font-medium">{education.degree}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {education.school}
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground/80">
            {formatDateRange(education.start, education.end)} ·{" "}
            {education.location}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {education.coursework.map((course) => (
          <li key={course}>
            <TechPill size="sm">{course}</TechPill>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}
