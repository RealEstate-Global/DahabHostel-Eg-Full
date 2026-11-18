# 🛠️ Development guide

## 0. Prerequisites

| Tool | Version | Check |
| --- | --- | --- |
| Node.js | 22 (`.nvmrc`) | `node -v` |
| pnpm | 12 (pinned in `package.json#packageManager`) | `pnpm -v` |
| Git | 2.x | `git -v` |

```bash
nvm use          # or install Node 22 manually
corepack enable   # activates the pinned pnpm
```

## 1. First-time setup

```bash
git clone https://github.com/RealEstate-Global/DahabHostel-Eg-Full.git
cd DahabHostel-Eg-Full/frontend
pnpm install
cp .env.example .env.local
# edit .env.local → Supabase URL + publishable key (see README)
```

Database (one time): run `frontend/supabase/schema.sql` in the Supabase SQL
editor. Until then the site works, but form submissions will fail.

## 2. Everyday commands

Run all commands from `frontend/`:

| Command | What it does |
| --- | --- |
| `pnpm dev` | dev server on http://localhost:3000 |
| `pnpm build` | production build (`.next/`) |
| `pnpm start` | serve the production build |
| `pnpm typecheck` | `tsc --noEmit` — strict, no output on success |
| `pnpm lint` | ESLint via `next lint` |
| `pnpm images:optimize` | convert new `public/images/*.{jpg,png}` → WebP |
| `pnpm images:optimize:clean` | …then delete the original sources |
| `node scripts/optimize-images.mjs --dry-run` | preview the pipeline, write nothing |
| `node scripts/optimize-images.mjs --fix-refs` | also rewrite code references to `.webp` |

## 3. Project conventions

### Files & folders

- Routes live in `app/[locale]/…`; shared layout/nav in `app/_components/`.
- Feature components → `app/_components/dahab/`; generic primitives →
  `app/_components/ui/`.
- Content is **data, not markup**: tours/rooms/gallery/site settings are typed
  modules under `app/_data/`.
- Path alias: `@/*` → `frontend/*` (see `tsconfig.json`).

### TypeScript

- `strict: true`, no `any` in exported signatures.
- Prefer `as const` content objects so literals are narrowed.

### Styling

- Utility-first Tailwind; shared tokens (colors, radii, spacing) come from
  `tailwind.config.ts` — don't hard-code hex values in components.
- Dark mode is the default aesthetic: always verify both themes.

### Translations

1. Add the key to `messages/en/<ns>.json` first (source of truth).
2. Copy it to `ar`, `fr`, `es` with translated values.
3. Keep ICU placeholders (`{name}`, `{count}`) byte-identical.
4. Never concatenate translated fragments in code.

### Commits & PRs

Follow [`../CONTRIBUTING.md`](../CONTRIBUTING.md) — Conventional Commits,
green `typecheck` + `lint` + `build` before opening a PR.

## 4. Working with images

```bash
# 1. drop originals into public/images/
cd frontend
pnpm images:optimize -- --dry-run   # inspect the plan
pnpm images:optimize                # write .webp files
pnpm images:optimize:clean          # remove originals once satisfied
```

Rules the script enforces: highest-resolution source wins for duplicate
stems; graphics/logos get quality 90–92; EXIF orientation is applied before
metadata is stripped; `og-cover.jpg` is preserved for social cards.

## 5. Debugging tips

- **Form didn't save?** Check `.env.local` values and that `schema.sql` was
  run; RLS rejects anything except anon `INSERT`.
- **Wrong language?** Delete the `NEXT_LOCALE` cookie or visit `/{locale}/…`
  explicitly; middleware re-detects from `Accept-Language` at `/`.
- **Weird image 404?** Run `grep -r "\.jpg" app/` — references should point
  at `.webp` (except `og-cover.jpg`).
- **Lockfile conflict?** Re-run `pnpm install` in `frontend/`; the lockfile
  must stay in sync with `pnpm-workspace.yaml` (which holds
  `minimumReleaseAge` and `allowBuilds`).

## 6. Repository hygiene

- Never commit `.env.local`, `.next/`, `node_modules/`, `*.tsbuildinfo`.
- Root files (`.editorconfig`, `.gitattributes`, `.nvmrc`, `.gitignore`)
  apply everywhere — keep them intact.
- Replit/platform-specific files do not belong in this repo; CI and docs are
  the source of truth for how the app runs.
