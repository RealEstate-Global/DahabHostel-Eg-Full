import type { Metadata } from "next";
import { site, images } from "@/app/_data";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || site.url;

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  locale?: string;
}

export function generateSEO({ title, description, keywords = [], ogImage = images.homeBanner, canonical, locale = "en" }: SEOProps): Metadata {
  const fullTitle = `${title} | Dahab Hostel Cairo`;
  const canonicalUrl = canonical || `${BASE_URL}/${locale}`;
  return {
    title: fullTitle,
    description,
    keywords: Array.from(new Set([...site.keywords.split(", "), ...keywords])).join(", "),
    authors: [{ name: "Dahab Hostel" }],
    creator: "Dahab Hostel",
    metadataBase: new URL(BASE_URL),
    alternates: { canonical: canonicalUrl },
    openGraph: { title: fullTitle, description, url: canonicalUrl, siteName: site.ogSiteName, images: [{ url: ogImage, width: 1200, height: 630, alt: title }], locale, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
    robots: { index: true, follow: true },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hostel",
    name: "Dahab Hostel",
    description: site.description,
    url: BASE_URL,
    logo: `${BASE_URL}${images.logo}`,
    image: `${BASE_URL}${images.homeBanner}`,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "26 Mahmoud Bassiouny St. Talaat Harb Sq.",
      addressLocality: "Cairo",
      postalCode: "11556",
      addressCountry: "EG",
    },
    sameAs: [
      "https://www.facebook.com/dahabhostel/",
      "https://www.instagram.com/dahabhostel/",
      "https://www.youtube.com/channel/UCRLOsveE31GCINKOR-N2X5g",
      site.tripAdvisorUrl,
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, item: item.url,
    })),
  };
}
