import { Section } from "@/components/common/section";
import { SplitReveal } from "@/components/common/split-reveal";
import { ProjectIndex } from "@/components/sections/projects/project-index";
import { PROJECTS } from "@/data/projects";

export function ProjectsSection() {
	return (
		<Section
			id="projects"
			index="03"
			label="Projects"
			meta={`${PROJECTS.length} projects`}
		>
			<SplitReveal
				text="Selected work."
				accent={["work."]}
				className="text-statement font-medium tracking-[-0.03em]"
			/>

			<ProjectIndex projects={PROJECTS} />
		</Section>
	);
}
