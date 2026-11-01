"use client";

import { motion, useMotionValue } from "motion/react";
import { useEffect, useRef } from "react";

import { ProjectCover } from "@/components/common/project-cover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Minimum space, in pixels, between the preview and the window edge. */
const EDGE_GAP = 16;

type HoverPreviewProps = {
	projects: readonly Project[];
	/** The project under the pointer, or `null` to tuck the preview away. */
	activeId: string | null;
};

/**
 * A frame that follows the cursor and shows whichever project is hovered. Every
 * cover is mounted up front and cross-faded, so switching rows never waits on
 * an image. Touch screens never get it — they see covers inline instead.
 */
export function HoverPreview({ projects, activeId }: HoverPreviewProps) {
	const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const frame = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!finePointer) return;

		/** Centred on the cursor, but held back from the edges so no side is cut off. */
		const onMove = (event: PointerEvent) => {
			const node = frame.current;
			const halfWidth = (node?.offsetWidth ?? 0) / 2 + EDGE_GAP;
			const halfHeight = (node?.offsetHeight ?? 0) / 2 + EDGE_GAP;
			const maxX = document.documentElement.clientWidth - halfWidth;
			const maxY = document.documentElement.clientHeight - halfHeight;
			x.set(Math.min(Math.max(event.clientX, halfWidth), maxX));
			y.set(Math.min(Math.max(event.clientY, halfHeight), maxY));
		};

		window.addEventListener("pointermove", onMove, { passive: true });
		return () => window.removeEventListener("pointermove", onMove);
	}, [finePointer, x, y]);

	if (!finePointer) return null;

	return (
		<motion.div
			aria-hidden
			style={{ x, y }}
			className="pointer-events-none fixed top-0 left-0 z-40"
		>
			<div
				ref={frame}
				className={cn(
					"relative aspect-[16/10] w-[min(26rem,32vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md transition-[opacity,scale] duration-300 ease-out",
					activeId ? "scale-100 opacity-100" : "scale-90 opacity-0",
				)}
			>
				{projects.map((project) => (
					<ProjectCover
						key={project.id}
						project={project}
						sizes="26rem"
						className={cn(
							"absolute inset-0 transition-opacity duration-300",
							project.id === activeId ? "opacity-100" : "opacity-0",
						)}
					/>
				))}
			</div>
		</motion.div>
	);
}
