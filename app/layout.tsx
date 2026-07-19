import type { Metadata } from "next";
import { Fraunces, Playfair_Display, Space_Mono, Lato } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://leafmonkeylabs.com"),
  title: {
    default: "Leaf Monkey Labs — Native to the canopy",
    template: "%s — Leaf Monkey Labs",
  },
  description:
    "A Sri Lankan software agency turning founders' ideas into research-grade products — digital transformation, AI-native products, and applied AI research.",
  openGraph: {
    title: "Leaf Monkey Labs — Native to the canopy",
    description:
      "A Sri Lankan software agency turning founders' ideas into research-grade products.",
    url: "https://leafmonkeylabs.com",
    siteName: "Leaf Monkey Labs",
    locale: "en_US",
    type: "website",
  },
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
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
