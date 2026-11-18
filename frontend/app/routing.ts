import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for locale routing — imported by the middleware
 * (request handling) and by `navigation.ts` (client router helpers).
 */
export const routing = defineRouting({
  locales: ["en", "ar", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
