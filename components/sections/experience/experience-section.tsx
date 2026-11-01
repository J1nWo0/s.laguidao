import { ArrowLink } from "@/components/common/arrow-link";
import { ExpandRow } from "@/components/common/expand-row";
import { Section } from "@/components/common/section";
import { SplitReveal } from "@/components/common/split-reveal";
import { StackList } from "@/components/common/stack-list";
import { EXPERIENCE } from "@/data/experience";
import { formatDateRange, formatDuration } from "@/lib/format";

function yearSpan(start: string, end: string | null): string {
	const from = start.slice(0, 4);
	const to = end ? end.slice(0, 4) : "Now";
	return from === to ? from : `${from} — ${to}`;
}

export function ExperienceSection() {
	return (
		<Section
			id="experience"
			index="02"
			label="Experience"
			meta={`${EXPERIENCE.length} roles`}
		>
			<SplitReveal
				text="Where I've shipped."
				accent={["shipped."]}
				className="text-statement font-medium tracking-[-0.03em]"
			/>

			<div className="border-b border-border">
				{EXPERIENCE.map((job) => (
					<ExpandRow
						key={job.id}
						group="experience"
						summary={
							<div className="grid items-baseline gap-x-8 gap-y-1 sm:grid-cols-[9rem_1fr_auto]">
								<span className="text-sm tabular-nums text-muted-foreground">
									{yearSpan(job.start, job.end)}
								</span>
								<span className="text-2xl tracking-tight sm:text-3xl">
									{job.role}
								</span>
								<span className="text-sm text-muted-foreground">{job.company}</span>
							</div>
						}
					>
						<div className="grid gap-8 sm:grid-cols-[9rem_1fr] sm:gap-x-8">
							<dl className="flex flex-col gap-1 text-xs text-muted-foreground">
								<dt className="sr-only">Period</dt>
								<dd>{formatDateRange(job.start, job.end)}</dd>
								<dt className="sr-only">Duration</dt>
								<dd>{formatDuration(job.start, job.end)}</dd>
								<dt className="sr-only">Arrangement</dt>
								<dd>
									{job.type} &#183; {job.workType}
								</dd>
								<dt className="sr-only">Location</dt>
								<dd>{job.location}</dd>
							</dl>

							<div className="flex max-w-[62ch] flex-col gap-6">
								<p className="text-lg leading-snug">{job.summary}</p>

								<ul className="flex flex-col gap-2.5 text-sm leading-relaxed text-muted-foreground">
									{job.highlights.map((highlight) => (
										<li key={highlight} className="flex gap-3">
											<span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
											{highlight}
										</li>
									))}
								</ul>

								<StackList items={job.stack} />

								{job.companyUrl ? (
									<ArrowLink href={job.companyUrl} external className="self-start">
										{job.company}
									</ArrowLink>
								) : null}
							</div>
						</div>
					</ExpandRow>
				))}
			</div>
		</Section>
	);
}
