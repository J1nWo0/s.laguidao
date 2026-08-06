import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/common/reveal";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { SocialIcon } from "@/components/common/social-icon";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { ProjectCard } from "@/components/sections/projects/project-card";
import { PROJECTS } from "@/data/projects";
import { SOCIAL_LINKS } from "@/data/profile";

const GITHUB = SOCIAL_LINKS.find((link) => link.platform === "github");

export function ProjectsSection() {
  return (
    <Section id="projects" className="border-t border-border/50">
      <SectionHeading
        sectionId="projects"
        index="03"
        eyebrow="Selected work"
        title={
          <>
            Things I built{" "}
            <span className="font-display text-gradient-brand">
              end to end
            </span>
          </>
        }
        description="Fewer projects, described honestly — here is the one I keep pointing people to, plus everything else in the open."
      />

      <div className="mt-14 flex flex-col gap-6">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}

        {GITHUB ? (
          <Reveal delay={0.12}>
            <SpotlightCard className="group/link">
              <a
                href={GITHUB.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-4 p-6 outline-none focus-visible:ring-2 focus-visible:ring-brand/50 sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-border/70 bg-muted/40">
                    <SocialIcon platform="github" className="size-5" />
                  </span>
                  <div>
                    <p className="text-base font-medium">
                      More experiments on GitHub
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      github.com/{GITHUB.handle}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 group-hover/link:text-foreground">
                  Browse repositories
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </span>
              </a>
            </SpotlightCard>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
