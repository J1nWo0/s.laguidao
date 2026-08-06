"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { Magnetic } from "@/components/animate-ui/primitives/effects/magnetic";
import { SocialIcon } from "@/components/common/social-icon";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/data/profile";

const GITHUB = SOCIAL_LINKS.find((link) => link.platform === "github");

/** Primary calls to action; the buttons lean toward the cursor as it approaches. */
export function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Magnetic strength={0.35} range={140}>
        <Button asChild size="lg" className="h-11 px-5 text-[0.95rem]">
          <a href="#contact">
            <Mail data-icon="inline-start" />
            Start a conversation
          </a>
        </Button>
      </Magnetic>

      {GITHUB ? (
        <Magnetic strength={0.3} range={140}>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group h-11 px-5 text-[0.95rem]"
          >
            <a href={GITHUB.href} target="_blank" rel="noreferrer">
              <SocialIcon
                platform="github"
                data-icon="inline-start"
                className="size-4"
              />
              Browse the code
              <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </Magnetic>
      ) : null}
    </div>
  );
}
