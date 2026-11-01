import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/** Must list every custom `--text-*` size in `globals.css`, or merging a text colour drops it. */
const twMerge = extendTailwindMerge({
	extend: { theme: { text: ["display", "statement", "index"] } },
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
