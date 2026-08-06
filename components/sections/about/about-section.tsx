import { LeaderRow } from "@/components/common/leader-row";
import { Section } from "@/components/common/section";
import {
	SectionHeading,
	SubHeading,
} from "@/components/common/section-heading";
import { EducationList } from "@/components/sections/about/education-list";
import { PROFILE, QUICK_FACTS } from "@/data/profile";

export function AboutSection() {
	return (
		<Section id="about" className="rule">
			<SectionHeading sectionId="about" index="01" label="about" />

			<div className="mt-10 flex flex-col gap-12">
				<div className="flex max-w-[68ch] flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
					{PROFILE.bio.map((paragraph) => (
						<p key={paragraph.slice(0, 24)}>{paragraph}</p>
					))}
				</div>

				<div className="flex flex-col gap-4">
					<SubHeading>facts</SubHeading>

					<div className="flex flex-col gap-2.5">
						{QUICK_FACTS.map((fact) => (
							<LeaderRow
								key={fact.label}
								label={fact.label.toLowerCase()}
							>
								{fact.value}
							</LeaderRow>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<SubHeading>education</SubHeading>
					<EducationList />
				</div>
			</div>
		</Section>
	);
}
