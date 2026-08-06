"use client";

import { Container } from "@/components/common/container";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { LogoMark } from "@/components/layout/logo-mark";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NAV_SECTION_IDS } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

export function SiteHeader() {
  const activeId = useActiveSection(NAV_SECTION_IDS);

  return (
    <>
      <ReadingProgress />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
        <Container className="flex h-12 items-center justify-between gap-4">
          <LogoMark />

          <DesktopNav activeId={activeId} />

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MobileNav activeId={activeId} />
          </div>
        </Container>
      </header>
    </>
  );
}
