# Security Policy

## 🔒 Supported versions

| Version | Supported |
| --- | --- |
| `main` (latest) | ✅ |
| any tagged release | ✅ while it is the newest release of its major line |
| older commits / forks | ❌ |

This repository hosts a single web application; security fixes land on `main`
and ship with the next deployment.

## 📣 Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, report privately via one of these channels:

- **GitHub Security Advisories** —
  [*Report a vulnerability*](https://github.com/RealEstate-Global/DahabHostel-Eg-Full/security/advisories/new)
  (preferred, encrypted and private)
- **Email** — the repository owner via
  [GitHub](https://github.com/RealEstate-Global/DahabHostel-Eg-Full)

Please include:

1. A description of the issue and its impact
2. Steps to reproduce (PoC, URLs, payloads)
3. Affected page/route and locale, if applicable
4. Any suggested fix, if you have one

## ⏱️ What to expect

| Stage | Target |
| --- | --- |
| Acknowledgement | ≤ 48 hours |
| Initial assessment | ≤ 5 working days |
| Fix or mitigation plan | ≤ 14 days for high/critical |
| Public disclosure | coordinated with you after a fix ships |

## 🛡️ Scope & notes

In scope:

- The web application in `frontend/` (XSS, CSRF, injection, auth/session
  issues, IDOR, open redirects, rate-limit bypass)
- Supabase RLS policies and the API surface in `frontend/app/api/`
- The dependency tree (please report via the affected package upstream too)

Out of scope:

- Social engineering, physical attacks, denial-of-service
- Vulnerabilities in third-party services (Supabase, hosting provider)
- Issues requiring root/jailbroken access to a developer machine
- Missing security headers without a demonstrated exploit

## 🔐 Project hardening already in place

- Strict TypeScript, ESLint, and a green CI build as merge gates
- Supabase Row Level Security: anon keys may **insert** form rows only —
  no read or delete grants
- Security headers on every response (nosniff, frame-origins, referrer
  policy, permissions policy — see `frontend/next.config.js`)
- `pnpm` supply-chain defenses: 24 h `minimumReleaseAge` + explicit
  `allowBuilds` review list
- Secrets live only in `.env.local` (git-ignored); `.env.example` documents
  the required keys without values
- All content and assets are self-hosted — no runtime calls to third-party
  origins
