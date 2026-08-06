import { Bot, Braces, Database, Server, Workflow, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SpotlightCard } from "@/components/common/spotlight-card";
import { TechPill } from "@/components/common/tech-pill";
import type { SkillGroup, SkillGroupIcon } from "@/types";

const GROUP_ICONS: Record<SkillGroupIcon, LucideIcon> = {
  braces: Braces,
  server: Server,
  database: Database,
  wrench: Wrench,
  bot: Bot,
  workflow: Workflow,
};

export function SkillGroupCard({ group }: { group: SkillGroup }) {
  const Icon = GROUP_ICONS[group.icon];

  return (
    <SpotlightCard className="flex h-full flex-col gap-5 p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg border border-border/70 bg-muted/40 text-brand">
          <Icon className="size-4" />
        </span>
        <h3 className="text-base font-medium">{group.title}</h3>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        {group.description}
      </p>

      <ul className="mt-auto flex flex-wrap gap-1.5">
        {group.skills.map((skill) => (
          <li key={skill}>
            <TechPill size="sm">{skill}</TechPill>
          </li>
        ))}
      </ul>
    </SpotlightCard>
  );
}
