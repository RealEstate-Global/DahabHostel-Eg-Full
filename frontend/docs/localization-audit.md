# Localization audit

## Scope and findings

The audit covered the `app/[locale]` routes, shared components, locale and middleware configuration, the message catalogs, and `app/_lib/localized-data.ts`. Public content pages already read most visible copy from `pages`, `legal`, `common`, `nav`, and `footer`; the main gaps were concentrated in authentication, admin pages, confirmation and shared UI states.

| File or area | Finding | Severity | Correction and dependencies |
| --- | --- | --- | --- |
| `app/_components/dahab/header.tsx` | Navigation descriptions were duplicated in an inline four-language dictionary; the Arabic location string was corrupted. One admin description was English-only. | High | Moved descriptions and header navigation labels to `messages/*/nav.json`. Corrected the location to `ميدان طلعت حرب وخريطة وسط البلد`. The header still uses its existing locale-aware route handling. |
| `app/[locale]/login/page.tsx` | Authentication UI and confirmation text were English-only; raw Supabase error messages could be shown to users. | High | Added `auth.json` for all locales and maps known Supabase error codes to translated messages; unknown errors get a safe localized message. Supabase calls and signup metadata remain intact. |
| `app/[locale]/airport-pickup-service/confirmation/page.tsx` | Confirmation and contact copy was English-only. | High | Added a `confirmation` namespace for all locales and retained the existing contact route. |
| `app/[locale]/admin/**` | Admin pages contained hand-maintained dictionaries, a constant expression that always selected Arabic, and unlocalized management copy. | High | Added a shared `admin` namespace for all locales and loaded it through `getTranslations` using the route locale. Admin metadata is localized as well. |
| `app/i18n.ts` | Missing message files were caught and replaced with empty objects, hiding deployment/configuration errors; locale input was not validated. | High | Replaced silent catches with explicit loading of the registered namespaces, validated requested locales, and let missing imports fail visibly. `app/[locale]/layout.tsx` rejects unsupported route locales and sets `dir=rtl` for Arabic. |
| Loading, error, consent, gallery, theme and form UI | Shared loading text, labels and placeholders contained English literals. | Medium | Moved the affected UI copy to the `common` catalog and used next-intl in the corresponding components. |
| Legal and location pages | Shared legal labels and the legal date used English labels and the browser's unspecified locale. | Medium | Localized the labels and format the date using the active locale. |
| Home metadata | Home title, description and breadcrumb label were English-only. | Medium | Added localized metadata values in `pages.home` and translated the breadcrumb label. |
| `app/_lib/localized-data.ts` | Typed tour, room, fee and blog content exists outside the message catalogs. | Review | Kept this data in the existing typed domain-content layer: it represents catalog/business content rather than reusable UI copy, and moving it would create another source of truth. No data was deleted. |
| Translation files | Existing catalogs had no automated parity, parse, or duplicate-key validation. | High | Added `scripts/check-locales.mjs` and the `pnpm i18n:check` command. It checks the supported locale directories, required namespaces, JSON validity, duplicate object keys, empty strings, value types, and nested key parity. |

## Deletion and duplication decisions

No message namespace or catalog key was deleted. The dependency review did not establish a translation file or entry as genuinely dead, so deleting one would be unsafe. The header's repeated four-language descriptions were consolidated into one navigation namespace. The admin page dictionaries were consolidated into the shared admin namespace. Existing domain-content dictionaries remain in their typed data module because their consumers use them as catalog records.

## Remaining audit notes

- `localized-data.ts` contains localized catalog descriptions and arrays, rather than UI labels. Its structure is retained; a separate audit should trace each record to its data source before changing it.
- The repository's `typecheck` currently reports pre-existing database typing errors in the admin server actions and Supabase admin queries. These refer to tables inferred as `never` and are outside the localization changes.
- The original `lint` script had no ESLint configuration and opened an interactive prompt. A standard Next.js ESLint configuration was added so the existing command can run non-interactively; its results are recorded in the delivery summary.
