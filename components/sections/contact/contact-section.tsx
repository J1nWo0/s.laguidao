import { ArrowLink } from "@/components/common/arrow-link";
import { PdfDialog } from "@/components/common/pdf-dialog";
import { Section } from "@/components/common/section";
import { SplitReveal } from "@/components/common/split-reveal";
import { CopyEmailButton } from "@/components/sections/contact/copy-email-button";
import { PROFILE, SOCIAL_LINKS } from "@/data/profile";

/** Split so a narrow screen wraps the address at the `@`, never mid-word. */
const [emailLocal, emailDomain] = PROFILE.email.split("@");

export function ContactSection() {
	return (
		<Section id="contact" index="05" label="Contact" className="pb-16 sm:pb-20">
			<SplitReveal
				text="Have a role or project in mind?"
				accent={["mind?"]}
				className="max-w-[20ch] text-statement font-medium tracking-[-0.03em]"
			/>

			<div className="flex flex-col gap-8">
				<a
					href={`mailto:${PROFILE.email}`}
					className="group/email w-fit text-[clamp(1.75rem,5.6vw,5.25rem)] leading-[1.05] font-medium tracking-[-0.035em] outline-none transition-colors hover:text-brand focus-visible:text-brand"
				>
					{emailLocal}
					<wbr />@{emailDomain}
					<span
						aria-hidden
						className="ms-[0.2em] inline-block transition-transform duration-500 group-hover/email:-translate-y-[0.1em] group-hover/email:translate-x-[0.1em]"
					>
						&#8599;
					</span>
				</a>

				<div className="flex flex-wrap items-center gap-x-8 gap-y-4">
					<CopyEmailButton email={PROFILE.email} />

					{SOCIAL_LINKS.filter((link) => link.platform !== "email").map((link) => (
						<ArrowLink key={link.platform} href={link.href} external className="text-base">
							{link.label}
						</ArrowLink>
					))}

					{PROFILE.resumeUrl ? (
						<PdfDialog
							url={PROFILE.resumeUrl}
							fileName="sherwin-laguidao-resume.pdf"
							label={`${PROFILE.fullName} — Resume`}
							trigger="Resume"
							triggerClassName="text-base"
						/>
					) : null}
				</div>
			</div>
		</Section>
	);
}
