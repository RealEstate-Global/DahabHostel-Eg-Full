import { getTranslations } from "next-intl/server";
import { getAdminGallery } from "@/utils/supabase/admin-queries";
import Image from "next/image";

export default async function GalleryAdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin.galleryMgmt" });

  let items: Array<{
    id: number;
    image_url: string;
    caption: string | null;
    group_tag: string | null;
    sort_order: number;
  }> = [];

  try {
    items = await getAdminGallery();
  } catch {
    items = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ink-heading">{t("title")}</h2>
          <p className="mt-1 text-sm text-ink-muted">{t("subtitle")}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-surface py-16">
          <p className="text-sm text-ink-muted">{t("empty")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border border-line bg-surface"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={item.image_url}
                  alt={item.caption ?? "Gallery item"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              <div className="p-2.5">
                {item.caption && (
                  <p className="line-clamp-1 text-xs font-medium text-ink-heading">
                    {item.caption}
                  </p>
                )}
                {item.group_tag && (
                  <span className="mt-1 inline-block rounded bg-surface-soft px-1.5 py-0.5 text-[10px] text-ink-muted">
                    {item.group_tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
