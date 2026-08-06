import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ExperienceItem } from "@/components/sections/experience/experience-item";
import { EXPERIENCE } from "@/data/experience";

export function ExperienceSection() {
  return (
    <Section id="experience" className="rule">
      <SectionHeading
        sectionId="experience"
        index="02"
        label="experience"
        meta={`${EXPERIENCE.length} roles`}
        description="Two roles, one throughline: take the manual, brittle part of a system and turn it into something that runs on its own."
      />

      <ul className="mt-10 flex flex-col">
        {EXPERIENCE.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
      </ul>
    </Section>
  );
}
