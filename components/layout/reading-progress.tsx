"use client";

import {
	ScrollProgress,
	ScrollProgressProvider,
} from "@/components/animate-ui/primitives/animate/scroll-progress";

/** Hairline bar pinned to the very top that fills as the page is read. */
export function ReadingProgress() {
	return (
		<ScrollProgressProvider global>
			<div
				aria-hidden
				className="pointer-events-none fixed inset-x-0 top-0 z-100 h-px"
			>
				<ScrollProgress mode="width" className="h-px bg-term" />
			</div>
		</ScrollProgressProvider>
	);
}
