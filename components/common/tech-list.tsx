import { cn } from "@/lib/utils";

/** A stack rendered as plain text: `TypeScript · Node.js · MySQL`. */
export function TechList({
	items,
	className,
}: {
	items: readonly string[];
	className?: string;
}) {
	return (
		<p
			className={cn(
				"text-xs leading-relaxed text-muted-foreground",
				className,
			)}
		>
			{items.map((item, index) => (
				<span key={item}>
					{index > 0 ? (
						<span aria-hidden className="opacity-40">
							{" \u00b7 "}
						</span>
					) : null}
					{item}
				</span>
			))}
		</p>
	);
}
