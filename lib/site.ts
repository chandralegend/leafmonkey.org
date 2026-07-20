/**
 * Central site constants for SEO. Set NEXT_PUBLIC_SITE_URL in the environment
 * (and in Vercel) to your real production domain so canonical URLs, sitemap
 * entries, and Open Graph image URLs are absolute and correct.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://leafmonkeylabs.com"
).replace(/\/$/, "");

export const SITE_NAME = "Leaf Monkey Labs";
export const SITE_SHORT_NAME = "Leaf Monkey";
export const SITE_TAGLINE = "Native to the canopy. Built for the wild.";

export const DEFAULT_DESCRIPTION =
  "A Sri Lankan software agency turning founders' ideas into research-grade products — digital transformation, AI-native product development, and applied AI research, published where it holds up: ISPASS, MDPI, IEEE.";

export const LOCALE = "en_US";

export const SITE_EMAIL = "hello@leafmonkeylabs.com";

/** Stable absolute fallback image for structured data (JSON-LD). */
export const DEFAULT_OG_IMAGE =
  "https://images.unsplash.com/photo-1764208637252-4cb59a64a674?w=1200&q=80&auto=format&fit=crop";

export const KEYWORDS = [
  "software agency Sri Lanka",
  "Colombo software studio",
  "AI-native product development",
  "digital transformation",
  "applied AI research",
  "founder support",
  "custom software development",
  "Leaf Monkey Labs",
  "AI research Sri Lanka",
];
