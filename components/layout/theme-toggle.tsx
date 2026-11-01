"use client";

import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

type Mode = "system" | "light" | "dark";

const ORDER: readonly Mode[] = ["system", "light", "dark"];

const LABELS: Record<Mode, string> = {
	system: "System",
	light: "Light",
	dark: "Dark",
};

const toggleClass =
	"flex items-center gap-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground";

const systemPrefersDark = () =>
	window.matchMedia("(prefers-color-scheme: dark)").matches;

/**
 * Cycles System → Light → Dark. The label names the current mode. When the
 * visible theme actually changes, the new one is revealed as a circle growing
 * out of the button.
 */
export function ThemeToggle() {
	const mounted = useMounted();
	const { theme, resolvedTheme, setTheme } = useTheme();

	// The stored mode is only known in the browser, so a same-sized placeholder
	// stands in until mount rather than guessing and mismatching.
	if (!mounted) {
		return (
			<span aria-hidden className={cn(toggleClass, "invisible")}>
				<Swatch mode="system" />
				{LABELS.system}
			</span>
		);
	}

	const current: Mode = ORDER.includes(theme as Mode) ? (theme as Mode) : "system";
	const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const nextResolved =
			next === "system" ? (systemPrefersDark() ? "dark" : "light") : next;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (
			nextResolved === resolvedTheme ||
			reduced ||
			typeof document.startViewTransition !== "function"
		) {
			setTheme(next);
			return;
		}

		const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
		const x = left + width / 2;
		const y = top + height / 2;
		const radius = Math.hypot(
			Math.max(x, window.innerWidth - x),
			Math.max(y, window.innerHeight - y),
		);

		const transition = document.startViewTransition(() => {
			// next-themes applies the class in an effect; set it here as well so the
			// snapshot taken right after this callback already shows the new theme.
			const root = document.documentElement;
			root.classList.toggle("dark", nextResolved === "dark");
			root.classList.toggle("light", nextResolved === "light");
			root.style.colorScheme = nextResolved;
			flushSync(() => setTheme(next));
		});

		transition.ready.then(() => {
			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${radius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: 700,
					easing: "cubic-bezier(0.22, 1, 0.36, 1)",
					pseudoElement: "::view-transition-new(root)",
				},
			);
		});
	};

	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={`Theme: ${LABELS[current]}. Switch to ${LABELS[next]}`}
			className={toggleClass}
		>
			<Swatch mode={current} />
			{LABELS[current]}
		</button>
	);
}

/** Empty for light, filled for dark, half-filled for "follow the system". */
function Swatch({ mode }: { mode: Mode }) {
	return (
		<span
			aria-hidden
			className="relative size-3 overflow-hidden rounded-full border border-current"
		>
			<span
				className={cn(
					"absolute inset-y-0 right-0 bg-current transition-[left] duration-300",
					mode === "dark" && "left-0",
					mode === "system" && "left-1/2",
					mode === "light" && "left-full",
				)}
			/>
		</span>
	);
}
