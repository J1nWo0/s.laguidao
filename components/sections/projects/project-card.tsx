import { ArrowUpRight } from "lucide-react";

import { SocialIcon } from "@/components/common/social-icon";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { TechPill } from "@/components/common/tech-pill";
import { ProjectPreview } from "@/components/sections/projects/project-preview";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="p-6 sm:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-14">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-brand">Featured</span>
            <span className="h-px w-6 bg-border" />
            <span>{project.year}</span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold sm:text-3xl">
              {project.name}
            </h3>
            <p className="text-base text-brand/90">{project.tagline}</p>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description}
            </p>
          </div>

          <ul className="flex flex-col gap-2.5">
            {project.highlights.map((highlight) => (
              <li
                key={highlight.slice(0, 32)}
                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1 shrink-0 rounded-full bg-brand/60"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <TechPill size="sm">{tech}</TechPill>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            {project.links.live ? (
              <Button asChild size="lg" className="group h-10">
                <a href={project.links.live} target="_blank" rel="noreferrer">
                  Visit live site
                  <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Button>
            ) : null}

            {project.links.source ? (
              <Button asChild size="lg" variant="outline" className="h-10">
                <a href={project.links.source} target="_blank" rel="noreferrer">
                  <SocialIcon
                    platform="github"
                    data-icon="inline-start"
                    className="size-4"
                  />
                  Source
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        {project.links.live ? (
          <ProjectPreview url={project.links.live} label={project.name} />
        ) : null}
      </div>
    </SpotlightCard>
  );
}
