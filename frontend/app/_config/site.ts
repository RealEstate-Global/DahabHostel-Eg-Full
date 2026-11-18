// Site configuration — Dahab Hostel (content from https://dahabhostel.com)
import { site as s } from "@/app/_data";

export const siteConfig = {
  name: "Dahab Hostel",
  description: s.description,
  url: process.env.NEXT_PUBLIC_BASE_URL || s.url,
  ogImage: "/images/og-cover.jpg",
  links: {
    facebook: "https://www.facebook.com/dahabhostel/",
    instagram: "https://www.instagram.com/dahabhostel/",
    youtube: "https://www.youtube.com/channel/UCRLOsveE31GCINKOR-N2X5g",
    tripadvisor: s.tripAdvisorUrl,
  },
  contact: { email: s.email, phone: s.phone, address: s.address },
  locales: ["en", "ar", "fr", "es"] as const,
  defaultLocale: "en" as const,
};

export type SiteConfig = typeof siteConfig;
export const APP_NAME = siteConfig.name;
export const APP_DESCRIPTION = siteConfig.description;
export const LOCALES = siteConfig.locales;
export const DEFAULT_LOCALE = siteConfig.defaultLocale;
export const SOCIAL_LINKS = siteConfig.links;
export const CONTACT_INFO = siteConfig.contact;

export const API_ENDPOINTS = {
  destinations: "/api/tours",
  contact: "/api/contact",
} as const;

export const ITEMS_PER_PAGE = 12;
export const MAX_ITEMS_PER_PAGE = 50;

export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
} as const;

export const ANIMATION_DURATION = { fast: 200, normal: 300, slow: 500 } as const;
export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 } as const;
export const DESTINATION_CATEGORIES = ["all", "history", "adventure", "leisure"] as const;
export const SERVICE_TYPES = ["dorm", "private", "tour", "pickup"] as const;
export const DATE_FORMATS = { short: "MMM dd, yyyy", long: "MMMM dd, yyyy", full: "EEEE, MMMM dd, yyyy" } as const;

export const SEO_DEFAULTS = {
  titleTemplate: "%s | Dahab Hostel Cairo",
  defaultTitle: "Dahab Hostel Cairo — Best Hostel in Egypt",
  description: s.description,
  keywords: s.keywords.split(", "),
} as const;

export const CACHE_DURATION = { short: 60, medium: 300, long: 3600, day: 86400 } as const;
export const ERROR_MESSAGES = {
  generic: "Something went wrong. Please try again.",
  network: "Network error. Please check your connection.",
  notFound: "The requested resource was not found.",
  unauthorized: "You are not authorized to access this resource.",
  validation: "Please check your input and try again.",
} as const;
export const SUCCESS_MESSAGES = {
  bookingSubmitted: "Booking request submitted successfully!",
  contactSubmitted: "Message sent successfully! We'll get back to you soon.",
  newsletterSubscribed: "Successfully subscribed to our newsletter!",
} as const;
