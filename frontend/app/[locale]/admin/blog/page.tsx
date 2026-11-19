import { getTranslations } from "next-intl/server";
import { getAdminBlogPosts } from "@/utils/supabase/admin-queries";
import { AdminDataTable } from "../_components/admin-data-table";
import { BlogRowActions } from "../_components/admin-actions";
import { formatAdminDate } from "../_lib/date-format";

export default async function BlogAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.blogMgmt" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  let posts: Record<string, unknown>[] = [];
  let loadError = false;
  try {
    const data = await getAdminBlogPosts();
    posts = data as unknown as Record<string, unknown>[];
  } catch {
    loadError = true;
  }

  const columns = [
    { key: "title", labelKey: "title" },
    { key: "slug", labelKey: "slug" },
    {
      key: "is_published",
      labelKey: "status",
      render: (row: Record<string, unknown>) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            row.is_published
              ? "bg-brand/10 text-brand"
              : "bg-surface-soft text-ink-muted"
          }`}
        >
          {row.is_published ? tTable("published") : tTable("draft")}
        </span>
      ),
    },
    {
      key: "created_at",
      labelKey: "createdAt",
      render: (row: Record<string, unknown>) =>
        formatAdminDate(row.created_at, locale),
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

      <AdminDataTable
        columns={columns}
        data={posts}
        total={posts.length}
        page={1}
        pageSize={100}
        totalPages={1}
        emptyMessage={t("empty")}
        locale={locale}
        basePath={`/${locale}/admin/blog`}
        loadError={loadError}
        actions={(row) => (
          <BlogRowActions
            id={row.id as number}
            isPublished={Boolean(row.is_published)}
          />
        )}
      />
    </div>
  );
}
