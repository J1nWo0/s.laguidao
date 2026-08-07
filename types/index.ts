/**
 * Shared domain types for the portfolio.
 *
 * Data modules must stay serializable, so anything visual (icon components,
 * class names) is resolved from these string unions at the component layer.
 */

export const SECTION_IDS = [
	"hero",
	"about",
	"experience",
	"projects",
	"skills",
	"contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Sections that appear in the navigation (everything except the hero). */
export type NavSectionId = Exclude<SectionId, "hero">;

export type NavItem = {
	id: NavSectionId;
	label: string;
};

export type SocialPlatform = "github" | "linkedin" | "email";

export type SocialLink = {
	platform: SocialPlatform;
	label: string;
	handle: string;
	href: string;
};

export type EmploymentType = "Full-time" | "Internship";

export type WorkExperience = {
	id: string;
	role: string;
	company: string;
	companyUrl?: string | null;
	location: string;
  workType: "Remote" | "On-site" | "Hybrid";
	type: EmploymentType;
	/** ISO year-month, e.g. "2025-08". */
	start: string;
	/** ISO year-month, or `null` for an ongoing role. */
	end: string | null;
	summary: string;
	highlights: readonly string[];
	stack: readonly string[];
};

/** A screenshot of the project, served from `public/`. */
export type ProjectPreview = {
	src: string;
	/** Intrinsic pixel size, so the space is reserved before the file arrives. */
	width: number;
	height: number;
	alt: string;
};

export type Project = {
	id: string;
	name: string;
	tagline: string;
	description: string;
	year: string;
	highlights: readonly string[];
	stack: readonly string[];
	preview?: ProjectPreview;
	links: {
		live?: string;
		source?: string;
		docs?: string;
	};
};

export type SkillGroupIcon =
	| "braces"
	| "server"
	| "database"
	| "wrench"
	| "bot"
	| "workflow";

export type SkillGroup = {
	id: string;
	title: string;
	description: string;
	icon: SkillGroupIcon;
	skills: readonly string[];
};

export type Education = {
	id: string;
	degree: string;
	school: string;
	location: string;
	/** ISO year-month. */
	start: string;
	/** ISO year-month. */
	end: string;
	coursework: readonly string[];
};

export type Fact = {
	label: string;
	value: string;
};

/** One of the masks the hero prompt can be talked into wearing. */
export type SpiderIdentity = {
	/** Matched loosely: lowercased, non-alphanumerics stripped. */
	keys: readonly string[];
	/** What the hero heading becomes. */
	alias: string;
	earth: string;
	quote: string;
};
