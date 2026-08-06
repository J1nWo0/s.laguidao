import type { WorkExperience } from "@/types";

/** Ordered most recent first — the timeline renders in array order. */
export const EXPERIENCE: readonly WorkExperience[] = [
	{
		id: "lpgp-connect",
		role: "Jr. Backend Developer",
		company: "LPGP Connect",
		companyUrl: "https://www.lpgpconnect.com",
		location: "London, United Kingdom",
		workType: "Remote",
		type: "Full-time",
		start: "2025-08",
		end: null,
		summary:
			"Own the automation layer behind internal tooling — from scheduled data safety nets to AI-assisted feature pipelines.",
		highlights: [
			"Automated internal workflows and feature pipelines, including database backups, API integrations and event-driven triggers.",
			"Optimised token usage and response latency to improve cost efficiency and system performance.",
			"Performed bug fixes, refactoring and performance tuning to improve system stability and code maintainability.",
		],
		stack: ["Node.js", "TypeScript", "MongoDB", "OpenAI", "n8n", "Docker"],
	},
	{
		id: "iam-techsolution",
		role: "Full Stack Software Developer",
		company: "iAm TechSolution Inc.",
		companyUrl: null,
		location: "Makati, Philippines",
		workType: "Hybrid",
		type: "Internship",
		start: "2025-02",
		end: "2025-05",
		summary:
			"Shipped full-stack features across an Agile sprint cycle, from schema design to the animated interface on top of it.",
		highlights: [
			"Built full-stack features using Fastify (Node.js) and React + TypeScript; designed RESTful APIs with MySQL and Sequelize ORM.",
			"Developed responsive UIs with React, Vite, SASS and Framer Motion.",
			"Applied modular frontend components and state management to integrate frontend and backend cleanly.",
			"Worked in an Agile team using Git and GitHub across sprint cycles.",
		],
		stack: [
			"Fastify",
			"React",
			"TypeScript",
			"MySQL",
			"Sequelize",
			"Vite",
			"SASS",
		],
	},
] as const;
