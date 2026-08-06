import { EDUCATION } from "@/data/education";
import { EXPERIENCE } from "@/data/experience";
import { MARQUEE_TECHNOLOGIES, NAV_ITEMS } from "@/data/navigation";
import { PROFILE, SOCIAL_LINKS } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { SKILL_GROUPS } from "@/data/skills";
import { formatCompactRange } from "@/lib/format";
import { SECTION_IDS, type SectionId } from "@/types";

export type LineTone = "default" | "muted" | "term" | "error";

export type TerminalLine = {
	text: string;
	tone?: LineTone;
	/** Renders the line as a `[ label ]` link instead of plain text. */
	href?: string;
	external?: boolean;
};

/** Anything a command needs the page to do that plain output cannot express. */
export type TerminalAction =
	| { type: "clear" }
	| { type: "navigate"; section: SectionId }
	| { type: "theme"; mode: "dark" | "light" | "toggle" };

export type CommandResult = {
	lines: readonly TerminalLine[];
	action?: TerminalAction;
};

type Command = {
	name: string;
	summary: string;
	aliases?: readonly string[];
	/** Kept out of `help`, but still runnable. */
	hidden?: boolean;
	run: (args: readonly string[]) => CommandResult;
};

const line = (text: string, tone: LineTone = "default"): TerminalLine => ({
	text,
	tone,
});
const muted = (text: string) => line(text, "muted");
const term = (text: string) => line(text, "term");
const fail = (text: string) => line(text, "error");
const link = (text: string, href: string, external = true): TerminalLine => ({
	text,
	href,
	external,
});

/** Output is indented by two spaces so it reads as a block under its command. */
const indent = (text: string) => `  ${text}`;

/** Greets against the visitor's own clock, not mine. */
function timeGreeting(): string {
	const hour = new Date().getHours();

	if (hour < 5) return "still up?";
	if (hour < 12) return "good morning";
	if (hour < 18) return "good afternoon";
	return "good evening";
}

const SECTION_TARGETS: readonly SectionId[] = SECTION_IDS;

/** Argument position of these commands completes to a section name. */
const SECTION_ARG_COMMANDS = new Set(["cd", "open", "goto"]);

/** The script the hero types on load. Shared so the live prompt runs the same one. */
export const HIRE_SCRIPT = "./hire-me.sh";

