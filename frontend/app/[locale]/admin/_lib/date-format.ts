import { format, isValid } from "date-fns";
import type { Locale } from "date-fns";
import { ar, enUS, es, fr } from "date-fns/locale";

const dateLocales: Record<string, Locale> = { ar, en: enUS, es, fr };

/** Safely format nullable or malformed values coming from legacy database rows. */
export function formatAdminDate(value: unknown, locale: string): string {
  if (typeof value !== "string" && typeof value !== "number" && !(value instanceof Date)) {
    return "—";
  }

  const date = value instanceof Date ? value : new Date(value);
  if (!isValid(date)) return "—";

  return format(date, "dd MMM yyyy", { locale: dateLocales[locale] ?? enUS });
}
