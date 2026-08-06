import Image from "next/image";

import { Container } from "@/components/common/container";
import { sectionHeadingId } from "@/components/common/section";
import { TechList } from "@/components/common/tech-list";
import {
  BootPrompt,
  BootReveal,
  BootSequence,
} from "@/components/sections/hero/boot-sequence";
import { HeroActions } from "@/components/sections/hero/hero-actions";
import { MARQUEE_TECHNOLOGIES } from "@/data/navigation";
import { PROFILE } from "@/data/profile";

/**
 * The hero reads as a shell session: each prompt introduces the output below it,
 * and on load the whole thing types itself out one command at a time.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby={sectionHeadingId("hero")}
      className="pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <Container>
        <BootSequence>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <BootPrompt step={0} command="whoami" />

              <BootReveal
                step={0}
                className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <Image
                  src={PROFILE.avatar}
                  alt={`Portrait of ${PROFILE.fullName}`}
                  width={400}
                  height={400}
                  priority
                  className="size-20 shrink-0 border border-border object-cover sm:size-24"
                />

                <div className="flex flex-col gap-2">
                  <h1
                    id={sectionHeadingId("hero")}
                    className="text-2xl leading-tight sm:text-3xl"
                  >
                    {PROFILE.fullName}
                  </h1>

                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {PROFILE.roles.join(" \u00b7 ")}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {PROFILE.location} &#183; {PROFILE.timezone}
                  </p>
                </div>
              </BootReveal>
            </div>

            <div className="flex flex-col gap-4">
              <BootPrompt step={1} command="cat headline.txt" />

              <BootReveal step={1} className="flex flex-col gap-3">
                <p className="max-w-[38ch] text-xl leading-snug sm:text-2xl">
                  {PROFILE.headline.join(" ")}
                </p>

                <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                  {PROFILE.tagline}
                </p>
              </BootReveal>
            </div>

            <div className="flex flex-col gap-4">
              <BootPrompt step={2} command="ls stack/" />

              <BootReveal step={2}>
                <TechList
                  items={MARQUEE_TECHNOLOGIES}
                  className="max-w-[68ch] text-sm"
                />
              </BootReveal>
            </div>

            <div className="flex flex-col gap-4">
              <BootPrompt step={3} caret />

              <BootReveal step={3} className="flex flex-col gap-3">
                <HeroActions />

                <p className="text-xs text-muted-foreground">
                  status: <span className="text-term">{PROFILE.availability}</span>
                </p>
              </BootReveal>
            </div>
          </div>
        </BootSequence>
      </Container>
    </section>
  );
}
