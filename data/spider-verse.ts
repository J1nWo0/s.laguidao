import type { SpiderIdentity } from "@/types";

/**
 * Undocumented: none of these are registered as commands, so they never show up
 * in `help` or tab completion. Type a name into the hero prompt and the heading
 * glitches into it for a few seconds.
 */
export const SPIDER_VERSE: readonly SpiderIdentity[] = [
	{
		keys: ["spiderman", "spider-man", "peter parker", "peter", "webhead"],
		alias: "Peter Parker",
		earth: "earth-616",
		quote: "with great power comes great responsibility.",
	},
	{
		keys: ["miles", "miles morales", "prowler", "spider-man 1610"],
		alias: "Miles Morales",
		earth: "earth-1610",
		quote: "anyone can wear the mask.",
	},
	{
		keys: ["gwen", "gwen stacy", "spider-gwen", "ghost-spider"],
		alias: "Gwen Stacy",
		earth: "earth-65",
		quote: "in every other universe, it works out. just not this one.",
	},
	{
		keys: ["miguel", "miguel o'hara", "spider-man 2099", "2099"],
		alias: "Miguel O'Hara",
		earth: "earth-928",
		quote: "you can't have it all, kid. i wish somebody had told me that.",
	},
	{
		keys: ["hobie", "hobie brown", "spider-punk"],
		alias: "Hobie Brown",
		earth: "earth-138",
		quote: "i don't build things to last. i build them so they can't be owned.",
	},
	{
		keys: ["peni", "peni parker", "sp//dr", "spdr"],
		alias: "Peni Parker",
		earth: "earth-14512",
		quote: "the suit is the pilot. i'm just the other half of it.",
	},
	{
		keys: ["spider-ham", "peter porker", "porker", "ham"],
		alias: "Peter Porker",
		earth: "earth-8311",
		quote: "that's all, folks \u2014 wrong studio, but you get the idea.",
	},
] as const;
