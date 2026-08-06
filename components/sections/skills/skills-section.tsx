import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { TreeList } from "@/components/common/tree-list";
import { SkillGroupRow } from "@/components/sections/skills/skill-group-row";
import { SkillsTotals } from "@/components/sections/skills/skills-totals";
import { SKILL_GROUPS } from "@/data/skills";

export function SkillsSection() {
	return (
		<Section id="skills" className="rule">
			<SectionHeading
				sectionId="skills"
				index="04"
				label="skills"
				description="The stack I reach for by instinct, grouped by the kind of problem it solves."
			/>

			<div className="mt-10 flex flex-col gap-4">
				<p className="text-sm text-muted-foreground">skills/</p>

				<TreeList
					className="gap-4"
					items={SKILL_GROUPS.map((group) => (
						<SkillGroupRow key={group.id} group={group} />
					))}
				/>

				<SkillsTotals className="pt-2 text-xs text-muted-foreground" />
			</div>
		</Section>
	);
}
