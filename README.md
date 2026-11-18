<div align="center">

# 🏨 Dahab Hostel Cairo

**The official website of Dahab Hostel — Downtown Cairo, Egypt**

A fast, multilingual (EN · AR · FR · ES) marketing & booking site built with
Next.js 15, TypeScript, Tailwind CSS and Supabase.

[![CI](https://github.com/RealEstate-Global/DahabHostel-Eg-Full/actions/workflows/ci.yml/badge.svg)](https://github.com/RealEstate-Global/DahabHostel-Eg-Full/actions/workflows/ci.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![pnpm](https://img.shields.io/badge/pnpm-managed-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## ✨ Highlights

- **4 languages** — English, Arabic, French and Spanish with automatic
  device-language detection on first visit and RTL-ready Arabic.
- **45+ tour pages** — Giza, Islamic Cairo, Alexandria, Aswan/Luxor, Dahab,
  Siwa, White Desert and more, each with gallery, itinerary and pricing.
- **Booking & request forms** — tour requests, room bookings, contact and
  airport pickups, persisted to Supabase.
- **Modern dark UI** — design tokens, animated Radix components, dark mode.
- **Blazing fast** — all images converted to compressed WebP
  (**130 MB → 9.7 MB**, −92 %), immutable caching, strict security headers.
- **Zero runtime calls to third-party sites** — every asset and all content
  are served locally.

## 🧰 Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router, Server Components) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + design tokens, `next-themes` dark mode |
| i18n | [next-intl](https://next-intl.dev) — `en`, `ar`, `fr`, `es` |
| Backend (today) | Supabase (PostgreSQL + Row Level Security) |
| Backend (planned) | ASP.NET Core — see [`backend/README.md`](backend/README.md) |
| Package manager | pnpm (pinned via `packageManager`) |
| Images | `sharp`-based WebP pipeline ([script](frontend/scripts/optimize-images.mjs)) |

## 📁 Repository layout

```text
DahabHostel-Eg-Full/
├── frontend/                # The Next.js application (fully self-contained)
│   ├── app/                 #   App Router pages, layouts, one API route
│   ├── messages/            #   Translation dictionaries: en · ar · fr · es
│   ├── public/              #   Static assets (all WebP)
│   ├── scripts/             #   Image optimization tooling
│   ├── supabase/schema.sql  #   Database schema (run once, see below)
│   └── utils/supabase/      #   Browser/server/middleware Supabase clients
├── backend/                 # Planned ASP.NET Core API (design docs only)
├── docs/                    # Architecture, development, deployment, API
├── .github/                 # CI, Dependabot, issue & PR templates
├── .editorconfig            # Shared editor formatting rules
├── .gitattributes           # Line-ending & binary-asset policy
├── .gitignore               # Repo-wide ignore rules
├── .nvmrc                   # Node.js version (22)
├── CONTRIBUTING.md          # Branch, commit & PR conventions
├── LICENSE                  # MIT
├── README.md                # ← you are here
└── SECURITY.md              # Vulnerability reporting policy
```

## 🚀 Quick start

### Prerequisites

- **Node.js 22** (see [`.nvmrc`](.nvmrc)) — `nvm use`
- **pnpm 12** — `corepack enable` (or `npm i -g pnpm`)
- A free [Supabase](https://supabase.com) project (only needed for forms)

### Run locally

```bash
git clone https://github.com/RealEstate-Global/DahabHostel-Eg-Full.git
cd DahabHostel-Eg-Full/frontend

pnpm install                # install dependencies
cp .env.example .env.local  # then fill in your Supabase values

pnpm dev                    # http://localhost:3000
```

Production build & run:

```bash
pnpm build
pnpm start
```

## 🔐 Environment variables

Create `frontend/.env.local` (never commit it — it is git-ignored):

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ for forms | Supabase project URL (`https://<ref>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ✅ for forms | Supabase anon / publishable key |
| `NEXT_PUBLIC_BASE_URL` | ⬜ optional | Canonical origin used for SEO, `sitemap.xml` and Open Graph URLs (defaults to `https://dahabhostel.com`) |

Without these values the site still renders; only form submissions and
auth-backed features are disabled.

## 🗄️ Supabase setup (one time)

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the **Project URL** and **Publishable key** into
   `frontend/.env.local` (table above).
3. Open **SQL Editor → New query**, paste the contents of
   [`frontend/supabase/schema.sql`](frontend/supabase/schema.sql) and run it.

That creates the four form tables (`contact_messages`, `tour_requests`,
`booking_requests`, `airport_pickups`) with anon-insert Row Level Security
policies.

## 🌍 Internationalization

- Locales: **`en`** (default) · **`ar`** (RTL) · **`fr`** · **`es`**
- `middleware.ts` handles locale routing (`/en/…`, `/ar/…`) and redirects
  first-time visitors using the `Accept-Language` header.
- Dictionaries live in [`frontend/messages/<locale>/*.json`](frontend/messages)
  (9 namespaces: `nav`, `hero`, `destinations`, `services`, `booking`,
  `footer`, `about`, `contact`, `legal`).
- Switch locale via the language selector in the header (desktop & mobile).

## 🖼️ Image pipeline

All photos are compressed WebP at their original resolution. Re-run the
pipeline after adding new images:

```bash
cd frontend
pnpm images:optimize           # convert public/images/*.{jpg,png} → .webp
pnpm images:optimize:clean     # …and delete the original sources
node scripts/optimize-images.mjs --dry-run   # preview only
node scripts/optimize-images.mjs --fix-refs  # also rewrite code references
```

Quality is tuned per image type (80 for photos, 90–92 for logos/graphics),
EXIF orientation is applied and metadata stripped. The only JPEG kept is
`og-cover.jpg` (1200×630) because Facebook/LinkedIn don't render WebP link
previews.

## ✅ Quality gates

```bash
pnpm typecheck   # tsc --noEmit (strict)
pnpm lint        # eslint (next lint)
pnpm build       # production build — the same check CI runs
```

Every push and pull request runs **typecheck + build** in GitHub Actions
([`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

## 📚 Documentation

| Doc | Contents |
| --- | --- |
| [`docs/architecture.md`](docs/architecture.md) | High-level design, routing, data flow |
| [`docs/development.md`](docs/development.md) | Local workflow, conventions, adding pages/translations |
| [`docs/deployment.md`](docs/deployment.md) | CI/CD, environments, release checklist |
| [`docs/api.md`](docs/api.md) | Current HTTP surface + future backend contract |
| [`backend/README.md`](backend/README.md) | Planned ASP.NET Core backend (not implemented) |

## 🤝 Contributing

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a PR, and
[`SECURITY.md`](SECURITY.md) to report vulnerabilities.

## 📜 License

Licensed under the [MIT License](LICENSE) © 2026 Dahab Hostel Cairo.

<div align="center">
<sub>Made in Cairo · <a href="https://dahabhostel.com">dahabhostel.com</a></sub>
</div>
