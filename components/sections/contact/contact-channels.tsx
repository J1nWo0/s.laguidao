import { LeaderRow } from "@/components/common/leader-row";
import { SOCIAL_LINKS } from "@/data/profile";

export function ContactChannels() {
  return (
    <div className="flex flex-col gap-2.5">
      {SOCIAL_LINKS.map((link) => (
        <LeaderRow key={link.platform} label={link.label.toLowerCase()}>
          <a
            href={link.href}
            target={link.platform === "email" ? undefined : "_blank"}
            rel="noreferrer"
            className="break-all underline decoration-dotted underline-offset-4 transition-colors hover:text-term"
          >
            {link.handle}
            <span aria-hidden> &#8599;</span>
          </a>
        </LeaderRow>
      ))}
    </div>
  );
}
