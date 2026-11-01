import { cn } from "@/lib/utils";

type ExpandRowProps = {
	/** Rows sharing a group name behave as an accordion: one open at a time. */
	group?: string;
	summary: React.ReactNode;
	className?: string;
	summaryClassName?: string;
	children: React.ReactNode;
};

/**
 * A hairline row that opens in place. Built on `<details>`, so it works without
 * JavaScript, is keyboard-accessible, and is searchable with find-in-page.
 */
export function ExpandRow({
	group,
	summary,
	className,
	summaryClassName,
	children,
}: ExpandRowProps) {
	return (
		<details name={group} className={cn("expand group/row hairline", className)}>
			<summary
				className={cn(
					"flex cursor-pointer items-center gap-6 py-6 outline-none transition-colors hover:text-brand focus-visible:text-brand sm:py-8",
					summaryClassName,
				)}
			>
				<div className="min-w-0 flex-1">{summary}</div>
				<PlusIcon />
			</summary>

			<div className="pb-10">{children}</div>
		</details>
	);
}

/** The vertical stroke folds away as the row opens, leaving a minus. */
function PlusIcon() {
	return (
		<span
			aria-hidden
			className="relative size-4 shrink-0 text-muted-foreground transition-colors group-hover/row:text-brand"
		>
			<span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
			<span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open/row:scale-y-0" />
		</span>
	);
}
