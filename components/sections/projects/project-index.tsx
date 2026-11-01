"use client";

import { useState } from "react";

import { HoverPreview } from "@/components/common/hover-preview";
import { ProjectCover } from "@/components/common/project-cover";
import { ProjectDrawer } from "@/components/sections/projects/project-drawer";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * Project names set large, one per row. Hovering one dims the rest and brings
 * up its cover beside the cursor; clicking opens the full case study.
 */
export function ProjectIndex({ projects }: { projects: readonly Project[] }) {
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	/** Kept after closing so the drawer still has content while it animates out. */
	const [selected, setSelected] = useState<Project | null>(null);
	const [open, setOpen] = useState(false);

	return (
		<>
			<ul
				className="border-b border-border"
				onPointerLeave={() => setHoveredId(null)}
			>
				{projects.map((project, index) => {
					const dimmed = hoveredId !== null && hoveredId !== project.id;

					return (
						<li key={project.id} className="hairline">
							<button
								type="button"
								onPointerEnter={() => setHoveredId(project.id)}
								onClick={() => {
									setHoveredId(null);
									setSelected(project);
									setOpen(true);
								}}
								className="group/project flex w-full flex-col gap-5 py-8 text-left outline-none sm:py-10"
							>
								<ProjectCover project={project} className="hover-fine:hidden" />

								<span className="flex w-full items-baseline gap-5 sm:gap-8">
									<span className="w-6 shrink-0 text-xs tabular-nums text-muted-foreground">
										{String(index + 1).padStart(2, "0")}
									</span>

									<span
										className={cn(
											"min-w-0 flex-1 text-index tracking-[-0.035em] transition-[color,translate] duration-500 ease-out group-hover/project:translate-x-3 group-hover/project:text-brand group-focus-visible/project:text-brand",
											dimmed && "text-muted-foreground/50",
										)}
									>
										{project.name}
									</span>

									<span className="hidden shrink-0 text-sm tabular-nums text-muted-foreground sm:inline">
										{project.year}
									</span>

									<span
										aria-hidden
										className="shrink-0 text-xl text-muted-foreground transition-[color,translate] duration-500 group-hover/project:translate-x-1 group-hover/project:text-brand"
									>
										&#8594;
									</span>
								</span>
							</button>
						</li>
					);
				})}
			</ul>

			<HoverPreview projects={projects} activeId={hoveredId} />
			<ProjectDrawer project={selected} open={open} onOpenChange={setOpen} />
		</>
	);
}
