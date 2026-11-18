import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://dahabhostel.com";
const locales = ["en", "ar", "fr", "es"];
const routes = [
  "", "/our-tours", "/location", "/photos", "/book-now", "/city-info",
  "/about-us", "/contact-us", "/services-brochure", "/entrance-fees",
  "/prices", "/tours-prices", "/airport-pickup-service", "/write-a-review", "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );
}
