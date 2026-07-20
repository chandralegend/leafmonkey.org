import type { Metadata, Viewport } from "next";
import { Fraunces, Playfair_Display, Space_Mono, Lato } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_TAGLINE,
  DEFAULT_DESCRIPTION,
  LOCALE,
  SITE_EMAIL,
  KEYWORDS,
} from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-fraunces",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-playfair",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});
const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-lato",
});

const TITLE = `${SITE_NAME} — Native to the canopy`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s — ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: LOCALE,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#2D4A34",
  colorScheme: "light",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_URL,
  email: SITE_EMAIL,
  slogan: SITE_TAGLINE,
  description: DEFAULT_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
  knowsAbout: [
    "Digital transformation",
    "AI-native product development",
    "Applied AI research",
    "Software engineering",
  ],
  areaServed: "Worldwide",
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${playfair.variable} ${spaceMono.variable} ${lato.variable}`}
    >
      <body>
        <JsonLd data={orgLd} />
        <JsonLd data={siteLd} />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
