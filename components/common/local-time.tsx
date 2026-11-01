"use client";

import { useSyncExternalStore } from "react";

const FORMAT = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	minute: "2-digit",
	timeZone: "Asia/Manila",
});

const TICK_MS = 15_000;

function subscribe(onChange: () => void) {
	const id = window.setInterval(onChange, TICK_MS);
	return () => window.clearInterval(id);
}

/** Snapshots must be stable between reads, so the clock is quantised to the tick. */
const getSnapshot = () => Math.floor(Date.now() / TICK_MS) * TICK_MS;
const getServerSnapshot = () => null;

/**
 * Live clock in Manila. The time depends on when the page is viewed, so the
 * static build renders a placeholder and the browser fills it in.
 */
export function LocalTime({ className }: { className?: string }) {
	const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	const date = now === null ? null : new Date(now);

	return (
		<time
			dateTime={date?.toISOString()}
			suppressHydrationWarning
			className={className}
		>
			{date ? FORMAT.format(date) : "--:--"}
		</time>
	);
}
