import { TechList } from "@/components/common/tech-list";
import { slugify } from "@/lib/format";
import type { SkillGroup } from "@/types";

/** One line of `tree` output: a directory name and what lives inside it. */
export function SkillGroupRow({ group }: { group: SkillGroup }) {
	return (
		<div className="grid gap-1 md:grid-cols-[11rem_1fr] md:gap-4">
			<span className="text-sm">{slugify(group.title)}/</span>

			<div className="min-w-0">
				<TechList items={group.skills} className="text-sm" />
				<p className="mt-1 text-xs text-muted-foreground opacity-70">
					{group.description}
				</p>
			</div>
		</div>
	);
}
