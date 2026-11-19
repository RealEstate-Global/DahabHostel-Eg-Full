import { getTranslations } from "next-intl/server";
import { getAdminReviews } from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { ReviewActions } from "../_components/admin-actions";
import { Star } from "lucide-react";
import { format } from "date-fns";

export default async function ReviewsAdminPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; status?: string; search?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: "admin.reviewsMgmt" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  const page = parseInt(sp.page ?? "1", 10);
  const approved =
    sp.status === "approved"
      ? true
      : sp.status === "pending"
        ? false
        : undefined;

  let result;
  try {
    result = await getAdminReviews({
      page,
      search: sp.search,
      approved,
    });
  } catch {
    result = { data: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
  }

  const columns = [
    { key: "author_name", labelKey: "name" },
    {
      key: "rating",
      labelKey: "rating",
      render: (row: Record<string, unknown>) => (
        <div className="flex items-center gap-1 text-star">
          <Star className="h-4 w-4 fill-current" />
          <span className="font-semibold">{row.rating as number}/5</span>
        </div>
      ),
    },
    { key: "title", labelKey: "title" },
    {
      key: "body",
      labelKey: "body",
      render: (row: Record<string, unknown>) => (
        <span className="line-clamp-2 max-w-sm text-xs text-ink-muted">
          {(row.body as string) || "—"}
        </span>
      ),
    },
    {
      key: "is_approved",
      labelKey: "status",
      render: (row: Record<string, unknown>) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            row.is_approved
              ? "bg-success/10 text-success"
              : "bg-star/10 text-star"
          }`}
        >
          {row.is_approved ? tTable("approved") : tTable("pending")}
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

        {/* Status filters */}
        <div className="flex items-center gap-2">
          <a
            href={`/${locale}/admin/reviews`}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !sp.status
                ? "bg-brand text-white"
                : "border border-line bg-surface text-ink-muted hover:text-ink-heading"
            }`}
          >
            {t("filterAll")}
          </a>
          <a
            href={`/${locale}/admin/reviews?status=pending`}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              sp.status === "pending"
                ? "bg-brand text-white"
                : "border border-line bg-surface text-ink-muted hover:text-ink-heading"
            }`}
          >
            {t("filterPending")}
          </a>
          <a
            href={`/${locale}/admin/reviews?status=approved`}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              sp.status === "approved"
                ? "bg-brand text-white"
                : "border border-line bg-surface text-ink-muted hover:text-ink-heading"
            }`}
          >
            {t("filterApproved")}
          </a>
        </div>
      </div>

      <AdminDataTable
        columns={columns}
        data={result.data as unknown as Record<string, unknown>[]}
        total={result.total}
        page={result.page}
        pageSize={result.pageSize}
        totalPages={result.totalPages}
        emptyMessage={t("empty")}
        locale={locale}
        basePath={`/${locale}/admin/reviews`}
        actions={(row) => (
          <ReviewActions
            id={row.id as number}
            isApproved={Boolean(row.is_approved)}
          />
        )}
      />
    </div>
  );
}
