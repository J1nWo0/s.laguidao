"use client";

import { ArrowLink } from "@/components/common/arrow-link";
import { PdfDialog } from "@/components/common/pdf-dialog";
import { ProjectCover } from "@/components/common/project-cover";
import { StackList } from "@/components/common/stack-list";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import { slugify } from "@/lib/format";
import type { Project } from "@/types";

type ProjectDrawerProps = {
	project: Project | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

/** The case study: everything the index row leaves out. */
export function ProjectDrawer({ project, open, onOpenChange }: ProjectDrawerProps) {
	return (
		<Sheet open={open && project !== null} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				showCloseButton={false}
				className="gap-0 overflow-y-auto bg-background p-0 data-[side=right]:w-full data-[side=right]:border-l-0 data-[side=right]:sm:max-w-2xl"
			>
				{project ? (
					<>
						<div className="sticky top-0 z-10 flex items-center justify-between bg-background px-6 py-4 sm:px-10">
							<span className="text-xs uppercase tracking-[0.18em] text-muted-foreground tabular-nums">
								Project &#183; {project.year}
							</span>
							<SheetClose className="text-sm outline-none transition-colors hover:text-brand focus-visible:text-brand">
								Close
							</SheetClose>
						</div>

						<div className="flex flex-col gap-10 px-6 pb-12 sm:px-10">
							<ProjectCover project={project} priority sizes="(min-width: 640px) 42rem, 100vw" />

							<div className="flex flex-col gap-4">
								<SheetTitle className="text-5xl font-medium tracking-[-0.035em] sm:text-6xl">
									{project.name}
								</SheetTitle>
								<SheetDescription className="font-serif text-2xl leading-snug text-foreground italic">
									{project.tagline}
								</SheetDescription>
							</div>

							<p className="text-base leading-relaxed text-muted-foreground">
								{project.description}
							</p>

							<ul className="flex flex-col gap-3 text-sm leading-relaxed">
								{project.highlights.map((highlight) => (
									<li key={highlight} className="hairline flex gap-4 pt-3">
										<span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
										{highlight}
									</li>
								))}
							</ul>

							<StackList items={project.stack} />

							<div className="hairline flex flex-wrap items-baseline gap-x-8 gap-y-3 pt-6">
								{project.links.live ? (
									<ArrowLink href={project.links.live} external className="text-base">
										Live site
									</ArrowLink>
								) : null}
								{project.links.source ? (
									<ArrowLink href={project.links.source} external className="text-base">
										Source
									</ArrowLink>
								) : null}
								{project.links.docs ? (
									<PdfDialog
										url={project.links.docs}
										fileName={`${slugify(project.name)}.pdf`}
										label={`${project.name} — Documentation`}
										triggerClassName="text-base"
									/>
								) : null}
							</div>
						</div>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	);
}
