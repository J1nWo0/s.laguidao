import { cn } from "@/lib/utils";

type SectionLabelProps = {
	headingId: string;
	index: string;
	label: string;
	meta?: React.ReactNode;
	className?: string;
};

/** `(01)  About ─────────────── 3 projects`, a hairline that always reaches the margin. */
export function SectionLabel({
	headingId,
	index,
	label,
	meta,
	className,
}: SectionLabelProps) {
	return (
		<div
			className={cn(
				"flex items-baseline gap-4 text-xs uppercase tracking-[0.18em] text-muted-foreground",
				className,
			)}
		>
			<span className="text-brand tabular-nums">({index})</span>

			<h2 id={headingId} className="font-medium tracking-[0.18em] text-foreground">
				{label}
			</h2>

			<span aria-hidden className="hairline min-w-6 flex-1 self-center" />

			{meta ? <span className="shrink-0 tabular-nums">{meta}</span> : null}
		</div>
	);
}
