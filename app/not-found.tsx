import type { Metadata } from "next";

import { BracketRouteLink } from "@/components/common/bracket-link";
import { Container } from "@/components/common/container";
import { PromptLine } from "@/components/common/prompt-line";
import { TreeList } from "@/components/common/tree-list";
import { NAV_ITEMS } from "@/data/navigation";

export const metadata: Metadata = {
  title: "404",
  description: "This path does not exist.",
  robots: { index: false, follow: false },
};

/** A missing route reads as a failed shell command, then offers the way back. */
export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-24 sm:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <PromptLine command="cd ./this-page" />

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl leading-tight sm:text-3xl">404</h1>

            <p className="text-xs text-muted-foreground sm:text-sm">
              cd: ./this-page: No such file or directory
            </p>

            <p className="text-xs text-muted-foreground">
              exit status: <span className="text-term">1</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <PromptLine command="ls ~" />

          <TreeList
            className="max-w-[38ch]"
            items={NAV_ITEMS.map((item) => (
              <BracketRouteLink
                key={item.id}
                href={`/#${item.id}`}
                className="lowercase"
              >
                {item.label}
              </BracketRouteLink>
            ))}
          />
        </div>

        <div className="flex flex-col gap-4">
          <PromptLine caret />

          <BracketRouteLink href="/">back to home</BracketRouteLink>
        </div>
      </Container>
    </main>
  );
}
