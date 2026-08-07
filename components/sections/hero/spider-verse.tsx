"use client";

import * as React from "react";

import { PROFILE } from "@/data/profile";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getStrictContext } from "@/lib/get-strict-context";
import { cn } from "@/lib/utils";

/** Glitch in, swap the name, hold, then glitch back out. */
const TEAR_MS = 220;
const SETTLE_MS = 480;
const HOLD_MS = 4200;

type SpiderVerseContext = {
	/** The mask currently on the heading, or `null` for the real name. */
	alias: string | null;
	/** True while the name is tearing between the two. */
	tearing: boolean;
	reveal: (alias: string) => void;
};

const [SpiderVerseProvider, useSpiderVerse] =
	getStrictContext<SpiderVerseContext>("SpiderVerse");

export { useSpiderVerse };

/**
 * Holds the mask the hero prompt has been talked into wearing. The terminal
 * that triggers it and the heading that shows it are siblings, so the state
 * has to live above both.
 */
export function SpiderVerse({ children }: { children: React.ReactNode }) {
	const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
	const [alias, setAlias] = React.useState<string | null>(null);
	const [tearing, setTearing] = React.useState(false);

	/** Every timer in flight, so a second command does not stack onto the first. */
	const timers = React.useRef<number[]>([]);

	const clearTimers = React.useCallback(() => {
		for (const timer of timers.current) window.clearTimeout(timer);
		timers.current = [];
	}, []);

	React.useEffect(() => clearTimers, [clearTimers]);

	const reveal = React.useCallback(
		(next: string) => {
			clearTimers();

			const after = (delay: number, run: () => void) => {
				timers.current.push(window.setTimeout(run, delay));
			};

			if (reduced) {
				setAlias(next);
				after(HOLD_MS, () => setAlias(null));
				return;
			}

			/** The swap lands mid-tear, so the name is never seen changing cleanly. */
			setTearing(true);
			after(TEAR_MS, () => setAlias(next));
			after(TEAR_MS + SETTLE_MS, () => setTearing(false));

			after(HOLD_MS, () => setTearing(true));
			after(HOLD_MS + TEAR_MS, () => setAlias(null));
			after(HOLD_MS + TEAR_MS + SETTLE_MS, () => setTearing(false));
		},
		[clearTimers, reduced],
	);

	const value = React.useMemo(
		() => ({ alias, tearing, reveal }),
		[alias, tearing, reveal],
	);

	return (
		<SpiderVerseProvider value={value}>{children}</SpiderVerseProvider>
	);
}

/**
 * The hero name. Screen readers always get the real one — the mask is a visual
 * gag, and the heading labels the section, so its accessible name has to hold
 * still.
 */
export function GlitchName({ className }: { className?: string }) {
	const { alias, tearing } = useSpiderVerse();
	const shown = alias ?? PROFILE.fullName;

	return (
		<>
			<span
				aria-hidden
				data-text={shown}
				data-glitch={tearing ? "on" : "off"}
				className={cn("glitch", className)}
			>
				{shown}
			</span>
			<span className="sr-only">{PROFILE.fullName}</span>
		</>
	);
}
