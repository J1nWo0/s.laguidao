import { Section } from "@/components/common/section";
import { SplitReveal } from "@/components/common/split-reveal";
import { EDUCATION } from "@/data/education";
import { EXPERIENCE } from "@/data/experience";
import { PROFILE, QUICK_FACTS } from "@/data/profile";
/**
 * A `null` "Currently" falls back to "Previously" with the most recent job;
 * any other `null` fact is left out.
 */
function visibleFacts(): { label: string; value: string }[] {
	const latest = EXPERIENCE[0];

	return QUICK_FACTS.flatMap((fact) => {
		if (fact.value !== null) return [{ label: fact.label, value: fact.value }];
		if (fact.label === "Currently" && latest) {
			return [{ label: "Previously", value: `${latest.role} at ${latest.company}` }];
		}
		return [];
	});
}

export function AboutSection() {
	const [lead, ...rest] = PROFILE.bio;
	const facts = visibleFacts();

	return (
		<Section id="about" index="01" label="About">
			<SplitReveal
				text={PROFILE.headline.join(" ")}
				accent={["modern", "automate"]}
				className="max-w-[22ch] text-statement font-medium tracking-[-0.03em]"
			/>

			<div className="grid gap-12 lg:grid-cols-12">
				<dl className="grid grid-cols-2 gap-x-8 gap-y-8 lg:col-span-7 lg:grid-cols-4">
					{facts.map((fact) => (
						<div key={fact.label} className="flex flex-col gap-2">
							<dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
								{fact.label}
							</dt>
							<dd className="text-sm leading-snug">{fact.value}</dd>
						</div>
					))}
				</dl>

				<div className="flex flex-col gap-6 lg:col-span-5">
					<p className="text-base leading-relaxed text-muted-foreground">{lead}</p>

					<details className="expand group/more">
						<summary className="inline-flex cursor-pointer items-center gap-2 text-sm outline-none transition-colors hover:text-brand focus-visible:text-brand">
							<span className="group-open/more:hidden">Read more</span>
							<span className="hidden group-open/more:inline">Read less</span>
							<span
								aria-hidden
								className="transition-transform duration-300 group-open/more:rotate-45"
							>
								+
							</span>
						</summary>

						<div className="flex flex-col gap-4 pt-6 text-base leading-relaxed text-muted-foreground">
							{rest.map((paragraph) => (
								<p key={paragraph.slice(0, 24)}>{paragraph}</p>
							))}
						</div>
					</details>

					{EDUCATION.map((entry) => (
						<p
							key={entry.id}
							className="hairline flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-6 text-sm"
						>
							<span>
								{entry.degree}
								<span className="text-muted-foreground"> — {entry.school}</span>
							</span>
							<span className="tabular-nums text-muted-foreground">
								{entry.start.slice(0, 4)}–{entry.end.slice(0, 4)}
							</span>
						</p>
					))}
				</div>
			</div>
		</Section>
	);
}
