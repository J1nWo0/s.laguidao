import { cn } from "@/lib/utils";

/** `tree`-style list. The branch glyphs are decorative and never wrap. */
export function TreeList({
	items,
	className,
	itemClassName,
}: {
	items: readonly React.ReactNode[];
	className?: string;
	itemClassName?: string;
}) {
	return (
		<ul className={cn("flex flex-col gap-1.5 text-sm", className)}>
			{items.map((item, index) => (
				<li key={index} className={cn("flex gap-2", itemClassName)}>
					<span
						aria-hidden
						className="shrink-0 select-none whitespace-nowrap text-muted-foreground"
					>
						{index === items.length - 1
							? "\u2514\u2500"
							: "\u251c\u2500"}
					</span>
					<span className="min-w-0 flex-1">{item}</span>
				</li>
			))}
		</ul>
	);
}
