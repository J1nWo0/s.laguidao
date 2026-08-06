"use client";

import { useEffect, useState } from "react";

type UseActiveSectionOptions = {
	/** Fraction of the viewport height treated as the detection line from the top. */
	offsetRatio?: number;
};

/**
 * Scroll spy for a single-page layout. Tracks which of `ids` is closest to the
 * top of the viewport and returns its id, or `null` before the first section.
 */
export function useActiveSection(
	ids: readonly string[],
	{ offsetRatio = 0.35 }: UseActiveSectionOptions = {},
): string | null {
	const [activeId, setActiveId] = useState<string | null>(null);

	useEffect(() => {
		if (ids.length === 0) return;

		let frame = 0;

		const resolveActive = () => {
			frame = 0;
			const line = window.innerHeight * offsetRatio;

			let current: string | null = null;
			for (const id of ids) {
				const element = document.getElementById(id);
				if (!element) continue;
				if (element.getBoundingClientRect().top - line <= 0)
					current = id;
			}

			// Guarantee the last section wins once the page is scrolled to the bottom.
			const atBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 2;
			if (atBottom) current = ids[ids.length - 1];

			setActiveId(current);
		};

		const onScroll = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(resolveActive);
		};

		resolveActive();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [ids, offsetRatio]);

	return activeId;
}
