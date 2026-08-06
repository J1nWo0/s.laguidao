import { RevealGroup } from "@/components/common/reveal";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ExperienceItem } from "@/components/sections/experience/experience-item";
import { EXPERIENCE } from "@/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience" className="border-t border-border/50">
      <SectionHeading
        sectionId="experience"
        index="02"
        eyebrow="Experience"
        title={
          <>
            Where the work has{" "}
            <span className="font-display text-gradient-brand">shipped</span>
          </>
        }
        description="Two roles, one throughline: take the manual, brittle part of a system and turn it into something that runs on its own."
      />

      <RevealGroup as="ul" className="mt-14 flex flex-col" stagger={0.14}>
        {EXPERIENCE.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </RevealGroup>
    </Section>
  );
}
