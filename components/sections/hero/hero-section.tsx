import { AuroraBackdrop } from "@/components/common/aurora-backdrop";
import { Container } from "@/components/common/container";
import { Marquee } from "@/components/common/marquee";
import { Reveal } from "@/components/common/reveal";
import { HeroActions } from "@/components/sections/hero/hero-actions";
import { HeroCodeCard } from "@/components/sections/hero/hero-code-card";
import { HeroHeadline } from "@/components/sections/hero/hero-headline";
import { ScrollCue } from "@/components/sections/hero/scroll-cue";
import { StatusPill } from "@/components/sections/hero/status-pill";
import { MARQUEE_TECHNOLOGIES } from "@/data/navigation";
import { PROFILE } from "@/data/profile";
import { sectionHeadingId } from "@/components/common/section";

export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby={sectionHeadingId("hero")}
      className="relative isolate overflow-hidden pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-24"
    >
      <AuroraBackdrop />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="flex flex-col gap-8">
            <Reveal>
              <StatusPill>{PROFILE.availability}</StatusPill>
            </Reveal>

            <HeroHeadline />

            <Reveal delay={0.6} className="max-w-lg">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {PROFILE.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.72}>
              <HeroActions />
            </Reveal>
          </div>

          <HeroCodeCard className="lg:justify-self-end" />
        </div>

        <div className="mt-16 flex items-center gap-6 lg:mt-24">
          <ScrollCue href="#about" />
          <Marquee items={MARQUEE_TECHNOLOGIES} className="flex-1" />
        </div>
      </Container>
    </section>
  );
}
