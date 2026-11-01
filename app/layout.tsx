import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { siteConfig } from "@/config/site";
import { PROFILE, SOCIAL_LINKS } from "@/data/profile";
import { cn } from "@/lib/utils";

import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.shortTitle}`,  
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.shortTitle,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0e0e" },
  ],
};

/** JSON-LD so search engines read the page as a person, not a landing page. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.fullName,
  jobTitle: PROFILE.role,
  email: `mailto:${PROFILE.email}`,
  url: siteConfig.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Manila",
    addressCountry: "PH",
  },
  sameAs: SOCIAL_LINKS.filter((link) => link.platform !== "email").map(
    (link) => link.href,
  ),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        instrumentSans.variable,
        instrumentSerif.variable,
        "h-full antialiased",
      )}
    >
      <body className="flex min-h-full flex-col">
        {/* Entrances are scripted, so without JS everything simply starts visible. */}
        <noscript>
          <style>{`.reveal[data-reveal="pending"],.reveal-stagger[data-reveal="pending"]>*,[data-reveal="pending"] .split-inner{opacity:1;transform:none}`}</style>
        </noscript>

        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escaping `<` prevents the payload from breaking out of the tag.
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
