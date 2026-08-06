import { cn } from "@/lib/utils";

/** Page-wide horizontal rhythm. Every full-bleed section wraps content in this. */
export function Container({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("mx-auto w-full max-w-4xl px-5 sm:px-8", className)}
			{...props}
		/>
	);
}
