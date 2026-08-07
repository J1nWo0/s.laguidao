"use client";

import { useEffect, useState, type FocusEvent, type ReactNode } from "react";

import { BracketButton } from "@/components/common/bracket-link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

/** How long a page stays up before the pager moves on by itself. */
const AUTOPLAY_MS = 5000; 

function pad(value: number): string {
	return String(value).padStart(2, "0");
}

/**
 * Steps through the projects a page at a time. Every page stays in the
 * document and is only hidden, so the markup a crawler reads is still the
 * whole list.
 *
 * Pages turn on their own, holding while the pointer or focus is inside the
 * block. A manual step restarts that wait rather than ending it, and
 * `prefers-reduced-motion` leaves the buttons as the only way through.
 */
export function ProjectsPager({
	pages,
	className,
}: {
	pages: readonly ReactNode[];
	className?: string;
}) {
	const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
	const [active, setActive] = useState(0);
	const [paused, setPaused] = useState(false);

	const count = pages.length;

	useEffect(() => {
		if (paused || reduced || count < 2) return;

		const timer = window.setTimeout(() => {
			setActive((active + 1) % count);
		}, AUTOPLAY_MS);

		return () => window.clearTimeout(timer);
	}, [active, paused, reduced, count]);

	if (count === 0) return null;

	function go(delta: -1 | 1) {
		setActive((current) => (current + delta + count) % count);
	}

	/** Moving between the controls is still inside the block, so it stays held. */
	function handleBlur(event: FocusEvent<HTMLDivElement>) {
		if (event.currentTarget.contains(event.relatedTarget)) return;
		setPaused(false);
	}

	return (
		<div
			role="group"
			aria-roledescription="carousel"
			aria-label="Projects"
			onPointerEnter={() => setPaused(true)}
			onPointerLeave={() => setPaused(false)}
			onFocus={() => setPaused(true)}
			onBlur={handleBlur}
			className={className}
		>
      {count > 1 ? (
				<div className="rule-dashed flex items-baseline justify-between pt-6 pb-4">
					<BracketButton
						onClick={() => go(-1)}
						aria-label="Previous projects"
					>
						prev
					</BracketButton>

					<span
						aria-live="polite"
						className="text-xs text-muted-foreground tabular-nums"
					>
						{pad(active + 1)} / {pad(count)}
					</span>

					<BracketButton
						onClick={() => go(1)}
						aria-label="Next projects"
					>
						next
					</BracketButton>
				</div>
			) : null}

			{pages.map((page, index) => (
				<ul
					key={index}
					hidden={index !== active}
					aria-roledescription="slide"
					aria-label={`page ${pad(index + 1)} of ${pad(count)}`}
					className={cn(
						"flex flex-col",
						index === active && "animate-in fade-in-0 duration-300",
					)}
				>
					{page}
				</ul>
			))}

			{/* {count > 1 ? (
				<div className="rule-dashed flex items-baseline justify-between pt-6 pb-4">
					<BracketButton
						onClick={() => go(-1)}
						aria-label="Previous projects"
					>
						prev
					</BracketButton>

					<span
						aria-live="polite"
						className="text-xs text-muted-foreground tabular-nums"
					>
						{pad(active + 1)} / {pad(count)}
					</span>

					<BracketButton
						onClick={() => go(1)}
						aria-label="Next projects"
					>
						next
					</BracketButton>
				</div>
			) : null} */}
		</div>
	);
}
