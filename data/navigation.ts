import type { NavItem, NavSectionId } from "@/types";

export const NAV_ITEMS: readonly NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const NAV_SECTION_IDS: readonly NavSectionId[] = NAV_ITEMS.map(
  (item) => item.id,
);

/** Technologies scrolled through the marquee strip under the hero. */
export const MARQUEE_TECHNOLOGIES = [
  "TypeScript",
  "Node.js",
  "Python",
  "Fastify",
  "Express",
  "Next.js",
  "MySQL",
  "MongoDB",
  "Docker",
  "Linux",
  "n8n",
  "OpenAI",
] as const;
