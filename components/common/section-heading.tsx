import { sectionHeadingId } from "@/components/common/section";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

type SectionHeadingProps = {
	sectionId: SectionId;
	/** Two-digit chapter number, e.g. `"01"`. */
	index: string;
	/** Lowercase section name, rendered as the accessible heading. */
	label: string;
	/** Right-aligned counter such as `"2 entries"`. */
	meta?: React.ReactNode;
	description?: React.ReactNode;
	className?: string;
};

/**
 * A single quiet line: `02 ── experience ─────────────  2 entries`.
 * The rule is a flex-filled border so it always reaches the right margin.
 */
export function SectionHeading({
	sectionId,
	index,
	label,
	meta,
	description,
	className,
}: SectionHeadingProps) {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<div className="flex items-baseline gap-3">
				<span className="text-xs text-term tabular-nums">{index}</span>

				<h2
					id={sectionHeadingId(sectionId)}
					className="text-xs uppercase tracking-[0.2em] sm:text-sm"
				>
					{label}
				</h2>

				<span aria-hidden className="rule min-w-4 flex-1 self-center" />

				{meta ? (
					<span className="shrink-0 text-xs text-muted-foreground tabular-nums">
						{meta}
					</span>
				) : null}
			</div>

			{description ? (
				<p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>
			) : null}
		</div>
	);
}

/** Quieter version of the same line, for groups nested inside a section. */
export function SubHeading({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<h3
			className={cn(
				"flex items-baseline gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground",
				className,
			)}
		>
			<span className="shrink-0">{children}</span>
			<span aria-hidden className="rule min-w-4 flex-1 self-center" />
		</h3>
	);
}
