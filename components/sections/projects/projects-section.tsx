import { BracketLink } from "@/components/common/bracket-link";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectEntry } from "@/components/sections/projects/project-entry";
import { ProjectsPager } from "@/components/sections/projects/projects-pager";
import { SOCIAL_LINKS } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { formatUrlLabel } from "@/lib/format";

const GITHUB = SOCIAL_LINKS.find((link) => link.platform === "github");

const PER_PAGE = 1;

/** Entries keep their number from the full list, so page two still starts at 03. */
function buildPages() {
	const pageCount = Math.ceil(PROJECTS.length / PER_PAGE);

	return Array.from({ length: pageCount }, (_, page) =>
		PROJECTS.slice(page * PER_PAGE, (page + 1) * PER_PAGE).map(
			(project, offset) => (
				<ProjectEntry
					key={project.id}
					project={project}
					index={String(page * PER_PAGE + offset + 1).padStart(
						2,
						"0",
					)}
				/>
			),
		),
	);
}

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

			<ProjectsPager className="mt-10" pages={buildPages()} />

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
