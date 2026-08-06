import { MetaRow } from "@/components/common/section";
import { TechList } from "@/components/common/tech-list";
import { EDUCATION } from "@/data/education";
import { formatCompactRange, formatDuration } from "@/lib/format";

export function EducationList() {
  return (
    <ul className="flex flex-col gap-6">
      {EDUCATION.map((education) => (
        <li key={education.id}>
          <MetaRow
            meta={
              <>
                <span>{formatCompactRange(education.start, education.end)}</span>
                <span className="opacity-70">
                  {formatDuration(education.start, education.end)}
                </span>
              </>
            }
          >
            <h4 className="text-sm">{education.degree}</h4>

            <p className="mt-1 text-xs text-muted-foreground">
              {education.school} &#183; {education.location}
            </p>

            <TechList items={education.coursework} className="mt-3" />
          </MetaRow>
        </li>
      ))}
    </ul>
  );
}
