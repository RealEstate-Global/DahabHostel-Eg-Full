# 🔌 API reference

The public HTTP surface today is intentionally tiny: the site is a static
content app whose forms write directly to Supabase with row-level security.
This document covers **what exists** and **what is contractually planned**
for the future ASP.NET backend (see [`../backend/README.md`](../backend/README.md)).

---

## 1. Current endpoints (Next.js route handlers)

Base URL: same origin as the site (e.g. `https://dahabhostel.com`).

### `GET /api/contact-info`

Public contact details for widgets/fallbacks. **Static** (`force-static`) —
prerendered at build time.

**200 · application/json**

```json
{
  "email": "info@dahabhostel.com",
  "phone": "+20 …",
  "address": "Downtown Cairo, Egypt"
}
```

> Values mirror `frontend/app/_data/site.ts`.

### Non-route HTTP surfaces

| Path | Method | Notes |
| --- | --- | --- |
| `/{locale}/…` | GET | locale-prefixed pages (`en·ar·fr·es`) |
| `/` | GET | `307` → best-matching `/{locale}` via `Accept-Language` |
| `/robots.txt` | GET | static rules + sitemap link |
| `/sitemap.xml` | GET | all locale/prefixed URLs |
| `/icon.svg` | GET | site icon |
| `/images/*` | GET | immutable WebP/JPEG assets |

---

## 2. Data writes (Supabase REST, called from the browser)

Forms use the Supabase client (`frontend/utils/supabase/client.ts`) with the
**publishable key** only. RLS grants the `anon` role `INSERT` on exactly
these tables — no reads, no updates, no deletes.

| Table | Form | Notable columns |
| --- | --- | --- |
| `contact_messages` | Contact page | `name`, `email`, `message`, `created_at` |
| `tour_requests` | Tour enquiry | `tour_slug`, `name`, `email`, `phone`, `party_size`, `date`, `message` |
| `booking_requests` | Room booking | `room_type`, `check_in`, `check_out`, `guests`, `name`, `email`, `phone` |
| `airport_pickups` | Transfer | `arrival_date`, `flight_number`, `pickup_point`, `passengers`, `name`, `phone` |

- **Endpoint shape** (Supabase auto-REST):
  `POST https://<ref>.supabase.co/rest/v1/<table>`
  headers: `apikey: <publishable key>`, `Content-Type: application/json`.
- **Success**: `201 Created` with the inserted row.
- **Failure modes**: `401` (bad key) · `403` (RLS rejected — usually means
  `schema.sql` wasn't run) · `409` (constraint) · `42501` (permission).
- Schema source of truth: [`../frontend/supabase/schema.sql`](../frontend/supabase/schema.sql)
  (idempotent; rerun after edits).

---

## 3. Planned REST contract (`/api/v1`, ASP.NET Core)

> Not implemented. This is the agreed contract the frontend will migrate to.

All routes are versioned under `/api/v1`, accept/return JSON, and use
RFC 9457 problem details for errors.

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/contact` | none* | contact message |
| `POST` | `/tour-requests` | none* | tour enquiry |
| `POST` | `/bookings` | none* | room booking request |
| `POST` | `/airport-pickups` | none* | transfer request |
| `GET` | `/tours` | none | catalogue (cacheable) |
| `GET` | `/tours/{slug}` | none | single tour |
| `GET` | `/availability?from&to` | none | room availability snapshot |
| `POST` | `/admin/auth` | none | staff login → JWT |
| `GET` | `/admin/requests` | JWT | staff inbox |

\* rate-limited + bot-protected (honeypot/CAPTCHA) server-side.

### Request example

```http
POST /api/v1/tour-requests
Content-Type: application/json

{
  "tourSlug": "giza-pyramids",
  "name": "Sara Ahmed",
  "email": "sara@example.com",
  "phone": "+201000000000",
  "partySize": 2,
  "date": "2026-05-01",
  "message": "Sunset tour please"
}
```

### Response conventions

| Case | Status | Body |
| --- | --- | --- |
| Created | `201` | `{ "id": "uuid", "createdAt": "ISO-8601" }` |
| Validation error | `400` | problem details + `errors: { field: [msgs] }` |
| Rate limited | `429` | problem details + `Retry-After` |
| Unauthenticated | `401` | problem details |
| Forbidden | `403` | problem details |
| Server error | `500` | problem details (no stack traces) |

### Migration mapping

| Today | Future |
| --- | --- |
| browser → Supabase REST (RLS insert) | browser → `POST /api/v1/…` → server-side Supabase/EF insert |
| publishable key in bundle | no Supabase keys in the client |
| Supabase Dashboard for staff | `GET /api/v1/admin/requests` inbox |

---

## 4. Errors & timeouts

- Client fetches from the browser should use a 10–15 s timeout and surface
  a toast on failure (forms already do).
- All write endpoints must be idempotent-safe to retry (UUID primary keys,
  no client-generated duplicates).

## 5. Versioning & stability

- Next.js route handlers: unversioned, but effectively immutable — the
  frontend is the only consumer.
- Planned API: `/api/v1` prefix; breaking changes require `/api/v2` and a
  deprecation window documented here.
