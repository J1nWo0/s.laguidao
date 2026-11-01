"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export function CopyEmailButton({ email }: { email: string }) {
	const { copied, copy } = useCopyToClipboard();

	return (
		<button
			type="button"
			onClick={() => copy(email)}
			className="rounded-full border border-border px-4 py-2 text-sm outline-none transition-colors hover:border-brand hover:text-brand focus-visible:border-brand focus-visible:text-brand"
		>
			<span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
		</button>
	);
}
