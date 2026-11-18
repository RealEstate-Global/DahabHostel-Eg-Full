<div align="center">

# 🏨 Dahab Hostel Cairo
### *The Downtown Oasis & Adventure Hub — Cairo, Egypt*

A modern, high-performance, multilingual travel portal and reservation platform built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Drizzle ORM**, and **Supabase (PostgreSQL & Storage)**.

<br />

[![CI Status](https://github.com/RealEstate-Global/DahabHostel-Eg-Full/actions/workflows/ci.yml/badge.svg)](https://github.com/RealEstate-Global/DahabHostel-Eg-Full/actions/workflows/ci.yml)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript 5.7](https://img.shields.io/badge/TypeScript-5.7_Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?logo=drizzle&logoColor=black)](https://orm.drizzle.team)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_17-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![pnpm 12](https://img.shields.io/badge/pnpm-12.14-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

<br />

[Explore Features](#-features--architecture) • [Quick Start](#-quick-start) • [Database & Drizzle](#-database--drizzle-orm) • [Environment Variables](#-environment-variables) • [Deployment](#-deployment)

</div>

---

## ✨ Features & Architecture

- **🌍 4-Language Localization (1:1 Parity)**
  - English (`en`), Arabic (`ar` with native RTL), French (`fr`), and Spanish (`es`).
  - Seamless automatic language detection on first visit with cookie persistence via `next-intl`.
  - Zero missing keys, shared namespaces: `nav`, `footer`, `legal`, `common` (cookie consent, error handling, 404, contact forms).

- **🏜️ 45+ Rich Travel Experiences & Tours**
  - Cairo Pyramids, Grand Egyptian Museum, Islamic & Coptic Cairo, Alexandria, Luxor & Aswan Nile cruises, Dahab diving, Mount Sinai, and White Desert expeditions.
  - Interactive day-by-day itineraries, photo galleries, inclusions, exclusions, and entrance fee breakdowns.

- **🗄️ Full Supabase & Drizzle ORM Data Layer**
  - **15 PostgreSQL Tables**: Rooms, Tours, Tour Itinerary, Tour Gallery, Entrance Fees, Photo Gallery, Blog Posts, Reviews, Settings, and Form Submissions.
  - **Drizzle ORM Integration**: Schema definitions, auto-generated migrations, and direct pooled PostgreSQL connection.
  - **Row Level Security (RLS)**: Public read policies, guest submission policies, and `SECURITY DEFINER` admin roles with zero recursion.

- **🖼️ High-Performance Image Optimization & Cloud Storage**
  - **78 High-Resolution Assets** uploaded to Supabase Storage (`media` bucket).
  - WebP compression with zero quality loss (**130 MB → 9.7 MB, 92% size reduction**).
  - Automated `sharp` image pipeline with EXIF normalization.

- **🛡️ Enterprise Security & Quality Gates**
  - 100% strict TypeScript typing with zero `any` loopholes.
  - Strict Content Security Policy (CSP), HTTP security headers, and cookie protection.
  - Clean automated CI pipeline running `pnpm typecheck` and `pnpm build` (53 static & dynamic pages generated).

---

## 🏗️ High-Level Architecture

```
                          ┌────────────────────────────────────────────────────────┐
                          │                     CLIENT / USER                      │
                          └───────────────────────────┬────────────────────────────┘
                                                      │ HTTPS
                                                      ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   NEXT.JS 15 (APP ROUTER)                                       │
 │                                                                                                 │
 │   middleware.ts ─────────► [ Locale Routing (next-intl) ] ──► [ Session Cookie Refresh (@supabase/ssr) ]
 │                                                                                                 │
 │   app/[locale]/            app/api/                   messages/               utils/supabase/   │
 │   ├─ (RSC Pages)           └─ contact-info (JSON)     ├─ en/ ar/ es/ fr       ├─ client.ts      │
 │   ├─ dynamic tours                                    └─ common, nav, footer  ├─ server.ts      │
 │   └─ forms & auth                                                             └─ queries.ts     │
 └────────────────────────────┬────────────────────────────────────────────────┬───────────────────┘
                              │                                                │
                              ▼                                                ▼
 ┌───────────────────────────────────────────────┐     ┌───────────────────────────────────────────┐
 │             DRIZZLE ORM & POSTGRES            │     │             SUPABASE STORAGE              │
 │                                               │     │                                           │
 │  • Session Pooler (port 5432)                 │     │  • media bucket: 78 WebP images           │
 │  • Transaction Pooler (port 6543)             │     │  • avatars bucket: user profile photos    │
 │  • 15 Tables & RLS Policies                   │     │  • Public CDN & immutable caching         │
 └───────────────────────────────────────────────┘     └───────────────────────────────────────────┘
```

---

## 📁 Repository Layout

```text
Wayfera-Full-main/
├── frontend/                       # Next.js 15 application (Root Directory for Vercel)
│   ├── app/                        # Next.js App Router (pages, layouts, error boundaries)
│   │   ├── [locale]/               # Localized pages (en, ar, fr, es)
│   │   ├── _components/            # UI components (Radix primitives + Dahab features)
│   │   ├── _data/                  # Static content fallback datasets
│   │   ├── api/                    # API route handlers
│   │   └── i18n.ts                 # next-intl configuration loader
│   ├── drizzle/                    # Drizzle ORM Configuration & Migrations
│   │   ├── schema.ts               # PostgreSQL Schema for 15 tables & relationships
│   │   ├── db.ts                   # Lazy PostgreSQL connection singleton
│   │   └── migrations/             # Generated SQL migration files
│   ├── messages/                   # Translation dictionaries (en · ar · es · fr)
│   │   ├── nav.json                # Navigation links and menus
│   │   ├── footer.json             # Footer links, copyright, address
│   │   ├── legal.json              # Privacy policy, Terms, Cookies policy
│   │   └── common.json             # Cookie banner, 404, errors, forms
│   ├── public/images/              # Optimized WebP local images
│   ├── scripts/                    # Automation & Maintenance Scripts
│   │   ├── test-db-connection.mjs  # Supabase REST + Postgres connection tester
│   │   ├── apply-full-migration.mjs# Direct SQL migration runner
│   │   ├── fix-rls.mjs             # RLS policy and permission stabilizer
│   │   ├── upload-images-to-supabase.mjs # Upload local media to Supabase storage
│   │   └── optimize-images.mjs     # Sharp WebP compressor pipeline
│   ├── supabase/                   # SQL schemas and seeds
│   │   ├── complete-setup.sql      # Single-file full schema + seeds + policies
│   │   ├── migration.sql           # Schema definition DDL
│   │   └── seed.sql                # Initial hotel content seed data
│   ├── utils/supabase/             # Supabase SSR client helpers & typed queries
│   ├── drizzle.config.ts           # Drizzle Kit CLI configuration
│   ├── package.json                # Pinned to pnpm@12.14.0
│   └── pnpm-lock.yaml              # Deterministic dependency lockfile
├── docs/                           # In-depth architectural & deployment guides
│   ├── architecture.md             # System design & request lifecycle
│   ├── deployment.md               # Production Vercel & Docker instructions
│   ├── development.md              # Local contribution workflow & guidelines
│   └── api.md                      # Data contracts & REST endpoints
├── .github/workflows/              # Continuous Integration (ci.yml)
├── CONTRIBUTING.md                 # Contribution guidelines
├── SECURITY.md                     # Security and vulnerability disclosure
└── README.md                       # ← You are here
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 22.x** (or [`.nvmrc`](.nvmrc))
- **pnpm 12.x** (`npm i -g pnpm`)
- A [Supabase](https://supabase.com) project (PostgreSQL 15+)

### 1. Clone & Install

```bash
git clone https://github.com/RealEstate-Global/DahabHostel-Eg-Full.git
cd DahabHostel-Eg-Full/frontend

# Install dependencies using pinned pnpm
pnpm install
```

### 2. Configure Environment

Copy the example environment file and provide your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `frontend/.env.local`:

```env
# Supabase HTTP API (Browser & Server)
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-anon-publishable-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-secret-key>

# PostgreSQL / Drizzle Connection (Session Pooler IPv4)
DATABASE_URL="postgresql://postgres.<project-id>:<password>@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"

# Canonical Base URL
NEXT_PUBLIC_BASE_URL=https://dahabhostel.com
```

### 3. Verify Database Connection

Run the built-in diagnostic test to verify Supabase REST API & PostgreSQL pooler:

```bash
node scripts/test-db-connection.mjs
```

### 4. Run Development Server

```bash
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** to view the website in your browser.

---

## 🗄️ Database & Drizzle ORM

The application features a complete **15-table relational schema** managed via Drizzle ORM and Supabase PostgreSQL.

### Table Schema Summary

| Table | Description | Initial Seed Data |
|---|---|:---:|
| `rooms` | Room listings, pricing in EGP, capacity, categories, amenities | **8 rooms** |
| `tours` | Cairo, Dahab, Sinai, Nile tours, duration, inclusions, highlights | **11 tours** |
| `tour_itinerary` | Multi-day schedule and daily tour stops | **15 items** |
| `tour_gallery` | Gallery images linked to specific tours | **28 photos** |
| `fee_groups` | Entrance fee categories (Giza, Luxor, Aswan, Cairo) | **7 groups** |
| `fee_items` | Individual monument and museum ticket prices | **26 sites** |
| `gallery` | Curated hostel terrace, rooftop, and activity photos | **14 photos** |
| `blog_posts` | Articles, Cairo travel tips, awards | **3 posts** |
| `site_settings` | Key-value store for contact numbers, address, TripAdvisor | **5 settings** |
| `profiles` | User profiles linked to `auth.users` with `guest`/`admin` roles | Auth Ready |
| `reviews` | Guest reviews with star ratings and admin approval flag | Form Ready |
| `contact_messages` | Inquiries submitted via Contact form | Form Ready |
| `tour_requests` | Custom tour booking requests | Form Ready |
| `booking_requests` | Direct room reservation inquiries | Form Ready |
| `airport_pickups` | Cairo airport transfer bookings with flight details | Form Ready |

### Drizzle CLI Commands

```bash
cd frontend

# Generate migration SQL from drizzle/schema.ts
pnpm db:generate

# Push schema directly to Supabase PostgreSQL database
pnpm db:push

# Open Drizzle Studio in browser to view and edit database rows visually
pnpm db:studio
```

---

## 🔐 Environment Variables

| Variable | Target | Required | Description |
|---|:---:|:---:|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | ✅ Yes | Your Supabase project URL (`https://<ref>.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Client + Server | ✅ Yes | Public anon key for browser client queries & RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | ✅ Yes | Secret service role key for storage uploads & administrative scripts |
| `DATABASE_URL` | Server Only | ✅ Yes | Direct pooled PostgreSQL URI for Drizzle ORM & migrations |
| `NEXT_PUBLIC_BASE_URL` | Client + Server | ⚪ Optional | Canonical domain for SEO & Open Graph (`https://dahabhostel.com`) |

> ⚠️ **Security Tip:** Never expose `SUPABASE_SERVICE_ROLE_KEY` or `DATABASE_URL` to client-side code. They are strictly server-side variables.

---

## 🚢 Deployment

### Deploying to Vercel (Recommended)

1. **Import Repository** into Vercel.
2. In **Project Settings → General**:
   - Set **Root Directory** to `frontend`.
   - Framework Preset: **Next.js** (automatically detected).
   - Install Command: *Default* (`pnpm install`).
   - Build Command: *Default* (`next build`).
3. In **Project Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`
   - `NEXT_PUBLIC_BASE_URL`
4. Click **Deploy**. Vercel will build all 53 pages and deploy to its global Edge network.

---

## 🧪 Quality Gates & Testing

Always verify that your code adheres to all strict rules before pushing:

```bash
cd frontend

# 1. Run strict TypeScript check (0 errors expected)
pnpm typecheck

# 2. Run Next.js linter
pnpm lint

# 3. Test production build locally
pnpm build

# 4. Verify Supabase connection & table health
node scripts/test-db-connection.mjs
```

---

## 📚 In-Depth Documentation

For detailed guides, please refer to the [`docs/`](docs) directory:

- 🏗️ [**Architecture & Data Flow**](docs/architecture.md) — Routing, RSC, state management, caching.
- 💻 [**Development Guide**](docs/development.md) — Local workflow, conventions, adding tours/pages.
- 🚀 [**Deployment Guide**](docs/deployment.md) — Production hosting, Vercel setup, Docker, CI/CD.
- 📡 [**API & Database Reference**](docs/api.md) — Data schemas, REST endpoints, and future backend specs.

---

## 🤝 Contributing

We welcome contributions! Please review our [**Contributing Guide**](CONTRIBUTING.md) and [**Security Policy**](SECURITY.md) before submitting pull requests.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

<br />

<div align="center">
<sub>Designed & Built with ❤️ in Downtown Cairo, Egypt · <a href="https://dahabhostel.com">dahabhostel.com</a></sub>
</div>
