import { getTranslations } from "next-intl/server";
import { getAdminTourRequests } from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { format } from "date-fns";

export default async function TourRequestsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "admin.tourReqs" });

  const page = parseInt(sp.page ?? "1", 10);

  let result;
  try {
    result = await getAdminTourRequests({ page, search: sp.search });
  } catch {
    result = { data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  }

  const columns = [
    { key: "name", labelKey: "name" },
    { key: "email", labelKey: "email" },
    { key: "guests", labelKey: "guests" },
    { key: "period", labelKey: "period" },
    { key: "destinations", labelKey: "destinations" },
    {
      key: "created_at",
      labelKey: "createdAt",
      render: (row: Record<string, unknown>) =>
        format(new Date(row.created_at as string), "dd MMM yyyy"),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
        <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
      </div>
      <form className="flex items-center gap-2 max-w-md" action="">
        <input type="text" name="search" defaultValue={sp.search ?? ""} placeholder={t("searchPlaceholder")} className="input-modern" />
      </form>
      <AdminDataTable columns={columns} data={result.data as unknown as Record<string, unknown>[]} total={result.total} page={result.page} pageSize={result.pageSize} totalPages={result.totalPages} emptyMessage={t("empty")} locale={locale} basePath={`/${locale}/admin/tour-requests`} />
    </div>
  );
}
