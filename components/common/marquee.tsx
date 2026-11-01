import { cn } from "@/lib/utils";

type MarqueeProps = {
	items: readonly string[];
	className?: string;
};

/**
 * A slow, endless strip. The list is rendered twice and the track slides by
 * half its width, so the loop has no seam. The copy is hidden from assistive
 * tech, which reads the list once.
 */
export function Marquee({ items, className }: MarqueeProps) {
	return (
		<div className={cn("marquee-mask overflow-hidden", className)}>
			<div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
				{[0, 1].map((copy) => (
					<ul
						key={copy}
						aria-hidden={copy === 1 ? true : undefined}
						className="flex shrink-0 items-center"
					>
						{items.map((item, index) => (
							<li key={item} className="flex items-center">
								<span
									className={cn(
										"px-6 sm:px-10",
										index % 2 === 1 &&
											"font-serif italic text-muted-foreground",
									)}
								>
									{item}
								</span>
								<span aria-hidden className="size-1.5 rounded-full bg-brand" />
							</li>
						))}
					</ul>
				))}
			</div>
		</div>
	);
}
