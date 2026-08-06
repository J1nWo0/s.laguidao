import { PromptLine } from "@/components/common/prompt-line";
import { Section } from "@/components/common/section";
import { SectionHeading, SubHeading } from "@/components/common/section-heading";
import { ContactChannels } from "@/components/sections/contact/contact-channels";
import { CopyEmailButton } from "@/components/sections/contact/copy-email-button";
import { PROFILE } from "@/data/profile";

export function ContactSection() {
  return (
    <Section id="contact" className="rule">
      <SectionHeading
        sectionId="contact"
        index="05"
        label="contact"
        description="Whether it's an API that needs designing or a manual process that deserves to be automated, I'd like to hear about it."
      />

      <div className="mt-10 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <PromptLine command={'mail -s "let\u2019s build something"'} />

          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="break-all text-base underline decoration-dotted underline-offset-4 transition-colors hover:text-term sm:text-lg"
            >
              {PROFILE.email}
            </a>

            <CopyEmailButton email={PROFILE.email} />
          </div>

          <p className="text-xs text-muted-foreground">
            status: <span className="text-term">{PROFILE.availability}</span>{" "}
            &#183; {PROFILE.timezone}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <SubHeading>channels</SubHeading>
          <ContactChannels />
        </div>
      </div>
    </Section>
  );
}
