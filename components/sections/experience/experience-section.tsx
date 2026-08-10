import { PdfDialog } from "@/components/common/pdf-dialog";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ExperienceItem } from "@/components/sections/experience/experience-item";
import { EXPERIENCE } from "@/data/experience";
import { PROFILE } from "@/data/profile";

/** Whichever documents are published, in the order they are offered. */
const DOCS = [
	...(PROFILE.resumeUrl ? [{ name: "resume", url: PROFILE.resumeUrl }] : []),
	...(PROFILE.cvUrl ? [{ name: "cv", url: PROFILE.cvUrl }] : []),
];

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
					<ExperienceItem
						key={experience.id}
						experience={experience}
					/>
				))}
			</ul>

			{DOCS.length > 0 ? (
				<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
					<p className="text-xs text-muted-foreground">
						full history, education and references in the{" "}
						{DOCS.map((doc) => doc.name).join("/")}
					</p>

					<div className="flex flex-wrap items-baseline gap-x-6 gap-y-20">
						{DOCS.map((doc) => (
							<PdfDialog
								key={doc.name}
								url={doc.url}
								fileName={`sherwin-laguidao-${doc.name}.pdf`}
								label={`Sherwin Laguidao ${doc.name}`}
								trigger={doc.name}
							/>
						))}
					</div>
				</div>
			) : null}
		</Section>
	);
}
