import { SPIDER_VERSE } from "@/data/easter-eggs/spider-verse";
import type { HeroEffect, SpiderIdentity } from "@/types";

/**
 * Undocumented phrases the hero prompt matches on the whole line. Kept out of
 * `help` and tab completion. A new glitch identity is one entry (or a row in
 * `SPIDER_VERSE`); a new visual is a `HeroEffect` variant plus a handler in
 * `SpiderVerse`.
 */
export type EasterEgg = {
	keys: readonly string[];
	lines: readonly {
		text: string;
		tone?: "default" | "muted" | "term" | "error";
	}[];
	effect: HeroEffect;
};

function spiderEgg(identity: SpiderIdentity): EasterEgg {
	return {
		keys: identity.keys,
		lines: [
			{ text: `anomaly detected \u00b7 ${identity.earth}`, tone: "term" },
			{ text: `"${identity.quote}"` },
			{ text: "identity restored in a moment.", tone: "muted" },
		],
		effect: { type: "glitch", alias: identity.alias },
	};
}

export const EASTER_EGGS: readonly EasterEgg[] = [
	...SPIDER_VERSE.map(spiderEgg),
];

/** `Spider-Man`, `spider man` and `spiderman` all have to land on the same egg. */
const eggKey = (value: string) =>
	value.toLowerCase().replace(/[^a-z0-9]/g, "");

const EASTER_EGG_MAP = new Map(
	EASTER_EGGS.flatMap((egg) =>
		egg.keys.map((key) => [eggKey(key), egg] as const),
	),
);

export function matchEasterEgg(input: string): EasterEgg | null {
	return EASTER_EGG_MAP.get(eggKey(input)) ?? null;
}
