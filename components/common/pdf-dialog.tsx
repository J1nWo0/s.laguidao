"use client";

import { Dialog } from "radix-ui";

import { BracketButton, BracketLink } from "@/components/common/bracket-link";
import { PromptChrome } from "@/components/common/prompt-line";
import { toEmbedUrl } from "@/lib/format";

type PdfDialogProps = {
	/** Shareable link to the document. */
	url: string;
	/** Shown in the title bar as the opened file, e.g. `"mediverse.pdf"`. */
	fileName: string;
	/** Accessible name for the viewer frame. */
	label: string;
	/** Trigger text; defaults to `docs`. */
	trigger?: string;
};

/**
 * Full-screen document viewer. Radix keeps the frame unmounted until opened, so
 * nothing is fetched until the reader asks for it.
 */
export function PdfDialog({
	url,
	fileName,
	label,
	trigger = "docs",
}: PdfDialogProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<BracketButton>{trigger}</BracketButton>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-[110] bg-black/70 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />

				<Dialog.Content
					aria-describedby={undefined}
					className="fixed inset-3 z-[110] flex flex-col border border-border bg-background duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 sm:inset-6 lg:inset-10"
				>
					<div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
						<Dialog.Title className="flex min-w-0 items-baseline gap-2 text-xs sm:text-sm">
							<PromptChrome className="shrink-0" />
							<span className="truncate">open {fileName}</span>
						</Dialog.Title>

						<Dialog.Close asChild>
							<BracketButton className="shrink-0 text-muted-foreground">
								close
							</BracketButton>
						</Dialog.Close>
					</div>

					<iframe
						src={toEmbedUrl(url)}
						title={label}
						className="min-h-0 w-full flex-1 border-0 bg-muted"
					/>

					<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-border px-4 py-2.5">
						<p className="text-xs text-muted-foreground">
							some hosts refuse to be embedded — open it directly
							if the viewer stays blank
						</p>

						<BracketLink
							href={url}
							external
							className="shrink-0 text-xs"
						>
							open directly
						</BracketLink>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
