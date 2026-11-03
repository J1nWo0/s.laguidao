import { Section } from "@/components/common/section";
import { SplitReveal } from "@/components/common/split-reveal";
import { SKILL_GROUPS, SKILL_TOTALS } from "@/data/skills";

export function SkillsSection() {
	return (
		<Section
			id="skills"
			index="04"
			label="Skills"
			meta={`${SKILL_TOTALS.technologies} tools`}
		>
			<SplitReveal
				text="Tools I trust."
				accent={["trust."]}
				className="text-statement font-medium tracking-[-0.03em]"
			/>

			<div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
				{SKILL_GROUPS.map((group, index) => (
					<div key={group.id} className="hairline flex flex-col gap-5 pt-5">
						<h3 className="flex items-baseline justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
							{group.title}
							<span className="tabular-nums">
								{String(index + 1).padStart(2, "0")}
							</span>
						</h3>
						<ul className="flex flex-col gap-1.5 text-xl tracking-tight">
							{group.skills.map((skill) => (
								<li key={skill}>{skill}</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</Section>
	);
}
