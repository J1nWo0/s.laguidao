import { SKILL_TOTALS } from "@/data/skills";

/** The closing line of the tree, the way `tree` reports its own totals. */
export function SkillsTotals({ className }: { className?: string }) {
  return (
    <p className={className}>
      {SKILL_TOTALS.groups} directories &#183; {SKILL_TOTALS.technologies}{" "}
      technologies
    </p>
  );
}
