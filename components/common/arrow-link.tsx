import { cn } from "@/lib/utils";

/** Underline that draws in from the left on hover; shared by every text link. */
export const arrowLinkClass =
	"group/link relative inline-flex items-baseline gap-1.5 text-sm outline-none transition-colors hover:text-brand focus-visible:text-brand after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:after:scale-x-100";

function Arrow({ external }: { external: boolean }) {
	return (
		<span
			aria-hidden
			className="inline-block transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
		>
			{external ? "\u2197" : "\u2192"}
		</span>
	);
}

/** `Label ↗` for external links, `Label →` for in-page ones. */
export function ArrowLink({
	external = false,
	className,
	children,
	...props
}: React.ComponentProps<"a"> & { external?: boolean }) {
	return (
		<a
			className={cn(arrowLinkClass, className)}
			{...(external ? { target: "_blank", rel: "noreferrer" } : null)}
			{...props}
		>
			<span>{children}</span>
			<Arrow external={external} />
		</a>
	);
}

export function ArrowButton({
	className,
	children,
	arrow = "\u2192",
	...props
}: React.ComponentProps<"button"> & { arrow?: string }) {
	return (
		<button type="button" className={cn(arrowLinkClass, className)} {...props}>
			<span>{children}</span>
			<span
				aria-hidden
				className="inline-block transition-transform duration-300 group-hover/link:translate-x-0.5"
			>
				{arrow}
			</span>
		</button>
	);
}
