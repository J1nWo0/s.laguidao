import { cn } from "@/lib/utils";

/**
 * `label ········ value`. The leader is a dotted border on a flex-filled
 * spacer rather than literal dots, so it reflows at any width. Below `sm` the
 * pair stacks and the leader disappears.
 */
export function LeaderRow({
	label,
	className,
	children,
}: {
	label: React.ReactNode;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				"flex flex-col gap-0.5 text-sm sm:flex-row sm:items-baseline sm:gap-3",
				className,
			)}
		>
			<span className="shrink-0 text-xs text-muted-foreground sm:text-sm">
				{label}
			</span>

			<span
				aria-hidden
				className="hidden min-w-6 flex-1 self-center border-b border-dotted border-border sm:block"
			/>

			<span className="min-w-0 sm:text-right">{children}</span>
		</div>
	);
}
