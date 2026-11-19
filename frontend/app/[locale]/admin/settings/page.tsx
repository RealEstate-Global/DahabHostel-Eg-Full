import { getTranslations } from "next-intl/server";
import { getAdminSiteSettings } from "@/utils/supabase/admin-queries";
import { SettingsManager } from "../_components/settings-manager";
import { AdminLoadError } from "../_components/admin-load-error";
import type { Database } from "@/utils/supabase/types";

export default async function SettingsAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.settingsPage" });
  let settings: Database["public"]["Tables"]["site_settings"]["Row"][] = [];
  let loadError = false;

  try {
    settings = await getAdminSiteSettings();
  } catch {
    loadError = true;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
        </div>
      </div>

      {loadError ? (
        <AdminLoadError locale={locale} retryHref={`/${locale}/admin/settings`} />
      ) : (
        <SettingsManager settings={settings} locale={locale} showHeader={false} />
      )}
    </div>
  );
}
