"use client";

import * as React from "react";

import { BracketButton } from "@/components/common/bracket-link";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/data/navigation";
import { PROFILE, SOCIAL_LINKS } from "@/data/profile";
import { cn } from "@/lib/utils";

export function MobileNav({ activeId }: { activeId: string | null }) {
	const [open, setOpen] = React.useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<BracketButton className="text-muted-foreground md:hidden">
					menu
				</BracketButton>
			</SheetTrigger>

			<SheetContent
				side="top"
				className="gap-0 border-border bg-background pb-5"
			>
				<SheetHeader className="border-b border-border px-5 py-3">
					<SheetTitle className="text-xs font-normal uppercase tracking-[0.2em] text-muted-foreground">
						Sections
					</SheetTitle>
				</SheetHeader>

				<nav aria-label="Sections" className="flex flex-col px-5 py-2">
					{NAV_ITEMS.map((item, index) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							onClick={() => setOpen(false)}
							className={cn(
								"flex items-baseline gap-3 py-2.5 text-sm lowercase transition-colors hover:text-term",
								activeId === item.id
									? "text-term"
									: "text-muted-foreground",
							)}
						>
							<span
								aria-hidden
								className="text-xs tabular-nums opacity-60"
							>
								{String(index + 1).padStart(2, "0")}
							</span>
							{item.label}
						</a>
					))}
				</nav>

				<div className="mx-5 flex flex-wrap items-center gap-x-4 gap-y-1 rule pt-4 text-xs text-muted-foreground">
					{SOCIAL_LINKS.map((link) => (
						<a
							key={link.platform}
							href={link.href}
							target={
								link.platform === "email" ? undefined : "_blank"
							}
							rel="noreferrer"
							className="lowercase transition-colors hover:text-term"
						>
							{link.label}
							<span aria-hidden> &#8599;</span>
						</a>
					))}
					<span className="ms-auto">{PROFILE.location}</span>
				</div>
			</SheetContent>
		</Sheet>
	);
}
