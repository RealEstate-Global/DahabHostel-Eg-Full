import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import { routing } from "./app/routing";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // Keep Supabase auth sessions refreshed on every request.
  const { response: supabaseResponse } = await updateSession(request);

  // Handle locale routing/redirects with next-intl (also detects the
  // visitor's Accept-Language on `/` and syncs the NEXT_LOCALE cookie).
  const response = intlMiddleware(request);

  // Carry any refreshed Supabase cookies over to the next-intl response.
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie.name, cookie.value);
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|\\.well-known|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.gif|.*\\.webp).*)",
    "/",
    "/(ar|en|fr|es)/:path*",
  ],
};
