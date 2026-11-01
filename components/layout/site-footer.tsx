import { ArrowLink } from "@/components/common/arrow-link";
import { Container } from "@/components/common/container";
import { LocalTime } from "@/components/common/local-time";
import { PROFILE, SOCIAL_LINKS } from "@/data/profile";

export function SiteFooter() {
	return (
		<footer className="py-8">
			<Container>
				<div className="hairline flex flex-col gap-4 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-baseline sm:justify-between">
					<span>
						&#169; {new Date().getFullYear()} {PROFILE.fullName}
					</span>

					<span>
						{PROFILE.location} &#183; <LocalTime />
					</span>

					<div className="flex items-baseline gap-6">
						<nav aria-label="Social profiles" className="flex items-baseline gap-6">
							{SOCIAL_LINKS.filter((link) => link.platform !== "email").map((link) => (
								<ArrowLink key={link.platform} href={link.href} external>
									{link.label}
								</ArrowLink>
							))}
						</nav>
						<a
							href="#hero"
							className="text-foreground outline-none transition-colors hover:text-brand focus-visible:text-brand"
						>
							Back to top &#8593;
						</a>
					</div>
				</div>
			</Container>
		</footer>
	);
}
