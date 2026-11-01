import { cn } from "@/lib/utils";

/** A stack as small outlined pills. */
export function StackList({
	items,
	className,
}: {
	items: readonly string[];
	className?: string;
}) {
	return (
		<ul aria-label="Stack" className={cn("flex flex-wrap gap-2", className)}>
			{items.map((item) => (
				<li
					key={item}
					className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
				>
					{item}
				</li>
			))}
		</ul>
	);
}
