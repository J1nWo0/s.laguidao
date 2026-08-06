import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

/** Derives the heading id a section's `aria-labelledby` points at. */
export function sectionHeadingId(id: SectionId): string {
	return `${id}-heading`;
}

type SectionProps = Omit<React.ComponentProps<"section">, "id"> & {
	id: SectionId;
	/** Escape hatch for sections that manage their own container width. */
	bleed?: boolean;
	containerClassName?: string;
};

/**
 * Consistent vertical rhythm, scroll-spy anchor and accessible labelling for
 * every top-level section of the page. The heading and the blocks under it fade
 * in the first time the section is scrolled to.
 */
export function Section({
	id,
	bleed = false,
	className,
	containerClassName,
	children,
	...props
}: SectionProps) {
	const content = <Reveal stagger>{children}</Reveal>;

	return (
		<section
			id={id}
			aria-labelledby={sectionHeadingId(id)}
			className={cn("relative scroll-mt-16 py-16 sm:py-20", className)}
			{...props}
		>
			{bleed ? (
				content
			) : (
				<Container className={containerClassName}>{content}</Container>
			)}
		</section>
	);
}

/**
 * The layout that unifies experience, projects and education: mono metadata in
 * a fixed left gutter, content on the right. Stacks below `md` where there is
 * no room for two columns of monospace.
 */
export function MetaRow({
	meta,
	className,
	children,
}: {
	meta: React.ReactNode;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div
			className={cn(
				"grid gap-3 md:grid-cols-[7.5rem_1fr] md:gap-6",
				className,
			)}
		>
			<div className="flex flex-col gap-1 text-xs text-muted-foreground tabular-nums">
				{meta}
			</div>
			<div className="min-w-0">{children}</div>
		</div>
	);
}
