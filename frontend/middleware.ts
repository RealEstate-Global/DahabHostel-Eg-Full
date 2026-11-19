import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { routing } from "./app/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Keep Supabase auth sessions refreshed on ALL routes including admin.
  const supabaseResponse = (await updateSession(request)).response;
  const isAdminRoute = pathname.startsWith("/admin") ||
    /^\/(en|ar|fr|es)\/admin/.test(pathname);

  // Handle locale routing/redirects with next-intl (also detects the
  // visitor's Accept-Language on `/` and syncs the NEXT_LOCALE cookie).
  const response = intlMiddleware(request);

  // Carry any refreshed Supabase cookies over to the next-intl response.
  if (supabaseResponse) {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value);
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|manifest\\.json|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|\\.well-known|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif|.*\\.webp).*)",
    "/",
    "/(ar|en|fr|es)/:path*",
  ],
};
