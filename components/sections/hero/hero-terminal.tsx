"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState, KeyboardEvent, MouseEvent, SyntheticEvent } from "react";

import { BracketLink } from "@/components/common/bracket-link";
import { Caret, PromptChrome } from "@/components/common/prompt-line";
import { useBootReached } from "@/components/sections/hero/boot-sequence";
import { useSpiderVerse } from "@/components/sections/hero/spider-verse";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
	completeInput,
	runCommand,
	type LineTone,
	type TerminalLine,
} from "@/lib/terminal";
import { cn } from "@/lib/utils";

/** Older entries scroll off the top rather than growing the page forever. */
const MAX_ENTRIES = 24;

type Entry = {
	id: number;
	command: string;
	lines: readonly TerminalLine[];
};

const TONE: Record<LineTone, string> = {
	default: "text-foreground",
	muted: "text-muted-foreground",
	term: "text-term",
	error: "text-destructive",
};

function OutputLine({ line }: { line: TerminalLine }) {
	if (line.href) {
		return (
			<p className="text-sm">
				<BracketLink href={line.href} external={line.external}>
					{line.text}
				</BracketLink>
			</p>
		);
	}

	return (
		<p
			className={cn(
				"whitespace-pre-wrap wrap-break-word text-sm leading-relaxed",
				TONE[line.tone ?? "default"],
			)}
		>
			{line.text}
		</p>
	);
}

/**
 * The live prompt at the end of the hero. Everything it answers with already
 * exists further down the page — this is a faster way through it for anyone who
 * would rather type than scroll.
 *
 * It stays inert until the boot sequence reaches `step`, so the page never
 * types into an input the visitor cannot see yet.
 */
