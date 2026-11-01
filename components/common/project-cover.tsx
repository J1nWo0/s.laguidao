import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Project } from "@/types";

type ProjectCoverProps = {
	project: Project;
	className?: string;
	/** Loads the screenshot eagerly; for covers that are visible on open. */
	priority?: boolean;
	sizes?: string;
};

/**
 * The project's screenshot, or — for projects without one — a typographic
 * cover generated from its name, so every project gets the same frame.
 */
export function ProjectCover({
	project,
	className,
	priority = false,
	sizes = "(min-width: 1024px) 40vw, 100vw",
}: ProjectCoverProps) {
	return (
		<div
			className={cn(
				"relative aspect-[16/10] w-full overflow-hidden rounded-md bg-muted",
				className,
			)}
		>
			{project.preview ? (
				<Image
					src={project.preview.src}
					alt={project.preview.alt}
					fill
					priority={priority}
					sizes={sizes}
					className="object-cover object-top"
				/>
			) : (
				<div
					aria-hidden
					className="absolute inset-0 flex flex-col justify-between bg-brand/12 p-5 text-brand sm:p-7"
				>
					<span className="text-xs uppercase tracking-[0.18em] tabular-nums">
						{project.year}
					</span>
					<span className="font-serif text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] italic">
						{project.name}
					</span>
				</div>
			)}
		</div>
	);
}
