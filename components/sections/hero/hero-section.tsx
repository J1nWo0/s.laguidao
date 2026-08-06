import { Container } from "@/components/common/container";
import { PromptLine } from "@/components/common/prompt-line";
import { sectionHeadingId } from "@/components/common/section";
import { TechList } from "@/components/common/tech-list";
import { HeroActions } from "@/components/sections/hero/hero-actions";
import { MARQUEE_TECHNOLOGIES } from "@/data/navigation";
import { PROFILE } from "@/data/profile";

/** The hero reads as a shell session: each prompt introduces the output below it. */
export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby={sectionHeadingId("hero")}
      className="pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <PromptLine command="whoami" />

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
        </div>

        <div className="flex flex-col gap-4">
          <PromptLine command="cat headline.txt" />

          <div className="flex flex-col gap-3">
            <p className="max-w-[38ch] text-xl leading-snug sm:text-2xl">
              {PROFILE.headline.join(" ")}
            </p>

            <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
              {PROFILE.tagline}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <PromptLine command="ls stack/" />
          <TechList items={MARQUEE_TECHNOLOGIES} className="max-w-[68ch] text-sm" />
        </div>

        <div className="flex flex-col gap-4">
          <PromptLine caret />

          <div className="flex flex-col gap-3">
            <HeroActions />

            <p className="text-xs text-muted-foreground">
              status: <span className="text-term">{PROFILE.availability}</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
