import { ArrowUpRight } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/common/reveal";
import { SocialIcon } from "@/components/common/social-icon";
import { SpotlightCard } from "@/components/common/spotlight-card";
import { SOCIAL_LINKS } from "@/data/profile";

/** Grid of every way to reach me, one card per channel. */
export function ContactChannels() {
  return (
    <RevealGroup
      as="ul"
      className="grid gap-3 sm:grid-cols-3"
      stagger={0.07}
    >
      {SOCIAL_LINKS.map((link) => (
        <RevealItem key={link.platform} as="li">
          <SpotlightCard className="group/channel h-full">
            <a
              href={link.href}
              target={link.platform === "email" ? undefined : "_blank"}
              rel="noreferrer"
              className="flex h-full flex-col gap-3 p-5 outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              <div className="flex items-center justify-between">
                <SocialIcon
                  platform={link.platform}
                  className="size-5 text-muted-foreground transition-colors duration-300 group-hover/channel:text-brand"
                />
                <ArrowUpRight className="size-4 text-muted-foreground/50 transition-transform duration-300 group-hover/channel:-translate-y-0.5 group-hover/channel:translate-x-0.5" />
              </div>
              <div>
                <p className="text-sm font-medium">{link.label}</p>
                <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                  {link.handle}
                </p>
              </div>
            </a>
          </SpotlightCard>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
