"use client";

import * as React from "react";

const subscribe = () => () => {};

/**
 * False on the server and during hydration, true afterwards. Use it to defer
 * rendering anything that depends on browser-only state (theme, media queries,
 * locale) so the server and client markup agree.
 *
 * Implemented with `useSyncExternalStore` rather than a mount effect so it does
 * not trigger a second render pass.
 */
export function useMounted(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
