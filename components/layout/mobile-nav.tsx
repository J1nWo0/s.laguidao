"use client";

import * as React from "react";
import { ArrowUpRight, Menu } from "lucide-react";

import { SocialIcon } from "@/components/common/social-icon";
import { Button } from "@/components/ui/button";
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
        <Button
          variant="outline"
          size="icon-sm"
          className="md:hidden"
          aria-label="Open navigation"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72 gap-0 border-border/70">
        <SheetHeader className="border-b border-border/60 px-6 py-5">
          <SheetTitle className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Navigate
          </SheetTitle>
        </SheetHeader>

        <nav aria-label="Sections" className="flex flex-col px-3 py-4">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-3 text-base transition-colors duration-200 hover:bg-muted/60",
                activeId === item.id ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-[0.65rem] text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </span>
              <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-60" />
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-border/60 p-6">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            Elsewhere
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((link) => (
              <Button
                key={link.platform}
                asChild
                variant="outline"
                size="icon-sm"
              >
                <a
                  href={link.href}
                  target={link.platform === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={link.label}
                >
                  <SocialIcon platform={link.platform} className="size-3.5" />
                </a>
              </Button>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">{PROFILE.location}</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
