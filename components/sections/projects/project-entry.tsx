import { BracketLink } from "@/components/common/bracket-link";
import { PdfDialog } from "@/components/common/pdf-dialog";
import { MetaRow } from "@/components/common/section";
import { TechList } from "@/components/common/tech-list";
import { TreeList } from "@/components/common/tree-list";
import { slugify } from "@/lib/format";
import type { Project } from "@/types";

export function ProjectEntry({
	project,
	index,
}: {
	project: Project;
	index: string;
}) {
	const { live, source, docs } = project.links;

	return (
		<li className="rule-dashed py-8 first:border-t-0 first:pt-0">
			<MetaRow
				meta={
					<>
						<span className="text-term">{index}</span>
						<span className="opacity-70">{project.year}</span>
					</>
				}
			>
				<h3 className="text-sm sm:text-base">{project.name}</h3>

				<p className="mt-1 text-xs text-muted-foreground">
					{project.tagline}
				</p>

				<p className="mt-4 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
					{project.description}
				</p>

				<TreeList
					items={project.highlights}
					className="mt-4 max-w-[68ch] leading-relaxed text-muted-foreground"
				/>

				<TechList items={project.stack} className="mt-4" />

				{live || source || docs ? (
					<div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
						{live ? (
							<BracketLink href={live} external>
								live
							</BracketLink>
						) : null}
						{source ? (
							<BracketLink href={source} external>
								source
							</BracketLink>
						) : null}
						{docs ? (
							<PdfDialog
								url={docs}
								fileName={`${slugify(project.name)}.pdf`}
								label={`${project.name} documentation`}
							/>
						) : null}
					</div>
				) : null}
			</MetaRow>
		</li>
	);
}
