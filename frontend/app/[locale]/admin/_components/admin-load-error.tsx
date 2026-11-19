import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function AdminLoadError({ locale, retryHref }: { locale: string; retryHref: string }) {
  const t = await getTranslations({ locale, namespace: "admin.actions" });
  return (
    <section role="alert" className="rounded-2xl border border-destructive/30 bg-destructive-soft p-5 sm:p-6">
      <h3 className="font-semibold text-ink-heading">{t("loadErrorTitle")}</h3>
      <p className="mt-1 text-sm text-ink-muted">{t("loadErrorDescription")}</p>
      <Link href={retryHref} className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-surface px-4 text-sm font-semibold text-ink-heading ring-subtle hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
        {t("retry")}
      </Link>
    </section>
  );
}
