import { BracketLink } from "@/components/common/bracket-link";
import { SOCIAL_LINKS } from "@/data/profile";

const GITHUB = SOCIAL_LINKS.find((link) => link.platform === "github");

export function HeroActions() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <BracketLink href="#contact">start a conversation</BracketLink>

      {GITHUB ? (
        <BracketLink href={GITHUB.href} external>
          browse the code
        </BracketLink>
      ) : null}
    </div>
  );
}
