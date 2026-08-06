import { BracketLink } from "@/components/common/bracket-link";
import { SOCIAL_LINKS } from "@/data/profile";

const GITHUB = SOCIAL_LINKS.find((link) => link.platform === "github");
const GITHUB_URL = "https://github.com/J1nWo0/s.laguidao";

export function HeroActions() {
	return (
		<div className="flex flex-wrap items-center gap-x-6 gap-y-2">
			<BracketLink href="#contact">start a conversation</BracketLink>

			{GITHUB ? (
				// <BracketLink href={GITHUB.href} external>
        <BracketLink href={GITHUB_URL} target="_blank" rel="noreferrer">
					browse the code
				</BracketLink>
			) : null}
		</div>
	);
}
