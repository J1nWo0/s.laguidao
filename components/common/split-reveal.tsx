import { cn } from "@/lib/utils";

type SplitRevealProps = {
	text: string;
	/** Words set in the serif italic. Matched case-insensitively, punctuation ignored. */
	accent?: readonly string[];
	as?: "h1" | "h2" | "h3" | "p" | "span";
	className?: string;
	id?: string;
};

const normalize = (word: string) => word.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Splits a heading into masked words that rise into place when the nearest
 * `data-reveal` ancestor flips to `shown`. The words stay real inline text, so
 * the heading reads and wraps exactly as if it were never split.
 */
export function SplitReveal({
	text,
	accent = [],
	as: Component = "p",
	className,
	id,
}: SplitRevealProps) {
	const accented = new Set(accent.map(normalize));
	const words = text.split(/\s+/).filter(Boolean);

	return (
		<Component id={id} className={className}>
			{words.map((word, index) => (
				<span key={`${word}-${index}`}>
					<span className="split-word">
						<span
							className={cn(
								"split-inner",
								accented.has(normalize(word)) &&
									"font-serif font-normal italic tracking-normal",
							)}
							style={{ "--i": index } as React.CSSProperties}
						>
							{word}
						</span>
					</span>
					{index < words.length - 1 ? " " : null}
				</span>
			))}
		</Component>
	);
}
