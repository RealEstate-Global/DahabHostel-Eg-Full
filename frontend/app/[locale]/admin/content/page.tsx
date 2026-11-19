import { getTranslations } from "next-intl/server";
import {
  getAdminBlogPosts,
  getAdminGallery,
  getAdminEntranceFees,
  getAdminSiteSettings,
} from "@/utils/supabase/admin-queries";
import { BlogRowActions } from "../_components/admin-actions";
import { AdminDataTable } from "../_components/admin-data-table";
import { FileText, Image as ImageIcon, Ticket, Settings, Plus } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

export default async function ContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const activeTab = sp.tab ?? "blog";

  const t = await getTranslations({ locale, namespace: "admin" });
  const tBlog = await getTranslations({ locale, namespace: "admin.blogMgmt" });
  const tGallery = await getTranslations({ locale, namespace: "admin.galleryMgmt" });
  const tFees = await getTranslations({ locale, namespace: "admin.fees" });
  const tSettings = await getTranslations({ locale, namespace: "admin.settingsPage" });
  const tTable = await getTranslations({ locale, namespace: "admin.table" });

  let posts: Record<string, unknown>[] = [];
  let galleryItems: Array<{ id: number; image_url: string; caption: string | null; group_tag: string | null }> = [];
  let feeGroups: Array<{
    id: number;
    group_name: string;
    tagline: string | null;
    note: string | null;
    items: Array<{ id: number; site_name: string; price: string; is_addon: boolean | null }>;
  }> = [];
  let settings: Array<{ key: string; value: unknown; updated_at: string }> = [];

  try {
    const [p, g, f, s] = await Promise.all([
      getAdminBlogPosts(),
      getAdminGallery(),
      getAdminEntranceFees(),
      getAdminSiteSettings(),
    ]);
    posts = p as unknown as Record<string, unknown>[];
    galleryItems = g;
    feeGroups = f;
    settings = s;
  } catch {
    // Keep empty fallbacks if DB is temporarily unreachable
  }

  const blogColumns = [
    { key: "title", labelKey: "title" },
    { key: "slug", labelKey: "slug" },
    {
      key: "is_published",
      labelKey: "status",
      render: (row: Record<string, unknown>) => (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
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
        format(new Date(row.created_at as string), "dd MMM yyyy"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-ink-heading">
          {locale === "ar" ? "إدارة المحتوى" : "Content Management"}
        </h2>
        <p className="mt-1 text-sm text-ink-muted">
          {locale === "ar"
            ? "إدارة المقالات، معرض الصور، رسوم الدخول، وإعدادات الموقع"
            : "Manage blog posts, media gallery, entrance fees, and site settings"}
        </p>
      </div>

      {/* KPI Overview Pills */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <a
          href={`/${locale}/admin/content?tab=blog`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "blog"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tBlog("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{posts.length}</p>
            </div>
          </div>
        </a>

        <a
          href={`/${locale}/admin/content?tab=gallery`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "gallery"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10 text-success">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tGallery("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{galleryItems.length}</p>
            </div>
          </div>
        </a>

        <a
          href={`/${locale}/admin/content?tab=fees`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "fees"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-star/10 text-star">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tFees("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{feeGroups.length}</p>
            </div>
          </div>
        </a>

        <a
          href={`/${locale}/admin/content?tab=settings`}
          className={`rounded-2xl border p-4 transition-all duration-200 ${
            activeTab === "settings"
              ? "border-brand bg-surface shadow-card ring-1 ring-brand/30"
              : "border-line bg-surface hover:border-brand/30 hover:bg-surface-soft"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-soft text-ink-muted">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-ink-muted">{tSettings("title")}</p>
              <p className="text-xl font-bold text-ink-heading">{settings.length}</p>
            </div>
          </div>
        </a>
      </div>

      {/* Tab 1: Blog */}
      {activeTab === "blog" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink-heading">{tBlog("title")}</h3>
          </div>
          <AdminDataTable
            columns={blogColumns}
            data={posts}
            total={posts.length}
            page={1}
            pageSize={100}
            totalPages={1}
            emptyMessage={tBlog("empty")}
            locale={locale}
            basePath={`/${locale}/admin/content`}
            actions={(row) => (
              <BlogRowActions
                id={row.id as number}
                isPublished={Boolean(row.is_published)}
              />
            )}
          />
        </div>
      )}

      {/* Tab 2: Gallery */}
      {activeTab === "gallery" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink-heading">{tGallery("title")}</h3>
          </div>
          {galleryItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface py-16">
              <p className="text-sm text-ink-muted">{tGallery("empty")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand/40"
                >
                  <div className="relative aspect-square w-full bg-surface-soft">
                    <Image
                      src={item.image_url}
                      alt={item.caption ?? "Gallery"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                  </div>
                  <div className="p-3">
                    <p className="line-clamp-1 text-xs font-medium text-ink-heading">
                      {item.caption || "—"}
                    </p>
                    {item.group_tag && (
                      <span className="mt-1 inline-block rounded-md bg-surface-soft px-2 py-0.5 text-[10px] font-medium text-ink-muted">
                        {item.group_tag}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Fees */}
      {activeTab === "fees" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink-heading">{tFees("title")}</h3>
          </div>
          {feeGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface py-16">
              <p className="text-sm text-ink-muted">{tFees("empty")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {feeGroups.map((group) => (
                <div key={group.id} className="rounded-2xl border border-line bg-surface p-5 shadow-soft">
                  <div className="mb-4 border-b border-line pb-3">
                    <h4 className="font-semibold text-ink-heading">{group.group_name}</h4>
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
                            <span className="rounded bg-surface-soft px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">
                              {tFees("isAddon")}
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-ink-heading text-sm">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  {group.note && (
                    <p className="mt-3 border-t border-line pt-2 text-xs italic text-ink-muted">
                      {group.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Settings */}
      {activeTab === "settings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-ink-heading">{tSettings("title")}</h3>
          </div>
          {settings.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-surface py-16">
              <p className="text-sm text-ink-muted">{tSettings("empty")}</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft divide-y divide-line">
              {settings.map((s) => (
                <div key={s.key} className="p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-sm font-semibold text-brand">{s.key}</h4>
                    <span className="text-xs text-ink-muted">
                      {new Date(s.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <pre className="mt-2 overflow-x-auto rounded-xl bg-surface-soft p-3 font-mono text-xs text-ink">
                    {JSON.stringify(s.value, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
