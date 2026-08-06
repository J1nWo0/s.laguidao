import { Container } from "@/components/common/container";
import { LogoMark } from "@/components/layout/logo-mark";
import { PROFILE, SOCIAL_LINKS } from "@/data/profile";

export function SiteFooter() {
	return (
		<footer className="border-t border-border py-6">
			<Container className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
					<LogoMark className="text-xs" />
					<span aria-hidden className="opacity-40">
						&#183;
					</span>
					<span>
						&#169; {new Date().getFullYear()} {PROFILE.fullName}
					</span>
				</div>

				<nav
					aria-label="Social profiles"
					className="flex items-center gap-4"
				>
					{SOCIAL_LINKS.map((link) => (
						<a
							key={link.platform}
							href={link.href}
							target={
								link.platform === "email" ? undefined : "_blank"
							}
							rel="noreferrer"
							className="lowercase transition-colors hover:text-term"
						>
							{link.label}
							<span aria-hidden> &#8599;</span>
						</a>
					))}
				</nav>
			</Container>
		</footer>
	);
}
