import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { EducationCard } from "@/components/sections/about/education-card";
import { EDUCATION } from "@/data/education";
import { PROFILE, QUICK_FACTS } from "@/data/profile";

const [primaryEducation] = EDUCATION;

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading
        sectionId="about"
        index="01"
        eyebrow="About"
        title={
          <>
            A backend developer who prefers{" "}
            <span className="font-display text-gradient-brand">
              the quiet layer
            </span>
          </>
        }
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <RevealGroup className="flex flex-col gap-5" stagger={0.1}>
          {PROFILE.bio.map((paragraph) => (
            <RevealItem
              key={paragraph.slice(0, 24)}
              as="span"
              className="block text-base leading-[1.75] text-muted-foreground sm:text-[1.05rem]"
            >
              {paragraph}
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="flex flex-col gap-8">
          <RevealGroup as="ul" className="flex flex-col" stagger={0.07}>
            {QUICK_FACTS.map((fact) => (
              <RevealItem
                key={fact.label}
                as="li"
                className="flex flex-col gap-1 border-t border-border/60 py-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {fact.label}
                </span>
                <span className="text-sm text-foreground sm:text-right">
                  {fact.value}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          {primaryEducation ? (
            <Reveal delay={0.1}>
              <EducationCard education={primaryEducation} />
            </Reveal>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
