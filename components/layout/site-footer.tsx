import { Container } from "@/components/common/container";
import { SocialIcon } from "@/components/common/social-icon";
import { LogoMark } from "@/components/layout/logo-mark";
import { PROFILE, SOCIAL_LINKS } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <Container className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <LogoMark />
          <p className="font-mono text-[0.7rem] text-muted-foreground">
            {PROFILE.role} · {PROFILE.location}
          </p>
        </div>

        <nav aria-label="Social profiles" className="flex items-center gap-1">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.platform}
              href={link.href}
              target={link.platform === "email" ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={link.label}
              className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors duration-300 outline-none hover:bg-muted/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand/50"
            >
              <SocialIcon platform={link.platform} className="size-4" />
            </a>
          ))}
        </nav>

        <p className="font-mono text-[0.7rem] text-muted-foreground">
          © {new Date().getFullYear()} {PROFILE.fullName}
        </p>
      </Container>
    </footer>
  );
}
