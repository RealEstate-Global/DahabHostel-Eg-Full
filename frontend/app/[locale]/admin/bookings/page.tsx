import { getTranslations } from "next-intl/server";
import { getAdminBookingRequests } from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { format } from "date-fns";

export default async function BookingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "admin.bookings" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  const page = parseInt(sp.page ?? "1", 10);

  let result;
  try {
    result = await getAdminBookingRequests({ page, search: sp.search });
  } catch {
    result = { data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  }

  const columns = [
    { key: "name", labelKey: "name" },
    { key: "email", labelKey: "email" },
    { key: "room", labelKey: "room" },
    {
      key: "check_in",
      labelKey: "checkIn",
      render: (row: Record<string, unknown>) =>
        row.check_in ? format(new Date(row.check_in as string), "dd MMM yyyy") : "—",
    },
    {
      key: "check_out",
      labelKey: "checkOut",
      render: (row: Record<string, unknown>) =>
        row.check_out ? format(new Date(row.check_out as string), "dd MMM yyyy") : "—",
    },
    { key: "guests", labelKey: "guests" },
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

      {/* Search */}
      <form className="flex gap-2" action="">
        <input
          type="text"
          name="search"
          defaultValue={sp.search ?? ""}
          placeholder={t("searchPlaceholder")}
          className="input-modern max-w-sm"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
        >
          {tTable("name") === "الاسم" ? "بحث" : "Search"}
        </button>
      </form>

      <AdminDataTable
        columns={columns}
        data={result.data as unknown as Record<string, unknown>[]}
        total={result.total}
        page={result.page}
        pageSize={result.pageSize}
        totalPages={result.totalPages}
        emptyMessage={t("empty")}
        locale={locale}
        basePath={`/${locale}/admin/bookings`}
      />
    </div>
  );
}
