# 🚀 Deployment

## CI pipeline

Every push and pull request to `main` runs
[`.github/workflows/ci.yml`](../.github/workflows/ci.yml):

```text
checkout → setup Node 22 (corepack) → pnpm install --frozen-lockfile
        → pnpm typecheck → pnpm build
```

- The build runs in `frontend/` with placeholder Supabase env vars — the
  app compiles without a real backend (forms are simply inert).
- A red pipeline blocks merges; branch protection should require the
  `CI / build` check.
- **Dependabot** ([`.github/dependabot.yml`](../.github/dependabot.yml))
  opens weekly PRs for pnpm and GitHub Actions updates.

## Environment variables

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | build/runtime | required for forms |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | build/runtime | required for forms |
| `NEXT_PUBLIC_BASE_URL` | build/runtime | canonical origin for SEO/sitemap |

Configure them as **repository secrets** (or your host's env UI). They are
`NEXT_PUBLIC_*`, so they are inlined at build time — changing one requires a
rebuild.

## Hosting options

### A. Vercel (recommended, zero-config)

1. Import the repo; set **Root Directory** to `frontend/`.
2. Framework preset: **Next.js**; build `pnpm build`; output handled
   automatically.
3. Add the three env vars above (Production + Preview).
4. Point `dahabhostel.com` DNS at Vercel and enable automatic HTTPS.

### B. Self-hosted Node (VPS / Docker)

```bash
# build machine or CI artifact
cd frontend
pnpm install --frozen-lockfile
pnpm build

# runtime
pnpm start -- -p 3000          # serves .next/
```

Behind a reverse proxy (nginx/Caddy) you must:

- forward `Host`, `X-Forwarded-Proto`, `X-Forwarded-For`;
- serve `/_next/static/*` and `/images/*` with the immutable cache headers
  already defined in `next.config.js` (or let Node handle them);
- terminate TLS at the proxy.

Minimal Dockerfile sketch (multi-stage):

```dockerfile
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /app
COPY frontend/ .
RUN pnpm install --frozen-lockfile && pnpm build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app .next .next
COPY --from=build /app .next/ .next/
COPY --from=build /app node_modules node_modules
COPY --from=build /app public public
COPY --from=build /app package.json package.json
EXPOSE 3000
CMD ["pnpm", "start"]
```

> Adjust the COPY layers to your taste; the important part is
> `NODE_ENV=production` + `pnpm start` serving the prebuilt `.next/`.

## Supabase

- Schema changes: edit `frontend/supabase/schema.sql` (keep it
  idempotent — `create table if not exists`) and re-run it in the SQL
  editor; no app deploy is needed for additive DDL.
- Rotate keys in Dashboard → Project Settings → API; update the repo secrets
  and redeploy.
- Monitor usage in the Supabase dashboard (Dashboard → Logs / Table Editor).

## Release checklist

- [ ] `pnpm typecheck && pnpm lint && pnpm build` green locally
- [ ] All four locales updated for new strings
- [ ] Images pass through `pnpm images:optimize`
- [ ] CI green on the PR; reviewed and merged to `main`
- [ ] Deploy triggered (Vercel auto-deploy, or pull + build on the server)
- [ ] Smoke test after deploy:
      `/` redirects to a locale · `/en` renders · `/ar` renders RTL ·
      one tour page · one form submits · `robots.txt` + `sitemap.xml` 200
- [ ] Check Open Graph preview (1200×630 `og-cover.jpg`) on
      Facebook/Twitter/LinkedIn debuggers

## Rollback

- **Vercel**: Deployments → previous successful deployment → *Promote to
  Production* (instant).
- **Self-hosted**: `git checkout <last-good-sha>` → `pnpm install
  --frozen-lockfile` → `pnpm build` → restart the service.
- Database: `schema.sql` is additive; destructive migrations should ship
  with a backup step (`pg_dump`) documented in the PR.

## Monitoring & maintenance

- **Uptime**: point a monitor at `/en` (200 expected) and `robots.txt`.
- **Errors**: Vercel Analytics/Sentry or `journalctl` for the Node service.
- **Dependabot PRs**: merge weekly — CI validates them.
- **Node upgrades**: bump `.nvmrc` + the CI matrix in one PR.
