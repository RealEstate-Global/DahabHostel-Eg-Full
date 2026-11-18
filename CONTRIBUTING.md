# Contributing to Dahab Hostel Cairo

Thanks for your interest in improving the site. This document explains the
workflow and conventions we follow.

## 🍴 Fork & branch model

1. Fork the repository and create your branch from `main`:

   ```bash
   git checkout -b feat/short-description main
   ```

2. Use conventional prefixes:

   | Prefix | Use for |
   | --- | --- |
   | `feat/` | new features or pages |
   | `fix/` | bug fixes |
   | `docs/` | documentation only |
   | `perf/` | performance work (e.g. image pipeline) |
   | `refactor/` | behaviour-preserving code changes |
   | `chore/` | tooling, dependencies, CI |

## 🛠️ Development setup

```bash
cd frontend
pnpm install
cp .env.example .env.local   # fill in Supabase values (see README)
pnpm dev                     # http://localhost:3000
```

Requirements: **Node.js 22** (`.nvmrc`) and **pnpm 12** (`corepack enable`).

## ✅ Before you open a PR

Run the same gates CI runs:

```bash
cd frontend
pnpm typecheck   # tsc --noEmit (strict)
pnpm lint        # eslint
pnpm build       # production build
```

All three must pass. CI (`.github/workflows/ci.yml`) blocks merges otherwise.

## 📝 Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add language switcher to the header
fix: correct robots.ts default host
perf: convert gallery images to WebP
```

- Imperative mood, lowercase, no trailing period.
- Body explains *why*, not *what* (the diff shows what).

## 🌍 Translations

- UI strings live in `frontend/messages/<locale>/*.json` — **never** hard-code
  user-facing text in components.
- When you add a key, add it to **all four** locales (`en`, `ar`, `fr`, `es`).
- `en` is the source of truth; translate from English, keep placeholders
  (`{count}`, `{name}`) intact.

## 🖼️ Images

- Drop new images into `frontend/public/images/` and run
  `pnpm images:optimize` (see README → *Image pipeline*).
- Never commit originals over 300 KB; the pipeline produces WebP at the
  original resolution.

## 🧪 Pull request checklist

- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm build` pass locally
- [ ] New/changed UI has been checked in dark **and** light mode
- [ ] All four locales updated for any new strings
- [ ] Screenshots attached for visual changes
- [ ] Commit messages follow Conventional Commits

## 📖 More documentation

- [`docs/architecture.md`](docs/architecture.md) — how the app is structured
- [`docs/development.md`](docs/development.md) — day-to-day workflow details
- [`docs/deployment.md`](docs/deployment.md) — release process
- [`SECURITY.md`](SECURITY.md) — how to report vulnerabilities
