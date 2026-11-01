import Image from "next/image";

import { ArrowLink } from "@/components/common/arrow-link";
import { Container } from "@/components/common/container";
import { LocalTime } from "@/components/common/local-time";
import { PdfDialog } from "@/components/common/pdf-dialog";
import { Reveal } from "@/components/common/reveal";
import { sectionHeadingId } from "@/components/common/section";
import { SplitReveal } from "@/components/common/split-reveal";
import { PROFILE } from "@/data/profile";

const [firstName] = PROFILE.fullName.split(" ");
const lastName = PROFILE.fullName.split(" ").at(-1) ?? "";

/** One screen: the name, set as large as the viewport allows, and little else. */
export function HeroSection() {
	return (
		<section
			id="hero"
			aria-labelledby={sectionHeadingId("hero")}
			className="flex min-h-svh flex-col pt-16"
		>
			<Container className="flex flex-1 flex-col justify-between gap-12 py-10 sm:py-14">
				<Reveal className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-sm text-muted-foreground">
					<span className="flex items-center gap-2.5">
						<span aria-hidden className="relative flex size-2">
							<span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-60" />
							<span className="relative size-2 rounded-full bg-brand" />
						</span>
						{PROFILE.availability}
					</span>
					<span>
						Manila, PH &#183; <LocalTime />
					</span>
				</Reveal>

				<Reveal>
					<h1
						id={sectionHeadingId("hero")}
						className="text-[clamp(3.5rem,19vw,6rem)] leading-[0.88] font-medium tracking-[-0.045em] sm:text-display"
					>
						<span className="sr-only">{PROFILE.fullName}</span>
						<span aria-hidden className="block">
							<SplitReveal as="span" text={firstName} className="block" />
							<SplitReveal
								as="span"
								text={lastName}
								accent={[lastName]}
								className="block sm:ps-[0.6em]"
							/>
						</span>
					</h1>
				</Reveal>

				<Reveal
					stagger
					className="grid items-end gap-8 sm:grid-cols-[auto_1fr_auto] sm:gap-10"
				>
					<Image
						src={PROFILE.avatar}
						alt={`Portrait of ${PROFILE.fullName}`}
						width={400}
						height={400}
						priority
						className="size-20 rounded-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0 sm:size-24"
					/>

					<p className="max-w-[28ch] text-lg leading-snug sm:text-xl">
						{PROFILE.role} building apps{" "}
						<span className="font-serif italic">&amp;</span> AI automation.
					</p>

					<div className="flex items-baseline gap-8">
						{PROFILE.resumeUrl ? (
							<PdfDialog
								url={PROFILE.resumeUrl}
								fileName="sherwin-laguidao-resume.pdf"
								label={`${PROFILE.fullName} — Resume`}
								trigger="Resume"
								triggerClassName="text-base"
							/>
						) : null}
						<ArrowLink href="#contact" className="text-base">
							Get in touch
						</ArrowLink>
					</div>
				</Reveal>
			</Container>
		</section>
	);
}
