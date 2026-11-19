import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { routing } from "./app/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip Supabase session update for admin dashboard (it's static, no auth needed)
  const isAdminRoute = pathname.startsWith("/admin");
  let supabaseResponse: NextResponse;

  if (!isAdminRoute) {
    // Keep Supabase auth sessions refreshed on non-admin routes.
    supabaseResponse = (await updateSession(request)).response;
  } else {
    supabaseResponse = NextResponse.next({ request });
  }

  // Handle locale routing/redirects with next-intl (also detects the
  // visitor's Accept-Language on `/` and syncs the NEXT_LOCALE cookie).
  const response = intlMiddleware(request);

  // Carry any refreshed Supabase cookies over to the next-intl response.
  if (supabaseResponse) {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie.name, cookie.value);
    });
  }

  // Add cache headers for static admin pages
  if (isAdminRoute) {
    response.headers.set("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|\\.well-known|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif|.*\\.webp).*)",
    "/",
    "/(ar|en|fr|es)/:path*",
  ],
};
