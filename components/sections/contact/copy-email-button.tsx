"use client";

import * as React from "react";

import { BracketButton } from "@/components/common/bracket-link";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

/** Feedback stays inside the label — no toast, no icon swap. */
export function CopyEmailButton({ email }: { email: string }) {
	const { copied, copy } = useCopyToClipboard();
	const [failed, setFailed] = React.useState(false);

	const handleCopy = async () => {
		setFailed(!(await copy(email)));
	};

	const label = copied ? "copied" : failed ? "select it instead" : "copy";

	return (
		<>
			<BracketButton
				onClick={handleCopy}
				aria-label={copied ? "Email copied" : "Copy email address"}
				className="text-muted-foreground"
			>
				{label}
			</BracketButton>

			<span role="status" aria-live="polite" className="sr-only">
				{copied ? "Email copied to clipboard" : ""}
			</span>
		</>
	);
}
