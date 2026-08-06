"use client";

import * as React from "react";

import { Caret, PromptChrome } from "@/components/common/prompt-line";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getStrictContext } from "@/lib/get-strict-context";
import { cn } from "@/lib/utils";

/** Pause before a command starts typing, per keystroke, and after the last one. */
const START_MS = 180;
const KEY_MS = 34;
const SETTLE_MS = 220;

type BootSequenceContext = {
	/** Index of the step currently typing. Everything below it has finished. */
	cursor: number;
	/** Hands the sequence to the next step. Safe to call more than once. */
	finish: (step: number) => void;
};

const [BootSequenceProvider, useBootSequence] =
	getStrictContext<BootSequenceContext>("BootSequence");

type BootStatus = "waiting" | "running" | "done";

function useBootStatus(step: number): BootStatus {
	const { cursor } = useBootSequence();

	if (cursor > step) return "done";
	return cursor === step ? "running" : "waiting";
}

/**
 * Types the hero out like a shell session on load: one command at a time, each
 * followed by its output. Steps are numbered by the `step` prop rather than by
 * render order, so the markup inside stays server-rendered.
 *
 * `prefers-reduced-motion` jumps straight to the finished state.
 */
export function BootSequence({ children }: { children: React.ReactNode }) {
	const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
	const [cursor, setCursor] = React.useState(0);

	const finish = React.useCallback((step: number) => {
		setCursor((current) => (step < current ? current : step + 1));
	}, []);

	const value = React.useMemo(
		() => ({ cursor: reduced ? Number.POSITIVE_INFINITY : cursor, finish }),
		[reduced, cursor, finish],
	);

	return (
		<BootSequenceProvider value={value}>{children}</BootSequenceProvider>
	);
}

type BootPromptProps = {
	step: number;
	/** The command to type. Omit for a bare prompt that only waits. */
	command?: string;
	/** Keeps the cursor on this line once it is done — the idle prompt. */
	caret?: boolean;
	className?: string;
};

/** A `PromptLine` whose command types itself in when the sequence reaches it. */
export function BootPrompt({
	step,
	command,
	caret = false,
	className,
}: BootPromptProps) {
	const { finish } = useBootSequence();
	const status = useBootStatus(step);
	const [keyed, setKeyed] = React.useState(0);

	React.useEffect(() => {
		if (status !== "running") return;

		const total = command?.length ?? 0;
		let count = 0;
		let timer = window.setTimeout(tick, START_MS);

		function tick() {
			if (count < total) {
				count += 1;
				setKeyed(count);
				timer = window.setTimeout(tick, KEY_MS);
				return;
			}

			timer = window.setTimeout(() => finish(step), SETTLE_MS);
		}

		return () => window.clearTimeout(timer);
	}, [command, finish, status, step]);

	const typing = status === "running";
	const typed = status === "done" ? command : command?.slice(0, keyed);
	/** The cursor rides the active line, then rests on whichever line asks for it. */
	const showCaret = typing || caret;

	return (
		<p
			data-reveal={status === "waiting" ? "pending" : "shown"}
			className={cn(
				"reveal flex flex-wrap items-baseline gap-x-2 text-sm",
				className,
			)}
		>
			<PromptChrome />

			{command ? (
				<span className="text-foreground">
					<span aria-hidden>{typed}</span>
					{/* Screen readers get the whole command at once, never letter by letter. */}
					<span className="sr-only">{command}</span>
					{showCaret ? (
						<Caret steady={typing} className="ml-0.5" />
					) : null}
				</span>
			) : showCaret ? (
				<Caret steady={typing} />
			) : null}
		</p>
	);
}

/** Output for a step: present in the HTML from the start, faded in on its turn. */
export function BootReveal({
	step,
	children,
	className,
}: {
	step: number;
	children: React.ReactNode;
	className?: string;
}) {
	const status = useBootStatus(step);

	return (
		<div
			data-reveal={status === "done" ? "shown" : "pending"}
			className={cn("reveal", className)}
		>
			{children}
		</div>
	);
}
