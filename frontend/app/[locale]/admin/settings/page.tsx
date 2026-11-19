import { getTranslations } from "next-intl/server";
import { getAdminSiteSettings } from "@/utils/supabase/admin-queries";

export default async function SettingsAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.settingsPage" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  let settings: Array<{
    key: string;
    value: unknown;
    updated_at: string;
  }> = [];

  try {
    settings = await getAdminSiteSettings();
  } catch {
    settings = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
        </div>
      </div>

      {settings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface py-16">
          <p className="text-sm text-ink-muted">{t("empty")}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          <div className="divide-y divide-line">
            {settings.map((s) => (
              <div key={s.key} className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm font-semibold text-brand">
                    {s.key}
                  </h3>
                  <span className="text-xs text-ink-muted">
                    {new Date(s.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-surface-soft p-3 font-mono text-xs text-ink">
                  {JSON.stringify(s.value, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
