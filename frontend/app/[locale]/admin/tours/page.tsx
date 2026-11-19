import { getTranslations } from "next-intl/server";
import { getAdminTours } from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { TourRowActions } from "../_components/admin-actions";

export default async function ToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.tours" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  let tours: Record<string, unknown>[] = [];
  let loadError = false;
  try {
    const data = await getAdminTours();
    tours = data as unknown as Record<string, unknown>[];
  } catch {
    loadError = true;
  }

  const columns = [
    { key: "title", labelKey: "title" },
    { key: "slug", labelKey: "slug" },
    {
      key: "category",
      labelKey: "category",
      render: (row: Record<string, unknown>) => (
        <span className="rounded-full bg-surface-soft px-2.5 py-0.5 text-xs font-medium text-ink-heading">
          {String(row.category ?? "—")}
        </span>
      ),
    },
    { key: "duration", labelKey: "duration" },
    {
      key: "is_active",
      labelKey: "status",
      render: (row: Record<string, unknown>) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            row.is_active
              ? "bg-success/10 text-success"
              : "bg-surface-soft text-ink-muted"
          }`}
        >
          {row.is_active ? tTable("active") : tTable("inactive")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
        </div>
        <span className="rounded-full bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand">
          {t("tourCount", { count: tours.length })}
        </span>
      </div>

      <AdminDataTable
        columns={columns}
        data={tours}
        total={tours.length}
        page={1}
        pageSize={100}
        totalPages={1}
        emptyMessage={t("empty")}
        locale={locale}
        basePath={`/${locale}/admin/tours`}
        loadError={loadError}
        actions={(row) => (
          <TourRowActions
            id={row.id as number}
            isActive={Boolean(row.is_active)}
          />
        )}
      />
    </div>
  );
}
