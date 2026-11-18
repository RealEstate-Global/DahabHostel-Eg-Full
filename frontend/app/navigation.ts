import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers. `useRouter`/`usePathname` strip the
 * locale prefix and keep the `NEXT_LOCALE` cookie in sync, so switching
 * language with `router.replace(pathname, { locale })` preserves the page
 * the user is on.
 */
export const { Link, redirect, useRouter, usePathname, getPathname } =
  createNavigation(routing);
