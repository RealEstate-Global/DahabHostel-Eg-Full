# 🏗️ Architecture

## Overview

The site is a single **Next.js 15 (App Router)** application living in
`frontend/`, backed by **Supabase** for form persistence, with
**next-intl** providing four-locale routing. The repository is structured as
a monorepo-ready root (docs, CI, future `backend/`) around that one app.

```text
                        ┌────────────────────────────────────────────┐
  browser ── HTTPS ───► │ Next.js 15 (Node / edge middleware)        │
                        │                                            │
                        │  middleware.ts                             │
                        │   ├─ next-intl: locale detection & routing │
                        │   └─ Supabase: session cookie refresh      │
                        │                                            │
                        │  app/[locale]/…      (pages, RSC)          │
                        │  app/api/…           (route handlers)      │
                        │  messages/<locale>   (i18n dictionaries)   │
                        └───────────────┬────────────────────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
          Supabase (PostgreSQL)                    public/ (static WebP)
          RLS: anon INSERT only                    immutable cache headers
```

## Repository layout

| Path | Role |
| --- | --- |
| `frontend/` | The entire web app — self-contained `package.json`, lockfile, configs |
| `frontend/app/[locale]/` | One folder per route; `[locale]` segment carries `en·ar·fr·es` |
| `frontend/app/_components/` | UI components (`dahab/` feature components + `ui/` primitives) |
| `frontend/app/_data/` | Typed content modules (tours, rooms, gallery, site settings) |
| `frontend/app/_config/` | Site-wide configuration (URLs, metadata defaults) |
| `frontend/app/_lib/` | Helpers (SEO builders, constants) |
| `frontend/messages/` | Translation JSON, 9 namespaces × 4 locales |
| `frontend/utils/supabase/` | `client.ts` (browser), `server.ts` (RSC), `middleware.ts` (cookies) |
| `frontend/supabase/schema.sql` | Idempotent DDL for the four form tables + RLS |
| `frontend/scripts/` | `optimize-images.mjs` WebP pipeline |
| `docs/` · `.github/` · `backend/` | Documentation, DevOps, future API |

## Request lifecycle

1. **Request hits `middleware.ts`** (matcher excludes static assets).
2. `updateSession()` from `@supabase/ssr` refreshes auth cookies if present.
3. `next-intl` middleware resolves the locale:
   - explicit prefix (`/ar/…`) → used as-is;
   - `/` → `Accept-Language` header → `307` to `/{locale}` (e.g. `ar-EG` → `/ar`);
   - choice is persisted in the `NEXT_LOCALE` cookie.
4. The `[locale]` layout renders the shell (header, footer, theme provider)
   and loads the dictionaries via `app/i18n.ts` (`getRequestConfig`).
5. Page components are React Server Components that read typed content from
   `app/_data/*` — no fetching, no runtime calls to third parties.
6. Forms submit to Supabase (RLS `anon INSERT`), except `app/api/contact-info`
   which serves public contact details as static JSON.

## Internationalization

- `defineRouting({ locales: ["en","ar","fr","es"], defaultLocale: "en",
  localePrefix: "always" })` in `frontend/middleware.ts` is the single source
  of truth for locales.
- `app/i18n.ts` loads namespaces: `nav`, `hero`, `destinations`, `services`,
  `booking`, `footer`, `about`, `contact`, `legal`. Missing files degrade to
  `{}` (per-file `try/catch`).
- Arabic is RTL; direction is set on `<html>` per locale.
- URL scheme: `/{locale}/{path}` for every locale including `en`.

## Styling & theme

- **Tailwind CSS 3.4** with a custom `brand` palette and design tokens in
  `tailwind.config.ts`; component classes composed with `clsx` +
  `tailwind-merge`.
- **Dark mode** via `next-themes` (`class` strategy); default resolved from
  `prefers-color-scheme`.
- **Motion**: `framer-motion` for page/section transitions, Radix UI for
  accessible primitives (dialog, select, tabs…), `tailwindcss-animate` for
  utility animations.
- Forms use the shared `SelectField` (animated Radix select wrapper) for a
  consistent dropdown experience.

## Images

- All raster assets are **WebP at original resolution** (9.7 MB total, was
  130 MB), produced by `scripts/optimize-images.mjs` (sharp, quality
  80 photos / 90–92 graphics, EXIF applied then stripped).
- Exception: `public/images/og-cover.jpg` (1200×630) stays JPEG because
  Facebook/LinkedIn don't render WebP link previews.
- `next/image` serves AVIF/WebP variants with a 1-year immutable cache
  (see `headers()` in `next.config.js`).
- `outputFileTracingRoot` is pinned to `frontend/` so builds are hermetic.

## Data & security posture

- **Supabase RLS**: anon role has `INSERT` on `contact_messages`,
  `tour_requests`, `booking_requests`, `airport_pickups` — no SELECT/UPDATE/
  DELETE. Service-role keys never ship to the client.
- **Headers**: `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, DNS-prefetch (in `next.config.js`).
- **Supply chain**: pnpm `minimumReleaseAge: 1440` + explicit `allowBuilds`.
- **CI**: typecheck + production build gate every PR.

## Extension points

| Need | Where |
| --- | --- |
| New page | `frontend/app/[locale]/<route>/page.tsx` + `generateMetadata` |
| New tour | add to `app/_data/tours-*.ts` (slug drives SSG paths) |
| New translation key | `messages/<locale>/<ns>.json` (all 4 locales) |
| New form field | component → Supabase column in `schema.sql` (rerun) |
| Backend API | see `backend/README.md` (planned, ASP.NET Core) |
