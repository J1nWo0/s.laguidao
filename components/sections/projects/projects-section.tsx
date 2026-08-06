import { BracketLink } from "@/components/common/bracket-link";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectEntry } from "@/components/sections/projects/project-entry";
import { SOCIAL_LINKS } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { formatUrlLabel } from "@/lib/format";

const GITHUB = SOCIAL_LINKS.find((link) => link.platform === "github");

export function ProjectsSection() {
  return (
    <Section id="projects" className="rule">
      <SectionHeading
        sectionId="projects"
        index="03"
        label="projects"
        meta={`${PROJECTS.length} projects`}
        description="Fewer projects, described honestly — here is the one I keep pointing people to, plus everything else in the open."
      />

      <ul className="mt-10 flex flex-col">
        {PROJECTS.map((project, index) => (
          <ProjectEntry
            key={project.id}
            project={project}
            index={String(index + 1).padStart(2, "0")}
          />
        ))}
      </ul>

      {GITHUB ? (
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-xs text-muted-foreground">
            more experiments at {formatUrlLabel(GITHUB.href)}
          </p>

          <BracketLink href={GITHUB.href} external>
            browse repositories
          </BracketLink>
        </div>
      ) : null}
    </Section>
  );
}
