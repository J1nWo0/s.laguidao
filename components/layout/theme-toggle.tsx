"use client";

import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

type Shade = "light" | "dark";

const toggleClass =
	"flex items-center gap-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground";

const osShade = (): Shade =>
	window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

/**
 * Flips between light and dark, revealing the new theme as a circle growing out
 * of the button. Picking the shade the OS already uses is stored as "system",
 * so the site keeps following the OS from then on.
 */
export function ThemeToggle() {
	const mounted = useMounted();
	const { resolvedTheme, setTheme } = useTheme();

	// The resolved theme is only known in the browser, so a same-sized
	// placeholder stands in until mount rather than guessing and mismatching.
	if (!mounted) {
		return (
			<span aria-hidden className={cn(toggleClass, "invisible")}>
				<Swatch shade="light" />
				Light
			</span>
		);
	}

	const shown: Shade = resolvedTheme === "dark" ? "dark" : "light";
	const next: Shade = shown === "dark" ? "light" : "dark";

	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const stored = next === osShade() ? "system" : next;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reduced || typeof document.startViewTransition !== "function") {
			setTheme(stored);
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
			root.classList.toggle("dark", next === "dark");
			root.classList.toggle("light", next === "light");
			root.style.colorScheme = next;
			flushSync(() => setTheme(stored));
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
			aria-label={`Switch to ${next} theme`}
			className={toggleClass}
		>
			<Swatch shade={shown} />
			<span className="capitalize">{shown}</span>
		</button>
	);
}

/** Empty for light, filled for dark. */
function Swatch({ shade }: { shade: Shade }) {
	return (
		<span
			aria-hidden
			className="relative size-3 overflow-hidden rounded-full border border-current"
		>
			<span
				className={cn(
					"absolute inset-y-0 right-0 bg-current transition-[left] duration-300",
					shade === "dark" ? "left-0" : "left-full",
				)}
			/>
		</span>
	);
}