const COMMANDS: readonly Command[] = [
	{
		name: "help",
		summary: "list everything this shell knows",
		aliases: ["?", "commands"],
		run: () => ({
			lines: [
				muted("available commands"),
				...COMMANDS.filter((command) => !command.hidden).map((command) =>
					line(indent(`${command.name.padEnd(14)}${command.summary}`)),
				),
				muted("\u2191\u2193 recalls history \u00b7 tab completes \u00b7 ctrl+l clears"),
			],
		}),
	},
	{
		name: "hello",
		summary: "say hi \u2014 it says hi back",
		aliases: ["hi", "hey", "yo", "hola", "sup", "greetings"],
		run: (args) => {
			const who = args.join(" ").trim();

			if (who.toLowerCase() === "world") {
				return {
					lines: [
						line("Hello, World!"),
						muted("where every one of us started."),
					],
				};
			}

			return {
				lines: [
					line(
						who
							? `hello, ${who} \u2014 good to meet you.`
							: `${timeGreeting()} \u2014 ${PROFILE.fullName} here.`,
					),
					muted(
						`\`help\` lists what this shell knows \u00b7 \`${HIRE_SCRIPT}\` is the short pitch`,
					),
				],
			};
		},
	},
	{
		name: "whoami",
		summary: "name, role and where I am",
		run: () => ({
			lines: [
				line(PROFILE.fullName),
				muted(PROFILE.roles.join(" \u00b7 ")),
				muted(`${PROFILE.location} \u00b7 ${PROFILE.timezone}`),
				term(PROFILE.availability),
			],
		}),
	},
	{
		name: "about",
		summary: "the short version",
		run: () => ({
			lines: [
				line(PROFILE.bio[0]),
				muted("`cd about` for the rest of it"),
			],
		}),
	},
	{
		name: "experience",
		summary: "where I have worked",
		aliases: ["work"],
		run: () => ({
			lines: EXPERIENCE.flatMap((job) => [
				line(
					`${formatCompactRange(job.start, job.end)}  ${job.role} @ ${job.company}`,
				),
				muted(indent(job.stack.join(" \u00b7 "))),
			]),
		}),
	},
	{
		name: "projects",
		summary: "what I have built",
		run: () => ({
			lines: [
				...PROJECTS.flatMap((project) => [
					line(`${project.year}  ${project.name} \u2014 ${project.tagline}`),
					muted(indent(project.stack.join(" \u00b7 "))),
				]),
				muted("`cd projects` for highlights, sources and docs"),
			],
		}),
	},
	{
		name: "skills",
		summary: "what I work with, grouped",
		run: () => ({
			lines: SKILL_GROUPS.flatMap((group) => [
				line(group.title.toLowerCase()),
				muted(indent(group.skills.join(" \u00b7 "))),
			]),
		}),
	},
	{
		name: "stack",
		summary: "the day-to-day toolkit, one line",
		run: () => ({
			lines: [line(MARQUEE_TECHNOLOGIES.join(" \u00b7 "))],
		}),
	},
	{
		name: "education",
		summary: "degree and coursework",
		run: () => ({
			lines: EDUCATION.flatMap((entry) => [
				line(`${formatCompactRange(entry.start, entry.end)}  ${entry.degree}`),
				muted(indent(`${entry.school} \u00b7 ${entry.location}`)),
				muted(indent(entry.coursework.join(" \u00b7 "))),
			]),
		}),
	},
	{
		name: "contact",
		summary: "how to reach me",
		aliases: ["email", "social"],
		run: () => ({
			lines: [
				term(PROFILE.availability),
				...SOCIAL_LINKS.map((social) =>
					link(
						`${social.label.toLowerCase()}: ${social.handle}`,
						social.href,
						social.platform !== "email",
					),
				),
			],
		}),
	},
	{
		name: HIRE_SCRIPT,
		summary: "run the pitch the hero opens with",
		aliases: ["hire-me.sh", "./hire-me", "hire"],
		run: () => ({
			lines: [
				line(`${PROFILE.fullName} \u00b7 ${PROFILE.role}`),
				muted(PROFILE.roles.join(" \u00b7 ")),
				muted(`${PROFILE.location} \u00b7 ${PROFILE.timezone}`),
				term(PROFILE.availability),
				...SOCIAL_LINKS.map((social) =>
					link(
						`${social.label.toLowerCase()}: ${social.handle}`,
						social.href,
						social.platform !== "email",
					),
				),
				muted("exit status: 0"),
			],
		}),
	},
	{
		name: "ls",
		summary: "list sections, or `ls projects`",
		run: (args) => {
			const target = args[0]?.replace(/\/$/, "").toLowerCase();

			if (!target) {
				return {
					lines: [
						...NAV_ITEMS.map((item) => line(`${item.id}/`)),
						term(HIRE_SCRIPT),
						muted("`cd <section>` jumps there"),
					],
				};
			}

			if (target === "projects") {
				return {
					lines: PROJECTS.map((project) =>
						line(`${project.year}  ${project.name}`),
					),
				};
			}

			if (target === "stack" || target === "skills") {
				return { lines: [line(MARQUEE_TECHNOLOGIES.join(" \u00b7 "))] };
			}

			return {
				lines: [fail(`ls: ${args[0]}: No such file or directory`)],
			};
		},
	},
	{
		name: "cd",
		summary: "scroll to a section, e.g. `cd contact`",
		aliases: ["open", "goto"],
		run: (args) => {
			const raw = args[0]?.replace(/\/$/, "").toLowerCase();

			if (!raw || raw === "~" || raw === "home" || raw === "..") {
				return { lines: [muted("~")], action: { type: "navigate", section: "hero" } };
			}

			const section = SECTION_TARGETS.find((id) => id === raw);

			if (!section) {
				return {
					lines: [fail(`cd: ${args[0]}: No such file or directory`)],
				};
			}

			return {
				lines: [muted(`~/${section}`)],
				action: { type: "navigate", section },
			};
		},
	},
	{
		name: "theme",
		summary: "switch between dark and light",
		run: (args) => {
			const mode = args[0]?.toLowerCase();

			if (mode && mode !== "dark" && mode !== "light") {
				return { lines: [fail(`theme: unknown theme: ${args[0]}`)] };
			}

			return {
				lines: [],
				action: { type: "theme", mode: mode ?? "toggle" },
			};
		},
	},
	{
		name: "date",
		summary: "my local time",
		run: () => ({
			lines: [
				line(
					`${new Intl.DateTimeFormat("en-US", {
						dateStyle: "full",
						timeStyle: "short",
						timeZone: "Asia/Manila",
					}).format(new Date())} \u00b7 ${PROFILE.timezone}`,
				),
			],
		}),
	},
	{
		name: "echo",
		summary: "say it back",
		run: (args) => ({ lines: [line(args.join(" "))] }),
	},
	{
		name: "clear",
		summary: "wipe the scrollback",
		aliases: ["cls"],
		run: () => ({ lines: [], action: { type: "clear" } }),
	},
	{
		name: "sudo",
		summary: "",
		hidden: true,
		run: () => ({
			lines: [
				fail("sudo: guest is not in the sudoers file."),
				muted("this incident will be reported."),
			],
		}),
	},
	{
		name: "rm",
		summary: "",
		hidden: true,
		run: (args) => ({
			lines: [
				fail(
					`rm: cannot remove '${args.at(-1) ?? "."}': read-only file system`,
				),
			],
		}),
	},
	{
		name: "exit",
		summary: "",
		hidden: true,
		aliases: ["quit", "logout"],
		run: () => ({
			lines: [muted("there is no exit \u2014 but `cd contact` gets you out of here")],
		}),
	},
];

