import { Reveal } from "@/components/common/reveal";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { ContactChannels } from "@/components/sections/contact/contact-channels";
import { CopyEmailButton } from "@/components/sections/contact/copy-email-button";
import { StatusPill } from "@/components/sections/hero/status-pill";
import { PROFILE } from "@/data/profile";

export function ContactSection() {
  return (
    <Section id="contact" className="border-t border-border/50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-blueprint mask-radial-center opacity-70"
      />

      <SectionHeading
        sectionId="contact"
        index="05"
        eyebrow="Contact"
        align="center"
        title={
          <>
            Let&apos;s build something that{" "}
            <span className="font-display text-gradient-brand">
              runs itself
            </span>
          </>
        }
        description="Whether it's an API that needs designing or a manual process that deserves to be automated, I'd like to hear about it."
        className="mx-auto"
      />

      <Reveal
        delay={0.16}
        className="mx-auto mt-10 flex w-full max-w-xl items-center gap-3"
      >
        <a
          href={`mailto:${PROFILE.email}`}
          className="flex min-w-0 flex-1 items-center justify-center rounded-xl border border-border/70 bg-card/60 px-5 py-3 font-mono text-sm ring-hairline backdrop-blur-sm transition-colors duration-300 outline-none hover:border-brand/40 hover:text-brand focus-visible:ring-2 focus-visible:ring-brand/50 sm:text-base"
        >
          <span className="truncate">{PROFILE.email}</span>
        </a>
        <CopyEmailButton email={PROFILE.email} />
      </Reveal>

      <Reveal delay={0.22} className="mt-4 flex justify-center">
        <StatusPill>
          {PROFILE.availability} · {PROFILE.timezone}
        </StatusPill>
      </Reveal>

      <div className="mt-14">
        <ContactChannels />
      </div>
    </Section>
  );
}
