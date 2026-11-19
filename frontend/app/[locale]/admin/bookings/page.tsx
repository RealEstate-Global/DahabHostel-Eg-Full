import { getTranslations } from "next-intl/server";
import { getAdminBookingRequests } from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { formatAdminDate } from "../_lib/date-format";

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
  let loadError = false;
  try {
    result = await getAdminBookingRequests({ page, search: sp.search });
  } catch {
    loadError = true;
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
        formatAdminDate(row.check_in, locale),
    },
    {
      key: "check_out",
      labelKey: "checkOut",
      render: (row: Record<string, unknown>) =>
        formatAdminDate(row.check_out, locale),
    },
    { key: "guests", labelKey: "guests" },
    {
      key: "created_at",
      labelKey: "createdAt",
      render: (row: Record<string, unknown>) =>
        formatAdminDate(row.created_at, locale),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
        <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
      </div>

      {/* Search */}
      <form className="flex items-center gap-2 max-w-md" action="">
        <input
          type="text"
          name="search"
          defaultValue={sp.search ?? ""}
          placeholder={t("searchPlaceholder")}
          className="input-modern"
        />
        <button
          type="submit"
          className="btn-primary text-xs px-5 py-2.5 rounded-xl whitespace-nowrap"
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
        queryParams={{ search: sp.search }}
        loadError={loadError}
      />
    </div>
  );
}
