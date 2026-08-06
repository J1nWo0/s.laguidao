import { PROFILE } from "@/data/profile";

/**
 * Single source of truth for metadata, canonical URLs and OG image copy.
 * Set `NEXT_PUBLIC_SITE_URL` per environment; the fallback keeps local dev working.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8000";

export const siteConfig = {
  name: PROFILE.name,
  title: `${PROFILE.name}`,
  shortTitle: PROFILE.name,
  description: PROFILE.metaDescription,
  url: SITE_URL,
  locale: "en_US",
  keywords: [
    PROFILE.name,
    "backend developer",
    "software developer",
    "Node.js",
    "TypeScript",
    "automation",
    "AI integration",
    "Philippines",
  ],
} as const;
