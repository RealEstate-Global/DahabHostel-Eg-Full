import { getTranslations } from "next-intl/server";
import { getAdminEntranceFees } from "@/utils/supabase/admin-queries";

export default async function EntranceFeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.fees" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  let groups: Array<{
    id: number;
    group_name: string;
    tagline: string | null;
    note: string | null;
    items: Array<{
      id: number;
      site_name: string;
      price: string;
      is_addon: boolean | null;
    }>;
  }> = [];

  try {
    groups = await getAdminEntranceFees();
  } catch {
    groups = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface py-16">
          <p className="text-sm text-ink-muted">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {groups.map((group) => (
            <div key={group.id} className="rounded-2xl border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:border-brand/40">
              <div className="mb-4 border-b border-line pb-3">
                <h3 className="font-semibold text-ink-heading">{group.group_name}</h3>
                {group.tagline && (
                  <p className="mt-0.5 text-xs text-ink-muted">{group.tagline}</p>
                )}
              </div>

              <div className="divide-y divide-line">
                {group.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-ink">{item.site_name}</span>
                      {item.is_addon && (
                        <span className="rounded-full bg-surface-soft px-2 py-0.5 text-[10px] font-semibold text-ink-muted">
                          {t("isAddon")}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-ink-heading text-sm">{item.price}</span>
                  </div>
                ))}
              </div>

              {group.note && (
                <p className="mt-4 border-t border-line pt-3 text-xs text-ink-muted italic">
                  {group.note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
