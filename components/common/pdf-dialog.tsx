"use client";

import { Dialog } from "radix-ui";

import { ArrowButton, ArrowLink } from "@/components/common/arrow-link";
import { toDownloadUrl, toEmbedUrl } from "@/lib/format";

type PdfDialogProps = {
	/** Shareable link to the document. */
	url: string;
	/** Suggested name for the downloaded file, e.g. `"mediverse.pdf"`. */
	fileName: string;
	/** Title of the viewer and accessible name for its frame. */
	label: string;
	/** Trigger text; defaults to `Docs`. */
	trigger?: string;
	triggerClassName?: string;
};

/**
 * Full-screen document viewer. Radix keeps the frame unmounted until opened, so
 * nothing is fetched until the reader asks for it.
 */
export function PdfDialog({
	url,
	fileName,
	label,
	trigger = "Docs",
	triggerClassName,
}: PdfDialogProps) {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<ArrowButton arrow={"\u2197"} className={triggerClassName}>
					{trigger}
				</ArrowButton>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-110 bg-black/60 duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />

				<Dialog.Content
					aria-describedby={undefined}
					className="fixed inset-3 z-110 flex flex-col overflow-hidden rounded-lg bg-background duration-300 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.98] data-closed:animate-out data-closed:fade-out-0 sm:inset-6 lg:inset-10"
				>
					<div className="flex items-center justify-between gap-4 px-5 py-4">
						<Dialog.Title className="truncate text-sm font-medium">
							{label}
						</Dialog.Title>

						<div className="flex shrink-0 items-baseline gap-x-6 text-muted-foreground">
							<ArrowLink href={toDownloadUrl(url)} download={fileName} external>
								Download
							</ArrowLink>

							<Dialog.Close asChild>
								<button
									type="button"
									className="text-sm transition-colors outline-none hover:text-brand focus-visible:text-brand"
								>
									Close
								</button>
							</Dialog.Close>
						</div>
					</div>

					<iframe
						src={toEmbedUrl(url)}
						title={label}
						className="min-h-0 w-full flex-1 border-0 bg-muted"
					/>

					<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-5 py-3 text-xs text-muted-foreground">
						<p>Viewer staying blank? Some hosts refuse to be embedded.</p>
						<ArrowLink href={url} external className="text-xs">
							Open directly
						</ArrowLink>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
