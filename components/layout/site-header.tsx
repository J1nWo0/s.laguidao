"use client";

import { Container } from "@/components/common/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ReadingProgress } from "@/components/layout/reading-progress";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NAV_ITEMS, NAV_SECTION_IDS } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

export function SiteHeader() {
	const activeId = useActiveSection(NAV_SECTION_IDS);

	return (
		<>
			<ReadingProgress />

			<header className="fixed inset-x-0 top-0 z-50 bg-background">
				<Container className="flex h-16 items-center justify-between gap-6">
					<a
						href="#hero"
						className="text-sm font-medium tracking-tight outline-none transition-colors hover:text-brand focus-visible:text-brand"
					>
						{PROFILE.fullName}
						<span className="sr-only"> — back to top</span>
					</a>

					<nav aria-label="Sections" className="hidden items-center gap-8 md:flex">
						{NAV_ITEMS.map((item) => {
							const active = activeId === item.id;

							return (
								<a
									key={item.id}
									href={`#${item.id}`}
									aria-current={active ? "true" : undefined}
									className={cn(
										"relative flex items-center gap-2 text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground",
										active && "text-foreground",
									)}
								>
									<span
										aria-hidden
										className={cn(
											"size-1.5 rounded-full bg-brand transition-[opacity,scale] duration-300",
											active ? "scale-100 opacity-100" : "scale-0 opacity-0",
										)}
									/>
									{item.label}
								</a>
							);
						})}
					</nav>

					<div className="flex items-center gap-6">
						<ThemeToggle />
						<MobileNav activeId={activeId} />
					</div>
				</Container>
			</header>
		</>
	);
}
