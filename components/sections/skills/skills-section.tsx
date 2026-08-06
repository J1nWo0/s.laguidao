import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { SkillGroupCard } from "@/components/sections/skills/skill-group-card";
import { SkillsTotals } from "@/components/sections/skills/skills-totals";
import { SKILL_GROUPS } from "@/data/skills";

export function SkillsSection() {
  return (
    <Section id="skills" className="border-t border-border/50">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          sectionId="skills"
          index="04"
          eyebrow="Toolkit"
          title={
            <>
              The stack I reach for{" "}
              <span className="font-display text-gradient-brand">
                by instinct
              </span>
            </>
          }
        />

        <Reveal delay={0.12} className="lg:shrink-0">
          <SkillsTotals />
        </Reveal>
      </div>

      <RevealGroup
        as="ul"
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {SKILL_GROUPS.map((group) => (
          <RevealItem key={group.id} as="li">
            <SkillGroupCard group={group} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
