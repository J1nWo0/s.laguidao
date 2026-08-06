"use client";

import { CountingNumber } from "@/components/animate-ui/primitives/texts/counting-number";
import { SKILL_TOTALS } from "@/data/skills";

const TOTALS = [
  { label: "Disciplines", value: SKILL_TOTALS.groups },
  { label: "Technologies", value: SKILL_TOTALS.technologies },
] as const;

/** Counts derived from the skills data, so they can never drift out of sync. */
export function SkillsTotals() {
  return (
    <dl className="flex items-center gap-8">
      {TOTALS.map((total) => (
        <div key={total.label} className="flex flex-col gap-1">
          <dd className="font-mono text-3xl font-medium tabular-nums text-foreground sm:text-4xl">
            <CountingNumber number={total.value} inView padStart={false} />
          </dd>
          <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {total.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