const COMMAND_MAP = new Map<string, Command>(
	COMMANDS.flatMap((command) =>
		[command.name, ...(command.aliases ?? [])].map(
			(key) => [key, command] as const,
		),
	),
);

export function runCommand(input: string): CommandResult {
	const trimmed = input.trim();
	if (!trimmed) return { lines: [] };

	const [name, ...args] = trimmed.split(/\s+/);
	const command = COMMAND_MAP.get(name.toLowerCase());

	if (!command) {
		return {
			lines: [
				fail(`command not found: ${name}`),
				muted("`help` lists what this shell knows"),
			],
		};
	}

	return command.run(args);
}

function commonPrefix(values: readonly string[]): string {
	return values.reduce((prefix, value) => {
		let length = 0;
		while (
			length < prefix.length &&
			length < value.length &&
			prefix[length] === value[length]
		) {
			length += 1;
		}
		return prefix.slice(0, length);
	});
}

/**
 * Tab completion: command names in the first position, section names after the
 * commands that take one. Returns `null` when there is nothing left to add.
 */
export function completeInput(input: string): string | null {
	const parts = input.split(" ");
	const word = (parts.at(-1) ?? "").toLowerCase();

	const pool: readonly string[] =
		parts.length === 1
			? COMMANDS.filter((command) => !command.hidden).map(
					(command) => command.name,
				)
			: SECTION_ARG_COMMANDS.has(parts[0].toLowerCase())
				? SECTION_TARGETS
				: [];

	const matches = pool.filter((candidate) => candidate.startsWith(word));
	if (matches.length === 0) return null;

	const completed = commonPrefix(matches);
	if (completed.length <= word.length) return null;

	return [...parts.slice(0, -1), completed].join(" ");
}
