import type { NavItem, NavSectionId } from "@/types";

export const NAV_ITEMS: readonly NavItem[] = [
	{ id: "about", label: "About" },
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
	{ id: "skills", label: "Skills" },
	{ id: "contact", label: "Contact" },
] as const;

export const NAV_SECTION_IDS: readonly NavSectionId[] = NAV_ITEMS.map(
	(item) => item.id,
);
