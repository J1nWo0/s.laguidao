import type { Education } from "@/types";

export const EDUCATION: readonly Education[] = [
  {
    id: "tup-manila",
    degree: "BS Computer Science",
    school: "Technological University of the Philippines",
    location: "Manila, Philippines",
    start: "2021-09",
    end: "2025-08",
    coursework: [
      "Software Engineering",
      "Web Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Analytics",
    ],
  },
] as const;
