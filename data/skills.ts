import type { SkillGroup } from "@/types";

export const SKILL_GROUPS: readonly SkillGroup[] = [
	{
		id: "languages",
		title: "Languages",
		description: "What I reach for depending on the shape of the problem.",
		icon: "braces",
		skills: ["JavaScript", "TypeScript", "Python", "Solidity"],
	},
	{
		id: "backend",
		title: "Backend & APIs",
		description: "Runtimes and frameworks behind the services I ship.",
		icon: "server",
		skills: ["Node.js", "Express", "Fastify", "REST APIs", "Next.js"],
	},
	{
		id: "data",
		title: "Data",
		description: "Modelling, querying and keeping records honest.",
		icon: "database",
		skills: ["MySQL", "MongoDB", "Sequelize ORM"],
	},
	{
		id: "tooling",
		title: "Tooling & Platform",
		description: "The environment my code lives and ships in.",
		icon: "wrench",
		skills: ["Docker", "Git", "GitHub", "Linux"],
	},
	{
		id: "ai",
		title: "AI & Automation",
		description: "Wiring models into pipelines that hold up in production.",
		icon: "bot",
		skills: ["OpenAI", "Claude", "n8n", "Prompt Engineering"],
	},
	{
		id: "practices",
		title: "Ways of Working",
		description: "How the work gets planned, reviewed and released.",
		icon: "workflow",
		skills: [
			"Agile Development",
			"Code Review",
			"Refactoring",
			"Performance Tuning",
		],
	},
] as const;

/** Derived counts — kept in sync automatically as groups change. */
export const SKILL_TOTALS = {
	groups: SKILL_GROUPS.length,
	technologies: SKILL_GROUPS.reduce(
		(total, group) => total + group.skills.length,
		0,
	),
} as const;
