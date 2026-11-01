import type { Metadata } from "next";
import Link from "next/link";

import { arrowLinkClass } from "@/components/common/arrow-link";
import { Container } from "@/components/common/container";
import { NAV_ITEMS } from "@/data/navigation";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "404",
  description: "This path does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center py-24">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h1 className="text-display font-medium tracking-[-0.045em]">
            4<span className="font-serif font-normal italic">0</span>4
          </h1>
          <p className="max-w-[30ch] text-xl leading-snug text-muted-foreground">
            This page doesn&apos;t exist — but the rest of the site does.
          </p>
        </div>

        <nav
          aria-label="Sections"
          className="hairline flex flex-wrap items-baseline gap-x-8 gap-y-3 pt-6"
        >
          <Link href="/" className={cn(arrowLinkClass, "text-base")}>
            Back home
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={cn(arrowLinkClass, "text-base text-muted-foreground")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </main>
  );
}
