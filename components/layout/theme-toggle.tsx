"use client";

import { useTheme } from "next-themes";

import { BracketButton } from "@/components/common/bracket-link";
import { useMounted } from "@/hooks/use-mounted";

/**
 * The resolved theme is only known in the browser, so the toggle renders a
 * same-sized placeholder until mount rather than guessing and mismatching.
 * The label names the theme you will get, not the one you are in.
 */
export function ThemeToggle() {
	const mounted = useMounted();
	const { resolvedTheme, setTheme } = useTheme();

	if (!mounted) {
		return (
			<span aria-hidden className="invisible text-sm">
				[ light ]
			</span>
		);
	}

	const next = resolvedTheme === "dark" ? "light" : "dark";

	return (
		<BracketButton
			onClick={() => setTheme(next)}
			aria-label={`Switch to ${next} theme`}
			className="text-muted-foreground"
		>
			{next}
		</BracketButton>
	);
}
