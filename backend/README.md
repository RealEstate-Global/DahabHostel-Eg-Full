# Backend (planned) — ASP.NET Core

> **Status: design only.** No backend code exists yet. This folder documents
> the plan for a future ASP.NET Core API so that the frontend can migrate off
> its current Supabase-direct data path when the time comes. Nothing here is
> implemented, and the site runs fully without it.

## 🎯 Why a dedicated backend

Today the Next.js app talks to Supabase directly from the browser with
publishable-key RLS inserts. That is perfect for launch, but a dedicated
backend will eventually be needed for:

- Server-side validation & spam control (honeypots, rate limiting, CAPTCHA)
- Payment processing (deposit collection for bookings)
- Email/WhatsApp notifications on new requests
- Admin authentication (staff dashboards) with role-based access
- Aggregations and reporting the anon role should never compute
- Keeping Supabase credentials (service role) entirely server-side

## 🧱 Proposed stack

| Concern | Choice |
| --- | --- |
| Runtime | .NET 9 (LTS migration path to .NET 10) |
| Framework | ASP.NET Core Web API (minimal APIs + controllers where useful) |
| ORM | Entity Framework Core + Npgsql |
| Validation | FluentValidation + Data Annotations |
| Auth | JWT bearer (or ASP.NET Identity for admin users) |
| API style | REST, versioned under `/api/v1` |
| OpenAPI | Swashbuckle / Scalar for interactive docs |
| Testing | xUnit + FluentAssertions + WebApplicationFactory |
| Packaging | Docker multi-stage image; deployable beside the frontend |

## 📦 Planned endpoint surface

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/api/v1/contact` | Contact-form messages |
| `POST` | `/api/v1/tour-requests` | Tour enquiry submissions |
| `POST` | `/api/v1/bookings` | Room booking requests |
| `POST` | `/api/v1/airport-pickups` | Airport transfer requests |
| `GET` | `/api/v1/tours` | Tour catalogue (cached) |
| `GET` | `/api/v1/tours/{slug}` | Single tour |
| `GET` | `/api/v1/availability?from&to` | Room availability snapshot |
| `POST` | `/api/v1/admin/auth` | Staff login |
| `GET` | `/api/v1/admin/requests` | Staff inbox (protected) |

The current equivalent of the first four is direct Supabase inserts from the
forms; the contract is documented in [`../docs/api.md`](../docs/api.md).

## 🗂️ Proposed solution layout

```
backend/
├── DahabHostel.Api/            # Web host, controllers, middleware
├── DahabHostel.Application/    # Use cases, DTOs, validators
├── DahabHostel.Domain/         # Entities, enums, domain rules
├── DahabHostel.Infrastructure/ # EF Core, Supabase, email, storage
├── DahabHostel.Tests/          # xUnit suite
├── DahabHostel.sln
└── README.md                   # ← this file
```

## 🔌 Frontend integration plan

1. Introduce `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local`.
2. Swap the Supabase insert calls in the four form actions for `fetch` calls
   to `/api/v1/...` (behind a small `lib/api.ts` client with typed errors).
3. Keep Supabase for the public catalogue until EF Core owns the data, then
   migrate tables one at a time.
4. Once traffic is fully on the API, remove the publishable-key RLS inserts
   and restrict the Supabase roles.

## 📅 Milestones (not scheduled yet)

| # | Milestone | Exit criteria |
| --- | --- | --- |
| 1 | API skeleton + CI | `dotnet build` & tests green in GitHub Actions |
| 2 | Form endpoints | All four forms post to the API, data lands in DB |
| 3 | Admin inbox | Staff can list/search/answer requests |
| 4 | Payments & notifications | Deposits + email alerts working |
| 5 | Data ownership | Catalogue served by EF Core; Supabase read-only |

## 📚 References

- [`../docs/api.md`](../docs/api.md) — request/response contracts
- [`../docs/architecture.md`](../docs/architecture.md) — current system
- [`../README.md`](../README.md) — repository overview
