# 🏨 Dahab Hostel — Frontend Application

This directory contains the core **Next.js 15 (App Router)** application for Dahab Hostel Cairo.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies with pnpm
pnpm install

# 2. Configure environment variables
cp .env.example .env.local

# 3. Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🛠️ Common Commands

### Development & Build
| Command | Action |
|---|---|
| `pnpm dev` | Start local development server on port 3000 |
| `pnpm build` | Create optimized production build (53 pages) |
| `pnpm start` | Serve production build locally |
| `pnpm typecheck` | Run strict TypeScript validation (`tsc --noEmit`) |
| `pnpm lint` | Run ESLint check |

### Database & Drizzle ORM
| Command | Action |
|---|---|
| `pnpm db:generate` | Generate migration files from `drizzle/schema.ts` |
| `pnpm db:push` | Push schema directly to Supabase PostgreSQL database |
| `pnpm db:migrate` | Execute pending migrations |
| `pnpm db:studio` | Launch Drizzle Studio browser interface |

### Utility Scripts
| Command | Action |
|---|---|
| `node scripts/test-db-connection.mjs` | Test Supabase REST API & PostgreSQL pooler connection |
| `node scripts/upload-images-to-supabase.mjs` | Upload all local images to Supabase `media` storage bucket |
| `pnpm images:optimize` | Convert and compress images in `public/images/` to WebP |
| `pnpm images:optimize:clean` | Optimize images and delete original uncompressed sources |

---

## 📁 Directory Structure

```text
frontend/
├── app/                  # Next.js App Router
│   ├── [locale]/         # Localized route segments (en, ar, fr, es)
│   ├── _components/      # UI components (shared, dahab features, radix)
│   ├── _data/            # Hardcoded static data fallbacks (rooms, tours, content)
│   ├── api/              # API route handlers (/api/contact-info)
│   └── i18n.ts           # next-intl dictionary resolver
├── drizzle/              # Drizzle ORM schema, client, and migrations
├── messages/             # Translation JSON files (en, ar, es, fr)
│   ├── common.json       # Cookie consent, 404, error, contactForm
│   ├── nav.json          # Main navigation links
│   ├── footer.json       # Footer links and info
│   └── legal.json        # Terms, Privacy, Cookies policy
├── public/               # Static assets & WebP images
├── scripts/              # Migration, diagnostic, and optimization scripts
├── supabase/             # Complete SQL migration and seed files
└── utils/supabase/       # SSR Supabase clients and helper functions
```
