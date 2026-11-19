import { getTranslations } from "next-intl/server";
import { getAdminProfiles } from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { UserRoleSelect } from "../_components/admin-actions";
import { format } from "date-fns";

export default async function UsersAdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "admin.usersMgmt" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  const page = parseInt(sp.page ?? "1", 10);

  let result;
  try {
    result = await getAdminProfiles({ page, search: sp.search });
  } catch {
    result = { data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  }

  const columns = [
    { key: "full_name", labelKey: "name" },
    { key: "email", labelKey: "email" },
    { key: "phone", labelKey: "phone" },
    {
      key: "role",
      labelKey: "role",
      render: (row: Record<string, unknown>) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            row.role === "admin"
              ? "bg-destructive/10 text-destructive"
              : row.role === "staff"
                ? "bg-brand/10 text-brand"
                : "bg-surface-soft text-ink-muted"
          }`}
        >
          {String(row.role ?? "guest")}
        </span>
      ),
    },
    {
      key: "created_at",
      labelKey: "createdAt",
      render: (row: Record<string, unknown>) =>
        format(new Date(row.created_at as string), "dd MMM yyyy"),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
        </div>
      </div>

      <form className="flex items-center gap-2 max-w-md" action="">
        <input
          type="text"
          name="search"
          defaultValue={sp.search ?? ""}
          placeholder={tTable("name") === "الاسم" ? "البحث بالاسم أو البريد…" : "Search by name or email…"}
          className="input-modern"
        />
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
        basePath={`/${locale}/admin/users`}
        actions={(row) => (
          <UserRoleSelect
            id={row.id as string}
            currentRole={(row.role as string) ?? "guest"}
          />
        )}
      />
    </div>
  );
}
