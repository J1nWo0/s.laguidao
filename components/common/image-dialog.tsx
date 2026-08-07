"use client";

import Image from "next/image";
import { Dialog } from "radix-ui";

import { BracketButton } from "@/components/common/bracket-link";
import { PromptChrome } from "@/components/common/prompt-line";

type ImageDialogProps = {
	/** Path under `public/`. */
	src: string;
	/** Intrinsic pixel size, so the frame is sized before the file arrives. */
	width: number;
	height: number;
	alt: string;
	/** Trigger text; defaults to `preview`. */
	trigger?: string;
};

/**
 * Full-screen screenshot viewer. Radix leaves the contents unmounted until it
 * is opened, so the file costs nothing until somebody asks to see it.
 */
export function ImageDialog({
	src,
	width,
	height,
	alt,
	trigger = "preview",
}: ImageDialogProps) {
	const fileName = src.split("/").pop() ?? src;

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

					<div className="flex min-h-0 flex-1 items-center justify-center bg-muted p-4">
						<Image
							src={src}
							alt={alt}
							width={width}
							height={height}
							className="h-auto max-h-full w-auto max-w-full object-contain"
						/>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
