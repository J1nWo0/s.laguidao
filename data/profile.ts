import type { Fact, SocialLink } from "@/types";

export const PROFILE = {
  name: "s.laguidao",
  fullName: "Sherwin S. Laguidao",
  initials: "SL",
  role: "Backend Developer",
  /** Cycled through by the hero headline. */
  roles: [
    "Backend Developer",
    "Automation Engineer",
    "API Architect",
    "AI Integrator",
  ],
  location: "Manila, Philippines",
  timezone: "GMT+8",
  email: "sherwinlaguidao.work@gmail.com",
  phone: "+63 927 985 2600",
  availability: "Open to backend & automation roles",
  headline: ["I build backends", "that run themselves."],
  tagline:
    "Backend developer specialising in automated workflows, resilient APIs and AI-powered pipelines — currently shipping for a London-based platform from Manila.",
  bio: [
    "I'm a computer science graduate turned backend developer who is happiest a layer beneath the interface — designing the APIs, data models and event-driven jobs that make a product feel effortless.",
    "At LPGP Connect I automate the work nobody should be doing by hand: database backups, third-party integrations and trigger-based pipelines. A lot of that work is measured in latency and token cost, so I've grown a habit of tuning until the numbers justify the feature.",
    "Before that I built full-stack features end to end during my internship, which is why I still care about the frontend contract: predictable payloads, honest error states and interfaces that don't need a workaround.",
  ],
  metaDescription:
    "Sherwin Laguidao is a backend developer in Manila building automated workflows, resilient APIs and AI-powered pipelines with Node.js, TypeScript and Python.",
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
  { label: "Currently", value: "Jr. Backend Developer at LPGP Connect" },
  { label: "Focused on", value: "APIs, automation & AI pipelines" },
  { label: "Status", value: PROFILE.availability },
] as const;
