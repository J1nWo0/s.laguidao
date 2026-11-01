"use client";

import { Dialog } from "radix-ui";
import { useState } from "react";

import { ArrowLink } from "@/components/common/arrow-link";
import { Container } from "@/components/common/container";
import { LocalTime } from "@/components/common/local-time";
import { NAV_ITEMS } from "@/data/navigation";
import { PROFILE, SOCIAL_LINKS } from "@/data/profile";
import { cn } from "@/lib/utils";

/** Full-screen menu for small screens: the section names, set large. */
export function MobileNav({ activeId }: { activeId: string | null }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger className="text-sm outline-none transition-colors hover:text-brand focus-visible:text-brand md:hidden">
				Menu
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Content
					aria-describedby={undefined}
					className="fixed inset-0 z-100 flex flex-col bg-background duration-300 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
				>
					<Container className="flex h-16 shrink-0 items-center justify-between">
						<Dialog.Title className="text-sm font-medium">
							{PROFILE.fullName}
						</Dialog.Title>
						<Dialog.Close className="text-sm outline-none transition-colors hover:text-brand focus-visible:text-brand">
							Close
						</Dialog.Close>
					</Container>

					<Container className="flex flex-1 flex-col justify-center">
						<nav aria-label="Sections">
							<ol className="flex flex-col">
								{NAV_ITEMS.map((item, index) => (
									<li key={item.id} className="hairline">
										<a
											href={`#${item.id}`}
											onClick={() => setOpen(false)}
											aria-current={activeId === item.id ? "true" : undefined}
											className={cn(
												"flex items-baseline justify-between py-4 text-5xl tracking-tight outline-none transition-colors hover:text-brand focus-visible:text-brand",
												activeId === item.id && "text-brand",
											)}
										>
											{item.label}
											<span className="text-xs tabular-nums text-muted-foreground">
												{String(index + 1).padStart(2, "0")}
											</span>
										</a>
									</li>
								))}
							</ol>
						</nav>
					</Container>

					<Container className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-6 text-muted-foreground">
						{SOCIAL_LINKS.filter((link) => link.platform !== "email").map((link) => (
							<ArrowLink key={link.platform} href={link.href} external>
								{link.label}
							</ArrowLink>
						))}
						<span className="ms-auto text-sm">
							Manila <LocalTime />
						</span>
					</Container>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