export function HeroTerminal({ step }: { step: number }) {
	const ready = useBootReached(step);
	const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
	/** Touch is left alone — focusing there throws up the keyboard uninvited. */
	const pointer = useMediaQuery("(pointer: fine)");
	const { resolvedTheme, setTheme } = useTheme();
	const { reveal } = useSpiderVerse();

	const [entries, setEntries] = useState<Entry[]>([]);
	const [value, setValue] = useState("");
	const [history, setHistory] = useState<string[]>([]);
	/** Index into `history` while recalling, or `null` while editing a new line. */
	const [recalled, setRecalled] = useState<number | null>(null);
	const [focused, setFocused] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);
	const formRef = useRef<HTMLFormElement>(null);
	const nextId = useRef(0);
	/** Set when a command appends output, so the effect below knows to chase the prompt. */
	const followPrompt = useRef(false);

	/**
	 * Output lands above the prompt and pushes it down, so the prompt is walked
	 * back into view once the new lines are committed. `nearest` scrolls the
	 * least it can, and does nothing at all while the prompt is already on screen.
	 */
	useEffect(() => {
		if (!followPrompt.current) return;
		followPrompt.current = false;

		formRef.current?.scrollIntoView({
			behavior: reduced ? "auto" : "smooth",
			block: "nearest",
		});
	}, [entries, reduced]);

	/**
	 * The prompt takes focus the moment the boot sequence hands it over, so the
	 * first thing typed lands here without a click. It yields to anything the
	 * visitor has already put focus on, and never scrolls to claim it.
	 */
	useEffect(() => {
		if (!ready || !pointer) return;
		if (document.activeElement !== document.body) return;

		inputRef.current?.focus({ preventScroll: true });
	}, [ready, pointer]);

	/**
	 * Typing with nothing else focused comes back to the prompt, so focus lost
	 * to a stray click does not have to be clicked back. The keystroke itself
	 * still lands in the input — focus moves before the character is inserted.
	 */
	useEffect(() => {
		if (!ready || !pointer) return;

		function handleTyping(event: globalThis.KeyboardEvent) {
			if (event.ctrlKey || event.metaKey || event.altKey) return;
			/** Printable characters only; shortcuts and navigation keys pass through. */
			if (event.key.length !== 1) return;
			if (document.activeElement !== document.body) return;

			const input = inputRef.current;
			if (!input) return;

			/** Only while the prompt is on screen — otherwise you type blind. */
			const { top, bottom } = input.getBoundingClientRect();
			if (bottom < 0 || top > window.innerHeight) return;

			input.focus({ preventScroll: true });
		}

		document.addEventListener("keydown", handleTyping);
		return () => document.removeEventListener("keydown", handleTyping);
	}, [ready, pointer]);

	function caretToEnd() {
		window.requestAnimationFrame(() => {
			const input = inputRef.current;
			input?.setSelectionRange(input.value.length, input.value.length);
		});
	}

	/**
	 * Clearing resets the view too — a wiped screen should start at the top.
	 * The scroll waits a frame so it is not fighting the page shrinking as the
	 * scrollback comes out.
	 */
	function clearScreen() {
		setEntries([]);
		window.requestAnimationFrame(() => {
			window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
		});
	}

	function submit(event: SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();

		const command = value.trim();
		const result = runCommand(command);

		setValue("");
		setRecalled(null);
		if (command) setHistory((previous) => [...previous, command]);

		if (result.action?.type === "clear") {
			clearScreen();
		} else {
			followPrompt.current = result.action?.type !== "navigate";
			setEntries((previous) =>
				[
					...previous,
					{ id: nextId.current++, command, lines: result.lines },
				].slice(-MAX_ENTRIES),
			);
		}

		if (result.action?.type === "navigate") {
			document.getElementById(result.action.section)?.scrollIntoView({
				behavior: reduced ? "auto" : "smooth",
			});
		}

		if (result.action?.type === "theme") {
			const { mode } = result.action;
			setTheme(
				mode === "toggle"
					? resolvedTheme === "dark"
						? "light"
						: "dark"
					: mode,
			);
		}

		if (result.action?.type === "glitch") {
			reveal(result.action.alias);
		}
	}

	function recall(delta: -1 | 1) {
		if (history.length === 0) return;

		const position = Math.min(
			history.length,
			Math.max(0, (recalled ?? history.length) + delta),
		);

		setRecalled(position === history.length ? null : position);
		setValue(history[position] ?? "");
		caretToEnd();
	}

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "ArrowUp") {
			event.preventDefault();
			recall(-1);
			return;
		}

		if (event.key === "ArrowDown") {
			event.preventDefault();
			recall(1);
			return;
		}

		if (event.key === "Tab") {
			const completed = completeInput(value);
			if (!completed) return;

			event.preventDefault();
			setValue(completed);
			caretToEnd();
			return;
		}

		if (event.key === "l" && (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			clearScreen();
		}
	}

	/** Clicking anywhere in the block puts you on the prompt, like a real terminal. */
	function handleClick(event: MouseEvent<HTMLDivElement>) {
		const target = event.target as HTMLElement;
		if (target.closest("a, button")) return;
		if (window.getSelection()?.toString()) return;

		inputRef.current?.focus();
	}

	return (
		<div
			data-reveal={ready ? "shown" : "pending"}
			className="reveal flex flex-col"
			onClick={handleClick}
		>
			{/* Mounted from the start so the first command is announced too. */}
			<ol
				aria-live="polite"
				className={cn(
					"flex flex-col gap-4",
					entries.length > 0 && "pb-4",
				)}
			>
				{entries.map((entry) => (
					<li key={entry.id} className="flex flex-col gap-1.5">
						<p className="flex items-baseline gap-x-2 text-sm">
							<PromptChrome className="shrink-0" />
							<span className="min-w-0 break-all text-foreground">
								{entry.command}
							</span>
						</p>

						{entry.lines.map((line, index) => (
							<OutputLine key={index} line={line} />
						))}
					</li>
				))}
			</ol>

			<form
				ref={formRef}
				onSubmit={submit}
				className="flex scroll-mb-8 items-baseline gap-x-2 text-sm"
			>
				<PromptChrome className="shrink-0" />

				<span className="relative flex min-w-0 flex-1 items-baseline">
					<input
						ref={inputRef}
						value={value}
						disabled={!ready}
						onChange={(event) => setValue(event.target.value)}
						onKeyDown={handleKeyDown}
						onFocus={() => setFocused(true)}
						onBlur={() => setFocused(false)}
						aria-label="Terminal prompt — type help to list commands"
						autoComplete="off"
						autoCapitalize="off"
						autoCorrect="off"
						spellCheck={false}
						enterKeyHint="go"
						className="w-full bg-transparent text-foreground caret-term outline-none"
					/>

					{/* Monospace, so the caret lands on the character grid. */}
					{focused ? null : (
						<span
							aria-hidden
							style={{ left: `min(${value.length}ch, 100%)` }}
							className="pointer-events-none absolute inset-y-0 flex items-center"
						>
							<Caret className="translate-y-0" />
						</span>
					)}
				</span>
			</form>

			{entries.length === 0 ? (
				<p className="mt-4 text-xs text-muted-foreground">
					this prompt is live — type{" "}
					<span className="text-term">help</span> and hit enter
				</p>
			) : null}
		</div>
	);
}
