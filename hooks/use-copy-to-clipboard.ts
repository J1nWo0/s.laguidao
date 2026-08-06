"use client";

import * as React from "react";

type UseCopyToClipboardOptions = {
  /** How long the `copied` flag stays true, in milliseconds. */
  resetDelay?: number;
};

/** Clipboard write with a self-resetting `copied` flag for button feedback. */
export function useCopyToClipboard({
  resetDelay = 2000,
}: UseCopyToClipboardOptions = {}) {
  const [copied, setCopied] = React.useState(false);
  const timeout = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => () => clearTimeout(timeout.current), []);

  const copy = React.useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetDelay],
  );

  return { copied, copy };
}
