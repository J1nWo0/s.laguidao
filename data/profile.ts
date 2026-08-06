import type { Fact, SocialLink } from "@/types";

export const PROFILE = {
  name: "s.laguidao",
  fullName: "Sherwin S. Laguidao",
  initials: "SL",
  /** Served from `public/`; kept local so the static export has no CDN dependency. */
  avatar: "/profile.jpg",
  role: "Full-Stack Developer",
  /** Cycled through by the hero headline. */
  roles: [
    "Full-Stack Developer",
    "Backend Engineer",
    "Automation Engineer",
    "AI Integrator",
  ],
  location: "Manila, Philippines",
  timezone: "GMT+8",
  email: "sherwinlaguidao.work@gmail.com",
  phone: "+63 927 985 2600",
  availability: "Open to full-stack, backend & automation roles",
  headline: ["I build modern apps", "from frontend to backend", "and use AI to automate workflows."],
  tagline:
    "Full-stack developer specializing in scalable web applications, resilient APIs, workflow automation, and AI-powered solutions using modern JavaScript and TypeScript technologies.",
  bio: [
    "I'm a computer science graduate and full-stack developer passionate about building modern web applications from the user interface down to the backend infrastructure. I enjoy creating software that is fast, scalable, and easy to maintain.",
    "My experience spans frontend development with React, Next.js, Tailwind CSS, and shadcn/ui, as well as backend development using Node.js, NestJS, Express, MongoDB, and PostgreSQL. I also build REST APIs, automate workflows, and integrate AI services to solve real-world problems.",
    "I believe great products come from understanding the entire stack. Whether I'm designing intuitive user experiences, building reliable APIs, or automating complex business processes, my goal is always to deliver clean, maintainable, and impactful solutions.",
  ],

  metaDescription:
    "Sherwin Laguidao is a full-stack developer in Manila building scalable web applications, modern user interfaces, resilient APIs, workflow automation, and AI-powered solutions with React, Next.js, Node.js, TypeScript, and Python.",
} as const;

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    platform: "github",
    label: "GitHub",
    handle: "J1nWo0",
    href: "https://github.com/J1nWo0",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "sherwin-laguidao",
    href: "https://www.linkedin.com/in/sherwin-laguidao-730400314",
  },
  {
    platform: "email",
    label: "Email",
    handle: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
] as const;

export const QUICK_FACTS: readonly Fact[] = [
  { label: "Based in", value: `${PROFILE.location} · ${PROFILE.timezone}` },
  { label: "Currently", value: "Jr. Full-Stack Developer at LPGP Connect" },
  { label: "Focused on", value: "Full-stack apps, APIs & AI automation" },
  { label: "Status", value: PROFILE.availability },
] as const;
