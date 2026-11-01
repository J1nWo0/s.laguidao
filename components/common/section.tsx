import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { SectionLabel } from "@/components/common/section-label";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/types";

/** Derives the heading id a section's `aria-labelledby` points at. */
export function sectionHeadingId(id: SectionId): string {
	return `${id}-heading`;
}

type SectionProps = Omit<React.ComponentProps<"section">, "id"> & {
	id: SectionId;
	/** Two-digit chapter number, e.g. `"01"`. */
	index: string;
	label: string;
	/** Right-aligned counter such as `"3 projects"`. */
	meta?: React.ReactNode;
};

/**
 * Consistent vertical rhythm, scroll-spy anchor and accessible labelling for
 * every top-level section. The numbered label is the section's heading; the
 * blocks under it fade in the first time the section is scrolled to.
 */
export function Section({
	id,
	index,
	label,
	meta,
	className,
	children,
	...props
}: SectionProps) {
	return (
		<section
			id={id}
			aria-labelledby={sectionHeadingId(id)}
			className={cn("relative scroll-mt-20 py-24 sm:py-32", className)}
			{...props}
		>
			<Container>
				<Reveal stagger className="flex flex-col gap-12 sm:gap-16">
					<SectionLabel
						headingId={sectionHeadingId(id)}
						index={index}
						label={label}
						meta={meta}
					/>
					{children}
				</Reveal>
			</Container>
		</section>
	);
}
