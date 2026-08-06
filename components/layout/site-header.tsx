"use client";

import { Container } from "@/components/common/container";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { LogoMark } from "@/components/layout/logo-mark";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { NAV_SECTION_IDS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollThreshold } from "@/hooks/use-scroll-threshold";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const activeId = useActiveSection(NAV_SECTION_IDS);
  const condensed = useScrollThreshold(24);

  return (
    <>
      <ReadingProgress />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          condensed
            ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <Container
          className={cn(
            "flex items-center justify-between transition-[height] duration-500",
            condensed ? "h-14" : "h-16 sm:h-20",
          )}
        >
          <LogoMark />

          <DesktopNav activeId={activeId} />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href="#contact">Get in touch</a>
            </Button>
            <MobileNav activeId={activeId} />
          </div>
        </Container>
      </header>
    </>
  );
}
