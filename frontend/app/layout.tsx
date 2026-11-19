import type { Metadata } from "next";
import { site, images } from "@/app/_data";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || site.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: site.title, template: "%s | Dahab Hostel Cairo" },
  description: site.description,
  keywords: site.keywords.split(", "),
  authors: [{ name: "Dahab Hostel" }],
  creator: "Dahab Hostel",
  publisher: "Dahab Hostel",
  applicationName: "Dahab Hostel",
  formatDetection: { email: false, address: false, telephone: false },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: site.ogSiteName,
    title: site.title,
    description: site.description,
    images: [{ url: images.ogCover, width: 1200, height: 630, alt: "Dahab Hostel rooftop" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [images.ogCover] },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
